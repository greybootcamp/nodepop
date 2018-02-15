var loader = $(".loader");
var newTaskInput = $("#newTaskName");
var price = $("#price");
var selling = $("#selling");
var tags = $("#tags");
var photo = $("#photo");
var tasksContainer = $("#tasksContainer");
var paginationContainer = $("#pagination")

$(document).ready(function () {

    var result = getItems("", "", "")
        .then(function (response) {
            loader.fadeOut();
            drawTasks(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });;

});

$(".list-filters input").keyup(function () {
    var filters = {
        name: $("#filter-name").val(),
        price: $("#filter-price").val(),
        tags: $("#filter-tags").val()
    };

    getItems(filters.name, filters.price, filters.tags);
});

$("#sendNewTask").on("click", function (event) {
    if (newTaskInput.val() != "") {
        event.preventDefault();
        createTask(
            newTaskInput.val(),
            price.val(),
            selling.val(),
            tags.val(),
            photo.val()
        );
    }
});

$(document).on("click", ".deleteTask", function (event) {
    var id = $(this).data("taskId");
    deleteTask(id);
});

$(document).on("blur", ".update-task-input", function (event) {
    var newName = $(this).val();
    var id = $(this)
        .siblings(".deleteTask")
        .data("taskId");
    updateTask(id, newName);
});


var drawTasks = function (data) {
    var anuncios = data;
    tasksContainer.empty();

    if (anuncios.result.length == 0) {
        tasksContainer.append(
            '<li class="task-item">No tienes tareas pendientes</li>'
        );
    } else {
        var contentToAdd = "";
        var pages = anuncios.result.length / 5; // Fixed to 5 at the moment
        var paginationElements = "";

        for (var i = 0; i < pages; i++) {
            paginationElements += `<li><a href="#" id="paginationItem">${i + 1}</a></li>`
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