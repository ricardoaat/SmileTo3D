import Speck from "../node_modules/speck-renderer/index.js"

var xyz = `
5
methane molecule (in ångströms)
C        0.000000        0.000000        0.000000
H        0.000000        0.000000        1.089000
H        1.026719        0.000000       -0.363000
H       -0.513360       -0.889165       -0.363000
H       -0.513360        0.889165       -0.363000

`

$(document).ready(function () {
    console.log("Starting");
    speck = new Speck({canvasContainerID: "render-container", canvasID: "renderer-canvas"});
    console.log(speck);
    speck.loadStructure(xyz);
});
