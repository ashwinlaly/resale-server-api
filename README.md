#Resale Application helps to sale all the products which a person likes to sale

##implementation tools
```
Node.js # API
    socket.io
    JWT token
MongoDB # Backend Database
    Change Streams
```

##To run the API server Follow the instructions

```
cd server-api
npm install (or) npm i
Now run the mongoDB serve in mycase with the following
    > mongod --port 27103 --dbpath=E:/My_projects/mongo --replSet "rs"
    > mongo "mongodb://localhost:27103"
    > rs.initiate [optional - not need when the replica set is already initiated]
Now run the API server the command
    > node app.js
    > Now the server will be running at the port http://localhost:1212
```