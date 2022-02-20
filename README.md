## Description

- Real time messaging app secured with symmetric encryption

- Messages are encrpyted in real-time with AES-256 encryption CFB mode and authenticated with HMAC-SHA1 signature using the CryptoJS npm package (https://www.npmjs.com/package/crypto-js).

- When Sender creates a new session, a random key is generated. This key is used for message encryption and signing.
  The key is shared with the receiver via a custom URL that includes the key and is used to verify and decrypt incoming messages.

- The app uses SocketIO/Websocket (https://socket.io/) for real-time data transfer.

## Set-up

- Install dependencies with 'npm install'

- Set the REACT_APP_SOCKET_URL env var to the Websocket server URL. 
  Repository for the backend server: https://github.com/kisborg/rt-secure-data-backend

- Start the app with 'npm start'

## Demo

https://rt-secure-data-frontend.herokuapp.com/
