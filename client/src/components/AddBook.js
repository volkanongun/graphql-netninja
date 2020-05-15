import React, {useState} from 'react'
import { useQuery,useMutation } from '@apollo/react-hooks';
import {GET_AUTHORS_QUERY,ADD_BOOK_MUTATION,GET_BOOKS_QUERY} from '../queries/queries'

const AddBook = () => {
	const { loading, error, data } = useQuery(GET_AUTHORS_QUERY);
	
	const [addBook, { dataB }] = useMutation(ADD_BOOK_MUTATION);

	const [name, setName] = useState("")
  const [genre, setGenre] = useState("")
  const [authorId, setAuthorid] = useState(null)

  const submitHandler = (e) => {

  	e.preventDefault()

  	addBook({
  		variables : { name, genre, authorId },
  		refetchQueries : [{
  			query : GET_BOOKS_QUERY
  		}]
  	})
  }

	if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

	return (
		 <form id="add-book" onSubmit={submitHandler}>
          <div className="field">
              <label>Book name:</label>
              <input type="text" onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="field">
              <label>Genre:</label>
              <input type="text" onChange={(e) => setGenre(e.target.value)} />
          </div>
          <div className="field">
              <label>Author:</label>
              <select onChange={(e) => setAuthorid(e.target.value)}>
                  <option>Select author</option>
                  { data.authors.map(author => <option value={author.id} key={author.id}>{author.name}</option>) }
              </select>
          </div>
          <button>+</button>

      </form>
	)
}

export default AddBook