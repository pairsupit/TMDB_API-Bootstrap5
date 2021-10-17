require('dotenv').config()

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const port = 3000;

app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/createRequestToken', (req, res) => {
    axios.get(`https://api.themoviedb.org/3/authentication/token/new?api_key=${process.env.API_TMDB_KEY}`)
    .then((response) =>
      response
    )
    .then((json)=>{
      // console.log(json.data)
      res.json(json.data)
    })
    .catch((error)=>
      console.log(error.response)
    )
})

app.post('/login', (req, res) => {
  axios.post(`https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${process.env.API_TMDB_KEY}`
    ,{ 
      username: req.body.username , 
      password: req.body.password ,
      request_token: req.body.request_token
    })
  .then((response) => {
      res.json(response.data)
  })
  .catch((error)=>
    console.log(error)
  )
})

app.post('/createSession', (req,res) => {
    axios.post(`https://api.themoviedb.org/3/authentication/session/new?api_key=${process.env.API_TMDB_KEY}`
    ,{ 
      request_token: req.body.request_token
    })
    .then((response) =>
      response
    )
    .then((json)=>{
      res.json(json.data)
    })
    .catch((error) =>
      console.log(error.response)
    )
})

app.post('/createList', (req,res) => {
  axios.post(`https://api.themoviedb.org/3/list?api_key=${process.env.API_TMDB_KEY}&session_id=${req.body.session_id}`
  ,{ 
    name: req.body.name,
    description: req.body.description ,
    language: req.body.language
  })
  .then((response) => {
    console.log(response.data)
    res.json(response.data)
  })
  .catch((error) =>
    console.log(error.response)
  )
})

app.post('/getCreatedList', (req,res) => {
  axios.get(`https://api.themoviedb.org/3/account/{account_id}/lists?api_key=${process.env.API_TMDB_KEY}&session_id=${req.body.session_id}`)
  .then((response) => {
    // console.log(response.data);
    res.json(response.data)
  })
  .catch((error) =>
    console.log(error)
  )
})

app.post('/deleteList', (req,res) => {
  axios.delete(`https://api.themoviedb.org/3/list/${req.body.list_id}?api_key=${process.env.API_TMDB_KEY}&session_id=${req.body.session_id}`)
  .then((response) => {
    // console.log(response.data);
    res.json(response.data)
  })
  .catch((error) =>
    console.log(error)
  )
})

app.post('/addItemToList', (req,res) => {
  axios.post(`https://api.themoviedb.org/3/list/${req.body.list_id}/add_item?api_key=${process.env.API_TMDB_KEY}&session_id=${req.body.session_id}`,
  { 
    media_id: req.body.id
  })
  .then((response) => {
    console.log(response.data);
    res.json(response.data)
  })
  .catch((error) =>
    console.log(error.response)
  )
})

app.post('/removeItemFromList', (req,res) => {
  axios.post(`https://api.themoviedb.org/3/list/${req.body.list_id}/remove_item?api_key=${process.env.API_TMDB_KEY}&session_id=${req.body.session_id}`,
  { 
    media_id: req.body.media_id
  })
  .then((response) => {
    console.log(response.data);
    res.json(response.data)
  })
  .catch((error) =>
    console.log(error.response)
  )
})

app.post('/getItemList', (req,res) => {
  axios.get(`https://api.themoviedb.org/3/list/${req.body.list_id}?api_key=${process.env.API_TMDB_KEY}`)
  .then((response) => {
    // console.log(response.data);
    res.json(response.data)
  })
  .catch((error) =>
    console.log(error.response)
  )
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})