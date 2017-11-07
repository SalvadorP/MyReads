import React, {Component} from 'react';

class Book extends Component {
  
    changeBookStatus = (e) => {
        e.preventDefault();
        const statusObj = {
            bookId: this.props.book.id,
            newShelve: e.target.value,
            oldShelve: this.props.shelve
        };
        this.props.onChangeBookStatus(statusObj);
    };
    

    render() {
        const { book, shelve } = this.props;
        const bookCoverStyle = {
            width: 128, 
            height: 193, 
            backgroundImage: 'url(' + book.imageLinks.thumbnail + ')'          
        }
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={bookCoverStyle}></div>
                    <div className="book-shelf-changer">
                        <select onChange={this.changeBookStatus} name="bookStatus" value={shelve}>
                            <option value="none" disabled>Move to...</option>
                            <option value="none">None</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>                            
                        </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors.map(author => (author + ", " ))}</div>
            </div>            
        )
    }
}

export default Book
