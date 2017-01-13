'use strict';

function GoogleAnalytics(trackingId, GoogleAnalyticsTracker) {
  var tracker = new GoogleAnalyticsTracker(trackingId);

  function target(events) {
    events.forEach(function (event) {
      switch (event.hitType) {
        case 'event':
          {
            var options = {};

            if (event.eventLabel !== undefined) {
              options.label = event.eventLabel;
            }
            if (event.eventValue !== undefined) {
              options.value = event.eventValue;
            }

            if (Object.keys(options).length > 0) {
              tracker.trackEvent(event.eventCategory, event.eventAction, options);
            } else {
              tracker.trackEvent(event.eventCategory, event.eventAction);
            }
            break;
          }

        case 'pageview':
          {
            tracker.trackScreenView(event.page);
            break;
          }

        case 'timing':
          {
            // timingVar is always required for timingLabel
            if (event.timingVar !== undefined) {
              var _options = { name: event.timingVar };

              if (event.timingLabel !== undefined) {
                _options.label = event.timingLabel;
              }

              tracker.trackTiming(event.timingCategory, event.timingValue, _options);
            } else {
              tracker.trackTiming(event.timingCategory, event.timingValue);
            }
            break;
          }

        case 'social':
          {
            tracker.trackSocialInteraction(event.socialNetwork, event.socialAction, event.socialTarget);
            break;
          }

        case 'exception':
          {
            tracker.trackException(event.exDescription, event.exFatal);
            break;
          }

        default:
      }
    });
  }

  return target;
}

module.exports = { GoogleAnalytics: GoogleAnalytics };