// Sequential promises
// @serweb-labs
// Under the terms of the BSD license of two clauses

window.Seq = function () {
  var _self = this;

  _self.list = [];
  _self.ok = [];
  _self.err = [];
  _self.deferred = null;
  _self.index = 0;

  // add promise
  // arg 0: promise callable
  // arg 1, 2, 3 , etc.. : promise arguments
  _self.add = function () {
    var args = Array.prototype.slice.call(arguments);
    var promise = args.shift();

    return new Promise(function (resolve, reject) {
      _self.list.push({ promise: promise, args: args, resolve: resolve, reject: reject })
    })

  }

  // next, call next promise
  _self.next = function () {
    _self.list[_self.index].promise.apply(null, _self.list[_self.index].args).then(function (data) {

      // notify individual promise
      _self.list[_self.index].resolve(data);

      // notify to queue promise
      _self.ok.push(data);
      _self.index++;
      if (_self.index == _self.list.length) {
        _self.deferred.resolve({ solved: _self.ok, rejected: _self.err })
      }
      else {
        _self.next();
      }
    })
      .catch(function (data) {
        // notify individual promise
        _self.list[_self.index].reject(data);

        // notify to queue promise
        if (_self.index == _self.list.length) {
          _self.deferred.resolve({ solved: _self.ok, rejected: _self.err })
        }
        else {
          _self.err.push(data);
          _self.index++;
          _self.next();
        }
      })
  }

  // execute all promises
  // return a promise
  _self.execute = function () {
    return new Promise(function (resolve, reject) {
      _self.deferred = { resolve: resolve, reject: reject };
      _self.next();
    })
  }
}
