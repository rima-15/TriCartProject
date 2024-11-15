document.addEventListener("DOMContentLoaded", function () {
	let offers = [
		{ id: 1, name: "Flash Sale", description: "Quick! This flash sale lasts for only a few hours.", image: "web_images/1offer.jpeg" },
		{ id: 2, name: "Hot & Trending", description: "Check out our hot and trending items.", image: "web_images/2offer.jpeg" },
		{ id: 3, name: "Seasonal Discount", description: "Celebrate the season with our exclusive discounts.", image: "web_images/3offer.jpeg" },
		{ id: 4, name: "Only a Few Left!", description: "Limited quantities available!", image: "web_images/4offer.png" },
		{ id: 5, name: "Save 20%", description: "Enjoy a straight 20% off your purchase.", image: "web_images/5offer.jpeg" },
		{ id: 6, name: "Mystery Discount", description: "Unlock a mystery discount!", image: "web_images/6offer.jpeg" }
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
