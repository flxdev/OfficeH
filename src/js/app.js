$(document).ready(function () {
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
})