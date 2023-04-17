Recipe React App

This is a web application built with React that allows users to create, view, and save recipes. Users can register, log in, and log out.

 Registered users have access to additional features such as creating and saving their own recipes, and viewing a personalized feed of recipes. 
 
 Admin users have access to an admin feed where they can delete recipes that do not meet the tastiness requirement.

Installation

Clone the repository: git clone https://github.com/tangch3/mern-recipe-app.git

Navigate to the project directory: cd mern-recipe-app
Start the app that will also install all relevant dependencies: npm start

Register a new user account or log in with an existing account.

Browse the recipes by clicking on the Home Feed link or view your own recipes by clicking on the My Recipes link.

Create a new recipe by clicking on the Create Recipe link.

Save a recipe to your collection by clicking the Save button on the recipe page.

Log out by clicking on the Logout button.

For purposes of this coursework the admin username and password is:

username: admin
password: admin


System Architecture:

Express.js
MongoDB
Next.js
React.js
Bootstrap

use npm start to run

Functional Requirements - How does it work?

- App must allow users to create an account to sign in and out
- App must allow users to add recipes

Non-functional requirements

- Must perform quickly, load tasks quickly (task be found in less than 15 seconds) and be able to update and assign tasks extremely fast. People will not want to wait ages.
- Must be secure, data is extremely important these days and must not be able to be hacked. - The system prevents exposure to user data. All encrypted.
- No bugs, must be reliable - 90% operational when in use
- The application is fast and responsive, it responds to client requests in less than five seconds when the number of simultaneous users is greater than 1000.

User Stories:

Brian - "As an existing user, I want to be able to log into my account"

Steven - "I want to be able to save recipes"


Why is this app different than other recipe apps?

    This app is very straightforward to use. Many recipe apps and websites have unnecessary text and adverts being shown and you always have to scroll down to the bottom of the page in order to see the actual recipe.

    This app will just show you what the recipe is, the ingredients, instructions, cooking time.

    Users will be able to create an account and save the recipes that they enjoy and love to cook.

    This is a very simple and efficient no bs app.






