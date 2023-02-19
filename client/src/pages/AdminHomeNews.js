import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import NewsSection from '../components/NewsSection';
import { db,   } from '../util/firebase';
import "../pages/AdminHome.css"
import { toast } from 'react-toastify';

const AdminHomeNews = () => {

  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "Article"),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() })
        });
        setNews(list);
      }, (error) => {
        console.log(error)
      }
    );
    return () => {
      unsub();
    }
  }, []);

  console.log("news", news);

  const handleDelete = async (id) => {
    if(window.confirm("Are you sure ? ")){
      try{
        setLoading(true);
        await deleteDoc(doc (db, "Article", id));
        toast.success("News Post deleted added");
        setLoading(false);
      }catch (err){
        console.log(err);
      }
    }
  }


  return (
    
    <div class="row-news">
      
  <div class="column-news">
    <div class="card-news"> <NewsSection news={news} user={user} handleDelete={handleDelete} />
    
  </div>
 
  
 
  
  </div>
  
  </div>
  

    
  )
}

export default AdminHomeNews