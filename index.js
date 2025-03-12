//taking the category

function loadCategories() {
  //fetch data
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));
}

function displayCategories(categories) {
  //get the container
  const categoryContainer = document.getElementById("category-container");
  for (category of categories) {
    //create element
    const createDiv = document.createElement("div");
    createDiv.innerHTML = `<button class="btn hover:bg-[#FF1F3D] hover:text-white ">${category.category}</button>
    `;
    categoryContainer.appendChild(createDiv);
  }
}

loadCategories();
