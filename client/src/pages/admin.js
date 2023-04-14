import { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useGetUserID } from '../hooks/useGetUserID';

export const Admin = () => {
    const [recipes, setRecipes] = useState([]);
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

        fetchRecipe()

    }, []);

    const deleteRecipeFromTheWorld = async (recipeID) => {
        if (window.confirm("Are you sure you want to delete this recipe from the world?")) {
            try {
                await axios.delete(`http://localhost:8080/admin/delete/${recipeID}`)
                window.location.reload()
              } catch (err) {
                console.log(err)
              }
        }
      }

    return cookies.access_token ? (
        <div>
            <h1>ADMIN FEED</h1>
            {cookies.access_token && <p>You have permission to delete recipes if they do not meet the tastiness requirement</p>}
            <ul>
                {recipes.map((recipe) => (
                    <li key={recipe._id}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <h2 >{recipe.name}</h2>
                            {cookies.access_token && (
                                <button onClick={() => deleteRecipeFromTheWorld(recipe._id)}>Delete
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
    ) : null
}
