import React from "react";
import './style/Message';

class Message extends React.Component {
    render(){
        return(
            <div class="alert">
            <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
            {this.props.msg}
            </div>
        )
    }
}

export default Message;