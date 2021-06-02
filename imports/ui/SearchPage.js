import React from "react";

class SearchPage extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            show: false,
            value: ""
        }
        this.beginSreach = this.beginSreach.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    beginSreach(){
        this.props.searchFor(this.state.value)
    }

    handleChange(event){
        this.setState({
            value: event.target.value
        })
    }

    render(){
        // hide button if input:tag is empty
        let button = (this.state.value.length > 2 ? 
                            <button className="searchBTN" onClick={this.beginSreach}>
                                Suchen: <i className="fas fa-search"></i>
                            </button> : null);

        return (
            <div>
                <div className='SeachPage'>
                    <input  type="text" 
                        value={this.state.value} 
                        onChange={this.handleChange}
                        placeholder='Hier suchen, auch teilsuche möglich!'
                    />
                    {button}
                </div>
            </div>
          );
    }
}

export default SearchPage;