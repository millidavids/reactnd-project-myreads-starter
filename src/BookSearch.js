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
    handleUpdate: PropTypes.func.isRequired,
    shelvedBooks: PropTypes.array.isRequired
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
  *
  * To note, I hate this function, but I had to implement safeguards because the
  * BooksAPI.search function does not standardize on a return object. Sometimes
  * it is an array, sometimes it is an object, and it will error out if you pass
  * it an empty string.
  */
  updateBookList = (value) => {
    if (value === '') {
      this.setState({
        bookList: []
      })
      return
    }
    BooksAPI.search(value).then((result) => {
      if (result.error === 'empty query') {
        this.setState({
          bookList: []
        })
        return
      }
      this.setState({
        bookList: result.map((searchedBook) => (
          this.props.shelvedBooks.find((book) => book.id === searchedBook.id) || searchedBook
        ))
      })
    })
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
              return (
                <li key={index}>
                  <Book
                    data={book}
                    handleChange={this.props.shelvedBooks.indexOf(book) === -1 ? this.props.handleAdd : this.props.handleUpdate}
                  />
                </li>)
            }))}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookSearch
