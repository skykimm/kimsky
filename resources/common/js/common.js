// G80, G70 공통 스크립트 (모바일)
$(document).ready(function () {
  //Layout
  gnbEvent()
  search();
  coverHeight()
  //Component
  dropdownEvent()
  dropdownDepEvent()
  tabEvent()
  popupEvent();
  pagination();
  elementPosition()
  // Custom Page
  pageCustom();
})
/******************************************
# COMMON - GNB
*******************************************/
function gnbEvent() {
  var dim = "<div id='dim'></div>"
  var $gnb = $('#gnb');
  $('#gnbMenu').click(function () {
    $('#gnbBar').after(dim);
      $gnb.addClass("open");
      $('html').css('overflow', 'hidden')
  });
  // 사이드메뉴 닫기
  $('.src-gnb-close').click(function () {
    $('#dim').remove();
      $gnb.removeClass("open");
      $('html').removeAttr('style')
  });
  //동적 요소 이벤트 생성
  $(document).on('click', '#dim', function () {
    $('#dim').remove();
      $gnb.removeClass("open");
      $('html').removeAttr('style')
  });
}
function search(){
    // 검색기능
    $('.ico-search').on('click', function(){
      $(this).toggleClass('is-active')
      if($('.gnb-wrap .search').hasClass('is-open')){
        $('html').removeAttr('style');
        $('.search-dim').remove();
      }else{
        var dim = '<div class="search-dim"></div>';
        $('html').css({'overflow': 'hidden'})
        $('body').prepend(dim)
      }
      $('.gnb-wrap .search').toggleClass('is-open').finish().slideToggle({
        duration: 300,
        start: function() {
          $(this).css('display','flex');
        }
      })
      // input focus
      if($('.gnb-wrap .search').hasClass('is-open')){
        $('.gnb-wrap .search .search-ip').val('').focus()
        $('.gnb-wrap .search .search-btn-clear').hide()
      }
    })
    // clear 버튼
    $('.search-btn-clear').on('click', function(){
      $(this).siblings('.search-ip').val('').focus()
      $(this).hide()
    })
    $('.search-ip').on('input', function(){
      isClear($(this).val(), $(this))
    })
}

function isClear(isFill, target){
  if(isFill){
    target.siblings('.search-btn-clear').show();
  }else{
    target.siblings('.search-btn-clear').hide();
  }
}
/******************************************
# COMMON - Cover Height
*******************************************/
function coverHeight() {
  if ($('.wrap .cover').get(0) == undefined) return
  var h = $(window).height() > 612 ? $(window).height() : 612 ;
  $(".wrap .cover").css("height", h - 112);

  $(window).resize(function () {
    h = $(window).height() > 612 ? $(window).height() : 612 ;
    $(".wrap .cover").css("height", (h - 112));
  })
}
/******************************************
# COMMON - Dropdown
*******************************************/
function dropdownEvent() {
  $('.dropdown-group').each(function () {
    var $dw = $(this)
    $dw.find('button').on('click', function (e) {
      $dw.siblings(".dropdown-box").slideToggle(150);
      $dw.toggleClass('is-open')
      return false;
    })
    $dw.find('li').each(function () {
      $(this).on('click', function () {
        $dw.find('li').removeAttr('class');
        $(this).addClass('is-active')
        $dw.find("button").text($(this).text());
        $dw.removeClass('is-open').find(".dropdown-box").slideUp(150);
        var dropdownBoxUrl = $(this).children("a").attr('href');
        $(location).attr('href', dropdownBoxUrl);
      })
    })
  })
  // 외부영역 클릭시 드롭다운 닫기
  $(document).on('click', '#dim', function () {
    $('.dropdown-group').each(function () {
      if ($(this).hasClass('is-open')) $(this).find('button').trigger('click')
    })
  })
}

function dropdownDepEvent() {
  $('.dropdown-3dep').each(function () {
    var $dw = $(this)
    $dw.find('button').on('click', function (e) {
      $dw.siblings(".dropdown-box").slideToggle(150);
      $dw.toggleClass('is-open')
      return false;
    })
    $dw.find('li').each(function () {
      $(this).on('click', function () {
        $dw.find('li').removeAttr('class');
        $(this).addClass('is-active')
        $dw.find("button").text($(this).text());
        $dw.removeClass('is-open').find(".dropdown-box").slideUp(150);
        var dropdownBoxUrl = $(this).children("a").attr('href');
        $(location).attr('href', dropdownBoxUrl);
      })
    })
  })
  // 외부영역 클릭시 드롭다운 닫기
  $(document).on('click', '#dim', function () {
    $('.dropdown-3dep').each(function () {
      if ($(this).hasClass('is-open')) $(this).find('button').trigger('click')
    })
  })
}
/******************************************
# COMMON - TAB
*******************************************/
function tabEvent() {
  $('.tab').each(function () {
    var $tab = $(this)
    $tab.find('.tab-title>.item').each(function (idx) {
      var $title = $tab.find('.tab-title>.item');
      // click event
      $(this).on('click', function () {
        var $tabContent = $(this).parents('.tab-title').siblings('.tab-content');
        var active = $(this).data('show')
        $(this).siblings('.item').removeClass('is-active');
        $(this).addClass('is-active')
        $tabContent.children('.item-wrap').removeClass('is-active')
        $tabContent.children('.item-wrap').eq(idx).addClass('is-active')
        if ($tabContent.find('.swiper-container')) {
          $tabContent.find('.swiper-container').each(function () {
            $(this).get(0).swiper.update();
            paginationUpdate($(this))
          })
        }
      })
    })
  })
}
/******************************************
# COMMON - POPUP
*******************************************/
function popupEvent() {
  // popup event
  $(".btn-popup").on('click', function () {
    popupOpen($(this).attr("data-name"));
  })
  $(".popup-wrap .btn-close").on('click', function () {
    popupClose($(this).closest(".popup-wrap").data('show'))
  })
  // alert event
  $(".alert .btn-close").on('click', function () {
    alertClose($(this).closest('.alert').data('show'))
  })
}
function popupOpen(target){
  var $target = $(".popup-wrap[data-show='" + target + "']");
  $target.addClass('is-show');
  $('html').css('overflow', 'hidden')
  // if popup has swiper
  if ($target.find('.swiper-container')) {
    $target.find('.swiper-container').each(function () {
      $(this).get(0).swiper.update();
      paginationUpdate($(this))
    })
  }
  // if tipNstory
  if($target.hasClass('popup-tns')){
    tns($target);
  }
}
function popupClose($target){
  $(".popup-wrap[data-show='" + $target + "']").removeClass('is-show');
  $('html').removeAttr('style')
}
function alertOpen($target){
  var dim = "<div id='dimAlert' class='dim' style='z-index:1000'></div>"
  var $target = $(".alert[data-show='" + $target + "']");
  $target.addClass('is-show').before(dim);
}
function alertClose($target){
  $(".alert[data-show='" + $target + "']").removeClass('is-show');
  $('#dimAlert').remove();
  if( $('.popup-wrap:visible').length < 1){
    $('html').removeAttr('style')
  }
}
/******************************************
# SWIPER - set pagination position
*******************************************/
function pagination() {
  var pag = $('.swiper-pagination');
  //메인페이지 제외
  if ($('.container.main').get(0)) return;
  pag.each(function (e) {
    if ($(this).get(0) == undefined) return;
    var swiper = $(this).closest('.swiper-container').find('.swiper-slide').eq(0);
    if(pag.hasClass('l-bottom')) {
      paginationBottom(swiper)
    } else{
      paginationUpdate(swiper);  
    }
  })
}
function paginationUpdate(swiper) {
  if($('#container').get(0) !== undefined) return; // 이전버전 접근방지
  var imgWrap = swiper.find('.img-wrap').eq(0).length ? swiper.find('.img-wrap').eq(0).position().top : 0;
  var img = swiper.find('.img-wrap').eq(0).find('img').length ? swiper.find('.img-wrap').eq(0).find('img') : swiper.find('img').eq(0);
  if(img.height() !== 0){
    var top = imgWrap + img.position().top + img.height() + 8;
    swiper.closest('.swiper-container').find('.swiper-pagination').eq(0).css({ 'top': top, 'bottom': 'auto' })
  }else{
    //이미지 로드가 느릴때를 대비
    swiper.closest('.swiper-container').find('.swiper-pagination').eq(0).css({ 'bottom': swiper.closest('.swiper-wrapper').height() - imgWrap - 30 })
  }
}
function paginationBottom(swiper){
}
/******************************************
# Component - set img-badge white position
*******************************************/
function elementPosition() {
  $('.img-wrap').find('.white').each(function () {
    var imgHeight = $(this).siblings('img').height();
    var thisHeight = $(this).outerHeight() - 1;
    if(imgHeight !== 0){
      $(this).css('top', imgHeight - thisHeight)
    }else{
      //이미지 로드가 느릴때를 대비
      $(this).css('bottom', $(this).closest('.img-wrap').height() - 2)
    }
  })
}  
/******************************************
# Component - Tip & Story
*******************************************/   
function tns($target){
  var tns = {
    $popup : $target,
    $content: $target.find('.tns-content'),
    $currentMsg : null,
    $currentBubble :null,
    bubbles : $target.find('.msg-bubble').length,
    $obj: {
      icoScroll: $target.find('.tns-scroll'),
      btnEnd: $target.find('.btnMsgEnd'),
      tip: $target.find('.tns-tip'),
      info: $target.find('.info-txt'),
    },
    status : 0,
    isLast : false,
    isScrolled : false
  }

  // init
  tns = tnsInit(tns)
  tns.status = tnsProgress(0, tns.bubbles)
  isScrolled(tns)
  
  var position = tns.$content.scrollTop(0);
  // Talk Event
  tns.$content.scroll(function(){
    var s = $(this).scrollTop();
    if(!tns.$obj.icoScroll.attr('style') && s > position){
      tns.$obj.icoScroll.fadeOut();
    }
    if(!tns.isScrolled){
      isScrolled(tns)
    }
    position = s
  })

  // close
  tns.$obj.btnEnd.on('click', function(){
    popupClose(tns.$popup.data('show'));
  });
} 

function tnsInit(tns){
  // remove
  tns.$popup.find('.is-show').each(function(){
    $(this).removeClass('is-show');
  })
  tns.$content.scrollTop(0).off('scroll')

  // hide
  tns.$obj.info.hide();
  tns.$obj.icoScroll.removeAttr('style')
  tns.$obj.btnEnd.attr('disabled', 'disabled');

  // msg, bubble init
  tns.$currentMsg = $(tns.$popup.find('.msg').get(0))
  tns.$currentBubble = tns.$currentMsg.find('.msg-bubble')

  return tns;
}

function tnsProgress(idx, total){
  var width = idx / total * 100;
  $('.popup-tns .progress .is-active').css('width', width+'%');
  return ++idx;
}
function isScrolled(tns){ 
  tns.isScrolled = true
  var st = tns.$content.height() + tns.$content.scrollTop()
  
  if(tns.isLast && tns.$obj.tip.position().top <= st) {
    tnsShowInfo(tns)
    return;
  }

  if(!tns.$currentMsg) {
    tns.isScrolled = false
    return;
  };
  
  var targetPoint = tns.$currentMsg.position().top;

  while(targetPoint!==undefined && targetPoint + tns.$currentBubble.position().top <= st){
    isinMsg(tns, st);
    targetPoint = tns.$currentMsg ? tns.$currentMsg.position().top : undefined;
  }
  tns.isScrolled = false
}

function isinMsg(tns, st){
  var $bubble = tns.$currentBubble
  var bubblePoint = $bubble.position().top + tns.$currentMsg.position().top;

  if(!tns.$currentMsg.hasClass('is-show')){
    tns.$currentMsg.addClass('is-show')
  }else if(bubblePoint > st){
    return;
  }

  if(tns.$currentMsg.hasClass('is-show') && bubblePoint <= st){ 
    isinBubble(tns);
  }
};

function isinBubble(tns){
  var $bubble = tns.$currentBubble
  
  $bubble.addClass('is-show')
  tns.$currentBubble = $bubble.next('.msg-bubble').length > 0 ? $bubble.next('.msg-bubble') : undefined;
  tns.status = tnsProgress(tns.status, tns.bubbles)
    
  if(!tns.$currentBubble){
    tns.$currentMsg = tns.$currentMsg.next('.msg').length > 0 ? tns.$currentMsg.next('.msg') : undefined
    tns.$currentBubble = tns.$currentMsg ? $(tns.$currentMsg.find('.msg-bubble')[0]) : undefined
  }

  if(!tns.$currentMsg){
    tns.isLast = true
  }
}

function tnsShowInfo(tns){
  tns.$obj.info.show();
  tns.$obj.btnEnd.removeAttr('disabled');
  tns.$obj.tip.addClass('is-show')
}
/******************************************
# Page - Custom UI
*******************************************/
function pageCustom(){
  var page = document.querySelector('.container') ? document.querySelector('.container').getAttribute('class').split(' ')[1] : undefined;
  switch (page){
    case 'main': 
      mainEvent(); 
      break;
    case 'mypage': 
      mypageEvent(); 
      break;
    case 'search-result': 
      resultEvent(); 
      break;
    default: return;
  }
}
/******************************************
# Page - Main(Introduction)
*******************************************/
function mainEvent(){
  // Accordion
  $(".accordion-wrap > dl > dt").click(function () {
    var has = $(this).hasClass("active");
    if (has) {
      $(".accordion-wrap > dl > dt").removeClass("active");
      $(".accordion-wrap > dl > dd").slideUp()
    } else {
      $(".accordion-wrap > dl > dt").removeClass("active");
      $(this).addClass("active");
      $(".accordion-wrap > dl > dd").slideUp();
      $(this).next().slideDown(function () {
        $('html, body').animate({
          scrollTop: $(this).offset().top - 131
        }, 400);
      });
    }
  })
}
/******************************************
# Page - Mypage
*******************************************/
function mypageEvent(){
  // Mypage - 기능 dropdown (G80과 동일이라 수정 불가)
  $(".complete-wrap .dropdown-group").click(function () {
    $(this).toggleClass('is-open');
    $(this).siblings(".dropdown-box").slideToggle(150);
    return false;
  });
  // Quiz popup - 퀴즈 풀 경우, alert 오픈
  $('.popup-mypage.quiz .form-group label').on('click', function(){ 
    quizEvent($(this));
  })
  // Survey popup - 기타 클릭시 input 활성화
  $('.popup-mypage.survey .form-group label').on('click', function(){ 
    surveyEvent($(this));
  })
}
function quizEvent(target){ // target : .form-group label
  var value = target.closest('.form-group').data('answer');
  alertOpen('alert'+value);
  quizCmt(target.closest('.popup-mypage'), value);
}
function quizCmt(popup, value){// popup : .popup-mypage, value: [data-answer]
  popup.find('.quiz-cmt[data-cmt]').removeClass('is-show')
  popup.find('.quiz-cmt[data-cmt="cmt'+value+'"]').addClass('is-show')
}
function surveyEvent(target){ //target : .form-group label
  var $ip = $('input[type="text"]#'+target.data("id"));
  if($ip.length < 1) return;
  if(target.siblings('input').is(':checked')){
    $ip.val('').attr('disabled', 'disabled')
  }else{
    $ip.removeAttr('disabled').val('').focus();
  }
}

// 검색 결과
function resultEvent(){
  var target = $('.wrap .search .search-ip')
  isClear(target.val(), target)
}