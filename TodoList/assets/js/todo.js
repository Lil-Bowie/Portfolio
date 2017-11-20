$("ul").on('click', 'li', function() {
  $(this).toggleClass('completed');
});

//Click on X to delete
$('ul').on('click', 'span', function(event) {
  $(this).parent().fadeOut(600, function() {
    $(this).remove();
  });
  event.stopPropagation();
});

$("input[type='text']").keypress(function(event) {
  //Check if user press is enter
  if (event.which === 13) {
    //New todo text
    var todoText = $(this).val();
    //New Li and add to ul
    $('ul').append("<li><span><i class='fa fa-trash'</span> " + todoText + ' </li>')
  }
});

$('.fa-calendar-plus-o').on('click', function() {
  $('input[type="text"]').fadeToggle(600);
});
