import React from 'react'
import { Team } from './Team'

export class Player {
    steamID: number;
    name: string; 
    kill_count: number = 0; 
    death_count: number = 0; 
    headshot_count: number = 0; 
    average_damage_round: number = 0; 
    bomb_count: number = 0; 
    hp : number = 0; 


    constructor(steamID: number, name: string){
        this.steamID = steamID; 
        this.name = name; 
    }

    getName() {
        return this.name; 
    }

    get_headshot_percentage(){
        return this.headshot_count*100/this.kill_count; 
    }

    get_kdr(){
        return (this.kill_count/this.death_count); 
    }

    reset_player(){
        this.kill_count = 0; 
        this.death_count = 0; 
        this.headshot_count = 0; 
        this.average_damage_round = 0; 
        this.bomb_count = 0; 
        this.hp = 0; 
    }
}