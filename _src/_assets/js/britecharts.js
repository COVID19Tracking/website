!(function(t, n) {
  'object' == typeof exports && 'object' == typeof module
    ? (module.exports = n())
    : 'function' == typeof define && define.amd
    ? define([], n)
    : 'object' == typeof exports
    ? (exports.britecharts = n())
    : (t.britecharts = n())
})(window, function() {
  return (function(t) {
    var n = {}
    function e(r) {
      if (n[r]) return n[r].exports
      var i = (n[r] = { i: r, l: !1, exports: {} })
      return t[r].call(i.exports, i, i.exports, e), (i.l = !0), i.exports
    }
    return (
      (e.m = t),
      (e.c = n),
      (e.d = function(t, n, r) {
        e.o(t, n) || Object.defineProperty(t, n, { enumerable: !0, get: r })
      }),
      (e.r = function(t) {
        'undefined' != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
          Object.defineProperty(t, '__esModule', { value: !0 })
      }),
      (e.t = function(t, n) {
        if ((1 & n && (t = e(t)), 8 & n)) return t
        if (4 & n && 'object' == typeof t && t && t.__esModule) return t
        var r = Object.create(null)
        if (
          (e.r(r),
          Object.defineProperty(r, 'default', { enumerable: !0, value: t }),
          2 & n && 'string' != typeof t)
        )
          for (var i in t)
            e.d(
              r,
              i,
              function(n) {
                return t[n]
              }.bind(null, i),
            )
        return r
      }),
      (e.n = function(t) {
        var n =
          t && t.__esModule
            ? function() {
                return t.default
              }
            : function() {
                return t
              }
        return e.d(n, 'a', n), n
      }),
      (e.o = function(t, n) {
        return Object.prototype.hasOwnProperty.call(t, n)
      }),
      (e.p = ''),
      e((e.s = 24))
    )
  })([
    function(t, n, e) {
      'use strict'
      e.r(n)
      var r = 'http://www.w3.org/1999/xhtml',
        i = {
          svg: 'http://www.w3.org/2000/svg',
          xhtml: r,
          xlink: 'http://www.w3.org/1999/xlink',
          xml: 'http://www.w3.org/XML/1998/namespace',
          xmlns: 'http://www.w3.org/2000/xmlns/',
        },
        a = function(t) {
          var n = (t += ''),
            e = n.indexOf(':')
          return (
            e >= 0 && 'xmlns' !== (n = t.slice(0, e)) && (t = t.slice(e + 1)),
            i.hasOwnProperty(n) ? { space: i[n], local: t } : t
          )
        }
      var o = function(t) {
          var n = a(t)
          return (n.local
            ? function(t) {
                return function() {
                  return this.ownerDocument.createElementNS(t.space, t.local)
                }
              }
            : function(t) {
                return function() {
                  var n = this.ownerDocument,
                    e = this.namespaceURI
                  return e === r && n.documentElement.namespaceURI === r
                    ? n.createElement(t)
                    : n.createElementNS(e, t)
                }
              })(n)
        },
        u = 0
      function c() {
        return new l()
      }
      function l() {
        this._ = '@' + (++u).toString(36)
      }
      l.prototype = c.prototype = {
        constructor: l,
        get: function(t) {
          for (var n = this._; !(n in t); ) if (!(t = t.parentNode)) return
          return t[n]
        },
        set: function(t, n) {
          return (t[this._] = n)
        },
        remove: function(t) {
          return this._ in t && delete t[this._]
        },
        toString: function() {
          return this._
        },
      }
      var s = function(t) {
        return function() {
          return this.matches(t)
        }
      }
      if ('undefined' != typeof document) {
        var f = document.documentElement
        if (!f.matches) {
          var h =
            f.webkitMatchesSelector ||
            f.msMatchesSelector ||
            f.mozMatchesSelector ||
            f.oMatchesSelector
          s = function(t) {
            return function() {
              return h.call(this, t)
            }
          }
        }
      }
      var d = s,
        p = {},
        g = null
      'undefined' != typeof document &&
        ('onmouseenter' in document.documentElement ||
          (p = { mouseenter: 'mouseover', mouseleave: 'mouseout' }))
      function v(t, n, e) {
        return (
          (t = y(t, n, e)),
          function(n) {
            var e = n.relatedTarget
            ;(e && (e === this || 8 & e.compareDocumentPosition(this))) ||
              t.call(this, n)
          }
        )
      }
      function y(t, n, e) {
        return function(r) {
          var i = g
          g = r
          try {
            t.call(this, this.__data__, n, e)
          } finally {
            g = i
          }
        }
      }
      function m(t) {
        return function() {
          var n = this.__on
          if (n) {
            for (var e, r = 0, i = -1, a = n.length; r < a; ++r)
              (e = n[r]),
                (t.type && e.type !== t.type) || e.name !== t.name
                  ? (n[++i] = e)
                  : this.removeEventListener(e.type, e.listener, e.capture)
            ++i ? (n.length = i) : delete this.__on
          }
        }
      }
      function x(t, n, e) {
        var r = p.hasOwnProperty(t.type) ? v : y
        return function(i, a, o) {
          var u,
            c = this.__on,
            l = r(n, a, o)
          if (c)
            for (var s = 0, f = c.length; s < f; ++s)
              if ((u = c[s]).type === t.type && u.name === t.name)
                return (
                  this.removeEventListener(u.type, u.listener, u.capture),
                  this.addEventListener(
                    u.type,
                    (u.listener = l),
                    (u.capture = e),
                  ),
                  void (u.value = n)
                )
          this.addEventListener(t.type, l, e),
            (u = {
              type: t.type,
              name: t.name,
              value: n,
              listener: l,
              capture: e,
            }),
            c ? c.push(u) : (this.__on = [u])
        }
      }
      function _(t, n, e, r) {
        var i = g
        ;(t.sourceEvent = g), (g = t)
        try {
          return n.apply(e, r)
        } finally {
          g = i
        }
      }
      var b = function() {
          for (var t, n = g; (t = n.sourceEvent); ) n = t
          return n
        },
        w = function(t, n) {
          var e = t.ownerSVGElement || t
          if (e.createSVGPoint) {
            var r = e.createSVGPoint()
            return (
              (r.x = n.clientX),
              (r.y = n.clientY),
              [(r = r.matrixTransform(t.getScreenCTM().inverse())).x, r.y]
            )
          }
          var i = t.getBoundingClientRect()
          return [
            n.clientX - i.left - t.clientLeft,
            n.clientY - i.top - t.clientTop,
          ]
        },
        M = function(t) {
          var n = b()
          return n.changedTouches && (n = n.changedTouches[0]), w(t, n)
        }
      function A() {}
      var k = function(t) {
        return null == t
          ? A
          : function() {
              return this.querySelector(t)
            }
      }
      function T() {
        return []
      }
      var O = function(t) {
          return null == t
            ? T
            : function() {
                return this.querySelectorAll(t)
              }
        },
        S = function(t) {
          return new Array(t.length)
        }
      function C(t, n) {
        ;(this.ownerDocument = t.ownerDocument),
          (this.namespaceURI = t.namespaceURI),
          (this._next = null),
          (this._parent = t),
          (this.__data__ = n)
      }
      C.prototype = {
        constructor: C,
        appendChild: function(t) {
          return this._parent.insertBefore(t, this._next)
        },
        insertBefore: function(t, n) {
          return this._parent.insertBefore(t, n)
        },
        querySelector: function(t) {
          return this._parent.querySelector(t)
        },
        querySelectorAll: function(t) {
          return this._parent.querySelectorAll(t)
        },
      }
      var E = '$'
      function N(t, n, e, r, i, a) {
        for (var o, u = 0, c = n.length, l = a.length; u < l; ++u)
          (o = n[u])
            ? ((o.__data__ = a[u]), (r[u] = o))
            : (e[u] = new C(t, a[u]))
        for (; u < c; ++u) (o = n[u]) && (i[u] = o)
      }
      function D(t, n, e, r, i, a, o) {
        var u,
          c,
          l,
          s = {},
          f = n.length,
          h = a.length,
          d = new Array(f)
        for (u = 0; u < f; ++u)
          (c = n[u]) &&
            ((d[u] = l = E + o.call(c, c.__data__, u, n)),
            l in s ? (i[u] = c) : (s[l] = c))
        for (u = 0; u < h; ++u)
          (c = s[(l = E + o.call(t, a[u], u, a))])
            ? ((r[u] = c), (c.__data__ = a[u]), (s[l] = null))
            : (e[u] = new C(t, a[u]))
        for (u = 0; u < f; ++u) (c = n[u]) && s[d[u]] === c && (i[u] = c)
      }
      function F(t, n) {
        return t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN
      }
      var L = function(t) {
        return (
          (t.ownerDocument && t.ownerDocument.defaultView) ||
          (t.document && t) ||
          t.defaultView
        )
      }
      function j(t, n) {
        return (
          t.style.getPropertyValue(n) ||
          L(t)
            .getComputedStyle(t, null)
            .getPropertyValue(n)
        )
      }
      function B(t) {
        return t.trim().split(/^|\s+/)
      }
      function I(t) {
        return t.classList || new P(t)
      }
      function P(t) {
        ;(this._node = t), (this._names = B(t.getAttribute('class') || ''))
      }
      function R(t, n) {
        for (var e = I(t), r = -1, i = n.length; ++r < i; ) e.add(n[r])
      }
      function U(t, n) {
        for (var e = I(t), r = -1, i = n.length; ++r < i; ) e.remove(n[r])
      }
      P.prototype = {
        add: function(t) {
          this._names.indexOf(t) < 0 &&
            (this._names.push(t),
            this._node.setAttribute('class', this._names.join(' ')))
        },
        remove: function(t) {
          var n = this._names.indexOf(t)
          n >= 0 &&
            (this._names.splice(n, 1),
            this._node.setAttribute('class', this._names.join(' ')))
        },
        contains: function(t) {
          return this._names.indexOf(t) >= 0
        },
      }
      function H() {
        this.textContent = ''
      }
      function z() {
        this.innerHTML = ''
      }
      function Y() {
        this.nextSibling && this.parentNode.appendChild(this)
      }
      function q() {
        this.previousSibling &&
          this.parentNode.insertBefore(this, this.parentNode.firstChild)
      }
      function G() {
        return null
      }
      function W() {
        var t = this.parentNode
        t && t.removeChild(this)
      }
      function X(t, n, e) {
        var r = L(t),
          i = r.CustomEvent
        'function' == typeof i
          ? (i = new i(n, e))
          : ((i = r.document.createEvent('Event')),
            e
              ? (i.initEvent(n, e.bubbles, e.cancelable), (i.detail = e.detail))
              : i.initEvent(n, !1, !1)),
          t.dispatchEvent(i)
      }
      var V = [null]
      function $(t, n) {
        ;(this._groups = t), (this._parents = n)
      }
      function Z() {
        return new $([[document.documentElement]], V)
      }
      $.prototype = Z.prototype = {
        constructor: $,
        select: function(t) {
          'function' != typeof t && (t = k(t))
          for (
            var n = this._groups, e = n.length, r = new Array(e), i = 0;
            i < e;
            ++i
          )
            for (
              var a,
                o,
                u = n[i],
                c = u.length,
                l = (r[i] = new Array(c)),
                s = 0;
              s < c;
              ++s
            )
              (a = u[s]) &&
                (o = t.call(a, a.__data__, s, u)) &&
                ('__data__' in a && (o.__data__ = a.__data__), (l[s] = o))
          return new $(r, this._parents)
        },
        selectAll: function(t) {
          'function' != typeof t && (t = O(t))
          for (
            var n = this._groups, e = n.length, r = [], i = [], a = 0;
            a < e;
            ++a
          )
            for (var o, u = n[a], c = u.length, l = 0; l < c; ++l)
              (o = u[l]) && (r.push(t.call(o, o.__data__, l, u)), i.push(o))
          return new $(r, i)
        },
        filter: function(t) {
          'function' != typeof t && (t = d(t))
          for (
            var n = this._groups, e = n.length, r = new Array(e), i = 0;
            i < e;
            ++i
          )
            for (
              var a, o = n[i], u = o.length, c = (r[i] = []), l = 0;
              l < u;
              ++l
            )
              (a = o[l]) && t.call(a, a.__data__, l, o) && c.push(a)
          return new $(r, this._parents)
        },
        data: function(t, n) {
          if (!t)
            return (
              (p = new Array(this.size())),
              (s = -1),
              this.each(function(t) {
                p[++s] = t
              }),
              p
            )
          var e,
            r = n ? D : N,
            i = this._parents,
            a = this._groups
          'function' != typeof t &&
            ((e = t),
            (t = function() {
              return e
            }))
          for (
            var o = a.length,
              u = new Array(o),
              c = new Array(o),
              l = new Array(o),
              s = 0;
            s < o;
            ++s
          ) {
            var f = i[s],
              h = a[s],
              d = h.length,
              p = t.call(f, f && f.__data__, s, i),
              g = p.length,
              v = (c[s] = new Array(g)),
              y = (u[s] = new Array(g))
            r(f, h, v, y, (l[s] = new Array(d)), p, n)
            for (var m, x, _ = 0, b = 0; _ < g; ++_)
              if ((m = v[_])) {
                for (_ >= b && (b = _ + 1); !(x = y[b]) && ++b < g; );
                m._next = x || null
              }
          }
          return ((u = new $(u, i))._enter = c), (u._exit = l), u
        },
        enter: function() {
          return new $(this._enter || this._groups.map(S), this._parents)
        },
        exit: function() {
          return new $(this._exit || this._groups.map(S), this._parents)
        },
        merge: function(t) {
          for (
            var n = this._groups,
              e = t._groups,
              r = n.length,
              i = e.length,
              a = Math.min(r, i),
              o = new Array(r),
              u = 0;
            u < a;
            ++u
          )
            for (
              var c,
                l = n[u],
                s = e[u],
                f = l.length,
                h = (o[u] = new Array(f)),
                d = 0;
              d < f;
              ++d
            )
              (c = l[d] || s[d]) && (h[d] = c)
          for (; u < r; ++u) o[u] = n[u]
          return new $(o, this._parents)
        },
        order: function() {
          for (var t = this._groups, n = -1, e = t.length; ++n < e; )
            for (var r, i = t[n], a = i.length - 1, o = i[a]; --a >= 0; )
              (r = i[a]) &&
                (o && o !== r.nextSibling && o.parentNode.insertBefore(r, o),
                (o = r))
          return this
        },
        sort: function(t) {
          function n(n, e) {
            return n && e ? t(n.__data__, e.__data__) : !n - !e
          }
          t || (t = F)
          for (
            var e = this._groups, r = e.length, i = new Array(r), a = 0;
            a < r;
            ++a
          ) {
            for (
              var o, u = e[a], c = u.length, l = (i[a] = new Array(c)), s = 0;
              s < c;
              ++s
            )
              (o = u[s]) && (l[s] = o)
            l.sort(n)
          }
          return new $(i, this._parents).order()
        },
        call: function() {
          var t = arguments[0]
          return (arguments[0] = this), t.apply(null, arguments), this
        },
        nodes: function() {
          var t = new Array(this.size()),
            n = -1
          return (
            this.each(function() {
              t[++n] = this
            }),
            t
          )
        },
        node: function() {
          for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
            for (var r = t[n], i = 0, a = r.length; i < a; ++i) {
              var o = r[i]
              if (o) return o
            }
          return null
        },
        size: function() {
          var t = 0
          return (
            this.each(function() {
              ++t
            }),
            t
          )
        },
        empty: function() {
          return !this.node()
        },
        each: function(t) {
          for (var n = this._groups, e = 0, r = n.length; e < r; ++e)
            for (var i, a = n[e], o = 0, u = a.length; o < u; ++o)
              (i = a[o]) && t.call(i, i.__data__, o, a)
          return this
        },
        attr: function(t, n) {
          var e = a(t)
          if (arguments.length < 2) {
            var r = this.node()
            return e.local
              ? r.getAttributeNS(e.space, e.local)
              : r.getAttribute(e)
          }
          return this.each(
            (null == n
              ? e.local
                ? function(t) {
                    return function() {
                      this.removeAttributeNS(t.space, t.local)
                    }
                  }
                : function(t) {
                    return function() {
                      this.removeAttribute(t)
                    }
                  }
              : 'function' == typeof n
              ? e.local
                ? function(t, n) {
                    return function() {
                      var e = n.apply(this, arguments)
                      null == e
                        ? this.removeAttributeNS(t.space, t.local)
                        : this.setAttributeNS(t.space, t.local, e)
                    }
                  }
                : function(t, n) {
                    return function() {
                      var e = n.apply(this, arguments)
                      null == e
                        ? this.removeAttribute(t)
                        : this.setAttribute(t, e)
                    }
                  }
              : e.local
              ? function(t, n) {
                  return function() {
                    this.setAttributeNS(t.space, t.local, n)
                  }
                }
              : function(t, n) {
                  return function() {
                    this.setAttribute(t, n)
                  }
                })(e, n),
          )
        },
        style: function(t, n, e) {
          return arguments.length > 1
            ? this.each(
                (null == n
                  ? function(t) {
                      return function() {
                        this.style.removeProperty(t)
                      }
                    }
                  : 'function' == typeof n
                  ? function(t, n, e) {
                      return function() {
                        var r = n.apply(this, arguments)
                        null == r
                          ? this.style.removeProperty(t)
                          : this.style.setProperty(t, r, e)
                      }
                    }
                  : function(t, n, e) {
                      return function() {
                        this.style.setProperty(t, n, e)
                      }
                    })(t, n, null == e ? '' : e),
              )
            : j(this.node(), t)
        },
        property: function(t, n) {
          return arguments.length > 1
            ? this.each(
                (null == n
                  ? function(t) {
                      return function() {
                        delete this[t]
                      }
                    }
                  : 'function' == typeof n
                  ? function(t, n) {
                      return function() {
                        var e = n.apply(this, arguments)
                        null == e ? delete this[t] : (this[t] = e)
                      }
                    }
                  : function(t, n) {
                      return function() {
                        this[t] = n
                      }
                    })(t, n),
              )
            : this.node()[t]
        },
        classed: function(t, n) {
          var e = B(t + '')
          if (arguments.length < 2) {
            for (var r = I(this.node()), i = -1, a = e.length; ++i < a; )
              if (!r.contains(e[i])) return !1
            return !0
          }
          return this.each(
            ('function' == typeof n
              ? function(t, n) {
                  return function() {
                    ;(n.apply(this, arguments) ? R : U)(this, t)
                  }
                }
              : n
              ? function(t) {
                  return function() {
                    R(this, t)
                  }
                }
              : function(t) {
                  return function() {
                    U(this, t)
                  }
                })(e, n),
          )
        },
        text: function(t) {
          return arguments.length
            ? this.each(
                null == t
                  ? H
                  : ('function' == typeof t
                      ? function(t) {
                          return function() {
                            var n = t.apply(this, arguments)
                            this.textContent = null == n ? '' : n
                          }
                        }
                      : function(t) {
                          return function() {
                            this.textContent = t
                          }
                        })(t),
              )
            : this.node().textContent
        },
        html: function(t) {
          return arguments.length
            ? this.each(
                null == t
                  ? z
                  : ('function' == typeof t
                      ? function(t) {
                          return function() {
                            var n = t.apply(this, arguments)
                            this.innerHTML = null == n ? '' : n
                          }
                        }
                      : function(t) {
                          return function() {
                            this.innerHTML = t
                          }
                        })(t),
              )
            : this.node().innerHTML
        },
        raise: function() {
          return this.each(Y)
        },
        lower: function() {
          return this.each(q)
        },
        append: function(t) {
          var n = 'function' == typeof t ? t : o(t)
          return this.select(function() {
            return this.appendChild(n.apply(this, arguments))
          })
        },
        insert: function(t, n) {
          var e = 'function' == typeof t ? t : o(t),
            r = null == n ? G : 'function' == typeof n ? n : k(n)
          return this.select(function() {
            return this.insertBefore(
              e.apply(this, arguments),
              r.apply(this, arguments) || null,
            )
          })
        },
        remove: function() {
          return this.each(W)
        },
        datum: function(t) {
          return arguments.length
            ? this.property('__data__', t)
            : this.node().__data__
        },
        on: function(t, n, e) {
          var r,
            i,
            a = (function(t) {
              return t
                .trim()
                .split(/^|\s+/)
                .map(function(t) {
                  var n = '',
                    e = t.indexOf('.')
                  return (
                    e >= 0 && ((n = t.slice(e + 1)), (t = t.slice(0, e))),
                    { type: t, name: n }
                  )
                })
            })(t + ''),
            o = a.length
          if (!(arguments.length < 2)) {
            for (u = n ? x : m, null == e && (e = !1), r = 0; r < o; ++r)
              this.each(u(a[r], n, e))
            return this
          }
          var u = this.node().__on
          if (u)
            for (var c, l = 0, s = u.length; l < s; ++l)
              for (r = 0, c = u[l]; r < o; ++r)
                if ((i = a[r]).type === c.type && i.name === c.name)
                  return c.value
        },
        dispatch: function(t, n) {
          return this.each(
            ('function' == typeof n
              ? function(t, n) {
                  return function() {
                    return X(this, t, n.apply(this, arguments))
                  }
                }
              : function(t, n) {
                  return function() {
                    return X(this, t, n)
                  }
                })(t, n),
          )
        },
      }
      var Q = Z,
        K = function(t) {
          return 'string' == typeof t
            ? new $([[document.querySelector(t)]], [document.documentElement])
            : new $([[t]], V)
        },
        J = function(t) {
          return 'string' == typeof t
            ? new $([document.querySelectorAll(t)], [document.documentElement])
            : new $([null == t ? [] : t], V)
        },
        tt = function(t, n, e) {
          arguments.length < 3 && ((e = n), (n = b().changedTouches))
          for (var r, i = 0, a = n ? n.length : 0; i < a; ++i)
            if ((r = n[i]).identifier === e) return w(t, r)
          return null
        },
        nt = function(t, n) {
          null == n && (n = b().touches)
          for (var e = 0, r = n ? n.length : 0, i = new Array(r); e < r; ++e)
            i[e] = w(t, n[e])
          return i
        }
      e.d(n, 'creator', function() {
        return o
      }),
        e.d(n, 'local', function() {
          return c
        }),
        e.d(n, 'matcher', function() {
          return d
        }),
        e.d(n, 'mouse', function() {
          return M
        }),
        e.d(n, 'namespace', function() {
          return a
        }),
        e.d(n, 'namespaces', function() {
          return i
        }),
        e.d(n, 'select', function() {
          return K
        }),
        e.d(n, 'selectAll', function() {
          return J
        }),
        e.d(n, 'selection', function() {
          return Q
        }),
        e.d(n, 'selector', function() {
          return k
        }),
        e.d(n, 'selectorAll', function() {
          return O
        }),
        e.d(n, 'style', function() {
          return j
        }),
        e.d(n, 'touch', function() {
          return tt
        }),
        e.d(n, 'touches', function() {
          return nt
        }),
        e.d(n, 'window', function() {
          return L
        }),
        e.d(n, 'event', function() {
          return g
        }),
        e.d(n, 'customEvent', function() {
          return _
        })
    },
    function(t, n, e) {
      'use strict'
      e.r(n)
      var r = function(t, n) {
          return t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN
        },
        i = function(t) {
          var n
          return (
            1 === t.length &&
              ((n = t),
              (t = function(t, e) {
                return r(n(t), e)
              })),
            {
              left: function(n, e, r, i) {
                for (
                  null == r && (r = 0), null == i && (i = n.length);
                  r < i;

                ) {
                  var a = (r + i) >>> 1
                  t(n[a], e) < 0 ? (r = a + 1) : (i = a)
                }
                return r
              },
              right: function(n, e, r, i) {
                for (
                  null == r && (r = 0), null == i && (i = n.length);
                  r < i;

                ) {
                  var a = (r + i) >>> 1
                  t(n[a], e) > 0 ? (i = a) : (r = a + 1)
                }
                return r
              },
            }
          )
        }
      var a = i(r),
        o = a.right,
        u = a.left,
        c = o,
        l = function(t, n) {
          null == n && (n = s)
          for (
            var e = 0, r = t.length - 1, i = t[0], a = new Array(r < 0 ? 0 : r);
            e < r;

          )
            a[e] = n(i, (i = t[++e]))
          return a
        }
      function s(t, n) {
        return [t, n]
      }
      var f = function(t, n, e) {
          var r,
            i,
            a,
            o,
            u = t.length,
            c = n.length,
            l = new Array(u * c)
          for (null == e && (e = s), r = a = 0; r < u; ++r)
            for (o = t[r], i = 0; i < c; ++i, ++a) l[a] = e(o, n[i])
          return l
        },
        h = function(t, n) {
          return n < t ? -1 : n > t ? 1 : n >= t ? 0 : NaN
        },
        d = function(t) {
          return null === t ? NaN : +t
        },
        p = function(t, n) {
          var e,
            r,
            i = t.length,
            a = 0,
            o = -1,
            u = 0,
            c = 0
          if (null == n)
            for (; ++o < i; )
              isNaN((e = d(t[o]))) || (c += (r = e - u) * (e - (u += r / ++a)))
          else
            for (; ++o < i; )
              isNaN((e = d(n(t[o], o, t)))) ||
                (c += (r = e - u) * (e - (u += r / ++a)))
          if (a > 1) return c / (a - 1)
        },
        g = function(t, n) {
          var e = p(t, n)
          return e ? Math.sqrt(e) : e
        },
        v = function(t, n) {
          var e,
            r,
            i,
            a = t.length,
            o = -1
          if (null == n) {
            for (; ++o < a; )
              if (null != (e = t[o]) && e >= e)
                for (r = i = e; ++o < a; )
                  null != (e = t[o]) && (r > e && (r = e), i < e && (i = e))
          } else
            for (; ++o < a; )
              if (null != (e = n(t[o], o, t)) && e >= e)
                for (r = i = e; ++o < a; )
                  null != (e = n(t[o], o, t)) &&
                    (r > e && (r = e), i < e && (i = e))
          return [r, i]
        },
        y = Array.prototype,
        m = y.slice,
        x = y.map,
        _ = function(t) {
          return function() {
            return t
          }
        },
        b = function(t) {
          return t
        },
        w = function(t, n, e) {
          ;(t = +t),
            (n = +n),
            (e =
              (i = arguments.length) < 2
                ? ((n = t), (t = 0), 1)
                : i < 3
                ? 1
                : +e)
          for (
            var r = -1,
              i = 0 | Math.max(0, Math.ceil((n - t) / e)),
              a = new Array(i);
            ++r < i;

          )
            a[r] = t + r * e
          return a
        },
        M = Math.sqrt(50),
        A = Math.sqrt(10),
        k = Math.sqrt(2),
        T = function(t, n, e) {
          var r,
            i,
            a,
            o = n < t,
            u = -1
          if (
            (o && ((r = t), (t = n), (n = r)),
            0 === (a = O(t, n, e)) || !isFinite(a))
          )
            return []
          if (a > 0)
            for (
              t = Math.ceil(t / a),
                n = Math.floor(n / a),
                i = new Array((r = Math.ceil(n - t + 1)));
              ++u < r;

            )
              i[u] = (t + u) * a
          else
            for (
              t = Math.floor(t * a),
                n = Math.ceil(n * a),
                i = new Array((r = Math.ceil(t - n + 1)));
              ++u < r;

            )
              i[u] = (t - u) / a
          return o && i.reverse(), i
        }
      function O(t, n, e) {
        var r = (n - t) / Math.max(0, e),
          i = Math.floor(Math.log(r) / Math.LN10),
          a = r / Math.pow(10, i)
        return i >= 0
          ? (a >= M ? 10 : a >= A ? 5 : a >= k ? 2 : 1) * Math.pow(10, i)
          : -Math.pow(10, -i) / (a >= M ? 10 : a >= A ? 5 : a >= k ? 2 : 1)
      }
      function S(t, n, e) {
        var r = Math.abs(n - t) / Math.max(0, e),
          i = Math.pow(10, Math.floor(Math.log(r) / Math.LN10)),
          a = r / i
        return (
          a >= M ? (i *= 10) : a >= A ? (i *= 5) : a >= k && (i *= 2),
          n < t ? -i : i
        )
      }
      var C = function(t) {
          return Math.ceil(Math.log(t.length) / Math.LN2) + 1
        },
        E = function() {
          var t = b,
            n = v,
            e = C
          function r(r) {
            var i,
              a,
              o = r.length,
              u = new Array(o)
            for (i = 0; i < o; ++i) u[i] = t(r[i], i, r)
            var l = n(u),
              s = l[0],
              f = l[1],
              h = e(u, s, f)
            Array.isArray(h) ||
              ((h = S(s, f, h)),
              (h = w(Math.ceil(s / h) * h, Math.floor(f / h) * h, h)))
            for (var d = h.length; h[0] <= s; ) h.shift(), --d
            for (; h[d - 1] > f; ) h.pop(), --d
            var p,
              g = new Array(d + 1)
            for (i = 0; i <= d; ++i)
              ((p = g[i] = []).x0 = i > 0 ? h[i - 1] : s),
                (p.x1 = i < d ? h[i] : f)
            for (i = 0; i < o; ++i)
              s <= (a = u[i]) && a <= f && g[c(h, a, 0, d)].push(r[i])
            return g
          }
          return (
            (r.value = function(n) {
              return arguments.length
                ? ((t = 'function' == typeof n ? n : _(n)), r)
                : t
            }),
            (r.domain = function(t) {
              return arguments.length
                ? ((n = 'function' == typeof t ? t : _([t[0], t[1]])), r)
                : n
            }),
            (r.thresholds = function(t) {
              return arguments.length
                ? ((e =
                    'function' == typeof t
                      ? t
                      : Array.isArray(t)
                      ? _(m.call(t))
                      : _(t)),
                  r)
                : e
            }),
            r
          )
        },
        N = function(t, n, e) {
          if ((null == e && (e = d), (r = t.length))) {
            if ((n = +n) <= 0 || r < 2) return +e(t[0], 0, t)
            if (n >= 1) return +e(t[r - 1], r - 1, t)
            var r,
              i = (r - 1) * n,
              a = Math.floor(i),
              o = +e(t[a], a, t)
            return o + (+e(t[a + 1], a + 1, t) - o) * (i - a)
          }
        },
        D = function(t, n, e) {
          return (
            (t = x.call(t, d).sort(r)),
            Math.ceil(
              (e - n) /
                (2 * (N(t, 0.75) - N(t, 0.25)) * Math.pow(t.length, -1 / 3)),
            )
          )
        },
        F = function(t, n, e) {
          return Math.ceil((e - n) / (3.5 * g(t) * Math.pow(t.length, -1 / 3)))
        },
        L = function(t, n) {
          var e,
            r,
            i = t.length,
            a = -1
          if (null == n) {
            for (; ++a < i; )
              if (null != (e = t[a]) && e >= e)
                for (r = e; ++a < i; ) null != (e = t[a]) && e > r && (r = e)
          } else
            for (; ++a < i; )
              if (null != (e = n(t[a], a, t)) && e >= e)
                for (r = e; ++a < i; )
                  null != (e = n(t[a], a, t)) && e > r && (r = e)
          return r
        },
        j = function(t, n) {
          var e,
            r = t.length,
            i = r,
            a = -1,
            o = 0
          if (null == n) for (; ++a < r; ) isNaN((e = d(t[a]))) ? --i : (o += e)
          else for (; ++a < r; ) isNaN((e = d(n(t[a], a, t)))) ? --i : (o += e)
          if (i) return o / i
        },
        B = function(t, n) {
          var e,
            i = t.length,
            a = -1,
            o = []
          if (null == n) for (; ++a < i; ) isNaN((e = d(t[a]))) || o.push(e)
          else for (; ++a < i; ) isNaN((e = d(n(t[a], a, t)))) || o.push(e)
          return N(o.sort(r), 0.5)
        },
        I = function(t) {
          for (var n, e, r, i = t.length, a = -1, o = 0; ++a < i; )
            o += t[a].length
          for (e = new Array(o); --i >= 0; )
            for (n = (r = t[i]).length; --n >= 0; ) e[--o] = r[n]
          return e
        },
        P = function(t, n) {
          var e,
            r,
            i = t.length,
            a = -1
          if (null == n) {
            for (; ++a < i; )
              if (null != (e = t[a]) && e >= e)
                for (r = e; ++a < i; ) null != (e = t[a]) && r > e && (r = e)
          } else
            for (; ++a < i; )
              if (null != (e = n(t[a], a, t)) && e >= e)
                for (r = e; ++a < i; )
                  null != (e = n(t[a], a, t)) && r > e && (r = e)
          return r
        },
        R = function(t, n) {
          for (var e = n.length, r = new Array(e); e--; ) r[e] = t[n[e]]
          return r
        },
        U = function(t, n) {
          if ((e = t.length)) {
            var e,
              i,
              a = 0,
              o = 0,
              u = t[o]
            for (null == n && (n = r); ++a < e; )
              (n((i = t[a]), u) < 0 || 0 !== n(u, u)) && ((u = i), (o = a))
            return 0 === n(u, u) ? o : void 0
          }
        },
        H = function(t, n, e) {
          for (
            var r, i, a = (null == e ? t.length : e) - (n = null == n ? 0 : +n);
            a;

          )
            (i = (Math.random() * a--) | 0),
              (r = t[a + n]),
              (t[a + n] = t[i + n]),
              (t[i + n] = r)
          return t
        },
        z = function(t, n) {
          var e,
            r = t.length,
            i = -1,
            a = 0
          if (null == n) for (; ++i < r; ) (e = +t[i]) && (a += e)
          else for (; ++i < r; ) (e = +n(t[i], i, t)) && (a += e)
          return a
        },
        Y = function(t) {
          if (!(i = t.length)) return []
          for (var n = -1, e = P(t, q), r = new Array(e); ++n < e; )
            for (var i, a = -1, o = (r[n] = new Array(i)); ++a < i; )
              o[a] = t[a][n]
          return r
        }
      function q(t) {
        return t.length
      }
      var G = function() {
        return Y(arguments)
      }
      e.d(n, 'bisect', function() {
        return c
      }),
        e.d(n, 'bisectRight', function() {
          return o
        }),
        e.d(n, 'bisectLeft', function() {
          return u
        }),
        e.d(n, 'ascending', function() {
          return r
        }),
        e.d(n, 'bisector', function() {
          return i
        }),
        e.d(n, 'cross', function() {
          return f
        }),
        e.d(n, 'descending', function() {
          return h
        }),
        e.d(n, 'deviation', function() {
          return g
        }),
        e.d(n, 'extent', function() {
          return v
        }),
        e.d(n, 'histogram', function() {
          return E
        }),
        e.d(n, 'thresholdFreedmanDiaconis', function() {
          return D
        }),
        e.d(n, 'thresholdScott', function() {
          return F
        }),
        e.d(n, 'thresholdSturges', function() {
          return C
        }),
        e.d(n, 'max', function() {
          return L
        }),
        e.d(n, 'mean', function() {
          return j
        }),
        e.d(n, 'median', function() {
          return B
        }),
        e.d(n, 'merge', function() {
          return I
        }),
        e.d(n, 'min', function() {
          return P
        }),
        e.d(n, 'pairs', function() {
          return l
        }),
        e.d(n, 'permute', function() {
          return R
        }),
        e.d(n, 'quantile', function() {
          return N
        }),
        e.d(n, 'range', function() {
          return w
        }),
        e.d(n, 'scan', function() {
          return U
        }),
        e.d(n, 'shuffle', function() {
          return H
        }),
        e.d(n, 'sum', function() {
          return z
        }),
        e.d(n, 'ticks', function() {
          return T
        }),
        e.d(n, 'tickIncrement', function() {
          return O
        }),
        e.d(n, 'tickStep', function() {
          return S
        }),
        e.d(n, 'transpose', function() {
          return Y
        }),
        e.d(n, 'variance', function() {
          return p
        }),
        e.d(n, 'zip', function() {
          return G
        })
    },
    function(t, n, e) {
      'use strict'
      e.r(n)
      var r = new Date(),
        i = new Date()
      function a(t, n, e, o) {
        function u(n) {
          return t((n = new Date(+n))), n
        }
        return (
          (u.floor = u),
          (u.ceil = function(e) {
            return t((e = new Date(e - 1))), n(e, 1), t(e), e
          }),
          (u.round = function(t) {
            var n = u(t),
              e = u.ceil(t)
            return t - n < e - t ? n : e
          }),
          (u.offset = function(t, e) {
            return n((t = new Date(+t)), null == e ? 1 : Math.floor(e)), t
          }),
          (u.range = function(e, r, i) {
            var a = []
            if (
              ((e = u.ceil(e)),
              (i = null == i ? 1 : Math.floor(i)),
              !(e < r && i > 0))
            )
              return a
            do {
              a.push(new Date(+e))
            } while ((n(e, i), t(e), e < r))
            return a
          }),
          (u.filter = function(e) {
            return a(
              function(n) {
                if (n >= n) for (; t(n), !e(n); ) n.setTime(n - 1)
              },
              function(t, r) {
                if (t >= t)
                  if (r < 0) for (; ++r <= 0; ) for (; n(t, -1), !e(t); );
                  else for (; --r >= 0; ) for (; n(t, 1), !e(t); );
              },
            )
          }),
          e &&
            ((u.count = function(n, a) {
              return (
                r.setTime(+n), i.setTime(+a), t(r), t(i), Math.floor(e(r, i))
              )
            }),
            (u.every = function(t) {
              return (
                (t = Math.floor(t)),
                isFinite(t) && t > 0
                  ? t > 1
                    ? u.filter(
                        o
                          ? function(n) {
                              return o(n) % t == 0
                            }
                          : function(n) {
                              return u.count(0, n) % t == 0
                            },
                      )
                    : u
                  : null
              )
            })),
          u
        )
      }
      var o = a(
        function() {},
        function(t, n) {
          t.setTime(+t + n)
        },
        function(t, n) {
          return n - t
        },
      )
      o.every = function(t) {
        return (
          (t = Math.floor(t)),
          isFinite(t) && t > 0
            ? t > 1
              ? a(
                  function(n) {
                    n.setTime(Math.floor(n / t) * t)
                  },
                  function(n, e) {
                    n.setTime(+n + e * t)
                  },
                  function(n, e) {
                    return (e - n) / t
                  },
                )
              : o
            : null
        )
      }
      var u = o,
        c = o.range,
        l = 6e4,
        s = 6048e5,
        f = a(
          function(t) {
            t.setTime(1e3 * Math.floor(t / 1e3))
          },
          function(t, n) {
            t.setTime(+t + 1e3 * n)
          },
          function(t, n) {
            return (n - t) / 1e3
          },
          function(t) {
            return t.getUTCSeconds()
          },
        ),
        h = f,
        d = f.range,
        p = a(
          function(t) {
            t.setTime(Math.floor(t / l) * l)
          },
          function(t, n) {
            t.setTime(+t + n * l)
          },
          function(t, n) {
            return (n - t) / l
          },
          function(t) {
            return t.getMinutes()
          },
        ),
        g = p,
        v = p.range,
        y = a(
          function(t) {
            var n = (t.getTimezoneOffset() * l) % 36e5
            n < 0 && (n += 36e5),
              t.setTime(36e5 * Math.floor((+t - n) / 36e5) + n)
          },
          function(t, n) {
            t.setTime(+t + 36e5 * n)
          },
          function(t, n) {
            return (n - t) / 36e5
          },
          function(t) {
            return t.getHours()
          },
        ),
        m = y,
        x = y.range,
        _ = a(
          function(t) {
            t.setHours(0, 0, 0, 0)
          },
          function(t, n) {
            t.setDate(t.getDate() + n)
          },
          function(t, n) {
            return (
              (n - t - (n.getTimezoneOffset() - t.getTimezoneOffset()) * l) /
              864e5
            )
          },
          function(t) {
            return t.getDate() - 1
          },
        ),
        b = _,
        w = _.range
      function M(t) {
        return a(
          function(n) {
            n.setDate(n.getDate() - ((n.getDay() + 7 - t) % 7)),
              n.setHours(0, 0, 0, 0)
          },
          function(t, n) {
            t.setDate(t.getDate() + 7 * n)
          },
          function(t, n) {
            return (
              (n - t - (n.getTimezoneOffset() - t.getTimezoneOffset()) * l) / s
            )
          },
        )
      }
      var A = M(0),
        k = M(1),
        T = M(2),
        O = M(3),
        S = M(4),
        C = M(5),
        E = M(6),
        N = A.range,
        D = k.range,
        F = T.range,
        L = O.range,
        j = S.range,
        B = C.range,
        I = E.range,
        P = a(
          function(t) {
            t.setDate(1), t.setHours(0, 0, 0, 0)
          },
          function(t, n) {
            t.setMonth(t.getMonth() + n)
          },
          function(t, n) {
            return (
              n.getMonth() -
              t.getMonth() +
              12 * (n.getFullYear() - t.getFullYear())
            )
          },
          function(t) {
            return t.getMonth()
          },
        ),
        R = P,
        U = P.range,
        H = a(
          function(t) {
            t.setMonth(0, 1), t.setHours(0, 0, 0, 0)
          },
          function(t, n) {
            t.setFullYear(t.getFullYear() + n)
          },
          function(t, n) {
            return n.getFullYear() - t.getFullYear()
          },
          function(t) {
            return t.getFullYear()
          },
        )
      H.every = function(t) {
        return isFinite((t = Math.floor(t))) && t > 0
          ? a(
              function(n) {
                n.setFullYear(Math.floor(n.getFullYear() / t) * t),
                  n.setMonth(0, 1),
                  n.setHours(0, 0, 0, 0)
              },
              function(n, e) {
                n.setFullYear(n.getFullYear() + e * t)
              },
            )
          : null
      }
      var z = H,
        Y = H.range,
        q = a(
          function(t) {
            t.setUTCSeconds(0, 0)
          },
          function(t, n) {
            t.setTime(+t + n * l)
          },
          function(t, n) {
            return (n - t) / l
          },
          function(t) {
            return t.getUTCMinutes()
          },
        ),
        G = q,
        W = q.range,
        X = a(
          function(t) {
            t.setUTCMinutes(0, 0, 0)
          },
          function(t, n) {
            t.setTime(+t + 36e5 * n)
          },
          function(t, n) {
            return (n - t) / 36e5
          },
          function(t) {
            return t.getUTCHours()
          },
        ),
        V = X,
        $ = X.range,
        Z = a(
          function(t) {
            t.setUTCHours(0, 0, 0, 0)
          },
          function(t, n) {
            t.setUTCDate(t.getUTCDate() + n)
          },
          function(t, n) {
            return (n - t) / 864e5
          },
          function(t) {
            return t.getUTCDate() - 1
          },
        ),
        Q = Z,
        K = Z.range
      function J(t) {
        return a(
          function(n) {
            n.setUTCDate(n.getUTCDate() - ((n.getUTCDay() + 7 - t) % 7)),
              n.setUTCHours(0, 0, 0, 0)
          },
          function(t, n) {
            t.setUTCDate(t.getUTCDate() + 7 * n)
          },
          function(t, n) {
            return (n - t) / s
          },
        )
      }
      var tt = J(0),
        nt = J(1),
        et = J(2),
        rt = J(3),
        it = J(4),
        at = J(5),
        ot = J(6),
        ut = tt.range,
        ct = nt.range,
        lt = et.range,
        st = rt.range,
        ft = it.range,
        ht = at.range,
        dt = ot.range,
        pt = a(
          function(t) {
            t.setUTCDate(1), t.setUTCHours(0, 0, 0, 0)
          },
          function(t, n) {
            t.setUTCMonth(t.getUTCMonth() + n)
          },
          function(t, n) {
            return (
              n.getUTCMonth() -
              t.getUTCMonth() +
              12 * (n.getUTCFullYear() - t.getUTCFullYear())
            )
          },
          function(t) {
            return t.getUTCMonth()
          },
        ),
        gt = pt,
        vt = pt.range,
        yt = a(
          function(t) {
            t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0)
          },
          function(t, n) {
            t.setUTCFullYear(t.getUTCFullYear() + n)
          },
          function(t, n) {
            return n.getUTCFullYear() - t.getUTCFullYear()
          },
          function(t) {
            return t.getUTCFullYear()
          },
        )
      yt.every = function(t) {
        return isFinite((t = Math.floor(t))) && t > 0
          ? a(
              function(n) {
                n.setUTCFullYear(Math.floor(n.getUTCFullYear() / t) * t),
                  n.setUTCMonth(0, 1),
                  n.setUTCHours(0, 0, 0, 0)
              },
              function(n, e) {
                n.setUTCFullYear(n.getUTCFullYear() + e * t)
              },
            )
          : null
      }
      var mt = yt,
        xt = yt.range
      e.d(n, 'timeInterval', function() {
        return a
      }),
        e.d(n, 'timeMillisecond', function() {
          return u
        }),
        e.d(n, 'timeMilliseconds', function() {
          return c
        }),
        e.d(n, 'utcMillisecond', function() {
          return u
        }),
        e.d(n, 'utcMilliseconds', function() {
          return c
        }),
        e.d(n, 'timeSecond', function() {
          return h
        }),
        e.d(n, 'timeSeconds', function() {
          return d
        }),
        e.d(n, 'utcSecond', function() {
          return h
        }),
        e.d(n, 'utcSeconds', function() {
          return d
        }),
        e.d(n, 'timeMinute', function() {
          return g
        }),
        e.d(n, 'timeMinutes', function() {
          return v
        }),
        e.d(n, 'timeHour', function() {
          return m
        }),
        e.d(n, 'timeHours', function() {
          return x
        }),
        e.d(n, 'timeDay', function() {
          return b
        }),
        e.d(n, 'timeDays', function() {
          return w
        }),
        e.d(n, 'timeWeek', function() {
          return A
        }),
        e.d(n, 'timeWeeks', function() {
          return N
        }),
        e.d(n, 'timeSunday', function() {
          return A
        }),
        e.d(n, 'timeSundays', function() {
          return N
        }),
        e.d(n, 'timeMonday', function() {
          return k
        }),
        e.d(n, 'timeMondays', function() {
          return D
        }),
        e.d(n, 'timeTuesday', function() {
          return T
        }),
        e.d(n, 'timeTuesdays', function() {
          return F
        }),
        e.d(n, 'timeWednesday', function() {
          return O
        }),
        e.d(n, 'timeWednesdays', function() {
          return L
        }),
        e.d(n, 'timeThursday', function() {
          return S
        }),
        e.d(n, 'timeThursdays', function() {
          return j
        }),
        e.d(n, 'timeFriday', function() {
          return C
        }),
        e.d(n, 'timeFridays', function() {
          return B
        }),
        e.d(n, 'timeSaturday', function() {
          return E
        }),
        e.d(n, 'timeSaturdays', function() {
          return I
        }),
        e.d(n, 'timeMonth', function() {
          return R
        }),
        e.d(n, 'timeMonths', function() {
          return U
        }),
        e.d(n, 'timeYear', function() {
          return z
        }),
        e.d(n, 'timeYears', function() {
          return Y
        }),
        e.d(n, 'utcMinute', function() {
          return G
        }),
        e.d(n, 'utcMinutes', function() {
          return W
        }),
        e.d(n, 'utcHour', function() {
          return V
        }),
        e.d(n, 'utcHours', function() {
          return $
        }),
        e.d(n, 'utcDay', function() {
          return Q
        }),
        e.d(n, 'utcDays', function() {
          return K
        }),
        e.d(n, 'utcWeek', function() {
          return tt
        }),
        e.d(n, 'utcWeeks', function() {
          return ut
        }),
        e.d(n, 'utcSunday', function() {
          return tt
        }),
        e.d(n, 'utcSundays', function() {
          return ut
        }),
        e.d(n, 'utcMonday', function() {
          return nt
        }),
        e.d(n, 'utcMondays', function() {
          return ct
        }),
        e.d(n, 'utcTuesday', function() {
          return et
        }),
        e.d(n, 'utcTuesdays', function() {
          return lt
        }),
        e.d(n, 'utcWednesday', function() {
          return rt
        }),
        e.d(n, 'utcWednesdays', function() {
          return st
        }),
        e.d(n, 'utcThursday', function() {
          return it
        }),
        e.d(n, 'utcThursdays', function() {
          return ft
        }),
        e.d(n, 'utcFriday', function() {
          return at
        }),
        e.d(n, 'utcFridays', function() {
          return ht
        }),
        e.d(n, 'utcSaturday', function() {
          return ot
        }),
        e.d(n, 'utcSaturdays', function() {
          return dt
        }),
        e.d(n, 'utcMonth', function() {
          return gt
        }),
        e.d(n, 'utcMonths', function() {
          return vt
        }),
        e.d(n, 'utcYear', function() {
          return mt
        }),
        e.d(n, 'utcYears', function() {
          return xt
        })
    },
    function(t, n, e) {
      'use strict'
      e.r(n)
      var r = function(t, n, e) {
        ;(t.prototype = n.prototype = e), (e.constructor = t)
      }
      function i(t, n) {
        var e = Object.create(t.prototype)
        for (var r in n) e[r] = n[r]
        return e
      }
      function a() {}
      var o = '\\s*([+-]?\\d+)\\s*',
        u = '\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*',
        c = '\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*',
        l = /^#([0-9a-f]{3})$/,
        s = /^#([0-9a-f]{6})$/,
        f = new RegExp('^rgb\\(' + [o, o, o] + '\\)$'),
        h = new RegExp('^rgb\\(' + [c, c, c] + '\\)$'),
        d = new RegExp('^rgba\\(' + [o, o, o, u] + '\\)$'),
        p = new RegExp('^rgba\\(' + [c, c, c, u] + '\\)$'),
        g = new RegExp('^hsl\\(' + [u, c, c] + '\\)$'),
        v = new RegExp('^hsla\\(' + [u, c, c, u] + '\\)$'),
        y = {
          aliceblue: 15792383,
          antiquewhite: 16444375,
          aqua: 65535,
          aquamarine: 8388564,
          azure: 15794175,
          beige: 16119260,
          bisque: 16770244,
          black: 0,
          blanchedalmond: 16772045,
          blue: 255,
          blueviolet: 9055202,
          brown: 10824234,
          burlywood: 14596231,
          cadetblue: 6266528,
          chartreuse: 8388352,
          chocolate: 13789470,
          coral: 16744272,
          cornflowerblue: 6591981,
          cornsilk: 16775388,
          crimson: 14423100,
          cyan: 65535,
          darkblue: 139,
          darkcyan: 35723,
          darkgoldenrod: 12092939,
          darkgray: 11119017,
          darkgreen: 25600,
          darkgrey: 11119017,
          darkkhaki: 12433259,
          darkmagenta: 9109643,
          darkolivegreen: 5597999,
          darkorange: 16747520,
          darkorchid: 10040012,
          darkred: 9109504,
          darksalmon: 15308410,
          darkseagreen: 9419919,
          darkslateblue: 4734347,
          darkslategray: 3100495,
          darkslategrey: 3100495,
          darkturquoise: 52945,
          darkviolet: 9699539,
          deeppink: 16716947,
          deepskyblue: 49151,
          dimgray: 6908265,
          dimgrey: 6908265,
          dodgerblue: 2003199,
          firebrick: 11674146,
          floralwhite: 16775920,
          forestgreen: 2263842,
          fuchsia: 16711935,
          gainsboro: 14474460,
          ghostwhite: 16316671,
          gold: 16766720,
          goldenrod: 14329120,
          gray: 8421504,
          green: 32768,
          greenyellow: 11403055,
          grey: 8421504,
          honeydew: 15794160,
          hotpink: 16738740,
          indianred: 13458524,
          indigo: 4915330,
          ivory: 16777200,
          khaki: 15787660,
          lavender: 15132410,
          lavenderblush: 16773365,
          lawngreen: 8190976,
          lemonchiffon: 16775885,
          lightblue: 11393254,
          lightcoral: 15761536,
          lightcyan: 14745599,
          lightgoldenrodyellow: 16448210,
          lightgray: 13882323,
          lightgreen: 9498256,
          lightgrey: 13882323,
          lightpink: 16758465,
          lightsalmon: 16752762,
          lightseagreen: 2142890,
          lightskyblue: 8900346,
          lightslategray: 7833753,
          lightslategrey: 7833753,
          lightsteelblue: 11584734,
          lightyellow: 16777184,
          lime: 65280,
          limegreen: 3329330,
          linen: 16445670,
          magenta: 16711935,
          maroon: 8388608,
          mediumaquamarine: 6737322,
          mediumblue: 205,
          mediumorchid: 12211667,
          mediumpurple: 9662683,
          mediumseagreen: 3978097,
          mediumslateblue: 8087790,
          mediumspringgreen: 64154,
          mediumturquoise: 4772300,
          mediumvioletred: 13047173,
          midnightblue: 1644912,
          mintcream: 16121850,
          mistyrose: 16770273,
          moccasin: 16770229,
          navajowhite: 16768685,
          navy: 128,
          oldlace: 16643558,
          olive: 8421376,
          olivedrab: 7048739,
          orange: 16753920,
          orangered: 16729344,
          orchid: 14315734,
          palegoldenrod: 15657130,
          palegreen: 10025880,
          paleturquoise: 11529966,
          palevioletred: 14381203,
          papayawhip: 16773077,
          peachpuff: 16767673,
          peru: 13468991,
          pink: 16761035,
          plum: 14524637,
          powderblue: 11591910,
          purple: 8388736,
          rebeccapurple: 6697881,
          red: 16711680,
          rosybrown: 12357519,
          royalblue: 4286945,
          saddlebrown: 9127187,
          salmon: 16416882,
          sandybrown: 16032864,
          seagreen: 3050327,
          seashell: 16774638,
          sienna: 10506797,
          silver: 12632256,
          skyblue: 8900331,
          slateblue: 6970061,
          slategray: 7372944,
          slategrey: 7372944,
          snow: 16775930,
          springgreen: 65407,
          steelblue: 4620980,
          tan: 13808780,
          teal: 32896,
          thistle: 14204888,
          tomato: 16737095,
          turquoise: 4251856,
          violet: 15631086,
          wheat: 16113331,
          white: 16777215,
          whitesmoke: 16119285,
          yellow: 16776960,
          yellowgreen: 10145074,
        }
      function m(t) {
        var n
        return (
          (t = (t + '').trim().toLowerCase()),
          (n = l.exec(t))
            ? new M(
                (((n = parseInt(n[1], 16)) >> 8) & 15) | ((n >> 4) & 240),
                ((n >> 4) & 15) | (240 & n),
                ((15 & n) << 4) | (15 & n),
                1,
              )
            : (n = s.exec(t))
            ? x(parseInt(n[1], 16))
            : (n = f.exec(t))
            ? new M(n[1], n[2], n[3], 1)
            : (n = h.exec(t))
            ? new M(
                (255 * n[1]) / 100,
                (255 * n[2]) / 100,
                (255 * n[3]) / 100,
                1,
              )
            : (n = d.exec(t))
            ? _(n[1], n[2], n[3], n[4])
            : (n = p.exec(t))
            ? _(
                (255 * n[1]) / 100,
                (255 * n[2]) / 100,
                (255 * n[3]) / 100,
                n[4],
              )
            : (n = g.exec(t))
            ? A(n[1], n[2] / 100, n[3] / 100, 1)
            : (n = v.exec(t))
            ? A(n[1], n[2] / 100, n[3] / 100, n[4])
            : y.hasOwnProperty(t)
            ? x(y[t])
            : 'transparent' === t
            ? new M(NaN, NaN, NaN, 0)
            : null
        )
      }
      function x(t) {
        return new M((t >> 16) & 255, (t >> 8) & 255, 255 & t, 1)
      }
      function _(t, n, e, r) {
        return r <= 0 && (t = n = e = NaN), new M(t, n, e, r)
      }
      function b(t) {
        return (
          t instanceof a || (t = m(t)),
          t ? new M((t = t.rgb()).r, t.g, t.b, t.opacity) : new M()
        )
      }
      function w(t, n, e, r) {
        return 1 === arguments.length ? b(t) : new M(t, n, e, null == r ? 1 : r)
      }
      function M(t, n, e, r) {
        ;(this.r = +t), (this.g = +n), (this.b = +e), (this.opacity = +r)
      }
      function A(t, n, e, r) {
        return (
          r <= 0
            ? (t = n = e = NaN)
            : e <= 0 || e >= 1
            ? (t = n = NaN)
            : n <= 0 && (t = NaN),
          new T(t, n, e, r)
        )
      }
      function k(t, n, e, r) {
        return 1 === arguments.length
          ? (function(t) {
              if (t instanceof T) return new T(t.h, t.s, t.l, t.opacity)
              if ((t instanceof a || (t = m(t)), !t)) return new T()
              if (t instanceof T) return t
              var n = (t = t.rgb()).r / 255,
                e = t.g / 255,
                r = t.b / 255,
                i = Math.min(n, e, r),
                o = Math.max(n, e, r),
                u = NaN,
                c = o - i,
                l = (o + i) / 2
              return (
                c
                  ? ((u =
                      n === o
                        ? (e - r) / c + 6 * (e < r)
                        : e === o
                        ? (r - n) / c + 2
                        : (n - e) / c + 4),
                    (c /= l < 0.5 ? o + i : 2 - o - i),
                    (u *= 60))
                  : (c = l > 0 && l < 1 ? 0 : u),
                new T(u, c, l, t.opacity)
              )
            })(t)
          : new T(t, n, e, null == r ? 1 : r)
      }
      function T(t, n, e, r) {
        ;(this.h = +t), (this.s = +n), (this.l = +e), (this.opacity = +r)
      }
      function O(t, n, e) {
        return (
          255 *
          (t < 60
            ? n + ((e - n) * t) / 60
            : t < 180
            ? e
            : t < 240
            ? n + ((e - n) * (240 - t)) / 60
            : n)
        )
      }
      r(a, m, {
        displayable: function() {
          return this.rgb().displayable()
        },
        toString: function() {
          return this.rgb() + ''
        },
      }),
        r(
          M,
          w,
          i(a, {
            brighter: function(t) {
              return (
                (t = null == t ? 1 / 0.7 : Math.pow(1 / 0.7, t)),
                new M(this.r * t, this.g * t, this.b * t, this.opacity)
              )
            },
            darker: function(t) {
              return (
                (t = null == t ? 0.7 : Math.pow(0.7, t)),
                new M(this.r * t, this.g * t, this.b * t, this.opacity)
              )
            },
            rgb: function() {
              return this
            },
            displayable: function() {
              return (
                0 <= this.r &&
                this.r <= 255 &&
                0 <= this.g &&
                this.g <= 255 &&
                0 <= this.b &&
                this.b <= 255 &&
                0 <= this.opacity &&
                this.opacity <= 1
              )
            },
            toString: function() {
              var t = this.opacity
              return (
                (1 === (t = isNaN(t) ? 1 : Math.max(0, Math.min(1, t)))
                  ? 'rgb('
                  : 'rgba(') +
                Math.max(0, Math.min(255, Math.round(this.r) || 0)) +
                ', ' +
                Math.max(0, Math.min(255, Math.round(this.g) || 0)) +
                ', ' +
                Math.max(0, Math.min(255, Math.round(this.b) || 0)) +
                (1 === t ? ')' : ', ' + t + ')')
              )
            },
          }),
        ),
        r(
          T,
          k,
          i(a, {
            brighter: function(t) {
              return (
                (t = null == t ? 1 / 0.7 : Math.pow(1 / 0.7, t)),
                new T(this.h, this.s, this.l * t, this.opacity)
              )
            },
            darker: function(t) {
              return (
                (t = null == t ? 0.7 : Math.pow(0.7, t)),
                new T(this.h, this.s, this.l * t, this.opacity)
              )
            },
            rgb: function() {
              var t = (this.h % 360) + 360 * (this.h < 0),
                n = isNaN(t) || isNaN(this.s) ? 0 : this.s,
                e = this.l,
                r = e + (e < 0.5 ? e : 1 - e) * n,
                i = 2 * e - r
              return new M(
                O(t >= 240 ? t - 240 : t + 120, i, r),
                O(t, i, r),
                O(t < 120 ? t + 240 : t - 120, i, r),
                this.opacity,
              )
            },
            displayable: function() {
              return (
                ((0 <= this.s && this.s <= 1) || isNaN(this.s)) &&
                0 <= this.l &&
                this.l <= 1 &&
                0 <= this.opacity &&
                this.opacity <= 1
              )
            },
          }),
        )
      var S = Math.PI / 180,
        C = 180 / Math.PI,
        E = 0.95047,
        N = 1,
        D = 1.08883,
        F = 4 / 29,
        L = 6 / 29,
        j = 3 * L * L,
        B = L * L * L
      function I(t) {
        if (t instanceof R) return new R(t.l, t.a, t.b, t.opacity)
        if (t instanceof G) {
          var n = t.h * S
          return new R(t.l, Math.cos(n) * t.c, Math.sin(n) * t.c, t.opacity)
        }
        t instanceof M || (t = b(t))
        var e = Y(t.r),
          r = Y(t.g),
          i = Y(t.b),
          a = U((0.4124564 * e + 0.3575761 * r + 0.1804375 * i) / E),
          o = U((0.2126729 * e + 0.7151522 * r + 0.072175 * i) / N)
        return new R(
          116 * o - 16,
          500 * (a - o),
          200 * (o - U((0.0193339 * e + 0.119192 * r + 0.9503041 * i) / D)),
          t.opacity,
        )
      }
      function P(t, n, e, r) {
        return 1 === arguments.length ? I(t) : new R(t, n, e, null == r ? 1 : r)
      }
      function R(t, n, e, r) {
        ;(this.l = +t), (this.a = +n), (this.b = +e), (this.opacity = +r)
      }
      function U(t) {
        return t > B ? Math.pow(t, 1 / 3) : t / j + F
      }
      function H(t) {
        return t > L ? t * t * t : j * (t - F)
      }
      function z(t) {
        return (
          255 *
          (t <= 0.0031308 ? 12.92 * t : 1.055 * Math.pow(t, 1 / 2.4) - 0.055)
        )
      }
      function Y(t) {
        return (t /= 255) <= 0.04045
          ? t / 12.92
          : Math.pow((t + 0.055) / 1.055, 2.4)
      }
      function q(t, n, e, r) {
        return 1 === arguments.length
          ? (function(t) {
              if (t instanceof G) return new G(t.h, t.c, t.l, t.opacity)
              t instanceof R || (t = I(t))
              var n = Math.atan2(t.b, t.a) * C
              return new G(
                n < 0 ? n + 360 : n,
                Math.sqrt(t.a * t.a + t.b * t.b),
                t.l,
                t.opacity,
              )
            })(t)
          : new G(t, n, e, null == r ? 1 : r)
      }
      function G(t, n, e, r) {
        ;(this.h = +t), (this.c = +n), (this.l = +e), (this.opacity = +r)
      }
      r(
        R,
        P,
        i(a, {
          brighter: function(t) {
            return new R(
              this.l + 18 * (null == t ? 1 : t),
              this.a,
              this.b,
              this.opacity,
            )
          },
          darker: function(t) {
            return new R(
              this.l - 18 * (null == t ? 1 : t),
              this.a,
              this.b,
              this.opacity,
            )
          },
          rgb: function() {
            var t = (this.l + 16) / 116,
              n = isNaN(this.a) ? t : t + this.a / 500,
              e = isNaN(this.b) ? t : t - this.b / 200
            return (
              (t = N * H(t)),
              new M(
                z(
                  3.2404542 * (n = E * H(n)) -
                    1.5371385 * t -
                    0.4985314 * (e = D * H(e)),
                ),
                z(-0.969266 * n + 1.8760108 * t + 0.041556 * e),
                z(0.0556434 * n - 0.2040259 * t + 1.0572252 * e),
                this.opacity,
              )
            )
          },
        }),
      ),
        r(
          G,
          q,
          i(a, {
            brighter: function(t) {
              return new G(
                this.h,
                this.c,
                this.l + 18 * (null == t ? 1 : t),
                this.opacity,
              )
            },
            darker: function(t) {
              return new G(
                this.h,
                this.c,
                this.l - 18 * (null == t ? 1 : t),
                this.opacity,
              )
            },
            rgb: function() {
              return I(this).rgb()
            },
          }),
        )
      var W = -0.14861,
        X = 1.78277,
        V = -0.29227,
        $ = -0.90649,
        Z = 1.97294,
        Q = Z * $,
        K = Z * X,
        J = X * V - $ * W
      function tt(t, n, e, r) {
        return 1 === arguments.length
          ? (function(t) {
              if (t instanceof nt) return new nt(t.h, t.s, t.l, t.opacity)
              t instanceof M || (t = b(t))
              var n = t.r / 255,
                e = t.g / 255,
                r = t.b / 255,
                i = (J * r + Q * n - K * e) / (J + Q - K),
                a = r - i,
                o = (Z * (e - i) - V * a) / $,
                u = Math.sqrt(o * o + a * a) / (Z * i * (1 - i)),
                c = u ? Math.atan2(o, a) * C - 120 : NaN
              return new nt(c < 0 ? c + 360 : c, u, i, t.opacity)
            })(t)
          : new nt(t, n, e, null == r ? 1 : r)
      }
      function nt(t, n, e, r) {
        ;(this.h = +t), (this.s = +n), (this.l = +e), (this.opacity = +r)
      }
      r(
        nt,
        tt,
        i(a, {
          brighter: function(t) {
            return (
              (t = null == t ? 1 / 0.7 : Math.pow(1 / 0.7, t)),
              new nt(this.h, this.s, this.l * t, this.opacity)
            )
          },
          darker: function(t) {
            return (
              (t = null == t ? 0.7 : Math.pow(0.7, t)),
              new nt(this.h, this.s, this.l * t, this.opacity)
            )
          },
          rgb: function() {
            var t = isNaN(this.h) ? 0 : (this.h + 120) * S,
              n = +this.l,
              e = isNaN(this.s) ? 0 : this.s * n * (1 - n),
              r = Math.cos(t),
              i = Math.sin(t)
            return new M(
              255 * (n + e * (W * r + X * i)),
              255 * (n + e * (V * r + $ * i)),
              255 * (n + e * (Z * r)),
              this.opacity,
            )
          },
        }),
      ),
        e.d(n, 'color', function() {
          return m
        }),
        e.d(n, 'rgb', function() {
          return w
        }),
        e.d(n, 'hsl', function() {
          return k
        }),
        e.d(n, 'lab', function() {
          return P
        }),
        e.d(n, 'hcl', function() {
          return q
        }),
        e.d(n, 'cubehelix', function() {
          return tt
        })
    },
    function(t, n, e) {
      'use strict'
      e.r(n)
      var r = e(3)
      function i(t, n, e, r, i) {
        var a = t * t,
          o = a * t
        return (
          ((1 - 3 * t + 3 * a - o) * n +
            (4 - 6 * a + 3 * o) * e +
            (1 + 3 * t + 3 * a - 3 * o) * r +
            o * i) /
          6
        )
      }
      var a = function(t) {
          var n = t.length - 1
          return function(e) {
            var r =
                e <= 0
                  ? (e = 0)
                  : e >= 1
                  ? ((e = 1), n - 1)
                  : Math.floor(e * n),
              a = t[r],
              o = t[r + 1],
              u = r > 0 ? t[r - 1] : 2 * a - o,
              c = r < n - 1 ? t[r + 2] : 2 * o - a
            return i((e - r / n) * n, u, a, o, c)
          }
        },
        o = function(t) {
          var n = t.length
          return function(e) {
            var r = Math.floor(((e %= 1) < 0 ? ++e : e) * n),
              a = t[(r + n - 1) % n],
              o = t[r % n],
              u = t[(r + 1) % n],
              c = t[(r + 2) % n]
            return i((e - r / n) * n, a, o, u, c)
          }
        },
        u = function(t) {
          return function() {
            return t
          }
        }
      function c(t, n) {
        return function(e) {
          return t + e * n
        }
      }
      function l(t, n) {
        var e = n - t
        return e
          ? c(t, e > 180 || e < -180 ? e - 360 * Math.round(e / 360) : e)
          : u(isNaN(t) ? n : t)
      }
      function s(t) {
        return 1 == (t = +t)
          ? f
          : function(n, e) {
              return e - n
                ? (function(t, n, e) {
                    return (
                      (t = Math.pow(t, e)),
                      (n = Math.pow(n, e) - t),
                      (e = 1 / e),
                      function(r) {
                        return Math.pow(t + r * n, e)
                      }
                    )
                  })(n, e, t)
                : u(isNaN(n) ? e : n)
            }
      }
      function f(t, n) {
        var e = n - t
        return e ? c(t, e) : u(isNaN(t) ? n : t)
      }
      var h = (function t(n) {
        var e = s(n)
        function i(t, n) {
          var i = e((t = Object(r.rgb)(t)).r, (n = Object(r.rgb)(n)).r),
            a = e(t.g, n.g),
            o = e(t.b, n.b),
            u = f(t.opacity, n.opacity)
          return function(n) {
            return (
              (t.r = i(n)),
              (t.g = a(n)),
              (t.b = o(n)),
              (t.opacity = u(n)),
              t + ''
            )
          }
        }
        return (i.gamma = t), i
      })(1)
      function d(t) {
        return function(n) {
          var e,
            i,
            a = n.length,
            o = new Array(a),
            u = new Array(a),
            c = new Array(a)
          for (e = 0; e < a; ++e)
            (i = Object(r.rgb)(n[e])),
              (o[e] = i.r || 0),
              (u[e] = i.g || 0),
              (c[e] = i.b || 0)
          return (
            (o = t(o)),
            (u = t(u)),
            (c = t(c)),
            (i.opacity = 1),
            function(t) {
              return (i.r = o(t)), (i.g = u(t)), (i.b = c(t)), i + ''
            }
          )
        }
      }
      var p = d(a),
        g = d(o),
        v = function(t, n) {
          var e,
            r = n ? n.length : 0,
            i = t ? Math.min(r, t.length) : 0,
            a = new Array(r),
            o = new Array(r)
          for (e = 0; e < i; ++e) a[e] = O(t[e], n[e])
          for (; e < r; ++e) o[e] = n[e]
          return function(t) {
            for (e = 0; e < i; ++e) o[e] = a[e](t)
            return o
          }
        },
        y = function(t, n) {
          var e = new Date()
          return (
            (n -= t = +t),
            function(r) {
              return e.setTime(t + n * r), e
            }
          )
        },
        m = function(t, n) {
          return (
            (n -= t = +t),
            function(e) {
              return t + n * e
            }
          )
        },
        x = function(t, n) {
          var e,
            r = {},
            i = {}
          for (e in ((null !== t && 'object' == typeof t) || (t = {}),
          (null !== n && 'object' == typeof n) || (n = {}),
          n))
            e in t ? (r[e] = O(t[e], n[e])) : (i[e] = n[e])
          return function(t) {
            for (e in r) i[e] = r[e](t)
            return i
          }
        },
        _ = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
        b = new RegExp(_.source, 'g')
      var w,
        M,
        A,
        k,
        T = function(t, n) {
          var e,
            r,
            i,
            a = (_.lastIndex = b.lastIndex = 0),
            o = -1,
            u = [],
            c = []
          for (t += '', n += ''; (e = _.exec(t)) && (r = b.exec(n)); )
            (i = r.index) > a &&
              ((i = n.slice(a, i)), u[o] ? (u[o] += i) : (u[++o] = i)),
              (e = e[0]) === (r = r[0])
                ? u[o]
                  ? (u[o] += r)
                  : (u[++o] = r)
                : ((u[++o] = null), c.push({ i: o, x: m(e, r) })),
              (a = b.lastIndex)
          return (
            a < n.length &&
              ((i = n.slice(a)), u[o] ? (u[o] += i) : (u[++o] = i)),
            u.length < 2
              ? c[0]
                ? (function(t) {
                    return function(n) {
                      return t(n) + ''
                    }
                  })(c[0].x)
                : (function(t) {
                    return function() {
                      return t
                    }
                  })(n)
              : ((n = c.length),
                function(t) {
                  for (var e, r = 0; r < n; ++r) u[(e = c[r]).i] = e.x(t)
                  return u.join('')
                })
          )
        },
        O = function(t, n) {
          var e,
            i = typeof n
          return null == n || 'boolean' === i
            ? u(n)
            : ('number' === i
                ? m
                : 'string' === i
                ? (e = Object(r.color)(n))
                  ? ((n = e), h)
                  : T
                : n instanceof r.color
                ? h
                : n instanceof Date
                ? y
                : Array.isArray(n)
                ? v
                : ('function' != typeof n.valueOf &&
                    'function' != typeof n.toString) ||
                  isNaN(n)
                ? x
                : m)(t, n)
        },
        S = function(t, n) {
          return (
            (n -= t = +t),
            function(e) {
              return Math.round(t + n * e)
            }
          )
        },
        C = 180 / Math.PI,
        E = {
          translateX: 0,
          translateY: 0,
          rotate: 0,
          skewX: 0,
          scaleX: 1,
          scaleY: 1,
        },
        N = function(t, n, e, r, i, a) {
          var o, u, c
          return (
            (o = Math.sqrt(t * t + n * n)) && ((t /= o), (n /= o)),
            (c = t * e + n * r) && ((e -= t * c), (r -= n * c)),
            (u = Math.sqrt(e * e + r * r)) && ((e /= u), (r /= u), (c /= u)),
            t * r < n * e && ((t = -t), (n = -n), (c = -c), (o = -o)),
            {
              translateX: i,
              translateY: a,
              rotate: Math.atan2(n, t) * C,
              skewX: Math.atan(c) * C,
              scaleX: o,
              scaleY: u,
            }
          )
        }
      function D(t, n, e, r) {
        function i(t) {
          return t.length ? t.pop() + ' ' : ''
        }
        return function(a, o) {
          var u = [],
            c = []
          return (
            (a = t(a)),
            (o = t(o)),
            (function(t, r, i, a, o, u) {
              if (t !== i || r !== a) {
                var c = o.push('translate(', null, n, null, e)
                u.push({ i: c - 4, x: m(t, i) }, { i: c - 2, x: m(r, a) })
              } else (i || a) && o.push('translate(' + i + n + a + e)
            })(a.translateX, a.translateY, o.translateX, o.translateY, u, c),
            (function(t, n, e, a) {
              t !== n
                ? (t - n > 180 ? (n += 360) : n - t > 180 && (t += 360),
                  a.push({
                    i: e.push(i(e) + 'rotate(', null, r) - 2,
                    x: m(t, n),
                  }))
                : n && e.push(i(e) + 'rotate(' + n + r)
            })(a.rotate, o.rotate, u, c),
            (function(t, n, e, a) {
              t !== n
                ? a.push({
                    i: e.push(i(e) + 'skewX(', null, r) - 2,
                    x: m(t, n),
                  })
                : n && e.push(i(e) + 'skewX(' + n + r)
            })(a.skewX, o.skewX, u, c),
            (function(t, n, e, r, a, o) {
              if (t !== e || n !== r) {
                var u = a.push(i(a) + 'scale(', null, ',', null, ')')
                o.push({ i: u - 4, x: m(t, e) }, { i: u - 2, x: m(n, r) })
              } else
                (1 === e && 1 === r) ||
                  a.push(i(a) + 'scale(' + e + ',' + r + ')')
            })(a.scaleX, a.scaleY, o.scaleX, o.scaleY, u, c),
            (a = o = null),
            function(t) {
              for (var n, e = -1, r = c.length; ++e < r; )
                u[(n = c[e]).i] = n.x(t)
              return u.join('')
            }
          )
        }
      }
      var F = D(
          function(t) {
            return 'none' === t
              ? E
              : (w ||
                  ((w = document.createElement('DIV')),
                  (M = document.documentElement),
                  (A = document.defaultView)),
                (w.style.transform = t),
                (t = A.getComputedStyle(
                  M.appendChild(w),
                  null,
                ).getPropertyValue('transform')),
                M.removeChild(w),
                (t = t.slice(7, -1).split(',')),
                N(+t[0], +t[1], +t[2], +t[3], +t[4], +t[5]))
          },
          'px, ',
          'px)',
          'deg)',
        ),
        L = D(
          function(t) {
            return null == t
              ? E
              : (k ||
                  (k = document.createElementNS(
                    'http://www.w3.org/2000/svg',
                    'g',
                  )),
                k.setAttribute('transform', t),
                (t = k.transform.baseVal.consolidate())
                  ? ((t = t.matrix), N(t.a, t.b, t.c, t.d, t.e, t.f))
                  : E)
          },
          ', ',
          ')',
          ')',
        ),
        j = Math.SQRT2
      function B(t) {
        return ((t = Math.exp(t)) + 1 / t) / 2
      }
      var I = function(t, n) {
        var e,
          r,
          i = t[0],
          a = t[1],
          o = t[2],
          u = n[0],
          c = n[1],
          l = n[2],
          s = u - i,
          f = c - a,
          h = s * s + f * f
        if (h < 1e-12)
          (r = Math.log(l / o) / j),
            (e = function(t) {
              return [i + t * s, a + t * f, o * Math.exp(j * t * r)]
            })
        else {
          var d = Math.sqrt(h),
            p = (l * l - o * o + 4 * h) / (2 * o * 2 * d),
            g = (l * l - o * o - 4 * h) / (2 * l * 2 * d),
            v = Math.log(Math.sqrt(p * p + 1) - p),
            y = Math.log(Math.sqrt(g * g + 1) - g)
          ;(r = (y - v) / j),
            (e = function(t) {
              var n,
                e = t * r,
                u = B(v),
                c =
                  (o / (2 * d)) *
                  (u *
                    ((n = j * e + v), ((n = Math.exp(2 * n)) - 1) / (n + 1)) -
                    (function(t) {
                      return ((t = Math.exp(t)) - 1 / t) / 2
                    })(v))
              return [i + c * s, a + c * f, (o * u) / B(j * e + v)]
            })
        }
        return (e.duration = 1e3 * r), e
      }
      function P(t) {
        return function(n, e) {
          var i = t((n = Object(r.hsl)(n)).h, (e = Object(r.hsl)(e)).h),
            a = f(n.s, e.s),
            o = f(n.l, e.l),
            u = f(n.opacity, e.opacity)
          return function(t) {
            return (
              (n.h = i(t)),
              (n.s = a(t)),
              (n.l = o(t)),
              (n.opacity = u(t)),
              n + ''
            )
          }
        }
      }
      var R = P(l),
        U = P(f)
      function H(t, n) {
        var e = f((t = Object(r.lab)(t)).l, (n = Object(r.lab)(n)).l),
          i = f(t.a, n.a),
          a = f(t.b, n.b),
          o = f(t.opacity, n.opacity)
        return function(n) {
          return (
            (t.l = e(n)), (t.a = i(n)), (t.b = a(n)), (t.opacity = o(n)), t + ''
          )
        }
      }
      function z(t) {
        return function(n, e) {
          var i = t((n = Object(r.hcl)(n)).h, (e = Object(r.hcl)(e)).h),
            a = f(n.c, e.c),
            o = f(n.l, e.l),
            u = f(n.opacity, e.opacity)
          return function(t) {
            return (
              (n.h = i(t)),
              (n.c = a(t)),
              (n.l = o(t)),
              (n.opacity = u(t)),
              n + ''
            )
          }
        }
      }
      var Y = z(l),
        q = z(f)
      function G(t) {
        return (function n(e) {
          function i(n, i) {
            var a = t(
                (n = Object(r.cubehelix)(n)).h,
                (i = Object(r.cubehelix)(i)).h,
              ),
              o = f(n.s, i.s),
              u = f(n.l, i.l),
              c = f(n.opacity, i.opacity)
            return function(t) {
              return (
                (n.h = a(t)),
                (n.s = o(t)),
                (n.l = u(Math.pow(t, e))),
                (n.opacity = c(t)),
                n + ''
              )
            }
          }
          return (e = +e), (i.gamma = n), i
        })(1)
      }
      var W = G(l),
        X = G(f),
        V = function(t, n) {
          for (var e = new Array(n), r = 0; r < n; ++r) e[r] = t(r / (n - 1))
          return e
        }
      e.d(n, 'interpolate', function() {
        return O
      }),
        e.d(n, 'interpolateArray', function() {
          return v
        }),
        e.d(n, 'interpolateBasis', function() {
          return a
        }),
        e.d(n, 'interpolateBasisClosed', function() {
          return o
        }),
        e.d(n, 'interpolateDate', function() {
          return y
        }),
        e.d(n, 'interpolateNumber', function() {
          return m
        }),
        e.d(n, 'interpolateObject', function() {
          return x
        }),
        e.d(n, 'interpolateRound', function() {
          return S
        }),
        e.d(n, 'interpolateString', function() {
          return T
        }),
        e.d(n, 'interpolateTransformCss', function() {
          return F
        }),
        e.d(n, 'interpolateTransformSvg', function() {
          return L
        }),
        e.d(n, 'interpolateZoom', function() {
          return I
        }),
        e.d(n, 'interpolateRgb', function() {
          return h
        }),
        e.d(n, 'interpolateRgbBasis', function() {
          return p
        }),
        e.d(n, 'interpolateRgbBasisClosed', function() {
          return g
        }),
        e.d(n, 'interpolateHsl', function() {
          return R
        }),
        e.d(n, 'interpolateHslLong', function() {
          return U
        }),
        e.d(n, 'interpolateLab', function() {
          return H
        }),
        e.d(n, 'interpolateHcl', function() {
          return Y
        }),
        e.d(n, 'interpolateHclLong', function() {
          return q
        }),
        e.d(n, 'interpolateCubehelix', function() {
          return W
        }),
        e.d(n, 'interpolateCubehelixLong', function() {
          return X
        }),
        e.d(n, 'quantize', function() {
          return V
        })
    },
    function(t, n, e) {
      'use strict'
      e.r(n)
      var r,
        i = function(t, n) {
          if (
            (e = (t = n ? t.toExponential(n - 1) : t.toExponential()).indexOf(
              'e',
            )) < 0
          )
            return null
          var e,
            r = t.slice(0, e)
          return [r.length > 1 ? r[0] + r.slice(2) : r, +t.slice(e + 1)]
        },
        a = function(t) {
          return (t = i(Math.abs(t))) ? t[1] : NaN
        },
        o = function(t, n) {
          var e = i(t, n)
          if (!e) return t + ''
          var r = e[0],
            a = e[1]
          return a < 0
            ? '0.' + new Array(-a).join('0') + r
            : r.length > a + 1
            ? r.slice(0, a + 1) + '.' + r.slice(a + 1)
            : r + new Array(a - r.length + 2).join('0')
        },
        u = {
          '': function(t, n) {
            t: for (
              var e, r = (t = t.toPrecision(n)).length, i = 1, a = -1;
              i < r;
              ++i
            )
              switch (t[i]) {
                case '.':
                  a = e = i
                  break
                case '0':
                  0 === a && (a = i), (e = i)
                  break
                case 'e':
                  break t
                default:
                  a > 0 && (a = 0)
              }
            return a > 0 ? t.slice(0, a) + t.slice(e + 1) : t
          },
          '%': function(t, n) {
            return (100 * t).toFixed(n)
          },
          b: function(t) {
            return Math.round(t).toString(2)
          },
          c: function(t) {
            return t + ''
          },
          d: function(t) {
            return Math.round(t).toString(10)
          },
          e: function(t, n) {
            return t.toExponential(n)
          },
          f: function(t, n) {
            return t.toFixed(n)
          },
          g: function(t, n) {
            return t.toPrecision(n)
          },
          o: function(t) {
            return Math.round(t).toString(8)
          },
          p: function(t, n) {
            return o(100 * t, n)
          },
          r: o,
          s: function(t, n) {
            var e = i(t, n)
            if (!e) return t + ''
            var a = e[0],
              o = e[1],
              u =
                o - (r = 3 * Math.max(-8, Math.min(8, Math.floor(o / 3)))) + 1,
              c = a.length
            return u === c
              ? a
              : u > c
              ? a + new Array(u - c + 1).join('0')
              : u > 0
              ? a.slice(0, u) + '.' + a.slice(u)
              : '0.' +
                new Array(1 - u).join('0') +
                i(t, Math.max(0, n + u - 1))[0]
          },
          X: function(t) {
            return Math.round(t)
              .toString(16)
              .toUpperCase()
          },
          x: function(t) {
            return Math.round(t).toString(16)
          },
        },
        c = /^(?:(.)?([<>=^]))?([+\-\( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?([a-z%])?$/i
      function l(t) {
        return new s(t)
      }
      function s(t) {
        if (!(n = c.exec(t))) throw new Error('invalid format: ' + t)
        var n,
          e = n[1] || ' ',
          r = n[2] || '>',
          i = n[3] || '-',
          a = n[4] || '',
          o = !!n[5],
          l = n[6] && +n[6],
          s = !!n[7],
          f = n[8] && +n[8].slice(1),
          h = n[9] || ''
        'n' === h ? ((s = !0), (h = 'g')) : u[h] || (h = ''),
          (o || ('0' === e && '=' === r)) && ((o = !0), (e = '0'), (r = '=')),
          (this.fill = e),
          (this.align = r),
          (this.sign = i),
          (this.symbol = a),
          (this.zero = o),
          (this.width = l),
          (this.comma = s),
          (this.precision = f),
          (this.type = h)
      }
      ;(l.prototype = s.prototype),
        (s.prototype.toString = function() {
          return (
            this.fill +
            this.align +
            this.sign +
            this.symbol +
            (this.zero ? '0' : '') +
            (null == this.width ? '' : Math.max(1, 0 | this.width)) +
            (this.comma ? ',' : '') +
            (null == this.precision
              ? ''
              : '.' + Math.max(0, 0 | this.precision)) +
            this.type
          )
        })
      var f,
        h,
        d,
        p = function(t) {
          return t
        },
        g = [
          'y',
          'z',
          'a',
          'f',
          'p',
          'n',
          'µ',
          'm',
          '',
          'k',
          'M',
          'G',
          'T',
          'P',
          'E',
          'Z',
          'Y',
        ],
        v = function(t) {
          var n,
            e,
            i =
              t.grouping && t.thousands
                ? ((n = t.grouping),
                  (e = t.thousands),
                  function(t, r) {
                    for (
                      var i = t.length, a = [], o = 0, u = n[0], c = 0;
                      i > 0 &&
                      u > 0 &&
                      (c + u + 1 > r && (u = Math.max(1, r - c)),
                      a.push(t.substring((i -= u), i + u)),
                      !((c += u + 1) > r));

                    )
                      u = n[(o = (o + 1) % n.length)]
                    return a.reverse().join(e)
                  })
                : p,
            o = t.currency,
            c = t.decimal,
            s = t.numerals
              ? (function(t) {
                  return function(n) {
                    return n.replace(/[0-9]/g, function(n) {
                      return t[+n]
                    })
                  }
                })(t.numerals)
              : p,
            f = t.percent || '%'
          function h(t) {
            var n = (t = l(t)).fill,
              e = t.align,
              a = t.sign,
              h = t.symbol,
              d = t.zero,
              p = t.width,
              v = t.comma,
              y = t.precision,
              m = t.type,
              x =
                '$' === h
                  ? o[0]
                  : '#' === h && /[boxX]/.test(m)
                  ? '0' + m.toLowerCase()
                  : '',
              _ = '$' === h ? o[1] : /[%p]/.test(m) ? f : '',
              b = u[m],
              w = !m || /[defgprs%]/.test(m)
            function M(t) {
              var o,
                u,
                l,
                f = x,
                h = _
              if ('c' === m) (h = b(t) + h), (t = '')
              else {
                var M = (t = +t) < 0
                if (
                  ((t = b(Math.abs(t), y)),
                  M && 0 == +t && (M = !1),
                  (f =
                    (M
                      ? '(' === a
                        ? a
                        : '-'
                      : '-' === a || '(' === a
                      ? ''
                      : a) + f),
                  (h =
                    h +
                    ('s' === m ? g[8 + r / 3] : '') +
                    (M && '(' === a ? ')' : '')),
                  w)
                )
                  for (o = -1, u = t.length; ++o < u; )
                    if (48 > (l = t.charCodeAt(o)) || l > 57) {
                      ;(h = (46 === l ? c + t.slice(o + 1) : t.slice(o)) + h),
                        (t = t.slice(0, o))
                      break
                    }
              }
              v && !d && (t = i(t, 1 / 0))
              var A = f.length + t.length + h.length,
                k = A < p ? new Array(p - A + 1).join(n) : ''
              switch (
                (v &&
                  d &&
                  ((t = i(k + t, k.length ? p - h.length : 1 / 0)), (k = '')),
                e)
              ) {
                case '<':
                  t = f + t + h + k
                  break
                case '=':
                  t = f + k + t + h
                  break
                case '^':
                  t = k.slice(0, (A = k.length >> 1)) + f + t + h + k.slice(A)
                  break
                default:
                  t = k + f + t + h
              }
              return s(t)
            }
            return (
              (y =
                null == y
                  ? m
                    ? 6
                    : 12
                  : /[gprs]/.test(m)
                  ? Math.max(1, Math.min(21, y))
                  : Math.max(0, Math.min(20, y))),
              (M.toString = function() {
                return t + ''
              }),
              M
            )
          }
          return {
            format: h,
            formatPrefix: function(t, n) {
              var e = h((((t = l(t)).type = 'f'), t)),
                r = 3 * Math.max(-8, Math.min(8, Math.floor(a(n) / 3))),
                i = Math.pow(10, -r),
                o = g[8 + r / 3]
              return function(t) {
                return e(i * t) + o
              }
            },
          }
        }
      function y(t) {
        return (f = v(t)), (h = f.format), (d = f.formatPrefix), f
      }
      y({ decimal: '.', thousands: ',', grouping: [3], currency: ['$', ''] })
      var m = function(t) {
          return Math.max(0, -a(Math.abs(t)))
        },
        x = function(t, n) {
          return Math.max(
            0,
            3 * Math.max(-8, Math.min(8, Math.floor(a(n) / 3))) -
              a(Math.abs(t)),
          )
        },
        _ = function(t, n) {
          return (
            (t = Math.abs(t)),
            (n = Math.abs(n) - t),
            Math.max(0, a(n) - a(t)) + 1
          )
        }
      e.d(n, 'formatDefaultLocale', function() {
        return y
      }),
        e.d(n, 'format', function() {
          return h
        }),
        e.d(n, 'formatPrefix', function() {
          return d
        }),
        e.d(n, 'formatLocale', function() {
          return v
        }),
        e.d(n, 'formatSpecifier', function() {
          return l
        }),
        e.d(n, 'precisionFixed', function() {
          return m
        }),
        e.d(n, 'precisionPrefix', function() {
          return x
        }),
        e.d(n, 'precisionRound', function() {
          return _
        })
    },
    function(t, n, e) {
      'use strict'
      e.r(n)
      var r,
        i,
        a = e(0),
        o = e(7),
        u = 0,
        c = 0,
        l = 0,
        s = 1e3,
        f = 0,
        h = 0,
        d = 0,
        p =
          'object' == typeof performance && performance.now
            ? performance
            : Date,
        g =
          'object' == typeof window && window.requestAnimationFrame
            ? window.requestAnimationFrame.bind(window)
            : function(t) {
                setTimeout(t, 17)
              }
      function v() {
        return h || (g(y), (h = p.now() + d))
      }
      function y() {
        h = 0
      }
      function m() {
        this._call = this._time = this._next = null
      }
      function x(t, n, e) {
        var r = new m()
        return r.restart(t, n, e), r
      }
      function _() {
        ;(h = (f = p.now()) + d), (u = c = 0)
        try {
          !(function() {
            v(), ++u
            for (var t, n = r; n; )
              (t = h - n._time) >= 0 && n._call.call(null, t), (n = n._next)
            --u
          })()
        } finally {
          ;(u = 0),
            (function() {
              var t,
                n,
                e = r,
                a = 1 / 0
              for (; e; )
                e._call
                  ? (a > e._time && (a = e._time), (t = e), (e = e._next))
                  : ((n = e._next),
                    (e._next = null),
                    (e = t ? (t._next = n) : (r = n)))
              ;(i = t), w(a)
            })(),
            (h = 0)
        }
      }
      function b() {
        var t = p.now(),
          n = t - f
        n > s && ((d -= n), (f = t))
      }
      function w(t) {
        if (!u) {
          c && (c = clearTimeout(c))
          var n = t - h
          n > 24
            ? (t < 1 / 0 && (c = setTimeout(_, n)), l && (l = clearInterval(l)))
            : (l || ((f = h), (l = setInterval(b, s))), (u = 1), g(_))
        }
      }
      m.prototype = x.prototype = {
        constructor: m,
        restart: function(t, n, e) {
          if ('function' != typeof t)
            throw new TypeError('callback is not a function')
          ;(e = (null == e ? v() : +e) + (null == n ? 0 : +n)),
            this._next ||
              i === this ||
              (i ? (i._next = this) : (r = this), (i = this)),
            (this._call = t),
            (this._time = e),
            w()
        },
        stop: function() {
          this._call && ((this._call = null), (this._time = 1 / 0), w())
        },
      }
      var M = function(t, n, e) {
          var r = new m()
          return (
            (n = null == n ? 0 : +n),
            r.restart(
              function(e) {
                r.stop(), t(e + n)
              },
              n,
              e,
            ),
            r
          )
        },
        A = Object(o.dispatch)('start', 'end', 'interrupt'),
        k = [],
        T = 0,
        O = 1,
        S = 2,
        C = 3,
        E = 4,
        N = 5,
        D = 6,
        F = function(t, n, e, r, i, a) {
          var o = t.__transition
          if (o) {
            if (e in o) return
          } else t.__transition = {}
          !(function(t, n, e) {
            var r,
              i = t.__transition
            function a(c) {
              var l, s, f, h
              if (e.state !== O) return u()
              for (l in i)
                if ((h = i[l]).name === e.name) {
                  if (h.state === C) return M(a)
                  h.state === E
                    ? ((h.state = D),
                      h.timer.stop(),
                      h.on.call('interrupt', t, t.__data__, h.index, h.group),
                      delete i[l])
                    : +l < n && ((h.state = D), h.timer.stop(), delete i[l])
                }
              if (
                (M(function() {
                  e.state === C &&
                    ((e.state = E), e.timer.restart(o, e.delay, e.time), o(c))
                }),
                (e.state = S),
                e.on.call('start', t, t.__data__, e.index, e.group),
                e.state === S)
              ) {
                for (
                  e.state = C,
                    r = new Array((f = e.tween.length)),
                    l = 0,
                    s = -1;
                  l < f;
                  ++l
                )
                  (h = e.tween[l].value.call(
                    t,
                    t.__data__,
                    e.index,
                    e.group,
                  )) && (r[++s] = h)
                r.length = s + 1
              }
            }
            function o(n) {
              for (
                var i =
                    n < e.duration
                      ? e.ease.call(null, n / e.duration)
                      : (e.timer.restart(u), (e.state = N), 1),
                  a = -1,
                  o = r.length;
                ++a < o;

              )
                r[a].call(null, i)
              e.state === N &&
                (e.on.call('end', t, t.__data__, e.index, e.group), u())
            }
            function u() {
              for (var r in ((e.state = D), e.timer.stop(), delete i[n], i))
                return
              delete t.__transition
            }
            ;(i[n] = e),
              (e.timer = x(
                function(t) {
                  ;(e.state = O),
                    e.timer.restart(a, e.delay, e.time),
                    e.delay <= t && a(t - e.delay)
                },
                0,
                e.time,
              ))
          })(t, e, {
            name: n,
            index: r,
            group: i,
            on: A,
            tween: k,
            time: a.time,
            delay: a.delay,
            duration: a.duration,
            ease: a.ease,
            timer: null,
            state: T,
          })
        }
      function L(t, n) {
        var e = t.__transition
        if (!e || !(e = e[n]) || e.state > T) throw new Error('too late')
        return e
      }
      function j(t, n) {
        var e = t.__transition
        if (!e || !(e = e[n]) || e.state > S) throw new Error('too late')
        return e
      }
      function B(t, n) {
        var e = t.__transition
        if (!e || !(e = e[n])) throw new Error('too late')
        return e
      }
      var I = function(t, n) {
          var e,
            r,
            i,
            a = t.__transition,
            o = !0
          if (a) {
            for (i in ((n = null == n ? null : n + ''), a))
              (e = a[i]).name === n
                ? ((r = e.state > S && e.state < N),
                  (e.state = D),
                  e.timer.stop(),
                  r && e.on.call('interrupt', t, t.__data__, e.index, e.group),
                  delete a[i])
                : (o = !1)
            o && delete t.__transition
          }
        },
        P = e(4)
      function R(t, n, e) {
        var r = t._id
        return (
          t.each(function() {
            var t = j(this, r)
            ;(t.value || (t.value = {}))[n] = e.apply(this, arguments)
          }),
          function(t) {
            return B(t, r).value[n]
          }
        )
      }
      var U = e(3),
        H = function(t, n) {
          var e
          return ('number' == typeof n
            ? P.interpolateNumber
            : n instanceof U.color
            ? P.interpolateRgb
            : (e = Object(U.color)(n))
            ? ((n = e), P.interpolateRgb)
            : P.interpolateString)(t, n)
        }
      var z = a.selection.prototype.constructor
      var Y = 0
      function q(t, n, e, r) {
        ;(this._groups = t),
          (this._parents = n),
          (this._name = e),
          (this._id = r)
      }
      function G(t) {
        return Object(a.selection)().transition(t)
      }
      function W() {
        return ++Y
      }
      var X = a.selection.prototype
      q.prototype = G.prototype = {
        constructor: q,
        select: function(t) {
          var n = this._name,
            e = this._id
          'function' != typeof t && (t = Object(a.selector)(t))
          for (
            var r = this._groups, i = r.length, o = new Array(i), u = 0;
            u < i;
            ++u
          )
            for (
              var c,
                l,
                s = r[u],
                f = s.length,
                h = (o[u] = new Array(f)),
                d = 0;
              d < f;
              ++d
            )
              (c = s[d]) &&
                (l = t.call(c, c.__data__, d, s)) &&
                ('__data__' in c && (l.__data__ = c.__data__),
                (h[d] = l),
                F(h[d], n, e, d, h, B(c, e)))
          return new q(o, this._parents, n, e)
        },
        selectAll: function(t) {
          var n = this._name,
            e = this._id
          'function' != typeof t && (t = Object(a.selectorAll)(t))
          for (
            var r = this._groups, i = r.length, o = [], u = [], c = 0;
            c < i;
            ++c
          )
            for (var l, s = r[c], f = s.length, h = 0; h < f; ++h)
              if ((l = s[h])) {
                for (
                  var d,
                    p = t.call(l, l.__data__, h, s),
                    g = B(l, e),
                    v = 0,
                    y = p.length;
                  v < y;
                  ++v
                )
                  (d = p[v]) && F(d, n, e, v, p, g)
                o.push(p), u.push(l)
              }
          return new q(o, u, n, e)
        },
        filter: function(t) {
          'function' != typeof t && (t = Object(a.matcher)(t))
          for (
            var n = this._groups, e = n.length, r = new Array(e), i = 0;
            i < e;
            ++i
          )
            for (
              var o, u = n[i], c = u.length, l = (r[i] = []), s = 0;
              s < c;
              ++s
            )
              (o = u[s]) && t.call(o, o.__data__, s, u) && l.push(o)
          return new q(r, this._parents, this._name, this._id)
        },
        merge: function(t) {
          if (t._id !== this._id) throw new Error()
          for (
            var n = this._groups,
              e = t._groups,
              r = n.length,
              i = e.length,
              a = Math.min(r, i),
              o = new Array(r),
              u = 0;
            u < a;
            ++u
          )
            for (
              var c,
                l = n[u],
                s = e[u],
                f = l.length,
                h = (o[u] = new Array(f)),
                d = 0;
              d < f;
              ++d
            )
              (c = l[d] || s[d]) && (h[d] = c)
          for (; u < r; ++u) o[u] = n[u]
          return new q(o, this._parents, this._name, this._id)
        },
        selection: function() {
          return new z(this._groups, this._parents)
        },
        transition: function() {
          for (
            var t = this._name,
              n = this._id,
              e = W(),
              r = this._groups,
              i = r.length,
              a = 0;
            a < i;
            ++a
          )
            for (var o, u = r[a], c = u.length, l = 0; l < c; ++l)
              if ((o = u[l])) {
                var s = B(o, n)
                F(o, t, e, l, u, {
                  time: s.time + s.delay + s.duration,
                  delay: 0,
                  duration: s.duration,
                  ease: s.ease,
                })
              }
          return new q(r, this._parents, t, e)
        },
        call: X.call,
        nodes: X.nodes,
        node: X.node,
        size: X.size,
        empty: X.empty,
        each: X.each,
        on: function(t, n) {
          var e = this._id
          return arguments.length < 2
            ? B(this.node(), e).on.on(t)
            : this.each(
                (function(t, n, e) {
                  var r,
                    i,
                    a = (function(t) {
                      return (t + '')
                        .trim()
                        .split(/^|\s+/)
                        .every(function(t) {
                          var n = t.indexOf('.')
                          return (
                            n >= 0 && (t = t.slice(0, n)), !t || 'start' === t
                          )
                        })
                    })(n)
                      ? L
                      : j
                  return function() {
                    var o = a(this, t),
                      u = o.on
                    u !== r && (i = (r = u).copy()).on(n, e), (o.on = i)
                  }
                })(e, t, n),
              )
        },
        attr: function(t, n) {
          var e = Object(a.namespace)(t),
            r = 'transform' === e ? P.interpolateTransformSvg : H
          return this.attrTween(
            t,
            'function' == typeof n
              ? (e.local
                  ? function(t, n, e) {
                      var r, i, a
                      return function() {
                        var o,
                          u = e(this)
                        if (null != u)
                          return (o = this.getAttributeNS(t.space, t.local)) ===
                            u
                            ? null
                            : o === r && u === i
                            ? a
                            : (a = n((r = o), (i = u)))
                        this.removeAttributeNS(t.space, t.local)
                      }
                    }
                  : function(t, n, e) {
                      var r, i, a
                      return function() {
                        var o,
                          u = e(this)
                        if (null != u)
                          return (o = this.getAttribute(t)) === u
                            ? null
                            : o === r && u === i
                            ? a
                            : (a = n((r = o), (i = u)))
                        this.removeAttribute(t)
                      }
                    })(e, r, R(this, 'attr.' + t, n))
              : null == n
              ? (e.local
                  ? function(t) {
                      return function() {
                        this.removeAttributeNS(t.space, t.local)
                      }
                    }
                  : function(t) {
                      return function() {
                        this.removeAttribute(t)
                      }
                    })(e)
              : (e.local
                  ? function(t, n, e) {
                      var r, i
                      return function() {
                        var a = this.getAttributeNS(t.space, t.local)
                        return a === e
                          ? null
                          : a === r
                          ? i
                          : (i = n((r = a), e))
                      }
                    }
                  : function(t, n, e) {
                      var r, i
                      return function() {
                        var a = this.getAttribute(t)
                        return a === e
                          ? null
                          : a === r
                          ? i
                          : (i = n((r = a), e))
                      }
                    })(e, r, n + ''),
          )
        },
        attrTween: function(t, n) {
          var e = 'attr.' + t
          if (arguments.length < 2) return (e = this.tween(e)) && e._value
          if (null == n) return this.tween(e, null)
          if ('function' != typeof n) throw new Error()
          var r = Object(a.namespace)(t)
          return this.tween(
            e,
            (r.local
              ? function(t, n) {
                  function e() {
                    var e = this,
                      r = n.apply(e, arguments)
                    return (
                      r &&
                      function(n) {
                        e.setAttributeNS(t.space, t.local, r(n))
                      }
                    )
                  }
                  return (e._value = n), e
                }
              : function(t, n) {
                  function e() {
                    var e = this,
                      r = n.apply(e, arguments)
                    return (
                      r &&
                      function(n) {
                        e.setAttribute(t, r(n))
                      }
                    )
                  }
                  return (e._value = n), e
                })(r, n),
          )
        },
        style: function(t, n, e) {
          var r = 'transform' == (t += '') ? P.interpolateTransformCss : H
          return null == n
            ? this.styleTween(
                t,
                (function(t, n) {
                  var e, r, i
                  return function() {
                    var o = Object(a.style)(this, t),
                      u =
                        (this.style.removeProperty(t), Object(a.style)(this, t))
                    return o === u
                      ? null
                      : o === e && u === r
                      ? i
                      : (i = n((e = o), (r = u)))
                  }
                })(t, r),
              ).on(
                'end.style.' + t,
                (function(t) {
                  return function() {
                    this.style.removeProperty(t)
                  }
                })(t),
              )
            : this.styleTween(
                t,
                'function' == typeof n
                  ? (function(t, n, e) {
                      var r, i, o
                      return function() {
                        var u = Object(a.style)(this, t),
                          c = e(this)
                        return (
                          null == c &&
                            (this.style.removeProperty(t),
                            (c = Object(a.style)(this, t))),
                          u === c
                            ? null
                            : u === r && c === i
                            ? o
                            : (o = n((r = u), (i = c)))
                        )
                      }
                    })(t, r, R(this, 'style.' + t, n))
                  : (function(t, n, e) {
                      var r, i
                      return function() {
                        var o = Object(a.style)(this, t)
                        return o === e
                          ? null
                          : o === r
                          ? i
                          : (i = n((r = o), e))
                      }
                    })(t, r, n + ''),
                e,
              )
        },
        styleTween: function(t, n, e) {
          var r = 'style.' + (t += '')
          if (arguments.length < 2) return (r = this.tween(r)) && r._value
          if (null == n) return this.tween(r, null)
          if ('function' != typeof n) throw new Error()
          return this.tween(
            r,
            (function(t, n, e) {
              function r() {
                var r = this,
                  i = n.apply(r, arguments)
                return (
                  i &&
                  function(n) {
                    r.style.setProperty(t, i(n), e)
                  }
                )
              }
              return (r._value = n), r
            })(t, n, null == e ? '' : e),
          )
        },
        text: function(t) {
          return this.tween(
            'text',
            'function' == typeof t
              ? (function(t) {
                  return function() {
                    var n = t(this)
                    this.textContent = null == n ? '' : n
                  }
                })(R(this, 'text', t))
              : (function(t) {
                  return function() {
                    this.textContent = t
                  }
                })(null == t ? '' : t + ''),
          )
        },
        remove: function() {
          return this.on(
            'end.remove',
            ((t = this._id),
            function() {
              var n = this.parentNode
              for (var e in this.__transition) if (+e !== t) return
              n && n.removeChild(this)
            }),
          )
          var t
        },
        tween: function(t, n) {
          var e = this._id
          if (((t += ''), arguments.length < 2)) {
            for (
              var r, i = B(this.node(), e).tween, a = 0, o = i.length;
              a < o;
              ++a
            )
              if ((r = i[a]).name === t) return r.value
            return null
          }
          return this.each(
            (null == n
              ? function(t, n) {
                  var e, r
                  return function() {
                    var i = j(this, t),
                      a = i.tween
                    if (a !== e)
                      for (var o = 0, u = (r = e = a).length; o < u; ++o)
                        if (r[o].name === n) {
                          ;(r = r.slice()).splice(o, 1)
                          break
                        }
                    i.tween = r
                  }
                }
              : function(t, n, e) {
                  var r, i
                  if ('function' != typeof e) throw new Error()
                  return function() {
                    var a = j(this, t),
                      o = a.tween
                    if (o !== r) {
                      i = (r = o).slice()
                      for (
                        var u = { name: n, value: e }, c = 0, l = i.length;
                        c < l;
                        ++c
                      )
                        if (i[c].name === n) {
                          i[c] = u
                          break
                        }
                      c === l && i.push(u)
                    }
                    a.tween = i
                  }
                })(e, t, n),
          )
        },
        delay: function(t) {
          var n = this._id
          return arguments.length
            ? this.each(
                ('function' == typeof t
                  ? function(t, n) {
                      return function() {
                        L(this, t).delay = +n.apply(this, arguments)
                      }
                    }
                  : function(t, n) {
                      return (
                        (n = +n),
                        function() {
                          L(this, t).delay = n
                        }
                      )
                    })(n, t),
              )
            : B(this.node(), n).delay
        },
        duration: function(t) {
          var n = this._id
          return arguments.length
            ? this.each(
                ('function' == typeof t
                  ? function(t, n) {
                      return function() {
                        j(this, t).duration = +n.apply(this, arguments)
                      }
                    }
                  : function(t, n) {
                      return (
                        (n = +n),
                        function() {
                          j(this, t).duration = n
                        }
                      )
                    })(n, t),
              )
            : B(this.node(), n).duration
        },
        ease: function(t) {
          var n = this._id
          return arguments.length
            ? this.each(
                (function(t, n) {
                  if ('function' != typeof n) throw new Error()
                  return function() {
                    j(this, t).ease = n
                  }
                })(n, t),
              )
            : B(this.node(), n).ease
        },
      }
      var V = { time: null, delay: 0, duration: 250, ease: e(8).easeCubicInOut }
      function $(t, n) {
        for (var e; !(e = t.__transition) || !(e = e[n]); )
          if (!(t = t.parentNode)) return (V.time = v()), V
        return e
      }
      ;(a.selection.prototype.interrupt = function(t) {
        return this.each(function() {
          I(this, t)
        })
      }),
        (a.selection.prototype.transition = function(t) {
          var n, e
          t instanceof q
            ? ((n = t._id), (t = t._name))
            : ((n = W()), ((e = V).time = v()), (t = null == t ? null : t + ''))
          for (var r = this._groups, i = r.length, a = 0; a < i; ++a)
            for (var o, u = r[a], c = u.length, l = 0; l < c; ++l)
              (o = u[l]) && F(o, t, n, l, u, e || $(o, n))
          return new q(r, this._parents, t, n)
        })
      var Z = [null],
        Q = function(t, n) {
          var e,
            r,
            i = t.__transition
          if (i)
            for (r in ((n = null == n ? null : n + ''), i))
              if ((e = i[r]).state > O && e.name === n)
                return new q([[t]], Z, n, +r)
          return null
        }
      e.d(n, 'transition', function() {
        return G
      }),
        e.d(n, 'active', function() {
          return Q
        }),
        e.d(n, 'interrupt', function() {
          return I
        })
    },
    function(t, n, e) {
      'use strict'
      e.r(n)
      var r = { value: function() {} }
      function i() {
        for (var t, n = 0, e = arguments.length, r = {}; n < e; ++n) {
          if (!(t = arguments[n] + '') || t in r)
            throw new Error('illegal type: ' + t)
          r[t] = []
        }
        return new a(r)
      }
      function a(t) {
        this._ = t
      }
      function o(t, n) {
        for (var e, r = 0, i = t.length; r < i; ++r)
          if ((e = t[r]).name === n) return e.value
      }
      function u(t, n, e) {
        for (var i = 0, a = t.length; i < a; ++i)
          if (t[i].name === n) {
            ;(t[i] = r), (t = t.slice(0, i).concat(t.slice(i + 1)))
            break
          }
        return null != e && t.push({ name: n, value: e }), t
      }
      a.prototype = i.prototype = {
        constructor: a,
        on: function(t, n) {
          var e,
            r,
            i = this._,
            a =
              ((r = i),
              (t + '')
                .trim()
                .split(/^|\s+/)
                .map(function(t) {
                  var n = '',
                    e = t.indexOf('.')
                  if (
                    (e >= 0 && ((n = t.slice(e + 1)), (t = t.slice(0, e))),
                    t && !r.hasOwnProperty(t))
                  )
                    throw new Error('unknown type: ' + t)
                  return { type: t, name: n }
                })),
            c = -1,
            l = a.length
          if (!(arguments.length < 2)) {
            if (null != n && 'function' != typeof n)
              throw new Error('invalid callback: ' + n)
            for (; ++c < l; )
              if ((e = (t = a[c]).type)) i[e] = u(i[e], t.name, n)
              else if (null == n) for (e in i) i[e] = u(i[e], t.name, null)
            return this
          }
          for (; ++c < l; )
            if ((e = (t = a[c]).type) && (e = o(i[e], t.name))) return e
        },
        copy: function() {
          var t = {},
            n = this._
          for (var e in n) t[e] = n[e].slice()
          return new a(t)
        },
        call: function(t, n) {
          if ((e = arguments.length - 2) > 0)
            for (var e, r, i = new Array(e), a = 0; a < e; ++a)
              i[a] = arguments[a + 2]
          if (!this._.hasOwnProperty(t)) throw new Error('unknown type: ' + t)
          for (a = 0, e = (r = this._[t]).length; a < e; ++a)
            r[a].value.apply(n, i)
        },
        apply: function(t, n, e) {
          if (!this._.hasOwnProperty(t)) throw new Error('unknown type: ' + t)
          for (var r = this._[t], i = 0, a = r.length; i < a; ++i)
            r[i].value.apply(n, e)
        },
      }
      var c = i
      e.d(n, 'dispatch', function() {
        return c
      })
    },
    function(t, n, e) {
      'use strict'
      function r(t) {
        return +t
      }
      function i(t) {
        return t * t
      }
      function a(t) {
        return t * (2 - t)
      }
      function o(t) {
        return ((t *= 2) <= 1 ? t * t : --t * (2 - t) + 1) / 2
      }
      function u(t) {
        return t * t * t
      }
      function c(t) {
        return --t * t * t + 1
      }
      function l(t) {
        return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2
      }
      e.r(n)
      var s = (function t(n) {
          function e(t) {
            return Math.pow(t, n)
          }
          return (n = +n), (e.exponent = t), e
        })(3),
        f = (function t(n) {
          function e(t) {
            return 1 - Math.pow(1 - t, n)
          }
          return (n = +n), (e.exponent = t), e
        })(3),
        h = (function t(n) {
          function e(t) {
            return ((t *= 2) <= 1 ? Math.pow(t, n) : 2 - Math.pow(2 - t, n)) / 2
          }
          return (n = +n), (e.exponent = t), e
        })(3),
        d = Math.PI,
        p = d / 2
      function g(t) {
        return 1 - Math.cos(t * p)
      }
      function v(t) {
        return Math.sin(t * p)
      }
      function y(t) {
        return (1 - Math.cos(d * t)) / 2
      }
      function m(t) {
        return Math.pow(2, 10 * t - 10)
      }
      function x(t) {
        return 1 - Math.pow(2, -10 * t)
      }
      function _(t) {
        return (
          ((t *= 2) <= 1
            ? Math.pow(2, 10 * t - 10)
            : 2 - Math.pow(2, 10 - 10 * t)) / 2
        )
      }
      function b(t) {
        return 1 - Math.sqrt(1 - t * t)
      }
      function w(t) {
        return Math.sqrt(1 - --t * t)
      }
      function M(t) {
        return (
          ((t *= 2) <= 1
            ? 1 - Math.sqrt(1 - t * t)
            : Math.sqrt(1 - (t -= 2) * t) + 1) / 2
        )
      }
      var A = 4 / 11,
        k = 6 / 11,
        T = 8 / 11,
        O = 0.75,
        S = 9 / 11,
        C = 10 / 11,
        E = 0.9375,
        N = 21 / 22,
        D = 63 / 64,
        F = 1 / A / A
      function L(t) {
        return 1 - j(1 - t)
      }
      function j(t) {
        return (t = +t) < A
          ? F * t * t
          : t < T
          ? F * (t -= k) * t + O
          : t < C
          ? F * (t -= S) * t + E
          : F * (t -= N) * t + D
      }
      function B(t) {
        return ((t *= 2) <= 1 ? 1 - j(1 - t) : j(t - 1) + 1) / 2
      }
      var I = (function t(n) {
          function e(t) {
            return t * t * ((n + 1) * t - n)
          }
          return (n = +n), (e.overshoot = t), e
        })(1.70158),
        P = (function t(n) {
          function e(t) {
            return --t * t * ((n + 1) * t + n) + 1
          }
          return (n = +n), (e.overshoot = t), e
        })(1.70158),
        R = (function t(n) {
          function e(t) {
            return (
              ((t *= 2) < 1
                ? t * t * ((n + 1) * t - n)
                : (t -= 2) * t * ((n + 1) * t + n) + 2) / 2
            )
          }
          return (n = +n), (e.overshoot = t), e
        })(1.70158),
        U = 2 * Math.PI,
        H = (function t(n, e) {
          var r = Math.asin(1 / (n = Math.max(1, n))) * (e /= U)
          function i(t) {
            return n * Math.pow(2, 10 * --t) * Math.sin((r - t) / e)
          }
          return (
            (i.amplitude = function(n) {
              return t(n, e * U)
            }),
            (i.period = function(e) {
              return t(n, e)
            }),
            i
          )
        })(1, 0.3),
        z = (function t(n, e) {
          var r = Math.asin(1 / (n = Math.max(1, n))) * (e /= U)
          function i(t) {
            return 1 - n * Math.pow(2, -10 * (t = +t)) * Math.sin((t + r) / e)
          }
          return (
            (i.amplitude = function(n) {
              return t(n, e * U)
            }),
            (i.period = function(e) {
              return t(n, e)
            }),
            i
          )
        })(1, 0.3),
        Y = (function t(n, e) {
          var r = Math.asin(1 / (n = Math.max(1, n))) * (e /= U)
          function i(t) {
            return (
              ((t = 2 * t - 1) < 0
                ? n * Math.pow(2, 10 * t) * Math.sin((r - t) / e)
                : 2 - n * Math.pow(2, -10 * t) * Math.sin((r + t) / e)) / 2
            )
          }
          return (
            (i.amplitude = function(n) {
              return t(n, e * U)
            }),
            (i.period = function(e) {
              return t(n, e)
            }),
            i
          )
        })(1, 0.3)
      e.d(n, 'easeLinear', function() {
        return r
      }),
        e.d(n, 'easeQuad', function() {
          return o
        }),
        e.d(n, 'easeQuadIn', function() {
          return i
        }),
        e.d(n, 'easeQuadOut', function() {
          return a
        }),
        e.d(n, 'easeQuadInOut', function() {
          return o
        }),
        e.d(n, 'easeCubic', function() {
          return l
        }),
        e.d(n, 'easeCubicIn', function() {
          return u
        }),
        e.d(n, 'easeCubicOut', function() {
          return c
        }),
        e.d(n, 'easeCubicInOut', function() {
          return l
        }),
        e.d(n, 'easePoly', function() {
          return h
        }),
        e.d(n, 'easePolyIn', function() {
          return s
        }),
        e.d(n, 'easePolyOut', function() {
          return f
        }),
        e.d(n, 'easePolyInOut', function() {
          return h
        }),
        e.d(n, 'easeSin', function() {
          return y
        }),
        e.d(n, 'easeSinIn', function() {
          return g
        }),
        e.d(n, 'easeSinOut', function() {
          return v
        }),
        e.d(n, 'easeSinInOut', function() {
          return y
        }),
        e.d(n, 'easeExp', function() {
          return _
        }),
        e.d(n, 'easeExpIn', function() {
          return m
        }),
        e.d(n, 'easeExpOut', function() {
          return x
        }),
        e.d(n, 'easeExpInOut', function() {
          return _
        }),
        e.d(n, 'easeCircle', function() {
          return M
        }),
        e.d(n, 'easeCircleIn', function() {
          return b
        }),
        e.d(n, 'easeCircleOut', function() {
          return w
        }),
        e.d(n, 'easeCircleInOut', function() {
          return M
        }),
        e.d(n, 'easeBounce', function() {
          return j
        }),
        e.d(n, 'easeBounceIn', function() {
          return L
        }),
        e.d(n, 'easeBounceOut', function() {
          return j
        }),
        e.d(n, 'easeBounceInOut', function() {
          return B
        }),
        e.d(n, 'easeBack', function() {
          return R
        }),
        e.d(n, 'easeBackIn', function() {
          return I
        }),
        e.d(n, 'easeBackOut', function() {
          return P
        }),
        e.d(n, 'easeBackInOut', function() {
          return R
        }),
        e.d(n, 'easeElastic', function() {
          return z
        }),
        e.d(n, 'easeElasticIn', function() {
          return H
        }),
        e.d(n, 'easeElasticOut', function() {
          return z
        }),
        e.d(n, 'easeElasticInOut', function() {
          return Y
        })
    },
    function(t, n, e) {
      'use strict'
      var r
      void 0 ===
        (r = function() {
          return {
            colorSchemas: {
              britecharts: [
                '#6aedc7',
                '#39c2c9',
                '#ffce00',
                '#ffa71a',
                '#f866b9',
                '#998ce3',
              ],
              grey: [
                '#F8F8FA',
                '#EFF2F5',
                '#D2D6DF',
                '#C3C6CF',
                '#ADB0B6',
                '#666A73',
                '#45494E',
                '#363A43',
                '#282C35',
              ],
              orange: [
                '#fcc870',
                '#ffa71a',
                '#fb8825',
                '#f6682f',
                '#db5a2c',
                '#bf4c28',
                '#a43b1c',
                '#892a10',
                '#f9e9c5',
              ],
              blueGreen: [
                '#ccf7f6',
                '#70e4e0',
                '#00d8d2',
                '#00acaf',
                '#007f8c',
                '#005e66',
                '#003c3f',
                '#002d2f',
                '#0d2223',
              ],
              teal: [
                '#ccfffe',
                '#94f7f4',
                '#00fff8',
                '#1de1e1',
                '#39c2c9',
                '#2e9a9d',
                '#227270',
                '#1a5957',
                '#133f3e',
              ],
              green: [
                '#edfff7',
                '#d7ffef',
                '#c0ffe7',
                '#95f5d7',
                '#6aedc7',
                '#59c3a3',
                '#479980',
                '#34816a',
                '#206953',
              ],
              yellow: [
                '#f9f2b3',
                '#fbe986',
                '#fce05a',
                '#fed72d',
                '#ffce00',
                '#fcc11c',
                '#f9b438',
                '#eda629',
                '#e09819',
              ],
              pink: [
                '#fdd1ea',
                '#fb9cd2',
                '#f866b9',
                '#fc40b6',
                '#ff1ab3',
                '#e3239d',
                '#c62c86',
                '#a62073',
                '#85135f',
              ],
              purple: [
                '#ddd6fc',
                '#bbb1f0',
                '#998ce3',
                '#8e6bc1',
                '#824a9e',
                '#77337f',
                '#6b1c60',
                '#591650',
                '#470f3f',
              ],
              red: [
                '#ffd8d4',
                '#ffb5b0',
                '#ff938c',
                '#ff766c',
                '#ff584c',
                '#f04b42',
                '#e03d38',
                '#be2e29',
                '#9c1e19',
              ],
            },
            colorSchemasHuman: {
              britecharts: 'Britecharts Default',
              grey: 'Britecharts Grey',
              orange: 'Orange',
              blueGreen: 'Blue',
              teal: 'Light Blue',
              green: 'Green',
              yellow: 'Yellow',
              pink: 'Pink',
              purple: 'Purple',
              red: 'Red',
            },
            colorGradients: {
              greenBlue: ['#39C7EA', '#4CDCBA'],
              orangePink: ['#FBC670', '#F766B8'],
              bluePurple: ['#3DC3C9', '#824a9e'],
            },
            colorGradientsHuman: {
              greenBlue: 'Green to Blue',
              orangePink: 'Orange to Pink',
              bluePurple: 'Blue to Purple',
            },
            singleColors: {
              aloeGreen: ['#7bdcc0'],
              greenColor: ['#6aedc7'],
              blueColor: ['#39c2c9'],
              yellowColor: ['#ffce00'],
              orangeColor: ['#ffa71a'],
              pinkColor: ['#f866b9'],
              purpleColor: ['#998ce3'],
            },
            singleColorsHuman: {
              aloeGreen: 'Aloe Green',
              greenColor: 'Green',
              blueColor: 'Blue',
              yellowColor: 'Yellow',
              orangeColor: 'Orange',
              pinkColor: 'Pink',
              purpleColor: 'Purple',
            },
          }
        }.call(n, e, n, t)) || (t.exports = r)
    },
    function(t, n, e) {
      'use strict'
      e.r(n)
      var r = e(1),
        i = e(18),
        a = Array.prototype,
        o = a.map,
        u = a.slice,
        c = { name: 'implicit' }
      function l(t) {
        var n = Object(i.map)(),
          e = [],
          r = c
        function a(i) {
          var a = i + '',
            o = n.get(a)
          if (!o) {
            if (r !== c) return r
            n.set(a, (o = e.push(i)))
          }
          return t[(o - 1) % t.length]
        }
        return (
          (t = null == t ? [] : u.call(t)),
          (a.domain = function(t) {
            if (!arguments.length) return e.slice()
            ;(e = []), (n = Object(i.map)())
            for (var r, o, u = -1, c = t.length; ++u < c; )
              n.has((o = (r = t[u]) + '')) || n.set(o, e.push(r))
            return a
          }),
          (a.range = function(n) {
            return arguments.length ? ((t = u.call(n)), a) : t.slice()
          }),
          (a.unknown = function(t) {
            return arguments.length ? ((r = t), a) : r
          }),
          (a.copy = function() {
            return l()
              .domain(e)
              .range(t)
              .unknown(r)
          }),
          a
        )
      }
      function s() {
        var t,
          n,
          e = l().unknown(void 0),
          i = e.domain,
          a = e.range,
          o = [0, 1],
          u = !1,
          c = 0,
          f = 0,
          h = 0.5
        function d() {
          var e = i().length,
            l = o[1] < o[0],
            s = o[l - 0],
            d = o[1 - l]
          ;(t = (d - s) / Math.max(1, e - c + 2 * f)),
            u && (t = Math.floor(t)),
            (s += (d - s - t * (e - c)) * h),
            (n = t * (1 - c)),
            u && ((s = Math.round(s)), (n = Math.round(n)))
          var p = Object(r.range)(e).map(function(n) {
            return s + t * n
          })
          return a(l ? p.reverse() : p)
        }
        return (
          delete e.unknown,
          (e.domain = function(t) {
            return arguments.length ? (i(t), d()) : i()
          }),
          (e.range = function(t) {
            return arguments.length ? ((o = [+t[0], +t[1]]), d()) : o.slice()
          }),
          (e.rangeRound = function(t) {
            return (o = [+t[0], +t[1]]), (u = !0), d()
          }),
          (e.bandwidth = function() {
            return n
          }),
          (e.step = function() {
            return t
          }),
          (e.round = function(t) {
            return arguments.length ? ((u = !!t), d()) : u
          }),
          (e.padding = function(t) {
            return arguments.length
              ? ((c = f = Math.max(0, Math.min(1, t))), d())
              : c
          }),
          (e.paddingInner = function(t) {
            return arguments.length
              ? ((c = Math.max(0, Math.min(1, t))), d())
              : c
          }),
          (e.paddingOuter = function(t) {
            return arguments.length
              ? ((f = Math.max(0, Math.min(1, t))), d())
              : f
          }),
          (e.align = function(t) {
            return arguments.length
              ? ((h = Math.max(0, Math.min(1, t))), d())
              : h
          }),
          (e.copy = function() {
            return s()
              .domain(i())
              .range(o)
              .round(u)
              .paddingInner(c)
              .paddingOuter(f)
              .align(h)
          }),
          d()
        )
      }
      function f() {
        return (function t(n) {
          var e = n.copy
          return (
            (n.padding = n.paddingOuter),
            delete n.paddingInner,
            delete n.paddingOuter,
            (n.copy = function() {
              return t(e())
            }),
            n
          )
        })(s().paddingInner(1))
      }
      var h = e(4),
        d = function(t) {
          return function() {
            return t
          }
        },
        p = function(t) {
          return +t
        },
        g = [0, 1]
      function v(t, n) {
        return (n -= t = +t)
          ? function(e) {
              return (e - t) / n
            }
          : d(n)
      }
      function y(t, n, e, r) {
        var i = t[0],
          a = t[1],
          o = n[0],
          u = n[1]
        return (
          a < i
            ? ((i = e(a, i)), (o = r(u, o)))
            : ((i = e(i, a)), (o = r(o, u))),
          function(t) {
            return o(i(t))
          }
        )
      }
      function m(t, n, e, i) {
        var a = Math.min(t.length, n.length) - 1,
          o = new Array(a),
          u = new Array(a),
          c = -1
        for (
          t[a] < t[0] && ((t = t.slice().reverse()), (n = n.slice().reverse()));
          ++c < a;

        )
          (o[c] = e(t[c], t[c + 1])), (u[c] = i(n[c], n[c + 1]))
        return function(n) {
          var e = Object(r.bisect)(t, n, 1, a) - 1
          return u[e](o[e](n))
        }
      }
      function x(t, n) {
        return n
          .domain(t.domain())
          .range(t.range())
          .interpolate(t.interpolate())
          .clamp(t.clamp())
      }
      function _(t, n) {
        var e,
          r,
          i,
          a = g,
          c = g,
          l = h.interpolate,
          s = !1
        function f() {
          return (
            (e = Math.min(a.length, c.length) > 2 ? m : y), (r = i = null), d
          )
        }
        function d(n) {
          return (
            r ||
            (r = e(
              a,
              c,
              s
                ? (function(t) {
                    return function(n, e) {
                      var r = t((n = +n), (e = +e))
                      return function(t) {
                        return t <= n ? 0 : t >= e ? 1 : r(t)
                      }
                    }
                  })(t)
                : t,
              l,
            ))
          )(+n)
        }
        return (
          (d.invert = function(t) {
            return (
              i ||
              (i = e(
                c,
                a,
                v,
                s
                  ? (function(t) {
                      return function(n, e) {
                        var r = t((n = +n), (e = +e))
                        return function(t) {
                          return t <= 0 ? n : t >= 1 ? e : r(t)
                        }
                      }
                    })(n)
                  : n,
              ))
            )(+t)
          }),
          (d.domain = function(t) {
            return arguments.length ? ((a = o.call(t, p)), f()) : a.slice()
          }),
          (d.range = function(t) {
            return arguments.length ? ((c = u.call(t)), f()) : c.slice()
          }),
          (d.rangeRound = function(t) {
            return (c = u.call(t)), (l = h.interpolateRound), f()
          }),
          (d.clamp = function(t) {
            return arguments.length ? ((s = !!t), f()) : s
          }),
          (d.interpolate = function(t) {
            return arguments.length ? ((l = t), f()) : l
          }),
          f()
        )
      }
      var b = e(5),
        w = function(t, n, e) {
          var i,
            a = t[0],
            o = t[t.length - 1],
            u = Object(r.tickStep)(a, o, null == n ? 10 : n)
          switch ((e = Object(b.formatSpecifier)(null == e ? ',f' : e)).type) {
            case 's':
              var c = Math.max(Math.abs(a), Math.abs(o))
              return (
                null != e.precision ||
                  isNaN((i = Object(b.precisionPrefix)(u, c))) ||
                  (e.precision = i),
                Object(b.formatPrefix)(e, c)
              )
            case '':
            case 'e':
            case 'g':
            case 'p':
            case 'r':
              null != e.precision ||
                isNaN(
                  (i = Object(b.precisionRound)(
                    u,
                    Math.max(Math.abs(a), Math.abs(o)),
                  )),
                ) ||
                (e.precision = i - ('e' === e.type))
              break
            case 'f':
            case '%':
              null != e.precision ||
                isNaN((i = Object(b.precisionFixed)(u))) ||
                (e.precision = i - 2 * ('%' === e.type))
          }
          return Object(b.format)(e)
        }
      function M(t) {
        var n = t.domain
        return (
          (t.ticks = function(t) {
            var e = n()
            return Object(r.ticks)(e[0], e[e.length - 1], null == t ? 10 : t)
          }),
          (t.tickFormat = function(t, e) {
            return w(n(), t, e)
          }),
          (t.nice = function(e) {
            null == e && (e = 10)
            var i,
              a = n(),
              o = 0,
              u = a.length - 1,
              c = a[o],
              l = a[u]
            return (
              l < c && ((i = c), (c = l), (l = i), (i = o), (o = u), (u = i)),
              (i = Object(r.tickIncrement)(c, l, e)) > 0
                ? ((c = Math.floor(c / i) * i),
                  (l = Math.ceil(l / i) * i),
                  (i = Object(r.tickIncrement)(c, l, e)))
                : i < 0 &&
                  ((c = Math.ceil(c * i) / i),
                  (l = Math.floor(l * i) / i),
                  (i = Object(r.tickIncrement)(c, l, e))),
              i > 0
                ? ((a[o] = Math.floor(c / i) * i),
                  (a[u] = Math.ceil(l / i) * i),
                  n(a))
                : i < 0 &&
                  ((a[o] = Math.ceil(c * i) / i),
                  (a[u] = Math.floor(l * i) / i),
                  n(a)),
              t
            )
          }),
          t
        )
      }
      function A() {
        var t = _(v, h.interpolateNumber)
        return (
          (t.copy = function() {
            return x(t, A())
          }),
          M(t)
        )
      }
      function k() {
        var t = [0, 1]
        function n(t) {
          return +t
        }
        return (
          (n.invert = n),
          (n.domain = n.range = function(e) {
            return arguments.length ? ((t = o.call(e, p)), n) : t.slice()
          }),
          (n.copy = function() {
            return k().domain(t)
          }),
          M(n)
        )
      }
      var T = function(t, n) {
        var e,
          r = 0,
          i = (t = t.slice()).length - 1,
          a = t[r],
          o = t[i]
        return (
          o < a && ((e = r), (r = i), (i = e), (e = a), (a = o), (o = e)),
          (t[r] = n.floor(a)),
          (t[i] = n.ceil(o)),
          t
        )
      }
      function O(t, n) {
        return (n = Math.log(n / t))
          ? function(e) {
              return Math.log(e / t) / n
            }
          : d(n)
      }
      function S(t, n) {
        return t < 0
          ? function(e) {
              return -Math.pow(-n, e) * Math.pow(-t, 1 - e)
            }
          : function(e) {
              return Math.pow(n, e) * Math.pow(t, 1 - e)
            }
      }
      function C(t) {
        return isFinite(t) ? +('1e' + t) : t < 0 ? 0 : t
      }
      function E(t) {
        return 10 === t
          ? C
          : t === Math.E
          ? Math.exp
          : function(n) {
              return Math.pow(t, n)
            }
      }
      function N(t) {
        return t === Math.E
          ? Math.log
          : (10 === t && Math.log10) ||
              (2 === t && Math.log2) ||
              ((t = Math.log(t)),
              function(n) {
                return Math.log(n) / t
              })
      }
      function D(t) {
        return function(n) {
          return -t(-n)
        }
      }
      function F() {
        var t = _(O, S).domain([1, 10]),
          n = t.domain,
          e = 10,
          i = N(10),
          a = E(10)
        function o() {
          return (
            (i = N(e)), (a = E(e)), n()[0] < 0 && ((i = D(i)), (a = D(a))), t
          )
        }
        return (
          (t.base = function(t) {
            return arguments.length ? ((e = +t), o()) : e
          }),
          (t.domain = function(t) {
            return arguments.length ? (n(t), o()) : n()
          }),
          (t.ticks = function(t) {
            var o,
              u = n(),
              c = u[0],
              l = u[u.length - 1]
            ;(o = l < c) && ((d = c), (c = l), (l = d))
            var s,
              f,
              h,
              d = i(c),
              p = i(l),
              g = null == t ? 10 : +t,
              v = []
            if (!(e % 1) && p - d < g) {
              if (((d = Math.round(d) - 1), (p = Math.round(p) + 1), c > 0)) {
                for (; d < p; ++d)
                  for (f = 1, s = a(d); f < e; ++f)
                    if (!((h = s * f) < c)) {
                      if (h > l) break
                      v.push(h)
                    }
              } else
                for (; d < p; ++d)
                  for (f = e - 1, s = a(d); f >= 1; --f)
                    if (!((h = s * f) < c)) {
                      if (h > l) break
                      v.push(h)
                    }
            } else v = Object(r.ticks)(d, p, Math.min(p - d, g)).map(a)
            return o ? v.reverse() : v
          }),
          (t.tickFormat = function(n, r) {
            if (
              (null == r && (r = 10 === e ? '.0e' : ','),
              'function' != typeof r && (r = Object(b.format)(r)),
              n === 1 / 0)
            )
              return r
            null == n && (n = 10)
            var o = Math.max(1, (e * n) / t.ticks().length)
            return function(t) {
              var n = t / a(Math.round(i(t)))
              return n * e < e - 0.5 && (n *= e), n <= o ? r(t) : ''
            }
          }),
          (t.nice = function() {
            return n(
              T(n(), {
                floor: function(t) {
                  return a(Math.floor(i(t)))
                },
                ceil: function(t) {
                  return a(Math.ceil(i(t)))
                },
              }),
            )
          }),
          (t.copy = function() {
            return x(t, F().base(e))
          }),
          t
        )
      }
      function L(t, n) {
        return t < 0 ? -Math.pow(-t, n) : Math.pow(t, n)
      }
      function j() {
        var t = 1,
          n = _(
            function(n, e) {
              return (e = L(e, t) - (n = L(n, t)))
                ? function(r) {
                    return (L(r, t) - n) / e
                  }
                : d(e)
            },
            function(n, e) {
              return (
                (e = L(e, t) - (n = L(n, t))),
                function(r) {
                  return L(n + e * r, 1 / t)
                }
              )
            },
          ),
          e = n.domain
        return (
          (n.exponent = function(n) {
            return arguments.length ? ((t = +n), e(e())) : t
          }),
          (n.copy = function() {
            return x(n, j().exponent(t))
          }),
          M(n)
        )
      }
      function B() {
        return j().exponent(0.5)
      }
      function I() {
        var t = [],
          n = [],
          e = []
        function i() {
          var i = 0,
            o = Math.max(1, n.length)
          for (e = new Array(o - 1); ++i < o; )
            e[i - 1] = Object(r.quantile)(t, i / o)
          return a
        }
        function a(t) {
          if (!isNaN((t = +t))) return n[Object(r.bisect)(e, t)]
        }
        return (
          (a.invertExtent = function(r) {
            var i = n.indexOf(r)
            return i < 0
              ? [NaN, NaN]
              : [i > 0 ? e[i - 1] : t[0], i < e.length ? e[i] : t[t.length - 1]]
          }),
          (a.domain = function(n) {
            if (!arguments.length) return t.slice()
            t = []
            for (var e, a = 0, o = n.length; a < o; ++a)
              null == (e = n[a]) || isNaN((e = +e)) || t.push(e)
            return t.sort(r.ascending), i()
          }),
          (a.range = function(t) {
            return arguments.length ? ((n = u.call(t)), i()) : n.slice()
          }),
          (a.quantiles = function() {
            return e.slice()
          }),
          (a.copy = function() {
            return I()
              .domain(t)
              .range(n)
          }),
          a
        )
      }
      function P() {
        var t = 0,
          n = 1,
          e = 1,
          i = [0.5],
          a = [0, 1]
        function o(t) {
          if (t <= t) return a[Object(r.bisect)(i, t, 0, e)]
        }
        function c() {
          var r = -1
          for (i = new Array(e); ++r < e; )
            i[r] = ((r + 1) * n - (r - e) * t) / (e + 1)
          return o
        }
        return (
          (o.domain = function(e) {
            return arguments.length ? ((t = +e[0]), (n = +e[1]), c()) : [t, n]
          }),
          (o.range = function(t) {
            return arguments.length
              ? ((e = (a = u.call(t)).length - 1), c())
              : a.slice()
          }),
          (o.invertExtent = function(r) {
            var o = a.indexOf(r)
            return o < 0
              ? [NaN, NaN]
              : o < 1
              ? [t, i[0]]
              : o >= e
              ? [i[e - 1], n]
              : [i[o - 1], i[o]]
          }),
          (o.copy = function() {
            return P()
              .domain([t, n])
              .range(a)
          }),
          M(o)
        )
      }
      function R() {
        var t = [0.5],
          n = [0, 1],
          e = 1
        function i(i) {
          if (i <= i) return n[Object(r.bisect)(t, i, 0, e)]
        }
        return (
          (i.domain = function(r) {
            return arguments.length
              ? ((t = u.call(r)), (e = Math.min(t.length, n.length - 1)), i)
              : t.slice()
          }),
          (i.range = function(r) {
            return arguments.length
              ? ((n = u.call(r)), (e = Math.min(t.length, n.length - 1)), i)
              : n.slice()
          }),
          (i.invertExtent = function(e) {
            var r = n.indexOf(e)
            return [t[r - 1], t[r]]
          }),
          (i.copy = function() {
            return R()
              .domain(t)
              .range(n)
          }),
          i
        )
      }
      var U = e(2),
        H = e(13),
        z = 1e3,
        Y = 60 * z,
        q = 60 * Y,
        G = 24 * q,
        W = 7 * G,
        X = 30 * G,
        V = 365 * G
      function $(t) {
        return new Date(t)
      }
      function Z(t) {
        return t instanceof Date ? +t : +new Date(+t)
      }
      function Q(t, n, e, i, a, u, c, l, s) {
        var f = _(v, h.interpolateNumber),
          d = f.invert,
          p = f.domain,
          g = s('.%L'),
          y = s(':%S'),
          m = s('%I:%M'),
          b = s('%I %p'),
          w = s('%a %d'),
          M = s('%b %d'),
          A = s('%B'),
          k = s('%Y'),
          O = [
            [c, 1, z],
            [c, 5, 5 * z],
            [c, 15, 15 * z],
            [c, 30, 30 * z],
            [u, 1, Y],
            [u, 5, 5 * Y],
            [u, 15, 15 * Y],
            [u, 30, 30 * Y],
            [a, 1, q],
            [a, 3, 3 * q],
            [a, 6, 6 * q],
            [a, 12, 12 * q],
            [i, 1, G],
            [i, 2, 2 * G],
            [e, 1, W],
            [n, 1, X],
            [n, 3, 3 * X],
            [t, 1, V],
          ]
        function S(r) {
          return (c(r) < r
            ? g
            : u(r) < r
            ? y
            : a(r) < r
            ? m
            : i(r) < r
            ? b
            : n(r) < r
            ? e(r) < r
              ? w
              : M
            : t(r) < r
            ? A
            : k)(r)
        }
        function C(n, e, i, a) {
          if ((null == n && (n = 10), 'number' == typeof n)) {
            var o = Math.abs(i - e) / n,
              u = Object(r.bisector)(function(t) {
                return t[2]
              }).right(O, o)
            u === O.length
              ? ((a = Object(r.tickStep)(e / V, i / V, n)), (n = t))
              : u
              ? ((a = (u = O[o / O[u - 1][2] < O[u][2] / o ? u - 1 : u])[1]),
                (n = u[0]))
              : ((a = Math.max(Object(r.tickStep)(e, i, n), 1)), (n = l))
          }
          return null == a ? n : n.every(a)
        }
        return (
          (f.invert = function(t) {
            return new Date(d(t))
          }),
          (f.domain = function(t) {
            return arguments.length ? p(o.call(t, Z)) : p().map($)
          }),
          (f.ticks = function(t, n) {
            var e,
              r = p(),
              i = r[0],
              a = r[r.length - 1],
              o = a < i
            return (
              o && ((e = i), (i = a), (a = e)),
              (e = (e = C(t, i, a, n)) ? e.range(i, a + 1) : []),
              o ? e.reverse() : e
            )
          }),
          (f.tickFormat = function(t, n) {
            return null == n ? S : s(n)
          }),
          (f.nice = function(t, n) {
            var e = p()
            return (t = C(t, e[0], e[e.length - 1], n)) ? p(T(e, t)) : f
          }),
          (f.copy = function() {
            return x(f, Q(t, n, e, i, a, u, c, l, s))
          }),
          f
        )
      }
      var K = function() {
          return Q(
            U.timeYear,
            U.timeMonth,
            U.timeWeek,
            U.timeDay,
            U.timeHour,
            U.timeMinute,
            U.timeSecond,
            U.timeMillisecond,
            H.timeFormat,
          ).domain([new Date(2e3, 0, 1), new Date(2e3, 0, 2)])
        },
        J = function() {
          return Q(
            U.utcYear,
            U.utcMonth,
            U.utcWeek,
            U.utcDay,
            U.utcHour,
            U.utcMinute,
            U.utcSecond,
            U.utcMillisecond,
            H.utcFormat,
          ).domain([Date.UTC(2e3, 0, 1), Date.UTC(2e3, 0, 2)])
        }
      function tt(t) {
        var n = 0,
          e = 1,
          r = !1
        function i(i) {
          var a = (i - n) / (e - n)
          return t(r ? Math.max(0, Math.min(1, a)) : a)
        }
        return (
          (i.domain = function(t) {
            return arguments.length ? ((n = +t[0]), (e = +t[1]), i) : [n, e]
          }),
          (i.clamp = function(t) {
            return arguments.length ? ((r = !!t), i) : r
          }),
          (i.interpolator = function(n) {
            return arguments.length ? ((t = n), i) : t
          }),
          (i.copy = function() {
            return tt(t)
              .domain([n, e])
              .clamp(r)
          }),
          M(i)
        )
      }
      e.d(n, 'scaleBand', function() {
        return s
      }),
        e.d(n, 'scalePoint', function() {
          return f
        }),
        e.d(n, 'scaleIdentity', function() {
          return k
        }),
        e.d(n, 'scaleLinear', function() {
          return A
        }),
        e.d(n, 'scaleLog', function() {
          return F
        }),
        e.d(n, 'scaleOrdinal', function() {
          return l
        }),
        e.d(n, 'scaleImplicit', function() {
          return c
        }),
        e.d(n, 'scalePow', function() {
          return j
        }),
        e.d(n, 'scaleSqrt', function() {
          return B
        }),
        e.d(n, 'scaleQuantile', function() {
          return I
        }),
        e.d(n, 'scaleQuantize', function() {
          return P
        }),
        e.d(n, 'scaleThreshold', function() {
          return R
        }),
        e.d(n, 'scaleTime', function() {
          return K
        }),
        e.d(n, 'scaleUtc', function() {
          return J
        }),
        e.d(n, 'scaleSequential', function() {
          return tt
        })
    },
    function(t, n, e) {
      'use strict'
      var r
      void 0 ===
        (r = function(t) {
          var n = e(9).colorSchemas,
            r = (e(15), e(26)),
            i = 'undefined' != typeof window,
            a = navigator.msSaveOrOpenBlob,
            o =
              'Sorry, this feature is not available for IE. If you require this to work, check this issue https://github.com/eventbrite/britecharts/pull/652',
            u = i && window.btoa
          u || (u = e(27).encode)
          var c = function(t) {
              return u(
                encodeURIComponent(t).replace(/%([0-9A-F]{2})/g, function(
                  t,
                  n,
                ) {
                  return String.fromCharCode('0x' + n)
                }),
              )
            },
            l = {
              styleClass: 'britechartStyle',
              defaultFilename: 'britechart.png',
              chartBackground: 'white',
              imageSourceBase: 'data:image/svg+xml;base64,',
              titleFontSize: '15px',
              titleFontFamily: "'Benton Sans', sans-serif",
              titleTopOffset: 15,
              get styleBackgroundString() {
                return (
                  '<style>svg{background:' + this.chartBackground + ';}</style>'
                )
              },
            }
          function s(t, e) {
            if (t) {
              t.attr('version', 1.1).attr('xmlns', 'http://www.w3.org/2000/svg')
              var i = r.initializeSerializer()(t.node())
              return (
                (i = (function(t) {
                  if (navigator.userAgent.search('FireFox') > -1)
                    return t.replace(
                      /url.*&quot;\)/,
                      'url(&quot;linearGradient[id*="-gradient-"]&quot;);',
                    )
                  return t
                })(i)),
                (i = (function(t) {
                  return t.replace('>', '>' + l.styleBackgroundString)
                })(
                  (i = function(t, e, r) {
                    if (!e || !r) return t
                    var i = n.grey
                    return (t = t.replace(
                      /<g/,
                      '<text x="' +
                        this.margin().left +
                        '" y="' +
                        l.titleTopOffset +
                        '" font-family="' +
                        l.titleFontFamily +
                        '" font-size="' +
                        l.titleFontSize +
                        '" fill="' +
                        i[6] +
                        '"> ' +
                        e +
                        ' </text><g ',
                    ))
                  }.call(this, i, e, parseInt(t.attr('width'), 10))),
                ))
              )
            }
          }
          function f(t) {
            var n = new Image()
            return (n.src = '' + l.imageSourceBase + c(t)), n
          }
          function h(t, n) {
            return n.getContext('2d').drawImage(t, 0, 0), n
          }
          return {
            exportChart: function(t, n, e) {
              if (a) return console.error(o), !1
              var r,
                i,
                u,
                c = f(s.call(this, t, e))
              c.onload = function(t, n, e) {
                e.preventDefault(),
                  (function(t) {
                    var n =
                        arguments.length > 1 && void 0 !== arguments[1]
                          ? arguments[1]
                          : l.defaultFilename,
                      e =
                        arguments.length > 2 && void 0 !== arguments[2]
                          ? arguments[2]
                          : 'image/png',
                      r = t.toDataURL(e),
                      i = document.createElement('a')
                    ;(i.href = r),
                      (i.download = n),
                      document.body.appendChild(i),
                      i.click(),
                      document.body.removeChild(i)
                  })(h(this, t), n)
              }.bind(
                c,
                ((r = this.width()),
                (i = this.height()),
                ((u = document.createElement('canvas')).height = i),
                (u.width = r),
                u),
                n,
              )
            },
            convertSvgToHtml: s,
            createImage: f,
            drawImageOnCanvas: h,
          }
        }.call(n, e, n, t)) || (t.exports = r)
    },
    function(t, n, e) {
      'use strict'
      var r
      void 0 ===
        (r = function() {
          return {
            bar:
              '\n            <svg class="load-state bar-load-state" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 711 325">\n              \n            <defs>\n                <linearGradient id="lgrad" x1="0%" y1="50%" x2="100%" y2="50%" >\n                    <stop offset="0" stop-color="#ffffff" stop-opacity="0.8" />\n                    <stop offset="33.33%" stop-color="#ffffff" stop-opacity="0.8" />\n                    <stop offset="50%" stop-color="#ffffff" stop-opacity="0" />\n                    <stop offset="66.66%" stop-color="#ffffff" stop-opacity="0.8" />\n                    <stop offset="100%" stop-color="#ffffff" stop-opacity="0.8" />\n                </linearGradient>\n            </defs>\n        \n                <g fill="none" fill-rule="evenodd">\n                    <g transform="translate(0 29)">\n                        <g stroke="#EFF2F5" stroke-dasharray="4 4">\n                            <path d="M.400592911 200.302477L710.674315 200.302477M.400592884 131.172748L710.674315 131.172748M.324410282 64.2071321L710.621499 64.2071321M.291004517.563888874L709.82431.563888889"/>\n                        </g>\n                        <g fill="#D2D6DF" transform="translate(63.08 11)">\n                            <polygon points="-.08 176 23.92 176 23.92 255 -.08 255"/>\n                            <polygon points="50.829 147 74.829 147 74.829 255 50.829 255"/>\n                            <polygon points="254.465 0 278.465 0 278.465 255 254.465 255"/>\n                            <polygon points="458.102 169 482.102 169 482.102 255 458.102 255"/>\n                            <polygon points="152.647 82 176.647 82 176.647 255 152.647 255"/>\n                            <polygon points="356.283 66 380.283 66 380.283 255 356.283 255"/>\n                            <polygon points="559.92 229 583.92 229 583.92 255 559.92 255"/>\n                            <polygon points="101.738 115 125.738 115 125.738 255 101.738 255"/>\n                            <polygon points="305.374 42 329.374 42 329.374 255 305.374 255"/>\n                            <polygon points="509.011 201 533.011 201 533.011 255 509.011 255"/>\n                            <polygon points="203.556 19 227.556 19 227.556 255 203.556 255"/>\n                            <polygon points="407.192 115 431.192 115 431.192 255 407.192 255"/>\n                        </g>\n                    </g>\n                    <polygon fill="#D2D6DF" fill-rule="nonzero" points="0 295 711 295 711 294 0 294"/>\n                </g>\n                <rect class="chart-filter" fill="url(#lgrad)" x="-100%" y="0" width="300%" height="100%"></rect>\n            </svg>\n        ',
            donut:
              '\n            <svg class="load-state donut-load-state" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 376 331">\n                \n            <defs>\n                <linearGradient id="lgrad" x1="0%" y1="50%" x2="100%" y2="50%" >\n                    <stop offset="0" stop-color="#ffffff" stop-opacity="0.8" />\n                    <stop offset="33.33%" stop-color="#ffffff" stop-opacity="0.8" />\n                    <stop offset="50%" stop-color="#ffffff" stop-opacity="0" />\n                    <stop offset="66.66%" stop-color="#ffffff" stop-opacity="0.8" />\n                    <stop offset="100%" stop-color="#ffffff" stop-opacity="0.8" />\n                </linearGradient>\n            </defs>\n        \n                <g fill="none" fill-rule="evenodd">\n                    <g transform="translate(116 107)">\n                        <circle cx="72" cy="72" r="72" stroke="#EFF2F5" stroke-linecap="round" stroke-width="9.6"/>\n                        <path stroke="#D2D6DF" stroke-width="19.2" d="M126.153559,119.524055 C137.264629,106.845712 144,90.2321371 144,72.0444604 C144,32.2554036 111.764502,0 72,0"/>\n                        <circle cx="72" cy="72" r="67.2" fill="#FFF"/>\n                    </g>\n                </g>\n                <rect class="chart-filter" fill="url(#lgrad)" x="-100%" y="0" width="300%" height="100%"></rect>\n            </svg>\n        ',
            line:
              '\n            <svg\n                class="load-state line-load-state"\n                xmlns="http://www.w3.org/2000/svg"\n                viewBox="0 0 711 325"\n            >\n                \n            <defs>\n                <linearGradient id="lgrad" x1="0%" y1="50%" x2="100%" y2="50%" >\n                    <stop offset="0" stop-color="#ffffff" stop-opacity="0.8" />\n                    <stop offset="33.33%" stop-color="#ffffff" stop-opacity="0.8" />\n                    <stop offset="50%" stop-color="#ffffff" stop-opacity="0" />\n                    <stop offset="66.66%" stop-color="#ffffff" stop-opacity="0.8" />\n                    <stop offset="100%" stop-color="#ffffff" stop-opacity="0.8" />\n                </linearGradient>\n            </defs>\n        \n                <path\n                    id="chart-bg"\n                    class="chart-bg"\n                    style="stroke:#C3C6CF;"\n                    d="M3.4,216.5h707.3 M3.4,160.5h707.3 M3.3,103.5h707.3 M3.3,48.5h707.6 M0.4,276.6H710H0.4z"\n                />\n                <polyline\n                    id="chart-line"\n                    class="chart-line"\n                    style="stroke:#C3C6CF;stroke-width:4;fill:none;"\n                    points="8.8,175.8 62.4,237.7 116.1,184.7 169.7,175.8 223.3,57 277,176.8 330.6,176.8 384.3,122.5 437.9,176.8 491.6,176.8 545.2,218.4 598.8,122.5 652.5,184.7 706.1,135.1 "\n                />\n                <rect class="chart-filter" fill="url(#lgrad)" x="-100%" y="0" width="300%" height="100%"></rect>\n            </svg>\n        ',
            stackedArea:
              '\n            <svg\n                class="load-state stacked-area-load-state"\n                xmlns="http://www.w3.org/2000/svg"\n                viewBox="0 0 711 325"\n            >\n                \n            <defs>\n                <linearGradient id="lgrad" x1="0%" y1="50%" x2="100%" y2="50%" >\n                    <stop offset="0" stop-color="#ffffff" stop-opacity="0.8" />\n                    <stop offset="33.33%" stop-color="#ffffff" stop-opacity="0.8" />\n                    <stop offset="50%" stop-color="#ffffff" stop-opacity="0" />\n                    <stop offset="66.66%" stop-color="#ffffff" stop-opacity="0.8" />\n                    <stop offset="100%" stop-color="#ffffff" stop-opacity="0.8" />\n                </linearGradient>\n            </defs>\n        \n                <path\n                    id="chart-bg"\n                    class="chart-bg"\n                    style="stroke:#C3C6CF;"\n                    d="M3.4,216.5h707.3 M3.4,160.5h707.3 M3.3,103.5h707.3 M3.3,48.5h707.6 M0.4,276.6H710H0.4z"\n                />\n                <g transform="translate(20 50)">\n                    <path\n                        id="chart-area"\n                        strokeLinecap="square"\n                        d="M0.34233103,0.593688165 L709.977885,0.593688189"\n                        transform="translate(.01 227.976)"\n                    />\n                    <path fill="#C3C6CF" d="M0.528124801,224.014648 L0.528124801,177.734375 L53.3834796,177.734375 C71.5390789,177.734375 86.8277373,168.972754 101.240241,151.662202 C112.578335,138.044258 121.139826,123.110227 136.974507,91.596773 C137.343842,90.8617404 139.300293,86.9654028 139.856735,85.8583549 C155.041692,55.6476711 163.354313,41.0906306 174.319873,27.7179171 C188.951312,9.87459412 204.885845,0.5 223.830634,0.5 C242.123071,0.5 257.291724,8.27027858 270.907992,23.1359289 C281.228683,34.4036118 289.135925,47.1272372 302.542017,72.085092 C303.275893,73.4513345 306.289669,79.0766612 307.063369,80.5168656 C321.41025,107.222876 330.088083,120.97663 341.470704,132.92446 C355.88994,148.05969 371.908861,155.792969 391.654853,155.792969 C412.142049,155.792969 428.763593,152.325614 442.880698,145.765582 C454.197328,140.506893 463.373931,133.679865 473.786035,123.626931 C476.528659,120.978915 486.44777,110.911455 488.791866,108.6483 C502.907223,95.0203436 514.194325,88.9355469 530.135322,88.9355469 C546.532652,88.9355469 559.505909,97.338499 575.973261,115.41103 C579.723508,119.526837 593.103621,135.086814 592.915496,134.871799 C605.09738,148.794859 614.368835,157.635549 625.072091,164.58539 C638.386599,173.230769 652.701021,177.734375 669.279853,177.734375 L673.779853,177.734375 L673.779853,224.014648 L0.528124801,224.014648 Z" />\n                </g>\n                <rect class="chart-filter" fill="url(#lgrad)" x="-100%" y="0" width="300%" height="100%"></rect>\n            </svg>\n        ',
          }
        }.call(n, e, n, t)) || (t.exports = r)
    },
    function(t, n, e) {
      'use strict'
      e.r(n)
      var r = e(2)
      function i(t) {
        if (0 <= t.y && t.y < 100) {
          var n = new Date(-1, t.m, t.d, t.H, t.M, t.S, t.L)
          return n.setFullYear(t.y), n
        }
        return new Date(t.y, t.m, t.d, t.H, t.M, t.S, t.L)
      }
      function a(t) {
        if (0 <= t.y && t.y < 100) {
          var n = new Date(Date.UTC(-1, t.m, t.d, t.H, t.M, t.S, t.L))
          return n.setUTCFullYear(t.y), n
        }
        return new Date(Date.UTC(t.y, t.m, t.d, t.H, t.M, t.S, t.L))
      }
      function o(t) {
        return { y: t, m: 0, d: 1, H: 0, M: 0, S: 0, L: 0 }
      }
      function u(t) {
        var n = t.dateTime,
          e = t.date,
          r = t.time,
          u = t.periods,
          c = t.days,
          l = t.shortDays,
          s = t.months,
          f = t.shortMonths,
          h = x(u),
          p = _(u),
          g = x(c),
          v = _(c),
          y = x(l),
          m = _(l),
          st = x(s),
          ft = _(s),
          ht = x(f),
          dt = _(f),
          pt = {
            a: function(t) {
              return l[t.getDay()]
            },
            A: function(t) {
              return c[t.getDay()]
            },
            b: function(t) {
              return f[t.getMonth()]
            },
            B: function(t) {
              return s[t.getMonth()]
            },
            c: null,
            d: j,
            e: j,
            H: B,
            I: I,
            j: P,
            L: R,
            m: U,
            M: H,
            p: function(t) {
              return u[+(t.getHours() >= 12)]
            },
            S: z,
            U: Y,
            w: q,
            W: G,
            x: null,
            X: null,
            y: W,
            Y: X,
            Z: V,
            '%': lt,
          },
          gt = {
            a: function(t) {
              return l[t.getUTCDay()]
            },
            A: function(t) {
              return c[t.getUTCDay()]
            },
            b: function(t) {
              return f[t.getUTCMonth()]
            },
            B: function(t) {
              return s[t.getUTCMonth()]
            },
            c: null,
            d: $,
            e: $,
            H: Z,
            I: Q,
            j: K,
            L: J,
            m: tt,
            M: nt,
            p: function(t) {
              return u[+(t.getUTCHours() >= 12)]
            },
            S: et,
            U: rt,
            w: it,
            W: at,
            x: null,
            X: null,
            y: ot,
            Y: ut,
            Z: ct,
            '%': lt,
          },
          vt = {
            a: function(t, n, e) {
              var r = y.exec(n.slice(e))
              return r ? ((t.w = m[r[0].toLowerCase()]), e + r[0].length) : -1
            },
            A: function(t, n, e) {
              var r = g.exec(n.slice(e))
              return r ? ((t.w = v[r[0].toLowerCase()]), e + r[0].length) : -1
            },
            b: function(t, n, e) {
              var r = ht.exec(n.slice(e))
              return r ? ((t.m = dt[r[0].toLowerCase()]), e + r[0].length) : -1
            },
            B: function(t, n, e) {
              var r = st.exec(n.slice(e))
              return r ? ((t.m = ft[r[0].toLowerCase()]), e + r[0].length) : -1
            },
            c: function(t, e, r) {
              return xt(t, n, e, r)
            },
            d: S,
            e: S,
            H: E,
            I: E,
            j: C,
            L: F,
            m: O,
            M: N,
            p: function(t, n, e) {
              var r = h.exec(n.slice(e))
              return r ? ((t.p = p[r[0].toLowerCase()]), e + r[0].length) : -1
            },
            S: D,
            U: w,
            w: b,
            W: M,
            x: function(t, n, r) {
              return xt(t, e, n, r)
            },
            X: function(t, n, e) {
              return xt(t, r, n, e)
            },
            y: k,
            Y: A,
            Z: T,
            '%': L,
          }
        function yt(t, n) {
          return function(e) {
            var r,
              i,
              a,
              o = [],
              u = -1,
              c = 0,
              l = t.length
            for (e instanceof Date || (e = new Date(+e)); ++u < l; )
              37 === t.charCodeAt(u) &&
                (o.push(t.slice(c, u)),
                null != (i = d[(r = t.charAt(++u))])
                  ? (r = t.charAt(++u))
                  : (i = 'e' === r ? ' ' : '0'),
                (a = n[r]) && (r = a(e, i)),
                o.push(r),
                (c = u + 1))
            return o.push(t.slice(c, u)), o.join('')
          }
        }
        function mt(t, n) {
          return function(e) {
            var r = o(1900)
            if (xt(r, t, (e += ''), 0) != e.length) return null
            if (
              ('p' in r && (r.H = (r.H % 12) + 12 * r.p), 'W' in r || 'U' in r)
            ) {
              'w' in r || (r.w = 'W' in r ? 1 : 0)
              var i = 'Z' in r ? a(o(r.y)).getUTCDay() : n(o(r.y)).getDay()
              ;(r.m = 0),
                (r.d =
                  'W' in r
                    ? ((r.w + 6) % 7) + 7 * r.W - ((i + 5) % 7)
                    : r.w + 7 * r.U - ((i + 6) % 7))
            }
            return 'Z' in r
              ? ((r.H += (r.Z / 100) | 0), (r.M += r.Z % 100), a(r))
              : n(r)
          }
        }
        function xt(t, n, e, r) {
          for (var i, a, o = 0, u = n.length, c = e.length; o < u; ) {
            if (r >= c) return -1
            if (37 === (i = n.charCodeAt(o++))) {
              if (
                ((i = n.charAt(o++)),
                !(a = vt[i in d ? n.charAt(o++) : i]) || (r = a(t, e, r)) < 0)
              )
                return -1
            } else if (i != e.charCodeAt(r++)) return -1
          }
          return r
        }
        return (
          (pt.x = yt(e, pt)),
          (pt.X = yt(r, pt)),
          (pt.c = yt(n, pt)),
          (gt.x = yt(e, gt)),
          (gt.X = yt(r, gt)),
          (gt.c = yt(n, gt)),
          {
            format: function(t) {
              var n = yt((t += ''), pt)
              return (
                (n.toString = function() {
                  return t
                }),
                n
              )
            },
            parse: function(t) {
              var n = mt((t += ''), i)
              return (
                (n.toString = function() {
                  return t
                }),
                n
              )
            },
            utcFormat: function(t) {
              var n = yt((t += ''), gt)
              return (
                (n.toString = function() {
                  return t
                }),
                n
              )
            },
            utcParse: function(t) {
              var n = mt(t, a)
              return (
                (n.toString = function() {
                  return t
                }),
                n
              )
            },
          }
        )
      }
      var c,
        l,
        s,
        f,
        h,
        d = { '-': '', _: ' ', 0: '0' },
        p = /^\s*\d+/,
        g = /^%/,
        v = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g
      function y(t, n, e) {
        var r = t < 0 ? '-' : '',
          i = (r ? -t : t) + '',
          a = i.length
        return r + (a < e ? new Array(e - a + 1).join(n) + i : i)
      }
      function m(t) {
        return t.replace(v, '\\$&')
      }
      function x(t) {
        return new RegExp('^(?:' + t.map(m).join('|') + ')', 'i')
      }
      function _(t) {
        for (var n = {}, e = -1, r = t.length; ++e < r; )
          n[t[e].toLowerCase()] = e
        return n
      }
      function b(t, n, e) {
        var r = p.exec(n.slice(e, e + 1))
        return r ? ((t.w = +r[0]), e + r[0].length) : -1
      }
      function w(t, n, e) {
        var r = p.exec(n.slice(e))
        return r ? ((t.U = +r[0]), e + r[0].length) : -1
      }
      function M(t, n, e) {
        var r = p.exec(n.slice(e))
        return r ? ((t.W = +r[0]), e + r[0].length) : -1
      }
      function A(t, n, e) {
        var r = p.exec(n.slice(e, e + 4))
        return r ? ((t.y = +r[0]), e + r[0].length) : -1
      }
      function k(t, n, e) {
        var r = p.exec(n.slice(e, e + 2))
        return r
          ? ((t.y = +r[0] + (+r[0] > 68 ? 1900 : 2e3)), e + r[0].length)
          : -1
      }
      function T(t, n, e) {
        var r = /^(Z)|([+-]\d\d)(?:\:?(\d\d))?/.exec(n.slice(e, e + 6))
        return r
          ? ((t.Z = r[1] ? 0 : -(r[2] + (r[3] || '00'))), e + r[0].length)
          : -1
      }
      function O(t, n, e) {
        var r = p.exec(n.slice(e, e + 2))
        return r ? ((t.m = r[0] - 1), e + r[0].length) : -1
      }
      function S(t, n, e) {
        var r = p.exec(n.slice(e, e + 2))
        return r ? ((t.d = +r[0]), e + r[0].length) : -1
      }
      function C(t, n, e) {
        var r = p.exec(n.slice(e, e + 3))
        return r ? ((t.m = 0), (t.d = +r[0]), e + r[0].length) : -1
      }
      function E(t, n, e) {
        var r = p.exec(n.slice(e, e + 2))
        return r ? ((t.H = +r[0]), e + r[0].length) : -1
      }
      function N(t, n, e) {
        var r = p.exec(n.slice(e, e + 2))
        return r ? ((t.M = +r[0]), e + r[0].length) : -1
      }
      function D(t, n, e) {
        var r = p.exec(n.slice(e, e + 2))
        return r ? ((t.S = +r[0]), e + r[0].length) : -1
      }
      function F(t, n, e) {
        var r = p.exec(n.slice(e, e + 3))
        return r ? ((t.L = +r[0]), e + r[0].length) : -1
      }
      function L(t, n, e) {
        var r = g.exec(n.slice(e, e + 1))
        return r ? e + r[0].length : -1
      }
      function j(t, n) {
        return y(t.getDate(), n, 2)
      }
      function B(t, n) {
        return y(t.getHours(), n, 2)
      }
      function I(t, n) {
        return y(t.getHours() % 12 || 12, n, 2)
      }
      function P(t, n) {
        return y(1 + r.timeDay.count(Object(r.timeYear)(t), t), n, 3)
      }
      function R(t, n) {
        return y(t.getMilliseconds(), n, 3)
      }
      function U(t, n) {
        return y(t.getMonth() + 1, n, 2)
      }
      function H(t, n) {
        return y(t.getMinutes(), n, 2)
      }
      function z(t, n) {
        return y(t.getSeconds(), n, 2)
      }
      function Y(t, n) {
        return y(r.timeSunday.count(Object(r.timeYear)(t), t), n, 2)
      }
      function q(t) {
        return t.getDay()
      }
      function G(t, n) {
        return y(r.timeMonday.count(Object(r.timeYear)(t), t), n, 2)
      }
      function W(t, n) {
        return y(t.getFullYear() % 100, n, 2)
      }
      function X(t, n) {
        return y(t.getFullYear() % 1e4, n, 4)
      }
      function V(t) {
        var n = t.getTimezoneOffset()
        return (
          (n > 0 ? '-' : ((n *= -1), '+')) +
          y((n / 60) | 0, '0', 2) +
          y(n % 60, '0', 2)
        )
      }
      function $(t, n) {
        return y(t.getUTCDate(), n, 2)
      }
      function Z(t, n) {
        return y(t.getUTCHours(), n, 2)
      }
      function Q(t, n) {
        return y(t.getUTCHours() % 12 || 12, n, 2)
      }
      function K(t, n) {
        return y(1 + r.utcDay.count(Object(r.utcYear)(t), t), n, 3)
      }
      function J(t, n) {
        return y(t.getUTCMilliseconds(), n, 3)
      }
      function tt(t, n) {
        return y(t.getUTCMonth() + 1, n, 2)
      }
      function nt(t, n) {
        return y(t.getUTCMinutes(), n, 2)
      }
      function et(t, n) {
        return y(t.getUTCSeconds(), n, 2)
      }
      function rt(t, n) {
        return y(r.utcSunday.count(Object(r.utcYear)(t), t), n, 2)
      }
      function it(t) {
        return t.getUTCDay()
      }
      function at(t, n) {
        return y(r.utcMonday.count(Object(r.utcYear)(t), t), n, 2)
      }
      function ot(t, n) {
        return y(t.getUTCFullYear() % 100, n, 2)
      }
      function ut(t, n) {
        return y(t.getUTCFullYear() % 1e4, n, 4)
      }
      function ct() {
        return '+0000'
      }
      function lt() {
        return '%'
      }
      function st(t) {
        return (
          (c = u(t)),
          (l = c.format),
          (s = c.parse),
          (f = c.utcFormat),
          (h = c.utcParse),
          c
        )
      }
      st({
        dateTime: '%x, %X',
        date: '%-m/%-d/%Y',
        time: '%-I:%M:%S %p',
        periods: ['AM', 'PM'],
        days: [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ],
        shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        months: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ],
        shortMonths: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
      })
      var ft = Date.prototype.toISOString
        ? function(t) {
            return t.toISOString()
          }
        : f('%Y-%m-%dT%H:%M:%S.%LZ')
      var ht = +new Date('2000-01-01T00:00:00.000Z')
        ? function(t) {
            var n = new Date(t)
            return isNaN(n) ? null : n
          }
        : h('%Y-%m-%dT%H:%M:%S.%LZ')
      e.d(n, 'timeFormatDefaultLocale', function() {
        return st
      }),
        e.d(n, 'timeFormat', function() {
          return l
        }),
        e.d(n, 'timeParse', function() {
          return s
        }),
        e.d(n, 'utcFormat', function() {
          return f
        }),
        e.d(n, 'utcParse', function() {
          return h
        }),
        e.d(n, 'timeFormatLocale', function() {
          return u
        }),
        e.d(n, 'isoFormat', function() {
          return ft
        }),
        e.d(n, 'isoParse', function() {
          return ht
        })
    },
    function(t, n, e) {
      'use strict'
      e.r(n)
      var r = Array.prototype.slice,
        i = function(t) {
          return t
        },
        a = 1,
        o = 2,
        u = 3,
        c = 4,
        l = 1e-6
      function s(t) {
        return 'translate(' + (t + 0.5) + ',0)'
      }
      function f(t) {
        return 'translate(0,' + (t + 0.5) + ')'
      }
      function h() {
        return !this.__axis
      }
      function d(t, n) {
        var e = [],
          d = null,
          p = null,
          g = 6,
          v = 6,
          y = 3,
          m = t === a || t === c ? -1 : 1,
          x = t === c || t === o ? 'x' : 'y',
          _ = t === a || t === u ? s : f
        function b(r) {
          var s = null == d ? (n.ticks ? n.ticks.apply(n, e) : n.domain()) : d,
            f = null == p ? (n.tickFormat ? n.tickFormat.apply(n, e) : i) : p,
            b = Math.max(g, 0) + y,
            w = n.range(),
            M = +w[0] + 0.5,
            A = +w[w.length - 1] + 0.5,
            k = (n.bandwidth
              ? function(t) {
                  var n = Math.max(0, t.bandwidth() - 1) / 2
                  return (
                    t.round() && (n = Math.round(n)),
                    function(e) {
                      return +t(e) + n
                    }
                  )
                }
              : function(t) {
                  return function(n) {
                    return +t(n)
                  }
                })(n.copy()),
            T = r.selection ? r.selection() : r,
            O = T.selectAll('.domain').data([null]),
            S = T.selectAll('.tick')
              .data(s, n)
              .order(),
            C = S.exit(),
            E = S.enter()
              .append('g')
              .attr('class', 'tick'),
            N = S.select('line'),
            D = S.select('text')
          ;(O = O.merge(
            O.enter()
              .insert('path', '.tick')
              .attr('class', 'domain')
              .attr('stroke', '#000'),
          )),
            (S = S.merge(E)),
            (N = N.merge(
              E.append('line')
                .attr('stroke', '#000')
                .attr(x + '2', m * g),
            )),
            (D = D.merge(
              E.append('text')
                .attr('fill', '#000')
                .attr(x, m * b)
                .attr('dy', t === a ? '0em' : t === u ? '0.71em' : '0.32em'),
            )),
            r !== T &&
              ((O = O.transition(r)),
              (S = S.transition(r)),
              (N = N.transition(r)),
              (D = D.transition(r)),
              (C = C.transition(r)
                .attr('opacity', l)
                .attr('transform', function(t) {
                  return isFinite((t = k(t)))
                    ? _(t)
                    : this.getAttribute('transform')
                })),
              E.attr('opacity', l).attr('transform', function(t) {
                var n = this.parentNode.__axis
                return _(n && isFinite((n = n(t))) ? n : k(t))
              })),
            C.remove(),
            O.attr(
              'd',
              t === c || t == o
                ? 'M' + m * v + ',' + M + 'H0.5V' + A + 'H' + m * v
                : 'M' + M + ',' + m * v + 'V0.5H' + A + 'V' + m * v,
            ),
            S.attr('opacity', 1).attr('transform', function(t) {
              return _(k(t))
            }),
            N.attr(x + '2', m * g),
            D.attr(x, m * b).text(f),
            T.filter(h)
              .attr('fill', 'none')
              .attr('font-size', 10)
              .attr('font-family', 'sans-serif')
              .attr(
                'text-anchor',
                t === o ? 'start' : t === c ? 'end' : 'middle',
              ),
            T.each(function() {
              this.__axis = k
            })
        }
        return (
          (b.scale = function(t) {
            return arguments.length ? ((n = t), b) : n
          }),
          (b.ticks = function() {
            return (e = r.call(arguments)), b
          }),
          (b.tickArguments = function(t) {
            return arguments.length
              ? ((e = null == t ? [] : r.call(t)), b)
              : e.slice()
          }),
          (b.tickValues = function(t) {
            return arguments.length
              ? ((d = null == t ? null : r.call(t)), b)
              : d && d.slice()
          }),
          (b.tickFormat = function(t) {
            return arguments.length ? ((p = t), b) : p
          }),
          (b.tickSize = function(t) {
            return arguments.length ? ((g = v = +t), b) : g
          }),
          (b.tickSizeInner = function(t) {
            return arguments.length ? ((g = +t), b) : g
          }),
          (b.tickSizeOuter = function(t) {
            return arguments.length ? ((v = +t), b) : v
          }),
          (b.tickPadding = function(t) {
            return arguments.length ? ((y = +t), b) : y
          }),
          b
        )
      }
      function p(t) {
        return d(a, t)
      }
      function g(t) {
        return d(o, t)
      }
      function v(t) {
        return d(u, t)
      }
      function y(t) {
        return d(c, t)
      }
      e.d(n, 'axisTop', function() {
        return p
      }),
        e.d(n, 'axisRight', function() {
          return g
        }),
        e.d(n, 'axisBottom', function() {
          return v
        }),
        e.d(n, 'axisLeft', function() {
          return y
        })
    },
    function(t, n, e) {
      'use strict'
      var r
      void 0 ===
        (r = function() {
          var t = e(17),
            n = e(2)
          return {
            axisTimeCombinations: {
              MINUTE_HOUR: 'minute-hour',
              HOUR_DAY: 'hour-daymonth',
              DAY_MONTH: 'day-month',
              MONTH_YEAR: 'month-year',
              CUSTOM: 'custom',
            },
            curveMap: {
              linear: t.curveLinear,
              basis: t.curveBasis,
              cardinal: t.curveCardinal,
              catmullRom: t.curveCatmullRom,
              monotoneX: t.curveMonotoneX,
              monotoneY: t.curveMonotoneY,
              natural: t.curveNatural,
              step: t.curveStep,
              stepAfter: t.curveStepAfter,
              stepBefore: t.curveStepBefore,
            },
            emptyDonutData: [{ quantity: 1, percentage: 100 }],
            timeBenchmarks: {
              ONE_AND_A_HALF_YEARS: 47304e6,
              ONE_YEAR: 31536000365,
              ONE_DAY: 86400001,
            },
            lineGradientId: 'lineGradientId',
            timeIntervals: {
              timeMillisecond: n.timeMillisecond,
              utcMillisecond: n.utcMillisecond,
              timeSecond: n.timeSecond,
              utcSecond: n.utcSecond,
              timeMinute: n.timeMinute,
              utcMinute: n.utcMinute,
              timeHour: n.timeHour,
              utcHour: n.utcHour,
              timeDay: n.timeDay,
              utcDay: n.utcDay,
              timeWeek: n.timeWeek,
              utcWeek: n.utcWeek,
              timeSunday: n.timeSunday,
              utcSunday: n.utcSunday,
              timeMonday: n.timeMonday,
              utcMonday: n.utcMonday,
              timeTuesday: n.timeTuesday,
              utcTuesday: n.utcTuesday,
              timeWednesday: n.timeWednesday,
              utcWednesday: n.utcWednesday,
              timeThursday: n.timeThursday,
              utcThursday: n.utcThursday,
              timeFriday: n.timeFriday,
              utcFriday: n.utcFriday,
              timeSaturday: n.timeSaturday,
              utcSaturday: n.utcSaturday,
              timeMonth: n.timeMonth,
              utcMonth: n.utcMonth,
              timeYear: n.timeYear,
              utcYear: n.utcYear,
            },
          }
        }.call(n, e, n, t)) || (t.exports = r)
    },
    function(t, n, e) {
      'use strict'
      var r
      void 0 ===
        (r = function(t) {
          var n = e(5),
            r = 0,
            i = {
              small: { limit: 10, format: n.format('') },
              medium: { limit: 1e3, format: n.format('') },
              large: { limit: null, format: n.format('.2s') },
            },
            a = {
              small: { limit: 10, format: n.format('.3f') },
              medium: { limit: 100, format: n.format('.1f') },
              large: { limit: null, format: n.format('.2s') },
            },
            o = function(t, n) {
              var e = 'large'
              return (
                t < n.small.limit
                  ? (e = 'small')
                  : t < n.medium.limit && (e = 'medium'),
                e
              )
            }
          return {
            calculatePercent: function(t, e, r) {
              var i = e ? (t / e) * 100 : 0
              return n.format(r)(i)
            },
            isInteger: function(t) {
              return t % 1 == 0
            },
            formatDecimalValue: function(t) {
              var n = o(t, a)
              return (0, a[n].format)(t)
            },
            formatIntegerValue: function(t) {
              var n = o(t, i)
              return (0, i[n].format)(t)
            },
            uniqueId: function(t) {
              var n = ++r
              return t.toString() + '-' + n
            },
          }
        }.call(n, e, n, t)) || (t.exports = r)
    },
    function(t, n, e) {
      'use strict'
      e.r(n)
      var r = Math.PI,
        i = 2 * r,
        a = i - 1e-6
      function o() {
        ;(this._x0 = this._y0 = this._x1 = this._y1 = null), (this._ = '')
      }
      function u() {
        return new o()
      }
      o.prototype = u.prototype = {
        constructor: o,
        moveTo: function(t, n) {
          this._ +=
            'M' + (this._x0 = this._x1 = +t) + ',' + (this._y0 = this._y1 = +n)
        },
        closePath: function() {
          null !== this._x1 &&
            ((this._x1 = this._x0), (this._y1 = this._y0), (this._ += 'Z'))
        },
        lineTo: function(t, n) {
          this._ += 'L' + (this._x1 = +t) + ',' + (this._y1 = +n)
        },
        quadraticCurveTo: function(t, n, e, r) {
          this._ +=
            'Q' + +t + ',' + +n + ',' + (this._x1 = +e) + ',' + (this._y1 = +r)
        },
        bezierCurveTo: function(t, n, e, r, i, a) {
          this._ +=
            'C' +
            +t +
            ',' +
            +n +
            ',' +
            +e +
            ',' +
            +r +
            ',' +
            (this._x1 = +i) +
            ',' +
            (this._y1 = +a)
        },
        arcTo: function(t, n, e, i, a) {
          ;(t = +t), (n = +n), (e = +e), (i = +i), (a = +a)
          var o = this._x1,
            u = this._y1,
            c = e - t,
            l = i - n,
            s = o - t,
            f = u - n,
            h = s * s + f * f
          if (a < 0) throw new Error('negative radius: ' + a)
          if (null === this._x1)
            this._ += 'M' + (this._x1 = t) + ',' + (this._y1 = n)
          else if (h > 1e-6)
            if (Math.abs(f * c - l * s) > 1e-6 && a) {
              var d = e - o,
                p = i - u,
                g = c * c + l * l,
                v = d * d + p * p,
                y = Math.sqrt(g),
                m = Math.sqrt(h),
                x =
                  a * Math.tan((r - Math.acos((g + h - v) / (2 * y * m))) / 2),
                _ = x / m,
                b = x / y
              Math.abs(_ - 1) > 1e-6 &&
                (this._ += 'L' + (t + _ * s) + ',' + (n + _ * f)),
                (this._ +=
                  'A' +
                  a +
                  ',' +
                  a +
                  ',0,0,' +
                  +(f * d > s * p) +
                  ',' +
                  (this._x1 = t + b * c) +
                  ',' +
                  (this._y1 = n + b * l))
            } else this._ += 'L' + (this._x1 = t) + ',' + (this._y1 = n)
          else;
        },
        arc: function(t, n, e, o, u, c) {
          ;(t = +t), (n = +n)
          var l = (e = +e) * Math.cos(o),
            s = e * Math.sin(o),
            f = t + l,
            h = n + s,
            d = 1 ^ c,
            p = c ? o - u : u - o
          if (e < 0) throw new Error('negative radius: ' + e)
          null === this._x1
            ? (this._ += 'M' + f + ',' + h)
            : (Math.abs(this._x1 - f) > 1e-6 ||
                Math.abs(this._y1 - h) > 1e-6) &&
              (this._ += 'L' + f + ',' + h),
            e &&
              (p < 0 && (p = (p % i) + i),
              p > a
                ? (this._ +=
                    'A' +
                    e +
                    ',' +
                    e +
                    ',0,1,' +
                    d +
                    ',' +
                    (t - l) +
                    ',' +
                    (n - s) +
                    'A' +
                    e +
                    ',' +
                    e +
                    ',0,1,' +
                    d +
                    ',' +
                    (this._x1 = f) +
                    ',' +
                    (this._y1 = h))
                : p > 1e-6 &&
                  (this._ +=
                    'A' +
                    e +
                    ',' +
                    e +
                    ',0,' +
                    +(p >= r) +
                    ',' +
                    d +
                    ',' +
                    (this._x1 = t + e * Math.cos(u)) +
                    ',' +
                    (this._y1 = n + e * Math.sin(u))))
        },
        rect: function(t, n, e, r) {
          this._ +=
            'M' +
            (this._x0 = this._x1 = +t) +
            ',' +
            (this._y0 = this._y1 = +n) +
            'h' +
            +e +
            'v' +
            +r +
            'h' +
            -e +
            'Z'
        },
        toString: function() {
          return this._
        },
      }
      var c = u,
        l = function(t) {
          return function() {
            return t
          }
        },
        s = Math.abs,
        f = Math.atan2,
        h = Math.cos,
        d = Math.max,
        p = Math.min,
        g = Math.sin,
        v = Math.sqrt,
        y = 1e-12,
        m = Math.PI,
        x = m / 2,
        _ = 2 * m
      function b(t) {
        return t >= 1 ? x : t <= -1 ? -x : Math.asin(t)
      }
      function w(t) {
        return t.innerRadius
      }
      function M(t) {
        return t.outerRadius
      }
      function A(t) {
        return t.startAngle
      }
      function k(t) {
        return t.endAngle
      }
      function T(t) {
        return t && t.padAngle
      }
      function O(t, n, e, r, i, a, o) {
        var u = t - e,
          c = n - r,
          l = (o ? a : -a) / v(u * u + c * c),
          s = l * c,
          f = -l * u,
          h = t + s,
          p = n + f,
          g = e + s,
          y = r + f,
          m = (h + g) / 2,
          x = (p + y) / 2,
          _ = g - h,
          b = y - p,
          w = _ * _ + b * b,
          M = i - a,
          A = h * y - g * p,
          k = (b < 0 ? -1 : 1) * v(d(0, M * M * w - A * A)),
          T = (A * b - _ * k) / w,
          O = (-A * _ - b * k) / w,
          S = (A * b + _ * k) / w,
          C = (-A * _ + b * k) / w,
          E = T - m,
          N = O - x,
          D = S - m,
          F = C - x
        return (
          E * E + N * N > D * D + F * F && ((T = S), (O = C)),
          {
            cx: T,
            cy: O,
            x01: -s,
            y01: -f,
            x11: T * (i / M - 1),
            y11: O * (i / M - 1),
          }
        )
      }
      var S = function() {
        var t = w,
          n = M,
          e = l(0),
          r = null,
          i = A,
          a = k,
          o = T,
          u = null
        function d() {
          var l,
            d,
            w,
            M = +t.apply(this, arguments),
            A = +n.apply(this, arguments),
            k = i.apply(this, arguments) - x,
            T = a.apply(this, arguments) - x,
            S = s(T - k),
            C = T > k
          if ((u || (u = l = c()), A < M && ((d = A), (A = M), (M = d)), A > y))
            if (S > _ - y)
              u.moveTo(A * h(k), A * g(k)),
                u.arc(0, 0, A, k, T, !C),
                M > y && (u.moveTo(M * h(T), M * g(T)), u.arc(0, 0, M, T, k, C))
            else {
              var E,
                N,
                D = k,
                F = T,
                L = k,
                j = T,
                B = S,
                I = S,
                P = o.apply(this, arguments) / 2,
                R = P > y && (r ? +r.apply(this, arguments) : v(M * M + A * A)),
                U = p(s(A - M) / 2, +e.apply(this, arguments)),
                H = U,
                z = U
              if (R > y) {
                var Y = b((R / M) * g(P)),
                  q = b((R / A) * g(P))
                ;(B -= 2 * Y) > y
                  ? ((L += Y *= C ? 1 : -1), (j -= Y))
                  : ((B = 0), (L = j = (k + T) / 2)),
                  (I -= 2 * q) > y
                    ? ((D += q *= C ? 1 : -1), (F -= q))
                    : ((I = 0), (D = F = (k + T) / 2))
              }
              var G = A * h(D),
                W = A * g(D),
                X = M * h(j),
                V = M * g(j)
              if (U > y) {
                var $ = A * h(F),
                  Z = A * g(F),
                  Q = M * h(L),
                  K = M * g(L)
                if (S < m) {
                  var J =
                      B > y
                        ? (function(t, n, e, r, i, a, o, u) {
                            var c = e - t,
                              l = r - n,
                              s = o - i,
                              f = u - a,
                              h = (s * (n - a) - f * (t - i)) / (f * c - s * l)
                            return [t + h * c, n + h * l]
                          })(G, W, Q, K, $, Z, X, V)
                        : [X, V],
                    tt = G - J[0],
                    nt = W - J[1],
                    et = $ - J[0],
                    rt = Z - J[1],
                    it =
                      1 /
                      g(
                        ((w =
                          (tt * et + nt * rt) /
                          (v(tt * tt + nt * nt) * v(et * et + rt * rt))) > 1
                          ? 0
                          : w < -1
                          ? m
                          : Math.acos(w)) / 2,
                      ),
                    at = v(J[0] * J[0] + J[1] * J[1])
                  ;(H = p(U, (M - at) / (it - 1))),
                    (z = p(U, (A - at) / (it + 1)))
                }
              }
              I > y
                ? z > y
                  ? ((E = O(Q, K, G, W, A, z, C)),
                    (N = O($, Z, X, V, A, z, C)),
                    u.moveTo(E.cx + E.x01, E.cy + E.y01),
                    z < U
                      ? u.arc(
                          E.cx,
                          E.cy,
                          z,
                          f(E.y01, E.x01),
                          f(N.y01, N.x01),
                          !C,
                        )
                      : (u.arc(
                          E.cx,
                          E.cy,
                          z,
                          f(E.y01, E.x01),
                          f(E.y11, E.x11),
                          !C,
                        ),
                        u.arc(
                          0,
                          0,
                          A,
                          f(E.cy + E.y11, E.cx + E.x11),
                          f(N.cy + N.y11, N.cx + N.x11),
                          !C,
                        ),
                        u.arc(
                          N.cx,
                          N.cy,
                          z,
                          f(N.y11, N.x11),
                          f(N.y01, N.x01),
                          !C,
                        )))
                  : (u.moveTo(G, W), u.arc(0, 0, A, D, F, !C))
                : u.moveTo(G, W),
                M > y && B > y
                  ? H > y
                    ? ((E = O(X, V, $, Z, M, -H, C)),
                      (N = O(G, W, Q, K, M, -H, C)),
                      u.lineTo(E.cx + E.x01, E.cy + E.y01),
                      H < U
                        ? u.arc(
                            E.cx,
                            E.cy,
                            H,
                            f(E.y01, E.x01),
                            f(N.y01, N.x01),
                            !C,
                          )
                        : (u.arc(
                            E.cx,
                            E.cy,
                            H,
                            f(E.y01, E.x01),
                            f(E.y11, E.x11),
                            !C,
                          ),
                          u.arc(
                            0,
                            0,
                            M,
                            f(E.cy + E.y11, E.cx + E.x11),
                            f(N.cy + N.y11, N.cx + N.x11),
                            C,
                          ),
                          u.arc(
                            N.cx,
                            N.cy,
                            H,
                            f(N.y11, N.x11),
                            f(N.y01, N.x01),
                            !C,
                          )))
                    : u.arc(0, 0, M, j, L, C)
                  : u.lineTo(X, V)
            }
          else u.moveTo(0, 0)
          if ((u.closePath(), l)) return (u = null), l + '' || null
        }
        return (
          (d.centroid = function() {
            var e = (+t.apply(this, arguments) + +n.apply(this, arguments)) / 2,
              r =
                (+i.apply(this, arguments) + +a.apply(this, arguments)) / 2 -
                m / 2
            return [h(r) * e, g(r) * e]
          }),
          (d.innerRadius = function(n) {
            return arguments.length
              ? ((t = 'function' == typeof n ? n : l(+n)), d)
              : t
          }),
          (d.outerRadius = function(t) {
            return arguments.length
              ? ((n = 'function' == typeof t ? t : l(+t)), d)
              : n
          }),
          (d.cornerRadius = function(t) {
            return arguments.length
              ? ((e = 'function' == typeof t ? t : l(+t)), d)
              : e
          }),
          (d.padRadius = function(t) {
            return arguments.length
              ? ((r = null == t ? null : 'function' == typeof t ? t : l(+t)), d)
              : r
          }),
          (d.startAngle = function(t) {
            return arguments.length
              ? ((i = 'function' == typeof t ? t : l(+t)), d)
              : i
          }),
          (d.endAngle = function(t) {
            return arguments.length
              ? ((a = 'function' == typeof t ? t : l(+t)), d)
              : a
          }),
          (d.padAngle = function(t) {
            return arguments.length
              ? ((o = 'function' == typeof t ? t : l(+t)), d)
              : o
          }),
          (d.context = function(t) {
            return arguments.length ? ((u = null == t ? null : t), d) : u
          }),
          d
        )
      }
      function C(t) {
        this._context = t
      }
      C.prototype = {
        areaStart: function() {
          this._line = 0
        },
        areaEnd: function() {
          this._line = NaN
        },
        lineStart: function() {
          this._point = 0
        },
        lineEnd: function() {
          ;(this._line || (0 !== this._line && 1 === this._point)) &&
            this._context.closePath(),
            (this._line = 1 - this._line)
        },
        point: function(t, n) {
          switch (((t = +t), (n = +n), this._point)) {
            case 0:
              ;(this._point = 1),
                this._line
                  ? this._context.lineTo(t, n)
                  : this._context.moveTo(t, n)
              break
            case 1:
              this._point = 2
            default:
              this._context.lineTo(t, n)
          }
        },
      }
      var E = function(t) {
        return new C(t)
      }
      function N(t) {
        return t[0]
      }
      function D(t) {
        return t[1]
      }
      var F = function() {
          var t = N,
            n = D,
            e = l(!0),
            r = null,
            i = E,
            a = null
          function o(o) {
            var u,
              l,
              s,
              f = o.length,
              h = !1
            for (null == r && (a = i((s = c()))), u = 0; u <= f; ++u)
              !(u < f && e((l = o[u]), u, o)) === h &&
                ((h = !h) ? a.lineStart() : a.lineEnd()),
                h && a.point(+t(l, u, o), +n(l, u, o))
            if (s) return (a = null), s + '' || null
          }
          return (
            (o.x = function(n) {
              return arguments.length
                ? ((t = 'function' == typeof n ? n : l(+n)), o)
                : t
            }),
            (o.y = function(t) {
              return arguments.length
                ? ((n = 'function' == typeof t ? t : l(+t)), o)
                : n
            }),
            (o.defined = function(t) {
              return arguments.length
                ? ((e = 'function' == typeof t ? t : l(!!t)), o)
                : e
            }),
            (o.curve = function(t) {
              return arguments.length
                ? ((i = t), null != r && (a = i(r)), o)
                : i
            }),
            (o.context = function(t) {
              return arguments.length
                ? (null == t ? (r = a = null) : (a = i((r = t))), o)
                : r
            }),
            o
          )
        },
        L = function() {
          var t = N,
            n = null,
            e = l(0),
            r = D,
            i = l(!0),
            a = null,
            o = E,
            u = null
          function s(l) {
            var s,
              f,
              h,
              d,
              p,
              g = l.length,
              v = !1,
              y = new Array(g),
              m = new Array(g)
            for (null == a && (u = o((p = c()))), s = 0; s <= g; ++s) {
              if (!(s < g && i((d = l[s]), s, l)) === v)
                if ((v = !v)) (f = s), u.areaStart(), u.lineStart()
                else {
                  for (u.lineEnd(), u.lineStart(), h = s - 1; h >= f; --h)
                    u.point(y[h], m[h])
                  u.lineEnd(), u.areaEnd()
                }
              v &&
                ((y[s] = +t(d, s, l)),
                (m[s] = +e(d, s, l)),
                u.point(n ? +n(d, s, l) : y[s], r ? +r(d, s, l) : m[s]))
            }
            if (p) return (u = null), p + '' || null
          }
          function f() {
            return F()
              .defined(i)
              .curve(o)
              .context(a)
          }
          return (
            (s.x = function(e) {
              return arguments.length
                ? ((t = 'function' == typeof e ? e : l(+e)), (n = null), s)
                : t
            }),
            (s.x0 = function(n) {
              return arguments.length
                ? ((t = 'function' == typeof n ? n : l(+n)), s)
                : t
            }),
            (s.x1 = function(t) {
              return arguments.length
                ? ((n = null == t ? null : 'function' == typeof t ? t : l(+t)),
                  s)
                : n
            }),
            (s.y = function(t) {
              return arguments.length
                ? ((e = 'function' == typeof t ? t : l(+t)), (r = null), s)
                : e
            }),
            (s.y0 = function(t) {
              return arguments.length
                ? ((e = 'function' == typeof t ? t : l(+t)), s)
                : e
            }),
            (s.y1 = function(t) {
              return arguments.length
                ? ((r = null == t ? null : 'function' == typeof t ? t : l(+t)),
                  s)
                : r
            }),
            (s.lineX0 = s.lineY0 = function() {
              return f()
                .x(t)
                .y(e)
            }),
            (s.lineY1 = function() {
              return f()
                .x(t)
                .y(r)
            }),
            (s.lineX1 = function() {
              return f()
                .x(n)
                .y(e)
            }),
            (s.defined = function(t) {
              return arguments.length
                ? ((i = 'function' == typeof t ? t : l(!!t)), s)
                : i
            }),
            (s.curve = function(t) {
              return arguments.length
                ? ((o = t), null != a && (u = o(a)), s)
                : o
            }),
            (s.context = function(t) {
              return arguments.length
                ? (null == t ? (a = u = null) : (u = o((a = t))), s)
                : a
            }),
            s
          )
        },
        j = function(t, n) {
          return n < t ? -1 : n > t ? 1 : n >= t ? 0 : NaN
        },
        B = function(t) {
          return t
        },
        I = function() {
          var t = B,
            n = j,
            e = null,
            r = l(0),
            i = l(_),
            a = l(0)
          function o(o) {
            var u,
              c,
              l,
              s,
              f,
              h = o.length,
              d = 0,
              p = new Array(h),
              g = new Array(h),
              v = +r.apply(this, arguments),
              y = Math.min(_, Math.max(-_, i.apply(this, arguments) - v)),
              m = Math.min(Math.abs(y) / h, a.apply(this, arguments)),
              x = m * (y < 0 ? -1 : 1)
            for (u = 0; u < h; ++u)
              (f = g[(p[u] = u)] = +t(o[u], u, o)) > 0 && (d += f)
            for (
              null != n
                ? p.sort(function(t, e) {
                    return n(g[t], g[e])
                  })
                : null != e &&
                  p.sort(function(t, n) {
                    return e(o[t], o[n])
                  }),
                u = 0,
                l = d ? (y - h * x) / d : 0;
              u < h;
              ++u, v = s
            )
              (c = p[u]),
                (s = v + ((f = g[c]) > 0 ? f * l : 0) + x),
                (g[c] = {
                  data: o[c],
                  index: u,
                  value: f,
                  startAngle: v,
                  endAngle: s,
                  padAngle: m,
                })
            return g
          }
          return (
            (o.value = function(n) {
              return arguments.length
                ? ((t = 'function' == typeof n ? n : l(+n)), o)
                : t
            }),
            (o.sortValues = function(t) {
              return arguments.length ? ((n = t), (e = null), o) : n
            }),
            (o.sort = function(t) {
              return arguments.length ? ((e = t), (n = null), o) : e
            }),
            (o.startAngle = function(t) {
              return arguments.length
                ? ((r = 'function' == typeof t ? t : l(+t)), o)
                : r
            }),
            (o.endAngle = function(t) {
              return arguments.length
                ? ((i = 'function' == typeof t ? t : l(+t)), o)
                : i
            }),
            (o.padAngle = function(t) {
              return arguments.length
                ? ((a = 'function' == typeof t ? t : l(+t)), o)
                : a
            }),
            o
          )
        },
        P = U(E)
      function R(t) {
        this._curve = t
      }
      function U(t) {
        function n(n) {
          return new R(t(n))
        }
        return (n._curve = t), n
      }
      function H(t) {
        var n = t.curve
        return (
          (t.angle = t.x),
          delete t.x,
          (t.radius = t.y),
          delete t.y,
          (t.curve = function(t) {
            return arguments.length ? n(U(t)) : n()._curve
          }),
          t
        )
      }
      R.prototype = {
        areaStart: function() {
          this._curve.areaStart()
        },
        areaEnd: function() {
          this._curve.areaEnd()
        },
        lineStart: function() {
          this._curve.lineStart()
        },
        lineEnd: function() {
          this._curve.lineEnd()
        },
        point: function(t, n) {
          this._curve.point(n * Math.sin(t), n * -Math.cos(t))
        },
      }
      var z = function() {
          return H(F().curve(P))
        },
        Y = function() {
          var t = L().curve(P),
            n = t.curve,
            e = t.lineX0,
            r = t.lineX1,
            i = t.lineY0,
            a = t.lineY1
          return (
            (t.angle = t.x),
            delete t.x,
            (t.startAngle = t.x0),
            delete t.x0,
            (t.endAngle = t.x1),
            delete t.x1,
            (t.radius = t.y),
            delete t.y,
            (t.innerRadius = t.y0),
            delete t.y0,
            (t.outerRadius = t.y1),
            delete t.y1,
            (t.lineStartAngle = function() {
              return H(e())
            }),
            delete t.lineX0,
            (t.lineEndAngle = function() {
              return H(r())
            }),
            delete t.lineX1,
            (t.lineInnerRadius = function() {
              return H(i())
            }),
            delete t.lineY0,
            (t.lineOuterRadius = function() {
              return H(a())
            }),
            delete t.lineY1,
            (t.curve = function(t) {
              return arguments.length ? n(U(t)) : n()._curve
            }),
            t
          )
        },
        q = function(t, n) {
          return [(n = +n) * Math.cos((t -= Math.PI / 2)), n * Math.sin(t)]
        },
        G = Array.prototype.slice
      function W(t) {
        return t.source
      }
      function X(t) {
        return t.target
      }
      function V(t) {
        var n = W,
          e = X,
          r = N,
          i = D,
          a = null
        function o() {
          var o,
            u = G.call(arguments),
            l = n.apply(this, u),
            s = e.apply(this, u)
          if (
            (a || (a = o = c()),
            t(
              a,
              +r.apply(this, ((u[0] = l), u)),
              +i.apply(this, u),
              +r.apply(this, ((u[0] = s), u)),
              +i.apply(this, u),
            ),
            o)
          )
            return (a = null), o + '' || null
        }
        return (
          (o.source = function(t) {
            return arguments.length ? ((n = t), o) : n
          }),
          (o.target = function(t) {
            return arguments.length ? ((e = t), o) : e
          }),
          (o.x = function(t) {
            return arguments.length
              ? ((r = 'function' == typeof t ? t : l(+t)), o)
              : r
          }),
          (o.y = function(t) {
            return arguments.length
              ? ((i = 'function' == typeof t ? t : l(+t)), o)
              : i
          }),
          (o.context = function(t) {
            return arguments.length ? ((a = null == t ? null : t), o) : a
          }),
          o
        )
      }
      function $(t, n, e, r, i) {
        t.moveTo(n, e), t.bezierCurveTo((n = (n + r) / 2), e, n, i, r, i)
      }
      function Z(t, n, e, r, i) {
        t.moveTo(n, e), t.bezierCurveTo(n, (e = (e + i) / 2), r, e, r, i)
      }
      function Q(t, n, e, r, i) {
        var a = q(n, e),
          o = q(n, (e = (e + i) / 2)),
          u = q(r, e),
          c = q(r, i)
        t.moveTo(a[0], a[1]),
          t.bezierCurveTo(o[0], o[1], u[0], u[1], c[0], c[1])
      }
      function K() {
        return V($)
      }
      function J() {
        return V(Z)
      }
      function tt() {
        var t = V(Q)
        return (t.angle = t.x), delete t.x, (t.radius = t.y), delete t.y, t
      }
      var nt = {
          draw: function(t, n) {
            var e = Math.sqrt(n / m)
            t.moveTo(e, 0), t.arc(0, 0, e, 0, _)
          },
        },
        et = {
          draw: function(t, n) {
            var e = Math.sqrt(n / 5) / 2
            t.moveTo(-3 * e, -e),
              t.lineTo(-e, -e),
              t.lineTo(-e, -3 * e),
              t.lineTo(e, -3 * e),
              t.lineTo(e, -e),
              t.lineTo(3 * e, -e),
              t.lineTo(3 * e, e),
              t.lineTo(e, e),
              t.lineTo(e, 3 * e),
              t.lineTo(-e, 3 * e),
              t.lineTo(-e, e),
              t.lineTo(-3 * e, e),
              t.closePath()
          },
        },
        rt = Math.sqrt(1 / 3),
        it = 2 * rt,
        at = {
          draw: function(t, n) {
            var e = Math.sqrt(n / it),
              r = e * rt
            t.moveTo(0, -e),
              t.lineTo(r, 0),
              t.lineTo(0, e),
              t.lineTo(-r, 0),
              t.closePath()
          },
        },
        ot = Math.sin(m / 10) / Math.sin((7 * m) / 10),
        ut = Math.sin(_ / 10) * ot,
        ct = -Math.cos(_ / 10) * ot,
        lt = {
          draw: function(t, n) {
            var e = Math.sqrt(0.8908130915292852 * n),
              r = ut * e,
              i = ct * e
            t.moveTo(0, -e), t.lineTo(r, i)
            for (var a = 1; a < 5; ++a) {
              var o = (_ * a) / 5,
                u = Math.cos(o),
                c = Math.sin(o)
              t.lineTo(c * e, -u * e), t.lineTo(u * r - c * i, c * r + u * i)
            }
            t.closePath()
          },
        },
        st = {
          draw: function(t, n) {
            var e = Math.sqrt(n),
              r = -e / 2
            t.rect(r, r, e, e)
          },
        },
        ft = Math.sqrt(3),
        ht = {
          draw: function(t, n) {
            var e = -Math.sqrt(n / (3 * ft))
            t.moveTo(0, 2 * e),
              t.lineTo(-ft * e, -e),
              t.lineTo(ft * e, -e),
              t.closePath()
          },
        },
        dt = Math.sqrt(3) / 2,
        pt = 1 / Math.sqrt(12),
        gt = 3 * (pt / 2 + 1),
        vt = {
          draw: function(t, n) {
            var e = Math.sqrt(n / gt),
              r = e / 2,
              i = e * pt,
              a = r,
              o = e * pt + e,
              u = -a,
              c = o
            t.moveTo(r, i),
              t.lineTo(a, o),
              t.lineTo(u, c),
              t.lineTo(-0.5 * r - dt * i, dt * r + -0.5 * i),
              t.lineTo(-0.5 * a - dt * o, dt * a + -0.5 * o),
              t.lineTo(-0.5 * u - dt * c, dt * u + -0.5 * c),
              t.lineTo(-0.5 * r + dt * i, -0.5 * i - dt * r),
              t.lineTo(-0.5 * a + dt * o, -0.5 * o - dt * a),
              t.lineTo(-0.5 * u + dt * c, -0.5 * c - dt * u),
              t.closePath()
          },
        },
        yt = [nt, et, at, st, lt, ht, vt],
        mt = function() {
          var t = l(nt),
            n = l(64),
            e = null
          function r() {
            var r
            if (
              (e || (e = r = c()),
              t.apply(this, arguments).draw(e, +n.apply(this, arguments)),
              r)
            )
              return (e = null), r + '' || null
          }
          return (
            (r.type = function(n) {
              return arguments.length
                ? ((t = 'function' == typeof n ? n : l(n)), r)
                : t
            }),
            (r.size = function(t) {
              return arguments.length
                ? ((n = 'function' == typeof t ? t : l(+t)), r)
                : n
            }),
            (r.context = function(t) {
              return arguments.length ? ((e = null == t ? null : t), r) : e
            }),
            r
          )
        },
        xt = function() {}
      function _t(t, n, e) {
        t._context.bezierCurveTo(
          (2 * t._x0 + t._x1) / 3,
          (2 * t._y0 + t._y1) / 3,
          (t._x0 + 2 * t._x1) / 3,
          (t._y0 + 2 * t._y1) / 3,
          (t._x0 + 4 * t._x1 + n) / 6,
          (t._y0 + 4 * t._y1 + e) / 6,
        )
      }
      function bt(t) {
        this._context = t
      }
      bt.prototype = {
        areaStart: function() {
          this._line = 0
        },
        areaEnd: function() {
          this._line = NaN
        },
        lineStart: function() {
          ;(this._x0 = this._x1 = this._y0 = this._y1 = NaN), (this._point = 0)
        },
        lineEnd: function() {
          switch (this._point) {
            case 3:
              _t(this, this._x1, this._y1)
            case 2:
              this._context.lineTo(this._x1, this._y1)
          }
          ;(this._line || (0 !== this._line && 1 === this._point)) &&
            this._context.closePath(),
            (this._line = 1 - this._line)
        },
        point: function(t, n) {
          switch (((t = +t), (n = +n), this._point)) {
            case 0:
              ;(this._point = 1),
                this._line
                  ? this._context.lineTo(t, n)
                  : this._context.moveTo(t, n)
              break
            case 1:
              this._point = 2
              break
            case 2:
              ;(this._point = 3),
                this._context.lineTo(
                  (5 * this._x0 + this._x1) / 6,
                  (5 * this._y0 + this._y1) / 6,
                )
            default:
              _t(this, t, n)
          }
          ;(this._x0 = this._x1),
            (this._x1 = t),
            (this._y0 = this._y1),
            (this._y1 = n)
        },
      }
      var wt = function(t) {
        return new bt(t)
      }
      function Mt(t) {
        this._context = t
      }
      Mt.prototype = {
        areaStart: xt,
        areaEnd: xt,
        lineStart: function() {
          ;(this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN),
            (this._point = 0)
        },
        lineEnd: function() {
          switch (this._point) {
            case 1:
              this._context.moveTo(this._x2, this._y2),
                this._context.closePath()
              break
            case 2:
              this._context.moveTo(
                (this._x2 + 2 * this._x3) / 3,
                (this._y2 + 2 * this._y3) / 3,
              ),
                this._context.lineTo(
                  (this._x3 + 2 * this._x2) / 3,
                  (this._y3 + 2 * this._y2) / 3,
                ),
                this._context.closePath()
              break
            case 3:
              this.point(this._x2, this._y2),
                this.point(this._x3, this._y3),
                this.point(this._x4, this._y4)
          }
        },
        point: function(t, n) {
          switch (((t = +t), (n = +n), this._point)) {
            case 0:
              ;(this._point = 1), (this._x2 = t), (this._y2 = n)
              break
            case 1:
              ;(this._point = 2), (this._x3 = t), (this._y3 = n)
              break
            case 2:
              ;(this._point = 3),
                (this._x4 = t),
                (this._y4 = n),
                this._context.moveTo(
                  (this._x0 + 4 * this._x1 + t) / 6,
                  (this._y0 + 4 * this._y1 + n) / 6,
                )
              break
            default:
              _t(this, t, n)
          }
          ;(this._x0 = this._x1),
            (this._x1 = t),
            (this._y0 = this._y1),
            (this._y1 = n)
        },
      }
      var At = function(t) {
        return new Mt(t)
      }
      function kt(t) {
        this._context = t
      }
      kt.prototype = {
        areaStart: function() {
          this._line = 0
        },
        areaEnd: function() {
          this._line = NaN
        },
        lineStart: function() {
          ;(this._x0 = this._x1 = this._y0 = this._y1 = NaN), (this._point = 0)
        },
        lineEnd: function() {
          ;(this._line || (0 !== this._line && 3 === this._point)) &&
            this._context.closePath(),
            (this._line = 1 - this._line)
        },
        point: function(t, n) {
          switch (((t = +t), (n = +n), this._point)) {
            case 0:
              this._point = 1
              break
            case 1:
              this._point = 2
              break
            case 2:
              this._point = 3
              var e = (this._x0 + 4 * this._x1 + t) / 6,
                r = (this._y0 + 4 * this._y1 + n) / 6
              this._line
                ? this._context.lineTo(e, r)
                : this._context.moveTo(e, r)
              break
            case 3:
              this._point = 4
            default:
              _t(this, t, n)
          }
          ;(this._x0 = this._x1),
            (this._x1 = t),
            (this._y0 = this._y1),
            (this._y1 = n)
        },
      }
      var Tt = function(t) {
        return new kt(t)
      }
      function Ot(t, n) {
        ;(this._basis = new bt(t)), (this._beta = n)
      }
      Ot.prototype = {
        lineStart: function() {
          ;(this._x = []), (this._y = []), this._basis.lineStart()
        },
        lineEnd: function() {
          var t = this._x,
            n = this._y,
            e = t.length - 1
          if (e > 0)
            for (
              var r, i = t[0], a = n[0], o = t[e] - i, u = n[e] - a, c = -1;
              ++c <= e;

            )
              (r = c / e),
                this._basis.point(
                  this._beta * t[c] + (1 - this._beta) * (i + r * o),
                  this._beta * n[c] + (1 - this._beta) * (a + r * u),
                )
          ;(this._x = this._y = null), this._basis.lineEnd()
        },
        point: function(t, n) {
          this._x.push(+t), this._y.push(+n)
        },
      }
      var St = (function t(n) {
        function e(t) {
          return 1 === n ? new bt(t) : new Ot(t, n)
        }
        return (
          (e.beta = function(n) {
            return t(+n)
          }),
          e
        )
      })(0.85)
      function Ct(t, n, e) {
        t._context.bezierCurveTo(
          t._x1 + t._k * (t._x2 - t._x0),
          t._y1 + t._k * (t._y2 - t._y0),
          t._x2 + t._k * (t._x1 - n),
          t._y2 + t._k * (t._y1 - e),
          t._x2,
          t._y2,
        )
      }
      function Et(t, n) {
        ;(this._context = t), (this._k = (1 - n) / 6)
      }
      Et.prototype = {
        areaStart: function() {
          this._line = 0
        },
        areaEnd: function() {
          this._line = NaN
        },
        lineStart: function() {
          ;(this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN),
            (this._point = 0)
        },
        lineEnd: function() {
          switch (this._point) {
            case 2:
              this._context.lineTo(this._x2, this._y2)
              break
            case 3:
              Ct(this, this._x1, this._y1)
          }
          ;(this._line || (0 !== this._line && 1 === this._point)) &&
            this._context.closePath(),
            (this._line = 1 - this._line)
        },
        point: function(t, n) {
          switch (((t = +t), (n = +n), this._point)) {
            case 0:
              ;(this._point = 1),
                this._line
                  ? this._context.lineTo(t, n)
                  : this._context.moveTo(t, n)
              break
            case 1:
              ;(this._point = 2), (this._x1 = t), (this._y1 = n)
              break
            case 2:
              this._point = 3
            default:
              Ct(this, t, n)
          }
          ;(this._x0 = this._x1),
            (this._x1 = this._x2),
            (this._x2 = t),
            (this._y0 = this._y1),
            (this._y1 = this._y2),
            (this._y2 = n)
        },
      }
      var Nt = (function t(n) {
        function e(t) {
          return new Et(t, n)
        }
        return (
          (e.tension = function(n) {
            return t(+n)
          }),
          e
        )
      })(0)
      function Dt(t, n) {
        ;(this._context = t), (this._k = (1 - n) / 6)
      }
      Dt.prototype = {
        areaStart: xt,
        areaEnd: xt,
        lineStart: function() {
          ;(this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN),
            (this._point = 0)
        },
        lineEnd: function() {
          switch (this._point) {
            case 1:
              this._context.moveTo(this._x3, this._y3),
                this._context.closePath()
              break
            case 2:
              this._context.lineTo(this._x3, this._y3),
                this._context.closePath()
              break
            case 3:
              this.point(this._x3, this._y3),
                this.point(this._x4, this._y4),
                this.point(this._x5, this._y5)
          }
        },
        point: function(t, n) {
          switch (((t = +t), (n = +n), this._point)) {
            case 0:
              ;(this._point = 1), (this._x3 = t), (this._y3 = n)
              break
            case 1:
              ;(this._point = 2),
                this._context.moveTo((this._x4 = t), (this._y4 = n))
              break
            case 2:
              ;(this._point = 3), (this._x5 = t), (this._y5 = n)
              break
            default:
              Ct(this, t, n)
          }
          ;(this._x0 = this._x1),
            (this._x1 = this._x2),
            (this._x2 = t),
            (this._y0 = this._y1),
            (this._y1 = this._y2),
            (this._y2 = n)
        },
      }
      var Ft = (function t(n) {
        function e(t) {
          return new Dt(t, n)
        }
        return (
          (e.tension = function(n) {
            return t(+n)
          }),
          e
        )
      })(0)
      function Lt(t, n) {
        ;(this._context = t), (this._k = (1 - n) / 6)
      }
      Lt.prototype = {
        areaStart: function() {
          this._line = 0
        },
        areaEnd: function() {
          this._line = NaN
        },
        lineStart: function() {
          ;(this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN),
            (this._point = 0)
        },
        lineEnd: function() {
          ;(this._line || (0 !== this._line && 3 === this._point)) &&
            this._context.closePath(),
            (this._line = 1 - this._line)
        },
        point: function(t, n) {
          switch (((t = +t), (n = +n), this._point)) {
            case 0:
              this._point = 1
              break
            case 1:
              this._point = 2
              break
            case 2:
              ;(this._point = 3),
                this._line
                  ? this._context.lineTo(this._x2, this._y2)
                  : this._context.moveTo(this._x2, this._y2)
              break
            case 3:
              this._point = 4
            default:
              Ct(this, t, n)
          }
          ;(this._x0 = this._x1),
            (this._x1 = this._x2),
            (this._x2 = t),
            (this._y0 = this._y1),
            (this._y1 = this._y2),
            (this._y2 = n)
        },
      }
      var jt = (function t(n) {
        function e(t) {
          return new Lt(t, n)
        }
        return (
          (e.tension = function(n) {
            return t(+n)
          }),
          e
        )
      })(0)
      function Bt(t, n, e) {
        var r = t._x1,
          i = t._y1,
          a = t._x2,
          o = t._y2
        if (t._l01_a > y) {
          var u = 2 * t._l01_2a + 3 * t._l01_a * t._l12_a + t._l12_2a,
            c = 3 * t._l01_a * (t._l01_a + t._l12_a)
          ;(r = (r * u - t._x0 * t._l12_2a + t._x2 * t._l01_2a) / c),
            (i = (i * u - t._y0 * t._l12_2a + t._y2 * t._l01_2a) / c)
        }
        if (t._l23_a > y) {
          var l = 2 * t._l23_2a + 3 * t._l23_a * t._l12_a + t._l12_2a,
            s = 3 * t._l23_a * (t._l23_a + t._l12_a)
          ;(a = (a * l + t._x1 * t._l23_2a - n * t._l12_2a) / s),
            (o = (o * l + t._y1 * t._l23_2a - e * t._l12_2a) / s)
        }
        t._context.bezierCurveTo(r, i, a, o, t._x2, t._y2)
      }
      function It(t, n) {
        ;(this._context = t), (this._alpha = n)
      }
      It.prototype = {
        areaStart: function() {
          this._line = 0
        },
        areaEnd: function() {
          this._line = NaN
        },
        lineStart: function() {
          ;(this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN),
            (this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0)
        },
        lineEnd: function() {
          switch (this._point) {
            case 2:
              this._context.lineTo(this._x2, this._y2)
              break
            case 3:
              this.point(this._x2, this._y2)
          }
          ;(this._line || (0 !== this._line && 1 === this._point)) &&
            this._context.closePath(),
            (this._line = 1 - this._line)
        },
        point: function(t, n) {
          if (((t = +t), (n = +n), this._point)) {
            var e = this._x2 - t,
              r = this._y2 - n
            this._l23_a = Math.sqrt(
              (this._l23_2a = Math.pow(e * e + r * r, this._alpha)),
            )
          }
          switch (this._point) {
            case 0:
              ;(this._point = 1),
                this._line
                  ? this._context.lineTo(t, n)
                  : this._context.moveTo(t, n)
              break
            case 1:
              this._point = 2
              break
            case 2:
              this._point = 3
            default:
              Bt(this, t, n)
          }
          ;(this._l01_a = this._l12_a),
            (this._l12_a = this._l23_a),
            (this._l01_2a = this._l12_2a),
            (this._l12_2a = this._l23_2a),
            (this._x0 = this._x1),
            (this._x1 = this._x2),
            (this._x2 = t),
            (this._y0 = this._y1),
            (this._y1 = this._y2),
            (this._y2 = n)
        },
      }
      var Pt = (function t(n) {
        function e(t) {
          return n ? new It(t, n) : new Et(t, 0)
        }
        return (
          (e.alpha = function(n) {
            return t(+n)
          }),
          e
        )
      })(0.5)
      function Rt(t, n) {
        ;(this._context = t), (this._alpha = n)
      }
      Rt.prototype = {
        areaStart: xt,
        areaEnd: xt,
        lineStart: function() {
          ;(this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN),
            (this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0)
        },
        lineEnd: function() {
          switch (this._point) {
            case 1:
              this._context.moveTo(this._x3, this._y3),
                this._context.closePath()
              break
            case 2:
              this._context.lineTo(this._x3, this._y3),
                this._context.closePath()
              break
            case 3:
              this.point(this._x3, this._y3),
                this.point(this._x4, this._y4),
                this.point(this._x5, this._y5)
          }
        },
        point: function(t, n) {
          if (((t = +t), (n = +n), this._point)) {
            var e = this._x2 - t,
              r = this._y2 - n
            this._l23_a = Math.sqrt(
              (this._l23_2a = Math.pow(e * e + r * r, this._alpha)),
            )
          }
          switch (this._point) {
            case 0:
              ;(this._point = 1), (this._x3 = t), (this._y3 = n)
              break
            case 1:
              ;(this._point = 2),
                this._context.moveTo((this._x4 = t), (this._y4 = n))
              break
            case 2:
              ;(this._point = 3), (this._x5 = t), (this._y5 = n)
              break
            default:
              Bt(this, t, n)
          }
          ;(this._l01_a = this._l12_a),
            (this._l12_a = this._l23_a),
            (this._l01_2a = this._l12_2a),
            (this._l12_2a = this._l23_2a),
            (this._x0 = this._x1),
            (this._x1 = this._x2),
            (this._x2 = t),
            (this._y0 = this._y1),
            (this._y1 = this._y2),
            (this._y2 = n)
        },
      }
      var Ut = (function t(n) {
        function e(t) {
          return n ? new Rt(t, n) : new Dt(t, 0)
        }
        return (
          (e.alpha = function(n) {
            return t(+n)
          }),
          e
        )
      })(0.5)
      function Ht(t, n) {
        ;(this._context = t), (this._alpha = n)
      }
      Ht.prototype = {
        areaStart: function() {
          this._line = 0
        },
        areaEnd: function() {
          this._line = NaN
        },
        lineStart: function() {
          ;(this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN),
            (this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0)
        },
        lineEnd: function() {
          ;(this._line || (0 !== this._line && 3 === this._point)) &&
            this._context.closePath(),
            (this._line = 1 - this._line)
        },
        point: function(t, n) {
          if (((t = +t), (n = +n), this._point)) {
            var e = this._x2 - t,
              r = this._y2 - n
            this._l23_a = Math.sqrt(
              (this._l23_2a = Math.pow(e * e + r * r, this._alpha)),
            )
          }
          switch (this._point) {
            case 0:
              this._point = 1
              break
            case 1:
              this._point = 2
              break
            case 2:
              ;(this._point = 3),
                this._line
                  ? this._context.lineTo(this._x2, this._y2)
                  : this._context.moveTo(this._x2, this._y2)
              break
            case 3:
              this._point = 4
            default:
              Bt(this, t, n)
          }
          ;(this._l01_a = this._l12_a),
            (this._l12_a = this._l23_a),
            (this._l01_2a = this._l12_2a),
            (this._l12_2a = this._l23_2a),
            (this._x0 = this._x1),
            (this._x1 = this._x2),
            (this._x2 = t),
            (this._y0 = this._y1),
            (this._y1 = this._y2),
            (this._y2 = n)
        },
      }
      var zt = (function t(n) {
        function e(t) {
          return n ? new Ht(t, n) : new Lt(t, 0)
        }
        return (
          (e.alpha = function(n) {
            return t(+n)
          }),
          e
        )
      })(0.5)
      function Yt(t) {
        this._context = t
      }
      Yt.prototype = {
        areaStart: xt,
        areaEnd: xt,
        lineStart: function() {
          this._point = 0
        },
        lineEnd: function() {
          this._point && this._context.closePath()
        },
        point: function(t, n) {
          ;(t = +t),
            (n = +n),
            this._point
              ? this._context.lineTo(t, n)
              : ((this._point = 1), this._context.moveTo(t, n))
        },
      }
      var qt = function(t) {
        return new Yt(t)
      }
      function Gt(t) {
        return t < 0 ? -1 : 1
      }
      function Wt(t, n, e) {
        var r = t._x1 - t._x0,
          i = n - t._x1,
          a = (t._y1 - t._y0) / (r || (i < 0 && -0)),
          o = (e - t._y1) / (i || (r < 0 && -0)),
          u = (a * i + o * r) / (r + i)
        return (
          (Gt(a) + Gt(o)) *
            Math.min(Math.abs(a), Math.abs(o), 0.5 * Math.abs(u)) || 0
        )
      }
      function Xt(t, n) {
        var e = t._x1 - t._x0
        return e ? ((3 * (t._y1 - t._y0)) / e - n) / 2 : n
      }
      function Vt(t, n, e) {
        var r = t._x0,
          i = t._y0,
          a = t._x1,
          o = t._y1,
          u = (a - r) / 3
        t._context.bezierCurveTo(r + u, i + u * n, a - u, o - u * e, a, o)
      }
      function $t(t) {
        this._context = t
      }
      function Zt(t) {
        this._context = new Qt(t)
      }
      function Qt(t) {
        this._context = t
      }
      function Kt(t) {
        return new $t(t)
      }
      function Jt(t) {
        return new Zt(t)
      }
      function tn(t) {
        this._context = t
      }
      function nn(t) {
        var n,
          e,
          r = t.length - 1,
          i = new Array(r),
          a = new Array(r),
          o = new Array(r)
        for (i[0] = 0, a[0] = 2, o[0] = t[0] + 2 * t[1], n = 1; n < r - 1; ++n)
          (i[n] = 1), (a[n] = 4), (o[n] = 4 * t[n] + 2 * t[n + 1])
        for (
          i[r - 1] = 2, a[r - 1] = 7, o[r - 1] = 8 * t[r - 1] + t[r], n = 1;
          n < r;
          ++n
        )
          (e = i[n] / a[n - 1]), (a[n] -= e), (o[n] -= e * o[n - 1])
        for (i[r - 1] = o[r - 1] / a[r - 1], n = r - 2; n >= 0; --n)
          i[n] = (o[n] - i[n + 1]) / a[n]
        for (a[r - 1] = (t[r] + i[r - 1]) / 2, n = 0; n < r - 1; ++n)
          a[n] = 2 * t[n + 1] - i[n + 1]
        return [i, a]
      }
      ;($t.prototype = {
        areaStart: function() {
          this._line = 0
        },
        areaEnd: function() {
          this._line = NaN
        },
        lineStart: function() {
          ;(this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN),
            (this._point = 0)
        },
        lineEnd: function() {
          switch (this._point) {
            case 2:
              this._context.lineTo(this._x1, this._y1)
              break
            case 3:
              Vt(this, this._t0, Xt(this, this._t0))
          }
          ;(this._line || (0 !== this._line && 1 === this._point)) &&
            this._context.closePath(),
            (this._line = 1 - this._line)
        },
        point: function(t, n) {
          var e = NaN
          if (((n = +n), (t = +t) !== this._x1 || n !== this._y1)) {
            switch (this._point) {
              case 0:
                ;(this._point = 1),
                  this._line
                    ? this._context.lineTo(t, n)
                    : this._context.moveTo(t, n)
                break
              case 1:
                this._point = 2
                break
              case 2:
                ;(this._point = 3), Vt(this, Xt(this, (e = Wt(this, t, n))), e)
                break
              default:
                Vt(this, this._t0, (e = Wt(this, t, n)))
            }
            ;(this._x0 = this._x1),
              (this._x1 = t),
              (this._y0 = this._y1),
              (this._y1 = n),
              (this._t0 = e)
          }
        },
      }),
        ((Zt.prototype = Object.create($t.prototype)).point = function(t, n) {
          $t.prototype.point.call(this, n, t)
        }),
        (Qt.prototype = {
          moveTo: function(t, n) {
            this._context.moveTo(n, t)
          },
          closePath: function() {
            this._context.closePath()
          },
          lineTo: function(t, n) {
            this._context.lineTo(n, t)
          },
          bezierCurveTo: function(t, n, e, r, i, a) {
            this._context.bezierCurveTo(n, t, r, e, a, i)
          },
        }),
        (tn.prototype = {
          areaStart: function() {
            this._line = 0
          },
          areaEnd: function() {
            this._line = NaN
          },
          lineStart: function() {
            ;(this._x = []), (this._y = [])
          },
          lineEnd: function() {
            var t = this._x,
              n = this._y,
              e = t.length
            if (e)
              if (
                (this._line
                  ? this._context.lineTo(t[0], n[0])
                  : this._context.moveTo(t[0], n[0]),
                2 === e)
              )
                this._context.lineTo(t[1], n[1])
              else
                for (var r = nn(t), i = nn(n), a = 0, o = 1; o < e; ++a, ++o)
                  this._context.bezierCurveTo(
                    r[0][a],
                    i[0][a],
                    r[1][a],
                    i[1][a],
                    t[o],
                    n[o],
                  )
            ;(this._line || (0 !== this._line && 1 === e)) &&
              this._context.closePath(),
              (this._line = 1 - this._line),
              (this._x = this._y = null)
          },
          point: function(t, n) {
            this._x.push(+t), this._y.push(+n)
          },
        })
      var en = function(t) {
        return new tn(t)
      }
      function rn(t, n) {
        ;(this._context = t), (this._t = n)
      }
      rn.prototype = {
        areaStart: function() {
          this._line = 0
        },
        areaEnd: function() {
          this._line = NaN
        },
        lineStart: function() {
          ;(this._x = this._y = NaN), (this._point = 0)
        },
        lineEnd: function() {
          0 < this._t &&
            this._t < 1 &&
            2 === this._point &&
            this._context.lineTo(this._x, this._y),
            (this._line || (0 !== this._line && 1 === this._point)) &&
              this._context.closePath(),
            this._line >= 0 &&
              ((this._t = 1 - this._t), (this._line = 1 - this._line))
        },
        point: function(t, n) {
          switch (((t = +t), (n = +n), this._point)) {
            case 0:
              ;(this._point = 1),
                this._line
                  ? this._context.lineTo(t, n)
                  : this._context.moveTo(t, n)
              break
            case 1:
              this._point = 2
            default:
              if (this._t <= 0)
                this._context.lineTo(this._x, n), this._context.lineTo(t, n)
              else {
                var e = this._x * (1 - this._t) + t * this._t
                this._context.lineTo(e, this._y), this._context.lineTo(e, n)
              }
          }
          ;(this._x = t), (this._y = n)
        },
      }
      var an = function(t) {
        return new rn(t, 0.5)
      }
      function on(t) {
        return new rn(t, 0)
      }
      function un(t) {
        return new rn(t, 1)
      }
      var cn = function(t, n) {
          if ((i = t.length) > 1)
            for (var e, r, i, a = 1, o = t[n[0]], u = o.length; a < i; ++a)
              for (r = o, o = t[n[a]], e = 0; e < u; ++e)
                o[e][1] += o[e][0] = isNaN(r[e][1]) ? r[e][0] : r[e][1]
        },
        ln = function(t) {
          for (var n = t.length, e = new Array(n); --n >= 0; ) e[n] = n
          return e
        }
      function sn(t, n) {
        return t[n]
      }
      var fn = function() {
          var t = l([]),
            n = ln,
            e = cn,
            r = sn
          function i(i) {
            var a,
              o,
              u = t.apply(this, arguments),
              c = i.length,
              l = u.length,
              s = new Array(l)
            for (a = 0; a < l; ++a) {
              for (
                var f, h = u[a], d = (s[a] = new Array(c)), p = 0;
                p < c;
                ++p
              )
                (d[p] = f = [0, +r(i[p], h, p, i)]), (f.data = i[p])
              d.key = h
            }
            for (a = 0, o = n(s); a < l; ++a) s[o[a]].index = a
            return e(s, o), s
          }
          return (
            (i.keys = function(n) {
              return arguments.length
                ? ((t = 'function' == typeof n ? n : l(G.call(n))), i)
                : t
            }),
            (i.value = function(t) {
              return arguments.length
                ? ((r = 'function' == typeof t ? t : l(+t)), i)
                : r
            }),
            (i.order = function(t) {
              return arguments.length
                ? ((n =
                    null == t ? ln : 'function' == typeof t ? t : l(G.call(t))),
                  i)
                : n
            }),
            (i.offset = function(t) {
              return arguments.length ? ((e = null == t ? cn : t), i) : e
            }),
            i
          )
        },
        hn = function(t, n) {
          if ((r = t.length) > 0) {
            for (var e, r, i, a = 0, o = t[0].length; a < o; ++a) {
              for (i = e = 0; e < r; ++e) i += t[e][a][1] || 0
              if (i) for (e = 0; e < r; ++e) t[e][a][1] /= i
            }
            cn(t, n)
          }
        },
        dn = function(t, n) {
          if ((u = t.length) > 1)
            for (var e, r, i, a, o, u, c = 0, l = t[n[0]].length; c < l; ++c)
              for (a = o = 0, e = 0; e < u; ++e)
                (i = (r = t[n[e]][c])[1] - r[0]) >= 0
                  ? ((r[0] = a), (r[1] = a += i))
                  : i < 0
                  ? ((r[1] = o), (r[0] = o += i))
                  : (r[0] = a)
        },
        pn = function(t, n) {
          if ((e = t.length) > 0) {
            for (var e, r = 0, i = t[n[0]], a = i.length; r < a; ++r) {
              for (var o = 0, u = 0; o < e; ++o) u += t[o][r][1] || 0
              i[r][1] += i[r][0] = -u / 2
            }
            cn(t, n)
          }
        },
        gn = function(t, n) {
          if ((i = t.length) > 0 && (r = (e = t[n[0]]).length) > 0) {
            for (var e, r, i, a = 0, o = 1; o < r; ++o) {
              for (var u = 0, c = 0, l = 0; u < i; ++u) {
                for (
                  var s = t[n[u]],
                    f = s[o][1] || 0,
                    h = (f - (s[o - 1][1] || 0)) / 2,
                    d = 0;
                  d < u;
                  ++d
                ) {
                  var p = t[n[d]]
                  h += (p[o][1] || 0) - (p[o - 1][1] || 0)
                }
                ;(c += f), (l += h * f)
              }
              ;(e[o - 1][1] += e[o - 1][0] = a), c && (a -= l / c)
            }
            ;(e[o - 1][1] += e[o - 1][0] = a), cn(t, n)
          }
        },
        vn = function(t) {
          var n = t.map(yn)
          return ln(t).sort(function(t, e) {
            return n[t] - n[e]
          })
        }
      function yn(t) {
        for (var n, e = 0, r = -1, i = t.length; ++r < i; )
          (n = +t[r][1]) && (e += n)
        return e
      }
      var mn = function(t) {
          return vn(t).reverse()
        },
        xn = function(t) {
          var n,
            e,
            r = t.length,
            i = t.map(yn),
            a = ln(t).sort(function(t, n) {
              return i[n] - i[t]
            }),
            o = 0,
            u = 0,
            c = [],
            l = []
          for (n = 0; n < r; ++n)
            (e = a[n]),
              o < u ? ((o += i[e]), c.push(e)) : ((u += i[e]), l.push(e))
          return l.reverse().concat(c)
        },
        _n = function(t) {
          return ln(t).reverse()
        }
      e.d(n, 'arc', function() {
        return S
      }),
        e.d(n, 'area', function() {
          return L
        }),
        e.d(n, 'line', function() {
          return F
        }),
        e.d(n, 'pie', function() {
          return I
        }),
        e.d(n, 'areaRadial', function() {
          return Y
        }),
        e.d(n, 'radialArea', function() {
          return Y
        }),
        e.d(n, 'lineRadial', function() {
          return z
        }),
        e.d(n, 'radialLine', function() {
          return z
        }),
        e.d(n, 'pointRadial', function() {
          return q
        }),
        e.d(n, 'linkHorizontal', function() {
          return K
        }),
        e.d(n, 'linkVertical', function() {
          return J
        }),
        e.d(n, 'linkRadial', function() {
          return tt
        }),
        e.d(n, 'symbol', function() {
          return mt
        }),
        e.d(n, 'symbols', function() {
          return yt
        }),
        e.d(n, 'symbolCircle', function() {
          return nt
        }),
        e.d(n, 'symbolCross', function() {
          return et
        }),
        e.d(n, 'symbolDiamond', function() {
          return at
        }),
        e.d(n, 'symbolSquare', function() {
          return st
        }),
        e.d(n, 'symbolStar', function() {
          return lt
        }),
        e.d(n, 'symbolTriangle', function() {
          return ht
        }),
        e.d(n, 'symbolWye', function() {
          return vt
        }),
        e.d(n, 'curveBasisClosed', function() {
          return At
        }),
        e.d(n, 'curveBasisOpen', function() {
          return Tt
        }),
        e.d(n, 'curveBasis', function() {
          return wt
        }),
        e.d(n, 'curveBundle', function() {
          return St
        }),
        e.d(n, 'curveCardinalClosed', function() {
          return Ft
        }),
        e.d(n, 'curveCardinalOpen', function() {
          return jt
        }),
        e.d(n, 'curveCardinal', function() {
          return Nt
        }),
        e.d(n, 'curveCatmullRomClosed', function() {
          return Ut
        }),
        e.d(n, 'curveCatmullRomOpen', function() {
          return zt
        }),
        e.d(n, 'curveCatmullRom', function() {
          return Pt
        }),
        e.d(n, 'curveLinearClosed', function() {
          return qt
        }),
        e.d(n, 'curveLinear', function() {
          return E
        }),
        e.d(n, 'curveMonotoneX', function() {
          return Kt
        }),
        e.d(n, 'curveMonotoneY', function() {
          return Jt
        }),
        e.d(n, 'curveNatural', function() {
          return en
        }),
        e.d(n, 'curveStep', function() {
          return an
        }),
        e.d(n, 'curveStepAfter', function() {
          return un
        }),
        e.d(n, 'curveStepBefore', function() {
          return on
        }),
        e.d(n, 'stack', function() {
          return fn
        }),
        e.d(n, 'stackOffsetExpand', function() {
          return hn
        }),
        e.d(n, 'stackOffsetDiverging', function() {
          return dn
        }),
        e.d(n, 'stackOffsetNone', function() {
          return cn
        }),
        e.d(n, 'stackOffsetSilhouette', function() {
          return pn
        }),
        e.d(n, 'stackOffsetWiggle', function() {
          return gn
        }),
        e.d(n, 'stackOrderAscending', function() {
          return vn
        }),
        e.d(n, 'stackOrderDescending', function() {
          return mn
        }),
        e.d(n, 'stackOrderInsideOut', function() {
          return xn
        }),
        e.d(n, 'stackOrderNone', function() {
          return ln
        }),
        e.d(n, 'stackOrderReverse', function() {
          return _n
        })
    },
    function(t, n, e) {
      'use strict'
      e.r(n)
      function r() {}
      function i(t, n) {
        var e = new r()
        if (t instanceof r)
          t.each(function(t, n) {
            e.set(n, t)
          })
        else if (Array.isArray(t)) {
          var i,
            a = -1,
            o = t.length
          if (null == n) for (; ++a < o; ) e.set(a, t[a])
          else for (; ++a < o; ) e.set(n((i = t[a]), a, t), i)
        } else if (t) for (var u in t) e.set(u, t[u])
        return e
      }
      r.prototype = i.prototype = {
        constructor: r,
        has: function(t) {
          return '$' + t in this
        },
        get: function(t) {
          return this['$' + t]
        },
        set: function(t, n) {
          return (this['$' + t] = n), this
        },
        remove: function(t) {
          var n = '$' + t
          return n in this && delete this[n]
        },
        clear: function() {
          for (var t in this) '$' === t[0] && delete this[t]
        },
        keys: function() {
          var t = []
          for (var n in this) '$' === n[0] && t.push(n.slice(1))
          return t
        },
        values: function() {
          var t = []
          for (var n in this) '$' === n[0] && t.push(this[n])
          return t
        },
        entries: function() {
          var t = []
          for (var n in this)
            '$' === n[0] && t.push({ key: n.slice(1), value: this[n] })
          return t
        },
        size: function() {
          var t = 0
          for (var n in this) '$' === n[0] && ++t
          return t
        },
        empty: function() {
          for (var t in this) if ('$' === t[0]) return !1
          return !0
        },
        each: function(t) {
          for (var n in this) '$' === n[0] && t(this[n], n.slice(1), this)
        },
      }
      var a = i,
        o = function() {
          var t,
            n,
            e,
            r = [],
            i = []
          function o(e, i, u, c) {
            if (i >= r.length)
              return null != t && e.sort(t), null != n ? n(e) : e
            for (
              var l, s, f, h = -1, d = e.length, p = r[i++], g = a(), v = u();
              ++h < d;

            )
              (f = g.get((l = p((s = e[h])) + ''))) ? f.push(s) : g.set(l, [s])
            return (
              g.each(function(t, n) {
                c(v, n, o(t, i, u, c))
              }),
              v
            )
          }
          return (e = {
            object: function(t) {
              return o(t, 0, u, c)
            },
            map: function(t) {
              return o(t, 0, l, s)
            },
            entries: function(t) {
              return (function t(e, a) {
                if (++a > r.length) return e
                var o,
                  u = i[a - 1]
                return (
                  null != n && a >= r.length
                    ? (o = e.entries())
                    : ((o = []),
                      e.each(function(n, e) {
                        o.push({ key: e, values: t(n, a) })
                      })),
                  null != u
                    ? o.sort(function(t, n) {
                        return u(t.key, n.key)
                      })
                    : o
                )
              })(o(t, 0, l, s), 0)
            },
            key: function(t) {
              return r.push(t), e
            },
            sortKeys: function(t) {
              return (i[r.length - 1] = t), e
            },
            sortValues: function(n) {
              return (t = n), e
            },
            rollup: function(t) {
              return (n = t), e
            },
          })
        }
      function u() {
        return {}
      }
      function c(t, n, e) {
        t[n] = e
      }
      function l() {
        return a()
      }
      function s(t, n, e) {
        t.set(n, e)
      }
      function f() {}
      var h = a.prototype
      function d(t, n) {
        var e = new f()
        if (t instanceof f)
          t.each(function(t) {
            e.add(t)
          })
        else if (t) {
          var r = -1,
            i = t.length
          if (null == n) for (; ++r < i; ) e.add(t[r])
          else for (; ++r < i; ) e.add(n(t[r], r, t))
        }
        return e
      }
      f.prototype = d.prototype = {
        constructor: f,
        has: h.has,
        add: function(t) {
          return (this['$' + (t += '')] = t), this
        },
        remove: h.remove,
        clear: h.clear,
        values: h.keys,
        size: h.size,
        empty: h.empty,
        each: h.each,
      }
      var p = d,
        g = function(t) {
          var n = []
          for (var e in t) n.push(e)
          return n
        },
        v = function(t) {
          var n = []
          for (var e in t) n.push(t[e])
          return n
        },
        y = function(t) {
          var n = []
          for (var e in t) n.push({ key: e, value: t[e] })
          return n
        }
      e.d(n, 'nest', function() {
        return o
      }),
        e.d(n, 'set', function() {
          return p
        }),
        e.d(n, 'map', function() {
          return a
        }),
        e.d(n, 'keys', function() {
          return g
        }),
        e.d(n, 'values', function() {
          return v
        }),
        e.d(n, 'entries', function() {
          return y
        })
    },
    function(t, n, e) {
      'use strict'
      var r
      void 0 ===
        (r = function(t) {
          var n = e(0),
            r = 1.2,
            i = 10,
            a = 0.9,
            o = 0.6,
            u = 'value',
            c = 'label'
          return {
            getTextWidth: function(t) {
              var n =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : 12,
                e =
                  arguments.length > 2 && void 0 !== arguments[2]
                    ? arguments[2]
                    : 'Arial',
                r = document.createElement('canvas').getContext('2d')
              return (r.font = n + 'px ' + e), r.measureText(t).width
            },
            wrapText: function(t, e, l, s) {
              var f = n.select(s),
                h = f
                  .text()
                  .split(/\s+/)
                  .reverse(),
                d = void 0,
                p = [],
                g = 0,
                v = r * a,
                y = f.attr('y'),
                m = parseFloat(f.attr('dy')),
                x = e * o,
                _ = f
                  .text(null)
                  .append('tspan')
                  .attr('x', t)
                  .attr('y', y - 5)
                  .attr('dy', m + 'em')
                  .classed(u, !0)
                  .style('font-size', e + 'px')
              for (
                _.text(h.pop()),
                  _ = f
                    .append('tspan')
                    .classed(c, !0)
                    .attr('x', t)
                    .attr('y', y + i)
                    .attr('dy', ++g * v + m + 'em')
                    .style('font-size', x + 'px');
                (d = h.pop());

              )
                p.push(d),
                  _.text(p.join(' ')),
                  _.node() &&
                    _.node().getComputedTextLength() > l - 50 &&
                    (p.pop(),
                    _.text(p.join(' ')),
                    (p = [d]),
                    (_ = f
                      .append('tspan')
                      .classed(c, !0)
                      .attr('x', t)
                      .attr('y', y + i)
                      .attr('dy', ++g * v + m + 'em')
                      .text(d)
                      .style('font-size', x + 'px')))
            },
            wrapTextWithEllipses: function(t, e) {
              var r =
                  arguments.length > 2 && void 0 !== arguments[2]
                    ? arguments[2]
                    : 0,
                i =
                  arguments.length > 3 && void 0 !== arguments[3]
                    ? arguments[3]
                    : 2
              t.each(function() {
                var a, o, u, c, l, s, f
                for (
                  a = (t = n.select(this))
                    .text()
                    .split(/\s+/)
                    .reverse(),
                    u = [],
                    c = 0,
                    l = t.attr('y'),
                    s = parseFloat(t.attr('dy')),
                    f = t
                      .text(null)
                      .append('tspan')
                      .attr('x', r)
                      .attr('y', l)
                      .attr('dy', s + 'em');
                  (o = a.pop());

                )
                  if (
                    (u.push(o),
                    f.text(u.join(' ')),
                    f.node() && f.node().getComputedTextLength() > e)
                  ) {
                    if ((u.pop(), f.text(u.join(' ')), !(c < i - 1))) {
                      u.push('...'), f.text(u.join(' '))
                      break
                    }
                    ;(u = [o]),
                      (f = t
                        .append('tspan')
                        .attr('x', r)
                        .attr('y', l)
                        .attr('dy', 1.2 * ++c + s + 'em')
                        .text(o)),
                      t.classed('adjust-upwards', !0)
                  }
              })
            },
          }
        }.call(n, e, n, t)) || (t.exports = r)
    },
    function(t, n, e) {
      'use strict'
      var r,
        i = (function() {
          return function(t, n) {
            if (Array.isArray(t)) return t
            if (Symbol.iterator in Object(t))
              return (function(t, n) {
                var e = [],
                  r = !0,
                  i = !1,
                  a = void 0
                try {
                  for (
                    var o, u = t[Symbol.iterator]();
                    !(r = (o = u.next()).done) &&
                    (e.push(o.value), !n || e.length !== n);
                    r = !0
                  );
                } catch (t) {
                  ;(i = !0), (a = t)
                } finally {
                  try {
                    !r && u.return && u.return()
                  } finally {
                    if (i) throw a
                  }
                }
                return e
              })(t, n)
            throw new TypeError(
              'Invalid attempt to destructure non-iterable instance',
            )
          }
        })(),
        a =
          'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
            ? function(t) {
                return typeof t
              }
            : function(t) {
                return t &&
                  'function' == typeof Symbol &&
                  t.constructor === Symbol &&
                  t !== Symbol.prototype
                  ? 'symbol'
                  : typeof t
              }
      function o(t, n, e) {
        return (
          n in t
            ? Object.defineProperty(t, n, {
                value: e,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (t[n] = e),
          t
        )
      }
      void 0 ===
        (r = function(t) {
          var n,
            r = e(2),
            u = e(13),
            c = e(15),
            l = c.axisTimeCombinations,
            s = c.timeBenchmarks,
            f = e(22),
            h = f.convertMillisecondsToDays,
            d = f.getLocaleDateFormatter,
            p = {
              minute: u.timeFormat('%M m'),
              hour: u.timeFormat('%H %p'),
              day: u.timeFormat('%e'),
              daymonth: u.timeFormat('%d %b'),
              month: u.timeFormat('%b'),
              year: u.timeFormat('%Y'),
            },
            g =
              (o((n = {}), l.MINUTE_HOUR, r.timeHour.every(1)),
              o(n, l.HOUR_DAY, r.timeDay.every(1)),
              o(n, l.DAY_MONTH, r.timeMonth.every(1)),
              o(n, l.MONTH_YEAR, r.timeYear.every(1)),
              n)
          return {
            getTimeSeriesAxis: function(t, n) {
              var e,
                o,
                u =
                  arguments.length > 2 && void 0 !== arguments[2]
                    ? arguments[2]
                    : null,
                c =
                  arguments.length > 3 && void 0 !== arguments[3]
                    ? arguments[3]
                    : null,
                f = new Date(t[0].date),
                v = new Date(t[t.length - 1].date) - f
              c &&
                ('undefined' == typeof Intl ||
                  ('object' ===
                    ('undefined' == typeof Intl ? 'undefined' : a(Intl)) &&
                    !Intl.DateTimeFormat)) &&
                (c = null),
                u ||
                  ((e = v),
                  (o = s.ONE_YEAR),
                  (u =
                    e < s.ONE_DAY
                      ? l.HOUR_DAY
                      : e < o
                      ? l.DAY_MONTH
                      : l.MONTH_YEAR))
              var y = u.split('-'),
                m = i(y, 2),
                x = m[0],
                _ = m[1],
                b = g[u],
                w = (function(t, n) {
                  var e = Math.ceil(t / 70)
                  return n < 5 ? r.timeDay : Math.min(n, e)
                })(n, h(v))
              return {
                minor: { format: c ? d(c, x) : p[x], tick: w },
                major: { format: c ? d(c, _) : p[_], tick: b },
              }
            },
          }
        }.call(n, e, n, t)) || (t.exports = r)
    },
    function(t, n) {
      var e = 9007199254740991,
        r = '[object Arguments]',
        i = '[object Function]',
        a = '[object GeneratorFunction]',
        o = /^(?:0|[1-9]\d*)$/
      var u,
        c,
        l = Object.prototype,
        s = l.hasOwnProperty,
        f = l.toString,
        h = l.propertyIsEnumerable,
        d =
          ((u = Object.keys),
          (c = Object),
          function(t) {
            return u(c(t))
          }),
        p = Math.max,
        g = !h.call({ valueOf: 1 }, 'valueOf')
      function v(t, n) {
        var e =
            b(t) ||
            (function(t) {
              return (
                (function(t) {
                  return (
                    (function(t) {
                      return !!t && 'object' == typeof t
                    })(t) && w(t)
                  )
                })(t) &&
                s.call(t, 'callee') &&
                (!h.call(t, 'callee') || f.call(t) == r)
              )
            })(t)
              ? (function(t, n) {
                  for (var e = -1, r = Array(t); ++e < t; ) r[e] = n(e)
                  return r
                })(t.length, String)
              : [],
          i = e.length,
          a = !!i
        for (var o in t)
          (!n && !s.call(t, o)) ||
            (a && ('length' == o || m(o, i))) ||
            e.push(o)
        return e
      }
      function y(t, n, e) {
        var r = t[n]
        ;(s.call(t, n) && _(r, e) && (void 0 !== e || n in t)) || (t[n] = e)
      }
      function m(t, n) {
        return (
          !!(n = null == n ? e : n) &&
          ('number' == typeof t || o.test(t)) &&
          t > -1 &&
          t % 1 == 0 &&
          t < n
        )
      }
      function x(t) {
        var n = t && t.constructor
        return t === (('function' == typeof n && n.prototype) || l)
      }
      function _(t, n) {
        return t === n || (t != t && n != n)
      }
      var b = Array.isArray
      function w(t) {
        return (
          null != t &&
          (function(t) {
            return 'number' == typeof t && t > -1 && t % 1 == 0 && t <= e
          })(t.length) &&
          !(function(t) {
            var n = M(t) ? f.call(t) : ''
            return n == i || n == a
          })(t)
        )
      }
      function M(t) {
        var n = typeof t
        return !!t && ('object' == n || 'function' == n)
      }
      var A,
        k =
          ((A = function(t, n) {
            if (g || x(n) || w(n))
              !(function(t, n, e, r) {
                e || (e = {})
                for (var i = -1, a = n.length; ++i < a; ) {
                  var o = n[i],
                    u = r ? r(e[o], t[o], o, e, t) : void 0
                  y(e, o, void 0 === u ? t[o] : u)
                }
              })(
                n,
                (function(t) {
                  return w(t)
                    ? v(t)
                    : (function(t) {
                        if (!x(t)) return d(t)
                        var n = []
                        for (var e in Object(t))
                          s.call(t, e) && 'constructor' != e && n.push(e)
                        return n
                      })(t)
                })(n),
                t,
              )
            else for (var e in n) s.call(n, e) && y(t, e, n[e])
          }),
          (function(t, n) {
            return (
              (n = p(void 0 === n ? t.length - 1 : n, 0)),
              function() {
                for (
                  var e = arguments,
                    r = -1,
                    i = p(e.length - n, 0),
                    a = Array(i);
                  ++r < i;

                )
                  a[r] = e[n + r]
                r = -1
                for (var o = Array(n + 1); ++r < n; ) o[r] = e[r]
                return (
                  (o[n] = a),
                  (function(t, n, e) {
                    switch (e.length) {
                      case 0:
                        return t.call(n)
                      case 1:
                        return t.call(n, e[0])
                      case 2:
                        return t.call(n, e[0], e[1])
                      case 3:
                        return t.call(n, e[0], e[1], e[2])
                    }
                    return t.apply(n, e)
                  })(t, this, o)
                )
              }
            )
          })(function(t, n) {
            var e = -1,
              r = n.length,
              i = r > 1 ? n[r - 1] : void 0,
              a = r > 2 ? n[2] : void 0
            for (
              i = A.length > 3 && 'function' == typeof i ? (r--, i) : void 0,
                a &&
                  (function(t, n, e) {
                    if (!M(e)) return !1
                    var r = typeof n
                    return (
                      !!('number' == r
                        ? w(e) && m(n, e.length)
                        : 'string' == r && (n in e)) && _(e[n], t)
                    )
                  })(n[0], n[1], a) &&
                  ((i = r < 3 ? void 0 : i), (r = 1)),
                t = Object(t);
              ++e < r;

            ) {
              var o = n[e]
              o && A(t, o, e, i)
            }
            return t
          }))
      t.exports = k
    },
    function(t, n, e) {
      'use strict'
      var r
      void 0 ===
        (r = function(t) {
          e(5)
          return {
            addDays: function(t, n) {
              var e = new Date(t)
              return e.setDate(e.getDate() + n), String(e)
            },
            convertMillisecondsToDays: function(t) {
              return Math.ceil(t / 864e5)
            },
            diffDays: function(t, n) {
              return Math.ceil(
                Math.abs(
                  (new Date(t).getTime() - new Date(n).getTime()) / 864e5,
                ),
              )
            },
            getLocaleDateFormatter: function(t) {
              var n =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : 'day',
                e = localeTimeMap[n],
                r = new Intl.DateTimeFormat(t, e)
              return function(t) {
                return r.format(t)
              }
            },
          }
        }.call(n, e, n, t)) || (t.exports = r)
    },
    function(t, n, e) {
      'use strict'
      var r
      void 0 ===
        (r = function(t) {
          e(0)
          var n = 'highlight-filter'
          return {
            bounceCircleHighlight: function(t, n, e) {
              var r =
                arguments.length > 3 && void 0 !== arguments[3]
                  ? arguments[3]
                  : 2 * e
              t.transition()
                .ease(n)
                .duration(100)
                .attr('r', r)
                .transition()
                .ease(n)
                .delay(50)
                .duration(100)
                .attr('r', e)
            },
            createFilterContainer: function(t) {
              return t
                .append('defs')
                .append('filter')
                .attr('id', n)
            },
            createGausianBlur: function(t) {
              return (
                t
                  .append('feGaussianBlur')
                  .attr('stdDeviation', 1)
                  .attr('result', 'coloredBlur'),
                n
              )
            },
            createWhiteGlow: function(t) {
              t
                .attr('x', '-5000%')
                .attr('y', '-5000%')
                .attr('width', '10000%')
                .attr('height', '10000%'),
                t
                  .append('feFlood')
                  .attr('result', 'flood')
                  .attr('flood-color', '#ffffff')
                  .attr('flood-opacity', '1'),
                t
                  .append('feComposite')
                  .attr('result', 'mask')
                  .attr('in2', 'SourceGraphic')
                  .attr('operator', 'in')
                  .attr('in', 'flood'),
                t
                  .append('feMorphology')
                  .attr('result', 'dilated')
                  .attr('operator', 'dilate')
                  .attr('radius', '2')
                  .attr('in', 'mask'),
                t
                  .append('feGaussianBlur')
                  .attr('result', 'blurred')
                  .attr('stdDeviation', '5')
                  .attr('in', 'dilated')
              var e = t.append('feMerge')
              return (
                e.append('feMergeNode').attr('in', 'blurred'),
                e.append('feMergeNode').attr('in', 'SourceGraphic'),
                n
              )
            },
            createGlow: function(t) {
              t
                .attr('x', '-30%')
                .attr('y', '-30%')
                .attr('width', '160%')
                .attr('height', '160%'),
                t
                  .append('feGaussianBlur')
                  .attr('stdDeviation', '0.9 0.9')
                  .attr('result', 'glow')
              var e = t.append('feMerge')
              return (
                e.append('feMergeNode').attr('in', 'glow'),
                e.append('feMergeNode').attr('in', 'glow'),
                e.append('feMergeNode').attr('in', 'glow'),
                n
              )
            },
            createGlowWithMatrix: function(t) {
              t
                .attr('x', '-500%')
                .attr('y', '-500%')
                .attr('width', '1800%')
                .attr('height', '1800%'),
                t
                  .append('feColorMatrix')
                  .attr('type', 'matrix')
                  .attr('values', '0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0'),
                t
                  .append('feGaussianBlur')
                  .attr('stdDeviation', '1')
                  .attr('result', 'coloredBlur')
                  .attr('in', 'SourceGraphic')
              var e = t.append('feMerge')
              return (
                e.append('feMergeNode').attr('in', 'coloredBlur'),
                e.append('feMergeNode').attr('in', 'SourceGraphic'),
                n
              )
            },
          }
        }.call(n, e, n, t)) || (t.exports = r)
    },
    function(t, n, e) {
      'use strict'
      Object.defineProperty(n, '__esModule', { value: !0 }),
        (n.colors = n.bullet = n.brush = n.step = n.heatmap = n.stackedBar = n.groupedBar = n.stackedArea = n.sparkline = n.miniTooltip = n.tooltip = n.loadingStates = n.line = n.legend = n.donut = n.bar = void 0)
      var r = x(e(25)),
        i = x(e(30)),
        a = x(e(31)),
        o = x(e(32)),
        u = x(e(12)),
        c = x(e(33)),
        l = x(e(34)),
        s = x(e(35)),
        f = x(e(36)),
        h = x(e(37)),
        d = x(e(38)),
        p = x(e(39)),
        g = x(e(40)),
        v = x(e(41)),
        y = x(e(42)),
        m = x(e(9))
      function x(t) {
        return t && t.__esModule ? t : { default: t }
      }
      ;(n.bar = r.default),
        (n.donut = i.default),
        (n.legend = a.default),
        (n.line = o.default),
        (n.loadingStates = u.default),
        (n.tooltip = c.default),
        (n.miniTooltip = l.default),
        (n.sparkline = s.default),
        (n.stackedArea = f.default),
        (n.groupedBar = h.default),
        (n.stackedBar = d.default),
        (n.heatmap = p.default),
        (n.step = g.default),
        (n.brush = v.default),
        (n.bullet = y.default),
        (n.colors = m.default)
    },
    function(t, n, e) {
      'use strict'
      var r,
        i =
          Object.assign ||
          function(t) {
            for (var n = 1; n < arguments.length; n++) {
              var e = arguments[n]
              for (var r in e)
                Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r])
            }
            return t
          }
      void 0 ===
        (r = function(t) {
          var n = e(1),
            r = e(8),
            a = e(14),
            o = e(3),
            u = e(7),
            c = e(5),
            l = e(10),
            s = e(0),
            f = (e(6), e(19)),
            h = e(11).exportChart,
            d = e(9),
            p = e(12).bar,
            g = e(16).uniqueId
          return function() {
            var t = { top: 20, right: 20, bottom: 30, left: 40 },
              e = 960,
              v = 500,
              y = p,
              m = void 0,
              x = void 0,
              _ = void 0,
              b = void 0,
              w = void 0,
              M = void 0,
              A = d.singleColors.aloeGreen,
              k = void 0,
              T = void 0,
              O = null,
              S = void 0,
              C = g('bar-gradient'),
              E = 5,
              N = 5,
              D = 1,
              F = ',f',
              L = !1,
              j = 7,
              B = ',f',
              I = 12,
              P = 0.1,
              R = void 0,
              U = void 0,
              H = { top: 0, left: 0, bottom: 0, right: 0 },
              z = 10,
              Y = 1,
              q = !1,
              G = void 0,
              W = !0,
              X = !1,
              V = r.easeQuadInOut,
              $ = 800,
              Z = function(t, n) {
                return 70 * n
              },
              Q = function(t) {
                return t.attr('fill', function(t) {
                  var n = t.name
                  return o.color(O ? O[1] : T(n)).darker()
                })
              },
              K = void 0,
              J = 'value',
              tt = 'name',
              nt = void 0,
              et = null,
              rt = null,
              it = 30,
              at = null,
              ot = null,
              ut = -30,
              ct = !0,
              lt = u.dispatch(
                'customMouseOver',
                'customMouseOut',
                'customMouseMove',
                'customClick',
              ),
              st = function(t) {
                return t.name
              },
              ft = function(t) {
                return t.value
              },
              ht = function(t) {
                var n = t.value
                return c.format(B)(n)
              },
              dt = function(t) {
                var n = t.value
                return w(n) + j
              },
              pt = function(t) {
                var n = t.name
                return M(n) + M.bandwidth() / 2 + I * (3 / 8)
              },
              gt = function(t) {
                var n = t.name
                return w(n)
              },
              vt = function(t) {
                var n = t.value
                return M(n) - j
              }
            function yt(r) {
              r.each(function(r) {
                ;(_ = e - t.left - t.right - 1.2 * z),
                  (b = v - t.top - t.bottom)
                var i,
                  o = (function(t) {
                    var n = t.data,
                      e = t.dataZeroed
                    K && (n.sort(K), e.sort(K))
                    return { data: n, dataZeroed: e }
                  })(
                    (function(t) {
                      var n = t.reduce(function(t, n) {
                          return (
                            (n.value = +n[J]),
                            (n.name = String(n[tt])),
                            [].concat(
                              (function(t) {
                                if (Array.isArray(t)) {
                                  for (
                                    var n = 0, e = Array(t.length);
                                    n < t.length;
                                    n++
                                  )
                                    e[n] = t[n]
                                  return e
                                }
                                return Array.from(t)
                              })(t),
                              [n],
                            )
                          )
                        }, []),
                        e = n.map(function(t) {
                          return { value: 0, name: String(t[tt]) }
                        })
                      return { data: n, dataZeroed: e }
                    })(r),
                  )
                ;(m = o.data),
                  (x = o.dataZeroed),
                  (function() {
                    var t = Math.min(D * n.max(m, ft))
                    q
                      ? ((w = l
                          .scaleLinear()
                          .domain([0, t])
                          .rangeRound([0, _])),
                        (M = l
                          .scaleBand()
                          .domain(m.map(st))
                          .rangeRound([b, 0])
                          .padding(P)))
                      : ((w = l
                          .scaleBand()
                          .domain(m.map(st))
                          .rangeRound([0, _])
                          .padding(P)),
                        (M = l
                          .scaleLinear()
                          .domain([0, t])
                          .rangeRound([b, 0])))
                    k = ct
                      ? m
                          .map(function(t) {
                            return t
                          })
                          .reverse()
                          .map(function(t, n) {
                            var e = t.name
                            return { name: e, color: A[n % A.length] }
                          })
                      : m
                          .map(function(t) {
                            return t
                          })
                          .map(function(t, n) {
                            var e = t.name
                            return { name: e, color: A[n % A.length] }
                          })
                    T = function(t) {
                      return k.filter(function(n) {
                        var e = n.name
                        return e === t
                      })[0].color
                    }
                  })(),
                  q
                    ? ((R = a
                        .axisBottom(w)
                        .ticks(N, F)
                        .tickSizeInner([-b])),
                      (U = a.axisLeft(M)))
                    : ((R = a.axisBottom(w)), (U = a.axisLeft(M).ticks(E, F))),
                  (function(n) {
                    G ||
                      ((G = s
                        .select(n)
                        .append('svg')
                        .classed('britechart bar-chart', !0)),
                      (function() {
                        var n = G.append('g')
                          .classed('container-group', !0)
                          .attr(
                            'transform',
                            'translate(' + (t.left + z) + ', ' + t.top + ')',
                          )
                        n.append('g').classed('grid-lines-group', !0),
                          n.append('g').classed('chart-group', !0),
                          n
                            .append('g')
                            .classed('x-axis-group axis', !0)
                            .append('g')
                            .classed('x-axis-label', !0),
                          n
                            .append('g')
                            .attr('transform', 'translate(' + -1 * z + ', 0)')
                            .classed('y-axis-group axis', !0)
                            .append('g')
                            .classed('y-axis-label', !0),
                          n.append('g').classed('metadata-group', !0)
                      })())
                    G.attr('width', e).attr('height', v)
                  })(this),
                  !S &&
                    O &&
                    (S = G.select('.metadata-group')
                      .append('linearGradient')
                      .attr('id', C)
                      .attr('x1', '0%')
                      .attr('y1', '0%')
                      .attr('x2', '100%')
                      .attr('y2', '100%')
                      .attr('gradientUnits', 'userSpaceOnUse')
                      .selectAll('stop')
                      .data([
                        { offset: '0%', color: O[0] },
                        { offset: '50%', color: O[1] },
                      ])
                      .enter()
                      .append('stop')
                      .attr('offset', function(t) {
                        var n = t.offset
                        return n
                      })
                      .attr('stop-color', function(t) {
                        var n = t.color
                        return n
                      })),
                  G.select('.grid-lines-group')
                    .selectAll('line')
                    .remove(),
                  q
                    ? (G.select('.grid-lines-group')
                        .selectAll('line.vertical-grid-line')
                        .data(w.ticks(N).slice(1))
                        .enter()
                        .append('line')
                        .attr('class', 'vertical-grid-line')
                        .attr('y1', H.left)
                        .attr('y2', b)
                        .attr('x1', function(t) {
                          return w(t)
                        })
                        .attr('x2', function(t) {
                          return w(t)
                        }),
                      G.select('.grid-lines-group')
                        .selectAll('line.extended-y-line')
                        .data([0])
                        .enter()
                        .append('line')
                        .attr('class', 'extended-y-line')
                        .attr('y1', H.bottom)
                        .attr('y2', b)
                        .attr('x1', 0)
                        .attr('x2', 0))
                    : (G.select('.grid-lines-group')
                        .selectAll('line.horizontal-grid-line')
                        .data(M.ticks(E).slice(1))
                        .enter()
                        .append('line')
                        .attr('class', 'horizontal-grid-line')
                        .attr('x1', H.left)
                        .attr('x2', _)
                        .attr('y1', function(t) {
                          return M(t)
                        })
                        .attr('y2', function(t) {
                          return M(t)
                        }),
                      G.select('.grid-lines-group')
                        .selectAll('line.extended-x-line')
                        .data([0])
                        .enter()
                        .append('line')
                        .attr('class', 'extended-x-line')
                        .attr('x1', H.left)
                        .attr('x2', _)
                        .attr('y1', b)
                        .attr('y2', b)),
                  (i = void 0),
                  X
                    ? ((i = G.select('.chart-group')
                        .selectAll('.bar')
                        .data(x)),
                      q ? _t(i) : bt(i),
                      (i = G.select('.chart-group')
                        .selectAll('.bar')
                        .data(m)),
                      q
                        ? (function(t) {
                            t
                              .enter()
                              .append('rect')
                              .classed('bar', !0)
                              .attr('x', 0)
                              .attr('y', b)
                              .attr('height', M.bandwidth())
                              .attr('width', function(t) {
                                var n = t.value
                                return w(n)
                              })
                              .on('mouseover', function(t, n, e) {
                                wt(this, t, e, _, b)
                              })
                              .on('mousemove', function(t) {
                                Mt(this, t, _, b)
                              })
                              .on('mouseout', function(t, n, e) {
                                At(this, t, e, _, b)
                              })
                              .on('click', function(t) {
                                kt(this, t, _, b)
                              }),
                              t
                                .attr('x', 0)
                                .attr('y', function(t) {
                                  var n = t.name
                                  return M(n)
                                })
                                .attr('height', M.bandwidth())
                                .attr('fill', function(t) {
                                  var n = t.name
                                  return mt(n)
                                })
                                .transition()
                                .duration($)
                                .delay(Z)
                                .ease(V)
                                .attr('width', function(t) {
                                  var n = t.value
                                  return w(n)
                                })
                          })(i)
                        : (function(t) {
                            t.enter()
                              .append('rect')
                              .classed('bar', !0)
                              .attr('x', _)
                              .attr('y', function(t) {
                                var n = t.value
                                return M(n)
                              })
                              .attr('width', w.bandwidth())
                              .attr('height', function(t) {
                                var n = t.value
                                return b - M(n)
                              })
                              .on('mouseover', function(t, n, e) {
                                wt(this, t, e, _, b)
                              })
                              .on('mousemove', function(t) {
                                Mt(this, t, _, b)
                              })
                              .on('mouseout', function(t, n, e) {
                                At(this, t, e, _, b)
                              })
                              .on('click', function(t) {
                                kt(this, t, _, b)
                              })
                              .merge(t)
                              .attr('x', function(t) {
                                var n = t.name
                                return w(n)
                              })
                              .attr('width', w.bandwidth())
                              .attr('fill', function(t) {
                                var n = t.name
                                return mt(n)
                              })
                              .transition()
                              .duration($)
                              .delay(Z)
                              .ease(V)
                              .attr('y', function(t) {
                                var n = t.value
                                return M(n)
                              })
                              .attr('height', function(t) {
                                var n = t.value
                                return b - M(n)
                              })
                          })(i),
                      i
                        .exit()
                        .transition()
                        .style('opacity', 0)
                        .remove())
                    : ((i = G.select('.chart-group')
                        .selectAll('.bar')
                        .data(m)),
                      q ? _t(i) : bt(i),
                      i.exit().remove()),
                  G.select('.x-axis-group.axis')
                    .attr('transform', 'translate(0, ' + b + ')')
                    .call(R),
                  G.select('.y-axis-group.axis').call(U),
                  G.selectAll('.y-axis-group .tick text').call(xt, t.left - z),
                  ot &&
                    (at && at.remove(),
                    (at = G.select('.y-axis-label')
                      .append('text')
                      .classed('y-axis-label-text', !0)
                      .attr('x', -b / 2)
                      .attr('y', ut)
                      .attr('text-anchor', 'middle')
                      .attr('transform', 'rotate(270 0 0)')
                      .text(ot))),
                  rt &&
                    (et && et.remove(),
                    (et = G.select('.x-axis-label')
                      .append('text')
                      .attr('y', it)
                      .attr('text-anchor', 'middle')
                      .classed('x-axis-label-text', !0)
                      .attr('x', _ / 2)
                      .text(rt))),
                  L &&
                    (function() {
                      var t = q ? dt : gt,
                        n = q ? pt : vt,
                        e = ht
                      nt && G.selectAll('.percentage-label-group').remove()
                      ;(nt = G.select('.metadata-group')
                        .append('g')
                        .classed('percentage-label-group', !0)
                        .selectAll('text')
                        .data(m.reverse())
                        .enter()
                        .append('text'))
                        .classed('percentage-label', !0)
                        .attr('x', t)
                        .attr('y', n)
                        .text(e)
                        .attr('font-size', I + 'px')
                    })()
              })
            }
            function mt(t) {
              return O ? 'url(#' + C + ')' : T(t)
            }
            function xt(t, n) {
              f.wrapTextWithEllipses(t, n, 0, Y)
            }
            function _t(t) {
              t.enter()
                .append('rect')
                .classed('bar', !0)
                .attr('y', b)
                .attr('x', 0)
                .attr('height', M.bandwidth())
                .attr('width', function(t) {
                  var n = t.value
                  return w(n)
                })
                .on('mouseover', function(t, n, e) {
                  wt(this, t, e, _, b)
                })
                .on('mousemove', function(t) {
                  Mt(this, t, _, b)
                })
                .on('mouseout', function(t, n, e) {
                  At(this, t, e, _, b)
                })
                .on('click', function(t) {
                  kt(this, t, _, b)
                })
                .merge(t)
                .attr('x', 0)
                .attr('y', function(t) {
                  var n = t.name
                  return M(n)
                })
                .attr('height', M.bandwidth())
                .attr('width', function(t) {
                  var n = t.value
                  return w(n)
                })
                .attr('fill', function(t) {
                  return mt(t.name)
                })
            }
            function bt(t) {
              t.enter()
                .append('rect')
                .classed('bar', !0)
                .attr('x', _)
                .attr('y', function(t) {
                  var n = t.value
                  return M(n)
                })
                .attr('width', w.bandwidth())
                .attr('height', function(t) {
                  var n = t.value
                  return b - M(n)
                })
                .on('mouseover', function(t, n, e) {
                  wt(this, t, e, _, b)
                })
                .on('mousemove', function(t) {
                  Mt(this, t, _, b)
                })
                .on('mouseout', function(t, n, e) {
                  At(this, t, e, _, b)
                })
                .on('click', function(t) {
                  kt(this, t, _, b)
                })
                .merge(t)
                .attr('x', function(t) {
                  var n = t.name
                  return w(n)
                })
                .attr('y', function(t) {
                  var n = t.value
                  return M(n)
                })
                .attr('width', w.bandwidth())
                .attr('height', function(t) {
                  var n = t.value
                  return b - M(n)
                })
                .attr('fill', function(t) {
                  return mt(t.name)
                })
            }
            function wt(t, n, e, r, i) {
              lt.call('customMouseOver', t, n, s.mouse(t), [r, i]),
                (Q = Q || function() {}),
                W
                  ? Q(s.select(t))
                  : e.forEach(function(n) {
                      n !== t && Q(s.select(n))
                    })
            }
            function Mt(t, n, e, r) {
              lt.call('customMouseMove', t, n, s.mouse(t), [e, r])
            }
            function At(t, n, e, r, i) {
              lt.call('customMouseOut', t, n, s.mouse(t), [r, i]),
                e.forEach(function(t) {
                  s.select(t).attr('fill', function(t) {
                    return mt(t.name)
                  })
                })
            }
            function kt(t, n, e, r) {
              lt.call('customClick', t, n, s.mouse(t), [e, r])
            }
            return (
              (yt.chartGradient = function(t) {
                return arguments.length ? ((O = t), this) : O
              }),
              (yt.betweenBarsPadding = function(t) {
                return arguments.length ? ((P = t), this) : P
              }),
              (yt.colorSchema = function(t) {
                return arguments.length ? ((A = t), this) : A
              }),
              (yt.enableLabels = function(t) {
                return arguments.length ? ((L = t), this) : L
              }),
              (yt.exportChart = function(t, n) {
                h.call(yt, G, t, n)
              }),
              (yt.hasPercentage = function(t) {
                return arguments.length
                  ? ((F = t ? '%' : ',f'), this)
                  : '%' === F
              }),
              (yt.hasSingleBarHighlight = function(t) {
                return arguments.length ? ((W = t), this) : W
              }),
              (yt.height = function(t) {
                return arguments.length ? ((v = t), this) : v
              }),
              (yt.highlightBarFunction = function(t) {
                return arguments.length ? ((Q = t), this) : Q
              }),
              (yt.isAnimated = function(t) {
                return arguments.length ? ((X = t), this) : X
              }),
              (yt.isHorizontal = function(t) {
                return arguments.length ? ((q = t), this) : q
              }),
              (yt.labelsMargin = function(t) {
                return arguments.length ? ((j = t), this) : j
              }),
              (yt.labelsNumberFormat = function(t) {
                return arguments.length ? ((B = t), this) : B
              }),
              (yt.labelsSize = function(t) {
                return arguments.length ? ((I = t), this) : I
              }),
              (yt.loadingState = function(t) {
                return arguments.length ? ((y = t), this) : y
              }),
              (yt.margin = function(n) {
                return arguments.length ? ((t = i({}, t, n)), this) : t
              }),
              (yt.nameLabel = function(t) {
                return arguments.length ? ((tt = t), this) : tt
              }),
              (yt.numberFormat = function(t) {
                return arguments.length ? ((F = t), this) : F
              }),
              (yt.on = function() {
                var t = lt.on.apply(lt, arguments)
                return t === lt ? yt : t
              }),
              (yt.percentageAxisToMaxRatio = function(t) {
                return arguments.length ? ((D = t), this) : D
              }),
              (yt.shouldReverseColorList = function(t) {
                return arguments.length ? ((ct = t), this) : ct
              }),
              (yt.orderingFunction = function(t) {
                return arguments.length ? ((K = t), this) : K
              }),
              (yt.valueLabel = function(t) {
                return arguments.length ? ((J = t), this) : J
              }),
              (yt.width = function(t) {
                return arguments.length ? ((e = t), this) : e
              }),
              (yt.xAxisLabel = function(t) {
                return arguments.length ? ((rt = t), this) : rt
              }),
              (yt.xAxisLabelOffset = function(t) {
                return arguments.length ? ((it = t), this) : it
              }),
              (yt.xTicks = function(t) {
                return arguments.length ? ((N = t), this) : N
              }),
              (yt.yAxisLabel = function(t) {
                return arguments.length ? ((ot = t), this) : ot
              }),
              (yt.yAxisLabelOffset = function(t) {
                return arguments.length ? ((ut = t), this) : ut
              }),
              (yt.yAxisPaddingBetweenChart = function(t) {
                return arguments.length ? ((z = t), this) : z
              }),
              (yt.yTicks = function(t) {
                return arguments.length ? ((E = t), this) : E
              }),
              yt
            )
          }
        }.call(n, e, n, t)) || (t.exports = r)
    },
    function(t, n, e) {
      'use strict'
      var r, i, a
      t.exports =
        ((r = {
          BASE: !0,
          HEAD: !0,
          HTML: !0,
          META: !0,
          NOFRAME: !0,
          NOSCRIPT: !0,
          PARAM: !0,
          SCRIPT: !0,
          STYLE: !0,
          TITLE: !0,
        }),
        (i = [
          'A',
          'ABBR',
          'ADDRESS',
          'AREA',
          'ARTICLE',
          'ASIDE',
          'AUDIO',
          'B',
          'BASE',
          'BDI',
          'BDO',
          'BLOCKQUOTE',
          'BODY',
          'BR',
          'BUTTON',
          'CANVAS',
          'CAPTION',
          'CENTER',
          'CITE',
          'CODE',
          'COL',
          'COLGROUP',
          'COMMAND',
          'DATALIST',
          'DD',
          'DEL',
          'DETAILS',
          'DFN',
          'DIV',
          'DL',
          'DT',
          'EM',
          'EMBED',
          'FIELDSET',
          'FIGCAPTION',
          'FIGURE',
          'FONT',
          'FOOTER',
          'FORM',
          'H1',
          'H2',
          'H3',
          'H4',
          'H5',
          'H6',
          'HEAD',
          'HEADER',
          'HGROUP',
          'HR',
          'HTML',
          'I',
          'IFRAME',
          'IMG',
          'INPUT',
          'INS',
          'KBD',
          'LABEL',
          'LEGEND',
          'LI',
          'LINK',
          'MAP',
          'MARK',
          'MATH',
          'MENU',
          'META',
          'METER',
          'NAV',
          'NOBR',
          'NOSCRIPT',
          'OBJECT',
          'OL',
          'OPTION',
          'OPTGROUP',
          'OUTPUT',
          'P',
          'PARAM',
          'PRE',
          'PROGRESS',
          'Q',
          'RP',
          'RT',
          'RUBY',
          'S',
          'SAMP',
          'SCRIPT',
          'SECTION',
          'SELECT',
          'SMALL',
          'SOURCE',
          'SPAN',
          'STRONG',
          'STYLE',
          'SUB',
          'SUMMARY',
          'SUP',
          'SVG',
          'TABLE',
          'TBODY',
          'TD',
          'TEXTAREA',
          'TFOOT',
          'TH',
          'THEAD',
          'TIME',
          'TITLE',
          'TR',
          'TRACK',
          'U',
          'UL',
          'VAR',
          'VIDEO',
          'WBR',
        ]),
        (a = function(t) {
          var n = {},
            e = document.body.appendChild(document.createElement(t)),
            r = window.getComputedStyle(e)
          return (
            [].forEach.call(r, function(t) {
              n[t] = r[t]
            }),
            document.body.removeChild(e),
            n
          )
        }),
        {
          initializeSerializer: function() {
            var t = {}
            return (
              [].forEach.call(i, function(n) {
                r[n] || (t[n] = a(n))
              }),
              function(n) {
                var e,
                  i = [],
                  o = void 0,
                  u = void 0,
                  c = void 0
                if (n && n.nodeType === Node.ELEMENT_NODE)
                  return (
                    (i = []),
                    (o = n.querySelectorAll('*')),
                    [].forEach.call(o, function(n, e) {
                      var o
                      r[n.tagName] ||
                        ((u = window.getComputedStyle(n)),
                        (o = (o = n.tagName).toUpperCase()),
                        t[o] || (t[o] = a(o)),
                        (c = t[o]),
                        (i[e] = n.style.cssText),
                        [].forEach.call(u, function(t) {
                          u[t] !== c[t] && (n.style[t] = u[t])
                        }))
                    }),
                    (e = n.outerHTML),
                    (o = [].map.call(o, function(t, n) {
                      return (t.style.cssText = i[n]), t
                    })),
                    e
                  )
              }
            )
          },
        })
    },
    function(t, n, e) {
      ;(function(t, r) {
        var i
        /*! http://mths.be/base64 v0.1.0 by @mathias | MIT license */ !(function(
          a,
        ) {
          var o = n,
            u = (t && t.exports, 'object' == typeof r && r)
          u.global !== u && u.window
          var c = function(t) {
            this.message = t
          }
          ;(c.prototype = new Error()).name = 'InvalidCharacterError'
          var l = function(t) {
              throw new c(t)
            },
            s =
              'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
            f = /[\t\n\f\r ]/g,
            h = {
              encode: function(t) {
                ;(t = String(t)),
                  /[^\0-\xFF]/.test(t) &&
                    l(
                      'The string to be encoded contains characters outside of the Latin1 range.',
                    )
                for (
                  var n,
                    e,
                    r,
                    i,
                    a = t.length % 3,
                    o = '',
                    u = -1,
                    c = t.length - a;
                  ++u < c;

                )
                  (n = t.charCodeAt(u) << 16),
                    (e = t.charCodeAt(++u) << 8),
                    (r = t.charCodeAt(++u)),
                    (o +=
                      s.charAt(((i = n + e + r) >> 18) & 63) +
                      s.charAt((i >> 12) & 63) +
                      s.charAt((i >> 6) & 63) +
                      s.charAt(63 & i))
                return (
                  2 == a
                    ? ((n = t.charCodeAt(u) << 8),
                      (e = t.charCodeAt(++u)),
                      (o +=
                        s.charAt((i = n + e) >> 10) +
                        s.charAt((i >> 4) & 63) +
                        s.charAt((i << 2) & 63) +
                        '='))
                    : 1 == a &&
                      ((i = t.charCodeAt(u)),
                      (o += s.charAt(i >> 2) + s.charAt((i << 4) & 63) + '==')),
                  o
                )
              },
              decode: function(t) {
                var n = (t = String(t).replace(f, '')).length
                n % 4 == 0 && (n = (t = t.replace(/==?$/, '')).length),
                  (n % 4 == 1 || /[^+a-zA-Z0-9\/]/.test(t)) &&
                    l(
                      'Invalid character: the string to be decoded is not correctly encoded.',
                    )
                for (var e, r, i = 0, a = '', o = -1; ++o < n; )
                  (r = s.indexOf(t.charAt(o))),
                    (e = i % 4 ? 64 * e + r : r),
                    i++ % 4 &&
                      (a += String.fromCharCode(255 & (e >> ((-2 * i) & 6))))
                return a
              },
              version: '0.1.0',
            }
          void 0 ===
            (i = function() {
              return h
            }.call(n, e, n, t)) || (t.exports = i)
        })()
      }.call(this, e(28)(t), e(29)))
    },
    function(t, n) {
      t.exports = function(t) {
        return (
          t.webpackPolyfill ||
            ((t.deprecate = function() {}),
            (t.paths = []),
            t.children || (t.children = []),
            Object.defineProperty(t, 'loaded', {
              enumerable: !0,
              get: function() {
                return t.l
              },
            }),
            Object.defineProperty(t, 'id', {
              enumerable: !0,
              get: function() {
                return t.i
              },
            }),
            (t.webpackPolyfill = 1)),
          t
        )
      }
    },
    function(t, n) {
      var e
      e = (function() {
        return this
      })()
      try {
        e = e || new Function('return this')()
      } catch (t) {
        'object' == typeof window && (e = window)
      }
      t.exports = e
    },
    function(t, n, e) {
      'use strict'
      var r,
        i =
          Object.assign ||
          function(t) {
            for (var n = 1; n < arguments.length; n++) {
              var e = arguments[n]
              for (var r in e)
                Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r])
            }
            return t
          }
      void 0 ===
        (r = function(t) {
          var n = e(7),
            r = e(8),
            a = (e(5), e(4)),
            o = e(10),
            u = e(17),
            c = e(0),
            l = (e(6), e(11).exportChart),
            s = e(19),
            f = e(9),
            h = e(16).calculatePercent,
            d = e(15).emptyDonutData,
            p = e(12).donut
          return function() {
            var t = { top: 0, right: 0, bottom: 0, left: 0 },
              e = 300,
              g = 300,
              v = p,
              y = r.easeCubicInOut,
              m = 1200,
              x = 150,
              _ = 12,
              b = 0,
              w = void 0,
              M = void 0,
              A = void 0,
              k = 140,
              T = 45.5,
              O = k + T,
              S = void 0,
              C = void 0,
              E = void 0,
              N = void 0,
              D = !1,
              F = !1,
              L = void 0,
              j = void 0,
              B = !1,
              I = !0,
              P = !1,
              R = null,
              U = { emptySliceColor: '#EFF2F5', showEmptySlice: !1 },
              H = 'quantity',
              z = 'name',
              Y = 'percentage',
              q = '.1f',
              G = void 0,
              W = void 0,
              X = f.colorSchemas.britecharts,
              V = function(t) {
                return t.percentage + '% ' + t.name
              },
              $ = function(t) {
                this._current = t
              },
              Z = function(t) {
                t.outerRadius = k - _
              },
              Q = function(t, n) {
                return n.quantity - t.quantity
              },
              K = function(t) {
                return t.reduce(function(t, n) {
                  return n.quantity + t
                }, 0)
              },
              J = function(t) {
                return t.quantity
              },
              tt = function(t) {
                var n = t.data
                return W(n.name)
              },
              nt = n.dispatch(
                'customMouseOver',
                'customMouseOut',
                'customMouseMove',
                'customClick',
              )
            function et(n) {
              n.each(function(n) {
                ;(M = e - t.left - t.right),
                  (A = g - t.top - t.bottom),
                  (w = (function(t) {
                    var n = t.reduce(function(t, n) {
                        return void 0 === n[H] || null === n[H]
                          ? t
                          : ((n.quantity = +n[H]),
                            (n.name = String(n[z])),
                            (n.percentage = n[Y] || null),
                            [].concat(
                              (function(t) {
                                if (Array.isArray(t)) {
                                  for (
                                    var n = 0, e = Array(t.length);
                                    n < t.length;
                                    n++
                                  )
                                    e[n] = t[n]
                                  return e
                                }
                                return Array.from(t)
                              })(t),
                              [n],
                            ))
                      }, []),
                      e = K(n)
                    0 === e && U.showEmptySlice && (F = !0)
                    return n.map(function(t) {
                      return (
                        (t.percentage = String(t.percentage || h(t[H], e, q))),
                        t
                      )
                    })
                  })(n)),
                  (S = u
                    .pie()
                    .padAngle(b)
                    .value(J)
                    .sort(Q)),
                  X && (W = o.scaleOrdinal().range(X)),
                  (C = u
                    .arc()
                    .innerRadius(T)
                    .padRadius(k)),
                  (function(t) {
                    N ||
                      ((N = c
                        .select(t)
                        .append('svg')
                        .classed('britechart donut-chart', !0)),
                      (function() {
                        var t = N.append('g').classed('container-group', !0)
                        t.append('g').classed('chart-group', !0),
                          t.append('g').classed('legend-group', !0)
                      })())
                    N.select('.container-group').attr(
                      'transform',
                      'translate(' + e / 2 + ', ' + g / 2 + ')',
                    ),
                      N.attr('width', e).attr('height', g)
                  })(this),
                  (function() {
                    E && N.selectAll('g.arc').remove()
                    var t = (E = N.select('.chart-group')
                      .selectAll('g.arc')
                      .data(S(w)))
                      .enter()
                      .append('g')
                      .each($)
                      .each(Z)
                      .classed('arc', !0)
                      .append('path')
                    D
                      ? t
                          .merge(E)
                          .attr('fill', tt)
                          .on('mouseover', function(t) {
                            at(this, t, M, A)
                          })
                          .on('mousemove', function(t) {
                            ot(this, t, M, A)
                          })
                          .on('mouseout', function(t) {
                            ut(this, t, M, A)
                          })
                          .on('click', function(t) {
                            ct(this, t, M, A)
                          })
                          .transition()
                          .ease(y)
                          .duration(m)
                          .attrTween('d', st)
                      : t
                          .merge(E)
                          .attr('fill', tt)
                          .attr('d', C)
                          .on('mouseover', function(t) {
                            at(this, t, M, A)
                          })
                          .on('mousemove', function(t) {
                            ot(this, t, M, A)
                          })
                          .on('mouseout', function(t) {
                            ut(this, t, M, A)
                          })
                          .on('click', function(t) {
                            ct(this, t, M, A)
                          })
                    E.exit().remove()
                  })(),
                  N.select('.legend-group')
                    .append('text')
                    .attr('class', 'donut-text'),
                  L &&
                    (j = N.selectAll('.chart-group .arc path')
                      .select(it)
                      .node()) &&
                    (rt(j.__data__), lt(j, k, m)),
                  F &&
                    U.showEmptySlice &&
                    (function() {
                      E && N.selectAll('g.arc').remove()
                      ;(E = N.select('.chart-group')
                        .selectAll('g.arc')
                        .data(S(d)))
                        .enter()
                        .append('g')
                        .each($)
                        .each(Z)
                        .classed('arc', !0)
                        .append('path')
                        .merge(E)
                        .attr('fill', U.emptySliceColor)
                        .attr('d', C)
                        .transition()
                        .ease(y)
                        .duration(m)
                        .attrTween('d', st),
                        E.exit().remove()
                    })()
              })
            }
            function rt(t) {
              t.data &&
                (N.select('.donut-text')
                  .text(function() {
                    return V(t.data)
                  })
                  .attr('dy', '.2em')
                  .attr('text-anchor', 'middle'),
                N.select('.donut-text').call(ft, O))
            }
            function it(t) {
              if (t.data.id === L) return this
            }
            function at(t, n, e, r) {
              rt(n),
                nt.call('customMouseOver', t, n, c.mouse(t), [e, r]),
                I &&
                  (R && t !== R && lt(R, k - _, x),
                  j && t !== j && lt(j, k - _),
                  lt(t, k))
            }
            function ot(t, n, e, r) {
              nt.call('customMouseMove', t, n, c.mouse(t), [e, r])
            }
            function ut(t, n, e, r) {
              N.select('.donut-text').text(''),
                j && B && !P && (rt(j.__data__), lt(j, k)),
                (t !== j || (!B && t === j)) && lt(t, k - _, x),
                P && (rt(t.__data__), lt(t, k), (R = t)),
                nt.call('customMouseOut', t, n, c.mouse(t), [e, r])
            }
            function ct(t, n, e, r) {
              nt.call('customClick', t, n, c.mouse(t), [e, r])
            }
            function lt(t, n) {
              var e =
                arguments.length > 2 && void 0 !== arguments[2]
                  ? arguments[2]
                  : 0
              c.select(t)
                .transition()
                .delay(e)
                .attrTween('d', function(t) {
                  var e = a.interpolate(t.outerRadius, n)
                  return function(n) {
                    return (t.outerRadius = e(n)), C(t)
                  }
                })
            }
            function st(t) {
              var n = void 0
              return (
                (t.innerRadius = 0),
                (n = a.interpolate({ startAngle: 0, endAngle: 0 }, t)),
                function(t) {
                  return C(n(t))
                }
              )
            }
            function ft(t, n) {
              var e = k / 5
              s.wrapText.call(null, 0, e, n, t.node())
            }
            return (
              (et.centeredTextFunction = function(t) {
                return arguments.length ? ((V = t), this) : V
              }),
              (et.colorSchema = function(t) {
                return arguments.length ? ((X = t), this) : X
              }),
              (et.emptyDataConfig = function(t) {
                return arguments.length ? ((U = t), this) : U
              }),
              (et.exportChart = function(t, n) {
                l.call(et, N, t, n)
              }),
              (et.externalRadius = function(t) {
                return arguments.length ? ((k = t), this) : k
              }),
              (et.hasHoverAnimation = function(t) {
                return arguments.length ? ((I = t), this) : I
              }),
              (et.hasFixedHighlightedSlice = function(t) {
                return arguments.length ? ((B = t), this) : B
              }),
              (et.hasLastHoverSliceHighlighted = function(t) {
                return arguments.length ? ((P = t), this) : P
              }),
              (et.height = function(t) {
                return arguments.length ? ((g = t), this) : g
              }),
              (et.highlightSliceById = function(t) {
                return arguments.length ? ((L = t), this) : L
              }),
              (et.internalRadius = function(t) {
                return arguments.length ? ((T = t), this) : T
              }),
              (et.isAnimated = function(t) {
                return arguments.length ? ((D = t), this) : D
              }),
              (et.loadingState = function(t) {
                return arguments.length ? ((v = t), this) : v
              }),
              (et.margin = function(n) {
                return arguments.length ? ((t = i({}, t, n)), this) : t
              }),
              (et.numberFormat = function(t) {
                return arguments.length ? ((G = t), this) : G
              }),
              (et.on = function() {
                var t = nt.on.apply(nt, arguments)
                return t === nt ? et : t
              }),
              (et.orderingFunction = function(t) {
                return arguments.length ? ((Q = t), this) : Q
              }),
              (et.percentageFormat = function(t) {
                return arguments.length ? ((q = t), this) : q
              }),
              (et.radiusHoverOffset = function(t) {
                return arguments.length ? ((_ = t), this) : _
              }),
              (et.width = function(t) {
                return arguments.length ? ((e = t), this) : e
              }),
              et
            )
          }
        }.call(n, e, n, t)) || (t.exports = r)
    },
    function(t, n, e) {
      'use strict'
      var r,
        i =
          Object.assign ||
          function(t) {
            for (var n = 1; n < arguments.length; n++) {
              var e = arguments[n]
              for (var r in e)
                Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r])
            }
            return t
          }
      void 0 ===
        (r = function(t) {
          var n = e(5),
            r = e(10),
            a = e(0),
            o = (e(6), e(19)),
            u = e(9)
          return function() {
            var t = { top: 5, right: 5, bottom: 5, left: 5 },
              e = 320,
              c = 180,
              l = 12,
              s = 0.5,
              f = 16,
              h = -(l - 2) / 2,
              d = 1.5,
              p = 40,
              g = 0.8,
              v = 's',
              y = '',
              m = 'is-faded',
              x = !1,
              _ = null,
              b = !0,
              w = void 0,
              M = u.colorSchemas.britecharts,
              A = function(t) {
                return t.id
              },
              k = function(t) {
                return t.name
              },
              T = function(t) {
                var e = t.quantity
                return n.format(v)(e) + y
              },
              O = function(t) {
                var n = t.name
                return w(n)
              },
              S = function(t) {
                var n = t.quantity
                return 'number' == typeof n || 'string' == typeof n
              },
              C = void 0,
              E = void 0,
              N = void 0,
              D = void 0,
              F = void 0
            function L(n) {
              n.each(function(n) {
                var i, u, d, v, y, m, L, P, R, U
                ;(E = e - t.left - t.right),
                  (N = c - t.top - t.bottom),
                  (D = (function(t) {
                    return (
                      (b = t.filter(S).length === t.length),
                      t.reduce(function(t, n) {
                        return (
                          void 0 !== n.quantity &&
                            null !== n.quantity &&
                            (n.quantity = +n.quantity),
                          (n.name = String(n.name)),
                          (n.id = +n.id),
                          [].concat(
                            (function(t) {
                              if (Array.isArray(t)) {
                                for (
                                  var n = 0, e = Array(t.length);
                                  n < t.length;
                                  n++
                                )
                                  e[n] = t[n]
                                return e
                              }
                              return Array.from(t)
                            })(t),
                            [n],
                          )
                        )
                      }, [])
                    )
                  })(n)),
                  (w = r.scaleOrdinal().range(M)),
                  (function(n) {
                    F ||
                      (F = a
                        .select(n)
                        .append('svg')
                        .classed('britechart britechart-legend', !0))
                        .append('g')
                        .classed('legend-container-group', !0)
                        .attr(
                          'transform',
                          'translate(' + t.left + ',' + t.top + ')',
                        )
                        .append('g')
                        .classed('legend-group', !0)
                    F.attr('width', e).attr('height', c)
                  })(this),
                  x
                    ? ((U = f),
                      F.select('.legend-group')
                        .selectAll('g')
                        .remove(),
                      F.select('.legend-group')
                        .append('g')
                        .classed('legend-line', !0),
                      (C = F.select('.legend-line')
                        .selectAll('g.legend-entry')
                        .data(D))
                        .enter()
                        .append('g')
                        .classed('legend-entry', !0)
                        .attr('data-item', A)
                        .attr('transform', function(t) {
                          var n = t.name,
                            e = U,
                            r = N / 2,
                            i = r,
                            a = o.getTextWidth(n, l)
                          return (
                            (U += f + 2 * I() + a),
                            'translate(' + e + ',' + i + ')'
                          )
                        })
                        .merge(C)
                        .append('circle')
                        .classed('legend-circle', !0)
                        .attr('cx', f / 2)
                        .attr('cy', h)
                        .attr('r', f / 2)
                        .style('fill', O)
                        .style('stroke-width', 1),
                      F.select('.legend-group')
                        .selectAll('g.legend-entry')
                        .append('text')
                        .classed('legend-entry-name', !0)
                        .text(k)
                        .attr('x', I())
                        .style('font-size', l + 'px')
                        .style('letter-spacing', s + 'px'),
                      F.select('.legend-group')
                        .selectAll('g.legend-entry')
                        .exit()
                        .transition()
                        .style('opacity', 0)
                        .remove(),
                      (R =
                        F.select('.legend-line')
                          .node()
                          .getBoundingClientRect().width + f),
                      E - R <= 0 &&
                        ((i = F.selectAll('.legend-entry')),
                        (u = i.size()),
                        (d = (N / 2) * 1.7),
                        (v = F.select('.legend-group')
                          .append('g')
                          .classed('legend-line', !0)
                          .attr('transform', 'translate(0, ' + d + ')')),
                        (y = i.filter(':nth-child(' + u + ')')).attr(
                          'transform',
                          'translate(' + f + ',0)',
                        ),
                        v.append(function() {
                          return y.node()
                        })),
                      (m =
                        F.select('g.legend-container-group')
                          .node()
                          .getBoundingClientRect().width + I()),
                      (P = (L = e - m) / 2),
                      L > 0 &&
                        F.select('g.legend-container-group').attr(
                          'transform',
                          'translate(' + P + ',0)',
                        ))
                    : (function() {
                        F.select('.legend-group')
                          .selectAll('g')
                          .remove(),
                          (C = F.select('.legend-group')
                            .selectAll('g.legend-line')
                            .data(D))
                            .enter()
                            .append('g')
                            .classed('legend-line', !0)
                            .append('g')
                            .classed('legend-entry', !0)
                            .attr('data-item', A)
                            .attr('transform', function(t, n) {
                              return (
                                'translate(' +
                                (f + I()) +
                                ',' +
                                (n + 1) * (N / (D.length + 1)) +
                                ')'
                              )
                            })
                            .merge(C)
                            .append('circle')
                            .classed('legend-circle', !0)
                            .attr('cx', f / 2)
                            .attr('cy', h)
                            .attr('r', f / 2)
                            .style('fill', O)
                            .style('stroke-width', 1),
                          F.select('.legend-group')
                            .selectAll('g.legend-line')
                            .selectAll('g.legend-entry')
                            .append('text')
                            .classed('legend-entry-name', !0)
                            .text(k)
                            .attr('x', I())
                            .style('font-size', l + 'px')
                            .style('letter-spacing', s + 'px'),
                          b
                            ? F.select('.legend-group')
                                .selectAll('g.legend-line')
                                .selectAll('g.legend-entry')
                                .append('text')
                                .classed('legend-entry-value', !0)
                                .text(T)
                                .attr('x', E - p)
                                .style('font-size', l + 'px')
                                .style('letter-spacing', g + 'px')
                                .style('text-anchor', 'end')
                                .style('startOffset', '100%')
                            : ((t = F.select('g.legend-container-group')
                                .node()
                                .getBoundingClientRect().width),
                              (r = (n = e - t) / 2 - t / 2),
                              n > 0 &&
                                F.select('g.legend-container-group').attr(
                                  'transform',
                                  'translate(' + r + ',0)',
                                ))
                        var t, n, r
                        F.select('.legend-group')
                          .selectAll('g.legend-line')
                          .exit()
                          .transition()
                          .style('opacity', 0)
                          .remove()
                      })(),
                  _ && (j(), B(_))
              })
            }
            function j() {
              F.select('.legend-group')
                .selectAll('g.legend-entry')
                .classed(m, !1)
            }
            function B(t) {
              var n = F.select('[data-item="' + t + '"]')
              n.nodes().length &&
                (F.select('.legend-group')
                  .selectAll('g.legend-entry')
                  .classed(m, !0),
                n.classed(m, !1))
            }
            function I() {
              return d * f
            }
            return (
              (L.clearHighlight = function() {
                j()
              }),
              (L.colorSchema = function(t) {
                return arguments.length ? ((M = t), this) : M
              }),
              (L.height = function(t) {
                return arguments.length ? ((c = t), this) : c
              }),
              (L.highlight = function(t) {
                j(), B(t)
              }),
              (L.highlightEntryById = function(t) {
                return arguments.length ? ((_ = t), this) : _
              }),
              (L.isHorizontal = function(t) {
                return arguments.length ? ((x = t), this) : x
              }),
              (L.margin = function(n) {
                return arguments.length ? ((t = i({}, t, n)), this) : t
              }),
              (L.marginRatio = function(t) {
                return arguments.length ? ((d = t), this) : d
              }),
              (L.markerSize = function(t) {
                return arguments.length ? ((f = t), this) : f
              }),
              (L.numberFormat = function(t) {
                return arguments.length ? ((v = t), this) : v
              }),
              (L.unit = function(t) {
                return arguments.length ? ((y = t), this) : y
              }),
              (L.width = function(t) {
                return arguments.length ? ((e = t), this) : e
              }),
              L
            )
          }
        }.call(n, e, n, t)) || (t.exports = r)
    },
    function(t, n, e) {
      'use strict'
      var r,
        i = (function() {
          return function(t, n) {
            if (Array.isArray(t)) return t
            if (Symbol.iterator in Object(t))
              return (function(t, n) {
                var e = [],
                  r = !0,
                  i = !1,
                  a = void 0
                try {
                  for (
                    var o, u = t[Symbol.iterator]();
                    !(r = (o = u.next()).done) &&
                    (e.push(o.value), !n || e.length !== n);
                    r = !0
                  );
                } catch (t) {
                  ;(i = !0), (a = t)
                } finally {
                  try {
                    !r && u.return && u.return()
                  } finally {
                    if (i) throw a
                  }
                }
                return e
              })(t, n)
            throw new TypeError(
              'Invalid attempt to destructure non-iterable instance',
            )
          }
        })(),
        a =
          Object.assign ||
          function(t) {
            for (var n = 1; n < arguments.length; n++) {
              var e = arguments[n]
              for (var r in e)
                Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r])
            }
            return t
          }
      function o(t) {
        if (Array.isArray(t)) {
          for (var n = 0, e = Array(t.length); n < t.length; n++) e[n] = t[n]
          return e
        }
        return Array.from(t)
      }
      void 0 ===
        (r = function(t) {
          var n = e(1),
            r = e(14),
            u = e(18),
            c = e(7),
            l = e(8),
            s = e(5),
            f = e(10),
            h = e(17),
            d = e(0),
            p = (e(6), e(13)),
            g = e(11).exportChart,
            v = e(9),
            y = e(12).line,
            m = e(20).getTimeSeriesAxis,
            x = e(15),
            _ = x.axisTimeCombinations,
            b = x.curveMap,
            w = e(23),
            M = w.createFilterContainer,
            A = w.createGlowWithMatrix,
            k = w.bounceCircleHighlight,
            T = e(16),
            O = T.formatIntegerValue,
            S = T.formatDecimalValue,
            C = T.isInteger,
            E = T.uniqueId,
            N = function(t) {
              return null === t ? null : +t
            }
          return function() {
            var t = { top: 60, right: 30, bottom: 40, left: 70 },
              e = 960,
              x = 500,
              w = y,
              T = null,
              D = 480,
              F = void 0,
              L = void 0,
              j = void 0,
              B = void 0,
              I = void 0,
              P = void 0,
              R = void 0,
              U = void 0,
              H = void 0,
              z = void 0,
              Y = { top: 0, left: 15, bottom: 0, right: 0 },
              q = 28,
              G = 5,
              W = v.colorSchemas.britecharts,
              X = v.colorGradients.greenBlue,
              V = void 0,
              $ = void 0,
              Z = E('one-line-gradient'),
              Q = null,
              K = null,
              J = 12,
              tt = 5,
              nt = 2,
              et = 5,
              rt = 5,
              it = 0.6,
              at = null,
              ot = null,
              ut = null,
              ct = void 0,
              lt = !1,
              st = !1,
              ft = l.easeQuadInOut,
              ht = 1500,
              dt = void 0,
              pt = 'linear',
              gt = void 0,
              vt = void 0,
              yt = 'date',
              mt = 'value',
              xt = 'topic',
              _t = 'topicName',
              bt = null,
              wt = null,
              Mt = 36,
              At = null,
              kt = null,
              Tt = 36,
              Ot = 5,
              St = void 0,
              Ct = 'rgba(0, 0, 0, 0)',
              Et = void 0,
              Nt = void 0,
              Dt = void 0,
              Ft = null,
              Lt = {},
              jt = function(t) {
                return t.date
              },
              Bt = function(t) {
                return t.value
              },
              It = function(t) {
                return t.topic
              },
              Pt = function(t) {
                return t[_t]
              },
              Rt = function(t) {
                var n = t.topic
                return R(n)
              },
              Ut = c.dispatch(
                'customMouseOver',
                'customMouseOut',
                'customMouseMove',
                'customDataEntryClick',
                'customTouchMove',
              )
            function Ht(c) {
              c.each(function(c) {
                var l,
                  s,
                  g = (function(t) {
                    var n = t.dataByTopic,
                      e = t.dataByDate,
                      r = t.data
                    if (!n && !r)
                      throw new Error(
                        'Data needs to have a dataByTopic or data property. See more in http://eventbrite.github.io/britecharts/global.html#LineChartData__anchor',
                      )
                    n
                      ? (r = n.reduce(function(t, n) {
                          return (
                            n.dates.forEach(function(e) {
                              t.push({
                                topicName: n[_t],
                                name: n[xt],
                                date: e[yt],
                                value: e[mt],
                              })
                            }),
                            t
                          )
                        }, []))
                      : (n = u
                          .nest()
                          .key(Pt)
                          .entries(r)
                          .map(function(t) {
                            return {
                              topic: t.values[0].name,
                              topicName: t.key,
                              dates: t.values,
                            }
                          }))
                    return (
                      (e = u
                        .nest()
                        .key(jt)
                        .entries(r)
                        .map(function(t) {
                          return { date: new Date(t.key), topics: t.values }
                        })),
                      {
                        dataByTopic: n.reduce(function(t, n) {
                          var e = n.dates,
                            r = (function(t, n) {
                              var e = {}
                              for (var r in t)
                                n.indexOf(r) >= 0 ||
                                  (Object.prototype.hasOwnProperty.call(t, r) &&
                                    (e[r] = t[r]))
                              return e
                            })(n, ['dates']),
                            i = e.map(function(t) {
                              return { date: new Date(t[yt]), value: N(t[mt]) }
                            })
                          return t.push(a({ dates: i }, r)), t
                        }, []),
                        dataByDate: e,
                      }
                    )
                  })(c)
                ;(gt = g.dataByTopic),
                  (vt = g.dataByDate),
                  (j = e - t.left - t.right),
                  (B = x - t.top - t.bottom),
                  (function() {
                    var t = n.min(gt, function(t) {
                        var e = t.dates
                        return n.min(e, jt)
                      }),
                      e = n.max(gt, function(t) {
                        var e = t.dates
                        return n.max(e, jt)
                      }),
                      r = n.max(gt, function(t) {
                        var e = t.dates
                        return n.max(e, Bt)
                      }),
                      i = n.min(gt, function(t) {
                        var e = t.dates
                        return n.min(e, Bt)
                      }),
                      a = Math.abs(i) < 0 ? Math.abs(i) : 0
                    ;(I = f
                      .scaleTime()
                      .domain([t, e])
                      .rangeRound([0, j])),
                      (P = f
                        .scaleLinear()
                        .domain([a, Math.abs(r)])
                        .rangeRound([B, 0])
                        .nice())
                    var o = (R = f
                      .scaleOrdinal()
                      .range(W)
                      .domain(gt.map(It))).range()
                    V = R.domain().reduce(function(t, n, e) {
                      return (t[n] = o[e]), t
                    }, {})
                  })(),
                  (function(n) {
                    F ||
                      ((F = d
                        .select(n)
                        .append('svg')
                        .classed('britechart line-chart', !0)),
                      (function() {
                        var n = F.append('g')
                          .classed('container-group', !0)
                          .attr(
                            'transform',
                            'translate(' + t.left + ',' + t.top + ')',
                          )
                        n
                          .append('g')
                          .classed('x-axis-group', !0)
                          .append('g')
                          .classed('axis x', !0),
                          n
                            .selectAll('.x-axis-group')
                            .append('g')
                            .classed('month-axis', !0),
                          n
                            .append('g')
                            .classed('y-axis-group', !0)
                            .append('g')
                            .classed('axis y', !0),
                          n.append('g').classed('grid-lines-group', !0),
                          n.append('g').classed('chart-group', !0),
                          n.append('g').classed('metadata-group', !0)
                      })())
                    F.attr('width', e).attr('height', x)
                  })(this),
                  (function() {
                    var n = void 0,
                      i = void 0
                    if ('custom' === at && 'string' == typeof ut)
                      (n = { tick: ot, format: p.timeFormat(ut) }), (i = null)
                    else {
                      var a = m(vt, e, at, ct)
                      ;(n = a.minor),
                        (i = a.major),
                        (H = r
                          .axisBottom(I)
                          .ticks(i.tick)
                          .tickSize(0, 0)
                          .tickFormat(i.format))
                    }
                    ;(U = r
                      .axisBottom(I)
                      .ticks(n.tick)
                      .tickSize(10, 0)
                      .tickPadding(G)
                      .tickFormat(n.format)),
                      (z = r
                        .axisLeft(P)
                        .ticks(Ot)
                        .tickSize([0])
                        .tickPadding(G)
                        .tickFormat(Yt)),
                      (function(n, e) {
                        F.select('.grid-lines-group')
                          .selectAll('line')
                          .remove(),
                          ('horizontal' === Ft || 'full' === Ft) &&
                            F.select('.grid-lines-group')
                              .selectAll('line.horizontal-grid-line')
                              .data(P.ticks(e))
                              .enter()
                              .append('line')
                              .attr('class', 'horizontal-grid-line')
                              .attr('x1', -Y.left - 30)
                              .attr('x2', j)
                              .attr('y1', function(t) {
                                return P(t)
                              })
                              .attr('y2', function(t) {
                                return P(t)
                              })
                        ;('vertical' !== Ft && 'full' !== Ft) ||
                          F.select('.grid-lines-group')
                            .selectAll('line.vertical-grid-line')
                            .data(I.ticks(n))
                            .enter()
                            .append('line')
                            .attr('class', 'vertical-grid-line')
                            .attr('y1', 0)
                            .attr('y2', B)
                            .attr('x1', function(t) {
                              return I(t)
                            })
                            .attr('x2', function(t) {
                              return I(t)
                            })
                        F.select('.grid-lines-group')
                          .selectAll('line.extended-x-line')
                          .data([0])
                          .enter()
                          .append('line')
                          .attr('class', 'extended-x-line')
                          .attr('x1', -Y.left - 30)
                          .attr('x2', j)
                          .attr('y1', x - t.bottom - t.top)
                          .attr('y2', x - t.bottom - t.top)
                      })(n.tick, Ot)
                  })(),
                  (function() {
                    F.select('.x-axis-group .axis.x')
                      .attr('transform', 'translate(0, ' + B + ')')
                      .call(U),
                      'custom' !== at &&
                        F.select('.x-axis-group .month-axis')
                          .attr('transform', 'translate(0, ' + (B + q) + ')')
                          .call(H)
                    if (bt) {
                      wt && F.selectAll('.x-axis-label').remove()
                      var t = j / 2,
                        n = B + q + Mt
                      wt = F.select('.x-axis-group')
                        .append('text')
                        .attr('x', t)
                        .attr('y', n)
                        .attr('text-anchor', 'middle')
                        .attr('class', 'x-axis-label')
                        .text(bt)
                    }
                    if (
                      (F.select('.y-axis-group .axis.y')
                        .attr('transform', 'translate(' + -Y.left + ', 0)')
                        .call(z)
                        .call(zt),
                      At)
                    ) {
                      kt && F.selectAll('.y-axis-label').remove()
                      var e = -Tt - Y.left,
                        r = -B / 2
                      kt = F.select('.y-axis-group')
                        .append('text')
                        .attr('x', r)
                        .attr('y', e)
                        .attr('text-anchor', 'middle')
                        .attr('transform', 'rotate(270)')
                        .attr('class', 'y-axis-label')
                        .text(At)
                    }
                  })(),
                  $ ||
                    ($ = F.select('.metadata-group')
                      .append('linearGradient')
                      .attr('id', Z)
                      .attr('x1', '0%')
                      .attr('y1', '0%')
                      .attr('x2', '100%')
                      .attr('y2', '0%')
                      .attr('gradientUnits', 'userSpaceOnUse')
                      .selectAll('stop')
                      .data([
                        { offset: '0%', color: X[0] },
                        { offset: '100%', color: X[1] },
                      ])
                      .enter()
                      .append('stop')
                      .attr('offset', function(t) {
                        var n = t.offset
                        return n
                      })
                      .attr('stop-color', function(t) {
                        var n = t.color
                        return n
                      })),
                  (l = void 0),
                  (s = void 0),
                  (Lt = {}),
                  (s = h
                    .line()
                    .curve(b[pt])
                    .x(function(t) {
                      var n = t.date
                      return I(n)
                    })
                    .defined(function(t) {
                      var n = t.value
                      return null !== n
                    })
                    .y(function(t) {
                      var n = t.value
                      return P(n)
                    })),
                  (l = F.select('.chart-group')
                    .selectAll('.line')
                    .data(gt, It)),
                  (L = l
                    .enter()
                    .append('g')
                    .attr('class', 'topic')
                    .append('path')
                    .attr('class', 'line')
                    .merge(l)
                    .attr('id', function(t) {
                      var n = t.topic
                      return n
                    })
                    .attr('d', function(t) {
                      var n = t.dates
                      return s(n)
                    })
                    .style('stroke', function(t) {
                      return 1 === gt.length ? 'url(#' + Z + ')' : Rt(t)
                    })),
                  l.exit().remove(),
                  st &&
                    (dt = F.append('rect')
                      .attr('class', 'masking-rectangle')
                      .attr('width', e)
                      .attr('height', x)
                      .attr('x', 0)
                      .attr('y', 0))
                      .transition()
                      .duration(ht)
                      .ease(ft)
                      .attr('x', e)
                      .on('end', function() {
                        return dt.remove()
                      }),
                  e > D &&
                    (St ||
                      (St = F.select('.metadata-group')
                        .append('rect')
                        .attr('class', 'overlay')
                        .attr('y1', 0)
                        .attr('y2', x)
                        .attr('height', B)
                        .attr('width', j)
                        .attr('fill', Ct)
                        .style('display', 'none')),
                    Et ||
                      ((Et = F.select('.metadata-group')
                        .append('g')
                        .attr('class', 'hover-marker vertical-marker-container')
                        .attr('transform', 'translate(9999, 0)')),
                      (Nt = Et.selectAll('path')
                        .data([{ x1: 0, y1: 0, x2: 0, y2: 0 }])
                        .enter()
                        .append('line')
                        .classed('vertical-marker', !0)
                        .attr('x1', 0)
                        .attr('y1', B)
                        .attr('x2', 0)
                        .attr('y2', 0))),
                    F.on('mouseover', function(t) {
                      !(function(t, n) {
                        St.style('display', 'block'),
                          Nt.classed('bc-is-active', !0),
                          Ut.call('customMouseOver', t, n, d.mouse(t))
                      })(this, t)
                    })
                      .on('mouseout', function(t) {
                        !(function(t, n) {
                          St.style('display', 'none'),
                            Nt.classed('bc-is-active', !1),
                            Et.attr('transform', 'translate(9999, 0)'),
                            Ut.call('customMouseOut', t, n, d.mouse(t))
                        })(this, t)
                      })
                      .on('mousemove', function(e) {
                        var r, a, o, u, c, l, s, f, h, p, g, v, y, m, x, _, b, w
                        ;(r = this),
                          (a = d.mouse(r)),
                          (o = i(a, 2)),
                          (u = o[0]),
                          (c = o[1]),
                          (l = -t.left),
                          (p = u + l),
                          (m = I.invert(p)),
                          (x = (0, n.bisector(jt).left)(vt, m, 1)),
                          (_ = vt[x]),
                          (b = vt[x - 1]),
                          (w = void 0),
                          b && _
                            ? ((g = m),
                              (v = _),
                              (y = b),
                              (w =
                                new Date(g).getTime() -
                                  new Date(v.date).getTime() >
                                new Date(y.date).getTime() -
                                  new Date(g).getTime()
                                  ? v
                                  : y))
                            : (w = _),
                          (f = void 0),
                          (s = w) &&
                            ((f = I(new Date(s.date))),
                            (h = f),
                            Et.attr('transform', 'translate(' + h + ',0)'),
                            (function(t) {
                              Et.selectAll('.circle-container').remove()
                              var n = L.nodes().reduce(function(t, n) {
                                  return (t[n.id] = n), t
                                }, {}),
                                e = t.topics
                                  .map(function(t) {
                                    return { topic: t, node: n[t.name] }
                                  })
                                  .filter(function(t) {
                                    var n = t.topic
                                    return !!n
                                  })
                                  .sort(function(t, n) {
                                    return V[t.topic.name] < V[n.topic.name]
                                  })
                              ;(t.topics = e.map(function(t) {
                                var n = t.topic
                                return n
                              })),
                                t.topics.forEach(function(n, r) {
                                  var i = Et.append('g')
                                      .classed('circle-container', !0)
                                      .append('circle')
                                      .classed('data-point-highlighter', !0)
                                      .attr('cx', J)
                                      .attr('cy', 0)
                                      .attr('r', tt)
                                      .style('stroke-width', function() {
                                        return lt ? et : nt
                                      })
                                      .style('stroke', V[n.name])
                                      .style('cursor', 'pointer')
                                      .on('click', function() {
                                        !(function(t) {
                                          Q ||
                                            ((Q = M(
                                              F.select('.metadata-group'),
                                            )),
                                            (K = A(Q)))
                                          var n = d.select(t)
                                          n
                                            .style('stroke-width', rt)
                                            .style('stroke-opacity', it)
                                            .attr('filter', 'url(#' + K + ')'),
                                            k(n, ft, tt)
                                        })(this),
                                          (function(t, n) {
                                            Ut.call(
                                              'customDataEntryClick',
                                              t,
                                              n,
                                              d.mouse(t),
                                            )
                                          })(this, n)
                                      })
                                      .on('mouseout', function() {
                                        var t
                                        ;(t = this),
                                          d.select(t).attr('filter', 'none')
                                      }),
                                    a = e[r].node,
                                    o = I(new Date(t.topics[r].date)),
                                    u = qt(o, a, n.name)
                                  i.attr(
                                    'transform',
                                    'translate( ' + -J + ', ' + u + ' )',
                                  )
                                })
                            })(s),
                            Ut.call('customMouseMove', r, s, V, f, c))
                      })),
                  lt &&
                    (function() {
                      F.select('.chart-group')
                        .selectAll('.data-points-container')
                        .remove()
                      var t = L.nodes().reduce(function(t, n) {
                          return (t[n.id] = n), t
                        }, {}),
                        n = vt.reduce(function(n, e) {
                          var r = e.topics.map(function(n) {
                            return { topic: n, node: t[n.name] }
                          })
                          return (n = [].concat(o(n), o(r)))
                        }, [])
                      F.select('.chart-group')
                        .append('g')
                        .classed('data-points-container', !0)
                        .selectAll('circle')
                        .data(n)
                        .enter()
                        .append('circle')
                        .classed('data-point-mark', !0)
                        .attr('r', tt)
                        .style('stroke-width', nt)
                        .style('stroke', function(t) {
                          return V[t.topic.name]
                        })
                        .style('cursor', 'pointer')
                        .attr('cx', function(t) {
                          return I(new Date(t.topic.date))
                        })
                        .attr('cy', function(t) {
                          return qt(
                            I(new Date(t.topic.date)),
                            t.node,
                            t.topic.name,
                          )
                        })
                    })(),
                  F.on('touchmove', function(t) {
                    !(function(t, n) {
                      Ut.call('customTouchMove', t, n, d.touch(t))
                    })(this, t)
                  })
              })
            }
            function zt(t) {
              t.selectAll('.tick text').attr('transform', 'translate(0, -7)')
            }
            function Yt(t) {
              var n = void 0
              return (n = C(t) ? O : S), Dt && (n = s.format(Dt)), n(t)
            }
            function qt(t, n, e, r) {
              var i = e + '-' + t
              if (i in Lt) return Lt[i]
              r = r || 0.01
              for (
                var a = 0,
                  o = n.getTotalLength(),
                  u = n.getPointAtLength((o + a) / 2),
                  c = 0;
                t < u.x - r || t > u.x + r;

              ) {
                var l = (a + o) / 2
                if (
                  (t < (u = n.getPointAtLength(l)).x ? (o = l) : (a = l),
                  100 < (c += 1))
                )
                  break
              }
              return (Lt[i] = u.y), Lt[i]
            }
            return (
              (Ht.aspectRatio = function(t) {
                return arguments.length ? ((T = t), this) : T
              }),
              (Ht.xAxisLabel = function(t) {
                return arguments.length ? ((bt = t), this) : bt
              }),
              (Ht.yAxisLabel = function(t) {
                return arguments.length ? ((At = t), this) : At
              }),
              (Ht.colorSchema = function(t) {
                return arguments.length ? ((W = t), this) : W
              }),
              (Ht.dateLabel = function(t) {
                return arguments.length ? ((yt = t), this) : yt
              }),
              (Ht.xAxisFormat = function(t) {
                return arguments.length ? ((at = t), this) : at
              }),
              (Ht.xAxisCustomFormat = function(t) {
                return arguments.length ? ((ut = t), this) : ut
              }),
              (Ht.xTicks = function(t) {
                return arguments.length ? ((ot = t), this) : ot
              }),
              (Ht.grid = function(t) {
                return arguments.length ? ((Ft = t), this) : Ft
              }),
              (Ht.height = function(t) {
                return arguments.length
                  ? (T && (e = Math.ceil(t / T)), (x = t), this)
                  : x
              }),
              (Ht.isAnimated = function(t) {
                return arguments.length ? ((st = t), this) : st
              }),
              (Ht.loadingState = function(t) {
                return arguments.length ? ((w = t), this) : w
              }),
              (Ht.margin = function(n) {
                return arguments.length ? ((t = a({}, t, n)), this) : t
              }),
              (Ht.numberFormat = function(t) {
                return arguments.length ? ((Dt = t), this) : Dt
              }),
              (Ht.lineCurve = function(t) {
                return arguments.length ? ((pt = t), this) : pt
              }),
              (Ht.lineGradient = function(t) {
                return arguments.length ? ((X = t), this) : X
              }),
              (Ht.shouldShowAllDataPoints = function(t) {
                return arguments.length ? ((lt = t), this) : lt
              }),
              (Ht.tooltipThreshold = function(t) {
                return arguments.length ? ((D = t), this) : D
              }),
              (Ht.topicLabel = function(t) {
                return arguments.length ? ((xt = t), this) : xt
              }),
              (Ht.valueLabel = function(t) {
                return arguments.length ? ((mt = t), this) : mt
              }),
              (Ht.yAxisLabelPadding = function(t) {
                return arguments.length ? ((Tt = t), this) : Tt
              }),
              (Ht.yTicks = function(t) {
                return arguments.length ? ((Ot = t), this) : Ot
              }),
              (Ht.width = function(t) {
                return arguments.length
                  ? (T && (x = Math.ceil(t * T)), (e = t), this)
                  : e
              }),
              (Ht.locale = function(t) {
                return arguments.length ? ((ct = t), this) : ct
              }),
              (Ht.exportChart = function(t, n) {
                g.call(Ht, F, t, n)
              }),
              (Ht.on = function() {
                var t = Ut.on.apply(Ut, arguments)
                return t === Ut ? Ht : t
              }),
              (Ht.axisTimeCombinations = _),
              Ht
            )
          }
        }.call(n, e, n, t)) || (t.exports = r)
    },
    function(t, n, e) {
      'use strict'
      var r,
        i =
          'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
            ? function(t) {
                return typeof t
              }
            : function(t) {
                return t &&
                  'function' == typeof Symbol &&
                  t.constructor === Symbol &&
                  t !== Symbol.prototype
                  ? 'symbol'
                  : typeof t
              },
        a = (function() {
          return function(t, n) {
            if (Array.isArray(t)) return t
            if (Symbol.iterator in Object(t))
              return (function(t, n) {
                var e = [],
                  r = !0,
                  i = !1,
                  a = void 0
                try {
                  for (
                    var o, u = t[Symbol.iterator]();
                    !(r = (o = u.next()).done) &&
                    (e.push(o.value), !n || e.length !== n);
                    r = !0
                  );
                } catch (t) {
                  ;(i = !0), (a = t)
                } finally {
                  try {
                    !r && u.return && u.return()
                  } finally {
                    if (i) throw a
                  }
                }
                return e
              })(t, n)
            throw new TypeError(
              'Invalid attempt to destructure non-iterable instance',
            )
          }
        })()
      void 0 ===
        (r = function(t) {
          var n = e(8),
            r = e(5),
            o = e(0),
            u = (e(6), e(13)),
            c = e(15).axisTimeCombinations,
            l = e(16),
            s = l.formatIntegerValue,
            f = l.formatDecimalValue,
            h = l.isInteger,
            d = e(19).getTextWidth
          return function() {
            var t = { top: 2, right: 2, bottom: 2, left: 2 },
              e = 250,
              l = 45,
              p = 'Tooltip title',
              g = !0,
              v = void 0,
              y = { y: -55, x: 0 },
              m = 170,
              x = void 0,
              _ = void 0,
              b = void 0,
              w = void 0,
              M = 250,
              A = 48,
              k = 3,
              T = 0,
              O = 37,
              S = void 0,
              C = 3,
              E = -25,
              N = 5,
              D = void 0,
              F = 100,
              L = n.easeQuadInOut,
              j = 8,
              B = void 0,
              I = '#FFFFFF',
              P = '#D2D6DF',
              R = '#6D717A',
              U = '#282C35',
              H = '#000000',
              z = 'date',
              Y = 'value',
              q = 'name',
              G = 'topics',
              W = c.DAY_MONTH,
              X = null,
              V = null,
              $ = [],
              Z = null,
              Q = null,
              K = u.timeFormat('%b %d, %Y'),
              J = u.timeFormat('%b %d, %I %p'),
              tt = void 0,
              nt = void 0
            function et(n) {
              n.each(function(n) {
                e - t.left - t.right,
                  l - t.top - t.bottom,
                  n,
                  (function(n) {
                    nt ||
                      ((nt = o
                        .select(n)
                        .append('g')
                        .classed('britechart britechart-tooltip', !0)
                        .style('visibility', 'hidden'))
                        .append('g')
                        .classed('tooltip-container-group select-disable', !0)
                        .attr(
                          'transform',
                          'translate( ' + t.left + ', ' + t.top + ')',
                        )
                        .append('g')
                        .classed('tooltip-group', !0),
                      (x = nt
                        .selectAll('.tooltip-group')
                        .append('g')
                        .classed('tooltip-text', !0)),
                      (v = x
                        .append('rect')
                        .classed('tooltip-text-container', !0)
                        .attr('x', -M / 4 + 8)
                        .attr('y', 0)
                        .attr('width', M)
                        .attr('height', A)
                        .attr('rx', k)
                        .attr('ry', k)
                        .style('fill', I)
                        .style('stroke', P)
                        .style('stroke-width', 1)),
                      (w = x
                        .append('text')
                        .classed('tooltip-title', !0)
                        .attr('x', -M / 4 + 16)
                        .attr('dy', '.35em')
                        .attr('y', 16)
                        .style('fill', R)),
                      (_ = x
                        .append('line')
                        .classed('tooltip-divider', !0)
                        .attr('x1', -M / 4 + 16)
                        .attr('x2', 265)
                        .attr('y1', 31)
                        .attr('y2', 31)
                        .style('stroke', P)),
                      (b = x
                        .append('g')
                        .classed('tooltip-body', !0)
                        .style('transform', 'translateY(8px)')
                        .style('fill', U)))
                    nt
                      .transition()
                      .attr('width', e)
                      .attr('height', l),
                      et.hide()
                  })(this)
              })
            }
            function rt(t) {
              var n = t[Y]
              return t.missingValue
                ? '-'
                : (function(t) {
                    if (null !== Q) return Q(t)
                    var n = f
                    return t
                      ? (null !== Z ? (n = r.format(Z)) : h(t) && (n = s), n(t))
                      : 0
                  })(n).toString()
            }
            function it(t) {
              var n,
                e,
                r = t[q],
                i = void 0,
                a = void 0
              ;(n = t.topicName || r),
                (e = rt(t)),
                (a = b
                  .append('text')
                  .classed('tooltip-left-text', !0)
                  .attr('dy', '1em')
                  .attr('x', T)
                  .attr('y', O)
                  .style('fill', H)
                  .text(n)
                  .call(ut, m, E)),
                (i = b
                  .append('text')
                  .classed('tooltip-right-text', !0)
                  .attr('dy', '1em')
                  .attr('x', T)
                  .attr('y', O)
                  .style('fill', H)
                  .text(e)),
                (S = a.node().getBBox().height ? a.node().getBBox().height : S),
                (A += S + N),
                (D = i.node().getBBox().width ? i.node().getBBox().width : D),
                i.attr('x', M - D - 10 - M / 4),
                b
                  .append('circle')
                  .classed('tooltip-circle', !0)
                  .attr('cx', 23 - M / 4)
                  .attr('cy', O + j)
                  .attr('r', 5)
                  .style('fill', B[r])
                  .style('stroke-width', 1),
                (O += S + 7)
            }
            function at(t, n, e) {
              var r,
                i,
                o =
                  ((r = a([n, e], 2)),
                  (i = r[0]),
                  r[1],
                  [i - M < 0 ? M - 185 : -205, y.y]),
                u = a(o, 2),
                c = u[0],
                l = u[1]
              v.attr('width', M).attr('height', A + 10),
                x
                  .transition()
                  .duration(F)
                  .ease(L)
                  .attr('transform', 'translate(' + c + ', ' + l + ')'),
                _.attr('x2', M - 60)
            }
            function ot(t) {
              var n = p,
                e = (function(t) {
                  var n = X || W,
                    e = null,
                    r = { month: 'short', day: 'numeric' }
                  n === c.DAY_MONTH || n === c.MONTH_YEAR
                    ? ((e = K), (r.year = 'numeric'))
                    : n === c.HOUR_DAY || n === c.MINUTE_HOUR
                    ? ((e = J), (r.hour = 'numeric'))
                    : n === c.CUSTOM &&
                      'string' == typeof V &&
                      (e = u.timeFormat(V))
                  if (
                    tt &&
                    'undefined' != typeof Intl &&
                    'object' ===
                      ('undefined' == typeof Intl ? 'undefined' : i(Intl)) &&
                    Intl.DateTimeFormat
                  ) {
                    var a = Intl.DateTimeFormat(tt, r)
                    return a.format(t)
                  }
                  return e(t)
                })(new Date(t[z]))
              n.length ? g && (n = n + ' - ' + e) : (n = e), w.text(n)
            }
            function ut(t, n) {
              var e =
                arguments.length > 2 && void 0 !== arguments[2]
                  ? arguments[2]
                  : 0
              t.each(function() {
                var r, i, a, u, c, l, s
                for (
                  r = (t = o.select(this))
                    .text()
                    .split(/\s+/)
                    .reverse(),
                    a = [],
                    u = 0,
                    1.2,
                    c = t.attr('y'),
                    l = parseFloat(t.attr('dy')),
                    s = t
                      .text(null)
                      .append('tspan')
                      .attr('x', e)
                      .attr('y', c)
                      .attr('dy', l + 'em');
                  (i = r.pop());

                ) {
                  a.push(i),
                    s.text(a.join(' ')),
                    d(a.join(' '), 16, 'Karla, sans-serif') > n &&
                      (a.pop(),
                      s.text(a.join(' ')),
                      u < C - 1 &&
                        ((a = [i]),
                        (s = t
                          .append('tspan')
                          .attr('x', e)
                          .attr('y', c)
                          .attr('dy', 1.2 * ++u + l + 'em')
                          .text(i))))
                }
              })
            }
            function ct(t) {
              var n = t[G]
              $.length
                ? (n = (function(t) {
                    return (arguments.length > 1 && void 0 !== arguments[1]
                      ? arguments[1]
                      : $
                    ).map(function(n) {
                      return t.filter(function(t) {
                        return t.name === n
                      })[0]
                    })
                  })(n))
                : n.length &&
                  n[0].name &&
                  (n = (function(t) {
                    return t
                      .map(function(t) {
                        return t
                      })
                      .sort(function(t, n) {
                        return t.name > n.name ? 1 : t.name === n.name ? 0 : -1
                      })
                  })(n)),
                b.selectAll('text').remove(),
                b.selectAll('circle').remove(),
                ot(t),
                (A = 48),
                (O = 37),
                (T = 0),
                n.forEach(it)
            }
            return (
              (et.axisTimeCombinations = c),
              (et.dateFormat = function(t) {
                return arguments.length ? ((X = t), this) : X || W
              }),
              (et.dateCustomFormat = function(t) {
                return arguments.length ? ((V = t), this) : V
              }),
              (et.dateLabel = function(t) {
                return arguments.length ? ((z = t), this) : z
              }),
              (et.hide = function() {
                return nt.style('visibility', 'hidden'), this
              }),
              (et.locale = function(t) {
                return arguments.length ? ((tt = t), this) : tt
              }),
              (et.nameLabel = function(t) {
                return arguments.length ? ((q = t), this) : q
              }),
              (et.numberFormat = function(t) {
                return arguments.length ? ((Z = t), this) : Z
              }),
              (et.valueFormatter = function(t) {
                return arguments.length ? ((Q = t), this) : Q
              }),
              (et.shouldShowDateInTitle = function(t) {
                return arguments.length ? ((g = t), this) : g
              }),
              (et.show = function() {
                return nt.style('visibility', 'visible'), this
              }),
              (et.title = function(t) {
                return arguments.length ? ((p = t), this) : p
              }),
              (et.tooltipOffset = function(t) {
                return arguments.length ? ((y = t), this) : y
              }),
              (et.topicsOrder = function(t) {
                return arguments.length ? (($ = t), this) : $
              }),
              (et.topicLabel = function(t) {
                return arguments.length ? ((G = t), this) : G
              }),
              (et.update = function(t, n, e) {
                var r =
                  arguments.length > 3 && void 0 !== arguments[3]
                    ? arguments[3]
                    : null
                return (
                  (B = n),
                  (function(t, n, e) {
                    ct(t), at(0, n, e)
                  })(t, e, r),
                  this
                )
              }),
              (et.valueLabel = function(t) {
                return arguments.length ? ((Y = t), this) : Y
              }),
              et
            )
          }
        }.call(n, e, n, t)) || (t.exports = r)
    },
    function(t, n, e) {
      'use strict'
      var r,
        i = (function() {
          return function(t, n) {
            if (Array.isArray(t)) return t
            if (Symbol.iterator in Object(t))
              return (function(t, n) {
                var e = [],
                  r = !0,
                  i = !1,
                  a = void 0
                try {
                  for (
                    var o, u = t[Symbol.iterator]();
                    !(r = (o = u.next()).done) &&
                    (e.push(o.value), !n || e.length !== n);
                    r = !0
                  );
                } catch (t) {
                  ;(i = !0), (a = t)
                } finally {
                  try {
                    !r && u.return && u.return()
                  } finally {
                    if (i) throw a
                  }
                }
                return e
              })(t, n)
            throw new TypeError(
              'Invalid attempt to destructure non-iterable instance',
            )
          }
        })()
      void 0 ===
        (r = function(t) {
          var n = e(1),
            r = e(8),
            a = e(5),
            o = e(0)
          e(6)
          return function() {
            var t = { top: 12, right: 12, bottom: 12, left: 12 },
              e = 100,
              u = 100,
              c = '',
              l = 'value',
              s = 'name',
              f = 100,
              h = r.easeQuadInOut,
              d = void 0,
              p = 1,
              g = void 0,
              v = { y: 0, x: 20 },
              y = 14,
              m = 1.5,
              x = 27,
              _ = 1.18,
              b = '#FFFFFF',
              w = '#D2D6DF',
              M = '#666a73',
              A = '#666a73',
              k = '#45494E',
              T = 200,
              O = '.2f',
              S = function(t) {
                return a.format(O)(t)
              },
              C = void 0,
              E = void 0,
              N = void 0
            function D(n) {
              n.each(function() {
                ;(C = e - t.left - t.right),
                  (E = u - t.top - t.bottom),
                  (function(n) {
                    N ||
                      (N = o
                        .select(n)
                        .append('g')
                        .classed('britechart britechart-mini-tooltip', !0))
                        .append('g')
                        .classed('tooltip-container-group', !0)
                        .attr(
                          'transform',
                          'translate( ' + t.left + ', ' + t.top + ')',
                        )
                        .append('g')
                        .classed('tooltip-group', !0)
                    N.transition()
                      .attr('width', e)
                      .attr('height', u),
                      D.hide()
                  })(this),
                  (g = N.selectAll('.tooltip-group')
                    .append('g')
                    .classed('tooltip-text select-disable', !0)),
                  (d = g
                    .append('rect')
                    .classed('tooltip-background', !0)
                    .attr('width', e)
                    .attr('height', u)
                    .attr('rx', p)
                    .attr('ry', p)
                    .attr('y', -t.top)
                    .attr('x', -t.left)
                    .style('fill', b)
                    .style('stroke', w)
                    .style('stroke-width', 1)
                    .style('pointer-events', 'none')
                    .style('opacity', 0.9))
              })
            }
            function F(n, e) {
              var r = i(n, 2),
                a = r[0],
                o = r[1],
                u = i(e, 2),
                c = u[0],
                l = u[1]
              return [
                (function(n, e) {
                  return n - t.left - t.right - C - e > 0
                })(c, a)
                  ? a + v.x
                  : a - C - v.x - t.right,
                (function(n, e) {
                  return n - t.top - t.bottom - E - e > 0
                })(l, o)
                  ? o + v.y
                  : o - E - v.y - t.bottom,
              ]
            }
            function L() {
              var t =
                  arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : {},
                e = t[l] || '',
                r = t[s] || '',
                i = y * m,
                a = x * _,
                o = 0,
                u = void 0,
                f = void 0,
                h = void 0
              g.selectAll('text').remove(),
                c &&
                  ((h = g
                    .append('text')
                    .classed('mini-tooltip-title', !0)
                    .attr('dy', '1em')
                    .attr('y', 0)
                    .style('fill', M)
                    .style('font-size', y)
                    .text(c)),
                  (o = i + o)),
                r &&
                  ((f = g
                    .append('text')
                    .classed('mini-tooltip-name', !0)
                    .attr('dy', '1em')
                    .attr('y', o || 0)
                    .style('fill', A)
                    .style('font-size', y)
                    .text(r)),
                  (o = i + o)),
                e &&
                  ((u = g
                    .append('text')
                    .classed('mini-tooltip-value', !0)
                    .attr('dy', '1em')
                    .attr('y', o || 0)
                    .style('fill', k)
                    .style('font-size', x)
                    .style('font-weight', T)
                    .text(S(e))),
                  (o = a + o)),
                (C = (function() {
                  for (
                    var t = arguments.length, e = Array(t), r = 0;
                    r < t;
                    r++
                  )
                    e[r] = arguments[r]
                  var i = e
                    .filter(function(t) {
                      return !!t
                    })
                    .map(function(t) {
                      return t.node().getBBox().width
                    })
                  return n.max(i)
                })(f, h, u)),
                (E = o)
            }
            function j(n, e, r) {
              var a, o, u, c
              L(n),
                (a = F(e, r)),
                (o = i(a, 2)),
                (u = o[0]),
                (c = o[1]),
                N.transition()
                  .duration(f)
                  .ease(h)
                  .attr('height', E + t.top + t.bottom)
                  .attr('width', C + t.left + t.right)
                  .attr('transform', 'translate(' + u + ',' + c + ')'),
                d
                  .attr('height', E + t.top + t.bottom)
                  .attr('width', C + t.left + t.right)
            }
            return (
              (D.hide = function() {
                return N.style('visibility', 'hidden'), this
              }),
              (D.nameLabel = function(t) {
                return arguments.length ? ((s = t), this) : s
              }),
              (D.numberFormat = function(t) {
                return arguments.length ? ((O = t), this) : O
              }),
              (D.valueFormatter = function(t) {
                return arguments.length ? ((S = t), this) : S
              }),
              (D.show = function() {
                var t
                return L(t), N.style('visibility', 'visible'), this
              }),
              (D.title = function(t) {
                return arguments.length ? ((c = t), this) : c
              }),
              (D.update = function(t, n, e) {
                return j(t, n, e), this
              }),
              (D.valueLabel = function(t) {
                return arguments.length ? ((l = t), this) : l
              }),
              D
            )
          }
        }.call(n, e, n, t)) || (t.exports = r)
    },
    function(t, n, e) {
      'use strict'
      var r,
        i =
          Object.assign ||
          function(t) {
            for (var n = 1; n < arguments.length; n++) {
              var e = arguments[n]
              for (var r in e)
                Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r])
            }
            return t
          }
      void 0 ===
        (r = function(t) {
          var n = e(1),
            r = e(8),
            a = e(10),
            o = e(17),
            u = e(0),
            c = (e(6), e(11).exportChart),
            l = e(9),
            s = e(12).stackedArea,
            f = e(16).uniqueId,
            h = {
              'font-size': '22px',
              'font-family': 'sans-serif',
              'font-style': 'normal',
              'font-weight': 0,
            }
          return function() {
            var t = { left: 5, right: 5, top: 5, bottom: 5 },
              e = 100,
              d = 30,
              p = s,
              g = void 0,
              v = void 0,
              y = ['#F5FDFF', '#F6FEFC'],
              m = void 0,
              x = f('sparkline-area-gradient'),
              _ = 2,
              b = l.colorGradients.greenBlue,
              w = void 0,
              M = f('sparkline-line-gradient'),
              A = void 0,
              k = f('maskingClip'),
              T = void 0,
              O = void 0,
              S = void 0,
              C = void 0,
              E = !1,
              N = 3e3,
              D = r.easeQuadInOut,
              F = void 0,
              L = void 0,
              j = void 0,
              B = void 0,
              I = void 0,
              P = h,
              R = 1.5,
              U = 'value',
              H = 'date',
              z = function(t) {
                return t.date
              },
              Y = function(t) {
                return t.value
              }
            function q(r) {
              r.each(function(r) {
                ;(O = e - t.left - t.right),
                  (S = d - t.top - t.bottom),
                  (C = r.reduce(function(t, n) {
                    return (
                      (n.date = new Date(n[H])),
                      (n.value = +n[U]),
                      [].concat(
                        (function(t) {
                          if (Array.isArray(t)) {
                            for (
                              var n = 0, e = Array(t.length);
                              n < t.length;
                              n++
                            )
                              e[n] = t[n]
                            return e
                          }
                          return Array.from(t)
                        })(t),
                        [n],
                      )
                    )
                  }, [])),
                  (g = a
                    .scaleLinear()
                    .domain(n.extent(C, z))
                    .range([0, O])),
                  (v = a
                    .scaleLinear()
                    .domain(n.extent(C, Y))
                    .range([S, 0])),
                  (function(n) {
                    T ||
                      ((T = u
                        .select(n)
                        .append('svg')
                        .classed('britechart sparkline', !0)),
                      (function() {
                        var n = T.append('g')
                          .classed('container-group', !0)
                          .attr(
                            'transform',
                            'translate(' + t.left + ',' + t.top + ')',
                          )
                        n.append('g').classed('text-group', !0),
                          n.append('g').classed('chart-group', !0),
                          n.append('g').classed('metadata-group', !0)
                      })())
                    T.attr('width', e).attr('height', d)
                  })(this),
                  (function() {
                    var t = T.select('.metadata-group')
                    ;(m || w) &&
                      (T.selectAll('#' + x).remove(),
                      T.selectAll('#' + M).remove())
                    ;(m = t
                      .append('linearGradient')
                      .attr('id', x)
                      .attr('class', 'area-gradient')
                      .attr('gradientUnits', 'userSpaceOnUse')
                      .attr('x1', 0)
                      .attr('x2', g(C[C.length - 1].date))
                      .attr('y1', 0)
                      .attr('y2', 0)
                      .selectAll('stop')
                      .data([
                        { offset: '0%', color: y[0] },
                        { offset: '100%', color: y[1] },
                      ])
                      .enter()
                      .append('stop')
                      .attr('offset', function(t) {
                        var n = t.offset
                        return n
                      })
                      .attr('stop-color', function(t) {
                        var n = t.color
                        return n
                      })),
                      (w = t
                        .append('linearGradient')
                        .attr('id', M)
                        .attr('class', 'line-gradient')
                        .attr('gradientUnits', 'userSpaceOnUse')
                        .attr('x1', 0)
                        .attr('x2', g(C[C.length - 1].date))
                        .attr('y1', 0)
                        .attr('y2', 0)
                        .selectAll('stop')
                        .data([
                          { offset: '0%', color: b[0] },
                          { offset: '100%', color: b[1] },
                        ])
                        .enter()
                        .append('stop')
                        .attr('offset', function(t) {
                          var n = t.offset
                          return n
                        })
                        .attr('stop-color', function(t) {
                          var n = t.color
                          return n
                        }))
                  })(),
                  (function() {
                    A && T.selectAll('#' + k).remove()
                    E &&
                      ((A = T.select('.metadata-group')
                        .append('clipPath')
                        .attr('id', k)
                        .attr('class', 'clip-path')
                        .append('rect')
                        .attr('width', 0)
                        .attr('height', d)),
                      u
                        .select('#' + k + ' rect')
                        .transition()
                        .ease(D)
                        .duration(N)
                        .attr('width', e))
                  })(),
                  (function() {
                    L && T.selectAll('.sparkline-area').remove()
                    ;(L = o
                      .area()
                      .x(function(t) {
                        var n = t.date
                        return g(n)
                      })
                      .y0(function() {
                        return v(0) + _ / 2
                      })
                      .y1(function(t) {
                        var n = t.value
                        return v(n)
                      })
                      .curve(o.curveBasis)),
                      T.select('.chart-group')
                        .append('path')
                        .datum(C)
                        .attr('class', 'sparkline-area')
                        .attr('fill', 'url(#' + x + ')')
                        .attr('d', L)
                        .attr('clip-path', 'url(#' + k + ')')
                  })(),
                  (function() {
                    F && T.selectAll('.line').remove()
                    ;(F = o
                      .line()
                      .curve(o.curveBasis)
                      .x(function(t) {
                        var n = t.date
                        return g(n)
                      })
                      .y(function(t) {
                        var n = t.value
                        return v(n)
                      })),
                      T.select('.chart-group')
                        .append('path')
                        .datum(C)
                        .attr('class', 'line')
                        .attr('stroke', 'url(#' + M + ')')
                        .attr('d', F)
                        .attr('clip-path', 'url(#' + k + ')')
                  })(),
                  (function() {
                    j && T.selectAll('.sparkline-circle').remove()
                    j = T.selectAll('.chart-group')
                      .append('circle')
                      .attr('class', 'sparkline-circle')
                      .attr('cx', g(C[C.length - 1].date))
                      .attr('cy', v(C[C.length - 1].value))
                      .attr('r', R)
                  })(),
                  I &&
                    (function() {
                      B && T.selectAll('.sparkline-text').remove()
                      B = T.selectAll('.text-group')
                        .append('text')
                        .attr('x', O / 2)
                        .attr('y', S / 6)
                        .attr('text-anchor', 'middle')
                        .attr('class', 'sparkline-text')
                        .style('font-size', P['font-size'] || h['font-size'])
                        .style('fill', P.fill || b[0])
                        .style(
                          'font-family',
                          P['font-family'] || h['font-family'],
                        )
                        .style(
                          'font-weight',
                          P['font-weight'] || h['font-weight'],
                        )
                        .style('font-style', P['font-style'] || h['font-style'])
                        .text(I)
                    })()
              })
            }
            return (
              (q.areaGradient = function(t) {
                return arguments.length ? ((y = t), this) : y
              }),
              (q.dateLabel = function(t) {
                return arguments.length ? ((H = t), this) : H
              }),
              (q.duration = function(t) {
                return arguments.length ? ((N = t), this) : N
              }),
              (q.exportChart = function(t, n) {
                c.call(q, T, t, n)
              }),
              (q.height = function(t) {
                return arguments.length ? ((d = t), this) : d
              }),
              (q.isAnimated = function(t) {
                return arguments.length ? ((E = t), this) : E
              }),
              (q.lineGradient = function(t) {
                return arguments.length ? ((b = t), this) : b
              }),
              (q.loadingState = function(t) {
                return arguments.length ? ((p = t), this) : p
              }),
              (q.margin = function(n) {
                return arguments.length ? ((t = i({}, t, n)), this) : t
              }),
              (q.titleText = function(t) {
                return arguments.length ? ((I = t), this) : I
              }),
              (q.titleTextStyle = function(t) {
                return arguments.length ? ((P = t), this) : P
              }),
              (q.valueLabel = function(t) {
                return arguments.length ? ((U = t), this) : U
              }),
              (q.width = function(t) {
                return arguments.length ? ((e = t), this) : e
              }),
              q
            )
          }
        }.call(n, e, n, t)) || (t.exports = r)
    },
    function(t, n, e) {
      'use strict'
      var r,
        i =
          Object.assign ||
          function(t) {
            for (var n = 1; n < arguments.length; n++) {
              var e = arguments[n]
              for (var r in e)
                Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r])
            }
            return t
          },
        a = (function() {
          return function(t, n) {
            if (Array.isArray(t)) return t
            if (Symbol.iterator in Object(t))
              return (function(t, n) {
                var e = [],
                  r = !0,
                  i = !1,
                  a = void 0
                try {
                  for (
                    var o, u = t[Symbol.iterator]();
                    !(r = (o = u.next()).done) &&
                    (e.push(o.value), !n || e.length !== n);
                    r = !0
                  );
                } catch (t) {
                  ;(i = !0), (a = t)
                } finally {
                  try {
                    !r && u.return && u.return()
                  } finally {
                    if (i) throw a
                  }
                }
                return e
              })(t, n)
            throw new TypeError(
              'Invalid attempt to destructure non-iterable instance',
            )
          }
        })()
      function o(t) {
        if (Array.isArray(t)) {
          for (var n = 0, e = Array(t.length); n < t.length; n++) e[n] = t[n]
          return e
        }
        return Array.from(t)
      }
      function u(t, n, e) {
        return (
          n in t
            ? Object.defineProperty(t, n, {
                value: e,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (t[n] = e),
          t
        )
      }
      void 0 ===
        (r = function(t) {
          var n = e(1),
            r = e(14),
            c = e(18),
            l = e(7),
            s = e(8),
            f = e(10),
            h = e(17),
            d = e(0),
            p = (e(6), e(13)),
            g = e(21),
            v = e(11).exportChart,
            y = e(9),
            m = e(20).getTimeSeriesAxis,
            x = e(15),
            _ = x.axisTimeCombinations,
            b = x.curveMap,
            w = e(16),
            M = w.formatIntegerValue,
            A = w.formatDecimalValue,
            k = w.isInteger,
            T = e(23),
            O = T.createFilterContainer,
            S = T.createGlowWithMatrix,
            C = T.bounceCircleHighlight,
            E = e(22),
            N = E.addDays,
            D = E.diffDays,
            F = e(12).stackedArea,
            L = function(t) {
              return t.filter(function(t, n, e) {
                return e.indexOf(t) === n
              })
            }
          return function() {
            var t = { top: 70, right: 30, bottom: 60, left: 70 },
              e = 960,
              x = 500,
              w = F,
              T = void 0,
              E = void 0,
              j = void 0,
              B = void 0,
              I = void 0,
              P = null,
              R = 30,
              U = 5,
              H = -8,
              z = void 0,
              Y = void 0,
              q = -60,
              G = -20,
              W = 5,
              X = y.colorSchemas.britecharts,
              V = y.colorGradients.greenBlue,
              $ = null,
              Z = null,
              Q = 12,
              K = 5,
              J = 1.2,
              tt = K + 2,
              nt = 5,
              et = 0.6,
              rt = 0.24,
              it = void 0,
              at = void 0,
              ot = void 0,
              ut = null,
              ct = null,
              lt = null,
              st = void 0,
              ft = 'monotoneX',
              ht = void 0,
              dt = void 0,
              pt = void 0,
              gt = void 0,
              vt = void 0,
              yt = n.range(20, 200, 20),
              mt = void 0,
              xt = 'rgba(0, 0, 0, 0)',
              _t = void 0,
              bt = void 0,
              wt = void 0,
              Mt = !1,
              At = s.easeQuadInOut,
              kt = 1e3,
              Tt = !0,
              Ot = void 0,
              St = void 0,
              Ct = void 0,
              Et = void 0,
              Nt = void 0,
              Dt = void 0,
              Ft = void 0,
              Lt = null,
              jt = 480,
              Bt = { top: 0, left: 15, bottom: 0, right: 0 },
              It = 'date',
              Pt = 'value',
              Rt = 'name',
              Ut = {
                minDate: new Date(
                  new Date().setDate(new Date().getDate() - 30),
                ),
                maxDate: new Date(),
                maxY: 500,
              },
              Ht = !1,
              zt = function(t) {
                return t.name
              },
              Yt = function(t) {
                return t.date
              },
              qt = l.dispatch(
                'customMouseOver',
                'customMouseOut',
                'customMouseMove',
                'customDataEntryClick',
                'customTouchMove',
              )
            function Gt(i) {
              i.each(function(i) {
                var l, s, v, y, _
                ;(St = e - t.left - t.right),
                  (Ct = x - t.top - t.bottom),
                  (Et = (l =
                    0 === (l = i).length
                      ? ((s = D(Ut.minDate, Ut.maxDate)),
                        (v = Array.apply(null, Array(s))),
                        (Ht = !0),
                        [].concat(
                          o(
                            v.map(function(t, n) {
                              var e
                              return (
                                u((e = {}), It, N(Ut.minDate, n)),
                                u(e, Pt, 0),
                                u(e, Rt, '1'),
                                e
                              )
                            }),
                          ),
                          o(
                            v.map(function(t, n) {
                              var e
                              return (
                                u((e = {}), It, N(Ut.minDate, n)),
                                u(e, Pt, 0),
                                u(e, Rt, '2'),
                                e
                              )
                            }),
                          ),
                        ))
                      : l).reduce(function(t, n) {
                    return (
                      (n.date = new Date(n[It])),
                      (n.value = +n[Pt]),
                      [].concat(o(t), [n])
                    )
                  }, [])),
                  (Nt = (function(t) {
                    return c
                      .nest()
                      .key(Yt)
                      .entries(
                        t.sort(function(t, n) {
                          return t.date - n.date
                        }),
                      )
                      .map(function(t) {
                        return g({}, t, { date: new Date(t.key) })
                      })
                  })(Et)),
                  (function() {
                    ;(Dt = Nt.map(function(t) {
                      return g({}, t, t.values)
                    }).map(function(t) {
                      return (
                        Object.keys(t).forEach(function(n) {
                          var e = t[n]
                          e && e.name && (t[e.name] = e.value)
                        }),
                        g({}, t, { date: new Date(t.key) })
                      )
                    })),
                      (Ft = Nt.map(function(t) {
                        return g({}, t, t.values)
                      }).map(function(t) {
                        return (
                          Object.keys(t).forEach(function(n) {
                            var e = t[n]
                            e && e.name && (t[e.name] = 0)
                          }),
                          g({}, t, { date: new Date(t.key) })
                        )
                      }))
                    var t = L(Et.map(zt)).reduce(function(t, n) {
                        return g({}, t, u({}, n, 0))
                      }, {}),
                      n = Et.reduce(function(t, n) {
                        return g({}, t, u({}, n.name, (t[n.name] += n.value)))
                      }, t)
                    at =
                      ot ||
                      (function(t) {
                        var n = Object.keys(t).sort(function(n, e) {
                            return t[n] > t[e] ? -1 : t[n] === t[e] ? 0 : 1
                          }),
                          e = n.indexOf('Other')
                        if (e >= 0) {
                          var r = n.splice(e, 1)
                          n = n.concat(r)
                        }
                        return n
                      })(n)
                    var e = h
                      .stack()
                      .keys(at)
                      .order(h.stackOrderNone)
                      .offset(h.stackOffsetNone)
                    ;(pt = e(Ft)), (ht = e(Dt))
                  })(),
                  (y = Ht
                    ? Ut.maxY
                    : ((_ = L(
                        Et.map(function(t) {
                          return t.name
                        }),
                      )),
                      n.max(Dt, function(t) {
                        var e = _.map(function(n) {
                          return t[n]
                        })
                        return n.sum(e)
                      }))),
                  (T = f
                    .scaleTime()
                    .domain(
                      n.extent(Nt, function(t) {
                        var n = t.date
                        return n
                      }),
                    )
                    .rangeRound([0, St])),
                  (B = f
                    .scaleLinear()
                    .domain([0, y])
                    .rangeRound([Ct, 0])
                    .nice()),
                  (it = at.reduce(function(t, n, e) {
                    return g({}, t, u({}, n, X[e]))
                  }, {})),
                  (function(n) {
                    Ot ||
                      ((Ot = d
                        .select(n)
                        .append('svg')
                        .classed('britechart stacked-area', !0)),
                      (function() {
                        var n = Ot.append('g')
                          .classed('container-group', !0)
                          .attr(
                            'transform',
                            'translate(' + t.left + ',' + t.top + ')',
                          )
                        n
                          .append('g')
                          .classed('x-axis-group', !0)
                          .append('g')
                          .classed('x axis', !0),
                          n
                            .selectAll('.x-axis-group')
                            .append('g')
                            .classed('month-axis', !0),
                          n.append('g').classed('y-axis-group axis', !0),
                          n.append('g').classed('grid-lines-group', !0),
                          n.append('g').classed('y-axis-label', !0),
                          n.append('g').classed('chart-group', !0),
                          n.append('g').classed('metadata-group', !0)
                      })())
                    Ot.attr('width', e).attr('height', x)
                  })(this),
                  (function() {
                    var n = void 0,
                      i = void 0
                    if ('custom' === ut && 'string' == typeof lt)
                      (n = { tick: ct, format: p.timeFormat(lt) }), (i = null)
                    else {
                      var a = m(Nt, e, ut, st)
                      ;(n = a.minor),
                        (i = a.major),
                        (j = r
                          .axisBottom(T)
                          .ticks(i.tick)
                          .tickSize(0, 0)
                          .tickFormat(i.format))
                    }
                    ;(E = r
                      .axisBottom(T)
                      .ticks(n.tick)
                      .tickSize(10, 0)
                      .tickPadding(W)
                      .tickFormat(n.format)),
                      (I = r
                        .axisRight(B)
                        .ticks(U)
                        .tickSize([0])
                        .tickPadding(W)
                        .tickFormat(Wt)),
                      (function(n, e) {
                        Ot.select('.grid-lines-group')
                          .selectAll('line')
                          .remove(),
                          ('horizontal' === Lt || 'full' === Lt) &&
                            Ot.select('.grid-lines-group')
                              .selectAll('line.horizontal-grid-line')
                              .data(B.ticks(e))
                              .enter()
                              .append('line')
                              .attr('class', 'horizontal-grid-line')
                              .attr('x1', -Bt.left - 30)
                              .attr('x2', St)
                              .attr('y1', function(t) {
                                return B(t)
                              })
                              .attr('y2', function(t) {
                                return B(t)
                              })
                        ;('vertical' !== Lt && 'full' !== Lt) ||
                          Ot.select('.grid-lines-group')
                            .selectAll('line.vertical-grid-line')
                            .data(T.ticks(n))
                            .enter()
                            .append('line')
                            .attr('class', 'vertical-grid-line')
                            .attr('y1', 0)
                            .attr('y2', Ct)
                            .attr('x1', function(t) {
                              return T(t)
                            })
                            .attr('x2', function(t) {
                              return T(t)
                            })
                        Ot.select('.grid-lines-group')
                          .selectAll('line.extended-x-line')
                          .data([0])
                          .enter()
                          .append('line')
                          .attr('class', 'extended-x-line')
                          .attr('x1', -Bt.left - 30)
                          .attr('x2', St)
                          .attr('y1', x - t.bottom - t.top)
                          .attr('y2', x - t.bottom - t.top)
                      })(n.tick, U)
                  })(),
                  (function() {
                    Ot.select('.x-axis-group .axis.x')
                      .attr('transform', 'translate( 0, ' + Ct + ' )')
                      .call(E),
                      'custom' !== ut &&
                        Ot.select('.x-axis-group .month-axis')
                          .attr('transform', 'translate(0, ' + (Ct + R) + ')')
                          .call(j)
                    Ot.select('.y-axis-group.axis')
                      .attr('transform', 'translate( ' + -Bt.left + ', 0)')
                      .call(I)
                      .call(Xt),
                      z &&
                        (Y && Ot.selectAll('.y-axis-label-text').remove(),
                        (Y = Ot.select('.y-axis-label')
                          .append('text')
                          .classed('y-axis-label-text', !0)
                          .attr('x', -Ct / 2)
                          .attr('y', q)
                          .attr('text-anchor', 'middle')
                          .attr('transform', 'rotate(270 0 0)')
                          .text(z)))
                  })(),
                  (function() {
                    dt &&
                      (Ot.selectAll('.layer-container').remove(),
                      Ot.selectAll('.layer').remove(),
                      Ot.selectAll('.area-outline').remove())
                    if (Ht)
                      return (
                        (t = h
                          .line()
                          .x(function(t) {
                            return T(t.date)
                          })
                          .y(function() {
                            return B(0) - 1
                          })),
                        (n = Ot.select('.chart-group'))
                          .append('path')
                          .attr('class', 'empty-data-line')
                          .attr('d', t(Dt))
                          .style('stroke', 'url(#empty-data-line-gradient)'),
                        void n
                          .append('linearGradient')
                          .attr('id', 'empty-data-line-gradient')
                          .attr('gradientUnits', 'userSpaceOnUse')
                          .attr('x1', 0)
                          .attr('x2', T(Et[Et.length - 1].date))
                          .attr('y1', 0)
                          .attr('y2', 0)
                          .selectAll('stop')
                          .data([
                            { offset: '0%', color: V[0] },
                            { offset: '100%', color: V[1] },
                          ])
                          .enter()
                          .append('stop')
                          .attr('offset', function(t) {
                            var n = t.offset
                            return n
                          })
                          .attr('stop-color', function(t) {
                            var n = t.color
                            return n
                          })
                      )
                    var t, n
                    ;(gt = h
                      .area()
                      .curve(b[ft])
                      .x(function(t) {
                        var n = t.data
                        return T(n.date)
                      })
                      .y0(function(t) {
                        return B(t[0])
                      })
                      .y1(function(t) {
                        return B(t[1])
                      })),
                      (vt = h
                        .line()
                        .curve(gt.curve())
                        .x(function(t) {
                          var n = t.data
                          return T(n.date)
                        })
                        .y(function(t) {
                          return B(t[1])
                        })),
                      Mt
                        ? ((dt = Ot.select('.chart-group')
                            .selectAll('.layer')
                            .data(pt, zt)
                            .enter()
                            .append('g')
                            .classed('layer-container', !0))
                            .append('path')
                            .attr('class', 'layer')
                            .attr('d', gt)
                            .style('opacity', rt)
                            .style('fill', function(t) {
                              var n = t.key
                              return it[n]
                            }),
                          dt
                            .append('path')
                            .attr('class', 'area-outline')
                            .attr('d', vt)
                            .style('stroke', function(t) {
                              var n = t.key
                              return it[n]
                            }),
                          Ot.select('.chart-group')
                            .selectAll('.layer')
                            .data(ht)
                            .transition()
                            .delay(function(t, n) {
                              return yt[n]
                            })
                            .duration(kt)
                            .ease(At)
                            .attr('d', gt)
                            .style('opacity', rt)
                            .style('fill', function(t) {
                              var n = t.key
                              return it[n]
                            }),
                          Ot.select('.chart-group')
                            .selectAll('.area-outline')
                            .data(ht)
                            .transition()
                            .delay(function(t, n) {
                              return yt[n]
                            })
                            .duration(kt)
                            .ease(At)
                            .attr('d', vt))
                        : ((dt = Ot.select('.chart-group')
                            .selectAll('.layer')
                            .data(ht)
                            .enter()
                            .append('g')
                            .classed('layer-container', !0))
                            .append('path')
                            .attr('class', 'layer')
                            .attr('d', gt)
                            .style('opacity', rt)
                            .style('fill', function(t) {
                              var n = t.key
                              return it[n]
                            }),
                          dt
                            .append('path')
                            .attr('class', 'area-outline')
                            .attr('d', vt)
                            .style('stroke', function(t) {
                              var n = t.key
                              return it[n]
                            }),
                          Ot.select('.chart-group')
                            .selectAll('.layer')
                            .attr('d', gt)
                            .style('opacity', rt)
                            .style('fill', function(t) {
                              var n = t.key
                              return it[n]
                            }),
                          Ot.select('.chart-group')
                            .selectAll('.area-outline')
                            .attr('class', 'area-outline')
                            .attr('d', vt)
                            .style('stroke', function(t) {
                              var n = t.key
                              return it[n]
                            }))
                    Tt ||
                      Ot.select('.chart-group')
                        .selectAll('.area-outline')
                        .style('display', 'none')
                    dt.exit()
                      .transition()
                      .style('opacity', 0)
                      .remove()
                  })(),
                  Ot.on('touchmove', function(t) {
                    !(function(t, n) {
                      qt.call('customTouchMove', t, n, d.touch(t))
                    })(this, t)
                  }),
                  e > jt &&
                    !Ht &&
                    (!(function() {
                      mt && Ot.selectAll('.overlay').remove()
                      mt = Ot.select('.metadata-group')
                        .append('rect')
                        .attr('class', 'overlay')
                        .attr('y1', 0)
                        .attr('y2', Ct)
                        .attr('height', Ct)
                        .attr('width', St)
                        .attr('fill', xt)
                        .style('display', 'none')
                    })(),
                    (function() {
                      _t && Ot.selectAll('.vertical-marker-container').remove()
                      ;(_t = Ot.select('.metadata-group')
                        .append('g')
                        .attr('class', 'vertical-marker-container')
                        .attr('transform', 'translate(9999, 0)')),
                        (bt = _t
                          .selectAll('path')
                          .data([{ x1: 0, y1: 0, x2: 0, y2: 0 }])
                          .enter()
                          .append('line')
                          .classed('vertical-marker', !0)
                          .attr('x1', 0)
                          .attr('y1', Ct)
                          .attr('x2', 0)
                          .attr('y2', 0))
                    })(),
                    Ot.on('mouseover', function(t) {
                      !(function(t, n) {
                        mt.style('display', 'block'),
                          bt.classed('bc-is-active', !0),
                          qt.call('customMouseOver', t, n, d.mouse(t))
                      })(this, t)
                    })
                      .on('mouseout', function(t) {
                        !(function(t, n) {
                          mt.style('display', 'none'),
                            bt.classed('bc-is-active', !1),
                            _t.attr('transform', 'translate(9999, 0)'),
                            qt.call('customMouseOut', t, n, d.mouse(t))
                        })(this, t)
                      })
                      .on('mousemove', function(n) {
                        !(function(n) {
                          var e
                          wt ||
                            ((e = Nt.map(function(t) {
                              var n = t.date
                              return n
                            })),
                            (wt = (T(e[1]) - T(e[0])) / 2))
                          var r,
                            i = d.mouse(n),
                            u = a(i, 2),
                            c = u[0],
                            l = u[1],
                            s = (function(t) {
                              var n = Nt.filter(function(n) {
                                var e = n.date
                                return Math.abs(T(e) - t) <= wt
                              })
                              if (n.length) return n[0]
                            })(c - t.left),
                            f = void 0
                          s &&
                            ((f = T(new Date(s.key))),
                            (r = f),
                            _t.attr('transform', 'translate(' + r + ',0)'),
                            (function(t) {
                              var n = t.values,
                                e = 0
                              _t.selectAll('.circle-container').remove()
                              var r = at.reduce(function(t, e) {
                                return [].concat(o(t), [
                                  n.find(function(t) {
                                    var n = t.name
                                    return n === e
                                  }),
                                ])
                              }, [])
                              r.forEach(function(t, n) {
                                var i = _t
                                  .append('g')
                                  .classed('circle-container', !0)
                                  .append('circle')
                                  .classed('data-point-highlighter', !0)
                                  .attr('cx', Q)
                                  .attr('cy', 0)
                                  .attr('r', K)
                                  .style('stroke-width', J)
                                  .style('stroke', it[t.name])
                                  .style('cursor', 'pointer')
                                  .on('click', function() {
                                    !(function(t) {
                                      $ ||
                                        (($ = O(Ot.select('.metadata-group'))),
                                        (Z = S($)))
                                      var n = d.select(t)
                                      n
                                        .style('stroke-width', nt)
                                        .style('stroke-opacity', et)
                                        .attr('filter', 'url(#' + Z + ')'),
                                        C(n, At, tt)
                                    })(this),
                                      (function(t, n) {
                                        qt.call(
                                          'customDataEntryClick',
                                          t,
                                          n,
                                          d.mouse(t),
                                        )
                                      })(this, t)
                                  })
                                  .on('mouseout', function() {
                                    var t
                                    ;(t = this),
                                      d.select(t).attr('filter', 'none')
                                  })
                                ;(e += r[n][Pt]),
                                  i.attr(
                                    'transform',
                                    'translate( ' + -Q + ', ' + B(e) + ' )',
                                  )
                              })
                            })(s),
                            qt.call('customMouseMove', n, s, it, f, l))
                        })(this)
                      }))
              })
            }
            function Wt(t) {
              return (k(t) ? M : A)(t)
            }
            function Xt(t) {
              t.selectAll('.tick text').attr(
                'transform',
                'translate(' + G + ', ' + H + ')',
              )
            }
            return (
              (Gt.areaCurve = function(t) {
                return arguments.length ? ((ft = t), this) : ft
              }),
              (Gt.areaOpacity = function(t) {
                return arguments.length ? ((rt = t), this) : rt
              }),
              (Gt.aspectRatio = function(t) {
                return arguments.length ? ((P = t), this) : P
              }),
              (Gt.axisTimeCombinations = _),
              (Gt.colorSchema = function(t) {
                return arguments.length ? ((X = t), this) : X
              }),
              (Gt.dateLabel = function(t) {
                return arguments.length ? ((It = t), this) : It
              }),
              (Gt.emptyDataConfig = function(t) {
                return arguments.length ? ((Ut = t), this) : Ut
              }),
              (Gt.grid = function(t) {
                return arguments.length ? ((Lt = t), this) : Lt
              }),
              (Gt.hasOutline = function(t) {
                return arguments.length ? ((Tt = t), this) : Tt
              }),
              (Gt.height = function(t) {
                return arguments.length
                  ? (P && (e = Math.ceil(t / P)), (x = t), this)
                  : x
              }),
              (Gt.isAnimated = function(t) {
                return arguments.length ? ((Mt = t), this) : Mt
              }),
              (Gt.keyLabel = function(t) {
                return arguments.length ? ((Rt = t), this) : Rt
              }),
              (Gt.margin = function(n) {
                return arguments.length ? ((t = i({}, t, n)), this) : t
              }),
              (Gt.tooltipThreshold = function(t) {
                return arguments.length ? ((jt = t), this) : jt
              }),
              (Gt.topicsOrder = function(t) {
                return arguments.length ? ((ot = t), this) : ot
              }),
              (Gt.loadingState = function(t) {
                return arguments.length ? ((w = t), this) : w
              }),
              (Gt.locale = function(t) {
                return arguments.length ? ((st = t), this) : st
              }),
              (Gt.exportChart = function(t, n) {
                v.call(Gt, Ot, t, n)
              }),
              (Gt.on = function() {
                var t = qt.on.apply(qt, arguments)
                return t === qt ? Gt : t
              }),
              (Gt.valueLabel = function(t) {
                return arguments.length ? ((Pt = t), this) : Pt
              }),
              (Gt.width = function(t) {
                return arguments.length
                  ? (P && (x = Math.ceil(t * P)), (e = t), this)
                  : e
              }),
              (Gt.xAxisCustomFormat = function(t) {
                return arguments.length ? ((lt = t), this) : lt
              }),
              (Gt.xAxisFormat = function(t) {
                return arguments.length ? ((ut = t), this) : ut
              }),
              (Gt.xTicks = function(t) {
                return arguments.length ? ((ct = t), this) : ct
              }),
              (Gt.yAxisLabel = function(t) {
                return arguments.length ? ((z = t), this) : z
              }),
              (Gt.yAxisLabelOffset = function(t) {
                return arguments.length ? ((q = t), this) : q
              }),
              (Gt.yTicks = function(t) {
                return arguments.length ? ((U = t), this) : U
              }),
              Gt
            )
          }
        }.call(n, e, n, t)) || (t.exports = r)
    },
    function(t, n, e) {
      'use strict'
      var r,
        i =
          Object.assign ||
          function(t) {
            for (var n = 1; n < arguments.length; n++) {
              var e = arguments[n]
              for (var r in e)
                Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r])
            }
            return t
          },
        a = (function() {
          return function(t, n) {
            if (Array.isArray(t)) return t
            if (Symbol.iterator in Object(t))
              return (function(t, n) {
                var e = [],
                  r = !0,
                  i = !1,
                  a = void 0
                try {
                  for (
                    var o, u = t[Symbol.iterator]();
                    !(r = (o = u.next()).done) &&
                    (e.push(o.value), !n || e.length !== n);
                    r = !0
                  );
                } catch (t) {
                  ;(i = !0), (a = t)
                } finally {
                  try {
                    !r && u.return && u.return()
                  } finally {
                    if (i) throw a
                  }
                }
                return e
              })(t, n)
            throw new TypeError(
              'Invalid attempt to destructure non-iterable instance',
            )
          }
        })()
      void 0 ===
        (r = function(t) {
          var n = e(1),
            r = e(14),
            o = e(3),
            u = e(18),
            c = e(7),
            l = e(8),
            s = e(4),
            f = e(10),
            h = e(0),
            d = e(21),
            p = (e(6), e(11).exportChart),
            g = e(9),
            v = e(12).bar,
            y = function(t) {
              return t.filter(function(t, n, e) {
                return e.indexOf(t) == n
              })
            }
          return function() {
            var t = { top: 40, right: 30, bottom: 60, left: 70 },
              e = 960,
              m = 500,
              x = v,
              _ = void 0,
              b = void 0,
              w = void 0,
              M = void 0,
              A = void 0,
              k = void 0,
              T = null,
              O = { y: -8, x: -20 },
              S = 5,
              C = 5,
              E = g.colorSchemas.britecharts,
              N = void 0,
              D = void 0,
              F = void 0,
              L = l.easeQuadInOut,
              j = !1,
              B = void 0,
              I = void 0,
              P = void 0,
              R = void 0,
              U = void 0,
              H = void 0,
              z = void 0,
              Y = 480,
              q = { top: 0, left: 0, bottom: 0, right: 0 },
              G = void 0,
              W = void 0,
              X = -60,
              V = 0.24,
              $ = 20,
              Z = void 0,
              Q = 1e3,
              K = null,
              J = 'name',
              tt = 'value',
              nt = 'group',
              et = ',f',
              rt = function(t) {
                return t.name
              },
              it = function(t) {
                return t.value
              },
              at = function(t) {
                return t.group
              },
              ot = !1,
              ut = c.dispatch(
                'customMouseOver',
                'customMouseOut',
                'customMouseMove',
                'customClick',
              )
            function ct(i) {
              i.each(function(i) {
                ;(I = e - t.left - t.right),
                  (P = m - t.top - t.bottom),
                  (function(t) {
                    ;(U = y(
                      t.map(function(t) {
                        return at(t)
                      }),
                    )),
                      (z = u
                        .nest()
                        .key(rt)
                        .rollup(function(t) {
                          var n = {}
                          return (
                            t.forEach(function(t) {
                              t && t[nt] && (n[t[nt]] = it(t))
                            }),
                            (n.values = t),
                            n
                          )
                        })
                        .entries(t)
                        .map(function(t) {
                          return d(
                            {},
                            { total: n.sum(n.permute(t.value, U)), key: t.key },
                            t.value,
                          )
                        }))
                  })(
                    (R = i.reduce(function(t, n) {
                      return (
                        (n.value = +n[tt]),
                        (n.group = n[nt]),
                        (n.topicName = at(n)),
                        (n.name = n[J]),
                        [].concat(
                          (function(t) {
                            if (Array.isArray(t)) {
                              for (
                                var n = 0, e = Array(t.length);
                                n < t.length;
                                n++
                              )
                                e[n] = t[n]
                              return e
                            }
                            return Array.from(t)
                          })(t),
                          [n],
                        )
                      )
                    }, [])),
                  ),
                  (function() {
                    var t = n.max(R.map(it))
                    j
                      ? ((_ = f
                          .scaleLinear()
                          .domain([0, t])
                          .rangeRound([0, I - 1])),
                        (M = f
                          .scaleBand()
                          .domain(R.map(rt))
                          .rangeRound([P, 0])
                          .padding(0.1)),
                        (A = f
                          .scaleBand()
                          .domain(R.map(at))
                          .rangeRound([M.bandwidth(), 0])
                          .padding(0.1)))
                      : ((_ = f
                          .scaleBand()
                          .domain(R.map(rt))
                          .rangeRound([0, I])
                          .padding(0.1)),
                        (b = f
                          .scaleBand()
                          .domain(R.map(at))
                          .rangeRound([0, _.bandwidth()])
                          .padding(0.1)),
                        (M = f
                          .scaleLinear()
                          .domain([0, t])
                          .rangeRound([P, 0])
                          .nice()))
                    ;(N = f
                      .scaleOrdinal()
                      .range(E)
                      .domain(R.map(at))),
                      (D = N.domain(R.map(rt))
                        .domain()
                        .reduce(function(t, n) {
                          return (
                            R.forEach(function(e) {
                              rt(e) == n &&
                                ((t[e.name] = N(e.group)),
                                (t[e.group] = N(e.group)),
                                (t[e.group + n] = N(e.group)))
                            }),
                            t
                          )
                        }, {}))
                  })(),
                  (F = z.map(function(t) {
                    var n = {}
                    return (
                      U.forEach(function(e) {
                        n[e] = t[e]
                      }),
                      d({}, t, n)
                    )
                  })),
                  (function(n) {
                    B ||
                      ((B = h
                        .select(n)
                        .append('svg')
                        .classed('britechart grouped-bar', !0)),
                      (function() {
                        var n = B.append('g')
                          .classed('container-group', !0)
                          .attr(
                            'transform',
                            'translate(' + t.left + ',' + t.top + ')',
                          )
                        n
                          .append('g')
                          .classed('x-axis-group', !0)
                          .append('g')
                          .classed('x axis', !0),
                          n
                            .selectAll('.x-axis-group')
                            .append('g')
                            .classed('month-axis', !0),
                          n.append('g').classed('y-axis-group axis', !0),
                          n.append('g').classed('y-axis-label', !0),
                          n.append('g').classed('grid-lines-group', !0),
                          n.append('g').classed('chart-group', !0),
                          n.append('g').classed('metadata-group', !0)
                      })())
                    B.attr('width', e).attr('height', m)
                  })(this),
                  (function() {
                    var t = j ? _ : M
                    B.select('.grid-lines-group')
                      .selectAll('line')
                      .remove(),
                      ('horizontal' === K || 'full' === K) &&
                        B.select('.grid-lines-group')
                          .selectAll('line.horizontal-grid-line')
                          .data(t.ticks(S).slice(1))
                          .enter()
                          .append('line')
                          .attr('class', 'horizontal-grid-line')
                          .attr('x1', 1 - q.left)
                          .attr('x2', I)
                          .attr('y1', function(t) {
                            return M(t)
                          })
                          .attr('y2', function(t) {
                            return M(t)
                          })
                    ;('vertical' !== K && 'full' !== K) ||
                      B.select('.grid-lines-group')
                        .selectAll('line.vertical-grid-line')
                        .data(t.ticks(C).slice(1))
                        .enter()
                        .append('line')
                        .attr('class', 'vertical-grid-line')
                        .attr('y1', 0)
                        .attr('y2', P)
                        .attr('x1', function(t) {
                          return _(t)
                        })
                        .attr('x2', function(t) {
                          return _(t)
                        })
                    j
                      ? B.select('.grid-lines-group')
                          .selectAll('line.extended-y-line')
                          .data([0])
                          .enter()
                          .append('line')
                          .attr('class', 'extended-y-line')
                          .attr('y1', q.bottom)
                          .attr('y2', P)
                          .attr('x1', 0)
                          .attr('x2', 0)
                      : B.select('.grid-lines-group')
                          .selectAll('line.extended-x-line')
                          .data([0])
                          .enter()
                          .append('line')
                          .attr('class', 'extended-x-line')
                          .attr('x1', q.left)
                          .attr('x2', I)
                          .attr('y1', P)
                          .attr('y2', P)
                  })(),
                  j
                    ? ((w = r.axisBottom(_).ticks(C, et)), (k = r.axisLeft(M)))
                    : ((w = r.axisBottom(_)), (k = r.axisLeft(M).ticks(S, et))),
                  (function() {
                    j
                      ? (B.select('.x-axis-group .axis.x')
                          .attr('transform', 'translate( 0, ' + P + ' )')
                          .call(w),
                        B.select('.y-axis-group.axis')
                          .attr('transform', 'translate( ' + -q.left + ', 0)')
                          .call(k))
                      : (B.select('.x-axis-group .axis.x')
                          .attr('transform', 'translate( 0, ' + P + ' )')
                          .call(w),
                        B.select('.y-axis-group.axis')
                          .attr('transform', 'translate( ' + -q.left + ', 0)')
                          .call(k)
                          .call(lt))
                    G &&
                      (W && B.selectAll('.y-axis-label-text').remove(),
                      (W = B.select('.y-axis-label')
                        .append('text')
                        .classed('y-axis-label-text', !0)
                        .attr('x', -P / 2)
                        .attr('y', X)
                        .attr('text-anchor', 'middle')
                        .attr('transform', 'rotate(270 0 0)')
                        .text(G)))
                  })(),
                  (function() {
                    H && B.selectAll('.layer').remove()
                    var t = B.select('.chart-group').selectAll('.layer')
                    ;(Z = n.range($, (F.length + 1) * $, $)),
                      j
                        ? ((e = t.data(F)),
                          (r = (H = e
                            .enter()
                            .append('g')
                            .attr('transform', function(t) {
                              var n = t.key
                              return 'translate(0,' + M(n) + ')'
                            })
                            .classed('layer', !0))
                            .selectAll('.bar')
                            .data(function(t) {
                              var n = t.values
                              return n
                            })
                            .enter()
                            .append('rect')
                            .classed('bar', !0)
                            .attr('x', 1)
                            .attr('y', function(t) {
                              return A(at(t))
                            })
                            .attr('height', A.bandwidth())
                            .attr('fill', function(t) {
                              var n = t.group
                              return D[n]
                            })),
                          ot
                            ? r
                                .style('opacity', V)
                                .transition()
                                .delay(function(t, n) {
                                  return Z[n]
                                })
                                .duration(Q)
                                .ease(L)
                                .tween('attr.width', dt)
                            : r.attr('width', function(t) {
                                return _(it(t))
                              }))
                        : (function(t) {
                            var n = t.data(F),
                              e = (H = n
                                .enter()
                                .append('g')
                                .attr('transform', function(t) {
                                  var n = t.key
                                  return 'translate(' + _(n) + ',0)'
                                })
                                .classed('layer', !0))
                                .selectAll('.bar')
                                .data(function(t) {
                                  var n = t.values
                                  return n
                                })
                                .enter()
                                .append('rect')
                                .classed('bar', !0)
                                .attr('x', function(t) {
                                  return b(at(t))
                                })
                                .attr('y', function(t) {
                                  var n = t.value
                                  return M(n)
                                })
                                .attr('width', b.bandwidth)
                                .attr('fill', function(t) {
                                  var n = t.group
                                  return D[n]
                                })
                            ot
                              ? e
                                  .style('opacity', V)
                                  .transition()
                                  .delay(function(t, n) {
                                    return Z[n]
                                  })
                                  .duration(Q)
                                  .ease(L)
                                  .tween('attr.height', pt)
                              : e.attr('height', function(t) {
                                  return P - M(it(t))
                                })
                          })(t)
                    var e, r
                    t.exit()
                      .transition()
                      .style('opacity', 0)
                      .remove()
                  })(),
                  (function() {
                    e > Y &&
                      B.on('mouseover', function(t) {
                        !(function(t, n) {
                          ut.call('customMouseOver', t, n, h.mouse(t))
                        })(this, t)
                      })
                        .on('mouseout', function(t) {
                          !(function(t, n) {
                            B.select('.metadata-group').attr(
                              'transform',
                              'translate(9999, 0)',
                            ),
                              ut.call('customMouseOut', t, n, h.mouse(t))
                          })(this, t)
                        })
                        .on('mousemove', function(n) {
                          var e, r, i, o, u, c, l, s, f, h
                          ;(r = st((e = this))),
                            (i = a(r, 2)),
                            (o = i[0]),
                            (u = i[1]),
                            (c = j ? ht(u) : ft(o)),
                            (l = void 0),
                            (s = void 0),
                            c &&
                              (j
                                ? ((l = o - t.left),
                                  (s = M(c.key) + M.bandwidth() / 2))
                                : ((l = _(c.key) + b(c[nt])),
                                  (s = u - t.bottom)),
                              (f = l),
                              (h = s),
                              B.select('.metadata-group').attr(
                                'transform',
                                'translate(' + f + ',' + h + ')',
                              ),
                              ut.call('customMouseMove', e, c, D, l, s))
                        })
                        .on('click', function(t) {
                          var n, e, r, i, o, u
                          ;(e = st((n = this))),
                            (r = a(e, 2)),
                            (i = r[0]),
                            (o = r[1]),
                            (u = j ? ht(o) : ft(i)),
                            ut.call('customClick', n, u, h.mouse(n))
                        })
                    B.selectAll('.bar')
                      .on('mouseover', function(t) {
                        !(function(t, n) {
                          h.select(t).attr('fill', function() {
                            return o.color(D[n.group]).darker()
                          })
                        })(this, t)
                      })
                      .on('mouseout', function(t) {
                        !(function(t, n) {
                          h.select(t).attr('fill', function() {
                            return D[n.group]
                          })
                        })(this, t)
                      })
                  })()
              })
            }
            function lt(t) {
              t.selectAll('.tick text').attr(
                'transform',
                'translate(' + O.x + ', ' + O.y + ')',
              )
            }
            function st(t) {
              return h.mouse(t)
            }
            function ft(n) {
              var e = n - t.left,
                r = b.bandwidth(),
                i = []
              return (
                F.forEach(function(t) {
                  var n = t.values.find(function(t) {
                    return (
                      Math.abs(e >= _(t[J]) + b(t[nt])) &&
                      Math.abs(e - b(t[nt]) - _(t[J]) <= r)
                    )
                  })
                  n && ((n.values = t.values), (n.key = n.name), i.push(n))
                }),
                i.length ? i[0] : void 0
              )
            }
            function ht(n) {
              var e = n - t.bottom,
                r = M.bandwidth(),
                i = []
              return (
                F.map(function(t) {
                  var n = t.values.find(function(t) {
                    return (
                      Math.abs(e >= M(t[J])) && Math.abs(e - M(t[J]) <= 2 * r)
                    )
                  })
                  n && ((n.values = t.values), (n.key = n.name), i.push(n))
                }),
                i.length ? i[0] : void 0
              )
            }
            function dt(t) {
              var n = h.select(this),
                e = s.interpolateRound(0, _(it(t))),
                r = s.interpolateNumber(0, 1)
              return function(t) {
                n.attr('width', e(t)).style('opacity', r(t))
              }
            }
            function pt(t) {
              var n = h.select(this),
                e = s.interpolateRound(0, P - M(it(t))),
                r = s.interpolateRound(P, M(it(t))),
                i = s.interpolateNumber(0, 1)
              return function(t) {
                n.attr('y', r(t))
                  .attr('height', e(t))
                  .style('opacity', i(t))
              }
            }
            return (
              (ct.aspectRatio = function(t) {
                return arguments.length ? ((T = t), this) : T
              }),
              (ct.colorSchema = function(t) {
                return arguments.length ? ((E = t), this) : E
              }),
              (ct.exportChart = function(t, n) {
                p.call(ct, B, t, n)
              }),
              (ct.groupLabel = function(t) {
                return arguments.length ? ((nt = t), this) : nt
              }),
              (ct.grid = function(t) {
                return arguments.length ? ((K = t), this) : K
              }),
              (ct.height = function(t) {
                return arguments.length
                  ? (T && (e = Math.ceil(t / T)), (m = t), this)
                  : m
              }),
              (ct.isHorizontal = function(t) {
                return arguments.length ? ((j = t), this) : j
              }),
              (ct.isAnimated = function(t) {
                return arguments.length ? ((ot = t), this) : ot
              }),
              (ct.loadingState = function(t) {
                return arguments.length ? ((x = t), this) : x
              }),
              (ct.margin = function(n) {
                return arguments.length ? ((t = i({}, t, n)), this) : t
              }),
              (ct.nameLabel = function(t) {
                return arguments.length ? ((J = t), this) : J
              }),
              (ct.yTicks = function(t) {
                return arguments.length ? ((S = t), this) : S
              }),
              (ct.on = function() {
                var t = ut.on.apply(ut, arguments)
                return t === ut ? ct : t
              }),
              (ct.tooltipThreshold = function(t) {
                return arguments.length ? ((Y = t), this) : Y
              }),
              (ct.valueLabel = function(t) {
                return arguments.length ? ((tt = t), this) : tt
              }),
              (ct.valueLabelFormat = function(t) {
                return arguments.length ? ((et = t), this) : et
              }),
              (ct.width = function(t) {
                return arguments.length
                  ? (T && (m = Math.ceil(t * T)), (e = t), this)
                  : e
              }),
              (ct.xTicks = function(t) {
                return arguments.length ? ((C = t), this) : C
              }),
              (ct.yAxisLabel = function(t) {
                return arguments.length ? ((G = t), this) : G
              }),
              (ct.yAxisLabelOffset = function(t) {
                return arguments.length ? ((X = t), this) : X
              }),
              (ct.yTickTextOffset = function(t) {
                return arguments.length ? ((O = t), this) : O
              }),
              ct
            )
          }
        }.call(n, e, n, t)) || (t.exports = r)
    },
    function(t, n, e) {
      'use strict'
      var r,
        i =
          Object.assign ||
          function(t) {
            for (var n = 1; n < arguments.length; n++) {
              var e = arguments[n]
              for (var r in e)
                Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r])
            }
            return t
          },
        a = (function() {
          return function(t, n) {
            if (Array.isArray(t)) return t
            if (Symbol.iterator in Object(t))
              return (function(t, n) {
                var e = [],
                  r = !0,
                  i = !1,
                  a = void 0
                try {
                  for (
                    var o, u = t[Symbol.iterator]();
                    !(r = (o = u.next()).done) &&
                    (e.push(o.value), !n || e.length !== n);
                    r = !0
                  );
                } catch (t) {
                  ;(i = !0), (a = t)
                } finally {
                  try {
                    !r && u.return && u.return()
                  } finally {
                    if (i) throw a
                  }
                }
                return e
              })(t, n)
            throw new TypeError(
              'Invalid attempt to destructure non-iterable instance',
            )
          }
        })()
      void 0 ===
        (r = function(t) {
          var n = e(1),
            r = e(14),
            o = e(3),
            u = e(18),
            c = e(7),
            l = e(8),
            s = e(4),
            f = e(10),
            h = e(17),
            d = e(0),
            p = e(21),
            g = (e(6), e(11).exportChart),
            v = e(9),
            y = e(12).bar,
            m = function(t) {
              return t.filter(function(t, n, e) {
                return e.indexOf(t) == n
              })
            }
          return function() {
            var t = { top: 40, right: 30, bottom: 60, left: 70 },
              e = 960,
              x = 500,
              _ = y,
              b = void 0,
              w = void 0,
              M = void 0,
              A = void 0,
              k = null,
              T = 0.1,
              O = -8,
              S = -20,
              C = void 0,
              E = 5,
              N = 5,
              D = 1,
              F = v.colorSchemas.britecharts,
              L = void 0,
              j = void 0,
              B = void 0,
              I = l.easeQuadInOut,
              P = !1,
              R = void 0,
              U = void 0,
              H = void 0,
              z = void 0,
              Y = void 0,
              q = void 0,
              G = void 0,
              W = !1,
              X = 480,
              V = void 0,
              $ = void 0,
              Z = -60,
              Q = { top: 0, left: 0, bottom: 0, right: 0 },
              K = 0.24,
              J = 20,
              tt = 1e3,
              nt = void 0,
              et = null,
              rt = 'name',
              it = 'value',
              at = 'stack',
              ot = ',f',
              ut = function(t) {
                return t[rt]
              },
              ct = function(t) {
                return t[it]
              },
              lt = function(t) {
                return t[at]
              },
              st = function(t) {
                return isNaN(t) || t < 0 ? 0 : t
              },
              ft = !1,
              ht = c.dispatch(
                'customMouseOver',
                'customMouseOut',
                'customMouseMove',
                'customClick',
              )
            function dt(i) {
              i.each(function(i) {
                var o, c
                ;(U = e - t.left - t.right),
                  (H = x - t.top - t.bottom),
                  (function(t) {
                    ;(q = m(
                      t.map(function(t) {
                        return t.stack
                      }),
                    )),
                      W && (q = q.reverse())
                    Y = u
                      .nest()
                      .key(ut)
                      .rollup(function(t) {
                        var n = {}
                        return (
                          t.forEach(function(t) {
                            t && t[at] && (n[t[at]] = ct(t))
                          }),
                          (n.values = t),
                          n
                        )
                      })
                      .entries(t)
                      .map(function(t) {
                        return p(
                          {},
                          { total: n.sum(n.permute(t.value, q)), key: t.key },
                          t.value,
                        )
                      })
                  })(
                    (z = i.reduce(function(t, n) {
                      return (
                        (n.value = +n[it]),
                        (n.stack = n[at]),
                        (n.topicName = lt(n)),
                        (n.name = n[rt]),
                        [].concat(
                          (function(t) {
                            if (Array.isArray(t)) {
                              for (
                                var n = 0, e = Array(t.length);
                                n < t.length;
                                n++
                              )
                                e[n] = t[n]
                              return e
                            }
                            return Array.from(t)
                          })(t),
                          [n],
                        )
                      )
                    }, [])),
                  ),
                  (function() {
                    var t = n.max(
                      Y.map(function(t) {
                        return t.total
                      }),
                    )
                    P
                      ? ((b = f
                          .scaleLinear()
                          .domain([0, t])
                          .rangeRound([0, U - 1])),
                        (M = f
                          .scaleBand()
                          .domain(z.map(ut))
                          .rangeRound([H, 0])
                          .padding(T)))
                      : ((b = f
                          .scaleBand()
                          .domain(z.map(ut))
                          .rangeRound([0, U])
                          .padding(T)),
                        (M = f
                          .scaleLinear()
                          .domain([0, t])
                          .rangeRound([H, 0])
                          .nice()))
                    ;(L = f
                      .scaleOrdinal()
                      .range(F)
                      .domain(z.map(lt))),
                      (j = L.domain(z.map(lt))
                        .domain()
                        .reduce(function(t, n) {
                          return (t[n] = L(n)), t
                        }, {}))
                  })(),
                  (o = h.stack().keys(q)),
                  (c = Y.map(function(t) {
                    var n = {}
                    return (
                      q.forEach(function(e) {
                        n[e] = t[e]
                      }),
                      p({}, t, n)
                    )
                  })),
                  (B = o(c)),
                  (function(n) {
                    R ||
                      ((R = d
                        .select(n)
                        .append('svg')
                        .classed('britechart stacked-bar', !0)),
                      (function() {
                        var n = R.append('g')
                          .classed('container-group', !0)
                          .attr(
                            'transform',
                            'translate(' + t.left + ',' + t.top + ')',
                          )
                        n
                          .append('g')
                          .classed('x-axis-group', !0)
                          .append('g')
                          .classed('x axis', !0),
                          n
                            .selectAll('.x-axis-group')
                            .append('g')
                            .classed('month-axis', !0),
                          n.append('g').classed('y-axis-group axis', !0),
                          n.append('g').classed('grid-lines-group', !0),
                          n.append('g').classed('chart-group', !0),
                          n.append('g').classed('y-axis-label', !0),
                          n.append('g').classed('metadata-group', !0)
                      })())
                    R.attr('width', e).attr('height', x)
                  })(this),
                  (function() {
                    var t = P ? b : M
                    R.select('.grid-lines-group')
                      .selectAll('line')
                      .remove(),
                      ('horizontal' === et || 'full' === et) &&
                        R.select('.grid-lines-group')
                          .selectAll('line.horizontal-grid-line')
                          .data(t.ticks(E).slice(1))
                          .enter()
                          .append('line')
                          .attr('class', 'horizontal-grid-line')
                          .attr('x1', 1 - Q.left)
                          .attr('x2', U)
                          .attr('y1', function(t) {
                            return M(t)
                          })
                          .attr('y2', function(t) {
                            return M(t)
                          })
                    ;('vertical' !== et && 'full' !== et) ||
                      R.select('.grid-lines-group')
                        .selectAll('line.vertical-grid-line')
                        .data(t.ticks(N).slice(1))
                        .enter()
                        .append('line')
                        .attr('class', 'vertical-grid-line')
                        .attr('y1', 0)
                        .attr('y2', H)
                        .attr('x1', function(t) {
                          return b(t)
                        })
                        .attr('x2', function(t) {
                          return b(t)
                        })
                    P
                      ? R.select('.grid-lines-group')
                          .selectAll('line.extended-y-line')
                          .data([0])
                          .enter()
                          .append('line')
                          .attr('class', 'extended-y-line')
                          .attr('y1', Q.bottom)
                          .attr('y2', H)
                          .attr('x1', 0)
                          .attr('x2', 0)
                      : R.select('.grid-lines-group')
                          .selectAll('line.extended-x-line')
                          .data([0])
                          .enter()
                          .append('line')
                          .attr('class', 'extended-x-line')
                          .attr('x1', Q.left)
                          .attr('x2', U)
                          .attr('y1', H)
                          .attr('y2', H)
                  })(),
                  P
                    ? ((w = r.axisBottom(b).ticks(N, ot)), (A = r.axisLeft(M)))
                    : ((w = r.axisBottom(b)), (A = r.axisLeft(M).ticks(E, ot))),
                  (function() {
                    P
                      ? (R.select('.x-axis-group .axis.x')
                          .attr('transform', 'translate( 0, ' + H + ' )')
                          .call(w),
                        R.select('.y-axis-group.axis')
                          .attr('transform', 'translate( ' + -Q.left + ', 0)')
                          .call(A))
                      : (R.select('.x-axis-group .axis.x')
                          .attr('transform', 'translate( 0, ' + H + ' )')
                          .call(w),
                        R.select('.y-axis-group.axis')
                          .attr('transform', 'translate( ' + -Q.left + ', 0)')
                          .call(A)
                          .call(pt))
                    V &&
                      ($ && R.selectAll('.y-axis-label-text').remove(),
                      ($ = R.select('.y-axis-label')
                        .append('text')
                        .classed('y-axis-label-text', !0)
                        .attr('x', -H / 2)
                        .attr('y', Z)
                        .attr('text-anchor', 'middle')
                        .attr('transform', 'rotate(270 0 0)')
                        .text(V)))
                  })(),
                  (function() {
                    G && R.selectAll('.layer').remove()
                    var t = R.select('.chart-group').selectAll('.layer')
                    ;(nt = n.range(J, (B[0].length + 1) * J, J)),
                      P
                        ? ((e = t.data(B)),
                          (r = (G = e
                            .enter()
                            .append('g')
                            .attr('fill', function(t) {
                              var n = t.key
                              return j[n]
                            })
                            .classed('layer', !0))
                            .selectAll('.bar')
                            .data(function(t) {
                              return gt(t)
                            })
                            .enter()
                            .append('rect')
                            .classed('bar', !0)
                            .attr('x', function(t) {
                              return b(t[0])
                            })
                            .attr('y', function(t) {
                              return M(t.data.key)
                            })
                            .attr('height', M.bandwidth())),
                          ft
                            ? r
                                .style('opacity', K)
                                .transition()
                                .delay(function(t, n) {
                                  return nt[n]
                                })
                                .duration(tt)
                                .ease(I)
                                .tween('attr.width', bt)
                            : r.attr('width', function(t) {
                                return b(t[1] - t[0])
                              }))
                        : (function(t) {
                            var n = t.data(B),
                              e = (G = n
                                .enter()
                                .append('g')
                                .attr('fill', function(t) {
                                  var n = t.key
                                  return j[n]
                                })
                                .classed('layer', !0))
                                .selectAll('.bar')
                                .data(function(t) {
                                  return gt(t)
                                })
                                .enter()
                                .append('rect')
                                .classed('bar', !0)
                                .attr('x', function(t) {
                                  return b(t.data.key)
                                })
                                .attr('y', function(t) {
                                  return M(t[1])
                                })
                                .attr('width', b.bandwidth)
                            ft
                              ? e
                                  .style('opacity', K)
                                  .transition()
                                  .delay(function(t, n) {
                                    return nt[n]
                                  })
                                  .duration(tt)
                                  .ease(I)
                                  .tween('attr.height', wt)
                              : e.attr('height', function(t) {
                                  return M(t[0]) - M(t[1])
                                })
                          })(t)
                    var e, r
                    t.exit()
                      .transition()
                      .style('opacity', 0)
                      .remove()
                  })(),
                  (function() {
                    e > X &&
                      R.on('mouseover', function(t) {
                        !(function(t, n) {
                          ht.call('customMouseOver', t, n, d.mouse(t))
                        })(this, t)
                      })
                        .on('mouseout', function(t) {
                          !(function(t, n) {
                            R.select('.metadata-group').attr(
                              'transform',
                              'translate(9999, 0)',
                            ),
                              ht.call('customMouseOut', t, n, d.mouse(t))
                          })(this, t)
                        })
                        .on('mousemove', function(n) {
                          var e, r, i, o, u, c, l, s, f, h
                          ;(r = vt((e = this))),
                            (i = a(r, 2)),
                            (o = i[0]),
                            (u = i[1]),
                            (c = P ? mt(u) : yt(o)),
                            (l = void 0),
                            (s = void 0),
                            c &&
                              (P
                                ? ((l = o - t.left),
                                  (s = M(c.key) + M.bandwidth() / 2))
                                : ((l = b(c.key) + t.left), (s = u - t.bottom)),
                              (f = l),
                              (h = s),
                              R.select('.metadata-group').attr(
                                'transform',
                                'translate(' + f + ',' + h + ')',
                              ),
                              ht.call('customMouseMove', e, c, j, l, s))
                        })
                        .on('click', function(t) {
                          var n, e, r, i, o, u
                          ;(e = vt((n = this))),
                            (r = a(e, 2)),
                            (i = r[0]),
                            (o = r[1]),
                            (u = P ? mt(o) : yt(i)),
                            ht.call('customClick', n, u, d.mouse(n))
                        })
                    R.selectAll('.bar')
                      .on('mouseover', xt)
                      .on('mouseout', _t)
                  })()
              })
            }
            function pt(t) {
              t.selectAll('.tick text').attr(
                'transform',
                'translate(' + S + ', ' + O + ')',
              )
            }
            function gt(t) {
              return t.map(function(t) {
                for (var n = 0; n < t.length; n++) t[n] = st(t[n])
                return t
              })
            }
            function vt(t) {
              return d.mouse(t)
            }
            function yt(n) {
              var e = n - t.left
              return Y.find(function(t) {
                var n = t.key,
                  r = b(n),
                  i = r + b.bandwidth()
                return e >= r && e < i
              })
            }
            function mt(n) {
              var e = n - t.top
              return Y.find(function(t) {
                var n = t.key,
                  r = M(n),
                  i = r + M.bandwidth()
                return e >= r && e < i
              })
            }
            function xt() {
              var t = this
              d.select(this).attr('fill', function() {
                return o.color(d.select(t.parentNode).attr('fill')).darker()
              })
            }
            function _t() {
              var t = this
              d.select(this).attr('fill', function() {
                return d.select(t.parentNode).attr('fill')
              })
            }
            function bt(t) {
              var n = d.select(this),
                e = s.interpolateRound(0, b(t[1] - t[0])),
                r = s.interpolateNumber(0, 1)
              return function(t) {
                n.attr('width', e(t)).style('opacity', r(t))
              }
            }
            function wt(t) {
              var n = M(t[0]) - M(t[1]),
                e = d.select(this),
                r = s.interpolateRound(0, st(n)),
                i = s.interpolateNumber(0, 1)
              return function(t) {
                e.attr('height', r(t)).style('opacity', i(t))
              }
            }
            return (
              (dt.aspectRatio = function(t) {
                return arguments.length ? ((k = t), this) : k
              }),
              (dt.betweenBarsPadding = function(t) {
                return arguments.length ? ((T = t), this) : T
              }),
              (dt.colorSchema = function(t) {
                return arguments.length ? ((F = t), this) : F
              }),
              (dt.exportChart = function(t, n) {
                g.call(dt, R, t, n)
              }),
              (dt.grid = function(t) {
                return arguments.length ? ((et = t), this) : et
              }),
              (dt.hasPercentage = function(t) {
                return arguments.length
                  ? ((ot = t ? '%' : ',f'), this)
                  : '%' === ot
              }),
              (dt.height = function(t) {
                return arguments.length
                  ? (k && (e = Math.ceil(t / k)), (x = t), this)
                  : x
              }),
              (dt.isHorizontal = function(t) {
                return arguments.length ? ((P = t), this) : P
              }),
              (dt.hasReversedStacks = function(t) {
                return arguments.length ? ((W = t), this) : W
              }),
              (dt.isAnimated = function(t) {
                return arguments.length ? ((ft = t), this) : ft
              }),
              (dt.locale = function(t) {
                return arguments.length ? ((C = t), this) : C
              }),
              (dt.margin = function(n) {
                return arguments.length ? ((t = i({}, t, n)), this) : t
              }),
              (dt.nameLabel = function(t) {
                return arguments.length ? ((rt = t), this) : rt
              }),
              (dt.xTicks = function(t) {
                return arguments.length ? ((N = t), this) : N
              }),
              (dt.yTicks = function(t) {
                return arguments.length ? ((E = t), this) : E
              }),
              (dt.loadingState = function(t) {
                return arguments.length ? ((_ = t), this) : _
              }),
              (dt.on = function() {
                var t = ht.on.apply(ht, arguments)
                return t === ht ? dt : t
              }),
              (dt.percentageAxisToMaxRatio = function(t) {
                return arguments.length ? ((D = t), this) : D
              }),
              (dt.stackLabel = function(t) {
                return arguments.length ? ((at = t), this) : at
              }),
              (dt.tooltipThreshold = function(t) {
                return arguments.length ? ((X = t), this) : X
              }),
              (dt.valueLabel = function(t) {
                return arguments.length ? ((it = t), this) : it
              }),
              (dt.valueLabelFormat = function(t) {
                return arguments.length ? ((ot = t), this) : ot
              }),
              (dt.width = function(t) {
                return arguments.length
                  ? (k && (x = Math.ceil(t * k)), (e = t), this)
                  : e
              }),
              (dt.yAxisLabel = function(t) {
                return arguments.length ? ((V = t), this) : V
              }),
              (dt.yAxisLabelOffset = function(t) {
                return arguments.length ? ((Z = t), this) : Z
              }),
              dt
            )
          }
        }.call(n, e, n, t)) || (t.exports = r)
    },
    function(t, n, e) {
      'use strict'
      var r,
        i =
          Object.assign ||
          function(t) {
            for (var n = 1; n < arguments.length; n++) {
              var e = arguments[n]
              for (var r in e)
                Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r])
            }
            return t
          }
      void 0 ===
        (r = function(t) {
          var n = e(1),
            r = e(0),
            a = e(10),
            o = (e(6), e(4)),
            u = e(11).exportChart,
            c = e(9)
          return function() {
            var t = { top: 40, right: 20, bottom: 20, left: 40 },
              e = 780,
              l = 270,
              s = void 0,
              f = void 0,
              h = void 0,
              d = 30,
              p = 2,
              g = 0.2,
              v = 1,
              y = '#BBBBBB',
              m = '#FFFFFF',
              x = void 0,
              _ = c.colorSchemas.red,
              b = 2e3,
              w = void 0,
              M = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
              A = 30,
              k = [
                '00h',
                '01h',
                '02h',
                '03h',
                '04h',
                '05h',
                '06h',
                '07h',
                '08h',
                '09h',
                '10h',
                '11h',
                '12h',
                '13h',
                '14h',
                '15h',
                '16h',
                '17h',
                '18h',
                '19h',
                '20h',
                '21h',
                '22h',
                '23h',
              ],
              T = 20,
              O = function(t) {
                return t.value
              }
            function S(i) {
              i.each(function(i) {
                var u, c
                ;(f = i.reduce(function(t, n) {
                  var e = n.day,
                    r = n.hour,
                    i = n.value
                  return [].concat(
                    (function(t) {
                      if (Array.isArray(t)) {
                        for (var n = 0, e = Array(t.length); n < t.length; n++)
                          e[n] = t[n]
                        return e
                      }
                      return Array.from(t)
                    })(t),
                    [{ day: +e, hour: +r, value: +i }],
                  )
                }, [])),
                  e - t.left - t.right,
                  l - t.top - t.bottom,
                  (x = a
                    .scaleLinear()
                    .range([_[0], _[_.length - 1]])
                    .domain(n.extent(f, O))
                    .interpolate(o.interpolateHcl)),
                  (function(n) {
                    s ||
                      ((s = r
                        .select(n)
                        .append('svg')
                        .classed('britechart heatmap', !0)),
                      (function() {
                        var n = s
                          .append('g')
                          .classed('container-group', !0)
                          .attr(
                            'transform',
                            'translate(' + t.left + ', ' + t.top + ')',
                          )
                        n.append('g').classed('chart-group', !0),
                          n.append('g').classed('day-labels-group', !0),
                          n.append('g').classed('hour-labels-group', !0),
                          n.append('g').classed('metadata-group', !0)
                      })())
                    s.attr('width', e).attr('height', l)
                  })(this),
                  (u = s.select('.day-labels-group')),
                  s
                    .select('.day-labels-group')
                    .selectAll('.day-label')
                    .data(M)
                    .enter()
                    .append('text')
                    .text(function(t) {
                      return t
                    })
                    .attr('x', 0)
                    .attr('y', function(t, n) {
                      return n * d
                    })
                    .style('text-anchor', 'start')
                    .style('dominant-baseline', 'central')
                    .attr('class', 'day-label'),
                  u.attr('transform', 'translate(-' + A + ', ' + d / 2 + ')'),
                  (c = s.select('.hour-labels-group')),
                  s
                    .select('.hour-labels-group')
                    .selectAll('.hour-label')
                    .data(k)
                    .enter()
                    .append('text')
                    .text(function(t) {
                      return t
                    })
                    .attr('y', 0)
                    .attr('x', function(t, n) {
                      return n * d
                    })
                    .style('text-anchor', 'middle')
                    .style('dominant-baseline', 'central')
                    .attr('class', 'hour-label'),
                  c.attr('transform', 'translate(' + d / 2 + ', -' + T + ')'),
                  (h = s
                    .select('.chart-group')
                    .selectAll('.box')
                    .data(f))
                    .enter()
                    .append('rect')
                    .classed('box', !0)
                    .attr('width', d)
                    .attr('height', d)
                    .attr('x', function(t) {
                      var n = t.hour
                      return n * d
                    })
                    .attr('y', function(t) {
                      var n = t.day
                      return n * d
                    })
                    .style('opacity', g)
                    .style('fill', y)
                    .style('stroke', m)
                    .style('stroke-width', p)
                    .transition()
                    .duration(b)
                    .style('fill', function(t) {
                      var n = t.value
                      return x(n)
                    })
                    .style('opacity', v),
                  h.exit().remove()
              })
            }
            return (
              (S.boxSize = function(t) {
                return arguments.length ? ((d = t), this) : d
              }),
              (S.colorSchema = function(t) {
                return arguments.length ? ((_ = t), this) : _
              }),
              (S.exportChart = function(t, n) {
                u.call(S, s, t, n)
              }),
              (S.yAxisLabels = function(t) {
                return arguments.length ? ((w = t), this) : w
              }),
              (S.height = function(t) {
                return arguments.length ? ((l = t), this) : l
              }),
              (S.margin = function(n) {
                return arguments.length ? ((t = i({}, t, n)), this) : t
              }),
              (S.width = function(t) {
                return arguments.length ? ((e = t), this) : e
              }),
              S
            )
          }
        }.call(n, e, n, t)) || (t.exports = r)
    },
    function(t, n, e) {
      'use strict'
      var r,
        i =
          Object.assign ||
          function(t) {
            for (var n = 1; n < arguments.length; n++) {
              var e = arguments[n]
              for (var r in e)
                Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r])
            }
            return t
          }
      void 0 ===
        (r = function(t) {
          var n = e(1),
            r = e(14),
            a = e(7),
            o = e(8),
            u = e(5),
            c = e(10),
            l = e(0),
            s = (e(6), e(11).exportChart),
            f = e(12).line
          return function() {
            var t = { top: 20, right: 20, bottom: 30, left: 40 },
              e = 960,
              h = 500,
              d = f,
              p = o.easeQuadInOut,
              g = void 0,
              v = void 0,
              y = void 0,
              m = void 0,
              x = void 0,
              _ = 6,
              b = void 0,
              w = void 0,
              M = void 0,
              A = void 0,
              k = void 0,
              T = void 0,
              O = 80,
              S = -20,
              C = { top: 0, left: 0, bottom: 0, right: 0 },
              E = 8,
              N = void 0,
              D = 'value',
              F = 'key',
              L = void 0,
              j = void 0,
              B = a.dispatch(
                'customMouseOver',
                'customMouseOut',
                'customMouseMove',
              ),
              I = u.format('.3'),
              P = function(t) {
                return t.key
              },
              R = function(t) {
                return t.value
              }
            function U(i) {
              i.each(function(i) {
                var a
                ;(v = e - t.left - t.right),
                  (y = h - t.top - t.bottom),
                  (g = i.reduce(function(t, n) {
                    return (
                      (n.value = +n[D]),
                      (n.key = String(n[F])),
                      [].concat(
                        (function(t) {
                          if (Array.isArray(t)) {
                            for (
                              var n = 0, e = Array(t.length);
                              n < t.length;
                              n++
                            )
                              e[n] = t[n]
                            return e
                          }
                          return Array.from(t)
                        })(t),
                        [n],
                      )
                    )
                  }, [])),
                  (m = c
                    .scaleBand()
                    .domain(g.map(P))
                    .rangeRound([0, v])
                    .paddingInner(0)),
                  (x = c
                    .scaleLinear()
                    .domain([0, n.max(g, R)])
                    .rangeRound([y, 0])),
                  (b = r.axisBottom(m)),
                  (A = r
                    .axisLeft(x)
                    .ticks(_)
                    .tickPadding(E)
                    .tickFormat(I)),
                  (function(n) {
                    N ||
                      ((N = l
                        .select(n)
                        .append('svg')
                        .classed('britechart step-chart', !0)),
                      (function() {
                        var n = N.append('g')
                          .classed('container-group', !0)
                          .attr(
                            'transform',
                            'translate(' + t.left + ', ' + t.top + ')',
                          )
                        n.append('g').classed('grid-lines-group', !0),
                          n.append('g').classed('chart-group', !0),
                          n
                            .append('g')
                            .classed('x-axis-group axis', !0)
                            .append('g')
                            .classed('x-axis-label', !0),
                          n
                            .append('g')
                            .classed('y-axis-group axis', !0)
                            .append('g')
                            .classed('y-axis-label', !0),
                          n.append('g').classed('metadata-group', !0)
                      })())
                    N.attr('width', e).attr('height', h)
                  })(this),
                  (function() {
                    L && N.selectAll('.horizontal-grid-line').remove()
                    j && N.selectAll('.extended-x-line').remove()
                    ;(L = N.select('.grid-lines-group')
                      .selectAll('line.horizontal-grid-line')
                      .data(x.ticks(_))
                      .enter()
                      .append('line')
                      .attr('class', 'horizontal-grid-line')
                      .attr('x1', C.left)
                      .attr('x2', v)
                      .attr('y1', function(t) {
                        return x(t)
                      })
                      .attr('y2', function(t) {
                        return x(t)
                      })),
                      j && N.selectAll('.extended-x-line').remove()
                    j = N.select('.grid-lines-group')
                      .selectAll('line.extended-x-line')
                      .data([0])
                      .enter()
                      .append('line')
                      .attr('class', 'extended-x-line')
                      .attr('x1', C.left)
                      .attr('x2', v)
                      .attr('y1', y)
                      .attr('y2', y)
                  })(),
                  (a = N.select('.chart-group')
                    .selectAll('.step')
                    .data(g))
                    .enter()
                    .append('rect')
                    .classed('step', !0)
                    .attr('x', v)
                    .attr('y', function(t) {
                      var n = t.value
                      return x(n)
                    })
                    .attr('width', m.bandwidth())
                    .attr('height', function(t) {
                      return y - x(t.value)
                    })
                    .on('mouseover', function(t) {
                      !(function(t, n, e, r) {
                        B.call('customMouseOver', t, n, l.mouse(t), [e, r])
                      })(this, t, v, y)
                    })
                    .on('mousemove', function(t) {
                      !(function(t, n, e, r) {
                        B.call('customMouseMove', t, n, l.mouse(t), [e, r])
                      })(this, t, v, y)
                    })
                    .on('mouseout', function(t) {
                      !(function(t, n, e, r) {
                        B.call('customMouseOut', t, n, l.mouse(t), [e, r])
                      })(this, t, v, y)
                    })
                    .merge(a)
                    .transition()
                    .ease(p)
                    .attr('x', function(t) {
                      var n = t.key
                      return m(n)
                    })
                    .attr('y', function(t) {
                      return x(t.value)
                    })
                    .attr('width', m.bandwidth())
                    .attr('height', function(t) {
                      return y - x(t.value)
                    }),
                  a
                    .exit()
                    .transition()
                    .style('opacity', 0)
                    .remove(),
                  (function() {
                    N.select('.x-axis-group.axis')
                      .attr('transform', 'translate(0, ' + y + ')')
                      .call(b),
                      N.selectAll('.x-axis-group .tick text')
                        .style('text-anchor', 'start')
                        .attr('transform', 'rotate(45 -1 10)'),
                      w &&
                        (M && N.selectAll('.x-axis-label-text').remove(),
                        (M = N.select('.x-axis-label')
                          .append('text')
                          .attr('y', O)
                          .attr('text-anchor', 'middle')
                          .classed('x-axis-label-text', !0)
                          .attr('x', v / 2)
                          .text(w)))
                    N.select('.y-axis-group.axis').call(A),
                      k &&
                        (T && N.selectAll('.y-axis-label-text').remove(),
                        (T = N.select('.y-axis-label')
                          .append('text')
                          .classed('y-axis-label-text', !0)
                          .attr('x', -y / 2)
                          .attr('y', S)
                          .attr('text-anchor', 'middle')
                          .attr('transform', 'rotate(270 0 0)')
                          .text(k)))
                  })()
              })
            }
            return (
              (U.exportChart = function(t) {
                s.call(U, N, t)
              }),
              (U.margin = function(n) {
                return arguments.length ? ((t = i({}, t, n)), this) : t
              }),
              (U.yTicks = function(t) {
                return arguments.length ? ((_ = t), this) : _
              }),
              (U.height = function(t) {
                return arguments.length ? ((h = t), this) : h
              }),
              (U.loadingState = function(t) {
                return arguments.length ? ((d = t), this) : d
              }),
              (U.on = function() {
                var t = B.on.apply(B, arguments)
                return t === B ? U : t
              }),
              (U.width = function(t) {
                return arguments.length ? ((e = t), this) : e
              }),
              (U.xAxisLabel = function(t) {
                return arguments.length ? ((w = t), this) : w
              }),
              (U.xAxisLabelOffset = function(t) {
                return arguments.length ? ((O = t), this) : O
              }),
              (U.yAxisLabel = function(t) {
                return arguments.length ? ((k = t), this) : k
              }),
              (U.yAxisLabelOffset = function(t) {
                return arguments.length ? ((S = t), this) : S
              }),
              U
            )
          }
        }.call(n, e, n, t)) || (t.exports = r)
    },
    function(t, n, e) {
      'use strict'
      var r,
        i =
          Object.assign ||
          function(t) {
            for (var n = 1; n < arguments.length; n++) {
              var e = arguments[n]
              for (var r in e)
                Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r])
            }
            return t
          }
      function a(t) {
        if (Array.isArray(t)) {
          for (var n = 0, e = Array(t.length); n < t.length; n++) e[n] = t[n]
          return e
        }
        return Array.from(t)
      }
      void 0 ===
        (r = function(t) {
          var n = e(1),
            r = e(14),
            o = e(43),
            u = e(8),
            c = e(10),
            l = e(17),
            s = e(7),
            f = e(0),
            h = (e(2), e(6), e(13)),
            d = e(9),
            p = e(20),
            g = e(15),
            v = g.axisTimeCombinations,
            y = g.timeIntervals,
            m = e(16).uniqueId,
            x = e(12).line
          return function() {
            var t = { top: 20, right: 20, bottom: 30, left: 20 },
              e = 960,
              g = 500,
              _ = x,
              b = void 0,
              w = void 0,
              M = (u.easeQuadOut, 'date'),
              A = 'value',
              k = [null, null],
              T = void 0,
              O = void 0,
              S = void 0,
              C = void 0,
              E = void 0,
              N = null,
              D = null,
              F = null,
              L = void 0,
              j = void 0,
              B = void 0,
              I = void 0,
              P = 5,
              R = void 0,
              U = d.colorGradients.greenBlue,
              H = m('brush-area-gradient'),
              z = 'timeDay',
              Y = s.dispatch('customBrushStart', 'customBrushEnd'),
              q = function(t) {
                return t.value
              },
              G = function(t) {
                return t.date
              }
            function W(i) {
              i.each(function(i) {
                var u, s, v
                ;(T = e - t.left - t.right),
                  (O = g - t.top - t.bottom),
                  (s = i),
                  (u = JSON.parse(JSON.stringify(s))),
                  (b = u.reduce(function(t, n) {
                    return (
                      (n.date = new Date(n[M])),
                      (n.value = +n[A]),
                      [].concat(a(t), [n])
                    )
                  }, [])),
                  (S = c
                    .scaleTime()
                    .domain(n.extent(b, G))
                    .range([0, T])),
                  (C = c
                    .scaleLinear()
                    .domain([0, n.max(b, q)])
                    .range([O, 0])),
                  (function() {
                    var t = void 0
                    if ('custom' === N && 'string' == typeof F)
                      t = { tick: D, format: h.timeFormat(F) }
                    else {
                      var n = p.getTimeSeriesAxis(b, e, N)
                      ;(t = n.minor), n.major
                    }
                    E = r
                      .axisBottom(S)
                      .ticks(t.tick)
                      .tickSize(10, 0)
                      .tickPadding([P])
                      .tickFormat(t.format)
                  })(),
                  (function(n) {
                    w ||
                      ((w = f
                        .select(n)
                        .append('svg')
                        .classed('britechart brush-chart', !0)),
                      (function() {
                        var n = w
                          .append('g')
                          .classed('container-group', !0)
                          .attr(
                            'transform',
                            'translate(' + t.left + ', ' + t.top + ')',
                          )
                        n.append('g').classed('chart-group', !0),
                          n
                            .append('g')
                            .classed('x-axis-group', !0)
                            .append('g')
                            .classed('x axis', !0),
                          n.append('g').classed('brush-group', !0),
                          n.append('g').classed('metadata-group', !0)
                      })())
                    w.attr('width', e).attr('height', g)
                  })(this),
                  R ||
                    (R = w
                      .select('.metadata-group')
                      .append('linearGradient')
                      .attr('id', H)
                      .attr('gradientUnits', 'userSpaceOnUse')
                      .attr('x1', 0)
                      .attr('x2', S(b[b.length - 1].date))
                      .attr('y1', 0)
                      .attr('y2', 0)
                      .selectAll('stop')
                      .data([
                        { offset: '0%', color: U[0] },
                        { offset: '100%', color: U[1] },
                      ])
                      .enter()
                      .append('stop')
                      .attr('offset', function(t) {
                        var n = t.offset
                        return n
                      })
                      .attr('stop-color', function(t) {
                        var n = t.color
                        return n
                      })),
                  (j = o
                    .brushX()
                    .extent([
                      [0, 0],
                      [T, O],
                    ])
                    .on('brush', X)
                    .on('end', V)),
                  (function() {
                    I && w.selectAll('.brush-area').remove()
                    ;(I = l
                      .area()
                      .x(function(t) {
                        var n = t.date
                        return S(n)
                      })
                      .y0(O)
                      .y1(function(t) {
                        var n = t.value
                        return C(n)
                      })
                      .curve(l.curveBasis)),
                      w
                        .select('.chart-group')
                        .append('path')
                        .datum(b)
                        .attr('class', 'brush-area')
                        .attr('d', I)
                  })(),
                  w
                    .select('.x-axis-group .axis.x')
                    .attr('transform', 'translate(0, ' + O + ')')
                    .call(E),
                  (B = w.select('.brush-group').call(j))
                    .selectAll('rect')
                    .classed('brush-rect', !0)
                    .attr('height', O),
                  B.selectAll('.selection').attr('fill', 'url(#' + H + ')'),
                  (v = d.colorSchemasHuman.grey[1]),
                  B.selectAll('.handle.brush-rect').style('fill', v)
              })
            }
            function X() {
              var t = f.event.selection
              t && Y.call('customBrushStart', this, t.map(S.invert))
            }
            function V() {
              if (f.event.sourceEvent) {
                var t = [null, null],
                  n = f.event.selection
                if (n) {
                  var e = n.map(S.invert)
                  ;(t = e.map(y[z].round))[0] >= t[1] &&
                    ((t[0] = y[z].floor(e[0])), (t[1] = y[z].offset(t[0]))),
                    f
                      .select(this)
                      .transition()
                      .call(f.event.target.move, t.map(S))
                }
                Y.call('customBrushEnd', this, t)
              }
            }
            return (
              (W.axisTimeCombinations = v),
              (W.dateRange = function(t) {
                return arguments.length
                  ? ((k = t),
                    Array.isArray(k) &&
                      function(t, n) {
                        var e = null
                        null !== t && (e = [S(new Date(t)), S(new Date(n))]),
                          j.move(B, e)
                      }.apply(void 0, a(k)),
                    this)
                  : k
              }),
              (W.gradient = function(t) {
                return arguments.length ? ((U = t), this) : U
              }),
              (W.height = function(t) {
                return arguments.length ? ((g = t), this) : g
              }),
              (W.loadingState = function(t) {
                return arguments.length ? ((_ = t), this) : _
              }),
              (W.locale = function(t) {
                return arguments.length ? ((L = t), this) : L
              }),
              (W.margin = function(n) {
                return arguments.length ? ((t = i({}, t, n)), this) : t
              }),
              (W.on = function() {
                var t = Y.on.apply(Y, arguments)
                return t === Y ? W : t
              }),
              (W.width = function(t) {
                return arguments.length ? ((e = t), this) : e
              }),
              (W.xAxisCustomFormat = function(t) {
                return arguments.length ? ((F = t), this) : F
              }),
              (W.xAxisFormat = function(t) {
                return arguments.length ? ((N = t), this) : N
              }),
              (W.xTicks = function(t) {
                return arguments.length ? ((D = t), this) : D
              }),
              (W.roundingTimeInterval = function(t) {
                return arguments.length ? ((z = t), this) : z
              }),
              W
            )
          }
        }.call(n, e, n, t)) || (t.exports = r)
    },
    function(t, n, e) {
      'use strict'
      var r,
        i =
          Object.assign ||
          function(t) {
            for (var n = 1; n < arguments.length; n++) {
              var e = arguments[n]
              for (var r in e)
                Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r])
            }
            return t
          }
      void 0 ===
        (r = function(t) {
          e(1)
          var n = e(8),
            r = e(14),
            a = (e(3), e(7), e(5)),
            o = e(10),
            u = e(0),
            c = (e(6), e(11).exportChart),
            l = e(9)
          return function() {
            var t = { top: 20, right: 20, bottom: 30, left: 20 },
              e = 960,
              s = 150,
              f = void 0,
              h = void 0,
              d = void 0,
              p = void 0,
              g = 0.2,
              v = void 0,
              y = 0.3,
              m = l.colorSchemas.britecharts,
              x = void 0,
              _ = void 0,
              b = '',
              w = null,
              M = 6,
              A = 5,
              k = void 0,
              T = 5,
              O = 0.5,
              S = 5,
              C = void 0,
              E = !1,
              N = void 0,
              D = void 0,
              F = void 0,
              L = void 0,
              j = 100,
              B = void 0,
              I = void 0,
              P = void 0,
              R = void 0,
              U = 15,
              H = [],
              z = [],
              Y = [],
              q = void 0,
              G =
                (n.easeQuadInOut,
                function() {
                  return B || I
                }),
              W = function() {
                return h / 3
              }
            function X(n) {
              n.each(function(n) {
                var i, c, l, w, X, V
                ;(f = e - t.left - t.right),
                  (h = s - t.top - t.bottom),
                  (c = {
                    ranges: (i = n).ranges
                      .slice()
                      .sort()
                      .reverse(),
                    measures: i.measures
                      .slice()
                      .sort()
                      .reverse(),
                    markers: i.markers
                      .slice()
                      .sort()
                      .reverse(),
                    subtitle: i.subtitle,
                    title: i.title,
                  }),
                  (B = c.title),
                  (P = c.subtitle),
                  (H = c.ranges),
                  (Y = c.measures),
                  (z = c.markers),
                  c,
                  G() && (f -= j),
                  (l = E ? [f, 0] : [0, f]),
                  (d = o
                    .scaleLinear()
                    .domain([0, Math.max(H[0], z[0], Y[0])])
                    .rangeRound(l)
                    .nice()),
                  (X = (w = d)(0)),
                  (C = function(t) {
                    return Math.abs(w(t) - X)
                  }),
                  (p = H.map(function(t, n) {
                    return O - n * g
                  }).reverse()),
                  (v = H.map(function(t, n) {
                    return 0.9 - n * y
                  }).reverse()),
                  (x = m[0]),
                  (_ = m[1]),
                  (function(n) {
                    q ||
                      ((q = u
                        .select(n)
                        .append('svg')
                        .classed('britechart bullet-chart', !0)),
                      (function() {
                        var n = q
                          .append('g')
                          .classed('container-group', !0)
                          .attr(
                            'transform',
                            'translate(' + t.left + ', ' + t.top + ')',
                          )
                        n.append('g').classed('grid-lines-group', !0),
                          n.append('g').classed('chart-group', !0),
                          n.append('g').classed('axis-group', !0),
                          n.append('g').classed('metadata-group', !0),
                          G() &&
                            n
                              .selectAll('.chart-group')
                              .attr('transform', 'translate(' + j + ', 0)')
                      })())
                    q.attr('width', e).attr('height', s)
                  })(this),
                  (k = r
                    .axisBottom(d)
                    .ticks(M)
                    .tickPadding(A)
                    .tickFormat(a.format(b))),
                  (function() {
                    D && (D.remove(), F.remove(), L.remove())
                    ;(D = q
                      .select('.chart-group')
                      .selectAll('rect.range')
                      .data(H)
                      .enter()
                      .append('rect')
                      .attr('fill', x)
                      .attr('opacity', function(t, n) {
                        return p[n]
                      })
                      .attr('class', function(t, n) {
                        return 'range r' + n
                      })
                      .attr('width', C)
                      .attr('height', h)
                      .attr('x', E ? d : 0)),
                      (F = q
                        .select('.chart-group')
                        .selectAll('rect.measure')
                        .data(Y)
                        .enter()
                        .append('rect')
                        .attr('fill', _)
                        .attr('fill-opacity', function(t, n) {
                          return v[n]
                        })
                        .attr('class', function(t, n) {
                          return 'measure m' + n
                        })
                        .attr('width', C)
                        .attr('height', W)
                        .attr('x', E ? d : 0)
                        .attr('y', W)),
                      (L = q
                        .select('.chart-group')
                        .selectAll('line.marker-line')
                        .data(z)
                        .enter()
                        .append('line')
                        .attr('class', 'marker-line')
                        .attr('stroke', _)
                        .attr('stroke-width', S)
                        .attr('opacity', v[0])
                        .attr('x1', d)
                        .attr('x2', d)
                        .attr('y1', 0)
                        .attr('y2', h))
                  })(),
                  G() &&
                    (N && N.remove(),
                    (N = q
                      .select('.metadata-group')
                      .append('g')
                      .classed('legend-group', !0)
                      .attr('transform', 'translate(0, ' + h / 2 + ')')),
                    I && (B = I),
                    N.selectAll('text.bullet-title')
                      .data([1])
                      .enter()
                      .append('text')
                      .attr('class', 'bullet-title x-axis-label')
                      .text(B),
                    (P || R) &&
                      (R && (P = R),
                      N.selectAll('text.bullet-subtitle')
                        .data([1])
                        .enter()
                        .append('text')
                        .attr('class', 'bullet-subtitle x-axis-label')
                        .attr('y', U)
                        .text(P))),
                  (V = G() ? j : 0),
                  q
                    .select('.axis-group')
                    .attr('transform', 'translate(' + V + ', ' + (h + T) + ')')
                    .call(k),
                  q
                    .select('.axis-group')
                    .selectAll('line.extended-x-line')
                    .data([0])
                    .enter()
                    .append('line')
                    .attr('class', 'extended-x-line')
                    .attr('x1', 0)
                    .attr('x2', f)
              })
            }
            return (
              (X.aspectRatio = function(t) {
                return arguments.length ? ((w = t), this) : w
              }),
              (X.colorSchema = function(t) {
                return arguments.length ? ((m = t), this) : m
              }),
              (X.customTitle = function(t) {
                return arguments.length ? ((I = t), this) : I
              }),
              (X.customSubtitle = function(t) {
                return arguments.length ? ((R = t), this) : R
              }),
              (X.exportChart = function(t, n) {
                c.call(X, q, t, n)
              }),
              (X.height = function(t) {
                return arguments.length
                  ? (w && (e = Math.ceil(t / w)), (s = t), this)
                  : s
              }),
              (X.isReverse = function(t) {
                return arguments.length ? ((E = t), this) : E
              }),
              (X.margin = function(n) {
                return arguments.length ? ((t = i({}, t, n)), this) : t
              }),
              (X.numberFormat = function(t) {
                return arguments.length ? ((b = t), this) : b
              }),
              (X.paddingBetweenAxisAndChart = function(t) {
                return arguments.length ? ((T = t), this) : T
              }),
              (X.startMaxRangeOpacity = function(t) {
                return arguments.length ? ((O = t), this) : O
              }),
              (X.ticks = function(t) {
                return arguments.length ? ((M = t), this) : M
              }),
              (X.width = function(t) {
                return arguments.length
                  ? (w && (s = Math.ceil(t * w)), (e = t), this)
                  : e
              }),
              X
            )
          }
        }.call(n, e, n, t)) || (t.exports = r)
    },
    function(t, n, e) {
      'use strict'
      e.r(n)
      var r = e(7),
        i = e(0)
      var a = function() {
          i.event.preventDefault(), i.event.stopImmediatePropagation()
        },
        o = function(t) {
          var n = t.document.documentElement,
            e = Object(i.select)(t).on('dragstart.drag', a, !0)
          'onselectstart' in n
            ? e.on('selectstart.drag', a, !0)
            : ((n.__noselect = n.style.MozUserSelect),
              (n.style.MozUserSelect = 'none'))
        }
      function u(t, n) {
        var e = t.document.documentElement,
          r = Object(i.select)(t).on('dragstart.drag', null)
        n &&
          (r.on('click.drag', a, !0),
          setTimeout(function() {
            r.on('click.drag', null)
          }, 0)),
          'onselectstart' in e
            ? r.on('selectstart.drag', null)
            : ((e.style.MozUserSelect = e.__noselect), delete e.__noselect)
      }
      function c(t, n, e, r, i, a, o, u, c, l) {
        ;(this.target = t),
          (this.type = n),
          (this.subject = e),
          (this.identifier = r),
          (this.active = i),
          (this.x = a),
          (this.y = o),
          (this.dx = u),
          (this.dy = c),
          (this._ = l)
      }
      c.prototype.on = function() {
        var t = this._.on.apply(this._, arguments)
        return t === this._ ? this : t
      }
      var l = e(4),
        s = e(6),
        f = function(t) {
          return function() {
            return t
          }
        },
        h = function(t, n, e) {
          ;(this.target = t), (this.type = n), (this.selection = e)
        }
      function d() {
        i.event.stopImmediatePropagation()
      }
      var p = function() {
          i.event.preventDefault(), i.event.stopImmediatePropagation()
        },
        g = { name: 'drag' },
        v = { name: 'space' },
        y = { name: 'handle' },
        m = { name: 'center' },
        x = {
          name: 'x',
          handles: ['e', 'w'].map(O),
          input: function(t, n) {
            return (
              t && [
                [t[0], n[0][1]],
                [t[1], n[1][1]],
              ]
            )
          },
          output: function(t) {
            return t && [t[0][0], t[1][0]]
          },
        },
        _ = {
          name: 'y',
          handles: ['n', 's'].map(O),
          input: function(t, n) {
            return (
              t && [
                [n[0][0], t[0]],
                [n[1][0], t[1]],
              ]
            )
          },
          output: function(t) {
            return t && [t[0][1], t[1][1]]
          },
        },
        b = {
          name: 'xy',
          handles: ['n', 'e', 's', 'w', 'nw', 'ne', 'se', 'sw'].map(O),
          input: function(t) {
            return t
          },
          output: function(t) {
            return t
          },
        },
        w = {
          overlay: 'crosshair',
          selection: 'move',
          n: 'ns-resize',
          e: 'ew-resize',
          s: 'ns-resize',
          w: 'ew-resize',
          nw: 'nwse-resize',
          ne: 'nesw-resize',
          se: 'nwse-resize',
          sw: 'nesw-resize',
        },
        M = { e: 'w', w: 'e', nw: 'ne', ne: 'nw', se: 'sw', sw: 'se' },
        A = { n: 's', s: 'n', nw: 'sw', ne: 'se', se: 'ne', sw: 'nw' },
        k = {
          overlay: 1,
          selection: 1,
          n: null,
          e: 1,
          s: null,
          w: -1,
          nw: -1,
          ne: 1,
          se: 1,
          sw: -1,
        },
        T = {
          overlay: 1,
          selection: 1,
          n: -1,
          e: null,
          s: 1,
          w: null,
          nw: -1,
          ne: -1,
          se: 1,
          sw: 1,
        }
      function O(t) {
        return { type: t }
      }
      function S() {
        return !i.event.button
      }
      function C() {
        var t = this.ownerSVGElement || this
        return [
          [0, 0],
          [t.width.baseVal.value, t.height.baseVal.value],
        ]
      }
      function E(t) {
        for (; !t.__brush; ) if (!(t = t.parentNode)) return
        return t.__brush
      }
      function N(t) {
        return t[0][0] === t[1][0] || t[0][1] === t[1][1]
      }
      function D(t) {
        var n = t.__brush
        return n ? n.dim.output(n.selection) : null
      }
      function F() {
        return B(x)
      }
      function L() {
        return B(_)
      }
      var j = function() {
        return B(b)
      }
      function B(t) {
        var n,
          e = C,
          a = S,
          c = Object(r.dispatch)(D, 'start', 'brush', 'end'),
          b = 6
        function D(n) {
          var e = n
            .property('__brush', I)
            .selectAll('.overlay')
            .data([O('overlay')])
          e
            .enter()
            .append('rect')
            .attr('class', 'overlay')
            .attr('pointer-events', 'all')
            .attr('cursor', w.overlay)
            .merge(e)
            .each(function() {
              var t = E(this).extent
              Object(i.select)(this)
                .attr('x', t[0][0])
                .attr('y', t[0][1])
                .attr('width', t[1][0] - t[0][0])
                .attr('height', t[1][1] - t[0][1])
            }),
            n
              .selectAll('.selection')
              .data([O('selection')])
              .enter()
              .append('rect')
              .attr('class', 'selection')
              .attr('cursor', w.selection)
              .attr('fill', '#777')
              .attr('fill-opacity', 0.3)
              .attr('stroke', '#fff')
              .attr('shape-rendering', 'crispEdges')
          var r = n.selectAll('.handle').data(t.handles, function(t) {
            return t.type
          })
          r.exit().remove(),
            r
              .enter()
              .append('rect')
              .attr('class', function(t) {
                return 'handle handle--' + t.type
              })
              .attr('cursor', function(t) {
                return w[t.type]
              }),
            n
              .each(F)
              .attr('fill', 'none')
              .attr('pointer-events', 'all')
              .style('-webkit-tap-highlight-color', 'rgba(0,0,0,0)')
              .on('mousedown.brush touchstart.brush', B)
        }
        function F() {
          var t = Object(i.select)(this),
            n = E(this).selection
          n
            ? (t
                .selectAll('.selection')
                .style('display', null)
                .attr('x', n[0][0])
                .attr('y', n[0][1])
                .attr('width', n[1][0] - n[0][0])
                .attr('height', n[1][1] - n[0][1]),
              t
                .selectAll('.handle')
                .style('display', null)
                .attr('x', function(t) {
                  return 'e' === t.type[t.type.length - 1]
                    ? n[1][0] - b / 2
                    : n[0][0] - b / 2
                })
                .attr('y', function(t) {
                  return 's' === t.type[0] ? n[1][1] - b / 2 : n[0][1] - b / 2
                })
                .attr('width', function(t) {
                  return 'n' === t.type || 's' === t.type
                    ? n[1][0] - n[0][0] + b
                    : b
                })
                .attr('height', function(t) {
                  return 'e' === t.type || 'w' === t.type
                    ? n[1][1] - n[0][1] + b
                    : b
                }))
            : t
                .selectAll('.selection,.handle')
                .style('display', 'none')
                .attr('x', null)
                .attr('y', null)
                .attr('width', null)
                .attr('height', null)
        }
        function L(t, n) {
          return t.__brush.emitter || new j(t, n)
        }
        function j(t, n) {
          ;(this.that = t),
            (this.args = n),
            (this.state = t.__brush),
            (this.active = 0)
        }
        function B() {
          if (i.event.touches) {
            if (i.event.changedTouches.length < i.event.touches.length)
              return p()
          } else if (n) return
          if (a.apply(this, arguments)) {
            var e,
              r,
              c,
              l,
              f,
              h,
              b,
              O,
              S,
              C,
              D,
              j,
              B,
              I = this,
              P = i.event.target.__data__.type,
              R =
                'selection' === (i.event.metaKey ? (P = 'overlay') : P)
                  ? g
                  : i.event.altKey
                  ? m
                  : y,
              U = t === _ ? null : k[P],
              H = t === x ? null : T[P],
              z = E(I),
              Y = z.extent,
              q = z.selection,
              G = Y[0][0],
              W = Y[0][1],
              X = Y[1][0],
              V = Y[1][1],
              $ = U && H && i.event.shiftKey,
              Z = Object(i.mouse)(I),
              Q = Z,
              K = L(I, arguments).beforestart()
            'overlay' === P
              ? (z.selection = q = [
                  [(e = t === _ ? G : Z[0]), (c = t === x ? W : Z[1])],
                  [(f = t === _ ? X : e), (b = t === x ? V : c)],
                ])
              : ((e = q[0][0]), (c = q[0][1]), (f = q[1][0]), (b = q[1][1])),
              (r = e),
              (l = c),
              (h = f),
              (O = b)
            var J = Object(i.select)(I).attr('pointer-events', 'none'),
              tt = J.selectAll('.overlay').attr('cursor', w[P])
            if (i.event.touches)
              J.on('touchmove.brush', et, !0).on(
                'touchend.brush touchcancel.brush',
                it,
                !0,
              )
            else {
              var nt = Object(i.select)(i.event.view)
                .on(
                  'keydown.brush',
                  function() {
                    switch (i.event.keyCode) {
                      case 16:
                        $ = U && H
                        break
                      case 18:
                        R === y &&
                          (U && ((f = h - S * U), (e = r + S * U)),
                          H && ((b = O - C * H), (c = l + C * H)),
                          (R = m),
                          rt())
                        break
                      case 32:
                        ;(R !== y && R !== m) ||
                          (U < 0 ? (f = h - S) : U > 0 && (e = r - S),
                          H < 0 ? (b = O - C) : H > 0 && (c = l - C),
                          (R = v),
                          tt.attr('cursor', w.selection),
                          rt())
                        break
                      default:
                        return
                    }
                    p()
                  },
                  !0,
                )
                .on(
                  'keyup.brush',
                  function() {
                    switch (i.event.keyCode) {
                      case 16:
                        $ && ((j = B = $ = !1), rt())
                        break
                      case 18:
                        R === m &&
                          (U < 0 ? (f = h) : U > 0 && (e = r),
                          H < 0 ? (b = O) : H > 0 && (c = l),
                          (R = y),
                          rt())
                        break
                      case 32:
                        R === v &&
                          (i.event.altKey
                            ? (U && ((f = h - S * U), (e = r + S * U)),
                              H && ((b = O - C * H), (c = l + C * H)),
                              (R = m))
                            : (U < 0 ? (f = h) : U > 0 && (e = r),
                              H < 0 ? (b = O) : H > 0 && (c = l),
                              (R = y)),
                          tt.attr('cursor', w[P]),
                          rt())
                        break
                      default:
                        return
                    }
                    p()
                  },
                  !0,
                )
                .on('mousemove.brush', et, !0)
                .on('mouseup.brush', it, !0)
              o(i.event.view)
            }
            d(), Object(s.interrupt)(I), F.call(I), K.start()
          }
          function et() {
            var t = Object(i.mouse)(I)
            !$ ||
              j ||
              B ||
              (Math.abs(t[0] - Q[0]) > Math.abs(t[1] - Q[1])
                ? (B = !0)
                : (j = !0)),
              (Q = t),
              (D = !0),
              p(),
              rt()
          }
          function rt() {
            var t
            switch (((S = Q[0] - Z[0]), (C = Q[1] - Z[1]), R)) {
              case v:
              case g:
                U &&
                  ((S = Math.max(G - e, Math.min(X - f, S))),
                  (r = e + S),
                  (h = f + S)),
                  H &&
                    ((C = Math.max(W - c, Math.min(V - b, C))),
                    (l = c + C),
                    (O = b + C))
                break
              case y:
                U < 0
                  ? ((S = Math.max(G - e, Math.min(X - e, S))),
                    (r = e + S),
                    (h = f))
                  : U > 0 &&
                    ((S = Math.max(G - f, Math.min(X - f, S))),
                    (r = e),
                    (h = f + S)),
                  H < 0
                    ? ((C = Math.max(W - c, Math.min(V - c, C))),
                      (l = c + C),
                      (O = b))
                    : H > 0 &&
                      ((C = Math.max(W - b, Math.min(V - b, C))),
                      (l = c),
                      (O = b + C))
                break
              case m:
                U &&
                  ((r = Math.max(G, Math.min(X, e - S * U))),
                  (h = Math.max(G, Math.min(X, f + S * U)))),
                  H &&
                    ((l = Math.max(W, Math.min(V, c - C * H))),
                    (O = Math.max(W, Math.min(V, b + C * H))))
            }
            h < r &&
              ((U *= -1),
              (t = e),
              (e = f),
              (f = t),
              (t = r),
              (r = h),
              (h = t),
              P in M && tt.attr('cursor', w[(P = M[P])])),
              O < l &&
                ((H *= -1),
                (t = c),
                (c = b),
                (b = t),
                (t = l),
                (l = O),
                (O = t),
                P in A && tt.attr('cursor', w[(P = A[P])])),
              z.selection && (q = z.selection),
              j && ((r = q[0][0]), (h = q[1][0])),
              B && ((l = q[0][1]), (O = q[1][1])),
              (q[0][0] === r &&
                q[0][1] === l &&
                q[1][0] === h &&
                q[1][1] === O) ||
                ((z.selection = [
                  [r, l],
                  [h, O],
                ]),
                F.call(I),
                K.brush())
          }
          function it() {
            if ((d(), i.event.touches)) {
              if (i.event.touches.length) return
              n && clearTimeout(n),
                (n = setTimeout(function() {
                  n = null
                }, 500)),
                J.on('touchmove.brush touchend.brush touchcancel.brush', null)
            } else
              u(i.event.view, D),
                nt.on(
                  'keydown.brush keyup.brush mousemove.brush mouseup.brush',
                  null,
                )
            J.attr('pointer-events', 'all'),
              tt.attr('cursor', w.overlay),
              z.selection && (q = z.selection),
              N(q) && ((z.selection = null), F.call(I)),
              K.end()
          }
        }
        function I() {
          var n = this.__brush || { selection: null }
          return (n.extent = e.apply(this, arguments)), (n.dim = t), n
        }
        return (
          (D.move = function(n, e) {
            n.selection
              ? n
                  .on('start.brush', function() {
                    L(this, arguments)
                      .beforestart()
                      .start()
                  })
                  .on('interrupt.brush end.brush', function() {
                    L(this, arguments).end()
                  })
                  .tween('brush', function() {
                    var n = this,
                      r = n.__brush,
                      i = L(n, arguments),
                      a = r.selection,
                      o = t.input(
                        'function' == typeof e ? e.apply(this, arguments) : e,
                        r.extent,
                      ),
                      u = Object(l.interpolate)(a, o)
                    function c(t) {
                      ;(r.selection = 1 === t && N(o) ? null : u(t)),
                        F.call(n),
                        i.brush()
                    }
                    return a && o ? c : c(1)
                  })
              : n.each(function() {
                  var n = arguments,
                    r = this.__brush,
                    i = t.input(
                      'function' == typeof e ? e.apply(this, n) : e,
                      r.extent,
                    ),
                    a = L(this, n).beforestart()
                  Object(s.interrupt)(this),
                    (r.selection = null == i || N(i) ? null : i),
                    F.call(this),
                    a
                      .start()
                      .brush()
                      .end()
                })
          }),
          (j.prototype = {
            beforestart: function() {
              return (
                1 == ++this.active &&
                  ((this.state.emitter = this), (this.starting = !0)),
                this
              )
            },
            start: function() {
              return (
                this.starting && ((this.starting = !1), this.emit('start')),
                this
              )
            },
            brush: function() {
              return this.emit('brush'), this
            },
            end: function() {
              return (
                0 == --this.active &&
                  (delete this.state.emitter, this.emit('end')),
                this
              )
            },
            emit: function(n) {
              Object(i.customEvent)(
                new h(D, n, t.output(this.state.selection)),
                c.apply,
                c,
                [n, this.that, this.args],
              )
            },
          }),
          (D.extent = function(t) {
            return arguments.length
              ? ((e =
                  'function' == typeof t
                    ? t
                    : f([
                        [+t[0][0], +t[0][1]],
                        [+t[1][0], +t[1][1]],
                      ])),
                D)
              : e
          }),
          (D.filter = function(t) {
            return arguments.length
              ? ((a = 'function' == typeof t ? t : f(!!t)), D)
              : a
          }),
          (D.handleSize = function(t) {
            return arguments.length ? ((b = +t), D) : b
          }),
          (D.on = function() {
            var t = c.on.apply(c, arguments)
            return t === c ? D : t
          }),
          D
        )
      }
      e.d(n, 'brush', function() {
        return j
      }),
        e.d(n, 'brushX', function() {
          return F
        }),
        e.d(n, 'brushY', function() {
          return L
        }),
        e.d(n, 'brushSelection', function() {
          return D
        })
    },
  ])
})
//# sourceMappingURL=britecharts.min.js.map
