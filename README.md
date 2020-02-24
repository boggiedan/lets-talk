This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Let's Talk

> Chat application written in ECMAScript6 and socket.io as real time engine.

> Uses ReactJS 16.2.0 with hooks.

> Uses Redux with Saga middleware.

> Uses SCSS.

This little project was a good opportunity to learn more about Redux Saga middleware and SCSS as in my professionnal experience I'm using MaterialUI for the theming and Redux thunk middleware.</br>

development environment:<br>

- Linux (debian based distribution)

- Node version: `10.15.2`

- Npm version: `6.13.7`

## Behavior

- On first access to the application the user has to register an username (no server validation for duplicate usernames).

- The user can change the default settings in the settings page by clicking on his username.

- The user can change his username.

- The user can change the application theme as light or dark.

- The user can change clock display as on 12 hours (AM, PM) or 24 hours.

- The user can enable or disable CTRL+ENTER hotkey to send messages.

- The user can change the application language as english or french.

- The user can reset the settings to default.

- A counter of unread messages is displayed if the user is on settings page (on top of "Go to chat").

- The user can see previous messages.

- The user see the usernames and the hours of the incomming messages.

- The user can see the hour of his messages.

- The user can send YouTube links which will be displayed as playable videos.

- The user can send images links which will be displayed as images.

- The user can click on the image to open it in a new tab.

- The user can pick emojis to be include in his message.

- The application is responsive.

- User settings are stored in the local storage.

- Any links in the sent messages are linkyfied.

## Available Scripts

Please run `npm i` before starting the server and the client.

In the project directory, you can run:

### `npm run start:server`

runs the socket server on [http://localhost:4001](http://localhost:4001)

### `npm run start:client`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Known issues

- The messages are display from top to bottom. This is because of the different interpretation of the properties `flex-direction: column-reverse` and `overflow-y: auto` between chrome and firefox. Chrome recognize it but not firefox.

## Improvements to be made

Due to lack of time here are some improvements and ideas to be made in the future:</br>

- Cover the app with unit testing with jest, enzyme (only one test has been made for the sake).

- Client side and server side validation of the settings and chat message. For example max length of the username. Correct values in the forms. The server should also emit to the specific user any not allowed data he has received.

- Creation of chat rooms with other connected users.

- Store server data in a for example MangoDB database.

- Retrieving all history messages by slices (ex: from last to last - 20).

- Retrieving progressively previous messages when the user scrolls to the top of the chat.

- Block scroll to bottom on new message if the user is not in the bottom of the chat.

- Scroll to first unread message when arriving on the chat page (storing contributors of the chat room and seen/unseen flag for each message).

- Display which chat contributor has seen user messages.

- Display which user is typing by sending typing start/end events (should be done with a setTimeout to not send too frequent START/END events).

- Refactor the saga workers layer as creating an new action is time consuming (would be better to use Saga actionChannel the same way it is currently using Saga eventChannel for server responses).

- Learn more about SCSS theming strategies to refactor and create a proper theme strategy.
