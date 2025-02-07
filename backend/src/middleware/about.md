# Middleware functions are passed in between API requests

i.e. Authentication or catching errors

Ex. User tries to login and makes API request to login, but they input incorrect login info.

API Request is made, route logic gets ran, but a middleware function that handles error catches the error in route logic and outputs it to the console or screen.
