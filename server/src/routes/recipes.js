import express from 'express';
import { RecipeModel } from "../models/Recipes.js";
import { UserModel } from "../models/Users.js";
import { verifyToken } from './users.js';

const router = express.Router();


/* DISPLAY RECIPES ON THE HOMEPAGE */
router.get("/", async (req, res) => {
    try {
        const response = await RecipeModel.find({}) // {} returns all values in the collection
        res.json(response);
    } catch (err) {
        res.json(err);
    }
});


/* ADD RECIPES */
router.post("/", verifyToken, async (req, res) => {
    const recipe = new RecipeModel(req.body);
    try {
        const response = await recipe.save();
        res.json(response)
    } catch (err) {
        res.json(err);
    }
});


/* SAVE RECIPES FOR USER */
router.put("/", verifyToken, async (req, res) => {
    try {
        const recipe = await RecipeModel.findById(req.body.recipeID)
        const user = await UserModel.findById(req.body.userID)
        user.savedRecipes.push(recipe);
        await user.save();
        res.json({ savedRecipes: user.savedRecipes });
    } catch (err) {
        res.json(err);
    }
});


/* GET A SAVED RECIPE PER USER */
router.get("/savedRecipes/ids/:userID", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userID);
        res.json({ savedRecipes: user?.savedRecipes });

    } catch (err) {
        res.json(err)
    }
})


/* GET ALL SAVED RECIPES */
router.get("/savedRecipes/:userID", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userID);
        const savedRecipes = await RecipeModel.find({
            _id: { $in: user.savedRecipes },
        });
        res.json({ savedRecipes });

    } catch (err) {
        res.json(err)
    }
})

export { router as recipesRouter };
