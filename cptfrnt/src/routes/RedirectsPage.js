import { useEffect, useState } from "react"
import { Cookies } from "react-cookie"

const RedirectsPage = () => {
    const [cont,setCont] = useState([])

    cookie.get("user") !== null??axios.get("http://localhost:5000/Student/Courses/"+cookie.get("user").data._id).then(res=>{
            setCont(res.data)
        }).catch(err=>{
            console.log(err)
        })

    return(
        <section className="redirectWrapper">
            {
                cont.length>0 ? "No data available":
                cont.map(el=>{
                    return(
                        <div className="courseCont">

                        </div>
                    )
                })
            }
        </section>
    )
}

export default RedirectsPage