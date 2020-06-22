let algorithm = {}

/* for saigonparking's entity list only: user list, parking-lot list... */
algorithm.customizedIndexOf = (obj, arr) => {
    if (arr != null && obj != null) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].getId() === obj.getId()) {
                return i;
            }
        }
    }
    return -1;
}

export default algorithm;