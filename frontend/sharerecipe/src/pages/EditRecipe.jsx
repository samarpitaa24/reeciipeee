import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function EditRecipe() {
    const [recipeData, setRecipeData] = useState({
        title: "",
        time: "",
        ingredients: "",
        instructions: "",
        file: null
    })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/recipe/${id}`)
                const res = response.data
                setRecipeData({
                    title: res.title || "",
                    time: res.time || "",
                    ingredients: res.ingredients ? res.ingredients.join(", ") : "",
                    instructions: res.instructions || "",
                    file: null // File cannot be prefilled
                })
            } catch (error) {
                console.error("Error fetching recipe:", error)
                alert("Failed to fetch recipe. Please try again.")
            }
        }
        getData()
    }, [id])

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
        if (!recipeData.title || !recipeData.time || !recipeData.ingredients.length || !recipeData.instructions) {
            alert("Please fill out all fields before submitting.")
            return
        }

        const formData = new FormData()
        formData.append("title", recipeData.title)
        formData.append("time", recipeData.time)
        formData.append("ingredients", JSON.stringify(recipeData.ingredients)) // Store array as string
        formData.append("instructions", recipeData.instructions)
        if (recipeData.file) formData.append("file", recipeData.file) // Only append if a new file is selected

        setLoading(true)

        try {
            await axios.put(`http://localhost:5000/recipe/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'authorization': 'Bearer ' + localStorage.getItem("token")
                }
            })
            alert("Recipe updated successfully!")
            navigate("/myRecipe")
        } catch (error) {
            console.error("Error updating recipe:", error)
            alert("Failed to update recipe. Please try again.")
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
                    <label>Ingredients </label>
                    <textarea className='input-textarea' name="ingredients" value={recipeData.ingredients} onChange={onHandleChange} rows="3" required />
                </div>
                <div className='form-control'>
                    <label>Instructions</label>
                    <textarea className='input-textarea' name="instructions" value={recipeData.instructions} onChange={onHandleChange} rows="5" required />
                </div>
                <div className='form-control'>
                    <label> Image</label>
                    <input type="file" className='input' name="file" onChange={onHandleChange} accept="image/*" />
                </div>
                <button type="submit" disabled={loading}>{loading ? "Updating..." : "Edit Recipe"}</button>
            </form>
        </div>
    )
}
