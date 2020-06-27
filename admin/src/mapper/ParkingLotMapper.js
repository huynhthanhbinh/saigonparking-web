import ParkinglotProto from '../api/ParkingLot_pb'
let parkingLotMapper = {}


parkingLotMapper.toTypeString = (typeNumber) => {
    switch (typeNumber) {
        case ParkinglotProto.ParkingLotType.PRIVATE: return "Private"
        case ParkinglotProto.ParkingLotType.STREET: return "Street"
        case ParkinglotProto.ParkingLotType.BUILDING: return "Building"
        default: return "ALL"
    }
}

export default parkingLotMapper;