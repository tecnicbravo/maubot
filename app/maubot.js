/**
 * Created by cbravo on 5/4/17.
 */

var Bot = require('slackbots');

var config = require('./config'); // config file

var order = require('./action/bot-orders'); //functions to create order

var botcheck = require('./action/bot-check'); //functions for checking messages

var CronJob = require('cron').CronJob;
//Creating a Bot

var bot = new Bot({
  token: config.token, // Add a bot https://my.slack.com/services/new/bot and put the token
  name: config.name
});

var botUsername = config.botUserName;



bot.on('start', function() {
  var self = this;
  //get bot's data
  this.bot_full_data = this.users.filter(function(user) {
    return user.name === self.name;
  })[0];
  //some global helpers
  this.bot_id_as_user = this.bot_full_data.id;
  this.bot_id_as_mention = '<@' + this.bot_full_data.id + '>';
  this.bot_name = this.bot_full_data.name;
  this.bot_real_name = this.bot_full_data.real_name;
  this.bot_id = this.bot_full_data.profile.bot_id;
  var params = this.params = {
    icon_url: this.bot_full_data.profile.image_48
  };
  maubotsaysHello.start(params);
  console.log('Maubot running!');
});

bot.on('message', function(data) {
  if (data.channel != undefined && data.channel[0] == 'C' && data.type == 'message' && data.subtype != 'bot_message') {
    var message = data.text;
    if (botcheck.messageContains(message, botUsername) && botcheck.messageContains(message, 'saluda'))
    {
      bot.postMessage(data.channel, order.greeting(), this.params);
      console.log('recibido un saluda');
    }
  }
});

// Cronjobs
var maubotsaysHello = new CronJob('00 00 09 * * 1-5', function(params) {
    bot.postMessage(config.mainChannel, order.greeting(), params);
  },
  null, /* On complete */
  true /* Start the job right now */
);