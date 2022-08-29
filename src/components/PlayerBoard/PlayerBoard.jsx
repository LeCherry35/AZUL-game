import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PatternLine from "../PatternLine/PatternLine";
import Wall from "../Wall/Wall";
import s from './PlayerBoard.module.css'

function PlayerBoard(props) {

    const playerId = props.player
    const currentPlayerId = useSelector(state => state.player)
    const patternLines = useSelector(state => state.playerBoards[playerId].patternLines)
    const floorLine = useSelector(state => state.playerBoards[playerId].floorLine)
    const score = useSelector(state => state.playerBoards[playerId].score)
    const dispatch = useDispatch()
    const player = useSelector(state => state.playersNames[playerId])
    const playerBoardClass = (playerId === currentPlayerId) ? (s.playerBoard + ' ' + s.active) : (s.playerBoard)
    
    
    return (
        <div className={playerBoardClass}>
            <div className={s.playerInfo}>{player || 'player' + (playerId + 1)} <br></br> score: {score}</div>
            <div className={s.container}>
                <div>
                    <div>
                        {patternLines.map((line,id) => {
                            return (
                                <PatternLine size={id + 1} tiles={line} key={id} player={playerId}/>
                            )
                        })}
                    </div>
                </div>
                <Wall player={playerId}/>
                <div className={s.floorLineContainer}>
                    {floorLine.map((tile, id) => {
                        if (tile === 'minusOne') {
                        return (
                            <div className={s.minusOne} key={id}> -1 </div>
                        )
                    }
                        return (
                            <div className={s.floorTile} style ={{background: tile}} key={id}></div>
                        )
                    })}
                </div>

            </div>
            
        </div>
    )
}
export default PlayerBoard