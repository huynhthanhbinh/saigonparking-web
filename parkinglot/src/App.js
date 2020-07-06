import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './component/navbar'
import Cookies from 'js-cookie'
import { Button, Modal } from 'semantic-ui-react'
import { w3cwebsocket as W3CWebSocket } from "websocket";
import 'semantic-ui-css/semantic.min.css'
import authProto from './api/Auth_pb'
import { API_URL } from './saigonparking'
import { AuthServiceClient } from './api/Auth_grpc_web_pb'
import contactProto from './api/Contact_pb'

const userProto = require('./api/Actor_pb')
const authService = new AuthServiceClient(API_URL)

function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState('')
  const [lists, setLists] = useState([])
  const [flagIsLogin, setFlagIsLogin] = useState(false)
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [messageReceived, setMesssageReceived] = useState()

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  const addList = (data) => {
    if (data) {
      setLists(lists.concat(data));
    }
    console.log(lists)
    console.log(messageReceived)
  }

  useEffect(() => {

    const token = Cookies.get("token");
    const refreshtoken = Cookies.get("refreshtoken");
    const checkUserName = Cookies.get("checkUserName");
    if (token && checkUserName && refreshtoken) {
      setFlagIsLogin(true)
      const clients = new W3CWebSocket(`ws://localhost:8000/contact/web?token=${token}`);

      clients.onerror = function (error) {
        console.log(error);
      }

      clients.onclose = (event) => {
        console.log(event)
      }

      clients.onopen = () => {
        console.log('WebSocket Client Connected');

        // sendMessage set filed and send //
        const message = new contactProto.SaigonParkingMessage()
        message.setSenderid(14)
        message.setReceiverid(4)
        message.setContent('abcd 12345674989876')
        message.setClassification(contactProto.SaigonParkingMessage.Classification.PARKING_LOT_MESSAGE)
        message.setType(contactProto.SaigonParkingMessage.Type.TEXT_MESSAGE)
        clients.send(message.serializeBinary())
        // ------------------------------------------------------------------------ //

      };

      clients.onmessage = (data) => {
        // change received message to Unit8Array and convert to object and set to State MesssageReceived //
        data.data.arrayBuffer().then(function (v) {
          var buf = new Uint8Array(v)
          setMesssageReceived(contactProto.SaigonParkingMessage.deserializeBinary(buf))
        })
        // ------------------------------------------------------------------------ //
      };
    }
    else {
      setIsOpen(true)
    }
  }, [])

  const handleChangeUserName = (e) => {
    setUserName(e.target.value)
  }

  const handleChangePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = () => {
    const request = new authProto.ValidateRequest();
    request.setUsername(userName);
    request.setPassword(password);
    request.setRole(userProto.UserRole.PARKING_LOT_EMPLOYEE)

    authService.validateUser(request, {}, (err, res) => {
      if (err) {

      } else {
        //set cookies when success
        Cookies.set("token", res.getAccesstoken())
        Cookies.set("refreshtoken", res.getRefreshtoken())
        Cookies.set("checkUserName", userName)
        setIsOpen(false)
        setFlagIsLogin(true)
      }
    })
  }

  return (
    <>
      {flagIsLogin ?
        <>
          <Navbar />
          <div className='rightTab'>
            <div className='listItem'>
              <ul>
                {lists.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className='container'>
            <div className='contentContainer'>
              <form onSubmit={(e) => {
                e.preventDefault();
                addList()
              }}>
                <label>Chat:</label>
                <input type="text" value={value} name="name" onChange={handleChange} />
                <input type="submit" value="Submit" />
              </form>
            </div>
          </div>
        </>
        :
        <Modal
          open={isOpen}
          closeOnDimmerClick={true}
        >
          <Modal.Header><p>Please Login to continue!</p></Modal.Header>
          <Modal.Content>
            <input type='text' label='UserName' value={userName} onChange={handleChangeUserName} />
            <input type='password' label='Password' value={password} onChange={handleChangePassword} />
          </Modal.Content>
          <Modal.Actions>
            <Button
              onClick={handleSubmit}
              positive
              labelPosition='right'
              icon='checkmark'
              content='Submit'
            />
          </Modal.Actions>
        </Modal>
      }


    </>
  );
}

export default App;
