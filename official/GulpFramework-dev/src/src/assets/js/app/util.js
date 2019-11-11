;var util = {
    sum: function () {
        return a + b
    },
    extend: function (target, source) {
        for (var name in source) {
            target[name] = source
        }
        return target
    }
};