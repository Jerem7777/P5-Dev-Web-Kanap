let datas = findProductsFromCart();
let cart__items = document.querySelector("#cart__items");
for (let data of datas) {
  let productPromise = findProductById(data.id);
  productPromise.then(function (product) {
    let cartProductHtml = buildCartProductToHtml(
      product,
      data.color,
      data.quantity
    );
    cart__items.append(cartProductHtml);

    // Ajouter un écouteur d'évenement pour la modification des quantités
    let inputQuantity = cartProductHtml.querySelector(".itemQuantity");
    inputQuantity.addEventListener("change", function (e) {
      let quantityUpdated = e.target.value;
      if (!checkQuantity(quantityUpdated)) {
        alert("Quantité non valide");
        inputQuantity.value = data.quantity;
        return;
      } else {
        updateProductQuantityInCart(data.id, data.color, quantityUpdated);
        calculateNumberAndTotalPriceOfProductsInCart();
      }
    });

    // Ajouter un écouteur d'évenement pour la suppression des articles
    let deleteProductCart = cartProductHtml.querySelector(".deleteItem");
    deleteProductCart.addEventListener("click", function (e) {
      let answer = confirm(
        `Voulez vous vraiment supprimer le produit ${product.name},${data.color}?`
      );
      if (answer) {
        removeProductFromCart(cartProductHtml);
        calculateNumberAndTotalPriceOfProductsInCart();
      }
    });
  });
}

calculateNumberAndTotalPriceOfProductsInCart();

if (findProductsFromCart().length == 0) {
  alert("Votre panier est vide");
} else {
  // Check formulaire firstname
  let validationFormulaire = document.getElementById("order");
  let firstName = document.getElementById("firstName");
  let firstName_m = document.getElementById("firstNameErrorMsg");
  let firstName_v =
    /^[a-zA-ZéèìïÉÈÎÏ][a-zéèêàçîï]+([-'/s][a-zA-ZéèìïÉÈÎÏ][a-zéèêàçîï]+)?/;

  //Validation formulaire lastname
  let lastName = document.getElementById("lastName");
  let lastName_m = document.getElementById("lastNameErrorMsg");
  let lastName_v =
    /^[a-zA-ZéèìïÉÈÎÏ][a-zéèêàçîï]+([-'/s][a-zA-ZéèìïÉÈÎÏ][a-zéèêàçîï]+)?/;

  //Validation formulaire adresse
  let address = document.getElementById("address");
  let address_m = document.getElementById("addressErrorMsg");

  //Validation formulaire city
  let city = document.getElementById("city");
  let city_m = document.getElementById("cityErrorMsg");
  let city_v =
    /^[a-zA-ZéèìïÉÈÎÏ][a-zéèêàçîï]+([-'/s][a-zA-ZéèìïÉÈÎÏ][a-zéèêàçîï]+)?/;

  //Validation formulaire e-mail
  let email = document.getElementById("email");
  let email_m = document.getElementById("emailErrorMsg");
  let email_v = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  validationFormulaire.addEventListener("click", function (e) {
    e.preventDefault();
    if (
      f_valid(firstName, firstName_m, firstName_v) &&
      lastName_valid(lastName, lastName_m, lastName_v) &&
      address_valid(address, address_m) &&
      city_valid(city, city_m, city_v) &&
      email_valid(email, email_m, email_v)
    ) {
      // Logique métier pour passer la commande
      let order = {
        products: productIds,
        contact: contact,
      };
    }
  });
}

// productIds = un tableau de tous les ID des produits du panier (f)
// contact : object qui récupère les réponses du formulaire firstName.value (f)
// order : fonction pour passer la commande avec fect et "post" dans le body avec order
// window.location.href = "confirmation.html?orderId= "
