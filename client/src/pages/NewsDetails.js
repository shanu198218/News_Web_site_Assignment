import { async } from '@firebase/util';
import { deleteDoc, doc, getDoc } from 'firebase/firestore';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../util/firebase';
import FontAwesome from "react-fontawesome";

const NewsDetails = (setActive) => {

  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    id && getNewsDetails();
  }, [id])

  const getNewsDetails = async () => {
    const docRef = doc(db, "Article", id)
    const newsDetails = await getDoc(docRef);
    setNews(newsDetails.data());
    setActive(null);
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure ? ")) {
      try {
        setLoading(true);
        await deleteDoc(doc(db, "Article", id));
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (

    <div className="single" >
      &nbsp;
      &nbsp;
      <div className="blog-title-box" style={{ backgroundImage: `url('${news?.imgUrl}')` }}>


        <div className='blog-title'>
          <span>{news?.timestamp.toDate().toDateString()}</span>

        </div>
      </div>
      <div className='container-fluid pb-4 padding blog-single-content'>
        <div className='container padding'>
          <div className='row mx-0'>
            <div className='col-md-8'>
              <br></br>
              <h1 className='blog-heading text-start py- mb-5' style={{ display: "inline-block", textAlign: "center", fontFamily: "sans-serif", color: "navy", fontSize: "500%", fontWeight: "400px" }}>{news?.topic}</h1>

              <p className='text-start'>{news?.desc}</p>


            </div>

          </div>
        </div>
      </div>

    </div>

  )
}

export default NewsDetails