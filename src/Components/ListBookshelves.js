import React, {Component} from 'react';
import Bookshelf from './Bookshelf';

class ListBookshelves extends Component {

    onChangeBookStatus(statusObj) {
        this.props.onChangeStatus(statusObj);
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
                      <Bookshelf
                          books={shelve.books}
                          shelveId={shelve.id}
                          title={shelve.title}
                          onChangeBookStatus={(statusObj) => {this.onChangeBookStatus(statusObj)}}
                      />
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