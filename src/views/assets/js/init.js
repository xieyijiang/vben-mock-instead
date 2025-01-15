layui
  .config({
    base: "/assets/modules/",
  })
  .use("theme", function () {
    var theme = layui.theme;
    theme.setTheme({
      colors: {
        success: "#a233c6",
      },
    });
  });
