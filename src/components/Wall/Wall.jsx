import React from "react";
import WallLine from "../WallLine/WallLine";
import s from './Wall.module.css'

const Wall = (props) => {
    
    
    return (
        <div className={s.container}>
            <WallLine n={0} player={props.player}/>
            <WallLine n={1} player={props.player}/>
            <WallLine n={2} player={props.player}/>
            <WallLine n={3} player={props.player}/>
            <WallLine n={4} player={props.player}/>
        </div>
    )
}

export default Wall