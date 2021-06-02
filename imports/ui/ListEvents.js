import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Events } from "../api/events";
import SearchPage from './SearchPage';
import { handleResponseToUser } from './action';
import './style/EventsShow.css';

class ListEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUpdating: false,
      events: [],
      isSearching: false,
      messageToUser: []
    }
    this.handleSearch = this.handleSearch.bind(this)
  }

  handleEdit = (eventId) => {
    this.props.handleEdit(eventId);
  }

  handleDelete = (eventId) => {
    let toDelete = confirm('Dieses Rezept wird dauerhaft gelöscht, wünschen Sie das?')
    //request User before delete!
    if (!toDelete) { return false }

    const isSuccess = Events.remove({_id: eventId})
    this.setState({
      messageToUser: handleResponseToUser({type:'löschvorgang', status: isSuccess})
    }) 
  }

  handleSearch(keyword){
    const event = Events.find({'title' : new RegExp(keyword,'g')}).fetch();
    this.setState({
      events : event,
      isSearching: true
    })
  }


  render() {
    let events = [];
    // submit the list you are looking for or everything
    if(!this.state.isSearching){
      events = this.props.events
    }  else {
      events = this.state.events
    }

    return (
      <div>
        <SearchPage searchFor={this.handleSearch}/>
        {/* {this.state.messageToUser.map(msg => msg)} */}
        {
          events.length ? events.map((event) => (
            <div className="list-group" key={event._id} style={{ margin: "20px 100px" }}>
              <div className="list-group-item list-group-item-action flex-column align-items-start">
                
                <div className="d-flex w-100 justify-content-between">
                  <div>
                    <h5 className="mb-1">{event.title}</h5>
                    <small><i class="fas fa-user-friends"></i> {event.number_of_people ? event.number_of_people : "" }</small>
                  </div>
                  <small>{event.date}</small>
                </div>

                <p className="mb-1">{event.description}</p>

                <div className="controls row">
                  <button
                    className="btn btn-outline-warning col buttonStyle"
                    data-toggle="modal"
                    data-target="#myModal"
                    onClick={() => this.handleEdit(event._id)}
                  >
                    Edit Event
                  </button>

                  <button
                    className="btn btn-outline-danger col buttonStyle"
                    onClick={() => this.handleDelete(event._id)}
                  >
                    Delete Event
                  </button>
                </div>

              </div>
            </div>
          )) :
          <div className="no-events text-center" style={{ padding: "100px 0" }}>OOOPSY: NO EVENTS REGISTERED</div>
        }
      </div>
    );
  }
}

export default withTracker(() => {
  return {
    events: Events.find({}). fetch()
  }
})(ListEvents);