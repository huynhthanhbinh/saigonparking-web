import React from 'react'
import styles from './searchbar.module.css'
import { Checkbox } from 'semantic-ui-react'

const Searchbar = ({ activated }) => {
    const [styleFocus, setStylefocus] = React.useState(styles.notFocus)
    const [inputfield, setInputfield] = React.useState('')
    const [dataCheckbox, setdataCheckbox] = React.useState({})


    //innitState Checkbox
    React.useEffect(() => {
        window.location.pathname === '/getalluser' ? setdataCheckbox({
            activated: false,
            ADM: true,
            CUS: true,
            GOV: true,
            PLE: true,
            Textfield: ''
        }) : setdataCheckbox({
            activated: false,
            Building: true,
            Private: true,
            Street: true,
            Textfield: ''
        })
    }, [setdataCheckbox])

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
            setStylefocus(styles.notFocus)
        }
    }

    return (
        <div className={styles.header}>
            {window.location.pathname === '/getalluser' ? <h1>User Manager</h1> : <>{window.location.pathname === '/getallparkinglot' ? <h1>Parking Manager</h1> : null}</>}
            <Checkbox className={`${styles.activated} ${styleFocus}`} slider onChange={() => {
                let temp = Object.assign({}, dataCheckbox);
                temp.activated = !temp.activated;
                activated(temp)
                setdataCheckbox(temp);
            }
            } />
            {window.location.pathname === '/getalluser' ?
                <>
                    <Checkbox className={`${styles.roleAdmin} ${styleFocus}`} label='Admin' defaultChecked onChange={() => {
                        let temp = Object.assign({}, dataCheckbox);
                        temp.ADM = !temp.ADM;
                        setdataCheckbox(temp);
                    }
                    }></Checkbox>
                    <Checkbox className={`${styles.roleCustomer} ${styleFocus}`} label='Customer' defaultChecked onChange={() => {
                        let temp = Object.assign({}, dataCheckbox);
                        temp.CUS = !temp.CUS;
                        setdataCheckbox(temp);
                    }
                    }></Checkbox>
                    <Checkbox className={`${styles.roleGov} ${styleFocus}`} label='Government' defaultChecked onChange={() => {
                        let temp = Object.assign({}, dataCheckbox);
                        temp.GOV = !temp.GOV;
                        setdataCheckbox(temp);
                    }
                    }></Checkbox>
                    <Checkbox className={`${styles.rolePle} ${styleFocus}`} label='Parking Lot Employee' defaultChecked onChange={() => {
                        let temp = Object.assign({}, dataCheckbox);
                        temp.PLE = !temp.PLE;
                        setdataCheckbox(temp);
                    }
                    }></Checkbox>
                </>
                : <>{window.location.pathname === '/getallparkinglot' ?
                    <>
                        <Checkbox className={`${styles.typeBuilding} ${styleFocus}`} label='Building' defaultChecked onChange={() => {
                            let temp = Object.assign({}, dataCheckbox);
                            temp.Building = !temp.Building;
                            setdataCheckbox(temp);
                        }
                        }></Checkbox>
                        <Checkbox className={`${styles.typePrivate} ${styleFocus}`} label='Private' defaultChecked onChange={() => {
                            let temp = Object.assign({}, dataCheckbox);
                            temp.Private = !temp.Private;
                            setdataCheckbox(temp);
                        }
                        }></Checkbox>
                        <Checkbox className={`${styles.tyleStreet} ${styleFocus}`} label='Street' defaultChecked onChange={() => {
                            let temp = Object.assign({}, dataCheckbox);
                            temp.Street = !temp.Street;
                            setdataCheckbox(temp);
                        }
                        }></Checkbox>
                    </> : <></>
                }
                </>
            }

            <div className={styles.container}>
                <input onClick={styleFocus === styles.notFocus ? callCloseSearch : null} value={inputfield} onChange={onChangeInput} onKeyDown={handleKeyDown} className={`${styles.input} ${styleFocus}`} type="text" placeholder="Search..." />
                <div onClick={callCloseSearch} className={styles.search}></div>
            </div>

        </div>
    )
}

export default Searchbar;