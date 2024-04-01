FROM node:18-alpine

WORKDIR /app

COPY . /app

#RUN echo | ls -a

RUN npm install

EXPOSE 3000

ENTRYPOINT [ "npm", "run", "test" ]