
export function loadHeaderFooter(loadHeader = true, loadFooter = true) {
    if (loadHeader) {
        const headerTemplateFn = loadTemplate("/partials/header.html");
        const header = document.getElementById("main-header");
        renderWithTemplate(headerTemplateFn, header);
    }
    if (loadFooter) {
        const footerTemplateFn = loadTemplate("/partials/footer.html");
        const footer = document.getElementById("main-footer");
        renderWithTemplate(footerTemplateFn, footer);
    }
}

export function getParam(param) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(param);
}

export function loadTemplate(path) {
    return async function () {
        const response = await fetch(path);
        if (response.ok) {
            const html = await response.text();
            return html;
        }
    };
}

export async function renderWithTemplate(
    templateFn,
    parentElement,
    callback,
    data,
    position = "afterbegin",
    clear = true
) {
    if (clear) {
        parentElement.textContent = "";
    }
    const template = await templateFn(data);
    parentElement.insertAdjacentHTML(position, template);

    if (callback) {
        callback(data);
    }
}

export function renderListWithTemplate(
    templateFn,
    parentElement,
    list,
    position = "afterbegin",
    clear = true,
) {
    const items = list.map((items) => templateFn(items));
    if (clear) {
        parentElement.textContent = "";
    }
    parentElement.insertAdjacentHTML(position, items.join(""));
}

export async function save(payload, route) {
    const url = route;
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    }

    const response = await fetch(url, options);
    const data = await convertToJson(response);
    console.log("Data: " + response);
    return data;
}

export async function put(payload, route) {
    const url = route;
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    }

    const response = await fetch(url, options);
    const data = await convertToJson(response);
    console.log("Data: " + response);
    return data;
}

export async function get(route) {
    const response = await fetch(route);
    const data = await convertToJson(response);
    return data;
}

export async function deleteItem (route) {
    const url = route;
    const options = {
        method: "delete",
        headers: {
            "Content-Type": "application/json"
        }
    }

    const response = await fetch(url, options);
    return response;
}

async function convertToJson(res) {
    const jsonResponse = await res.json();
    if (res.ok) {
        return jsonResponse;
    } else {
        throw { name: "servicesError", message: jsonResponse };
    }
}