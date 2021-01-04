import React, { Component } from 'react';

class ProductDisplay extends React.Component {
    constructor(props) {
        super(props)
        this.state={
          product_list:[]
        }
        this.productList = this.productList.bind(this)
     }

       
    productList() {
      const list = this.props.products.map((product) => 
      <div>{product.name}</div>
      )
      return(list);
    }

    render() {
        
      return (
        <div>
            {this.productList()}
                  </div>
      
      );
    }
  }
  
  export default ProductDisplay;