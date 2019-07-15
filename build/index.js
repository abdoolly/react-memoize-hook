"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
exports.useMemoize = function (func, deps) {
    if (deps === void 0) { deps = []; }
    var ref = react_1.useRef();
    react_1.useEffect(function () {
        return function () { return (ref.current = {}); };
    }, deps);
    return react_1.useCallback(function () {
        if (!ref.current)
            ref.current = {};
        var cache = ref.current;
        var key = JSON.stringify(arguments);
        if (cache[key])
            return cache[key];
        var val = func.apply(this, arguments);
        cache[key] = val;
        return val;
    }, [func]);
};
//# sourceMappingURL=index.js.map