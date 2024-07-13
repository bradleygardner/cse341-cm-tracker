import { loadHeaderFooter, get, deleteItem, renderListWithTemplate } from "./utils.js";

await loadHeaderFooter(true, true);

await loadCars();

let deleteBtn = document.querySelectorAll(".delete");

deleteBtn.forEach((btn) => {
    btn.addEventListener("click", deleteCar);
});

async function loadCars() {
    const cars = await get("/car");
    const element = document.getElementById("main-table")
    renderListWithTemplate(carsListTemplate, element, cars)
}

export function carsListTemplate(item) {
    
    return `<li class="item">
       <a href="cars/cardetails?id=${item._id}">
           <h3>Nickname: ${item.nickName}</h3>
           <h3>Year: ${item.year}</h3>
           <h3>Make: ${item.make}</h3>
           <h3>Model: ${item.model}</h3>
           </a>
           <button class="delete" data-id="${item._id}">Delete</button>
   </li>`
}

export async function deleteCar(e) {
    const res = await deleteItem(`/car/${e.target.dataset.id}`)
    // TODO Verify response
}