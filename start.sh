#!/bin/bash

# Navigate to the frontend directory and start the React app
echo "Starting frontend application..."
npm run build 

npm start &

# Save the PID of the frontend process
FRONTEND_PID=$!

# Navigate to the backend directory and start the Node.js server
echo "Starting backend application..."
cd node-mysql-example
node index.js &

# Save the PID of the backend process
BACKEND_PID=$!

# Wait for both processes to finish
wait $FRONTEND_PID $BACKEND_PID
