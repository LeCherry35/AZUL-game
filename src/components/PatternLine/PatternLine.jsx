import React from "react";
import s from './PatternLine.module.css'
import { useDispatch, useSelector } from "react-redux";

const PatternLine = (props) => {
    const dispatch = useDispatch()
    const currentColor = useSelector(state => state.pickedTiles[0]?.color)
    const currentLine = useSelector(state => state.playerBoards[0].patternLines[props.size - 1])
    
    const line = Array(props.size).fill('')
    for(let i = 0; i < props.tiles.tilesQ; i++) {
        line[i]  = props.tiles.color
    }
    
    const dragOverHandler = (e) => {
        e.preventDefault()
        e.stopPropagation()
        e.target.style.background = ((currentColor === props.tiles.color && !currentLine.full) || !currentLine.color) ? 'lightgreen' : 'lightpink'
    }
    const dragLeaveHandler = (e) => {
        e.target.style.background = 'white'

    }
    const dropHandler = (e, number) => {
        e.preventDefault()
        e.target.style.background = 'white'
        dispatch({type: 'PLACE_TILES', payload: number})
    }

    return (
        <div className={s.lineContainer}
            onDragOver={(e) => {dragOverHandler(e)}}
            onDragLeave={(e) => {dragLeaveHandler(e)}}
            onDrop={(e) => {dropHandler(e, props.size - 1)}}>
        
            {line.map((tile,id) => {
                if(tile) {
                    return(
                        <div className={s.tile} style ={{background: tile}} key={id}></div>
                    )
                }
                return(
                    <div className={s.tile} key={id}></div>
                )
            })}
        </div>
    )
}

export default PatternLine