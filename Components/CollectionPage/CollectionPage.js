import React, { Component } from 'react';
import ProductDisplay from "../ProductDisplay/ProductDisplay.js"
import DropdownMenu from "./DropdownMenu/DropdownMenu.js"
import { AutoComplete } from 'antd';
import { Cascader } from 'antd';
import 'antd/dist/antd.css'

import data from "./products.json"

var request = new XMLHttpRequest()
const fetch = require("node-fetch");
var i = 0;

class CollectionPage extends React.Component {

  constructor(props) {
    super(props)

    this.dropdownHandler = this.dropdownHandler.bind(this);
    this.getLink = this.getLink.bind(this)
    this.fetchAPI = this.fetchAPI.bind(this)

    this.changeTypeText = this.changeTypeText.bind(this)
    this.selectType = this.selectType.bind(this)
    this.blurType = this.blurType.bind(this)

    this.changeBrandText = this.changeBrandText.bind(this)
    this.selectBrand = this.selectBrand.bind(this)
    this.blurBrand = this.blurBrand.bind(this)


    this.getProducts = this.getProducts.bind(this)

    this.changeCategory = this.changeCategory.bind(this)

    this.state = {
      products: [],
      sortMode: 0,
      searchTerm: "",
      type: data.products[0],
      typeText: "Blush",
      category: "",

      brand:"",
      brandText:""
    }


  }



  componentDidMount() {
    this.getProducts()

  }

  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = (state, callback) => {
      return;
    };
  }


  dropdownHandler(prop, asc) {
    let newproducts = this.state.products.sort(function (a, b) {
      if (asc) {
        //console.log(a[prop]+" "+b[prop])
        return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);

      } else {
        return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
      }
    });


    this.setState({ products: newproducts }, () => {
      //console.log(this.state);
    });

  }

  getLink(type, cat, brand) {

    let link = 'https://makeup-api.herokuapp.com/api/v1/products.json?'

    if (type != null || type != "") {
      link += "product_type=" + type + "&"
    }

    if (cat != null || cat != "") {
      link += "product_category=" + cat + "&"
    }

    if (brand != null || brand !="") {
      link += "brand=" + brand + "&"
    }

    return link;
  }

  fetchAPI(link) {
    fetch(link)
      .then(response => {
        return response.json();

      }).then(data => {

        this.setState({ products: data });
        //console.log(this.state.products)

      })
  }

  ////CHANGING TYPE////////////////////////////////////////////////////////////////////////////////////////////
  selectType(value, option) {

    this.changeTypeText(value)
    this.setState({type: option });

  }

  changeTypeText(value) {

    this.setState({ typeText: value });

  }

  blurType() {

    //console.log(products)
    let isProduct = false;

    data.products.forEach((prod) => {
      //console.log(prod.value+" "+this.state. typeText)

      if (prod.value == this.state.typeText) {
        isProduct = true;

      }

    })

    if (!isProduct) {

      this.selectType("", { value: "", categories: [] })
      this.changeCategory("")
    }

  }

  ////CHANGING BRAND////////////////////////////////////////////////////////////////////////////////////////////

  selectBrand(value) {

    this.changeBrandText(value)
    this.setState({brand: value});

  }

  changeBrandText(value) {

    this.setState({brandText: value });

  }

  blurBrand() {

    let isBrand = false;

    data.brands.forEach((brand) => {
      
      if (brand.value == this.state.brandText) {
        isBrand = true;

      }

    })

    if (!isBrand) {
      this.selectBrand("", "")
    }

  }

  ////////////////////////////////////////////////////////////////////////////////////////////////

  getProducts() {
    if (this.state.type.value == "") {
      return;
    }
    console.log("cat: "+this.state.category)
    console.log("brand: "+this.state.brand)
    this.fetchAPI(this.getLink(
      this.state.type.value.replace(' ', '_'),
      this.state.category.replace(' ', '_'), this.state.brand.replace(' ', '_')))
  }

  changeCategory(value) {
    this.setState({ category: value[0] })
    //console.log(this.state.category)
  }

  render() {

    return (
      <div>
        <AutoComplete
          style={{
            width: 200,
          }}
          options={data.products}
          placeholder=""
          filterOption={(inputValue, product) =>
            product.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
          value={this.state.typeText}
          onSelect={this.selectType} onChange={this.changeTypeText}
          onBlur={this.blurType}
          allowClear={true}

        />
        <Cascader value={[this.state.category]} onChange={this.changeCategory}
          options={this.state.type.categories} placeholder="Please select" />


          <AutoComplete
          style={{
            width: 200,
          }}
          options={data.brands}
          placeholder=""
          filterOption={(inputValue, brand) =>
            brand.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
          value={this.state.brandText}
          onSelect={this.selectBrand} onChange={this.changeBrandText}
          onBlur={this.blurBrand}
          allowClear={true}

        />

        <button onClick={this.getProducts}>go</button>
        <DropdownMenu action={this.dropdownHandler} />
        <ProductDisplay products={this.state.products} />
      </div>

    );
  }
}

export default CollectionPage;