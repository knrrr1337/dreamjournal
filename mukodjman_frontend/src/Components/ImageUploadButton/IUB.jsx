import { useThemeProps } from "@mui/material";
import style from "./IUB.module.css"
import ImageIcon from '@mui/icons-material/Image';

function IUB(props) {
    
    const csin = () => {
        if (props.images.length == 4) {
            alert("Can not upload more than 4 images")
            return;
        }
        props.onClick()
        document.getElementById("imageupload").click()
    }

    return (
        <>
            <div className={style.container} onClick={csin}>
                <div className={style.iconContainer}>
                    <ImageIcon sx={{fill:"#0349fc"}} className={style.icon}/>
                    <input
                        type="file"
                        accept="image/*"
                        id="imageupload"

                        style={{height:"0px", width:"0px"}}
                        onChange={(e) => {
                            let file = e.target.files[0]
                            if (file) {
                                props.setImages(prevImages => [...prevImages, file])}}
                            }
                    />
                </div>
                <span>Image</span>
            </div>
        </>
    )
}

export default IUB;