import React from 'react'
import { Route, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import camelCase from 'camel-case'
import Bookshelf from './Bookshelf'
import BookSearch from './BookSearch'
import './App.css'

/**
* @description App component
* @param {object} props - Contains the bookshelf categories array
*/
class App extends React.Component {
  static propTypes = {
    categories: PropTypes.array.isRequired
  }

  state = {
    allBooks: []
  }

  componentDidMount = () => {
    BooksAPI.getAll().then((result) => {
      this.setState({
        allBooks: result
      })
    })
  }

  /**
  * @description Adds a book to the list of books of the component
  * @param {object} bookToAdd - Contains the book data of the book to add
  * @param {object} newShelf - Contains the bookshelf where the new book should be put
  */
  handleAdd = (bookToAdd, newShelf) => {
    BooksAPI.update(bookToAdd, newShelf).then((result) => {
      bookToAdd.shelf = newShelf
      this.setState((prevState) => ({
        allBooks: prevState.allBooks.concat([bookToAdd])
      }))
    })
  }

  /**
  * @description Updates a book on the list of books of the component
  * @param {object} bookToUpdate - Contains the book data of the book to update
  * @param {object} newShelf - Contains the bookshelf where the updated book should be put
  */
  handleUpdate = (bookToUpdate, newShelf) => {
    BooksAPI.update(bookToUpdate, newShelf).then((result) => {
      this.setState((prevState) => {
        prevState.allBooks[prevState.allBooks.indexOf(bookToUpdate)].shelf = newShelf
        return({
          allBooks: prevState.allBooks
        })
      })
    })
  }

  render = () => {
    return (
      <div className='app'>
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {this.props.categories.map((category, index) => {
                  return (
                    <Bookshelf
                      key={index}
                      name={category}
                      handleUpdate={this.handleUpdate}
                      bookList={this.state.allBooks.filter((books) => {
                        return books.shelf === camelCase(category)
                      })}
                    />
                  )
                })}
              </div>
            </div>
            <Link to="/search" className="open-search">Add a Book</Link>
          </div>
        )}/>
        <Route exact path='/search' render={() => (
          <BookSearch
            shelvedBooks={this.state.allBooks}
            handleUpdate={this.handleUpdate}
            handleAdd={this.handleAdd}
          />
        )}/>
      </div>
    )
  }
}

export default App
