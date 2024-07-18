import { loadHeaderFooter, save, getParam } from "./utils.js";

const maintenanceId = getParam("id");

loadHeaderFooter(true, true);

document.forms["warrantyItem"].addEventListener("submit", (event) => {
    event.preventDefault();
    saveItem(event.target);
});

async function saveItem(form) {
    let item = {
        maintenanceId: maintenanceId,
        purchaseDate: form.elements.purchasedDate.value,
        purchaseFrom: form.elements.purchasedFrom.value,
        expiredDate: form.elements.expiredDate.value,
        notes: form.elements.notes.value,
    }
    try {
        const res = await save(item, "/warranty");
    }
    catch (err) {
        console.log(err);
    }
}