import React from 'react'
import { Player } from './Player';

export class Team{
    name: string; 
    rounds_won : number; 
    playerIDs : Array<Player>;  
    is_ct: boolean; 

    constructor(name: string, is_ct : boolean, playerIDs: Array<Player>){
        this.name = name; 
        this.is_ct = is_ct; 
        this.playerIDs = playerIDs; 
    }

    reset_players(){
        this.playerIDs = new Array<Player>;  
    }


}
