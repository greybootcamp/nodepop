# Nodepop App

## Description

This a backend Node.js App that contains 2 different endpoint in order to retrieve the list of Anuncios. This App can be started in dev or production environment, when in Dev mode it runs a local MongoDB with testing data. When in production it takes the data from a MLab MongoDB instance.

## How to execute the app in dev mode

This App contains some scripts (See package.json file) that allows the user to drop the local DB and create a new one by creating new test data on the Anuncios collection. The imported data is stored in a json file at folder `/bin/MOCK_DATA.json`.

After cloning the Application first it's necesary to populate the test data:

`npm run populate`

Then when it's done, we can start the Application in Dev mode:

`npm run dev`

If it's successfuly started, go to a browser or use any client to make request to the backend. For example, go to a browser and try with:

`http://localhost:3000/apiv1/anuncios`

This will return a json object with the list of elements in our collection.

## How to execute the app in production mode

The command is as next:

`npm run production`

This will start the Application pointing the DB to production. It means no data is gonna be stored in our local Mongo Instance.

**Note:** If you look at the `package.json` the only difference between this run and the dev one is an environment var, when mongoose si trying to connect it first will check if this environment var is set to "dev", if so points to local Mongo otherwise it goes to production.

## Endpoints and parameters

This API v1 has next supported endpoints:

## GET

`GET /apiv1/anuncios` This endpoint supports next parameters:

`name`: Product name, ti could the exact name or just an string contained at its product name.
`price`: It could be the exact price, a price greather than X, a price less than X or between two values, and should be introduced as follow:

* `price=50` It means the exact price
* `price=-50` Means any product with price less than 50
* `price=50-` Means any product with price greather than 50
* `price=50-8000` Means any product within this range

* `selling`: Its a Boolean value to determine if the product is a sell or a rent
* `tags`: These are comma separated strings to tag your product, i.e: tag1,tag2,...
* `page`: Since the result can be paginated, this is the number page to retrieve (this is meant to be used in combination with limit)
* `limit`: How many results per page to retrieve
* `sort`: Field to sort at
* `fields`: What fields to be shown at result, if not passed then all are shown

### Endpoint request example

GET all the results with a name containing this string:

`http://localhost:3000/apiv1/anuncios?name=party`

GET all results for products with price grather than 50 where its name contiains a determined string:

`http://localhost:3000/apiv1/anuncios?price=50-&name=serv`

GET all products that contains any of these strings at tags field:

`http://localhost:3000/apiv1/anuncios?tags=tag1,tag2`

## POST

It's posible to create products by sending a POST to our app and pathing next parameters:

`http://localhost:3000/apiv1/anuncios?selling=true&name=new_product&tags=tag1,tag2&price=756&photo=pic.jpg`

**Note:** It accepts the same parameters as in GET request but adding also a `photo` parameter which is a string containing the pictures file name stored in the application.

## PUT & DELETE

Products can be updated or deleted by sending a PUT or DELETE request and providing the correspondent product ID at the url as a parameter:

`http://localhost:3000/apiv1/anuncios/5a8168c03ab1595352903b8f`
