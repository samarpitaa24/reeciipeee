// AddFoodRecipe.jsx
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddFoodRecipe() {
    const [recipeData, setRecipeData] = useState({ title: '', time: '', ingredients: '', instructions: '', file: null });
    const navigate = useNavigate();

    const onHandleChange = (e) => {
        const { name, value, files } = e.target;
        let val = name === "ingredients" ? value.split(",") : name === "file" ? files[0] : value;
        setRecipeData(prev => ({ ...prev, [name]: val }));
    };

    const onHandleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", recipeData.title);
        formData.append("time", recipeData.time);
        formData.append("ingredients", recipeData.ingredients.join(","));
        formData.append("instructions", recipeData.instructions);
        if (recipeData.file) {
            formData.append("file", recipeData.file);
        }

        try {
            await axios.post("http://localhost:5000/recipe", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'authorization': 'bearer ' + localStorage.getItem("token")
                }
            });
            navigate("/");
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <div className='container'>
            <form className='form' onSubmit={onHandleSubmit}>
                <div className='form-control'>
                    <label>Title</label>
                    <input type="text" className='input' name="title" onChange={onHandleChange} value={recipeData.title} required />
                </div>
                <div className='form-control'>
                    <label>Time</label>
                    <input type="text" className='input' name="time" onChange={onHandleChange} value={recipeData.time} required />
                </div>
                <div className='form-control'>
                    <label>Ingredients</label>
                    <textarea className='input-textarea' name="ingredients" rows="5" onChange={onHandleChange} value={recipeData.ingredients} required />
                </div>
                <div className='form-control'>
                    <label>Instructions</label>
                    <textarea className='input-textarea' name="instructions" rows="5" onChange={onHandleChange} value={recipeData.instructions} required />
                </div>
                <div className='form-control'>
                    <label>Recipe Image</label>
                    <input type="file" className='input' name="file" onChange={onHandleChange} />
                </div>
                <button type="submit">Add Recipe</button>
            </form>
        </div>
    );
}
