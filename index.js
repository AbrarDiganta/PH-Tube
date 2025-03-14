//remove active class

function removeActiveClass() {
  const activeButtons = document.getElementsByClassName("active");
  for (let btn of activeButtons) {
    btn.classList.remove("active");
  }
}
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
    createDiv.innerHTML = `<button id="btn-${category.category_id}" onClick="loadCategoryVideos(${category.category_id})" class="btn hover:bg-[#FF1F3D] hover:text-white ">${category.category}</button>
    `;
    categoryContainer.appendChild(createDiv);
  }
}

//load videos
function loadVideo() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => {
      removeActiveClass();
      document.getElementById("btn-all").classList.add("active");
      displayVideos(data.videos);
    });
}

//load video detaisl
const loadVideoDetails = (videoId) => {
  console.log(videoId);
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayVideoDetails(data.video));
};

//dissply vide details
const displayVideoDetails = (video) => {
  console.log(video);
  document.getElementById("video-details").showModal();
  const detailsContainer = document.getElementById("details-container");
  detailsContainer.innerHTML = `<div class="card bg-base-100  shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${video.title}</h2>
    <p>${video.description}</p>
    <div class="card-actions justify-end">
      
    </div>
  </div>
</div>`;
};

//load videios by category

const loadCategoryVideos = (id) => {
  const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActiveClass();
      const clickedButton = document.getElementById(`btn-${id}`);
      clickedButton.classList.add("active");

      displayVideos(data.category);
    });
};

const displayVideos = (videos) => {
  const videoContainer = document.getElementById("video-container");
  videoContainer.innerHTML = "";

  if (videos.length == 0) {
    videoContainer.innerHTML = `  <div
          class="col-span-full text-center flex flex-col justify-center items-center py-20"
        >
          <img src="Images/Icon.png" alt="" class="w-[150px]" />
          <h2 class="text-2xl font-bold mt-10">Oops!! Sorry No Content Here</h2>
        </div>`;
    return;
  }

  videos.forEach((video) => {
    //create element
    const videoCard = document.createElement("div");
    videoCard.innerHTML = `<div>
     <div class="card">
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
       
        </div>
        <div class="flex justify-center items-center"
        > <button onclick=loadVideoDetails("${video.video_id}") class="btn  w-full text-center">Show Details</button> </div>
        
          </div>`;

    videoContainer.appendChild(videoCard);
  });
};

loadCategories();
