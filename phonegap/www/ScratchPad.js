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
const MENU_ITEMS = ["gList", "cart", "settings"];

// socket


// bottom nav listeners
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
    case "gList":
      $(".content").load("gList.html", function() {
        refreshList(SAMPLE_LIST, "gList");
      });
      for (var index in MENU_ITEMS) {
        var item = MENU_ITEMS[index]; console.log(item); console.log(item == view);
        $(".navIcon." + item).attr("src", ("icon/" + item + ((item == view) ? "-active" : "") + ".svg"));
      }
      break;
      
    case "cart":
      $(".content").load("cart.html");
      for (var index in MENU_ITEMS) {
        var item = MENU_ITEMS[index]; console.log(item); console.log(item == view);
        $(".navIcon." + item).attr("src", ("icon/" + item + ((item == view) ? "-active" : "") + ".svg"));
      }
      break;
      
    case "settings":
      $(".content").load("settings.html");
      for (var index in MENU_ITEMS) {
        var item = MENU_ITEMS[index]; console.log(item); console.log(item == view);
        $(".navIcon." + item).attr("src", ("icon/" + item + ((item == view) ? "-active" : "") + ".svg"));
      }
      break;
      
    default:
      throw Error("Invalid View Option");
  }
}

function itemToHtml(item, listType) {
  if (listType == "gList") {
    var html = `<li class="gListItem"><h2 class="itemTitle">${item.name?item.name:""}</h2><p class="itemNotes">${item.notes?item.notes:""}</p><p class="quant">${item.quant?item.quant:""}</p><div class="gListControl"><img src="icon/trash.svg" alt="delete"><img src="icon/addCart.svg" alt="add to cart"></div></li>`;
    // console.log(html);
    return html;
  } else if (listType == "cList") {
    
  }
}

function refreshList(list) {
  console.log("refreshing list");
  var gList = $("ul.gList")[0];
  console.log(gList);
  $(gList).empty();
  for (var item in list) {
    $(gList).append(itemToHtml(list[item], "gList"));
  }
}


changeView("gList");
