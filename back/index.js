const express = require('express')
require('dotenv').config()
const bodyParser = require('body-parser')
const cors = require('cors')
const routes = require('./src/routes.js')
const app  = express()

app.use(bodyParser.json())
/*CORS is a browser security feature that restricts 
cross-origin HTTP requests with other servers and specifies which domains access your resources.*/
app.use(cors({
  origin: '*'
}))
app.use(routes)

app.get('/', (req, res)=> {
  console.log('hii')
  return res.send('hi')
})

// set port, listen for requests
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT} port`)
})