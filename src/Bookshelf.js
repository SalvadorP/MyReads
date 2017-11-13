import React, {Component} from 'react';
import shortid from 'shortid';
import Book from './Book';

class Bookshelf extends Component {

    onChangeBookStatus(statusObj) {
        this.props.onChangeBookStatus(statusObj);
    }

    render() {
        const { shelve } = this.props;
        return (
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
        )
    }
}

export default Bookshelf
