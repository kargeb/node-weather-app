const form = document.querySelector('form')
const input = document.querySelector('input')
const paragraphs = document.querySelectorAll('p')

console.log( "From js file")


// fetch("http://localhost:3000/weather?address=!").then(response => response.json().then(data => console.log(data)))

form.addEventListener('submit', (e) => {
    e.preventDefault();

    paragraphs[0].textContent = "Loading ..."
    paragraphs[1].textContent = ""

    const location = input.value
    console.log( "location", location)
    fetch("http://localhost:3000/weather?address="+ location)
    .then(response => response.json()
    .then(data => {
        if(data.error) {
            paragraphs[0].textContent = data.error
        } else {
            paragraphs[0].textContent = data.location
            paragraphs[1].textContent = data.forecast
            // data. location
            // data.forecast,
        }
    }))
})