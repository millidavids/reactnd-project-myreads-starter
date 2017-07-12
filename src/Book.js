import React from 'react'

const Book = (props) => {
  console.log(props.data.title, props.data)
  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${props.data.imageLinks.smallThumbnail})` }}></div>
        <div className="book-shelf-changer">
          <select onChange={(e) => props.handleChangeBookshelf(e.target.value, props.data.shelf)}>
            <option value="none" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{props.data.title}</div>
      <div className="book-authors">{props.data.authors.map((author, index) => {
        return <div key={index}>{author}</div>
      })}
      </div>
    </div>
  )
}

export default Book
