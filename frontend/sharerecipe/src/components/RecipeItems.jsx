import React, { useEffect, useState } from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import foodImg from '../assets/foodRecipe.png';
import { BsStopwatchFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from 'axios';

export default function RecipeItems() {
    const recipes = useLoaderData() || [];  // Prevents crash if data is unavailable
    const [allRecipes, setAllRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    let path = window.location.pathname === "/myRecipe";
    let favItems = JSON.parse(localStorage.getItem("fav")) ?? [];
    const [isFavRecipe, setIsFavRecipe] = useState(false);

    useEffect(() => {
        console.log("Recipes received:", recipes);  // Debugging log

        if (recipes.length === 0) {
            console.warn("Backend API is unavailable, using mock data.");
            const mockRecipes = [
                { _id: "1", name: "Pasta", time: "20 min", coverImage: "foodRecipe.png" },
                { _id: "2", name: "Pizza", time: "30 min", coverImage: "foodRecipe.png" }
            ];
            setAllRecipes(mockRecipes);
        } else {
            setAllRecipes([...recipes]);  // ✅ Directly set recipes without modification
        }
        setLoading(false);
    }, [recipes]);

    const onDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/recipe/${id}`);
            setAllRecipes(prev => prev.filter(recipe => recipe._id !== id));
            let updatedFavItems = favItems.filter(recipe => recipe._id !== id);
            localStorage.setItem("fav", JSON.stringify(updatedFavItems));
        } catch (error) {
            console.error("Error deleting recipe:", error);
        }
    };

    const favRecipe = (item) => {
        let filterItem = favItems.filter(recipe => recipe._id !== item._id);
        favItems = favItems.some(recipe => recipe._id === item._id) ? filterItem : [...favItems, item];
        localStorage.setItem("fav", JSON.stringify(favItems));
        setIsFavRecipe(prev => !prev);
    };

    return (
        <div className='card-container'>
            {loading ? (
                <p className="loading-message">Loading recipes...</p>
            ) : allRecipes.length > 0 ? (
                allRecipes.map((item, index) => (
                    <div key={index} className='card' onDoubleClick={() => navigate(`/recipe/${item._id}`)}>
                        <img src={`http://localhost:5000/images/${item.coverImage}`} 
                            onError={(e) => e.target.src = foodImg} 
                            width="120px" height="100px" 
                        />
                        <div className='card-body'>
                            <div className='title'>{item.name ?? "Unnamed Dish"}</div>
                            <div className='icons'>
                                <div className='timer'><BsStopwatchFill /> {item.time}</div>
                                {!path ? (
                                    <FaHeart onClick={() => favRecipe(item)}
                                        style={{ color: favItems.some(res => res._id === item._id) ? "red" : "" }} />
                                ) : (
                                    <div className='action'>
                                        <Link to={`/editRecipe/${item._id}`} className="editIcon"><FaEdit /></Link>
                                        <MdDelete onClick={() => onDelete(item._id)} className='deleteIcon' />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p className="error-message">No recipes available. Check your internet connection.</p>
            )}
        </div>
    );
}
