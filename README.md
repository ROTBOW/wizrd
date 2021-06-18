# MERN-stack-project

Event-driven streaming and messaging application for educational resources

## Background and Overview

We wanted to create a platform where people can share their knowledge and experience with others. It would need to be interactive and in real time to make the user experience rich and dynamic. A user would be able to create a streaming event on a topic and other users would be able to join the event once the streaming goes live. The event creator can interact with the audience users via chat.

We will need to:
 - Build a database to store information on users and events
 - Construct a web application to give users the ability to create events and join events
 - Set up the stream connections so that every user in an event see the same thing in real time
 - Set up chat rooms for events

## Functionality & MVP
- [x] Live on Heroku
- [x] User authorization (signup, login)
- [ ] Events (create, update, delete)
- [x] Chat and messaging
- [x] Video streaming
- [ ] Production README

**Bonus Features**
- [ ] Subscription to events
- [ ] Notifications
- [ ] Share screen on stream

## Technologies and Technical Challenges
(Name of project) is a web application with a back end built on MongoDB. The user's 

### Backend: MongoDB/Express/Socket.io/WebRTC
We will be using MongoDB for the database and Mongoose as our ODM. Express will be used for our backend framework.
 Socket.io will be used for messaging and streaming. WebRTC will be used to stream videos to users.

Technical Challenges:
- Secure user authentication
- Setting up Socket.io to work with chatting
- Setting up Socket.io and WebRTC to be able to create rooms and have multiple viewers to be connected to same stream
- Implementing event creation, updation, and deletion

### Frontend: React/Redux/Sass
We will be using React/Redux and Sass modules to create the user authentication flow and streaming events flow.
Technical Challenges:
- Reading data from MongoDB and keeping redux state normalized
- Creating user authentication forms
- Creating streaming event forms
- Subscribing to backend for real-time updates
- Creating unique rooms for events

## Group Members and Work Breakdown

**Brandon Fang, Melissa Flynn, Inho Lee, Josiah Leon**

### June 13
- Build skeleton for React (Josiah)
- Build user auth backend (Brandon)
- research Socket.io for chatting (Melissa)
- Set up ReadME and research WebRTC (Inho)

### June 14


