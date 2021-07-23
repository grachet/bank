[Try online](https://bankorama-bank.web.app/) 

A Bank application in ReactJS with firebase real-time database (NoSQL). 

Connect or create an account, then upload your ID card as a PDF file. A bank manager (Admin) will validate your account based on this document and allow you to add beneficiaries and transfer (fake) money. Check your balance with a history and graph visualization. You can manage accounts as an admin. If you want to delete your account, you need to upload a signed letter in PDF and be validated by a bank manager.
				
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
- cd /function
- npm i 
- firebase deploy
 

- firebase deploy --only functions
