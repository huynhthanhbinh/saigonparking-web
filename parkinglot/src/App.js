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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const userProto = require('./api/Actor_pb')
const authService = new AuthServiceClient(API_URL)

function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState('')
  const [lists, setLists] = useState([])
  const [flagIsLogin, setFlagIsLogin] = useState(false)
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [clients, setClients] = useState(null)

  const [messageReceived, setMesssageReceived] = useState({
    classification: null,
    type: null,
    content: null,
    senderId: null,
    receiverId: null,
    timestamp: null,
  })

  // deserialize content on Received message //
  const deserializeBinary = (dataU8, type) => {
    if (dataU8) {
      switch (type) {
        case contactProto.SaigonParkingMessage.Type.NOTIFICATION:
          return contactProto.NotificationContent.deserializeBinary(dataU8)
        case contactProto.SaigonParkingMessage.Type.TEXT_MESSAGE:
          return contactProto.TextMessageContent.deserializeBinary(dataU8)
        case contactProto.SaigonParkingMessage.Type.BOOKING_REQUEST:
          return contactProto.BookingRequestContent.deserializeBinary(dataU8)
        case contactProto.SaigonParkingMessage.Type.BOOKING_CANCELLATION:
          return contactProto.BookingCancellationContent.deserializeBinary(dataU8)
        case contactProto.SaigonParkingMessage.Type.IMAGE:
          return dataU8
        default:
          return 'Error not in type Received'
      }
    }
    else return 'Error message null'
  }
  // ------------------------------------------------------------------------ //

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  const send = () => {
    // sendMessage set filed and send //
    const content = new contactProto.TextMessageContent()
    content.setMessage(value)
    content.setSender('bxsape')
    const message = new contactProto.SaigonParkingMessage()
    message.setSenderid(14)
    message.setReceiverid(3)
    message.setContent(content.serializeBinary())
    message.setClassification(contactProto.SaigonParkingMessage.Classification.PARKING_LOT_MESSAGE)
    message.setType(contactProto.SaigonParkingMessage.Type.TEXT_MESSAGE)
    clients.send(message.serializeBinary())
    let temp = lists;
    temp[temp.length] = 'bxsape: ' + value
    setLists(lists.concat(temp[temp.length]));
    console.log(message)
    // ------------------------------------------------------------------------ //
  }

  useEffect(() => {
    const token = Cookies.get("token");
    const refreshtoken = Cookies.get("refreshtoken");
    const checkUserName = Cookies.get("checkUserName");
    if (token && checkUserName && refreshtoken) {
      setFlagIsLogin(true)
      setClients(new W3CWebSocket(`ws://ylas2712.ddns.net:8000/contact/web?token=${token}`))
    }
    else {
      setIsOpen(true)
    }
  }, [])

  //useEffect onState connect websocket
  useEffect(() => {
    if (clients !== null) {
      clients.onerror = function (error) {
        console.log(error);
      }

      clients.onclose = (event) => {
        console.log(event)
        Cookies.remove("token")
        Cookies.remove("refreshtoken")
        Cookies.remove("checkUserName")
        window.location.href = '/'
      }

      clients.onopen = () => {
        console.log('WebSocket Client Connected');
      };

      clients.onmessage = (data) => {
        // change received message to Unit8Array and convert to object and set to State MesssageReceived //
        data.data.arrayBuffer().then(function (v) {
          let buf = new Uint8Array(v)
          let data = contactProto.SaigonParkingMessage.deserializeBinary(buf)
          const temp = {
            classification: data.getClassification(),
            type: data.getType(),
            content: deserializeBinary(data.getContent_asU8(), data.getType()),
            senderId: data.getSenderid(),
            receiverId: data.getReceiverid(),
            timestamp: data.getTimestamp(),
          }
          setMesssageReceived(temp)
        })
        // ------------------------------------------------------------------------ //
      };
    }
  }, [clients])

  // ------------------------------------------------------------------------ //

  //useEffect onmessage
  useEffect(() => {
    if (messageReceived.type !== null) {
      console.log('message nhan: ', messageReceived)
      //trigger onmessage ở đây
      switch (messageReceived.type) {
        case contactProto.SaigonParkingMessage.Type.NOTIFICATION:
          return (
            setLists(l => lists.concat(messageReceived.content.getNotification())),
            notify(messageReceived.content.getNotification(), messageReceived.type)
          )
        case contactProto.SaigonParkingMessage.Type.TEXT_MESSAGE:
          return setLists(l => lists.concat(messageReceived.content.getMessage()));
        case contactProto.SaigonParkingMessage.Type.BOOKING_REQUEST:
          return (
            setLists(l => lists.concat(messageReceived.content.getCustomername() + messageReceived.content.getCustomerlicense() + messageReceived.content.getAmountofparkinghour())),
            acceptRequestBook()
          )
        case contactProto.SaigonParkingMessage.Type.BOOKING_CANCELLATION:
          return setLists(l => lists.concat(messageReceived.content.getReason()));
        case contactProto.SaigonParkingMessage.Type.IMAGE:
          return 0
        default:
          return setLists(l => lists.concat(messageReceived.content));
      }
    }
  }, [messageReceived])

  // ------------------------------------------------------------------------ //

  // accept booking send message //
  const acceptRequestBook = () => {
    // sendMessage set filed and send //
    const content = new contactProto.BookingAcceptanceContent()
    content.setBookingid(messageReceived.content.getCustomername() + messageReceived.senderId + Date.now())

    const message = new contactProto.SaigonParkingMessage()
    message.setSenderid(messageReceived.receiverId)
    message.setReceiverid(messageReceived.senderId)
    message.setContent(content.serializeBinary())
    message.setClassification(contactProto.SaigonParkingMessage.Classification.PARKING_LOT_MESSAGE)
    message.setType(contactProto.SaigonParkingMessage.Type.BOOKING_ACCEPTANCE)
    clients.send(message.serializeBinary())

    console.log('accept book: ', message)
    // ------------------------------------------------------------------------ //
  }
  // ------------------------------------------------------------------------ //

  // reject booking send message //
  const rejectRequestBook = () => {
    // sendMessage set filed and send //
    const content = new contactProto.BookingRejectContent()
    content.setReason('Already full Slot')

    const message = new contactProto.SaigonParkingMessage()
    message.setSenderid(messageReceived.receiverId)
    message.setReceiverid(messageReceived.senderId)
    message.setContent(content.serializeBinary())
    message.setClassification(contactProto.SaigonParkingMessage.Classification.PARKING_LOT_MESSAGE)
    message.setType(contactProto.SaigonParkingMessage.Type.BOOKING_REJECT)
    clients.send(message.serializeBinary())

    console.log('reject book: ', message)
    // ------------------------------------------------------------------------ //
  }
  // ------------------------------------------------------------------------ //


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
        window.location.href = '/'
      }
    })
  }


  // Custom toast when request book or something //

  const MsgContent = (message, type) => {
    switch (type) {
      //content with switch on type declare here
      case contactProto.SaigonParkingMessage.Type.NOTIFICATION:
        return <>{message}</>
      case contactProto.SaigonParkingMessage.Type.TEXT_MESSAGE:
        return <></>;
      case contactProto.SaigonParkingMessage.Type.BOOKING_REQUEST:
        return <></>
      case contactProto.SaigonParkingMessage.Type.BOOKING_CANCELLATION:
        return <></>;
      case contactProto.SaigonParkingMessage.Type.IMAGE:
        return <></>
      default:
        return <></>;
    }
  }

  const Msg = ({ message, type, closeToast }) => {
    return (
      <div>
        {MsgContent (message, type)}
        <div style={{ marginLeft: '60%' }}>
          <button>Accept</button>
          <button onClick={closeToast}>Reject</button>
        </div>
      </div>
    )
  }

  const notify = (message, type) => toast.warn(<Msg message={message} type={type} />,
    {
      autoClose: false,
      onClose: () => window.alert(message),
      closeButton: false,
      draggable: false,
      closeOnClick: false,
    });

  //--------------------------------------------------------------------------//

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
                send()
              }}>
                <label>Chat:</label>
                <input type="text" value={value} name="name" onChange={handleChange} />
                <input type="submit" value="Send" />
              </form>
            </div>
          </div>
        </>
        :
        <></>
      }
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
      <ToastContainer />
    </>
  );
}

export default App;
