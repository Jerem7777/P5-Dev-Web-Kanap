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
    quantity: quantity,
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

// Fonction qui permet de construire le code HTML de cart.html
function buildCartProductToHtml(product) {
  let article = document.createElement("article");
  let img = document.createElement("img");
  let h2 = document.createElement("h2");
  let p = document.createElement("p");

  article.classList.add(cart__item);

  div.classList.add("cart__item__img");

  img.setAttribute("src", product.imageUrl);
  img.setAttribute("alt", product.altTxt);

  div.classList.add("cart__item__content");
  div.classList.add("cart__item__content__description")(
    (h2.textContent = product.name)((p.textContent = color))(
      (p.textContent = price)
    )
  ),
    div.classList.add("cart__item__content__settings");
  div.classList.add("cart__item__content__settings__quantity");
  p.quantity(quantity);
  input.classList.add("itemQuantity");

  div.classList.add("cart__item__content__settings__delete");

  article.append(div);
  article.append(img);
  article.append(h2);
  article.append(p);

  return article;
}

//Changement de quantité

function changeQuantity(product, quantity) {
  let findProductsFromCart = getfindProductsFromCart();
  let foundProduct = basket.find((p) => p.id == product.id);
  if (foundProduct != undefined) {
    foundProduct.quantity += quantity;
  }
}

// Supprimer du panier

function removeFromBasket(product) {
  let findProductsFromCart = getfindProductsFromCart();
  basket = basket.filter((p) => p.id != product.id);
  savefindProductsFromCart(basket);
}

// Total des produits dans le panier
function getNumberProduct()
let findProductsFromCart = getfindProductsFromCart();{
let number = 0;
for (let product of findProductsFromCart) {
  number += product.quantity;
}
return number;
}

// Prix total

function getTotalPrice()
let findProductsFromCart = getfindProductsFromCart();{
let total = 0;
for (let product of findProductsFromCart) {
  total += product.quantity * product.price;
}
return total;
}