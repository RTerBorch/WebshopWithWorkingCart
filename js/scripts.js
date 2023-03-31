// loads json and for each element, call upon buildProductCard
function loadJSON() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://fakestoreapi.com/products");
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const json = JSON.parse(xhr.response);

      json.forEach((element) => {
        buildProduktCard(element);
      });
    }
  };
}

// Builds all the product cards with json
function buildProduktCard(json) {
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
                 
                 <div class="text-center"><a class="btn btn-outline-dark mt-auto" onclick="addToCart(${json.id}); console.log('Clicked product'); 
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

function addToCart(jasonId) {
  customerCart.push(jasonId);
  cartCount.textContent = customerCart.length;

  let testTxt = ""

  customerCart.forEach(element => {
    testTxt+= element+"<br>"
  });

  productsInCart.textContent = testTxt;
}
