import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PatternLine from "../PatternLine/PatternLine";
import Wall from "../Wall/Wall";
import s from './PlayerBoard.module.css'

function PlayerBoard(props) {

    const player = props.player
    const patternLines = useSelector(state => state.playerBoards[player].patternLines)
    const floorLine = useSelector(state => state.playerBoards[player].floorLine)
    const score = useSelector(state => state.playerBoards[player].score)
    const dispatch = useDispatch()

    
    
    return (
        <div className={s.playerBoard}>
            <div className={s.playerInfo}>player {player + 1} | score: {score}</div>
            <div className={s.container}>
                <div>
                    <div>
                        {patternLines.map((line,id) => {
                            return (
                                <PatternLine size={id + 1} tiles={line} key={id} player={player}/>
                            )
                        })}
                    </div>
                </div>
                <Wall player={player}/>
                <div className={s.floorLineContainer}>
                    {floorLine.map((tile, id) => {
                        if (tile === 'minusOne') {
                        return (
                            <div className={s.tileSpace} key={id}> -1 </div>
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