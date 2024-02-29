lint-frontend:
		make -C frontend lint

install:
		npm ci

start-frontend:
		make -C frontend build

start-backend:
		npx start-server

start:
		make start-backend & start-frontend

build:
		npm run build