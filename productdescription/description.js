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

let navContainer = document.getElementById("nav");
navContainer.innerHTML = navbar();

let footerContainer = document.getElementById("footer");
footerContainer.innerHTML = footer();

let leftContainer = document.getElementById("leftimgcontainer");

let rightContainer = document.getElementById("rightdetailcontainer");

var obj = {
  imageUrl:
    "https://www.sephora.com/productimages/sku/s2377398-main-zoom.jpg?imwidth=612",
  brand: "SEPHORA COLLECTION",
  name: "Translucent Loose Setting Powder",
  rating: 4,
  cost: 15,
  quantity: 1,
};

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
  price.textContent = `$${data.cost.toFixed(2)}`;

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
