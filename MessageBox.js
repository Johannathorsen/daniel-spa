import React from 'react';

import './MessageBox.css';


/*
* So I thought I knew how this worked but I'm quite lost. 
* From what I understand about props this is a child component that is defined (or rendered) in app.js. But I don't get where ´Message` comes from or what it does. 
* From what I could tell Message was also assigned as a property. So where and how is props being used?
*
* In app.js, you can see <MessageBox message={response} error={error}/> in the html-template part of the code.
* This means that app.js will render a MessageBox component and send the properties 'message' and 'error' to MessageBox.
* The message propery will have the value of the 'response' variable and the error property will have the value of the error property.
* So to see where the what the value will be, you'll have to look in app.js and see where we set the variables 'message' and 'error'.
* If we look in app.js, we can see that the properties are set by the functions 'setResponse' and 'hasError'.
* So then it's just to look in the code for 'setResponse' and 'hasError'. If you look there, you'll see that they'll be used when we get a response from the backend.
* setResponse will either be called when everything went fine (when the status code is 200). Then the response will be set to 'Message:' + the text coming from the backend.
* setResponse will also be called if the response wasn't able to communicate with the backend, then it'll set the response to 'Request failed'.
* hasError will be called if the status code wasn't 0 or 200, in other words: if it was able to communicate with the backend but not able to communicate correctly,
* then it'll set the error variable to true. Otherwise it'll just keep its original value of false.
*/
function MessageBox(props) {
    const classes = `Message${props.error ? ' Error' : ''}`;
                                                             
                                                             
    return <div className={classes}>{props.message}</div>;   
}

export default MessageBox;
