FROM node:18.0.0-slim AS development
RUN apt-get update && apt-get install -y procps

EXPOSE 9099