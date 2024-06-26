# pull official base image
FROM node:14

# set working directory in the container
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./

COPY . ./

RUN npm install

# start app
CMD ["npm", "start"]
