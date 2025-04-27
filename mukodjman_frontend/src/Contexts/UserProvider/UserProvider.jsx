import {createContext, useContext, useEffect, useState } from "react"
import { AuthContext } from "../AuthProvider/AuthProvider"
import {PostHandlerContext} from "../PostHandlerProvider/PostHandlerProvider"
import axios from "axios"
import { isRouteErrorResponse, UNSAFE_getSingleFetchDataStrategy } from "react-router-dom"

export const UserContext = createContext()

export function UserProvider({children}) {

    const {user} = useContext(AuthContext)
    const {authorId, setFollowedDreams, dreams, getPosts} = useContext(PostHandlerContext)
    const [followedUsers, setFollowedUsers] = useState([])
    const [followers, setFollowers] = useState([])
    const [blockedUsers, setBlockedUsers] = useState([])
    
    useEffect(() => {   
        if (user) {
            axios.get(`http://localhost:4400/user/get-followed-users/${user.id}`).then((response) => {
                setFollowedUsers(response.data)
            }).catch((error) => console.log(error))
    
            axios.get(`http://localhost:4400/user/get-blocked-users/${user.id}`).then((response) => {
                setBlockedUsers(response.data)
            }).catch((error) => console.log(error))

            axios.get(`http://localhost:4400/dream/user-liked-posts/${user.id}`).then((response) => {
                
            }).catch((error) => console.log(error))
            axios.get(`http://localhost:4400/user/get-users-following-user/${user.id}`).then((response) => {
                setFollowers(response.data)
            }).catch((error) => console.log(error))

            // TODO: megcsinalni hogy ha followed a user, akkor unfollow jelenjen meg :)))))
        }
    },[user])

    const blockUser = (userToBlock) => {
        axios.post("http://localhost:4400/user/block-user", {userId:user.id, authorId:authorId}).then((response) => {
            axios.get(`http://localhost:4400/user/get-blocked-users/${user.id}`).then((response2) => {
                setBlockedUsers(response2.data)
                getPosts(user.id)
            }).catch((error) => console.log(error))
        }).catch((error) => console.log(error))
    }

    const blockUser2 = (blockingId) => {
        axios.post("http://localhost:4400/user/block-user", {userId:user.id, authorId:blockingId}).then((response) => {
            axios.get(`http://localhost:4400/user/get-blocked-users/${user.id}`).then((response2) => {
                setBlockedUsers(response2.data)
                getPosts(user.id)
            }).catch((error) => console.log(error))
        }).catch((error) => console.log(error))
    }

    const followUser = (userToFollow) => {
        axios.post("http://localhost:4400/user/follow-user", {userId:user.id, userToBeFollowedId:authorId}).then((response) => {
            axios.get(`http://localhost:4400/dream/get-followed/${user.id}`).then((response2) => {
                setFollowedDreams(response2.data);
                // getPosts(user.id)
            }).catch((error) => console.log(error));
            axios.get(`http://localhost:4400/user/get-followed-users/${user.id}`).then((response) => {
                console.log(response.data)
                setFollowedUsers(response.data)
                // getPosts(user.id)
            }).catch((error) => console.log(error))
        }).catch((error) => console.log(error))
    }

    const unfollowUser2 = (id) => {
        axios.post(`http://localhost:4400/user/unfollow-user/${user.id}`, {userId: user.id, userToBeFollowedId:id}).then((response) => {
            console.log("response.data");
            axios.get(`http://localhost:4400/dream/get-followed/${user.id}`).then((response2) => {
                setFollowedDreams(response2.data);
                
            }).catch((error) => console.log(error));
            axios.get(`http://localhost:4400/user/get-followed-users/${user.id}`).then((response) => {
                setFollowedUsers(response.data)
            }).catch((error) => console.log(error))
            // setFollowedUsers(response.data)
        })
    }

    const followUser2 = (id) => {
        axios.post("http://localhost:4400/user/follow-user", {userId:user.id, userToBeFollowedId:id}).then((response) => {
            axios.get(`http://localhost:4400/dream/get-followed/${user.id}`).then((response2) => {
                setFollowedDreams(response2.data);
                // getPosts(user.id)
            }).catch((error) => console.log(error));
            axios.get(`http://localhost:4400/user/get-followed-users/${user.id}`).then((response) => {
                console.log(response.data)
                setFollowedUsers(response.data)
                // getPosts(user.id)
            }).catch((error) => console.log(error))
        }).catch((error) => console.log(error))
    }

    const isUserFollowed = () => {
        return user && followedUsers.some((user) => user.id === authorId)
        
    }

    const isUserBlocked = (diddyId) => {

        return blockedUsers.some((userr) => userr.id === diddyId)
    }

    const isUserFollowed2 = (userId) => {
        return followedUsers.some((user) => user.id === userId)
    }
    
    const unFollowUser = (userToUnfollow) => {
        axios.post(`http://localhost:4400/user/unfollow-user/${user.id}`, {userId: user.id, userToBeFollowedId:authorId}).then((response) => {
            console.log("response.data");
            axios.get(`http://localhost:4400/dream/get-followed/${user.id}`).then((response2) => {
                setFollowedDreams(response2.data);
                
            }).catch((error) => console.log(error));
            axios.get(`http://localhost:4400/user/get-followed-users/${user.id}`).then((response) => {
                setFollowedUsers(response.data)
            })
            // setFollowedUsers(response.data)
        })
    }

    const unblockUser = (diddyId) => {
        axios.post(`http://localhost:4400/user/unblock-user`, {userId:user.id, authorId:diddyId}).then((response) => {
            console.log(response)
            axios.get(`http://localhost:4400/user/get-blocked-users/${user.id}`).then((response2) => {
                setBlockedUsers(response2.data)
                getPosts(user.id)
            }).catch((error) => console.log(error))
        }).catch((error) => console.log(error))
    }

    return <UserContext.Provider value={{unfollowUser2, followUser2, blockUser,blockUser2, isUserBlocked, followers, followUser, followedUsers, blockedUsers, unblockUser, isUserFollowed, unFollowUser, isUserFollowed2}}>
            {children}
        </UserContext.Provider>
}