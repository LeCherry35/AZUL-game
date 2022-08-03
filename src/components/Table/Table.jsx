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
    },[])
    
    const startGame = () => {
        dispatch({type: 'START_GAME'})
    }

    const fillDisplays = () => {
        dispatch({type: 'FILL_FACTORY_DISPLAYS'})
    }

    return(
        <div className={s.tableContainer}>
            <FactoryDisplay tiles={table[1]}/>
            <FactoryDisplay tiles={table[3]}/>
            <FactoryDisplay tiles={table[4]}/>
            <FactoryDisplay tiles={table[2]}/>
            <FactoryDisplay tiles={table[5]}/>
            <FactoryDisplay tiles={table[0]} minusOne={minusOne}/>

            {!roundStarted && <button onClick={fillDisplays}>Роздать</button>}
            
            
        </div>
    )
}

export default Table