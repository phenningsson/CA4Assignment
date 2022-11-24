# CA4
 CA4 Assignment Pontus Henningsson, studentID: 52209788

Report [15 marks]

The overall approach taken when developing this website is to keep it clean and simple. A clear and beautiful background image
sets the whole theme of the website and then simple columns are built upon the background to present the content. I did not want
the website to appear "busy" or be hard to understand so keeping it simple helps get the message across, which is a portfolio 
about me. The startpage (index.html) features a short introduction to who I am, what I'm studying and my interests and hobbies
outside of Computer Science and University. The about page (about.html) is a longer and more detailed description about me that
features my CV as well as a picture of me and Computer Science-related skills. The chat page (chat.html) is simple chat
application where multiple users can connect and chat together, see when other users are typing, get notifications when 
a user joins or leaves the chat as well as seeing a list of active users. 

Using bootstrap and then customizing the default bootstrap-CSS with my own styling and design decisions for CSS, I 
managed to make the website clean and responsive as well as still being personal to my own taste and design style. The color
palette used is essentialy white, black, grey and #92b2be with various variations of the opacity. The text font used
is verdana, arial. With white text and a familiar font, the user will hopefully feel more comfortable using the website. For 
detailed descriptions of how the custom CSS was used to override the default bootstrap as well as the CSSdesign decisions,
see the comments in the custom stylesheet file "style.css". I used a color picker (https://imagecolorpicker.com/en) on my background-image in order to get a nice color that I can use
over the background as well as for the navigation bar in order to make the text more visible. At first, when the text was directly on the background the white text
was hard to see and thus it was hard to read making the user experience poor. To fix this, I created a custom class (.columnBG)
and applied it to the columns and used it on the about and chat page so the white text would be more visible. The 
layout of the pages utilizes bootstraps grid-system by using rows and columns inside the <div class"container">. The
columns have different sizes, such as the class "col-md-4" or "col-md-12" depending on the needed size of the column. 
The background of the columns (columnBG), first set as background-color: #000 and then the background-color with RGBA 
in order to support older browser that do not support CSS3 (and therefore RGBA), this got rid of a CSS validation error as well, 
I was helped by using this stackoverflow thread: 
https://stackoverflow.com/questions/17057005/why-does-a-css-hsl-assignment-require-a-fallback-color 
RGBA is used in order to set the opacity of the background color (RGB(146, 178, 190)) is the same color as the hex #92b2be, with 
the .25 on the A of the RGBA is opacity, meaning that the background color has 25% opacity - creating a nice looking
overlay over the background and makes the text more readable. 

I also added some extra stuff above the required tasks for this assignment. On the about and chat page I've added 
a little extra feature so the user can press the text (it says "press me") and the user will be sent to the top of the page. 
This is useful on both the about and chat page since the pages are rather long and it is nice to be able to scroll all the way
the top with one click - especially for the chat function if the chat becomes really long and a user would like to go back
to the beginning of the chat. 

The biggest challenge was definitely making other users see when a user is typing (broadcasting the communication from
the server to the client side) in the way I wanted to. At first, it would only be visible for the one typing that a user 
is typing. For instance, User A is typing and this would only be visible for User A with the message saying
"User A is typing..." but only on User A's screen - which is the exact opposite of what I wanted it to do. 
After spending about a day trying to solve it, using these sources: 
https://developer.mozilla.org/en-US/docs/Web/API/Element/keyup_event, 
https://www.w3schools.com/jsref/event_oninput.asp, https://pusher.com/tutorials/typing-indicator-javascript/#set-up-the-chat-application-web-page
https://stackoverflow.com/questions/65901241/typing-status-when-input-field-is-typed-in
https://www.youtube.com/watch?v=FvArk8-qgCk&list=PL4cUxeGkcC9i4V-_ZVwLmOusj8YAUhj_9&index=6 
https://stackoverflow.com/questions/4220126/run-javascript-function-when-user-finishes-typing-instead-of-on-key-up 

Essentially by trying all the methods from the sources above I managed to get the "User is typing..." broadcasted to all
clients (users) except the client that was typing - which is what I wanted. However, I couldn't get the timer on the 
event listener on the message form to be correct, so it would broadcast that "User A is typing..." to all users 
(except the one actually typing) every single time the user hit a key which was not ideal.
Users would get spammed by "User A is typing..." notifications. 
After basically just trying out the timer (created with help from the above sources) and changing the variables values and
where it should be placed within the code I managed to get it to work the way I wanted. 
However, another issue also surfaced which is that when  the <div> in the HTML Code where there "User is typing..." 
is to be displayed, when a user wasn't typing it was smaller than it was when the "User is typing..." notification is displayed. 
This meant that the <div>-box would change size all the time and changing from " " (an empty space) to "User is typing..." 
all the time which looks very bad and unprofessional. To solve this, I instead changed the empty space " " 
that is being displayed when the timer has reached 2 seconds (the user has 2 seconds for each
keystroke until the "User is typing..." stops being broadcasted and displayed to other user), to "No one is typing :(" so this 
message would be displayed instead of the empty space. This made the <div> stay the same size all the time 
which made using the chat a way more fluid and aesthetically pleasing experience. I think the main issue why I was struggling so much 
with getting the "User is typing..." to be shown to all users except the one typing comes down to me not knowing enough about
Socket.io and the server-client side communication. 

The chat application client side communicates with the server, with respect to handling events and using web sockets by
sending information between the client and the server side. For instance, for the typing indicator which sends a notification 
to users when another user is typing; "User A is typing...". First, a listener has been implemented on the client side
which listens on the messageForm (the form where the user is typing a message to be sent in the chat). The 
listener detects on "keyup" on the message form, meaning that whenever a user releases a key while typing on the 
message form, the listener detects it. The listener then calls a socket and emits "typing" (that is what the user is doing)
along with the username of the person typing to the server (index.js). The client side (client.js) is sending a message
to the server (index.js) that a user is typing, along as with which user it is. The server side then registers this
where (data) is the username of the user typing, which is then broadcasted from the server to all clients except 
the user typing by calling socket.broadcast.emit with the "typing" tag so that the client side can pick it up and know what
type of event it is. This is then received on the client side (client.js) where the information regarding who is typing is being 
displayed by a typing indicator by sending it to HTML through .innerHTML and displayed as a <div>. There is also a timer 
implemented in order so the "user is typing..." message is only displayed once and not for every time a key is released. 

**************************************************************************************************************************************

**************************************************************************************************************************************

Here follows a diary of my work (extracted from my Git-commit log): 

Diary: 
Tuesday 15th November 2022. 
Started on Assignment. Homepage (index.html) and About me page created. Outline created, 
need to add more conent on About me page. 

 Diary: 
 Friday 18 November: Continued working on project. Finalized startpage (index.html), created outline for about.html. 
 Next step: Finalize the about.html page and then import import it into Codio (using VScode so far) to do the chat. 

Diary: 
Sunday 20 November: Continued with project. 
Finalized about page (about.html) except for some final touches and the design summary (how it was developed). 
Now: Push to GitHub and then import project into Codio in order to create the chat function directly in 
codio to avoid any import issues. 
Update:Successfully imported code inte codio and have got it working with the Chat for JS. 
Next step tomorrow: Apply CSS to the Chat page and finalize all the pages to make them look more presentable
and cohesive. 

Diary:
Monday 21 November: Coninued with project. CSS applied to chat page and made all pages follow the same design. Next step: 
Make the chat more responsive and work with the footer, as well as add functionality so user can see when a new user joins the chat
and when a user leaves the chat. 

Diary:
Tuesday 22 November. COntinued with project. Got chat to working properly in accordance with all the task. Main
issue right now is that the timer for the "user is typing..." isnt working properly, it tells other users that 
the given user is typing every single time they press a button. Will continue tomorrow and make Chat look better 
with a proper chat window etc. 


Diary: 
Wednesday 23 November. Got the chat working properly with users only being told that a user is typing once. Going to validate the project. 
CSS Validated using http://csslint.net and css-lint.com. All HTMLCode validated using https://validator.w3.org with no errors or warnings.
Everything is essentially done except for the JavaScript Validation which is giving me weird errors: const' is available in ES6 (use 'esversion: 6') or Mozilla JS extensions (use moz).
Will continue tomorrow with the report for the assignment as well as hopefully getting all JS-code fully validated. 

Diary: 
Thursday 24 November. Everything is validated. Checked with Bob and demonstrator and the ES6-warning
that I'm given when validating the JavaScript code is fine, based on a setting in the validator.
Got confirmed through email that these errors are fine and wont be marked down because of them. 
Report written and website finalized. Now: let it sit, revisit next week and hand in. 
