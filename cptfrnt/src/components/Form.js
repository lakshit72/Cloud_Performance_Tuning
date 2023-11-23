import { useState } from "react"
import Axios from "axios"

const Form = () => {
    const [file , Setfile] = useState(null)

    const handelClick = () => {
        let frm = new FormData()
        frm.append("Batch","6")
        frm.append("Year","2022")
        frm.append("Degree","BTech CSE")
        frm.append("CourseName","Mathematics")
        frm.append("Type","Content")
        frm.append("file",file)
        Axios.post("http://20.219.215.210:1000/FileUploads",frm).then(res=>{
            console.log(res)
        }).catch(err=>{
            console.log(err)
        })
    }

    return(
        
        <form>
            <input type="file" onChange={(e)=>Setfile(e.target.files[0])} />
            <button type="button" onClick={handelClick}>click</button>
        </form>
    )
}

export default Form