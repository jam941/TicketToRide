function getPaths(city,map){
    let paths = {}
    let unvisited = []
    Object.keys(map).forEach(cityName=>{
        paths[cityName] = 999
        unvisited.push(cityName)
    })
    paths[city]=0;
    let currentCity = city
    
    while(unvisited){
        let connections  = map[currentCity]
        connections.forEach(cityName=>{
            let dist = parseInt(Object.values(cityName)[0])
            let name = Object.keys(cityName)[0]
            
            if(paths[name]>paths[currentCity]+dist){
                
                paths[name] = paths[currentCity]+dist
            }

        })
        
        unvisited.splice(unvisited.indexOf(currentCity),1)
        
        if(unvisited.length>0){
            currentCity = Object.keys(paths).filter(c=>unvisited.includes(c)).reduce((a, b) => paths[a] < paths[b] ? a : b)
        }
        else{
            break;
        }
    }
    
    return paths;  
}
export default getPaths