( function($, window, document) {

    /* SECTION NAVIGATION */
    $(document).ready(function() {
        $('section').sectionnavi({
            buttonUp : '.js-navi-up',
            buttonDown : '.js-navi-down',
            offset: 0
        })
    });

} )(window.jQuery, window, document);