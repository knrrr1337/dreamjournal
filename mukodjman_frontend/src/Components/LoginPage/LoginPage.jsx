import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import styles from './LoginPage.module.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, FormControlLabel, FormGroup, Radio, TextField } from '@mui/material';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // const [rememberMe, setRememberMe] = useState(false);
    const { login, rememberMe, setRememberMe } = useContext(AuthContext);

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(username, password, rememberMe, () => navigate("/app"));
        // navigate("/app")
    };

    const sendToRegister = () => {
        navigate("/register")
    }

    return (
        <div className={styles.loginPage}>
            <div className={styles.loginCard}>
                <h1>Welcome Back</h1>
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
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        className={styles.textfield}
                        autoComplete='off'
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
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className={styles.checkbox}>
                    <Checkbox value={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} sx={{
                        color:'white',
                    }}></Checkbox>
                    <span>Remember me?</span>
                </div>
                <div className={styles.login}>
                    <Button id="button"  variant="contained" className={styles.loginButton} onClick={handleSubmit}>LOGIN</Button>
                    <p onClick={sendToRegister}>Don't have an account yet?</p>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;