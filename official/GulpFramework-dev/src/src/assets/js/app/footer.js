function footer() {
    this.run = function() {
        var ua = navigator.userAgent
        $('.home-page').append("<P>"+ua+"</P>").children('h1').text('Examples of GameOfficialWebsite')
    }
    return this
}