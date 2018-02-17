var loader;
var newTaskInput;
var price;
var selling;
var tags;
var photo;
var tasksContainer;
var paginationContainer;
var paginationItems;

$(document).ready(function() {
  var loader = $(".loader");
  var price = $("#price");
  var selling = $("#selling");
  var tags = $("#tags");
  var photo = $("#photo");
  tasksContainer = $("#tasksContainer");
  paginationContainer = $("#pagination");
  paginationItems = $("a#paginationItem");

  var result = getItems("", "", "")
    .then(function(response) {
      loader.fadeOut();
      drawTasks(response.data);
    })
    .catch(function(error) {
      console.log(error);
    });
});

$(document).on("keyup", ".list-filters input", function() {
  var filters = {
    name: $("#filter-name").val(),
    price: $("#filter-price").val(),
    tags: $("#filter-tags").val()
  };

  var result = getItems(filters.name, filters.price, filters.tags)
    .then(function(response) {
      drawTasks(response.data);
    })
    .catch(function(error) {
      console.log(error);
    });
});

$(document).on("click", "#sendNewTask", function(event) {
  var newTaskInput = $("#newTaskName");

  var result = createItem(
    newTaskInput.val(),
    price.val(),
    selling.val(),
    tags.val(),
    photo.val()
  )
    .then(function(response) {
      alert("task created: " + response.data);
      drawTasks(response.data);
    })
    .catch(function(error) {
      console.log(error);
    });
});

$(document).on("click", "a#paginationItem", function(event) {
  var filters = {
    name: $("#filter-name").val(),
    price: $("#filter-price").val(),
    tags: $("#filter-tags").val(),
    page: event.currentTarget.text
  };

  var result = getItems(filters.name, filters.price, filters.tags, filters.page)
    .then(function(response) {
      drawTasks(response.data);
    })
    .catch(function(error) {
      console.log(error);
    });
});

var drawTasks = function(data) {
  var anuncios = data;
  tasksContainer.empty();

  if (anuncios.result.length == 0) {
    tasksContainer.append(
      '<li class="task-item">No items to be displayed!!</li>'
    );
  } else {
    var contentToAdd = "";
    var pages = anuncios.result.length / 5; // Fixed to 5 at the moment
    var paginationElements = "";

    if (paginationItems.length !== anuncios.result.length) {
      paginationContainer.empty();
      for (var i = 0; i < pages; i++) {
        paginationElements += `<li><a href="#" id="paginationItem">${i +
          1}</a></li>`;
      }
    }

    paginationContainer.append(paginationElements);

    for (var i = 0; i < anuncios.result.length; i++) {
      let selling = anuncios.result[i].selling ? "On Sale!!!" : "To Rent!!!";

      contentToAdd += `<div class="items-rows">
        <div class="col-md-4 list-item">
            <div class="thumbnail">
            <img src=${anuncios.result[i].photo}>
            <div class="caption">
                <h3>
                ${anuncios.result[i].name}
                </h3>
                <p>
                ${selling}
                </p>
                <p>$
                ${anuncios.result[i].price}
                </p>
                <p>TAGS:</p>
                <p>
                ${anuncios.result[i].tags}
                </p>
            </div>
            </div>
        </div>
    </div>`;
    }

    tasksContainer.append(contentToAdd);
  }
};
