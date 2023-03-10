let timerId;
function debounce(func, delay) {
  if (timerId) {
    clearTimeout(timerId);
  }
  timerId = setTimeout(func, delay);
}

async function getData() {
    let search = document.getElementById("search-txt").value;
    if(search==="mascara"){
        localStorage.setItem("category", "eyePrimer") || "";
        location.href = `./category/category.html`
    }
  }
  
  async function main() {
    let data = await getData();
  }

  