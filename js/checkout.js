function testing() {
  const customerCart = JSON.parse(localStorage.getItem("customerCart"));

  // Use the customerCart object as needed
  console.log(customerCart);

  const image = document.getElementById("product-img");
  const name = document.getElementById("product-name");
  const price = document.getElementById("product-price");
  const totalPrice = document.getElementById("total-price");
  const productInfo = document.getElementById("product-info");
  //product-info2

  const image2 = document.getElementById("product-img2");
  const name2 = document.getElementById("product-name2");
  const price2 = document.getElementById("product-price2");
  const totalPrice2 = document.getElementById("total-price2");
  const productInfo2 = document.getElementById("product-info2");

  productInfo.textContent = customerCart[0].description;
  image.src = customerCart[0].image
  price.textContent = `${customerCart[0].amount} x ${customerCart[0].price}`
  name.textContent = customerCart[0].title;
  totalPrice.textContent = "$2";

  productInfo2.textContent = customerCart[1].description;
  image2.src = customerCart[0].image
  price2.textContent = `${customerCart[0].amount} x ${customerCart[0].price}`
  name2.textContent = customerCart[0].title;
  totalPrice2.textContent = "$2";


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
      window.open("confirmation-page.html", "_blank");
    }, 500);
  }
}
