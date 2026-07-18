var currentSvg = "";
var helpText =
  'Help:<br>Mode is one of R, M, J, T, r, m, j, t.<br>'+
  'R,r = Roundabout, M,m = Mini-roundabout, J,j = Junction, T,t = Traffic.<br>'+
  'For uppercase modes, Exit and Other exits must be numbers from 0-12.(bearing by clock position)<br>'+
  'For lowercase modes, Exit and Other exits must be numbers from 0-360.(bearing by degrees)<br>'+
  'Other_ExitN are optional additional exits to draw.<br>'+
  'For example Mode: R, Exit: 9, Others: 12 3 would generate this tulip diagram.<br>'+
  '<img src="R_9_12_3.svg" alt="example tulip diagram"><br>'+
  'Click "Generate" to display the tulip diagram.<br>'+
  'Click "Download SVG" to download the generated diagram as an SVG file.';
function help() {
  var help = document.getElementById("help");

  help.innerHTML = helpText;
  var exampleImg = help.querySelector("img");
  if (exampleImg) {
    exampleImg.style.width = "20%";
    exampleImg.style.height = "auto";
  }
}

function tulip_gen() {
  var form = document.getElementById("frm1");
  var mode = form.elements.mode.value.trim();
  var exitValue = form.elements.exit.value.trim();
  var othersValue = form.elements.others.value.trim();
  var output = document.getElementById("output");

  function isNumericToken(value) {
    return /^\d+(?:\.\d+)?$/.test(value);
  }

  var errors = [];
  if (!/^[RrMmJjTt]$/.test(mode)) {
    errors.push("Mode must be one of R, M, J, T, r, m, j, t.");
  }

  var minExit = 0;
  var maxExit = mode === mode.toUpperCase() ? 12 : 360;
  var parsedExit = parseFloat(exitValue);
  if (exitValue === "" || !isNumericToken(exitValue)) {
    errors.push("Exit " + exitValue + " must be a number.");
  } else if (parsedExit < minExit || parsedExit > maxExit) {
    errors.push(
      "Exit " +
        exitValue +
        " must be between " +
        minExit +
        "-" +
        maxExit +
        " for mode " +
        mode +
        ".",
    );
  }

  var values = [];
  if (exitValue !== "") {
    values.push(exitValue);
  }

  if (othersValue !== "") {
    var otherValues = othersValue.split(/\s+/).filter(Boolean);
    for (var j = 0; j < otherValues.length; j++) {
      var otherValue = otherValues[j];
      if (!isNumericToken(otherValue)) {
        errors.push('Other exit "' + otherValue + '" must be a number.');
        continue;
      }
      var parsedOther = parseFloat(otherValue);
      if (parsedOther < minExit || parsedOther > maxExit) {
        errors.push(
          'Other exit "' +
            otherValue +
            '" must be between ' +
            minExit +
            "-" +
            maxExit +
            " for mode " +
            mode +
            ".",
        );
      } else {
        values.push(otherValue);
      }
    }
  }

  if (errors.length > 0) {
    output.innerHTML =
      '<span style="color: red;">' +
      errors.join("<br>") +
      "</span>";
    help();
    currentSvg = "";
    return;
  }

  var rotationMultiplier = 1;
  var rotationOffset = 180;

  if (mode === "R" || mode === "M" || mode === "J" || mode === "T") {
    rotationMultiplier = 30;
    rotationOffset = 6;
  }

  var text = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">';
  text +=
    '<g id="arm"><line style="stroke: #000; fill: none;" x1="10" y1="10" x2="10" y2="18"/></g>';
  text +=
    '<circle style="stroke: #000; stroke-width: 1; fill: #FFF;" cx="10" cy="18" r="1"/>';

  var parsedExit = parseFloat(exitValue);
  if (!isNaN(parsedExit)) {
    text +=
      '<path style="fill: none; stroke: #000;" d="M 8 4 L 10 2 L 12 4" transform="rotate(' +
      parsedExit * rotationMultiplier +
      ' 10 10)"></path>';
  } else {
    text +=
      '<path style="fill: none; stroke: #000;" d="M 8 4 L 10 2 L 12 4"></path>';
  }

  for (var i = 0; i < values.length; i++) {
    var value = values[i];
    if (value === "R" || value === "M" || value === "J" || value === "T") {
      continue;
    }

    var parsedValue = parseFloat(value);
    if (isNaN(parsedValue)) {
      continue;
    }

    text +=
      '<use href="#arm" transform="rotate(' +
      (parsedValue + rotationOffset) * rotationMultiplier +
      ' 10 10)" />';
  }

  if (mode === "R" || mode === "r") {
    text +=
      '<circle style="stroke: #000; stroke-width: 1; fill: #FFF;" cx="10" cy="10" r="3"/><path style="fill: none; stroke: #FFF;" d="M 10 10 L 13 13"/>';
  } else if (mode === "M" || mode === "m") {
    text +=
      '<circle style="stroke: #000; stroke-width: 1; fill: #FFF;" cx="10" cy="10" r="1"/>';
  } else if (mode === "T" || mode === "t") {
    text += '<text x="3" y="18" font-size="7">&#x1F6A6</text>';
  }
  if (mode === "J" || mode === "j" || mode === "T" || mode === "t") {
    text += '<circle style="fill: #000;" cx="10" cy="10" r="0.5"/>';
  }
  text += "</svg>";
  currentSvg = text;
  output.innerHTML = currentSvg;
  var exampleImg = output.querySelector("svg");
  if (exampleImg) {
    exampleImg.style.width = "20%";
    exampleImg.style.height = "auto";
  }
}

function download_svg() {
  if (!currentSvg) {
    help();
    output.innerHTML =
      '<span style="color: red;">No tulip diagram generated yet.</span>';
    return;
  }

  var form = document.getElementById("frm1");
  var mode = (form.elements.mode.value || "tulip").trim();
  var exitValue = (form.elements.exit.value || "").trim();
  var othersValue = (form.elements.others.value || "").trim();
  var values = [];
  if (othersValue !== "") {
    values = values.concat(othersValue.split(/\s+/).filter(Boolean));
  }
  var fileName = mode;

  if (exitValue) {
    fileName += "_" + exitValue;
  }

  for (var i = 0; i < values.length; i++) {
    fileName += "_" + values[i];
  }

  fileName += ".svg";

  var blob = new Blob([currentSvg], { type: "image/svg+xml;charset=utf-8" });
  var url = URL.createObjectURL(blob);
  var link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
