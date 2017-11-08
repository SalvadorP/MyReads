import React, {Component} from 'react';
import Book from './Book';

class Bookshelf extends Component {

    onChangeBookStatus(statusObj) {
        this.props.onChangeBookStatus(statusObj);
    }

    render() {
        const {shelveId, title, books} = this.props;
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                    { books.map(book => (
                        <li key={book.id}>
                            <Book book={book} shelve={shelveId} onChangeBookStatus={(statusObj) => {this.onChangeBookStatus(statusObj)}} />
                        </li>
                    ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default Bookshelf