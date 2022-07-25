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

async function findProductById(id) {
  new URL(location.href).searchParams.get("id");
}

function buildDetailsOfProduct(product) {}

function buildOptionColorToHtml(color) {}
