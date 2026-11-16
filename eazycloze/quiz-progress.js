"use strict";

/* Account-scoped quiz records share the existing progress snapshot and transport. */
function quizCourseKey(ch, idx) { return ch + "#" + idx; }
function quizCourseRecord(ch, idx) { return (loadStore().quizCourses || {})[quizCourseKey(ch, idx)] || {}; }
function quizCopy(x) { return JSON.parse(JSON.stringify(x)); }
function quizBankSignature(g) {
  var text = JSON.stringify(g.qs.map(function (q) { return [q.no, q.stem, q.options, q.answer]; }));
  var a = 2166136261, b = 5381;
  for (var i = 0; i < text.length; i++) { a = Math.imul(a ^ text.charCodeAt(i), 16777619); b = Math.imul(b, 33) ^ text.charCodeAt(i); }
  return (a >>> 0).toString(16) + ':' + (b >>> 0).toString(16) + ':' + text.length;
}
function quizWritableCourse(s, state) {
  s.quizCourses = s.quizCourses || {};
  var key = quizCourseKey(state.ch, state.idx), r = s.quizCourses[key] = s.quizCourses[key] || {};
  var signature = quizBankSignature(getLessonQuiz(state.ch, state.idx));
  if (r.signature && r.signature !== signature) {
    delete r.lastFull; delete r.bestAccuracy; delete r.draft;
  }
  r.signature = signature;
  return r;
}
function newQuizState(ch, idx, mode, ids) {
  return { ch: ch, idx: idx, mode: mode || "full", ids: ids || null, answers: {}, submitted: false,
    warned: false, t0: Date.now(), attemptId: Date.now().toString(36) + Math.random().toString(36).slice(2, 10) };
}
function restoreQuizState(ch, idx) {
  var r = quizCourseRecord(ch, idx), g = getLessonQuiz(ch, idx);
  if (r.signature === quizBankSignature(g)) {
    if (r.draft) return quizCopy(r.draft);
    if (r.lastFull) return quizCopy(r.lastFull.state);
  }
  return newQuizState(ch, idx);
}
function activeQuizQuestions() {
  if (!quizState) return [];
  var g = getLessonQuiz(quizState.ch, quizState.idx);
  if (!g) return [];
  return g.qs.filter(function (q) { return !quizState.ids || quizState.ids.indexOf(q.no) >= 0; });
}
function saveQuizDraft() {
  if (!quizState || quizState.submitted) return;
  var s = loadStore(), r = quizWritableCourse(s, quizState);
  r.draft = quizCopy(quizState);
  saveStore(s);
}
function quizErrors(ch, idx) {
  var key = quizCourseKey(ch, idx), g = getLessonQuiz(ch, idx);
  return getErrors().filter(function (e) {
    return e.kind === "quiz" && e.courseKey === key && !e.resolved && g && g.qs.some(function (q) { return q.no === e.q && q.stem === e.stem; });
  });
}
function saveQuizSubmission() {
  if (!quizState || quizState.submitted) return false;
  var qs = activeQuizQuestions();
  if (!qs.length) return false;
  var s = loadStore(), key = quizCourseKey(quizState.ch, quizState.idx), now = Date.now(), right = 0;
  var r = quizWritableCourse(s, quizState);
  if ((r.history || []).some(function (a) { return a.id === quizState.attemptId; })) return false;
  s.errors = s.errors || [];
  qs.forEach(function (q) {
    var selected = quizState.answers[q.no] || "", ok = selected === q.answer;
    if (ok) right++;
    var previous = s.errors.find(function (e) { return e.kind === "quiz" && e.courseKey === key && e.q === q.no; });
    if (ok && previous) { previous.resolved = true; previous.resolvedAt = now; }
    if (!ok) {
      if (!previous) {
        previous = { kind: "quiz", lessonId: "quiz:" + key, courseKey: key, ch: quizState.ch, idx: quizState.idx, q: q.no, firstAt: now, wrongCount: 0 };
        s.errors.push(previous);
      }
      Object.assign(previous, { selected: selected, correct: q.answer, stem: q.stem, ts: now, resolved: false, wrongCount: (previous.wrongCount || 0) + 1 });
      delete previous.resolvedAt;
    }
  });
  quizState.submitted = true;
  var attempt = { id: quizState.attemptId, at: now, mode: quizState.mode || "full", total: qs.length,
    right: right, accuracy: Math.round(right * 100 / qs.length), state: quizCopy(quizState) };
  r.history = (r.history || []).concat([attempt]).slice(-30);
  // Bound the shared cloud snapshot while retaining each course's last result.
  var recent = [];
  Object.keys(s.quizCourses).forEach(function (course) {
    (s.quizCourses[course].history || []).forEach(function (a) { recent.push(a); });
  });
  recent.sort(function (a, b) { return b.at - a.at; });
  var keep = recent.slice(0, 100).map(function (a) { return a.id; });
  Object.keys(s.quizCourses).forEach(function (course) {
    var record = s.quizCourses[course];
    record.history = (record.history || []).filter(function (a) { return keep.indexOf(a.id) >= 0; });
  });
  r.attemptCount = (r.attemptCount || 0) + 1;
  r.signature = quizBankSignature(getLessonQuiz(quizState.ch, quizState.idx));
  if (attempt.mode === "full") {
    r.lastFull = attempt;
    r.bestAccuracy = Math.max(r.bestAccuracy || 0, attempt.accuracy);
  }
  delete r.draft;
  saveStore(s);
  updateNavBadge();
  return true;
}
function startQuizReview(ch, idx, onlyQuestion) {
  var ids = quizErrors(ch, idx).map(function (e) { return e.q; });
  if (onlyQuestion != null) ids = ids.filter(function (id) { return id === onlyQuestion; });
  if (!ids.length) { toast("本课错题已订正"); return; }
  showView("quiz");
  startQuiz(ch, idx);
  quizState = newQuizState(ch, idx, "review", ids);
  saveQuizDraft();
  renderQuiz();
}
function quizCourseMeta(ch, idx) {
  var r = quizCourseRecord(ch, idx), last = r.lastFull, g = getLessonQuiz(ch, idx);
  var valid = g && r.signature === quizBankSignature(g);
  var text = valid && last ? "已完成 · 最近正确率 " + last.accuracy + "%" : valid && r.draft ? "进行中 · 已答 " + Object.keys(r.draft.answers).length + " 题" : "未开始";
  if (valid && r.draft && last) text += " · " + (r.draft.mode === "review" ? "错题重练中" : "再次练习中");
  var errors = quizErrors(ch, idx).length;
  return text + (errors ? " · 待订正 " + errors + " 题" : "") + " · 点击继续 ›";
}
function quizDate(at) { return new Date(at).toLocaleString("zh-CN", { hour12: false }); }
function quizProgressPanel() {
  var courses = [], completed = 0, total = 0, correct = 0, attempts = [];
  handoutLessonFlat().forEach(function (c) {
    var g = getLessonQuiz(c.ch, c.idx); if (!g) return;
    var r = quizCourseRecord(c.ch, c.idx), valid = r.signature === quizBankSignature(g);
    if (valid && r.lastFull) { completed++; total += r.lastFull.total; correct += r.lastFull.right; }
    courses.push('<li><button type="button" class="btn ghost" data-qp-open="' + c.ch + '" data-qp-idx="' + c.idx + '">' + escapeHtml(g.name) + '</button><span>' + escapeHtml(quizCourseMeta(c.ch, c.idx)) + '</span>'
      + (quizErrors(c.ch, c.idx).length ? '<button type="button" class="btn ghost" data-qp-review="' + c.ch + '" data-qp-idx="' + c.idx + '">重练本课错题</button>' : '') + '</li>');
    (r.history || []).forEach(function (a) { attempts.push({ a: a, name: g.name }); });
  });
  attempts.sort(function (a, b) { return b.a.at - a.a.at; });
  return '<section class="quiz-progress-panel"><h2>知识点同步练习 · 学习记录</h2><p>已完成 <b>' + completed + ' / ' + courses.length + '</b> 课 · 各课最近整课正确率合计 <b>' + (total ? Math.round(correct * 100 / total) + '%' : '暂无') + '</b></p>'
    + '<p>记录随当前账号保存。保留最近 100 次提交，每课最多 30 次；各课最近成绩持续保留，错题重练单独计分。</p><details><summary>查看每课进度与错题</summary><ul class="quiz-course-records">' + courses.join('') + '</ul></details>'
    + '<details><summary>最近练习记录（最多展示 30 次）</summary><ul class="quiz-attempts">' + (attempts.slice(0, 30).map(function (item) {
      var a = item.a;
      return '<li>' + escapeHtml(quizDate(a.at) + ' · ' + item.name + ' · ' + (a.mode === 'review' ? '错题重练' : '整课练习') + ' · ' + a.right + '/' + a.total + ' · ' + a.accuracy + '%') + '</li>';
    }).join('') || '<li>完成一次提交后，这里会显示练习记录。</li>') + '</ul></details></section>';
}
function renderQuizNotebookItem(e, list) {
  var g = getLessonQuiz(e.ch, e.idx), q = g && g.qs.find(function (x) { return x.no === e.q && x.stem === e.stem; });
  var item = document.createElement("div"); item.className = "notebook-item";
  item.innerHTML = '<div class="nb-title">知识点同步练习 · ' + escapeHtml(g ? g.name : '已调整课程') + ' · 第 ' + e.q + ' 题</div>'
    + '<p>' + escapeHtml(e.stem || '') + '</p><div class="nb-detail">你选了 ' + escapeHtml(e.selected || '未作答') + '，正确答案 ' + escapeHtml(e.correct) + ' · ' + (e.resolved ? '已订正' : '待订正') + ' · 累计答错 ' + (e.wrongCount || 1) + ' 次</div>'
    + '<div class="nb-actions"><button class="nb-review-btn" type="button">' + (q ? '查看解析' : '题目已更新') + '</button>'
    + (q && !e.resolved ? '<button class="btn ghost quiz-retry" type="button">重练本题</button><button class="btn ghost quiz-retry-course" type="button">重练本课错题</button>' : '') + '</div>';
  var view = item.querySelector('.nb-review-btn'); view.disabled = !q;
  view.onclick = function () {
    showView('quiz'); startQuiz(e.ch, e.idx);
    quizState = newQuizState(e.ch, e.idx, 'review', [e.q]);
    quizState.answers[e.q] = e.selected; quizState.submitted = true; renderQuiz();
  };
  var retry = item.querySelector('.quiz-retry');
  if (retry) retry.onclick = function () { startQuizReview(e.ch, e.idx, e.q); };
  var course = item.querySelector('.quiz-retry-course');
  if (course) course.onclick = function () { startQuizReview(e.ch, e.idx); };
  list.appendChild(item);
}
document.addEventListener('click', function (event) {
  var b = event.target.closest && event.target.closest('[data-qp-open], [data-qp-review]');
  if (!b || !ACTIVE_LOGIN_CODE) return;
  if (b.dataset.qpReview) startQuizReview(b.dataset.qpReview, Number(b.dataset.qpIdx));
  else { showView('quiz'); startQuiz(b.dataset.qpOpen, Number(b.dataset.qpIdx)); }
});
