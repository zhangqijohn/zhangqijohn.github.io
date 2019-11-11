function news() {
    this.render = function(temp, data) {
        var newsHtml = template(temp, data);
        $('.news').append(newsHtml)
    }
    return this
}