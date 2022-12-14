import React from "react";
import s from './PatternLine.module.css'
import { useDispatch, useSelector } from "react-redux";

const PatternLine = (props) => {

    const player = props.player
    const dispatch = useDispatch()
    const currentColor = useSelector(state => state.pickedTiles[0]?.color)
    const currentLine = useSelector(state => state.playerBoards[player].patternLines[props.size - 1])
    const wall = useSelector(state => state.playerBoards[player].wall)
    const currentPlayer = useSelector(state => state.player)
    

    const line = Array(props.size).fill('')
    for(let i = 0; i < props.tiles.tilesQ; i++) {
        line[i]  = props.tiles.color
    }
    
    const dragOverHandler = (e) => {
        e.preventDefault()
        e.stopPropagation()
        let filled
        for(let tileSpace of wall[props.size - 1]) {
            if (currentColor === tileSpace.color) {
                filled = tileSpace.filled
            }
        }
        // debugger
        e.target.style.background = (((currentColor === props.tiles.color && !currentLine.full) || !currentLine.color) && !filled) ? 'lightgreen' : 'lightpink'
        if (player !== currentPlayer) {
            e.target.style.background = 'white'
        }
    }
    const dragLeaveHandler = (e) => {
        e.target.style.background = 'white'

    }
    const dropHandler = (e, number) => {
        e.preventDefault()
        e.target.style.background = 'white'
        if (player !== currentPlayer) {
            dispatch( {type: 'DROP_TILES'})
        } else {
            dispatch({type: 'PLACE_TILES', payload: number})
        }
        
    }

    return (
        <div className={s.lineContainer}
            onDragOver={(e) => {dragOverHandler(e)}}
            onDragLeave={(e) => {dragLeaveHandler(e)}}
            onDrop={(e) => {dropHandler(e, props.size - 1)}}>
        
            {line.map((tile,id) => {
                if(tile) {
                    return(
                        <div className={s.tile} style ={{background: tile, boxShadow: 'none'}} key={id}></div>
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