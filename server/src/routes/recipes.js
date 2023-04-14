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

/* DISPLAYS RECIPES THAT THE USER HAS CREATED WHEN THE USER IS LOGGED IN */
router.get("/myRecipes/:userID", async (req, res) => {
    try {
        const recipes = await RecipeModel.find({ userOwner: req.params.userID});
        res.json(recipes)
    } catch (err) {
        res.json(err)
    }
})

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

/* REMOVE A RECIPE ONCE A USER HAS SAVED A RECIPE */
router.delete("/delete/:userID/savedRecipes/:recipeID", async (req, res) => {

    const userID = req.params.userID;
    const recipeID = req.params.recipeID;

    try {
        const user = await UserModel.findByIdAndUpdate(
            userID,
            { $pull: { savedRecipes: recipeID}},
            { new: true}
        );
    
        res.json(user);

    } catch (err) {
        res.json(err)
    }

})

/* PERMENANTLY DELETE THIS RECIPE IF THEY ARE THE OWNER / CREATOR OF THE RECIPE */
router.delete("/delete/:userID/myRecipes/:recipeID", async (req, res) => {
    try {
        const recipe = await RecipeModel.findById(req.params.recipeID)
        
        // check to see if the user making the request is the same as the recipe creator
        if (recipe.userOwner.toString() !== req.params.userID) {
            return res.status(401).json({message: "Not authorized to delete this item"})
        }
        // otherwise if the check is passed then remove the recipe from the Recipe Collection i.e. from the world.
        await RecipeModel.findByIdAndDelete(req.params.recipeID)

        res.json({message: "Deleted"})
    } catch (err) {
        res.json(err)
    }
})

/* UPDATE A RECIPE BY THE USER */
router.put("/update/:userID/myRecipes/:recipeID", async (req, res) => {
    try {
        const recipe = await RecipeModel.findById(req.params.recipeID);
        if(!recipe) {
            return res.send(404).json( { message: "Recipe not found" })
        }

        // check if user making the request is the same as the recipe creator

        if (recipe.userOwner.toString() !== req.params.userID) {
            return res.status(401).json( { message: "Not authorized to update this recipe"} )
        }

        // update the recipe

        const updateRecipe = await RecipeModel.findByIdAndUpdate(
            req.params.recipeID,
            req.body
        )

        res.json(updateRecipe)
    } catch (err) {
        res.json(err)
    }
})


export { router as recipesRouter };
