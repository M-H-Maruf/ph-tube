// category section start
// fetch data from all category api and perform functionality
const loadCategories = async () => {
    const res = await fetch(
        "https://openapi.programming-hero.com/api/videos/categories"
    );
    const data = await res.json();
    categories = data.data;
    displayCategories(categories);
    console.log(categories);
};
loadCategories();

//   document.addEventListener("DOMContentLoaded", function () {
//     const buttons = document.querySelectorAll(".category-btn");

//     buttons.forEach((button) => {
//       button.addEventListener("click", function () {
//         // Remove the classes from all buttons
//         buttons.forEach((btn) => {
//           btn.classList.remove("active","bg-tube-primary");
//         });

//         // Add classes to the clicked button
//         this.classList.add("active","bg-tube-primary");
//       });
//     });
//   });

// display category buttons
const displayCategories = (categories) => {
    const categoryContainer = document.getElementById("category-container");

    categories.forEach((category) => {
        console.log(category);
        const categoryButton = document.createElement("button");
        categoryButton.classList = `category-btn btn rounded md:text-lg font-medium bg-tube-background text-tube-secondary text-opacity-70 h-fit mb-5`;
        if (category.category_id == "1000") {
            categoryButton.classList.add("active");
        }
        categoryButton.textContent = category.category;
        categoryContainer.appendChild(categoryButton);
    });
};

// category section end

// video card section start
const loadVideos = async () => {
    const res = await fetch(
        "https://openapi.programming-hero.com/api/videos/category/1000"
    );
    const data = await res.json();
    const videos = data.data;
    console.log(videos);
    displayVideos(videos);
};

const displayVideos = (videos) => {
    console.log(videos);

    const videoContainer = document.getElementById("video-container");

    videos.forEach((video) => {
        console.log(video);
        // 2 create a div
        const videoCard = document.createElement("div");
        videoCard.classList = `card w-80 mb-12 gap-5`;
        // 3: set inner html
        videoCard.innerHTML = `
        <figure class="w-80 h-48">
        <img class="rounded-lg w-full h-full object-cover object-center" src=${video.thumbnail} alt="Shoes" />
        </figure>
        <div class="card-body flex flex-row gap-4 p-0">
            <figure class="w-10 h-10 rounded-full">
            <img class="rounded-full w-full h-full object-cover object-center" src=${video.authors[0].profile_picture} alt="profile-picture">
            </figure>
            <div class="card-text">
                <h3 class="text-base text-tube-card font-bold mb-2">${video.title}</h3>
                <div class="flex gap-3">
                    <h2 class="text-sm text-tube-card text-opacity-70 mb-2 inline">${video.authors[0].profile_name}</h2>
                    <img class="w-5 h-5" src="images/tick.png" alt="verified">
                </div>
                <p class="text-sm text-tube-card text-opacity-70">${video.others.views} views</p>
            </div>
        </div>
                `;
        // 4 append child
        videoContainer.appendChild(videoCard);
    });
};

loadVideos();
// video card section end
