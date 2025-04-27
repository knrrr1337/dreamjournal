import { createContext, useState, useContext, useEffect } from "react";
import {AuthContext} from "../AuthProvider/AuthProvider"
import axios from "axios"

import Blessed from "../../Contexts/TagsProvider/Tags/Blessed";
import Calm from "../../Contexts/TagsProvider/Tags/Calm";
import Confident from "../../Contexts/TagsProvider/Tags/Confident";
import Creative from "../../Contexts/TagsProvider/Tags/Creative";
import Energetic from "../../Contexts/TagsProvider/Tags/Energetic";
import Focused from "../../Contexts/TagsProvider/Tags/Focused";
import Grateful from "../../Contexts/TagsProvider/Tags/Grateful";
import Happy from "../../Contexts/TagsProvider/Tags/Happy";
import Inspired from "../../Contexts/TagsProvider/Tags/Inspired";
import Lovely from "../../Contexts/TagsProvider/Tags/Lovely";
import Motivated from "../../Contexts/TagsProvider/Tags/Motivated";
import Peaceful from "../../Contexts/TagsProvider/Tags/Peaceful";
import Relaxed from "../../Contexts/TagsProvider/Tags/Relaxed";
import Sad from "../../Contexts/TagsProvider/Tags/Sad";

export const PostHandlerContext = createContext();

export function PostHandlerProvider({children}) {
    
    const [csin, setCsin] = useState(0)

    const prettifyDate = (date) => {
        const splitted = date.split("T");
        const datePart = splitted[0].split("-");
        const timePart = splitted[1].split(":");

        const year = datePart[0];
        const month = datePart[1];
        const day = datePart[2];
        const hour = timePart[0];
        const minute = timePart[1];

        let prettyMonth = "";

        switch (month) {
            case "01":
                prettyMonth = "Jan";
                break;
            case "02":
                prettyMonth = "Feb";
                break;
            case "03":
                prettyMonth = "Mar";
                break;
            case "04":
                prettyMonth = "Apr";
                break;
            case "05":
                prettyMonth = "May";
                break;
            case "06":
                prettyMonth = "Jun";
                break;
            case "07":
                prettyMonth = "Jul";
                break;
            case "08":
                prettyMonth = "Aug";
                break;
            case "09":
                prettyMonth = "Sep";
                break;
            case "10":
                prettyMonth = "Oct";
                break;
            case "11":
                prettyMonth = "Nov";
                break;
            case "12":
                prettyMonth = "Dec";
                break;
            default:
                prettyMonth = month;
        }

        return `${year} ${prettyMonth}. ${day} at ${hour}:${minute}`;
    };

    const [dreams, setDreams] = useState(null)
    const [openPostMenu, setOpenPostMenu] = useState(false)
    const {user} = useContext(AuthContext);
    const [mousePos, setMousePos] = useState({})
    const [authorId, setAuthorId] = useState({})
    const [postId, setPostId] = useState(0)
    const [blockedDreams, setBlockedDreams] = useState([])
    const [followedDreams, setFollowedDreams] = useState([])
    const [keyy, setkeyy] = useState(0)
    const [likedPosts, setLikedPosts] = useState([])
    const [mydreams, setMydreams] = useState([])
    const [handleEditOpenFunc, setHandleEditOpenFunc] = useState(() => () => {})
    const [lastWeekTags, setLastWeekTags] = useState([])
    const [popularTags, setPopularTags] = useState([])

    useEffect(() => {
        if (user) {
            getPosts(user.id);
        }
    }, [user]);

    const getPosts = (id) => {
        axios.get(`http://localhost:4400/dream/list-dreams-all/${id}`).then((response) => {
            setDreams(response.data);
        }).catch((error) => console.log(error));

        axios.get(`http://localhost:4400/dream/get-followed/${id}`).then((response2) => {
            setFollowedDreams(response2.data);
        }).catch((error) => console.log(error));

        axios.get(`http://localhost:4400/dream/get-blocked/${id}`).then((response2) => {
            setBlockedDreams(response2.data);
        }).catch((error) => console.log(error));
        axios.get(`http://localhost:4400/dream/user-liked-posts/${id}`).then((response) => {
            setLikedPosts(response.data)
        }).catch((error) => console.log(error))
        axios.get(`http://localhost:4400/dream/get-user-dreams/${id}`).then((response) => {
            setMydreams(response.data)
        }).catch((error) => console.log(error))
        axios.get(`http://localhost:4400/dream/get-trending-tags`).then((response) => {
            setLastWeekTags(response.data)
        }).catch((error) => console.log(error))

        axios.get(`http://localhost:4400/dream/get-popular-tags`).then((response) => {
            console.log(response)
            setPopularTags(response.data)
        }).catch((error) => console.log(error))
    };




    const [postData, setPostData] = useState({})
    const getPostById = (id) => {
        return axios.get(`http://localhost:4400/dream/get-post-by-id/${id}`)
            .then((response) => {
                setPostData(response.data)
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error);
                throw error;
            });
    }

    const likePost = (id) => {
        let likedDream = dreams.filter((dream) => dream.id === id)[0]

        setLikedPosts((prevDream) => [...prevDream, likedDream])
        axios.post(`http://localhost:4400/dream/like-post/${id}`, {userId:user.id, postId:id}).then((response) => {
            // getPosts(user.id)
        }).catch((error) => console.log(error))
    }

    const unLikePost = (id) => {
        let newDreams = dreams.filter((dream) => dream.id !== id)
        setLikedPosts((prevLikedPosts) => prevLikedPosts.filter((post) => post.id !== id))
        axios.post(`http://localhost:4400/dream/remove-like-post/${id}`, {userId:user.id, postId:id}).then((response) => {
            // getPosts(user.id)
        }).catch((error) => console.log(error))
    }

    const commentOnPost = (id, content) => {
        console.log(id + " " + content)
        axios.post(`http://localhost:4400/dream/comment-on-dream/${id}`, {comment:content, userId:user.id}).then((response) => {
            axios.get(`http://localhost:4400/dream/list-dreams-all/${user.id}`).then((response) => {
                setDreams(response.data);
            }).catch((error) => console.log(error));
        }).catch((error) => console.log(error))
    }

    // const createPost = (title, content, publicity, images) => {
    //     console.log(images)
    //     // TODO: megbaszni a kepeket 
    //     console.log(title + " " + content + " " + publicity + " " + user.id)
    //     // axios.post("http://localhost:4400/dream/create-dream", {title:title, content:content, userId:user.id, tags:"", privacy:publicity}).then((response) => {
    //     //     console.log(response)
    //     //     axios.get(`http://localhost:4400/dream/list-dreams-all/${user.id}`).then((response) => {
    //     //         setDreams(response.data)
    //     //     }).catch((error) => console.log(error))
    //     //     axios.get(`http://localhost:4400/dream/get-user-dreams/${user.id}`).then((response) => {
    //     //         setMydreams(response.data)
    //     //     })
            
    //     // }).catch((error) => console.log(error))
    // }
    const createPost = (title, content, publicity, images, tags) => {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("userId", user.id);
        formData.append("privacy", publicity);  
 
        console.log(tags)
        formData.append("tags", tags);
        
        // Append each image with a unique key
        images.forEach((image, index) => {
            formData.append(`images`, image);
        });
    
        axios.post("http://localhost:4400/dream/create-dream", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            console.log(response);
            axios.get(`http://localhost:4400/dream/list-dreams-all/${user.id}`).then((response) => {
                setDreams(response.data);
            }).catch((error) => console.log(error));
            
            axios.get(`http://localhost:4400/dream/get-user-dreams/${user.id}`).then((response) => {
                setMydreams(response.data);
            }).catch((error) => console.log(error));
        }).catch((error) => console.log(error));
    };

    const [postContentt, setPostContentt] = useState({})

    const [editOpen, setEditOpen] = useState(false)
    const handleEditClose = () => {
        setEditOpen(false)
    }

    const editPost = async (id, body) => {
        const formData = new FormData();
        formData.append("title", body.title);
        formData.append("content", body.content);
        formData.append("images", body.images)
        formData.append("tags", body.tags)
        try {
            const response = await axios.put(`http://localhost:4400/dream/edit-dream/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            setTimeout(() => getPosts(user.id), 1500)
            // window.location.reload()
        } catch(error) {
            console.log(error)
        }


    }

    const deletePost = (dreamId) => {
        console.log("DELETING")
        axios.delete(`http://localhost:4400/dream/delete-dream/${dreamId}`).then((response) => {
            axios.get(`http://localhost:4400/dream/list-dreams-all/${user.id}`).then((response1 => {
                setDreams(response1.data)
            })).catch((error) => console.log(error))
            axios.get(`http://localhost:4400/dream/get-user-dreams/${user.id}`).then((response1) => {
                setMydreams(response1.data)
            }).catch((error) => console.log(error))
        }).catch((error) => console.log(error))
    }

    const apad = (authorId, id, handleEditOpen) => {
        setOpenPostMenu(true)
        setAuthorId(authorId)
        setPostId(id)
        setHandleEditOpenFunc(() => handleEditOpen)
    }

    const apad2 = (id) => {
        setOpenPostMenu(true)
        setPostId(id)
    }

    const [isOpen, setIsOpen] = useState(false)

    const anyad = () => {
        setOpenPostMenu(false)
        setIsOpen(false)
    }

    const [tags] = useState([
        {
            name:"Blessed",
            color:"rgb(252, 253, 193)",
            icon:<Blessed size={25} color="rgb(252, 253, 193)"/>
        },
        {
            name:"Confident",
            color:"rgb(61, 227, 196)",
            icon:<Confident size={25} color="rgb(61, 227, 196)"/>
        },
        {
            name:"Creative",
            color:"rgb(24, 5, 192)",
            icon:<Creative size={25} color="rgb(24, 5, 192)"/>
        },
        {
            name:"Sad",
            color:"rgb(177, 8, 70)",
            icon:<Sad size={25} color="rgb(177, 8, 70)"/>
        },
        {
            name:"Energetic",
            color:"rgb(255, 238, 0)",
            icon:<Energetic size={25} color="rgb(255, 238, 0)"/>
        },
        {
            name:"Focused",
            color:"rgb(255, 0, 72)",
            icon:<Focused size={25} color="rgb(255, 0, 72)"/>
        },
        {
            name:"Grateful",
            color:"rgb(80, 204, 229)",
            icon:<Grateful size={25} color="rgb(80, 204, 229)"/>
        },
        {
            name:"Happy",
            color:"rgb(255, 255, 0)",
            icon:<Happy size={25} color="rgb(255, 255, 0)"/>
        },
        {
            name:"Inspired",
            color:"rgb(111, 0, 255)",
            icon:<Inspired size={25} color="rgb(111, 0, 255)"/>
        },
        {
            name:"Lovely",
            color:"rgb(255, 0, 17)",
            icon:<Lovely size={25} color="rgb(255, 0, 17)"/>
        },
        {
            name:"Motivated",
            color:"rgb(0,255,0)",
            icon:<Motivated size={25} color="rgb(0,255,0)"/>
        },
        {
            name:"Peaceful",
            color:"rgb(255, 158, 201)",
            icon:<Peaceful size={25} color="rgb(255, 158, 201)"/>
        },
        {
            name:"Relaxed",
            color:"rgb(126, 168, 186)",
            icon:<Relaxed size={25} color="rgb(126, 168, 186)"/>
        }

    ])

    const [apbt, setApbt] = useState([])
    const [tpbt, setTpbt] = useState([])

    const allPostByTag = (tag) => {
        axios.get(`http://localhost:4400/dream/get-all-post-by-tag/${tag}`).then((response) => {
            setApbt(response.data)
        }).catch((error) => console.log(error))
    }

    const trendingPostByTag = (tag) => {
        axios.get(`http://localhost:4400/dream/get-trending-post-by-tag/${tag}`).then((response) => {
            setTpbt(response.data)
        }).catch((error) => console.log(error))
    }  



    return (
        <PostHandlerContext.Provider key={keyy} value={{postData, setPostData, getPostById, apbt, tpbt, setApbt, setTpbt, allPostByTag, trendingPostByTag, popularTags, lastWeekTags, tags, postContentt, setPostContentt, editOpen, setEditOpen, handleEditClose,getPosts,dreams, isOpen, setIsOpen, apad2, setDreams, getPosts, openPostMenu, apad, anyad, mousePos, setMousePos, authorId, followedDreams, setFollowedDreams, blockedDreams, keyy, likePost, commentOnPost, likedPosts, setLikedPosts, unLikePost, createPost, editPost, deletePost, postId, mydreams, setMydreams, prettifyDate, handleEditOpenFunc}}>
            {children}
        </PostHandlerContext.Provider>
    )

}