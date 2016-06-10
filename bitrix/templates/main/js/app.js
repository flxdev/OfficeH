$(document).ready(function () {
	//images or links draggeble
	function drag() {
		$("img, a").on("dragstart", function(event) { event.preventDefault(); });
	}
	drag();

	// swiper slider
	(function(){
		var interleaveOffset = -.5,
			interleaveEffect = {  
			onProgress: function(e, t) {
				for (var n = 0; n < e.slides.length; n++) {
					var o, i, a = e.slides[n];
					t = a.progress, t > 0 ? (o = t * e.width, i = o * interleaveOffset) : (i = Math.abs(t * e.width) * interleaveOffset, o = 0), -1 != (navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf("OPR")) ? ($(a).css({
						transform: "translate3d(" + o + "px,0,0)"
					}), $(a).find(".slide-bg").css({
						transform: "translate3d(" + i + "px,0,0)"
					})) : -1 != navigator.userAgent.indexOf("Chrome") ? ($(a).css({
						transform: "translate3d(" + o + "px,0,0)"
					}), $(a).find(".slide-bg").css({
						transform: "translate3d(" + i + "px,0,0)"
					})) : -1 != navigator.userAgent.indexOf("Safari") ? ($(a).css({
						transform: "translate3d(" + o + "px,0,0)"
					}), $(a).find(".slide-bg").css({
						transform: "translate3d(" + i + "px,0,0)"
					})) : -1 != navigator.userAgent.indexOf("Firefox") || -1 != navigator.userAgent.indexOf("MSIE") || 1 == !!document.documentMode
				}
			},
			onTouchStart: function(e) {
				for (var t = 0; t < e.slides.length; t++) $(e.slides[t]).css({
					transition: ""
				})
			},
			onSetTransition: function(e, t) {
				for (var n = 0; n < e.slides.length; n++) $(e.slides[n]).find(".slide-bg").andSelf().css({
					transition: t + "ms"
				})
			}
			},
			swiperOptions = {
				loop: !0,
				speed: 1700,
				// grabCursor: !0,
				watchSlidesProgress: !0,
				centeredSlides: !0,
				// mousewheelControl: !0,
				autoplay: 6e3,
				autoplayDisableOnInteraction: !1,
				pagination: '.swiper-pagination',
				paginationClickable: true
			};

		var swiper = $('.fullscreen');
		swiperOptions = $.extend(swiperOptions, interleaveEffect);
		var swipers = new Swiper(swiper, swiperOptions);
		// if(swiper.length) {
		// 	var swiper = new Swiper(swiper, {
		// 		pagination: '.swiper-pagination',
		// 		paginationClickable: true,
		// 		effect: "fade",
		// 		speed: 1700,
		// 		autoplay: 1700
		// 	});
		// }
	})();

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
			close = mMenu.find('.close__menu'),
			top = $(document).scrollTop();

		btn.on('click', function(){
			mMenu.addClass('is-active');
		});

		mMenu.add(btn).on('click', function(event){
			event.stopPropagation();
		});

		$(document).add(close).on('click', function(){
			mMenu.removeClass('is-active');
		});

		$(document).on('scroll', function() {    
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
			var item = accordion.find('.accordion-item'),
			less = '<p>Скрыть</p>',
			must = '<p>Читать больше</p>';

			item.each(function(){
				var _ = $(this),
					btn = _.find('.accordion-toggle'),
					preview = _.find('.accordion-preview'),
					main = _.find('.accordion-main'),
					text = _.find('.accordion-more');

				_.on('click', function(){
					if(!btn.hasClass('active')) {
						btn.addClass('active');
						preview.addClass("hide");
						main.addClass('visible');
						text.empty().append(less);
					} else {
						btn.removeClass('active');
						preview.removeClass("hide");
						main.removeClass('visible');
						text.empty().append(must);
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
				//verticalCentered: false,
				scrollingSpeed: 1400,
				menu: '.navi',
				anchors:['concept', 'consulting', 'design', 'creature', 'care', 'company'],
				onLeave: function(index, nextIndex, direction){
					header(direction, nextIndex);
				}
			});
		};

		$('.next-stage').on('click', function(){
			$.fn.fullpage.moveTo(2);
		});

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
		};

	})();

	//ImageSizer 
	function imageSizer() {
		var $img = $('.grid-gallery').find('img');

		$img.on('load', function(){
			var $imgs = $(this),
				$width = +$imgs.width(),
				$height = +$imgs.height();
			if($width > $height) {
				$imgs.parent().addClass('horizontal');
			} else {
				$imgs.parent().addClass('vertical');
			}
		});

	};
	imageSizer();

})