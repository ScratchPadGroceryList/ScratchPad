if ($(".gList")) {
  console.log("jquery working");
}
// testing stuff
const SAMPLE_STORAGE = {
  "user": {
    "name": "John Smith",
    "username": "jsmith244",
    "pList": {
      "7374rjaskK": {
        "name": "Apples",
        "notes": "and grapes",
        "quant": "10"
      },
      "2Hyd3y73Ht": {
        "name": "Grapes",
        "notes": "and apples",
        "quant": "10"
      }
    }
  },
  
  "settings": {
    "sampleBoolSetting": false,
    "sampleNumSetting": 100,
    "sampleStringSetting": "string"
  },
  
  "family": {
    "gList": {
      "a7H77snw3k": {
        "name": "Yogurt",
        "notes": "I need a pretty long notes text so I will just write a ton of nonsense here just to fill in the space that I need to properly asses the compatability of the current layout of the list items",
        "quant": "20"
      },
      "8hh2dKKtw4": {
        "name": "Milk",
        "notes": "3x 1%, 1x skim",
        "quant": null
      },
      "188FhUqm84": {
        "name": "Oranges",
        "notes": null,
        "quant": null
      },
      "Aii38Uy7Et": {
        "name": "Tostitos",
        "notes": null,
        "quant": "4"
      }
    }
  }
}

// param


// const
const MENU_ITEMS = ["pList", "cart", "settings", "gList"];

// socket


// non-application-specific helper functions.
function makeKey(length = 10, type = "alphanum", prefix = null) {
  let types = {
    alpha: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    alphal: "abcdefghijklmnopqrstuvwxyz",
    alphau: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    alphanum: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
    num: "0123456789"
  }
  let key = "";
  if (prefix) {
    key += prefix;
    key += "-";
  }
  if (length < 1) {
    return key;
  }
  for (i = 0; i<length; i++) {
    key += types[type][Math.floor(Math.random() * types[type].length)];
  }
  return key;
}

// init
function init() {
  if (true) {

  }
}

// bottom nav listeners
$(".navitem.pList").on("touchend", () => {
  changeView("pList");
});

$(".navitem.gList").on("touchend", () => {
  changeView("gList");
});

$(".navitem.cart").on("touchend", () => {
  changeView("cart");
});

$(".navitem.settings").on("touchend", () => {
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
