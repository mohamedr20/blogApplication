const express = require('express')
const mongo = require('./utils/mongo')
const bodyParser = require('body-parser')
const config = require('./utils/config');
const middleware = require('./utils/middleware')
const notesRouter = require('./controllers/notes')

const app = express()
mongo.connectToMongo()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(middleware.requestLogger)
app.use('/api/notes', notesRouter)
app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)


app.listen(config.PORT,()=>console.log(`server listening at port: ${config.PORT}`))
