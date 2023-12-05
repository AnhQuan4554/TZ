FROM node:16.18-buster

WORKDIR /app

COPY . .

RUN find cli clients guardian packages services \! -name "*.json" \
    -mindepth 2 \
    -maxdepth 2 \
    -print \
    | xargs rm -rf

FROM node:16.18-buster


ENV NODE_ENV development

WORKDIR /app
COPY --from=0 /app .

RUN yarn install --inline-builds || true

# Copy source code again
COPY . .

# Restore workspaces symlinks
RUN yarn install || true
