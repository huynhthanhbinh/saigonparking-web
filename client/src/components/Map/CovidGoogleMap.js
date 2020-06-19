import React from "react";

import markerbuilding from "./icon/markerbuilding.png"
import markerprivate from "./icon/markerprivate.png"
import markerstreet from "./icon/markerstreet.png"
//React Context ConTextMap SetClick
import SetClick from './ConTextMap/SetClick'
import {
  GoogleMap,
  useLoadScript,
  Marker,

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

import "@reach/combobox/styles.css";
import mapStyles from "./mapStyles";

const libraries = ["places"];
const mapContainerStyle = {
  height: "50vh",
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
var myVar;
const CovidGoogleMap = ({ onPatientMarkerClicked, patients, currentPatient, fgetClicklocation }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCfrgza6UF7_rK2NsnuUQBytLTSbKYuAlA',
    libraries,
  });
  // const [markers, setMarkers] = React.useState([]);

  /**
   * onMouseUp kết hợp onMouseDown Xử lý kéo thả map load data ( tránh bị load data nhiều  lần)
   */
  const onMouseUp = React.useCallback((e) => {
    myVar = setTimeout(function () {
      console.log(e.latLng.lat())
      fgetClicklocation({ lat: e.latLng.lat(), lng: e.latLng.lng() })
    }, 2000);

  }, []);
  /**
   * onMouseUp kết hợp onMouseDown Xử lý kéo thả map load data ( tránh bị load data nhiều  lần)
   */
  const onMouseDown = React.useCallback((e) => {
    console.log("Click vao map")
    clearTimeout(myVar);

  }, []);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);


  const panTo = React.useCallback(({ lat, lng }) => {

    mapRef.current.panTo({ lat, lng });

    mapRef.current.setZoom(15);

  }, []);
  // check Switch ListPa and PatientInfo FALSE LIST  | TRUE LA PATIENTINFOR
  const abc = React.useContext(SetClick)


  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";
  return (


    <div>
      <h1>
        PARKINGMAP
        <span role="img" aria-label="tent">

        </span>
      </h1>

      <Search panTo={panTo} />

      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={15}
        center={center}
        options={options}
        onMouseUp={onMouseUp}
        onMouseDown={onMouseDown}
        onLoad={onMapLoad}
      >
        {patients && patients.map((patient, index) => {
          if (patient.getType() === 0) {
            return (<Marker
              key={index}
              position={{ lat: patient.getLatitude(), lng: patient.getLongitude() }}
              onClick={() => {
                onPatientMarkerClicked(patient, index)
                abc.setswitchLP({ LiPa: true, BinhLuan: false })
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
                onPatientMarkerClicked(patient, index)
                abc.setswitchLP({ LiPa: true, BinhLuan: false })
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
                onPatientMarkerClicked(patient, index)
                abc.setswitchLP({ LiPa: true, BinhLuan: false })
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


  function Search({ panTo }) {
    const {
      ready,
      value,
      suggestions: { status, data },
      setValue,
      clearSuggestions,
    } = usePlacesAutocomplete({
      requestOptions: {
        location: { lat: () => 10.762887, lng: () => 106.6800684 },
        radius: 100 * 1000,
      },
    });

    // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest

    const handleInput = (e) => {
      setValue(e.target.value);
    };

    const handleSelect = async (address) => {
      setValue(address, false);
      clearSuggestions();

      try {
        const results = await getGeocode({ address });
        const { lat, lng } = await getLatLng(results[0]);
        panTo({ lat, lng });
        fgetClicklocation({ lat: lat, lng: lng })

      } catch (error) {
        // console.log(" Error: ", error);
      }
    };

    return (
      <div className="search">
        <Combobox onSelect={handleSelect}>
          <ComboboxInput
            value={value}
            onChange={handleInput}
            disabled={!ready}
            placeholder="Search your location"
          />
          <ComboboxPopover>
            <ComboboxList>
              {status === "OK" &&
                data.map(({ id, description }) => (
                  <ComboboxOption key={id} value={description} />
                ))}
            </ComboboxList>
          </ComboboxPopover>
        </Combobox>
      </div>
    );
  }
}


export default CovidGoogleMap;
