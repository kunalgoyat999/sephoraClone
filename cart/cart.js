let cart_data = JSON.parse(localStorage.getItem("cart")) || [];

var cartdata = document.getElementById("cartItem");

function itemCount(){
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

  let button2 = document.getElementById("paypal");
  button2.disabled = false;
}

if (cart_data.length === 0) {
  let h3 = document.createElement("h3");
  h3.textContent = "Your Basket is currently empty.";

  disable();

  let btn = document.createElement("button");
  btn.setAttribute("class", "gotoproduct");
  btn.textContent = "Shop New Arrivals";
  btn.setAttribute("onclick", "window.location.href = 'categories.html'");

  cartdata.append(h3, btn);
} else {
  addproduct(cart_data);
  able();
}

function addproduct(data) {
  cartdata.innerHTML = "";
  data.map(function (ele, index) {
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
  image.src = el.image;

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
  price.textContent = `$${el.price}`;

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

  let opt1 = document.createElement("option");
  opt1.textContent = "1";
  opt1.value = "1";

  let opt2 = document.createElement("option");
  opt2.textContent = "2";
  opt2.value = "2";

  let opt3 = document.createElement("option");
  opt3.textContent = "3";
  opt3.value = "3";

  let opt4 = document.createElement("option");
  opt4.textContent = "4";
  opt4.value = "4";

  let opt5 = document.createElement("option");
  opt5.textContent = "5";
  opt5.value = "5";

  let opt6 = document.createElement("option");
  opt6.textContent = "6";
  opt6.value = "6";

  let opt7 = document.createElement("option");
  opt7.textContent = "7";
  opt7.value = "7";

  let opt8 = document.createElement("option");
  opt8.textContent = "8";
  opt8.value = "8";

  let opt9 = document.createElement("option");
  opt9.textContent = "9";
  opt9.value = "9";

  let opt10 = document.createElement("option");
  opt10.textContent = "10";
  opt10.value = "10";
  select.append(opt1, opt2, opt3, opt4, opt5, opt6, opt7, opt8, opt9, opt10);

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
  localStorage.setItem("promo-code", "masai30");
  document.getElementById("adddiscount").innerText = "0";

  // document.getElementById("lblCartCount").textContent = cart_data.length;
}

function handleQuantityNumber(ele, select, price2) {
  ele.quantity = Number(select);
  let num = ele.quantity * ele.price;
  let n = num.toFixed(2);
  price2.textContent = `$${n}`;
  calcTotal();
  itemCount();
  localStorage.setItem("promo-code", "masai30");
  document.getElementById("adddiscount").innerText = "0";
}

function calcTotal() {
  let total = cart_data.reduce(function (acc, curr) {
    return acc + Number(curr.price * curr.quantity);
  }, 0);

  let num = total.toFixed(2);

  document.getElementById("mrptotal").textContent = num;
  document.getElementById("totalamt").textContent = num;
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
    
    var NUM = Number(num - remain).toFixed(2);
    // document.getElementById("total-amt").textContent = NUM;
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
    price: "12.00",
    Category: "Personal & Home Essentials",
    brand: "SEPHORA COLLECTION",
    image:
      "https://www.sephora.com/productimages/sku/s2497212-main-zoom.jpg?pb=2020-03-sephora-value-2020&imwidth=97",
    popularity: 3,
  },
  {
    id: "ITEM 2464048",
    quantity: 1,
    name: "Big By Definition Defining & Volumizing Mascara",
    price: "10.00",
    Category: "Personal & Home Essentials",
    brand: "SEPHORA COLLECTION",
    image:
      "https://www.sephora.com/productimages/sku/s2464048-main-zoom.jpg?pb=2020-03-sephora-value-2020&imwidth=97",
    popularity: 2,
  },
  {
    id: "ITEM 1370766",
    quantity: 1,
    name: "Long Lasting Eyeliner High Precision Brush",
    price: "9.00",
    Category: "Personal & Home Essentials",
    brand: "SEPHORA COLLECTION",
    image:
      "https://www.sephora.com/productimages/sku/s1370766-main-zoom.jpg?pb=2020-03-sephora-value-2020&imwidth=97",
    popularity: 1,
  }
]

addUnderRange(products);

function addUnderRange(data){
  data.map(function(el, index){
    showUnderRange(el, index);
  })
}

function showUnderRange(el, index) {
  let mainDiv = document.createElement("div");
  mainDiv.setAttribute("id", "main-container");

  let imagediv = document.createElement("div");
  imagediv.setAttribute("class", "image-div");

  let image = document.createElement("img");
  image.src = el.image;

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
  price.textContent = `$${el.price}`;

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
  btnDiv.setAttribute("id","btn-div2");

  let btn = document.createElement("button");
  btn.setAttribute("id","addbtn");
  btn.textContent = "Add";
  btn.addEventListener("click", function(){
    addtoCartList(el, btn);
  })

  btnDiv.append(btn);

  detaildiv.append(companynameprice, despdiv, btnDiv);

  mainDiv.append(imagediv, detaildiv);

  let hr = document.createElement("hr");
  hr.setAttribute("class", "hr1");

  document.getElementById("displayCheapProduct").append(mainDiv, hr);
}

function addtoCartList(item, btn){
  btn.textContent = "Added";
  cart_data.push(item);
  localStorage.setItem("cart",JSON.stringify(cart_data));
  addproduct(cart_data);
}