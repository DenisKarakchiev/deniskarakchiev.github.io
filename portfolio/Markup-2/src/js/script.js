//tabs
function openTab(evt, tabName){
  var i, tabcontent, tablinks;
  tabcontent = document.querySelectorAll('.tabcontent');
  for(i = 0; i < tabcontent.length; i++){
      tabcontent[i].style.display = 'none';
  }
  tablinks = document.querySelectorAll('.tablinks');
  for(i = 0; i < tablinks.length; i++){
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  document.getElementById(tabName).style.display = 'block';
  evt.currentTarget.className += ' active';
}
document.getElementById('defaultOpen').click();

//slider
var wallopEl = document.querySelector('.Wallop');
var wallop = new Wallop(wallopEl);

var paginationDots = Array.prototype.slice.call(document.querySelectorAll('.Wallop-dot'));

paginationDots.forEach(function (dotEl, index){
  dotEl.addEventListener('click', function(){
    wallop.goTo(index);
  });
});

wallop.on('change', function(event){
  removeClass(document.querySelector('.Wallop-dot--current'), 'Wallop-dot--current');
  addClass(paginationDots[event.detail.currentItemIndex], 'Wallop-dot--current');
});

//footer slider
var wallopFootEl = document.querySelector('.WallopFoot');
var wallopFoot = new Wallop(wallopFootEl);

//slider helpers
function addClass(element, className){
  if(!element) {return;}
  element.className = element.className.replace(/\s+$/gi, '') + ' ' + className;
}

function removeClass(element, className) {
  if (!element) { return; }
  element.className = element.className.replace(className, '');
}

//.active
var $nav = $(".nav"),
    $navItems = $nav.find("a");

$navItems.on("click", function(){
  $nav.children().removeClass("active");
  $(this).addClass("active");
});