import style from "./LeftSideBar.module.css"

import { useNavigate } from 'react-router-dom';
import { useContext, useRef, useEffect, useState } from 'react';
import { AuthContext } from '../../..//Contexts/AuthProvider/AuthProvider';
import Person2Icon from '@mui/icons-material/Person2';
import axios from 'axios';
import { TextField } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import NotesIcon from '@mui/icons-material/Notes';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import Modal from '@mui/material/Modal';
import PFP from "../../PFP/PFP";
import { UserContext } from "../../../Contexts/UserProvider/UserProvider";
import ULI from "../../UserListItem/ULI";
import { PostHandlerContext } from "../../../Contexts/PostHandlerProvider/PostHandlerProvider";
import SoGoodHadToDoItTwice from "../../GoatedPostMenu/SoGoodHadToDoItTwice";


function LeftSideBar({width=300}) {

    const navigate = useNavigate()
    const {user, setUser} = useContext(AuthContext)
    const {blockedUsers, followedUsers, followers} = useContext(UserContext)
    const {isOpen, setIsOpen} = useContext(PostHandlerContext)
    const [modalOpen, setModalOpen] = useState(false)
    const [which, setWhich] = useState("")

    const gotoProfile = (id) => {
        if (user) {
            navigate(`/profile/${id}`)
        }
    }

    const logout = () => {
        localStorage.clear()
        sessionStorage.clear()
        navigate("/login")
        window.location.reload()
    }

    const gotoHome = () => {
        navigate("/app")
    }


    const handleClose = () => setModalOpen(false)

    const [followType, setFollowType] = useState("followed")
    const [mousePos, setMousePos] = useState({})
    const dropdownRef = useRef(null);



    const baszos = (event) => {
         setIsOpen(true)
         console.log(isOpen)
    }

    const [baszosId, setBaszosId] = useState(0) 

    return (

        <div className={style.sideBar} style={{width:`${width}px`}}>
            <div className={style.headerContent}>
                <div className={style.logo} onClick={gotoHome}>
                    <img src="/icon_white.png"></img>
                </div>
                <div className={style.profileBar} onClick={() => gotoProfile(user.id)}>
                    <div style={{marginRight:"10px"}}>
                        <PFP size={{width:40, height:40}} profilePicture={user && user.profilePicture}/>

                    </div>
                    <div className={style.username}>
                        {user && user.username}
                    </div>
                </div>
                <div className={style.optionswrapper}>
                    <ul className={style.optionsul}>
                        {/* <li className={style.option} >
                            <NotesIcon className={style.asd}/>
                            <span>My notes</span>
                        </li> */}
                        <li className={style.option} onClick={() => {
                            setModalOpen(true)
                            setWhich("followers")
                        }}>
                            <RecentActorsIcon className={style.asd}/>
                            <span>Follows</span>
                        </li>
                        <li className={style.option} onClick={() => {
                            setModalOpen(true)
                            setWhich("blocks")
                        }}>
                            <div className={style.asd}>
                                <img src="/blockedlist.png" alt="" />
                            </div>
                            <span>Blocked</span>
                        </li>
                        <li className={`${style.option} ${style.logout}`} onClick={logout}>
                            <LogoutIcon className={style.asd}/>
                            <span>Log Out</span>
                        </li>
                    </ul>
                </div>

            </div>
            <Modal open={modalOpen} className={style.modalContainer} onClose={handleClose}>
                <>
                <div className={style.innerModal}>
                    <div className={style.hererak}>
                    {which === "followers" ? (
                        <div>
                            <div className={style.followMenu} style={{borderBottom: (followers.length === 0 || followedUsers.length === 0) ? "2px solid rgb(49, 44, 85)" : ""}}>
                                <h2 style={{borderBottom: followType === "followed" ? "2px solid rgb(255,255,255)" : ""}} className={`${style.h2} ${style.followMenuType}`} onClick={() => setFollowType("followed")}>Followed <span className={style.size}>({followedUsers.length})</span></h2>
                                <h2 style={{borderBottom: followType === "follower" ? "2px solid rgb(255,255,255)" : ""}} className={`${style.h2} ${style.followMenuType}`} onClick={() => setFollowType("follower")}>Followers <span className={style.size}>({followers.length})</span></h2>
                            </div>
                            <div className={style.userList}>
                                {followType === "follower" ? (
                                    <>
                                    {followers.map((user, index) => {
                                        return <ULI isFirst={index === 0} gotoProfile baszodId={user.id} setBaszosId={setBaszosId} baszos={baszos} setMousePos={setMousePos} isLast={index + 1 === followers.length} pfp={user.profilePicture} username={user.username} joined_at={user.created_at}/>
                                    })}
                                    </>
                                ) : (
                                    <>
                                    {followedUsers.map((user, index) => {
                                        return <ULI isFirst={index === 0} gotoProfile={gotoProfile} baszodId={user.id} setBaszosId={setBaszosId} baszos={baszos} setMousePos={setMousePos} isLast={index + 1 === followedUsers.length} pfp={user.profilePicture} username={user.username} joined_at={user.created_at}/>
                                    })}
                                    </>)}
                            </div>
                            
                                
                        </div>
                        ):(
                        <div>
                            <div className={style.followMenu} style={{borderBottom: "2px solid rgb(49,44,75)"}}>
                                <h2  className={`${style.h2} ${style.blockh2}`}>Blocked users<span className={style.size}>({blockedUsers.length})</span></h2>
                            </div>
                            {blockedUsers.map((user, index) => {
                                
                                return <ULI isFirst={index === 0} gotoProfile={gotoProfile} baszodId={user.id} setBaszosId={setBaszosId} isLast={index + 1 === blockedUsers.length} setMousePos={setMousePos} baszos={baszos} pfp={user.profilePicture} username={user.username} joined_at={user.created_at}/>
                            })}
                        </div>
                    )}
                    </div>
                </div>
                <SoGoodHadToDoItTwice isOpen={isOpen} baszosId={baszosId} baszos={baszos} dropdownRef={dropdownRef} mousePos={mousePos}/>
                </>
            </Modal>

        </div>

    )
}

export default LeftSideBar;