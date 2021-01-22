B:=${shell pwd}/node_modules/.bin/

all: install build start

install:
	@npm install

start:
	@${B}http-server -c-1 ./

start-dev:
	@build-dev | ${B}http-livereload | ${B}http-server -c-1 ./

build:
	@NODE_ENV=production ${B}webpack

build-dev:
	@${B}webpack