var loader;
var newTaskName;
var price;
var selling;
var tags;
var photo;
var tasksContainer;
var paginationContainer;
var paginationItems;
var itemsPerPage = function() {
  return parseInt($("select option:selected").text());
};

$(document).ready(function() {
  loader = $(".loader");
  newTaskName = $("#newTaskName");
  price = $("#price");
  selling = $("#selling");
  tags = $("#tags");
  photo = $("#photo");
  tasksContainer = $("#tasksContainer");
  paginationContainer = $("#pagination");
  paginationItems = $("a#paginationItem");

  var result = getItems("", "", "", 1, itemsPerPage())
    .then(function(response) {
      loader.fadeOut();
      drawTasks(response.data, response.data.pages);
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

  var result = getItems(
    filters.name,
    filters.price,
    filters.tags,
    "",
    itemsPerPage()
  )
    .then(function(response) {
      drawTasks(response.data, response.data.pages);
    })
    .catch(function(error) {
      console.log(error);
    });
});

$(function() {
  $("#sendNewTask").click(function(e) {
    e.preventDefault();
    $("#addItems").modal("hide");

    var result = createItem(
      newTaskName.val(),
      price.val(),
      selling.val(),
      tags.val(),
      photo.val()
    )
      .then(function(response) {
        console.log("Item created with ID: " + response.data.result._id);
        return getItems(response.data.result.name, "", "", "", itemsPerPage());
      })
      .then(function(response) {
        drawTasks(response.data, response.data.pages);
      })
      .catch(function(error) {
        console.log(error);
      });
  });
});

$(document).on("click", "a#paginationItem", function(event) {
  var filters = {
    name: $("#filter-name").val(),
    price: $("#filter-price").val(),
    tags: $("#filter-tags").val(),
    page: event.currentTarget.text,
    limit: itemsPerPage()
  };

  var result = getItems(
    filters.name,
    filters.price,
    filters.tags,
    filters.page,
    filters.limit
  )
    .then(function(response) {
      drawTasks(response.data, response.data.pages);
    })
    .catch(function(error) {
      console.log(error);
    });
});

$("select").change(function() {
  var filters = {
    name: $("#filter-name").val(),
    price: $("#filter-price").val(),
    tags: $("#filter-tags").val(),
    page: "",
    limit: parseInt($("select option:selected").text())
  };

  var result = getItems(
    filters.name,
    filters.price,
    filters.tags,
    filters.page,
    filters.limit
  )
    .then(function(response) {
      drawTasks(response.data, response.data.pages);
    })
    .catch(function(error) {
      console.log(error);
    });
});

var drawTasks = function(data, pages) {
  var anuncios = data;
  tasksContainer.empty();

  if (anuncios.result.length == 0) {
    tasksContainer.append(
      '<li class="task-item">No items to be displayed!!</li>'
    );
  } else {
    var contentToAdd = "";
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
    console.log(tasksContainer);
  }
};
