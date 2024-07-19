import { loadHeaderFooter, renderListWithTemplate, get, deleteItem, getParam } from "./utils.js";

const carId = getParam("id");

loadHeaderFooter(true, true);
await populateTitle();
await populateMaintenanceItems();

let deleteBtn = document.querySelectorAll(".delete");
deleteBtn.forEach((btn) => {
    btn.addEventListener("click", deleteMaintenanceItem);
});

async function populateTitle() {
    const car = await get(`/car/${carId}`);
    const title = document.getElementById("main-title");
    title.textContent = `${car.nickName} - ${car.year} ${car.make} ${car.model}`;

    const addBtn = document.getElementById("main-btn");
    addBtn.setAttribute("href", `/addmaintenance?id=${carId}`);
}

async function populateMaintenanceItems() {
    const maintenanceItems = await get(`/maintenance/car/${carId}`);
    const element = document.getElementById("main-table")
    renderListWithTemplate(maintenanceListTemplate, element, maintenanceItems)
}

export function maintenanceListTemplate(item) {

    return `<li class="item">
       <a href="maintenancedetails?id=${item._id}">
           <h3>Mileage: ${item.mileage}</h3>
           <h3>Part: ${item.part}</h3>
           <h3>Date Installed: ${item.dateInstalled}</h3>
           <h3>Cost: ${item.cost}</h3>
           <p>Description: ${item.description}</p>
           <p>Notes: ${item.notes}</p>
           </a>
           <button class="delete" data-id="${item._id}">Delete</button>
   </li>`
}

export async function deleteMaintenanceItem(e) {
    const res = await deleteItem(`/maintenance/${e.target.dataset.id}`)
    await populateMaintenanceItems();
}