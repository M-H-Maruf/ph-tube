// category section start
// fetch data from all category api and perform functionality
const loadCategories = async () => {
    const res = await fetch(
        "https://openapi.programming-hero.com/api/videos/categories"
    );
    const data = await res.json();
    categories = data.data;
    displayCategories(categories);
    // console.log(categories);
};
loadCategories();

// display category buttons
const displayCategories = (categories) => {
    const categoryContainer = document.getElementById("category-container");

    categories.forEach((category) => {
        // console.log(category);

        const categoryButton = document.createElement("button");

        categoryButton.classList = `category-btn btn rounded md:text-lg font-medium bg-tube-background text-tube-secondary text-opacity-70 h-fit mb-5`;
        if (category.category_id == "1000") {
            categoryButton.classList.add(
                "active",
                "bg-tube-primary",
                "text-white",
                "text-opacity-100",
                "hover:text-tube-primary",
                "hover:border-2",
                "hover:border-tube-primary"
            );
        }
        categoryButton.textContent = category.category;
        categoryButton.setAttribute("id", category.category_id);

        categoryContainer.appendChild(categoryButton);
    });
    // category button functionality

    const buttons = document.querySelectorAll(".category-btn");

    buttons.forEach((button) => {
        button.addEventListener("click", function (event) {
            // Remove the classes from all buttons
            buttons.forEach((btn) => {
                btn.classList.remove(
                    "active",
                    "bg-tube-primary",
                    "text-white",
                    "text-opacity-100",
                    "hover:text-tube-primary",
                    "hover:border-2",
                    "hover:border-tube-primary"
                );
            });

            // Add classes to the clicked button
            this.classList.add(
                "active",
                "bg-tube-primary",
                "text-white",
                "text-opacity-100",
                "hover:text-tube-primary",
                "hover:border-2",
                "hover:border-tube-primary"
            );

            // load new category
            let id = event.target.id;
            loadVideos(id);
        });
    });
};

// category section end

// video card section start
const loadVideos = async (id) => {
    const res = await fetch(
        `https://openapi.programming-hero.com/api/videos/category/${id}`
    );
    const data = await res.json();
    const videos = data.data;
    // console.log(videos);
    // clear previous video cards
    const content = document.getElementById("video-container");
    content.innerHTML = ``;

    const sort = document.getElementById('sort');
    sort.addEventListener('click',function() {

        // console.log(sortedVideos);
        if (videos.length!==0) {
            let sortedVideos = videos.sort(
                (a, b) => parseFloat(b.others.views) - parseFloat(a.others.views)
            );
            // clear previous video cards
        const content = document.getElementById("video-container");
        content.innerHTML = ``;
        displayVideos(sortedVideos);
        }
        console.log(videos.length);
    });
    if (videos.length!==0) {
    displayVideos(videos);}
    else {
        content.innerHTML = `
        <section class="error-message-container w-screen h-full flex justify-center items-center mt-8">
            <div class="error-message max-w-md text-center flex flex-col justify-center items-center gap-8">
                <img src="images/Icon.png" alt="loading error">
                <h1 class="text-tube-card text-4xl font-bold">Oops!! Sorry, There is no content here</h1>
            </div>
        </section>

        `;
    }
};

const displayVideos = (videos) => {
    // console.log(videos);

    const videoContainer = document.getElementById("video-container");

    videos.forEach((video) => {
        // console.log(video);

        const videoCard = document.createElement("div");
        videoCard.classList = `card w-80 mb-12 gap-5`;

        // calculate time stamp

        let seconds = parseInt(video.others.posted_date);
        let days = Math.floor(seconds / 86400);
        seconds %= 86400;
        const hours = Math.floor(seconds / 3600);
        seconds %= 3600;
        const minutes = Math.floor(seconds / 60);
        seconds %= 60;
        const years = Math.floor(days / 365);

        // Construct the time string
        let timeString = "";
        if (years > 0) {
            timeString = years + " years ";
        } else {
            if (days > 0) {
                timeString += days + " days ";
            }
            if (hours > 0) {
                timeString += hours + " hrs ";
            }
            if (minutes > 0) {
                timeString += minutes + " min ";
            }
        }
        let formattedTime = "";
        if (seconds > 0 || years > 0) {
            formattedTime =
                '<h6 class="absolute bg-tube-card p-1 text-white text-xs rounded right-3 bottom-3 w-fit">' +
                timeString +
                " ago</h6>";
        }

        // console.log(formattedTime);

        //   verification
        let verified = "";
        if (video.authors[0].verified == true) {
            verified =
                '<img class="w-5 h-5" src="images/tick.png" alt="verified">';
        }

        videoCard.innerHTML = `
        <figure class="w-80 h-48 relative">
        <img class="rounded-lg w-full h-full object-cover object-center" src=${video.thumbnail} alt="Shoes"/>        
        ${formattedTime}
        </figure>
        <div class="card-body flex flex-row gap-4 p-0">
            <figure class="w-10 h-10 rounded-full">
            <img class="rounded-full w-full h-full object-cover object-center" src=${video.authors[0].profile_picture} alt="profile-picture">
            </figure>
            <div class="card-text">
                <h3 class="text-base text-tube-card font-bold mb-2">${video.title}</h3>
                <div class="flex gap-3">
                    <h2 class="text-sm text-tube-card text-opacity-70 mb-2 inline">${video.authors[0].profile_name}
                    
                    
                    </h2>
                    ${verified}
                </div>
                <p class="text-sm text-tube-card text-opacity-70">${video.others.views} views</p>
            </div>
        </div>
                `;

        videoContainer.appendChild(videoCard);
    });
};
// sort by views button functionality

loadVideos((id = 1000));
// video card section end
