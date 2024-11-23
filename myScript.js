document.addEventListener("DOMContentLoaded", function () {
	let offers = [
		{ id: 1, name: "Flash Sale", description: "Quick! This flash sale lasts for only a few hours. Grab your favorites before they’re gone!", image: "web_images/Offer.png" },
		{ id: 2, name: "Hot & Trending", description: "Check out our hot and trending items that everyone is talking about. Don’t miss your chance to own them!", image: "web_images/Screenshot%20(92).png" },
		{ id: 3, name: "Seasonal Discount", description: "Celebrate the season with our exclusive discounts. Perfect for refreshing your wardrobe or home!", image: "web_images/Screenshot%20(94).png" },
		{ id: 4, name: "Only a Few Left!", description: "Limited quantities available! Grab your favorites before they’re gone for good!", image: "web_images/ONLYONE.jpg" },
		{ id: 5, name: "Save 20%", description: "Enjoy a straight 20% off your purchase. It’s the perfect time to try something new!", image: "web_images/Screenshot%20(93).png" },
		{ id: 6, name: "Mystery Discount", description: "Unlock a mystery discount! Every purchase qualifies—find out how much you save at checkout!", image: "web_images/Screenshot%20(95).png" }
	];

	const offerList = document.getElementById("offerList");
	const deleteButton = document.getElementById("deleteButton");

	function renderOffers() {
		offerList.innerHTML = ""; // Clear the existing offer list

		offers.forEach((offer) => {
			const offerBox = document.createElement("div");
			offerBox.classList.add("offer-box");
			offerBox.dataset.offerId = offer.id;

			const checkboxContainer = document.createElement("div");
			checkboxContainer.classList.add("checkbox-container");
			const checkbox = document.createElement("input");
			checkbox.type = "checkbox";
			checkbox.classList.add("offer-checkbox");
			checkbox.dataset.offerId = offer.id;
			checkboxContainer.appendChild(checkbox);
			offerBox.appendChild(checkboxContainer);

			const offerTitle = document.createElement("h3");
			offerTitle.textContent = offer.name;
			offerBox.appendChild(offerTitle);

			const offerDesc = document.createElement("p");
			offerDesc.textContent = offer.description;
			offerBox.appendChild(offerDesc);

			const offerImage = document.createElement("img");
			offerImage.src = offer.image;
			offerImage.alt = offer.name;
			offerBox.appendChild(offerImage);

			offerList.appendChild(offerBox);
		});
	}

	renderOffers();

	deleteButton.addEventListener("click", function () {
		const selectedCheckboxes = document.querySelectorAll(".offer-checkbox:checked");

		if (selectedCheckboxes.length === 0) {
			alert("Please select at least one offer.");
			return;
		}

		const confirmDelete = confirm("Are you sure you want to delete the selected offers?");
		if (confirmDelete) {
			const selectedIds = Array.from(selectedCheckboxes).map(checkbox => parseInt(checkbox.dataset.offerId));
			offers = offers.filter(offer => !selectedIds.includes(offer.id));
			renderOffers();
		}
	});

	const newOfferForm = document.getElementById("newOfferForm");
	newOfferForm.addEventListener("submit", function (event) {
		event.preventDefault();

		const offerName = document.getElementById("offerName").value.trim();
		const offerDescription = document.getElementById("offerDescription").value.trim();
		const offerImageInput = document.getElementById("offerImage");

		// Validate inputs
		if (!offerName) {
			alert("Please enter a valid Offer Name.");
			return;
		}
		if (!offerDescription) {
			alert("Please enter a valid Offer Description.");
			return;
		}
		if (!offerImageInput.files.length) {
			alert("Please upload an image for the offer.");
			return;
		}

		const file = offerImageInput.files[0];
		const validImageTypes = ["image/jpeg", "image/png", "image/jpg"];
		if (!validImageTypes.includes(file.type)) {
			alert("Please upload a valid image file (JPEG, PNG, or JPG).");
			return;
		}

		const newOffer = {
			id: Date.now(), // Unique ID based on timestamp
			name: offerName,
			description: offerDescription,
			image: URL.createObjectURL(file),
		};

		offers.push(newOffer);
		renderOffers(); // Refresh the offers list
		newOfferForm.reset();
		alert("New offer added successfully!");
	});
});

document.addEventListener("DOMContentLoaded", function () {
	// Get the saved products from local storage, or set an empty array if no products are found
	let products = JSON.parse(localStorage.getItem("sellerProducts")) || [];

	// Get the product list container element
	const productList = document.getElementById("productList");

	// Check if there are any products
	if (products.length === 0) {
		// If no products, display a message
		productList.innerHTML = "<p>No products available. Add some products!</p>";
	} else {
		// Otherwise, render the products
		products.forEach((product) => {
			const productBox = document.createElement("div");
			productBox.classList.add("product-box");

			const productName = document.createElement("h3");
			productName.textContent = product.name;
			productBox.appendChild(productName);

			const productDescription = document.createElement("p");
			productDescription.textContent = product.description;
			productBox.appendChild(productDescription);

			const productPrice = document.createElement("p");
			productPrice.textContent = `Price: ${product.price} SAR`;
			productBox.appendChild(productPrice);

			const productQuantity = document.createElement("p");
			productQuantity.textContent = `Quantity: ${product.quantity} pcs`;
			productBox.appendChild(productQuantity);

			const productImage = document.createElement("img");
			productImage.src = product.image;
			productImage.alt = product.name;
			productBox.appendChild(productImage);

			// Append the product box to the product list
			productList.appendChild(productBox);
		});
	}
});
