import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserID } from '../hooks/useGetUserID';


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

  return (
    <div>
      <h1>Saved Recipes</h1>
      <ul>
        {savedRecipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
            </div>
            <div>
                <h5>Ingredients:</h5>
                <h6 className='ingredients'>
                    {recipe.ingredients.map((ingredients) => (
                        <ul key={ingredients} className='li-ingredients'>{ingredients}</ul>
                    ))}
                </h6>
            </div>
            <p>{recipe.instructions}</p>
            <img src={recipe.imageUrl} alt={recipe.name} />
            <p>Cooking Time: {recipe.cookingTime} minutes</p>
          </li>
        ))}
      </ul>
    </div>
  );
};