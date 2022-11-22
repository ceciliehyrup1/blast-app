import React, { useEffect } from 'react'
import { Team } from '../Team';
import './board.css'


const Board: React.FC<{team: Team}> = (team) => {
  let players = team.team.playerIDs.sort((playerOne, playerTwo) => playerTwo.kill_count - playerOne.kill_count)

  const headers = [
    {key: "name", label: "Name"},
    {key: "kill_count", label: "Kills"},
    {key: "death_count", label: "Deaths"},
    {key: "kdr", label: "KDR"},
    {key: "headshot", label: "Headshot %"},
  ];

  return (
    <div className='scoreboard-table'>
    <h1 className='score-number'>{team.team.rounds_won}</h1>
    <h3 className='team-name'>{team.team.name}</h3>
    <table>
      <thead>
        <tr>
          {headers.map((row) => {
            return <td className='table-headers' key={row.key}>{row.label}</td>; 
          })}
        </tr>
      </thead>
      <tbody>
        {Array.from(players.values()).map((player) =>{
          return(
            <tr className='table-values' key={player.steamID}>
              <td className='table-player-name'>{player.name}</td>
              <td className='table-kill'>{player.kill_count}</td>
              <td className='table-death'>{player.death_count}</td>
              <td className='table-value'>{Math.round(player.get_kdr() * 10) / 10}</td>
              <td className='table-value'>{Math.round(player.get_headshot_percentage() * 10) / 10}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
    </div>
  )
}

export default Board; 
