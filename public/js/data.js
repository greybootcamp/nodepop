axios.interceptors.request.use(
  config => {
    config.baseURL = "http://localhost:3000/apiv1/anuncios";

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

var getItems = function(name, price, tags, pageNumber, limit) {
  return axios.get("", {
    before: e => {
      loader.show();
    },
    params: {
      name: name,
      price: price,
      tags: tags,
      page: pageNumber,
      limit: limit
    }
  });
};

var createItem = function(name, price, selling, tags, photo) {
  return axios.post("", {
    name: name,
    selling: selling,
    price: parseInt(price),
    photo: photo,
    tags: tags
  });
};
