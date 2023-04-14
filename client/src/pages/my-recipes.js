import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserID } from '../hooks/useGetUserID';


export const MyRecipes = () => {

  const [myRecipes, setMyRecipes] = useState([]);
  const [editRecipe, setEditRecipe] = useState({});
  const userID = useGetUserID();

  useEffect(() => {

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/recipes/myRecipes/${userID}`
        );
        setMyRecipes(response.data);
        console.log(setMyRecipes)

      } catch (err) {
        console.log(err);
      }
    };

    fetchSavedRecipes();

  }, []);

  const deleteRecipeFromTheWorld = async (recipeID) => {
    if (window.confirm("Are you sure you want to delete this recipe from the world?")) {
        try {
            await axios.delete(`http://localhost:8080/recipes/delete/${userID}/myRecipes/${recipeID}`)
            window.location.reload()
      
          } catch (err) {
            console.log(err)
          }
    }
  }

  const handleEditRecipe = (recipe) => {
    setEditRecipe(recipe)
  }

  const handleUpdateRecipe = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:8080/recipes/update/${userID}/myRecipes/${editRecipe._id}`, editRecipe);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }

  const handleChange = (event) => {
    setEditRecipe({
        ...editRecipe,
        [event.target.name]: event.target.value
    })
  }

  const handleCancelEdit = () => {
    setEditRecipe(null);
}

  return (
    <div>
      <h1>My Created Recipes</h1>
      {myRecipes.length === 0 && <p>You have not created any recipes</p>}
      <ul>
      {myRecipes && myRecipes.map((recipe) => (
    <li key={recipe._id}>
        {editRecipe && editRecipe._id === recipe._id ? (
            <div>
                <form className="edit-form" onSubmit={handleUpdateRecipe}>
                    <label>
                        Recipe Name:
                        <input type="text" name="name" value={editRecipe.name} onChange={handleChange} />
                    </label>
                    <label>
                        Ingredients:
                        <textarea name="ingredients" value={editRecipe.ingredients} onChange={handleChange} />
                    </label>
                    <label>
                        Instructions:
                        <textarea name="instructions" value={editRecipe.instructions} onChange={handleChange} />
                    </label>
                    <label>
                        Image URL:
                        <input type="text" name="imageUrl" value={editRecipe.imageUrl} onChange={handleChange} />
                    </label>
                    <label>
                        Cooking Time:
                        <input type="number" name="cookingTime" value={editRecipe.cookingTime} onChange={handleChange} />
                    </label>
                    <button type="submit">Save</button>
                    <button type="button" onClick={handleCancelEdit}>Cancel</button>
                </form>
            </div>
        ) : (
            <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <h2>{recipe.name}</h2>
                    <button onClick={() => handleEditRecipe(recipe)}>Edit</button>
                    <button onClick={() => deleteRecipeFromTheWorld(recipe._id)}>Delete</button>
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
            </div>
        )}
    </li>
))}

      </ul>
    </div>
  );
};