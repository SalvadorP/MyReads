import React, {Component} from 'react';
import serializeForm from 'form-serialize';

class BookshelfChanger extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        const values = serializeForm(e.target, {hash: true});
        if (this.props.onChangeState) {
            this.props.onChangeState(values);
        }
    }
    render() {
        return (
            <div className="book-shelf-changer">
            <input type="hidden" name="bookId" value={this.props.bookId} />
            <select>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
            </select>
        </div>
        )
    }
}

export default BookshelfChanger