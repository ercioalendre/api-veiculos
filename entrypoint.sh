#!/bin/bash
export NODE_OPTIONS="--max-old-space-size=4096"

/app/node_modules/.bin/prisma migrate deploy

/app/node_modules/.bin/prisma generate

node dist/main
