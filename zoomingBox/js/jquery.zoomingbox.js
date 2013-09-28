/*!
 * zoomingBox - jQuery Plugin
 * version: 1.1 (Sat, 28 Sept 2013)
 * @requires jQuery v1.6 or later
 *
 * Examples at http://jcf-design.com/zoomingBox
 *
 * Copyright 2014 Javier Cubides Ferrans - info@jcf-design.com
 *
 */
(function ($) {
 $.fn.zoomingBox = function (options) {
 var settings = $.extend(true, {}, $.fn.zoomingBox.defaults, options);
 this.click(function (e) {
            var thisClass = this;
            //Prevent Hyperlink
            e.preventDefault();
            settings.onStart.call(this);
            //Get linked image
            
            var full_image = this.href;
            var image_rel = this.rel;
            if (settings.imageResize == 'height') {
            var container = '<div id="zoomingBox-content">'
            }
            else {
            var container = '<div id="zoomingBox-content" style="max-width:' + settings.containerWidth + '; height:' + settings.containerHeight + '">'
            }
            var zoomingBox_image = '<img class="zoomingBox-xl" src="' + full_image + '" />';
            if (settings.thumbnails) {
            if (settings.thumbnailPosition == "vertical") {
            var thumbHolder = "zThumbsVertical";
            }
            else {
            var thumbHolder = "zThumbsHorizontal";
            }
            var image_wrap = 'zoomingBox-img';
            var zoomingBox =
            '<div id="zoomingBox">' +
            '<div id="zoomingBox-overlay"></div>' +
            container +
            '<div id="zoomingBox-img">' +
            '</div>' +
            '<div id="zoomingBox-thumbs" class="' + thumbHolder + '">' +
            '</div>' +
            '</div>' +
            '</div>';
            }
            else {
            var image_wrap = 'zoomingBox-content';
            var zoomingBox =
            '<div id="zoomingBox">' +
            '<div id="zoomingBox-overlay"></div>' +
            container +
            '</div>' +
            '</div>';
            }
            //insert zoomingBox HTML into page
            $('body').append(zoomingBox);
            if (settings.imageResize == 'height') {
            var height = $(window).height() * 0.9;
            var zoomingBox_image = '<img class="zoomingBox-xl" src="' + full_image + '" style="max-height:' + height + 'px" />';
            }
            else if (settings.imageResize == 'width') {
            var zoomingBox_image = '<img class="zoomingBox-xl" src="' + full_image + '" style="max-width:100%" />';
            }
            else {
            var zoomingBox_image = '<img class="zoomingBox-xl" src="' + full_image + '"/>';
            }
            //insert image into Zoombox
            $('#' + image_wrap).append(zoomingBox_image);
            
            if (image_rel && settings.nav) {
            var thumbSearch = $('a[rel="' + image_rel + '"]');
            if (thumbSearch.length > 1) {
            var buttons = '<a href="#" class="zoomingBox-next">'+ settings.nextText +'</a><a href="#" class="zoomingBox-prev">'+ settings.prevText +'</a> '
            $('#zoomingBox-content').append(buttons);
            var current;
            
            //thumbSearch.indexOf('<a href="'+ $('.zoomingBox-xl').attr('src') +'" ')
            for (var i = 0; i < thumbSearch.length; i++) {
            if (thisClass == thumbSearch[i]) {
            current = i;
            }
            }
            $('.zoomingBox-next').on('click', function () {
                                     if (current + 1 >= thumbSearch.length) {
                                     current = 0;
                                     }
                                     else {
                                     current = current + 1;
                                     }
                                     $('.zoomingBox-xl').attr('src', thumbSearch[current].href);
                                     return false
                                     });
            $('.zoomingBox-prev').on('click', function () {
                                     if (current <= 0) {
                                     current = thumbSearch.length - 1;
                                     }
                                     else {
                                     current = current - 1;
                                     }
                                     $('.zoomingBox-xl').attr('src', thumbSearch[current].href);
                                     return false
                                     })
            }
            }
            
            if (settings.thumbnails) {
            if (image_rel) {
            var thumbSearch = $('a[rel="' + image_rel + '"]');
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
                                   var contentWidth = $('#zoomingBox-content').height();  // Width in pixels of thumbnail image
                                   var contentHeight = $('#zoomingBox-content').height();
                                   var offset = $('#zoomingBox-content').offset();
                                   var mouseX = e.pageX - offset.left;
                                   var mouseY = e.pageY - offset.top;
                                   var posX = (Math.round((mouseX / fullWidth) * 100) / 50) * (fullWidth - contentWidth);
                                   var posY = (Math.round((mouseY / contentHeight) * 100) / 100) * (fullHeight - contentHeight);
                                   if (settings.zoom == 'vertical') {
                                   $('.zoomingBox-xl').css('top', '-' + posY + 'px');
                                   }
                                   else if (settings.zoom == 'horizontal') {
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
 };
 $.fn.zoomingBox.defaults = {
 zoom: 'both',
 speed: 800,
 thumbnails: true,
 closeButton: true,
 closeText: 'x',
 thumbnailPosition: 'vertical',
 onStart: function () {
 },
 onComplete: function () {
 },
 onCleanup: function () {
 },
 onClose: function () {
 },
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