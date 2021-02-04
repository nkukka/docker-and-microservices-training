FROM library/node

RUN mkdir -p /opt/server
WORKDIR /opt/server

COPY server.js package.json /opt/server/

RUN npm install

CMD ["npm", "start"]
