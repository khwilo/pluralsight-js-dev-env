/*
  This file contains references to the vendor libraries we're using
  in this project. This is used by webpack in the production build only.
  A separate bundle for vendor is unlikely to change as often as the
  application's code. All libraries referenced here will be written to
  vendor.js so that they can be cached until one of them change.
  Any files that aren't referenced here will be bundled into main.js for the
  production build.
*/

/* eslint-disable no-unused-vars */

import fetch from 'whatwg-fetch';
