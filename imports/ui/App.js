import React, { Component } from "react";
import AddEvent from "./AddEvent";
import ListEvents from "./ListEvents";
import { Events } from "../api/events";
import './style/App.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUpdating: false,
      event: {}
    }
  }

  handleEdit = (eventId) => {
    // find the event that requires editing
    const event = Events.findOne({_id: eventId});

    this.setState({
      event,
      isUpdating: true
    })
  }

  render() {
    return (
      <div className='App'>
        <AddEvent
          event={this.state.event}
          isUpdating={this.state.isUpdating}
        />
        <ListEvents handleEdit={this.handleEdit} />
      </div>
    );
  }
}

export default App;