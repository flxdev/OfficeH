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

})