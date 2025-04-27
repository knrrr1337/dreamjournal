import style from "./Feed.module.css"
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import Person2Icon from '@mui/icons-material/Person2';
import axios from 'axios';
import Post from '../Application/Post/Post';
import { Modal, TextField } from '@mui/material';
import LeftSideBar from '../Application/Sidebar/LeftSideBar';
import { PostHandlerContext } from '../../Contexts/PostHandlerProvider/PostHandlerProvider';
import GoatedPostMenu from '../GoatedPostMenu/GoatedPostMenu';
import RightSideBar from '../Application/Sidebar/RightSideBar';
import Button from "../Button/Button";
import PFP from "../PFP/PFP";
import IUB from "../ImageUploadButton/IUB";
import TagsButton from "../TagsButton/TagsButton";
import TAG from "../../Contexts/TagsProvider/Tags/TAG";
import TagSelector from "../TagSelector/TagSelector";



function Feed({feedType, setFeedType}) {

    const navigate = useNavigate()
    const {user, setUser, rememberMe} = useContext(AuthContext)
    const {dreams, setDreams, getPosts, openPostMenu, anyad, followedDreams, blockedDreams, keyy, createPost, tags} = useContext(PostHandlerContext)

    const logout = () => {
        localStorage.clear()
        sessionStorage.clear()
        navigate("/login")
    }

    const sortByDate = () => {

        return dreams && dreams.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
    }

    useEffect(() => {
        if (rememberMe) {
            if (localStorage.getItem("user") !== null) {
                setUser(JSON.parse(localStorage.getItem("user")))
            }
            getPosts(JSON.parse(localStorage.getItem("user")).id)

        }

        sortByDate()
        

    }, [])

    const csin = () => {
    
        console.log(sortByDate())
    }

    const gotoProfile = () => {
        navigate(`/profile`)
    }

    const changeFeed = (feed) => {
        setFeedType(feed)
    }

    useEffect(() => {
        let mainelement = document.querySelector("main")
        mainelement.addEventListener("scroll", () => {
            anyad()
        })
    }, [openPostMenu])

    useEffect(() => {
        filterOutBlockedDreams();
    }, [blockedDreams]);
    
    const filterOutBlockedDreams = () => {
        if (blockedDreams && dreams) {
            const blockedUserIds = blockedDreams.map(dream => dream.user.id);
            const filteredDreams = dreams.filter(dream => !blockedUserIds.includes(dream.user.id));
            setDreams(filteredDreams)   

        }
    }

    const [postContent, setPostContent] = useState("")
    const [titleContent, setTitleContent] = useState("")
    const [valid, setValid] = useState(false)

    const checkIfValid = (title, value) => {
        setValid(title.trim() !== "" && value.trim() !== "");
    }

    const [publicity, setPublicity] = useState("PUBLIC")
    const [images, setImages] = useState([])
    const [postTags, setPostTags] = useState([])
    const [imageUrls, setImageUrls] = useState([]);

    useEffect(() => {
        // Create object URLs when images array changes
        const urls = images.map(image => URL.createObjectURL(image));
        setImageUrls(urls);
    
        // Cleanup function to revoke URLs when component unmounts or images change
        return () => {
            urls.forEach(url => URL.revokeObjectURL(url));
        };
    }, [images]);

    const [tagsSelector, setTagsSelector] = useState(false)
    const handleTagsClose = () => {
        setTagsSelector(false)
    }


    const addTag = (e) => {
        if (postTags.length === 3) {
            setTagsSelector(false)
            alert("Can not add more than 3 tags.")
            return;
        }

        if (postTags.includes(tags[e])) {
            setTagsSelector(false)
            return;
        }
        setPostTags(prev => [...prev, tags[e]])
        handleTagsClose()
    }

    const [selectedTagIndex, setSelectedTagIndex] = useState(-1)



    useEffect(() => {
        if (selectedTagIndex !== -1) addTag(selectedTagIndex) 
        console.log(postTags)
    },[selectedTagIndex])
    
    
    return (
        <>
        <div className={style.createPost}>
                    <div className={style.postpfpcont} onClick={() => {navigate(`/profile/${user.id}`)}}>
                        <PFP size={{width: 40, height:40}} profilePicture={user && user.profilePicture}/>
                    </div>
                    <div className={style.restbruh}>
                        <div className={style.textareawrapper}>
                            <div className={style.lengthCounter}>
                                <span style={{color: titleContent.length > 50 ? "red" : "white"}}>{titleContent.length}/50</span>
                            </div>
                            
                            <input value={titleContent} onChange={(e) => {
                                setTitleContent(e.target.value)
                                checkIfValid(e.target.value, postContent)
                            }} className={style.title} type="text" placeholder="Catchy title"/>
                            <textarea className={style.textarea} value={postContent} onChange={(e) => {
                                setPostContent(e.target.value)
                                checkIfValid(titleContent, e.target.value)
                            }} placeholder='What did you dream about?'/>
                            <div className={style.images} style={{display: images.length === 0 ? "none" : "flex"}}>
                                {images.map((image, index) => {
                                    // TODO: diveknek berakni background imagebe
                                    return <div style={{
                                        backgroundImage: `url(${imageUrls[index]})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        width: '200px',
                                        height: '200px',
                                        borderRadius: '8px',
                                        cursor: 'pointer'
                                    }} onClick={() => setImages(images.filter((_, i) => i !== index))}/>
                                    // return <img key={index} onClick={() => setImages(images.filter((_,i) => i !== index))} className={style.image} src={URL.createObjectURL(image)}/>
                                })}
                            </div>
                            <div className={style.tags}>
                                {postTags.map((tag, index) => {
                                    try {
                                        return <TAG onClick={() => {setPostTags(postTags.filter((pt, i) => index !== i))}} name={tag.name} color={tag.color} icon={tag.icon}/>

                                    } catch(error) {
                                        
                                    }
                                })}
                            </div>
                        </div>
                        <div className={style.postrow}>
                            <div className={style.postrowhelper}>
                                <TagsButton onClick={() => setTagsSelector(true)}/>
                                <IUB setImages={setImages} images={images} onClick={() => {console.log("image")}}/>
                                <select className={style.publicitySelector} value={publicity} onChange={(e) => setPublicity(e.target.value)}>
                                    <option value="PUBLIC" onClick={(e) => setPublicity(e.target.value)}>Public</option>
                                    <option value="FOLLOWERS_ONLY" onClick={(e) => setPublicity(e.target.value)}>Follower-only</option>
                                    <option value="PRIVATE" onClick={(e) => setPublicity(e.target.value)}>Private</option>
                                </select>
                                <Button valid={valid} text="POST" onClick={() => {
                                    
                                    if (titleContent.length  > 50) {
                                        alert("Title cant be more than 100 characters long")
                                        return;
                                    }
                                    let taga = postTags.map((t) => t.name)
                                    createPost(titleContent, postContent, publicity, images, taga)
                                    setValid(false)
                                    setPostContent("")
                                    setTitleContent("")
                                    setImages([])
                                    setImageUrls([])
                                    setPostTags([])
                                    
                                    
                                }}/>
                            </div>
         
                        </div>
                    </div>
                </div>
                <div className={style.dreams}>
                    {feedType === "foryou" ? (
                        dreams && dreams.map((dream) => (
                            
                            <Post
                                key={dream.id}
                                id={dream.id}
                                authorId={dream.user.id}
                                pfp={dream.user.profilePicture}
                                username={dream.user.username}
                                title={dream.title}
                                content={dream.content}
                                posted_at={dream.createdAt}
                                comments={dream.comments}
                                reactions={dream.reactions}
                                images={dream.images}
                                tags={dream.tags}
                            />

                        ))
                    ) : (
                        followedDreams && followedDreams.map((dream) => (
                            <Post
                                key={dream.id}
                                id={dream.id}
                                authorId={dream.user.id}
                                pfp={dream.user.profilePicture}
                                username={dream.user.username}
                                title={dream.title}
                                content={dream.content}
                                posted_at={dream.createdAt}
                                comments={dream.comments}
                                reactions={dream.reactions}
                                images={dream.images}
                            />
                        ))
                    )}
                    {feedType === "following" && followedDreams.length === 0 ? <div style={{paddingTop:"20px"}}>You currently don't follow anyone.</div> : <div></div>}
                </div>
                <Modal className={style.modalContainer} open={tagsSelector} onClose={handleTagsClose}>
                    <>
                    <TagSelector setSelectedTagIndex={setSelectedTagIndex}/>
                    </>
                </Modal>


        </>
    )
}

export default Feed;