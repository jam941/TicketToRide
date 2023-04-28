import generateGameData from "./process.js";



function getKeysByValue(object, value,depth) {
    
    const keys = [];
    for (const key in object) {
      if (object[key] === value) {
        keys.push(key);
      }
    }
    if(keys.length == 0){
        if(value==0){
            return false
        }
        return getKeysByValue(object,value-1,depth+1)
        
    }
    return keys;
}

async function generateSimpleCards(){
    
    let data = await generateGameData()
    let map = data.map
    let distanceMap = data.distanceMap
    let citySpread = data.cardData.cities
    let pointSpread = data.cardData.points
    let cities = Object.keys(map)
    //console.log(cities)
    let deck = []
    //console.log(citySpread)
    //console.log(pointSpread)
    while(true){
        let keys = Object.keys(citySpread);
        let randomCity = keys[Math.floor(Math.random() * keys.length)]
    
        keys = Object.keys(pointSpread);
        let randomPoint = keys[Math.floor(Math.random() * keys.length)]
        
        //console.log(randomCity)
        //console.log(randomPoint)
        let options  = getKeysByValue(distanceMap[randomCity],randomPoint,0)
        //console.log(Object.keys(citySpread))
        if(options){
            let goodCity = ''
            options.forEach(option=>{
                
                if(Object.keys(citySpread).includes(option)){
                    goodCity = option
                }
                
            })
            //console.log(citySpread)
            //console.log(goodCity)
            let card = {
                city1:randomCity,
                city2:goodCity,
                points:randomPoint
            }
            deck.push(card)
            //console.log(card)
            pointSpread[randomPoint] -= 1
            if(pointSpread[randomPoint] == 0){
                delete pointSpread[randomPoint]
            }
            citySpread[randomCity] -= 1
            if(citySpread[randomCity] == 0){
                delete citySpread[randomCity]
            }
            citySpread[goodCity] -= 1
            if(citySpread[goodCity] == 0){
                delete citySpread[goodCity]
            }
            
            if(Object.keys(citySpread).length==0){
                break;
            }
        }
        else{
            console.log(randomCity)
        }
    }
        
    console.log(deck)
    
    
}
generateSimpleCards()
