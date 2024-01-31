import { useEffect, useState } from 'react';
import './Main.css'
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import axios from 'axios';
import { Link } from 'react-router-dom';

function Main(){
  // http://www.localhost:7000/task/addtask
 

  const [val,setVal]=useState({
    task:"",
    date:"",
    completed:false
  })

  const [datas,setDatas]=useState([])
  const [filterValue, setFilterValue] = useState('All');

  const getData=(e)=>{
    setVal((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // console.log(val);
  }

  const getFullData=async()=>{
    const res=await axios.get("http://localhost:7000/task/gettask")
    // console.log(res.data);
    setDatas(res.data)
}
useEffect(()=>{
  getFullData()
},[])



  const addData=async(e)=>{
    e.preventDefault()
      try {
        const res=await axios.post("http://localhost:7000/task/addtask",{...val})
        // console.log(res.data);
        getFullData()
       window.location.reload()
      } catch (error) {
        console.log("error",error);
      }
  }



 


  const delTask = async (id) => {
    try {
      const confirmed = window.confirm("Are you sure you want to delete this staff member?");

      if (confirmed) {
        const res = await axios.delete(`http://localhost:7000/task/deltask/${id}`);
        // console.log("deleted", res.data);
        // GetPerson(); // Corrected from getAllstaff
        getFullData()
      }
    } catch (error) {
      console.error(error);
    }
  };


  const updateTask = async (id, completed) => {
    try {
      const res = await axios.patch(`http://localhost:7000/task/editTask/${id}`, {
        completed: !completed,
      });
      // console.log(res.data);
      getFullData();
    } catch (error) {
      console.log("error", error);
    }
  };

  const compltedTask=(e)=>{
    setFilterValue(e.target.value);
  }

    return(
        <>
          <div className="maindiv">
        <div className="heading">
          <h2>My Todo</h2>
        </div>
        <div className="input-fields">
          <div>
           <form action="" onSubmit={addData}> 
           <input type="text" placeholder='Enter The Task' name='task' onChange={getData} />
          <input type="date" placeholder='Enter The date' name='date' onChange={getData} />
          <button>Add</button></form>
          </div>
        </div>
        <div className="select_boxes" >
          <select name="" id="" onChange={compltedTask}>
            <option value="All">All</option>
            <option value="Completed">Completed</option>
            {/* <option value="">Active</option>
            <option value="">Has due date</option> */}
          </select>
          <select name="" id="">
            <option value="">Added date</option>
            <option value="">Due Date</option>
         
          </select>
        </div>
        {/* */}
     <div className="daaataaasMain">

          {
          datas.filter((data) => filterValue === 'All' || (filterValue === 'Completed' && data.completed))
                      .map((data, index) => (
                        <div className="datas" key={index}>
                        <div className="data-left">
                <input type="checkbox"  onChange={() => updateTask(data._id, data.completed)} /><span>{data.task}</span>
                </div>
                <div className="data-right">
                <MdDelete className='icon' onClick={() => delTask(data._id)}/>
              <Link to={`/edit/${data._id}`}> <MdEdit className='icon' /></Link>
                <div>{data.date}</div>
                </div>
              </div>
                      ))
            }

     </div>
     </div>
        </>
    )
}

export default Main