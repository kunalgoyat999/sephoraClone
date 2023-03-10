import {
  navbar,
  footer,
  star4,
  star3,
  star2,
  star1,
  star5,
} from "../Component/navbar.js";

import { heart } from "./util.js";

// let navContainer = document.getElementById("nav");
// navContainer.innerHTML = navbar();

// let footerContainer = document.getElementById("footer");
// footerContainer.innerHTML = footer();

let leftContainer = document.getElementById("leftimgcontainer");

let rightContainer = document.getElementById("rightdetailcontainer");

var obj = JSON.parse(localStorage.getItem("productObj")) || {};

displayProduct(obj);

function displayProduct(data) {
  let image = document.createElement("img");
  image.setAttribute("id", "prodimg");
  image.src = data.imageUrl;

  leftContainer.append(image);

  let brand = document.createElement("h4");
  brand.setAttribute("id", "brand-name");
  brand.textContent = data.brand;

  let prod = document.createElement("p");
  prod.setAttribute("id", "productname");
  prod.textContent = data.name;

  let ratinglike = document.createElement("div");
  ratinglike.setAttribute("id", "ratinglike");

  var ratingdiv = document.createElement("div");
  ratingdiv.setAttribute("id", "rating-div");

  var ratNum = Number(data.rating);
  if (ratNum === 1) {
    ratingdiv.innerHTML = star1();
  } else if (ratNum === 2) {
    ratingdiv.innerHTML = star2();
  } else if (ratNum === 3) {
    ratingdiv.innerHTML = star3();
  } else if (ratNum === 4) {
    ratingdiv.innerHTML = star4();
  } else {
    ratingdiv.innerHTML = star5();
  }

  let h5 = document.createElement("h5");
  h5.textContent = "107 | Ask a question |";

  let likediv = document.createElement("div");
  likediv.innerHTML = heart();

  ratinglike.append(ratingdiv, h5, likediv);

  let pricepara = document.createElement("div");
  pricepara.setAttribute("id", "price-para");

  let price = document.createElement("h2");
  price.setAttribute("id", "price");
  price.textContent = `$${data.cost}`;

  let remain = data.cost - (5 * data.cost) / 100;

  let para = document.createElement("p");
  para.innerHTML = `get it for <b> ${remain} (5% Off) </b> with Auto-Replenish`;

  pricepara.append(price, para);

  document
    .getElementById("carddetail")
    .append(brand, prod, ratinglike, pricepara);
}

let select = document.getElementById("selectquan");
select.addEventListener("change", function () {
  let val = select.value;
  obj.quantity = Number(val) || 1;
  console.log(obj);
});

let newArr = JSON.parse(localStorage.getItem("product-Arr")) || [];

let arrObj = document.getElementById("addtocart-btn");
arrObj.addEventListener("click", function () {
  document.getElementById("itemsuccess").innerText = "Product Added to Basket!";
  newArr.push(obj);
  localStorage.setItem("product-Arr", JSON.stringify(newArr));
});

// / Login Modal below ////////////////////////////////////////////////////

// Get the modal
var loginModal = document.getElementById("loginModal");

// Get the button that opens the modal
var loginBtn = document.getElementById("loginBtn");

// Get the <span> element that closes the modal
var loginspan = document.getElementsByClassName("loginclose")[0];

// When the user clicks on the button, open the modal
loginBtn.onclick = function () {
  loginModal.style.visibility = "visible";
};

// When the user clicks on <span> (x), close the modal
loginspan.onclick = function () {
  loginModal.style.visibility = "hidden";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == loginModal) {
    loginModal.style.visibility = "hidden";
  }
};

// Signup Modal Below  ///////////////////////////////////////////

// Get the modal
var signupModal = document.getElementById("signupModal");

// Get the button that opens the modal
var signupBtn = document.getElementById("signupBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("signupclose")[0];

// When the user clicks on the button, open the modal
signupBtn.onclick = function () {
  signupModal.style.visibility = "visible";
  loginModal.style.visibility = "hidden";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  signupModal.style.visibility = "hidden";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == signupModal) {
    signupModal.style.visibility = "hidden";
  }
};

////// LOGIN FUNCTIONALITY BELOW  //////////////////////////////////////////////////////////////////

document.getElementById("signinBtn").addEventListener("click", signIn);

var regUser = JSON.parse(localStorage.getItem("userArr")) || [];
function signIn(e) {
  e.preventDefault();
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Please fill all the details");
  } else {
    for (var i = 0; i < regUser.length; i++) {
      if (regUser[i].email === email && regUser[i].password === password) {
        alert("Let's get Shopping");
        window.location.href = "index.html";
        return;
      } else if (email == "admin@gmail.com" && password == "admin") {
        alert("SignIn Sucessfully !");
        window.location.href = "index.html";
        return;
      }
    }
    alert("ERROR! Please check your E-Mail Id or Password again.");
  }
}

//  document.getElementById("dark").addEventListener("click", darkmode)

//////////  SIGNUP FUNCTIONALITY BELOW  /////////////////////////////////////////////

document.getElementById("joinBtn").addEventListener("click", userList);

var userArr = JSON.parse(localStorage.getItem("userArr")) || [];

function userList(e) {
  e.preventDefault();
  console.log("clicked");

  var firstName2 = document.getElementById("firstName2").value;
  var lastName2 = document.getElementById("lastName2").value;
  var email2 = document.getElementById("email2").value;
  var password2 = document.getElementById("password2").value;
  var zipcode2 = document.getElementById("zipcode2").value;
  if (!firstName2 || !lastName2 || !email2 || !password2 || !zipcode2) {
    alert("Please fill all your details");
  } else {
    var userObj = {
      firstName: firstName2,
      lastName: lastName2,
      email: email2,
      password: password2,
      zipcode: zipcode2,
    };

    userArr.push(userObj);
    localStorage.setItem("userArr", JSON.stringify(userArr));
    alert("Registered");
    window.location.href = "login.html";
  }
}

// cart js

let cartBtn = document.querySelector(".checkout-btn");

console.log(cartBtn);

cartBtn.addEventListener("click", () => {
  location.href = "../cart/cart.html";
});

let cartProductArr = JSON.parse(localStorage.getItem("product-Arr")) || [];

window.onload = () => {
  displayCartProducts(cartProductArr);
  isUserLogin();
};

function isUserLogin() {
  let isLogin = JSON.parse(localStorage.getItem("currUser")).isLogin;
  // console.log("loginUser==>",isLogin);
  let accountContainer = document.querySelector(".account-btn-container");
  let logoutContainer = document.querySelector(".logout-container");
  console.log(accountContainer, logoutContainer);

  if (isLogin) {
    let userName = document.getElementById("userName-login");
    let userNameMain = document.getElementById("loginUser-main");
    let msgTxt = document.getElementById("loginUser-msg");
    let userEmail = document.getElementById("email-loginUser");

    let currUserObj = JSON.parse(localStorage.getItem("currUser"));
    console.log("loginUser==>", currUserObj);

    userName.textContent = `${currUserObj.firstName}. 🌙`;
    userName.style.fontSize = "1.2rem";
    userName.style.color = "#CF112C";
    userName.style.textTransform = "capitalize";

    userNameMain.textContent = currUserObj.firstName;
    msgTxt.textContent = "Enjoy Free Shipping";

    userEmail.textContent = `Email : ${currUserObj.email}`;
    userEmail.style.fontSize = "0.9rem";

    accountContainer.style.display = "none";
    logoutContainer.style.display = "initial";

    document.getElementById("logout-btn").addEventListener("click", () => {
      currUserObj.isLogin = false;
      localStorage.setItem("currUser", JSON.stringify(currUserObj));
      location.href = "../index.html";
    });
  } else {
    accountContainer.style.display = "grid";
    logoutContainer.style.display = "none";
  }
}

let cartContainer = document.getElementById("cartProductHolder");
let cartItemsCount = document.getElementById("cart-total-items");
let cartSum = document.getElementById("cart-total-price");

function displayCartProducts(arr) {
  cartContainer.textContent = "";

  if (arr.length == 0) {
    let h3 = document.createElement("h3");
    h3.textContent = "No items in Cart!";

    let divider = document.createElement("div");
    divider.setAttribute("class", "divider-header");
    cartContainer.append(h3, divider);
  }

  cartItemsCount.textContent = "( " + arr.length + " items )";

  document.getElementById("cart-item-count").textContent = arr.length;

  let totalValue = 0;

  arr.forEach((e, index) => {
    let productContainer = document.createElement("div");
    productContainer.setAttribute(
      "class",
      "popup-items-container mid-product-container"
    );
    // productContainer.setAttribute("class","mid-product-container");

    let productImg = document.createElement("div");
    productImg.setAttribute("class", "cart-product-img");
    let img = document.createElement("img");
    img.src = e.imageUrl;

    productImg.append(img);

    let productMeta = document.createElement("div");
    productMeta.setAttribute("class", "cart-product-meta");

    let productName = document.createElement("span");
    productName.setAttribute("class", "cart-product-name");
    productName.innerHTML = `<strong>${e.name}</strong>`;
    let productDesciption = document.createElement("span");
    productDesciption.setAttribute("class", "cart-product-description");
    productDesciption.textContent = e.name;

    productMeta.append(productName, productDesciption);

    let priceRemoveContainer = document.createElement("div");
    priceRemoveContainer.setAttribute("class", "price-remove");

    let productPrice = document.createElement("span");
    productPrice.setAttribute("class", "cart-product-price");
    productPrice.textContent = "$" + e.cost;

    totalValue += e.cost;

    let productRemove = document.createElement("span");
    productRemove.setAttribute("class", "cart-product-remove");
    productRemove.textContent = "Remove";

    productRemove.addEventListener("click", () => {
      removeItem(index);
    });

    priceRemoveContainer.append(productPrice, productRemove);

    let divider = document.createElement("div");
    divider.setAttribute("class", "divider-thin-header");

    productContainer.append(
      productImg,
      productMeta,
      priceRemoveContainer,
      divider
    );

    cartContainer.append(productContainer);
  });

  cartSum.textContent = "$ " + totalValue;
}

// remove from cart

function removeItem(i) {
  console.log(i);
  cartProductArr.splice(i, 1);
  localStorage.setItem("product-Arr", JSON.stringify(cartProductArr));
  displayCartProducts(cartProductArr);
  console.log(cartProductArr);
}
