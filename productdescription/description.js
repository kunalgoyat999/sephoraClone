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
arrObj.addEventListener("click",function(){
  document.getElementById("itemsuccess").innerText = "Product Added to Basket!";
  newArr.push(obj);
  localStorage.setItem("product-Arr",JSON.stringify(newArr));
})




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
}

// When the user clicks on <span> (x), close the modal
loginspan.onclick = function () {
    loginModal.style.visibility = "hidden";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == loginModal) {
        loginModal.style.visibility = "hidden";
    }
}



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
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    signupModal.style.visibility = "hidden";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == signupModal) {
        signupModal.style.visibility = "hidden";
    }
}


////// LOGIN FUNCTIONALITY BELOW  //////////////////////////////////////////////////////////////////


document.getElementById("signinBtn").addEventListener("click", signIn);

var regUser = JSON.parse(localStorage.getItem("userArr")) || [];
function signIn(e) {
    e.preventDefault();
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    if (!email || !password) {
        alert("Please fill all the details");
    }
    else {
        for (var i = 0; i < regUser.length; i++) {
            if (regUser[i].email === email && regUser[i].password === password) {
                alert("Let's get Shopping");
                window.location.href = "index.html";
                return;
            }
            else if (email == "admin@gmail.com" && password == "admin") {
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
    }
    else {
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

