(function($) {
	
	"use strict";
	
	//Hide Loading Box (Preloader)
	function handlePreloader() {
		if($('.loader-wrap').length){
			$('.loader-wrap').delay(200).fadeOut(300);  // Much faster: 200ms delay + 300ms fadeout = 0.5 seconds total
		}
		if($('.handle-preloader').length){
			$('.handle-preloader').delay(200).fadeOut(300);
		}
	}

	if ($(".preloader-close").length) {
        $(".preloader-close").on("click", function(){
            $('.loader-wrap').delay(200).fadeOut(500);
            $('.handle-preloader').fadeOut(300);
        })
    }
	
	//Update Header Style and Scroll to Top
	function headerStyle() {
		if($('.main-header').length){
			var windowpos = $(window).scrollTop();
			var siteHeader = $('.main-header');
			var scrollLink = $('.scroll-top');
			
			// Add scrolled class to header-style-two when scrolling
			if (windowpos >= 50) {
				siteHeader.addClass('fixed-header');
				$('.header-style-two').addClass('scrolled');
				scrollLink.addClass('open');
			} else {
				siteHeader.removeClass('fixed-header');
				$('.header-style-two').removeClass('scrolled');
				scrollLink.removeClass('open');
			}
		}
	}
	
	headerStyle();


	//Submenu Dropdown Toggle
	if($('.main-header li.dropdown ul').length){
		$('.main-header .navigation li.dropdown').append('<div class="dropdown-btn"><span class="fas fa-angle-down"></span></div>');
		
	}

	//Mobile Nav Hide Show
	if($('.mobile-menu').length){
		
		
		var mobileMenuContent = $('.main-header .menu-area .main-menu').html();
		$('.mobile-menu .menu-box .menu-outer').append(mobileMenuContent);
		$('.sticky-header .main-menu').append(mobileMenuContent);
		
		//Dropdown Button
		$('.mobile-menu li.dropdown .dropdown-btn').on('click', function() {
			$(this).toggleClass('open');
			$(this).prev('ul').slideToggle(500);
		});
		//Dropdown Button
		$('.mobile-menu li.dropdown .dropdown-btn').on('click', function() {
			$(this).prev('.megamenu').slideToggle(900);
		});
		//Menu Toggle Btn
		$('.mobile-nav-toggler').on('click', function() {
			$('body').addClass('mobile-menu-visible');
		});

		//Menu Toggle Btn
		$('.mobile-menu .menu-backdrop,.mobile-menu .close-btn').on('click', function() {
			$('body').removeClass('mobile-menu-visible');
		});
	}

	// Elements Animation
	if($('.wow').length){
		var wow = new WOW({
		mobile:       false
		});
		wow.init();
	}

	//Contact Form Validation
	if($('#contact-form').length){
		$('#contact-form').validate({
			rules: {
				username: {
					required: true
				},
				email: {
					required: true,
					email: true
				},
				phone: {
					required: true
				},
				subject: {
					required: true
				},
				message: {
					required: true
				}
			}
		});
	}


	//LightBox / Fancybox
	if($('.lightbox-image').length) {
		$('.lightbox-image').fancybox({
			openEffect  : 'fade',
			closeEffect : 'fade',
			helpers : {
				media : {}
			}
		});
	}


	//Tabs Box
	if($('.tabs-box').length){
		$('.tabs-box .tab-buttons .tab-btn').on('click', function(e) {
			e.preventDefault();
			var target = $($(this).attr('data-tab'));
			
			if ($(target).is(':visible')){
				return false;
			}else{
				target.parents('.tabs-box').find('.tab-buttons').find('.tab-btn').removeClass('active-btn');
				$(this).addClass('active-btn');
				target.parents('.tabs-box').find('.tabs-content').find('.tab').fadeOut(0);
				target.parents('.tabs-box').find('.tabs-content').find('.tab').removeClass('active-tab');
				$(target).fadeIn(100);
				$(target).addClass('active-tab');
			}
		});
	}



	//Accordion Box
	if($('.accordion-box').length){
		$(".accordion-box").on('click', '.acc-btn', function() {
			
			var outerBox = $(this).parents('.accordion-box');
			var target = $(this).parents('.accordion');
			
			if($(this).hasClass('active')!==true){
				$(outerBox).find('.accordion .acc-btn').removeClass('active');
			}
			
			if ($(this).next('.acc-content').is(':visible')){
				return false;
			}else{
				$(this).addClass('active');
				$(outerBox).children('.accordion').removeClass('active-block');
				$(outerBox).find('.accordion').children('.acc-content').slideUp(300);
				target.addClass('active-block');
				$(this).next('.acc-content').slideDown(300);	
			}
		});	
	}


	// banner-carousel
	if ($('.banner-carousel').length) {
        $('.banner-carousel').owlCarousel({
            loop:true,
			margin:0,
			nav:true,
			animateOut: 'fadeOut',
    		animateIn: 'fadeIn',
    		active: true,
			smartSpeed: 1000,
			autoplay: 6000,
            navText: [ '<span class="icon-6"></span>', '<span class="icon-7"></span>' ],
            responsive:{
                0:{
                    items:1
                },
                600:{
                    items:1
                },
                800:{
                    items:1
                },
                1024:{
                    items:1
                }
            }
        });
    }

// banner-carousel-wrapper (for index.html banner)
if ($('.banner-carousel-wrapper').length) {
	$('.banner-carousel-wrapper').owlCarousel({
		loop: true,
		margin: 0,
		nav: false,
		dots: true,
		items: 1,
		autoplay: true,
		autoplayTimeout: 5000,
		autoplayHoverPause: false,
		smartSpeed: 3000,

		// 🔥 ADD THIS
		animateOut: 'fadeOut',
		animateIn: 'fadeIn',

		navText: ['<span class="icon-6"></span>', '<span class="icon-7"></span>'],

		onInitialized: function() {
			$('.banner-carousel-wrapper, .banner-slide').css({
				'height': '100vh',
				'min-height': '100vh'
			});
			$('.banner-slide img').css({
				'height': '100vh',
				'width': '100%',
				'object-fit': 'cover',
				'object-position': 'center'
			});
		},

		onResized: function() {
			$('.banner-carousel-wrapper, .banner-slide').css({
				'height': '100vh',
				'min-height': '100vh'
			});
			$('.banner-slide img').css({
				'height': '100vh',
				'width': '100%',
				'object-fit': 'cover',
				'object-position': 'center'
			});
		}
	});
}

    // single-item-carousel
	if ($('.single-item-carousel').length) {
		$('.single-item-carousel').owlCarousel({
			loop:true,
			margin:30,
			nav:true,
			smartSpeed: 500,
			autoplay: 1000,
			navText: [ '<span class="icon-11"></span>', '<span class="icon-12"></span>' ],
			responsive:{
				0:{
					items:1
				},
				480:{
					items:1
				},
				600:{
					items:1
				},
				800:{
					items:1
				},			
				1200:{
					items:1
				}

			}
		});    		
	}


	// two-item-carousel
	if ($('.two-item-carousel').length) {
		$('.two-item-carousel').owlCarousel({
			loop:true,
			margin:30,
			nav:true,
			smartSpeed: 500,
			autoplay: 1000,
			navText: [ '<span class="icon-6"></span>', '<span class="icon-7"></span>' ],
			responsive:{
				0:{
					items:1
				},
				480:{
					items:1
				},
				600:{
					items:1
				},
				800:{
					items:2
				},			
				1200:{
					items:2
				}

			}
		});    		
	}

	// project-carousel (2 items at a time)
	if ($('.project-carousel').length) {
		// Load projects from JSON and initialize carousel
		$.getJSON('assets/data/project_carousel.json', function(data) {
			const carousel = $('#projectCarousel');
			
			// Create project items from JSON data - no text box
			data.projects.forEach(function(project) {
				const projectHTML = `
					<div class="project-block">
						<div class="project-block-two">
							<div class="inner-box">
								<figure class="image-box"><img src="${project.image}" alt="${project.category}" loading="lazy"></figure>
							</div>
						</div>
					</div>
				`;
				carousel.append(projectHTML);
			});
			
			// Initialize Owl Carousel after loading data
			carousel.owlCarousel({
    loop: true,
    margin: 40,
    nav: true,
    dots: false,
    center: true,
    items: 1,                // ⭐ only 1 main item
    stagePadding: 250,       // shows half images
    smartSpeed: 900,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplayHoverPause: true,
    navText: [
        '<span class="icon-6"></span>',
        '<span class="icon-7"></span>'
    ],
    responsive:{
        0:{
            items:1,
            stagePadding: 40
        },
        768:{
            items:1,
            stagePadding: 120
        },
        1200:{
            items:1,
            stagePadding: 250
        }
    }
});
		});
	}


    // three-item-carousel
	if ($('.three-item-carousel').length) {
		$('.three-item-carousel').owlCarousel({
			loop:true,
			margin:30,
			nav:false,
			smartSpeed: 500,
			autoplay: 1000,
			navText: [],
			responsive:{
				0:{
					items:1
				},
				480:{
					items:1
				},
				600:{
					items:2
				},
				800:{
					items:2
				},			
				1200:{
					items:3
				}

			}
		});    		
	}


	// four-item-carousel
	if ($('.four-item-carousel').length) {
		$('.four-item-carousel').owlCarousel({
			loop:true,
			margin:30,
			nav:true,
			smartSpeed: 500,
			autoplay: 1000,
			navText: [ '<span class="fal fa-angle-left"></span>', '<span class="fal fa-angle-right"></span>' ],
			responsive:{
				0:{
					items:1
				},
				480:{
					items:1
				},
				600:{
					items:2
				},
				800:{
					items:3
				},			
				1200:{
					items:4
				}

			}
		});    		
	}


	// five-item-carousel (partners/clients)
	if ($('.five-item-carousel').length) {
		$('.five-item-carousel').owlCarousel({
			loop:true,
			margin:30,
			nav:false,
			dots:false,
			smartSpeed: 500,
			autoplay: 3000,
			autoplayTimeout: 3000,
			autoplayHoverPause: true,
			navText: [ '<span class="fal fa-angle-left"></span>', '<span class="fal fa-angle-right"></span>' ],
			responsive:{
				0:{
					items:2,
					margin:20
				},
				480:{
					items:2,
					margin:20
				},
				600:{
					items:3
				},
				800:{
					items:4
				},			
				1200:{
					items:5
				}

			}
		});    		
	}


	//Add One Page nav
	if($('.scroll-nav').length) {
		$('.scroll-nav').onePageNav();
	}

	//nice select
	$(document).ready(function() {
		$('select:not(.ignore)').niceSelect();
	  });


	//Sortable Masonary with Filters
	function enableMasonry() {
		if($('.sortable-masonry').length){
	
			var winDow = $(window);
			// Needed variables
			var $container=$('.sortable-masonry .items-container');
			var $filter=$('.filter-btns');
	
			$container.isotope({
				filter:'*',
				 masonry: {
					columnWidth : '.masonry-item.small-column'
				 },
				animationOptions:{
					duration:500,
					easing:'linear'
				}
			});
			
	
			// Isotope Filter 
			$filter.find('li').on('click', function(){
				var selector = $(this).attr('data-filter');
	
				try {
					$container.isotope({ 
						filter	: selector,
						animationOptions: {
							duration: 500,
							easing	: 'linear',
							queue	: false
						}
					});
				} catch(err) {
	
				}
				return false;
			});
	
	
			winDow.on('resize', function(){
				var selector = $filter.find('li.active').attr('data-filter');

				$container.isotope({ 
					filter	: selector,
					animationOptions: {
						duration: 500,
						easing	: 'linear',
						queue	: false
					}
				});
			});
	
	
			var filterItemA	= $('.filter-btns li');
	
			filterItemA.on('click', function(){
				var $this = $(this);
				if ( !$this.hasClass('active')) {
					filterItemA.removeClass('active');
					$this.addClass('active');
				}
			});
		}
	}
	
	enableMasonry();


    // Progress Bar
	if ($('.count-bar').length) {
		$('.count-bar').appear(function(){
			var el = $(this);
			var percent = el.data('percent');
			$(el).css('width',percent).addClass('counted');
		},{accY: -50});

	}


	//Search Popup
	if($('#search-popup').length){
		
		//Show Popup
		$('.search-toggler').on('click', function() {
			$('#search-popup').addClass('popup-visible');
		});
		$(document).keydown(function(e){
	        if(e.keyCode === 27) {
	            $('#search-popup').removeClass('popup-visible');
	        }
	    });
		//Hide Popup
		$('.close-search,.search-popup .overlay-layer').on('click', function() {
			$('#search-popup').removeClass('popup-visible');
		});
	}


	if ($(".odometer").length) {
    var odo = $(".odometer");
    odo.each(function () {
        $(this).appear(function () {
            var countNumber = $(this).attr("data-count");
            $(this).html(countNumber);
        });
    });
}


	  // Date picker
	function datepicker () {
	    if ($('#datepicker').length) {
	        $('#datepicker').datepicker();
	    };
	}

	// Time picker
	function timepicker () {
	    if ($('input[name="time"]').length) {
	        $('input[name="time"]').ptTimeSelect();
	    }
	}


	


	/*	=========================================================================
	When document is on ready, do
	========================================================================== */

	jQuery(document).on('ready', function () {
		(function ($) {
			// add your functions
		datepicker ();
		timepicker ();
		})(jQuery);
	});



	/* ==========================================================================
   When document is Scrollig, do
   ========================================================================== */
	
	$(window).on('scroll', function() {
		headerStyle();
	});

	
	
	/* ==========================================================================
   When document is loaded, do
   ========================================================================== */
	
	$(window).on('load', function() {
		handlePreloader();
		enableMasonry();
		setupTestimonialReadMore();
		loadServicePageProjects();
	});

	// Setup Read More/Read Less functionality for testimonials
	function setupTestimonialReadMore() {
		if ($('.testimonial-section .testimonial-block').length) {
			$('.testimonial-section .testimonial-block').each(function() {
				var $block = $(this);
				var $textBox = $block.find('.text-box');
				var $testimonialText = $textBox.find('.testimonial-text');
				
				// Only add functionality if data-full attribute exists
				if ($testimonialText.attr('data-full')) {
					var fullText = $testimonialText.attr('data-full');
					var $textContent = $testimonialText.find('.text-content');
					var $readMoreBtn = $testimonialText.find('.read-more-btn');
					
					// Handle Read More button click
					$readMoreBtn.on('click', function(e) {
						e.preventDefault();
						
						if ($testimonialText.hasClass('expanded')) {
							// Collapse - show truncated text
							$textContent.fadeOut(200, function() {
								$textContent.html($textContent.attr('data-short'));
								$textContent.fadeIn(200);
							});
							$testimonialText.removeClass('expanded');
							$readMoreBtn.text('Read More');
						} else {
							// Expand - show full text
							// Store the short text first
							if (!$textContent.attr('data-short')) {
								$textContent.attr('data-short', $textContent.html());
							}
							
							$textContent.fadeOut(200, function() {
								$textContent.html(fullText);
								$textContent.fadeIn(200);
							});
							$testimonialText.addClass('expanded');
							$readMoreBtn.text('Read Less');
						}
					});
				}
			});
		}
	}

	// Truncate long testimonials and add "Read More" link
	function truncateTestimonials() {
		// This function is no longer needed - keeping for backwards compatibility
	}

	// Load projects for service page showcase (show 3 initially)
	function loadServicePageProjects() {
		if ($('#projectShowcase').length) {
			$.getJSON('assets/data/projects.json', function(data) {
				const showcase = $('#projectShowcase');
				let allProjects = [];
				
				// Create project items from JSON data - no text box
				data.projects.forEach(function(project, index) {
					const projectHTML = `
						<div class="col-lg-4 col-md-6 col-sm-12 project-item" data-index="${index}" style="display: ${index < 3 ? 'block' : 'none'}; margin-bottom: 30px;">
							<div class="project-block-two">
								<div class="inner-box">
									<figure class="image-box"><img src="${project.image}" alt="${project.category}"></figure>
								</div>
							</div>
						</div>
					`;
					showcase.append(projectHTML);
					allProjects.push(index);
				});
				
				// See All Projects button functionality
				$('#seeAllProjectsBtn').on('click', function() {
					$('.project-item').fadeIn(400);
					$(this).hide();
					$('#showLessProjectsBtn').show();
					
					// Smooth scroll to projects section
					$('html, body').animate({
						scrollTop: $('#projectShowcase').offset().top - 100
					}, 500);
				});
				
				// Show Less button functionality
				$('#showLessProjectsBtn').on('click', function() {
					$('.project-item').each(function(index) {
						if (index >= 3) {
							$(this).fadeOut(400);
						}
					});
					$(this).hide();
					$('#seeAllProjectsBtn').show();
					
					// Smooth scroll back to top of projects section
					$('html, body').animate({
						scrollTop: $('.project-showcase-section').offset().top - 100
					}, 500);
				});
			});
		}
	}

	

})(window.jQuery);