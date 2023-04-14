import express from 'express';
import { RecipeModel } from "../models/Recipes.js";
import { isAdmin } from './users.js';

const router = express.Router();

router.delete("/delete/:recipeID", async (req, res) => {

    const recipeID = req.params.recipeID;

    try {
        await RecipeModel.findByIdAndDelete(recipeID);

    } catch (err) {
        res.json(err)
    }
})

export { router as adminRouter };

