This README documents the basis of this repo and how to use it to set up a free Universal Web App UMA to access the data 
Please ensure that you have gone through the setup of the Web App first (some things will be assumed)
[UMA web app](https://github.com/AppertaFoundation/FOSS-Medical-Web-App)

## Requirements
## Local set up - should already be set up from web app
- Git [Git website](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- NodeJS (v8) with npm [Node website](https://nodejs.org/en/)
- Ionic ($ `npm install -g ionic`)
- Firebase tools ($ `npm install -g firebase-tools`)
## Online
- Firebase account [Firebase home page](https://firebase.google.com/)


What is this repository for?
Set up your own version of the Universal Medical App UMA

# License
You have been invited to use this repo

It is licensed under an AGPL 3.0 license

## How do I get set up?

### Clone the repo
Clone this repo using this command in a new directory (where you wish to store the project)- run the following:
`git clone https://github.com/AppertaFoundation/FOSS-User-app.git`


In the terminal `cd` into the project folder and run
~~~
`npm install`
~~~
It should take a bit of time and install lots of stuff

## UPDATE THE DETAILS

# The only folder you should have to alter is the Assets folder
Open the file `dbdetails.ts` and delete everything between the word `export` and the words `export const dbDetails`

Change the address of the firebase DB:
Go to this page
[Firebase web set up](https://firebase.google.com/docs/web/setup)
Set up a new app with an address for the users 
You are going to use the Hosting option for this app, not the database

Follow the instructions on how to Add Firebase To your App
- Choose a name
- Edit the project ID (choose one that represents your organisation and is easy to remember)
- Select the country ID
- You may wish to uncheck the box stating
~~~
Use the default settings for sharing Google Analytics for Firebase data
~~~
- Click Continue
- Click Create Project
- When ready click Continue

## Get your database "Snippet"
# Go back to your Database app
- Select the web app from the drop down menu at the top:
- On the left menu go to `Authentication`.
- In the top right there is a button stating
   `Web Setup` - click it
- A box will open up stating `Add firebase to your web app`

Where it says (in your own snippet)
~~~
  var config = {
      apiKey: "<API_KEY>",
      authDomain: "<PROJECT_ID>.firebaseapp.com",
      databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
      storageBucket: "<BUCKET>.appspot.com",
      messagingSenderId: "<SENDER_ID>",
    };
~~~
  copy everything starting with  the `var` until after the next `};`
   
   (this is a javascript object with your project settings)

  **You DON'T copy these lines**
  ~~~
  <script src="https://www.gstatic.com/firebasejs/5.1.0/firebase.js"></script>
  <script>
  // Initialize Firebase
  ~~~
  `firebase.initializeApp(config); </script>` 

   ...and paste the object into the dbdetails.ts file after the word `export ` in the app project (remember to leave a space between)
   **This is the file that you deleted a section from a minute ago**

   **Save the file**   

   # Optional
   - Change the picture - replace picture.jpg with your own picture (make sure you have permission to use it), giving it the _same name_
   - Replace the files in the `icon` and `img` folders with your own images **keep the same names**
   - got to the `manifest.json` and change the `name` and `shortname` **(only change the bit after the colon in the quotes)** to the name you want to appear on your HomeScreen when you install it

   ## Try it out
   In you command line/ terminal
   - Make sure you're in the project folder
   -run the following command

~~~
   ionic serve
~~~

   which should spin up a local server for testing  


## When you are ready to upload:
in the root directory (may still be foss-web-app if cloned)
`firebase login`
- enter your details (choose whether you want to allow firebase to do anonymous loggin)
- choose the app that you wish to hold your user app (the address you're giving out)

`firebase init`

Using the arrow keys and space bar, select 
`hosting`
so it has an asterisk next to it then press enter

Select your project that you set up earlier.
When it asks for the public directory type 
`www`

It will ask if you

`? Configure as a single-page app (rewrite all urls to /index.html)?` -select YES

It will ask you 

`? File www/index.html already exists. Overwrite?` - select NO

You then need to deploy your app. Run the following command
`npm run deploy`
And it will build and upload your file and you should be able to access it via the web address (it will show you this when completed).
   

### Contribution guidelines
*contact me (see below) if you wish to contribute

Who do I talk to?
repo owned by Shane Lester contact shanesapps@hotmail.com
