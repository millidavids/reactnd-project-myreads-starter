import React from 'react'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import camelCase from 'camel-case'
import Bookshelf from './Bookshelf'
import './App.css'

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
                      bookList={this.state.allBooks.filter((books) => {
                        return books.shelf === camelCase(category)
                      })}
                    />
                  )
                })}
              </div>
            </div>
          </div>
        )}/>
        <Route exact path='/search' render={() => (
          <h1>LOL</h1>
        )}/>
      </div>
    )
  }
}

export default App
