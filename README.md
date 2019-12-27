# KyraTV-challenge
Coding challenge to dynamically render thumbnails and videos using the youtube api, and present data in a graph by uploads / day over the last 18 months.

## Setup:
1. From root directory, install dependencies
# npm install

## Database initialization: https://www.npmjs.com/package/dotenv
2: Within Root Directory, create file titled '.env'
  Copy contents below into file with your user specific information substituted for within brackets. String values do not require quotes.

  API=[your API key]
  PGUSER=[your postgres username]
  PGHOST=[your postgres host]
  PGPASSWORD=[your postgreSQL password]
  PGDATABASE=ytuploads
  PGPORT=[your postgreSQL port number || 5432]

3: Initialize Schema: from root directory, run
  # psql -U postgres -f schema.sql

4: Bundle Assets:
  # npm run react-dev

5: Start Server:
  # npm run server-start

6: Load client
  # localhost:3009
