import React from 'react'
import styles from './searchbar.module.css'
import { Radio } from 'semantic-ui-react'
import DrawerAddParking from '../Parkinglot/DrawerAdd'
import DrawerAddUser from '../User/DrawerAdd'

const Searchbar = ({ activated }) => {
    const [styleFocus, setStylefocus] = React.useState(styles.notFocus)
    const [inputfield, setInputfield] = React.useState('')
    const [dataCheckbox, setdataCheckbox] = React.useState({
        activated: false,
        RoleOfType: null,
        Textfield: ''
    })
    const [check, setCheck] = React.useState('ALL')
    const [isOpenParkingLot, setIsOpenParkingLot] = React.useState(false)
    const [isOpenUser, setIsOpenUser] = React.useState(false)

    //Close Search or click find
    const callCloseSearch = () => {
        if (styleFocus === styles.notFocus) setStylefocus(styles.focus)
        else {
            setStylefocus(styles.notFocus)
            activated(dataCheckbox)
        }
    }

    const onChangeInput = (event) => {
        setInputfield(event.target.value)
        let temp = Object.assign({}, dataCheckbox);
        temp.Textfield = inputfield;
        setdataCheckbox(temp);
    }

    //handle Enter submit
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            let temp = Object.assign({}, dataCheckbox);
            temp.Textfield = inputfield;
            setdataCheckbox(temp);
            activated(temp)
        }
    }

    //Add button handle
    const handleAddButton = () => {
        switch (window.location.pathname) {
            case '/getalluser':
                {
                    setIsOpenUser(true)
                    break
                }
            case '/getallparkinglot':
                {
                    setIsOpenParkingLot(true)
                    break
                }
            default: return null
        }
    }

    const handleCloseDrawerParking = (value) => {
        setIsOpenParkingLot(value)
    }

    const handleCloseDrawerUser = (value) => {
        setIsOpenUser(value)
    }

    return (
        <>
            <DrawerAddParking isOpen={isOpenParkingLot} setIsOpen={handleCloseDrawerParking} />
            <DrawerAddUser isOpen={isOpenUser} setIsOpen={handleCloseDrawerUser} />
            <div className={styles.header}>
                {window.location.pathname === '/getalluser' ? <h3 style={{ paddingBottom: '15px', color:'#df49a6' }}>User Manager</h3> : <>{window.location.pathname === '/getallparkinglot' ? <h3 style={{ paddingBottom: '15px', color:'#df49a6' }}>Parking Manager</h3> : null}</>}
                <Radio className={`${styles.activated} ${styleFocus}`} slider onChange={() => {
                    let temp = Object.assign({}, dataCheckbox);
                    temp.activated = !temp.activated;
                    activated(temp)
                    setdataCheckbox(temp);
                }
                } />
                {window.location.pathname === '/getalluser' ?
                    <>
                        <Radio className={`${styles.roleAdmin} ${styleFocus}`} label='All' checked={check === 'ALL'} onChange={() => {
                            let temp = Object.assign({}, dataCheckbox);
                            temp.RoleOfType = null
                            setdataCheckbox(temp);
                            setCheck('ALL')
                            activated(temp)
                        }
                        }></Radio>
                        <Radio className={`${styles.roleAdmin} ${styleFocus}`} label='Admin' checked={check === 'ADM'} onChange={() => {
                            let temp = Object.assign({}, dataCheckbox);
                            temp.RoleOfType = 'ADM'
                            setdataCheckbox(temp);
                            setCheck('ADM')
                            activated(temp)
                        }
                        }></Radio>
                        <Radio className={`${styles.roleCustomer} ${styleFocus}`} label='Customer' checked={check === 'CUS'} onChange={() => {
                            let temp = Object.assign({}, dataCheckbox);
                            temp.RoleOfType = 'CUS'
                            setdataCheckbox(temp);
                            setCheck('CUS')
                            activated(temp)
                        }
                        }></Radio>
                        <Radio className={`${styles.roleGov} ${styleFocus}`} label='Government' checked={check === 'GOV'} onChange={() => {
                            let temp = Object.assign({}, dataCheckbox);
                            temp.RoleOfType = 'GOV'
                            setdataCheckbox(temp);
                            setCheck('GOV')
                            activated(temp)
                        }
                        }></Radio>
                        <Radio className={`${styles.rolePle} ${styleFocus}`} label='Parking Lot Employee' checked={check === 'PLE'} onChange={() => {
                            let temp = Object.assign({}, dataCheckbox);
                            temp.RoleOfType = 'PLE'
                            setdataCheckbox(temp);
                            setCheck('PLE')
                            activated(temp)
                        }
                        }></Radio>
                    </>
                    : <>{window.location.pathname === '/getallparkinglot' ?
                        <>
                            <Radio className={`${styles.typeBuilding} ${styleFocus}`} label='All' checked={check === 'ALL'} onChange={() => {
                                let temp = Object.assign({}, dataCheckbox);
                                temp.RoleOfType = null
                                setdataCheckbox(temp);
                                setCheck('ALL')
                                activated(temp)
                            }
                            }></Radio>
                            <Radio className={`${styles.typeBuilding} ${styleFocus}`} label='Building' checked={check === 'Building'} onChange={() => {
                                let temp = Object.assign({}, dataCheckbox);
                                temp.RoleOfType = 'Building'
                                setdataCheckbox(temp);
                                setCheck('Building')
                                activated(temp)
                            }
                            }></Radio>
                            <Radio className={`${styles.typePrivate} ${styleFocus}`} label='Private' checked={check === 'Private'} onChange={() => {
                                let temp = Object.assign({}, dataCheckbox);
                                temp.RoleOfType = 'Private'
                                setdataCheckbox(temp);
                                setCheck('Private')
                                activated(temp)
                            }
                            }></Radio>
                            <Radio className={`${styles.tyleStreet} ${styleFocus}`} label='Street' checked={check === 'Street'} onChange={() => {
                                let temp = Object.assign({}, dataCheckbox);
                                temp.RoleOfType = 'Street'
                                setdataCheckbox(temp);
                                setCheck('Street')
                                activated(temp)
                            }
                            }></Radio>
                        </> : <></>
                    }
                    </>
                }

                <div className={styles.container}>
                    <input onClick={styleFocus === styles.notFocus ? callCloseSearch : null} value={inputfield} onChange={onChangeInput} onKeyDown={handleKeyDown} className={`${styles.input} ${styleFocus}`} type="text" placeholder="Search..." />
                    <div onClick={callCloseSearch} className={styles.search}></div>
                </div>

                <div className={styles.container2}>
                    <div onClick={handleAddButton} className={styles.search2}></div>
                </div>

            </div>
        </>
    )
}

export default Searchbar;