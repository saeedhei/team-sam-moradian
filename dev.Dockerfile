FROM node:20-alpine

# Optional but recommended on alpine
# RUN apk add --no-cache libc6-compat

WORKDIR /app

# Enable corepack (pnpm/yarn)
RUN corepack enable
RUN corepack prepare pnpm@latest --activate

# Use a persistent, shared, writable global store inside the container
# This store lives outside /app so it survives node_modules deletion
ENV PNPM_HOME=/pnpm/store
ENV PATH="${PNPM_HOME}:${PATH}"
RUN mkdir -p ${PNPM_HOME} && chmod -R 777 ${PNPM_HOME}

# Force pnpm to always use this exact store (global config)
RUN pnpm config set store-dir ${PNPM_HOME} --global
# (optional but nice) use the faster node-linker (hoisted is default in pnpm 9+ anyway)
RUN pnpm config set node-linker hoisted --global

# Copy only dependency manifests first (best layer caching)
COPY package.json pnpm-lock.yaml ./

# Install dependencies into the global store
RUN pnpm install --frozen-lockfile

# Copy the rest of the code
# COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

# Expose port and start dev server
EXPOSE 3000
CMD ["pnpm", "dev", "-p", "3000", "-H", "0.0.0.0"]