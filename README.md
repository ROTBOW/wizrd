# Wizrd

Wizrd is an event-driven streaming and messaging application for educational resources. By going live or scheduling future events, instructors and creators can connect with their audiences through real-time video streaming and chat.

![wizrd-splash](https://user-images.githubusercontent.com/74887895/124530504-7cf83500-ddc1-11eb-8844-827b3ebe01cc.png)



## Group Members

<!-- Add github, linkedin, angellist links here -->
- **Inho Lee** 
  - [GitHub](https://github.com/inhojl), [LinkedIn](https://www.linkedin.com/in/inhojl)
- **Josiah Leon** 
  - [GitHub](https://github.com/ROTBOW), [LinkedIn](https://www.linkedin.com/in/josiah-leon)
- **Melissa Flynn** 
  - [GitHub](https://github.com/melflynn), [LinkedIn](https://www.linkedin.com/in/melissa-flynn-372b84b7)
- **Brandon Fang** 
  - [GitHub](https://github.com/brandonfang), [LinkedIn](https://www.linkedin.com/in/bdmfang)

## Overview

We wanted to create a platform where people can share their knowledge and experience with others. It would need to be interactive and in real time to make the user experience rich and dynamic. A user would be able to create a streaming event on a topic and other users would be able to join the event once the streaming goes live. The event creator can interact with the audience users via chat.

We will need to:
- Build a database to store information on users and events
- Construct a web application to give users the ability to create events and join events
- Set up the stream connections so that every user in an event see the same thing in real time
- Set up chat rooms for events

## Features

- [x] User authentication (signup, login, logout)

  ![wizrd-auth](https://user-images.githubusercontent.com/74887895/124530704-e4ae8000-ddc1-11eb-90f8-c8c392ab11b8.gif)


- [x] Events (create, update, delete)

  ![wizrd-event](https://user-images.githubusercontent.com/74887895/124530996-69010300-ddc2-11eb-953d-8a21c2363040.gif)


- [x] Chat and messaging

  ![wizrd-chat](https://user-images.githubusercontent.com/74887895/124531261-00665600-ddc3-11eb-946d-a348843a034c.gif)


- [x] Video streaming

  ![stream](https://user-images.githubusercontent.com/74887895/124531576-a4e89800-ddc3-11eb-99e6-45017265563b.gif)


- [x] Video error handling
- [x] Deployment with Heroku
- [x] Production README

### Bonus Features
- [ ] Subscription to events
- [ ] Notifications
- [ ] Share screen on stream

## Backend Technologies: MongoDB/Express/Socket.io/WebRTC

We will be using MongoDB as our database and Mongoose as our ODM. 

Express will be used for our backend Node.js framework.

Socket.io will be used for messaging and streaming. 

PeerJS/WebRTC will be used to stream videos to users.

### Technical Challenges

- Secure user authentication
- Setting up Socket.io to work with chatting
- Setting up Socket.io and PeerJS to be able to create rooms and have multiple viewers connected to same stream
- Implementing event creation, update, and deletion

## Frontend Technologies: React/Redux/Sass

We will be using React to create and manage our UI components, Redux to keep track of state, and Sass modules to style our React components.

Frontend features include the user authentication flow and event-streaming flow.

### Technical Challenges

- Reading data from MongoDB and keeping Redux state normalized
- Creating user authentication forms
- Creating streaming event forms
- Subscribing to backend for real-time updates
- Creating unique rooms for events
