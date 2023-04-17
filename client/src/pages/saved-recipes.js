import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserID } from '../hooks/useGetUserID.js';


export const SavedRecipes = () => {

  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/recipes/savedRecipes/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
        console.log(setSavedRecipes)

      } catch (err) {
        console.log(err);
      }
    };

    fetchSavedRecipes();

  }, []);

  const deleteRecipeFromSaved = async (recipeID) => {
    try {
      await axios.delete(`http://localhost:8080/recipes/delete/${userID}/savedRecipes/${recipeID}`)
      window.location.reload()

    } catch (err) {
      console.log(err)
    }

  }

  return (
    <div>
      <h1>Saved Recipes</h1>
      <h2>These are all the recipes you have saved from your feed. Get cooking!</h2>
      <ul>
        {savedRecipes && savedRecipes.map((recipe) => (
          <li key={recipe._id}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <h2>{recipe.name}</h2>
              <button onClick= {() => deleteRecipeFromSaved(recipe._id)}>Remove</button>
            </div>
            <div>
                <h5>Ingredients:</h5>
                <h6 className='ingredients'>
                    {recipe.ingredients.map((ingredients) => (
                        <ul key={ingredients} className='li-ingredients'>{ingredients}</ul>
                    ))}
                </h6>
            </div>
            <div className='instructions'>
                <h5>Instructions:</h5>
                <p>{recipe.instructions}</p>
            </div>
            <div>
                <img src={recipe.imageUrl} alt={recipe.name} />
            </div>
            <div>
                <h5>Cooking Time:</h5>
                <p>{recipe.cookingTime} (minutes)</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};