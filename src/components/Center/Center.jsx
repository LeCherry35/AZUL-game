import React from "react";
import s from './Center.module.css'
import { useDispatch, useSelector } from "react-redux";

const Center = (props) => {
    const dispatch = useDispatch()
    const table = useSelector(state => state.table)

    const dragStartHandler = (e,tile) => {
        dispatch({type: 'PICK_TILES', payload: tile})
        const pickedTiles = table[tile.display].filter(pTile => { 
            return tile.color === pTile.color
        })
        const el = document.createElement('div')
        el.style.display = 'flex'
        document.body.appendChild(el);

        for (let i = 0; i < pickedTiles.length; i++) {
            var crt = e.target.cloneNode();
            crt.style.backgroundColor = tile.color;
            crt.style.transform = 'translatex(-500px)'
            el.appendChild(crt);
        }
        e.dataTransfer.setDragImage(el, 0, 0);
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