// Shared preview behaviours for sub-pages (theme toggle, scroll reveal, spine).
// Mirrors the Astro BaseLayout so the standalone previews behave like the real site.
(function () {
  document.documentElement.classList.add("js");

  // ---- Theme toggle ----
  var btn = document.getElementById("themeBtn");
  if (btn) {
    var moon = document.getElementById("moon");
    var sun = document.getElementById("sun");
    function syncIcon() {
      var dark = document.documentElement.getAttribute("data-theme") === "dark";
      if (moon) moon.style.display = dark ? "none" : "block";
      if (sun) sun.style.display = dark ? "block" : "none";
      btn.setAttribute("aria-pressed", String(dark));
    }
    syncIcon();
    btn.addEventListener("click", function () {
      var dark = document.documentElement.getAttribute("data-theme") === "dark";
      var next = dark ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
      syncIcon();
    });
  }

  // ---- Scroll reveal (viewport-position based, with failsafe) ----
  function startReveal() {
    var els = Array.prototype.slice.call(document.querySelectorAll("[data-reveal]"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach(function (el) { el.classList.add("is-in"); });
      return;
    }
    function reveal() {
      var vh = window.innerHeight || document.documentElement.clientHeight;
      for (var i = 0; i < els.length; i++) {
        var el = els[i];
        if (el.classList.contains("is-in")) continue;
        if (el.getBoundingClientRect().top < vh * 0.92) el.classList.add("is-in");
      }
    }
    requestAnimationFrame(function () { reveal(); requestAnimationFrame(reveal); });
    window.addEventListener("scroll", reveal, { passive: true });
    window.addEventListener("resize", reveal);
    setTimeout(function () { els.forEach(function (el) { el.style.transition = "none"; el.classList.add("is-in"); }); }, 700);
  }

  // ---- Spine (left-margin scroll-drawn line) ----
  function startSpine() {
    var svg = document.getElementById("spine");
    var path = document.getElementById("spinePath");
    var tip = document.getElementById("spineTip");
    var main = document.getElementById("main");
    if (!svg || !path || !main) return;
    var len = 0;
    function build() {
      var H = main.offsetHeight, W = 40, cx = W / 2, amp = 11;
      var waves = Math.max(4, Math.round(H / 520));
      var seg = H / waves, d = "M " + cx + " 0", dir = 1;
      for (var i = 0; i < waves; i++) {
        var y0 = i * seg, y1 = (i + 1) * seg, cpy = y0 + seg / 2, x2 = cx + dir * amp;
        d += " Q " + x2 + " " + cpy + " " + cx + " " + y1;
        dir *= -1;
      }
      svg.setAttribute("viewBox", "0 0 " + W + " " + H);
      svg.setAttribute("width", W);
      svg.setAttribute("height", H);
      svg.style.height = H + "px";
      path.setAttribute("d", d);
      len = path.getTotalLength();
      path.style.strokeDasharray = len;
      update();
    }
    function update() {
      var docH = document.documentElement.scrollHeight - window.innerHeight;
      var p = docH > 0 ? Math.min(1, Math.max(0, window.scrollY / docH)) : 1;
      path.style.strokeDashoffset = len * (1 - p);
      if (tip && len) {
        var pt = path.getPointAtLength(len * p);
        tip.setAttribute("cx", pt.x);
        tip.setAttribute("cy", pt.y);
        tip.style.opacity = p > 0.003 && p < 0.997 ? 1 : 0;
      }
    }
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", build);
    build();
    setTimeout(build, 350);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(build);
  }

  function init() { startReveal(); startSpine(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
