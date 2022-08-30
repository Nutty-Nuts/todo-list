// import styling
import "./style.css";

// import components
import { navBar } from "./navbar";
import { contentArea } from "./content";
import { sideBar } from "./sidebar";
import { listArea } from "./list";

document.querySelector(".container").append(navBar());
document.querySelector(".container").append(contentArea(sideBar, listArea));
