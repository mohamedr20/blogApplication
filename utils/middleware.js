const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
  }

const errorHandler = (error,request,response,next)=>{
	console.error(error.message)
	if(error.name === 'CastError' && error.kind === 'ObjectId'){
		return response.status(400).send({error:'malformed id'})
	}
	else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message })
	}
	next(error)
}

const unknownEndpoint = (req,res)=>{
	res.status(400).send({error:'Unknown endpoint'})
}

module.exports = {
    requestLogger:requestLogger,
    errorHandler:errorHandler,
    unknownEndpoint:unknownEndpoint
}