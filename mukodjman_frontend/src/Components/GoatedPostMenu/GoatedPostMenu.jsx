import { useContext, useEffect } from "react"
import style from "./GoatedPostMenu.module.css"
import { PostHandlerContext } from "../../Contexts/PostHandlerProvider/PostHandlerProvider"
import BlockIcon from '@mui/icons-material/Block';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { UserContext } from "../../Contexts/UserProvider/UserProvider";
import EditIcon from '@mui/icons-material/Edit';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { AuthContext } from "../../Contexts/AuthProvider/AuthProvider";

function GoatedPostMenu({open, what}) {

    const {openPostMenu, mousePos, authorId, postId, deletePost, handleEditOpenFunc} = useContext(PostHandlerContext)
    const {followUser, blockUser, followedUsers, blockedUsers, isUserFollowed, unblockUser, unFollowUser, isUserBlocked, followUser2, unfollowUser2} = useContext(UserContext)
    const {user} = useContext(AuthContext)

    useEffect(() => {

    }, [mousePos])

    return (
        <>
            {what === "profile" ||  (user && authorId === user.id) ?
            (<div className={style.container} style={{
                display: openPostMenu ? "block" : "none",
                top: `${mousePos.y}px`,
                left: `${mousePos.x - 43.62}px`,
                position:"absolute"}}>
                <ul className={style.ul}>
                    <li onClick={() => handleEditOpenFunc()}><EditIcon className={style.icon}/>Edit</li>
                    <li onClick={() => deletePost(postId)}><RemoveCircleIcon className={style.icon}/>Delete</li>
                </ul>
            </div>)
            : (            <div className={style.container} style={{
                    display: openPostMenu ? "block" : "none",
                    top: `${mousePos.y}px`,
                    left: `${mousePos.x - 43.62}px`,
                    position:"absolute"
                }}>
                <ul className={style.ul}>
                    {isUserFollowed() ? (
                        <li onClick={() => {
                            unfollowUser2(authorId)
                            isUserFollowed()
                        }}><PersonRemoveIcon className={style.icon}/><p className={style.text}>Unfollow</p></li>
                    ) : (
                        <li onClick={() => {
                            followUser2(authorId)
                            isUserFollowed()
                        }}><PersonAddAlt1Icon className={style.icon}/><p className={style.text}>Follow</p></li>
                    )}
                    {isUserBlocked(authorId) ? (
                        <li onClick={() => unblockUser(authorId)}><BlockIcon className={style.icon}/> <p className={style.text}>Unblock</p></li>
                    ) : (
                        <li onClick={() => blockUser(authorId)}><BlockIcon className={style.icon}/> <p className={style.text}>Block</p></li>
                    )}
                </ul>
            </div>)}
        </>
    )
}

export default GoatedPostMenu