/*
  Generate mock data for local development.
  There is no need to point to an actual API.
*/

/* eslint-disable no-console */

import jsf from 'json-schema-faker';
import { schema } from './mockDataSchema';
import fs from 'fs';
import chalk from 'chalk';

jsf.extend("faker", () => require("faker"));

const json = JSON.stringify(jsf.generate(schema));

fs.writeFile("./src/api/db.json", json, err => {
  if (err) {
    return console.log(chalk.red(err));
  } else {
    console.log(chalk.green("Mock data generated."));
  }
});
