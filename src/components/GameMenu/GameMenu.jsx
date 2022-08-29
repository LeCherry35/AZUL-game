import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import Input from "../Input/Input";
import s from './GameMenu.module.css'

const GameMenu = () => {
    
    const dispatch = useDispatch()
    const players = useSelector(state => state.players)
    const playersNames = useSelector(state => state.playersNames)

    const setPlayers = (e, playerN) => {
        dispatch({type: 'SET_PLAYER', payload: {name: e.target.value, playerNo:playerN}})
    }
    const addPlayer = (e) => {
        dispatch({type: 'ADD_PLAYER'})
    }
    const removePlayer = (e) => {
        dispatch({type: 'REMOVE_PLAYER'})
    }


    return (
        <div className={s.container}>
            <NavLink to="/game" >Start game</NavLink>
                <div className={s.players}>{players} Players:</div>
            <Input name='Player 1' value ={playersNames[0]}onChange={(e) => {setPlayers(e, 0)}} />
            <Input name='Player 2' value ={playersNames[1]}onChange={(e) => {setPlayers(e, 1)}} />
            {(players === 3 || players === 4) && <Input name='Player 3' value ={playersNames[3]}onChange={(e) => {setPlayers(e, 2)}} />}
            {(players === 4) && <Input name='Player 4' value ={playersNames[4]} onChange={(e) => {setPlayers(e, 3)}} />}
            {(players < 4) && <button onClick={addPlayer}>+</button>}
            {(players > 2) && <button onClick={removePlayer}>-</button>}
                {/* <div className={s.radio}>
                    <input type="radio" name="position" value={2} onChange={(e) => {setPlayers(e)}} />
                    <label>2 players</label>

                </div>
                <div className={s.radio}>
                    <input type="radio" name="position" value={3} onChange={(e) => {setPlayers(e)}} />
                    <label>3 players</label>

                </div>
                <div className={s.radio}>
                    <input type="radio" name="position" value={4} onChange={(e) => {setPlayers(e)}} />
                    <label>4 players</label>

                </div> */}
        </div>
    )
}
export default GameMenu