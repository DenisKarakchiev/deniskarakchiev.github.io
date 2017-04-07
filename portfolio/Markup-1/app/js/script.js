$('.header-form-images').magnificPopup({
  delegate: 'a',
  type: 'image',
  mainClass: 'mfp-fade',
  removalDelay: 500,
  closeBtnInside: true,
  closeOnContentClick: true
});

var $notebookImageOld = $('article .article-down img[alt="alt"]');
var $articleHeading = $('.article-down h2');
$articleHeading.addClass('hasnt-image');

function onSizing(){
  
  if (window.matchMedia('(max-width: 587px)').matches) {
    if($articleHeading.hasClass('hasnt-image')){
      if($('.article-down').is('img.notebookImageNew')) {
        $notebookImageNew.css("display", "block");
        $notebookImageOld.css("display", "none");
      } else {
        $articleHeading.after('<img src="img/article_notebook_ico.png" class="notebookImageNew"></img>');
        $notebookImageOld.css("display", "none");
      }
      $articleHeading.removeClass('hasnt-image');
    }

  $('article .article-down .col-md-6.col-xs-10').removeClass('col-xs-10').addClass('col-xs-12');

  } else {
    $articleHeading.addClass('hasnt-image');
    $('.notebookImageNew').css("display", "none"); 
    $notebookImageOld.css("display", "block");
    $('article .article-down .col-md-6.col-xs-12').removeClass('col-xs-12').addClass('col-xs-10');
  }
}

onSizing();
window.addEventListener('resize', onSizing);