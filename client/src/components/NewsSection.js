import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from "react-router-dom"
import FontAwsome from "react-fontawesome";
import { excerpt } from '../util';


const NewsSection = ({ news , user, handleDelete}) => {
    return (

        <div >

            <div className="blog-heading text-start py- mb-5" style={{}}>News</div>
     
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
                            <span className="title py-2" style={{width:"300%"}}>{item.topic}</span>
                            <p className="short-description "style={{width:"300%" , textAlign:"left"}}>{excerpt(item.desc, 125)}</p>
                            <br></br>
                            
                            
                        </div>
                        
                    </div>
                    
                    <FontAwsome
                        name="edit"
                        style={{ cursor: "pointer" }}
                        size="2x" />
                    <Link to={`/detail/${item.id}`}>
                    <button className="btn btn-read" style={{ width: "15%", float:"left" }}>Show More</button>
                    </Link>
                    &nbsp;
                    <Link to={`/update/${item.id}`}>
                     <a className="btn btn-warning" style={{ fontSize: 'medium', width:"15%", height:"147%" , marginLeft:"-30%", marginTop:"-11%" }}  >
                                            <i class="fas fa-edit" style={{ fontSize: 'medium' }} ></i> &nbsp;
                                            Edit
                                        </a>
                    </Link>
                   
                                        &nbsp;

                                        <button className="btn btn-danger" onClick={() => handleDelete(item.id)} style={{ fontSize: 'medium' ,fontSize: 'medium', width:"15%", height:"22%" , marginLeft:"55%", marginTop:"-8.5%"  }} >
                                            <i className="fas fa-trash-alt" style={{ fontSize: 'medium' }}></i>&nbsp;Delete

                                        </button>
                    

                   



                    
                </div>
            ))}
        </div>
    )
}

export default NewsSection