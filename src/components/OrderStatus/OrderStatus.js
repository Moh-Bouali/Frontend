import React, {useEffect, useState} from 'react';
import { withRouter } from 'react-router-dom'; 
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
// Set the backend location
const ENDPOINT = "http://localhost:8080/ws";

function OrderStatus(props) {

  const [stompClient, setStompClient] = useState(null);
  const sleep = ms => new Promise(r => setTimeout(r, ms));

  useEffect(() => {
    // use SockJS as the websocket client
    const socket = SockJS(ENDPOINT);
    // Set stomp to use websockets
    const stompClient = Stomp.over(socket);
    // connect to the backend
    stompClient.connect({}, () => {
      // subscribe to the backend
      stompClient.subscribe('/topic/status', (data) => {
        console.log(data);
        onMessageReceived(data);
      });
    });
    // maintain the client for sending and receiving
    setStompClient(stompClient);
  }, []);

  // send the data using Stomp
    const sendRestaurantMessage = () => {
            const response = "The restaurant has accepted your order and they are making it now"
            stompClient.send("/app/orderStatus", {}, JSON.stringify({'newStatusMessage': response}));  
  };
  const sendPickedUpMessage = () => {
    const response = "The delivery driver has picked up your order and is on his way"
    stompClient.send("/app/orderStatus", {}, JSON.stringify({'newStatusMessage': response}));
  };
  const sendDeliveredMessage = () => {
    (async() => {
        const response = "Your order has been delivered, enjoy"
        stompClient.send("/app/orderStatus", {}, JSON.stringify({'newStatusMessage': response}));
        await sleep(3000);
        disconnect();
        props.history.push('/mainpage')
    })();
  };

  // display the received data
  function onMessageReceived(data)
  {
    const result = JSON.parse(data.body);
    alert(result.content)
  };

  const disconnect = () => {
    stompClient.disconnect();
  }

  return (
    <div className="d-flex flex-column justify-content-around">
    <br></br>
    <button  onClick={sendRestaurantMessage}>Send Restaurant Message</button>
    <button  onClick={sendPickedUpMessage}>Finish pickup</button>
    <button  onClick={sendDeliveredMessage}>Delivered</button>
  </div>
  );
}
export default withRouter(OrderStatus);