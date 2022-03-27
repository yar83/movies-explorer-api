#!/bin/bash

touch .env && echo 'NODE_ENV=dev' > .env && echo 'DEV_DB_URI=mongodb://127.0.0.1:27017/moviesdb' >> .env
