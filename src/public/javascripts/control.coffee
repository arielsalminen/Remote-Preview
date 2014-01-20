#global jQuery 
(($) ->
  
  ###
  Returns full url to the parent directory.
  ###
  getRemotePreviewURL = ->
    path = window.location.pathname
    
    # Account for different web server configurations.
    # Normalise to without trailing slash.
    path = path.slice(0, -1)  if path.slice(-1) is "/"
    window.location.protocol + "//" + window.location.host + path.split("/").slice(0, -1).join("/")
  isUrl = (url) ->
    regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    regexp.test url
  initUrlValue = ->
    $.ajax
      url: "../url.txt"
      cache: false
      timeout: 100000
      dataType: "text"
      success: (data) ->
        
        # Remove whitespace from the beginning and end
        newUrl = $.trim(data)
        $("#url").val newUrl  if isUrl(newUrl)

  fh =
    init: ->
      $("#preview-url").val getRemotePreviewURL()
      initUrlValue()
      $(".select-copy").on "click", ->
        @select()  if @select

      $("#url-form").off("submit").on "submit", (e) ->
        e.preventDefault()
        fh.resetForm()
        if fh.validateForm()
          $.ajax
            url: "/update"
            data: $(this).serialize() + "&action=send"
            type: "post"
            cache: false
            dataType: "text"
            success: (data) ->
              fh.msgSuccess data

            error: (jqXhr) ->
              fh.msgError jqXhr.responseText or "Error: Request failed."



    resetForm: ->
      fh.clearMsg()

    validateForm: ->
      url = $("#url").val()
      unless url
        fh.msgError "Looks like you forgot to enter a URL..."
        return false
      unless isUrl(url)
        fh.msgError "Hmmm, that doesn't look like a URL!"
        return false
      true

    msgError: (message) ->
      $(".form-feedback").removeClass("form-success").addClass("form-error").text(message).fadeIn 200

    msgSuccess: (message) ->
      $(".form-feedback").removeClass("form-error").addClass("form-success").text(message).fadeIn 200

    clearMsg: ->
      $(".form-feedback").hide().removeClass("form-success form-error").empty()

  $ fh.init
) jQuery