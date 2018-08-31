# NodeJS Master Class

## Assignment 1

Please create a simple "Hello World" API. Meaning:

1. It should be a RESTful JSON API that listens on a port of your choice. 

2. When someone posts anything to the route /hello, you should return a welcome message, in JSON format. This message can be anything you want. 


## Solution Details

I started with the example code built up in the first section of lectures, removed unnecessary features, and added a new `hello` handler for the route `/hello`.

In my handler, if the request method is POST, the http status emitted is 200, and the payload is `Hi, {name}! How are you today?` where {name} comes from the POST payload.  If the same route is called as GET, status emitted is still 200, but payload is empty.  If any other route is called, a 404 is emitted with an empty payload.
