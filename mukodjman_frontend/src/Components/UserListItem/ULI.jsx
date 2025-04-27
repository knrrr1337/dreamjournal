import { useContext, useRef, useState } from "react";
import PFP from "../PFP/PFP";
import style from "./ULI.module.css"
import { PostHandlerContext } from "../../Contexts/PostHandlerProvider/PostHandlerProvider";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SoGoodHadToDoItTwice from "../GoatedPostMenu/SoGoodHadToDoItTwice";

function ULI(props) {

    const {prettifyDate, isOpen, setIsOpen} = useContext(PostHandlerContext)
    
    const reff = useRef(null)



    
    const openDropdown = (event, authorId) => {
        event.stopPropagation();
        setIsOpen(true)

        const rect = reff.current.getBoundingClientRect();
        let middleX = rect.x + rect.width / 2;
        let middleY = rect.y + (rect.height / 2 + 5);

        props.setMousePos({ x: middleX, y: middleY });
    };
    

    return (
        <>
        
        <div className={style.container} style={{borderBottom: props.isLast ? "2px solid rgb(49, 44, 85)" : "", borderTop: props.isFirst ? "none" : "2px solid rgb(49, 44, 85)"}}>
            <div className={style.pfprow}>
                <div className={style.bruh} onClick={() => {props.gotoProfile(props.baszodId)}}>
                    <PFP profilePicture={props.pfp} size={{width:40, height:40}}/>
                    <div className={style.gyalazdmeg}>
                        <span className={style.username}>{props.username}</span>
                        <span className={style.timejoined}>{prettifyDate(props.joined_at)}</span>
                    </div>
                </div>
                
                <div className={style.hererakcontainer}>
                    <div className={style.hererakk} ref={reff} onClick={(event) => {
                        props.baszos(event)
                        openDropdown(event, -1)
                        console.log(props)
                        props.setBaszosId(props.baszodId)
                    }}>
                        <MoreHorizIcon />
                    </div>
                </div>

            </div>
  
        </div>
        
        </>
    )
}

export default ULI;