axios.interceptors.request.use(
  config => {
    config.baseURL = "http://localhost:3000/apiv1/";

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axios.defaults.baseURL = "http://localhost:3000/apiv1/";

var getItems = function(name, price, tags, pageNumber) {
  return axios.get("anuncios?limit=10", {
    before: e => {
      loader.show();
    },
    params: {
      name: name,
      price: price,
      tags: tags,
      page: pageNumber
    }
  });
};

var createItem = function(name, price, selling, tags, photo) {
  return axios({
    method: "post",
    data: {
      name: name,
      selling: selling,
      price: parseInt(price),
      photo: photo,
      tags: tags
    }
  });
};

var deleteItem = function(id) {
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

var updateItem = function(id, name) {
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
