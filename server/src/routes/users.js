import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/Users.js';

const router = express.Router()

/* *********** REGISTER A NEW USER *********** */
router.post("/register", async (req, res) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne({username: username});
    console.log(user)

    if (user) { // if user already exists
        return res.json({ message: "User already exists." });
    }

    // use bcrypt to HASH the password so you can't see the real password on MongoDB. 
    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new UserModel({
        username,
        password: hashedPassword
    })
    // create new user and store onto MongoDB
    await newUser.save()
    res.json({ message: "User registered successfully" });

});

/* *********** LOGIN AUTHENTICATION *********** */
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
  
    const user = await UserModel.findOne({ username });
  
    if (!user) {
      return res
        .status(400)
        .json({ message: "Username or password is incorrect" });
    }

    // once you hash something you cannot unhash it, so we will hash the password and if it is the same then the password is correct - the algo for hashing will always return the same value. So we compare the password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: "Username or password is incorrect" });
    }
    
    // creating a token using jsonwebtoken. When you sign, you sign the ID of the user.
    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, "secret");
    res.json({ token, userID: user._id, isAdmin: user.isAdmin });

    /* to check if this is working open postman and send a post request to http://localhost:3001/auth/login and add: 
        {
            "username": "John",
            "password": "password"
        }   

        your result should return: 

        {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MWRmMGYxOGU4MTYzNjQyMWIwNjViZiIsImlhdCI6MTY3OTY5OTQ5OH0.KXVknZharaWzVP7f4QkWH945NUc9yjHhT5GaRVpF90k",
            "userID": "641df0f18e81636421b065bf"
        }

    */
  });

export { router as userRouter };

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
    if (authHeader) {
      jwt.verify(authHeader, "secret", (err) => {
        if (err) {
          return res.sendStatus(403);
        }
        next();
      });
    } else {
      res.sendStatus(401);
    }
};

export const isAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    jwt.verify(authHeader, "secret", (err, decodedToken) => {
      if (err) {
        return res.sendStatus(403);
      }

      const userId = decodedToken.id;

      UserModel.findById(userId, (err, user) => {
        if (err || !user) {
          return res.sendStatus(403);
        }
        if (!user.isAdmin) {
          return res.sendStatus(403);
        }
        next();
      });
    });
  } else {
    res.sendStatus(401);
  }
}