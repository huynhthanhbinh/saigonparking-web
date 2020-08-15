import React from 'react';

import markerbuilding from './icon/markerbuilding.png';
import markerprivate from './icon/markerprivate.png';
import markerstreet from './icon/markerstreet.png';
//React Context ConTextMap SetClick
import SetClick from './ConTextMap/SetClick';

import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from '@reach/combobox';

import '../../css/Searchmap.css'
import '@reach/combobox/styles.css';
import mapStyles from './mapStyles';
import Navbardefault from '../Navbar/Navbar';
// enum type parking lot
const parkinglotProto = require('../../api/ParkingLot_pb');
//
const libraries = ['places'];
const mapContainerStyle = {
	margin: "0",
	marginTop: "63px",
	height: "calc(100% - 63px)",
	width: "100%",
	size: "cover",
	overflow: "hidden",
	display: "flex",
	position: "absolute",
	zIndex: "3",
	left: "0"
};

const options = {
	styles: mapStyles,
	disableDefaultUI: true,
	zoomControl: true
};
const center = {
	lat: 10.762887,
	lng: 106.6800684
};
var myVar;
const CovidGoogleMap = ({ onPatientMarkerClicked, patients, currentPatient, fgetClicklocation }) => {
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: 'AIzaSyAzMtM_tq9piTrRzZ5J0e4fEdsnx5ZSOJ8',
		libraries
	});
	// const [markers, setMarkers] = React.useState([]);

	/**
   * onMouseUp kết hợp onMouseDown Xử lý kéo thả map load data ( tránh bị load data nhiều  lần)
   */
	const onMouseUp = React.useCallback((e) => {
		myVar = setTimeout(function () {
			// console.log(e.latLng.lat())
			fgetClicklocation({ lat: e.latLng.lat(), lng: e.latLng.lng() });
		}, 2000);
	}, []);
	/**
   * onMouseUp kết hợp onMouseDown Xử lý kéo thả map load data ( tránh bị load data nhiều  lần)
   */
	const onMouseDown = React.useCallback((e) => {
		// console.log("xóa load dữ liệu")
		// console.log(e.latLng.lat())
		clearTimeout(myVar);
	}, []);

	const mapRef = React.useRef();
	const onMapLoad = React.useCallback((map) => {
		mapRef.current = map;
	}, []);

	const panTo = React.useCallback(({ lat, lng }) => {
		mapRef.current.panTo({ lat, lng });

		mapRef.current.setZoom(14);
	}, []);
	// check Switch ListPa and PatientInfo FALSE LIST  | TRUE LA PATIENTINFOR
	const abc = React.useContext(SetClick);

	if (loadError) return 'Error';
	if (!isLoaded) return 'Loading...';

	return (
		<div>
			<Search panTo={panTo} />
			<GoogleMap
				id="map"
				mapContainerStyle={mapContainerStyle}
				zoom={13}
				center={center}
				options={options}
				onMouseUp={onMouseUp}
				onMouseDown={onMouseDown}
				onLoad={onMapLoad}
			// panTo={(currentPatient && myVar === undefined) || (currentPatient && myVar < 1) ? panTo({ lat: currentPatient.getLatitude(), lng: currentPatient.getLongitude() }) : null}
			>


				{patients &&
					patients.map((patient, index) => {
						if (patient.getType() === parkinglotProto.ParkingLotType.BUILDING) {
							return (
								<Marker
									key={index}
									position={{ lat: patient.getLatitude(), lng: patient.getLongitude() }}
									onClick={() => {
										onPatientMarkerClicked(patient, index);
										abc.setswitchLP({ LiPa: true, BinhLuan: false });
										//
										panTo({ lat: patient.getLatitude(), lng: patient.getLongitude() });
									}}
									icon={{
										url: markerbuilding,
										origin: new window.google.maps.Point(0, 0),
										anchor: new window.google.maps.Point(15, 15),
										scaledSize: new window.google.maps.Size(30, 30)
									}}
									animation={
										currentPatient ? patient.getLatitude() === currentPatient.getLatitude() &&
											patient.getLongitude() === currentPatient.getLongitude() ? (
												'1'
											) : (
												'0'
											) : (
												'0'
											)
									}
								/>
							);
						} else if (patient.getType() === parkinglotProto.ParkingLotType.PRIVATE) {
							return (
								<Marker
									key={`${patient.getLatitude()}-${patient.getLongitude()}`}
									position={{ lat: patient.getLatitude(), lng: patient.getLongitude() }}
									onClick={() => {
										onPatientMarkerClicked(patient, index);
										abc.setswitchLP({ LiPa: true, BinhLuan: false });
										//
										panTo({ lat: patient.getLatitude(), lng: patient.getLongitude() });
									}}
									icon={{
										url: markerprivate,
										origin: new window.google.maps.Point(0, 0),
										anchor: new window.google.maps.Point(15, 15),
										scaledSize: new window.google.maps.Size(30, 30)
									}}
									animation={
										currentPatient ? patient.getLatitude() === currentPatient.getLatitude() &&
											patient.getLongitude() === currentPatient.getLongitude() ? (
												'1'
											) : (
												'0'
											) : (
												'0'
											)
									}
								/>
							);
						} else if (patient.getType() === parkinglotProto.ParkingLotType.STREET) {
							return (
								<Marker
									key={`${patient.getLatitude()}-${patient.getLongitude()}`}
									position={{ lat: patient.getLatitude(), lng: patient.getLongitude() }}
									onClick={() => {
										onPatientMarkerClicked(patient, index);
										abc.setswitchLP({ LiPa: true, BinhLuan: false });
										//
										panTo({ lat: patient.getLatitude(), lng: patient.getLongitude() });
									}}
									icon={{
										url: markerstreet,
										origin: new window.google.maps.Point(0, 0),
										anchor: new window.google.maps.Point(15, 15),
										scaledSize: new window.google.maps.Size(30, 30)
									}}
									animation={
										currentPatient ? patient.getLatitude() === currentPatient.getLatitude() &&
											patient.getLongitude() === currentPatient.getLongitude() ? (
												'1'
											) : (
												'0'
											) : (
												'0'
											)
									}
								/>
							);
						}
					})}
			</GoogleMap>
		</div>

	);

	function Search({ panTo }) {
		const { ready, value, suggestions: { status, data }, setValue, clearSuggestions } = usePlacesAutocomplete({
			requestOptions: {
				location: { lat: () => 10.762887, lng: () => 106.6800684 },
				radius: 100 * 1000
			}
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
				fgetClicklocation({ lat: lat, lng: lng });
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
					<ComboboxPopover className="listSearch">
						<ComboboxList >
							{status === 'OK' &&
								data.map(({ id, description }) => <ComboboxOption key={id} value={description} />)}
						</ComboboxList>
					</ComboboxPopover>
				</Combobox>
			</div>
		);
	}
};

export default CovidGoogleMap;
