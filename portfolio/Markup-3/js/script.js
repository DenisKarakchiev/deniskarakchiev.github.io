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

$('nav button').click(menuDropping);

function menuDropping() {

  var $menu = $('nav ul');
  var $menuItem = $('nav ul a');

  if ($menu.hasClass('dropped')) {
    $menu.css({
      'opacity': '1',
      "margin-top": '10px'
    }).animate({
      'opacity': '0',
      'margin-top': '0'
    });

    $menuItem.animate({
      "margin-top": "-25px",
      'opacity': 0
    }, 1000);

  } else {
    $menu.css({
      "opacity": "0"
    }).animate({
      'opacity': '1',
      'margin-top': '10px'
    }, 200, 'linear');

    $menuItem.css({
      'margin-top': '-35px',
      'opacity': '0'
    }).animate({
      'margin-top': '10px',
      'opacity': '1'
    }, 500, 'linear');
  };

  $menu.toggleClass('dropped');
}