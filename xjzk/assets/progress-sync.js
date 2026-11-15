(function () {
  "use strict";

  // Adapters retain an account-scoped local copy. Failed saves are reconciled
  // on the next login or explicit retry before anything is written remotely.
  function create(options) {
    var identity = null, generation = 0, revision = 0;
    var loaded = false, dirty = false, running = null, timer = null, indicator;
    function status(message, retry) {
      if (!indicator) {
        indicator = document.createElement("button");
        indicator.type = "button";
        indicator.setAttribute("aria-live", "polite");
        indicator.style.cssText = "position:fixed;right:12px;bottom:12px;z-index:900;padding:7px 12px;border:1px solid #d9d0e5;border-radius:8px;background:#fff;color:#635276;font:12px sans-serif;box-shadow:0 2px 10px #0001";
        indicator.onclick = function () { if (dirty || !loaded) flush(); };
        document.body.appendChild(indicator);
      }
      indicator.textContent = message;
      indicator.disabled = !retry;
    }
    function args(target) {
      var result = { input_system_type: options.systemType };
      result[target.mode === "phone" ? "input_phone" : "input_code"] = target.credential;
      return result;
    }
    function schedule() {
      clearTimeout(timer);
      if (identity && dirty) timer = setTimeout(flush, 700);
    }
    async function hydrate(target, version) {
      var rows = await options.rpc(target.mode === "phone" ? "get_phone_learning_progress" : "get_learning_progress", args(target));
      if (version !== generation) return;
      var row = Array.isArray(rows) && rows.find(function (item) { return item.lesson_id === options.lessonId; });
      var local = options.read(), remote = row && row.progress;
      var merged = options.merge(remote, local);
      options.apply(merged);
      loaded = true;
      dirty = !!merged.updatedAt && JSON.stringify(merged) !== JSON.stringify(remote);
    }
    async function start(mode, credential) {
      clearTimeout(timer);
      identity = { mode: mode, credential: credential };
      var version = ++generation;
      loaded = false; dirty = false; revision++;
      status("正在读取学习进度", false);
      try {
        await hydrate(identity, version);
        if (version !== generation) return;
        status(dirty ? "学习进度待同步" : "学习进度已同步", false);
        schedule();
      } catch (_) {
        if (version === generation) {
          dirty = !!options.read().updatedAt;
          status("进度已保留在本机 · 点击重试", true);
        }
      }
    }
    function changed() {
      if (!identity) return;
      revision++; dirty = true;
      status("学习进度待同步", false);
      schedule();
    }
    async function flush() {
      clearTimeout(timer);
      if (!identity) return;
      if (running) return running;
      var target = identity, version = generation;
      running = (async function () {
        try {
          if (!loaded) await hydrate(target, version);
          if (version !== generation || !dirty) return;
          var snapshot = options.read(), savedRevision = revision;
          status("正在保存学习进度", false);
          await options.rpc(target.mode === "phone" ? "save_phone_learning_progress" : "save_learning_progress", Object.assign(args(target), {
            input_lesson_id: options.lessonId, input_progress: snapshot,
            input_completed: false, input_score: null
          }));
          if (version !== generation) return;
          dirty = revision !== savedRevision;
          status(dirty ? "学习进度待同步" : "学习进度已同步", false);
          if (dirty) schedule();
        } catch (_) {
          if (version === generation) {
            dirty = true;
            status("进度已保留在本机 · 点击重试", true);
          }
        } finally { running = null; }
      })();
      return running;
    }
    function onOnline() { if (identity && (dirty || !loaded)) flush(); }
    function stop() {
      clearTimeout(timer);
      generation++; identity = null; dirty = false;
      window.removeEventListener("online", onOnline);
      if (indicator) indicator.remove();
    }
    window.addEventListener("online", onOnline);
    return { start: start, changed: changed, flush: flush, stop: stop };
  }
  window.TrainingProgressSync = { create: create };
})();
