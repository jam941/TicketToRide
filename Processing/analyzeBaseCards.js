import fs from 'fs'
import csv from 'csv-parser'

const mapDir = '../Data/cards.csv'

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

  async function getCardData(){
  let cards  = await getData(mapDir);
  //console.log(cards)
  let pointDist = {}
  cards.forEach(card=>{
    if(card.Points in pointDist){
        pointDist[card.Points]+=1
    }
    else{
        pointDist[card.Points]=1
    }
  })
  console.log(pointDist)

  let cityDist = {}
  cards.forEach(card=>{
    let cityA = card['City 1']
    let cityB = card['City 2']
    if(cityA in cityDist){
        cityDist[cityA]+=1
    }
    else{
        cityDist[cityA] = 1
    }

    if(cityB in cityDist){
        cityDist[cityB]+=1
    }
    else{
        cityDist[cityB]=1
    }
  })
  return {
    cities:cityDist,
    points:pointDist
  }
}
export default getCardData