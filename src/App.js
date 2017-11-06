import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Bookshelf from './Bookshelf';
import SearchBook from './SearchBooks';
import ListBookshelves from './ListBookshelves';
import './App.css';

class BooksApp extends React.Component {
  state = {
    allBooks: [],
    books: {
      reading: [],
      read: [],
      wanted: []
    }    
  }

  componentDidMount() {
    // Is really necessary to have the array with all the books?
    BooksAPI.getAll().then((allBooks) => {
      this.setState({allBooks});
    });
  }

  render() {
    // console.log("All books => ");
    // console.log(this.state.allBooks);
    // console.log("Reading => ");
    // console.log(this.state.books.reading);

    return (
      <div className="app">
        
        <Route exact path="/" render={() => (
            <ListBookshelves />  
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
