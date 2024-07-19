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
        purchasedDate: form.elements.purchasedDate.value,
        purchasedFrom: form.elements.purchasedFrom.value,
        expiredDate: form.elements.expiredDate.value,
        notes: form.elements.notes.value,
    }
    try {
        const res = await save(item, "/warranty");
        window.location.href = `../maintenancedetails?id=${maintenanceId}`
    }
    catch (err) {
        console.log(err);
    }
}