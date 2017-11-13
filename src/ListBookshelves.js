import React, {Component} from 'react';
import shortid from 'shortid';
import Book from './Book';

class ListBookshelves extends Component {

    onChangeBookStatus(statusObj) {
        this.props.onChangeStatus(statusObj);
    }

    render() {
        // <Bookshelf books={this.state.books.reading} title={"Currently Reading"} />
        // <Bookshelf books={this.state.books.wanted} title={"Want to Read"} />
        // <Bookshelf books={this.state.books.read} title={"Read"} />
        const {shelves, pageTitle} = this.props;
        return (
            <div className="list-books">
                <div className="list-books-title">
                <h1>{pageTitle}</h1>
                </div>
                <div className="list-books-content">
                {shelves.map((shelve,index) => (
                    <div key={shortid.generate()} className="bookshelf">
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
            </div>
        )
    }
}

export default ListBookshelves
