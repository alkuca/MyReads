import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Book from "./Book";
import BookShelf from "./BookShelf";
import {Link} from "react-router-dom"
import {Route} from "react-router-dom"
import Notification from "./Notification"
import { BarLoader } from 'react-spinners';

class BooksApp extends React.Component {
  state = {
    books: [],
    query: [],
    title: "",
    shelfTitle: "",
    runAni: "",
    loading: true,
    overlay:"overlay"
  };

  // Functionality for notification appearing

     notificationInfo = (bookName,bookShelf) => {
          this.setState(() =>({
              title :  bookName,
              shelfTitle: bookShelf,
              runAni: true,
          }));
          setTimeout(this.notificationAnimation,4001)
     };

     notificationAnimation = () => {
         this.setState(() =>({
             runAni: false,
         }));
     };

    componentDidMount(){
        this.state.loading=false;
        this.state.overlay="";
        BooksAPI.getAll().then((books) =>{
            this.setState({ books })
        })
    }

    componentDidUpdate(){
        BooksAPI.getAll().then((books) =>{
            this.setState({ books })
        })
    }

    update(bookID, event) {
         BooksAPI.update(bookID, event.target.value)
    }

    // Functionality for Book search

    searchForBooks(event){
        if (event.target.value !== "") {
            BooksAPI.search(event.target.value).then((bookResults) => {
                if (bookResults.error) {
                    this.setState({ query: [] });
                }
                else if (bookResults) {
                    // if the books array already contains a book with the same id as the searched book , sets the shelf value to the same value
                    bookResults.map(bookResult => {
                        this.state.books.map(book=> {
                            if(bookResult.id === book.id){
                                bookResult.shelf = book.shelf
                            }
                        });
                        //loops each book and tests if data is missing
                        if (bookResult.shelf === undefined) {
                            bookResult.shelf = "none";
                        }
                        if (bookResult.imageLinks === undefined) {
                            bookResult.imageLinks = "none";
                        }
                        if (bookResult.authors === undefined) {
                            bookResult.authors = "none"
                        }
                    });
                    this.setState({ query: bookResults });
                }
            });
        } else if (event.target.value === "") {
            this.setState({ query:[]});
        }
    }

  render() {
      let searchedBooks = this.state.query;
      let currentlyReadingShelf = this.state.books.filter((book) => {return book.shelf === 'currentlyReading'});
      let readBookShelf = this.state.books.filter((book) => {return book.shelf === 'read'});
      let wantToReadShelf = this.state.books.filter((book) => {return book.shelf === 'wantToRead'});
      let changer = this.state.runAni ? "animateMe":"";


    return (
      <div className="app">
          <div className={`notification ${changer}`}>
              <Notification
                  bookTitle={this.state.title}
                  shelfTitle={this.state.shelfTitle}
                  notificationUpdate={this.notificationInfo}
              />
          </div>
          <Route path="/search" render={() => (
              <div className="search-books">
                  <div className="search-books-bar">
                      <Link
                          to="/"
                          className="close-search"
                      >Close
                      </Link>
                      <div className="search-books-input-wrapper">
                          <input type="text" placeholder="Search by title or author" onChange={(event) => this.searchForBooks(event)}/>
                      </div>
                  </div>
                  <div className="search-books-results">
                      <ol className="books-grid">
                          {searchedBooks.map((book) => (
                              <Book key={book.id}
                                    book={book}
                                    onChangeShelf={this.update.bind(this)}
                                    notificationUpdate={this.notificationInfo}
                              />
                          ))}
                      </ol>
                  </div>
              </div>
          )}
          />
          <div className={this.state.overlay}>
              <BarLoader
                  loading={this.state.loading}
                  color={'#0034c0'}
              />
          </div>
          <Route exact path="/"  render={() => (
              <div className="list-books">
                  <div className="list-books-title">
                      <h1>MyReads</h1>
                  </div>
                  <div className="list-books-content">
                      <div>
                          <BookShelf notificationUpdate={this.notificationInfo} bookShelfName ="Currently Reading" selectedShelf={currentlyReadingShelf} onChangeShelf={this.update}/>
                          <BookShelf notificationUpdate={this.notificationInfo} bookShelfName ="Want to Read" selectedShelf={wantToReadShelf} onChangeShelf={this.update}/>
                          <BookShelf notificationUpdate={this.notificationInfo} bookShelfName ="Read" selectedShelf={readBookShelf} onChangeShelf={this.update}/>
                      </div>
                  </div>
                  <div className="open-search">
                      <Link
                          to="/search"
                      >Add Book
                      </Link>
                  </div>
              </div>
          )}
          />
      </div>
    )
  }
}

export default BooksApp
