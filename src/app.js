const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { send } = require('process')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const publicDirectoryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../views")
const partialPath = path.join(__dirname, "../partials")

app.use(express.static(publicDirectoryPath))
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialPath)

app.get("/", (req, res) => {
    res.render('index', {
        title: "INDEX Z HBS",
        headerText: "POBRANIE POGODY DOMYSLNE"
    })
})

app.get('/weather', (req, res) => {

    const address = req.query.address

    if(!address) {
        return res.send({
            error: "You must provide 'address' in your query!"
        })
    };

    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if(error) {
            return res.send({
                error
            })
        }
        // console.log( "From geocode: latitude, longitude, location", latitude, longitude, location)
        forecast(latitude, longitude, (error, forecastData) => {

                 if(error) {
                    return res.send({
                        error
                    })
                }

                res.send({
                    forecast: forecastData,
                    location,
                    address
                })
        })
    })
})

app.get('/products', (req, res) => {

    if(!req.query.czosz) {
        return res.send({
            error: "no parameters in query! you have to pass at least one"
        })
    }

    console.log( req.query)
    res.send({
        ...req.query
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'TYTIL HANDLEBARS HELP',
        headerText: "HEADER texy FROM partial"
    })
})

app.get("/about", (req, res) => {
    res.render('about', {
        title: "ABOUT Z HBS",
        headerText: "HEADER texy FROM parti"
    })
})

app.listen(3000, ()=> {
    console.log( "Server is up on port 3000.")
})