var Store = require("../models/store");

//Simple version, without validation or sanitation
exports.test = function (req, res) {
  res.send("Greetings from the Test controller!");
};

// Create a Store
exports.store_create = function (req, res, next) {
  var store = new Store(req.body);

  store.save(function (err) {
    if (err) {
      return next(err);
    }
    res.send("Store Created successfully");
  });
};

//Get all stores
exports.store_getstores = function (req, res, next) {
  Store.find({}, function (err, store) {
    if (err) return next(err);
    res.send(store);
  });
};

// Get store by ID
exports.store_details = function (req, res, next) {
  Store.findById(req.params.id, function (err, store) {
    if (err) return next(err);
    res.send(store);
  });
};

// Update store by ID
exports.store_update = function (req, res, next) {
  Store.findByIdAndUpdate(req.params.id, { $set: req.body }, function (
    err,
    store
  ) {
    if (err) return next(err);
    res.send("Store udpated.");
  });
};

// Delete store by ID
exports.store_delete = function (req, res, next) {
  Store.findByIdAndRemove(req.params.id, function (err) {
    if (err) return next(err);
    res.send("Deleted successfully!");
  });
};
