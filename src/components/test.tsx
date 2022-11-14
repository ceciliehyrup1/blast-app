import React from 'react'
import Board from './board'
import * as fs from 'fs';
import { CSEvent } from '../CSEvent';
import { Type } from '../enum';

export default function TestHallo() {
  const file = fs.readFileSync('NAVIvsVitaGF-Nuke.txt','utf8'); 
  const regex_time = /(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)/; 
  const logLine: Array<string> = file.split('\n'); 
  let players = new Map(); 

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
        case Type.match_end:{
          match_end_event(event.content); 
          break;
        }
      }
    }
  }

  return (
    <div>test</div>
    
  )
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