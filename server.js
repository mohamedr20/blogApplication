const express = require('express');
const mongoose = require('mongoose');
const Note = require('./model/note');
const mongo = require('./mongo');
const bodyParser = require('body-parser');

const app = express();
mongo.connectToMongo();

const errorHandler = (error,request,response,next)=>{
    console.error(error.message);
    if(error.name === 'CastError' && error.kind === "ObjectId"){
        return response.status(400).send({error:'malformed id'})
    }

    next(error)
}

const unknownEndpoint = (req,res)=>{
    res.status(400).send({error:'Unknown endpoint'})
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/notes',(req,res)=>{
    Note.find({}).then(notes=>{
        res.json(notes.map(note=>note.toJSON()))
    })
    .catch(error => {
        console.log(error);
        response.status(404).end()
    })
})

app.post('/api/notes',(req,res)=>{
    const body = req.body
    if (body.content === undefined) {
      return res.status(400).json({ error: 'content missing' })
    }
  
    const note = new Note({
      content: body.content,
      important: body.important || false,
      date: new Date(),
    })
  
    note.save().then(savedNote => {
      res.json(savedNote.toJSON())
    })
})

app.get('/api/note/:id',(req,res)=>{
    const id = req.params.id;
    Note.findById(id)
    .then(note => {
        if (note) {
          res.json(note.toJSON())
        } else {
          res.status(404).end() 
        }
      })
      .catch(error => {
        console.log(error)
        res.status(400).send({ error: 'malformatted id' })
      })
})

app.delete('/api/note/:id',(req,res)=>{
    const {id} = req.params;
    Note.findOneAndDelete(id)
    .then(result=>{
        res.status(204).end()
    })
    .catch(error=>next(error))
})

app.put('/api/note/:id',(req,res)=>{
    const {id}  = req.params;
    const body = req.body;
    const note = {
        content:body.content,
        important:body.important
    }

    Note.findOneAndUpdate(id,note,{new:true})
    .then(updatedNote=>{
        response.json(updatedNote.toJSON())
    })
    .catch(err=>next(err))
})

app.use(errorHandler);
app.use(unknownEndpoint);

app.listen(process.env.PORT,()=>console.log(`server listening at port: ${process.env.PORT}`))