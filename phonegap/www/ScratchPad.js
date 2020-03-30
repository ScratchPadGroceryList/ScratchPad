// testing stuff
const SAMPLE_STORAGE = {
  "user": {
    "name": "John Smith",
    "username": "jsmith244",
    "authToken": "qwertyuiopasdfghjklzxcvbnm0123456789",
    "familyKeys": ["asdf", "8KjskL8Hgr"],
    "activeFamilyKey": "asdf",
    "pList": {
      "7374rjaskK": {
        "name": "Apples",
        "notes": "and grapes",
        "quant": "10",
        "tags": []
      },
      "2Hyd3y73Ht": {
        "name": "Grapes",
        "notes": "and apples",
        "quant": "10",
        "tags": []
      }
    },
    "userSettings": {
    }
  },
  
  "localSettings": {
    "dev": true
  },
  
  "family": {
    "gList": {
      "g-a7H77snw3k": {
        "name": "Yogurt",
        "notes": "I need a pretty long notes text so I will just write a ton of nonsense here just to fill in the space that I need to properly asses the compatibility of the current layout of the list items",
        "quant": "20",
        "tags": ["tag1", "tag2", "tag3", "tag4", "tag5", "tag6", "tag7", "tag8", "tag9", "tag10", "tag12", "tag13", "tag14", "tag15", "tag16", "tag17", "tag18", "tag19", "tag20", "tag21", "tag22", "tag23", "tag24", "tag25"]
      },
      "g-8hh2dKKtw4": {
        "name": "Milk",
        "notes": "3x 1%, 1x skim",
        "quant": null,
        "tags": ["I wrote a small essay in this tag, its really long and I need to make sure it doesnt make the UI look stupid."]
      },
      "g-188FhUqm84": {
        "name": "Oranges",
        "notes": null,
        "quant": null,
        "tags": []
      },
      "g-1abbab5m84": {
        "name": "Pears",
        "notes": null,
        "quant": null,
        "tags": ["Byerlys", "Target"]
      },
      "g-1ffFh28344": {
        "name": "Apples",
        "notes": null,
        "quant": null,
        "tags": ["Cub"]
      },
      "g-Aii38Uy7Et": {
        "name": "Tostitos",
        "notes": null,
        "quant": "4",
        "tags": ["*/~Kevin~/*", "Never Enough"]
      }
    }
  }
}

// param
const DEV = SAMPLE_STORAGE.localSettings.dev;

// const
const MENU_ITEMS = ["pList", "cart", "settings", "gList"];

// socket setup
var socket = io("http://ScratchPad" + (DEV?"":"") + ".herokuapp.com");
// socket listeners
socket.on('init-response', function(data) { // contains: private list, family grocery list, and family settings
  
});

socket.on()

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
// sListControl listeners
$('div.sListControl').on("touchend", function(e) {
  console.log(e);
})
// other listeners
function localforageTest() {
  localforage.getItem('taps', function(err, val) {
    function cont(from) {
      console.log("keeping track of taps");
      $(document).on('touchend', function() {
        console.log("tap detected");
        localforage.getItem('taps', function(err, val) {
          localforage.setItem('taps', val + 1);
          $('#tapCounter').text(val);
        });
      });
    }
    
    if (val === undefined) {
      localforage.setItem('taps', 0, function() {
        console.log("reset tap count");
        cont();
      });
    } else {
      cont();
    }
    
  });
}
DEV?localforageTest():null;

// operations


// display
function changeView(view) {
  switch (view) {
    case "pList":
      $(".content").load("pList.html", function() {
        refreshList(SAMPLE_STORAGE["user"]["pList"], "pList");
      });
      for (var index in MENU_ITEMS) {
        var item = MENU_ITEMS[index];
        $(".navIcon." + item).attr("src", ("icon/" + item + ((item == view) ? "-active" : "") + ".svg"));
      }      // need this complicated thing to make sure all other buttons are set to inactive
      break;

    case "gList":
      $(".content").load("gList.html", function() {
        refreshList(SAMPLE_STORAGE["family"]["gList"], "gList");
      });
      for (var index in MENU_ITEMS) {
        var item = MENU_ITEMS[index];
        $(".navIcon." + item).attr("src", ("icon/" + item + ((item == view) ? "-active" : "") + ".svg"));
      }      // need this complicated thing to make sure all other buttons are set to inactive
      break;

    case "cart":
      $(".content").load("cart.html", function() {
        refreshList(SAMPLE_STORAGE["user"]["cList"], "cList")
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
  function tagsGen(tags) {
    var html = "";
    
    for (tag of tags) {
      html += `<div class="tag">`
      for (var i = 0; i < 15; i++) { // will only display the first 15 chars of a tag in the normal view, will still display whole tag in tag modify view.
        html += (tag[i]==undefined)?"":tag[i];
      }
      html += `</div>`;
    }
    
    return html;
  }
  
  switch (listType) {
    case "pList": return `<li class="pListItem listItem"><h2 class="itemTitle">${item.name?item.name:""}</h2><p class="itemNotes">${item.notes?item.notes:""}</p><p class="quant">${item.quant?item.quant:""}</p><div class="listControl pListControl"><img src="icon/trash.svg" alt="delete"><img src="icon/addCart.svg" alt="add to cart"></div><div class="tags">${tagsGen(item.tags)}</div></li>`; break;
    
    case "gList": return `<li class="gListItem listItem"><h2 class="itemTitle">${item.name?item.name:""}</h2><p class="itemNotes">${item.notes?item.notes:""}</p><p class="quant">${item.quant?item.quant:""}</p><div class="listControl gListControl"><img src="icon/trash.svg" alt="delete"><img src="icon/addCart.svg" alt="add to cart"></div><div class="tags">${tagsGen(item.tags)}</div></li>`; break;
    
    case "cList": return `<li class="cListItem listItem"><h2 class="itemTitle">${item.name?item.name:""}</h2><p class="itemNotes">${item.notes?item.notes:""}</p><p class="quant">${item.quant?item.quant:""}</p><div class="listControl cListControl"><img src="icon/trash.svg" alt="delete"><img src="icon/removeCart.svg" alt="add to cart"></div><div class="tags">${tagsGen(item.tags)}</div></li>`; break;
    
    case "sList": return `<li class="sListItem listItem"><h2 class="itemTitle">${item.name?item.name:""}</h2><div class="listControl sListControl"><img src="icon/arrow.svg" alt="go"></div></li>`; break;
    
    default: throw Error("Invalid List Type");
  }
}

function refreshList(list, listType) {
  var listElement = $("ul." + listType)[0];
  $(listElement).empty();
  for (var item in list) {
    $(listElement).append(itemToHtml(list[item], listType));
  }
}


// init
function init() {
  changeView("settings");
  socket.emit('init', {
    "username": SAMPLE_STORAGE.user.username,
    "authToken": SAMPLE_STORAGE.user.authToken,
    "activeFamilyKey": SAMPLE_STORAGE.user.activeFamilyKey,
    "offlineActions": null
  });
}

init();
