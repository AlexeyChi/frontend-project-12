lint-frontend:
		make -C frontend lint

install:
		npm ci

start-frontend:
		make -C frontend build

start-backend:
		npx start-server

start:
		make start-backend & make start-frontend

build:
		rm frontend/build -rf
		npm run build