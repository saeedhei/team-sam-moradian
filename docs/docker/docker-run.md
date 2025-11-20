# پاکسازی

docker compose -f compose.dev.yaml down -v

# ساخت مجدد

docker compose -f compose.dev.yaml build --no-cache

# اجرا

docker compose -f compose.dev.yaml up -d

# بررسی

docker compose -f compose.dev.yaml logs next-app

# رفرش

docker compose -f compose.dev.yaml down
rm -rf node_modules .pnpm-store .next
docker compose -f compose.dev.yaml down -v

# یک سرویس

docker compose -f compose.dev.yaml down -v
docker compose -f compose.dev.yaml build --no-cache next-app
docker compose -f compose.dev.yaml up
