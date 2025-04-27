import { useContext, useEffect, useState } from "react";
import style from "./RightSideBar.module.css"
import { PostHandlerContext } from "../../../Contexts/PostHandlerProvider/PostHandlerProvider";
import TAG from "../../../Contexts/TagsProvider/Tags/TAG";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../../Contexts/UserProvider/UserProvider";
import { Modal } from "@mui/material";
import TagSelector from "../../TagSelector/TagSelector";

function RightSideBar({width=300, param, triggerRemove, paramTags}) {

    const navigate = useNavigate()
    const {lastWeekTags, popularTags, tags, allPostByTag, trendingPostByTag} = useContext(PostHandlerContext)


    const [lwtList, setLwtList] = useState([])
    const [ptList, setPtList] = useState([])

    const convertTags = (l,setL) => {
        let temp = []
        // Object.entries(lastWeekTags).forEach(([key, value]) => {
        //     const matchingTags = tags.filter((tag) => tag.name === key);
        //     temp.push(matchingTags[0]);
        // });
        l.map((lwt) => {
            temp.push(tags.filter((tag) => tag.name === lwt)[0])
        })
        setL(temp)
    }

    
    

    useEffect(() => {
        convertTags(lastWeekTags, setLwtList)
    }, [lastWeekTags])

    useEffect(() => {
        convertTags(popularTags, setPtList)
    }, [popularTags])

    const [isOpen, setIsOpen] = useState(false)

    const handleClose = () => {
        setIsOpen(false)
    }

    const gotoTrending = () => {

    };

    const [selectedTagIndex, setSelectedTagIndex] = useState(-1)
    const [tagsfilter, setTagsfilter] = useState([])

    const [tagsToSearchWith, setTagsToSearchWith] = useState([])

    const addTag = (index) => {

        let tag = tags.find((_, index2) => index2 === index);
        
        if (!tag) return;
    
        // Compute the new tagsToSearchWith before updating state
        if (tagsToSearchWith.length === 3) {
            alert("Can not filter with more than 3 tags.");
            return;
        }
        if (tagsToSearchWith.includes(tag)) {
            tagsToSearchWith.filter((tag))
        };

        const updatedTags = [...tagsToSearchWith, tag];
    
        // Update state
        setTagsToSearchWith(updatedTags);
    
        // Now we can use the updated array to navigate
        // let tagparam = params.split("-")[0]
        console.log(param)
        let tagsParam = updatedTags.map(tag => tag.name).join("-");
        try {
            let pp = param.split("-")
            if (pp[pp.length - 1] === "popular") {
                console.log(tagsParam)
                trendingPostByTag(tagsParam)
                navigate(`/filter/${tagsParam}-popular`);
            } else {
                allPostByTag(tagsParam)
                navigate(`/filter/${tagsParam}-trending`);
            }
        } catch (error) {
            navigate(`/filter/${tagsParam}-all`);

        }
    };

    useEffect(() => {
        setTagsToSearchWith(tagsToSearchWith.filter((tag) => tag.name !== triggerRemove))
    }, [triggerRemove])

    useEffect(() => {
        if (selectedTagIndex !== -1) addTag(selectedTagIndex)

    },[selectedTagIndex])

    useEffect(() => {
        console.log(paramTags)
        if (paramTags && ((paramTags.length === 0 && paramTags[0] === "none") || paramTags.length === 0)) {
            console.log("setting bruh")
            setTagsToSearchWith([])
        }
    }, [paramTags])

    return (
        <>
        <div className={style.contentt} style={{width:`${width}px`}}>
            <div className={style.tagsWrapper}>
                <div className={style.tagsContainer}>
                    <h4 className={style.h} onClick={() => {
                        setTagsToSearchWith([])
                        navigate(`/filter/none-trending`)
                        }}>Trending tags</h4>
                    <div className={style.tags}>
                        {lwtList.length === 0 ? (<div>No posts with tags in the last 7 days.</div>) : (lwtList.map((tag) => {
                            return <TAG onClick={() => {
                                trendingPostByTag(tag.name)
                                navigate(`/filter/${tag.name}-trending`)
                            }} name={tag.name} color={tag.color} icon={tag.icon}/>
                        }))}
                    </div>
                </div>
                <div className={style.tagsContainer}>
                    <h4 className={style.h} onClick={() => {
                        setTagsToSearchWith([])
                        navigate("/filter/none-popular")
                        }}>All-time tags</h4>
                        <div className={style.tags}>
                            {ptList.map((tag) => {
                                return <TAG onClick={() => {
                                    allPostByTag(tag.name)
                                    navigate(`/filter/${tag.name}-popular`)
                                }} name={tag.name} color={tag.color} icon={tag.icon}/>
                            })}
                        </div>
                </div>
                <div onClick={() => setIsOpen(true)} style={{padding:15, cursor:"pointer"}} className={style.tagsContainer}>
                    <h4 className={style.h} style={{border:0, margin:0, padding:0}}>Browse all tags</h4>
                </div>
            </div>
        </div>
        <Modal open={isOpen} onClose={handleClose} className={style.modalContainer}>
            <>
            <TagSelector setSelectedTagIndex={setSelectedTagIndex}/>
            </>
        </Modal>
        
        </>
    )
}

export default RightSideBar;