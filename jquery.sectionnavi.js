(function($){

    $.fn.sectionnavi = function(options) {
        // Зададим список свойств и укажем для них значения по умолчанию.
        // Если при вызове метода будут указаны пользовательские
        // варианты некоторых из них, то они автоматически перепишут
        // соответствующие значения по умолчанию
        var options = $.extend({
            param1: 'param1Value', //параметр1
            param2: 'param2Value' //параметр2
        }, options);

		var make = function(){
			// реализация работы метода с отдельным элементом страницы
			console.log(this);
		};

		return this.each(make);
		// в итоге, метод pluginName вернет текущий объект jQuery обратно
	};

})(jQuery);