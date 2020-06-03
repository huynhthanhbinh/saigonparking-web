import React from "react";

import markerbuilding from "./icon/markerbuilding.png"
import markerprivate from "./icon/markerprivate.png"
import markerstreet from "./icon/markerstreet.png"

import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import { formatRelative } from "date-fns";

import "@reach/combobox/styles.css";
import mapStyles from "./mapStyles";

const libraries = ["places"];
const mapContainerStyle = {
  height: "100vh",
  width: "100%",
};
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};
const center = {
  lat: 10.762887,
  lng: 106.6800684,
};

const CovidGoogleMap = ({ onPatientMarkerClicked, patients, currentPatient, fgetClicklocation }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCfrgza6UF7_rK2NsnuUQBytLTSbKYuAlA',
    libraries,
  });
  const [markers, setMarkers] = React.useState([]);
  const [selected, setSelected] = React.useState(null);

  const onMapClick = React.useCallback((e) => {

   
    fgetClicklocation({lat:e.latLng.lat(),lng:e.latLng.lng()})
  }, []);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);


  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(15);
  }, []);


  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";
  return (
    <div>
      <h1>
        Bears{" "}
        <span role="img" aria-label="tent">
          ⛺️
      </span>
      </h1>



      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={15}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {patients.map((patient, index) => {
          if (patient.getType() === 0) {
            return (<Marker
              key={index}
              position={{ lat: patient.getLatitude(), lng: patient.getLongitude() }}
              onClick={() => {
                onPatientMarkerClicked(patient, index)
              }}
              icon={{
                url: markerbuilding,
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(15, 15),
                scaledSize: new window.google.maps.Size(30, 30),
              }}
              
            />)
          }
          else if (patient.getType() === 1) {
            return (<Marker
              key={`${patient.getLatitude()}-${patient.getLongitude()}`}
              position={{ lat: patient.getLatitude(), lng: patient.getLongitude() }}
              onClick={() => {
                setSelected(patient);
              }}
              icon={{
                url: markerprivate,
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(15, 15),
                scaledSize: new window.google.maps.Size(30, 30),
              }}
            />)
          }
          else if (patient.getType() === 2) {
            return (<Marker
              key={`${patient.getLatitude()}-${patient.getLongitude()}`}
              position={{ lat: patient.getLatitude(), lng: patient.getLongitude() }}
              onClick={() => {
                setSelected(patient);
              }}
              icon={{
                url: markerstreet,
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(15, 15),
                scaledSize: new window.google.maps.Size(30, 30),
              }}
            />)
          }
        }

        )}


      </GoogleMap>
    </div>
  );
}
export default CovidGoogleMap;
