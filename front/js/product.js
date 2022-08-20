const params = new URLSearchParams(window.location.search);
let productId = params.get("id");
console.log("L'identifiant du produit est", productId);
let productsPromise = findProductById(productId);
productsPromise.then(function (product) {
  console.log(product);
  buildDetailsOfProduct(product);
  // On écoute ce qu'il se passe dans #colors
  let couleurProduit;
  let choixCouleur = document.querySelector("#colors");

  choixCouleur.addEventListener("input", (ec) => {
    // on récupère la valeur de la cible de l'évenement dans couleur
    couleurProduit = ec.target.value;
    console.log(couleurProduit);
  });

  // choix quantite dynamique
  //------------------------------------------------------------------------
  let choixquantite = document.querySelector('input[id="quantity"]');
  let quantiteProduit;
  // On écoute ce qu'il se passe dans input[name="itemQuantity"]
  choixquantite.addEventListener("input", (eq) => {
    // on récupère la valeur de la cible de l'évenement dans couleur
    quantiteProduit = eq.target.value;
    console.log(quantiteProduit);
  });

  let addToCartButton = document.querySelector("#addToCart");
  addToCartButton.addEventListener("click", function () {
    // Implémenter la logique pour ajouter le produit au panier en utilisant les fonctions qu'on a écrite dans le fichier function.js addProductToCart
    // récuper couleur choisi dans un select et la quantite dans l'input dans 2 variables ; check color ; check quantite si c est bien un nombre entre 1-100, si null marqué choisir la couleur ou un nombre entre 1-100. Si tout est ok appeler la function pour ajouter au panier
    //.......................................................................//

    if (
      couleurProduit === undefined ||
      couleurProduit === "" ||
      quantiteProduit === undefined ||
      quantiteProduit === "" ||
      quantiteProduit < 1 ||
      quantiteProduit > 100
    ) {
      // joue l'alerte
      alert(
        "Pour valider le choix de cet article, veuillez renseigner une couleur, et/ou une quantite valide entre 1 et 100"
      );
    } else {
      addProductToCart(product, couleurProduit, quantiteProduit);
      alert("Le produit a été ajouté au panier");
    }
    //------------------------------------------------------------------------
  });
});
