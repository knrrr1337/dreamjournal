import style from "./Button.module.css";

function Button(props) {

    

    return (
        <>
            <div className={style.container} onClick={props.onClick} style={{filter: props.valid ? "" : "brightness(0.75)", cursor: props.valid ? "pointer" : "not-allowed", backgroundColor:props.bgcolor}}>
                <span className={style.text} style={{color:props.color}}>{props.text}</span>
            </div>
        </>
    )
}

export default Button;