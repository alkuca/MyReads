import React, {Component} from 'react';
import './App.css'
import PropTypes from 'prop-types'
import Search from "./Search";

class Book extends Component {


    render(){
        // if the book dosent have a thumbnail , replace it with a dummy image
        let bookThumbnail;
        if(!this.props.book.imageLinks)
            bookThumbnail = "https://dummyimage.com/130x210/000/ffffff&text=Thumbnail+Replacment";
        else {
            bookThumbnail = this.props.book.imageLinks.thumbnail;
        }

        let bookAuthors;
        if(this.props.book.authors === undefined)
            bookAuthors = "Unknown Author";
        else {
            bookAuthors = this.props.book.authors.join(', ');
        }



        return (
            <li  key={this.props.book.id}>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{width: 128, height: 193, backgroundImage: `url(${bookThumbnail})`}}></div>
                        <div className="book-shelf-changer">
                            <select
                                value={this.props.book.shelf}
                                onChange={(event) => {
                                    this.props.onChangeShelf(this.props.book, event);
                                    this.props.notificationUpdate(this.props.book.title, event.target.value);
                                    this.props.setShelfValue(this.props.book, event);}}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading" >Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{this.props.book.title}</div>
                    <div className="book-authors">{bookAuthors}</div>
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