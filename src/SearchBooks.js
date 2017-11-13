import {debounce} from "lodash";
import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import Book from './Book';
// import { Debounce, Throttle } from 'react-throttle';
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
      // Bubble the change to the App function.
      this.props.onChangeBookStatus(statusObj);

      // Update the allBooks list.
      const allBooks = this.state.allBooks.filter((b) => b.id !== statusObj.book.id);
      this.setState({allBooks});
    }

    updateQuery = (query) => {
      // TODO: Think about debouncing this function.
      this.setState({ query: query });
      if (query) {
        this.doSearch();
      }
    }

    doSearch = debounce(() => {
      BooksAPI.search(this.state.query).then((allBooks) => {
        allBooks.error ? this.setState({allBooks: []}) : this.setState({allBooks});
      });
    }, 300);
   
    /**
     * Returns the shelve where is the book.
     * @param {*} book
     * @returns String
     */
    whichShelve(book) {
      const bookShelve = this.state.shelves.map((shelve, index) => {
        const found = shelve.books.filter((b) => b.id === book.id);
        return found.length > 0 ? shelve.id : false;
      }).find(Boolean);
      return bookShelve;
    }

    /**
     * Returns if a book is on a shelve.
     * @param {*} book
     * @returns Boolean
     */
    isOnShelve(book) {
      return this.whichShelve(book) === undefined ? false : true;
    }

    render() {
        const { query, allBooks } = this.state;

        let showingBooks = allBooks.filter((b) => true !== this.isOnShelve(b));
        // onChange={(event) => _.debounce(this.updateQuery(event.target.value), 500, false)}
        return (
            <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => (this.props.history.push("/"))}>Close</a>

              <div className="search-books-input-wrapper">
                  <input
                    type="text"
                    placeholder="Search by title or author"
                    name="search"
                    value={query}
                    onChange={(event) => (this.updateQuery(event.target.value))} 
                  />
              </div>
            </div>
            <div className="search-books-results">
            {showingBooks.length > 0 && (
              <ol className="books-grid">
              {showingBooks.map(book => (
                <li key={book.id}>
                  <Book book={book} shelve={this.whichShelve(book)} onChangeBookStatus={(statusObj) => {this.onChangeBookStatus(statusObj)}} />
                </li>
              ))}
              </ol>
            )}
            </div>
          </div>
        )
    }
}

export default withRouter(SearchBooks);
