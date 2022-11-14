 import React from 'react'
import { Player } from '../Player'



export default function Profile() {
  return (
    <div id="profile">
        {}
    </div>
  )
}

function item(player : Player){
    return(
        <>
        {
            <div className="flex">
                <div className="item">
                    <div className="info">
                        <span className="player-name"> {player.name} </span>
                        <span className='player-kill'> {player.kill_count} </span>
                        <span className='player-death'> {player.death_count} </span>
                    </div>
                </div>
            </div>
        }
        </>
    
    )
}
