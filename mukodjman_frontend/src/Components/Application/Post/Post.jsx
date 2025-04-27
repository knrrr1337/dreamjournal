import style from "./Post.module.css";
import Person2Icon from '@mui/icons-material/Person2';
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { PostHandlerContext } from "../../../Contexts/PostHandlerProvider/PostHandlerProvider";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from "@mui/icons-material/Favorite";
import NotesIcon from '@mui/icons-material/Notes';
import { Modal, TextField } from "@mui/material";
import Button from "../../Button/Button";
import PostModalContent from "./PostModalContent/PostModalContent";
import { UserContext } from "../../../Contexts/UserProvider/UserProvider";
import PFP from "../../PFP/PFP";

import Creative from "../../../Contexts/TagsProvider/Tags/Creative";
import Inspired from "../../../Contexts/TagsProvider/Tags/Inspired";
import Blessed from "../../../Contexts/TagsProvider/Tags/Blessed";
import TAG from "../../../Contexts/TagsProvider/Tags/TAG";
import { AuthContext } from "../../../Contexts/AuthProvider/AuthProvider";

function Post(props) {
    const navigate = useNavigate();
    const contentRef = useRef(null);
    const dropdownRef = useRef(null);
    const [isLiked, setIsLiked] = useState(false);
    const [localLike, setLocalLike] = useState(0);

    const { apad, setMousePos, likePost, commentOnPost, likedPosts, unLikePost, prettifyDate, editPost, tags, getPosts, getPostById, dreams, setPostData } = useContext(PostHandlerContext);
    const { isUserFollowed } = useContext(UserContext);
    const {user } = useContext(AuthContext)

    const goToPost = (postId) => {
        navigate(`/dream/${postId}`);
    };

    const gotoProfile = (id) => {
        navigate(`/profile/${id}`);
    };

    const checkOverflow = (element) => {
        return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
    };

    const [NeedReadMore, setNeedReadMore] = useState(false);

    useEffect(() => {
        const contentElement = contentRef.current;
        if (checkOverflow(contentElement)) {
            setNeedReadMore(true);
        }
    }, []);

    useEffect(() => {
        setIsLiked(isPostLiked());
    }, [likedPosts]);

    useEffect(() => {
        setLocalLike(props.reactions.length)
    }, [dreams]);

    const renderReadMore = () => {
        return (
            <>
                <div className={style.readMoreCover}>
                    <span>Read More</span>
                </div>
            </>
        );
    };

    const openDropdown = (event, authorId, props) => {
        event.stopPropagation();
        apad(authorId, props.id, handleEditOpen);
        const rect = dropdownRef.current.getBoundingClientRect();
        let middleX = rect.x - rect.width;
        let middleY = rect.y + (rect.height / 2 + 5);
        setMousePos({ x: middleX, y: middleY });
    };

    const isPostLiked = () => {
        return likedPosts.some((hehe) => hehe.id === props.id);
    };

    const handleLike = (id) => {
        if (isLiked) {
            unLikePost(id);
            setLocalLike(localLike - 1);
        } else {
            likePost(id);
            setLocalLike(localLike + 1);
        }
        setIsLiked(!isLiked);
    };

    const handleComment = (id) => {
        // commentOnPost(id);
        // setComments(comments + 1);
    };

    const [commentValue, setCommentValue] = useState("");
    const [postModal, setPostModal] = useState(false);

    const handlePostClose = () => {
        setPostModal(false);
        setPostData({})
    };

    const [commentModal, setCommentModal] = useState(false);
    const handleClose = () => {
        setCommentModal(false);
        setCommentValue("");
        setValid(false);
    };

    const [valid, setValid] = useState(false);
    const checkIfValid = (value) => {
        setValid(value.trim() !== "");
    };

    const prettifyPrivacy = (a) => {
        switch (a) {
            case "PUBLIC": return "Public";
            case "FOLLOWERS_ONLY": return "Follower-only";
            case "PRIVATE": return "Private";
            default: return "";
        }
    };

    const [pictureModal, setPictureModal] = useState(false);
    const [pictureToDisplay, setPictureToDisplay] = useState("");

    const handlePictureModal = () => {
        setPictureModal(false);
        setPictureToDisplay("");
    };

    const [editOpen, setEditOpen] = useState(false);

    const handleEditOpen = () => {
        setEditOpen(true);
    };

    const [tagonpost, setTagponpost] = useState([]);

    const handleEditClose = () => {
        setEditOpen(false);
        setTitleValue(() => props.title);
        setContentValue(() => props.content);
        setTagsValue(() => [...tagonpost]);
        setImagesValue(() => [...props.images]);
    };

    const [titleValue, setTitleValue] = useState(() => props.title);
    const [contentValue, setContentValue] = useState(() => props.content);
    const [tagsValue, setTagsValue] = useState(() => [...tagonpost]);
    let [imagesValue, setImagesValue] = useState(() => [...props.images]);


    const checkIfValidd = () => {
        return titleValue !== "" && contentValue !== "";
    };

    const proceedEdit = () => {
        const uwu = new Set(imagesValue.map(img => img));
        const remaining = props.images.filter(img => !uwu.has(img));
        let apad = {
            title: titleValue,
            content: contentValue,
            images: remaining.map((r) => {
                return r.imageUrl;
            }),
            tags: tagsValue.map((t) => {
                return t.name;
            })
        };

        editPost(props.id, apad);
        handleEditClose();
    };

    const handleTags = () => {
        let buh = props.tags && props.tags.split("#");
        let cigany = [];
        buh && buh.forEach((b) => {
            cigany.push(tags.filter((t) => t.name === b)[0]);
        });

        setTagponpost(cigany);
        setTagsValue(cigany);
    };

    useEffect(() => {
        handleTags();
    }, [props.tags, tags]);

    const [postObject, setPostObject] = useState({})

    // {
    //     id:0,
    //     comments:[],
    //     content:[],
    //     createdAt:"",
    //     privacy:"",
    //     reactions:[],
    //     tags:"",
    //     title:"",
    //     user:{
    //         id:0,
    //         username:"",
    //         profilePicture:"",
    //         bio:"",
    //         created_at:""

    //     }
    

    return (
        <>
            <div className={style.content} onClick={() => {
                getPostById(props.id).then((post) => {
                    setPostObject(post)
                })
                setPostModal(true);
            }}>
                <div style={{ marginRight: "10px" }} onClick={() => gotoProfile(props.authorId)}>
                    <PFP size={{ width: 40, height: 40 }} profilePicture={props.pfp} />
                </div>
                <div className={style.restbruh}>
                    <div className={style.valamiwrapper}>
                        <div className={style.userinfo}>
                            <span className={`${style.username} ${style.userinfospan}`}>{props.username} {props.isBlocked && props.isBlocked ? <span style={{color:"red"}}> - BLOCKED</span> : ""} {props.privacy ? <span style={{ margin: "0px", fontSize: "12px" }}> - {prettifyPrivacy(props.privacy)}</span> : ""}</span>
                            <span className={`${style.timeposted} ${style.userinfospan}`}>{prettifyDate(props.posted_at)}</span>
                        </div>
                        <div className={style.hererakk} ref={dropdownRef} onClick={(event) => openDropdown(event, props.authorId, props)}>
                            <MoreHorizIcon />
                        </div>
                    </div>
                    <div className={style.postcontent}>
                        <h2 className={style.title}>{props.title}</h2>
                        <div className={style.yappingtoncity} ref={contentRef}>
                            {NeedReadMore === true ? renderReadMore() : ""}
                            {props.content}
                        </div>
                        <div className={style.images} style={{ display: props.images && props.images.length === 0 ? "none" : "flex" }}>
                            {props.images && props.images.map((image) => {
                                return <div onClick={(e) => {
                                    e.stopPropagation();
                                    setPictureModal(true);
                                    setPictureToDisplay(image.imageUrl);
                                }} style={{
                                    backgroundImage: `url(${`http://localhost:4400/uploads/${image.imageUrl}`})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    width: '200px',
                                    height: '200px',
                                    position: "relative",
                                    zIndex: 1,
                                    borderRadius: '8px',
                                    cursor: 'pointer'
                                }} />
                            })}
                        </div>
                    </div>
                    <div className={style.tags}>
                        {tagonpost.map((tag) => {
                            return <TAG color={tag.color} name={tag.name} icon={tag.icon} />
                        })}
                    </div>
                    <div className={style.reactionsContainer}>
                        <div className={style.reactions}>
                            <>
                                <div className={style.d} title={`${props.comments && props.comments.length} comments`} onClick={(e) => {
                                    e.stopPropagation();
                                    setCommentModal(true);
                                }}>
                                    <NotesIcon />
                                    {props.comments && props.comments.length}
                                </div>

                                <div className={style.d} title={`${localLike} likes`} onClick={(e) => {
                                    e.stopPropagation();
                                    handleLike(props.id);
                                }}>
                                    {isLiked ? (
                                        <FavoriteIcon />
                                    ) : (
                                        <FavoriteBorderIcon />
                                    )}
                                    {localLike}
                                </div>
                            </>
                        </div>
                    </div>
                </div>
            </div>

            <Modal className={`${style.modalContainer} ${style.kepModal}`} open={pictureModal} onClose={handlePictureModal}>
                <div>
                    {pictureToDisplay && (
                        <div className={style.modalImgContainer}>
                            <img
                                src={`http://localhost:4400/uploads/${pictureToDisplay}`}
                                alt="Post"
                                style={{
                                    maxWidth: '90vw',
                                    maxHeight: '90vh',
                                    objectFit: 'contain',
                                }}
                            />
                        </div>
                    )}
                </div>
            </Modal>
            <Modal open={postModal} onClose={handlePostClose} style={{ zIndex: 101 }} className={style.modalContainer}>
                <PostModalContent open={postModal} setPictureToDisplay={setPictureToDisplay} setPictureModal={setPictureModal} handleLike={handleLike} isLiked={isLiked} setIsLiked={setIsLiked} likes={localLike} comments={props.comments && props.comments.length} {...props} />
            </Modal>

            <Modal open={commentModal} onClose={handleClose} style={{ zIndex: 1010111 }} className={style.modalContainer}>
                <div className={style.innerCommentModal}>
                    <div className={style.commentModalContent}>
                        <div className={style.replyingto}>
                            <div className={style.userRow2}>
                                <div className={style.pfpdiv}>
                                    <PFP profilePicture={props.pfp} size={{ width: 40, height: 40 }} />
                                </div>
                                <div className={style.userrowspans}>
                                    <span style={{height:"min-content", width:"fit-content"}}>{props.title}</span>
                                    <span style={{height:"min-content", width:"fit-content"}} className={style.timeposted}>{props.username}</span>
                                </div>

                            </div>
                        </div>
                        <div className={style.cool_line}/>
                        <div className={style.userRow}>
                            <div className={style.pfpdiv}>
                                <PFP profilePicture={user && user.profilePicture} size={{ width: 40, height: 40 }} />
                            </div>
                            <span>Replying to {props.username}</span>
                        </div>
                        <textarea placeholder="what it do" type="text" value={commentValue} onChange={(e) => {
                            setCommentValue(e.target.value);
                            checkIfValid(e.target.value);
                        }} className={`${style.textarea} ${style.commentValue}`} />
                        <div className={style.buttons}>
                        <Button text="BACK" bgcolor="rgb(255,255,255)" color={"rgb(0,0,0)"} valid={true} onClick={() => {
                            handleClose()
                        }} />
                        <Button text="COMMENT" valid={valid} onClick={() => {
                            if (commentValue !== "") {
                                commentOnPost(props.id, commentValue);
                                handleClose();
                                handleComment();
                            }
                        }} />
                        </div>
                        
                    </div>
                </div>
            </Modal>

            <Modal open={editOpen} onClose={handleEditClose} className={style.modalContainer}>
                <div className={style.containerr}>
                    <div className={style.woah}>
                        <div className={style.pfpdiv}>
                            <PFP size={{ width: 40, height: 40 }} profilePicture={props.pfp} />
                        </div>
                        <div className={style.userRoww}>
                            <span>{props.username}</span>
                            <span className={style.timeposted}>{props.posted_at && prettifyDate(props.posted_at)}</span>
                        </div>
                    </div>
                    <div className={style.contentt}>
                        <div className={style.titlerow}>
                            <input type="text" placeholder="Might have spotted a typo?" className={style.editTitle} value={titleValue} onChange={(e) => setTitleValue(e.target.value)} />
                        </div>
                        <div className={style.text}>
                            <textarea placeholder="Perhaps a minor spelling mistake?" value={contentValue} onChange={(e) => setContentValue(e.target.value)}></textarea>
                        </div>

                        <div className={style.images}>
                            {imagesValue.length !== 0 ? (imagesValue && imagesValue.map((image, index) => {
                                return <div onClick={(e) => {
                                    e.stopPropagation();
                                    setImagesValue(imagesValue.filter((img, i) => i !== index));
                                }} style={{
                                    backgroundImage: `url(${`http://localhost:4400/uploads/${image.imageUrl}`})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    width: '200px',
                                    height: '200px',
                                    position: "relative",
                                    zIndex: 0,
                                    borderRadius: '8px',
                                    cursor: 'pointer'
                                }} />
                            })) : ("Who needs images anyways")}
                        </div>
                        <div className={style.tags}>
                            {tagsValue && tagsValue.map((tag, index) => {
                                return <TAG onClick={() => setTagsValue(tagsValue.filter((tg, i) => index !== i))} name={tag.name} icon={tag.icon} color={tag.color} />
                            })}
                        </div>
                        <div className={style.buttoncont}>
                            <Button onClick={handleEditClose} text="CANCEL" color="white" bgcolor="rgb(0, 81, 255)" valid={true} />
                            <Button onClick={proceedEdit} text="EDIT" bgcolor="rgb(126, 49, 204)" valid={checkIfValidd} />
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default Post;