async function loadProducts() {
  const response = await fetch("https://fakestoreapi.com/products");
  const products = await response.json();
  displayProducts(products);
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

window.onload = () => {
  let status = "idle";

  let productSection = document.querySelector("#all-products");

  window.onscroll = () => {
    let position =
      productSection.getBoundingClientRect().top -
      (window.scrollY + window.innerHeight);

    if (status == "idle" && position <= 0) {
      loadProducts();

      // Simulate heavy operation. It could be a complex price calculation. <-- need to improve this
      // This is a blocking operation that will freeze the UI
      // how to improve this: https://ko.javascript.info/event-loop <-- use event loop
      for (let i = 0; i < 10000000; i++) {
        const temp = Math.sqrt(i) * Math.sqrt(i);
      }
    }
  };
};
