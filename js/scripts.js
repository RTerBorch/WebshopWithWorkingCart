// loads json and for each element, call upon buildProductCard
function loadJSON() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://fakestoreapi.com/products");
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const json = JSON.parse(xhr.response);

      json.forEach((element) => {
        buildProductCard(element);
      });
    }
  };

  // Load local storage into cart
  const savedCart = localStorage.getItem("customerCart");
  if (savedCart) {
    customerCart = JSON.parse(savedCart);
    renderCartItems();
    cartCount.textContent = cartCounter();
  }
}

// Builds all the product cards with json
function buildProductCard(json) {
  document.getElementById("output").innerHTML += `
        <div class="col-md-3 mb-5">
        <div class="card h-100">
    
            <!-- Product image-->
            <a target="_blank" href="${json.image}">
            <img class="our-images card-img-top" src=${json.image} alt="..." />
            </a>
    
            <!-- Product details-->
            <div class="card-body p-4">
                <div class="text-center">
                    <!-- Product name-->
                    <h5 class="fw-bolder">${json.title}</h5>
    
                </div>
            </div>
            <!-- Product actions-->
            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
    
            <!--Product Info-->
            <div class="overflow"> ${json.description}</div>
                
                 <br>
                 <!-- Product price-->
                 <div class="text-center">$${json.price}</div> 
                 
                 <div class="text-center"><a class="btn btn-outline-dark mt-auto" onclick="addToCartById(${json.id}); console.log('Clicked product'); 
                 ">add to cart</a></div>
                 </div>
        </div>
    </div>
    `;
}

const cartButton = document.getElementById("cartBtn");
const cart = document.getElementById("cart");
const cartCount = document.getElementById("cartCount");
const productsInCart = document.getElementById("productsInCart");
let customerCart = [];

cartButton.addEventListener("click", showCart);

function showCart() {
  console.log("Clicked cart");

  if (cart.style.display === "none") {
    cart.style.display = "block";
  } else {
    cart.style.display = "none";
  }
}

// Adds the jSon id to array
function updateCartCount() {
  customerCart.push(jasonId);
  cartCount.textContent = customerCart.length;

  console.log(customerCart);
}

// Fetch specific item by the item ID and add to cart
function addToCartById(id) {
  const productId = id;

  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((products) => {
      const product = products.find((p) => p.id === productId);
      if (product) {
        // Check if product is already in the cart
        const existingProductIndex = customerCart.findIndex(
          (p) => p.id === productId
        );

        if (existingProductIndex >= 0) {
          // Product already in cart, increase amount
          customerCart[existingProductIndex].amount++;
        } else {
          // Product not in cart, add to cart
          customerCart.push({ ...product, amount: 1 });
        }

        // Saves cart to local storage
        localStorage.setItem("customerCart", JSON.stringify(customerCart));

        // Update the cart count
        const cartItemCount = customerCart.reduce(
          (total, item) => total + item.amount,
          0
        );
        cartCount.textContent = cartItemCount;

        // Update the UI
        renderCartItems();

        console.log(customerCart);
      } else {
        console.log(`Product with ID ${productId} not found.`);
      }
    })
    .catch((error) => console.error(error));
}

// Render cart items in the UI
function renderCartItems() {
  productsInCart.innerHTML = "";
  let totalPrice = 0;

  customerCart.forEach((product, index) => {
    totalPrice += product.price * product.amount;
    productsInCart.innerHTML += `
      <li>
        <img src="${product.image}" alt="${product.title}" 
        style="width: 50px; height: 50px;">
        ${product.title} - ${product.price} - Amount:
        <button onclick="decreaseAmount(${index})">-</button>
        ${product.amount}
        <button onclick="increaseAmount(${index})">+</button>
      </li>
    `;
  });
  productsInCart.innerHTML += `<button class="btn btn-outline-primary" 
  onclick="checkout()">Checkout</button> <button class="btn btn-outline-danger btn-sm" 
  onclick="clearCart()">Clear</button>`;

  // Update the total price
  document.getElementById("cartTotal").textContent = `$${totalPrice.toFixed(
    2
  )}`;
}

// Decrease the amount of a product in the cart
function decreaseAmount(index) {
  if (customerCart[index].amount > 1) {
    customerCart[index].amount--;
  } else {
    customerCart.splice(index, 1);
  }
  updateCart();
}

// Increase the amount of a product in the cart
function increaseAmount(index) {
  customerCart[index].amount++;
  updateCart();
}

// updates cartCount with the right amount, also saves cart in localStorage
function updateCart() {
  cartCount.textContent = cartCounter();
  console.log(customerCart.length);
  localStorage.setItem("customerCart", JSON.stringify(customerCart));

  renderCartItems();
}

// count all the items per index and return that amount
function cartCounter() {
  let itemAmount = 0;
  customerCart.forEach((product) => {
    itemAmount += product.amount;
  });
  return itemAmount;
}

// Removes content of cart
function clearCart() {
  customerCart = [];
  updateCart();
}

// Redirect to the checkout page
function checkout() {
  const customerCart = JSON.parse(localStorage.getItem("customerCart"));

  if (customerCart.length > 0) {
    setTimeout(() => {
      window.location.href = "checkout.html";
    }, 500);
  } else {
    alert("Your cart is empty!");
  }
  console.log(customerCart);
}
