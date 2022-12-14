import React from "react";
import s from './WallLine.module.css'
import { useSelector } from "react-redux";

const WallLine = (props) => {

    const wall = useSelector(state => state.playerBoards[props.player].wall)

    return (
        <div className={s.container}>
            {wall[props.n] ?
                wall[props.n].map((tileSpace,id) => {
                    
                return (
                    <div className={s.tileSpace} style={{background: tileSpace.color, opacity: tileSpace.filled ? '100%' : '20%', boxShadow: tileSpace.filled ? 'none' : '2px 2px 5px black inset'}} key={id}></div>
                )
            }) :
            <></>
            }

        </div>
    )
}

export default WallLine