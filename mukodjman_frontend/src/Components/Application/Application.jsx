import { useNavigate } from 'react-router-dom';
import style from './Application.module.css';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import Person2Icon from '@mui/icons-material/Person2';
import axios from 'axios';
import Post from './Post/Post';
import { TextField } from '@mui/material';
import LeftSideBar from './Sidebar/LeftSideBar';
import { PostHandlerContext } from '../../Contexts/PostHandlerProvider/PostHandlerProvider';
import GoatedPostMenu from '../GoatedPostMenu/GoatedPostMenu';
import RightSideBar from './Sidebar/RightSideBar';
import Feed from "../Feed/Feed"
import WebSocketComponent from '../WebSocket/WebSocketComponent';
import Footer from '../Footer/Footer';

function App() {

    const navigate = useNavigate()
    const {user, setUser, rememberMe} = useContext(AuthContext)
    const [feedType, setFeedType] = useState("foryou")
    const {dreams, setDreams, getPosts, openPostMenu, anyad, followedDreams, blockedDreams, keyy} = useContext(PostHandlerContext)

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

        // axios.get("http://localhost:4400/dream/list-dreams-all").then((response) => {
        //     setDreams(response.data)
        //     console.log(response.data)
        // })

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



    return (
    <>
    <div className={style.content}>
        <div className={style.sidebarwrapper}>
            <LeftSideBar/>
        </div>

        <main className={style.main}>
            <div className={style.feedType}>
                <div className={style.feedItem} style={feedType === "foryou" ? {borderBottom:"2px solid rgba(255,255,255, 1)", borderRadius:"3px"} : {borderBottom:"2px solid rgba(255,255,255, 0)", borderRadius:"3px"}} onClick={() => changeFeed("foryou")}>
                    For You
                </div>
                <div className={style.feedItem} style={feedType === "following" ? {borderBottom:"2px solid rgba(255,255,255,1 )", borderRadius:"3px"} : {borderBottom:"2px solid rgba(255,255,255, 0)", borderRadius:"3px"}} onClick={() => changeFeed("following")}>    
                    Following
                </div>
            </div>
            <div className={style.nonabsolutecontent}>
                <Feed feedType={feedType} setFeedType={setFeedType}/>
            </div>            
        </main>
        <div className={style.sidebarwrapper}>
            <RightSideBar/>
        </div>
        
        
    </div>
    <Footer/>
    <GoatedPostMenu open={openPostMenu}/>
    </>
    )

}

export default App;