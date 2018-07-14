import React, {Component} from 'react'
import Book from './Book'

function BookShelf(props) {
    return(
        <div className="bookshelf">
            <h2 className="bookshelf-title">{props.bookShelfName}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {props.selectedShelf.map((book) => (
                        <Book
                            key={book.id}
                            book={book}
                            onChangeShelf={props.onChangeShelf}
                            notificationUpdate={props.notificationUpdate}
                            // need to fix this method
                            setShelfValue={props.onChangeShelf}
                        />
                    ))}
                </ol>
            </div>
        </div>
    )
}


export default BookShelf;