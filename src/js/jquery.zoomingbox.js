/*!
 * zoomingBox - jQuery Plugin
 * version: 1.2.1 (Sun, 07 Dic 2014)
 * @requires jQuery v1.6 or later
 *
 * Examples at http://jcf-design.com/zoomingBox
 *
 * Copyright 2014 Javier Cubides Ferrans - info@jcf-design.com
 *
 */
(function ($) {
    "use strict";
    $.fn.zoomingBox = function (options) {
        var settings = $.extend(true, {}, $.fn.zoomingBox.defaults, options);
        this.click(function (e) {
            var container, thumbHolder, buttons, image_wrap, zoomingBox, zoomingBox_image, thumbSearch, current, height, thisClass = this, full_image = this.href, image_rel = this.rel;
            //Prevent Hyperlink
            e.preventDefault();
            settings.onStart.call(this);
            //Get linked image
            if (settings.imageResize === 'height') {
                container = '<div id="zoomingBox-content">';
            } else if(settings.imageResize === 'both'){
                container = '<div id="zoomingBox-content" style="max-width:' + settings.containerWidth + ';">';
            }else {
                container = '<div id="zoomingBox-content" style="max-width:' + settings.containerWidth + '; height:' + settings.containerHeight + '">';
            }
            zoomingBox_image = '<img class="zoomingBox-xl" src="' + full_image + '" />';
            if (settings.thumbnails) {
                if (settings.thumbnailPosition === "vertical") {
                    thumbHolder = "zThumbsVertical";
                } else {
                    thumbHolder = "zThumbsHorizontal";
                }
                image_wrap = 'zoomingBox-img';
                zoomingBox = '<div id="zoomingBox"><div id="zoomingBox-overlay"></div>' + container + '<div id="zoomingBox-img"></div><div id="zoomingBox-thumbs" class="' + thumbHolder + '"></div></div></div>';
            } else {
                image_wrap = 'zoomingBox-content';
                zoomingBox = '<div id="zoomingBox"><div id="zoomingBox-overlay"></div>' + container + '</div></div>';
            }

            //insert zoomingBox HTML into page

            $('body').append(zoomingBox);

            if (settings.imageResize === 'height') {
                height = $(window).height() * 0.9;
                zoomingBox_image = '<img class="zoomingBox-xl" src="' + full_image + '" style="max-height:' + height + 'px" />';
            } else if (settings.imageResize === 'width') {
                zoomingBox_image = '<img class="zoomingBox-xl" src="' + full_image + '" style="max-width:100%" />';
            } else {
                zoomingBox_image = '<img class="zoomingBox-xl" src="' + full_image + '"/>';
            }
            //insert image into Zoombox
            $('#' + image_wrap).append(zoomingBox_image);

            if (image_rel && settings.nav) {
                thumbSearch = $('a[rel="' + image_rel + '"]');
                if (thumbSearch.length > 1) {
                    buttons = '<a href="#" class="zoomingBox-next">' + settings.nextText + '</a><a href="#" class="zoomingBox-prev">' + settings.prevText + '</a> ';
                    $('#zoomingBox-content').append(buttons);
                    for (var i = 0; i < thumbSearch.length; i++) {
                        if (thisClass === thumbSearch[i]) {
                            current = i;
                        }
                    }
                }
            }

            function nextImg() {
                if (current + 1 >= thumbSearch.length) {
                    current = 0;
                }
                else {
                    current = current + 1;
                }
                $('.zoomingBox-xl').attr('src', thumbSearch[current].href);
                return false;
            }

            function prevImg() {
                if (current <= 0) {
                    current = thumbSearch.length - 1;
                }
                else {
                    current = current - 1;
                }
                $('.zoomingBox-xl').attr('src', thumbSearch[current].href);
                return false;
            }

            $(document).keydown(function(e){
                        if(e.keyCode === 37){  //prev key
                            prevImg();

                        }
                        else if(e.keyCode === 39){  //next key
                            nextImg();

                        }
                    });

            $('.zoomingBox-next').on('click', nextImg);
            $('.zoomingBox-prev').on('click', prevImg);
            
            if (settings.thumbnails) {
            	if (image_rel) {
            		thumbSearch = $('a[rel="' + image_rel + '"]');
            		thumbSearch.each(function () {
                       var thumbs =
                       '<a href="' + this.href + '" class="zoomingBox-thumbs">' +
                       '<img src="' + this.href + '" alt=""/>' +
                       '</a>';
                       $('#zoomingBox-thumbs').append(thumbs);
                   });
            	}
            	else {
            		var thumbs =
            		'<a href="' + this.href + '" class="zoomingBox-thumbs">' +
            		'<img src="' + this.href + '" alt=""/>' +
            		'</a>';
            		$('#zoomingBox-thumbs').append(thumbs);
            	}
            	$('.zoomingBox-thumbs').on('click', function (e) {
                    e.preventDefault();
                    var thumbs_href = this.href;
                    $('.zoomingBox-xl').attr('src', thumbs_href);
                    return false;
                });
            }
            if (settings.closeButton) {
            	var closeBtn = '<a href="#" class="close">' + settings.closeText + '</a>';
            	$('#zoomingBox-content').append(closeBtn);
            }
            $('#zoomingBox-overlay').css('background', settings.overlayColor);
            $('#zoomingBox-overlay').fadeTo(0, settings.overlayOpacity);
            $('#zoomingBox').fadeIn(settings.speed);
            $('.zoomingBox-xl').on('mousemove', function (e) {
                var fullWidth = $('.zoomingBox-xl').width(); // Width in pixels of full-sized image
                var fullHeight = $('.zoomingBox-xl').height();
                var contentWidth = $('#zoomingBox-content').width();  // Width in pixels of thumbnail image
                var contentHeight = $('#zoomingBox-content').height();
                var offset = $('#zoomingBox-content').offset();
                var mouseX = e.pageX - offset.left;
                var mouseY = e.pageY - offset.top;
                var posX = (Math.round((mouseX / contentWidth) * 100) / 100) * (fullWidth - contentWidth);
                var posY = (Math.round((mouseY / contentHeight) * 100) / 100) * (fullHeight - contentHeight);
                if (settings.zoom === 'vertical') {
                    $('.zoomingBox-xl').css('top', '-' + posY + 'px');
                }
                else if (settings.zoom === 'horizontal') {
                    $('.zoomingBox-xl').css('left', '-' + posX + 'px');
                }
                else {
                    $('.zoomingBox-xl').css({'top': '-' + posY + 'px', 'right': '' + posX + 'px'});
                }
            });
settings.onComplete.call(this);
});

$(document).on('click', '#zoomingBox', function () {
    settings.onCleanup.call(this);
    $('#zoomingBox').remove();
    settings.onClose.call(this);
    return false;
});

$(document).keydown(function (e) {
    if (e.keyCode === 27){
       settings.onCleanup.call(this);
       $('#zoomingBox').remove();
       settings.onClose.call(this);
       return false;
   }
});
};

$.fn.zoomingBox.defaults = {
 zoom: 'both',
 speed: 800,
 thumbnails: true,
 closeButton: true,
 closeText: 'x',
 thumbnailPosition: 'vertical',
 onStart: function () {},
 onComplete: function () {},
 onCleanup: function () {},
 onClose: function () {},
 overlayColor: '#000000',
 overlayOpacity: '0.7',
 imageResize: null,
 containerWidth: '70%',
 containerHeight: '90%',
 nextText : 'NEXT &gt;',
 prevText : '&lt; PREV',
 nav : true
};
}(jQuery));
