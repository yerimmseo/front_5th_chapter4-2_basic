let allProducts = [];
let currentPage = 1;
const productsPerPage = 8;
let isLoading = false;

async function fetchProducts() {
  const response = await fetch("https://fakestoreapi.com/products");
  allProducts = await response.json();
  loadProducts();
}

function loadProducts() {
  if (isLoading) {
    return;
  }
  isLoading = true;

  const start = (currentPage - 1) * productsPerPage;
  const end = currentPage * productsPerPage;
  const productsToShow = allProducts.slice(start, end);

  displayProducts(productsToShow);
  currentPage++;

  isLoading = false;
}

function displayProducts(products) {
  const container = document.querySelector("#all-products .container");

  products.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.classList.add("product");

    const pictureDiv = document.createElement("div");
    pictureDiv.classList.add("product-picture");
    const img = document.createElement("img");
    img.src = product.image;
    img.alt = `product: ${product.title}`;
    img.loading = "lazy";
    img.width = 250;
    pictureDiv.appendChild(img);

    const infoDiv = document.createElement("div");
    infoDiv.classList.add("product-info");

    const category = document.createElement("h5");
    category.classList.add("categories");
    category.textContent = product.category;

    const title = document.createElement("h4");
    title.classList.add("title");
    title.textContent = product.title;

    const price = document.createElement("h3");
    price.classList.add("price");
    const priceSpan = document.createElement("span");
    priceSpan.textContent = `US$ ${product.price}`;
    price.appendChild(priceSpan);

    const button = document.createElement("button");
    button.textContent = "Add to bag";

    infoDiv.appendChild(category);
    infoDiv.appendChild(title);
    infoDiv.appendChild(price);
    infoDiv.appendChild(button);

    productElement.appendChild(pictureDiv);
    productElement.appendChild(infoDiv);

    container.appendChild(productElement);
  });
}

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const windowHeight = window.innerHeight;
  const documentHeight = document.body.offsetHeight;

  if (scrollTop + windowHeight >= documentHeight - 100) {
    loadProducts();

    for (let i = 0; i < 10000000; i++) {
      const temp = Math.sqrt(i) * Math.sqrt(i);
    }
  }
});

fetchProducts();
