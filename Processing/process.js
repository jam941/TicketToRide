import fs from 'fs'
import csv from 'csv-parser'

const mapDir = '../Data/map.csv'
import getPaths from './pathfinder.js'
import getCardData from './analyzeBaseCards.js'
function getData(path,verify){
    
    return new Promise((resolve)=>{
    
      const results = [];
      let file = fs.createReadStream(path).pipe(csv())
      file.on('data', (data) => {
            
        
        results.push(data)
        
            
        })
      
      return file.on('end', () => {
        resolve(results)
      }); 
      
    })
  }

function generateSimpleEdgeMap(map){
  let returnMap = {}
  Object.keys(map).forEach(cityName=>{
    let temp = []
    let city = map[cityName]
    city.forEach(con=>{
      let conObj = {}
      conObj[con.city] = con.distance
      temp.push(conObj)
    })
    returnMap[cityName] = temp
  })
  return returnMap
}
async function generateGameData(){
  let connections  = await getData(mapDir);
  let map = {}

  connections.forEach(element => {

    let city1 = element['City 1']
    let city2  = element['City 2']
    let distance = element['Distance']
    let c1 = element['Color 1']
    let c2 = element['Color 2']
    let tunnel = element.Tunnel
    let locomotives = element['Required Locomotives']


    if(city1 in map && city2 in map){
      let connection1 = {
        city:city1,
        color1:c1,
        tunnel:tunnel,
        locomotives:locomotives,
        distance:distance
      }
      let connection2 = {
        city:city2,
        color1:c1,
        tunnel:tunnel,
        locomotives:locomotives,
        distance:distance
      }
      if(c2 !== '0'){
        connection1['color2'] = c2;
        connection2['color2'] = c2   
       }
       map[city1].push(connection2)
       map[city2].push(connection1)
    }

    else if( city1 in map){
      let entry = {
        
            city:city1,
            color1:c1,
            tunnel:tunnel,
            locomotives:locomotives,
            distance:distance
        
      }
      if(c2 !== '0'){
        entry['color2'] = c2   
       }
       map[city2] = [entry]
      entry = {
        
        city:city2,
        color1:c1,
        tunnel:tunnel,
        locomotives:locomotives,
        distance:distance
    
      }
      if(c2 !== '0'){
        entry['color2'] = c2   
      }
      map[city1].push(entry)
    }

    else if (city2 in map){
      let entry = {
            city:city2,
            color1:c1,
            tunnel:tunnel,
            locomotives:locomotives,
            distance:distance
      }
      if(c2 !== '0'){
        entry['color2'] = c2   
      }
      map[city1] = [entry]
      entry = {
        city:city1,
        color1:c1,
        tunnel:tunnel,
        locomotives:locomotives,
        distance:distance
      }
      if(c2 !== '0'){
        entry['color2'] = c2   
      }
      map[city2].push(entry)
      
    }

    else{
        let entry1 = {
                city:city2,
                color1:c1,
                tunnel:tunnel,
                locomotives:locomotives,
                distance:distance
            
        }
        let entry2 = {
                city:city2,
                color1:c1,
                tunnel:tunnel,
                locomotives:locomotives,
                distance:distance
            
        }
        if(c2 !== '0'){
         entry1['color2'] = c2;
         entry2['color2'] = c2   
        }
        map[city1] = [entry1]
        map[city2] = [entry2]

        
    }
    //console.log(generateSimpleEdgeMap(map))
  });
  let edgeMap = generateSimpleEdgeMap(map)
  let distanceMap = {}
  Object.keys(map).forEach(temp=>{
    distanceMap[temp]=getPaths(temp,edgeMap)
  })
  console.log(distanceMap['Stockholm'])
  let cardData = await getCardData()
  return {
    map:map,
    distanceMap:distanceMap,
    cardData:cardData
  }
}
export default generateGameData