import React from "react";
import WallLine from "../WallLine/WallLine";
import s from './Wall.module.css'

const Wall = () => {

    
    return (
        <div className={s.container}>
            <WallLine n={0} />
            <WallLine n={1}/>
            <WallLine n={2}/>
            <WallLine n={3}/>
            <WallLine n={4}/>
        </div>
    )
}

export default Wall