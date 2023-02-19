import React, { useState, useEffect } from "react";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../util/firebase";
import { useNavigate } from "react-router-dom";
import { async } from "@firebase/util";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";


const initialState = {
  topic: "",
  desc: ""

}



const AddEditNews = ({ user, setActive }) => {

  const [form, setForm] = useState(initialState);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);

  const navigate = useNavigate();
  const { topic, desc } = form;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

  };



  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on("state_changed", (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
        switch (snapshot.state) {
          case "paused": console.log("upload is paused");
            break;
          case "running": console.log("Upload is running");
            break;
          default: break;
        }
      }, (error) => {
        console.log(error)
      },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            toast.info("Image successfully added");
            setForm((prev) => ({ ...prev, imgUrl: downloadUrl }));

          });
        })
    }


    file && uploadFile();
  }, [file])


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (topic && desc && file) {
      try {
        await addDoc(collection(db, "Article"), {
          ...form,
          timestamp: serverTimestamp(),
        });
        toast.success("News Post successfully added");
      } catch (err) {
        console.log(err);
      }
    }

    navigate("/adminHome");
  }


  return (

    <div className="container-fluid mb-4">
      <div className="container">
        <div className="col-12">
          <div className="text-center heading py-2">

          </div>
        </div>
        <div className="row h-100 justify-content-center align-items-center">
          <div className="col-10 col-md-8 col-lg-6">
            <form className="row blog-form" onSubmit={handleSubmit} >
              <div className="col-12 py-3">
                <input
                  type="text"
                  className="form-control input-text-box"
                  placeholder="Topic"
                  name="topic"
                  value={topic}
                  onChange={handleChange}
                />
              </div>



              <div className="col-12 py-3">
                <textarea
                  className="form-control description-box"
                  placeholder="Description"
                  value={desc}
                  name="desc"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
              <div className="col-12 py-3 text-center">
                <button
                  className="btn btn-add"
                  type="submit"

                  disabled={progress !== null && progress < 100}
                >Submit

                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddEditNews