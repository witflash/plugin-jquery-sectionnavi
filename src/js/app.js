( function($, window, document) {

    /* SECTION NAVIGATION */
    $(document).ready(function() {
        $('section').sectionnavi({
            buttonUp : '.js-navi-up',
            buttonDown : '.js-navi-down',
        })
    });

} )(window.jQuery, window, document);