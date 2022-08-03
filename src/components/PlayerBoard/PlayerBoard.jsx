import React from "react";
import { useSelector } from "react-redux";
import PatternLine from "../PatternLine/PatternLine";
import s from './PlayerBoard.module.css'

function PlayerBoard() {

    const patternLines = useSelector(state => state.playerBoards[0].patternLines)
    const floorLine = useSelector(state => state.playerBoards[0].floorLine)
    
    return (
        <div className={s.container}>
            <div>score</div>
            <div>
                {patternLines.map((line,id) => {
                    return (
                        <PatternLine size={id + 1} tiles={line} key={id}/>
                    )
                })}
            </div>
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
            <div>wall</div>
        </div>
    )
}
export default PlayerBoard