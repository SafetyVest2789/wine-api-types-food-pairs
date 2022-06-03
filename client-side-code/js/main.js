document.querySelector('button').addEventListener('click', apiRequest)

async function apiRequest(){
    const winesName = document.querySelector('input').value
    try{
        const response = await fetch(`${winesName}`)
        const data = await response.json()

        console.log(data)
        document.querySelector('h2').innerText = data.winesName
    }catch(error){
        console.log(error)
    }
}