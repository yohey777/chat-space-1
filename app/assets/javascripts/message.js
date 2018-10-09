$(function(){

  function buildHTML(message){
    if (message.content) {
      var messageContent = message.content
    } else {
      var messageContent = ""
    }
    if (message.image) {
      var messageImg = `<img src=${message.image}></img>`
    } else {
      var messageImg = ""
    }

    var html = `<li>
                  <div class="messages__user">
                    ${message.name}
                    <span class="time">${message.created_at}</span>
                  </div>
                  <div class="messages__text">
                    ${messageContent}
                  </div>
                  <div class="messages__img">
                    ${messageImg}
                  </div>
                </li>`
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages ul').append(html);
      $('img').css("width","200px");
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
      $('.form__button').prop('disabled', false);
    })
    .fail(function(){
      alert('error');
    })
  });

});