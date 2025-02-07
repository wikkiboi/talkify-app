App Flow:
Run "npm start" in the terminal to start the server
Run "npm run dev" to start server but auto update on file save
Turning on server allows API requests to be made on the given port.

"Server listening on PORT 3001"

check http://localhost:3001 on browser
or API platforms (Postman, Insomnia, HTTPie)

Access route by putting the link set in the code.
Ex.
In app.ts we have "app.use("/api/auth", authRouter)"
In authRouter we have "authRouter.post("/register", registerUser)"

So the API route would be http://localhost:3001/api/auth/register
(This is a POST request so the browser would display "Cannot GET /api/auth/register". Use an API platform to switch/test request modes)
