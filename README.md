# harjoitustyo-webohjelmointi
Tämä sovellus/sivusto hakee reseptejä spoonacular.com API:a käyttäen.
Sivuston käyttäjä voi hakea reseptejä ruokien ainesosien tai nimien avulla. Koska APIn tuloksen ovat englanniksi, myös sivusto toteutettiin englanniksin.
Käyttäjälle näytetään reseptin nimi, kuva, aineosat sekä valmistusohjeet.
Käyttäjä voi halutessaan lisätä reseptejä suosikeiksi.

API avain pitää lisätä /js/ kansiossa oleviin tiedostoihin functions.js ja recipe.js. Molempien tiedostojen alussa on muuttuja 'apiKey' jonka arvoksi API avaimen avain annetaan.

HUOM: Sivu ei toimi Firefoxilla offlinessa, esim avaamalla sivut C-asemalta, vaan vaatii että sivut ladataan palvelimelta. Tämä johtuu Firefoxin turvamäärityksestä joka estää localstoragen toimimisen
eri sivujen välillä offlinessä. Chromella sivusto toimii myös offlinessa.
