


let cart_data = JSON.parse(localStorage.getItem("cart")) || [];

var cartdata = document.getElementById("cartItem");

if (cart_data.length === 0) {
  let h3 = document.createElement("h3");
  h3.textContent = "Your Basket is currently empty.";

  let btn = document.createElement("button");
  btn.setAttribute("class","gotoproduct");
  btn.textContent = "Shop New Arrivals";
  btn.setAttribute("onclick", "window.location.href = 'categories.html'");

  cartdata.append(h3, btn)
}else{
  addproduct(cart_data);
}

function addproduct(data) {
  cartdata.innerHTML = "";
  data.map(function (ele, index) {
    showProduct(ele, index);
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
  // document.getElementById("carts").innerHTML = "";
  var remaining = cart_data.splice(index, 1);
  console.log(remaining);
  localStorage.setItem("cart", JSON.stringify(cart_data));
  // console.log(cart_data);
  addproduct(cart_data);
  // calcTotal();
  // document.getElementById("lblCartCount").textContent = cart_data.length;
}




