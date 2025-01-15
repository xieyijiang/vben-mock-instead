layui.define(function (exports) {
  var $ = layui.$,
    presetColors = {
      primary: "#16baaa",
      blue: "#1e9fff",
      danger: "#ff5722",
      warning: "#ffb800",
      success: "#16b777",
      info: "#31bdec",
      purple: "#a233c6",
      dark: "#2f363c",
    },
    style = "";

  function addCSSLink(href) {
    var existingLinks = document.getElementsByTagName("link");
    for (var i = 0; i < existingLinks.length; i++) {
      if (
        existingLinks[i].href === href &&
        existingLinks[i].rel === "stylesheet"
      ) {
        return;
      }
    }
    href = href || "/assets/css/layui.css";
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
  }

  function addStyle(id, cssStr) {
    var el = document.getElementById(id) || document.createElement("style");
    if (!el.isConnected) {
      el.type = "text/css";
      el.id = id;
      document.head.appendChild(el);
    }
    el.textContent = cssStr;
  }

  var api = {
    setTheme: function (options) {
      // var version = options.version || "2.9.20";
      // var url = `https://unpkg.com/layui@${version}/dist/css/layui.css`;
      var colors = options.colors || {};
      var url = options.url || "/assets/css/layui.css";
      $.get(url).done(function (res) {
        style = res.replace(/@font-face{[^}]+}/, "");
        var newStyle = style;
        Object.keys(presetColors).forEach((key) => {
          if (colors[key]) {
            newStyle = newStyle.replace(
              new RegExp(presetColors[key], "ig"),
              colors[key]
            );
          }
        });
        addCSSLink();
        addStyle("customTheme", newStyle);
      });
    },
  };

  exports("theme", api);
});
