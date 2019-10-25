import React, { useState, useEffect } from 'react'
import './App.css'
import Recipe from './component/Recipe';
const App = () => {
  const APP_ID = "8ecef3e7"
  const APP_KEY = "8253f35750e1d57d8d7a6d6a2e01db4c";
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");
  useEffect(
    () => {
      getRecipes();
      console.log('lets see fetched data')
    }, [query]
  );
  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=3&calories=591-722&health=alcohol-free`);
    const data = await response.json();
    setRecipes(data.hits)
    console.log(data.hits);
  }
  const updateSearch = e => {
    setSearch(e.target.value);
  }
  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('')
  }
  return (
    <div className="App">


      <form className="search-form"
        onSubmit={getSearch}
      >
        <input className="search-bar"
          type="text"
          onChange={updateSearch}
          value={search}
        />
        <button className="search-button"
          type="submit">search</button>
      </form>
      <div className="recipes">
        {recipes.map(recipe => (
          <Recipe key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        )
        )}
      </div>
    </div>
  )

}
export default App;
