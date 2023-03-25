import { useState } from 'react';
import axios from "axios";
import { useGetUserID } from '../hooks/useGetUserID';
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie';

export const CreateRecipe = () => {

    const [cookies, _] = useCookies([ "access_token" ]);
    const userID = useGetUserID();

    // format of our data
    const [recipe, setRecipe] = useState({
        name: "",
        ingredients: [],
        instructions: "",
        imageUrl: "",
        cookingTime: 0,
        userOwner: userID,
    });

    const navigate = useNavigate()

    const handleChange = (event) => {
        const {name, value} = event.target;
        setRecipe({...recipe, [name]: value})
    }

    const handleIngredientChange = (event, idx) => {
        const {value} = event.target;
        const ingredients = recipe.ingredients;
        ingredients[idx] = value;
        setRecipe({...recipe, ingredients})
    }

    const addIngredient = () => {
        setRecipe({...recipe, ingredients: [...recipe.ingredients, ""]})
        // setting the recipe object to be the same as it was before and then only changing the ingredients field. Whatever the ingredients field was before + anything else
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("http://localhost:8080/recipes", recipe,
            {headers: { Authorization: cookies.access_token }});
            alert("Recipe Created")
            navigate('/') // navigate to home page after submitted the recipe

        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="create-recipe">
            <h2>Create Recipe</h2>
            <form onSubmit={onSubmit}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" onChange={handleChange}/>
                <label htmlFor="ingredients">Ingredients</label>
                {recipe.ingredients.map((ingredients, idx) => (
                    <input 
                        key={idx}
                        type="text"
                        name="ingredients"
                        value={ingredients} 
                        onChange={(event) => handleIngredientChange(event, idx)}
                    />
                ))}
                <button onClick={addIngredient} type="button">
                    Add Ingredient
                </button>

                <label htmlFor="instructions">Instructions</label>
                <textarea id="instructions" name="instructions" onChange={handleChange}/>
                <label htmlFor="imageUrl">Image Url</label>
                <input type="text" id="imageUrl" name="imageUrl" onChange={handleChange}/>
                <label htmlFor="cookingTime">Cooking Time (minutes)</label>
                <input type="number" id="cookingTime" name="cookingTime" onChange={handleChange}/>

                <button type="submit" >Create Recipe</button>
            </form>
        </div>
    )
}