import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from "./BookShelf";
import {Link} from "react-router-dom"
import {Route} from "react-router-dom"
import Notification from "./Notification"
import { BarLoader } from 'react-spinners';
import Search from "./Search";

class BooksApp extends React.Component {
    state = {
        books: [],
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
        BooksAPI.update(bookID, event.target.value);
    }



    render() {
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
                    <Search
                        onChangeShelf={this.update}
                        notificationUpdate={this.notificationInfo}
                    />
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
