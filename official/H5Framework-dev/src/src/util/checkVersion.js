const checkVersion = (source, target) => {
    var cur = source.split('.'),
        old = target.split('.'),
        i = 0,
        len = cur.length;

    if(len !== old.length) return;

    for(; i<len; i++) {
        if(old[i] < cur[i]) {
            return -1
        }
    }

    return 1
}
export default checkVersion