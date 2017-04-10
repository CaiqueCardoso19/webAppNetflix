if [ "$NODE_ENV" = "" ] || [ "$NODE_ENV" = "development" ]; then  
  npm install
  bower install --allow-root
  gulp
  exit 0
fi