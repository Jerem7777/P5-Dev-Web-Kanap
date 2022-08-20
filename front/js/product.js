const params = new URLSearchParams(window.location.search);
let productId = params.get("id");
console.log("L'identifiant du produit est", productId);
let productsPromise = findProductById(productId);
productsPromise.then(function (product) {
  buildDetailsOfProduct(product);
  let addToCartButton = document.querySelector("#addToCart");
  addToCartButton.addEventListener("click", function () {
    // Implémenter la logique pour ajouter le produit au panier en utilisant les fonctions qu'on a écrite dans le fichier function.js addProductToCart
    // récuper couleur choisi dans un select et la quantité dans l'input dans 2 variables ; check color ; check quantité si c est bien un nombre entre 1-100, si null marqué choisir la couleur ou un nombre entre 1-100. Si tout est ok appeler la function pour ajouter au panier
  });
});
