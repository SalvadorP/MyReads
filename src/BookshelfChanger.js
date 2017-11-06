import React, {Component} from 'react';
import serializeForm from 'form-serialize';

class BookshelfChanger extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        console.log('handle submti');
        const values = serializeForm(e.target, {hash: true});
        if (this.props.onChangeState) {
            console.log("change state");
            console.log(values);
            this.props.onChangeState(values);
        }
    };
    changeStatus = (e) => {
        e.preventDefault();
        console.log('change status func');
        const values = e.target.value;
        console.log(values);        
    };
    render() {
        return (
            <div className="book-shelf-changer">
            <form className="change-book-status-form" onSubmit={this.handleSubmit}>
                <input type="hidden" name="bookId" value={this.props.bookId} />
                <select onChange={this.changeStatus} name="bookStatus">
                    <option value="none" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
            </form>
        </div>
        )
    }
}

export default BookshelfChanger