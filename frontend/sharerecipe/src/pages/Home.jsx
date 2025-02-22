import React, { useState, useEffect } from "react";
import foodRecipe from "../assets/foodRecipe.png";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RecipeItems from "../components/RecipeItems";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import InputForm from "../components/Inputform";

export default function Home() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [recipes, setRecipes] = useState([]);

  // Fetch recipes from backend/local storage
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        let response = await fetch("http://localhost:5000/api/recipes"); // Replace with actual API
        let data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setRecipes([]); // Handle empty state
      }
    };

    fetchRecipes();
  }, []);

  const addRecipe = () => {
    // let token = localStorage.getItem("token");
    // if (token) navigate("/addRecipe");
    // else setIsOpen(true);
    navigate("/addRecipe");
  };

  return (
    <>
      <div className="home">
        <div className="left">
          <h1>From Kitchen to Plate!</h1>
          <h5>
          A place where flavors meet, stories unfold, and every dish feels like home. Share, explore, and savor the joy of cooking!
          </h5>
          <button onClick={addRecipe}>Share your recipe</button>
        </div>
        {/* <div className="right">
          <img src={foodRecipe} width="320px" height="300px" alt="Food" />
        </div> */}
      </div>


{/* <div className="svg-container">
<img src="/GugwYZ01.svg" alt="Background SVG" className="bg-svg" />

</div> */}



      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <InputForm setIsOpen={() => setIsOpen(false)} />
        </Modal>
      )}

      <div className="recipe">
        <RecipeItems recipes={recipes} />
      </div>
    </>
  );
}
