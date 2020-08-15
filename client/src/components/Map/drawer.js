import React, { useState, useEffect, useRef } from "react";

import styled from "styled-components";
import { useSpring, animated, interpolate } from "react-spring";
import { useGesture } from "react-with-gesture";
import { ListGroup } from 'react-bootstrap';
import stylescrollview from '../../css/scrollpath.module.css'
//IMPORT COMPONENT
import PatientInfo from "./PatientInfo";
import ListPatients from "./ListPatients";
import CommentRating from "./CommentRating"
//React Context ConTextMap SetClick
import SetClick from './ConTextMap/SetClick'

//Import Search
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from '@reach/combobox';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const libraries = ['places'];
const Close = props => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="26"
        height="26"
        focusable="false"
        viewBox="0 0 16 16"
        {...props}
    >
        <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            d="M1.5 1.5h13m-7 4h7m-7 4h7m-13 4h13m-13-9l2.6 2.6c.2.2.2.5 0 .7l-2.6 2.6"
        />
    </svg>
);

const Open = props => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="26"
        height="26"
        focusable="false"
        viewBox="0 0 16 16"
        {...props}
    >
        <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            d="M1.5 1.5h13m-7 4h7m-7 4h7m-13 4h13M4 4.5L1.4 7.1c-.2.2-.2.5 0 .7L4 10.5"
        />
    </svg>
);



export const SideMenu = ({
    overlayColor = "transparent",
    width = 200,
    data,
    onClickItemPatient, refs, indexClickedMaker, currentPatient, fgetClicklocation
}) => {

    const node = useRef(null);

    const handleClick = event => {
        // xử lý khi bấm ra ngoài thì đóng popup
        // if (node.current.contains(event.target)) {
        //     return;
        // }
        // setActive(false);
    };

    // set the active state (true by default)
    const [active, setActive] = useState(true);
    // check Switch ListPa and PatientInfo
    const abc = React.useContext(SetClick)

    // use react-with-gestures hook
    const [handler, { xDelta, down }] = useGesture();






    useEffect(() => {
        document.addEventListener("mousedown", handleClick);
        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, []);

    const [{ x, delta }] = useSpring({
        native: true,
        to: {
            x: down ? xDelta : 0,
            delta: active ? 0 : -width
        },
        immediate: () => down
    });

    const [menuHandlerStyle] = useSpring({
        native: true,
        to: {
            x: active ? 120 : 120,
            color: active ? "green" : "green"
        }
    });

    useEffect(() => {
        if (!down && xDelta !== 0) {
            if (active && xDelta < -(width / 2)) {
                // when active, set the state back to inactive if dragged left for more than 1/2 of the width
                setActive(false);
            } else if (!active && xDelta > width / 4) {
                // when inactive, set the state back to active if dragged right for more than 1/4 of the width
                setActive(true);
            }
        }
    });



    if (abc.switchLP.LiPa === false && abc.switchLP.BinhLuan === false) {
        return (
            <SidekickWrapper>
                <SidekickOverlay overlayColor={overlayColor} />

                <StyledSideMenu
                    ref={node}
                    {...handler}
                    width={width}
                    style={{
                        transform: interpolate(
                            [x, delta],
                            (x, delta) => `translateX(${Math.min(0, x + delta)}px)`
                        )
                    }}
                >
                    <MenuHandler
                        onClick={() => {
                            if (xDelta !== 0) {
                                // prevent click if dragging
                                return;
                            }

                            setActive(!active);
                        }}
                        style={{
                            color: menuHandlerStyle.color,
                            transform: menuHandlerStyle.x.interpolate(v => `translateX(${v}%)`)
                        }}
                    >
                        {active ? <Open /> : <Close />}
                    </MenuHandler>
                    {data.length !== 0 ?

                        /* <Search style={{paddingtop:"100%"}} panTo={panTo} /> */
                        <ListPatients patients={data} onClickItemPatient={onClickItemPatient} refs={refs} currentPatient={currentPatient} indexClickedMaker={indexClickedMaker} />
                        : <h1 style={{ color: "yellow" }}>HIỆN CHƯA CÓ BÃI XE TẠI ĐÂY</h1>}

                </StyledSideMenu>
            </SidekickWrapper>
        );
    }
    else if (abc.switchLP.LiPa === true && abc.switchLP.BinhLuan === false) {
        return (
            <SidekickWrapper>
                <SidekickOverlay overlayColor={overlayColor} />

                <StyledSideMenu
                    ref={node}
                    {...handler}
                    width={width}
                    style={{
                        transform: interpolate(
                            [x, delta],
                            (x, delta) => `translateX(${Math.min(0, x + delta)}px)`
                        )
                    }}
                >
                    <MenuHandler
                        onClick={() => {
                            if (xDelta !== 0) {
                                // prevent click if dragging
                                return;
                            }

                            setActive(!active);
                        }}
                        style={{
                            color: menuHandlerStyle.color,
                            transform: menuHandlerStyle.x.interpolate(v => `translateX(${v}%)`)
                        }}
                    >
                        {active ? <Open /> : <Close />}
                    </MenuHandler>

                    {
                        currentPatient &&
                        <PatientInfo id={currentPatient.getId()} name={currentPatient.getName()} availableSlot={currentPatient.getAvailableslot()} totalSlot={currentPatient.getTotalslot()} />
                    }
                </StyledSideMenu>
            </SidekickWrapper>
        );
    }
    else if (abc.switchLP.LiPa === true && abc.switchLP.BinhLuan === true) {
        return (
            <SidekickWrapper>
                <SidekickOverlay overlayColor={overlayColor} />

                <StyledSideMenu
                    ref={node}
                    {...handler}
                    width={width}
                    style={{
                        transform: interpolate(
                            [x, delta],
                            (x, delta) => `translateX(${Math.min(0, x + delta)}px)`
                        )
                    }}
                >
                    <MenuHandler
                        onClick={() => {
                            if (xDelta !== 0) {
                                // prevent click if dragging
                                return;
                            }

                            setActive(!active);
                        }}
                        style={{
                            color: menuHandlerStyle.color,
                            transform: menuHandlerStyle.x.interpolate(v => `translateX(${v}%)`)
                        }}
                    >
                        {active ? <Open /> : <Close />}
                    </MenuHandler>
                    {currentPatient &&
                        <div>

                            <CommentRating id={currentPatient.getId()} name={currentPatient.getName()} availableSlot={currentPatient.getAvailableslot()} totalSlot={currentPatient.getTotalslot()} />
                        </div>

                    }
                </StyledSideMenu>
            </SidekickWrapper>
        );
    }


};

const StyledList = styled.div`
  position: absolute;
  top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: stretch;
  width: 100%;
`;

const StyledListItem = styled.div`
  margin: 5px;
  flex: 0 1 auto;
  color: palevioletred;
`;

const SidekickWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  margin-top: 63px;
  left: 0;
  pointer-events: none;
  z-index: ${9998};
 
`;
//xử lý đè lên màn hình chính
const SidekickOverlay = styled.div`

  ${'' /* position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: ${({ overlayColor }) => overlayColor};
  pointer-events: all;
  z-index: ${0}; */}
`;

const StyledSideMenu = styled(animated.div)`
  position: relative;
  z-index: ${2};
  pointer-events: all;
  background-color: ${"#fff"};
  height: 100%;
  max-width: ${({ width }) => width}px;
  


  
`;

const MenuHandler = styled(animated.button)`
  border: 0;
  background: transparent;
  border-radius: 0;
  position: absolute;
  margin-top: 66px;
  width: 10%;
  right: 5px;
  outline: none;
    z-index: ${100};
`;





export default SideMenu;