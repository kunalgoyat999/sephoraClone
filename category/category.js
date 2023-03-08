
// Get Data
let url = "https://pickled-cheerful-somersault.glitch.me/eyePrimer";

async function getData(url) {
  try {
    let res = await fetch(url);
    let data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function init(url) {
  console.log(url)
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
var radbtn = document.querySelectorAll(".radbutton");
radbtn.forEach((ele)=>{
  ele.addEventListener("click", function(){
    if(ele.value==25){
      init(`${url}/?cost_gte=0&cost_lte=25`)
    } else if(ele.value==50){
      init(`${url}/?cost_gte=26&cost_lte=50`)
    } else if(ele.value==100){
      init(`${url}/?cost_gte=51&cost_lte=100`)
    } else {
      init(`${url}/?cost_gte=100`)
    }
  })
})

var ratbtn = document.querySelectorAll(".ratingbtn");
ratbtn.forEach((ele)=>{
  ele.addEventListener("click", function(){
    if(ele.value==1){
      console.log(ele.value)
      init(`${url}/?rating_gte=1&rating_lte=1.9`)
    } else if(ele.value==3){
      console.log(ele.value)
      init(`${url}/?rating_gte=3&rating_lte=3.9`)
    } else if(ele.value==2){
      console.log(ele.value)
      init(`${url}/?rating_gte=2&rating_lte=2.9`)
    } else {
      console.log(ele.value)
      init(`${url}/?rating_gte=4`)
    }
  })
})

// Display Data
function displayData(data) {
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
    // let h6 = document.createElement("h6");
    // h6.textContent = ele.color + "Colors"
    let h4 = document.createElement("h4");
    h4.textContent = "$ "+ele.cost;

    prodBox.append(imgContainer, h5, p, h4);
    document.getElementById("bottom").append(prodBox);
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
