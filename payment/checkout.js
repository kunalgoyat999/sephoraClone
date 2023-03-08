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
  maindiv.setAttribute("id","main--div");

  let desplogoDiv = document.createElement("div");
  desplogoDiv.setAttribute("id","desp-logo")

  let despdiv = document.createElement("div");
  despdiv.setAttribute("id","desp-div")

  let desp = document.createElement("h3");
  desp.textContent = "Add new credit or debit card";

  despdiv.append(desp);

  let logoDiv = document.createElement("div");
  logoDiv.setAttribute("id","logo-div");

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
  cardNumber.setAttribute("id", "cardNumber");

  maindiv.append(desplogoDiv, cardNumber);

  document.getElementById("credit-logo").append(maindiv);
}
