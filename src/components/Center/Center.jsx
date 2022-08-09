import React from "react";
import s from './Center.module.css'
import { useDispatch } from "react-redux";

const Center = (props) => {
    const dispatch = useDispatch()

    const dragStartHandler = (e,tile) => {
        dispatch({type: 'PICK_TILES', payload: tile})
    }
    const dragEndHandler = (e) => {
        dispatch({type: 'DROP_TILES'})
    }

    return (
        <div className={s.center}>
            {props.minusOne &&  <div className={s.tile}> -1 </div>}
            {props.tiles.map((tile, key) => {
                
                return (
                    <div 
                        className={s.tile}
                        onDragStart={(e) => dragStartHandler(e,tile)}
                        onDragEnd={(e) => {dragEndHandler(e)}}
                        key={key} 
                        draggable={true} 
                        style ={{background: tile.color, cursor: "grab"}}></div>
                )
                
            } )}
        </div>
    )

}

export default Center