import { loadHeaderFooter, renderListWithTemplate, get, getParam } from "./utils.js";

const carId = getParam("id");

loadHeaderFooter(true, true);
await populateTitle();
await populateMaintenanceItems();

async function populateTitle() {
    const car = await get(`/car/${carId}`);
    const element = document.getElementById("main-title")
    element.textContent = `${car.nickName} - ${car.year} ${car.make} ${car.model}`
}

async function populateMaintenanceItems() {
    const maintenanceItems = await get(`/maintenance/car/${carId}`);
    const element = document.getElementById("main-table")
    renderListWithTemplate(maintenanceListTemplate, element, maintenanceItems)
}

export function maintenanceListTemplate(item) {

    return `<li class="item">
       <a href="">
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