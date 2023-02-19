import React from 'react'

import BG from '../Images/404img.gif';

const NotFounded = () => {
  return (
    <div>
         <br></br>
        <br></br>
        <br></br>
        <section id="hire">
                            <div className="topic">
                                <div class="container-fluid">
                                    <div class="Jumbotron jumbotron-fluid">
                                        <div className="container hire">
                                            <br />
                                            <marquee direction="left"><p class="display-3 " style={{ color: '#000080' }}>Sorry ! You Cannot access this Page!....</p></marquee>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                                                <br></br>
    <center>
    <img className="S.gif" src={BG} alt='bg img' style={{ width: "30%", height: "10%", marginTop: "-20px", marginRight: "10px" }} />
    </center>
    </div>
  )
}

export default NotFounded