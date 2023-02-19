import React from 'react'

import { Link } from "react-router-dom"

import { excerpt } from '../util';


const SectionNews_User = ({ news, user, handleDelete }) => {
    return (

        <div >

            <div className="blog-heading text-start py- mb-5" style={{ color: "white" ,textAlign: "center", fontWeight: "200px", fontSize: "130px", backgroundColor: " #dd1344" }}>Articles</div>

            {news?.map((item) => (
                <div className="row pb-5" key={item.id}>
                    <div className="col-md-5">
                        <div className="hover-blogs-img">
                            <div className="blogs-img">
                                <img src={item.imgUrl} alt={item.imgUrl} />

                                <div></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="text-start">
                            <span className="title py-2" style={{ width: "300%", color: "#000080" }}>{item.topic}</span>
                            <p className="short-description " style={{ width: "300%", textAlign: "left" }}>{excerpt(item.desc, 125)}</p>
                            <br></br>


                        </div>

                    </div>


                    <Link to={`/detail/${item.id}`}>
                        <button className="btn btn-read" style={{ width: "15%", float: "left" }}>Show More</button>
                    </Link>










                </div>
            ))}
        </div>
    )
}

export default SectionNews_User;