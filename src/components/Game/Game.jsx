import React from 'react';
import { useSelector } from 'react-redux';
import PlayerBoard from '../PlayerBoard/PlayerBoard';
import Table from '../Table/Table';
import s from './Game.module.css'


function Game() {

  const players = Array(useSelector(state => state.players)).fill('p')
  return ( 
    <div>
      <Table />
      <div className={s.playerBoards}>
        {players.map((p, id) => {
          return(
            <PlayerBoard player={id} key={id}/>
          )
        })}
        
        
      </div>
      

    </div>
  );
}

export default Game;