'use strict'

require('./app/index')

const _ = require('lodash')

_.assign({ 'a': 1 }, { 'b': 2 }, { 'c': 3 });

const fs = require('fs');
let content;

try {
  content = fs.readFileSync('./index.js', 'utf-8')
} catch (ex) {
  console.log(ex)
}

console.log(content)

const numbers = [2, 4, 1, 5, 4]

function isBiggerThanTwo(num) {
  return num > 2
}

console.log(numbers.filter(isBiggerThanTwo))


console.log('start reading a file...')

fs.readFile('./index.js', 'utf-8', function(err, content) {
  if (err) {
    console.log('error happened during reading the file')
    return console.log(err)
  }

  //console.log(content)
})

console.log('end of the file')

const http = require('http')
const port = 3000

const requestHandler = (request, response) => {
  console.log(request.url)
  response.end('Hello Node.js Server!')
}

/*
const server = http.createServer(requestHandler)

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})*/

const express = require('express')
const app = express()

app.use((request, response, next) => {
  console.log(request.headers)
  next()
})

app.use((request, response, next) => {
  request.chance = Math.random()
  next()
})

app.get('/', (request, response) => {
  /*response.json({
    chance: request.chance
  })*/
  throw new Error('oops')
})

app.use((err, request, response, next) => {
  console.log(err)
  response.status(500).send('Something broken!')
})

app.listen(port, (err) => {
  if (err) {
    return console.log('somoething bad happened', err)
  }
  console.log(`server is listening on ${port}`)
})
