import React from 'react'

/**
* @description Book component
* @param {object} props - Contains the book data, handleUpdate function, and the current bookshelf
*/
const Book = (props) => {
  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${props.data.imageLinks.smallThumbnail})` }}></div>
        <div className="book-shelf-changer">
          <select value={props.data.shelf} onChange={(e) => props.handleChange(props.data, e.target.value)}>
            <option value="moveTo" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{props.data.title}</div>
      <div className="book-authors">{props.data.authors}</div>
    </div>
  )
}

export default Book
