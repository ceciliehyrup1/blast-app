import { Match } from './Match';
import {Player} from './Player'; 
import { Type } from "./enum";
import { CSEvent } from './CSEvent';
import { Team } from './Team';

export default function Parsing(file: string) {
  const regex_time = /(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)/; 
  const logLine: Array<string> = file.split('\n'); 
  let match = new Match('csgo');
  let players = new Map(); 
  let ct_players = [];
  let t_players = []; 
  let spec_players = []; 
  let match_start: boolean = false; 
  let teams = []; 
  let match_end = false; 

  for(let i = 0; i < logLine.length; i++){
    let event = new CSEvent(logLine[i]); 

    switch(event.type){
      case Type.match_start:{
        match_start_event(event.content); 
        match_start = true; 
        break;
      }
      case Type.player_join:{
        new_player_event(event.content); 
        break;
      }
      case Type.join_team:{
        join_team_event(event.content);
        break; 
      }
    }

    if(match_start){
      switch (event.type){
        case Type.kill:{
          kill_event(event.content); 
          break;
        }
        case Type.match_start:{
          reset_match(); 
          match_start_event(event.content); 
          break;
        }
        case Type.team_status:{
          team_status_event(event.content);
          break; 
        }
        case Type.round_start:{
          round_start_event(event.content);
          break; 
        }
        case Type.score:{
          update_score_event(event.content);
          break;
        }
        case Type.half_time:{
          half_time_event(event.content);
          break; 
        }
        case Type.match_end:{
          match_end_event(event.content); 
          match_end = true; 
          break;
        }
      }
    }
    if(match_end === true){
      break; 
    }
  }
  
  return {players, match, teams}; 

  function half_time_event(content: string){
    teams.forEach((team) => {
      if(team.is_ct){
        team.is_ct = false; 
        team.playerIDs = get_players_by_steamID(t_players);
      }else{
        team.is_ct = true; 
        team.playerIDs = get_players_by_steamID(ct_players); 
      }
    })
  }

  function join_team_event(content: string){
    let steamID: number = +content.match(/([0-9]{8})/)[0]; 
    if(content.includes("to <TERRORIST>")){
      if(!t_players.includes(steamID)){
        t_players.push(steamID);
        delete_from_previous_team(steamID, content);
      }
    }else if(content.includes("to <CT>")){
      if(!ct_players.includes(steamID)){
        ct_players.push(steamID); 
        delete_from_previous_team(steamID, content);
      }
    }else if(content.includes("to <Spectator>")){
      if(!spec_players.includes(steamID)){
        spec_players.push(steamID); 
        delete_from_previous_team(steamID, content);
      }
    }else{
      delete_from_previous_team(steamID, content);
    }
  }

  function delete_from_previous_team(steamID: number, content: string){
    if(content.includes("from team <TERRORIST>")){
      let index = t_players.indexOf(steamID);
      t_players.splice(index, 1);
    }else if(content.includes("from team <CT>")){
      let index = ct_players.indexOf(steamID);
      ct_players.splice(index, 1);
    }else if(content.includes("from team <Spectator>")){
      let index = spec_players.indexOf(steamID);
      spec_players.splice(index, 1);
    }
  }

  function team_status_event(content: string){
    let index = content.lastIndexOf(":");
    let name = content.substring(index + 2);
    let exist = false; 

    teams.forEach((team) => {
      if(team.name === name){
        exist = true;
      }
    })

    if(!exist){
      if(content.includes('"CT"')){
        let team = new Team(name, true, ct_players);
        teams.push(team); 
      }else if(content.includes('"TERRORIST"')){
        let team = new Team(name, false, t_players);
        teams.push(team); 
      }
    }
  }

  function new_player_event(content: string){
    let steamID: number = +content.match(/([0-9]{8})/)[0]; 
    let name: string = content.match(/(?<=["])(.*)(?=<[0-9])/)[0];
    
    if(!players.has(steamID)){
      players.set(steamID, new Player(steamID, name));
    }
  }

  function update_score_event(content: string){
    let values = content.match(/\"(.*?)\"/g); 
    let round_won_team = values[0]; 
    let round_won_trigger = values[1]; 
    let ct_score = values[2]; 
    let t_score = values[3]; 
    
    teams.forEach((team) => {
      if(team.is_ct){
        team.rounds_won = ct_score.slice(1, -1);
      }else if(!team.is_ct){
        team.rounds_won = t_score.slice(1, -1); 
      }
    })
    
    // TODO: add the values to the sites
    // TODO: add it to the match score

  }

  function match_start_event(content: string){
    match.time_start = content.match(regex_time)[0];
    match.map = content.match(/([a-z]{2}_[a-z]+[0-9]?)/)[0];
    match.score.set("TERRORIST", 0);
    match.score.set("CT", 0); 

    teams.forEach((team) => {
      if(team.is_ct){
        team.playerIDs = get_players_by_steamID(ct_players); 
      }else if(!team.is_ct){
        team.playerIDs = get_players_by_steamID(t_players);
      }
    })
  }

  function get_players_by_steamID(steamIDs : Array<string>){
    let playersFromId = [];
    steamIDs.forEach((steamID) => {
      if(players.has(steamID)){
        playersFromId.push(players.get(steamID));
      }
    })

    return playersFromId;
  }

  function kill_event(content: string){
    let steamID_killer: number = +content.match(/([0-9]{8})/g)[0];
    let steamID_victim: number = +content.match(/([0-9]{8})/g)[1]; 

    if(!content.includes("killed other")){
      players.get(steamID_killer).kill_count++; 
      players.get(steamID_victim).death_count++;

      if(content.includes("(headshot)")){
        players.get(steamID_killer).headshot_count++; 
      }
    }
  }

  function round_start_event(content: string){
    
  }

  function reset_match(){
    players.forEach((player: Player, key: number) => {
      player.reset_player(); 
      teams.forEach((team, number) => (
        team.reset_players()
      ))
    })
  }

  function match_end_event(content: string){
    match.time_end = content.match(regex_time)[0];
  }
}



