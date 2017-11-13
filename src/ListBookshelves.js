import React, {Component} from 'react';
import Bookshelf from './Bookshelf';

class ListBookshelves extends Component {

    onChangeBookStatus(statusObj) {
        this.props.onChangeBookStatus(statusObj);
    }

    render() {
        const {shelves, pageTitle} = this.props;
        return (
            <div className="list-books">
                <div className="list-books-title">
                <h1>{pageTitle}</h1>
                </div>
                <div className="list-books-content">
                {shelves.map((shelve,index) => (
                    <Bookshelf shelve={shelve} onChangeBookStatus={(statusObj) => {this.onChangeBookStatus(statusObj)}} />
                ))}
                </div>
            </div>
        )
    }
}

export default ListBookshelves
