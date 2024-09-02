I created a RESTful endpoint that will retrieve the latest information of the crypto market given a list of crypto Symbols. This is a POST endpoint.

This application was built using Node Js as the Engine. Express JS as the framework
node version:20.15.1
npm version: 10.7.0

To be able to run the application, please run this command to install the dependencies:

npm install

Then run this command to run the project

nodemon index.js
OR
nodemon .\index.js

You can play around calling the endpoint, for example Postman allows to do HTTP request

So, you need to call the following endpoint ( POST )

http://localhost:3000/api/coins

with the following body as Json

{
"symbols": [ "BTC", "ETH", "LTC" ]
// "currency": "cad", Optional it could be cad, usd, etc ...
}

No headers are required or extra configuration

Symbols are mandatory and it is an array of strings, there we need to insert the crypto currency symbols we would like to retrieve the information

Currency is an optional value and will display the outcome in that currency , it could be cad, usd , etc ...

The response will be a json file, an array of objects displaying the following information as an example:
[
{
"currency": "cad",
"name": "Bitcoin",
"symbol": "btc",
"currentPrice": 79449,
"marketCap": 1568919339608,
"marketCapRank": 1,
"price24hChange": 208.58,
"priceChangePercentage24h": 0.26322,
"highestPrice24h": 80151,
"lowestPrice24h": 79240
}, ...
]

Inside the folder Routes there is the controller
Inside Services is the functions that will retrieve the information and return it to the controller
the file .env would have the sensitive information
index would be the main file that would run the project
package json will have the dependencies
Config folder will have the sensitive data that would be use in the application

About the logic, first I call the api endpoint from coinmarketcap. There i get the ids which I will use to be able to
call the api endpoint from coingecko and finally get the latest coin market information.

I try to put the minor comments inside the code, 'Cause I believe the code should talk by itself and be ready to be understood by anyone, so it can readable and organized.
