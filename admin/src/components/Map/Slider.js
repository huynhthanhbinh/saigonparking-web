import React, { useState,useEffect } from 'react';
import { Slider, Rail, Handles, Ticks } from "react-compound-slider";
import { SliderRail, Handle, Tick } from "./your-local-slider-components";
import { subDays, startOfToday, format, addDays } from "date-fns";
import { Button } from 'react-bootstrap';
import { scaleTime } from "d3-scale";
import { ms } from 'date-fns/locale';

const sliderStyle = {
  position: "relative",
  width: "100%"
};

const today = startOfToday();
const constantDay = new Date("2019-12-19");
const oneDay = 86400000;
const min = constantDay;
const max = today;

function formatTick(ms) {
  return format(new Date(ms), "MMM dd");
}



const SliderDate = ({ onChangeSlider, addDaySelected }) => {
  
  const [values,SetValues] = useState(constantDay); 
  const [selected,setSelected] = useState(constantDay); 
  const [isPlay,setIsPlay] = useState(false); 

  useEffect(() => {
    const timer =
    (isPlay && values.getTime() <= today.getTime()) && setInterval(() => {
        SetValues(values=>addDays(values,1));
        setSelected(selected => addDays(selected,1));   
        addDaySelected();   
    }, 500);
    return () => clearInterval(timer);
  },[values,isPlay])


  const onChange = ([ms]) => {
    let date = new Date(ms);
    setSelected(date); 
    SetValues(values => date); 
    onChangeSlider([ms]); 
  }

  const dateTicks = scaleTime()
    .domain([min, max])
    .ticks(8)
    .map(d => +d);

  return <div class="slider-center">
    <div
      style={{
        width: "100%",
        textAlign: "center",
        fontFamily: "Arial",
        margin: 5
      }}
    >
    <h1>{values && format(values, "MMM dd yyyy")}</h1>
    </div>
    <Slider
      rootStyle={sliderStyle}
      domain={[+min, +max]} // [min, max]
      mode={1}
      values={[+values]} // slider values
      step={oneDay}
      onChange={onChange}
    >
      <Rail>
        {({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}
      </Rail>
      <Handles>
        {({ handles, getHandleProps }) => (
          <div>
            {handles.map(handle => (
              <Handle
                key={handle.id}
                handle={handle}
                domain={[+min, +max]}
                getHandleProps={getHandleProps}
              />
            ))}
          </div>
        )}
      </Handles>
      <Ticks values={dateTicks}>
        {({ ticks }) => (
          <div>
            {ticks.map(tick => (
              <Tick
                key={tick.id}
                tick={tick}
                count={ticks.length}
                format={formatTick}
              />
            ))}
          </div>
        )}
      </Ticks>
    </Slider>
    <div class = "button-play">
      <Button variant="dark" onClick = {() => {setIsPlay(isPlay => true)}}>Play</Button>
      <Button variant="dark" onClick = {() => {setIsPlay(isPlay => false)}}>Pause</Button>
    </div>
  </div>
}


export default SliderDate; 