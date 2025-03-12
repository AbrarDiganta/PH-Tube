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

//load videos
function loadVideo() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos));
}

const displayVideos = (videos) => {
  const videoContainer = document.getElementById("video-container");
  videos.forEach((video) => {
    //create element
    const videoCard = document.createElement("div");
    videoCard.innerHTML = ` <div class="card">
          <figure class="relative">
            <img class="w-full h-[250px] object-cover" src="${video.thumbnail}" alt="video" />
            <span
              class="absolute bottom-2 right-8 text-sm rounded-md text-white bg-black px-4 py-2"
              >3hrs 56 min ago</span
            >
          </figure>

          <div class=" flex gap-3 px-0 py-5">
           <div class="profile">
            <div class="avatar">
                <div class="ring-primary ring-offset-base-100 w-12 rounded-full ring ring-offset-2">
                  <img src="${video.authors[0].profile_picture}" />
                </div>
              </div>
           </div>
           <div class="intro" ><h1 class="text-lg font-semibold">Midnight Serenade</h1>
            <p class=" text-gray-400 flex gap-2">${video.authors[0].profile_name} <img class="h-7 w-7" src="https://img.icons8.com/?size=48&id=QMxOVe0B9VzG&format=png" alt=""></p>
            <p class="text-gray-400">${video.others.views}</p>
        </div>
        </div>`;
    videoContainer.appendChild(videoCard);
  });
};

loadCategories();
loadVideo();
