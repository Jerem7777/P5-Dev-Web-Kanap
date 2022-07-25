let productsPromise = findAllProducts();
productsPromise.then(function (products) {
  //let items = document.getElementById("items")
  let items = document.querySelector("#items");
  for (let product of products) {
    let productHtml = buildProductToHtml(product);
    items.append(productHtml);
  }
});
