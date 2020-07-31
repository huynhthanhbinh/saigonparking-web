import React from 'react'
import { Drawer, Button } from 'rsuite';

const DrawerAddParking = ({ isOpen, setIsOpen }) => {

    const handleCancle = () => {
        setIsOpen(false)
    }

    return (
        <Drawer backdrop="static" show={isOpen} size='xs' onHide={handleCancle}>
            <Drawer.Header>
                <Drawer.Title><span style={{fontWeight:'bolder'}}>Add ParkingLot</span></Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
            </Drawer.Body>
            <Drawer.Footer>
                <Button appearance="primary">
                    Confirm
                </Button>
                <Button onClick={handleCancle} appearance="subtle">
                    Cancel
                </Button>
            </Drawer.Footer>
        </Drawer>
    )
}

export default DrawerAddParking