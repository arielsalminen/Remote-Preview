var remotePreviewURL = function(){
  var pathArray = window.location.pathname.split( '/' );
  var url = window.location.protocol + "//" + window.location.host + "/" + pathArray[pathArray.length - 3];
  return url;
};

var isUrl = function(url){
  var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  return regexp.test(url);
}

var previewURL = function(){
  $.ajax({
    url: '../url',
    cache: false,
    timeout: 100000,
    dataType: 'text',

    success: function (data) {
      // Remove whitespace from the beginning and end
      var newUrl = $.trim(data);
      if(isUrl(newUrl)) $("#url").val(newUrl);
    }
  });
};

var fh = {
  error: '',
  init: function(){
    $("#url-form").submit(function(e) {
      e.preventDefault();
      fh.resetForm();
      if(!fh.validate()) {
        fh.showError();
        return false;
      } else {
        $.ajax({
          url: './update.php',
          data: $('#url-form').serialize() + '&action=send',
          type: 'post',
          cache: false,
          dataType: 'html',
          success: function (data) {
            $('.form-feedback').addClass('form-success').html(data).fadeIn(200);
          }
        });
      }
    });
  },
  resetForm: function(){
    $('.form-feedback').fadeOut(200).removeClass('form-success').removeClass('form-error').html();
    fh.error = '';
  },
  validate: function(){
    if(!$("#url").val().length>0) {
    fh.error = 'Looks like you forgot to enter a URL...';
    return false;
  }

  if(!isUrl($("#url").val())) {
    fh.error = "Hmmm, that doesn't look like a URL!";
    return false;
  }

  return true;
  },
  showError: function(){
    $('.form-feedback').addClass('form-error').html(fh.error).fadeIn(200);
  }
};

$(function(){
  previewURL();
  $("#preview-url").html(remotePreviewURL());
  fh.init();
});