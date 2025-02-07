# App Flow

MAKE SURE TO INSTALL NVM TO THEN INSTALL NPM FIRST TO BE ABLE TO RUN JAVASCRIPT
Linux: <https://github.com/nvm-sh/nvm>
MacOS: <https://sukiphan.medium.com/how-to-install-nvm-node-version-manager-on-macos-d9fe432cc7db>
Windows: Look into WSL (Windows Subsystem for Linux) then follow the github link above

Go to the backend folder in your terminal
Run "npm install" or "npm i" to install the dependencies for the app

Run "npm start" in the terminal to start the server
Run "npm run dev" to start server but auto update on file save
Turning on server allows API requests to be made on the given port.

"Server listening on PORT 3001"

check <http://localhost:3001> on browser
or API platforms (Postman, Insomnia, HTTPie)
You should see "Cannot GET /"

Access route by putting the link set in the code.
Ex.
In app.ts we have "app.use("/api/auth", authRouter)"
In authRouter we have "authRouter.post("/register", registerUser)"

So the API route would be <http://localhost:3001/api/auth/register>
(This is a POST request so the browser would display "Cannot GET /api/auth/register". Use an API platform to switch/test request modes)

The basic types of API requests:
GET: receive data from server
POST: send data to server
PUT: update data in server
DELETE: delete data in server

USUALLY we have a file called ".env" where we store info like the PORT number instead of hardcoding it in server.ts. Also includes stuff like the database password, secret code for encrypting passwords, etc.
will add this later
