import "./style.css";

export function contentArea(sidebar, list) {
    let component = document.createElement("div");
    component.classList.add("content");

    component.append(sidebar(), list());

    return component;
}
