import { useContext } from "react";
import style from "./GoatedPostMenu.module.css"
import { PostHandlerContext } from "../../Contexts/PostHandlerProvider/PostHandlerProvider";
import { UserContext } from "../../Contexts/UserProvider/UserProvider";
import BlockIcon from '@mui/icons-material/Block';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

function SoGoodHadToDoItTwice(props) {

    const {isOpen} = useContext(PostHandlerContext)
    const {followUser, blockUser2, isUserFollowed2, isUserBlocked, unFollowUser, unblockUser, followUser2, unfollowUser2} = useContext(UserContext)

   const apad = () => {
        if (isUserFollowed2(props.baszosId)) {
            return <li onClick={() => {
                unfollowUser2(props.baszosId)
                isUserFollowed2(props.baszosId)
            }}><PersonRemoveIcon className={style.icon}/><p className={style.text}>Unfollow</p></li>
        }
        return <li onClick={() => {
            followUser2(props.baszosId)
            isUserFollowed2(props.baszosId)
        }}><PersonAddAlt1Icon className={style.icon}/><p className={style.text}>Follow</p></li>
   }

    return (
        <>
        {console.log(isOpen)}
        <div className={style.container2} style={{
                    display: isOpen ? "block" : "none",
                    top: `${props.mousePos.y}px`,
                    left: `${props.mousePos.x - 43.62}px`,
                    position:"absolute",
                    zIndex:"999999"
                }}>
                <ul className={style.ul}>
                    {apad()}
                    {isUserBlocked(props.baszosId) ? (
                        <li onClick={() => unblockUser(props.baszosId)}><BlockIcon className={style.icon}/><p className={style.text}>Unblock</p></li>
                    ) : (
                    <li onClick={() => blockUser2(props.baszosId)}><BlockIcon className={style.icon}/> <p className={style.text}>Block</p></li>
                    )}
                </ul>
            </div>
        </>
    )
}

export default SoGoodHadToDoItTwice;