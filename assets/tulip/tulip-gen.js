function tulip_gen() {
  var x = document.getElementById("frm1");
  var text = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">'
text += '<g id="arm"><line style="stroke: black; fill: none;" x1="10" y1="10" x2="10" y2="18"/></g>'
text += '<circle style="stroke: rgb(0, 0, 0); stroke-width: 1; fill: white;" cx="10" cy="18" r="1"/>'
  var i;
  for (i = 0; i < x.length ;i++) {
    text += x.elements[i].value;
  }
text += '</svg>'
  document.getElementById("output").innerHTML = text;
}