let datas = findProductsFromCart();
let cart__items = document.querySelector("#cart__items");
for (let data of datas) {
  let productPromise = findProductById(data.id);
  productPromise.then(function (product) {
    let cartHtml = buildCartProductToHtml(product, data.color, data.quantity);
    cart__items.append(cartHtml);

    // Ajouter un écouteur d'évenement pour la modification des quantités

    // Ajouter un écouteur d'évenement pour la suppression des articles
  });
}

calculateNumberAndTotalPriceOfProductsInCart();
