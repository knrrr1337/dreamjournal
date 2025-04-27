import { useContext, useEffect } from "react"
import style from "./Profile.module.css"
import { AuthContext } from "../../../Contexts/AuthProvider/AuthProvider"
import axios from "axios"
import LeftSideBar from "../Sidebar/LeftSideBar"
import RightSideBar from "../Sidebar/RightSideBar"
import Person2Icon from '@mui/icons-material/Person2';
import Feed from "../../Feed/Feed"
import { useState } from "react"
import Post from "../Post/Post"
import GoatedPostMenu from "../../GoatedPostMenu/GoatedPostMenu"
import { PostHandlerContext } from "../../../Contexts/PostHandlerProvider/PostHandlerProvider"
import PFP from "../../PFP/PFP"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { useRadioGroup } from "@mui/material"
import { UserContext } from "../../../Contexts/UserProvider/UserProvider"
import Button from "../../Button/Button"
import Footer from "../../Footer/Footer"


function Profile () {


    const {id} = useParams()


    const navigate = useNavigate();
    const {user, setUser} = useContext(AuthContext)
    const {isUserFollowed2, isUserBlocked, blockedUsers} = useContext(UserContext)
    const {prettifyDate} = useContext(PostHandlerContext)
    const [userdreams, setUserdreams] = useState([])
    const [profileUser, setProfileUser] = useState({})
    const [warnUser, setWarnUser] = useState(false)




    useEffect(() => {
        setWarnUser(isUserBlocked(Number(id)))
    }, [blockedUsers, id])

    useEffect(() => {
        
        let userid 
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            userid = JSON.parse(storedUser).id
            // setUser(JSON.parse(storedUser));

        }


        let userrr

        axios.get(`http://localhost:4400/user/get-user/${id}`).then((response) => {
            setProfileUser(response.data)
            userrr = response.data
            axios.get(`http://localhost:4400/dream/get-user-dreams/${id}`).then((response2) => {
                let a = []
                console.log('rrr')
                console.log(isUserFollowed2(userrr.id))
                response2.data.forEach((r) => {
                    console.log(r)
                    if (r.privacy === "PUBLIC") {a.push(r)}
                    if (r.privacy === "FOLLOWERS_ONLY" && ((user && r.user.id === user.id) || (userrr && isUserFollowed2(userrr.id)))) {a.push(r)}
                    if (r.privacy === "PRIVATE" && user && user.id === userrr.id) {a.push(r)}
                    
                })
                
                setUserdreams(a)
    
            })
        })

    }, [id, user])







    return (
        <>
        
           <div className={style.content}>
                <div className={style.sidebarwrapper}>
                    <LeftSideBar/>
                </div>
                <main className={style.main}>
                    <div className={style.profile_container}>
                        <div className={style.pfp_name}>
                            <div className={style.pfp_container}>
                                <PFP size={{width:100, height:100}} profilePicture={profileUser.profilePicture}/>
                                
                                
                            </div>
                            <div className={style.desc}>
                                <span className={style.username}>{profileUser && profileUser.username}{isUserBlocked(Number(id)) ? <span style={{color:"RED"}}> - BLOCKED</span> : ""}</span>
                                <span className={style.joined}>{`joined on ${profileUser.created_at && prettifyDate(profileUser.created_at)}`}</span>
                                <span className={style.bio}>{profileUser && profileUser.bio}</span>    
                            </div>
                        </div>
                    </div>
                    <div className={style.post_container}>
                        {(warnUser) ? (
                            <div className={style.warnUser}>
                                <span className={style.warnUserText}>You have blocked {profileUser.username}. Do you wish to view their posts?</span>
                                <Button text="Proceed" bgcolor={"rgb(255,0,0)"} onClick={() => setWarnUser(false)} valid={true}/>
                            </div>
                        ) : (
                        <>
                        {userdreams.length === 0 ? <div>{profileUser.username} not posted anything</div> : ""}
                        {userdreams.map((dream) => {
                            // {console.log(dream)}
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
                                privacy={dream.privacy}
                                images={dream.images}
                                tags={dream.tags}
                            ></Post>
                        })}
                        </>)}
                        
                    </div>
                </main>
                <div className={style.sidebarwrapper}>
                    <RightSideBar/>

                </div>
            </div> 
            <Footer/>

            {profileUser.id && profileUser.id === user.id ? (<GoatedPostMenu/>) : (<GoatedPostMenu/>)}
        </>
    )

}

export default Profile