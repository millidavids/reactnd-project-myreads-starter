import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'
import * as BooksAPI from './BooksAPI'
import * as DelayCallback from './DelayCallback'

/**
* @description BookSearch component
* @param {object} props - Contains the shelvedBooks list and the handleUpdate function
*/
class BookSearch extends React.Component {
  static propTypes = {
    handleUpdate: PropTypes.func.isRequired
  }

  state = {
    query: '',
    bookList: []
  }

  /**
  * @description Updates the search field and triggers the DelayCallback for updating the book list
  * @param {string} value - The value to send to the search field and DelayCallback
  */
  updateQuery = (value) => {
    this.setState({
      query: value
    })
    DelayCallback.inputDelay(value, this.updateBookList)
  }

  /**
  * @description Updates the list of books to display on the search page
  * @param {string} value -  The value used to send to the BooksAPI to query
  */
  updateBookList = (value) => {
    if (value.length > 0) {
      BooksAPI.search(value).then((result) => {
        if ("items" in result) {
          this.setState({
            bookList: []
          })
        } else {
          this.setState({
            bookList: result.map((book) => {
              let existingBook = this.props.shelvedBooks.find((shelvedBook) => shelvedBook.id === book.id)
              if (typeof existingBook !== 'undefined') {
                return existingBook
              } else {
                return book
              }
            })
          })
        }
      })
    } else {
      this.setState({
        bookList: []
      })
    }
  }

  render = () => {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search"></Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.bookList.length !== 0 && (this.state.bookList.map((book, index) => {
              return <li key={index}><Book bookshelf={book.shelf} data={book} handleUpdate={this.props.handleUpdate}/></li>
            }))}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookSearch
