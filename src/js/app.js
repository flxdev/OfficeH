$(document).ready(function () {
	//images or links draggeble
	function drag() {
		$("img, a").on("dragstart", function(event) { event.preventDefault(); });
	}
	drag();

	// swiper slider
	(function(){
		var swiper = $('.fullscreen');
		if(swiper.length) {
			var swiper = new Swiper(swiper, {
				pagination: '.swiper-pagination',
				paginationClickable: true,
				effect: "fade",
				speed: 1700,
				autoplay: 1700
			});
		}
	})();

	// // isotope
	// if ($('.grid').length) {
	// 	isotopeSorts($('.grid-layout'));
	// }

	// function isotopeSorts(grid) {
	// 	var $grid = grid.isotope({
	// 		itemSelector: '.grid-item',
	// 		percentPosition: true,
	// 		category: '[data-category]',
	// 		masonry: {
	// 			columnWidth: '.grid-sizer'
	// 		}
	// 	});
	// 	$('.btn-filter').on('click', function(){
	// 		var fValue = $(this).data('filter');
	// 		$grid.isotope({filter: fValue});
	// 		$(this).addClass('is-checked').siblings().removeClass('is-checked');
	// 	});
	// };

	//fancybox
	if($('.grid-gallery').length) {
		$('.grid-gallery').fancybox({
			padding: 0
		});
	};

	//menu btn

	(function(){
		var hDoc = $(document).height(),
			hWind = $(window).height(),
			hHeader = $('.header').height(),
			btn = $('.menu'),
			mMenu = $('.menu__wrapper'),
			close = mMenu.find('.close__menu');

		btn.on('click', function(){
			mMenu.addClass('is-active');
		});

		mMenu.add(btn).on('click', function(event){
			event.stopPropagation();
		});

		$(document).add(close).on('click', function(){
			mMenu.removeClass('is-active');
		});

		$(document).scroll(function() {    
			var scroll = $(this).scrollTop();
			if (scroll > hHeader) {
				btn.addClass('is-active');
			}
			else{
				btn.removeClass('is-active');
				mMenu.removeClass('is-active');
			}
		});

	})();


	//map
	if($('#map').length) {
		mapInit();
	}

	function mapInit() {
		ymaps.ready(function () {
		  var myMap = new ymaps.Map('map', {
				center: [55.873741, 37.434072],
				zoom: 14,
				controls: ['zoomControl']
			}),
			myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
				hintContent: 'пр-т Победителей 103',
				balloonContent: 'пр-т Победителей 103'
			},{
				preset: 'islands#icon',
				iconColor: '#ed4543'
			});
			var zoomControl = new ymaps.control.ZoomControl({
		    options: {
						size: "small"
					}
			});
			myMap.geoObjects.add(myPlacemark).add(zoomControl);
			myMap.behaviors.disable('scrollZoom');
		});
	};

	//validator
	(function(){
		var form_validate = $('.js-validate');
		if (form_validate.length) {
			form_validate.each(function () {
				var form_this = $(this);
				$.validate({
					form : form_this,
					// validateOnBlur : true,
					borderColorOnError : false,
					scrollToTopOnError : false,
					onSuccess : function() {
						if (form_this.hasClass('popups')) {
							$('.popup').removeClass('is-open');
							$('.success').addClass('is-open');
							$('.popup').find('form').trigger('reset');
							return false;
						}				
					}
				});
			});
		}
	})();

	//popup
	$('[data-popup]').each(function() {
      var $this = $(this);

      $this.on('click', function(e) {
      	Popup($this.data('popup'));
				return false;
      });
  });

	function Popup(options){
		var popupSelector = $('.' + options),
				innerSelector = popupSelector.find('.popup'),
				duration = 500,
				close = popupSelector.find('.popup__close'),
				html = $('html');

		popupSelector
			.fadeIn({
				duration: duration,
				complete: function(){
					$(this).addClass('is-visible');
				}
			});

		innerSelector.on('click', function(event){
			event.stopPropagation();
		});

		close.add($('.popup .close, .popup__wrap')).on('click', function(){
			if(!popupSelector.hasClass('is-visible')) return;

			if($('.error').hasClass('is-open')) {
				$('.error').removeClass('is-open');
				$('.popup:first-child').addClass('is-open');
				return false;
			}

			popupSelector
				.removeClass("is-visible")
				.delay(duration)
				.fadeOut({
					duration: duration,
					complete: function(){
						html.removeClass('overlay');
						//$('.error').removeClass('is-open');
						$('.success').removeClass('is-open');
						$('.popup:first-child').addClass('is-open');
					}
				});
			return false;
		});
	};

	//accordion
	(function(){
		var accordion = $('.accordion');
		if (accordion.length) {
			Accordion(accordion);
		}
		function Accordion(accordion) {
			var item = accordion.find('.accordion-item');

			item.each(function(){
				var _ = $(this),
					btn = _.find('.accordion-toggle'),
					preview = _.find('.accordion-preview'),
					main = _.find('.accordion-main');

				btn.on('click', function(){
					if(!$(this).hasClass('active')) {
						$(this).addClass('active');
						preview.addClass("hide");
						main.addClass('visible')
								//.slideDown(1000);
					} else {
						$(this).removeClass('active');
							preview.removeClass("hide");
							main.removeClass('visible')
									//.slideUp(1000);
					}
				});
			});
		}
	})();

	//fullpage
	(function(){
		if($('.conception')) {
			fullPage($('.fullpage'));
		}

		function fullPage(fullpage){
			fullpage.fullpage({
				verticalCentered: false,
				scrollingSpeed: 1400,
				onLeave: function(index, nextIndex, direction){
					header(direction, nextIndex);
				}
			});
		};

		function header(direction, nextIndex) {
			if(direction === 'down') {
				$('.section').removeClass('up');
				$('.section.active').next().addClass('down').siblings().removeClass('down');
			} else {
				$('.section').removeClass('down');
				$('.section.active').prev().addClass('up').siblings().removeClass('up')
			}
			if(nextIndex !== 1) {
				$('.header').addClass('no');
				$('.menu').delay(700).addClass('is-active');
			} else {
				$('.header').delay(700).removeClass('no');
				$('.menu').removeClass('is-active');
				$('.menu__wrapper').removeClass('is-active');
			}
		}

	})();

})