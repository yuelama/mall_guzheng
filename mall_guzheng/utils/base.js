function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.Base = void 0;

var t = function() {
    function e(e, t) {
        for (var a = 0; a < t.length; a++) {
            var r = t[a];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(t, a, r) {
        return a && e(t.prototype, a), r && e(t, r), t;
    };
}(), a = require("../utils/config.js"), r = (require("token.js"), getApp()), n = function() {
    function n() {
        e(this, n), this.baseRequestUrl = a.Config.restUrl;
    }
    return t(n, [ {
        key: "request",
        value: function(e) {
            var t = e.url, a = this;
            r.util.request({
                url: t,
                data: e.data,
                method: e.type,
                showLoading: !1,
                header: e.header,
                success: function(t) {
                    0 == t.data.errno && e.sCallback && e.sCallback(t.data.data);
                },
                fail: function(t) {
                    wx.showModal({
                        title: "警告！",
                        showCancel: !1,
                        content: t.data.message,
                        confirmText: "确认",
                        success: function(a) {
                            a.confirm && e.eCallback && e.eCallback(t.data.data);
                        }
                    }), a._processError(t);
                }
            });
        }
    }, {
        key: "_processError",
        value: function(e) {
            console.log(e);
        }
    }, {
        key: "getDataSet",
        value: function(e, t) {
            return e.currentTarget.dataset[t];
        }
    } ]), n;
}();

exports.Base = n;