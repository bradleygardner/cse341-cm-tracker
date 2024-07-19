import { loadHeaderFooter, save } from "./utils.js";

loadHeaderFooter(true, true);

document.forms["car"].addEventListener("submit", (event) => {
    event.preventDefault();
    saveCar(event.target);
});

async function saveCar(form) {
    let car = {
        nickName: form.elements.nick_name.value,
        year: form.elements.year.value,
        make: form.elements.make.value,
        model: form.elements.model.value
    }
    try {
        const res = await save(car, "/car");
        window.location.href = `../dashboard`
    }
    catch (err) {
        console.log(err);
    }
}