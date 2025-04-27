import style from "./TagsButton.module.css"
import StyleIcon from '@mui/icons-material/Style';

function TagsButton(props) {

    return (
        <>
            <div className={style.container} onClick={props.onClick}>
                <div className={style.iconContainer}>
                    <StyleIcon sx={{fill:"rgb(0,255,0)"}}/>
                </div>
                <span>Tags</span>
            </div>
        </>
    )
}

export default TagsButton