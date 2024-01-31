import axios from "axios"
import './Edit.css'
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

function Edit(){
    const {id}=useParams()
    const navigate=useNavigate()
    const [val,setVal]=useState({
        task:"",
        data:""
    })
    // http://localhost:7000/task/editTask/65b8c416385e316bcb249f8b
    // http://localhost:7000/task/getDetails/65b8c416385e316bcb249f8b

    const getFullData=async()=>{
        const res=await axios.get(`http://localhost:7000/task/getDetails/${id}`)
        console.log(res.data);
        setVal(res.data)
    }
            useEffect(()=>{
                getFullData()
            },[])

            const getData=(e)=>{
                setVal((prev) => ({ ...prev, [e.target.name]: e.target.value }));
                console.log(val);
            }

            const editData=async(e)=>{
                e.preventDefault()
               const res=await axios.patch(`http://localhost:7000/task/editTask/${id}`,{...val}) 
               console.log(res.data);
               navigate("/")
            }
    return(
        <>
        <div className="editMain">
          <form action="" onSubmit={editData}>
          <input type="text" name="task" placeholder="enter the task" value={val.task} onChange={getData} />
            <input type="date" name="date" value={val.date} onChange={getData}/>
            <button>Edit</button>
          </form>
        </div>
        </>
    )
}

export default Edit