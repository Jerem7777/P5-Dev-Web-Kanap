const params = new URLSearchParams(window.location.search);
let orderId = params.get("orderId");
let orderHtml = document.querySelector("#orderId");
orderHtml.textContent = orderId;
localStorage.clear();
