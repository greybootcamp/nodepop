$(document).ready(function() {
  var API_URL = "http://localhost:3000/apiv1/";
  var anuncios = [];
  var newTaskInput = $("#newTaskName");
  var price = $("#price");
  var selling = $("#selling");
  var tags = $("#tags");
  var photo = $("#photo");
  var tasksContainer = $("#tasksContainer");
  var loader = $(".loader");

  var drawTasks = function() {
    tasksContainer.empty();

    if (anuncios.length == 0) {
      tasksContainer.append(
        '<li class="task-item">No tienes tareas pendientes</li>'
      );
    } else {
      var contentToAdd = "";

      for (var i = 0; i < anuncios.length; i++) {
        contentToAdd +=
          '<li class="task-item"><input type="text" class="update-task-input" value="' +
          anuncios[i].result.name +
          '" required><button class="deleteTask" data-task-id="' +
          anuncios[i].result._id +
          '">Eliminar</button></li>';
      }

      tasksContainer.append(contentToAdd);
    }
  };

  var createTask = function(name, price, selling, tags, photo) {
    var data = {
      name: name,
      selling: selling,
      price: parseInt(price),
      photo: photo,
      tags: tags
    };

    var success = function(data) {
      newTaskInput.val("");
      anuncios.push(data);
      drawTasks();
    };

    $.ajax({
      type: "POST",
      url: API_URL + "anuncios",
      data: data,
      success: success
    }).fail(function(error) {
      console.error("Error creando tarea.", error);
    });
  };

  var getTasks = function() {
    var success = function(data) {
      tasks = data;
      drawTasks();
    };

    var error = function(error) {
      console.error("Error cargando tareas.", error);
    };

    var complete = function(object, textStatus) {
      loader.fadeOut();
      if (textStatus == "error") {
        console.log("Ha habido un error, revisalo.");
      } else {
        console.log("Todo ha ido de forma correcta.");
      }
    };

    var beforeSend = function() {
      console.log("Before send");
      loader.show();
    };

    $.ajax({
      type: "GET",
      url: API_URL + "anuncios",
      success: success,
      error: error,
      complete: complete,
      beforeSend: beforeSend
    });
  };

  var deleteTask = function(id) {
    $.ajax({
      type: "DELETE",
      url: API_URL + "tasks/" + id
    })
      .done(function(data) {
        tasks = $.grep(tasks, function(item) {
          return item.id != id;
        });

        drawTasks();
      })
      .fail(function(error) {
        console.error("Error eliminando tarea", error);
      })
      .always(function(object, status, error) {
        console.log(object, status, error);
      });
  };

  var updateTask = function(id, name) {
    var data = {
      name: name
    };

    $.ajax({
      type: "PUT",
      url: API_URL + "tasks/" + id,
      data: data
    })
      .done(function(data) {
        for (var i = 0; i < tasks.length; i++) {
          if (tasks[i].id == id) {
            tasks[i].name = name;
          }
        }

        drawTasks();
      })
      .fail(function(error) {
        console.error("Error actualizando tarea", error);
      });
  };

  $("#sendNewTask").on("click", function(event) {
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

  $(document).on("click", ".deleteTask", function(event) {
    var id = $(this).data("taskId");
    deleteTask(id);
  });

  $(document).on("blur", ".update-task-input", function(event) {
    var newName = $(this).val();
    var id = $(this)
      .siblings(".deleteTask")
      .data("taskId");
    updateTask(id, newName);
  });

  $(document).dblclick(function(event) {
    console.log("Has puslado la tecla " + event.which);
  });

  setTimeout(function() {
    getTasks();
  }, 1);
});
