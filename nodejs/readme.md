# Associated Course

[The Complete Node.js Developer Course (2nd Edition)][Course Link]

Learn Node.js by building real-world applications with Node, Express, MongoDB, Mocha, and more!

4.7 (12,447 ratings)  
63,068 students enrolled  
Created by Andrew Mead, Rob Percival  
Last updated 2/2018

# Index

- [notes-node][1]  
Simple command-line note taking app. 
  - use requires to load modules
  - use third-party modules
  - access the file system
  - export codes to use in other files
  - manage parameters with `yargs`
- [weather-app][2]
  - send requests and use the response with `request`
  - use callbacks
  - use promises
  - wrap libraries with promises
  - send requests with `axios` which has promises built in
- [node-web-server][3]
  - run a web server and handle requests, send response of JSON or HTML using [express]
  - serve static pages
  - serve dynamic pages using a template engine [hbs]
  - use 'partial' pages on templates
  - use 'helper' functions that can be used in templates
  - use [Heroku] to deploy apps  
  I didn't follow this one because I don't know if it's possible to deploy only some files in a git repository on Heroku.
- [node-tests][4]
  - use [mocha] to test codes
  - make environment for watch and auto restart tests
  - use custom npm scripts
  - use assertion library [expect]
  - test express applications using [supertest]
  - test communications between codes not the actual codes using `rewire` and spies
- [node-todo-api][5]
  - use MongoDB
    - install [MongoDB], [node-mongodb-native], robo3t, and learn NoSQL vocabulary ~~damn qt rendering things so ugly~~
    - insert, fetch, remove, update in mongodb
    - use [Mongoose ORM]\(Object Relational Mapping) to do these things
  - make API
    - use [Postman] to make API  
    use methods POST, GET, PATCH, DELETE
    - test API endpoints
  - separate test environments
  - setup a user model
    - use [validator][] to validate string inputs
    - try hashing passwords with [crypto-js][]
    - use [jwt][] to make token methods that can be used to secure the app
    - use [bcryptjs][] to hash user passwords before saving
    - test codes that involve hashing methods
  - add log in and log out route
  - move secret data to a separate file
- [node-chat-app][6]  
interactive app that connects to the server and send and receive data back and forth  
  > it was a hassle to follow with heroku related tasks when I already have this folder as a part in this repository. So I used Dropbox to sync with heroku, and put a symbolic link inside `Dropbox/Apps/Heroku`. The deployment works great, the code will be in sync with this repository. Not sure if my Dropbox space is saved though.
  - use `path.join()` to store cleaner path in strings.


[Course Link]: https://www.udemy.com/the-complete-nodejs-developer-course-2/

[1]: notes-node/
[2]: weather-app/
[3]: node-web-server/
[4]: node-tests/
[5]: node-todo-api/
[6]: node-chat-app/

[express]: http://expressjs.com/en/4x/api.html
[hbs]: http://handlebarsjs.com 'template engine that can be used with express.js'

[validator]: https://npmjs.com/package/validator
[crypto-js]: https://www.npmjs.com/package/crypto-js
[jwt]: https://jwt.io/
[bcryptjs]: https://www.npmjs.com/package/bcryptjs

[mocha]: https://mochajs.org 'test codes in terminal: describe(), it()'
[expect]: https://facebook.github.io/jest/docs/en/expect.html 'an assertion libraty to expect(something).toBeA(type)'
[supertest]: https://github.com/visionmedia/supertest 'test express applications: request(app).expect((res) => {expect(res.body).toInclude({thing: property});}).end(done);'
[node-mongodb-native]: http://mongodb.github.io/node-mongodb-native/3.0/api/ 'MongoDB Node.JS Driver'

[MongoDB]: https://docs.mongodb.com/
[Mongoose ORM]: http://mongoosejs.com/docs/guide.html 'boiler plate for MongoDB'

[Heroku]: https://heroku.com 'deploy apps'
[Postman]: https://getpostman.com 'a client to test APIs'