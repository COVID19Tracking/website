import React, { Fragment, Component } from 'react';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

// styling to maintain dependency independence

var markerStyles = {
  position: 'fixed',
  left: 0,
  width: '100%',
  height: 0,
  borderTop: '2px dashed black',
  zIndex: 9999
};
var offsetTextStyles = {
  fontSize: '12px',
  fontFamily: 'monospace',
  margin: 0,
  padding: 6
};

var DebugOffset = function DebugOffset(_ref) {
  var offsetMargin = _ref.offsetMargin,
      offsetVal = _ref.offsetVal;
  return /*#__PURE__*/React.createElement("div", {
    style: _objectSpread2(_objectSpread2({}, markerStyles), {}, {
      top: offsetMargin
    })
  }, /*#__PURE__*/React.createElement("p", {
    style: offsetTextStyles
  }, "trigger: ", offsetVal));
};

var OBSERVER_NAMES = ['stepAbove', 'stepBelow', 'stepProgress', 'viewportAbove', 'viewportBelow'];

var Scrollama = /*#__PURE__*/function (_Component) {
  _inherits(Scrollama, _Component);

  var _super = _createSuper(Scrollama);

  // step trigger callbacks
  // intersection observers
  // disconnects all observers of a certain function
  // stores step elements by id
  function Scrollama(props) {
    var _this;

    _classCallCheck(this, Scrollama);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "cb", {
      stepEnter: function stepEnter() {
        return null;
      },
      stepExit: function stepExit() {
        return null;
      },
      stepProgress: function stepProgress() {
        return null;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "io", {});

    _defineProperty(_assertThisInitialized(_this), "disconnectObserver", function (name) {
      return _this.io[name] && _this.io[name].forEach(function (o) {
        return o.disconnect();
      });
    });

    _defineProperty(_assertThisInitialized(_this), "stepElIds", []);

    _defineProperty(_assertThisInitialized(_this), "viewH", window.innerHeight);

    _defineProperty(_assertThisInitialized(_this), "pageH", 0);

    _defineProperty(_assertThisInitialized(_this), "offsetVal", 0);

    _defineProperty(_assertThisInitialized(_this), "offsetMargin", 0);

    _defineProperty(_assertThisInitialized(_this), "previousYOffset", 0);

    _defineProperty(_assertThisInitialized(_this), "progressThreshold", 0);

    _defineProperty(_assertThisInitialized(_this), "direction", 'down');

    _defineProperty(_assertThisInitialized(_this), "updateDirection", function () {
      if (window.pageYOffset > _this.previousYOffset) {
        _this.direction = 'down';
      } else if (window.pageYOffset < _this.previousYOffset) {
        _this.direction = 'up';
      }

      _this.previousYOffset = window.pageYOffset;
    });

    _defineProperty(_assertThisInitialized(_this), "isReady", false);

    _defineProperty(_assertThisInitialized(_this), "isEnabled", false);

    _defineProperty(_assertThisInitialized(_this), "isDebug", false);

    _defineProperty(_assertThisInitialized(_this), "progressMode", false);

    _defineProperty(_assertThisInitialized(_this), "getStep", function (arg) {
      var id = arg instanceof Element ? arg.getAttribute('data-react-scrollama-id') : arg;
      var step = _this[id];

      if (step && step.current) {
        return step.current;
      }

      throw 'Could not get step with id ' + id;
    });

    _defineProperty(_assertThisInitialized(_this), "handleResize", function () {
      _this.viewH = window.innerHeight;
      _this.pageH = getPageHeight();

      _this.setState({
        offsetMargin: _this.offsetVal * _this.viewH
      });

      if (_this.isReady) {
        // recalculate offset heights for each step
        _this.stepElIds.forEach(function (id) {
          var step = _this.getStep(id);

          step.updateOffsetHeight();
        });

        if (_this.isEnabled) _this.updateIO();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleEnable", function (enable) {
      if (enable && !_this.isEnabled) {
        if (_this.isReady) {
          _this.updateIO();
        } else {
          console.error('react scrollama: handleEnable() called before scroller was ready');
          _this.isEnabled = false;
          return;
        }
      }

      if (!enable && _this.isEnabled) {
        OBSERVER_NAMES.forEach(_this.disconnectObserver);
      }

      _this.isEnabled = enable;
    });

    _defineProperty(_assertThisInitialized(_this), "updateIO", function () {
      OBSERVER_NAMES.forEach(_this.disconnectObserver);

      _this.updateStepAboveIO();

      _this.updateStepBelowIO();

      if (_this.progressMode) _this.updateStepProgressIO();
    });

    _defineProperty(_assertThisInitialized(_this), "updateStepAboveIO", function () {
      var offsetMargin = _this.state.offsetMargin;
      _this.io.stepAbove = _this.stepElIds.map(function (id) {
        var step = _this.getStep(id);

        var stepStateOffsetHeight = step.updateOffsetHeight();
        var marginTop = -offsetMargin + stepStateOffsetHeight; //step.state.offsetHeight;

        var marginBottom = offsetMargin - _this.viewH;
        var options = {
          rootMargin: "".concat(marginTop, "px 0px ").concat(marginBottom, "px 0px")
        };
        var obs = new IntersectionObserver(_this.intersectStepAbove, options);
        obs.observe(step.getDOMNode());
        return obs;
      });
    });

    _defineProperty(_assertThisInitialized(_this), "updateStepBelowIO", function () {
      var offsetMargin = _this.state.offsetMargin;
      _this.io.stepBelow = _this.stepElIds.map(function (id) {
        var step = _this.getStep(id);

        var stepStateOffsetHeight = step.updateOffsetHeight();
        var marginTop = -offsetMargin;
        var marginBottom = offsetMargin - _this.viewH + stepStateOffsetHeight; //step.state.offsetHeight;

        var options = {
          rootMargin: "".concat(marginTop, "px 0px ").concat(marginBottom, "px 0px")
        };
        var obs = new IntersectionObserver(_this.intersectStepBelow, options);
        obs.observe(step.getDOMNode());
        return obs;
      });
    });

    _defineProperty(_assertThisInitialized(_this), "updateStepProgressIO", function () {
      var offsetMargin = _this.state.offsetMargin;
      _this.io.stepProgress = _this.stepElIds.map(function (id) {
        var step = _this.getStep(id);

        var marginTop = -offsetMargin + step.state.offsetHeight;
        var marginBottom = offsetMargin - _this.viewH;
        var options = {
          rootMargin: "".concat(marginTop, "px 0px ").concat(marginBottom, "px 0px"),
          threshold: _this.createThreshold(step.state.offsetHeight)
        };
        var obs = new IntersectionObserver(_this.intersectStepProgress, options);
        obs.observe(step.getDOMNode());
        return obs;
      });
    });

    _defineProperty(_assertThisInitialized(_this), "intersectStepAbove", function (_ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          entry = _ref2[0];

      _this.updateDirection();

      var offsetMargin = _this.state.offsetMargin;
      var isIntersecting = entry.isIntersecting,
          _entry$boundingClient = entry.boundingClientRect,
          top = _entry$boundingClient.top,
          bottom = _entry$boundingClient.bottom,
          target = entry.target;
      var topAdjusted = top - offsetMargin;
      var bottomAdjusted = bottom - offsetMargin;

      var step = _this.getStep(target);

      if (isIntersecting && topAdjusted <= 0 && bottomAdjusted >= 0 && _this.direction === 'down' && step.state.state !== 'enter') _this.notifyStepEnter(step, _this.direction); // Exiting from above means not intersecting and topAdjusted is positive

      if (!isIntersecting && // Should be >0, but >-0.05 fixes a weird floating point issue in Chrome.
      // The exact –ε is different for every this.prop.offset. Very sad folks.
      topAdjusted > -0.5 && _this.direction === 'up' && step.state.state === 'enter') _this.notifyStepExit(step, _this.direction);
    });

    _defineProperty(_assertThisInitialized(_this), "intersectStepBelow", function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 1),
          entry = _ref4[0];

      _this.updateDirection();

      var offsetMargin = _this.state.offsetMargin;
      var isIntersecting = entry.isIntersecting,
          _entry$boundingClient2 = entry.boundingClientRect,
          top = _entry$boundingClient2.top,
          bottom = _entry$boundingClient2.bottom,
          target = entry.target;
      var topAdjusted = top - offsetMargin;
      var bottomAdjusted = bottom - offsetMargin;

      var step = _this.getStep(target);

      if (isIntersecting && topAdjusted <= 0 && bottomAdjusted >= 0 && _this.direction === 'up' && step.state.state !== 'enter') _this.notifyStepEnter(step, _this.direction);
      if (!isIntersecting && bottomAdjusted < 0 && _this.direction === 'down' && step.state.state === 'enter') _this.notifyStepExit(step, _this.direction);
    });

    _defineProperty(_assertThisInitialized(_this), "intersectStepProgress", function (_ref5) {
      var _ref6 = _slicedToArray(_ref5, 1),
          entry = _ref6[0];

      _this.updateDirection();

      var isIntersecting = entry.isIntersecting,
          intersectionRatio = entry.intersectionRatio,
          bottom = entry.boundingClientRect.bottom,
          target = entry.target;
      var bottomAdjusted = bottom - _this.state.offsetMargin;
      if (isIntersecting && bottomAdjusted >= 0) _this.notifyStepProgress(_this.getStep(target), intersectionRatio);
    });

    _defineProperty(_assertThisInitialized(_this), "createThreshold", function (height) {
      var count = Math.ceil(height / _this.progressThreshold);
      var t = [];
      var ratio = 1 / count;

      for (var i = 0; i <= count; i += 1) {
        t.push(i * ratio);
      }

      return t;
    });

    _defineProperty(_assertThisInitialized(_this), "notifyStepProgress", function (step, progress) {
      if (progress !== undefined) step.progress(progress);
      var resp = {
        element: step.getDOMNode(),
        data: step.getData(),
        progress: step.state.progress
      };
      if (step.state.state === 'enter') _this.cb.stepProgress(resp);
    });

    _defineProperty(_assertThisInitialized(_this), "notifyStepEnter", function (step, direction) {
      step.enter(direction);
      var resp = {
        element: step.getDOMNode(),
        data: step.getData(),
        direction: direction
      };
      if (_this.cb.stepEnter) _this.cb.stepEnter(resp);
      if (_this.progressMode) _this.notifyStepProgress(step);
    });

    _defineProperty(_assertThisInitialized(_this), "notifyStepExit", function (step, direction) {
      if (_this.progressMode) {
        if (direction === 'down' && step.state.progress < 1) _this.notifyStepProgress(step, 1);
        if (direction === 'up' && step.state.progress > 0) _this.notifyStepProgress(step, 0);
      }

      step.exit(direction);
      var resp = {
        element: step.getDOMNode(),
        data: step.getData(),
        direction: direction
      };
      if (_this.cb.stepExit) _this.cb.stepExit(resp);
    });

    var _this$props = _this.props,
        children = _this$props.children,
        onStepEnter = _this$props.onStepEnter,
        onStepExit = _this$props.onStepExit,
        onStepProgress = _this$props.onStepProgress,
        _this$props$offset = _this$props.offset,
        offset = _this$props$offset === void 0 ? 0.3 : _this$props$offset,
        _this$props$progress = _this$props.progress,
        _progress = _this$props$progress === void 0 ? false : _this$props$progress,
        _this$props$threshold = _this$props.threshold,
        threshold = _this$props$threshold === void 0 ? 4 : _this$props$threshold,
        debug = _this$props.debug;

    React.Children.forEach(children, function (_, idx) {
      var childId = "react-scrollama-".concat(idx);
      _this[childId] = /*#__PURE__*/React.createRef();

      _this.stepElIds.push(childId);
    });
    if (offset && !isNaN(offset)) _this.offsetVal = Math.min(Math.max(0, offset), 1);
    _this.cb.stepEnter = onStepEnter;
    _this.cb.stepExit = onStepExit;
    _this.cb.stepProgress = onStepProgress;
    _this.isDebug = debug;
    _this.progressMode = _progress;
    _this.progressThreshold = Math.max(1, +threshold);
    _this.isReady = true; // offsetMargin stored in state because it's the only property that is
    // changed after Scrollama's construction and may be rendered (<DebugOffset/>'s
    // position depends on it)

    _this.state = {
      offsetMargin: _this.offsetVal * _this.viewH
    };
    return _this;
  }

  _createClass(Scrollama, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.domDidLoad.bind(this)();
    }
  }, {
    key: "domDidLoad",
    value: function domDidLoad() {
      this.handleResize();
      this.handleEnable(true);
      window.addEventListener('resize', this.handleResize);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('load', this.domDidLoad.bind(this));
      window.removeEventListener('resize', this.handleResize);
      this.handleEnable(false);
    }
    /* Get step can take a step id or grab an id off a target element */

  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return /*#__PURE__*/React.createElement(Fragment, null, this.isDebug && /*#__PURE__*/React.createElement(DebugOffset, {
        offsetMargin: this.state.offsetMargin,
        offsetVal: this.offsetVal
      }), React.Children.map(this.props.children, function (child, index) {
        var id = _this2.stepElIds[index];
        return /*#__PURE__*/React.cloneElement(child, {
          scrollamaId: id,
          ref: _this2[id]
        });
      }));
    }
  }]);

  return Scrollama;
}(Component);

function getPageHeight() {
  var body = document.body;
  var html = document.documentElement;
  return Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
}

var Step = /*#__PURE__*/function (_Component) {
  _inherits(Step, _Component);

  var _super = _createSuper(Step);

  function Step() {
    var _this;

    _classCallCheck(this, Step);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      direction: null,
      // 'up' or 'down'
      state: null,
      // 'enter' or 'exit'
      offsetHeight: null,
      progress: 0
    });

    _defineProperty(_assertThisInitialized(_this), "nodeRef", /*#__PURE__*/React.createRef());

    _defineProperty(_assertThisInitialized(_this), "getDOMNode", function () {
      return _this.nodeRef.current;
    });

    _defineProperty(_assertThisInitialized(_this), "getData", function () {
      return _this.props.data;
    });

    _defineProperty(_assertThisInitialized(_this), "updateOffsetHeight", function () {
      var offsetHeight = _this.getDOMNode().offsetHeight;

      _this.setState({
        offsetHeight: offsetHeight
      });

      return offsetHeight;
    });

    _defineProperty(_assertThisInitialized(_this), "enter", function (direction) {
      return _this.setState({
        state: 'enter',
        direction: direction
      });
    });

    _defineProperty(_assertThisInitialized(_this), "exit", function (direction) {
      return _this.setState({
        state: 'exit',
        direction: direction
      });
    });

    _defineProperty(_assertThisInitialized(_this), "progress", function (progress) {
      return _this.setState({
        progress: progress
      });
    });

    return _this;
  }

  _createClass(Step, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          scrollamaId = _this$props.scrollamaId,
          children = _this$props.children;
      return /*#__PURE__*/React.cloneElement(React.Children.only(children), {
        // place attribuet on child to retrieve id from the raw DOM node (which
        // is what the intersection observer gives our callback
        'data-react-scrollama-id': scrollamaId,
        // place ref on child to calculate offsets
        ref: this.nodeRef
      });
    }
  }]);

  return Step;
}(Component);

export { Scrollama, Step };
//# sourceMappingURL=index.es.js.map
