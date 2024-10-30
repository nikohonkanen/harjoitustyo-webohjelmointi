'use strict'

const searchUrl = 'https://api.spoonacular.com/recipes/complexSearch?'
const apiKey = '1f60995cba9a4cc2a3795b69b84e864c'

const searchbar = document.querySelector('#searchbar')
const searchBtn = document.querySelector('#searchButton')

const searchWarningP = document.querySelector('#noResultsWarning')
const searchWarningText = 'No search results found'

const searchResultsDiv = document.querySelector('#searchresults')

const createSearchResults = (json) => {

    searchResultsDiv.innerHTML = ''

    for (let i = 0; i < json.results.length; i++) {
        let id = json.results[i].id
        let title = json.results[i].title
        let image = json.results[i].image

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
        resultDiv.appendChild(recipeLink)

        // Lisätään hakutulos sivulle
        searchResultsDiv.appendChild(resultDiv)
    }

}

const handleSearchEvent = () => {
    let query = 'apiKey=' + apiKey + '&query=' + searchbar.value + '&instructionsRequired=true&number=6'
    
    axios.get(searchUrl+query).then(response => {
        const json = response.data
        if (json.results.length > 0) {
            searchWarningP.innerHTML = ''
            // Jos löytyi reseptejä, tallennetaan ne ensin localStorageen jotta voidaan näyttää viimeisin haku myöhemmin.
            localStorage.setItem('lastSearch', JSON.stringify(json))

            createSearchResults(json)

        } else {
            // Näytetään ilmoitus että hakutuloksia ei löytynyt
            searchWarningP.innerHTML = searchWarningText
        }
    }).catch(error => {
        alert(error)
    })
}

searchBtn.addEventListener('click', () => {
    handleSearchEvent()
})

searchbar.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault()
        handleSearchEvent()
    }
})



document.addEventListener('DOMContentLoaded', () => {
    // Tarkistetaan onko tallessa aikaisemmin tehty haku.
    if (localStorage.getItem('lastSearch') !== null) {
        createSearchResults(JSON.parse(localStorage.getItem('lastSearch')))
    }
})