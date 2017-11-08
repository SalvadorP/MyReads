import React from 'react';
import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import SearchBook from './SearchBooks';
import ListBookshelves from './ListBookshelves';
import './App.css';

class BooksApp extends React.Component {
  state = {
    allBooks: [],
    shelves: [
        {
            id: "currentlyReading",
            books: [],
            title: 'Currently Reading'
        },
        {
            id: "wantToRead",
            books: [],
            title: 'Want to Read'
        },    
        {
            id: "read",
            books: [],
            title: 'Read'
        }                    
    ]     
  }

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

  /**
   * Removes the book from the shelve where it was and puts it on the new one, updating the state.
   * @param {*} statusObj 
   */
  onChangeStatus(statusObj) {
    if (statusObj.oldShelve !== statusObj.newShelve) {
      const shelves = this.state.shelves.map((shelve, index) => {
        if (shelve.id === statusObj.newShelve) {
          shelve.books.push(statusObj.book);
        }
        if (shelve.id === statusObj.oldShelve) {
          shelve.books = shelve.books.filter((b) => b.id !== statusObj.book.id);
        }
        return shelve;
      });
      this.setState({shelves});
      localStorage.setItem('myreads', JSON.stringify(this.state)); 
    }
  }

  render() {
    const pageTitle="My Reads";
    return (
      <div className="app">

        <Route exact path="/" render={() => (
            <ListBookshelves pageTitle={pageTitle} shelves={this.state.shelves} onChangeStatus={(statusObj) => {this.onChangeStatus(statusObj)}} />  
        )} />  
            
        <Route path="/search" render={({history}) => (
            <SearchBook onChangeStatus={(statusObj) => {this.onChangeStatus(statusObj)}} />
        )}/>
        <div className="open-search">
            <Link to="/search">Add a book</Link>
        </div>
       
      </div>
    )
  }
}

export default BooksApp
