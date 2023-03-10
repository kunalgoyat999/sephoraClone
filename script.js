import { navbar, footer } from "./Component/navbar.js";

let navbarContainer = document.getElementById("nav");

// console.log("navbar===",navbar)

// navbarContainer.innerHTML = navbar();

// let footercontainer = document.getElementById("footer");
// footercontainer.innerHTML = footer();


let carContainer = [...document.querySelectorAll(".slider__container")];
let prevBtn = [...document.querySelectorAll(".prev")];
let nextBtn = [...document.querySelectorAll(".next")];

// console.log(carContainer);
// console.log(prevBtn);
// console.log(nextBtn);


carContainer.forEach((e, i) => {
    let containerDimension = e.getBoundingClientRect();
    let containerWidth = containerDimension.width;

    console.log(containerWidth, containerDimension);

    let counter = 1;

    nextBtn[i].addEventListener("click", () => {
        // e.scrollLeft +=545*3 +32 ;
        if (counter == 1 && containerWidth > 1200) {
            e.scrollLeft += 545 * 3 + 32;
        } else {
            e.scrollLeft += containerWidth + 24;
        }

    })
    prevBtn[i].addEventListener("click", () => {
        // e.scrollLeft -=545*3 +32 ;
        if (counter == 1 && containerWidth > 1200) {
            e.scrollLeft -= 545 * 3 + 32;
        } else {
            e.scrollLeft -= containerWidth + 8;
        }
        // e.scrollLeft -=containerWidth  + 8;
    })

})



// diplaying product slider data

// chosen for you

let mainContainer = document.querySelector("#chosen-for-you .product__slider__container")
let chosenForYou = [{ imageUrl: "https://www.sephora.com/productimages/sku/s2031375-main-zoom.jpg?pb=2020-03-allure-best-2019&imwidth=122", brand: "The Ordinary", name: "Hyaluronic Acid 2% + B5 Hydrating Serum" }, { imageUrl: "https://www.sephora.com/productimages/sku/s2421337-main-zoom.jpg?imwidth=122", brand: "Paula's Choice", name: "C15 Vitamin C Super Booster" }, { imageUrl: "https://www.sephora.com/productimages/sku/s1395011-main-zoom.jpg?pb=2020-03-sephora-value-2020&imwidth=122", brand: "SEPHORA COLLECTION", name: "Sephora Colorful® Waterproof Eyeshadow & Eyeliner Multi-Stick" }, { imageUrl: "https://www.sephora.com/productimages/sku/s2637965-main-zoom.jpg?pb=clean-planet-positive-badge-2021&imwidth=122", brand: "Glow Recipe", name: "Strawberry BHA Pore-Smooth Blur Drops" }, { imageUrl: "https://www.sephora.com/productimages/sku/s1393693-main-zoom.jpg?imwidth=122", brand: "Urban Decay", name: "24/7 Glide-On Waterproof Eyeliner Pencil" }, { imageUrl: "https://www.sephora.com/productimages/sku/s2100220-main-zoom.jpg?pb=clean-planet-positive-badge-2021&imwidth=122", brand: "SEPHORA COLLECTION", name: "Ultra Glow Serum: Glow + Strengthen Vitamin C Serum" }, { imageUrl: "https://www.sephora.com/productimages/sku/s2649978-main-zoom.jpg?imwidth=122", brand: "Glossier", name: "Lidstar Long-Wearing Shimmer Cream Eyeshadow" }, { imageUrl: "https://www.sephora.com/productimages/sku/s2636736-main-zoom.jpg?pb=2020-03-sephora-clean-2019&imwidth=122", brand: "Glossier", name: "After Baume Moisture Barrier Recovery Cream" }, { imageUrl: "https://www.sephora.com/productimages/sku/s2649143-main-zoom.jpg?imwidth=122", brand: "Glossier", name: "Pro Tip Long-Wearing Liquid Eyeliner Pen" }, { imageUrl: "https://www.sephora.com/productimages/sku/s2648483-main-zoom.jpg?pb=2020-03-sephora-clean-2019&imwidth=122", brand: "OLEHENRIKSEN", name: "Banana Bright+ Vitamin CC Eye Sticks" }, { imageUrl: "https://www.sephora.com/productimages/sku/s2592699-main-zoom.jpg?pb=clean-planet-positive-badge-2021&imwidth=122", brand: "SEPHORA COLLECTION", name: "Hydrating Serum" },]

// just dropped
let justDroppedContainer = document.querySelector("#just-dropped .product__slider__container")

let justDropped = [{ imageUrl: "https://www.sephora.com/productimages/sku/s2633105-main-zoom.jpg?pb=clean-planet-positive-badge-2021&imwidth=122", brand: "MARA", name: "Sea Silk Lip Balm" }, { imageUrl: "https://www.sephora.com/productimages/sku/s2649390-main-zoom.jpg?imwidth=122", brand: "Glossier", name: "Cloud Paint Gel Cream Blush" }, { imageUrl: "https://www.sephora.com/productimages/sku/s2673028-main-zoom.jpg?imwidth=122", brand: "Sol de Janeiro", name: "Brazilian Joia™ Strengthening + Smoothing Conditioner" }, { imageUrl: "https://www.sephora.com/productimages/sku/s2633170-main-zoom.jpg?pb=clean-planet-positive-badge-2021&imwidth=122", brand: "MARA", name: "Mini Algae + Moringa® Universal Face Oil" }, { imageUrl: "https://www.sephora.com/productimages/sku/s2649283-main-zoom.jpg?imwidth=122", brand: "Glossier", name: "Boy Brow Volumizing Eyebrow Gel-Pomade" }, { imageUrl: "https://www.sephora.com/productimages/sku/s2649556-main-zoom.jpg?pb=2020-03-sephora-clean-2019&imwidth=122", brand: "Glossier", name: "Milky Jelly Gentle Gel Face Cleanser" }, { imageUrl: "https://www.sephora.com/productimages/sku/s2649671-main-zoom.jpg?imwidth=122", brand: "Glossier", name: "Glassy High-Shine Lip Gloss" }, { imageUrl: "https://www.sephora.com/productimages/sku/s2642254-main-zoom.jpg?pb=2020-03-sephora-clean-2019&imwidth=122", brand: "tarte", name: "lashes & splashes mascara duo" }, { imageUrl: "https://www.sephora.com/productimages/sku/s2654234-main-zoom.jpg?imwidth=122", brand: "Moroccanoil", name: "Hydrating Shampoo & Conditioner Half-Liter Duo" }, { imageUrl: "https://www.sephora.com/productimages/sku/s2665495-main-zoom.jpg?pb=clean-planet-positive-badge-2021&imwidth=122", brand: "Glow Recipe", name: "Plumping Power Duo" }, { imageUrl: "https://www.sephora.com/productimages/sku/s2637122-main-zoom.jpg?pb=2020-03-sephora-clean-2019&imwidth=122", brand: "Tower 28 Beauty", name: "Sculptino™ Soft Matte Cream Contour + Bronzer" }]




displayProductSlider(chosenForYou, mainContainer);
displayProductSlider(justDropped, justDroppedContainer, true);



function displayProductSlider(arr, parentNode, isTagPresent = false) {

    let areaHidden = document.createElement("li");
    areaHidden.className = "area-hidden"




    arr.forEach((e, i) => {

        let li = document.createElement("li");
        li.setAttribute("class", "product__slider__item")


        let a = document.createElement("a");
        a.setAttribute("class", "product-link-container");

        let topContainer = document.createElement("div");
        topContainer.setAttribute("class", "product-top-container")

        let imgContainer = document.createElement("div");
        imgContainer.setAttribute("class", "product-img-container")

        let productImg = document.createElement("img");
        productImg.src = e.imageUrl;

        imgContainer.append(productImg);


        let btnContainer = document.createElement("div");
        btnContainer.setAttribute("class", "quicklook-btn-container")

        let quicklookBtn = document.createElement("button");
        quicklookBtn.setAttribute("class", "quicklook-Btn");
        quicklookBtn.textContent = "Quicklook";

        btnContainer.append(quicklookBtn);

        topContainer.append(imgContainer, btnContainer);


        let bottomContainer = document.createElement("div");
        bottomContainer.setAttribute("class", "product-bottom-container")

        let categoryNameContainer = document.createElement("div");
        categoryNameContainer.setAttribute("class", "cat-name-container")

        let brandName = document.createElement("span");
        brandName.setAttribute("class", "product-brand");
        brandName.textContent = e.brand;

        let productName = document.createElement("span");
        productName.setAttribute("class", "product-name");
        productName.textContent = e.name;

        categoryNameContainer.append(brandName, productName);

        bottomContainer.append(categoryNameContainer);

        if (isTagPresent) {
            let tagContainer = document.createElement("div");
            tagContainer.setAttribute("class", "tag-container");

            let tagNew = document.createElement("span");
            tagNew.setAttribute("class", "tag")
            tagNew.textContent = "New";

            if (i % 4 == 0) {
                let taglimited = document.createElement("span");
                taglimited.setAttribute("class", "tag")
                taglimited.textContent = "limited edition";
                tagContainer.append(tagNew, taglimited);
            }
            else {
                tagContainer.append(tagNew);
            }

            tagContainer.append(tagNew);
            a.append(topContainer, bottomContainer, tagContainer);
        }
        else {

            a.append(topContainer, bottomContainer);
        }




        li.append(a);


        parentNode.append(li);

    })

    parentNode.append(areaHidden)


    productSliderControl();

}



// for product slider

function productSliderControl() {

    let productContainer = [...document.querySelectorAll(".product__slider__container")];
    let productPrevBtn = [...document.querySelectorAll(".product__slider__control.prev")];
    let productNextBtn = [...document.querySelectorAll(".product__slider__control.next")];

    console.log(carContainer);
    console.log(prevBtn);
    console.log(nextBtn);


    productContainer.forEach((e, i) => {
        let containerDimension = e.getBoundingClientRect();
        let containerWidth = containerDimension.width;

        console.log(containerWidth, containerDimension);

        productNextBtn[i].addEventListener("click", () => {
            e.scrollLeft += containerWidth;
        })
        productPrevBtn[i].addEventListener("click", () => {
            e.scrollLeft -= containerWidth;
        })

    })


}




// cart js

let cartBtn = document.querySelector(".checkout-btn");

console.log(cartBtn);

cartBtn.addEventListener("click", () => {
    location.href = "./cart/cart.html"
})


let cartProductArr = JSON.parse(localStorage.getItem("product-Arr")) || [];

function displayCartProducts(arr) {

    // <div class="popup-items-container mid-product-container">
    //                             <div class="cart-product-img">
    //                                 <img src="https://www.sephora.com/productimages/sku/s2497220-main-zoom.jpg?pb=2020-03-sephora-value-2020&imwidth=62" alt="">
    //                             </div>
    //                             <div class="cart-product-meta">
    //                                 <span class="cart-product-name"><strong>SEPHORA COLLECTION</strong></span> 
    //                                 <span class="cart-product-description">Total Coverage Blending Sponge Set</span>
    //                             </div>
    //                             <div class="price-remove">
    //                                 <span class="cart-product-price">$25</span>
    //                                 <span class="cart-product-remove">Remove</span>
    //                             </div>
    //                         </div>


    // arr.forEach((e)=>{

    //     let productContainer =document.createElement("div");
    //     productContainer.setAttribute("class","popup-items-container");
    //     productContainer.setAttribute("class","mid-product-container");

    //     let productImg =document.createElement("div");

    //     let Img =document.createElement("img");








    // })










}




// Login Modal below ////////////////////////////////////////////////////

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
var signupBtn2 = document.getElementById("signupBtn2");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("signupclose")[0];

// When the user clicks on the button, open the modal
signupBtn.onclick = function () {
    signupModal.style.visibility = "visible";
    loginModal.style.visibility = "hidden";
}

signupBtn2.onclick = function () {
    signupModal.style.visibility = "visible";
    loginModal.style.visibility = "hidden";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    signupModal.style.visibility = "hidden";
}

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function (event) {
//     if (event.target == signupModal) {
//         signupModal.style.visibility = "hidden";
//     }
// }


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
                // localStorage.setItem("userName", regUser[i]);
                alert("Let's get Shopping");
                window.location.href = "index.html";
                return;
            }
           
        }
        if (email == "admin@gmail.com" && password == "admin") {
                alert("SignIn Sucessfull !");

                // window.location.href = "index.html";
                loginModal.style.visibility = "hidden";
                document.getElementById("welcome").innerText = localStorage.getItem("userName");
                document.getElementById("userName").innerText = "Welcome !";
                return;
            }
        alert("ERROR! Please check your E-Mail Id or Password again.");
    }
}



//////////  SIGNUP FUNCTIONALITY BELOW  /////////////////////////////////////////////

document.getElementById("joinBtn").addEventListener("click", userList);

var userArr = JSON.parse(localStorage.getItem("userArr")) || [];

function userList(e) {
    e.preventDefault();
    console.log("clicked");

    var firstName2 = document.getElementById("firstName2").value;
    localStorage.setItem("userName", firstName2);

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
        // window.location.href = "login.html";
        signupModal.style.visibility = "hidden";

    }
}


// search


