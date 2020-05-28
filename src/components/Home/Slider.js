import React from 'react';
import { Fade } from 'react-slideshow-image';
import hinh1 from './images/1.jpg'
import hinh2 from './images/2.jpg'

const fadeImages = [
  hinh1,
  hinh2,
  
];
 
const fadeProperties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: false,
  indicators: true,
  onChange: (oldIndex, newIndex) => {
    console.log(`fade transition from ${oldIndex} to ${newIndex}`);
  }
}
 
const Slideshow = () => {
  return (
    <div className="slide-container" style={{margin:"20px"}}>
      <Fade {...fadeProperties}>
        <div className="each-fade">
          <div className="image-container" >
            <img src={fadeImages[0]} />
          </div>
        
        </div>
        <div className="each-fade">
          <div className="image-container">
            <img src={fadeImages[1]} />
          </div>
         
        </div>
        
      </Fade>
    </div>
  )
}
export default Slideshow;