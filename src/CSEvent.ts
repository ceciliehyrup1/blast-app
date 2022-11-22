import { Type } from "./enum";

export class CSEvent{
    content : string;
    type : Type; 

    constructor(content: string){
        this.content = content; 
        this.type = this.find_event_type(content); 

    }

    find_event_type(content: string){
        let ct = "CT"
        let t = "TERRORIST"
        if(content.includes('STEAM USERID validated')){
            return Type.player_join;
        }
        else if(content.includes('RoundsPlayed: 15')){
            return Type.half_time; 
        }
        else if(content.includes('switched')){
            return Type.join_team;
        }
        else if(content.includes("Match_Start")){
            return Type.match_start;
        }
        else if(content.includes("killed")){
            return Type.kill;
        }
        else if(content.includes('"Round_Start"')){
            return Type.round_start;
        }
        else if(content.includes('Team "' +ct+ '" triggered') || content.includes('Team "' +t+ '" triggered') ){
            return Type.score; 
        }
        else if(content.includes('Team playing')){
            return Type.team_status; 
        }
    }


}