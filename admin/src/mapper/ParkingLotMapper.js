let parkingLotMapper = {}

parkingLotMapper.toTypeString = (typeNumber) => {
    switch (typeNumber) {
        case 1: return "Private"
        case 2: return "Street"
        default: return "Building"
    }
}

export default parkingLotMapper;