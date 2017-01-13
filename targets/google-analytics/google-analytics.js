'use strict';

function GoogleAnalytics(events) {
  events.forEach(function (event) {
    window.ga('send', event);
  });
}

module.exports = { GoogleAnalytics: GoogleAnalytics };