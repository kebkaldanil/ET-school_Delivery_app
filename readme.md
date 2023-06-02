To run app you need to:
  Install and run database (I used postgresql, but you can choose any, just change config):
    https://www.postgresql.org/
  
  Install Node.js:
    https://nodejs.org/
  
  Change config in "backend/.env" with your credentials

  Install dependencies for backend and frontend (will be done by run.bat or run.sh):
  
    npm i -g nest
    cd backend
    npm i
    cd ../frontend
    npm i

  Run backend and frontend (will be done by run.bat or run.sh, run in different terminal windows/tabs):

    cd backend
    nest start --watch

    cd frontend
    npm start

  Add some data in database

  Open http://localhost:3000 (by default) in browser
  