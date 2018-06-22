import React, {Component} from 'react';
import './App.css'

class Notification extends Component{
    render(){
        return(
            <h4 className="notification-text">
                You added <span className="book-notification-title">{this.props.bookTitle}</span> to the <span className="book-notification-shelf">{this.props.shelfTitle}</span> shelf
            </h4>
        )
    }
}

export default Notification;