FROM node:6

ENV APP_DIR /app/current
WORKDIR ${APP_DIR}

COPY . . 

RUN npm i --production
CMD ["node", "app"]