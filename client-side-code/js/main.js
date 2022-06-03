document.querySelector('button').addEventListener('click', apiRequest)

async function apiRequest(){
    const winesName = document.querySelector('input').value
    try{
        const response = await fetch(`https://wine-api-for-non-experts.herokuapp.com/api/${winesName}`)
        const data = await response.json()

        console.log(data)
        document.querySelector('h2').innerText = data.typeWine
    }catch(error){
        console.log(error)
    }
}