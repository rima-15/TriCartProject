document.addEventListener("DOMContentLoaded", function() {
    function validateForm(event) {
        event.preventDefault(); // Prevent the default form submission

        // Get selected order, product, and rating
        const orderSelect = document.getElementById("listsOforder");
        const productSelect = document.getElementById("ListOfproduct");
        const ratingSelect = document.querySelector(".rating-star");

        const selectedOrder = orderSelect.value;
        const selectedProduct = productSelect.options[productSelect.selectedIndex].text;
        const selectedRating = ratingSelect.value;

        // Check if both order and rating are selected
        if (!selectedOrder || !selectedRating) {
            alert("Please select an order and a rating.");
            return;
        }

        // Display alert with feedback
        alert(`Thank you for your feedback!\n\nYour rating for ${selectedProduct} is ${selectedRating} stars`);

        // Redirect to Home page
        window.location.href = "HomePage.html";
    }

    // Attach the validateForm function to the form's submit event
    document.querySelector("form").addEventListener("submit", validateForm);
});

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const productName = document.getElementById("productName");
  const category = document.getElementById("category");
  const price = document.getElementById("price");
  const quantity = document.getElementById("quantity");
  const description = document.getElementById("description");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Validation
    if (!productName.value.trim() || !category.value || !price.value  || !quantity.value  || !description.value.trim() || !imageUpload.files.length) {
      alert("Please fill in all the fields.");
      return;
    }
    if (!isNaN(productName.value.charAt(0))) {
      alert("Product name should not start with a number.");
      return;
    }
    if (isNaN(price.value) || isNaN(quantity.value)) {
      alert("Price and quantity should be numbers.");
      return;
    }

    // Product Object
    const newProduct = {
      name: productName.value,
      category: category.value,
      price: parseFloat(price.value),
      quantity: parseInt(quantity.value, 10),
      description: description.value
    };

    // Save to Local Storage
    let products = JSON.parse(localStorage.getItem("products")) || [];
    products.push(newProduct);
    localStorage.setItem("products", JSON.stringify(products));

    // Alert and Clear Form
    alert(`Product "${productName.value}" has been added successfully.`);
    form.reset();
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const productList = document.querySelector(".product-list");

  // Check if productList exists in the DOM
  if (!productList) {
    console.error("Element with class 'product-list' not found in the DOM.");
    return;
  }

  // Retrieve products from local storage
  const products = JSON.parse(localStorage.getItem("products")) || [];

  // Check if there are any products
  if (products.length === 0) {
    productList.innerHTML = "<p>No products added yet.</p>";
    return;
  }

  // Loop through each product and add it to the product-list div
  products.forEach((product) => {
    const productItem = document.createElement("div");
    productItem.classList.add("product-item");

    // Display only image, name, and description
    productItem.innerHTML = `
      <div class="category-product-img">
          <img src="${product.imageDataUrl || 'https://via.placeholder.com/150'}" alt="${product.name}">
      </div>
      <h3>${product.name}</h3>
      <p>${product.description}</p>
    `;

    productList.appendChild(productItem);
  });
});

let darkmode = localStorage.getItem('darkmode');
const themeSwitch = document.getElementById('theme-switch');

const enableDarkmode = () => {
    document.body.classList.add('darkmode');
    localStorage.setItem('darkmode', 'active');
};

const disableDarkmode = () => {
    document.body.classList.remove('darkmode');
    localStorage.setItem('darkmode', null);
};

if (darkmode === "active") enableDarkmode();

themeSwitch.addEventListener("click", () => {
    darkmode = localStorage.getItem('darkmode');
    darkmode !== "active" ? enableDarkmode() : disableDarkmode();
});
//category page sorting
function sortProducts() {
    // Get the value selected in the dropdown
    const sortOption = document.getElementById('sort').value;
    const productsContainer = document.getElementById('productsList');
    const products = Array.from(productsContainer.getElementsByClassName('product'));

    let sortedProducts;

    if (sortOption === 'priceAsc') {
        // Sort by price ascending
        sortedProducts = products.sort((a, b) => {
            const priceA = parseFloat(a.querySelector('.category-product-price').textContent.replace(' SR', '').trim());
            const priceB = parseFloat(b.querySelector('.category-product-price').textContent.replace(' SR', '').trim());
            return priceA - priceB; // Ascending order
        });
    } else if (sortOption === 'priceDesc') {
        // Sort by price descending
        sortedProducts = products.sort((a, b) => {
            const priceA = parseFloat(a.querySelector('.category-product-price').textContent.replace(' SR', '').trim());
            const priceB = parseFloat(b.querySelector('.category-product-price').textContent.replace(' SR', '').trim());
            return priceB - priceA; // Descending order
        });
    } else if (sortOption === 'nameAsc') {
        // Sort by name A-Z
        sortedProducts = products.sort((a, b) => {
            const nameA = a.querySelector('.infoOfProduct').textContent.trim().toLowerCase();
            const nameB = b.querySelector('.infoOfProduct').textContent.trim().toLowerCase();
            return nameA.localeCompare(nameB); // A-Z
        });
    } else if (sortOption === 'nameDesc') {
        // Sort by name Z-A
        sortedProducts = products.sort((a, b) => {
            const nameA = a.querySelector('.infoOfProduct').textContent.trim().toLowerCase();
            const nameB = b.querySelector('.infoOfProduct').textContent.trim().toLowerCase();
            return nameB.localeCompare(nameA); // Z-A
        });
    }

    // Clear the products container and append sorted products
    productsContainer.innerHTML = '';
    sortedProducts.forEach(product => {
        productsContainer.appendChild(product);
    });
}

