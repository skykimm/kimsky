// G80, G70 공통 스크립트 (Web)
$(document).ready(function () {
  //layout
  coverHeight();
  highlight();
  search();
  //Component
  dropdownEvent()
  tabEvent()
  popupEvent();
  // Custom Page
  pageCustom();
})
// 외부영역 클릭시 드롭다운 닫기
$(document).click(function (e) {
  $('.top-bar .dropdown-group').each(function () {
    if ($(this).hasClass('is-open')) $(this).find('button').trigger('click')
  })
});
/******************************************
# COMMON - GNB
*******************************************/
function initGnb(menu, subMenu) {
  $('.gnb-list>li').removeClass('active');
  $('.gnb-list>li .swiper-wrapper>.swiper-slide').removeClass('on');
  swiperDestroy();

  $(menu).addClass('active');
  $(subMenu).addClass('on');
  gnbWidth($(menu));
}
// ul.width < li.width 일때, swiper 선언
function gnbWidth($el) {
  var $wrap = $el.find('.sub-container');
  var $li = $wrap.find('.swiper-slide');
  var $liWidth = 0;
  $li.each(function () {
    $liWidth += $(this).width();
  })
  if ($wrap.width() < $liWidth) {
    swiperInit($el.index());
  }
}
function search(){
    // 검색기능
    $('.btn-tg-search').on('click', function(){
      $(this).toggleClass('is-active')
      if($('.gnb-wrap .search').hasClass('is-open')){
        $('html').removeAttr('style');
        $('.search-dim').remove();
      }else{
        var dim = '<div class="search-dim"></div>';
        $('html').css({'overflow': 'hidden'})
        $('body').prepend(dim)
      }
      $('.gnb-wrap .search').toggleClass('is-open').finish().slideToggle('300')
      // input focus
      if($('.gnb-wrap .search').hasClass('is-open')){
        $('.gnb-wrap .search .search-ip').val('').focus()
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
  var h = $(window).height();
  $(".wrap .cover").css("height", h - 140);

  $(window).resize(function () {
    h = $(window).height();
    $(".cover").css("height", (h - 140));
  })
}
/******************************************
# COMMON - highlight
*******************************************/
function highlight() {
  var highlight = $('.highlight-wrap');
  $('.highlight-wrap .title').on('click', function () {
    highlight.toggleClass('is-open')
  })
}

/******************************************
# COMMON - TAB
*******************************************/
function tabEvent() {
  $('.tab').each(function () {
    var $tab = $(this)
    $tab.find('.tab-title .item').each(function (idx) {
      var $title = $tab.find('.tab-title .item');
      // tab-width
      var w = 100 / $title.length + '%'
      if (!$tab.hasClass('tab-inline')) $(this).css('width', w)
      // click event
      $(this).on('click', function () {
        var $tabContent = $(this).parents('.tab-title').siblings('.tab-content');
        var active = $(this).data('show')
        $(this).siblings('.item').removeClass('is-active');
        $(this).addClass('is-active')
        $tabContent.children('.item-wrap').removeClass('is-active')
        $tabContent.children('.item-wrap').eq(idx).addClass('is-active')
      })
    })
  })
}
/******************************************
# COMMON - POPUP
*******************************************/
function dimOpen(){
  var dim = "<div id='dim' class='dim'></div>"
  $('html').css('overflow', 'hidden')
  $('body').prepend(dim);
}
function dimClose(){
  $('html').removeAttr('style');
  $('#dim').remove();
}
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
  dimOpen();
  var $target = $(".popup-wrap[data-show='" + target + "']");
  $target.addClass('is-show');
  // if popup has swiper
  if ($target.find('.swiper-container')) {
    $target.find('.swiper-container').each(function () {
      $(this).get(0).swiper.update();
    })
  }
  // if tipNstory
  if($target.hasClass('popup-tns')){
    // tns($target);
    tns($target); // NEW FUNC
  }
}
function popupClose(target){
  var $target = $(".popup-wrap[data-show='" + target + "']");
  dimClose();
  $target.removeClass('is-show');
}
function alertOpen(target){
  var dim = "<div id='dimAlert' class='dim' style='z-index:1001'></div>"
  var target = $(".alert[data-show='" + target + "']");
  target.addClass('is-show').before(dim);
}
function alertClose(target){
  $(".alert[data-show='" + target + "']").removeClass('is-show');
  $('#dimAlert').remove();
  if($('#dim').length < 1){  
    $('html').removeAttr('style')
  }
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
  tns.$content.on('scroll', function(){
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
  // set control spacebar
  tns.$content.attr('tabindex', 0).focus();

  return tns;
}

function tnsProgress(idx, total){
  var width = idx / total * 100;
  $('.popup-tns .progress .is-active').css('width', width+'%');
  return ++idx;
}
// 스크롤시
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
# SWIPER - GNB init
*******************************************/
function swiperInit(index) {
  // swiper 선언
  var $swiper = new Swiper('.swiper-gnb' + (index - 1), {
    slidesPerView: 'auto',
    freeMode: true,
    freeModeSticky: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
  swiperMove($swiper);
}

function swiperMove($swiper) {
  // on 클래스가 있을 시, 해당 메뉴 활성화 및 이동
  var idx = $($swiper.$wrapperEl).children('.swiper-slide.on').index();
  $swiper.slideTo(idx, 0)
}

function swiperDestroy() {
  // gnb 하위에 있는 모든 swiper destroy
  $('.gnb-list .sub-container').each(function () {
    if ($(this)[0].swiper == 'object') $(this)[0].swiper.destroy();
  })
}
/******************************************
# GNB - dropdown init
*******************************************/
function dropdownEvent() {
  $('.top-bar .dropdown-group').each(function () {
    var $dw = $(this)
    $dw.find('button').on('click', function () {
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
}
/******************************************
# Page - Custom Dropdown
*******************************************/
function pageCustom(){
  var page = document.querySelector('.container') ? document.querySelector('.container').getAttribute('class').split(' ')[1] : undefined;
  switch (page){
    case 'mypage': 
      mypageEvent(); 
      break;
    case 'search-result': 
      resultEvent();
      break;
    default: 

    ;
  }
}
function mypageEvent(){
  // Mypage - 기능 dropdown (G80과 동일이라 수정 불가)
  $(".complete-wrap .dropdown-group").click(function () {
    $(this).toggleClass('is-open')
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