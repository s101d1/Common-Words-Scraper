# Common-Word-Checker
This is a simple Node.js application that allows users to submit a URL, and then returns a list of the most common words found on the page at that URL.

The application is built with `Express.js` framework and `TypeScript` language, `Jest` framework is used for the testing. The application has an API endpoint `GET /words` that accepts an url query parameter, and returns a JSON object with a list of common words found on the page, along with the number of times each word appears.

For example, calling API endpoint `GET /words` with https://www.example.com/ url parameter will return:
`{"example":1,"domain":3,"this":2,"is":1,"for":2,"use":2,"in":3,"illustrative":1,"examples":1,"documents":1,"you":1,"may":1,"literature":1,"without":1,"prior":1,"coordination":1,"or":1,"asking":1,"permission":1,"more":1,"information":1}`

## Requirements

 * Node.js

## How to install dependencies

	$ cd Common-Word-Checker
	$ npm install

## How to run the app

	$ npm run dev

## How to use the app

1) UI method

* Open http://localhost:8080/ in browser.
* Enter url in the input textfield.
* Click the submit button.
* The JSON result should be displayed on the page.

2) Calling the API endpoint `/words` directly. For example, with curl command:

	$ curl -X GET "http://localhost:8080/words?url=http://www.example.com/"

## How to run the tests

	$ npm test
