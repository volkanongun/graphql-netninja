import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import {GET_BOOK_QUERY} from '../queries/queries'

const BookDetails = (props) => {
	// console.log(props)

	const { loading, error, data } = useQuery(GET_BOOK_QUERY, {
    variables: {
    	id: props.bookId
    },
  });

	if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  console.log(data, " ∆∆∆")

  const displayDetails = () => {
  	if(!data.book)
  		return null

  	return <div>
  		<p>Book Name: {data.book.name}</p>
  		<p>Book Genre : {data.book.genre}</p>
  		<p>ID : {data.book.id}</p>
  		<p>Name: {data.book.author.name}</p>
  		<p>Age: {data.book.author.age}</p>
  		<ul>
  			{data.book.author.books.map(book => <li key={book.id}>Book : {book.name}</li>)}
  		</ul>
  	</div>
  }

	return (
		<div id="book-details">
			{displayDetails()}
		</div>
	)
}

export default BookDetails