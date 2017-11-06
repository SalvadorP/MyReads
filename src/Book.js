import React, {Component} from 'react';
import BookshelfChanger from './BookshelfChanger';

class Book extends Component {
    render() {
        const { book } = this.props;
        const bookCoverStyle = {
            width: 128, 
            height: 193, 
            backgroundImage: 'url(' + book.imageLinks.thumbnail + ')'          
        }
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={bookCoverStyle}></div>
                    <BookshelfChanger bookId={book.id} onChangeState={} />
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors.map(author => (author + ", " ))}</div>
            </div>            
        )
    }
}

export default Book
