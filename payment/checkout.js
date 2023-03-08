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

function filldetail(){
    document.getElementById("credit-logo").innerHTML = "";

    
}
