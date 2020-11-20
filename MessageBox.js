import React from 'react';

import './MessageBox.css';

/*
* I think the return function displays the actual message saying whether or not there is an error?
* 
* You can see what in App.js what the "props" parameter means.
* props.message is the response coming back from the backend. It could be any information.
* props.error is a boolean (i.e. it can only have the value true or false), saying that there is an error or not.
* If props.error is true, it'll add a CSS class to the element, called Error. You can see in the file "MessageBox.css" that it'll change the color of the message.
*/

function MessageBox(props) {
    const classes = `Message${props.error ? ' Error' : ''}`;
    return <div className={classes}>{props.message}</div>;
}

export default MessageBox;
