import React, { useEffect } from 'react'
import { Player } from '../Player';
import Profile from './profile'
import PubSub from 'pubsub-js';


const Board: React.FC<{}> = () => {
  const [players, setPlayers] = React.useState([]);

  

  
  useEffect(() => {

  })

  const headers = [
    {key: "name", label: "Name"},
    {key: "kill_count", label: "Kills"},
    {key: "death_count", label: "Deaths"},
    {key: "kdr", label: "KDR"},
    {key: "headshot", label: "Headshot %"},
  ];

  return (
    <table>
      <thead>
        <tr>
          {headers.map((row) => {
            return <td key={row.key}>{row.label}</td>; 
          })}
        </tr>
      </thead>
      <tbody>
        {players.map((player) =>{
          return(
            <tr key={player.steamID}>
              <td>{player.name}</td>
              <td>{player.kill_count}</td>
              <td>{player.death_count}</td>
              <td>{player.get_kdr()}</td>
              <td>{player.get_headshot_percentage()}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default Board; 
