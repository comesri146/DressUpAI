import React, { useState, useRef, useContext, useEffect } from 'react';
import { AuthContext } from '../Context/Auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Api.css'
import 'boxicons'

export default function App() {

  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  console.log("isAuthenticated:", isAuthenticated)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);


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
    } finally {
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
      <div className='flex-initial justify-center items-center m-auto pt-[5%]'>
        <div className='grid grid-cols-3 gap-4 h-[60vh] w-full p-4 text-center'>
          <div className="bg-gray-100 rounded-lg">
            <input type="file" ref={inputFileRef1} id="file1" accept="image/*" hidden onChange={handleImageUpload1}></input>
            <div className="border-2 rounded-lg border-dashed m-4 h-[50vh]" data-img="">
              {img1 ? <img src={img1.url} alt="Selected" style={{ objectFit: 'contain', width: '100%', height: '100%' }} /> :
                <>
                  <p className='p-4 font-bold text-2xl'>Upload Cloth</p>
                  <p>Image size must be less than <span>2MB</span></p>
                </>
              }
            </div>
            <button className="border p-4 m-4 rounded-lg bg-blue-400" onClick={handleClick1}>Select Cloth</button>
          </div>

          <div className="bg-gray-100 rounded-lg">
            <input type="file" ref={inputFileRef2} id="file2" accept="image/*" hidden onChange={handleImageUpload2}></input>
            <div className="border-2 rounded-lg border-dashed m-4 h-[50vh]" data-img="">
              {img2 ? <img src={img2.url} alt="Selected" style={{ objectFit: 'contain', width: '100%', height: '100%' }} /> :
                <>
                  <p className='p-4 font-bold text-2xl'>Upload Image</p>
                  <p>Image size must be less than <span>2MB</span></p>
                </>
              }
            </div>
            <button className="border p-4 m-4 rounded-lg bg-blue-400" onClick={handleClick2}>Select Image</button>
          </div>

          <div className="bg-gray-100 rounded-lg">
            <input type="file" ref={inputFileRef2} id="file2" accept="image/*" hidden onChange={handleImageUpload2}></input>
            <div className="border-2 rounded-lg border-dashed m-4 h-[50vh]" data-img="">
              {resultImage && <img src={resultImage} style={{ objectFit: 'contain', width: '100%', height: '100%' }} />}
              {loading && <p>Loading...</p>}
            </div>
          </div>
          {img1 && img2 &&
            <div className="col-span-3 flex justify-center items-center">
              <button className="border p-4 m-4 rounded-lg bg-blue-400" onClick={handleApiCall}>Submit</button>
            </div>
          }
        </div>
      </div>
    </>
  )
}