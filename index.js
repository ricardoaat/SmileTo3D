var Speck = require('speck-renderer');


window.onerror = function (msg, url, lineNo, columnNo, e) {
    let error = document.getElementById("error-alert");
    error.style.display = "block";
    error.innerHTML = " <strong>Ops!</strong> error at: Line #" + lineNo + ": " + msg;
}

window.onload = function () {
    let ctabTab = document.getElementById("ctab-text");
    let xyzTab = document.getElementById("xyz-text");
    let smilesTab = document.getElementById("smiles-text");

    ctabTab.innerText = ctab;
    xyzTab.innerText = xyz;
    smilesTab.innerText = smiles;

    $('#smile-button').on('click', function (event) {
        event.preventDefault();
        onSmileButton();
    });

    speck = new Speck({
        canvasContainerID: "render-container",
        canvasID: "renderer-canvas"
    });
    speck.loadStructure(xyz);

    function onSmileButton() {

        let error = document.getElementById("error-alert");
        error.style.display = "none";

        let smileField = document.getElementById("smile-field");
        if (smileField.value !== null && smileField.value !== '') {
            smileToCtab(smileField.value);
            return;
        }

        alert("Can't go if its empty!");
        return
    }
}

function smileToCtab(smile) {
    $.ajax({
        url: 'https://www.ebi.ac.uk/chembl/api/utils/smiles2ctab',
        type: 'POST',
        data: smile,
    }).done(function (data) {
        CtabToXYZ(data);
        smiles = smile;
        ctab = data;
    }).fail(function (xhr) {
        console.log("ERROR at fetching CTAB file from SMILE", xhr);
        throw xhr;
    });
}

function CtabToXYZ(ctab) {
    $.ajax({
        url: 'https://www.ebi.ac.uk/chembl/api/utils/ctab2xyz',
        type: 'POST',
        data: ctab,
    }).done(function (data) {
        console.log(data);
        xyz = data;
        speck.loadStructure(data);
        updateTabs();

    }).fail(function (xhr) {
        console.log("ERROR getting XYZ file from CTAB ", xhr);
        throw xhr;
    });
}

function updateTabs() {
    let ctabTab = document.getElementById("ctab-text");
    let xyzTab = document.getElementById("xyz-text");
    let smilesTab = document.getElementById("smiles-text");

    ctabTab.innerText = ctab;
    xyzTab.innerText = xyz;
    smilesTab.innerText = smiles;
}


var xyz =
    `24

C	3.27251073693	0.652580837101	-0.0920566983111
N	2.13505268964	-0.259269423977	-0.157526852756
C	2.1745907765	-1.60207434441	-0.340182064122
N	0.943321668184	-2.17626501368	-0.352638418671
C	0.120100095853	-1.12439220996	-0.166868420019
C	0.826179021318	0.0229082068553	-0.0481934686952
C	0.175605934326	1.23251992901	0.156464924168
O	0.832534254873	2.30601992798	0.244545266029
N	-1.19718158378	1.2238831449	0.259210455506
C	-1.90009086897	0.0387553590214	0.111738911438
O	-3.16190849742	0.0449353475265	0.181646792027
N	-1.23932920086	-1.15038111288	-0.112114269907
C	-1.9745133747	-2.41733764529	-0.223623061491
C	-1.92600271476	2.48819894965	0.456373742064
H	4.22502631393	0.0947972903249	-0.216659600226
H	3.19413524101	1.40793154262	-0.901836489861
H	3.28612802291	1.16437176065	0.89301628853
H	3.09092066506	-2.16475947477	-0.464373265853
H	-1.37109322257	-3.19380604346	-0.740246714158
H	-2.24051525952	-2.78309920102	0.790374726733
H	-2.90282339249	-2.27845211525	-0.817994479068
H	-2.84206433025	2.33084253708	1.06489564183
H	-2.21085225451	2.9108439496	-0.530019001329
H	-1.3097307207	3.23124780238	1.00606605614
`

var ctab =
    `     RDKit          2D

14 15  0  0  0  0  0  0  0  0999 V2000
   3.3789   -1.3434    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
   2.4408   -0.1729    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0
   2.8364    1.2740    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
   1.5825    2.0973    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0
   0.4120    1.1592    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
   0.9425   -0.2439    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
  -0.0074   -1.4048    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
   0.5231   -2.8079    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0
  -1.4877   -1.1627    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0
  -2.0182    0.2404    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
  -3.4985    0.4825    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0
  -1.0683    1.4013    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0
  -1.5988    2.8044    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
  -2.4375   -2.3236    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
 1  2  1  0
 2  3  1  0
 3  4  2  0
 4  5  1  0
 5  6  2  0
 6  7  1  0
 7  8  2  0
 7  9  1  0
 9 10  1  0
10 11  2  0
10 12  1  0
12 13  1  0
 9 14  1  0
 6  2  1  0
12  5  1  0
M  END
$$$$
`

var smiles = `CN1C=NC2=C1C(=O)N(C(=O)N2C)C`