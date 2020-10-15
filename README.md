# BikeChecker
BikeChecker on HSL kaupunki pöyrädataa hyödyntävä soveluus, jonka avulla käyttäjä voi kätevästi tarkistaa onko hänen viereisellä asemalla vapaita pyöriä. 

Pyöräsovelluksen käyttö onnistuu rekisteröimällä käyttäjätunnuksen, sekä salasanan ja valitsemalla haluamansa pyöräaseman. Pyöräaseman vapaiden pyörien tilanteen näkee kätevästi vihreänä, jos on yli 3 pyörää, keltaisena, jos on 3-1 pyörää, ja punaisena jos ei ole yhtään vapaita pyöriä.

Sovellus muistaa seuraavilla vauskerroilla valitun pyöräaseman ja tallettaa sen myös käyttäjän tietoihin, joka mahdollistaa tilanteen nopean tarkistamisen.

# Käytetyt teknologiat

Tässä repositoriossa on käyttöliittymän ja kaupunkipyörä datan tarjoava palvelu, jonka autentikoinnista ja käyttäjähallinnasta huolehtii alla olevan repositorion palvelu.

BikeChecker sovellus rakentuu kolmesta eri osasta:
- Frontend: React.js
    - /front kansiossa
- BikeData Backend: Node.js
    - /back kansiossa
- Authentication Backend: Node.js
    - https://gitlab.com/jessear/kaupunkipyorasovellus-be


## Hosting

Tämän repositorion palvelu on hostattu herkokuun ilmaisena palveluna.

Osoite: https://hsl-citybike-chekcer.herokuapp.com

<br>

Autentikointi ja käyttäjähallinta palvelu on myös hostattu herkokuun.

Osoite: https://safe-retreat-57854.herokuapp.com

<br>

Herokun ilmainen hostauspalvelu asettaa siellä olevat palvelut nukkumatilaan jos niitä ei käytetä 30min sisällä, eli ensimmäinen avauskerta voi kestää pidempään.

## Installation / Usage

Käyttöliittymä ja kaupunkipyörädatan tarjoavan palvelun asentaminen vaatii Node.js, Npm, sekä tätä repositoriota.

Tämän repositorion /back kansiossa on palvelun käyttöön vaaditut osat. Kansioon pitää lisätä **.env** tiedosto, jossa on seuraava tieto:
```
VERIFY_URI='<autentikointi palvelun url>'
```
Lisäksi komentorivillä kansiossa pitää ajaa moduulien asennus komento:
```
npm install
```
Ja viimeisenä palvelun käynnistys:
```
npm start
```

Palvelu pyörii nyt http://localhost:3001 portissasi, näet sen avaamalla osoitteen internet selaimella.

## API

Palvelu tarjoaa yhden api reitin:

**<base url>/api/v1/bikeData**

Reitti vaatii autentikointipalvelulta saadun JsonWebToken tokenin, jonka se käy tarkistuttamassa autentikointipalvelussa.

```javascript
REQUEST:
GET http://localhost:3001/api/v1/bikeData
Authorization: token <json web token>

RESPONSE - MISSING TOKEN:
status: 401
body:
 {
     error: 'MISSING TOKEN'
 }

RESPONSE - INVALID TOKEN:
status: 401
body:
 {
     error: 'INVALID TOKEN'
 }

RESPONSE - OK:
status: 200
body:
 {
    lastFetchTime: number,
    stations: [
        {
            name: string,
            stationId: string,
            bikesAvailable: number,
            spacesAvailable: number,
            realtime: boolean,
            lat: number,
            lon: number,
            allowDropoff: boolean,
        }
    ]
 }

```

### API Testaus

Api testaamiseen löytyy **/back/request** kansioista VS Code - Rest API extension kutsuja


## Services Used

Palvelu hydyntää kaupunkipyörä dataa varten HSL avoimen datan GraphQl rajapintaa. Sitä hyödyntävä koodi löytyy **/back/services/hslCityBike.js** tiedostosta.

Osoite: https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql

Lisäksi hyödynnetään autentikointiin ja käyttäjähallintaan aiemmin mainitun repositorion palvelua. 

Autentikointi palvelua hyödyntävä koodi löytyy **/back/services/authorization.js** tiedostosta ja käyttäjähallinta palvelua hyödyntävä koodi löytyy **front/src/services/user.js** tiedostosta.