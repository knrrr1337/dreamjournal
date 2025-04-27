import { useContext, useState, useEffect } from "react";
import PFP from "../../../PFP/PFP";
import style from "./PostModalContent.module.css"
import { PostHandlerContext } from "../../../../Contexts/PostHandlerProvider/PostHandlerProvider";
import Post from "../Post";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from "@mui/icons-material/Favorite";
import NotesIcon from '@mui/icons-material/Notes';
import Comment from "../../../Comment/Comment";
import { Modal } from "@mui/material";
import TAG from "../../../../Contexts/TagsProvider/Tags/TAG";



function PostModalContent(props) {
    
    const {prettifyDate, tags, getPostById, postData, setPostData} = useContext(PostHandlerContext)
        // const [pictureModal, setPictureModal] = useState(false)
        // const [pictureToDisplay, setPictureToDisplay] = useState("")
    
        // const handlePictureModal = () => {
        //     setPictureModal(false)
        //     setPictureToDisplay("")
        // }

    const [tagonpost, setTagponpost] = useState([])

    const handleTags = () => {

        let buh =  props.tags && props.tags.split("#")
        let cigany = []
        buh && buh.forEach((b) => {
            cigany.push(tags.filter((t) => t.name === b)[0])
        })
    
        setTagponpost(cigany)

    }

    const [localLike, setLocalLike] = useState(0)
    

    useEffect(() => {
    }, [])


    useEffect(() => {
        setLocalLike(props.likes)
        getPostById(props.id)
        console.log(localLike)
    },[props.open])

    useEffect(() => {
        handleTags()
    }, [props.tags, tags])

    useEffect(() => {
        console.log(localLike)
    }, [localLike])

    return (
        <>       
        
          {console.log(localLike)}
        <div className={style.container}>
            <div className={style.woah}>
                <div className={style.pfpdiv}>
                    <PFP size={{width:40, height:40}} isUser={false} profilePicture={postData.user && postData.user.profilePicture}/>
                </div>
                <div className={style.userRow}>
                    <span>{postData.user && postData.user.username}</span>
                    <span className={style.timeposted}>{prettifyDate(props.posted_at)}</span>
                </div>
            </div>
            <div className={style.content}>
                <div className={style.titlerow}>
                    <h2>{postData.title}</h2>
                </div>
                <div className={style.text}>
                    <span>{postData.content}</span>
                </div>

                <div className={style.images} style={{display: postData.images && postData.images.length === 0 ? "none" : "flex"}}>
                        {postData.images && postData.images.map((image) => {
                            return <div onClick={(e) => {
                                e.stopPropagation()
                                props.setPictureModal(true)
                                props.setPictureToDisplay(image.imageUrl)
                            }} style={{backgroundImage: `url(${`http://localhost:4400/uploads/${image.imageUrl}`})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            width: '200px',
                            height: '200px',
                            position:"relative",
                            zIndex:1,
                            borderRadius: '8px',
                            cursor: 'pointer'}}/>
                        })}
                </div>
                <div className={style.tagsrow}>
                    {tagonpost.map((tag) => {
                        return <TAG name={tag.name} icon={tag.icon} color={tag.color}/>
                    })}
                </div>
                <div className={style.reactionsContainer}>
                    <div className={style.reactions}>
                        
                            <>
                        <div className={style.d} title={`${props.comments.length} comments`} onClick={(e) => {
                            e.stopPropagation();
                            
                        }}>
                            <NotesIcon />
                            {postData.comments && postData.comments.length}
                        </div>

                        <div className={style.d} style={{cursor:"pointer"}} title={`${props.likes} likes`} onClick={(e) => {
                            e.stopPropagation();
                            props.isLiked ? setLocalLike(localLike - 1) : setLocalLike(localLike + 1)
                            props.handleLike(props.id);
                        }}>
                            {props.isLiked ? (
                                <FavoriteIcon />
                            ) : (
                                <FavoriteBorderIcon />
                            )}
                            {localLike}
                        </div>
                            </>
                    </div>
                </div>


                <div className={style.commentsContainer}>
                    {postData.comments && postData.comments.length === 0 ? (<div className={style.nocomments}>No comments</div>) : (postData.comments && postData.comments.map((comment, index) => {
                        return <Comment last={postData.comments && index + 1 === postData.comments.length} commentUser={comment.commentUser} content={comment.content} created_at={comment.created_at}/>
                    }))}
                    
                </div>
            </div>
        </div>
        </>
    )
}

export default PostModalContent;