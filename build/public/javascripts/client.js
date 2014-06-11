(function($) {
  /*
  Returns full url to the parent directory.
  */

  var fh, getRemotePreviewURL, initUrlValue, isUrl;
  getRemotePreviewURL = function() {
    var path;
    path = window.location.pathname;
    if (path.slice(-1) === "/") {
      path = path.slice(0, -1);
    }
    return window.location.protocol + "//" + window.location.host + path.split("/").slice(0, -1).join("/");
  };
  isUrl = function(url) {
    var regexp;
    regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    return regexp.test(url);
  };
  initUrlValue = function() {
    return $.ajax({
      url: "../url.txt",
      cache: false,
      timeout: 100000,
      dataType: "text",
      success: function(data) {
        var newUrl;
        newUrl = $.trim(data);
        if (isUrl(newUrl)) {
          return $("#url").val(newUrl);
        }
      }
    });
  };
  fh = {
    init: function() {
      $("#preview-url").val(getRemotePreviewURL());
      initUrlValue();
      $(".select-copy").on("click", function() {
        if (this.select) {
          return this.select();
        }
      });
      return $("#url-form").off("submit").on("submit", function(e) {
        e.preventDefault();
        fh.resetForm();
        if (fh.validateForm()) {
          return $.ajax({
            url: "/update",
            data: $(this).serialize() + "&action=send",
            type: "post",
            cache: false,
            dataType: "text",
            success: function(data) {
              return fh.msgSuccess(data);
            },
            error: function(jqXhr) {
              return fh.msgError(jqXhr.responseText || "Error: Request failed.");
            }
          });
        }
      });
    },
    resetForm: function() {
      return fh.clearMsg();
    },
    validateForm: function() {
      var url;
      url = $("#url").val();
      if (!url) {
        fh.msgError("Looks like you forgot to enter a URL...");
        return false;
      }
      if (!isUrl(url)) {
        fh.msgError("Hmmm, that doesn't look like a URL!");
        return false;
      }
      return true;
    },
    msgError: function(message) {
      return $(".form-feedback").removeClass("form-success").addClass("form-error").text(message).fadeIn(200);
    },
    msgSuccess: function(message) {
      return $(".form-feedback").removeClass("form-error").addClass("form-success").text(message).fadeIn(200);
    },
    clearMsg: function() {
      return $(".form-feedback").hide().removeClass("form-success form-error").empty();
    }
  };
  return $(fh.init);
})(jQuery);

/*
Check if it's an URL.
@return boolean
*/

var isUrl, remotePreview;

isUrl = function(url) {
  var regexp;
  regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  return regexp.test(url);
};

remotePreview = function() {
  return $.ajax({
    url: "url.txt",
    cache: false,
    timeout: 100000,
    dataType: "text",
    success: function(data) {
      var newUrl;
      newUrl = $.trim(data);
      if (!isUrl(newUrl)) {
        setTimeout(remotePreview, 1100);
        console.log("error: there seems to be some errors in the URL");
        return;
      }
      if ($("iframe").attr("src") !== newUrl) {
        $("iframe").attr("src", newUrl);
      }
      return setTimeout(remotePreview, 1100);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      setTimeout(remotePreview, 2000);
      return console.log("error: " + textStatus + ", " + errorThrown);
    }
  });
};

$(remotePreview);
