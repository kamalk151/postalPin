const express = require('express')
const Router  = express.Router()

Router.get('/pincode/:pincode', async (req, res) => {
  if (!req.params.pincode) {
    return res.status(400).json({ status: `Error`, message: `Invalid request` })
  }
  const url = `https://api.postalpincode.in/pincode/${req.params.pincode}`
  const pinObj = await fetch(url)
  const pinData = await pinObj.json()
  
  if (pinData[0].Status === 'Success') {
    res.status(200).json(pinData[0])
  } else {
    res.status(500).json(pinData[0])
  }
})

Router.get('/postOffice/:postoffice', async (req, res) => {
  if (!req.params.postoffice) {
    return res.status(400).json({ status: `Error`, message: `Invalid request` })
  }
  const url = `https://api.postalpincode.in/postoffice/${req.params.postoffice}`
  const pinObj = await fetch(url)
  const pinData = await pinObj.json()
  
  if (pinData[0].Status === 'Success') {
    res.status(200).json(pinData[0])
  } else {
    res.status(500).json(pinData[0])
  }
})

Router.get('/latLang/:pincode', async (req, res) => {
  if (!req.params.pincode) {
    return res.status(400).json({ Status: `Error`, Message: `Invalid request` })
  }
  const url = `https://app.zipcodebase.com/api/v1/search?apikey=c9350910-c618-11ed-945f-9ff3172488cc&country=IN&codes=${req.params.pincode}`
  const pinObj = await fetch(url)
  const pinData = await pinObj.json()
    
  if (pinData.query.codes.length) {
    return res.status(200).json(pinData.results)
  } else {
    return res.status(500).json({ Status: `Error`, Message: `Something went wrong on the server!!` })
  }
  
})

module.exports = Router