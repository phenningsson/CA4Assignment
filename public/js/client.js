//required for front end communication between client and server

const socket = io();

const inboxPeople = document.querySelector(".inbox__people");



let userName = "";
let id;
const newUserConnected = function (data) {
    

    //give the user a random unique id
    id = Math.floor(Math.random() * 1000000);
    userName = 'user-' +id;
    console.log(typeof(userName));   
    

    //emit an event with the user id
    socket.emit("new user", userName);
    //call
    addToUsersBox(userName);
};

const addToUsersBox = function (userName) {
    //This if statement checks whether an element of the user-userlist
    //exists and then inverts the result of the expression in the condition
    //to true, while also casting from an object to boolean
    if (!!document.querySelector(`.${userName}-userlist`)) {
        return;
    }
    
    //setup the divs for displaying the connected users
    //id is set to a string including the username
    const userBox = `
    <div class="chat_id ${userName}-userlist">
      <h5>${userName}</h5>
    </div>
  `;
    //set the inboxPeople div with the value of userbox
    inboxPeople.innerHTML += userBox;

    // sends user a notification that a new user has joined
    var userJoinedNoti = document.getElementById("userJoined");
    userJoinedNoti.innerHTML = userName + " joined the chat";
};

//call 
newUserConnected();

//when a new user event is detected
socket.on("new user", function (data) {
  data.map(function (user) {
          return addToUsersBox(user);
      });
});

//when a user leaves
socket.on("user disconnected", function (userName) {
  document.querySelector(`.${userName}-userlist`).remove();
  console.log(userName + "disconnected");
      // sends user a notification that a user has left
  var userLeftNoti = document.getElementById("userLeft");
  userLeftNoti.innerHTML = userName + " left the chat";
});


const inputField = document.querySelector(".message_form__input");
const messageForm = document.querySelector(".message_form");
const messageBox = document.querySelector(".messages__history");

const addNewMessage = ({ user, message }) => {
  const time = new Date();
  const formattedTime = time.toLocaleString("en-US", { hour: "numeric", minute: "numeric" });

  const receivedMsg = `
  <div class="incoming__message">
    <div class="received__message">
    <span class="message__author">${user}</span>
        <span class="time_date">${formattedTime}</span>
      <p>${message}</p>
      <div class="message__info">
      </div>
    </div>
  </div>`;

  const myMsg = `
  <div class="outgoing__message">
    <div class="sent__message">
    <span class="message__author">${user} (me)</span>
        <span class="time_date">${formattedTime}</span>
      <p>${message}</p>
      <div class="message__info">
      </div>
    </div>
  </div>`;

  //is the message sent or received
  messageBox.innerHTML += user === userName ? myMsg : receivedMsg;
};

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!inputField.value) {
    return;
  }

  socket.emit("chat message", {
    message: inputField.value,
    nick: userName,
  });

  inputField.value = "";
});


// Typing indicator created using: https://developer.mozilla.org/en-US/docs/Web/API/Element/keyup_event, 
// https://www.w3schools.com/jsref/event_oninput.asp, https://pusher.com/tutorials/typing-indicator-javascript/#set-up-the-chat-application-web-page
//https://stackoverflow.com/questions/65901241/typing-status-when-input-field-is-typed-in
// Youtube video: https://www.youtube.com/watch?v=FvArk8-qgCk&list=PL4cUxeGkcC9i4V-_ZVwLmOusj8YAUhj_9&index=6 
// https://stackoverflow.com/questions/4220126/run-javascript-function-when-user-finishes-typing-instead-of-on-key-up 

// listener for typing event 
messageForm.addEventListener("keyup", function(){
  socket.emit("typing", userName);
});


var isTyping = null;
var callTime = 2000; // amount of time user is typing... will be displayed when a key is pressed


// sending user is typing...
socket.on("typing", function(data){

// typing indicator 
 var userIsTyping = document.getElementById("isTyping");
 userIsTyping.innerHTML = data + " is typing...";

// clearing the user who isTyping
if(isTyping){
    clearTimeout(isTyping);
  }

  // changing user is typing... to No one is typing when the callTime has been reached which is 2 seconds
  setTimeout(function () {
    userIsTyping.innerHTML = "No one is typing :(";
  }, callTime);


});

socket.on("chat message", function (data) {
  addNewMessage({ user: data.nick, message: data.message });
});