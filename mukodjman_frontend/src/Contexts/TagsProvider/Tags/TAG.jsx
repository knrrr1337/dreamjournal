import style from "./TAG.module.css"
import React, {cloneElement} from "react"

function TAG(props) {

    const iconWithProps = cloneElement(props.icon, {
        color: props.color,
        
    });

    let rgba = props.color.replace(")", ", 0.175)").replace("rgb", "rgba")


    return (
        <>
        <div className={style.container} onClick={props.onClick} style={{border:`2px solid ${props.color}`, borderRadius:"10px", backgroundColor:`${rgba}`}}>
            <div className={style.iconContainer}>
                {props.icon}
            </div>
            <span style={{color:`${props.color}`}}>{props.name}</span>
        </div>
        </>
    )
}

export default TAG;