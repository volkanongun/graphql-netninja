const express = require('express');
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express();

// allow cross-origin requests
app.use(cors())

// db
mongoose.connect('mongodb+srv://volkan:Segovia7@graphql-cluster-as3u8.mongodb.net/test?retryWrites=true&w=majority',{
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true
		})

mongoose.connection.once('open', () => {
	console.log('connected to database')
})

app.use('/graphql',graphqlHTTP({
	schema:schema,
	graphiql: true
})) // es6

app.listen(4000, ()=>{
	console.log('server listening for requests on port 4000')
})