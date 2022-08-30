import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PlayerBoard from '../PlayerBoard/PlayerBoard';
import Table from '../Table/Table';
import s from './Game.module.css'
import { NavLink } from "react-router-dom";


function Game() {

  const dispatch = useDispatch();

  const players = Array(useSelector(state => state.players)).fill('p')

  const restart = () => {
    dispatch({type: 'RESTART'})
  }
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
      <NavLink to="/" onClick={restart}><button  >restart</button></NavLink>

    </div>
  );
}

export default Game;