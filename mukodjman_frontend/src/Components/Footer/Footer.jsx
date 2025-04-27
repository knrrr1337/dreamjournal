import { useNavigate } from "react-router-dom";
import style from "./Footer.module.css"
import LeftSideBar from "../Application/Sidebar/LeftSideBar";
import MenuIcon from '@mui/icons-material/Menu';
import StyleIcon from '@mui/icons-material/Style';
import { useState } from "react";
import RightSideBar from "../Application/Sidebar/RightSideBar";

function Footer(props) {

    const navigate = useNavigate()
    const [left, setLeft] = useState(-275)
    const [right, setRight] = useState(-275)

    const isOverlayVisible = left === 0 || right === 0;

    const closeAll = () => {
        setLeft(-275);
        setRight(-275);
    };

    return (
        <>
        <footer className={style.footer}>
            <div className={style.mobileFooter}>
                <div 
                    className={`${style.overlay} ${isOverlayVisible ? style.active : ''}`}
                    onClick={closeAll}
                />
                <div className={style.left} style={{left:`${left}px`}}>
                <div className={style.sidebarcontainer}>
                        <LeftSideBar width={275}/>
                    </div>
                </div>
                <div className={style.wrapper}>
                    <MenuIcon onClick={() => {left === 0 ? setLeft(-275) : setLeft(0)}} className={style.icon}/>
                </div>
                <div className={style.wrapper}>
                    <img onClick={() => navigate("/app")} className={style.logo} src="/icon_white.png" alt="" />
                </div>
                <div className={style.wrapper}>
                    <StyleIcon onClick={() => {right === 0 ? setRight(-275) : setRight(0)}} className={style.icon}/>
                </div>
                <div className={style.right} style={{right:`${right}px`}}>
                    <div className={style.sidebarcontainer}>
                        <RightSideBar width={275}/>
                        {/* <button onClick={() => {setRight(-275)}}>BUTON</button> */}
                    </div>
                </div>

            </div>
        </footer>
        </>
    )
}

export default Footer;