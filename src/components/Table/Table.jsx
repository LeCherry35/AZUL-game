import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FactoryDisplay from "../FactoryDisplay/FactoryDIsplay";
import s from './Table.module.css'

function Table() {
    const dispatch = useDispatch();
    const table = useSelector(state => state.table)
    const minusOne = useSelector(state => state.minusOneIsOnTable)
    const roundStarted = useSelector(state => state.roundStarted)

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
                <FactoryDisplay tiles={table[1]}/>
                <FactoryDisplay tiles={table[3]}/>
                <FactoryDisplay tiles={table[4]}/>
                <FactoryDisplay tiles={table[2]}/>
                <FactoryDisplay tiles={table[5]}/>
                <FactoryDisplay tiles={table[0]} minusOne={minusOne}/>

            </div>

            {!roundStarted && <button onClick={fillDisplays}>Раздать</button>}
            <button onClick={countRoundPoints}>Подсчитать очки за круг</button>
            
            
        </div>
    )
}

export default Table