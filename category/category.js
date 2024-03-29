import { star4, star3, star2, star1, star5 } from "../Component/navbar.js";

let navbarContainer =document.getElementById("nav");
let topBanner =document.getElementById("topBanner-header");


// sticky navbar

let top = topBanner.offsetHeight;
function stickynavbar() {
  if (window.scrollY >= top) {    
    navbarContainer.classList.add('sticky');
    document.getElementById("topBanner-header").style.display ="none";
  } else {
    navbarContainer.classList.remove('sticky');  
    document.getElementById("topBanner-header").style.display ="block";  
  }
}
window.addEventListener('scroll', stickynavbar);

let label1 = document.getElementById("label1");
label1.innerHTML = star4();

let label2 = document.getElementById("label2");
label2.innerHTML = star3();

let label3 = document.getElementById("label3");
label3.innerHTML = star2();

let label4 = document.getElementById("label4");
label4.innerHTML = star1();

// Get Data
let category = localStorage.getItem("category") || "";
// let category = "eyePrimer";
let url = `https://morning-inquisitive-dime.glitch.me/${category}`;
// let url = `http://localhost:3000/${category}`;

async function getData(url) {
  try {
    let res = await fetch(url);
    let data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function init(url) {
  try {
    let data = await getData(url);
    displayData(data);
  } catch (error) {
    console.log(error);
  }
}
init(url);

// Sort Functionality
document.getElementById("sort").addEventListener("click", function () {
  let value = document.getElementById("sort").value;
  if (value === "lth") {
    init(`${url}/?_sort=cost&_order=asc`);
  } else if (value === "htl") {
    init(`${url}/?_sort=cost&_order=desc`);
  }
});

// Filter Data
let radbtn = document.querySelectorAll(".radbutton");
radbtn.forEach((ele) => {
  ele.addEventListener("click", function () {
    if (ele.value == 25) {
      init(`${url}/?cost_gte=0&cost_lte=25`);
    } else if (ele.value == 50) {
      init(`${url}/?cost_gte=26&cost_lte=50`);
    } else if (ele.value == 100) {
      init(`${url}/?cost_gte=51&cost_lte=100`);
    } else {
      init(`${url}/?cost_gte=100`);
    }
  });
});

let ratbtn = document.querySelectorAll(".ratingbtn");
ratbtn.forEach((ele) => {
  ele.addEventListener("click", function () {
    let val = ele.value;
    if (val == 1) {
      init(`${url}/?rating_gte=0&rating_lte=1`);
    } else if (val == 2) {
      init(`${url}/?rating_gte=1.1&rating_lte=2`);
    } else if (val == 3) {
      init(`${url}/?rating_gte=2.1&rating_lte=3`);
    } else {
      init(`${url}/?rating_gte=4`);
    }
  });
});

let labelarr = [];
// Display Data
function displayData(data) {
  document.getElementById("categoryName").textContent = category;
  let count = document.getElementById("count");
  count.textContent = data.length + " Results";
  document.getElementById("bottom").textContent = "";
  data.forEach((ele) => {
    let prodBox = document.createElement("div");
    prodBox.setAttribute("id", "prod-box");

    let imgContainer = document.createElement("div");
    imgContainer.setAttribute("class", "image-container");
    let heart = document.createElement("i");
    heart.setAttribute("class", "fa-regular fa-heart");
    heart.setAttribute("id", "heart-overlay");
    let img = document.createElement("img");
    img.src = ele.imageUrl;
    img.onload = function () {
      let container = document.querySelectorAll("#prod-box");
      container.forEach((ele) => {
        ele.style.width = this.width + "px";
      });
    };
    let overlay = document.createElement("div");
    overlay.setAttribute("class", "overlay");
    overlay.textContent = "Quicklook";
    imgContainer.append(heart, img, overlay);

    let h5 = document.createElement("h5");
    h5.textContent = ele.brand;
    let p = document.createElement("p");
    p.textContent = ele.name;

    let ratingdiv = document.createElement("div");
    let ratNum = Number(ele.rating);
    if (ratNum > 4) {
      ratingdiv.innerHTML = star5();
    } else if (ratNum == 4) {
      ratingdiv.innerHTML = star4();
    } else if (ratNum < 4 && ratNum >= 3) {
      ratingdiv.innerHTML = star3();
    } else if (ratNum < 3 && ratNum >= 2) {
      ratingdiv.innerHTML = star2();
    } else if (ratNum < 2 && ratNum >= 1) {
      ratingdiv.innerHTML = star1();
    } else {
      ratingdiv.innerHTML = star1();
    }

    let h4 = document.createElement("h4");
    h4.textContent = "$ " + ele.cost;

    prodBox.append(imgContainer, h5, p, ratingdiv, h4);
    document.getElementById("bottom").append(prodBox);

    // Left Container Brand Filter
    let inputCheck;
    let label;
    let br;

    if (!labelarr.includes(ele.brand)) {
      labelarr.push(ele.brand);

      inputCheck = document.createElement("input");
      label = document.createElement("label");

      inputCheck.setAttribute("type", "radio");
      inputCheck.setAttribute("name", "fav_language");
      inputCheck.setAttribute("class", "brandbuttn");

      label.setAttribute("for", "html");
      label.textContent = ele.brand;
      br = document.createElement("br");
      inputCheck.addEventListener("click", function () {
        init(`${url}/?brand=${label.textContent}`);
      });
    }
    if (inputCheck === undefined || label === undefined || br === undefined) {
      inputCheck = document.createElement("p");
      label = document.createElement("p");
      br = document.createElement("p");
    }

    if (document.querySelector("#container-body1 p")) {
      let ptag = document.querySelector("#container-body1 p");
      ptag.remove();
    }

    document.getElementById("container-body1").append(inputCheck, label, br);

    prodBox.addEventListener("click", function () {
      localStorage.setItem("productObj", JSON.stringify(ele));
      location.href = "../productdescription/description.html";
    });
  });
}

let contHead = document.querySelectorAll(".containerhead");
contHead.forEach((ele, index) => {
  ele.addEventListener("click", function () {
    let child = document.querySelectorAll(".containerbody");
    child.forEach((ele, i) => {
      if (index == i) {
        if (ele.style.display == "block") {
          ele.style.display = "none";
        } else {
          ele.style.display = "block";
        }
      }
    });
  });
});

// let contHead1 = document.querySelector("#container-body1");
// contHead1.addEventListener("click", function () {
//   if (contHead1.style.display == "block") {
//     contHead1.style.display = "none";
//   } else {
//     contHead1.style.display = "block";
//   }
// });

// Login Modal below /; ///////////////////////////////////////////////////

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

// Cart

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

