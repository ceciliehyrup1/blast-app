import React, { useEffect } from 'react';
import './App.css';
import Board from './components/board';
import { Match } from './Match';
import Parsing from './parsing';

function App() {
  const [match, setMatch] = React.useState<Match>();
  const [teams, setTeams] = React.useState<Array<any>>();

  useEffect(() => {
    fetch('/NAVIvsVitaGF-Nuke.txt').then((response) => 
        response.text()
    ).then((text) => {
      const {players, match, teams} = Parsing(text);
      setMatch(match); 
      setTeams(teams); 
    })
  }, [])

  if(teams === undefined){
    return <div className='loading'>Loading...</div>; 
  }

  return (
    <div className="App">
      <h1 className='score-header'>CS:GO Match</h1>
      <div className='scoreboards-container'>
        <Board
          team= {teams[0]}
        />
        <Board
          team= {teams[1]}
        />
      </div> 
    </div>
  );
}

export default App;
