import { useContext } from "react"
import style from "./TagSelector.module.css"
import { PostHandlerContext } from "../../Contexts/PostHandlerProvider/PostHandlerProvider"
import TAG from "../../Contexts/TagsProvider/Tags/TAG"

function TagSelector({setSelectedTagIndex}) {

    const {tags} = useContext(PostHandlerContext)

    return (
        <>
        <div className={style.innerModal}>
            {tags.map((tag, index) => {
                return <TAG onClick={() => {
                    setSelectedTagIndex(index)
                }} icon={tag.icon} color={tag.color} name={tag.name}/>
            })}
        </div>
        </>
    )
}

export default TagSelector;