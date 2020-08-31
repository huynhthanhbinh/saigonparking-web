import React from 'react';
import { ListGroup } from 'react-bootstrap';
//React Context ConTextMap SetClick
import SetClick from './ConTextMap/SetClick'
// import custom algorithm common
import algorithm from '../../algorithm'
// Import Css
import stylescrollview from '../../css/scrollpath.module.css'
//import icon
import markerbuilding from "./icon/markerbuilding.png"
import markerprivate from "./icon/markerprivate.png"
import markerstreet from "./icon/markerstreet.png"
const parkinglotProto = require('../../api/ParkingLot_pb')

function loadIcon(typeIcon) {
    if (typeIcon === parkinglotProto.ParkingLotType.BUILDING) {
        return markerbuilding
    }
    else if (typeIcon === parkinglotProto.ParkingLotType.PRIVATE) {
        return markerprivate
    }
    else if (typeIcon === parkinglotProto.ParkingLotType.STREET) {
        return markerstreet
    }

}
const ListPatients = ({ patients, onClickItemPatient, refs, indexClickedMaker, currentPatient }) => {
    // check Switch ListPa and PatientInfo FALSE LIST  | TRUE LA PATIENTINFOR
    const abc = React.useContext(SetClick)
    if (patients.length === 0) {
        return (<div style={{ color: "black" }}>HIỆN CHƯA CÓ BÃI XE TẠI ĐÂY</div>)
    }
    else {
        return <ListGroup className={`${stylescrollview.scrollpage} list-group`} as="ul">
            {patients && patients.map((patient, index) => {
                return (
                    <ListGroup.Item style={{ borderRight: "0px" }} key={index} as="div" className={`${stylescrollview.ListViewRow}`} ref={refs[index]} onClick={() => {
                        onClickItemPatient(patient, index);
                        abc.setswitchLP({ LiPa: true, BinhLuan: false })
                    }} active={((index === algorithm.customizedIndexOf(currentPatient, patients)) && (algorithm.customizedIndexOf(currentPatient, patients) !== -1)) ? true : false}>
                        <div className={`${stylescrollview.ListViewColumnRightleft} ${stylescrollview.ListViewColumn}`}>
                            <img alt='' src={loadIcon(patient.getType())}></img>
                        </div>
                        <div className={`${stylescrollview.ListViewColumnRight} ${stylescrollview.ListViewColumn}`}>
                            <div><strong>TÊN:</strong>  {patient.getName()}</div>
                            <div><strong>CHỖ TRỐNG:</strong>   {patient.getAvailableslot()}</div>
                            <div><strong>TỔNG SỐ CHỖ:</strong>   {patient.getTotalslot()}</div>
                        </div>
                    </ListGroup.Item>
                )
            })
            }
        </ListGroup >
    }
}

export default ListPatients; 