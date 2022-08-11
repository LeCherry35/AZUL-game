import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Center from "../Center/Center";
import FactoryDisplay from "../FactoryDisplay/FactoryDIsplay";
import s from './Table.module.css'

function Table() {
    const dispatch = useDispatch();
    const table = useSelector(state => state.table)
    const minusOne = useSelector(state => state.minusOneIsOnTable)
    const roundStarted = useSelector(state => state.roundStarted)
    const player = useSelector(state => state.player) + 1
    const roundEnded = useSelector(state => state.roundEnded)
    const gameEnded = useSelector(state => state.gameEnded)


    useEffect(() => {
        startGame()
        createWall()
    },[])
    
    const createWall = () => {
        dispatch({type: 'CREATE_WALL'})
    }
    const startGame = () => {
        dispatch({type: 'START_GAME'})
    }

    const fillDisplays = () => {
        dispatch({type: 'FILL_FACTORY_DISPLAYS'})
    }

    const countRoundPoints = () => {
        dispatch({type: 'COUNT_ROUND_POINTS'})
    }

    return(
        <div className={s.tableContainer}>
            <div className={s.displaysContainer}>
                {table.map((_, n) => {
                    if (n !== 0) {
                        return (
                            <FactoryDisplay tiles={table[n]} key={n}/>
                        )
                    } 
                })}
                
                
            </div>
            <Center  tiles={table[0]} minusOne={minusOne}/>
            <div className={s.info}>

                {!gameEnded && roundStarted && !roundEnded && <div> Player {player}'s turn</div>}
                {!gameEnded && !roundStarted && <button onClick={fillDisplays}>Draw tiles</button>}
                {!gameEnded && roundEnded && <button onClick={countRoundPoints}>Count points</button>}
                {/* {gameEnded && } */}
                
            </div>
        </div>
    )
}

export default Table