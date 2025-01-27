import React, { Component } from 'react';
import DropdownOption from './DropdownOption.js'

class DropdownMenu extends React.Component {
  constructor() {
    super();
    
    this.state = {
      showMenu: false,
    };
    
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }
  
  showMenu(event) {
    event.preventDefault();
    
    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }
  
  closeMenu(event) {
    
    if (!this.dropdownMenu.contains(event.target)) {
      
      this.setState({ showMenu: false }, () => {
        document.removeEventListener('click', this.closeMenu);
      });  
      
    }
  }

  render() {
    return (
      <div>
        <button onClick={this.showMenu}>
          Show menu
        </button>
        <DropdownOption action={this.props.action} sort={"price"} asc={true}/>
        {
          this.state.showMenu
            ? (
              <div
                className="menu"
                ref={(element) => {
                  this.dropdownMenu = element;
                }}
              >
               <DropdownOption action={this.props.action} sort={"price"} asc={true}/>
               <DropdownOption action={this.props.action} sort={"price"} asc={false}/>
             
              </div>
            )
            : (
              null
            )
        }
      </div>
    );
  }
}

  export default DropdownMenu;