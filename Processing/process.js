import fs from 'fs'
import csv from 'csv-parser'

const mapDir = '../Data/map.csv'
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

    if( city1 in map){
        
    }
    else if (city2 in map){

    }
    else{
        
        let entry1 = {
            connections:{
                city:city2,
                color1:color1,
                tunnel:tunnel,
                locomotives:locomotives,
            }
        }
        let entry2 = {
            connections:{
                city:city2,
                color1:color1,
                tunnel:tunnel,
                locomotives:locomotives,
            }
        }
        if(color2 !== '0'){
         entry1.connections['color2'] = color2;
         entry2.connections['color2'] = color2   
        }
        map[city1] = entry1
        map[city2] = entry2

        
    }
  });