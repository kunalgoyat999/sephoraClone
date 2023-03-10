var savebtn = document.getElementById("savebtn");
savebtn.addEventListener("click", submitAddress);

var messagediv = document.getElementById("error");
var message = document.createElement("p");
message.setAttribute("class", "errormess");

function submitAddress() {
  let addressInfoObj = {
    firstname: document.getElementById("first-name").value,
    lastname: document.getElementById("last-name").value,
    phonenumber: document.getElementById("phone-number").value,
    street: document.getElementById("street-address").value,
    zip: document.getElementById("zip").value,
  };
  message.textContent = "";

  var addressInfo = [];

  if (
    !addressInfoObj.firstname ||
    !addressInfoObj.lastname ||
    !addressInfoObj.phonenumber ||
    !addressInfoObj.street ||
    !addressInfoObj.zip
  ) {
    message.textContent = "Fill all input details";
    return;
  } else {
    addressInfo.push(addressInfoObj);
    message.textContent = "";
  }

  if (addressInfo.length > 0) {
    let detail = document.getElementById("address-detail");
    detail.innerHTML = "";

    let name = document.createElement("p");
    name.textContent = addressInfo[0].firstname + " " + addressInfo[0].lastname;

    let address = document.createElement("p");
    address.textContent = addressInfo[0].street;

    let zip = document.createElement("p");
    zip.textContent = addressInfo[0].zip;

    detail.append(name, address, zip);
  }
}
messagediv.append(message);

// Payment

function filldetail() {
  document.getElementById("credit-logo").innerHTML = "";

  let maindiv = document.createElement("div");
  maindiv.setAttribute("id", "main--div");

  let desplogoDiv = document.createElement("div");
  desplogoDiv.setAttribute("id", "desp-logo");

  let despdiv = document.createElement("div");
  despdiv.setAttribute("id", "desp-div");

  let desp = document.createElement("h3");
  desp.textContent = "Add new credit or debit card";

  despdiv.append(desp);

  let logoDiv = document.createElement("div");
  logoDiv.setAttribute("id", "logo-div");

  let div1 = document.createElement("div");
  let img1 = document.createElement("img");
  img1.src = "https://www.sephora.com/img/ufe/payments/sephora.svg";
  div1.append(img1);

  let div2 = document.createElement("div");
  let img2 = document.createElement("img");
  img2.src = "https://www.sephora.com/img/ufe/payments/visa.svg";
  div2.append(img2);

  let div3 = document.createElement("div");
  let img3 = document.createElement("img");
  img3.src = "https://www.sephora.com/img/ufe/payments/masterCard.svg";
  div3.append(img3);

  let div4 = document.createElement("div");
  let img4 = document.createElement("img");
  img4.src = "https://www.sephora.com/img/ufe/payments/americanExpress.svg";
  div4.append(img4);

  let div5 = document.createElement("div");
  let img5 = document.createElement("img");
  img5.src = "https://www.sephora.com/img/ufe/payments/discover.svg";
  div5.append(img5);

  logoDiv.append(div1, div2, div3, div4, div5);

  desplogoDiv.append(despdiv, logoDiv);

  let cardNumber = document.createElement("input");
  cardNumber.placeholder = "Card Number*";
  cardNumber.maxLength = "12";
  cardNumber.setAttribute("id", "cardNumber");

  let datediv = document.createElement("div");
  datediv.setAttribute("id", "date-div");

  let month = document.createElement("input");
  month.placeholder = "MM*";
  month.maxLength = "2";
  month.setAttribute("id", "month-card");

  let year = document.createElement("input");
  year.setAttribute("id", "year-card");
  year.placeholder = "YY*";
  year.maxLength = "2";

  let cvv = document.createElement("input");
  cvv.type = "password";
  cvv.placeholder = "CVV";
  cvv.setAttribute("id", "cvv-card");
  cvv.maxLength = "3";

  datediv.append(month, year, cvv);

  let namediv = document.createElement("div");
  namediv.setAttribute("id", "name-div");

  let fname = document.createElement("input");
  fname.placeholder = "First Name*";
  fname.setAttribute("id", "f-name");

  let lname = document.createElement("input");
  lname.placeholder = "Last Name*";
  lname.setAttribute("id", "l-name");

  namediv.append(fname, lname);

  maindiv.append(desplogoDiv, cardNumber, datediv, namediv);

  document.getElementById("credit-logo").append(maindiv);
}

var cardObj = {
  cardNumber: "111111111111",
  cvv: "111",
};

localStorage.setItem("card-detail", JSON.stringify(cardObj));

var messagediv2 = document.getElementById("error2");
var message2 = document.createElement("p");
message2.setAttribute("class", "errormess");

var savebtn2 = document.getElementById("savebtn2");
savebtn2.addEventListener("click", cardData);

function cardData() {
  // filldetail();
  cardNum = document.getElementById("cardNumber").value;
  cvv = document.getElementById("cvv-card").value;
  month = document.getElementById("month-card").value;
  year = document.getElementById("year-card").value;
  fname = document.getElementById("f-name").value;
  lname = document.getElementById("l-name").value;

  if (!fname || !lname || !cvv || !cardNum || !year || !month) {
    message2.textContent = "Fill all input details";
    return;
  } else {
    message2.textContent = "";
  }

  let obj = JSON.parse(localStorage.getItem("card-detail"));

  if (cardNum !== obj.cardNum && cvv !== obj.cvv) {
    message2.textContent = "No Card Detail Found! (111111111111, 111)";
    return;
  } else {
    message2.textContent = "Card Detail Found";
    message2.style.color = "green";
    able();
  }
}
messagediv2.append(message2);

// right-side

var mrptotal = localStorage.getItem("mrp-total");

document.getElementById("mrptotal").textContent = mrptotal;

var additionaldis = localStorage.getItem("additional-discount");

document.getElementById("adddiscount").textContent = additionaldis;

var estimate = localStorage.getItem("estimated-amount");

document.getElementById("totalamt").textContent = estimate;

function able() {
  let btn = document.getElementById("ship");
  btn.addEventListener("click", function () {
    location.href = "otp.html";
  });
  btn.style.backgroundColor = "#cf112c";
}

let totalcount = localStorage.getItem("total-number-items") || 0;

document.getElementById("gettotalitem").textContent = totalcount;

let showP = document.getElementById("showproduct");

let showList = document.getElementById("item-in-order");
showList.addEventListener("click", displayproductlist);

let productArr = JSON.parse(localStorage.getItem("product-Arr")) || [];

console.log(productArr);
function displayproductlist() {
  showP.innerHTML="";
  productArr.map(function (el, index) {
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

    companynameprice.append(companyname);

    let despdiv = document.createElement("div");
    despdiv.setAttribute("class", "desp-div");

    let desp = document.createElement("p");
    desp.setAttribute("class", "p1");
    desp.textContent = el.name;

    let id = document.createElement("p");
    id.setAttribute("class","id-p");
    id.textContent = "ITEM 2341081";

    despdiv.append(desp, id);

    let quanprice = document.createElement("div");
    quanprice.setAttribute("id","quanp")

    let quant = document.createElement("h5");
    quant.textContent = `Qty: ${el.quantity}`;

    let pri = document.createElement("h5");
    pri.textContent = `$${el.cost}`;

    quanprice.append(quant, pri);

    detaildiv.append(companynameprice, despdiv, quanprice);

    mainDiv.append(imagediv, detaildiv);

    let hr = document.createElement("hr");
    hr.setAttribute("class","hrrr");

    showP.append(hr, mainDiv);

    let child = document.querySelectorAll("#showproduct");
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
}
