import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";

import { FaShare, FaUser, FaLayerGroup  } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";


function Profile() {
    const {user} = useAuth()

    return (
        <div className="profile">
            <div className="side-bar">
                <div className="user-information">
                    <img src={`data:image/*;base64,${user.avatar}`} alt="User Avatar" />
                    <button>Edit</button>                    
                </div>

                <button className="share-profile" onClick={() => navigator.clipboard.writeText(`http://localhost:3000/profile/${user.id}`)}>Share <FaShare /></button>
            </div>
            <div className="user-details"> 
                <div className="details">
                    <span><FaUser /> Username: {user.username}</span>
                    <span><FaLayerGroup /> Role: {user.role}</span>
                    <span><MdDateRange /> CreatAt: {user.registerDate.slice(0, 10)}</span>                    
                </div>
                <div className="statistic" >
                    Sympathy: 11
                    Likes: 333
                    Posts: 6666
                    Trophies: 228
                    Follows: 7777
                    Followers: 1337
                </div>
            </div>
        </div>
    )
}
export default Profile