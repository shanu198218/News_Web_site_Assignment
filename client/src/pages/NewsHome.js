import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import NewsSection from '../components/NewsSection';
import { db,   } from '../util/firebase';
import "../pages/AdminHome.css"
import { toast } from 'react-toastify';
import SectionNews_User from '../components/SectionNews_User';

const NewsHome = () => {

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

  

  return (
    
    <div class="row-news">
      
  <div class="column-news">
    <div class="card-news"> <SectionNews_User news={news} user={user}  />
    
  </div>
 
  
 
  
  </div>
  
  </div>
  

    
  )
}

export default NewsHome;