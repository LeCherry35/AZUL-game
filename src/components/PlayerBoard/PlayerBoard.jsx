import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PatternLine from "../PatternLine/PatternLine";
import Wall from "../Wall/Wall";
import s from './PlayerBoard.module.css'

function PlayerBoard() {

    const patternLines = useSelector(state => state.playerBoards[0].patternLines)
    const floorLine = useSelector(state => state.playerBoards[0].floorLine)
    const score = useSelector(state => state.playerBoards[0].score)
    const dispatch = useDispatch()

    const countRoundPoints = () => {
        dispatch({type: 'COUNT_ROUND_POINTS'})
    }
    
    return (
        <div className={s.container}>
            <div>

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
            </div>
            <Wall />
            <div>score: {score}</div>
            <button onClick={countRoundPoints}>Подсчитать очки за круг</button>
        </div>
    )
}
export default PlayerBoard