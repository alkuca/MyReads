import React, {Component} from 'react';
import './App.css'
import PropTypes from 'prop-types'


class Book extends Component {
    render(){
        return (
            <li  key={this.props.book.id}>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{width: 128, height: 193, backgroundImage: `url(${this.props.book.imageLinks.thumbnail})`}}></div>
                        <div className="book-shelf-changer">
                            <select
                                value={this.props.book.shelf}
                                onChange={(event) => {
                                    this.props.onChangeShelf(this.props.book, event);
                                    this.props.notificationUpdate(this.props.book.title, event.target.value);}}>
                                    <option value="move" disabled>Move to...</option>
                                    <option value="currentlyReading" >Currently Reading</option>
                                    <option value="wantToRead">Want to Read</option>
                                    <option value="read">Read</option>
                                    <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{this.props.book.title}</div>
                    <div className="book-authors">{this.props.book.authors}</div>
                </div>
            </li>

        )
    }
}

Book.propTypes = {
    book: PropTypes.object.isRequired,
    onChangeShelf: PropTypes.func.isRequired
};

export default Book;