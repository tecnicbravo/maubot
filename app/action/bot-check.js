/**
 * Created by cbravo on 6/4/17.
 */

var botCheck = function(){};

botCheck.prototype.messageContains = function(message,text) {
  if (typeof message != 'undefined') {
    if (message.indexOf(text) >= 0){
      return true;
    } else {
      return false;
    }
  }
};
module.exports = new botCheck();