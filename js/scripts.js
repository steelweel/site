$(function() {

// Options Swip
var mySwiper = new Swiper('.swiper-container',{
scrollContainer: true,
keyboardControl: true,
scrollbar: {
	container: '.swiper-scrollbar',
	hide: false,
	}
});

// Width container for slides 
var widthSwiperContainer = 0;
$('.swiper-slide > *').each(function(){ 
	widthSwiperContainer += $(this).width() +1 ; //  + 1px for scalable
});
$('.swiper-slide').css("width", widthSwiperContainer);


// Options promoSlider
var slider =  $('#promoSlider').royalSlider({
	controlNavigation:'thumbnails',
	imageScaleMode: 'fill',
	startSlideId: 2,
	keyboardNavEnabled: true,
	arrowsNav: false,
	imgWidth: 940,
	imgHeight: 370,
	thumbs: {
		firstMargin: false,
		spacing: 0,
		arrows: false,
	},
}).data('royalSlider'),
idSlider = $('#promoSlider'),
width = 255;

// Navigation at the top
idSlider.prepend(idSlider.find('.rsNav'));

// Arrow
function arrowSelectionTab() {
	$(".triagle").remove();
	$(".rsThumbsContainer").append("<div class='triagle'></div>");
	$(".triagle").css('left', function (){
	return (slider.currSlideId + 1) * width - (width/2 + 10) + "px";
	});
}

// Navigation buttons
function setPromoSliderArrows(){
	if( slider.numSlides === slider.currSlideId + 1 ){
	$(".splat-royalSlider__arrow__right").addClass('disabled');
	}else{
	$(".splat-royalSlider__arrow__right.disabled").removeClass("disabled");
	}
	
	if( slider.currSlideId === 0 ){
	$(".splat-royalSlider__arrow__left").addClass('disabled');
	}else{
	$(".splat-royalSlider__arrow__left.disabled").removeClass("disabled");
	}
}

slider.ev.on('rsAfterContentSet', function(e, slideObject) {
	if($(".splat-royalSlider__arrow__right").length === 0 ){
	$(".fwImage").append("<a href='#' class='splat-royalSlider__arrow__right'></a>").append("<a href='#' class='splat-royalSlider__arrow__left'></a>");

	if( slider.currSlideId === 0 ){
		$(".splat-royalSlider__arrow__left").attr("class", "disabled");
	}

	$(".splat-royalSlider__arrow__right").on("click",function() {
		slider.next();
		return false;
		}
	);

	$(".splat-royalSlider__arrow__left").on("click",function() {
		slider.prev();
		return false;
		}
	);
	arrowSelectionTab();
	}
});

// Function starts after changing slides
slider.ev.on('rsBeforeAnimStart', function(event) {
	arrowSelectionTab(); 
	setPromoSliderArrows(); 
});

});
