import React, { useState, useRef } from 'react'
import axios from 'axios';
import './Api.css'
import 'boxicons'

export default function App() {
  
  const [img1, setImage1] = useState(null)
  const [img2, setImage2] = useState(null)
  const [loading, setLoading] = useState(false);
  const [resultImage, setResultImage] = useState(null);
  const inputFileRef1 = useRef(null);
  const inputFileRef2 = useRef(null);

  const handleImageUpload1 = (event) => {
    const file = event.target.files[0];
    const fileURL = URL.createObjectURL(file);

    const img = new Image();
    img.onload = () => {
      setImage1({ file, url: fileURL });
    };
    img.onerror = () => {
      console.error("Error loading cloth image"); 
    };
    img.src = fileURL;

  }

  const handleImageUpload2 = event => {
    const file = event.target.files[0];
    const fileURL = URL.createObjectURL(file);
    
    const img = new Image();
    img.onload = () => {
      setImage2({ file, url: fileURL });
    };
    img.onerror = () => {
      console.error("Error loading cloth image"); 
    };
    img.src = fileURL;
  };

  const handleApiCall = async () => {
    if (!img1 || !img2) {
      alert("Please upload both image and cloth.");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append('cloth', img1.file); 
    formData.append('image', img2.file); 
  
    try {
      const response = await axios.post('https://glowing-polite-porpoise.ngrok-free.app/change_cloth', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setResultImage(`data:image/jpeg;base64, ${response.data}`);
      console.log("API Response (typeof):", response.data, typeof response.data); 
      console.log("API Response Data:", response.data);
    } catch (error) {
      console.error('Error while making API call', error);
    }finally {
      setLoading(false);
    }
  };

  const handleClick1 = () => {
    inputFileRef1.current.click();
  }

  const handleClick2 = () => {
    inputFileRef2.current.click();
  }

  return (
    <>
    <div className="main-container">
      <div className="container">
        <input type="file" ref={inputFileRef1} id="file1" accept="image/*" hidden onChange={handleImageUpload1}></input>
        <div className="img-area" data-img="">
          {img1 && <img src={img1.url} alt="Selected" />}
          <i className='bx bxs-cloud-upload icon'></i>
          <h3>Upload Cloth</h3>
          <p>Image size must be less than <span>2MB</span></p>
        </div>
        <button className="select-image" onClick={handleClick1}>Select Cloth</button>
      </div>

      <div className="container">
        <input type="file" ref={inputFileRef2} id="file2" accept="image/*" hidden onChange={handleImageUpload2}></input>
        <div className="img-area" data-img="">
          {img2 && <img src={img2.url} alt="Selected" />}
          <i className='bx bxs-cloud-upload icon'></i>
          <h3>Upload Image</h3>
          <p>Image size must be less than <span>2MB</span></p>
        </div>
        <button className="select-image" onClick={handleClick2}>Select Image</button>
      </div>

      <div className="container-image">
        <input type="file" ref={inputFileRef2} id="file2" accept="image/*" hidden onChange={handleImageUpload2}></input>
        <div className="img-area" data-img="">
          {loading && <box-icon name='loader-circle' animation='spin' ></box-icon> || <img src={resultImage} />}
          <i className='bx bxs-cloud-upload icon'></i>
          <h3>Result</h3>
        </div>
      </div>
    </div>
    {img1 && img2 && <button className="submit-button" onClick={handleApiCall}>Submit</button>}
    </>
  )
}