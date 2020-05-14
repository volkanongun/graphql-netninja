const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt } = graphql;

// dummy data
var books = [
    { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1' },
    { name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2' },
    { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3' },
];


var authors = [
    { name: 'Patrick Rothfuss', age: 44, id: '1' },
    { name: 'Brandon Sanderson', age: 42, id: '2' },
    { name: 'Terry Pratchett', age: 66, id: '3' }
];

const BookType = new GraphQLObjectType({
	name : "Book",
	fields : () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		genre: { type: GraphQLString },
		author: { 
			type: AuthorType, 
			resolve(parent,args){
				console.log(parent)

				return authors.find(function (author) { 
					return author.id === parent.authorId; 
				})
			}
		}
	})
})


const AuthorType = new GraphQLObjectType({
	name : "Author",
	fields : () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		age: { type: GraphQLInt }
	})
})

const RootQuery = new GraphQLObjectType({
	name: 'RootQuery',
	fields : {
		book:{
			type: BookType,
			args: {
				id: { 
					type: GraphQLID 
				}
			},
			resolve(parent,args){
				//code to get date from db/other source
				// return _.find(books, {id:args.id})
				// console.log(typeof args.id, "∆")
				return books.find(function (book) { 
					// console.log(o.id, args.id)
					return book.id === args.id; 
				})
			} 
		},
		author:{
			type: AuthorType,
			args:{
				id:{type:GraphQLID}
			},
			resolve(parent,args){
				return authors.find(function (author) { 
					// console.log(o.id, args.id)
					return author.id === args.id; 
				})
			}
		}
	}
})

module.exports = new GraphQLSchema({
	query: RootQuery
})