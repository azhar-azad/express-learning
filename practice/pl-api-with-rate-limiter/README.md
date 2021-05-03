# ParkingLot API
## Prerequisites
1. Node, NPM, MongoDB(to store app data) and Redis(to store rate-limit data) must be installed in the machine. 
2. Download and Install [Node with NPM](https://nodejs.org/en/download/).
3. Download and Install [MongoDB](https://docs.mongodb.com/manual/installation/).
4. Download and Install [Redis](https://redis.io/download).
## Project Setup
1. Unzip the repository.
2. Navigate to the project root directory in your terminal. 
3. Install the project dependencies using the command `npm i`.
## Project Info
The code contains a simple node server that allows us to mock a parking lot service through it's 3 API endpoints (URLs are listed at _Endpoints_ section). You can define the total number of slots i.e. the parking lot size in the .env file.

_**.env file properties:**_ 
1. _PORT:_ Defines the port number.
2. _PARKING_LOT_SIZE:_ Defines the number of slots in the parking lot. 
3. _DB_NAME:_ Defines the mongo document name. Just define the name here, if mogodb service is running, the server will automatically creates a document of the same name. 
4. _SLOT_NUMBER_PREFIX:_ Defines a prefix to identify the slot number. I used 'SL' as a value for this property and as a prefix for the slot numbers, which distinguishes it from car numbers. For example, 'SL101' is a slot number. Anything without a 'SL' prefix is car number to the server.
5. _WINDOW_SIZE_IN_HOURS:_ Defines the rate-limit window in hours. 
6. _MAX_WINDOW_REQUEST_COUNT:_ Defines the maximum number of request granted for an IP in an window.
### Endpoints explanation:
- _**Park a Car:**_ Make a POST request to the URL and pass a car number as query parameter. The car number can be any string. No body needs to be passed. If a slot is available, the car will be saved to the Mongo database with the slot number and a JSON object with car and slot number is returned. If no slot is available, i.e. the parking lot is full, the message `Parking Lot is full. No slots are available.` is returned.
- _**Unpark a Car:**_ Make a DELETE request to the URL and pass a slot number as query parameter. If the slot was occupied, it will be freed and JSON object the the message `{{ slotNumber }} is freed.` will be returned. If the slot was empty, `Slot not found` message will be returned. 
- _**Get the Car/Slot Information:**_ Make a GET request to the URL and pass either a car number or a slot number (not both) as query parameter. The server distinguishes the parameter as a slot number by _SLOT_NUMBER_PREFIX_ defined in the _.env_ file. If the car number or slot number is correct, the server returns a JSON object with both the car number and slot number. If slot or car is not found, appropriate error message is shown. 
- _**SPECIAL: Server Test:**_ Make a GET request to the URL without any query parameter. If the server is online, it will return a JSON object with the message `Server is online`. 
### About Rate Limiter:
A custom made rate limiter implementing the _Sliding Window Counter_ rate-limit algorithm is used to rate-limit the API. For this implementation, I had made use of the _Redis_ to keep track of each user's request count and timestamp using their IP address. 
Define the window size in hours and the maximum number of request limit in the _.env_ file. 
### Project Structure:
1. _config:_ Reads the .env file and stores the properties in an object.
2. _routes:_ All route-endpoints are listed here. 
3. _controllers:_ The endpoint's logic are defined here. 
4. _middlewares:_ The rate-limiter is defined here. 
## Endpoints
1. **Server Test:** GET /lot/test
2. **Park a Car:** POST /lot/park/{{ carNumber: _string_ }}
3. **Unpark a Car:** DELETE /lot/unpark/{{ slotNumber: _string_ }}
4. **Get the Car/Slot Information:** GET /lot/info/{{ carNumber: _string_ or slotNumber: _string_ }}

