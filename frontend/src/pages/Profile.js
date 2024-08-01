import React, { useState } from "react";
import Cookies from "js-cookie"
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

import { FaShare, FaUser, FaLayerGroup } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";


function Profile() {
    const { user, changeUserAvatar } = useAuth()
    const [avatar, setAvatar] = useState(null);

    const handleUpload  = async (e) => {
        e.preventDefault();

        if (avatar) {
            let formData = new FormData();
            formData.append('avatar', avatar);

            try {
                const response = await axios.post('/api/v1/upload-avatar', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${Cookies.get('Access_token')}`,
                        'Refresh-Token': Cookies.get('Refresh_token')
                    },
                });

                changeUserAvatar(response.data.buffer)
                setAvatar(null)
                console.log('Avatar uploaded successfully:', response.data);
            } catch (error) {
                console.error('Error uploading avatar');
            }
        }
        else {
            console.error('Error no file uploading');
        }
    };

    return (
        <div className="profile">
            <div className="side-bar">
                <form className="user-information" onSubmit={handleUpload}>
                    <img src={`data:image/*;base64,${user.avatar}`} alt="User Avatar" />
                    <input  type="file" accept=".jpg,.jpeg,.png" onChange={(e) => setAvatar(e.target.files[0])} 
                        id="file-input"
                        style={{display: 'none'}}
                    />
                    {   
                        avatar ?
                        <button type="submit">Upload</button>
                        :
                        <button type="button" onClick={() => document.getElementById('file-input').click()}>Edit</button>
                    }
                </form>

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