"use strict";

function GoogleTagManager(events) {
  events.forEach(function (event) {
    var eventToPush = function () {
      if (event.event === undefined && event.hitType !== undefined) {
        return Object.assign({}, event, { event: event.hitType });
      }
      return event;
    }();
    window.dataLayer.push(eventToPush);
  });
}

module.exports = { GoogleTagManager: GoogleTagManager };