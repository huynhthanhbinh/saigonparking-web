import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import a from "./images/1.jpg"
import b from "./images/2.jpg"

export default () => (
  <Carousel>
    <div>
      <img alt="" src={a}  />
     
    </div>

    <div>
      <img alt="" src={b} />
   
    </div>
    <div>
      <img alt="" src={a} />
   
    </div>
    <div>
      <img alt="" src={a} />
   
    </div>
  </Carousel>
);
