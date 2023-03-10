import {
  navbar,
  footer,
  star4,
  star3,
  star2,
  star1,
  star5,
} from "../Component/navbar.js";

let navbarContainer = document.getElementById("navbar");
navbarContainer.innerHTML = navbar();

let footercontainer = document.getElementById("footer");
footercontainer.innerHTML = footer();

let label1 = document.getElementById("label1");
label1.innerHTML = star4();

let label2 = document.getElementById("label2");
label2.innerHTML = star3();

let label3 = document.getElementById("label3");
label3.innerHTML = star2();

let label4 = document.getElementById("label4");
label4.innerHTML = star1();

// Get Data
let category = "eyePallete";
// let url = "https://pickled-cheerful-somersault.glitch.me/${category}";
let url = `http://localhost:3000/${category}`;

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
