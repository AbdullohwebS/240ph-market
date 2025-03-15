const currentPage = window.location.pathname;

if (currentPage.includes("index.html") || currentPage === "/") {
  console.log("Sahifa yuklandi: index.html");

  const loader = document.querySelector(".loader");
  const list = document.querySelector("#list");
  const template = document.querySelector("template");

  fetch("https://dummyjson.com/products")
    .then((response) => response.json())
    .then((data) => {
      console.log("API dan kelgan ma'lumot:", data);
      updateUI(data.products);
    })
    .catch((error) => {
      console.error("Xatolik yuz berdi:", error);
    })
    .finally(() => {
      loader.style.display = "none"; 
    });

  function updateUI(products) {
    list.innerHTML = ""; 

    products.forEach((p) => {
      const clone = template.content.cloneNode(true);

      const productsImg = clone.querySelector(".products-img");
      const description = clone.querySelector(".description");
      const reting = clone.querySelector(".reting");
      const pracing = clone.querySelector(".pracing");
      const btn = clone.querySelector("#btn");
      const viewBtn = clone.querySelector(".view-btn");

      productsImg.src = p.thumbnail;
      productsImg.alt = p.title;
      description.textContent = p.description;
      reting.textContent = `⭐${p.rating} / 5`;
      pracing.textContent = `$${p.price}`;

      btn.addEventListener("click", function () {
        alert(`Siz tanlagan mahsulot narxi: $${p.price}`);
      });

      viewBtn.href = `indeks1.html?id=${p.id}`; 

      list.appendChild(clone);
    });
  }
}

if (currentPage.includes("indeks1.html")) {
  console.log("Sahifa yuklandi: indeks1.html");

  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  if (productId) {
    fetch(`https://dummyjson.com/products/${productId}`)
      .then((response) => response.json())
      .then((product) => {
        updateProductDetails(product);
      })
      .catch((error) => {
        console.error("Xatolik:", error);
      });
  }

  function updateProductDetails(product) {
    document.getElementById("main-image").src = product.thumbnail;
    document.getElementById("product-title").textContent = product.title;
    document.getElementById("product-description").textContent =
      product.description;
    document.getElementById(
      "product-rating"
    ).textContent = `⭐${product.rating} / 5`;
    document.getElementById(
      "product-price"
    ).textContent = `US$ ${product.price}`;

    const thumbnails = document.querySelectorAll(".thumb");
    product.images.forEach((img, index) => {
      if (index < thumbnails.length) {
        thumbnails[index].src = img;
      }
    });

    document.getElementById("buy-btn").addEventListener("click", () => {
      alert(
        `Siz ${product.title} mahsulotini $${product.price} ga sotib oldingiz!`
      );
    });
  }
}
function updateProductDetails(product) {
  document.getElementById("main-image").src = product.thumbnail;

  document.getElementById("product-title").textContent = product.title;
  document.getElementById("product-description").textContent =
    product.description;
  document.getElementById(
    "product-rating"
  ).textContent = `⭐${product.rating} / 5`;
  document.getElementById("product-price").textContent = `US$ ${product.price}`;

  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = ""; 

  product.images.forEach((imgSrc) => {
    const imgElement = document.createElement("img");
    imgElement.classList.add("thumb");
    imgElement.src = imgSrc;
    imgElement.alt = product.title;

    imgElement.addEventListener("click", function () {
      document.getElementById("main-image").src = imgSrc;
    });

    gallery.appendChild(imgElement);
  });

  document.getElementById("buy-btn").addEventListener("click", () => {
    alert(
      `Siz ${product.title} mahsulotini $${product.price} ga sotib oldingiz!`
    );
  });
}


