# INNOVIC Node.js assignment application

This is a demo application developed on Node.js which serves two endpoints ```/api/application``` and ```/api/application/:applicationId```. The application is a REST API that retrieves data from MongoDB data sources. The following technologies are used to develop this application: 
- Node.js v18.14.0 
- Express.js for the REST API server 
- MongoDB client modules to read data from DBs 
- dotenv to hide sensitive information like ```PORT``` and ```MONGO_CONNECTION_STRING```.

## Installation

1. Clone this repository to your local machine
2. Navigate to the project directory in your terminal
3. Run npm install to install all the required dependencies
4. Create a ```.env``` file in the root directory of the project and add the following:

```PORT=<port_number>
MONGO_CONNECTION_STRING=<mongo_connection_string>
```

3. Replace ```<port_number>``` with your desired port number and ```<mongo_connection_string>``` with the connection string for your MongoDB database.

## Usage

After installation, run the following command to start the server:

```npm start```

This will start the server at ```http://localhost:<port_number>```. You can use the following endpoints to retrieve data from the server:

```
GET http://localhost/api/application``` - Returns all applications from the apps collection in MongoDB.
```GET http://localhost/api/application/:applicationId``` - Returns a single application with the specified applicationId from the apps collection in MongoDB.
Applications with enabled=true and deleted=false status will be included in the response. The response for GET ```http://localhost/api/application``` will include the following attributes:

\_id (e.g. "582457b6016eaa9d3aee09fb")
type (type of application)
name (name of application)
platform (from meta.platform)
totalPoints (sum of all points from points collection for this application \_id)
The items are sorted in descending order based on points. The response will be in JSON format with status code 200.

In case of an error (e.g. db failure), a JSON document will be returned with an error field containing the error description with the correct response code in the following format:
```
{
status: false,
error: <error_message>
}
```
## Database Dump

In root directory I will provide dummy data that I am using in JSON format.
After importing the dump into the innovic database, both collections should appear.

## Conclusion

This demo application is a simple and efficient way to retrieve data from MongoDB data sources using Node.js. It provides a basic framework that can be extended and customized to suit your specific requirements. If you have any questions or feedback, please feel free to reach out to me.
