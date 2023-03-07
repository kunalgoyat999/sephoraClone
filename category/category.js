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