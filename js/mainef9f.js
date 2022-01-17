'use strict';

(function ($) {

  $(function () {});

  $(window).on('load', function () {
    $('html, body').animate({
      scrollTop: 0
    }, 1000, "easeInOutExpo");

    var $_body = $('body'),
        $_wrapper = $('#wrapper'),
        $_header = $('header'),
        $_window = $(this),
        currentScrollTop = 0;

    function init() {
      getOrders();
      disableClick();
      getRateElement();
      getMinRateElement();
      link_scrollTop();
      init_facybox();
      init_swiper();
      countUp();
      add_moment();
    }
    init();

    function isIe() {
      var pattern = /Trident\/[0-9]+\.[0-9]+/;

      return pattern.test(navigator.userAgent);
    }

    function isEdge() {
      var pattern = /Edge\/[0-9]+\.[0-9]+/;

      return pattern.test(navigator.userAgent);
    }

    function disableClick() {
      $('.noclick').on('click', function () {
        return false;
      });
    }

    function scrollToPosition(pos, second) {
      $('html, body').animate({
        scrollTop: pos
      }, second * 1000);
    }

    // cookies
    if ($('.cookies-wrapper').length) {
      $('.cookies-wrapper').css('transform', 'translateY(0)');
    }

    $('.js_btn_close').on('click', function () {
      $('.cookies-wrapper').css('transform', 'translateY(-1000px)');
    });

    // WOW js
    new WOW().init();

    // Resize Height
    function setRateElement(objects, x, y) {
      var w = x || 5;
      var h = y || 3;
      // objects.height(objects.width() * h / w);
      objects.each(function () {
        $(this).height($(this).outerWidth() * h / w);
      });
    }

    function getRateElement() {
      setRateElement($(".imgResize-main"), 192, 149);
      setRateElement($(".imgResize-977-700"), 977, 700);
      setRateElement($(".imgResize-363-200"), 363, 200);
      setRateElement($(".imgResize-977-711"), 977, 711);
      setRateElement($(".imgResize-133-96"), 133, 96);

      setRateElement($(".imgResize-gallery01"), 167, 113);
      setRateElement($(".imgResize-gallery02"), 85, 113);
      setRateElement($(".imgResize-gallery03"), 158, 113);
      setRateElement($(".imgResize-gallery04"), 131, 111);
      setRateElement($(".imgResize-gallery05"), 140, 111);
      setRateElement($(".imgResize-gallery06"), 139, 111);

      setRateElement($(".imgResize-galleryImg"), 634, 429);

      setRateElement($(".imgResize-thumbFull"), 767, 422);
      setRateElement($(".imgResize-449-592"), 449, 592);
    }

    // Resize Min Height
    function setMinRateElement(objects, x, y) {
      var w = x || 5;
      var h = y || 3;
      // objects.height(objects.width() * h / w);
      objects.each(function () {
        var $newHeight = $(this).outerWidth() * h / w;
        $(this).css('min-height', $newHeight);
      });
    }

    function getMinRateElement() {
      setMinRateElement($(".imgMinResize-9-6"), 9, 6);
    }

    //Click link
    function link_scrollTop() {
      // var $offsetTop = $header - 1;
      $('.js-scroll-trigger a[href*="#"]:not([href="#"])').on('click', function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
          $('html, body').animate({
            scrollTop: target.offset().top
          }, 1000, "easeInOutExpo");
          return false;
        }
      });
    }

    // jQuery CountUp
    function parallax_text() {
      if ($('#course').length > 0) {
        var hH = $('#homeLT').outerHeight(),
            h_ct_H = $('#homeLT .content-full ').outerHeight(),
            wS = $_window.scrollTop(),
            courseTop = $('#course').offset();
        // console.log(courseTop.top);
        // console.log(wS);
        if (wS > 1) {
          $('.js_parallax_text').addClass('end_scroll');
          $('.parallax-wrapper .content-full').css('overflow-y', 'hidden');
        } else {
          $('.js_parallax_text').removeClass('end_scroll');
          $('.parallax-wrapper .content-full').css('overflow-y', 'scroll');
        }
      }
    }

    // init_facybox
    function init_facybox() {

      if (typeof $.fancybox !== 'undefined') {
        console.log('init_facybox');
        $(".fancybox-popup").each(function () {
          $(".fancybox-popup").fancybox({
            toolbar: false,
            smallBtn: true,

            iframe: {
              preload: false
            },
            autoFocus: false,
            btnTpl: {
              smallBtn: '<button type="button" data-fancybox-close class="fancybox-button fancybox-close-small" title="{{CLOSE}}">' + '<img src="./img/icons/ic_ios-close.png" alt="" />' + '</button>'
            },
            afterShow: function afterShow() {
              getRateElement();
              setTimeout(function () {
                init_swiper();
              }, 100);
            }
          });
        });
      }
    }

    // init_swiper
    function init_swiper() {
      // Swiper
      if ($('.gallery-swiper').length) {
        var gallerySelector = '.gallery-swiper',
            options = {
          init: false,
          loop: true,
          speed: 800,
          slidesPerView: 2, // or 'auto'
          spaceBetween: 140,
          centeredSlides: true,
          observer: true,
          effect: 'coverflow', // 'cube', 'fade', 'coverflow',
          coverflowEffect: {
            rotate: 0, // Slide rotate in degrees
            depth: 300, // Depth offset in px (slides translate in Z axis)
            modifier: 1, // Effect multipler
            slideShadows: false
          },
          grabCursor: false,
          parallax: true,
          pagination: {
            el: '.swiper-pagination',
            type: "fraction"
          },
          navigation: {
            nextEl: '.smd-button-next',
            prevEl: '.smd-button-prev'
          },
          // Events
          on: {
            imagesReady: function imagesReady() {
              this.el.classList.remove('loading');
            },
            init: function init() {
              getRateElement();
              getMinRateElement();
            },
            slideChangeTransitionStart: function slideChangeTransitionStart() {
              getRateElement();
              getMinRateElement();
            },
            slideChangeTransitionEnd: function slideChangeTransitionEnd() {
              getRateElement();
              getMinRateElement();
            }
          }
        };

        var sliderGallerySwiper = new Swiper(gallerySelector, options);
        // Initialize slider

        $('.gallery-left--item-1').fancybox({
          toolbar: false,
          smallBtn: true,

          iframe: {
            preload: false
          },
          autoFocus: false,
          btnTpl: {
            smallBtn: '<button type="button" data-fancybox-close class="fancybox-button fancybox-close-small" title="{{CLOSE}}">' + '<img src="./img/icons/ic_ios-close.png" alt="" />' + '</button>'
          },
          afterShow: function afterShow() {
            getRateElement();
            setTimeout(function () {
              sliderGallerySwiper.init();
              sliderGallerySwiper.slideToLoop(0, 1000, true);
            }, 100);
          }
        });

        $('.gallery-left--item-2').fancybox({
          toolbar: false,
          smallBtn: true,

          iframe: {
            preload: false
          },
          autoFocus: false,
          btnTpl: {
            smallBtn: '<button type="button" data-fancybox-close class="fancybox-button fancybox-close-small" title="{{CLOSE}}">' + '<img src="./img/icons/ic_ios-close.png" alt="" />' + '</button>'
          },
          afterShow: function afterShow() {
            getRateElement();
            setTimeout(function () {
              sliderGallerySwiper.init();
              sliderGallerySwiper.slideToLoop(1, 1000, true);
            }, 100);
          }
        });

        $('.gallery-left--item-3').fancybox({
          toolbar: false,
          smallBtn: true,

          iframe: {
            preload: false
          },
          autoFocus: false,
          btnTpl: {
            smallBtn: '<button type="button" data-fancybox-close class="fancybox-button fancybox-close-small" title="{{CLOSE}}">' + '<img src="./img/icons/ic_ios-close.png" alt="" />' + '</button>'
          },
          afterShow: function afterShow() {
            getRateElement();
            setTimeout(function () {
              sliderGallerySwiper.init();
              sliderGallerySwiper.slideToLoop(2, 1000, true);
            }, 100);
          }
        });

        $('.gallery-left--item-4').fancybox({
          toolbar: false,
          smallBtn: true,

          iframe: {
            preload: false
          },
          autoFocus: false,
          btnTpl: {
            smallBtn: '<button type="button" data-fancybox-close class="fancybox-button fancybox-close-small" title="{{CLOSE}}">' + '<img src="./img/icons/ic_ios-close.png" alt="" />' + '</button>'
          },
          afterShow: function afterShow() {
            getRateElement();
            setTimeout(function () {
              sliderGallerySwiper.init();
              sliderGallerySwiper.slideToLoop(3, 1000, true);
            }, 100);
          }
        });

        $('.gallery-right--item-1').fancybox({
          toolbar: false,
          smallBtn: true,

          iframe: {
            preload: false
          },
          autoFocus: false,
          btnTpl: {
            smallBtn: '<button type="button" data-fancybox-close class="fancybox-button fancybox-close-small" title="{{CLOSE}}">' + '<img src="./img/icons/ic_ios-close.png" alt="" />' + '</button>'
          },
          afterShow: function afterShow() {
            getRateElement();
            setTimeout(function () {
              sliderGallerySwiper.init();
              sliderGallerySwiper.slideToLoop(4, 1000, true);
            }, 100);
          }
        });

        $('.gallery-right--item-2').fancybox({
          toolbar: false,
          smallBtn: true,

          iframe: {
            preload: false
          },
          autoFocus: false,
          btnTpl: {
            smallBtn: '<button type="button" data-fancybox-close class="fancybox-button fancybox-close-small" title="{{CLOSE}}">' + '<img src="./img/icons/ic_ios-close.png" alt="" />' + '</button>'
          },
          afterShow: function afterShow() {
            getRateElement();
            setTimeout(function () {
              sliderGallerySwiper.init();
              sliderGallerySwiper.slideToLoop(5, 1000, true);
            }, 100);
          }
        });

        $('.gallery-right--item-3').fancybox({
          toolbar: false,
          smallBtn: true,

          iframe: {
            preload: false
          },
          autoFocus: false,
          btnTpl: {
            smallBtn: '<button type="button" data-fancybox-close class="fancybox-button fancybox-close-small" title="{{CLOSE}}">' + '<img src="./img/icons/ic_ios-close.png" alt="" />' + '</button>'
          },
          afterShow: function afterShow() {
            getRateElement();
            setTimeout(function () {
              sliderGallerySwiper.init();
              sliderGallerySwiper.slideToLoop(6, 1000, true);
            }, 100);
          }
        });
      }

      if ($('.gallery-swiper-sp').length) {
        var gallerySelectorSP = '.gallery-swiper-sp',
            _options = {
          init: false,
          loop: true,
          speed: 800,
          slidesPerView: 1, // or 'auto'
          spaceBetween: 0,
          grabCursor: true,
          centeredSlides: true,
          parallax: true,
          observer: true,
          observeParents: true,
          pagination: {
            el: '.swiper-pagination',
            type: "fraction"
          },
          navigation: {
            nextEl: '.smd-button-next',
            prevEl: '.smd-button-prev'
          },
          // Events
          on: {
            imagesReady: function imagesReady() {
              this.el.classList.remove('loading');
            },
            init: function init() {
              getRateElement();
              getMinRateElement();
            },
            slideChangeTransitionStart: function slideChangeTransitionStart() {
              getRateElement();
              getMinRateElement();
            },
            slideChangeTransitionEnd: function slideChangeTransitionEnd() {
              getRateElement();
              getMinRateElement();
            }
          }
        };

        var sliderGallerySwiperSP = new Swiper(gallerySelectorSP, _options);
        // Initialize slider
        sliderGallerySwiperSP.init();

        $('.js_glr_img').on('click', function () {
          setTimeout(function () {
            getRateElement();
          }, 200);
          $('.gallery-wrapper').addClass('show-slider');
          $('.gallery-wrapper__list,.parallax-wrapper__content .txt').removeClass('d-flex').addClass('d-none');
          $('.gallery-wrapper__slider').show();
        });
      }
    }

    // jQuery CountUp
    function countUp() {
      if ($('#key_figures').length > 0) {
        var hT = $('#key_figures').offset().top,
            hH = $('#key_figures').outerHeight(),
            wH = $(window).height(),
            wS = $_window.scrollTop();

        if (wS > hT + hH - wH) {
          $('.js_counter').each(function () {
            var $this = $(this),
                countTo = $this.attr('data-count');

            $({ countNum: $this.text() }).animate({
              countNum: countTo
            }, {
              duration: 1500,
              easing: 'linear',
              step: function step() {
                $this.text(Math.floor(this.countNum));
              },
              complete: function complete() {
                $this.text(this.countNum);
                //alert('finished');
              }
            });
          });
        }
      }
    }

    // Moment Js
    function add_moment() {
      var currentTime = new Date();
      var date1 = moment(currentTime, 'DD-MM-YYYY').valueOf();
      var date2 = moment('20-11-2021', 'DD-MM-YYYY').valueOf();

      if (date1 > date2) {
        $('#js_sticky_bar').addClass('hide');
      }
    }

    // Scroll
    $(window).on('scroll', function () {
      function init_scroll() {
        parallax_text();
        countUp();
      }
      init_scroll();
    });

    $(window).on('resize', function () {
      function init_resize() {
        getRateElement();
        getMinRateElement();
      }
      init_resize();
    });
  });

  // api get orders
  function getOrders() {
    var key = escape(window.atob("YmZhN2I4ZjdlYTA="));
    var user = escape(window.atob("aG9wZW5pbmc="));
    var from = "2021-09-29";
    var to = "2021-11-15";
    $.get("test.json").done(function (data) {
      if (data.httpcode === 200) {
        var goal = 190000;
        var orders = data.orders || [];
        var total = 0;
        orders.forEach(function (order) {
          var amount = Number(order.amount);
          total += amount;
        });
        var percentAmountOfGoald = 79;
      }

      // Progress
      $(".js_st_counter").each(function () {
        $(this).attr("data-count", percentAmountOfGoald);
      });

      sticky_countUp();

      $("#js_progress").progressbar({
        value: 0
      });
      var p = 0;
      var timer = setInterval(function () {
        p = p + percentAmountOfGoald;
        if (p > percentAmountOfGoald) {
          $("#js_progress .progressbar-value").animate({
            width: percentAmountOfGoald + "%"
          }, 3200);
          clearInterval(timer);
        }
      }, 500);
    }).fail(function () {
      console.log("error");
    });
  }

  function sticky_countUp() {
    $('.js_st_counter').each(function () {
      var $this = $(this),
          countTo = $this.attr('data-count');

      $({ countNum: $this.text() }).animate({
        countNum: countTo
      }, {
        duration: 4000,
        easing: 'linear',
        step: function step() {
          $this.text(Math.floor(this.countNum));
        },
        complete: function complete() {
          $this.text(this.countNum);
          //alert('finished');
        }
      });
    });
  }
})(jQuery);
//# sourceMappingURL=main.js.map
