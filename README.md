# Quick Start Guide
1. Install the latest Node LTS version (14.17.0 LTS).
2. Clone this repository.
3. Run `npm install` from the parent directory of your cloned repository. This command will install the following dependencies:
   ```json
   "dependencies": {
   "cookie-parser": "~1.4.4",
   "debug": "~2.6.9",
   "express": "~4.16.1",
   "http-errors": "~1.6.3",
   "morgan": "~1.9.1",
   "mysql": "^2.18.1"
   },
   "devDependencies": {
   "chai": "^4.3.4",
   "chai-http": "^4.3.0",
   "chai-things": "^0.2.0",
   "eslint": "^7.27.0",
   "eslint-config-airbnb-base": "^14.2.1",
   "eslint-plugin-import": "^2.23.3",
   "mocha": "^8.4.0",
   "nodemon": "^2.0.7"
   }
   ```
4. Setup your database connection by setting the required parameters directly in **api.js**. See the *Setup MySQL connection* section of api.js. For more information, see the [mysql npm documention](https://www.npmjs.com/package/mysql).
5. Again from the parent directory of your cloned repository, run `npm run start` to start the server, and then navigate in a browser to http://localhost:3000. 
6. To view unit/integration test results, run `npm run test`.
7. To run a development server that will refresh if your source code changes, run `npm run dev`.