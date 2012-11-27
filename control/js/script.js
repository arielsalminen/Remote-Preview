/*global jQuery */
(function ($) {
  /**
   * Returns full url to the parent directory.
   */
  var remotePreviewURL = function () {
    var path = window.location.pathname;
    // Account for different web server configurations.
    // Normalise to without trailing slash.
    if (path.slice(-1) === '/') {
      path = path.slice(0, -1);
    }
    return window.location.protocol + '//' + window.location.host + path.split('/').slice(0, -1).join('/');
  };

  var isUrl = function (url) {
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    return regexp.test(url);
  };

  var initUrlValue = function () {
    $.ajax({
      url: '../url.txt',
      cache: false,
      timeout: 100000,
      dataType: 'text',

      success: function (data) {
        // Remove whitespace from the beginning and end
        var newUrl = $.trim(data);
        if (isUrl(newUrl)) {
          $("#url").val(newUrl);
        }
      }
    });
  };

  var fh = {
    error: '',
    init: function () {
      $("#url-form").submit(function (e) {
        e.preventDefault();
        fh.resetForm();
        if (!fh.validate()) {
          fh.showError();
          return false;
        } else {
          $.ajax({
            url: './update.php',
            data: $('#url-form').serialize() + '&action=send',
            type: 'post',
            cache: false,
            dataType: 'text',
            success: function (data) {
              $('.form-feedback').addClass('form-success').text(data).fadeIn(200);
            },
            error: function (jqXhr) {
              $('.form-feedback').addClass('form-error').text(jqXhr.responseText || 'Error: Request failed.').fadeIn(200);
            }
          });
        }
      });
    },
    resetForm: function () {
      $('.form-feedback').hide().removeClass('form-success').removeClass('form-error').empty();
      fh.error = '';
    },
    validate: function () {
      if ($("#url").val().length <= 0) {
        fh.error = 'Looks like you forgot to enter a URL...';
        return false;
      }

      if (!(isUrl($("#url").val()))) {
        fh.error = "Hmmm, that doesn't look like a URL!";
        return false;
      }

      return true;
    },
    showError: function () {
      $('.form-feedback').addClass('form-error').text(fh.error).fadeIn(200);
    }
  };

  $(function () {
    initUrlValue();
    $("#preview-url").val(remotePreviewURL());
    $('.select-copy').on('click', function () {
      if (this.select) {
        this.select();
      }
    });
    fh.init();
  });

}(jQuery));