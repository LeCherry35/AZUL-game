import React from "react";
import s from './Input.module.css'

const Input = (props) => {
    return (
        <div className={s.container}>
            <input type="text" placeholder={props.name} onChange={props.onChange}/>
        </div>
    )
}

export default Input