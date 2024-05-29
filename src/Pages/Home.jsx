import axios from 'axios';
import React, {  useContext, useEffect, useState } from 'react';
import { mycontext } from '../App';
const Home = () => {
  const [userData,setUserdata]=useContext(mycontext)
  // const [data,setData]=useState([])
  useEffect(()=>{
      fetchData()
  },[])
  const fetchData=async()=>{
setUserdata(userData)
  }
    return (
        <>
        <div className="row row-cols-1 row-cols-sm-3 g-4 m-2 ">
        {userData.map((ele,index)=>{
return(
    <div className="col " key={index}>

<div className="card h-100  mb-3">
  <div className="card-header card row  g-0 fw-bolder "><div className="col">Book: </div>
  <div className="col text-success  ">{ele.title}</div></div>
  
  <img src={ele.cover_image} className="card-img" alt="mmm" />
  <div className="card-body ">
  <div className="card-title row row-cols-2"><div className="col lab">Author:</div>
  <div className="col">{ele.author}</div> </div>
  <div className="card-title row row-cols-2"><div className="col lab">ISBN No:</div>
  <div className="col">{ele.isbn}</div> </div>

    <div className="card-text row row-cols-2"><div className="col lab">Publication Year: </div>
    <div className="col">{ele.publication_year}</div></div>
    <div className="card-text row row-cols-2"><div className="col lab">Genre: </div>
    <div className="col">{ele.genre.join(',')}</div></div>

    <div className="card-text row row-cols-2"><div className="col lab">Description: </div>
    <div className="col">{ele.description}</div></div>
   

  </div>
</div>
    </div>

)

})}
        </div>



</>
    );
};

export default Home;