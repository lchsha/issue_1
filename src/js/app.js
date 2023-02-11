/*
!(i) 
Код попадает в итоговый файл, только когда вызвана функция, например FLSFunctions.spollers();
Или когда импортирован весь файл, например import "files/script.js";
Неиспользуемый (не вызванный) код в итоговый файл не попадает.

Если мы хотим добавить модуль следует его расскоментировать
*/
import {
  isWebp,
  headerFixed,
  togglePopupWindows,
  addTouchClass,
  addLoadedClass,
  menuInit,
} from './modules'



/* Раскомментировать для использования */
// import { MousePRLX } from './libs/parallaxMouse'

/* Раскомментировать для использования */
// import AOS from 'aos'

/* Раскомментировать для использования */
// import Swiper, { Navigation, Pagination } from 'swiper'

// Включить/выключить FLS (Full Logging System) (в работе)
window['FLS'] = true

/* Проверка поддержки webp, добавление класса webp или no-webp для HTML
! (i) необходимо для корректного отображения webp из css 
*/
isWebp()
/* Добавление класса touch для HTML если браузер мобильный */
/* Раскомментировать для использования */
// addTouchClass();
/* Добавление loaded для HTML после полной загрузки страницы */
/* Раскомментировать для использования */
// addLoadedClass();
/* Модуль для работы с меню (Бургер) */
/* Раскомментировать для использования */
// menuInit()

/* Библиотека для анимаций ===============================================================================
 *  документация: https://michalsnik.github.io/aos
 */
// AOS.init();
// =======================================================================================================

// Паралакс мышей ========================================================================================
// const mousePrlx = new MousePRLX({})
// =======================================================================================================

// Фиксированный header ==================================================================================
// headerFixed()
// =======================================================================================================

/* Открытие/закрытие модальных окон ======================================================================
* Чтобы модальное окно открывалось и закрывалось
* На окно повешай атрибут data-type="<название окна>"
* И на кнопку, которая вызывает окно так же повешай атрибут data-type="<название окна>"

* На обертку(враппер) окна добавь класс _overlay-bg
* На кнопку для закрытия окна добавь класс button-close
*/
/* Раскомментировать для использования */
// togglePopupWindows()
// =======================================================================================================


// // import $ from 'jquery';
// import jQuery from 'jquery';
// import 'jquery-mask-plugin';
// console.log(jQuery);
import './libs/jquery-3.3.1';
// import 'jquery-ui';
import 'jquery-tooltip/jquery.tooltip';
import 'popover/popover';
import 'select2';
import 'slick-carousel';
import '@fancyapps/fancybox';

import 'bootstrap/dist/js/bootstrap';
// import 'bootstrap-multiselect/dist/js/bootstrap-multiselect';
import './libs/bootstrap-multiselect';



(function ($) {
    'use strict';
  
    [].forEach.call(document.querySelectorAll('img[data-src]'), function(img) {
      img.setAttribute('src', img.getAttribute('data-src'));
      img.onload = function() {
        img.removeAttribute('data-src');
      };
    });
  
    var waitForFinalEvent = (function () {
      var timers = {};
      return function (callback, ms, uniqueId) {
        if (!uniqueId) {
          uniqueId = "Don't call this twice without a uniqueId";
        }
        if (timers[uniqueId]) {
          clearTimeout(timers[uniqueId]);
        }
        timers[uniqueId] = setTimeout(callback, ms);
      };
    })();
  
    // Fanycbox gallery
    function fancybox(slider) {
      $('[data-fancybox*="slider-"]').fancybox({
        loop: true,
        buttons: ['zoom', 'fullScreen', 'close'],
        selector: slider + ' .ss-item:not(.slick-cloned)',
        hash: false,
      });
    }
  
    // Footer
    function footer() {
      if ($('#bottom').length) {
        var height = Math.round(document.getElementById('bottom').offsetHeight);
        $('.wrapper .content').css('padding-bottom', height);
        $('#bottom').css('margin-top', -height);
      }
    }
  
    // Footer auto on resize
    function footerAuto() {
      $(window).on('resize', function () {
        waitForFinalEvent(
          function () {
            footer();
          },
          100,
          'footer'
        );
      });
    }
  
    // main navbar
    function mainNavbar() {
      $('.main-navbar .dropdown-l1 > a').on('click', function (e) {
        e.preventDefault();
        $(this).closest('li').siblings().removeClass('open');
        $('.main-navbar .dropdown-l2').removeClass('open');
        if ($(this).closest('li').hasClass('open')) {
          $(this).closest('li').removeClass('open');
        } else {
          $(this).closest('li').addClass('open');
        }
      });
      $('.main-navbar .dropdown-l2 > a > .caret').on('click', function (e) {
        e.preventDefault();
        $(this).closest('li').siblings().removeClass('open');
        if ($(this).closest('li').hasClass('open')) {
          $(this).closest('li').removeClass('open');
        } else {
          $(this).closest('li').addClass('open');
        }
      });
      $('.main-navbar .dropdown-l3 > a > .caret').on('click', function (e) {
        e.preventDefault();
        $(this).closest('li').siblings().removeClass('open');
        if ($(this).closest('li').hasClass('open')) {
          $(this).closest('li').removeClass('open');
        } else {
          $(this).closest('li').addClass('open');
        }
      });
      $('body').on('click', function (e) {
        if (!$('.navbar-nav').is(e.target) && $('.navbar-nav').has(e.target).length === 0 && $('.navbar-nav .open').has(e.target).length === 0 && !$('.navbar-toggle').is(e.target)) {
          $('.navbar-nav .dropdown.show-more').removeClass('open');
          $('.navbar-nav .dropdown-l1').removeClass('open');
          $('.navbar-nav .dropdown-l2').removeClass('open');
          $('.navbar-nav .dropdown-l3').removeClass('open');
        }
      });
    }
  
    // Goods order form
    function goodsOrderForm() {
      $('.modal-dismiss').on('click', function () {
        $(this).closest('.modal').modal('hide');
        setTimeout(function () {
          $('#order-submit').modal('show');
        }, 400);
        return false;
      });
      $(".modal-dismiss a[data-toggle='modal-alt']").click(function () {
        var href = $(this).attr('href');
        $(this).closest('.modal').modal('hide');
        setTimeout(function () {
          $(href).modal('show');
        }, 400);
        return false;
      });
    }
  
    // Mask
    function mask() {
      $('.phone-mask').mask('+7 (000) 000-00-00', {
        placeholder: '+7 (___) ___ __ __',
      });
    }
  
    // Navbar collapse in header
    function navbarCollapse() {
      $('#top').on('show.bs.collapse', '.collapse', function () {
        $('#top').find('.collapse.in').collapse('hide');
      });
    }
  
    // Scroll to target
    function passwordVisible() {
      $('.password-input').each(function () {
        $('.pi-btn', $(this)).click(function (e) {
          e.preventDefault();
          if ($(this.closest('.password-input')).hasClass('visible')) {
            $(this.closest('.password-input')).removeClass('visible');
            $('input', $(this.closest('.input-group'))).attr('type', 'password');
          } else {
            $(this.closest('.password-input')).addClass('visible');
            $('input', $(this.closest('.input-group'))).attr('type', 'text');
          }
        });
      });
    }
  
    // Scroll to target
    function scrollToTarget() {
      $('.scroll-to-target').on('click', function () {
        var target = $(this).attr('href');
        $('html, body').animate(
          {
            scrollTop: $(target).offset().top - $('.header').innerHeight(),
          },
          1000
        );
        return false;
      });
  
      var myHash = location.hash;
      if (myHash != undefined && myHash.indexOf('anchor') > -1) {
        location.hash = '';
        $('html, body').animate({ scrollTop: $(myHash).offset().top - $('.header').innerHeight() }, 1000);
        location.hash = myHash;
      }
    }
  
    // Scroll to top
    function scrollToTop() {
      if ($('#back-to-top').length) {
        var scrollTrigger = 100,
          backToTop = function () {
            var scrollTop = $(window).scrollTop();
            if (scrollTop > scrollTrigger) {
              $('#back-to-top').addClass('show');
            } else {
              $('#back-to-top').removeClass('show');
            }
          };
        backToTop();
        $(window).on('scroll', function () {
          backToTop();
        });
        $('#back-to-top').on('click', function (e) {
          e.preventDefault();
          $('html,body').animate(
            {
              scrollTop: 0,
            },
            400
          );
        });
      }
    }
  
    // Select2
    function select2() {
      if ($('.select2').length > 0) {
        $('.select2:not(.select2_multiple)').select2({
          minimumResultsForSearch: -1,
          width: '100%',
          language: 'ru',
        });
      }
      if ($('.select2').length > 0) {
        $('.select2.select2_multiple').select2({
          minimumResultsForSearch: -1,
          multiple: true,
          width: '100%',
          language: 'ru',
        });
      }
      if ($('.select2_options').length > 0) {
        $('.select2_options').select2({
          minimumResultsForSearch: -1,
          placeholder: 'Выберите из списка',
          multiple: true,
          width: '100%',
          language: 'ru',
          dropdownParent: $('.select2-dropdown-multiple'),
        });
        $('.select2_options').siblings('.select2-container').find('.select2-selection--multiple').prepend('<span class="select2-placeholder">Выберите из списка</span>');
      }
  
      $('.calculation__title-select select').select2({
          minimumResultsForSearch: -1,
          dropdownParent: $('.calculation__title-select'),
        });
    }
  
    // Table style
    function tableStyle() {
      if ($('.content').length) {
        $('.content').addClass('content-with-tables');
      }
    }
  
    // Tooltip and popover
    function tooltip() {
      $("[data-toggle='tooltip']").tooltip();
    //   $("[data-toggle='popover']").popover();
    }
  
    // Object fill polyfill
    function objectFill() {
    //   objectFitImages(null, { watchMQ: true });
    }
  
    // Preview gallery slider
    function sliderPreview() {
      $('.preview-gallery .p-slider .slick-slider-temp').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        dots: false,
        draggable: false,
        swipe: false,
      });
  
      $('.preview-gallery .p-slider-preview .slick-slider-alt').slick({
        slidesToShow: 3,
        arrows: false,
        dots: false,
        infinite: true,
        centerMode: true,
        centerPadding: 0,
        asNavFor: $('.preview-gallery .p-slider .slick-slider-temp'),
        focusOnSelect: true,
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              centerMode: false,
            },
          },
        ],
      });
  
      $('.preview-gallery .ps-controls .slick-switches .ss-switch.prev').click(function () {
        $('.preview-gallery .p-slider-preview .slick-slider-alt').slick('slickPrev');
      });
  
      $('.preview-gallery .ps-controls .slick-switches .ss-switch.next').click(function () {
        $('.preview-gallery .p-slider-preview .slick-slider-alt').slick('slickNext');
      });
  
      var numItems = $('.preview-gallery .p-slider-preview .ss-item').length;
      if ((numItems > 3 && window.innerWidth >= 1200) || (numItems > 2 && window.innerWidth <= 1199)) {
        $('.preview-gallery .p-slider-preview .ps-controls').css('display', '');
        $('.preview-gallery .p-slider-preview .slick-slider-alt').removeClass('slick-static');
        $('.preview-gallery .p-slider-preview').addClass('p-x-60');
      }
  
      if (numItems > 1) {
        $('.preview-gallery .p-slider-preview').addClass('visible');
      }
  
      var currentSlider = $('.preview-gallery .p-slider-preview');
  
      $(window).on('resize', function () {
        waitForFinalEvent(
          function () {
            var numItems = $('.ss-item', currentSlider).length;
            if ((numItems > 3 && window.innerWidth >= 1200) || (numItems > 2 && window.innerWidth <= 1199)) {
              $('.ps-controls', currentSlider).css('display', '');
              $('.slick-slider-alt', currentSlider).removeClass('slick-static');
              $(currentSlider).addClass('p-x-60');
            } else {
              $('.ps-controls', currentSlider).css('display', 'none');
              $('.slick-slider-alt', currentSlider).addClass('slick-static');
              $(currentSlider).removeClass('p-x-60');
            }
          },
          100,
          'slider_preview_gallery'
        );
      });
    }
  
    // Header block
    function stickyHeader() {
      if ($('.js-header-sticky').length) {
        $('.js-header-sticky').sticky({
          topSpacing: 0,
        });
      }
      if ($('.js-sticky-second-menu').length) {
        $('.js-sticky-second-menu').sticky({
          topSpacing: $('.header').innerHeight(),
        });
  
        var target = document.querySelector('.header');
  
        const callback = function (mutationsList, observer) {
          for (let mutation of mutationsList) {
            if (mutation.attributeName === 'class') {
              setTimeout(function () {
                $('.js-sticky-second-menu').unstick();
                $('.js-sticky-second-menu').sticky({
                  topSpacing: $('.header').innerHeight(),
                });
              }, 75);
            }
          }
        };
  
        const observer = new MutationObserver(callback);
        observer.observe(target, { attributes: true });
      }
    }
  
    function mobileNavbar() {
      $('#main-navbar-block').on('show.bs.collapse', function () {
        var heightNavbar = $(window).height() - $('.header').innerHeight();
  
        $('body').addClass('main-navbar-open');
  
        if (window.innerWidth < 768) {
          $('#main-navbar-block .navbar-block').css('height', heightNavbar);
        }
  
        $('#main-navbar-block').on('hide.bs.collapse', function () {
          $('body').removeClass('main-navbar-open');
        });
  
        $(window).on('resize', function () {
          waitForFinalEvent(
            function () {
              if (window.innerWidth < 768) {
                var heightNavbar = $(window).height() - $('.page-header').innerHeight();
                $('#main-navbar-block .navbar-block').css('height', heightNavbar);
              } else {
                $('#main-navbar-block .navbar-block').css('height', 'auto');
              }
            },
            200,
            'height-navbar'
          );
        });
      });
    }
  
    // Main slider
    function sliderMain() {
      $('.main-slider .slick-slider').each(function () {
        $(this).slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          // arrows: false,
          infinite:true,
          autoplay: true,
          autoplaySpeed: 5000,
          prevArrow: $('.ms-controls .slick-switches .ss-switch.prev', $(this).closest('.main-slider')),
          nextArrow: $('.ms-controls .slick-switches .ss-switch.next', $(this).closest('.main-slider')),
          // dots: true,
          // appendDots: $('.ms-pagination .ss-count', $(this).closest('.main-slider')),
        });
  
      //   $('.ms-controls .slick-switches .ss-switch.prev', $(this).closest('.main-slider')).click(function () {
      //     $('.slick-slider', $(this).closest('.main-slider')).slick('slickPrev');
      //   });
  
      //   $('.ms-controls .slick-switches .ss-switch.next', $(this).closest('.main-slider')).click(function () {
      //     $('.slick-slider', $(this).closest('.main-slider')).slick('slickNext');
      //   });
  
        var numItems = $('.ms-slide', $(this)).length;
        if (numItems > 1) {
          $('.ms-controls', $(this).closest('.main-slider')).css('display', '');
        }
  
        var slideAll = $('.ms-slide:not(.slick-cloned)', $(this)).length;
        $('.main-slider .ms-pagination .ss-count .ssc-all').html(slideAll);
        $('.main-slider').on('afterChange', function (event, slick, currentSlide, nextSlide) {
          $('.main-slider .ms-pagination .ss-count .ssc-current').html(currentSlide + 1);
        });
      });
    }
  
    // Main slider
    function sliderProjectHead() {
        $('.project-head .project-head__slider .slick-slider').slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          // arrows: false,
          infinite:true,
          autoplay: true,
          autoplaySpeed: 5000,
          prevArrow: $('.project-head .project-head__contols .slick-switches .ss-switch.prev'),
          nextArrow: $('.project-head .project-head__contols .slick-switches .ss-switch.next'),
          swipe: false,
          // dots: true,
          // appendDots: $('.ms-pagination .ss-count', $(this).closest('.main-slider')),
        });
  
      //   $('.ms-controls .slick-switches .ss-switch.prev', $(this).closest('.main-slider')).click(function () {
      //     $('.slick-slider', $(this).closest('.main-slider')).slick('slickPrev');
      //   });
  
      //   $('.ms-controls .slick-switches .ss-switch.next', $(this).closest('.main-slider')).click(function () {
      //     $('.slick-slider', $(this).closest('.main-slider')).slick('slickNext');
      //   });
  
      //   var numItems = $('.ms-slide', $(this)).length;
      //   if (numItems > 1) {
      //     $('.ms-controls', $(this).closest('.main-slider')).css('display', '');
      //   }
  
      //   var slideAll = $('.ms-slide:not(.slick-cloned)', $(this)).length;
      //   $('.main-slider .ms-pagination .ss-count .ssc-all').html(slideAll);
      //   $('.main-slider').on('afterChange', function (event, slick, currentSlide, nextSlide) {
      //     $('.main-slider .ms-pagination .ss-count .ssc-current').html(currentSlide + 1);
      //   });
    }
  
  
    function heightWindows() {
      if ($(window).width() >= 768) {
        $('.main-slider .min-height-fix').css('min-height', $(window).innerHeight() - $('.header').innerHeight());
      }
      $('.project-head .min-height-fix').css('min-height', $(window).innerHeight() - $('.header').innerHeight());
      $('.project-video .min-height-fix').css('min-height', $(window).innerHeight() - $('.header').innerHeight());
      $('.project-gallery .min-height-fix').css('min-height', $(window).innerHeight() - $('.header').innerHeight() - $('.project-gallery__container').innerHeight());
      $('.modal-banner .min-height-fix').css('min-height', $(window).innerHeight() - $('.header').innerHeight());
  
      $(window).on('resize', function () {
        waitForFinalEvent(
          function () {
            if ($(window).width() >= 768) {
              $('.main-slider .min-height-fix').css('min-height', $(window).innerHeight() - $('.header').innerHeight());
            } else {
              $('.main-slider .min-height-fix').css('min-height', '');
            }
            $('.project-head .min-height-fix').css('min-height', $(window).innerHeight() - $('.header').innerHeight());
            $('.project-video .min-height-fix').css('min-height', $(window).innerHeight() - $('.header').innerHeight());
            $('.project-gallery .min-height-fix').css('min-height', $(window).innerHeight() - $('.header').innerHeight() - $('.project-gallery__container').innerHeight());
            $('.modal-banner .min-height-fix').css('min-height', $(window).innerHeight() - $('.header').innerHeight());
          },
          200,
          'height-navbar'
        );
      });
    }
  
    function widthWindows() {
      $('.min-width-fix').css('min-width', $(window).innerWidth());
  
      $(window).on('resize', function () {
        waitForFinalEvent(
          function () {
            $('.min-width-fix').css('min-width', $(window).innerWidth());
          },
          200,
          'width-fix'
        );
      });
    }
  
    function rangeSlider() {
      function rangePrice() {
        if ($('.js-range-price-slider').length) {
          var $range = $('.js-range-price-slider');
          var $inputFrom = $('.js-range-price-from');
          var $inputTo = $('.js-range-price-to');
          var instance;
          var min = $(this).data('min');
          var max = $(this).data('max');
          var from = 0;
          var to = 0;
          var formatter = new Intl.NumberFormat('ru');
  
          $range.ionRangeSlider({
            skin: 'round',
            type: 'double',
            min: min,
            max: max,
            from: min,
            to: max,
            onStart: updateInputs,
            onChange: updateInputs,
            onFinish: updateInputs,
          });
          instance = $range.data('ionRangeSlider');
  
          function updateInputs(data) {
            from = data.from;
            to = data.to;
  
            $inputFrom.prop('value', formatter.format(from));
            $inputTo.prop('value', formatter.format(to));
            $inputTo.closest('.range__input_to').find('.input-buffer').text(formatter.format(to));
            $inputTo.width($inputTo.closest('.range__input_to').find('.input-buffer').width() + 3);
          }
  
          $inputFrom.on('change', function () {
            var string = $(this).val();
            var val = string.replace(/\s/g, '').replace(/\D/g, '');
  
            // validate
            if (val < min) {
              val = min;
            } else if (val > to) {
              val = to;
            }
  
            instance.update({
              from: val,
            });
  
            $(this).prop('value', formatter.format(val));
          });
  
          $inputTo.on('change', function () {
            var string = $(this).val();
            var val = string.replace(/\s/g, '').replace(/\D/g, '');
  
            // validate
            if (val < from) {
              val = from;
            } else if (val > max) {
              val = max;
            }
  
            instance.update({
              to: val,
            });
  
            $(this).prop('value', formatter.format(val));
            $(this).closest('.range__input_to').find('.input-buffer').text(formatter.format(val));
            $(this).width($(this).closest('.range__input_to').find('.input-buffer').width() + 3);
          });
        }
      }
  
      function rangeSquare() {
        if ($('.js-range-square-slider').length) {
          var $range = $('.js-range-square-slider');
          var $inputFrom = $('.js-range-square-from');
          var $inputTo = $('.js-range-square-to');
          var instance;
          var min = $(this).data('min');
          var max = $(this).data('max');
          var from = 0;
          var to = 0;
          var formatter = new Intl.NumberFormat('ru');
  
          $range.ionRangeSlider({
            skin: 'round',
            type: 'double',
            min: min,
            max: max,
            from: min,
            to: max,
            onStart: updateInputs,
            onChange: updateInputs,
            onFinish: updateInputs,
          });
          instance = $range.data('ionRangeSlider');
  
          function updateInputs(data) {
            from = data.from;
            to = data.to;
  
            $inputFrom.prop('value', formatter.format(from));
            $inputTo.prop('value', formatter.format(to));
            $inputTo.closest('.range__input_to').find('.input-buffer').text(formatter.format(to));
            $inputTo.width($inputTo.closest('.range__input_to').find('.input-buffer').width() + 3);
          }
  
          $inputFrom.on('change', function () {
            var string = $(this).val();
            var val = string.replace(/\s/g, '').replace(/\D/g, '');
  
            // validate
            if (val < min) {
              val = min;
            } else if (val > to) {
              val = to;
            }
  
            instance.update({
              from: val,
            });
  
            $(this).prop('value', formatter.format(val));
          });
  
          $inputTo.on('change', function () {
            var string = $(this).val();
            var val = string.replace(/\s/g, '').replace(/\D/g, '');
  
            // validate
            if (val < from) {
              val = from;
            } else if (val > max) {
              val = max;
            }
  
            instance.update({
              to: val,
            });
  
            $(this).prop('value', formatter.format(val));
            $(this).closest('.range__input_to').find('.input-buffer').text(formatter.format(val));
            $(this).width($(this).closest('.range__input_to').find('.input-buffer').width() + 3);
          });
        }
      }
  
      function rangeFloor() {
        if ($('.js-range-floor-slider').length) {
          var $range = $('.js-range-floor-slider');
          var $inputFrom = $('.js-range-floor-from');
          var $inputTo = $('.js-range-floor-to');
          var instance;
          var min = $(this).data('min');
          var max = $(this).data('max');
          var from = 0;
          var to = 0;
  
          $range.ionRangeSlider({
            skin: 'round',
            type: 'double',
            min: min,
            max: max,
            from: min,
            to: max,
            onStart: updateInputs,
            onChange: updateInputs,
            onFinish: updateInputs,
          });
          instance = $range.data('ionRangeSlider');
  
          function updateInputs(data) {
            from = data.from;
            to = data.to;
  
            $inputFrom.prop('value', from);
            $inputTo.prop('value', to);
            $inputTo.closest('.range__input_to').find('.input-buffer').text(to);
            $inputTo.width($inputTo.closest('.range__input_to').find('.input-buffer').width() + 3);
          }
  
          $inputFrom.on('change', function () {
            var string = $(this).val();
            var val = string.replace(/\s/g, '').replace(/\D/g, '');
  
            // validate
            if (val < min) {
              val = min;
            } else if (val > to) {
              val = to;
            }
  
            instance.update({
              from: val,
            });
  
            $(this).prop('value', val);
          });
  
          $inputTo.on('change', function () {
            var string = $(this).val();
            var val = string.replace(/\s/g, '').replace(/\D/g, '');
  
            // validate
            if (val < from) {
              val = from;
            } else if (val > max) {
              val = max;
            }
  
            instance.update({
              to: val,
            });
  
            $(this).prop('value', val);
            $(this).closest('.range__input_to').find('.input-buffer').text(val);
            $(this).width($(this).closest('.range__input_to').find('.input-buffer').width() + 3);
          });
        }
      }
  
      rangePrice();
      rangeSquare();
      rangeFloor();
    }
  
    function resetIonRange(currentform, type, project_ids, property_type, commercial_buy = null) {
      var formatter = new Intl.NumberFormat('ru');
      var value = currentform.find('.js-range-' + type + '-slider');
      var value_from = currentform.find('.js-range-' + type + '-from');
      var value_from_buffer = value_from.parent('.range__input_from').find('.input-buffer');
      var value_to = currentform.find('.js-range-' + type + '-to');
      var value_to_buffer = value_to.parent('.range__input_to').find('.input-buffer');
  
      function updateValues() {
        var min = value.data('min');
        var max = value.data('max');
  
        var fixed_val = '';
        var buffer_width = 0;
  
        value_from.val(min);
        fixed_val = value_from.val().replace(/\s/g, '');
        if (type === 'floor') {
          value_from_buffer.text(fixed_val);
          value_from.val(fixed_val);
        } else {
          value_from_buffer.text(formatter.format(fixed_val));
          value_from.val(formatter.format(fixed_val));
        }
        buffer_width = value_from_buffer.width();
        value_from.width(buffer_width);
  
        value_to.val(max);
        fixed_val = value_to.val().replace(/\s/g, '');
        if (type === 'floor') {
          value_to_buffer.text(fixed_val);
          value_to.val(fixed_val);
        } else {
          value_to_buffer.text(formatter.format(fixed_val));
          value_to.val(formatter.format(fixed_val));
        }
  
        buffer_width = value_to_buffer.width();
        value_to.width(buffer_width + 3);
        value.data('ionRangeSlider').update({
          from: value_from,
          to: value_to,
        });
      }
  
      $.ajax({
        url: '/ajax/get-' + type + '-min-max-value',
        type: 'post',
        dataType: 'json',
        data: {
          project_ids: project_ids,
          property_type: property_type,
          commercial_buy: commercial_buy,
        },
        success: function (result) {
          value.data('min', result.min);
          value.attr('data-min', result.min);
          value.data('max', result.max);
          value.attr('data-max', result.max);
          if ((result.min == 0 && result.max == 0) || result.min == result.max) {
            value.parents('.range_container').addClass('hidden');
          } else {
              
            value.parents('.range_container').removeClass('hidden');
          }
          updateValues();
        },
        error: function (errorThrown) {
          console.log(errorThrown);
        },
      });
    }
  
    // Reset all variables in filter form
    function clearForm() {
      if ($('.btn-drop').length) {
        $('.btn-drop').on('click', function (e) {
          e.preventDefault();
          var currentform = $('.calculation__form');
          currentform.find('input').prop('checked', false);
          currentform.find('select').val('').trigger('change');
  
          $('.multiselect-custom option').each(function () {
            $(this).prop('selected', false);
            $(this).removeAttr('selected');
          });
  
          $('#calc-complex').multiselect('refresh');
  
          var project_ids = null;
          if ($('#calc-complex-hidden').length) {
            project_ids = [$('#calc-complex-hidden').val()];
          } else if ($('#calc-complex').val().length > 0) {
            project_ids = $('#calc-complex').val();
          }
  
          var property_type = currentform.data('property-type');
  
          resetIonRange(currentform, 'price', project_ids, property_type);
          resetIonRange(currentform, 'square', project_ids, property_type);
          resetIonRange(currentform, 'floor', project_ids, property_type);
        });
      }
    }
  
    // About slider
    function sliderAbout() {
      $('.about-slider .slick-slider-alt').each(function () {
        $(this).slick({
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false,
          autoplay: true,
          autoplaySpeed: 5000,
          dots: true,
          appendDots: $('.ss-controls .slick-switches .ss-dots', $(this).closest('.about-slider')),
          responsive: [
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
          ],
        });
  
        $('.ss-controls .slick-switches .ss-switch.prev', $(this).closest('.about-slider')).click(function () {
          $('.slick-slider-alt', $(this).closest('.about-slider')).slick('slickPrev');
        });
  
        $('.ss-controls .slick-switches .ss-switch.next', $(this).closest('.about-slider')).click(function () {
          $('.slick-slider-alt', $(this).closest('.about-slider')).slick('slickNext');
        });
  
        var numItems = $('.ss-item', $(this)).length;
        if ((numItems > 2 && window.innerWidth >= 992) || (numItems > 1 && window.innerWidth <= 991)) {
          $('.ss-controls', $(this).closest('.about-slider')).css('display', '');
        }
  
        var currentSlider = $(this);
  
        $(window).on('resize', function () {
          waitForFinalEvent(
            function () {
              var numItems = $('.ss-item', currentSlider).length;
              if ((numItems > 2 && window.innerWidth >= 992) || (numItems > 1 && window.innerWidth <= 991)) {
                $('.ss-controls', currentSlider.closest('.about-slider')).css('display', '');
              } else {
                $('.ss-controls', currentSlider.closest('.about-slider')).css('display', 'none');
              }
            },
            100,
            'sliderReviews'
          );
        });
      });
    }
  
    // Reviews slider
    function sliderReviews() {
      $('.reviews-slider .slick-slider-alt').each(function () {
        $(this).slick({
          slidesToShow: 4,
          slidesToScroll: 1,
          arrows: false,
          autoplay: true,
          autoplaySpeed: 5000,
          dots: true,
          appendDots: $('.ss-controls .slick-switches .ss-dots', $(this).closest('.reviews-slider')),
          responsive: [
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 375,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
          ],
        });
  
        $('.ss-controls .slick-switches .ss-switch.prev', $(this).closest('.reviews-slider')).click(function () {
          $('.slick-slider-alt', $(this).closest('.reviews-slider')).slick('slickPrev');
        });
  
        $('.ss-controls .slick-switches .ss-switch.next', $(this).closest('.reviews-slider')).click(function () {
          $('.slick-slider-alt', $(this).closest('.reviews-slider')).slick('slickNext');
        });
  
        var numItems = $('.ss-item', $(this)).length;
        if (
          (numItems > 4 && window.innerWidth >= 1200) ||
          (numItems > 3 && window.innerWidth >= 768 && window.innerWidth < 1200) ||
          (numItems > 2 && window.innerWidth >= 375 && window.innerWidth < 768) ||
          (numItems > 1 && window.innerWidth < 375)
        ) {
          $('.ss-controls', $(this).closest('.reviews-slider')).css('display', '');
        }
  
        var currentSlider = $(this);
  
        $(window).on('resize', function () {
          waitForFinalEvent(
            function () {
              var numItems = $('.ss-item', currentSlider).length;
              if (
                (numItems > 4 && window.innerWidth >= 1200) ||
                (numItems > 3 && window.innerWidth >= 768 && window.innerWidth < 1200) ||
                (numItems > 2 && window.innerWidth >= 375 && window.innerWidth < 768) ||
                (numItems > 1 && window.innerWidth < 375)
              ) {
                $('.ss-controls', currentSlider.closest('.reviews-slider')).css('display', '');
              } else {
                $('.ss-controls', currentSlider.closest('.reviews-slider')).css('display', 'none');
              }
            },
            100,
            'sliderAbout'
          );
        });
      });
    }
  
    // News slider
    function sliderNews() {
      $('.news-slider .slick-slider-alt').each(function () {
        $(this).slick({
          slidesToShow: 3,
          slidesToScroll: 1,
          arrows: false,
          autoplay: false,
          dots: true,
          appendDots: $('.ss-controls .slick-switches .ss-dots', $(this).closest('.news-slider')),
          responsive: [
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
          ],
        });
  
        $('.ss-controls .slick-switches .ss-switch.prev', $(this).closest('.news-slider')).click(function () {
          $('.slick-slider-alt', $(this).closest('.news-slider')).slick('slickPrev');
        });
  
        $('.ss-controls .slick-switches .ss-switch.next', $(this).closest('.news-slider')).click(function () {
          $('.slick-slider-alt', $(this).closest('.news-slider')).slick('slickNext');
        });
  
        var numItems = $('.ss-item', $(this)).length;
        if ((numItems > 3 && window.innerWidth >= 1200) || (numItems > 2 && window.innerWidth >= 768 && window.innerWidth < 1200) || (numItems > 1 && window.innerWidth < 768)) {
          $('.ss-controls', $(this).closest('.news-slider')).css('display', '');
        }
  
        var currentSlider = $(this);
  
        $(window).on('resize', function () {
          waitForFinalEvent(
            function () {
              var numItems = $('.ss-item', currentSlider).length;
              if ((numItems > 3 && window.innerWidth >= 1200) || (numItems > 2 && window.innerWidth >= 768 && window.innerWidth < 1200) || (numItems > 1 && window.innerWidth < 768)) {
                $('.ss-controls', currentSlider.closest('.news-slider')).css('display', '');
              } else {
                $('.ss-controls', currentSlider.closest('.news-slider')).css('display', 'none');
              }
            },
            100,
            'sliderNews'
          );
        });
  
        var videos = $(this).parents('.videos');
  
        var gallery = $('.ss-item:not(.slick-cloned)', videos);
  
        $('.ss-item', videos).on('click', function (e) {
          e.preventDefault();
          //узнаём индекс слайда без учёта клонов
          var totalSlides = +$('.ss-item:not(.slick-cloned)', videos).length,
            dataIndex = +$(this).data('slick-index'),
            trueIndex;
          switch (true) {
            case dataIndex < 0:
              trueIndex = totalSlides + dataIndex;
              break;
            case dataIndex >= totalSlides:
              trueIndex = dataIndex % totalSlides;
              break;
            default:
              trueIndex = dataIndex;
          }
          //вызывается элемент галереи, соответствующий индексу слайда
          $.fancybox.open(gallery, {}, trueIndex);
          return false;
        });
      });
    }
  
      // News slider
      function sliderNewsAlt() {
          $('.news-slider-alt .slick-slider-alt').each(function () {
            $(this).slick({
              slidesToShow: 3,
              slidesToScroll: 1,
              // arrows: true,
              autoplay: false,
              infinite: false,
              prevArrow: $('.ss-controls .slick-switches .ss-switch.prev', $(this).closest('.news-slider-alt-wrapper')),
              nextArrow: $('.ss-controls .slick-switches .ss-switch.next', $(this).closest('.news-slider-alt-wrapper')),
              // centerMode: true,
              // dots: true,
              // appendDots: $('.ss-controls .slick-switches .ss-dots', $(this).closest('.news-slider')),
              responsive: [
                {
                  breakpoint: 1400,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                  },
                },
                {
                  breakpoint: 992,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                  },
                },
                {
                  breakpoint: 575,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: false,
                  },
                },
              ],
            });
      
          //   $('.ss-controls .slick-switches .ss-switch.prev', $(this).closest('.news-slider-alt-wrapper')).click(function () {
          //     $('.slick-slider-alt', $(this).closest('.news-slider-alt-wrapper')).slick('slickPrev');
          //   });
      
          //   $('.ss-controls .slick-switches .ss-switch.next', $(this).closest('.news-slider-alt-wrapper')).click(function () {
          //     $('.slick-slider-alt', $(this).closest('.news-slider-alt-wrapper')).slick('slickNext');
          //   });
      
          //   var numItems = $('.ss-item', $(this)).length;
          //   if ((numItems > 3 && window.innerWidth >= 1200) || (numItems > 2 && window.innerWidth >= 768 && window.innerWidth < 1200) || (numItems > 1 && window.innerWidth < 768)) {
          //     $('.ss-controls', $(this).closest('.news-slider-alt-wrapper')).css('display', '');
          //   }
      
          //   var currentSlider = $(this);
      
          //   $(window).on('resize', function () {
          //     waitForFinalEvent(
          //       function () {
          //         var numItems = $('.ss-item', currentSlider).length;
          //         if ((numItems > 3 && window.innerWidth >= 1200) || (numItems > 2 && window.innerWidth >= 768 && window.innerWidth < 1200) || (numItems > 1 && window.innerWidth < 768)) {
          //           $('.ss-controls', currentSlider.closest('.news-slider-alt-wrapper')).css('display', '');
          //         } else {
          //           $('.ss-controls', currentSlider.closest('.news-slider-alt-wrapper')).css('display', 'none');
          //         }
          //       },
          //       100,
          //       'sliderNews'
          //     );
          //   });
      
            var videos = $(this).parents('.videos');
      
            var gallery = $('.ss-item:not(.slick-cloned)', videos);
      
            $('.ss-item', videos).on('click', function (e) {
              e.preventDefault();
              //узнаём индекс слайда без учёта клонов
              var totalSlides = +$('.ss-item:not(.slick-cloned)', videos).length,
                dataIndex = +$(this).data('slick-index'),
                trueIndex;
              switch (true) {
                case dataIndex < 0:
                  trueIndex = totalSlides + dataIndex;
                  break;
                case dataIndex >= totalSlides:
                  trueIndex = dataIndex % totalSlides;
                  break;
                default:
                  trueIndex = dataIndex;
              }
              //вызывается элемент галереи, соответствующий индексу слайда
              $.fancybox.open(gallery, {}, trueIndex);
              return false;
            });
          });
        }
  
    // Archives slider
    function sliderArchives() {
      $('.archives-slider .slick-slider-alt').each(function () {
        $(this).slick({
          slidesToShow: 3,
          slidesToScroll: 1,
          // arrows: false,
          autoplay: false,
          infinite: false,
          dots: false,
          prevArrow: $('.ss-controls .slick-switches .ss-switch.prev', $(this).closest('.archives-slider')),
          nextArrow: $('.ss-controls .slick-switches .ss-switch.next', $(this).closest('.archives-slider')),
          // appendDots: $('.ss-controls .slick-switches .ss-dots', $(this).closest('.archives-slider')),
          responsive: [
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
          ],
        });
  
      //   $('.ss-controls .slick-switches .ss-switch.prev', $(this).closest('.archives-slider')).click(function () {
      //     $('.slick-slider-alt', $(this).closest('.archives-slider')).slick('slickPrev');
      //   });
  
      //   $('.ss-controls .slick-switches .ss-switch.next', $(this).closest('.archives-slider')).click(function () {
      //     $('.slick-slider-alt', $(this).closest('.archives-slider')).slick('slickNext');
      //   });
  
      //   var numItems = $('.ss-item', $(this)).length;
      //   if ((numItems > 3 && window.innerWidth >= 1200) || (numItems > 2 && window.innerWidth >= 768 && window.innerWidth < 1200) || (numItems > 1 && window.innerWidth < 768)) {
      //     $('.ss-controls', $(this).closest('.archives-slider')).css('display', '');
      //   }
  
      //   var currentSlider = $(this);
  
      //   $(window).on('resize', function () {
      //     waitForFinalEvent(
      //       function () {
      //         var numItems = $('.ss-item', currentSlider).length;
      //         if ((numItems > 3 && window.innerWidth >= 1200) || (numItems > 2 && window.innerWidth >= 768 && window.innerWidth < 1200) || (numItems > 1 && window.innerWidth < 768)) {
      //           $('.ss-controls', currentSlider.closest('.archives-slider')).css('display', '');
      //         } else {
      //           $('.ss-controls', currentSlider.closest('.archives-slider')).css('display', 'none');
      //         }
      //       },
      //       100,
      //       'archivesSlider'
      //     );
      //   });
      });
    }
  
  
    function customScrollbar() {
      function init(node) {
        if ($(node).length) {
          var scrollbar = window.Scrollbar;
          scrollbar.init(document.querySelector(node), {
            alwaysShowTracks: false,
            continuousScrolling: true,
          });
        }
      }
  
      init('.js-projects-tab-gallery');
      init('.js-table-scroll');
      init('.js-objects-list');
      init('.js-table-flats');
    }
  
    // About slider
    function sliderFeature() {
      $('.feature-slider .slick-slider-alt').each(function () {
        $(this).slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          autoplay: true,
          autoplaySpeed: 5000,
          dots: true,
          appendDots: $('.ss-controls .slick-switches .ss-dots', $(this).closest('.feature-slider')),
        });
  
        $('.ss-controls .slick-switches .ss-switch.prev', $(this).closest('.feature-slider')).click(function () {
          $('.slick-slider-alt', $(this).closest('.feature-slider')).slick('slickPrev');
        });
  
        $('.ss-controls .slick-switches .ss-switch.next', $(this).closest('.feature-slider')).click(function () {
          $('.slick-slider-alt', $(this).closest('.feature-slider')).slick('slickNext');
        });
  
        var numItems = $('.ss-item', $(this)).length;
        if (numItems > 1) {
          $('.ss-controls', $(this).closest('.feature-slider')).css('display', '');
        }
      });
    }
  
    // placec slider
    function sliderPlacec() {
      fancybox('.placec');
      $('.placec-slider .slick-slider-alt').each(function () {
        $(this).slick({
          slidesToShow: 3,
          slidesToScroll: 1,
          arrows: false,
          autoplay: true,
          autoplaySpeed: 5000,
          dots: true,
          appendDots: $('.ss-controls .slick-switches .ss-dots', $(this).closest('.placec-slider')),
          responsive: [
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 375,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
          ],
        });
  
        $('.ss-controls .slick-switches .ss-switch.prev', $(this).closest('.placec-slider')).click(function () {
          $('.slick-slider-alt', $(this).closest('.placec-slider')).slick('slickPrev');
        });
  
        $('.ss-controls .slick-switches .ss-switch.next', $(this).closest('.placec-slider')).click(function () {
          $('.slick-slider-alt', $(this).closest('.placec-slider')).slick('slickNext');
        });
  
        var numItems = $('.ss-item', $(this)).length;
        if ((numItems > 3 && window.innerWidth >= 768) || (numItems > 2 && window.innerWidth >= 375 && window.innerWidth < 768) || (numItems > 1 && window.innerWidth < 375)) {
          $('.ss-controls', $(this).closest('.placec-slider')).css('display', '');
        }
  
        var currentSlider = $(this);
  
        $(window).on('resize', function () {
          waitForFinalEvent(
            function () {
              var numItems = $('.ss-item', currentSlider).length;
              if ((numItems > 3 && window.innerWidth >= 768) || (numItems > 2 && window.innerWidth >= 375 && window.innerWidth < 768) || (numItems > 1 && window.innerWidth < 375)) {
                $('.ss-controls', currentSlider.closest('.placec-slider')).css('display', '');
              } else {
                $('.ss-controls', currentSlider.closest('.placec-slider')).css('display', 'none');
              }
            },
            100,
            'sliderPlacec'
          );
        });
      });
    }
  
    // progress slider
    function sliderProgress() {
      // fancybox('.construction-progress');
      $('.construction-progress-slider .slick-slider-alt').each(function () {
        $(this).slick({
          slide: '.ss-item',
          slidesToShow: 3,
          slidesToScroll: 1,
          arrows: false,
          autoplay: false,
          // autoplaySpeed: 5000,
          dots: true,
          appendDots: $('.ss-controls .slick-switches .ss-dots', $(this).closest('.construction-progress-slider')),
          responsive: [
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 375,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
          ],
        });
  
        $('.ss-controls .slick-switches .ss-switch.prev', $(this).closest('.construction-progress-slider')).click(function () {
          $('.slick-slider-alt', $(this).closest('.construction-progress-slider')).slick('slickPrev');
        });
  
        $('.ss-controls .slick-switches .ss-switch.next', $(this).closest('.construction-progress-slider')).click(function () {
          $('.slick-slider-alt', $(this).closest('.construction-progress-slider')).slick('slickNext');
        });
  
        var numItems = $('.ss-item', $(this)).length;
        if ((numItems > 3 && window.innerWidth >= 768) || (numItems > 2 && window.innerWidth >= 375 && window.innerWidth < 768) || (numItems > 1 && window.innerWidth < 375)) {
          $('.ss-controls', $(this).closest('.construction-progress-slider')).css('display', '');
        }
  
        var currentSlider = $(this);
  
        $(window).on('resize', function () {
          waitForFinalEvent(
            function () {
              var numItems = $('.ss-item', currentSlider).length;
              if ((numItems > 3 && window.innerWidth >= 768) || (numItems > 2 && window.innerWidth >= 375 && window.innerWidth < 768) || (numItems > 1 && window.innerWidth < 375)) {
                $('.ss-controls', currentSlider.closest('.construction-progress-slider')).css('display', '');
              } else {
                $('.ss-controls', currentSlider.closest('.construction-progress-slider')).css('display', 'none');
              }
            },
            100,
            'sliderProgress'
          );
        });
      });
    }
  
  
  
    // Format price
    function formatPrice(data, precision) {
      var price = Number.prototype.toFixed.call(parseFloat(data) || 0, precision || 0);
      var price_sep = price.replace(/(\D)/g, ',');
      price_sep = price_sep.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
      return price_sep;
    }
  
    // Calculator
    function calculator() {
      var node = $('.js-calculator');
      if (node.length) {
        var salaryCard = node.find('.salary-card');
        var maternal = node.find('.maternal');
        var onlyTwoDocs = node.find('.only-two-docs');
        var netVznosa = node.find('.net-vznosa');
  
        var formPrice = $('.mortgage-price');
        var formTotal = $('.mortgage-total');
        var formFirst = $('.mortgage-first');
        var formMonth = $('.mortgage-month');
        var formRate = $('.mortgage-rate');
        var formYears = $('.mortgage-years');
        var formSalary = $('.mortgage-salary-card');
        var formMaternal = $('.mortgage-maternal');
        var formTwoDocs = $('.mortgage-only-two-docs');
        var formNetVznosa = $('.mortgage-net-vznosa');
  
        salaryCard.on('change', function () {
          var item = node.find('.has-salary-card');
          if ($(this).is(':checked')) {
            item.show();
            formSalary.val(1);
          } else {
            item.hide();
            formSalary.val(0);
          }
        });
  
        maternal.on('change', function () {
          var item = node.find('.has-maternal');
          if ($(this).is(':checked')) {
            item.show();
            formMaternal.val(1);
          } else {
            item.hide();
            formMaternal.val(0);
          }
        });
  
        onlyTwoDocs.on('change', function () {
          var item = node.find('.has-only-two-docs');
          if ($(this).is(':checked')) {
            item.show();
            formTwoDocs.val(1);
          } else {
            item.hide();
            formTwoDocs.val(0);
          }
        });
  
        netVznosa.on('change', function () {
          var item = node.find('.has-net-vznosa');
          if ($(this).is(':checked')) {
            item.show();
            formNetVznosa.val(1);
          } else {
            item.hide();
            formNetVznosa.val(0);
          }
        });
  
        var flatPrice = node.find('.flat-price');
        var flatPriceInput = node.find('.flat-price').find('input');
        var flatPriceUnits = ' ' + flatPriceInput.data('units');
  
        var initialFee = node.find('.initial-fee');
        var initialFeeInput = node.find('.initial-fee').find('input');
        var initialFeeUnits = ' ' + initialFeeInput.data('units');
  
        var mortgageRate = node.find('.mortgage-rate');
        var mortgageRateInput = node.find('.mortgage-rate').find('input');
        var mortgageRateUnits = ' ' + mortgageRateInput.data('units');
  
        var mortgageTerm = node.find('.mortgage-term');
        var mortgageTermInput = node.find('.mortgage-term').find('input');
        var mortgageTermUnits = ' ' + mortgageTermInput.data('units');
  
        var resultPrice = node.find('.result-price');
        var resultTotal = node.find('.result-total');
        var resultMonth = node.find('.result-month');
        var resultRate = node.find('.result-rate');
  
        /* = */
        var flatPriceInputText = $('.iwr-flat-price .iwr-input input'),
          flatPriceInstance;
  
        var initialFeeInputText = $('.iwr-initial-fee .iwr-input input'),
          initialFeeInstance;
  
        var mortgageRateInputText = $('.iwr-mortgage-rate .iwr-input input'),
          mortgageRateInstance;
  
        var mortgageTermInputText = $('.iwr-mortgage-term .iwr-input input'),
          mortgageTermInstance;
  
        /* = */
        flatPriceInput.ionRangeSlider({
          type: 'single',
          skin: 'round',
          hide_min_max: true,
          hide_from_to: true,
          grid: true,
          extra_classes: 'custom-slider',
          force_edges: true,
          prettify: function (n) {
            return n.toLocaleString() + ' ₽';
          },
          onStart: function (data) {
            flatPriceInputText.prop('value', formatPrice(data.from) + flatPriceUnits);
            initialFeeInputText.prop('value', formatPrice((data.from / 100) * initialFeeInput.val()) + initialFeeUnits);
            calculate();
          },
          onChange: function (data) {
            flatPriceInputText.prop('value', formatPrice(data.from) + flatPriceUnits);
            initialFeeInputText.prop('value', formatPrice((data.from / 100) * initialFeeInput.val()) + initialFeeUnits);
            calculate();
          },
        });
  
        flatPriceInstance = flatPriceInput.data('ionRangeSlider');
  
        flatPriceInputText.on('change keyup', function () {
          var string = $(this).val();
          var val = string.replace(/\s/g, '').replace(/\D/g, '');
          var min = parseInt(flatPriceInput.data('min'));
          var max = parseInt(flatPriceInput.data('max'));
  
          if (val < min) {
            val = min;
          } else if (val > max) {
            val = max;
          }
  
          flatPriceInstance.update({
            from: val,
          });
  
          initialFeeInputText.prop('value', formatPrice((val / 100) * initialFeeInput.val()) + initialFeeUnits);
  
          calculate();
        });
  
        /* = */
        initialFeeInput.ionRangeSlider({
          type: 'single',
          skin: 'round',
          hide_min_max: true,
          hide_from_to: true,
          grid: true,
          grid_num: 8,
          extra_classes: 'custom-slider',
          force_edges: true,
          prettify: function (n) {
            return n + ' %';
          },
          onStart: function (data) {
            initialFeeInputText.prop('value', formatPrice((flatPriceInput.val() / 100) * data.from) + initialFeeUnits);
            calculate();
          },
          onChange: function (data) {
            initialFeeInputText.prop('value', formatPrice((flatPriceInput.val() / 100) * data.from) + initialFeeUnits);
            calculate();
          },
        });
  
        initialFeeInstance = initialFeeInput.data('ionRangeSlider');
  
        initialFeeInputText.on('change keyup', function () {
          var string = $(this).val();
          var string2 = string.replace(/\s/g, '').replace(/\D/g, '');
          var val = (string2 * 100) / flatPriceInput.val();
          var min = parseInt(initialFeeInput.data('min'));
          var max = parseInt(initialFeeInput.data('max'));
  
          if (val < min) {
            val = min;
          } else if (val > max) {
            val = max;
          }
  
          initialFeeInstance.update({
            from: val,
          });
  
          calculate();
        });
  
        /* = */
        mortgageRateInput.ionRangeSlider({
          type: 'single',
          skin: 'round',
          hide_min_max: true,
          hide_from_to: true,
          grid: true,
          grid_num: 3,
          extra_classes: 'custom-slider',
          force_edges: true,
          prettify: function (n) {
            return n + ' %';
          },
          onStart: function (data) {
            mortgageRateInputText.prop('value', formatPrice(data.from, 2) + mortgageRateUnits);
            calculate();
          },
          onChange: function (data) {
            mortgageRateInputText.prop('value', formatPrice(data.from, 2) + mortgageRateUnits);
            calculate();
          },
        });
  
        mortgageRateInstance = mortgageRateInput.data('ionRangeSlider');
  
        mortgageRateInputText.on('change keyup', function () {
          var string = $(this).val();
          var val = string.replace(/\s/g, '').replace(/[^0-9$.,]/g, '');
          var min = parseInt(mortgageRateInput.data('min'));
          var max = parseInt(mortgageRateInput.data('max'));
  
          if (val < min) {
            val = min;
          } else if (val > max) {
            val = max;
          }
  
          mortgageRateInstance.update({
            from: val,
          });
  
          calculate();
        });
  
        /* = */
        mortgageTermInput.ionRangeSlider({
          type: 'single',
          skin: 'round',
          hide_min_max: true,
          hide_from_to: true,
          grid: true,
          extra_classes: 'custom-slider',
          force_edges: true,
          onStart: function (data) {
            mortgageTermInputText.prop('value', data.from + (data.from > 4 ? ' лет' : ' года'));
            calculate();
          },
          onChange: function (data) {
            mortgageTermInputText.prop('value', data.from + (data.from > 4 ? ' лет' : ' года'));
            calculate();
          },
        });
  
        mortgageTermInstance = mortgageTermInput.data('ionRangeSlider');
  
        mortgageTermInputText.on('change keyup', function () {
          var string = $(this).val();
          var val = string.replace(/\s/g, '').replace(/\D/g, '');
          var min = parseInt(mortgageTermInput.data('min'));
          var max = parseInt(mortgageTermInput.data('max'));
  
          if (val < min) {
            val = min;
          } else if (val > max) {
            val = max;
          }
  
          mortgageTermInstance.update({
            from: val,
          });
  
          calculate();
        });
  
        function calculate() {
          setTimeout(function () {
            var price = parseFloat(flatPriceInput.val());
            var initial = parseFloat((flatPriceInput.val() / 100) * initialFeeInput.val());
            var rate = parseFloat(mortgageRateInput.data('from'));
            var years = parseFloat(mortgageTermInput.val());
  
            var loan = price - initial;
            var monthlyRate = rate / 100 / 12;
            var monthly = loan * (monthlyRate + monthlyRate / (Math.pow(1 + monthlyRate, 12 * years) - 1));
            var total = monthly * 12 * years;
  
            resultPrice.text(formatPrice(price - initial) + flatPriceUnits);
            resultTotal.text(formatPrice(price + total) + flatPriceUnits);
            resultMonth.text(formatPrice(monthly) + flatPriceUnits);
            resultRate.text(formatPrice(rate, 2) + mortgageRateUnits);
  
            formPrice.val(formatPrice(price - initial));
            formTotal.val(formatPrice(price + total));
            formFirst.val(formatPrice(initial));
            formMonth.val(formatPrice(monthly));
            formRate.val(formatPrice(rate, 2));
            formYears.val(years);
          }, 10);
        }
      }
    }
  
    // Checkbox email
    function checkboxEmail() {
      $('#mf-checkbox-mail').on('click', function () {
        if ($(this).prop('checked')) {
          $('.hidden-email').show();
        } else {
          $('.hidden-email').hide();
        }
      });
    }
  
    function autoWidthInput() {
      $('.range__input_to input').on('input', function () {
        $(this).closest('.range__input_to').find('.input-buffer').text($(this).val());
        $(this).width($(this).closest('.range__input_to').find('.input-buffer').width() + 3);
      });
    }
  
    function cursorTrack() {
      if (window.innerWidth >= 1200 && $('.js-cursor-track').length && $('.fancybox-btn').length) {
        var boxElem = document.querySelector('.js-cursor-track');
        var pointerElem = document.querySelector('.fancybox-btn');
  
        function onMouseMove(event) {
          var mouseX = event.pageX;
          var mouseY = event.pageY;
          var crd = boxElem.getBoundingClientRect();
  
          var activePointer = crd.left <= mouseX && mouseX <= crd.right && crd.top <= mouseY && mouseY <= crd.bottom;
  
          if (crd.left <= mouseX && mouseX <= crd.right && crd.top <= mouseY + $(window).scrollTop() && mouseY <= crd.bottom + $(window).scrollTop()) {
            if (pointerElem.classList.contains('box-pointer-hidden')) {
              pointerElem.classList.remove('box-pointer-hidden');
            }
  
            var posX = mouseX - crd.left - 75;
            var posY = mouseY - crd.top - 75 - $(window).scrollTop();
  
            pointerElem.style.transform = 'translate3d(' + posX + 'px, ' + posY + 'px, 0px)';
          } else {
            pointerElem.classList.add('box-pointer-hidden');
          }
        }
  
        function disablePointer() {
          requestAnimationFrame(function hidePointer() {
            pointerElem.classList.add('box-pointer-hidden');
          });
        }
  
        boxElem.addEventListener('mousemove', onMouseMove, false);
        boxElem.addEventListener('mouseleave', disablePointer, false);
      }
    }
  
    function fixCollapse() {
      $('[data-toggle="collapse"]').on('click', function () {
        $('.collapse.in').collapse('hide');
      });
    }
  
    // Lk slider
    function sliderLk() {
      fancybox('.lk-slider');
      $('.lk-slider .slick-slider').each(function () {
        $(this).slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          autoplay: true,
          autoplaySpeed: 7000,
          dots: true,
          appendDots: $('.ss-controls .slick-switches .ss-dots', $(this).closest('.lk-slider')),
        });
  
        $('.ss-controls .slick-switches .ss-switch.prev', $(this).closest('.lk-slider')).click(function () {
          $('.slick-slider', $(this).closest('.lk-slider')).slick('slickPrev');
        });
  
        $('.ss-controls .slick-switches .ss-switch.next', $(this).closest('.lk-slider')).click(function () {
          $('.slick-slider', $(this).closest('.lk-slider')).slick('slickNext');
        });
  
        var numItems = $('.ss-item', $(this)).length;
        if (numItems > 1) {
          $('.ss-controls', $(this).closest('.lk-slider')).css('display', '');
        }
      });
    }
  
    function bannerMain() {
      if ($('.js-banner-main').length && $('.new-project').length) {
        $('.js-banner-main').on('click', function (e) {
          e.preventDefault();
  
          $('#top').addClass('_transparent');
          $('.new-project').addClass('_show');
          $('body').addClass('banner-main-open');
          var height = $('.new-project').outerHeight();
          $('body').attr('style', 'height: ' + height + 'px; overflow:auto');
          $('.wrapper').attr('style', 'height: ' + height + 'px');
          $('.content').attr('style', 'padding-bottom: 0; height: ' + height + 'px; position: static');
          $('#bottom').attr('style', 'display: none');
          window.scrollTo(0, 0);
        });
      }
  
      if ($('.js-modal-banner').length) {
        $('.js-modal-banner').on('click', function (e) {
          e.preventDefault();
  
          $('#top').removeClass('_transparent');
          $('.modal-banner').addClass('_show');
          $('body').addClass('banner-main-open');
          var height = $('.modal-banner').outerHeight();
          $('body').attr('style', 'height: ' + height + 'px; overflow:auto');
          $('.wrapper').attr('style', 'height: ' + height + 'px');
          $('.content').attr('style', 'padding-bottom: 0; height: ' + height + 'px; position: static');
          $('#bottom').attr('style', 'display: none');
          window.scrollTo(0, 0);
        });
      }
  
      if ($('.js-close-banner').length) {
        $('.js-close-banner').on('click', function (e) {
          e.preventDefault();
  
          $('#top').removeClass('_transparent');
          $('.modal-banner').removeClass('_show');
          $('.new-project').removeClass('_show');
          $('body').removeClass('banner-main-open');
          $('body').attr('style', '');
          $('.wrapper').attr('style', '');
          $('.content').attr('style', '');
          $('#bottom').attr('style', '');
          footer();
          window.scrollTo(0, 0);
        });
      }
  
      $(window).on('resize', function () {
        waitForFinalEvent(
          function () {
            var height = null;
            if ($('.banner-main-open .modal-banner').hasClass('_show')) {
              height = $('.banner-main-open .modal-banner').outerHeight();
            } else if ($('.banner-main-open .new-project').hasClass('_show')) {
              height = $('.banner-main-open .new-project').outerHeight();
            }
            $('body.banner-main-open').css('height', height);
            $('.banner-main-open .wrapper').css('height', height);
            $('.banner-main-open .content').css('height', height);
          },
          100,
          'bannerMainResize'
        );
      });
    }
  
    // partners slider
    function sliderPartners() {
      $('.partners-slider .slick-slider-alt').each(function () {
        $(this).slick({
          slidesToShow: 4,
          slidesToScroll: 1,
          arrows: false,
          autoplay: true,
          autoplaySpeed: 5000,
          dots: true,
          appendDots: $('.ss-controls .slick-switches .ss-dots', $(this).closest('.partners-slider')),
          responsive: [
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 375,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
          ],
        });
  
        $('.ss-controls .slick-switches .ss-switch.prev', $(this).closest('.partners-slider')).click(function () {
          $('.slick-slider-alt', $(this).closest('.partners-slider')).slick('slickPrev');
        });
  
        $('.ss-controls .slick-switches .ss-switch.next', $(this).closest('.partners-slider')).click(function () {
          $('.slick-slider-alt', $(this).closest('.partners-slider')).slick('slickNext');
        });
  
        var numItems = $('.ss-item', $(this)).length;
        if (
          (numItems > 4 && window.innerWidth >= 1200) ||
          (numItems > 3 && window.innerWidth >= 768 && window.innerWidth < 1200) ||
          (numItems > 2 && window.innerWidth >= 375 && window.innerWidth < 768) ||
          (numItems > 1 && window.innerWidth < 375)
        ) {
          $('.ss-controls', $(this).closest('.partners-slider')).css('display', '');
        }
  
        var currentSlider = $(this);
  
        $(window).on('resize', function () {
          waitForFinalEvent(
            function () {
              var numItems = $('.ss-item', currentSlider).length;
              if (
                (numItems > 4 && window.innerWidth >= 1200) ||
                (numItems > 3 && window.innerWidth >= 768 && window.innerWidth < 1200) ||
                (numItems > 2 && window.innerWidth >= 375 && window.innerWidth < 768) ||
                (numItems > 1 && window.innerWidth < 375)
              ) {
                $('.ss-controls', currentSlider.closest('.partners-slider')).css('display', '');
              } else {
                $('.ss-controls', currentSlider.closest('.partners-slider')).css('display', 'none');
              }
            },
            100,
            'sliderPartners'
          );
        });
      });
    }
  
    function locationChoice() {
      if ($('.location-choice').length) {
        function callbackTabContent(path) {
          var _this = path,
            letter = _this.data('letter'),
            section = _this.data('section'),
            thisTabPane = $('.location-choice__tab-content > .tab-pane[data-letter="' + letter + '"][data-section="' + section + '"]');
  
          if (!_this.hasClass('active')) {
            _this.siblings('path').removeClass('active').end().addClass('active');
  
            thisTabPane.siblings('.tab-pane').removeClass('in active').end().addClass('in active');
          }
        }
  
        function init() {
          // if (window.innerWidth >= 1200) {
          //   $('.location-choice__plan-svg > svg > path').on('mouseenter', function() {
          //     callbackTabContent($(this));
          //   });
          // }
  
          $('.location-choice__plan-svg > svg > path').on('click', function (e) {
            e.preventDefault();
            callbackTabContent($(this));
  
            var breaker = $(this).closest('.tab-pane').find('.choice-breaker');
            var offsetTop = +$('.header').innerHeight();
            offsetTop += $('.second-menu').length ? +$('.second-menu').innerHeight() : 0;
  
            $('html, body').animate(
              {
                scrollTop: breaker.offset().top - offsetTop + 2,
              },
              400
            );
          });
        }
  
        init();
      }
    }
  
    function headerScrollHeight() {
      $(window).on('scroll', function () {
        waitForFinalEvent(
          function () {
            if ($(window).scrollTop() > 200) {
              $('.header').addClass('header_sticky');
            } else {
              $('.header').removeClass('header_sticky');
            }
          },
          300,
          'secondMenuTopSpacing'
        );
      });
    }
  
    function shareButton() {
      if ($('.js-share-button').length) {
        $('.js-share-button').on('click', function (e) {
          e.preventDefault();
          $('.js-share-button').removeClass('_active'); //Заменить на поиск сиблингов и удаление класса только у них
  
          var _this = $(this),
            shareBlock = $('.share');
  
          if (shareBlock.hasClass('_show') && _this.hasClass('_active')) {
            shareBlock.removeClass('_show');
            _this.removeClass('_active');
          } else {
            if (window.innerWidth > 1200) {
              firstPosition(_this);
              windowScrollToButton(_this);
            } else {
              backdropShow();
              $('body').addClass('modal-open');
            }
  
            var id = _this.data('property');
            generateLinks(id);
  
            _this.addClass('_active');
            shareBlock.addClass('_show');
  
            outerBlockClick(_this);
            buttonCloseBlock(_this);
          }
        });
  
        function buttonCloseBlock(button) {
          if ($('.share__close').length) {
            $('.share__close').on('click', function (e) {
              e.preventDefault();
  
              $('.share').removeClass('_show');
              button.removeClass('_active');
              $('.share-backdrop').removeClass('in');
              $('body').removeClass('modal-open');
            });
          }
        }
  
        function backdropShow() {
          if ($('.share-backdrop').length) {
            $('.share-backdrop').addClass('in');
          }
        }
  
        function outerBlockClick(button) {
          $('body').on('click', function (e) {
            if (!$('share').is(e.target) && $('.share').has(e.target).length === 0 && !$('.js-share-button').is(e.target) && $('.js-share-button').has(e.target).length === 0) {
              $('.share').removeClass('_show');
              button.removeClass('_active');
              $('.share-backdrop').removeClass('in');
              $('body').removeClass('modal-open');
            }
          });
        }
  
        function firstPosition(button) {
          var shareBlock = $('.share'),
            widthshareBlock = shareBlock.innerWidth(),
            heightshareBlock = shareBlock.innerHeight(),
            posXButton = button.offset().left,
            posYButton = button.offset().top,
            widthButton = button.innerWidth(),
            heightButton = button.innerHeight();
  
          shareBlock.css({
            left: posXButton + widthButton / 2 - widthshareBlock / 2,
            top: posYButton + heightButton + 10,
          });
        }
  
        function windowScrollToButton(button) {
          var offsetTop = +$('.header').innerHeight();
          offsetTop += $('.second-menu').length ? +$('.second-menu').innerHeight() : 0;
  
          $('html, body').animate(
            {
              scrollTop: button.offset().top - offsetTop - 40,
            },
            1000
          );
        }
  
        function generateLinks(id) {
          var vk = $('#vk-share');
          var fb = $('#fb-share');
          var ok = $('#ok-share');
          var tw = $('#tw-share');
          var vb = $('#vb-share');
          var wp = $('#wp-share');
          var sk = $('#sk-share');
          var tg = $('#tg-share');
          var cp = $('#cp-share');
          $.ajax({
            url: '/ajax/generate-links',
            type: 'get',
            dataType: 'json',
            data: {
              id: id,
            },
            success: function (data) {
              vk.attr('href', data.vk);
              fb.attr('href', data.fb);
              ok.attr('href', data.ok);
              tw.attr('href', data.tw);
              vb.attr('href', data.vb);
              wp.attr('href', data.wp);
              sk.attr('href', data.sk);
              tg.attr('href', data.tg);
              cp.attr('href', data.cp);
            },
            error: function (errorThrown) {
              console.log(errorThrown);
            },
          });
        }
      }
    }
  
    function copyButton() {
      $('#cp-share').on('click', function (e) {
        e.preventDefault();
        var copyText = $(this).attr('href');
        var textarea = document.createElement('textarea');
        textarea.textContent = copyText;
        textarea.style.position = 'fixed'; // Prevent scrolling to bottom of page in MS Edge.
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      });
    }
  
    // Property slider
    function sliderProperty() {
      $('.property-slider .slick-slider-alt').each(function () {
        $(this).slick({
          slidesToShow: 3,
          slidesToScroll: 1,
          arrows: false,
          autoplay: false,
          dots: true,
          appendDots: $('.ss-controls .slick-switches .ss-dots', $(this).closest('.property-slider')),
          responsive: [
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 576,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
          ],
        });
  
        $('.ss-controls .slick-switches .ss-switch.prev', $(this).closest('.property-slider')).click(function () {
          $('.slick-slider-alt', $(this).closest('.property-slider')).slick('slickPrev');
        });
  
        $('.ss-controls .slick-switches .ss-switch.next', $(this).closest('.property-slider')).click(function () {
          $('.slick-slider-alt', $(this).closest('.property-slider')).slick('slickNext');
        });
  
        var numItems = $('.ss-item', $(this)).length;
        if ((numItems > 3 && window.innerWidth >= 992) || (numItems > 2 && window.innerWidth <= 991 && window.innerWidth >= 576) || (numItems > 1 && window.innerWidth <= 575)) {
          $('.ss-controls', $(this).closest('.property-slider')).css('display', '');
        }
  
        var currentSlider = $(this);
  
        $(window).on('resize', function () {
          waitForFinalEvent(
            function () {
              var numItems = $('.ss-item', currentSlider).length;
              if ((numItems > 3 && window.innerWidth >= 992) || (numItems > 2 && window.innerWidth <= 991 && window.innerWidth >= 576) || (numItems > 1 && window.innerWidth <= 575)) {
                $('.ss-controls', currentSlider.closest('.property-slider')).css('display', '');
              } else {
                $('.ss-controls', currentSlider.closest('.property-slider')).css('display', 'none');
              }
            },
            100,
            'sliderProperty'
          );
        });
      });
    }
  
    // Multiselect
    function bootstrapMultiselect() {
      $('#calc-complex').multiselect({
        onChange: function (option, checked, select) {
          var currentform = $('.calculation__form');
          var project_ids = null;
          if ($('#calc-complex').val().length > 0) {
            project_ids = $('#calc-complex').val();
          }
  
          var property_type = currentform.data('property-type');
          var commercial_buy = $('#calc-property-commercial-buy').val();
          resetIonRange(currentform, 'price', project_ids, property_type, commercial_buy);
          resetIonRange(currentform, 'square', project_ids, property_type, commercial_buy);
          resetIonRange(currentform, 'floor', project_ids, property_type, commercial_buy);
        },
      });
    }
  
    // Commercial Buy
    function commercialBuy() {
      $('#calc-property-commercial-buy').change(function () {
        var currentform = $('.calculation__form');
        var project_ids = null;
        if ($('#calc-complex').val().length > 0) {
          project_ids = $('#calc-complex').val();
        }
        var property_type = currentform.data('property-type');
        var commercial_buy = $(this).val();
        resetIonRange(currentform, 'price', project_ids, property_type, commercial_buy);
        resetIonRange(currentform, 'square', project_ids, property_type, commercial_buy);
        resetIonRange(currentform, 'floor', project_ids, property_type, commercial_buy);
      });
    }
  
    function showAllFilters(params) {
      let btn = document.querySelector('.show-all-filters');
      let calculationItems = document.querySelectorAll('.calculation__column');
      let flag = false;
      if(btn && calculationItems.length>0){
          btn.addEventListener('click', ()=>{
              flag = true;
              showHide();
          });
  
          function showHide(){
              if(!flag){
                  for (let i = 3; i < calculationItems.length; i++) {
                      calculationItems[i].classList.add('hidden-filter');
                  }
                  return;
              }
              for (let i = 0; i < calculationItems.length; i++) {
                  calculationItems[i].classList.remove('hidden-filter');
              }
              btn.classList.add('hidden');
          }
          showHide();
      }
    }
  
    function initPropertyType() {
      const property_type_select = $('#calc-property-type');
      const property_type_select_main_page = $('#calc-property-type-main-page');
  
      if (property_type_select_main_page) {
        property_type_select_main_page.change(function () {
          if (property_type_select.val() != $(this).val()) {
            property_type_select.val($(this).val()).trigger('change');
          }
        });
        // дефолтное значение квартира для фильтра недвижки на главной
        property_type_select_main_page.val(1).trigger('change');
      }
  
      if (property_type_select) {
        property_type_select.change(function () {
          if (property_type_select_main_page.val() != $(this).val()) {
            property_type_select_main_page.val($(this).val()).trigger('change');
          }
        });
      }
    }
  
    function validateFeedbackMainForm() {
      const btn = document.getElementById('remainquestions-top-form__btn');
      btn.addEventListener('click', (event) => {
        let validate_status = true;
        // name
        let name = document.getElementById('contact-form-main-name-input').value;
        if (name.length < 3) {
          validate_status = false;
          document.getElementById('contact-form-main-name-error').innerText = 'Необходимо заполнить «Имя».';
        }else {
          document.getElementById('contact-form-main-name-error').innerText = '';
        }
        // phone
        let phone = document.getElementById('contact-form-main-phone-input').value;
        if (phone.length != 18) {
          validate_status = false;
          document.getElementById('contact-form-main-phone-error').innerText = 'Необходимо заполнить «Телефон».';
        }else {
          document.getElementById('contact-form-main-phone-error').innerText = '';
        }
  
        if (validate_status) {
          document.getElementById('contact-form-main').submit();
        }
      })
    }
  
  
    function sliderAdv(){
      function showSliderOnMobile(){
          if (window.innerWidth < 767) {
              $('.project-gallery__slider .project-gallery__slider-element:not(.slick-initialized)').slick({
                dots: false,
                infinite: true,
              //   speed: 100,
                slidesToShow: 1,
                prevArrow: $('.project-gallery__slider .ss-switch.prev'),
                nextArrow: $('.project-gallery__slider .ss-switch.next'),
              });
            } else {
              $(".project-gallery__slider .project-gallery__slider-element.slick-initialized").slick("unslick");
            }
      }
      showSliderOnMobile();
          
      let decoratorShowSliderOnMobile = throttle(showSliderOnMobile,200);
      window.addEventListener('resize',decoratorShowSliderOnMobile);
    }
  
  
    function sliderPlaces(){
      $('.places__slider .slick-slider').slick({
          dots: false,
          infinite: false,
        //   speed: 100,
          slidesToShow: 3,
          prevArrow: $('.places__slider .ss-switch.prev'),
          nextArrow: $('.places__slider .ss-switch.next'),
          responsive: [
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1,
                },
              },
              {
                  breakpoint: 479,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                  },
                },
            ],
        });
    }
  
  
  
    function sliderOurSales(){
      $('.oursales__slider .slick-slider').slick({
          dots: false,
          infinite: false,
          slidesToShow: 2,
          prevArrow: $('.oursales__slider .ss-switch.prev'),
          nextArrow: $('.oursales__slider .ss-switch.next'),
          responsive: [
              {
                  breakpoint: 575,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                  },
                },
            ],
        });
    }
  
    function sliderRelatedProjects(){
      $('.objects.objects--related .objects__row .slick-slider').slick({
          dots: false,
          infinite: false,
          slidesToShow: 3,
          prevArrow: $('.objects.objects--related .objects__row .ss-switch.prev'),
          nextArrow: $('.objects.objects--related .objects__row .ss-switch.next'),
          responsive: [
              {
                  breakpoint: 992,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                  },
                },
                {
                  breakpoint: 575,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                  },
                },
            ],
        });
    }
  
  
    function throttle(func, ms) {
  
      let isThrottled = false,
          savedArgs,
          savedThis;
  
      function wrapper() {
  
          if (isThrottled) { // (2)
              savedArgs = arguments;
              savedThis = this;
              return;
          }
  
          func.apply(this, arguments); // (1)
  
          isThrottled = true;
  
          setTimeout(function () {
              isThrottled = false; // (3)
              if (savedArgs) {
                  wrapper.apply(savedThis, savedArgs);
                  savedArgs = savedThis = null;
              }
          }, ms);
      }
  
      return wrapper;
  }
  
  
    $(document).ready(function () {
      showAllFilters();
      footer();
      footerAuto();
      mainNavbar();
      goodsOrderForm();
      mask();
      navbarCollapse();
      passwordVisible();
      select2();
      scrollToTarget();
      scrollToTop();
      sliderPreview();
      tableStyle();
      tooltip();
      objectFill();
      stickyHeader();
      mobileNavbar();
      sliderMain();
      sliderProjectHead();
      heightWindows();
      widthWindows();
      rangeSlider();
      clearForm();
      sliderAbout();
      sliderReviews();
      sliderNews();
      sliderArchives();
      customScrollbar();
      sliderFeature();
      sliderPlacec();
      sliderProgress();
      // customTabs();
      calculator();
      checkboxEmail();
      autoWidthInput();
      fixCollapse();
      sliderLk();
      bannerMain();
      cursorTrack();
      sliderPartners();
      locationChoice();
      headerScrollHeight();
      shareButton();
      copyButton();
      sliderProperty();
      bootstrapMultiselect();
      commercialBuy();
      sliderNewsAlt();
      sliderAdv();
      sliderPlaces();
      // sliderConstrutctionPhoto();
      sliderOurSales();
      sliderRelatedProjects();
      // initPropertyType();
      validateFeedbackMainForm();
    });
  })(jQuery);
  
  
  // $('a[href="#contact"]').click(function(){
  // $('#contact').modal('show')
  // })
  
  (function(){
      const objects = document.querySelectorAll('.objects__column');
      if(objects.length >6 && document.body.classList.contains('home')){
          function showSixObjects(){
              for (let i = 6; i < objects.length; i++) {
                  objects[i].classList.add('hidden');
              }
          }
          showSixObjects();
      }
  
  
    //  Изменение заголовка на телефоне в выпадающем меню
    function changeTitleLandingsNavbar(){
          let title = document.getElementById('landing-navbar-title');
          if(title){
              let lis = document.querySelectorAll('#catalog-nav ul li');
              let text = null;
              for (let i = 0; i < lis.length; i++) {
                  if(lis[i].classList.contains('active')){
                      text = lis[i].querySelector('a').innerHTML;             
                      break;
                  }
              }
              title.innerHTML = text;
          }
    }
    changeTitleLandingsNavbar();
  
    // Раскрыть текст описания на странице жк
    const btnShowMore = document.querySelector('.show-more');
    if(btnShowMore){
      const text = document.querySelector('.project-description-info__text');
  
      btnShowMore.addEventListener('click', showMoreAboutProject);
      let btnText = btnShowMore.innerHTML;
  
      function showMoreAboutProject (){
          if(text.classList.contains('hide-text')){
              text.classList.remove('hide-text');
              btnShowMore.innerHTML = 'Скрыть';
          } else{
              text.classList.add('hide-text');
              btnShowMore.innerHTML = btnText;
          }
      }
    }
  
      
  })();