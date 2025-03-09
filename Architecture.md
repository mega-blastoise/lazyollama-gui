# Architecture

## Overview

It is a bun/turborepo application. The main `bun` services are an API and a Web Server. There are several supporting packages/libs that provide shared utilities and common network clients to the webserver and the API. The API interacts with a running ollama server that has been spun up from a Docker image and runs alongside it in a private docker network.

## Frontend

### ./core/web

Nothing in here yet. Maybe build a website if this thing works well.

## Backend 

### ./