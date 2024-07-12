import { loadHeaderFooter, save, getParam } from "./utils.js";

const carId = getParam("id");

loadHeaderFooter(true, true);

document.forms["maintenanceItem"].addEventListener("submit", (event) => {
    event.preventDefault();
    saveItem(event.target);
});

async function saveItem(form) {
    let item = {
        carId: carId,
        mileage: form.elements.mileage.value,
        part: form.elements.part.value,
        dateInstalled: form.elements.date_installed.value,
        cost: form.elements.cost.value,
        description: form.elements.description.value,
        notes: form.elements.notes.value,
    }
    try {
        const res = await save(item, "/maintenance");
    }
    catch (err) {
        console.log(err);
    }
}