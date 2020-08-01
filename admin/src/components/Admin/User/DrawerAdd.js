import React, { useState } from 'react'
import { Drawer, Button } from 'rsuite';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Switch from '@material-ui/core/Switch';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ActorProto from '../../../api/Actor_pb'
import ModalError from '../../Modal/ModalError'
import Cookies from 'js-cookie';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { UserServiceClient } from "../../../api/Actor_grpc_web_pb"
import { AuthServiceClient } from "../../../api/Auth_grpc_web_pb";
import { API_URL } from '../../../saigonparking';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import { StringValue } from 'google-protobuf/google/protobuf/wrappers_pb';
import { Notification } from 'rsuite'
import _ from 'lodash'

const UserService = new UserServiceClient(API_URL);
const authService = new AuthServiceClient(API_URL)

const DrawerAddUser = ({ isOpen, setIsOpen }) => {

    const [switchChecked, setSwitchChecked] = useState(true)
    const [role, setRole] = useState(ActorProto.UserRole.CUSTOMER)
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phone, setPhone] = useState('')
    const [already, setAlready] = useState(false)

    //renew accessToken
    const ErrorSPE00001 = React.useCallback(
        () => {
            const refreshtoken = "Bearer " + Cookies.get("refreshtoken");
            const metadata = { 'Authorization': refreshtoken };
            const request = new Empty();

            authService.generateNewToken(request, metadata, (err, res) => {
                if (err) {
                    setmyError(err.message)
                    openModalError()
                } else {
                    if (res.getRefreshtoken() === "") {
                        /* luu access token */
                        Cookies.set("token", res.getAccesstoken());
                    } else {
                        /* luu new access token + new refresh token */
                        Cookies.set("token", res.getAccesstoken());
                        Cookies.set("refreshtoken", res.getRefreshtoken());
                    }
                }
            });
        }, []
    )

    //config Error modal
    const [myError, setmyError] = useState(null)
    const [modalErrorIsOpen, setmodalErrorIsOpen] = React.useState(false);
    function openModalError() {
        setmodalErrorIsOpen(true);
    }

    function closeModalError() {
        setmodalErrorIsOpen(false);
    }

    const handleCancle = () => {
        setIsOpen(false)
    }

    const handleChangeSwitch = () => {
        setSwitchChecked(prev => !prev)
    }

    const handleChangeRole = (event) => {
        setRole(event.target.value)
        console.log(role)
    }

    const handleSubmitCreate = () => {
        if (role === ActorProto.UserRole.CUSTOMER) {
            const user = new ActorProto.User()
            user.setRole(role)
            user.setUsername(userName)
            user.setPassword(password)
            user.setEmail(email)
            user.setIsactivated(switchChecked)
            const request = new ActorProto.Customer();
            // request.setKeyword()
            request.setUserinfo(user)
            request.setFirstname(firstName)
            request.setLastname(lastName)
            request.setPhone(phone)
            const token = "Bearer " + Cookies.get("token");
            const metadata = { 'Authorization': token };

            UserService.createCustomer(request, metadata, (err, res) => {
                if (err) {
                    if (err.message === "SPE#00001") {
                        ErrorSPE00001();
                    } else {
                        Notification['error']({
                            title: 'Error!',
                            description: <h4>Problem when create User, 
                            Please try again later</h4>
                        });
                    }
                } else {
                    Notification['success']({
                        title: 'Add successed',
                        description: <h4>Add Customer with ID: {res.getValue()} Success</h4>
                    });
                    setUserName('')
                    setEmail('')
                    setPassword('')
                    setSwitchChecked(true)
                    setRole(ActorProto.UserRole.CUSTOMER)
                    setPhone('')
                    setLastName('')
                    setFirstName('')
                    handleCancle()
                }
            });
        } else {
            const request = new ActorProto.User()
            request.setRole(role)
            request.setUsername(userName)
            request.setPassword(password)
            request.setEmail(email)
            request.setIsactivated(switchChecked)
            const token = "Bearer " + Cookies.get("token");
            const metadata = { 'Authorization': token };

            UserService.createUser(request, metadata, (err, res) => {
                if (err) {
                    if (err.message === "SPE#00001") {
                        ErrorSPE00001();
                    } else {
                        Notification['error']({
                            title: 'Error!',
                            description: <h4>Problem when create User,
                            Please try again later</h4>
                        });
                    }
                } else {
                    Notification['success']({
                        title: 'Add successed',
                        description: <h4>Add User with ID: {res.getValue()} Success</h4>
                    });
                    setUserName('')
                    setEmail('')
                    setPassword('')
                    setSwitchChecked(true)
                    setRole(ActorProto.UserRole.CUSTOMER)
                    setPhone('')
                    setLastName('')
                    setFirstName('')
                    handleCancle()
                }
            });

        }
    }

    const handleCheckAlready = React.useCallback(_.debounce((value) => {
        const request = new StringValue();
        // request.setKeyword()
        request.setValue(value)
        const token = "Bearer " + Cookies.get("token");
        const metadata = { 'Authorization': token };

        UserService.checkUsernameAlreadyExist(request, metadata, (err, res) => {
            if (err) {
                if (err.message === "SPE#00001") {
                    ErrorSPE00001();
                } else {
                    setmyError(err.message);
                    openModalError();
                }
            } else {
                if (res.getValue() === true) setAlready(true)
                else setAlready(false)
            }
        });
    },1000),[])

    return (
        <Drawer backdrop="static" show={isOpen} size='xs' onHide={handleCancle}>
            <Drawer.Header>
                <Drawer.Title><span style={{ fontWeight: 'bolder' }}>Add User</span></Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
                <ValidatorForm
                    onSubmit={() => handleSubmitCreate()}
                    onError={errors => console.log(errors)}
                >
                    <FormControlLabel
                        control={
                            <Switch
                                checked={switchChecked}
                                onChange={handleChangeSwitch}
                                name="checkedB"
                                color="primary"
                                margin="normal"
                            />
                        }
                        label="Active"
                        labelPlacement='start'
                    />
                    <TextValidator
                        error={already}
                        helperText={already ? 'Username already exited! ' : ''}
                        margin="normal"
                        id="username"
                        label="User Name"
                        required
                        fullWidth
                        value={userName}
                        onChange={(e) => {
                            let value = e.target.value
                            value = value.replace(/[^A-Za-z0-9]/gi, "")
                            setUserName(prev => value)
                            handleCheckAlready(value)
                        }}
                    />
                    <TextValidator
                        margin="normal"
                        id="password"
                        label="Password"
                        type="password"
                        required
                        fullWidth
                        value={password}
                        onChange={(e) => {
                            let value = e.target.value
                            value = value.replace(/[^A-Za-z0-9]/gi, "")
                            setPassword(prev => value)
                        }}
                    />
                    <TextValidator
                        margin="normal"
                        id="email"
                        label="Email"
                        type="email"
                        required
                        fullWidth
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                        validators={['required', 'isEmail']}
                        errorMessages={['This field is required', 'email is not valid']}
                    />
                    <FormControl fullWidth>
                        <InputLabel>Role</InputLabel>
                        <Select
                            labelId="role"
                            id="role"
                            value={role}
                            onChange={handleChangeRole}
                        >
                            <MenuItem value={ActorProto.UserRole.CUSTOMER}>Customer</MenuItem>
                            <MenuItem value={ActorProto.UserRole.PARKING_LOT_EMPLOYEE}>Parkinglot Employee</MenuItem>
                            <MenuItem value={ActorProto.UserRole.GOVERNMENT_EMPLOYEE}>Government Employee</MenuItem>
                            <MenuItem value={ActorProto.UserRole.ADMIN}>Admin</MenuItem>
                        </Select>
                    </FormControl>

                    {role === ActorProto.UserRole.CUSTOMER ? <>
                        <TextValidator
                            margin="normal"
                            id="firstName"
                            label="First Name"
                            required
                            fullWidth
                            value={firstName}
                            onChange={(e) => { setFirstName(e.target.value) }}
                        />
                        <TextValidator
                            margin="normal"
                            id="lastName"
                            label="Last Name"
                            required
                            fullWidth
                            value={lastName}
                            onChange={(e) => { setLastName(e.target.value) }}
                        />
                        <TextValidator
                            margin="normal"
                            id="phone"
                            label="Phone"
                            type="tel"
                            required
                            fullWidth
                            value={phone}
                            onChange={(e) => { setPhone(e.target.value) }}
                            validators={['matchRegexp:^[0-9]{10}$']}
                            errorMessages={['Invalid Phone']}
                        />
                    </> : null}
                    <br />
                    <Button style={{marginTop: '10px'}} disabled={already} type='submit' appearance="primary">
                        Confirm
                    </Button>
                    <Button style={{marginTop: '10px'}} onClick={handleCancle} appearance="subtle">
                        Cancel
                    </Button>
                </ValidatorForm>
            </Drawer.Body>
            <Drawer.Footer>
            </Drawer.Footer>
            {modalErrorIsOpen ? <ModalError modalErrorIsOpen={modalErrorIsOpen} closeModalError={closeModalError} myError={myError} setmyError={setmyError} /> : null}
        </Drawer>
    )
}

export default DrawerAddUser