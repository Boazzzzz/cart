const addToCartButtons = document.querySelectorAll(".add-to-cart");
const cartBody = document.querySelector("#cart-body");
const cartTotalPrice = document.querySelector("#cart-total-price");
const clearCartButton = document.querySelector("#clear-cart");

let cart = [];

function addToCart(event) {
   const button = event.target;
   const name = button.dataset.name;
   const price = Number(button.dataset.price);

   const existingItem = cart.find((item) => item.name === name);
   if (existingItem) {
      existingItem.quantity++;
      existingItem.totalPrice = existingItem.quantity * price;
   } else {
      cart.push({
         name: name,
         price: price,
         quantity: 1,
         totalPrice: price,
      });
   }

   renderCart();
}

function removeFromCart(event) {
   const button = event.target;
   const name = button.dataset.name;

   const existingItem = cart.find((item) => item.name === name);
   if (existingItem) {
      if (existingItem.quantity === 1) {
         cart = cart.filter((item) => item.name !== name);
      } else {
         existingItem.quantity--;
         existingItem.totalPrice = existingItem.quantity;
         price;
      }
   }

   renderCart();
}

function clearCart() {
   cart = [];
   renderCart();
}

function renderCart() {
   // Clear cart body
   cartBody.innerHTML = "";
   // Render cart items
   cart.forEach((item) => {
      const row = document.createElement("tr");

      const nameCell = document.createElement("td");
      nameCell.textContent = item.name;
      row.appendChild(nameCell);

      const priceCell = document.createElement("td");
      priceCell.textContent = item.price;
      row.appendChild(priceCell);

      const quantityCell = document.createElement("td");
      quantityCell.textContent = item.quantity;
      row.appendChild(quantityCell);

      const totalPriceCell = document.createElement("td");
      totalPriceCell.textContent = item.totalPrice.toFixed(2);
      row.appendChild(totalPriceCell);

      const removeButtonCell = document.createElement("td");
      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.dataset.name = item.name;
      removeButton.addEventListener("click", removeFromCart);
      removeButtonCell.appendChild(removeButton);
      row.appendChild(removeButtonCell);

      cartBody.appendChild(row);
   });

   // Render cart total price
   const totalPrice = cart.reduce((total, item) => total + item.totalPrice, 0);
   cartTotalPrice.textContent = totalPrice.toFixed(2);
}

// Attach event listeners
addToCartButtons.forEach((button) => {
   button.addEventListener("click", addToCart);
});

clearCartButton.addEventListener("click", clearCart);
