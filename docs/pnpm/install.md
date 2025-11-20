corepack enable pnpm
corepack use pnpm@latest-10
pnpm -v

pnpm install

pnpm add @apollo/server

pnpm install @trpc/server @trpc/client @trpc/react-query @tanstack/react-query
pnpm install nano

sudo rm -rf ./.pnpm-store
