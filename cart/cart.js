import { navbar, footer } from "../Component/navbar.js";

let navContainer = document.getElementById("nav");
// navContainer.innerHTML = navbar();

// let footerContainer = document.getElementById("footer");
// footerContainer.innerHTML = footer();

let cart_data = JSON.parse(localStorage.getItem("product-Arr")) || [];

// calcTotal();

var cartdata = document.getElementById("cartItem");

let getItem = document.getElementById("cartit");

function itemCount() {
  var item = cart_data.reduce(function (acc, curr) {
    console.log(curr);
    return acc + Number(curr.quantity);
  }, 0);
  console.log(item);
  getItem.textContent = item;

  localStorage.setItem("total-number-items", item);
  // console.log(item);
}

itemCount();

function disable() {
  let button = document.getElementById("ship");
  button.disabled = true;
  button.style.backgroundColor = "rgb(200, 197, 197)";
  button.style.color = "grey";

  let button2 = document.getElementById("paypal");
  button2.disabled = true;
  button2.style.backgroundColor = "rgb(200, 197, 197)";
  button2.style.color = "grey";
  button2.style.border = "none";
}

function able() {
  let button = document.getElementById("ship");
  button.disabled = false;
  button.style.backgroundColor = "rgb(207,17,44)";
  button.style.color = "white";

  let button2 = document.getElementById("paypal");
  button2.disabled = false;
  button2.style.backgroundColor = "white";
  button2.style.color = "black";
  button2.style.border = "2px solid black";
}

function check(cart_data) {
  if (cart_data.length === 0) {
    let h3 = document.createElement("h3");
    h3.textContent = "Your Basket is currently empty.";

    disable();

    let btn = document.createElement("button");
    btn.setAttribute("class", "gotoproduct");
    btn.textContent = "Shop New Arrivals";
    btn.setAttribute(
      "onclick",
      "window.location.href = '../category/category.html'"
    );

    cartdata.append(h3, btn);
  } else {
    able();
    addproduct(cart_data);
  }
}
// console.log(cart_data);

check(cart_data);

function addproduct(data) {
  cartdata.innerHTML = "";
  data.map(function (ele, index) {
    // console.log(ele);
    showProduct(ele, index);
    calcTotal();
  });
}

function showProduct(el, index) {
  let mainDiv = document.createElement("div");
  mainDiv.setAttribute("id", "main-container");

  let imagediv = document.createElement("div");
  imagediv.setAttribute("class", "image-div");

  let image = document.createElement("img");
  image.src = el.imageUrl;

  imagediv.append(image);

  let detaildiv = document.createElement("div");
  detaildiv.setAttribute("class", "detail-div");

  let companynameprice = document.createElement("div");
  companynameprice.setAttribute("class", "company-name-price");

  let companyname = document.createElement("h3");
  companyname.setAttribute("class", "brandname");
  companyname.textContent = el.brand;

  let price = document.createElement("h3");
  price.setAttribute("id", "price");
  price.textContent = `$${el.cost.toFixed(2)}`;

  console.log(el.cost);

  companynameprice.append(companyname, price);

  let despdiv = document.createElement("div");
  despdiv.setAttribute("class", "desp-div");

  let desp = document.createElement("p");
  desp.setAttribute("class", "p1");
  desp.textContent = el.name;

  let id = document.createElement("p");
  id.textContent = "ITEM 2341081";

  let size = document.createElement("p");
  size.setAttribute("id", "p");
  size.textContent = `Rating : ${el.rating}/5`;

  despdiv.append(desp, id, size);

  let quanmethoddiv = document.createElement("div");
  quanmethoddiv.setAttribute("id", "quan-method-div");

  let qmrdiv = document.createElement("div");
  qmrdiv.setAttribute("id", "qmr-div");

  let quandiv = document.createElement("div");

  let select = document.createElement("select");
  select.setAttribute("id", "quan-num");
  select.addEventListener("change", function () {
    handleQuantityNumber(el, select.value, price);
  });

  for (var i = 1; i <= 10; i++) {
    let opt = document.createElement("option");
    opt.textContent = i;
    opt.value = i;
    if (i === el.quantity) {
      opt.selected = "selected";
      let num = el.quantity * el.cost;
      document.getElementById("mrptotal").textContent = num;
      localStorage.setItem("mrp-total", num);
      document.getElementById("totalamt").textContent = num;
      localStorage.setItem("estimated-amount", num);
      price.textContent = `$${num.toFixed(2)}`;
      // document.getElementById("cartit").textContent = el.quantity;
    }
    select.append(opt);
  }

  quandiv.append(select);

  let removediv = document.createElement("div");
  removediv.setAttribute("class", "remove-div");

  let move = document.createElement("a");
  move.textContent = "Move to Loves";

  let singalline = document.createElement("p");
  singalline.textContent = "|";

  let remove = document.createElement("a");
  remove.textContent = "Remove";
  remove.addEventListener("click", function () {
    deleteFun(index);
  });

  removediv.append(move, singalline, remove);

  qmrdiv.append(quandiv, removediv);

  let method = document.createElement("button");
  method.setAttribute("class", "btnmethod");
  method.textContent = "Change Method";

  quanmethoddiv.append(qmrdiv, method);

  detaildiv.append(companynameprice, despdiv, quanmethoddiv);

  mainDiv.append(imagediv, detaildiv);

  let hr = document.createElement("hr");
  hr.setAttribute("class", "hr");

  cartdata.append(hr, mainDiv);
}

function deleteFun(index) {
  var remaining = cart_data.splice(index, 1);
  console.log(remaining);
  localStorage.setItem("cart", JSON.stringify(cart_data));
  addproduct(cart_data);
  calcTotal();
  itemCount();
  check(cart_data);
  localStorage.setItem("promo-code", "masai30");
  localStorage.setItem("product-Arr", JSON.stringify(cart_data));
  document.getElementById("adddiscount").innerText = "0";

  // document.getElementById("lblCartCount").textContent = cart_data.length;
}

function handleQuantityNumber(ele, select, price2) {
  ele.quantity = Number(select);
  let num = ele.quantity * ele.cost;
  let n = num.toFixed(2);
  price2.textContent = `$${n}`;
  calcTotal();
  itemCount();
  localStorage.setItem("product-Arr", JSON.stringify(cart_data));
  localStorage.setItem("promo-code", "masai30");
  document.getElementById("adddiscount").innerText = "0";
}

function calcTotal() {
  let total = cart_data.reduce(function (acc, curr) {
    return acc + Number(curr.cost * curr.quantity);
  }, 0);

  let num = total.toFixed(2);

  document.getElementById("mrptotal").textContent = Number(num);
  localStorage.setItem("mrp-total", num);
  document.getElementById("totalamt").textContent = Number(num);
  localStorage.setItem("estimated-amount", num);
  // console.log(total);
}

// Promo Code

var apply = document.getElementById("apply");
apply.addEventListener("click", function () {
  checkcode();
  document.getElementById("code").value = "";
});
localStorage.setItem("promo-code", "masai30");
function checkcode() {
  var code = document.getElementById("code").value;
  var a = localStorage.getItem("promo-code");

  if (code === a) {
    alert("Congrats you have got 30% discount");
    var num = Number(document.getElementById("totalamt").textContent);
    // console.log(num);
    var remain = (num * 30) / 100;
    document.getElementById("adddiscount").textContent = remain.toFixed(2);

    var demo = remain.toFixed(2);
    localStorage.setItem("additional-discount", demo);

    var NUM = Number(num - remain).toFixed(2);
    // document.getElementById("total-amt").textContent = NUM;
    localStorage.setItem("estimated-amount", NUM);
    document.getElementById("totalamt").innerText = NUM;

    // localStorage.setItem("Amount", NUM);
    localStorage.setItem("promo-code", "!@#$%^&*&^%##%$");
  } else {
    alert("Invalid Promo Code / Already applied promo code to the Total Price");
  }
}

// Add these under $15

var products = [
  {
    quantity: 1,
    name: "Total Coverage Original Sponge",
    cost: 12,
    brand: "SEPHORA COLLECTION",
    imageUrl:
      "https://www.sephora.com/productimages/sku/s2497212-main-zoom.jpg?pb=2020-03-sephora-value-2020&imwidth=97",
    rating: 3,
  },
  {
    quantity: 1,
    name: "Big By Definition Defining & Volumizing Mascara",
    cost: 10,
    brand: "KAJA",
    imageUrl:
      "https://www.sephora.com/productimages/sku/s2464048-main-zoom.jpg?pb=2020-03-sephora-value-2020&imwidth=97",
    rating: 2,
  },
  {
    quantity: 1,
    name: "Long Lasting Eyeliner High Precision Brush",
    cost: 9,
    brand: "LAKME",
    imageUrl:
      "https://www.sephora.com/productimages/sku/s1370766-main-zoom.jpg?pb=2020-03-sephora-value-2020&imwidth=97",
    rating: 1,
  },
];

addUnderRange(products);

function addUnderRange(data) {
  data.map(function (el, index) {
    showUnderRange(el, index);
  });
}

function showUnderRange(el, index) {
  let mainDiv = document.createElement("div");
  mainDiv.setAttribute("id", "main-container");

  let imagediv = document.createElement("div");
  imagediv.setAttribute("class", "image-div");

  let image = document.createElement("img");
  image.src = el.imageUrl;

  imagediv.append(image);

  let detaildiv = document.createElement("div");
  detaildiv.setAttribute("class", "detail-div");

  let companynameprice = document.createElement("div");
  companynameprice.setAttribute("class", "company-name-price");

  let companyname = document.createElement("h3");
  companyname.setAttribute("class", "brandname");
  companyname.textContent = el.brand;

  let price = document.createElement("h3");
  price.setAttribute("id", "price");
  price.textContent = `$${el.cost}`;

  companynameprice.append(companyname, price);

  let despdiv = document.createElement("div");
  despdiv.setAttribute("class", "desp-div");

  let desp = document.createElement("p");
  desp.setAttribute("class", "p1");
  desp.textContent = el.name;

  let id = document.createElement("p");
  id.textContent = "ITEM 2341081";

  let size = document.createElement("p");
  size.setAttribute("id", "p");
  size.textContent = `Rating : ${el.rating}/5`;

  despdiv.append(desp, id, size);

  let btnDiv = document.createElement("div");
  btnDiv.setAttribute("id", "btn-div2");

  let btn = document.createElement("button");
  btn.setAttribute("id", "addbtn");
  btn.textContent = "Add";
  btn.addEventListener("click", function () {
    addtoCartList(el, btn);
  });

  btnDiv.append(btn);

  detaildiv.append(companynameprice, despdiv, btnDiv);

  mainDiv.append(imagediv, detaildiv);

  let hr = document.createElement("hr");
  hr.setAttribute("class", "hr1");

  document.getElementById("displayCheapProduct").append(mainDiv, hr);
}

function addtoCartList(item, btn) {
  btn.textContent = "Added";
  cart_data.push(item);
  localStorage.setItem("product-Arr", JSON.stringify(cart_data));
  // document.getElementById("cartitem").textContent =
  check(cart_data);
  itemCount();
}

// cartitem

// slider

// let prevBtn = [...document.querySelectorAll(".prev")];
// let nextBtn = [...document.querySelectorAll(".next")];

let mainContainer = document.querySelector(".product__slider__container");

let chosenForYou = [
  {
    imageUrl:
      "https://www.sephora.com/productimages/sku/s2031375-main-zoom.jpg?pb=2020-03-allure-best-2019&imwidth=122",
    brand: "The Ordinary",
    name: "Hyaluronic Acid 2% + B5 Hydrating Serum",
    cost: 20,
    quantity: 1,
  },
  {
    imageUrl:
      "https://www.sephora.com/productimages/sku/s2421337-main-zoom.jpg?imwidth=122",
    brand: "Paula's Choice",
    name: "C15 Vitamin C Super Booster",
    cost: 15,
    quantity: 1,
  },
  {
    imageUrl:
      "https://www.sephora.com/productimages/sku/s1395011-main-zoom.jpg?pb=2020-03-sephora-value-2020&imwidth=122",
    brand: "SEPHORA COLLECTION",
    name: "Sephora Colorful® Waterproof Eyeshadow & Eyeliner Multi-Stick",
    cost: 35,
    quantity: 1,
  },
];

displayProductSlider(chosenForYou, mainContainer);

function displayProductSlider(arr, parentNode) {
  let areaHidden = document.createElement("li");
  areaHidden.className = "area-hidden";

  arr.forEach((e, i) => {
    let li = document.createElement("li");
    li.setAttribute("class", "product__slider__item");

    let a = document.createElement("a");
    a.setAttribute("class", "product-link-container");

    let topContainer = document.createElement("div");
    topContainer.setAttribute("class", "product-top-container");

    let imgContainer = document.createElement("div");
    imgContainer.setAttribute("class", "product-img-container");

    let productImg = document.createElement("img");
    productImg.src = e.imageUrl;

    imgContainer.append(productImg);

    let btnContainer = document.createElement("div");
    btnContainer.setAttribute("class", "quicklook-btn-container");

    let quicklookBtn = document.createElement("button");
    quicklookBtn.setAttribute("class", "quicklook-Btn");
    quicklookBtn.textContent = "Quicklook";

    btnContainer.append(quicklookBtn);

    topContainer.append(imgContainer, btnContainer);

    let bottomContainer = document.createElement("div");
    bottomContainer.setAttribute("class", "product-bottom-container");

    let categoryNameContainer = document.createElement("div");
    categoryNameContainer.setAttribute("class", "cat-name-container");

    let brandName = document.createElement("span");
    brandName.setAttribute("class", "product-brand");
    brandName.textContent = e.brand;

    let productName = document.createElement("span");
    productName.setAttribute("class", "product-name");
    productName.textContent = e.name;

    categoryNameContainer.append(brandName, productName);

    bottomContainer.append(categoryNameContainer);

    a.append(topContainer, bottomContainer);

    li.append(a);

    parentNode.append(li);

    li.addEventListener("click", function () {
      viewdescription(e);
    });
  });

  parentNode.append(areaHidden);
}

function viewdescription(ele) {
  // calcTotal();
  localStorage.setItem("productObj", JSON.stringify(ele));
  console.log(ele);
  location.href = "../productdescription/description.html";
}

// for product slider

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

// Cart js

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

// Black Navbar
let navCategoryArr = document.querySelectorAll(".nav-category-items");

navCategoryArr.forEach((e)=>{
    e.addEventListener("click", (event)=>{
        // event.preventDefault();
         let catName =  event.target.textContent
         localStorage.setItem("category",catName);
    })
})

