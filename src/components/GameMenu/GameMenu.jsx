import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from 'react-router-dom';
import s from './GameMenu.module.css'

const GameMenu = () => {
    
    const dispatch = useDispatch()

    const setPlayers = (e) => {
        dispatch({type: 'SET_PLAYERS', payload: +e.target.value})
    }


    return (
        <div>
            <NavLink to="/game" >Start game</NavLink>
                <div className={s.radio}>
                    <input type="radio" name="position" value={2} onChange={(e) => {setPlayers(e)}} />
                    <label>2</label>

                </div>
                <div className={s.radio}>
                    <input type="radio" name="position" value={3} onChange={(e) => {setPlayers(e)}} />
                    <label>3</label>

                </div>
                <div className={s.radio}>
                    <input type="radio" name="position" value={4} onChange={(e) => {setPlayers(e)}} />
                    <label>4</label>

                </div>
        </div>
    )
}
export default GameMenu