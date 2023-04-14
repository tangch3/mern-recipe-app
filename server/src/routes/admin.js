import express from 'express';
import { RecipeModel } from "../models/Recipes.js";
import { isAdmin } from './users.js';

const router = express.Router();

router.get("/admin", isAdmin, async (req, res) => {
    try {
        const response = await RecipeModel.find({}) // {} returns all values in the collection
        res.json(response);
    } catch (err) {
        res.json(err);
    }
})

export { router as adminRouter };

