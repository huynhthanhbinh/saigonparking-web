import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './component/navbar'
import Cookies from 'js-cookie'
import { Button, Modal } from 'semantic-ui-react'
import { w3cwebsocket as W3CWebSocket } from "websocket";
import 'semantic-ui-css/semantic.min.css'
import authProto from './api/Auth_pb'
import { API_URL } from './saigonparking'
import { WEBSOCKET_URL } from './saigonparking'
import { StringValue, Int64Value } from 'google-protobuf/google/protobuf/wrappers_pb'
import { AuthServiceClient } from './api/Auth_grpc_web_pb'
import { UserServiceClient } from './api/Actor_grpc_web_pb';
import { ParkingLotServiceClient } from './api/ParkingLot_grpc_web_pb'
import { BookingServiceClient } from './api/Booking_grpc_web_pb';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import contactProto from './api/Contact_pb'
import bookingProto from './api/Booking_pb'
import parkingLotProto from './api/ParkingLot_pb'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment'
import { Popup, Grid } from 'semantic-ui-react'
import Notification from 'react-web-notification'
import icon from './images/parking.png'
import { PieChart } from 'react-minimal-pie-chart';
import ReactStars from "react-rating-stars-component";

const userProto = require('./api/Actor_pb')
const bookingService = new BookingServiceClient(API_URL)
const authService = new AuthServiceClient(API_URL)
const userService = new UserServiceClient(API_URL)
const parkingLotService = new ParkingLotServiceClient(API_URL)

function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [flagIsLogin, setFlagIsLogin] = useState(false)
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [clients, setClients] = useState(null)
  const [numberMessage, setNumberMessage] = useState(0)
  const [chatMessage, setChatMessage] = useState([])
  const [bookingPending, setBookingPending] = useState([])
  const [searchBook, setSerchBook] = useState('')
  const [information, setInformation] = useState(null)
  const [topComment, setTopComment] = useState(null)
  const [feed, setFeed] = useState(null)
  const [disableButtonAcRj, setDisableButtonAcRj] = useState(false)
  const [optionsNofti, setOptionNofti] = useState({
    askAgain: true,
    ignore: true,
    title: 'Sai Gon Parking Map',
    options: {
      tag: 'This is Tag',
      body: '',
      icon: icon,
      lang: 'en',
      dir: 'ltr',
      renotify: true
    }
  })

  const [countAllbooking, setCountAllbooking] = useState({
    CREATED: { title: 'Created', value: 0, color: '#FFFF00' },
    ACCEPTED: { title: 'Accepted', value: 0, color: '#24ff0b' },
    REJECTED: { title: 'Rejected', value: 0, color: '#B22222' },
    CANCELLED: { title: 'Cancelled', value: 0, color: '#A9A9A9' },
    FINISHED: { title: 'Finished', value: 0, color: '#00FFFF' },
  })



  /**
   * Check RenewToken every 10 minute
   */
  useEffect(() => {
    const interval = setInterval(() => {
      getInformationUser();
    }, 600000);
    return () => clearInterval(interval);
  }, []);

  //--------------------------------------------------------------------------------------//

  /**
   * get Information ParkingLot
   */

  const getInformationParking = (id) => {
    const token = 'Bearer ' + Cookies.get("token");
    const metadata = { 'Authorization': token }
    const request = new Int64Value()
    request.setValue(id)
    parkingLotService.getParkingLotById(request, metadata, (err, res) => {
      if (err) {

      }
      else {
        let temp = {
          availableSlot: null,
          totalSlot: null,
          detail: {
            address: null,
            name: null,
            phone: null,
            numberRating: null,
            ratingAverage: null
          },
          openHour: null,
          closeHour: null
        }
        temp.availableSlot = res.getAvailableslot()
        temp.totalSlot = res.getTotalslot()
        temp.detail.address = res.getInformation().getAddress()
        temp.detail.name = res.getInformation().getName()
        temp.detail.phone = res.getInformation().getPhone()
        temp.detail.numberRating = res.getInformation().getNumberofrating()
        temp.detail.ratingAverage = res.getInformation().getRatingaverage()
        temp.openHour = res.getOpeninghour()
        temp.closeHour = res.getClosinghour()
        setInformation(prev => temp)
      }
    })
  }

  //--------------------------------------------------------------------------------------//

  /**
   *  get last 10 comment
   */

  const getCommentParkingLot = (id) => {
    const token = 'Bearer ' + Cookies.get("token");
    const metadata = { 'Authorization': token }
    const request = new parkingLotProto.GetAllRatingsOfParkingLotRequest()
    request.setParkinglotid(id)
    request.setNrow(10)
    request.setPagenumber(1)
    parkingLotService.getAllRatingsOfParkingLot(request, metadata, (err, res) => {
      if (err) {

      }
      else {
        let temp = []
        for (let i = 0; i < res.getRatingList().length; i++) {
          temp.push({
            comment: res.getRatingList()[i].getComment(),
            userName: res.getRatingList()[i].getUsername(),
            rating: res.getRatingList()[i].getRating()
          })
        }
        setTopComment(temp)
      }
    })
  }

  //--------------------------------------------------------------------------------------//

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
      else {
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
          {
            getOnGoingBooking(localStorage.getItem('ID'))
            return contactProto.BookingRequestContent.deserializeBinary(dataU8)
          }
        case contactProto.SaigonParkingMessage.Type.BOOKING_CANCELLATION:
          {
            getOnGoingBooking(localStorage.getItem('ID'))
            return contactProto.BookingCancellationContent.deserializeBinary(dataU8)
          }
        case contactProto.SaigonParkingMessage.Type.IMAGE:
          return dataU8
        case contactProto.SaigonParkingMessage.Type.HISTORY_CHANGE:
          {
            getOnGoingBooking(localStorage.getItem('ID'))
            break;
          }
        case contactProto.SaigonParkingMessage.Type.BOOKING_FINISH:
          {
            getOnGoingBooking(localStorage.getItem('ID'))
            return contactProto.BookingFinishContent.deserializeBinary(dataU8)
          }
        case contactProto.SaigonParkingMessage.Type.BOOKING_ACCEPTANCE:
          {
            getOnGoingBooking(localStorage.getItem('ID'))
            break;
          }
        case contactProto.SaigonParkingMessage.Type.BOOKING_REJECT:
          {
            getOnGoingBooking(localStorage.getItem('ID'))
            break;
          }
        case contactProto.SaigonParkingMessage.Type.AVAILABILITY_UPDATE:
          {
            getInformationParking(localStorage.getItem('ID'))
            break;
          }
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
  }
  // ------------------------------------------------------------------------ //

  /**
   * Function get Ongoing booking
   */
  const getOnGoingBooking = React.useCallback(
    (id) => {
      const token = Cookies.get("token")
      const metadata = { 'Authorization': token }
      const request = new Int64Value()
      request.setValue(id)
      bookingService.getAllOnGoingBookingOfParkingLot(request, metadata, (err, res) => {
        if (err) {
          getInformationUser()
        }
        else {
          localStorage.setItem('listPending', JSON.stringify(res.getBookingList()))
          setBookingPending([].concat(res.getBookingList()))
          setDisableButtonAcRj(false)
        }
      })
      countAllBooking(id)
      getCommentParkingLot(id)
    },
    [],
  )

  // ------------------------------------------------------------------------ //

  /**
   * Count all booking by status
   */

  const countAllBooking = React.useCallback(
    (id) => {
      let temp = {
        CREATED: { title: 'Created', value: 0, color: '#FFFF00' },
        ACCEPTED: { title: 'Accepted', value: 0, color: '#24ff0b' },
        REJECTED: { title: 'Rejected', value: 0, color: '#B22222' },
        CANCELLED: { title: 'Cancelled', value: 0, color: '#A9A9A9' },
        FINISHED: { title: 'Finished', value: 0, color: '#00FFFF' },
      }
      const token = Cookies.get("token")
      const metadata = { 'Authorization': token }
      const request = new Int64Value()
      request.setValue(id)
      bookingService.countAllBookingOfParkingLotGroupByStatus(request, metadata, (err, res) => {
        if (err) { getInformationUser() }
        else {
          let result = res.getStatuscountMap().toArray()
          for (let i = 0; i < result.length; i++) {
            switch (result[i][0]) {
              case bookingProto.BookingStatus.CREATED:
                {
                  temp.CREATED.value = result[i][1]
                  break
                }
              case bookingProto.BookingStatus.ACCEPTED:
                {
                  temp.ACCEPTED.value = result[i][1]
                  break
                }
              case bookingProto.BookingStatus.REJECTED:
                {
                  temp.REJECTED.value = result[i][1]
                  break
                }
              case bookingProto.BookingStatus.CANCELLED:
                {
                  temp.CANCELLED.value = result[i][1]
                  break
                }
              case bookingProto.BookingStatus.FINISHED:
                {
                  temp.FINISHED.value = result[i][1]
                  break
                }
              default:
                break
            }
          }
          setCountAllbooking(temp)
        }
      })
    },
    [],
  )

  // ------------------------------------------------------------------------ //

  //Open connected Websocket //
  useEffect(() => {
    let isCancelled = false;
    // get News from VNExpress.net
    let Parser = require('rss-parser');
    const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"
    let parser = new Parser();
    parser.parseURL(CORS_PROXY + 'https://vnexpress.net/rss/tin-moi-nhat.rss', function (err, feed) {
      if (err) { console.log('Error get Feed!') } else setFeed(feed.items)
    })
    if (('Notification') in window) {
      window.Notification.requestPermission() // request permission Noti in browser
    }

    const token = Cookies.get("token");
    const refreshtoken = Cookies.get("refreshtoken");
    const checkUserName = Cookies.get("checkUserName");
    const metadata = { 'Authorization': token }
    if (token && checkUserName && refreshtoken && !isCancelled) {
      setFlagIsLogin(true)
      if (clients === null) {
        setClients(new W3CWebSocket(`${WEBSOCKET_URL}/contact/web?token=${token}`))
      }
      const request = new Empty();
      parkingLotService.getParkingLotIdByAuthorizationHeader(request, metadata, (err, res) => {
        if (err && !isCancelled) {
          console.log(err)
          getInformationUser()
        }
        else {
          if (!isCancelled) {
            localStorage.setItem('ID', res.getValue())
            getOnGoingBooking(localStorage.getItem('ID'))
            getInformationParking(localStorage.getItem('ID'))
          }
        }
      })
    }
    else {
      if (!isCancelled) {
        setIsOpen(true)
      }
    }
    return () => {
      isCancelled = true;
    };
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
        console.log('Connected')
      };

      clients.onmessage = (data) => {
        // change received message to Unit8Array and convert to object and set to State MesssageReceived //
        if (data.data.arrayBuffer) {
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
        }

        // ------------------------------------------------------------------------ //
      };
    }
  }, [clients])

  // ------------------------------------------------------------------------ //

  //useEffect handle onmessage by type
  useEffect(() => {
    if (messageReceived.type !== null) {
      localStorage.getItem('chatMessage') ? setChatMessage(JSON.parse(localStorage.getItem('chatMessage'))) : console.log('Available')
      //trigger onmessage ở đây
      switch (messageReceived.type) {
        case contactProto.SaigonParkingMessage.Type.NOTIFICATION:
          {
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
            notify(messageReceived)
            break
          }
        case contactProto.SaigonParkingMessage.Type.BOOKING_REQUEST:
          {
            handleDescrease()
            notify(messageReceived)
            break
          }
        case contactProto.SaigonParkingMessage.Type.BOOKING_CANCELLATION:
          {
            handleInscrease()
            notify(messageReceived)
            break
          }
        case contactProto.SaigonParkingMessage.Type.IMAGE:
          {
            //imgae
            break
          }
        case contactProto.SaigonParkingMessage.Type.BOOKING_FINISH:
          {
            handleInscrease()
            notify(messageReceived)
            break
          }
        default:
          {
            break
          }
      }
    }
  }, [messageReceived])

  // ------------------------------------------------------------------------ //

  /**
   * Finish OnGoing Booking
   */

  const finishedBook = (data) => {
    // sendMessage set filed and send //
    const content = new contactProto.BookingRejectContent()
    content.setBookingid(data.getId())

    const messages = new contactProto.SaigonParkingMessage()
    messages.setSenderid(data.getParkinglotid())
    messages.setReceiverid(0)
    messages.setContent(content.serializeBinary())
    messages.setClassification(contactProto.SaigonParkingMessage.Classification.PARKING_LOT_MESSAGE)
    messages.setType(contactProto.SaigonParkingMessage.Type.BOOKING_FINISH)
    messages.setTimestamp(moment(new Date()).format("YYYY-MM-DD HH:mm:ss"))
    clients.send(messages.serializeBinary())
  }

  // ------------------------------------------------------------------------ //

  /**
   * 
   * Accept Request With no NoTification
   */

  const acceptRequestBookWithOutNoti = (data) => {
    setDisableButtonAcRj(true)
    // sendMessage set filed and send //
    const content = new contactProto.BookingAcceptanceContent()
    content.setBookingid(data.getId())

    const messages = new contactProto.SaigonParkingMessage()
    messages.setSenderid(data.getParkinglotid())
    messages.setReceiverid(data.getCustomerid())
    messages.setContent(content.serializeBinary())
    messages.setClassification(contactProto.SaigonParkingMessage.Classification.PARKING_LOT_MESSAGE)
    messages.setType(contactProto.SaigonParkingMessage.Type.BOOKING_ACCEPTANCE)
    messages.setTimestamp(moment(new Date()).format("YYYY-MM-DD HH:mm:ss"))
    clients.send(messages.serializeBinary())
    // ------------------------------------------------------------------------ //
  }

  // ------------------------------------------------------------------------ //

  /**
   * 
   * Reject Request With no NoTification
   */

  const rejectRequestBookWithOutNoti = (data) => {
    setDisableButtonAcRj(true)
    // sendMessage set filed and send //
    const content = new contactProto.BookingRejectContent()
    content.setBookingid(data.getId())
    content.setReason('Already full Slot')

    const messages = new contactProto.SaigonParkingMessage()
    messages.setSenderid(data.getParkinglotid())
    messages.setReceiverid(data.getCustomerid())
    messages.setContent(content.serializeBinary())
    messages.setClassification(contactProto.SaigonParkingMessage.Classification.PARKING_LOT_MESSAGE)
    messages.setType(contactProto.SaigonParkingMessage.Type.BOOKING_REJECT)
    messages.setTimestamp(moment(new Date()).format("YYYY-MM-DD HH:mm:ss"))
    clients.send(messages.serializeBinary())
    handleInscrease()
    // ------------------------------------------------------------------------ //
  }

  // ------------------------------------------------------------------------ //

  /**
   * Update availbility Content
   */

  const updateAvailabilityContent = (id, value) => {
    const content = new contactProto.AvailabilityUpdateContent()
    content.setParkinglotid(id)
    content.setNewavailability(value)

    const messages = new contactProto.SaigonParkingMessage()
    messages.setReceiverid(0)
    messages.setContent(content.serializeBinary())
    messages.setClassification(contactProto.SaigonParkingMessage.Classification.PARKING_LOT_MESSAGE)
    messages.setType(contactProto.SaigonParkingMessage.Type.AVAILABILITY_UPDATE)
    messages.setTimestamp(moment(new Date()).format("YYYY-MM-DD HH:mm:ss"))
    clients.send(messages.serializeBinary())
  }

  // ------------------------------------------------------------------------ //

  /**
   * handle inscrease availbility
   */

  const handleInscrease = () => {
    updateAvailabilityContent(localStorage.getItem('ID'), information.availableSlot + 1)
    let temp = {
      availableSlot: null,
      totalSlot: null,
      detail: {
        address: null,
        name: null,
        phone: null,
        numberRating: null,
        ratingAverage: null
      },
      openHour: null,
      closeHour: null
    }
    temp.availableSlot = information.availableSlot + 1
    temp.totalSlot = information.totalSlot
    temp.detail.address = information.detail.address
    temp.detail.name = information.detail.name
    temp.detail.phone = information.detail.phone
    temp.detail.numberRating = information.detail.numberRating
    temp.detail.ratingAverage = information.detail.ratingAverage
    temp.openHour = information.openHour
    temp.closeHour = information.closeHour
    setInformation(prev => temp)
  }
  // ------------------------------------------------------------------------ //

  /**
   * handle descrease availbility
   */

  const handleDescrease = () => {
    updateAvailabilityContent(localStorage.getItem('ID'), information.availableSlot - 1)
    let temp = {
      availableSlot: null,
      totalSlot: null,
      detail: {
        address: null,
        name: null,
        phone: null,
        numberRating: null,
        ratingAverage: null
      },
      openHour: null,
      closeHour: null
    }
    temp.availableSlot = information.availableSlot - 1
    temp.totalSlot = information.totalSlot
    temp.detail.address = information.detail.address
    temp.detail.name = information.detail.name
    temp.detail.phone = information.detail.phone
    temp.detail.numberRating = information.detail.numberRating
    temp.detail.ratingAverage = information.detail.ratingAverage
    temp.openHour = information.openHour
    temp.closeHour = information.closeHour
    setInformation(prev => temp)
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
      case contactProto.SaigonParkingMessage.Type.BOOKING_CANCELLATION:
        return <>XXXXXXXX-XXXX-XXXX-XXXX-{message.content.getBookingid().substring(24)} cancel booking with reason: {message.content.getReason()}</>;
      case contactProto.SaigonParkingMessage.Type.IMAGE:
        return <></>
      default:
        return <></>;
    }
  }

  const Msg = ({ message, closeToast, id }) => {
    return (
      <div>
        <MsgContent message={message} callCloseToast={closeToast} id={id} />
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
          let Nofti = optionsNofti
          Nofti.ignore = false
          Nofti.options.tag = new Date()
          Nofti.options.body = message.content.getNotification()
          setOptionNofti(Nofti)
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
          let Nofti = optionsNofti
          Nofti.ignore = false
          Nofti.options.tag = new Date()
          Nofti.options.body = `${message.content.getCustomername()}: ${message.content.getCustomerlicense()} book ${message.content.getAmountofparkinghour()} hours`
          setOptionNofti(Nofti)
          break
        }
      case contactProto.SaigonParkingMessage.Type.BOOKING_CANCELLATION:
        {
          getOnGoingBooking(localStorage.getItem('ID'))
          let Nofti = optionsNofti
          Nofti.ignore = false
          Nofti.options.tag = new Date()
          Nofti.options.body = `${message.content.getBookingid()}: ${message.content.getReason()}`
          setOptionNofti(Nofti)
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
      case contactProto.SaigonParkingMessage.Type.BOOKING_FINISH:
        {
          let Nofti = optionsNofti
          Nofti.ignore = false
          Nofti.options.tag = new Date()
          Nofti.options.body = message.content.getBookingid() + ' FINISHED!'
          setOptionNofti(Nofti)
          break
        }
      case contactProto.SaigonParkingMessage.Type.IMAGE:
        return <></>
      default:
        return <></>;
    }
  }
  //--------------------------------------------------------------------------//

  const handleNotSupported = () => {
    console.log('Web Notification not Supported');
  }



  return (
    <>
      {flagIsLogin ?
        <>
          <Navbar numberMessage={numberMessage} flag={flat} />
          <div className='rightTab'>
            <div className='listItem'>
              {feed ? feed.map((data, index) => <ul key={index}><li key={index} style={{ fontWeight: 'bold' }}><h4><a target="_blank" rel="noopener noreferrer" href={data.link}>{data.title}</a></h4><div target="_blank" className='contentRss' dangerouslySetInnerHTML={{ __html: data.content }} /></li></ul>) : null}
              {/* {chatMessage.map((data, index) => {
                return (
                  <ul onClick={() => console.log('open chatbox')} key={index} style={{ border: '1px solid black', width: '100%', listStyleType: 'none', paddingInlineStart: '0' }}>
                    <h5 style={{ margin: '0' }}>{data.customer}:</h5>
                    <li key={index}>{data.content[data.content.length - 1].substring(0, 3) === 'kh:' ? data.content[data.content.length - 1].substring(3) : 'You:' + data.content[data.content.length - 1].substring(3)}</li>
                  </ul>
                )
              })} */}
            </div>
          </div>
          <div className='contentContainer'>
            <div className="listPending">
              <ul>
                {bookingPending.length !== 0 ? <>
                  <h2>Booking: </h2>
                  Search: <input style={{ width: '80%' }} onChange={(e) => setSerchBook(e.target.value)} value={searchBook} placeholder='Id booking or license...' />
                  {bookingPending.sort((a, b) => (a.getLateststatus() === bookingProto.BookingStatus.ACCEPTED && b.getLateststatus() === bookingProto.BookingStatus.CREATED) ? 1 : -1).map((data, index) => {
                    if (searchBook !== '' && data.getId().toString().indexOf(searchBook) === -1 && data.getLicenseplate().toString().indexOf(searchBook) === -1) {
                      return null
                    }
                    if (data.getLateststatus() === bookingProto.BookingStatus.ACCEPTED)
                      return <Popup key={index} content='Click to Finish' trigger={<li onClick={() => finishedBook(data)} className='pendingLiAccepted' key={index}><span>ID: XXXXXXXX-XXXX-XXXX-XXXX-{data.getId().substring(24)} <br /> <h4>Customer ongoing...</h4>License Plate: {data.getLicenseplate()} | At: {data.getCreatedat()}</span></li>} position="left center" offset='-20px, 0' />
                    else if (data.getLateststatus() === bookingProto.BookingStatus.CREATED)
                      return <Popup key={index} trigger={<li className='pendingLiCreated' key={index}><span>ID: XXXXXXXX-XXXX-XXXX-XXXX-{data.getId().substring(24)} <br /> <h4>Wait for Approval!!!</h4>Licenseplate: {data.getLicenseplate()} | At: {data.getCreatedat()}</span></li>} flowing hoverable position='top right'>
                        <Grid centered divided columns={2}>
                          <Grid.Column textAlign='center'>
                            <Button disabled={disableButtonAcRj} onClick={() => acceptRequestBookWithOutNoti(data)}>Accept</Button>
                          </Grid.Column>
                          <Grid.Column textAlign='center'>
                            <Button disabled={disableButtonAcRj} onClick={() => rejectRequestBookWithOutNoti(data)}>Reject</Button>
                          </Grid.Column>
                        </Grid>
                      </Popup>
                  })} </> : <h2>No Pending Booking...</h2>}
              </ul>
            </div>
          </div>
          <div className='container'>
            <div className='contentContainerMiddle'>
              <div className='box'>
                <div className='boxContent'>
                  {information ? <>
                    <span style={{ fontWeight: 'bold' }}>Available Slot: </span>{information.availableSlot} / <span style={{ fontWeight: 'bold' }}>Total Slot: </span> {information.totalSlot} <br />
                    <span style={{ fontWeight: 'bold' }}>Address: </span>{information.detail.address}<br />
                    <span style={{ fontWeight: 'bold' }}>Name: </span>{information.detail.name}<br />
                    <span style={{ fontWeight: 'bold' }}>Phone: </span>{information.detail.phone}<br />
                    <span style={{ fontWeight: 'bold' }}>Vote: </span>{information.detail.numberRating}<br />
                    <ReactStars size={20} value={information.detail.ratingAverage ? information.detail.ratingAverage : null} edit={false} />
                    <span style={{ fontWeight: 'bold' }}>Opening Hour: </span>Opening Hour: {information.openHour}<br />
                    <span style={{ fontWeight: 'bold' }}>Closing Hour: </span>Closing Hour: {information.closeHour}<br />
                  </> : null}
                </div>
              </div>
              <div className='box'>
                <div className='boxContent'>
                  <PieChart
                    lineWidth={20}
                    animate={true}
                    data={[
                      { title: countAllbooking.CREATED.title, value: countAllbooking.CREATED.value, color: countAllbooking.CREATED.color },
                      { title: countAllbooking.ACCEPTED.title, value: countAllbooking.ACCEPTED.value, color: countAllbooking.ACCEPTED.color },
                      { title: countAllbooking.REJECTED.title, value: countAllbooking.REJECTED.value, color: countAllbooking.REJECTED.color },
                      { title: countAllbooking.CANCELLED.title, value: countAllbooking.CANCELLED.value, color: countAllbooking.CANCELLED.color },
                      { title: countAllbooking.FINISHED.title, value: countAllbooking.FINISHED.value, color: countAllbooking.FINISHED.color }
                    ]}
                    label={() => { return countAllbooking.CREATED.value + countAllbooking.ACCEPTED.value + countAllbooking.REJECTED.value + countAllbooking.CANCELLED.value + countAllbooking.FINISHED.value }}
                    labelStyle={{
                      fontSize: '25px',
                      fontFamily: 'sans-serif',
                      fill: '#E38627',
                    }}
                    labelPosition={0}
                  />
                  <h3>Count All Booking</h3>
                  <ul style={{ listStyle: 'none', padding: '0' }}>
                    <li style={{ background: `${countAllbooking.CREATED.color}`, fontWeight: 'bold', borderTopLeftRadius: '20px', borderTopRightRadius: '20px' }}>
                      REQUEST: {countAllbooking.CREATED.value}
                    </li>
                    <li style={{ background: `${countAllbooking.ACCEPTED.color}`, fontWeight: 'bold' }}>
                      ACCEPTED: {countAllbooking.ACCEPTED.value}
                    </li>
                    <li style={{ background: `${countAllbooking.REJECTED.color}`, fontWeight: 'bold' }}>
                      REJECTED: {countAllbooking.REJECTED.value}
                    </li>
                    <li style={{ background: `${countAllbooking.CANCELLED.color}`, fontWeight: 'bold' }}>
                      CANCELLED: {countAllbooking.CANCELLED.value}
                    </li>
                    <li style={{ background: `${countAllbooking.FINISHED.color}`, fontWeight: 'bold', borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px' }}>
                      FINISHED: {countAllbooking.FINISHED.value}
                    </li>
                  </ul>
                </div>
              </div>
              <div className='box'>
                <div className='boxContent'>
                  {information ? <>
                    <h3>Available Slot: </h3>
                    <h1 >{information.availableSlot}</h1>
                    <Button onClick={handleDescrease} content='Descrease' disabled={information.availableSlot === 0} color='youtube' icon='down arrow' labelPosition='left' size='mini' />
                    <Button onClick={handleInscrease} content='Inscrease' disabled={(information.availableSlot === information.totalSlot || information.availableSlot + bookingPending.length === information.totalSlot)} color='facebook' icon='up arrow' labelPosition='right' size='mini' />
                  </> : null}
                </div>
              </div>
              <div className='box'>
                <div className='boxContent'>
                  <h3>Comment: </h3>
                  {topComment ? <ul>{topComment.map((data, index) => <li key={index}>
                    <h4>{data.userName}<ReactStars size={10} value={data.rating ? data.rating : null} edit={false} /></h4> {data.comment}
                  </li>)}</ul> : <></>}
                </div>
              </div>
              <ToastContainer style={{ width: 'auto', zIndex: '2' }} />
            </div>
          </div>
          <Notification
            ignore={optionsNofti.ignore}
            notSupported={() => handleNotSupported()}
            // onPermissionGranted={this.handlePermissionGranted.bind(this)}
            onPermissionDenied={() => window.alert('Please enable Notification on this page!!!')}
            // onShow={this.handleNotificationOnShow.bind(this)}
            // onClick={this.handleNotificationOnClick.bind(this)}
            // onClose={() => {
            //   let temp = optionsNofti
            //   temp.ignore = true
            //   setOptionNofti(temp)
            // }}
            // onError={this.handleNotificationOnError.bind(this)}
            timeout={5000}
            title={optionsNofti.title}
            options={optionsNofti.options}
          />
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
    </>
  );
}

export default App;
