var input = document.querySelector("textarea"),
    button = document.querySelector("#create"),
    dashboard = document.querySelector("#dashboard"),
    db = document.querySelector("#db");

button.addEventListener("click", function(){
  var string = input.value;
  stringToTables(string);
  input.value = "";
  db.textContent = string;
});

window.addEventListener("resize", function(){
  var string = db.textContent;
  stringToTables(string);
});

function stringToTables(string){
  if (string) {
    // delete all tables
    for (var i = 0; i < dashboard.children.length; i++) {
      if (dashboard.children[i].tagName === "TABLE") {
        dashboard.removeChild(dashboard.children[i]);
        i -= 1;
      }
    }

    // convert input string to tablature strings
    var tabs = readInputString(string);

    do {
      // create table
      var cells = createTableIn(dashboard);
      // checks for the maximum string length for one line
      var strLength = maxStringLength(cells[0]);
      // writes each tab on each row
      cells.forEach(function(cell, i){
        cell.textContent = tabs[i].slice(0, strLength - 1);
      });
      // removes from tabs the written part
      tabs.forEach(function(tab, i){
        tabs[i] = tab.slice(strLength - 1, tab.length);
      });
    } while(tabs[0].length > 0);
  }
}

function createTableIn(element){
  var table = document.createElement("table"),
      tbody = document.createElement("tbody"),
      cells = [];
  for (var i = 0; i < 6; i++){
    var tr = document.createElement("tr"),
        td = document.createElement("td"),
        text = document.createTextNode("");
    td.appendChild(text);
    tr.appendChild(td);
    tbody.appendChild(tr);
    cells.push(td);
  }
  table.appendChild(tbody);
  element.appendChild(table);
  return cells;
}

function cellsFromTable(table){
  var cells = [];
  for (var i = 0; i < table.children.length; i++) {
    if (table.children[i].tagName === "TBODY") {
      var tbody = table.children[i];
      break
    }
  }

  for (var row = 0; row < tbody.children.length; row++){
    if (tbody.children[row].tagName === "TR") {
      var tr = tbody.children[row];
      cells.push([]);
      for (var col = 0; col < tr.children.length; col++){
        if (tr.children[col].tagName === "TD"){
          var td = tr.children[col];
          cells[cells.length - 1].push(td);
        }
      }
    }
  }
  return cells;
}

function maxStringLength(element){
  var initialText, text;
  initialText = element.textContent;
  text = "a";
  element.textContent = text;

  var heights = getHeights(element),
      lineHeight = heights[0],
      height = heights[1];

  while (height === lineHeight && text.length < 200){
    text += "a";
    element.textContent = text;

    var heights = getHeights(element)
    lineHeight = heights[0],
    height = heights[1];
  }
  element.textContent = initialText;
  return (text.length - 1);
}

function getHeights(element){
  var style = window.getComputedStyle(element),
      lineHeight = style.lineHeight,
      height = style.height;

  lineHeight = Number(lineHeight.slice(0, lineHeight.length - 2));
  height = Number(height.slice(0, height.length - 2));
  return [lineHeight, height];
}

function readInputString(string){
  // creates the six strings related to each chord
  var strings = ["", "", "", "", "", ""];
  // add spaces so the first and last words are counted
  string = " " + string + " ";
  // get the indexes of spaces
  var spaces = allIndexesOf(string, " ");

  for (var i = 0; i < spaces.length - 1; i++){
    // for each word ...
    var word = string.slice(spaces[i] + 1, spaces[i+1]);
    strings.forEach(function(str, i){
      var oper = word.slice(2, word.length) + "--";
      if (i === Number(word[0])){
        // write the tab on the selected chord
        strings[i] += oper;
      } else {
        // fill the other tabs with dashes
        strings[i] += Array(oper.length + 1).join("-");
      }
    });
  }
  return strings;
}

function allIndexesOf(string, character){
  var idx = [];
  var k = 0;
  var i = 0;

  while (k !== -1){
    var k = string.indexOf(character, i);
    if (k !== -1) {
      idx.push(k);
      i = k + 1;
    }
  }
  return idx;
}

// function sliceOneLine(element, string) {
//   // element must have a lineHeight property set
//   var initialText, text, i;
//
//   if (!string){
//     return [string, null];
//   }
//
//   i = 0;
//   initialText = element.textContent;
//   text = string.slice(i, i + 10);
//   element.textContent = text;
//
//   var style = window.getComputedStyle(element),
//       lineHeight = style.lineHeight,
//       height = style.height;
//
//   lineHeight = Number(lineHeight.slice(0, lineHeight.length - 2));
//   height = Number(height.slice(0, height.length - 2));
//
//   while (height === lineHeight && text.length < 200 && i < string.length){
//     i += 1;
//     text = string.slice(0, i + 10);
//     element.textContent = text;
//
//     style = window.getComputedStyle(element),
//     lineHeight = style.lineHeight,
//     height = style.height;
//
//     lineHeight = Number(lineHeight.slice(0, lineHeight.length-2));
//     height = Number(height.slice(0, height.length-2));
//
//   }
//
//   element.textContent = initialText;
//   return [string.slice(0, i + 10 - 1), string.slice(i + 10 - 1, string.length)];
// }
