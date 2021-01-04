import React, { Component } from 'react';

class DropdownOption extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
   }

   handleClick(){
    //console.log(this.props.sort+" "+this.props.asc)
    this.props.action(this.props.sort, this.props.asc);
  }

  render() {
    return (
        <button onClick={this.handleClick}> Price Asc </button>
    
    );
  }
}

export default DropdownOption;