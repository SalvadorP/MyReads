import React, {Component} from 'react';
// import Bookshelf from './Bookshelf';
import Book from './Book';
// import * as BooksAPI from './BooksAPI';

class ListBookshelves extends Component {

    // state = {
    //     allBooks: [],
    //     shelves: [
    //         {
    //             id: "currentlyReading",
    //             books: [],
    //             title: 'Currently Reading'
    //         },
    //         {
    //             id: "wantToRead",
    //             books: [],
    //             title: 'Want to Read'
    //         },    
    //         {
    //             id: "read",
    //             books: [],
    //             title: 'Read'
    //         }                    
    //     ]     
    //   }

    // componentDidMount() {
    //     BooksAPI.getAll().then((allBooks) => {
    //       this.setState({allBooks});
    //       this.setState((previousState) => {
    //         previousState.shelves[1].books = allBooks;
    //         return previousState;
    //       });
    //     });        
    // }
    onChangeBookStatus(statusObj) {
        this.props.onChangeStatus(statusObj);        
    }

    render() {
        // console.log(this.state.allBooks);
        // <Bookshelf books={this.state.books.reading} title={"Currently Reading"} />
        // <Bookshelf books={this.state.books.wanted} title={"Want to Read"} />
        // <Bookshelf books={this.state.books.read} title={"Read"} />
        const {shelves} = this.props;
        // const shelves = this.state.shelves;
        // console.log(shelves);
        return (
            <div className="list-books">
                <div className="list-books-title">
                <h1>MyReads</h1>
                </div>                
                <div className="list-books-content">                
                {shelves.map((shelve,index) => (
                    <div key={index} className="bookshelf">
                        <h2 className="bookshelf-title">{shelve.title}</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">       
                            { shelve.books.map(book => (
                                <li key={book.id}>
                                    <Book book={book} shelve={shelve.id} onChangeBookStatus={(statusObj) => {this.onChangeBookStatus(statusObj)}} />
                                </li>
                            ))}         
                            </ol>
                        </div>
                    </div> 
                ))}                                                              
                </div>
                <div className="open-search">
                <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
                </div>
            </div>
        )
    }
}

export default ListBookshelves