var Sequelize = require('sequelize');
var sequelize = require('./sequelize');

var Report = sequelize.define('chats', {
  room: Sequelize.STRING,
  nick: Sequelize.STRING,
  summary: Sequelize.TEXT,
}, {
  timestamps: true,
  instanceMethods: {
    toJSON: async function () {
      return {
        id: this.id,
        room: this.room,
        nick: this.nick,
        summary: this.summary,
        createdAt: this.createdAt,
      };
    },
  },
});

module.exports = Report;
