import React, { Component } from 'react';
import ProductDisplay from "../ProductDisplay/ProductDisplay.js"
import DropdownMenu from "./DropdownMenu/DropdownMenu.js"
import { AutoComplete } from 'antd';

import 'antd/dist/antd.css'

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
        this.getProducts = this.getProducts.bind(this)

        this.state={
          products:[],
          sortMode: 0,
          searchTerm:"",
          type:"Lip Liner"
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

    changeType(value) {
      this.setState({type: value});
      
    }

    getProducts(){
      this.fetchAPI(this.getLink(this.state.type.replace(' ', '_'), null, null))
    }



    render() {

        return (
            <div>
<AutoComplete
    style={{
      width: 200,
    }}
    options={products}
    placeholder="try to type `b`"
    filterOption={(inputValue, product) =>
      product.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
    }
    value={this.state.type} onChange={this.changeType}
  />


<button onClick={this.getProducts}>go</button>
              <DropdownMenu action={this.dropdownHandler}/>
              <ProductDisplay products={this.state.products}/>
                  </div>
      
        );
    }
  }
  
  export default CollectionPage;

  /*
              <Autocomplete 
              options={["lip_liner"]}
              renderInput={(params) => <TextField label="Combo box" variant="outlined" />}
              value={this.state.type} onChange={this.changeType}/>  */


const products = [
  {
    value:"Blush",
    categories: ["Powder, Cream"]
  },
  {
    value:"Bronzer",
    categories: ["Powder"],
  },
  {
    value:"Eyebrow",
    categories: ["Pencil"],
  },
  {
    value:"Eyeliner",
    categories: ["Liquid","Pencil","Gel","Cream"],
  },
  {
    value:"Eyeshadow",
    categories: ["Palette","Pencil","Cream"],
  },
  {
    value:"Foundation",
    categories: ["Concealer", "Liquid", "Contour",
                  "BB CC", "Cream","Mineral","Powder","Highlighter"],
  },
  {
    value:"Lip Liner",
    categories: ["Pencil"],
  },
  {
    value:"Lipstick",
    categories: ["Lipstick, Lip_Gloss, Liquid, Lip_Stain"],
  },
  {
    value:"Mascara",
    categories: [],
  }
]