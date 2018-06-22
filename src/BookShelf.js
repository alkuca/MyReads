import React, {Component} from 'react'
import Book from './Book'

class BookShelf extends Component {
    render(){
        return(
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.bookShelfName}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {this.props.selectedShelf.map((book) => (
                            <Book
                                key={book.id}
                                book={book}
                                onChangeShelf={this.props.onChangeShelf}
                                notificationUpdate={this.props.notificationUpdate}
                            />
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default BookShelf;