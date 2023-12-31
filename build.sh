. .env
docker build . -t "olwimo/saleor-dashboard:0.0.1" --build-arg API_URI="${API_URI}" --build-arg APP_MOUNT_URI="${APP_MOUNT_URI}" --build-arg APPS_MARKETPLACE_API_URI="${APPS_MARKETPLACE_API_URI}" --build-arg APPS_TUNNEL_URL_KEYWORDS="${APPS_TUNNEL_URL_KEYWORDS}" --build-arg STATIC_URL="${STATIC_URL}" --build-arg SKIP_SOURCEMAPS="${SKIP_SOURCEMAPS}"
docker tag "olwimo/saleor-dashboard:0.0.1" "olwimo/saleor-dashboard:latest"
docker push -a "olwimo/saleor-dashboard"
