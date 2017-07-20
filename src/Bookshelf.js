import React from 'react'
import Book from './Book'

/**
* @description Bookshelf component.
* @param {object} props - Contains the bookshelf name, handleUpdate function, and the book list
*/
const Bookshelf = (props) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.name}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {props.bookList.map((book, index) => {
            return <li key={index}><Book data={book} handleChange={props.handleUpdate}/></li>
          })}
        </ol>
      </div>
    </div>
  )
}

export default Bookshelf
