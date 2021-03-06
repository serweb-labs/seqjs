# SeqJs
Handle queue of promises

CDN: `https://cdn.jsdelivr.net/gh/serweb-labs/seqjs@v1/seqjs.js`  
Bower: `bower install seqjs`

Like q.all but the promises will be executed in the declared order, the next will not start until the current one is finished, the next one is executed even if the current one fails, you get an array with the result of all the promes

Useful when the order is important, for example when we need to execute many promises to obtain data and process it.

``` js
var queue = new Seq();
var myBusinessList = {};
var myUser;

queue.add(callablePromise, firstParam, secondParam);

queue.add(getBusiness, firstParam, secondParam).then(function(data){
  myBusinessList = data;
})

queue.add(getUser, userId).then(function(data){
  myUser = {profile: data.data.profile, bussiness: myBusinessList[data.data.businessId]  };
})

// like q.all
queue.execute().then(function(results){
  console.log(results)
})


```
