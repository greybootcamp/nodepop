
var getItems = function (name, price, tags) {
  axios.interceptors.request.use((config) => {
    config.baseURL = "http://localhost:3000/apiv1";
  
    return config;  
  }, (error) => {
    return Promise.reject(error);
  });

  return axios.get("anuncios?limit=10", {
    before: (e) => {
      loader.show();
    },
    params: {
      name: name,
      price: price,
      tags: tags
    }
  })
}

var createItem = function (name, price, selling, tags, photo) {
  var data = {
    name: name,
    selling: selling,
    price: parseInt(price),
    photo: photo,
    tags: tags
  };

  var success = function (data) {
    anuncios.push(data);
    $(":input")
      .not(":button, :submit, :reset, :hidden, :checkbox, :radio")
      .val("");
    drawTasks();
  };

  $.ajax({
    type: "POST",
    url: API_URL + "anuncios",
    data: data,
    success: success
  }).fail(function (error) {
    console.error("Error creando tarea.", error);
  });
};

var deleteItem = function (id) {
  $.ajax({
    type: "DELETE",
    url: API_URL + "tasks/" + id
  })
    .done(function (data) {
      tasks = $.grep(tasks, function (item) {
        return item.id != id;
      });

      drawTasks();
    })
    .fail(function (error) {
      console.error("Error eliminando tarea", error);
    })
    .always(function (object, status, error) {
      console.log(object, status, error);
    });
};

var updateItem = function (id, name) {
  var data = {
    name: name
  };

  $.ajax({
    type: "PUT",
    url: API_URL + "tasks/" + id,
    data: data
  })
    .done(function (data) {
      for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id == id) {
          tasks[i].name = name;
        }
      }

      drawTasks();
    })
    .fail(function (error) {
      console.error("Error actualizando tarea", error);
    });
};