import './Team';
import './Round';  

export class Match{
    name: string;
    time_start: string; 
    time_end: string;
    map: string; 
    score: Map<string, number> = new Map();

    constructor(name: string) {
        this.name = name;
    }
    
    updateScore(team_won : string){
        this.score.set(team_won, (this.score.get(team_won) + 1))
    }

    setTimeStart(time_start: string){
        this.time_start = time_start; 
    }

    setMap(map: string){
        this.map = map;
    }

    setTimeEnd(time_end: string){
        this.time_end = time_end; 
    }
    

}


