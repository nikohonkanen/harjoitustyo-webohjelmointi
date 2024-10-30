'use strict'

const recipeUrl = 'https://api.spoonacular.com/recipes/'
const recipleUrl2 = '/information?includeNutrition=false&addWinePairing=false&addTasteData=false&apiKey='
const apiKey = ''

const recipeID = document.location.search.slice(4)
//const recipe = JSON.parse(localStorage.getItem('recipe'))

const rTitle = document.querySelector('#recipecontainer h1')
const rImage = document.querySelector('#recipecontainer img')
const rInfo = document.querySelector('#infolist')
const rIngs = document.querySelector('#ingredientlist')
const rInstructions = document.querySelector('#recipecontainer ol')
const favButton = document.querySelector('#favButton')
let recipeInfo = []

favButton.addEventListener('click', () => {
    const favObject = {id: recipeID, title: recipeInfo[0], image: recipeInfo[1]}

    // Katsotaan onko aikaisempia favoriteja
    if (localStorage.getItem('favorites')) {
        const favorites = JSON.parse(localStorage.getItem('favorites'))
        // Tarkistetaan että resepti ei ole jo listassa
        for (let i = 0; i < favorites.length; i++) {
            if (favorites[i].id === recipeID) {
                return
            }
        }
        // Lisätään listaan ja tallennetaan
        favorites.push(favObject)
        localStorage.setItem('favorites', JSON.stringify(favorites))
    } else {
        // Jos ei ole aikaisempia favoriteja, niin luodaan uusi lista
        localStorage.setItem('favorites', JSON.stringify([favObject]))
    }
})

const buildRecipe = (recipe) => {
    rTitle.innerHTML = recipe.title
    rImage.src = recipe.image

    recipeInfo[0] = recipe.title
    recipeInfo[1] = recipe.image

    const servings = document.createElement('li')
    const prepTime = document.createElement('li')
    servings.innerHTML = 'Servings: ' + recipe.servings
    prepTime.innerHTML = 'Preparation time: ' + recipe.readyInMinutes + ' min'
    rInfo.appendChild(servings)
    rInfo.appendChild(prepTime)

    for (let i = 0; i < recipe.extendedIngredients.length; i++) {
        let ingItem = document.createElement('li')
        ingItem.innerHTML = recipe.extendedIngredients[i].original
        rIngs.appendChild(ingItem)
    }

    for (let i = 0; i < recipe.analyzedInstructions[0].steps.length; i++) {
        const instrItem = document.createElement('li')
        instrItem.innerHTML = recipe.analyzedInstructions[0].steps[i].step
        rInstructions.appendChild(instrItem)
    }
}

const getRecipe = (recipeId) => {
    let query = recipeUrl + recipeId + recipleUrl2 + apiKey

    axios.get(query).then(response => {
        const recipe = response.data
        buildRecipe(recipe)
    }).catch(error => {
        alert(error)
    })
}

document.addEventListener('DOMContentLoaded', () => {
    if (recipeID.length > 0) {
        getRecipe(recipeID)
    }
})