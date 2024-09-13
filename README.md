# Usage
Register: Sign up as a new user.
Login: Authenticate with email and password to access the dashboard.
Dashboard: View, add, edit, and delete expenses. The total expenses will be calculated and displayed.
Reset Password: If you forget your password, use the password reset form to update it.
Logout: End the session by logging out.

# Scripts
npm start: Runs the app in development mode.
npm run build: Builds the app for production.


# API Endpoints
Method	Endpoint	Description
POST	users/register	Register a new user
POST	users/login	Login user
POST	users/reset	Reset password
GET	expenses/	Get all expenses for a user
POST	expenses/	Add a new expense
PUT	expenses/:id
Edit an existing expense
DELETE	expenses/:id
Delete an expense