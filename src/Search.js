import React, {Component} from 'react';
import './App.css'
import Book from './Book'
import {Link} from "react-router-dom"
import * as BooksAPI from "./BooksAPI";
import { Debounce } from 'react-throttle';

class Search extends Component {
    state = {
        query: [],
    };

    searchForBooks(event){
        if (event.target.value !== "") {
            BooksAPI.search(event.target.value).then((bookResults) => {
                if (bookResults.error) {
                    this.setState({ query: [] });
                }
                else if (bookResults) {
                    // if the books array already contains a book with the same id as the searched book , sets the shelf value to the same value
                    bookResults.map(bookResult => {
                        //loops each book and tests if data is missing
                        if (bookResult.shelf === undefined) {
                            bookResult.shelf = "none";
                        }
                        if (bookResult.imageLinks === undefined) {
                            bookResult.imageLinks = "none";
                        }
                    });
                    this.setState({ query: bookResults });
                }
            });
        } else if (event.target.value === "") {
            this.setState({ query:[]});
        }
    }


    searchedBooksShelfValue(book, event){
        book.shelf  = event.target.value;
    }

    render(){
        let searchedBooks = this.state.query;

        return(
            <div className="search-books">
                <div className="search-books-bar">
                    <Link
                        to="/"
                        className="close-search"
                    >Close
                    </Link>
                    <div className="search-books-input-wrapper">
                        {/* Responds to the input after 400ms of no typing */}
                    <Debounce time="400" handler="onChange">
                        <input type="text" placeholder="Search by title or author" onChange={(event) => this.searchForBooks(event)}/>
                    </Debounce>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {searchedBooks.map((book) => (
                            <Book key={book.id}
                                  book={book}
                                  onChangeShelf={this.props.onChangeShelf}
                                  notificationUpdate={this.props.notificationUpdate}
                                  setShelfValue={this.searchedBooksShelfValue}
                            />
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}


export default Search;