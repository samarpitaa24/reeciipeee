import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <>
      <header>
        <h2>Dishcovery App</h2>
        <ul>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/myRecipe">My Recipe</NavLink></li>
          <li><NavLink to="/favRecipe">Favourites</NavLink></li>
          <li><NavLink to="/signin">Login</NavLink></li>
        </ul>
      </header>
    </>
  )
}
