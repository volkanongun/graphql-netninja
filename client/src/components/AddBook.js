import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import {GET_AUTHORS_QUERY} from '../queries/queries'

const AddBook = () => {
	const { loading, error, data } = useQuery(GET_AUTHORS_QUERY);

	if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

	return (
		 <form id="add-book">
          <div className="field">
              <label>Book name:</label>
              <input type="text" />
          </div>
          <div className="field">
              <label>Genre:</label>
              <input type="text" />
          </div>
          <div className="field">
              <label>Author:</label>
              <select>
                  <option>Select author</option>
                  { data.authors.map(author => <option key={author.id}>{author.name}</option>) }
              </select>
          </div>
          <button>+</button>

      </form>
	)
}

export default AddBook