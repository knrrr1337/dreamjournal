import { TextField, Button } from "@mui/material"
import styles from "./Register.module.css"
import { useState } from "react"
import Person2Icon from '@mui/icons-material/Person2';
import axios from "axios";
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import { useNavigate } from "react-router-dom";
import Tooltip from '@mui/material/Tooltip';

function Register() {

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [profilePicture, setProfilePicture] = useState("")
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const [emailError, setEmailError] = useState(false)
    const [profilePictureUrl, setProfilePictureUrl] = useState("")
    const [alreadyExistingUser, setAlreadyExistingUser] = useState(false);
    const [message, setMessage] = useState("")
    const [usernameError, setUsernameError] = useState(false)

    const handleClick = () => {
        document.getElementById("pfpinput").click()
    }

    const createAccount = () => {

        if (!emailRegex.test(email)) {
            setEmailError(true)
            return
        } 

        if (username.includes(" ")) {
            setUsernameError(true)
            return
        }

        const formData = new FormData();
        formData.append("email", email);
        formData.append("username", username);
        formData.append("password", password);
        if (profilePicture) {
            formData.append("profilePicture", profilePicture); // Attach file
        }

        axios.post("http://localhost:4400/account/register", formData, ).then((response) => {
            console.log(response)
            if (response.data == "") {
                navigate("/login")
            } else {
                setMessage(response.data)
                setAlreadyExistingUser(true)
            }
        }).catch((error) => console.log(error))

    }

    const handleRightClick = (e) => {
        e.preventDefault()
        setProfilePicture(null)
    }

    return (
        <>
        <div className={styles.registerPage}>
            <div className={styles.registerCard}>
                <h1>Register</h1>
                <div className={styles.pfpwrapper}>
                    <Tooltip title="Click to set a profile picture. Image should be 1:1 aspect ratio for best representation. Right click to remove." arrow>    
                    <input
                        type="file"
                        accept="image/*"
                        id="pfpinput"
                        style={{height:"0px", width:"0px"}}
                        onChange={(e) => {setProfilePicture(e.target.files[0])}}
                    />
                    <div className={styles.pfp} onClick={handleClick} onContextMenu={handleRightClick}>
                        {profilePicture ? <img src={URL.createObjectURL(profilePicture)} className={styles.pfpimg} alt="" srcset="" /> : <Person2Icon sx={{color:"white", height:"100px", width:"100px", margin:"14px"}}/>}
                    </div>
                    </Tooltip>
                </div>

                <div className={styles.textfields}>
  
                    <TextField
                        className={styles.textfield}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'white', // Base border color
                                },
                                '&:hover fieldset': {
                                    borderColor: 'white', // Hover border color
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'white', // Active border color
                                },
                            },
                            '& .MuiInputLabel-root': {
                                color: 'white', // Base label color
                            },
                            '&:hover .MuiInputLabel-root': {
                                color: 'white', // Hover label color
                            },
                            '& .Mui-focused': {
                                '& .MuiInputLabel-root': {
                                    color: 'white', // Active label color
                                },
                            },
                            '& .MuiInputBase-input': {
                                color: 'white', // Base text color
                            },
                            '&:hover .MuiInputBase-input': {
                                color: 'white', // Hover text color
                            },
                            '& .Mui-focused': {
                                '& .MuiInputBase-input': {
                                    color: 'white', // Active text color
                                },
                            },
                        }}
                        label="Email Address"
                        value={email}
                        autoComplete={false}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        className={styles.textfield}
                        sx={{
                              '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'white', // Base border color
                                },
                                '&:hover fieldset': {
                                    borderColor: 'white', // Hover border color
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'white', // Active border color
                                },
                            },
                            '& .MuiInputLabel-root': {
                                color: 'white', // Base label color
                            },
                            '&:hover .MuiInputLabel-root': {
                                color: 'white', // Hover label color
                            },
                            '& .Mui-focused': {
                                '& .MuiInputLabel-root': {
                                    color: 'white', // Active label color
                                },
                            },
                            '& .MuiInputBase-input': {
                                color: 'white', // Base text color
                            },
                            '&:hover .MuiInputBase-input': {
                                color: 'white', // Hover text color
                            },
                            '& .Mui-focused': {
                                '& .MuiInputBase-input': {
                                    color: 'white', // Active text color
                                },
                            },
                        }}
                        label="Username"
                        autoComplete={false}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        className={styles.textfield}
                        sx={{
                              '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'white', // Base border color
                                },
                                '&:hover fieldset': {
                                    borderColor: 'white', // Hover border color
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'white', // Active border color
                                },
                            },
                            '& .MuiInputLabel-root': {
                                color: 'white', // Base label color
                            },
                            '&:hover .MuiInputLabel-root': {
                                color: 'white', // Hover label color
                            },
                            '& .Mui-focused': {
                                '& .MuiInputLabel-root': {
                                    color: 'white', // Active label color
                                },
                            },
                            '& .MuiInputBase-input': {
                                color: 'white', // Base text color
                            },
                            '&:hover .MuiInputBase-input': {
                                color: 'white', // Hover text color
                            },
                            '& .Mui-focused': {
                                '& .MuiInputBase-input': {
                                    color: 'white', // Active text color
                                },
                            },
                        }}
                        label="Password"
                        autoComplete={false}
                        value={password}
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                </div>
                <div className={styles.login}>
                    <Button  variant="contained" className={styles.registerButton} onClick={createAccount}>CREATE ACCOUNT</Button>
                    <p onClick={() => {navigate("/login")}}>Already have an account?</p>
                </div>
                
            </div>
            <Snackbar
                open={alreadyExistingUser}
                autoHideDuration={5000}
                message={message}
                
            />
            <Snackbar
                open={emailError}
                autoHideDuration={5000}
                message="Please provide a valid email address."
                
            />
            <Snackbar
                open={usernameError}
                autoHideDuration={5000}
                message="Username must not contain whitespace."
            />
        </div>
        </>
    )
}

export default Register