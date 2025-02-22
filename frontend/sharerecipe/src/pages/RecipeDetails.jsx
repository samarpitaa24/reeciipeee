import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AddFoodRecipe() {
    const [recipeData, setRecipeData] = useState({
        title: "",
        time: "",
        ingredients: "",
        instructions: "",
        file: null
    })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const onHandleChange = (e) => {
        let value = e.target.value

        if (e.target.name === "ingredients") {
            value = e.target.value.split(",") // Convert ingredients to an array
        } else if (e.target.name === "file") {
            value = e.target.files[0] // Store file object
        }

        setRecipeData(prev => ({ ...prev, [e.target.name]: value }))
    }

    const onHandleSubmit = async (e) => {
        e.preventDefault()

        // Basic validation
        if (!recipeData.title || !recipeData.time || !recipeData.ingredients.length || !recipeData.instructions || !recipeData.file) {
            alert("Please fill out all fields before submitting.")
            return
        }

        const formData = new FormData()
        formData.append("title", recipeData.title)
        formData.append("time", recipeData.time)
        formData.append("ingredients", JSON.stringify(recipeData.ingredients)) // Store array as string
        formData.append("instructions", recipeData.instructions)
        formData.append("file", recipeData.file)

        setLoading(true)

        try {
            await axios.post("http://localhost:5000/recipe", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'authorization': 'Bearer ' + localStorage.getItem("token")
                }
            })
            alert("Recipe added successfully!")
            setRecipeData({ title: "", time: "", ingredients: "", instructions: "", file: null }) // Reset form
            navigate("/")
        } catch (error) {
            console.error("Error adding recipe:", error)
            alert("Failed to add recipe. Please try again later.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='container'>
            <form className='form' onSubmit={onHandleSubmit}>
                <div className='form-control'>
                    <label>Title</label>
                    <input type="text" className='input' name="title" value={recipeData.title} onChange={onHandleChange} required />
                </div>
                <div className='form-control'>
                    <label>Time (e.g., 30 min)</label>
                    <input type="text" className='input' name="time" value={recipeData.time} onChange={onHandleChange} required />
                </div>
                <div className='form-control'>
                    <label>Ingredients (comma-separated)</label>
                    <textarea className='input-textarea' name="ingredients" value={recipeData.ingredients} onChange={onHandleChange} rows="3" required />
                </div>
                <div className='form-control'>
                    <label>Instructions</label>
                    <textarea className='input-textarea' name="instructions" value={recipeData.instructions} onChange={onHandleChange} rows="5" required />
                </div>
                <div className='form-control'>
                    <label>Recipe Image</label>
                    <input type="file" className='input' name="file" onChange={onHandleChange} accept="image/*" required />
                </div>
                <button type="submit" disabled={loading}>{loading ? "Adding..." : "Add Recipe"}</button>
            </form>
        </div>
    )
}
