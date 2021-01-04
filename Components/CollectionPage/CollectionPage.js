import React, { Component } from 'react';
import ProductDisplay from "../ProductDisplay/ProductDisplay.js"
import DropdownMenu from "./DropdownMenu/DropdownMenu.js"
import { AutoComplete } from 'antd';
import { Cascader } from 'antd';
import 'antd/dist/antd.css'

import products from "./products.json"

var request = new XMLHttpRequest()
const fetch = require("node-fetch");
var i =0;

class CollectionPage extends React.Component {
    
    constructor(props) {
        super(props)

        this.dropdownHandler = this.dropdownHandler.bind(this);
        this.getLink = this.getLink.bind(this)
        this.fetchAPI = this.fetchAPI.bind(this)

        this.changeType = this.changeType.bind(this)
        this.onSelectType = this.onSelectType.bind(this)
        this.blurType = this.blurType.bind(this)

        this.getProducts = this.getProducts.bind(this)

        this.state={
          products:[],
          sortMode: 0,
          searchTerm:"",
          type:null,
          typeSearch:""
        }


     }
  
     

     componentDidMount(){
      this.getProducts()
              
    }

    componentWillUnmount() {
      // fix Warning: Can't perform a React state update on an unmounted component
      this.setState = (state,callback)=>{
          return;
      };
  }

              
    dropdownHandler (prop, asc) {
      let newproducts= this.state.products.sort(function(a, b) {
            if (asc) {
                //console.log(a[prop]+" "+b[prop])
                return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
                
            } else {
                return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
            }
        });

      
        this.setState({products:newproducts}, () => {
          //console.log(this.state);
        }); 

    } 

    getLink(type, cat, brand){
  
      let link = 'https://makeup-api.herokuapp.com/api/v1/products.json?'

      if(type!=null){
        link+="product_type="+type+"&"
      }

      if(cat!=null){
        link+="product_cat="+cat+"&"
      }

      if(cat!=null){
        link+="brand="+brand+"&"
      }

      return link;
    }

    fetchAPI(link){
      fetch(link)
      .then(response =>{
        return response.json();
        
      }).then(data => {

        this.setState({products: data});
        //console.log(this.state.products)
      
      })
    }

    onSelectType(value,option) {

      this.changeType(value)
      this.setState({type: option});
      
    }

    changeType(value) {
      
            this.setState({typeSearch: value});
            
      }

    blurType(){

      let isProduct = false;

      products.forEach((prod) => {
        console.log(prod.value+" "+this.state.typeSearch)

        if(prod.value == this.state.typeSearch){
          isProduct =true;

        }
        
      })

      if(!isProduct){
      this.changeType("") 
      }
      
    }

    getProducts(){
      if (this.state.type==null){
        return;
      }
      this.fetchAPI(this.getLink(this.state.type.value.replace(' ', '_'), null, null))
    }



    render() {

        return (
            <div>
<AutoComplete
    style={{
      width: 200,
    }}
    options={products}
    placeholder=""
    filterOption={(inputValue, product) =>
      product.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
    }
    value={this.state.typeSearch}
    onSelect={this.onSelectType} onChange={this.changeType}
    onBlur={this.blurType}
    
  />
  <Cascader options={options} onChange={onChange} placeholder="Please select" />


<button onClick={this.getProducts}>go</button>
              <DropdownMenu action={this.dropdownHandler}/>
              <ProductDisplay products={this.state.products}/>
                  </div>
      
        );
    }
  }
  
  export default CollectionPage;