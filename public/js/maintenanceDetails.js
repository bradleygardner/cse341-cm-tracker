import { loadHeaderFooter, renderListWithTemplate, get, deleteItem, getParam } from "./utils.js";

const maintenanceId = getParam("id");

loadHeaderFooter(true, true);
await populateTitle();
await populateWarrantyItems();

let deleteBtn = document.querySelectorAll(".delete");
deleteBtn.forEach((btn) => {
    btn.addEventListener("click", deleteWarranty);
});

async function populateTitle() {
    const item = await get(`/maintenance/${maintenanceId}`);
    const title = document.getElementById("main-title");
    title.textContent = `${item.part} - ${item.cost} ${item.dateInstalled}`;

    const addBtn = document.getElementById("main-btn");
    addBtn.setAttribute("href", `/addwarranty?id=${maintenanceId}`);
}

async function populateWarrantyItems() {
    const warrantyItems = await get(`/warranty/maintenance/${maintenanceId}`);
    const element = document.getElementById("main-table")
    renderListWithTemplate(warrantyListTemplate, element, warrantyItems)
}

export function warrantyListTemplate(item) {

    return `<li class="item">
       <a href="">
           <h3>Purchased From: ${item.purchasedFrom}</h3>
           <h3>Purchased Date: ${item.purchasedDate}</h3>
           <h3>Expires: ${item.expiresDate}</h3>
           <p>Notes: ${item.notes}</p>
           </a>
           <button class="delete" data-id="${item._id}">Delete</button>
   </li>`
}
export async function deleteWarranty(e) {
    const res = await deleteItem(`/warranty/${e.target.dataset.id}`)
    await populateWarrantyItems();
}