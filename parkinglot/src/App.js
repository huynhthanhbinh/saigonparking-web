import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './component/navbar'
import Cookies from 'js-cookie'
import { Button, Modal } from 'semantic-ui-react'
import { w3cwebsocket as W3CWebSocket } from "websocket";
import 'semantic-ui-css/semantic.min.css'
import authProto from './api/Auth_pb'
import { API_URL } from './saigonparking'
import { StringValue } from 'google-protobuf/google/protobuf/wrappers_pb'
import { AuthServiceClient } from './api/Auth_grpc_web_pb'
import { UserServiceClient } from './api/Actor_grpc_web_pb';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import contactProto from './api/Contact_pb'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment'

const userProto = require('./api/Actor_pb')
const authService = new AuthServiceClient(API_URL)
const userService = new UserServiceClient(API_URL)

function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState('')
  const [lists, setLists] = useState([])
  const [flagIsLogin, setFlagIsLogin] = useState(false)
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [clients, setClients] = useState(null)
  const [numberMessage, setNumberMessage] = useState(0)
  const [chatMessage, setChatMessage] = useState([])

  // renew accessToken //
  const [flat, setFlat] = React.useState(false);

  const getInformationUser = React.useCallback(() => {
    const token = 'Bearer ' + Cookies.get("token");
    let metadata = { 'Authorization': token }
    let request = new StringValue()
    request.setValue(Cookies.get("checkUserName"))

    userService.getUserByUsername(request, metadata, (err, res) => {
      if (err) {
        if (err.message === "SPE#00001") {
          const refreshtoken = "Bearer " + Cookies.get("refreshtoken");
          metadata = { 'Authorization': refreshtoken };
          request = new Empty();

          authService.generateNewToken(request, metadata, (err, res) => {
            if (err) {
              Cookies.remove("token")
              Cookies.remove("refreshtoken")
              Cookies.remove("checkUserName")
              localStorage.removeItem('chatMessage')
              window.location.href = '/'
            } else {
              if (res.getRefreshtoken() === "") {
                /* luu access token */
                Cookies.set("token", res.getAccesstoken());
                setFlat(flat => !flat);
              } else {
                /* luu new access token + new refresh token */
                Cookies.set("token", res.getAccesstoken());
                Cookies.set("refreshtoken", res.getRefreshtoken());
                console.log("refreshtoken + accesstoken mới");
                setFlat(flat => !flat);
              }
            }
          });
        }
        else {
          Cookies.remove("token")
          Cookies.remove("refreshtoken")
          Cookies.remove("checkUserName")
          localStorage.removeItem('chatMessage')
          window.location.href = '/'
        }
      }
    })
  },
    [],
  )
  //--------------------------------------------------------------------------------------//

  // initalize message received on Websocket
  const [messageReceived, setMesssageReceived] = useState({
    classification: null,
    type: null,
    content: null,
    senderId: null,
    receiverId: null,
    timestamp: null,
  })
  // ------------------------------------------------------------------------ //

  /**
   * 
   * deserialize content on Received message
   */
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
          case contactProto.SaigonParkingMessage.Type.HISTORY_CHANGE:
            return console.log('đã update')
        default:
          return 'Error not in type Received'
      }
    }
    else return 'Error message null'
  }
  // ------------------------------------------------------------------------ //

  /**
   * sendMessage set filed and send
   */
  const send = (message, values) => {
    const content = new contactProto.TextMessageContent()
    content.setMessage(values)
    content.setSender(Cookies.get("checkUserName"))
    const messages = new contactProto.SaigonParkingMessage()
    messages.setSenderid(message.receiverId)
    messages.setReceiverid(message.senderId)
    messages.setContent(content.serializeBinary())
    messages.setClassification(contactProto.SaigonParkingMessage.Classification.PARKING_LOT_MESSAGE)
    messages.setType(contactProto.SaigonParkingMessage.Type.TEXT_MESSAGE)
    messages.setTimestamp(moment(new Date()).format("YYYY-MM-DD HH:mm:ss"))
    clients.send(messages.serializeBinary())
    let temp = lists;
    temp[temp.length] = 'bxsape: ' + values
    setLists(lists.concat(temp[temp.length]));
    console.log(messages)
  }
  // ------------------------------------------------------------------------ //

  //Open connected Websocket //
  useEffect(() => {
    let date = moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
    console.log(date)
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
  }, [flat])
  // ------------------------------------------------------------------------ //

  //useEffect onState connect websocket
  useEffect(() => {
    if (clients !== null) {
      clients.onerror = function (error) {
        console.log(error);
      }

      clients.onclose = (event) => {
        console.log(event)
        getInformationUser()
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
          setMesssageReceived(messageReceived => temp)
        })
        // ------------------------------------------------------------------------ //
      };
    }
  }, [clients])

  // ------------------------------------------------------------------------ //

  //useEffect handle onmessage by type
  useEffect(() => {
    if (messageReceived.type !== null) {
      localStorage.getItem('chatMessage') ? setChatMessage(JSON.parse(localStorage.getItem('chatMessage'))) : console.log('Available')
      console.log('message nhan: ', messageReceived)
      //trigger onmessage ở đây
      switch (messageReceived.type) {
        case contactProto.SaigonParkingMessage.Type.NOTIFICATION:
          {
            setLists(l => lists.concat(messageReceived.content.getNotification()))
            notify(messageReceived)
            break
          }
        case contactProto.SaigonParkingMessage.Type.TEXT_MESSAGE:
          {
            //handle textChat to List object
            let a = chatMessage
            if (a.length === 0) {
              a = [{
                'content': ['kh:' + messageReceived.content.getMessage()],
                'id': messageReceived.senderId + messageReceived.receiverId,
                'customer': messageReceived.content.getSender()
              }]
            }
            else {
              let temp = 0
              for (let i = 0; i < a.length; i++) {
                if (a[i].id === messageReceived.senderId + messageReceived.receiverId) {
                  a[i].content.push('kh:' + messageReceived.content.getMessage())
                  temp = 1
                }
              }
              if (temp === 0) {
                a.push({
                  'content': ['kh:' + messageReceived.content.getMessage()],
                  'id': messageReceived.senderId + messageReceived.receiverId,
                  'customer': messageReceived.content.getSender()
                })
              }
            }
            setChatMessage(a)
            localStorage.setItem('chatMessage', JSON.stringify(chatMessage))
            console.log(chatMessage)
            setLists(l => lists.concat(messageReceived.content.getMessage()))
            notify(messageReceived)
            break
          }
        case contactProto.SaigonParkingMessage.Type.BOOKING_REQUEST:
          {
            setLists(l => lists.concat(messageReceived.content.getCustomername() + messageReceived.content.getCustomerlicense() + messageReceived.content.getAmountofparkinghour()))
            notify(messageReceived)
            break
          }
        case contactProto.SaigonParkingMessage.Type.BOOKING_CANCELLATION:
          {
            setLists(l => lists.concat(messageReceived.content.getReason()))
            notify(messageReceived)
            break
          }
        case contactProto.SaigonParkingMessage.Type.IMAGE:
          {
            //imgae
          }
        default:
          {
            setLists(l => lists.concat(messageReceived.content));
            break
          }
      }
    }
  }, [messageReceived])

  // ------------------------------------------------------------------------ //

  // accept booking send message //
  const acceptRequestBook = (message) => {
    // sendMessage set filed and send //
    const content = new contactProto.BookingAcceptanceContent()
    content.setBookingid(message.content.getBookingid())

    const messages = new contactProto.SaigonParkingMessage()
    messages.setSenderid(message.receiverId)
    messages.setReceiverid(message.senderId)
    messages.setContent(content.serializeBinary())
    messages.setClassification(contactProto.SaigonParkingMessage.Classification.PARKING_LOT_MESSAGE)
    messages.setType(contactProto.SaigonParkingMessage.Type.BOOKING_ACCEPTANCE)
    messages.setTimestamp(moment(new Date()).format("YYYY-MM-DD HH:mm:ss"))
    clients.send(messages.serializeBinary())

    console.log('accept book: ', messages)
    // ------------------------------------------------------------------------ //
  }
  // ------------------------------------------------------------------------ //

  // reject booking send message //
  const rejectRequestBook = (message) => {
    // sendMessage set filed and send //
    const content = new contactProto.BookingRejectContent()
    content.setBookingid(message.content.getBookingid())
    content.setReason('Already full Slot')

    const messages = new contactProto.SaigonParkingMessage()
    messages.setSenderid(message.receiverId)
    messages.setReceiverid(message.senderId)
    messages.setContent(content.serializeBinary())
    messages.setClassification(contactProto.SaigonParkingMessage.Classification.PARKING_LOT_MESSAGE)
    messages.setType(contactProto.SaigonParkingMessage.Type.BOOKING_REJECT)
    messages.setTimestamp(moment(new Date()).format("YYYY-MM-DD HH:mm:ss"))
    clients.send(messages.serializeBinary())

    console.log('reject book: ', messages)
    // ------------------------------------------------------------------------ //
  }
  // ------------------------------------------------------------------------ //


  const handleChangeUserName = (e) => {
    setUserName(e.target.value)
  }

  const handleChangePassword = (e) => {
    setPassword(e.target.value)
  }

  // handle submit Login //
  const handleSubmit = () => {
    const request = new authProto.ValidateRequest();
    request.setUsername(userName);
    request.setPassword(password);
    request.setRole(userProto.UserRole.PARKING_LOT_EMPLOYEE)

    authService.validateUser(request, {}, (err, res) => {
      if (err) {
        window.alert('Username or Password was wrong!')
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
  // ------------------------------------------------------------------------ //

  // Custom toast when request book or something //

  const MsgContent = ({ message, callCloseToast, id }) => {
    const [values, setValues] = useState('')
    switch (message.type) {
      //content with switch on type declare here
      case contactProto.SaigonParkingMessage.Type.NOTIFICATION:
        return <>{message.content.getNotification()}</>
      case contactProto.SaigonParkingMessage.Type.TEXT_MESSAGE:
        return <><span style={{ width: 'auto', fontWeight: 'bold' }}>{message.content.getSender()}</span>: {message.content.getMessage()}
          <form onSubmit={(e) => {
            e.preventDefault();
            send(message, values)
            let a = chatMessage
            for (let i = 0; i < a.length; i++) {
              if (a[i].id === id) {
                a[i].content.push('bx:' + values)
              }
            }
            setChatMessage(a)
            localStorage.setItem('chatMessage', JSON.stringify(a))
            callCloseToast()
          }}>
            <label>Chat:</label>
            <input type="text" value={values} name="name" onChange={(e) => setValues(e.target.value)} />
            <input type="submit" value="Send" />
          </form>
        </>;
      case contactProto.SaigonParkingMessage.Type.BOOKING_REQUEST:
        return <>{message.content.getCustomername() + message.content.getCustomerlicense()} book {message.content.getAmountofparkinghour()} hour</>
      case contactProto.SaigonParkingMessage.Type.BOOKING_CANCELLATION:
        return <>{message.content.getBookingid()} cancel booking with reason: {message.content.getReason()}</>;
      case contactProto.SaigonParkingMessage.Type.IMAGE:
        return <></>
      default:
        return <></>;
    }
  }

  const Msg = ({ message, closeToast, id }) => {
    console.log(message)
    return (
      <div>
        <MsgContent message={message} callCloseToast={closeToast} id={id} />
        {message.type === contactProto.SaigonParkingMessage.Type.BOOKING_REQUEST ?
          <div style={{ marginLeft: '60%' }}>
            <button onClick={() => { acceptRequestBook(message); closeToast() }}>Accept</button>
            <button onClick={() => { rejectRequestBook(message); closeToast() }}>Reject</button>
          </div> : <></>}
      </div>
    )
  }

  //Update chatText
  const MsgUpdateText = ({ message, temp, id }) => {
    const [values, setValues] = useState('')
    return (
      <div>
        <span style={{ width: 'auto', fontWeight: 'bold' }}>{message.content.getSender()}</span>:
        <ul style={{ listStyleType: 'none', paddingInlineStart: '5px' }}>
          {temp.map((data, index) => {
            let style = data.substring(0, 3) === 'kh:' ? { textAlign: 'left' } : { textAlign: 'right' }
            return <li style={style} key={index}>
              {data.substring(3)}
            </li>
          })}
        </ul>
        <form onSubmit={(e) => {
          e.preventDefault();
          send(message, values)
          let a = chatMessage
          for (let i = 0; i < a.length; i++) {
            if (a[i].id === id) {
              a[i].content.push('bx:' + values)
            }
          }
          setChatMessage(a)
          localStorage.setItem('chatMessage', JSON.stringify(a))
          toast.dismiss(id)
        }}>
          <label>Chat:</label>
          <input type="text" value={values} name="name" onChange={(e) => setValues(e.target.value)} />
          <input type="submit" value="Send" />
        </form>
      </div>
    )
  }

  const notify = (message) => {
    switch (message.type) {
      //nofti with switch on type declare here
      case contactProto.SaigonParkingMessage.Type.NOTIFICATION:
        {
          toast.warn(<Msg message={message} />,
            {
              position: "bottom-right",
              autoClose: true,
              onClose: () => { },
              closeButton: false,
              draggable: false,
              closeOnClick: true,
            })
          break
        }
      case contactProto.SaigonParkingMessage.Type.TEXT_MESSAGE:
        {
          let id = message.senderId + message.receiverId
          if (toast.isActive(id)) {
            let temp = []
            for (let i = 0; i < chatMessage.length; i++) {
              if (chatMessage[i].id === id) {
                temp = chatMessage[i].content
              }
            }
            toast.update(id, {
              render: () => <MsgUpdateText message={message} temp={temp} id={id} />
            })
          }
          else {
            setNumberMessage(numberMessage + 1)
            toast.info(<Msg message={message} id={id} />,
              {
                toastId: id,
                position: "bottom-left",
                autoClose: false,
                onClose: () => {
                  setNumberMessage(numberMessage => numberMessage - 1)
                },
                closeButton: true,
                draggable: false,
                closeOnClick: false,
              })
          }
          break
        }
      case contactProto.SaigonParkingMessage.Type.BOOKING_REQUEST:
        {
          toast.success(<Msg message={message} />,
            {
              position: "bottom-right",
              autoClose: false,
              onClose: () => { },
              closeButton: false,
              draggable: false,
              closeOnClick: false,
            })
          break
        }
      case contactProto.SaigonParkingMessage.Type.BOOKING_CANCELLATION:
        {
          toast.error(<Msg message={message} />,
            {
              position: "bottom-right",
              autoClose: true,
              onClose: () => { },
              closeButton: false,
              draggable: false,
              closeOnClick: false,
            })
          break
        }
      case contactProto.SaigonParkingMessage.Type.IMAGE:
        return <></>
      default:
        return <></>;
    }
  }
  //--------------------------------------------------------------------------//

  return (
    <>
      {flagIsLogin ?
        <>
          <Navbar numberMessage={numberMessage} />
          <div className='rightTab'>
            <div className='listItem'>
              {chatMessage.map((data, index) => {
                return (
                  <ul onClick={() => console.log('open chatbox')} key={index} style={{ border: '1px solid black', width: '100%', listStyleType: 'none', paddingInlineStart: '0' }}>
                    <h5 style={{ margin: '0' }}>{data.customer}:</h5>
                    <li key={index}>{data.content[data.content.length - 1].substring(0, 3) === 'kh:' ? data.content[data.content.length - 1].substring(3) : 'You:' + data.content[data.content.length - 1].substring(3)}</li>
                  </ul>
                )
              })}
            </div>
          </div>
          <div className='container'>
            <div className='contentContainer'>
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
      <ToastContainer style={{ width: 'auto' }} />
    </>
  );
}

export default App;
