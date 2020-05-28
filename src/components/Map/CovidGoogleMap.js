import React, {useEffect, useState} from 'react';
import {compose, withProps} from "recompose"
import {withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow} from "react-google-maps"

const CovidGoogleMap = ({onPatientMarkerClicked}) => {
    console.log('Rendering CovidGoogleMap...');
    const [patients, setPatients] = useState([]);
    useEffect(() => {
        fetch("https://maps.vnpost.vn/apps/covid19/api/patientapi/list")
            .then(res => res.json())
            .then(
                (result) => {
                    setPatients(result.data);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    // setIsLoaded(true);
                    // setError(error);
                }
            )
    }, []);
    const MyMapComponent = React.memo(compose(
        withProps({
            googleMapURL:
                "https://maps.googleapis.com/maps/api/js?key=AIzaSyCfrgza6UF7_rK2NsnuUQBytLTSbKYuAlA&libraries=geometry,drawing,places",
            loadingElement: <div style={{height: `100%`}}/>,
            containerElement: <div style={{height: `600px`}}/>,
            mapElement: <div style={{height: `100%`}}/>
        }),
        withScriptjs,
        withGoogleMap
    )((props)=> (
        <GoogleMap defaultZoom={16} defaultCenter={{lat: 10.762913, lng: 106.6799884}}>
            {patients.map((patient, index) => (<Marker key={index} position={{lat: patient.lat, lng: patient.lng}} onClick={()=>{
                onPatientMarkerClicked(patient)}}>
            </Marker>))}
        </GoogleMap>
    )));


    return <MyMapComponent/>;
}
export default React.memo(CovidGoogleMap);
