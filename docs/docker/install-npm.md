# status and Logs

docker compose -f compose.dev.yaml ps
docker compose -f compose.dev.yaml logs next-app

# Remove and Install

docker compose -f compose.dev.yaml exec next-app sh -c "rm -rf node_modules .pnpm-store && pnpm install"

# New Module

docker compose -f compose.dev.yaml exec next-app pnpm remove superjson

# or New Module inside Container

docker-compose -f compose.dev.yaml exec next-app sh
pnpm add zustand
exit
