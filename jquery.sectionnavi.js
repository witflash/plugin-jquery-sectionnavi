( function($) {

    var methods = {
        init : function(options) {
            var options = $.extend({
                section : 'section', //параметр1
                buttonUp : 'buttonUp', //параметр2
            }, options);

            return this.each(methods.navigation);
        },

        navigation : function() {
            var $this = $(this);
            return $this;
        }
    }

    $.fn.sectionnavi = function(method) {
        if (methods[method]) {
            return methods[method].apply( this, Array.prototype.slice.call(arguments, 1));
        } else if ( typeof method === 'object' || !method ) {
            return methods.init.apply(this, arguments);
        } else {
            $.error(`${method} is'n exist in jQuery.sectionnavi`);
        };
	};

} )(jQuery);