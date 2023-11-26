import React from 'react';
import './ComicGenerator.css';
import { useState } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HorizontalSplitIcon from '@mui/icons-material/HorizontalSplit';
import { Add, Download } from '@mui/icons-material';

// Main ComicGenerator component
export const ComicGenerator = () => {
  // State to manage generated images, main image, loading state, user input, and comic strip
  const [generatedImages, setGeneratedImages] = useState([]);
  const [selectedMainImage, setSelectedMainImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [comicStrip, setComicStrip] = useState([]);
  const [activeSection, setActiveSection] = useState('home'); // State to track the active section

  // Function to make API call for image generation
  async function fetchGeneratedImage(data) {
    try {
      setIsLoading(true);
      const response = await fetch(
        'https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud',
        {
          headers: {
            Accept: 'image/png',
            Authorization:
              'Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM',
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify(data),
        }
      );
      const result = await response.blob();
      setIsLoading(false);
      return result;
    } catch (error) {
      setIsLoading(false);
      alert('Error:', error);
    }
  }

  // Function to generate images
  const generateImages = () => {
    for (let i = 0; i < 10; i++) {
      if (i === 0) {
        setGeneratedImages([]);
      }
      fetchGeneratedImage({ inputs: userInput }).then((response) => {
        const imageUrl = URL.createObjectURL(response);
        setGeneratedImages((prevImages) => [...prevImages, imageUrl]);
      });
    }
  };

  // Function to handle click on an image in the generated images
  const handleMainImageClick = (index) => {
    setSelectedMainImage(generatedImages[index]);
  };

  // Function to handle Enter key press
  const handleEnterKeyPress = (e) => {
    if (e.key === 'Enter') {
      generateImages();
    }
  };

  // Function to add the main image to the comic strip
  const addToComicStrip = () => {
    setComicStrip((prevStrip) => [...prevStrip, selectedMainImage]);
  };

  // Function to change the active section
  const changeSection = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="app">
      {/* NavBar */}
      <nav>
        <input type="checkbox" id="check" />
        <label htmlFor="check" className="checkbtn">
          <HorizontalSplitIcon />
        </label>
        <label htmlFor="" className="logo">
          Comic <span>Creator</span>
        </label>
        <ul>
          {/* Buttons with onClick to change the active section */}
          <li>
            <button className='btnnav' onClick={() => changeSection('home')}>Home</button>
          </li>
          <li>
            <button className='btnnav'  onClick={() => changeSection('about')}>About</button>
          </li>
          <li>
            <button className='btnnav'  onClick={() => changeSection('service')}>Service</button>
          </li>
          <li>
            <button className='btnnav' onClick={() => changeSection('contact')}>Contact</button>
          </li>
        </ul>
      </nav>

      {/* Container */}
      <div className="container">
        {/* Left Panel */}
        {activeSection === 'home' && (
          <div className="leftPanel">
            <textarea
              onKeyDown={handleEnterKeyPress}
              className="text_area"
              onChange={(e) => setUserInput(e.target.value)}
              type="text"
              placeholder="Enter text here !!!"
            />
            <div className="buttons">
              <button className="generate_btn" onClick={generateImages}>
                Click to generate <CheckCircleIcon />
              </button>
            </div>
            {isLoading ? (
              <div className="isLoading">
                <p>Generating Images...</p>
              </div>
            ) : (
              generatedImages.map((image, index) => (
                <img
                  onClick={() => handleMainImageClick(index)}
                  key={index}
                  src={image}
                  alt="Images not found"
                  className="images"
                />
              ))
            )}
          </div>
        )}

        {/* Right Panel */}
        {activeSection === 'home' && (
          <div className="rightPanel">
            <div className="strip">
              <h2>Selected Panel</h2>
            </div>
            {selectedMainImage && <img className="main" src={selectedMainImage} alt="" />}
            <div className="buttons" id="btn-panel">
              <button className="Add_btn" onClick={addToComicStrip}>
                Add in strip<Add />
              </button>
            </div>
            <div>
              <div className="strip">
                <h2>Your Comic Strip</h2>
              </div>
              <div className="strip_container" id="strip_container">
                {comicStrip.map((image, index) => (
                  <img key={index} src={image} alt="" className="strip_img" />
                ))}
              </div>
              <div className="buttons" id="btn-panel">
                <button className="download_btn">
                  Download<Download />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* About Section */}
        {activeSection === 'about' && (
          <div className="aboutSection">
            <p className='textsection'>
              Welcome to our Comic Creator web application! Our platform is designed to spark your creativity and bring your stories to life in a fun and interactive way. With just a few keystrokes, users can input text, and our application generates a series of 10 unique images using advanced image generation technology via an API.
              <br /><br/> These images serve as the building blocks for your very own comic strips. The dynamic selection allows users to click and choose their preferred main image from the generated set, which becomes the centerpiece of their comic creation. Whether you're an aspiring comic artist or just looking to add a touch of humor to your day.
              <br/><br /> Our Comic Creator makes the process enjoyable and accessible. Try it out, unleash your imagination, and craft captivating visual stories with ease.

              Feel free to customize the language to better fit the tone and style of your web page. This paragraph should give users a clear idea of what your application does and the creative possibilities it offers.
            </p>
          </div>
        )}

        {/* Service Section */}
        {activeSection === 'service' && (
          <div className="serviceSection">
            {/* Add elements for the Service section */}
          </div>
        )}
        
        {/* Contact Section */}
        {activeSection === 'contact' && (
          <div className="contactSection">
            <div id="about">
              <p id="hello">Hello, my name is </p>
              <p id="suchit">Suchit Kumar</p>
              
              <p className="education">B.Tech Student</p>
              
              <p className="education">Final Year</p>
              <p className="education">Chemical engineering</p>
              
              <a  href="https://www.iitk.ac.in/" target="blank"><button class="education" id="iit">IIT KANPUR</button></a>
              
            </div>
            <div className="pic">
            
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <hr />
      <footer className="footer">&copy; Copyright 2023 | <a href="mailto:suchit159kumar@gmail.com">Suchit Kumar</a></footer>
    </div>
  );
};

export default ComicGenerator;
