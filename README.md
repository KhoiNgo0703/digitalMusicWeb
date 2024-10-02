digitalMusicWebsite: vuejs +firebase
----------------------basic configuration and front end
1.Create project in vuejs:
npm init vue@latest.
yes for: add vue router, add pinia, add vitest, add cypress, add eslint.
npm install in project .
to run the website: npm run dev.
delete folder .vscode.
install prettier and eslint in extension.
2.Code formatting:
settings: check the editor:format on save; choose Prettier in Editor: default formatter; in settings.json: add the code line below:
"editor.codeActionsOnSave":{
   "source.fixAll.eslint":true}
3.Adding template and configure the project
download the template file.
create folder named template in the project, copy template and pass it in the folder.
delete all the icons and html in components since it belongs to the example.
delete everything in views.
delete everything in App.vue.
4.modify App.vue
5.Install Tailwind
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
modify tailwind.config.js: content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
in eslintrc.cjs, add node to the environment to support.
load the tailwind in the css file in src/assets/base.css using these codes:
@tailwind base;
@tailwind components;
@tailwind utilities;
import css in main.js.
6.modify css in index.html.
7. load img and css from custom file
paste file from template to assets in src
import css file in src/main.js
copy img to public dir so they will not go through third party lib
8.load font and icon
<link
      href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700"
      rel="stylesheet"
    />
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.3.1/css/all.css"
      integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU"
      crossorigin="anonymous"
    /> copy to index.html
9.configure pinia
store:unique location for storing data.
10.split templates into components
create AppHeader.vue in src/components
register AppHeader.vue in the App component:
+import AppHeader
+register in components in export default
+use: <app-header></app-header> to represent for App Header
register AppAuth.vue in the App component
11.modal toggle
create modal.js in src/stores
access it from the component:
in toggleAuthModal method, modalStore is named based on the "modal" id in defineStore in modal.js
12. Using getters
A way to access state properties from the store
create hiddenClass for state in getters in modal.js
import state function in AppAuth.vue
13.Adding tabs
use conditional directives to toggle their appearance in the first form
use data() and let return tab=login
set click.prevent for tabs to change the color 
use v-show to change the tabs
-----------------------------------------------------form validation-----------------------
14.form validation
use Veevalidate library: npm i vee-validate
register the library globally:
+create a custom plugin
+create folder src/includes for custom plugins
+create a file src/includes/validation.js
+import lib in main.js
+use app.use(VeeValidatePlugin) to pass the plugin
validate the register form:
+replace form by vee-form in Auth.vue
+replace input by vee-field
+valiadation process: 
++use the field component
++assign a name to the input
++add the rules
++handle the errors
+install rules: npm install @vee-validate/rules
+register the rules globally
+use chema to organize the rules and use name
+validate the entire form:
++add a submit event in register form
+add multiple error messages:
++ bind :bails="false" is used to tell the field property not to use the fast exit strategy
++use v-slot for field and error , v-bind for the input, v-for for showing up the errors
+add default values
++add property named userData in data
++add inital values inside the property
++add property called initial-values to the respective fields in these slots content
+custom error messages
++import configure from vee-validate
++custom messages in configure and update schema in Auth.vue
+add validation triggers
+add alerts
validate the login form
----------------------------------authentication--------------------------
15.firebase
create firebase project for the database
+use firestore database
++test mode for secure rule
+review the rules
install firebase SDK: npm i firebase@8
configure firebase 
+create file called firebase.js in includes folder
+import the file in main.js
+configure firebase switch back to the firebase file
+in firebase.js, import the module firebase/app-> the core of the firebaseSDk, must be imported
++ if u use import firebase from"firebase" instead of "firebase/app" -> install all the packages
add firebase to web app
+copy configure variable and paste to the configuration file firebase.js and initialize firebase.initializeApp(firebaseConfig);
+add auth module to authenticate users
16. register users by submitting data to firebase
send user data to firebase in registerForm.vue in components
+import firebase file not the module at top of the script
+invoke firebase.auth in methods: register(values){}
17.refactor firebase configuration to export services to store more info about users besides email and password
import firestore in firebase.js
invoke firebase.auth to access the authentication service
create reference in firebase.js to reuse in registerForm.vue
update import statement in registerForm.vue
create usersCollection in firebase.js
export usersCollection and import it in registerForm.vue
add data to collection by using usersCollection.add
18.add another field to the register form
add vee-rules and name for values variable
19.make minor modification to the security rules of firebase: restrict who can read or write to the database
allow read: if true; everyone can read
allow write: if request.auth.uid != null;  ppl with no authentication can not access
20.log the users in
create new store for users
+create user.js in stores
+import defineStore function from pinia package and export the function, id of the store is called user
+update the register function in registerform.vue to show the state of the user
++import mapWritableState from pinia and useUserStore from user.js 
++call the mapWritableState function in computed session
++set the userLoggedIn=true in register method 
->> authenticated user into the app
21.Using actions
The code for manipulating the state will be put into an action function
create action function inside exported object in user.js 
+copy code from registerForm.vue and import { auth, usersCollection } from "@/includes/firebase";
+need to import mapActions from pinia in registerForm to use actions in user.js
+create method for mapActions in methods and let values pass into the function
22.Connect user with their data (connect two services authentication and firestore database)
use UID of authentication for UID of documents
modify the request to the database in user.js actions
+retrieve UID and update request to store the UID in resource section
23.Need to log the user back inafter refreshing the page by using token. Firebase will keep track of the token-> set the state property to true if the token is valid
initialize firebase before loading view
+update import statement for firebase in main.js 
+copy instance of view and paste it into onAuthStateChanged function
+use variable app to avoid intializing the app many times
check if the user is authenticated
+check with the firebase if the user is logged in by checking the earliest phase of the app which is the app component app.vue
+import mapwritablestate from pinia
+import useUserstore from pinia
+call mapwritablestate function in computed to map the state component to userLoggedIn.
+create a created method to check the authentication status
++import auth from firebase.js
++wirte the if cond in created method to change the state of users
++use vue dev tool to check the state
24.set up the log in 
import MapActions function from pinia in loginform.vue
import useUserStore from pinia
run mapActions function in methods and in the array add the authenticate function
call the authenticate function with input=values in login method
use async and await for login method to catch error
create authenticate action in user.js
25.set up the log out
in registerform.vue, add reload method to refresh the page after registering successfully : windown.location.reload()
in loginform.vue, also add reload method at the end of the login method
modify the navigation menu to add a link for logging out
+in Header.vue, hide the login/register link when logging in by using if v-directives
++import useUserStore from pinia
++inside mapStore function in computed, pass in useUserStore
++inside v-if directive pass in userStore.userLoggedIn state for the condition
+make log out link functional
++in user.js, create a function called signout
++call signout function in header.vue
++check in store in vue dev tool to make sure token is taken away
-------------------------------------Routing---------------------------
26.creating routes
add a new route to array
+need to includee path, component in the array and import component in index.js from views
load content of HomeView in App.vue
+use router-view block
+The Vue router will automatically know which component to load based on the route records we created
27.history mode
use the history API mode
28.navigate the links
provide links to pages that we want them to access to
create links on the header
+create a link to home
++in header.vue, use router-link instead of a tag which is a global component registered by vue and add class to="/name"
+update link for manage and remember to add path for the link in index.js and create manage.vue in views
29.create active links uisng Tailwind framework
name of the active link will turn yellow by activing the class when the url and path match
+in index.js, create linkExactActiveClass in router and set the colour
make the home page active link disable by set class exact-active-class="no-active" 
30.name the routes
in index.js, create a property in routes and use name to update the links instead of the path 
in header.vue, replace to="/path" by :to="{ name: 'name'}"
31.handle the routes that do not exist and redirect to another route
add new record to routes array to avoid error when updating the links and use redirect
remember to use catchAll for the path
{
    path: "/:catchAll(.*)*",
    redirect: { name: "home" },
  },
32. route alias
can solve the 31 issue by adding alias property in the array
33. guarding routes
prevent accessing to some links without permission
use router.beforeEach() in index.js
guard page manage
+add beforeEnter function in route array of manage in index.js
+export name and function beforeRouteEnter in manage.vue
+need to solve issue when guard function can not access all the components like the store
++to access store, import useUserStore from store and let const store=useUserStore();
++use else if with store.userLoggedIn condition and next() function 
34.redirecting user logging out
create signOut function in methods in header.vue 
+in signOut function, use this.userStore.signOut() to log out and this.$router.push({name:'home'}) to get to home page
+$ sign means the current route
35.route metal fields
need to update conditional statement for routes in large scale apps cause we want the users to log out while accessing to different pages
+create meta with requiresAuth=true in manage record in routes array in index.js
+modify signout method in header.vue with condition checking this.$route.meta.requires.Auth
do the samething with signIn 
+remove guard in Manage.Vue
+in index.js, import useUserStore from store/user
+in the guard, check if the incoming pages need authentication
+create const store=useUserStore() and use else if cond to check store.userLoggedIn to redirect
----------------------------------------------Uploading files----------------------------------------
36.prepare the upload component
copy the UI part for uploading files in manage.vue and pass it into a component named Upload.vue 
+in upload.vue, export default name ="Upload"
import and register the component in manage.vue locally not globally since we use only once: import AppUpload from "@/components/Upload.vue"; 
+add AppUpload in components
+insert <app-upload/> into the div
37.start the upload process by using drag and drop events
in upload.vue, add drag support events in the class for upload file : @drag/dragstart/dragend/dragover/dragenter/dragleave/drop
+need to fix the event when hovering the file into the zone but the color does not change
++ bind the class with is_dragover and define is_dragover in data in export property and set it to false
++define a method called upload that stop the hover effect after the file is dropped and connect the method to @drop
38.grab the file from the drop event
pass the event object in the upload method
create a variable called files to transfer the files
convert files to array so we can send it to firebase const files = [...$event.dataTransfer.files];
loop through the files with validation
39.enable firebase storage
enable storage and modify rules on firebase web
40. upload the files to firebase
in firebase.js, import the storage service module
export the storage to use in other components
import the module in upload.vue
create a variable called reference to represent the path in storage and a child reference and put them in the files loop in upload method
use songsref.put(file) to upload the file to firebase
41.firebase rules and validation.
check authentication, file type and file size
42. add the progress bar from static to dynamic
listen for the response from firebase
+create a variable called task in upload method in upload.vue
+use task.on to show the state_changed 
++ create variable called progress = the bytedtransfer percentage
+create an array to show how many uploads have been made
++create property called upload said it to an empty array in data 
++uploads.push to  push task,current_progress and file.name
+in progress bar class use v-for to show the uploads and assign a key to prevent strange behavior, bind key property to upload name
++modify file name to upload.name
++inner bar bind style with the upload.current_progress
43.make the progress bar dynamic
need to get the index of the upload
+ get the index by getting the length -1
+this.uploads[uploadIndex].current_progress=progress
44.improve the progress bar
change the color of the progress bar
+create property called variant in uploadIndex in upload.vue
+bind the property with class
change the color of the file name
+create property called text_class
+bind the property with class
add an icon to indicate that the upload was a failure
+create a property called icon from fontAwesome kit
+bind the property with class 
45.handling errors and successful uploads
pass 2 arrow functions: 1 with error condition when listening to event state_changed(task_on) and 1 with successful uploading
46.store file data in the database if the upload is successul
import auth from firebase.js
after state_changed, create a const called songs with all the properties including uid, display_name, original_name, modified_name, genre, comment_count and use async
add a property called URL and use await, 
in firebase, create a new collection called songs
in firebase.js, create a songsCollection const for songs and import it in upload.vue
await songsCollection.add(song)
47.firebase references and snapshots
48.fallback upload
in upload.vue, add a file input filed input type="file" to the template under the upload Dropbox
in the variable files in upload methods, create a conditional statement that checkj if the event was triggered by a drop or change event
49. cancel the upload when navigate another page
first way is to use lifecycle function
+create a beforeUnmount in export default in upload.vue
+loop through the uploads and cancel using upload.task.cancel()
second way is using navigation guard
50.querying the database
retrieve the data from database
+data should be requested before the component gets loaded on the page
+add created lifecycle function and async for it in export default in manage.vue
+import songsCollection and auth from firebase.js
+querrying can be done by calling the where function for songsCollection in created() 
++create a const called snapshot when using a where function
++use wait for songsCollection.where and check the uid 
51.store the list of songs 
+store the snapshot
+define a data function and create a property called songs =empty array
+loop through the snapshot, create a variable called song 
+song=document.data and use push method to add song to songs
52.display the songs
to reduce clutter from manage component, create another component called CompositionItem.vue
cut and paste the composition item part from manage.vue to compositionItem.vue
in compositionItem.vue, create a name called CompositionItem in export defualt
import the CompositionItem in manage.vue
register CompositionItem in components
use v directives v-for to show the songs and bind key =song.docID
53.Prop validation
In compositionItem.vue, created props and set it to an object
add 1 prop called song and add settings to it
bind the song prop to song ref in manage.vue
54.toggle the form for editing a song
when button is clicked, the form is shown
+return data showForm and set it to false in compositionItem.vue
+use v-show for 2 div tags
+for the editing song button, add @click.prevent 
+update song name by using song.modifedname
55. validate the song form
replace form with vee-form in compositionItem.vue
add rules for song title and genre
+add a validate schema in data() in compositionItem.vue
+add rules in schema
+add a validation-schema to vee-form component
+use vee-field and name for schema rules
+use error message to show the component error 
+prefill our fields in component by adding :initial-values="song"
add a method called edit when submitting the form
+create edit method in methods in compositionItem.vue
56. editing a song, handle the form submission
create properties to show alerts when submitting
+in data, create properties for submitting
create a box using alert on top of the form in template
+use v-if to show the form, class to show the shape 
disabled submit and go back button 
+use click.prevent for the go back button
edit method
+inform user at their submission has started and send data to firebase
+edit alert box in edit method
+import songCollection from firebase.js
+use songsCollection.doc().update() to select a document by ID and update it
++use async for edit method and await for songsCollection.doc().update()
++use try catch to get error
++change properties after if it is successful
update the name of the song
+in manage.vue component, define a method called updateSong with input=i and values
+bind the method in composition-item component and bind the index 
+back in compositionItem.vue, in props update the props called updateSong and index
+call updateSong method in edit method in compositionItem.vue
57.delete song from storage/firebase
listen to click event when clicking the button in CompositionItem.vue
+use click prevent and define method called deleteSong
+for deleteSong method, use async
++import storage from firebase.js
++create variables called storageRef and songRef and await songRef.delete to delete the file
modify delete rules in firebase web
delete data from the collection of firebase
+in deleteSong method, use await to delete document
+remove the song from the list of upload array
++in manage.vue, bind a method called removeSong
++define the mehod in methods and use splice function 
++in CompositionItem.vue, add removeSong prop
++add the removeSong method in deleteSong method 
58.update the list of songs after an upload
need to push the song to the list after uploading (push the song from child to parent component)
+create a function that will be called after the song is upload in the child component
+define a method called addSong in manage.vue and pass it to a upload component 
+in component add-upload bind prop addSong with the function addSong
+ in upload.vue, add addSong props which was passed down by the parent component
+in upload method in upload.vue, pass the document after uploading to manage.vue by using addSong(songRef), songRef = songsCollection.add(song);
+copy push song code from created function to addSong with document as the parameter
+replace a part of created function by using addSong method
+need to create a var called songSnapshot to convert from ref to snapshot in upload method in upload.vue
+replace the parameter of addSong from ref to snap in upload.vue
59. router leave guard
in manage.vue, add beforeRouteLeave
create a prop in data called unsavedFlag to track user 
create a prop called updateUnsavedFlag in method
bind the prop to updateUnsavedFlag method in composition-item component in manage.vue
add the object to props in compositionItem.vue
in compositionItem.vue, call updateUnsavedFlag in a input event listener @fileds are updated in template
change updateUnsavedFlag to false after updating a song successfully in edit method
in manage.vue, use if else condition in beforeRouteLeave
-------------Playing Music---------
60. create the home page
in Home.vue, request data from firebase
+import songsCollection from firebase.js
+async created function and use a var snapshots with .get() inside
+loop through the snapshots and push the lists into the songs array in data
+display the songs in the template
++create a component called songItem.vue 
++import SongItem component in Home.vue and register in components and put it in the template
++loop through songs array and bind key with song.docID since it is unique and bind song with song props
++add props in songItem.vue
61. check the scroll position
in Home.vue, create a method called getSongs while scrolling to the bottom
+in created function, use getSongs and event when scrolling
+create a method called handleScroll after the scrolling event
+use beforeUnmount to stop when navigating another page
+in handleScroll method, use the inner height as the threshold 
+put the getSongs method inside handleScroll method
+use .limit() for songsCollection to limit the api
+create a prop called maxPerPage
+create var called lastDoc to get the index to use as parameter for function .startAfter() 
+use orderBy to get the order and if else statement 
+track request by adding a prop called pendingRequest 
62.path parameters
create routes for individual user song pages
+ in router in index.js, add a new object in routes for songs
+in view, create song.vue and register Song in index.js
63.create song template
create links for a visiting individual songs
+ replace a div with router-link in SongItem.vue
+ bind :to with name song and params with song.docID
create the template for song record 
+copy song template and grab the data related to the song
+import songsCollection from firebase.js
+get doc of songs by using async created life cycle function and await .get() function
+create a song prop in data and push data from doc of songs to song prop
+modify property in the template
64. validate comment
use vee-form and vee-validate
65.prepping the form
message box show when submitting the comment by using addComment method @submit
66.finalize comment form
create a var called comment with different props in method addComment in Song.vue
create a new collection in firebase web
create a collection objects in firebase.js
import commentsCollection in song.vue
add comment to the commentsCollection
use the resetForm at the end of method
let the user comment only:
+map the user loggedin state prop to the component
67.display comment
create a method called getComments and use it in created() function
in getComments method we need to retrieve the comment from the collection
create a data prop for storing comments in data
loop the comment in the template
68.reload the comments if a new one is submitted
sort the comments:
+create a sort function in computed 
+create a prop called prop in data called sort ==1 to know the direction of sorting 
+update in template 
69.query parameters to store the sorting
2 things: update the route @ user changes the sorting orders, update the sort data prop in the component
in Song.vue, use watch function to do the 1st one
detect the query parameters:
+use life cycle function to check the query 
+query should be used for showing sorting/filtering thr data
70.count the comments
in song.vue, use var called song.comment_count ++ in add comments
update the comments count thr songsCollection.doc
-----------playing audio-------------
Process
+store the song in the state when the play button is clicked
+play song
+toggle play/pause
+render song info onto the player
+keep track the current progression of the song
+allow user to drag the scrubber around
+pause song after it is dont playing
71. store the song in the state
install howler
in song.vue, use click.prevent to execute newSong
create a new store called player for the state of the song
map the newSong function from the store to the component
72.play the audio
import howler in store player.js
create a new state called sound to play audio
73.toggle the audio
copy player component in template and paste it to component called player.vue
import Player.vue in App.vue
create a toggleAudio function in store player.js
import mapAction and player.js in player.vue
map toggleAudio with usePlayerStore
update the icon when playing or pausing:
+use getter function in player.js and map it to the component
74.duration and current position
use props called seek and duration in state in player.js and map it to component
use function called progress in player.js to show the seek and duration
75.format the time of the seek and duration
create a utility function called helper.js in includes folder
import helper.js in player.js
76.player progress bar
use a state prop called playerProgress in player.js and map it to player.vue
77.change the audio position
use click.pevent = method updateSeek in scrub container in template in player.vue 
map the action in player.js to player.vue
78.creating links with hash fragments
allow user go to a specific page (by click the comment symbol) without refresing the browser
use router-link and custom class in songItem.vue
in song.vue, add id="comments"
79. route transitions
in App.vue, access component through v-slot in router-view
use transition with name="stylename" 
grab home.vue and song.vue in <main><main> tag
--------------------Directives-----------------------------
create a folder called directives
create a file called icon.js
80.first directive
use beforeMount for icon
register Icon in main.js
call directive function in app in main.js
add v-icon directive in home.vue
81.passing values to directives
help add an icon by passing the name of icon as a parameter into directives
82.directive modifiers
83. register a directive locally
create a file called icon-secondary.js
import in home.vue and register directive in directive 
------------Internationalization---------------------
84. Internationalization
install i18n
create i18n.js in includes folder
create src/locales
create locales/en.json
import en in i18n.js
import and register i18n in main.js
85. First translation
create french translation by create fr.json in locales
import fr in i18n.js
use $t() for i18n in home.vue
86.formatting and pluralization
create a new obj called song for messages realated to song comp in en.json 
use $tc()
87.Number Localizations
add numberFormats in i18n.js
add songprice in song.vue 
use $n()
88.translating html with component interpolation
create obj called register in en.json
in register.vue, change label el to i18n-t el and add keypath in en.json, tag label and a div with $t()
89.change the locales
in header.vue, create a tag to show currentLocal and a click.prevent to toggle method changeLocale
create currentLocale in computed and changeLocale method in methods
