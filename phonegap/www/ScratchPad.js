if ($(".gList")) {
  console.log("jquery working");
}
// testing stuff
const SAMPLE_LIST = [
  {
    name: "Apples",
    notes: "and grapes",
    quant: "10"
  },{
    name: "Grapes",
    notes: "and apples",
    quant: "10"
  },{
    name: "Yogurt",
    notes: "I need a pretty long notes text so I will just write a ton of nonsense here just to fill in the space that I need to properly asses the compatability of the current layout of the list items",
    quant: "20"
  },{
    name: "Milk",
    notes: "3x 1%, 1x skim",
    quant: null
  },{
    name: "Oranges",
    notes: null,
    quant: null
  },{
    name: "Tostitos",
    notes: null,
    quant: "4"
  },{
    name: "Apples",
    notes: "and grapes",
    quant: "10"
  },{
    name: "Apples",
    notes: "and grapes",
    quant: "10"
  },{
    name: "Apples",
    notes: "and grapes",
    quant: "10"
  },{
    name: "Apples",
    notes: "and grapes",
    quant: "10"
  },{
    name: "Apples",
    notes: "and grapes",
    quant: "10"
  },{
    name: "Apples",
    notes: "and grapes",
    quant: "10"
  },{
    name: "Apples",
    notes: "and grapes",
    quant: "10"
  },{
    name: "Apples",
    notes: "and grapes",
    quant: "10"
  },{
    name: "Apples",
    notes: "and grapes",
    quant: "10"
  },
];

// param


// const
const MENU_ITEMS = ["pList", "cart", "settings", "gList"];

// socket


// non-application-specific helper functions.
function makeKey(length = 10, type = "alphanum") {
  let types = {
    alpha: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    alphal: "abcdefghijklmnopqrstuvwxyz",
    alphau: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    alphanum: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
    num: "0123456789"
  }
  if (length < 1) {
    return "";
  }
  let key = "";
  for (i = 0; i<length; i++) {
    if(i==0 && type="alphanum"){
      key += types[type][Math.floor((Math.random() * types[type].length) - 10)]
    }else{
      key += types[type][Math.floor(Math.random() * types[type].length)]
    }
  }
  return key;
}

// init
function init() {
  if (true) {

  }
}

// bottom nav listeners
$(".navitem.pList").on("touchend", function() {
  changeView("pList");
});

$(".navitem.gList").on("touchend", function() {
  changeView("gList");
});

$(".navitem.cart").on("touchend", function() {
  changeView("cart");
});

$(".navitem.settings").on("touchend", function() {
  changeView("settings");
});
// gListControl listeners
// other listeners


// operations


// display
function changeView(view) {
  switch (view) {
    case "pList":
      $(".content").load("pList.html");
      for (var index in MENU_ITEMS) {
        var item = MENU_ITEMS[index];
        $(".navIcon." + item).attr("src", ("icon/" + item + ((item == view) ? "-active" : "") + ".svg"));
      }      // need this complicated thing to make sure all other buttons are set to inactive
      break;

    case "gList":
      $(".content").load("gList.html", function() {
        refreshList(SAMPLE_LIST, "gList");
      });
      for (var index in MENU_ITEMS) {
        var item = MENU_ITEMS[index];
        $(".navIcon." + item).attr("src", ("icon/" + item + ((item == view) ? "-active" : "") + ".svg"));
      }      // need this complicated thing to make sure all other buttons are set to inactive
      break;

    case "cart":
      $(".content").load("cart.html", function() {
        refreshList(SAMPLE_LIST, "cList")
      });
      for (var index in MENU_ITEMS) {
        var item = MENU_ITEMS[index];
        $(".navIcon." + item).attr("src", ("icon/" + item + ((item == view) ? "-active" : "") + ".svg"));
      }      // need this complicated thing to make sure all other buttons are set to inactive
      break;

    case "settings":
      $(".content").load("settings.html");
      for (var index in MENU_ITEMS) {
        var item = MENU_ITEMS[index];
        $(".navIcon." + item).attr("src", ("icon/" + item + ((item == view) ? "-active" : "") + ".svg"));
      }      // need this complicated thing to make sure all other buttons are set to inactive
      break;

    default:
      throw Error("Invalid View Option");
  }
}

function itemToHtml(item, listType) {
  if (listType == "pList") {
    return `<li class="gListItem"><h2 class="itemTitle">${item.name?item.name:""}</h2><p class="itemNotes">${item.notes?item.notes:""}</p><p class="quant">${item.quant?item.quant:""}</p><div class="listControl pListControl"><img src="icon/trash.svg" alt="delete"><img src="icon/addCart.svg" alt="add to cart"></div></li>`;
  } else if (listType == "gList") {
    return `<li class="gListItem"><h2 class="itemTitle">${item.name?item.name:""}</h2><p class="itemNotes">${item.notes?item.notes:""}</p><p class="quant">${item.quant?item.quant:""}</p><div class="listControl gListControl"><img src="icon/trash.svg" alt="delete"><img src="icon/addCart.svg" alt="add to cart"></div></li>`;
  } else if (listType == "cList") {
    return `<li class="gListItem"><h2 class="itemTitle">${item.name?item.name:""}</h2><p class="itemNotes">${item.notes?item.notes:""}</p><p class="quant">${item.quant?item.quant:""}</p><div class="listControl cListControl"><img src="icon/trash.svg" alt="delete"><img src="icon/removeCart.svg" alt="add to cart"></div></li>`;
  }
}

function refreshList(list, listType) {
  var listElement = $("ul." + listType)[0];
  $(listElement).empty();
  for (var item in list) {
    $(listElement).append(itemToHtml(list[item], listType));
  }
}


changeView("gList");
init();
