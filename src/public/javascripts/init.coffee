#global $ 

###
Check if it's an URL.
@return boolean
###
isUrl = (url) ->
  regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
  regexp.test url

# Poll URLs.
remotePreview = ->
  $.ajax
    url: "url.txt"
    cache: false
    timeout: 100000
    dataType: "text"
    success: (data) ->
      
      # Remove whitespace from the beginning and end
      newUrl = $.trim(data)
      
      # Check URL against regexp and stop if false
      unless isUrl(newUrl)
        setTimeout remotePreview, 1100
        console.log "error: there seems to be some errors in the URL"
        return
      
      # If there is a new valid URL
      $("iframe").attr "src", newUrl  if $("iframe").attr("src") isnt newUrl
      
      # Watch for changes
      setTimeout remotePreview, 1100

    error: (jqXHR, textStatus, errorThrown) ->
      
      #jslint unparam: true 
      setTimeout remotePreview, 2000
      console.log "error: " + textStatus + ", " + errorThrown

$ remotePreview