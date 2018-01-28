# seqjs
handle queue of promises

like q.all but the promises will be executed in the declared order, the next will not start until the current one is finished, the next one is executed even if the current one fails, you get an array with the result of all the promes

useful when the order is important, for example when we need to execute many promises to obtain data and process it.

``` js
var queue = new Seq();
queue.add(callablePromise, firstParam, secondParam);

queue.add(getBusiness, firstParam, secondParam).then(function(data){
  var myBusiness = data;
})

queue.add(getUser, userId).then(function(data){
  var myUser = {profile: data.data.profile, product: myProduct[data.data.productId]  };
})

// like q.all
queue.execute().then(function(results){
  console.log(results)
})


```
