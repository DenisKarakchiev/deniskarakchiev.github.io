$('.main').onepage_scroll({
  sectionContainer: 'section',
  easing: 'ease',
  animationTime: 100,
  pagination: true,
  updateURL: false,
  beforeMove: function (index) {},
  afterMove: function (index) {},
  loop: false,
  keyboard: true,
  responsiveFallback: false,
  direction: 'vertical'
});

$('nav button').click(func);

function func() {

  if ($('nav ul').hasClass('dropped')) {
    $('nav ul').css({
      'opacity': '1',
      "margin-top": '10px'
    }).animate({
      'opacity': '0',
      'margin-top': '0'
    });

    $('nav ul a').animate({
      "margin-top": "-25px",
      'opacity': 0
    }, 1000);

  } else {
    $('nav ul').css({
      "opacity": "0"
    }).animate({
      'opacity':'1',
      'margin-top': '10px'
    }, 200, 'linear');

    $('section.header nav ul a').css({
      'margin-top': '-35px',
      'opacity': '0' 
    }).animate({
      'margin-top': '10px',
      'opacity': '1' 
    }, 500, 'linear');
  };

  $('nav ul').toggleClass('dropped');
}

// var mq = window.matchMedia("(max-width: 525px)");
// if (mq.matches) {
//   var $headerOne = $('.Branding h3');

//   $('.Branding .shape').replaceWith($('.Branding h3'));
//   $('.Branding h3').after('<div class="shape"></div>');

//   $
// } else {
//   //
// }