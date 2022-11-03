# How to use this repo
- Download the repo to your local system by copying the following code into the terminal  &nbsp; 
``` 
git clone  https://github.com/yourgotocoder/mean-section-c-backend.git 
```
- cd into your downloaded code by using
```
cd mean-section-c-backend
```
- Open a new VSCode window in that folder using
```
code .
```
- In the terminal of the new VSCode window paste the following code
```
npm install
```
- Starting the server, paste the following code into the terminal
```
npm run dev
```

## Basic configurations needed to get it working
Singup for mongodb atlas on the following link
```
https://www.mongodb.com/atlas/database
```
Once you have signed up, create a cluster. Just follow the instructions that comes within the singup page to create a new cluster.

Upon successfully creating a cluster, get a connection string.
Follow the instruction on this site to get your connection string.
```
https://studio3t.com/knowledge-base/articles/connect-to-mongodb-atlas/
```

When you have the connection string, use that connection in the appropirate places in the code int the **index.js** file.

## Sending requests to the server

A file with the **.http** extension has examples of how to send various types of requests.

To get it to work on your local system, you will have to install
a VSCode extension called **REST Client**. Install it to your system if it isn't already there.

## Challenge

1. Your challenge will be to get the code to work. All that you have to do is enter the mongo connection url in its appropriate places.

2. Create GET, POST, PATCH, DELETE handler for managing student data. Assume each student will have the following properties.
    - Name
    - Roll no
    - Registration no
    - Attendance percentage
    - CGPA
    - TG Name

3. If that is too easy for you, try reducing the duplication of code that happens in the index.js file by creating your custom functions.

## Resources to learn more

```
https://www.freecodecamp.org/news/building-a-simple-crud-application-with-express-and-mongodb-63f80f3eb1cd/
```

```
https://www.freecodecamp.org/news/building-a-simple-crud-application-with-express-and-mongodb-63f80f3eb1cd/
```

## Advanced challenge

Use a local excel sheet as a database instead of the Mongo Atlas DB and use that excel sheet to manage all student related data using the REST api that you created in the challenge section.