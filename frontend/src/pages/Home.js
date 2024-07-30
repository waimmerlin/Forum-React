import React, {useState} from "react";
import Cookies from "js-cookie"
import axios from "axios";

function Home() {
    const [avatar, setAvatar] = useState(null);
    const [preview, setPreview] = useState(null);
    const [imageSrc, setImageSrc] = useState(null); 

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatar(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpload  = async (e) => {
        e.preventDefault();
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
            console.log('Avatar uploaded successfully:', response.data);
        } catch (error) {
            console.error('Error uploading avatar:', error);
        }
    };


    const handleFetchAvatar = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get('/api/v1/upload-avatar', {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('Access_token')}`,
                    'Refresh-Token': Cookies.get('Refresh_token')
                },
            });

            setImageSrc(response.data);
        } catch (error) {
            console.error('Error uploading avatar:', error);
        }
    };

    return (
        <div className="avatar-upload-container">
            <h1>Upload Avatar</h1>
            <form onSubmit={handleUpload}>
                <div className="avatar-preview">
                    {preview ? <img src={preview} alt="Avatar Preview" /> : <div className="placeholder">Avatar Preview</div>}
                </div>
                <br />
                <input type="file" accept=".jpg,.jpeg,.png" onChange={handleImageChange} />
                <br />
                <button type="submit">Upload Avatar</button>
            </form>
            <br />
            <h1>Fetch Avatar</h1>
            <form onSubmit={handleFetchAvatar}>
                {imageSrc && <img src={imageSrc} alt="Fetched" />}
                <br />
                <button type="submit">Fetch Avatar</button> 
            </form>
        </div>
    );
}
export default Home