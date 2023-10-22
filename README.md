# node mailer

https://mertgursoy.medium.com/how-to-send-html-form-data-via-email-from-client-side-firebase-functions-nodemailer-gmail-681409c5c387

## Setup

[Nodemailer](https://nodemailer.com/) used for sending mails.  
https://mertgursoy.medium.com/how-to-send-html-form-data-via-email-from-client-side-firebase-functions-nodemailer-gmail-681409c5c387

App password created, for using gmail for sending mails.  
Password is added as secret `firebase functions:secrets:set APP_PASS`.

Google cloud console  
https://console.cloud.google.com/functions/details/europe-west1/sendMailOverHTTP?env=gen1&project=vczavath-5f99f

Firebase console  
https://console.firebase.google.com/u/0/project/vczavath-5f99f/functions

In order to get the cloud function working
- CORS origin should be correctly configure
  Otherwise mail can be send but client (browser when using web app) will give a cors error.
- allUsers has granted 'Cloud Functions Invokers' role on [permissions](https://console.cloud.google.com/functions/details/europe-west1/sendMailOverHTTP?env=gen1&cloudshell=true&project=vczavath-5f99f&supportedpurview=project&tab=permissions) of the function.

## Deployment

### Firebase

App is deployed using firebase.

Install firebase cli
`npm install -g firebase-tools`

Sign in to Google
`firebase login`

Initiate your project
`firebase init`

Deploy your project
`firebase deploy --only functions`