import React, {Component} from 'react';
import Bookshelf from './Bookshelf';
import * as BooksAPI from './BooksAPI';

class ListBookshelves extends Component {

    state = {
        allBooks: [],
        books: {
            reading: [],
            read: [],
            wanted: []
          }       
      }

    componentDidMount() {
        BooksAPI.getAll().then((allBooks) => {
          this.setState({allBooks});
          this.setState((previousState) => {
            previousState.books.wanted = allBooks;
            return previousState;
          });
          const newState = {...this.state.books};
          newState.read = allBooks;
          this.setState(newState);
        });
        
      }

    render() {
        // console.log(this.state.allBooks);
        return (
            <div className="list-books">
                <div className="list-books-title">
                <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <Bookshelf books={this.state.books.reading} title={"Currently Reading"} />
                        <Bookshelf books={this.state.books.wanted} title={"Want to Read"} />
                        <Bookshelf books={this.state.books.read} title={"Read"} />
                    </div>
                </div>
                <div className="open-search">
                <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
                </div>
            </div>
        )
    }
}

export default ListBookshelves