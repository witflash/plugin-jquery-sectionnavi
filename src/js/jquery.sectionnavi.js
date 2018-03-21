/* eslint func-names: ["error", "never"] */

(function () {
  const $ = jQuery;
  let options = {
    buttonUp: 'buttonUp',
    buttonDown: 'buttonDown',
    offset: 0,
    speed: 200,
    hideButtons: true,
    speedHideBtn: 300,
    ignoreFirst: true,
  };

  const statements = {
    btnUpisHide: true,
    btnDownisHide: true,
    inAnimate: false,
  };

  const methods = {
    init(userOptions) {
      const debounce = (func, delay) => {
        let inDebounce;
        return function (...args) {
          clearTimeout(inDebounce);
          inDebounce = setTimeout(() => func.apply(this, args), delay);
        };
      };

      options = $.extend(options, userOptions);
      options.section = this;

      methods.checkButtons();

      $(options.buttonUp).on('click', methods.navigationUp);
      $(options.buttonDown).on('click', methods.navigationDown);
      $(document).on('scroll', debounce(methods.checkButtons, 100));
    },

    navigationUp(e) {
      const currentTop = methods.getCurrentTop();
      const sectionTops = methods.getSectionTops();

      e.preventDefault();

      for (let i = sectionTops.length - 1; i >= 0; i -= 1) {
        const currentSection = sectionTops[i];
        if (currentSection - options.offset < currentTop) {
          methods.animateScroll(currentSection);
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
          methods.animateScroll(currentSection);
        }
      }
    },

    getCurrentTop() {
      const currentTop = Math.round($(window).scrollTop());
      return currentTop;
    },

    getSectionTops() {
      const sectionTops = [0];
      const sections = options.section;
      const pageBottom = Math.round($('body').outerHeight());

      sections.each(function (index) {
        if (options.ignoreFirst && index === 0) return;
        const value = Math.round($(this).offset().top);
        sectionTops.push(value);
      });

      sectionTops.push(pageBottom);
      return sectionTops;
    },

    checkButtons() {
      if (!options.hideButtons) return false;

      const currentTop = methods.getCurrentTop();
      const bottom = $(document).outerHeight();
      const $btnUp = $(options.buttonUp);
      const $btnDown = $(options.buttonDown);

      if (currentTop <= options.offset) {
        $btnUp.fadeOut(options.speedHideBtn);
        statements.btnUpisHide = true;
      } else if (statements.btnUpisHide) {
        $btnUp.fadeIn(options.speedHideBtn);
      }

      if (currentTop >= bottom - $(window).innerHeight()) {
        $btnDown.fadeOut(options.speedHideBtn);
        statements.btnDownisHide = true;
      } else if (statements.btnDownisHide) {
        $btnDown.fadeIn(options.speedHideBtn);
      }

      return true;
    },

    animateScroll(currentSection) {
      if (statements.inAnimate) return;
      statements.inAnimate = true;
      $('html, body')
        .stop()
        .animate(
          {
            scrollTop: currentSection - options.offset,
          },
          options.speed,
          () => {
            statements.inAnimate = false;
          },
        );
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
