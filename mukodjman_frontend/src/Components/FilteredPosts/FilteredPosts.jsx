import { useNavigate, useParams } from "react-router-dom";
import LeftSideBar from "../Application/Sidebar/LeftSideBar";
import RightSideBar from "../Application/Sidebar/RightSideBar";
import style from "./FilteredPosts.module.css";
import { useContext, useEffect, useState } from "react";
import { PostHandlerContext } from "../../Contexts/PostHandlerProvider/PostHandlerProvider";
import Post from "../Application/Post/Post";
import GoatedPostMenu from "../GoatedPostMenu/GoatedPostMenu";
import { UserContext } from "../../Contexts/UserProvider/UserProvider";
import Footer from "../Footer/Footer";
import TAG from "../../Contexts/TagsProvider/Tags/TAG";
import { Hidden } from "@mui/material";

function FilteredPosts(props) {

    const {param} = useParams()
    const navigate = useNavigate()
    const [paramTags, setParamTags] = useState([])
    const {apbt, tpbt, allPostByTag, trendingPostByTag, tags, setApbt, setTpbt} = useContext(PostHandlerContext)
    const {isUserBlocked} = useContext(UserContext)
    useEffect(() => {
        let p = param.split("-")
        let params = ""
        let tempParamTags = []
        
        for (let i = 0; i < p.length - 1; i++) {
            if (i === p.length - 1) {
                params += p[i]
            } else {
                params += p[i] + "-"
            }
            tempParamTags.push(p[i])
        }
        setParamTags(tempParamTags)
        if (p[p.length - 1] === "trending") {
            trendingPostByTag(params)
        } else {
            allPostByTag(params)
        }
            
    }, [param])

    const handleTagRemoval = (tagName) => {
        // Filter out the tag that was clicked from the paramTags array
        const updatedTags = paramTags.filter(tag => tag !== tagName);
        setParamTags(updatedTags); // Update the paramTags state
        // Update the URL by navigating to the new URL with the updated tag list
        let newParam = updatedTags.join("-");
    
        // Check if param includes "trending" or "popular" for navigation
        const isTrending = param.includes("trending");
        const isPopular = param.includes("popular");
    
        if (isPopular) {
            if (newParam) {
        
                navigate(`/filter/${newParam}-popular`);
            } else {
                navigate(`/filter/none-popular`);
            }
        } else if (isTrending) {
            if (newParam) {
                navigate(`/filter/${newParam}-trending`);
            } else {
                navigate(`/filter/none-trending`);
            }
        } else {
            // Default fallback case if neither is found (e.g., if the param is malformed)
            navigate(`/filter/none-trending`);
        }
    };

    useEffect(() => {
        console.log("param")
        console.log(param)
        console.log('param')
    }, [param])

    useEffect(() => {
        allPostByTag()
        if ((paramTags.length === 0 && paramTags[0] === "none") || paramTags.length === 0) {
            console.log("setting bruh")
            setApbt([])
            setTpbt([])
        }
    }, [paramTags])

    const [triggerRemove, setTriggerRemove] = useState("")

    return (
        <>
        <div className={style.content}>
            <div className={style.sidebarwrapper}>
                <LeftSideBar/>
            </div>
            <main className={style.main}>
                <div className={style.filteringFor}>

                {param.includes("trending") ? (
                        <>
                        <span>Filtering posts within the last 7 days for tags: </span>
                        <div className={style.filteringTags}>
                        {paramTags[0] === "none" ? "no tags selected" : ""}
                            {tags.map((tag) => {
                                if (paramTags.includes(tag.name)) {
                                    return <TAG icon={tag.icon} onClick={() => {
                                        handleTagRemoval(tag.name)
                                        setTriggerRemove(tag.name)
                                    }} name={tag.name} color={tag.color}/>
                                }
                            })}
                        </div>
                        </>
                        ) : (
                            <>
                            <span>Filtering all posts for tags:</span>
                            <div className={style.filteringTags}>
                                {paramTags[0] === "none" ? "no tags selected" : ""}
                                {tags.map((tag) => {
                                    if (paramTags.includes(tag.name)) {
                                        return <TAG icon={tag.icon} onClick={() => {
                                            handleTagRemoval(tag.name)
                                            setTriggerRemove(tag.name)
                                        }} name={tag.name} color={tag.color}/>
                                    }
                                })}
                            </div>
                            </>
                        )} 
                </div>
                <div className={style.postswrapper}>
                    <div className={style.posts}>
                    {param.split("-")[param.split("-").length - 1] === "trending" ? (
                        tpbt.length === 0 ? (
                            <div>No posts with selected tag(s)</div>
                        ) : (
                            
                            tpbt.map((dream) => {
                                // if (param.includes("none") || isUserBlocked(dream.user.id)) {
                                //     return null;
                                // }
                                console.log(dream)
                                return (
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
                                        isBlocked={isUserBlocked(dream.user.id)}
                                    />
                                );
                            })
                        )
                    ) : (
                        apbt.length === 0 ? (
                            
                            <div>No posts with selected tag(s)</div>
                        ) : (
                        apbt.map((dream) => {
                            // if (param.includes("none") || isUserBlocked(dream.user.id)) {
                            //     return null;
                            // }
                            return (
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
                                    isBlocked={isUserBlocked(dream.user.id)}
                                />
                            );
                        }))
                    )}
                        {/* {param.split("-")[param.split("-").length - 1] === "trending" ? (
                            tpbt.length === 0 ? () : ()
                            // tpbt.map((dream) => {
                            //     if (param.includes("none")) {
                            //         return;
                            //     }
                            //     if (isUserBlocked(dream.user.id)) {
                            //         return;
                            //     }
                            //     return <Post
                            //         key={dream.id}
                            //         id={dream.id}
                            //         authorId={dream.user.id}
                            //         pfp={dream.user.profilePicture}
                            //         username={dream.user.username}
                            //         title={dream.title}
                            //         content={dream.content}
                            //         posted_at={dream.createdAt}
                            //         comments={dream.comments}
                            //         reactions={dream.reactions}
                            //         images={dream.images}
                            //         tags={dream.tags}
                            //     />
                            // })
                        ) : (
                            apbt.map((dream) => {
                                
                                if (param.includes("none")) {
                                    return;
                                }
                                if (isUserBlocked(dream.user.id)) {
                                    return;
                                }
                                return <Post
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
                            })
                        )} */}
                    </div>
                </div>

            </main>
            <div className={style.sidebarwrapper}>
                <RightSideBar triggerRemove={triggerRemove} paramTags={paramTags} param={param}/>            
            </div>

        </div>
        <GoatedPostMenu/>
        <Footer/>

        </>
    )

}

export default FilteredPosts;