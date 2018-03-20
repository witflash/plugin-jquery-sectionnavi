/* eslint func-names: ["error", "never"] */

(function ($, window, document) {
  /* SECTION NAVIGATION */
  $(document).ready(() => {
    $('section').sectionnavi({
      buttonUp: '.js-navi-up',
      buttonDown: '.js-navi-down',
      offset: 0,
    });
  });
}(window.jQuery, window, document));
