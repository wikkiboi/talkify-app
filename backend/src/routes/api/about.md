API routing for the backend
Gets called via request from the frontend

Practical Ex. User gets prompted to the login page on the frontend.
User enters information and presses login button. Then frontend calls the API route in the backend that handle the login logic for the user ("api/auth/login")

Code Ex. In auth.ts we have "authRouter.post("/register", registerUser)".
"/register" is the API route for this specific router.
registerUser is a function that handles the register logic. All of these functions that handle the logic for the routes are in /controller directory

TLDR: user click login button --> send request to backend login route here in this folder --> login route calls controller function that handles the logic
