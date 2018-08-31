// NodeJS Master Class - Homework Assignment 1
// Adapted from:
// https://github.com/pirple/The-NodeJS-Master-Class/blob/master/Section%203/Service%201%20-%20Ping/index.js
// By: Jason Crowther

// In a nutshell, I stipped out the features from
// the example built up in the lecture that were not
// needed for homework assignment and added a
// new handler (called 'hello') that emits a friendly
// message using a name from the POSTed data.

// Tested with the Insomnia REST testing tool
// https://insomnia.rest/

// Dependencies
var http = require('http');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;
var fs = require('fs');

// Instantiate the HTTP server
var httpServer = http.createServer(function(req,res){

    // Parse the url
    var parsedUrl = url.parse(req.url, true);

    // Get the path
    var path = parsedUrl.pathname;
    var trimmedPath = path.replace(/^\/+|\/+$/g, '');

    // Get the HTTP method
    var method = req.method.toLowerCase();

    // Get the payload,if any
    var decoder = new StringDecoder('utf-8');
    var buffer = '';

    req.on('data', function(data) {
        buffer += decoder.write(data);
    });

    req.on('end', function() {

        // build up the incoming data
        buffer += decoder.end();

        // Check the router for a matching path for
        // a handler. If one is not found, use the
        // notFound handler instead.
      
        var chosenHandler = typeof(router[trimmedPath]) !== 'undefined'
            ? router[trimmedPath]
            : handlers.notFound;

        // Route the request to the handler specified in the router
        chosenHandler(
            {
                'trimmedPath' : trimmedPath,
                'method' : method,
                'payload' : buffer
            }, 
            function(statusCode,payload){
                // Use the status code returned from the handler, or set the default status code to 200
                statusCode = typeof(statusCode) == 'number' ? statusCode : 200;

                // Use the payload returned from the handler, or set the default payload to an empty object
                payload = typeof(payload) == 'object'? payload : {};

                // Return the response
                res.setHeader('Content-Type', 'application/json');
                res.writeHead(statusCode);
                res.end( JSON.stringify(payload) );

                // Log some generics for the request.
                console.log(trimmedPath,statusCode,method);
            }
        );

    });

});

// Start the HTTP server
httpServer.listen(3000,function(){
  console.log('The HTTP server is running on port 3000');
});

var handlers = {};

// hello handler
handlers.hello = function(data,callback){

    var res = {};

    // if request is a post, send something back in payload.

    if( data.method === 'post' ) {
        // lets assume that the raw post data is a name
        var name = data.payload;
        res = { response: 'Hi, ' + name + '! How are you today?' };
    }

    callback(200,res);
};

// Not-Found handler
handlers.notFound = function(data,callback){
  callback(404);
};

// Define the request router
var router = {
    'hello' : handlers.hello
};
