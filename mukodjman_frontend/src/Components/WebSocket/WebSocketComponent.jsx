import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../Contexts/UserProvider/UserProvider';
import { PostHandlerContext } from '../../Contexts/PostHandlerProvider/PostHandlerProvider';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';

function WebSocketComponent() {
    const [socket, setSocket] = useState(null);
    const {user} = useContext(AuthContext)
    const {getPosts} = useContext(PostHandlerContext)

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:4400/ws");
        

        ws.addEventListener("open", (event) => {
            console.log("Connected to WebSocket server");
            ws.send("Hello Server!");
        });

        ws.addEventListener("message", (event) => {
            console.log(event)
            if (event.data.includes("getpostsforuser")) {
                let id = Number(event.data.split("-")[1])
                if (user.id !== id) {
                    console.log("getting posts by id :)))")
                    getPosts(user.id)
                }
            }
            if (event.data === "getposts") {
                console.log("getting posts")
                getPosts(user.id)
                return;
            } 
            
            console.log("Message from server:", event.data);
        });

        setSocket(ws);

        return () => {
            ws.close();
        };
        

    }, [user]); // Empty dependency ensures this runs once on mount.

    window.addEventListener("beforeunload", () => {
        sendMessage("invalidateSession")
    })

    const sendMessage = (msg) => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(msg);
            console.log("Message sent");
        } else {
            console.log("WebSocket is not open yet");
        }
    };

    return (
        <>
        
        </>
    );
}

export default WebSocketComponent;