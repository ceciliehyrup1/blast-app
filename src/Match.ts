import React, { AbstractView } from 'react'
import { TemplateExpression } from 'typescript';
import './Team';
import './Round';  
import {ActiveMap} from './enum'; 

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
        this.score.forEach((number, key) => {
            if(key == "TERRORIST"){
                number++; 
            }else if(key == "CT"){
                number++; 
            }
        })
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


