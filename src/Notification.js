import React, {Component} from 'react';
import './App.css'

class Notification extends Component{
    render(){
        let shelfChooser = this.props.shelfTitle;
        let youAdded = "You added the";
        let toThe ="to the";
        let shelf ="shelf";
        let congratulations="";

        if(shelfChooser === "read"){
            shelfChooser = "Read";
            congratulations = "Congratulations!"
        }
        if(shelfChooser === "currentlyReading"){
            shelfChooser = "Currently Reading"
        }
        if(shelfChooser === "wantToRead"){
            shelfChooser = "Want to Read"
        }

        if(shelfChooser === "none"){
            youAdded = "You removed the";
            toThe = "";
            shelf = "";
            shelfChooser="";
        }
        return(
            <h4 className="notification-text">
                {congratulations} {youAdded}
                <span className="book-notification-title"> {this.props.bookTitle} </span>
                book {toThe}
                <span className="book-notification-shelf"> {shelfChooser} </span>
                {shelf}
            </h4>
        )
    }
}

export default Notification;