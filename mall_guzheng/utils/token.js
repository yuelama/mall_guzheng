function e(e, r) {
    if (!(e instanceof r)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.Token = void 0;

var r = function() {
    function e(e, r) {
        for (var t = 0; t < r.length; t++) {
            var n = r[t];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(r, t, n) {
        return t && e(r.prototype, t), n && e(r, n), r;
    };
}(), t = require("config.js"), n = function() {
    function n() {
        e(this, n), this.verifyUrl = t.Config.restUrl + "token/verify", this.tokenUrl = t.Config.restUrl + "token/user";
    }
    return r(n, [ {
        key: "verify",
        value: function() {
            var e = wx.getStorageSync("token");
            e ? this._veirfyFromServer(e) : this.getTokenFromServer();
        }
    }, {
        key: "_veirfyFromServer",
        value: function(e) {
            var r = this;
            wx.request({
                url: r.verifyUrl,
                method: "POST",
                data: {
                    token: e
                },
                success: function(e) {
                    e.data.isValid || r.getTokenFromServer();
                }
            });
        }
    }, {
        key: "getTokenFromServer",
        value: function(e) {
            var r = this;
            wx.login({
                success: function(t) {
                    wx.request({
                        url: r.tokenUrl,
                        method: "POST",
                        data: {
                            code: t.code
                        },
                        success: function(r) {
                            wx.setStorageSync("token", r.data.token), e && e(r.data.token);
                        }
                    });
                }
            });
        }
    } ]), n;
}();

exports.Token = n;