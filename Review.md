# Review Questions

## What is Node.js?
Node.js is an open source server environment that allows us to write backend code in JavaScript.

## What is Express?
Express is Node.js framework used for building web applications. It allows us to build server quick and easy.

## Mention two parts of Express that you learned about this week.
Two parts of Express learned this week was middleware and controllers/routers.

## What is Middleware?
It is a piece of software/function that is applied between the layers. In other words, Express is a series of middleware function calls.

## What is a Resource?
Resource can be data, target of an HTTP or info that can be accessed and manipulated.

## What can the API return to help clients know if a request was successful?
Status codes.

## How can we partition our application into sub-applications?
Create separate modules in their designated folders and export them with module.exports = something. Then connect everything in server.js.

## What is express.json() and why do we need it?
Express.json() is a middleware function that is built-in in express for parsing JSON. We need it to know more than just the URL we hit, particularly in the context of POST, PUT, PATCH HTTP request where the information we want is in the body.