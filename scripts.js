var request = new XMLHttpRequest()

request.open('GET', 'https://makeup-api.herokuapp.com/api/v1/products.json', true)

request.onload = function () {
    var data = JSON.parse(this.response)
    
    if (request.status >= 200 && request.status < 400) {
      data.forEach((product) => {
        console.log(product.name)
      })
    } else {
      console.log('error')
    }
}

request.send()