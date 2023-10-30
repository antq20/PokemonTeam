// document.querySelector('genButton').addEventListener('click', getFetch)
const getFetch= async()=>{
    //Get loop 6 and only 6 times apppend a new child to html
    const randomType= randomNum(18)
    console.log(randomType)
    const data= await fetch(`https://pokeapi.co/api/v2/type/${randomType}`)
    let pokemonInfo = await data.json();
    console.log(pokemonInfo)

    // replace pokeDiv with empty div everytime button is hit
    let pokeDiv = document.getElementById("pokeImgs")
    if (pokeDiv.children){
        //make empty div to replace pokeDiv with
        let emptyDiv = document.createElement("div")
        emptyDiv.id = "pokeImgs"        
        pokeDiv.replaceWith(emptyDiv)
   }

    let pokemonNames = ""
    for (let i = 0;i<6; i++){
        let pokeDiv = document.getElementById("pokeImgs")
        let maxId = pokemonInfo.pokemon.length
        let randNum = randomNum(maxId)
         
        let fetchedPokemon = pokemonInfo.pokemon[randNum]
        
        // extract url
        let url = fetchedPokemon.pokemon.url;


        const sixData= await fetch(`${url}`)
        const sixDataInfo= await sixData.json()

        
        let src = findNotNullSprite(sixDataInfo)

        if (src == null){
            src = "https://i.ibb.co/MskMF1c/evil-francisco.jpg"
            pokemonNames += "Evil Francisco"
        }
        else{
            pokemonNames += sixDataInfo.name.split("-")[0]
        }
        if (i == 5){
            pokemonNames += "."
        }else {
            pokemonNames += ","
        }
        

        let img = document.createElement("img")
        img.alt="Couldn't catch them all"
        img.src=`${src}`
        img.id = "pokemon-image"
        pokeDiv.appendChild(img)

    }
    console.log(pokemonNames)
    //Summoned box
    let summonedBox = document.getElementById("summoned-pokemon-text")
    summonedBox.innerText = `You've summoned ${pokemonNames}`
    summonedBox.id = "summoned-pokemon-text"
    document.getElementById("background-container").appendChild(summonedBox)
}



function findNotNullSprite(pokemon){
    let sprites1 = pokemon.sprites
    let sprites2 = pokemon.sprites.other["dream_world"]
    let sprites3 = pokemon.sprites.other["home"]
    let sprites4 = pokemon.sprites.other["official-artwork"]
    let all_sprite_locations = [
        sprites1,
        sprites2,
        sprites3,
        sprites4
    ]
    for (const sprite_list of all_sprite_locations){
        if (sprite_list["front_default"] != null){
            return sprite_list["front_default"]
        }
    }
    
    return null
}

function randomNum(max){
    let nums=Math.floor(Math.random()*max) +1
    return nums
}
randomNum(18)



// let Name = pokemonInfo.name.toUpperCase();
// let Type = pokemonInfo.types[0].type.name.toUpperCase();
// let imgUrl = pokemonInfo.sprites.front_default;
// let shinyImgUrl = pokemonInfo.sprites.front_shiny;

//use getFetch to capture list of pokemon with same type
//capture value of random index pokemon's url
//plug into new fetch
//create variables for new.fetch.json
//use values for DOM elements
