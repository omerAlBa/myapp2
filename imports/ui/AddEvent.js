import React, { Component } from "react";
import { Events } from "../api/events";
import { handleResponseToUser } from './action';
import './style/AddEvent.css';

class AddEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: props.event,
      isUpdating: props.isUpdating,
      necessaryProperties: ['title','description','number_of_people'],
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      event: nextProps.event,
      isUpdating: nextProps.isUpdating
    });
  }

  handleChange = (event) => {
    const field = event.target.name;
    
    // method copies all enumerable own properties from one or more source objects to a target object. It returns the target object.
    const newEvent = Object.assign({}, this.state.event, {[field]: event.target.value});

    this.setState({
      event: newEvent
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { title, description, number_of_people } = this.state.event;
    let isSuccess = {type: '', status: 0};

    if (!this.props.isUpdating && title) {
      isSuccess.status = Events.insert({
        title,
        description,
        number_of_people
      });

      isSuccess.type = 'einfügen';

    } else if(title) {
      isSuccess.status = Events.update(this.state.event._id, {
        $set: {
          title,
          description,
          number_of_people
        }
      });

      //give user feedback
      isSuccess.type = 'update';
      handleResponseToUser(isSuccess);
      isSuccess = null
    }

    this.setState({
      event: {
        title: "",
        description: ""
      },
      isUpdating: false
    });
  }



  render() {
    const { event } = this.state;
    
    return (
      <div>
        <div className="text-center">
          <h4>Abendessen für jeden Geschmack</h4>
          <hr />
        </div>

        <div className="jumbotron">
          <form onSubmit={this.handleSubmit}>
            
            {
              // avoid unnecessary repetition
              this.state?.necessaryProperties.map(property => {
                return(
                 <div className="form-group">
                  <label>{property}:</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={`Bitte den ${property} eingeben`}
                    name={property}
                    value={event[property] ? event[property] : ""}
                    onChange={this.handleChange}
                  />
                </div> 
                )       
              })
            }

            <button type="submit" className="btn btn-primary">
              {this.state.isUpdating ? "Vebessere dein Rezept..": "Ein neues Rezept!"}
            </button>

          </form>
        </div>
      </div>
    );
  }
}

export default AddEvent;