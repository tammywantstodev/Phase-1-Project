//Code to collapse the favorites section on the page
const toggleButton = document.getElementById('toggleButton');
const sideMenu = document.getElementById('results-section');
toggleButton.addEventListener('click', () => {
    sideMenu.classList.toggle('collapsed');
});
//fetching data from the API
const recipeCards = document.getElementById('recipe-cards');
const apiKey = "290b96a0f4cd432d9e006f860ca644c7";
const ingredientsList = document.getElementById('ingredients');
const form=document.querySelector('form');
const favouritesSection = document.getElementById('favorite-recipes');

//Code that runs after the submit button is hit
form.addEventListener('submit', (e) => {
    e.preventDefault();
    recipeCards.innerHTML = '';
const ingredients=ingredientsList.value;
    if (!ingredients) {
       recipeCards.innerHTML = "<p>Please enter ingredients.</p>";
        return;
    }
    //fetching images and titles
    fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=10&apiKey=${apiKey}`)
        .then((response) => response.json())
        .then((data) => {
            data.forEach((recipe) => {
                const li = document.createElement("li");

                const title = document.createElement("p");
                title.textContent = recipe.title;
                title.classList.add('card-titles');


                const image = document.createElement("img");
                image.src = recipe.image;
                image.alt = `Image of ${recipe.title}`;

                li.appendChild(title);
                li.appendChild(image);

                //fetching instructions
fetch( `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${apiKey}`)
    .then((response) => response.json())
                .then((details) => {
                    const instruction = document.createElement("p");
                    instruction.innerHTML = details.instructions;
                    li.appendChild(instruction);
                })
const favoriteButton = document.createElement("button");
favoriteButton.classList.add("favorite-button");
favoriteButton.textContent = 'Add to Favorites';

//favorite button takes the parameter of 'recipe' which was defined in the for each loop on line 27
favoriteButton.addEventListener('click', () => addToFavourites(recipe));


                li.appendChild(favoriteButton);

//Displaying data
                recipeCards.appendChild(li);

            })
        })
        .catch((error) => console.error("Error fetching recipes:", error));
})


//Favorites section
// Function to add a recipe to favourites in localStorage
function addToFavourites(recipe) {
    //get favorites or an empty array
    let favourites = JSON.parse(localStorage.getItem('favourites')) || [];
    if (!favourites.some(fav => fav.id === recipe.id)) {
        favourites.push(recipe);
        localStorage.setItem('favourites', JSON.stringify(favourites));
        renderFavourites();
    }
}
function removeFromFavourites(recipe) {
    let favourites = JSON.parse(localStorage.getItem('favourites')) || [];

    // Filter out the recipe to remove
    favourites = favourites.filter(fav => fav.id !== recipe.id);

    // Update localStorage with the modified favorites array
    localStorage.setItem('favourites', JSON.stringify(favourites));

    // Re-render the favorites section to reflect the changes
    renderFavourites();
}


// Function to render the favourites section from localStorage when the page loads
function renderFavourites() {
    sideMenu.innerHTML = ''; // Clear existing favourites list
    const favourites = JSON.parse(localStorage.getItem('favourites')) || [];

    if (favourites.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = "No favorites added yet.";
        sideMenu.appendChild(emptyMessage);
        return;
    }

    favourites.forEach(fav => {
        const favTitle = document.createElement('p');
        favTitle.textContent = fav.title;
        favTitle.style.fontFamily = "'Keania One', 'sans-serif'"
        favTitle.addEventListener('click', () => displayRecipeDetails(fav));
        sideMenu.appendChild(favTitle);

    });
}


//function to display favorited recipes details on the page when clicked
function displayRecipeDetails(recipe) {
    recipeCards.innerHTML = '';
    const li = document.createElement("li");

    const title = document.createElement("p");
    title.textContent = recipe.title;
    title.classList.add('card-titles');

    const image = document.createElement("img");
    image.src = recipe.image;
    image.alt = `Image of ${recipe.title}`;

    const removeButton = document.createElement("button");
    removeButton.classList.add('remove-button');
    removeButton.textContent = 'Remove Recipe';

    removeButton.addEventListener('click', () => removeFromFavourites(recipe));

    li.appendChild(title);
    li.appendChild(image);
    li.appendChild(removeButton);

    fetch(`https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${apiKey}`)
        .then((response) => response.json())
        .then((details) => {
            const instruction = document.createElement("p");
            instruction.innerHTML = details.instructions || "No instructions available.";
            li.appendChild(instruction);
        })
        .catch((error) => console.error("Error fetching recipe details:", error));

    recipeCards.appendChild(li);

}
//call the function to load the favourited items when the page loads
renderFavourites();

