import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import escapeRegExp from 'escape-string-regexp';
import Book from './Book';
import sortBy from 'sort-by';
import * as BooksAPI from './BooksAPI';

class SearchBooks extends Component {

    componentDidMount() {
      const myreads = JSON.parse(localStorage.getItem('myreads') || '{}');
      if (myreads.shelves !== undefined && myreads.allBooks !== undefined) {
        this.setState({shelves: myreads.shelves, allBooks: myreads.allBooks});
      } else {
        BooksAPI.getAll().then((allBooks) => {
          this.setState({allBooks});                 
        });      
      }
    }

    state = {
      query: '',
      shelves: [],
      allBooks: []
    }

    onChangeBookStatus(statusObj) {
      this.props.onChangeStatus(statusObj);        
    }

    updateQuery = (query) => {
      this.setState({ query: query.trim() });
    }

    /**
     * Returns the shelve where is the book.
     * @param {*} book 
     */
    whichShelve(book) {
      const bookShelve = this.state.shelves.map((shelve, index) => {
        const found = shelve.books.filter((b) => b.id === book.id);
        let bs = false;
        if (found.length > 0) {
          bs = shelve.id;
        }
        return bs;
      }).find(Boolean);      
      return bookShelve;
    }

    render() {
        const { query, allBooks } = this.state;

        let showingBooks = allBooks;
        if (query) {
          const match = new RegExp(escapeRegExp(query), 'i');
          showingBooks = allBooks.filter((book) => match.test(book.title));
        }
        showingBooks.sort(sortBy('title'));

        return (
            <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => (this.props.history.push("/"))}>Close</a>

              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input 
                  type="text" 
                  placeholder="Search by title or author" 
                  name="search" 
                  value={query} 
                  onChange={(event) => this.updateQuery(event.target.value)}
                />

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
              {showingBooks.map(book => (
                <li key={book.id}>
                  <Book book={book} shelve={this.whichShelve(book)} onChangeBookStatus={(statusObj) => {this.onChangeBookStatus(statusObj)}} />
                </li>
              ))}
              </ol>
            </div>
          </div>
        )
    }
}

export default withRouter(SearchBooks);
