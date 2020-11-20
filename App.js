import React, { useState } from "react";
import { Button, Link } from '@chakra-ui/core'
import { ThemeProvider, theme, CSSReset } from "@chakra-ui/core";
import Keycloak from "keycloak-js";

import AccountBox from './AccountBox';
import MessageBox from './MessageBox';

import './App.css';

let keycloak = new Keycloak({url: 'https://login.t2data.com/auth/', realm: 'kramfors', clientId: 'spa'}); 
/*
* super confused about what new is supposed to do.
*
* Keycloak is a class imported from the npm package "keycloak-js". When I write "new Keycloak()" I'm just creating an instance of this class. 
* The class can take some input parameters when it's created. So for this project I used the parameters that Hans used on the sample website for url, realm and clientId.
* Btw, spa is short for "single page application".
*/
var serviceUrl = 'https://lb.t2data.com/simple/v1'

function App() {
  const [authenticated, authenticate] = useState(false);
  const [response, setResponse] = useState('');
  const [error, hasError] = useState(false);
 /*
 * is .init a function or does it stand for initialize 'check-sso'?
 *
 * Both! In JavaScript, anything that is followed by two paranthesis are functions. So init is a function that initializes the keycloak instance.
 * So when I call the init function on the keycloak instance, I tell the instance to check if we're logged in when the page is loaded (by using the setting onLoad: 'check-sso').
 * There are a lot of available settings for the keycloak class, you can read more about them here: https://github.com/keycloak/keycloak-documentation/blob/master/securing_apps/topics/oidc/javascript-adapter.adoc
 */
  
 /*
 * is Iframe detecting a sign in status through the Keycloak Login page ?
 * 
 * Yep! 
 */
  
  keycloak.init({ onLoad: 'check-sso', checkLoginIframeInterval: 1 }).then(() => { 
    if (keycloak.authenticated) {
      authenticate(true);
    } else {
      authenticate(false);
    }
  });

   /*
   * is onAuthLogout an event that verifies when the user no longer has a status cookie/loged out ?
   * 
   * Almost! onAuthLogout is a function that will be ran when the user is logged out.
   * You can read about it at the same link that I provided above: https://github.com/keycloak/keycloak-documentation/blob/master/securing_apps/topics/oidc/javascript-adapter.adoc
   */
 
  keycloak.onAuthLogout = () => authenticate(false);
  
   /*
   * Don't know what this is trying to do
   * 
   * This is where we talk to the backend! 
   * So I created a function called request, that is run by writing "request()". It takes one input parameter, called enpoint.
   * If you run it by writing "request('public')", it'll make a request to https://lb.t2data.com/simple/v1/public since it adds the variable "serviceUrl" with the endpoint parameter.
   * If we're logged in (i.e. if keycloak.authenticated is true), it'll add an authorization header with the bearer token provided by the keycloak instance.
   *
   * This is something you'll use all the time if you write applications with both a frontend and a backend!
   * So I guess it could be good to read up a bit on how the backend and frontend communicates.
   * I haven't read this article but I think it looks good: https://medium.com/@ayabellazreg/fetch-api-for-beginners-265561404598
   * Try to google around and read about fetch.
   */

  const request = (endpoint) => {
    const options = {
      method: 'GET'.
    }

    if (keycloak.authenticated) {
      options.headers = {Authorization: `Bearer ${keycloak.token}`};
    }
    const url = `${serviceUrl}/${endpoint}`;
    console.log({url})
    console.log({options})
    fetch(url, options).then((response) => {
      if (response.status === 200) {  
        response.text().then((text) => {
          setResponse('Message: ' + text);
        });
        hasError(false);
      } else if (response.status === 0) {
        setResponse('Request failed');
        hasError(true);
      } else {
        setResponse(response.status + ' ' + response.statusText);
        hasError(true);
      }
    });
  }

  return (
    <ThemeProvider theme={theme}>
      <CSSReset/>
      <div className="App">
        <Link href="https://lb.t2data.com/simple/v1/ui">Backend</Link>
        <Link href="https://login.microsoftonline.com/logout.srf">Azure logout</Link>
        <div className="Content">
          <AccountBox authenticated={authenticated} keycloak={keycloak}/>
          <div className="Box">
            <Button variantColor="teal" onClick={() => request('public')}>Invoke public</Button>
            <Button variantColor="teal" onClick={() => request('secure')}>Invoke secure</Button>
            <Button variantColor="teal" onClick={() => request('admin')}>Invoke admin</Button>
            <MessageBox message={response} error={error}/>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
