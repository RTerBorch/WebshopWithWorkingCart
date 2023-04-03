function loadCheckoutItems() {
  const customerCart = JSON.parse(localStorage.getItem("customerCart"));
  console.log(customerCart);
  let totalAmount = 0;
  let totalPrice = 0;

  for (i = 0; i < customerCart.length; i++) {
    totalAmount += customerCart[i].amount;
    totalPrice += customerCart[i].price * customerCart[i].amount;

    document.getElementById("cart-items").innerHTML +=
      "<div class='row mt-1 pb-1 border-bottom'>" +
      "<img class='col-2' style='width: 80px;' src='" +
      customerCart[i].image +
      "'>" +
      "<div class='d-flex align-items-center col-8'>" +
      customerCart[i].title +
      "</div>" +
      "<div class='d-flex align-items-center col-1'>" +
      customerCart[i].amount +
      "</div>" +
      "<div class='d-flex align-items-center col-1'>$" +
      customerCart[i].price +
      "</div>";
  }
  document.getElementById("cart-count").innerHTML = totalAmount;
  document.getElementById("cart-total").innerHTML = "$" + totalPrice.toFixed(2);
}

document.getElementById("checkout").addEventListener("click", save);

document.getElementById("order-css").addEventListener("input", validate);

function validate() {
  if (
    document.getElementById("name").value.length < 2 ||
    document.getElementById("name").value.length > 50
  ) {
    document.getElementById("error-name").style.display = "block";
    return false;
  } else {
    document.getElementById("error-name").style.display = "none";
  }

  const mailPattern = /@/;

  if (
    !mailPattern.test(document.getElementById("e-mail").value) ||
    document.getElementById("e-mail").value.length > 50
  ) {
    document.getElementById("error-e-mail").style.display = "block";
    return false;
  } else {
    document.getElementById("error-e-mail").style.display = "none";
  }

  const pattern = /^([+]46)\s*(7[0236])\s*(\d{4})\s*(\d{3})$/;

  if (!pattern.test(document.getElementById("phone").value)) {
    document.getElementById("error-phone").style.display = "block";
    return false;
  } else {
    document.getElementById("error-phone").style.display = "none";
  }

  if (document.getElementById("address").value.length > 50) {
    document.getElementById("error-address").style.display = "block";
    return false;
  } else {
    document.getElementById("error-address").style.display = "none";
  }

  const zipPattern = /^\d{3}\s\d{2}$/;

  if (!zipPattern.test(document.getElementById("zip-code").value)) {
    document.getElementById("error-zip-code").style.display = "block";
    return false;
  } else {
    document.getElementById("error-zip-code").style.display = "none";
  }

  if (document.getElementById("city").value.length > 50) {
    document.getElementById("error-city").style.display = "block";
    return false;
  } else {
    document.getElementById("error-city").style.display = "none";
  }

  console.log("rätt");

  return true;
}

function save() {
  if (validate()) {
    localStorage.setItem("name", document.getElementById("name").value);
    localStorage.setItem("e-mail", document.getElementById("e-mail").value);
    localStorage.setItem("phone", document.getElementById("phone").value);
    localStorage.setItem("address", document.getElementById("address").value);
    localStorage.setItem("zip-code", document.getElementById("zip-code").value);
    localStorage.setItem("city", document.getElementById("city").value);
    setTimeout(() => {
      window.location.href = "confirmation-page.html";
    }, 500);
  }
}

function confirmationPage() {
  // Item data
  const customerCart = JSON.parse(localStorage.getItem("customerCart"));

  let totalAmount = 0;
  let totalPrice = 0;
  for (i = 0; i < customerCart.length; i++) {
    totalAmount += customerCart[i].amount;
    totalPrice += customerCart[i].price * customerCart[i].amount;

    document.getElementById("products-container").innerHTML +=
      "<div class='row'>" +
      "<div id='product-name' class='col-6'>" +
      customerCart[i].title +
      "</div>" +
      "<div id='product-amount' class='col-3'>" +
      customerCart[i].amount +
      "</div>" +
      "<div id='price' class='col-3'>" +
      customerCart[i].price +
      "</div></div><br>";
  }
  document.getElementById("total-amount").innerHTML = totalAmount;
  document.getElementById("total-price").innerHTML =
    "$" + totalPrice.toFixed(2);

  // person data

  const name = document.getElementById("name");
  const email = document.getElementById("e-mail");
  const phone = document.getElementById("phone");
  const address = document.getElementById("address");
  const zipCode = document.getElementById("zip-code");
  const city = document.getElementById("city");

  address.textContent = localStorage.getItem("address");
  zipCode.textContent = localStorage.getItem("zip-code");
  city.textContent = localStorage.getItem("city");
  name.textContent = localStorage.getItem("name");
  email.textContent = localStorage.getItem("e-mail");
  phone.textContent = localStorage.getItem("phone");

  localStorage.clear();
}
