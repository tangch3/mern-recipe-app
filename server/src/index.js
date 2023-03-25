import express from 'express'; // api 
import cors from 'cors'; // allows you to set up the rules between the front end and back end.
import mongoose from 'mongoose'; // database management system
import { userRouter } from './routes/users.js'
import { recipesRouter } from './routes/recipes.js'

const app = express();
const port = process.env.PORT || 8080

/* MIDDLEWARE */
app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);

/* MONGODB CONNECTION */
mongoose.connect("mongodb+srv://tangch3:tangch3@cluster0.b68any3.mongodb.net/recipes?retryWrites=true&w=majority");

app.listen(port, () => console.log(`SERVER STARTED ON PORT ${port}`))

