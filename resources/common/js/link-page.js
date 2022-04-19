// 이미지 경로
$(window).on('load', function () {
  console.log('### 이미지 경로 변경 완료 ###')
  var localPath = '../../../../..';
  var devPath = 'http://52.79.239.107';
  $('img').each(function () {
    var src = $(this).attr('src')
    if (src.startsWith('/resources')) {
      $(this).attr('src', localPath + src)
    }
  })
})


// g70
// var sitemap = ["introduction", "design", "performance", "adas", "newtech", "your", "membership", "spec"]
// var ko = [1, 7, 4, 5, 5, 7, 1, 1]

// g70sb
var sitemap = ["introduction", "design", "trim", "infotainment", "safety", "appendix"]
var ko = [1, 8, 7, 3, 4, 5]

// gv70
// var sitemap = ["introduction", "design", "performance", "newtech", "convenience", "spec"]
// var ko = [1, 8, 9, 7, 6, 1]

// eG80
// var sitemap = ["introduction", "design", "performance", "feature", "infotainment", "your", "spec"]
// var ko = [1, 4, 9, 5, 4, 9, 1]

// 링크 이동
function linkMove(depth, idx) {
  window.location.href = '../' + depth + '/' + idx + '.html';
}

function nextLink(lang, depth, idx) {
  var current = sitemap.indexOf(depth);
  if (current == sitemap.length - 1) return;

  if (idx == lang[current]) {
    return linkMove(sitemap[current + 1], 1);
  } else {
    return linkMove(sitemap[current], idx + 1);
  }
}
function prevLink(lang, depth, idx) {
  var current = sitemap.indexOf(depth);
  if (current == sitemap.length - 1) return;

  if (idx == 1) {
    --current;
    return linkMove(sitemap[current], lang[current]);
  } else {
    return linkMove(sitemap[current], idx - 1);
  }
}
