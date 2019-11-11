module.exports = {
    sum: function (a, b) {
        return a + b
    },
    createElement: function (tag, content) {
        var element = document.createElement(tag)
        element.innerHTML = content
        return element
    },
    log: function () {
        console.log("      _                      \n" +
            "  __ _/ |  ___ ___  _ __ ___  \n" +
            " / _` | | / __/ _ \\| '_ ` _ \\ \n" +
            "| (_| | || (_| (_) | | | | | |\n" +
            " \\__, |_(_)___\\___/|_| |_| |_|\n" +
            "    |_| ");

        console.log('Your Application is Running in PC-Framework');
    }
}