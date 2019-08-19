const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/', async (request, response) => {
  try{
    const notes = await Note.find({})
    return response.json(notes.map(note=>note.toJSON()))
  }
  catch(exception){
      next(exception)
  }
})

notesRouter.get('/:id', async (request, response, next) => {
  try{
      const note = await Note.findById(request.params.id);
      if(note){
        response.json(note.toJSON())
      }
      else{
        response.status(404).end()
      }
  }
  catch(exception){
      next(exception)
  }
})

notesRouter.post('/', async (request, response, next) => {
  const body = request.body

  if(body.content === undefined){
      return response.status(400).end()
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date()
  })

  try{
    const savedNote = await note.save();
    return response.json(savedNote.toJSON())
  }
  catch(exception){
      next(exception)
  }
})

notesRouter.delete('/:id', async (request, response, next) => {
    try{
        const note = await Note.findByIdAndRemove(request.params.id)
        return response.status(204).end()
    }
    catch(exception){
        next(error)
    }
})

notesRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const note = {
    content: body.content,
    important: body.important,
  }

  try{
    const updatedNote = await Note.findByIdAndUpdate(request.params.id, note, { new: true });
    return response.json(updatedNote.toJSON())
  }
  catch(exception){
      next(exception)
  }
})

module.exports = notesRouter