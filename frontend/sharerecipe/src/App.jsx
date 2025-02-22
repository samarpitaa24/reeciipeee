import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import MainNavigation from "./components/MainNavigation";
import AddFoodRecipe from "./pages/AddFoodRecipe";
import EditRecipe from "./pages/EditRecipe";
import RecipeDetails from "./pages/RecipeDetails";
import InputForm from "./components/Inputform";

// Dummy Data to Replace Backend Calls
const dummyRecipes = [
  {
    _id: "1",
    name: "Pasta",
    createdBy: "123",
    ingredients: "Flour, Water",
    steps: "Boil water, cook pasta",
    time: "20 min",
    image: "https://via.placeholder.com/150",
  },
  {
    _id: "2",
    name: "Pizza",
    createdBy: "456",
    ingredients: "Dough, Cheese, Tomato Sauce",
    steps: "Bake at 180°C",
    time: "30 min",
    image: "https://via.placeholder.com/150",
  },
];

const dummyUser = { _id: "123", email: "user@example.com" };

// Function Replacements for Backend Calls
const getAllRecipes = async () => dummyRecipes;

const getMyRecipes = async () => {
  let user = JSON.parse(localStorage.getItem("user")) || dummyUser;
  return dummyRecipes.filter((item) => item.createdBy === user._id);
};

const getFavRecipes = () => JSON.parse(localStorage.getItem("fav")) || [];

const getRecipe = async ({ params }) => {
  let recipe = dummyRecipes.find((r) => r._id === params.id);
  return { ...recipe, email: dummyUser.email };
};

// Router
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainNavigation />,
    children: [
      { path: "/", element: <Home />, loader: getAllRecipes },
      { path: "/myRecipe", element: <Home />, loader: getMyRecipes },
      { path: "/favRecipe", element: <Home />, loader: getFavRecipes },
      { path: "/addRecipe", element: <AddFoodRecipe /> },
      { path: "/signin", element: <InputForm /> },
      { path: "/editRecipe/:id", element: <EditRecipe /> },
      { path: "/recipe/:id", element: <RecipeDetails />, loader: getRecipe },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
