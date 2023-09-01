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
        if (category.category_id == '1000') {
            categoryButton.classList.add("active")
        }
        categoryButton.textContent = category.category
        categoryContainer.appendChild(categoryButton);
    });
};

// category section end





// 
