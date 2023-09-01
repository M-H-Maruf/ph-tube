// fetch data from all category api
const loadCategories = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();
    categories = data.data;
    console.log(categories);
    
}
loadCategories();