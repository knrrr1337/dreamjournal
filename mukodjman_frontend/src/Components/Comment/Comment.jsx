import { useContext } from "react";
import PFP from "../PFP/PFP";
import style from "./Comment.module.css"
import { PostHandlerContext } from "../../Contexts/PostHandlerProvider/PostHandlerProvider";

function Comment(props) {

    const {prettifyDate} = useContext(PostHandlerContext)
    {console.log(props.last)}
    return (
        <>
            <div className={style.comment} style={{borderBottom: props.last ? "2px solid rgb(49, 44, 85)" : ""}}>
                <div className={style.pfprow}>
                    
                    <PFP className={style.pfp} profilePicture={props.commentUser.profilePicture} size={{width:40, height:40}}/>
                    <div className={style.hehe}>
                        <span>{props.commentUser.username}</span>
                        <span className={style.timeposted}>{prettifyDate(props.created_at)}</span>
                    </div>
                </div>
                <div className={style.content}>
                    {props.content}
                </div>
            </div>
        </>
    )
}

export default Comment;