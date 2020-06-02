import React , {useState} from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import L from "leaflet";

const CovidMap = ({ onPatientMarkerClicked, patients, currentPatient,fgetClicklocation }) => {
    let defaultZoom = 15;
    let defaultLat = 10.762887;
    let defaultLng = 106.6800684;

 

    const BUILDING = new L.Icon({
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });
    const PRIVATE = new L.Icon({
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });
    const STREET = new L.Icon({
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });
    

    return <Map center={[currentPatient ? currentPatient.getLatitude() : defaultLat, currentPatient ? currentPatient.getLongitude() : defaultLng]} zoom={defaultZoom} onClick={(e)=>{
      
        fgetClicklocation(e.latlng)
    }}>
        <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.osm.org/{z}/{x}/{y}.png   "
        />
        {patients.map((patient, index) => {
            if (patient.getType() === 0) {
                return (<Marker icon={BUILDING} key={index} position={[patient.getLatitude(), patient.getLongitude()]} onClick={() => { onPatientMarkerClicked(patient, index) }}>
                    <Popup>
                        <ul >
                            <li>ID: {patient.getId()}</li>
                            <li>NAME: {patient.getName()}</li>
                            <li>TYPE: {patient.getType()}</li>
                            <li>availableslot: {patient.getAvailableslot()}</li>
                            <li>totalSlot: {patient.getTotalslot()}</li>

                        </ul>
                    </Popup>
                </Marker>)
            }
            else    if (patient.getType() === 1) {
                return (<Marker icon={PRIVATE} key={index} position={[patient.getLatitude(), patient.getLongitude()]} onClick={() => { onPatientMarkerClicked(patient, index) }}>
                    <Popup>
                        <ul >
                            <li>ID: {patient.getId()}</li>
                            <li>NAME: {patient.getName()}</li>
                            <li>TYPE: {patient.getType()}</li>
                            <li>availableslot: {patient.getAvailableslot()}</li>
                            <li>totalSlot: {patient.getTotalslot()}</li>

                        </ul>
                    </Popup>
                </Marker>)
            }
            else    if (patient.getType() === 2) {
                return (<Marker icon={STREET} key={index} position={[patient.getLatitude(), patient.getLongitude()]} onClick={() => { onPatientMarkerClicked(patient, index) }}>
                    <Popup>
                        <ul >
                            <li>ID: {patient.getId()}</li>
                            <li>NAME: {patient.getName()}</li>
                            <li>TYPE: {patient.getType()}</li>
                            <li>availableslot: {patient.getAvailableslot()}</li>
                            <li>totalSlot: {patient.getTotalslot()}</li>

                        </ul>
                    </Popup>
                </Marker>)
            }
            
        }
        )}
    </Map>;
};

export default CovidMap;
