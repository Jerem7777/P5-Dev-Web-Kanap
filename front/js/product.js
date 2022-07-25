const params = new URLSearchParams(window.location.search);
let productId = params.get("id");
console.log("L'identifiant du produit est", productId);
let productsPromise = findProductById(productId);
productsPromise.then(function (product) {
  buildDetailsOfProduct(product);
});
