'use strict'

const searchResultsDiv = document.querySelector('#searchresults')
let favorites = []

console.log(localStorage.getItem('favorites'))

if (localStorage.getItem('favorites')) {
    favorites = JSON.parse(localStorage.getItem('favorites'))
}

searchResultsDiv.addEventListener('click', (e) => {
    if (e.target.nodeName === 'BUTTON') {
        const removeMe = e.target.id
        for (let i = 0; i < favorites.length; i++) {
            if (favorites[i].id === removeMe) {
                favorites.splice(i, 1)
                localStorage.setItem('favorites', JSON.stringify(favorites))
                createFavs(favorites)
            }
        }
    }
})

const createFavs = (json) => {

    searchResultsDiv.innerHTML = ''

    if (!json || json.length === 0) {
        return
    }

    for (let i = 0; i < json.length; i++) {
        let id = json[i].id
        let title = json[i].title
        let image = json[i].image

        // Luodaan nappi jolla voi poistaa suosikin
        let deleteButton = document.createElement('button')
        deleteButton.setAttribute('id', id)
        deleteButton.innerHTML = 'Remove'

        // Luodaan reseptin nimi-elementti
        let resultTitle = document.createElement('p')
        resultTitle.innerHTML = title

        // Luodaan reseptin kuva-elementti
        let resultImage = document.createElement('img')
        resultImage.src = image

        // Luodaan linkki joka pitää sisällään reseptin kuvan ja nimen, että jompaa kumpaa klikkaamalla aukeaa resepti
        let recipeLink = document.createElement('a')
        recipeLink.href = './recipe.html?id=' + id
        recipeLink.appendChild(resultImage)
        recipeLink.appendChild(resultTitle)

        // Lisätään linkki diviin.
        let resultDiv = document.createElement('div')
        resultDiv.setAttribute('class', 'resultDiv')
        resultDiv.appendChild(deleteButton)
        resultDiv.appendChild(recipeLink)

        // Lisätään hakutulos sivulle
        searchResultsDiv.appendChild(resultDiv)
    }

}

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('favorites')) {
        createFavs(JSON.parse(localStorage.getItem('favorites')))
    }
})