var currentSvg = "";

function help() {
  var help = document.getElementById("help");

  help.innerHTML = 'Mode is one of R, M, J, T (for clock bearing) or r, m, j, t (for degree bearing). <br>Exit is a number from 1-12 for clock bearing or 0-360 for degree bearing.<br>Other_ExitN are optional additional exits to draw.<br> for example Mode: R, Exit: 9, Others: 12 3 would generate this tulip diagram.<br><img src="R_9_12_3.svg" alt="example tulip diagram" width="20%"><br>Click "Generate" to display the tulip diagram.<br>Click "Download SVG" to download the generated diagram as an SVG file.';
}

function tulip_gen() {
  var form = document.getElementById("frm1");
  var mode = form.elements.mode.value.trim();
  var exitValue = form.elements.exit.value.trim();
  var othersValue = form.elements.others.value.trim();
  var output = document.getElementById("output");

  var values = [];
  if (exitValue !== "") {
    values.push(exitValue);
  }

  if (othersValue !== "") {
    values = values.concat(othersValue.split(/\s+/).filter(Boolean));
  }

  var rotationMultiplier = 1;
  var rotationOffset = 180;

  if (mode === "R" || mode === "M" || mode === "J" || mode === "T") {
    rotationMultiplier = 30;
    rotationOffset = 6;
  }

  var text = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">';
  text += '<g id="arm"><line style="stroke: black; fill: none;" x1="10" y1="10" x2="10" y2="18"/></g>';
  text += '<circle style="stroke: rgb(0, 0, 0); stroke-width: 1; fill: white;" cx="10" cy="18" r="1"/>';

  var parsedExit = parseFloat(exitValue);
  if (!isNaN(parsedExit)) {
    text += '<path style="fill: none; stroke: rgb(0, 0, 0);" d="M 8 4 L 10 2 L 12 4" transform="rotate(' + (parsedExit * rotationMultiplier) + ' 10 10)"></path>';
  } else {
    text += '<path style="fill: none; stroke: rgb(0, 0, 0);" d="M 8 4 L 10 2 L 12 4"></path>';
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

    text += '<use href="#arm" transform="rotate(' + ((parsedValue + rotationOffset) * rotationMultiplier) + ' 10 10)" />';
  }

  if (mode === "R" || mode === "r") {
    text += '<circle style="stroke: rgb(0, 0, 0); stroke-width: 1; fill: white;" cx="10" cy="10" r="3"/><path style="fill: none; stroke: rgb(255, 255, 255);" d="M 10 10 L 13 13"/>';
  } else if (mode === "M" || mode === "m") {
    text += '<circle style="stroke: rgb(0, 0, 0); stroke-width: 1; fill: white;" cx="10" cy="10" r="1"/>';
  } else if (mode === "T" || mode === "t") {
    text += '<text x="3" y="18" font-size="7">&#x1F6A6</text>';
  }

  text += '</svg>';
  currentSvg = text;
  output.innerHTML = currentSvg;
}

function download_svg() {
  if (!currentSvg) {
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