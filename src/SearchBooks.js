import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import * as BooksAPI from './BooksAPI';

class SearchBooks extends Component {

    state = {
        allBooks: []        
      }

    componentDidMount() {
        // Is really necessary to have the array with all the books?
        BooksAPI.getAll().then((allBooks) => {
          this.setState({allBooks});
        });
      }

    render() {
        console.log(this.state.allBooks);
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
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        )
    }
}

export default withRouter(SearchBooks);
