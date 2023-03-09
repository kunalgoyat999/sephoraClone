import { navbar, footer } from "../Component/navbar.js";

let navContainer = document.getElementById("nav");
navContainer.innerHTML = navbar();

// let footerContainer = document.getElementById("footer");
// footerContainer.innerHTML = footer();

let cart_data = JSON.parse(localStorage.getItem("cart")) || [];

var cartdata = document.getElementById("cartItem");

function itemCount() {
  var item = cart_data.reduce(function (acc, curr) {
    return acc + Number(curr.quantity);
  }, 0);
  document.getElementById("cartitem").textContent = item;
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
console.log(cart_data);

check(cart_data);

function addproduct(data) {
  cartdata.innerHTML = "";
  data.map(function (ele, index) {
    console.log(ele);
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
  companyname.textContent = "SEPHORA COLLECTION";

  let price = document.createElement("h3");
  price.setAttribute("id", "price");
  price.textContent = `$${el.cost}`;

  companynameprice.append(companyname, price);

  let despdiv = document.createElement("div");
  despdiv.setAttribute("class", "desp-div");

  let desp = document.createElement("p");
  desp.setAttribute("class", "p1");
  desp.textContent = "Clean Charcoal Nose Strip";

  let id = document.createElement("p");
  id.textContent = "ITEM 2341081";

  let size = document.createElement("p");
  size.setAttribute("id", "p");
  size.textContent = "Size: 1 Mask";

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
      let num = el.quantity*el.cost;
      document.getElementById("mrptotal").textContent = num;
      localStorage.setItem("mrp-total", num);
      document.getElementById("totalamt").textContent = num;
      localStorage.setItem("estimated-amount", num);
      price.textContent = `$${num.toFixed(2)}`;
      document.getElementById("cartitem").textContent = el.quantity;
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
  localStorage.setItem("promo-code", "masai30");
  document.getElementById("adddiscount").innerText = "0";
}

function calcTotal() {
  let total = cart_data.reduce(function (acc, curr) {
    return acc + Number(curr.cost * curr.quantity);
  }, 0);

  let num = total.toFixed(2);

  document.getElementById("mrptotal").textContent = num;
  localStorage.setItem("mrp-total", num);
  document.getElementById("totalamt").textContent = num;
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
    id: "ITEM 2497212",
    quantity: 1,
    name: "Total Coverage Original Sponge",
    cost: 12.00,
    Category: "Personal & Home Essentials",
    brand: "SEPHORA COLLECTION",
    imageUrl:
      "https://www.sephora.com/productimages/sku/s2497212-main-zoom.jpg?pb=2020-03-sephora-value-2020&imwidth=97",
    popularity: 3,
  },
  {
    id: "ITEM 2464048",
    quantity: 1,
    name: "Big By Definition Defining & Volumizing Mascara",
    cost: 10.00,
    Category: "Personal & Home Essentials",
    brand: "SEPHORA COLLECTION",
    imageUrl:
      "https://www.sephora.com/productimages/sku/s2464048-main-zoom.jpg?pb=2020-03-sephora-value-2020&imwidth=97",
    popularity: 2,
  },
  {
    id: "ITEM 1370766",
    quantity: 1,
    name: "Long Lasting Eyeliner High Precision Brush",
    cost: 9.00,
    Category: "Personal & Home Essentials",
    brand: "SEPHORA COLLECTION",
    imageUrl:
      "https://www.sephora.com/productimages/sku/s1370766-main-zoom.jpg?pb=2020-03-sephora-value-2020&imwidth=97",
    popularity: 1,
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
  companyname.textContent = "SEPHORA COLLECTION";

  let price = document.createElement("h3");
  price.setAttribute("id", "price");
  price.textContent = `$${el.cost}`;

  companynameprice.append(companyname, price);

  let despdiv = document.createElement("div");
  despdiv.setAttribute("class", "desp-div");

  let desp = document.createElement("p");
  desp.setAttribute("class", "p1");
  desp.textContent = "Clean Charcoal Nose Strip";

  let id = document.createElement("p");
  id.textContent = "ITEM 2341081";

  let size = document.createElement("p");
  size.setAttribute("id", "p");
  size.textContent = "Size: 1 Mask";

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
  localStorage.setItem("cart", JSON.stringify(cart_data));
  check(cart_data);
}

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
  },
  {
    imageUrl:
      "https://www.sephora.com/productimages/sku/s2421337-main-zoom.jpg?imwidth=122",
    brand: "Paula's Choice",
    name: "C15 Vitamin C Super Booster",
  },
  {
    imageUrl:
      "https://www.sephora.com/productimages/sku/s1395011-main-zoom.jpg?pb=2020-03-sephora-value-2020&imwidth=122",
    brand: "SEPHORA COLLECTION",
    name: "Sephora Colorful® Waterproof Eyeshadow & Eyeliner Multi-Stick",
  },
  {
    imageUrl:
      "https://www.sephora.com/productimages/sku/s2637965-main-zoom.jpg?pb=clean-planet-positive-badge-2021&imwidth=122",
    brand: "Glow Recipe",
    name: "Strawberry BHA Pore-Smooth Blur Drops",
  },
  {
    imageUrl:
      "https://www.sephora.com/productimages/sku/s2648483-main-zoom.jpg?pb=2020-03-sephora-clean-2019&imwidth=122",
    brand: "OLEHENRIKSEN",
    name: "Banana Bright+ Vitamin CC Eye Sticks",
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
  });

  parentNode.append(areaHidden);
}

// for product slider
