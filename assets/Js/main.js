import {carNavData,getJSON} from "./render.js";
import {start} from "./navbar.js";
import {slider} from "./slider.js";
import {bodyStart} from "./body.js"
const body = document.querySelector('body')
setTimeout(() => {
    body.style.overflowY = 'auto'
}, 2400);

getJSON()
start(carNavData)
slider()
bodyStart()