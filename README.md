#Quick Start Guide
1. Install the latest Node LTS version (14.17.0 LTS).
2. Clone this repository.
3. Run `npm install` from the parent directory of your cloned repository.
4. Setup your database connection by setting the required parameters directly in **api.js**. See the *Setup MySQL connection* section. For more information, see the [mysql npm documention](https://www.npmjs.com/package/mysql).
5. Again from the parent directory of your cloned repository, run `npm run start` to start the server, and then navigate in a browser to http://localhost:3000. 
6. To view unit/integration test results, run `npm run test`.
7. To run a development server that will refresh if your source code changes, run `npm run dev`.