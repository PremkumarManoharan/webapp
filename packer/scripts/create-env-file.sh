#!/bin/bash


# Create the .env file and write the environment variables to it
cd ~/app/ || exit
cat << INNER_EOF > .env
PG_USER=$PG_USER
PG_PASSWORD=$PG_PASSWORD
PG_DB=$PG_DB
PG_HOST=$PG_HOST
INNER_EOF


echo ".env file created with the specified content."
