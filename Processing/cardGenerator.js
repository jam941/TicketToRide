import generateGameData from "./process.js";



function getKeysByValue(object, value,depth) {
    
    const citiesModified = {};
    for (const key in object) {
        citiesModified[key] = Math.abs(object[key]-value)
    }
    //console.log(object)
    //console.log(citiesModified)
    return Object.keys(citiesModified).reduce((a, b) => citiesModified[a] < citiesModified[b] ? a : b);
}

async function generateSimpleCards(){
    
    let data = await generateGameData()
    let map = data.map
    let distanceMap = data.distanceMap
    let citySpread = data.cardData.cities
    let pointSpread = data.cardData.points
    let cities = Object.keys(map)
    
    let deck = []
    let count = 0
    while(true){
        //console.log(citySpread)
        let keys = Object.keys(citySpread);
        let randomCity = keys[Math.floor(Math.random() * keys.length)]
    
        keys = Object.keys(pointSpread);
        let randomPoint = keys[Math.floor(Math.random() * keys.length)]
        
        
        //console.log('Distance Map for : ' + randomCity + ' is ' +distanceMap[randomCity])
        let goodCity  = getKeysByValue(distanceMap[randomCity],randomPoint,0)
        //console.log(distanceMap)
        
    
        //console.log(randomPoint)
        let card = {
            city1:randomCity,
            city2:goodCity,
            points:randomPoint
        }
        deck.push(card)
        //console.log(card)
        //console.log(citySpread)
        //console.log("Before operations, values are: " + citySpread[randomCity], " and points: ",pointSpread[randomPoint])
        //pointSpread[randomPoint] =pointSpread[randomPoint] - 1
        //citySpread[randomCity] = citySpread[randomCity]-1
        //console.log("After operations, values are: " + citySpread[randomCity], " and points: ",pointSpread[randomPoint])
        //console.log(pointSpread)


        if(pointSpread[randomPoint] == 0){
            delete pointSpread[randomPoint]
        }
        //console.log("Fuck: " + citySpread[randomCity] + " "+randomCity)
        //console.log(citySpread[randomCity])
        if(citySpread[randomCity] == 0){
            delete citySpread[randomCity]
        }
        citySpread[goodCity] =citySpread[goodCity]- 1;
        if(citySpread[goodCity] == 0){
            delete citySpread[goodCity]
        }
        //console.log(count)
        count+=1;
        if(Object.values(citySpread).length ===0 || count===45){
            break;
        }
        
        
        
    }
    
    console.log(deck)
    
    
}
generateSimpleCards()
