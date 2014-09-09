$(document).ready(function(){
	//define scroll function
	function scrollStep(index){
		$('body,html').animate({
			scrollTop: index*767 + (40)
		},{
			duration:'slow',
			easing:'swing'
		}
		);
	}
	//toggle top-bar and activate top-bar btn at 1st slide
	$('.exp-text').on('click',function(){
		scrollStep(1);
		$('.top-bar-btn').removeClass('top-btn-active');
		$('.top-bar-btn2').addClass('top-btn-active');
	});

	//toggle top-bar and activate top-bar btn on each btn
	$('.top-bar-btn').each(function(){
		$(this).on('click',function(){
			var i = $(this).index();
			scrollStep(i);
			$('.top-bar-btn').removeClass('top-btn-active');
			$(this).addClass('top-btn-active');
		});
	});

	//add up & down keyboard events
	$('body,html').keydown(function(event){
		var index = $('.top-btn-active').data('index');

		//pressing down event
		if(event.which == 40){
			console.log('ok dude');
			scrollStep(index);
			console.log(index);
		}

		if(event.which == 38){
			console.log('ok dude');
			// scrollStep((index-1));
			console.log(index);
			// scrollStep(index-1);
			// $('.top-bar-btn').removeClass('top-btn-active');
			// $('.top-bar-btn'+(index+1)).addClass('top-btn-active');
		}
		// else return true;
	});


	//do something else
	$(window).scroll(function(){
	    var offsetTop = $(window).scrollTop();
			
			offsetIndex();
	    function offsetIndex(){
				var offIndex = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17];
				var offset = 0;
				for (i in offIndex){
					if (offsetTop >= offset){
						$('.top-bar-btn').removeClass('top-btn-active');
						$('.top-bar-btn'+offIndex[i]).addClass('top-btn-active');
					}
					offset+=750;
				}
				
			}
	  });

	$('.ease-keyword').each(function(){
		$(this).bind('click',function(){
			var eIndex = $(this).data('ease');
			scrollStep(eIndex);
		});
	});

	$('.info-img').each(function(){
		$(this).bind('click',function(){
			var eiIndex = $(this).data('easeinfo');
			scrollStep(eiIndex);
		});
	});

	$('.arrow--down').bind('click',function(){
		var offsetTop = $(window).scrollTop();
		var step = $('.nav-arrows-wrapper').data('step')+1;
		if (offsetTop >= 0){
		  scrollStep(step);
		  step++;
		  $('.nav-arrows-wrapper').data('step',step);	
		  $('.arrow--up').removeClass('arrow--init');
		}
		
	});

	$('.arrow--up').bind('click',function(){
		var offsetTop = $(window).scrollTop();
		var step = $('.nav-arrows-wrapper').data('step')-1;
		if (offsetTop >= 0){
		  scrollStep(step-1);
		  step--;
		  $('.nav-arrows-wrapper').data('step',step);	
		  
		}
		
	});
	

});
