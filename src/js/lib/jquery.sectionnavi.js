( function($) {
    let options = {
        section: 'section', 
        buttonUp: 'buttonUp', 
        buttonDown: 'buttonDown',
        offset: 0,
        speed: 200
    };
    
    let methods = {
        init: function(userOptions) {
            options = $.extend(options, userOptions);
            
            $(options.buttonUp).on('click', methods.navigationUp);
            $(options.buttonDown).on('click', methods.navigationDown);
            
            return this;
        },
        
        navigationUp: function(e) {
            e.preventDefault ? e.preventDefault() : (e.returnValue = false);

            let currentTop = methods.getCurrentTop();
            let sectionTops = methods.getSectionTops();

            for (let i = sectionTops.length - 1; i >= 0; i -= 1) {
                let currentSection = sectionTops[i];
                if (currentSection - options.offset < currentTop) {
                    $('html:not(:animated)').stop().animate({
                        scrollTop: currentSection - options.offset
                    }, options.speed);
                }
            }
        },
        
        navigationDown: function(e) {
            e.preventDefault ? e.preventDefault() : (e.returnValue = false);

            let currentTop = methods.getCurrentTop();
            let sectionTops = methods.getSectionTops();

            for (let i = 0; i < sectionTops.length; i += 1) {
                let currentSection = sectionTops[i];
                if (currentSection - options.offset > currentTop) {
                    $('html:not(:animated)').stop().animate({
                        scrollTop: currentSection - options.offset
                    }, options.speed);
                }
            }
        },
        
        getCurrentTop: function() {
            let currentTop = Math.round( $(window).scrollTop() );
            console.log('currentTop: ', currentTop);
            return currentTop;
        },
        
        getSectionTops: function() {
            let sectionTops = [0];
            let sections = $(options.section);
            let pageBottom = Math.round( $('body').outerHeight() );
            
            sections.each( function(index) {
                let value = Math.round( $(this).offset().top );
                sectionTops.push(value);
            })
            sectionTops.push(pageBottom);
            console.log('sectionTops: ', sectionTops);
            return sectionTops;
        }
        
    };

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