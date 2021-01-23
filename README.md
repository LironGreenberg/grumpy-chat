# Grumpy chat!

## Server setup and run
navigate to the server directory and run installation
```
cd server
yarn install
```
then run it
```
yarn start
```

## Project setup
in the project directory, run installation
```
yarn install
```

### Compiles and hot-reloads for development

then in this directory, run
```
yarn serve
```

finally- open your browser on "localhost:8080", and be grumpy about it.

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```
## Assumptions
1. The server loses all data upon restarting- no DB
2. Each user has a unique name (see also in known issues)
3. A user can only be connected to one room at a time
4. Not verified against xss (checked after dev)

## Time constraint disclosure
I got a somewhat carried away with time, the following features were not ready on time (extra few hours):
1. Messages styling (direction and coloring)
2. Emoji buttons
3. All animations
4. reduced display for app header (@media in css)
5. Style touch-ups
6. Overflow bug fixes

## Known issues
1. Sending emoji creates error unicode characters when clicking the emojis buttons twice in a row in the same position
2. WS does not work on phones, it still looks pretty though.
3. Two users with the same username are able to login.
4. When typing xss as the roomId the page won't load, so be nice and don't.

## MOAR possible stuff to add, if I were given more time (a lot more time)
1. User authentication 
2. DB storage
3. Better error handling
4. Mixins (for buttons and such) and better css constants overall
5. Custom message color and picture selection per user
6. View room previous messages
7. Allow a user to enter multiple rooms- tab per room
8. Notify when room Grumpies list updates (\<username> left the room)
9. Add an alert on a new incoming message. including the option to mute.
10. Fallback page for non existing routes
11. Unit tests
12. Themes
13. Reply to message
14. Cloud server storage
15. A proper emoji keyboard and text styling
16. Typing/Seen indications
17. Friends list per user + direct messages to friends
18. Group mini games? 


![grumpy-cat](https://media.tenor.com/images/ed7979066f94fbd2e78b8d9426763f41/tenor.gif)