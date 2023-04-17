import { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useGetUserID } from '../hooks/useGetUserID.js';

export const Home = () => {
    const [recipes, setRecipes] = useState([]);
    const [savedRecipes, setSavedRecipes] = useState([]);
    const [cookies, _] = useCookies([ "access_token" ]);
    const userID = useGetUserID();

    useEffect(() => { // hook that is called whenever the webpage is rendered

        const fetchRecipe = async () => {
            try {
                const response = await axios.get("http://localhost:8080/recipes");
                setRecipes(response.data)
                // console.log(response.data)

            } catch (err) {
                console.error(err)
            }
        };

        const fetchSavedRecipe = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8080/recipes/savedRecipes/ids/${userID}`
                );
                
                setSavedRecipes(response.data.savedRecipes);
                console.log(response.data);

            } catch (err) {
                console.error(err)
            }
        };

        fetchRecipe()
        if(cookies.access_token) fetchSavedRecipe()

    }, []);


    const saveRecipe = async (recipeID) => {
        try {
            const response = await axios.put("http://localhost:8080/recipes", {
                recipeID,
                userID
            }, {headers: { Authorization: cookies.access_token }});
            setSavedRecipes(response.data.savedRecipes)

        } catch (err) {
            console.error(err)
        }
    }

    const isRecipeSaved = (id) => savedRecipes.includes(id);

    return (
        <div>
            <h1>Recipes Home Feed</h1>
            {!cookies.access_token && <p>Please log in to save or create recipes.</p>}
            <ul>
                {recipes.map((recipe) => (
                    <li key={recipe._id}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <h2 >{recipe.name}</h2>
                            {cookies.access_token && (
                                <button
                                    onClick={() => saveRecipe(recipe._id)}
                                    disabled={isRecipeSaved(recipe._id)}
                                    style={
                                        isRecipeSaved(recipe._id)
                                            ? { opacity: 0.2, backgroundColor: "lightgreen" }
                                            : {}
                                    }
                                >
                                    {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
                                </button>
                            )}
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
    )
}