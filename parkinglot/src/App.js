import React, { useState } from 'react';
import './App.css';
import Navbar from './component/navbar'
import { w3cwebsocket as W3CWebSocket } from "websocket";

const header = 'barie';

const client = new W3CWebSocket('ws://localhost:8000', '', '', '');

function App() {

  const [value, setValue] = useState('')
  const [lists, setLists] = useState([])

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  const addList = () => {
    if (value) {
      setLists(lists.concat(value));
    }
    console.log(lists)
  }

  return (
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
  );
}

export default App;
