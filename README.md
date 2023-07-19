# 2MR Media (Social Media App)
In this project we build frondend and backend for social media app.
 

## Technologies Used
- MongoDB - For Database
- Express Js - Framework for backend
- React , Redux , Bootstrap - For Frontend
- NodeJs - Runtime Environment


## Introduction
Social media is a phrase we throw around a lot these days, often to describe what we post on sites and apps like Facebook, Twitter, Instagram, Snapchat, and others. A social media platform is a place where users can share the happenings in their lives with others by sharing any number of post also the like, comment, share each others post. They can talk with each other vitually by sending messages.

In this project we develop an web application, in which user must login to view or create the post. A user will be able to login only if he or she has registered on the social media application. The user will be able to share about themselves in the format of a post, and a post can be an image and some text (a caption) or video. All the users will be able to share any number of posts. The user can like, save, comment and share other user's posts. A user can easily follow and unfollow other users. A user can like another user's post and comment on it also the user can visit to discover page where user can see other user's post which he or she is not follow. User also gets a notification about like, comment on their posts and follow status.


## Functionalities 

1. User - 
    * User will be able to CRUD their profile.
    * Can visit other user's profile.
2. Authentication - 
    * User will be able to register on the app (invloves creating the user profile).
    * User will be able to login on the app if registered.
    * User will be able to logout from the app.
    * Only authenticated users will be able to perform CRUD on post, follow, like, comment, save etc.
3. Post - 
    * User will be able to create and update a post.
    * A post must include a image also it contain content(caption), comments, a reply to comment and like properties.
    * A user will be able to like, comment, share a post and save the post
4. Follow -
    * Users will be able to follow each other.
5. Unfollow -
    * Users can also unfollow each other.
6. News Feed -
    * User will be able to view other user's posts which he or she is following according to its generated time in news feed.
7. Notify -
    * User will get notification when he or she gets likes, comments on their posts as well as when other users starts following or unfollowing them.

 
## Entities 
Following are the entities that are majorly defined on the server:
1. Users
2. Posts
3. Likes
4. Follows
5. Comments
6. Notify
7. Feeds
## Tables define for entities
### Users Table

|_id|first_name|last_name|username|email|password|gender|time_stamp|
|---|---|---|---|---|---|---|---|
|string, unique|string|string|string, unique|string, unique|string, hashed|string|date_time|

### Posts Table

|_id|user|content|images|time_stamps|
|---|---|---|---|---|
|string|string|string|array|date_time|

### Comments Table

|content|tag|reply|likes|user|postId|postUserId|timestaps|
|---|---|---|---|---|---|---|---|
|string|object|string|array|string|string|string|date_time|

### Notify
|id|user|recipients|url|text|content|image|isRead|timestamps|
|---|---|---|---|---|---|---|---|---|
|sting|string|string|string|string|string|string|boolean|date_time|


## What is image File Upload?
File upload refers to the process of transferring digital files from a local device to a remote server or storage location using a network connection. It allows users to share and distribute files such as documents, images, videos, and other multimedia content across the internet.


We can store images directly to folder on our server but it is inefficient way to do. As the number of files increase or images and it will become difficult to access on the front end side.

We can make use of object storage to store the image files and use it's location URL on front end side. Whenever a user posts a post, we will create a uploader that will take the image file and push it to object storage service.

Some of the Cloud Services That Provide File Upload as a Service
1. Cloudinary
2. Dropbox
3. Amazon S3

### What is Cloudinary 
Cloudinary is a cloud-based media management platform that provides file upload, storage, and delivery services for images, videos, and other digital assets. It simplifies the process of handling media files by offering on-the-fly manipulation, optimization, and transformation capabilities through a dynamic URL structure.
Cloudinary provides a pre-built file upload widget you can easily add to your site. Developers can also integrate Cloudinary into web and mobile applications using its APIs, SDKs, and pre-built UI components.


## Architecture Design
We have used MVC architecture for the project
### What is MVC architecture
The Model-View-Controller (MVC) framework is an architectural/design pattern that separates an application into three main logical components Model, View, and Controller. Each architectural component is built to handle specific development aspects of an application. It isolates the business logic and presentation layer from each other.

## Setup
1. IDE - VS Code
2. NodeJS Version above 16.13.2
3. Cloudinary 


## Install dependencies for server 
### `npm install`

## Install dependencies for client
### cd client ---> `npm install`

## Connect to your mongodb and add info in .env

## Run the client & server with concurrently
### `npm run dev`

## Run the Express server only
### `npm run server`

## Run the React client only
### `npm run client`

### Server runs on http://localhost:5000 and client on http://localhost:3000


