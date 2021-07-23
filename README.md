[Try online](https://bank-c4f41.web.app/) 

A Simple Bank application in React.js. 

Database/hosting done with firebase.

Launch project
- install node.js
- npm i
- npm start

Publish in prod :
- npm i -g firebase-tools
- firebase login 
- firebase init (one time)

* Hosting: Configure and deploy Firebase Hosting sites
* Please select an option: Use an existing project
* Select a default Firebase project for this directory: bankorama-bank
* What do you want to use as your public directory? build
* Configure as a single-page app (rewrite all urls to /index.html)? Yes

- npm run build
- firebase deploy

- firebase deploy --only functions
