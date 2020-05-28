import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

const CovidMap = ({onPatientMarkerClicked,patients,currentPatient}) => {
    let defaultZoom = 8; 
    let defaultLat = 10.762887; 
    let defaultLng = 106.6800684; 
    return <Map center={[currentPatient ? currentPatient.getLatitude() : defaultLat,currentPatient ? currentPatient.getLongitude() : defaultLng]} zoom={defaultZoom}>
        <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.osm.org/{z}/{x}/{y}.png   "
        />
        {patients.map((patient,index) => <Marker key={index} position={[patient.getLatitude(), patient.getLongitude()]} onClick={() => {onPatientMarkerClicked(patient,index)}}>
            <Popup>
                <ul >
                    <li>ID: {patient.getId()}</li>
                    <li>availableslot: {patient.getAvailableslot()}</li>
                    <li>totalSlot: {patient.getTotalslot()}</li>
       
                </ul>
            </Popup>
        </Marker>)}
    </Map>;
};

export default CovidMap;
