/* eslint func-names: ["error", "never"] */

(function () {
  const $ = jQuery;
  let options = {
    section: 'section',
    buttonUp: 'buttonUp',
    buttonDown: 'buttonDown',
    offset: 0,
    speed: 200,
  };

  const methods = {
    init(userOptions) {
      options = $.extend(options, userOptions);

      $(options.buttonUp).on('click', methods.navigationUp);
      $(options.buttonDown).on('click', methods.navigationDown);
    },

    navigationUp(e) {
      const currentTop = methods.getCurrentTop();
      const sectionTops = methods.getSectionTops();

      e.preventDefault();

      for (let i = sectionTops.length - 1; i >= 0; i -= 1) {
        const currentSection = sectionTops[i];
        if (currentSection - options.offset < currentTop) {
          $('html:not(:animated)')
            .stop()
            .animate(
              {
                scrollTop: currentSection - options.offset,
              },
              options.speed,
            );
        }
      }
    },

    navigationDown(e) {
      const currentTop = methods.getCurrentTop();
      const sectionTops = methods.getSectionTops();

      e.preventDefault();

      for (let i = 0; i < sectionTops.length; i += 1) {
        const currentSection = sectionTops[i];
        if (currentSection - options.offset > currentTop) {
          $('html:not(:animated)')
            .stop()
            .animate(
              {
                scrollTop: currentSection - options.offset,
              },
              options.speed,
            );
        }
      }
    },

    getCurrentTop() {
      const currentTop = Math.round($(window).scrollTop());
      return currentTop;
    },

    getSectionTops() {
      const sectionTops = [0];
      const sections = $(options.section);
      const pageBottom = Math.round($('body').outerHeight());

      sections.each(function () {
        const value = Math.round($(this).offset().top);
        sectionTops.push(value);
      });
      sectionTops.push(pageBottom);
      return sectionTops;
    },
  };

  $.fn.sectionnavi = function (...args) {
    const method = args[0];

    if (methods[method]) {
      return methods[method].apply(this, args.slice(1));
    } else if (typeof method === 'object' || !method) {
      return methods.init.apply(this, args);
    }

    $.error(`${method} is'n exist in jQuery.sectionnavi`);
    return this;
  };
}(jQuery));
