import React, {Component} from 'react';
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
        });
      }

    render() {
        console.log(this.state.allBooks);
        return (
            <div>List bookshelves!!</div>
        )
    }
}

export default ListBookshelves