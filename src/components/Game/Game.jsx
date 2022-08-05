import React from 'react';
import PlayerBoard from '../PlayerBoard/PlayerBoard';
import Table from '../Table/Table';
import s from './Game.module.css'


function Game() {

  return (
    
    <div>

      <Table />
      <div className={s.playerBoards}>
        <PlayerBoard player={0}/>
        <PlayerBoard player={1}/>
      </div>
      

    </div>
  );
}

export default Game;