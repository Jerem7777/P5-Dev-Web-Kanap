/**
 * function qui permet de récupérer tous les produits disponible et les retourner sous forme de tableau
 */
async function findAllProducts() {
  // not yet implemented
  let response = await fetch(`${BASE_URL}/`, {
    method: "GET",
  });

  return response.json();
}

/**
 * Function qui permet de construire le code HTML d'un produit
 * @param product le produit
 * @return code html du produit
 */
function buildProductToHtml(product) {
  // not yet implemented
  // utiliser document.createElement
  let a = document.createElement("a");
  let article = document.createElement("article");
  let img = document.createElement("img");
  let h3 = document.createElement("h3");
  let p = document.createElement("p");

  a.setAttribute("href", `./product.html?id=${product._id}`);

  img.setAttribute("src", product.imageUrl);
  img.setAttribute("alt", product.altTxt);

  h3.classList.add("productName");
  h3.textContent = product.Name;

  p.classList.add("productDescription");
  p.textContent = product.description;

  article.append(img);
  article.append(h3);
  article.append(p);

  a.append(article);

  return a;
}
// Trouver un produit par son ID
async function findProductById(id) {
  let response = await fetch(`${BASE_URL}/${id}`, {
    method: "GET",
  });

  return response.json();
}
// Retour du prix d'un produit
function formatPrice(price) {
  return price;
}
// Implantation dans l'HTML
function buildDetailsOfProduct(product) {
  let itemImg = document.querySelector(".item__img");

  let img = document.createElement("img");
  img.setAttribute("src", product.imageUrl);
  img.setAttribute("alt", product.altTxt);

  itemImg.append(img);

  let h1 = document.querySelector("#title");
  h1.textContent = product.name;

  let span = document.querySelector("#price");
  span.textContent = formatPrice(product.price);

  let p = document.querySelector("#description");
  p.textContent = product.description;

  let select = document.querySelector("#colors");
  for (let color of product.colors) {
    let option = buildOptionColorToHtml(color);
    select.append(option);
  }
}

// Mise en place de l'option color dans l'HTML
function buildOptionColorToHtml(color) {
  let option = document.createElement("option");
  option.setAttribute("value", color);
  option.textContent = color;
  return option;
}

// Ajouter un produit au panier
function addProductToCart(product, color, quantity) {
  let data = {
    id: product._id,
    color: color,
    quantity: parseInt(quantity),
  };

  // Retourne le contenu du localStorage
  let addedProducts = findProductsFromCart();
  let checkCart = addedProducts.find(
    (p) => p.id == product._id && p.color == color
  );
  if (checkCart != undefined) {
    checkCart.quantity = parseInt(checkCart.quantity) + parseInt(quantity);
  } else {
    addedProducts.push(data);
  }

  localStorage.setItem(CART_KEY, JSON.stringify(addedProducts));
}

// Récupérer produits dans le panier
function findProductsFromCart() {
  let testCart = localStorage.getItem(CART_KEY);
  // Vérification Panier
  if (testCart == null) {
    return [];
  } else {
    return JSON.parse(testCart);
  }
}

function isInt(x) {
  return parseInt(x) == x;
}
//Changement de quantité

function updateProductQuantityInCart(productId, color, quantity) {
  let products = findProductsFromCart();
  let foundProduct = products.find(
    (p) => p.id == productId && p.color == color
  );
  if (foundProduct != undefined) {
    foundProduct.quantity = parseInt(quantity);
    localStorage.setItem(CART_KEY, JSON.stringify(products));
  }
}

// Supprimer un produit du panier

function removeProductFromCart(article) {
  let productId = article.dataset.id;
  let color = article.dataset.color;
  let products = findProductsFromCart();
  products = products.filter((p) => p.id != productId && p.color != color);
  localStorage.setItem(CART_KEY, JSON.stringify(products));
  article.remove();
}

// Total des produits dans le panier et le prix
async function calculateNumberAndTotalPriceOfProductsInCart() {
  let products = findProductsFromCart();
  let number = 0;
  let total = 0;
  let p;

  for (let product of products) {
    number += product.quantity;
    p = await findProductById(product.id);
    console.log(p);
    total += product.quantity * p.price;
  }
  document.querySelector("#totalQuantity").textContent = number;
  document.querySelector("#totalPrice").textContent = formatPrice(total);
}

// Validation formulaire

function f_valid(firstName, firstName_m, firstName_v) {
  if (firstName.validity.valueMissing) {
    firstName_m.textContent = "Prénom manquant";
    firstName_m.style.color = "red";
    return false;
  } else if (firstName_v.test(firstName.value) == false) {
    firstName_m.textContent = "Format incorrect";
    firstName_m.style.color = "orange";
    return false;
  } else {
    return true;
  }
}

function lastName_valid(lastName, lastName_m, lastName_v) {
  if (lastName.validity.valueMissing) {
    lastName_m.textContent = "Nom manquant";
    lastName_m.style.color = "red";
    return false;
  } else if (lastName_v.test(lastName.value) == false) {
    lastName_m.textContent = "Format incorrect";
    lastName_m.style.color = "orange";
    return false;
  } else {
    return true;
  }
}

function address_valid(address, address_m) {
  if (address.validity.valueMissing) {
    address_m.textContent = "Adresse manquante";
    address_m.style.color = "red";
    return false;
  } else {
    return true;
  }
}

function city_valid(city, city_m, city_v) {
  if (city.validity.valueMissing) {
    city_m.textContent = "Ville manquante";
    city_m.style.color = "red";
    return false;
  } else if (city_v.test(city.value) == false) {
    city_m.textContent = "Format incorrect";
    city_m.style.color = "orange";
    return false;
  } else {
    return true;
  }
}

function email_valid(email, email_m, email_v) {
  if (email.validity.valueMissing) {
    email_m.textContent = "E-mail manquant";
    email_m.style.color = "red";
    return false;
  } else if (email_v.test(email.value) == false) {
    email_m.textContent = "Format incorrect";
    email_m.style.color = "orange";
    return false;
  } else {
    return true;
  }
}

// Fonction qui permet de construire le code HTML de cart.html
function buildCartProductToHtml(product, color, quantity) {
  let article = document.createElement("article");
  let divImg = document.createElement("div");
  let img = document.createElement("img");
  let divContent = document.createElement("div");
  let divDescription = document.createElement("div");
  let h2ProductName = document.createElement("h2");
  let pColor = document.createElement("p");
  let pPrice = document.createElement("p");
  let divSettings = document.createElement("div");
  let divQuantity = document.createElement("div");
  let pQuantityLabel = document.createElement("p");
  let inputQuantity = document.createElement("input");
  let divDelete = document.createElement("div");
  let pDelete = document.createElement("p");

  article.classList.add("cart__item");
  article.setAttribute("data-id", product._id);
  article.setAttribute("data-color", color);

  divImg.classList.add("cart__item__img");

  img.setAttribute("src", product.imageUrl);
  img.setAttribute("alt", product.altTxt);

  divContent.classList.add("cart__item__content");

  divDescription.classList.add("cart__item__content__description");

  h2ProductName.textContent = product.name;

  pColor.textContent = color;

  pPrice.textContent = formatPrice(product.price) + " €";

  divSettings.classList.add("cart__item__content__settings");

  divQuantity.classList.add("cart__item__content__settings__quantity");

  pQuantityLabel.textContent = "Qté : ";

  inputQuantity.setAttribute("type", "number");
  inputQuantity.classList.add("itemQuantity");
  inputQuantity.setAttribute("name", "itemQuantity");
  inputQuantity.setAttribute("min", "1");
  inputQuantity.setAttribute("max", "100");
  inputQuantity.setAttribute("value", quantity);

  divDelete.classList.add("cart__item__content__settings__delete");

  pDelete.textContent = "Supprimer";
  pDelete.classList.add("deleteItem");

  divImg.append(img);
  divDescription.append(h2ProductName, pColor, pPrice);
  divQuantity.append(pQuantityLabel, inputQuantity);
  divDelete.append(pDelete);
  divSettings.append(divQuantity, divDelete);
  divContent.append(divDescription, divSettings);
  article.append(divImg, divContent);

  return article;
}

function checkColorAndQuantity(color, quantity) {
  if (
    color === undefined ||
    color === "" ||
    quantity === undefined ||
    quantity === "" ||
    quantity < 1 ||
    quantity > 100 ||
    !isInt(quantity)
  ) {
    return false;
  } else {
    return true;
  }
}

function checkQuantity(quantity) {
  if (
    quantity === undefined ||
    quantity === "" ||
    quantity < 1 ||
    quantity > 100 ||
    !isInt(quantity)
  ) {
    return false;
  } else {
    return true;
  }
}

//fonction permetant de retourner un tableau de tous les ID des produits du panier
function getProductIdsFromCart() {
  let ids = [];
  let arrayProducts = findProductsFromCart();
  arrayProducts.forEach((product) => {
    ids.push(product.id);
  });
  return ids;
}

// Mettre les values du formulaire dans un objet
function getContactInfo(firstName, lastName, address, city, email) {
  let contact = {
    firstName: firstName.value,
    lastName: lastName.value,
    address: address.value,
    city: city.value,
    email: email.value,
  };
  return contact;
}

async function order(productIds, contact) {
  let response = await fetch(`${BASE_URL}/order`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },

    //make sure to serialize your JSON body
    body: JSON.stringify({
      contact: contact,
      products: productIds,
    }),
  });
  return response.json();
}

// contact : object qui récupère les réponses du formulaire firstName.value (f)
// order : fonction pour passer la commande avec fect et "post" dans le body avec order
// window.location.href = "confirmation.html?orderId= "
