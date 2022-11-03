//Variables can be named however you like. It depends on you and whatever makes sense to you.

//Import express package and store it in variable called express.
const express = require("express");

//Using destructuring extract specific functions from the mongodb package. The names of the functions will be specified
//in the library. In this case we are extracting MongoClient and ObjectId functions from the mongodb library.
//Import MongoClient to connect to the mongo db driver. ObjectId is used to create ObjectId in a mongodb recognised way.
const { MongoClient, ObjectId } = require("mongodb");

//Initialize an express instance and store it in a variable called server. That server variable will now have all
//the features of the express library. Use that variable to create a server and handle requests to the server.
const server = express();

//Express is a middleware based library, i.e All request can be handled by a function that exists between the initial request and the request
//that you ultimately process.
//In the code below we will use a middleware that comes with express called express.json().
//express.json() can extract all json data coming in a request and provide it in your req.body.
server.use(express.json());

// Express gives us methods to handle all kinds of REST standard requests. POST, GET, PATCH, DELETE
// All of the above mentioned methods require two arguments.
// The first argument will be the target url. The second argument will be a callback function.

//Add a route to handle post requests. A post request is just a standard that tells the developer that this particular url
//will be used to create new "things" in  a database or some other store of data.

server.post("/add-todo", async (req, res) => {
  // server is an instance of the express library. server.post()  is being used to create a handler for a post request
  // As has already been mentioned the first argument for that method will take a url. In this case, we are defining a
  // url called "/add-todo". The second argument to the post method is a callback function. The async keyword that is
  // being used before the callback function is used to turn the function into an async function.
  const { title } = req.body;
  // The express.json() middleware that we have used on line 19 allows us to extract the title from the post request
  // body that we will be sending.
  console.log(title);
  // If you comment out line 19, you'll notice that the above console.log state will output undefined.
  const client = new MongoClient("Enter  your mongodb connection url here");
  // Storing the value of whatever is returned upon initialising a new MongoClient instance. The MongoClient will take one argument
  // that will be the connection url of your db.
  await client.connect();
  // We are waiting for the connection by using the keyword await. await can only be used inside of an async function.
  const databbase = client.db("todo");
  // Once the connection is established we will use a database in the mongo cluster called todo. If it doesn't exist
  // it will be created the first time we try to create a new document in that db.
  const collection = databbase.collection("todo-items");
  // In our database we will access a collection called todo-items. If it doesn't alreay exist it will be created when we
  // create our first document in that collection
  await collection.insertOne({ title: title });
  // Inserting a new document into the collection using the inserOne method that is available on a collection. The insertOne method
  // takes an object as its arguments that defines all the keys and values.
  await client.close();
  // Once we are done with what we want to do with the db, we will close the connection.
  // We will be using await inside async functions when we do something that will take an indefinite time to complete.
  // Basically await will halt the execution of the code until that particualr line on which we used await is done with its execution.
  res.json({ message: "Success" });
  // Finally we will be sending a response using the res argument. We are using the json method on the res to send back a json object to the
  // one who made the request.
});

server.get("/todo-items", async (req, res) => {
  // Using the get() method to handle get requests to a url called /todo-items
  const client = new MongoClient("Enter  your mongodb connection url here");
  await client.connect();
  const db = client.db("todo");
  const collection = db.collection("todo-items");
  const data = await collection.find().toArray();
  // On the collection a find() method exists that returns all the documents on a collection. In this case we have a db called todo and
  // inside that we have a collection called todo-items. When find() is used on the collection, all the documents of that collections is
  // returned. The toArray() method converts the data that is returned by the find() method into an array.
  // Try removing the toArray method to see how the response changes.
  await client.close();
  res.json(data);
  // This time, the response will be the data that we extracted from our collection.
});

server.patch("/edit-todo", async (req, res) => {
  // Handling patch requests to url called edit-todo
  const { id, newTodoTitle } = req.body;
  // On the patch request that will be made, two properties will exists inside its body. The developer gets to define those properties
  // and the one who uses the url will have to send these properties in the body of their request. In this case
  // we define properties called id and newTodoTitle

  console.log(id);
  const client = new MongoClient("Enter  your mongodb connection url here");
  await client.connect();
  const db = client.db("todo");
  const collection = db.collection("todo-items");
  await collection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    {
      $set: {
        title: newTodoTitle,
      },
    }
  );
  // In a collection, a findOneAndUpdate() method exists. The findOneAndUpdate() method takes two arguments, the first object will
  // be the key used to identify the document in a collection. The second object is the argument that will define what properties that
  // document will be modified along with the new values for those properties.
  // Since all doucments will have an auto-generated _id property when using mongodb, we can use the _id property to uniquely identify
  // a document. The one sending a request must send this id in their request body. Since the id that is being received in the request body
  // will be a string, we will have to convert it to an ObjectId instace using the ObjectId method and passing it the id value that 
  // we have sent in the request body.
  res.json({ message: "Success" });
});

server.delete("/delete-todo", async (req, res) => {
  // The delete() method will be used to handle delete requests the url we define, in this case /delete-todo.
  const { id } = req.body;
  const client = new MongoClient("Enter  your mongodb connection url here");
  await client.connect();
  const db = client.db("todo");
  const collection = db.collection("todo-items");
  await collection.findOneAndDelete({ _id: new ObjectId(id) });
  res.json({ message: "Success" });
});

server.get("/", (req, res) => {
  res.json({ message: "Hello from server" });
});

//Listen on port 3000
server.listen(3000, () => {
  console.log("Server started");
});
//This server can be accessed on http://localhost:3000 and request to specific urls can be sent by attaching the appropriate routes
// Eg: The get request that we have created for getting all the todos can be acccessed on http://localhost:3000/todo-items