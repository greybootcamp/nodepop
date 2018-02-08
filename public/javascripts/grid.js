jQuery(document).ready(function($) {
  $(function() {
    $("#jsGrid").jsGrid({
      height: "auto",
      width: "auto",
      filtering: true,
      inserting: true,
      editing: true,
      sorting: true,
      paging: true,
      autoload: true,
      pageSize: 10,
      pageButtonCount: 5,
      deleteConfirm: "Do you really want to delete client?",
      invalidMessage: "Invalid type of Data",
      controller: {
        loadData: function(filter) {
          // GET to retrieve client list
          var data = $.Deferred();
          return $.ajax({
            type: "GET",
            url: "/apiv1/anuncios"
          }).done(function(response) {
            debugger;
            console.log(response.items);
            data.resolve({
              data: response.result
            });
          });
        },
        insertItem: function(item) {
          // POST to create new client
          return $.ajax({
            type: "POST",
            url: "/clients",
            data: item
          });
        },
        updateItem: function(item) {
          // PUT to update the client
          return $.ajax({
            type: "PUT",
            url: "/clients",
            data: item
          });
        },
        deleteItem: function(item) {
          // DELETE to remove client
          return $.ajax({
            type: "DELETE",
            url: "/clients",
            data: item
          });
        }
      },
      fields: [
        { name: "nombre", type: "text", width: 150 },
        { name: "precio", type: "text", width: 200 },
        {
          name: "tags",
          type: "text",
          width: 200
        },
        { name: "foto", type: "text", width: 50 },
        { name: "venta", type: "checkbox", width: 50 }
      ]
    });
  });
});
