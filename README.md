# Task-Manager
A task management site using react+django

#AUTHENTICATION

User must first create an account -signUp page, then he/she get redirected to the signIn page.
You are allowed to use and email and username that havent been used, meaning a person must have only one account.
Incase you forgot about the password there is a link for redirecting you on the next steps to take.
While setting passwords, kindly use a strong password i.e more than 8 characters, a mixture of letters, digits and symbols, this is foryour own safety incase of bruteforce action.
To add to hat, we have profile symbol in the left zone, where user can logout or view there profile incase they want to change the email. Kindly note that the usersname is uneditable.

#HOMEPAGE

This shows the number of tasks for the user who has logged in only. If you try to access other restricted pages you will get a warning.
The table has task, color and its editable, where the user can add unlimited tasks. You are also free to delete the task but be keen while pressing that button( indicated danger by red color)
On the left side, there is a menu, while viewing on the mobile phone, just click on three sticks and it will open. It has taskmanager, dashboard  and Categories. Each ne has its own specific page for different functionalities.

#TECHNOLOGY USED

React.js  -frondend, the code is clean for ease modification during maintenance. ADdition of bootstrap

Django    -backend, we opted for django to accelerate the rate of building thh applixcation, its easeier to build simple and complex API with this technology.

PostreSQL -We prefered using postegre because its easier and very compatible with the backend django, which  makes it fast to deploy.
