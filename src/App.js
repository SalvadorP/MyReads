import React from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
// import Bookshelf from './Bookshelf';
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
    BooksAPI.getAll().then((allBooks) => {
      this.setState({allBooks});
      this.setState((previousState) => {
        previousState.shelves[1].books = allBooks;
        return previousState;
      });
    });   
    console.log(this.state.shelves);     
  }

  onChangeStatus(statusObj) {
    // FIXME: Improve this code.
    // Remove the book from the shelve where it was and put it on the new one and update the state.
    const oldShelves = this.state.shelves;   
    
    // Filter and get the new shelve array
    const newShelve = this.state.shelves.filter((nshelve) => nshelve.id === statusObj.newShelve);
    
    // Filter and get the old shelve array
    const oldShelve = this.state.shelves.filter((oshelve) => oshelve.id === statusObj.oldShelve);

    // Remove the book from the oldShelve
    const book = this.state.allBooks.filter((book) => book.id === statusObj.bookId);
    oldShelve[0].books = oldShelve[0].books.filter((book) => book.id !== statusObj.bookId);

    // Add the book to the new shelve array
    newShelve[0].books.push(book[0]);

    const shelves = oldShelves.map((shelve, index) => {
      if (shelve.id === statusObj.newShelve) {
        oldShelves[index].books = newShelve[0].books;
      }
      if (shelve.id === statusObj.oldShelve) {
        oldShelves[index].books = oldShelve[0].books;
      }
      return shelve;
    });

    // IDEA: What about making a copy of the shelves and act directly over it?
    // const shelves = this.state.shelves.map((shelve) => {
    //   if ( shelve.id === statusObj.newShelve ) {
        
    //   }
    // });

    this.setState({shelves});
}

  render() {
    return (
      <div className="app">
        
        <Route exact path="/" render={() => (
            <ListBookshelves shelves={this.state.shelves} onChangeStatus={(statusObj) => {this.onChangeStatus(statusObj)}} />  
        )} />  
            
        <Route path="/search" render={({history}) => (
            <SearchBook />
        )}/>
        <div className="open-search">
            <Link to="/search" onClick={() => this.setState({ showSearchPage: true })}>Add a book</Link>
        </div>
       
      </div>
    )
  }
}

export default BooksApp
