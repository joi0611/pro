const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const eventData = {
  pencil: {
    title: '铅笔盒失踪案', keywords: ['铅笔盒', '失踪', '黑洞', '书包', '课本', '其中'],
    beginner: ['我的铅笔盒失踪', '桌子下面像黑洞', '书包摇头说不懂', '翻开课本在其中'],
    first: ['铅笔盒', '失踪'], endings: ['最后它就在课本里', '这次换我来出招', '找到以后哈哈大笑'], adlib: 'YO! YO! BOOM BOOM!',
    finalIdeas: ['这次侦探就是我', '失踪游戏到此结束', '所有线索都在手中'],
    techniques: { repeat: '找找找，我一定要找到', reverse: '找了半天，它就在课本里', exaggerate: '桌下黑洞能吞掉整个教室', contrast: '嘴上说不急，双手翻不停', personify: '铅笔盒说，你能找到我吗' }
  },
  clock: {
    title: '闹钟响了三遍', keywords: ['闹钟', '被窝', '装睡', '迟到', '警报', '飞奔'],
    beginner: ['早上闹钟一直叫', '我的被窝像座城堡', '本来想要继续装睡', '睁眼发现快迟到'],
    first: ['闹钟', '大叫'], endings: ['穿好鞋子马上就跑', '谁也别想让我迟到', '明天我会提前起床'], adlib: 'YO! YO! LET’S GO!',
    finalIdeas: ['今天我会准时出发', '下一次绝对不迟到', '鞋底发动机已经启动'],
    techniques: { repeat: '快快快，我真的要迟到', reverse: '冲到门口，今天竟然放假', exaggerate: '闹钟响得整栋楼都在摇', contrast: '嘴上说不急，双腿已经出发', personify: '闹钟说，你今天别想逃' }
  },
  sock: {
    title: '袜子忍者出逃', keywords: ['袜子', '忍者', '沙发', '失踪', '翻找', '脚下'],
    beginner: ['我的袜子又失踪', '沙发下面像黑洞', '我把房间翻个遍', '原来就在我的脚中'],
    first: ['袜子', '失踪'], endings: ['找了半天就在脚上', '袜子忍者快快投降', '明天排队不许乱跑'], adlib: 'BOOM! BOOM! COME ON!',
    finalIdeas: ['袜子忍者终于投降', '秘密基地已经找到', '明天排队一个不少'],
    techniques: { repeat: '找找找，袜子到底哪里跑', reverse: '找了半天，袜子就在我脚上', exaggerate: '沙发黑洞吞掉一百双袜子', contrast: '嘴上说算了，双手还在翻找', personify: '袜子说，我只是出来探险' }
  },
  chips: {
    title: '最后一块薯片', keywords: ['薯片', '咔嚓', '袋子', '闪电', '最后', '抢先'],
    beginner: ['袋里只剩一块薯片', '大家眼睛同时放电', '我的手才刚刚伸出', '咔嚓爸爸抢在前面'],
    first: ['薯片', '不见'], endings: ['下一袋我要先出招', '最后大家一起大笑', '咔嚓一声比赛结束'], adlib: 'YEAH! YEAH! CHECK ONE!',
    finalIdeas: ['下一袋我一定抢先', '这场比赛重新再来', '薯片冠军就是爸爸'],
    techniques: { repeat: '快快快，最后一片别跑开', reverse: '争了半天，袋子原来是空的', exaggerate: '咔嚓一声整个客厅都震动', contrast: '嘴上说不吃，眼睛盯着袋子', personify: '薯片说，谁先到谁就赢' }
  },
  watermelon: {
    title: '去瓜地摘大西瓜', keywords: ['瓜田', '绿叶', '西瓜', '敲一敲', '比我还大', '累趴下'],
    beginner: ['今天来到西瓜地啦', '绿叶下面躲着西瓜', '终于摘个比我还大', '抱着回家累趴下'],
    first: ['大西瓜', '被摘下'], endings: ['抱着回家差点趴下', '今天瓜王就是我啦', '切开以后一起吃瓜'], adlib: 'YO! YO! 摘瓜出发!',
    finalIdeas: ['今天瓜王就是我啦', '这颗西瓜比我还大', '抱不动也绝不放下'],
    techniques: { repeat: '挑挑挑，我要挑个最大的', reverse: '以为抱得动，结果原地趴下', exaggerate: '这颗西瓜大得像座小山', contrast: '嘴上说轻松，双手已经发麻', personify: '西瓜说，想带走我先抱稳' }
  }
};

const inspirationByEvent = {
  pencil: {
    line2: [['书包', '一个黑洞'], ['课桌', '秘密基地'], ['铅笔盒', '隐身忍者']],
    line3: [['赶快找到它', '它躲进课本'], ['翻遍整张桌子', '它藏在书包'], ['问问我的同桌', '大家一起找']],
    line4: [['找到线索', '继续往下找'], ['解开谜题', '当个小侦探'], ['让它归队', '马上来出招']]
  },
  clock: {
    line2: [['被窝', '一座城堡'], ['闹钟', '红色警报'], ['鞋底', '两台发动机']],
    line3: [['再睡一小会', '马上要迟到'], ['把闹钟按掉', '它又响起来'], ['慢慢穿鞋子', '时间飞走了']],
    line4: [['准时出门', '立刻往外跑'], ['战胜困意', '马上就起床'], ['追上时间', '穿鞋就出发']]
  },
  sock: {
    line2: [['沙发下面', '一个黑洞'], ['袜子', '隐身忍者'], ['我的房间', '寻宝现场']],
    line3: [['把房间翻遍', '它躲在脚下'], ['问问沙发缝', '它完全不回答'], ['打开所有抽屉', '还是没有它']],
    line4: [['找到袜子', '继续往下翻'], ['抓住忍者', '让它快投降'], ['整理房间', '明天不再乱']]
  },
  chips: {
    line2: [['薯片袋子', '闪电赛场'], ['最后一片', '冠军奖牌'], ['大家眼睛', '两盏探照灯']],
    line3: [['马上伸出手', '爸爸先抢到'], ['慢慢等机会', '咔嚓声响了'], ['守住最后一片', '袋子突然空']],
    line4: [['赢下比赛', '下一袋抢先'], ['拿到薯片', '马上就出招'], ['等到下一袋', '绝对不走开']]
  },
  watermelon: {
    line2: [['整片瓜田', '绿色迷宫'], ['圆圆西瓜', '藏在绿叶下'], ['头顶太阳', '金色探照灯']],
    line3: [['拍拍大西瓜', '听见咚咚回答'], ['挑中最大的', '差点抱不起来'], ['弯腰把它抱起', '脚步左右摇摆']],
    line4: [['抱回西瓜', '回家一起切开'], ['选中瓜王', '今天绝不放下'], ['走出瓜田', '累得原地趴下']]
  }
};

let currentEvent = 'pencil';
let beginnerLines = [];
let selectedClosing = eventData.pencil.endings[0];
let unlockedStage = 1;
let inspireIndex = { line2: 0, line3: 0, line4: 0 };
let audioCtx, masterGain, reverbInput, beatTimer, micStream, analyser, animationFrame, mediaRecorder, recordTimer, toastTimer;
let soundEnabled = true, demoPlaying = false, practicePreparing = false, beatStep = 0, recordSeconds = 0, recordedChunks = [];
let practiceState = null;
let finalIdeaIndex = 0;
let countdownToken = 0;
const BPM = 90;
const BEAT_MS = 60000 / BPM;
const rhythmPatterns = [['1', '2', '3', '4'], ['12', '12', '12', '3'], ['1234', '1234', '1234', '12'], ['1234', '12', '1234', '12']];

function showToast(message) {
  const toast = $('#toast'); toast.textContent = message; toast.classList.add('show');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}

function showStudio(push = true) {
  $('#homeView').hidden = true; $('#studioView').hidden = false;
  if (push && location.hash !== '#studio') history.pushState({ studio: true }, '', '#studio');
  window.scrollTo({ top: 0, behavior: 'auto' }); setTimeout(() => $('#demoBarButton').focus(), 40);
}

function showHome(push = true) {
  stopPractice(); $('#studioView').hidden = true; $('#homeView').hidden = false;
  if (push) history.pushState({}, '', '#home');
  window.scrollTo({ top: 0, behavior: 'auto' }); setTimeout(() => $('#enterStudio').focus(), 40);
}

function goStage(stage) {
  if (stage > unlockedStage) return showToast('先完成当前关卡，再升级');
  stopPractice();
  $$('.level-stage').forEach(section => { const active = Number(section.dataset.stage) === stage; section.hidden = !active; section.classList.toggle('active', active); });
  $$('.level-progress button').forEach(button => {
    const number = Number(button.dataset.stageTarget);
    button.classList.toggle('active', number === stage); button.classList.toggle('unlocked', number <= unlockedStage);
  });
  window.scrollTo({ top: $('#studioView').offsetTop, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  setTimeout(() => $(`.level-stage[data-stage="${stage}"] h2`)?.focus?.(), 300);
}

function upgradeTo(stage) {
  if (stage === 3 && !beginnerLines.length) return showToast('先选择一个事件，读完初级版本');
  if (stage === 4) {
    const emptySlots = $$('.sentence input').filter(input => !input.value.trim());
    if (emptySlots.length) { emptySlots[0].focus(); return showToast(`还有 ${emptySlots.length} 个空格，填写或点击“给我灵感”`); }
  }
  if (stage === 4) seedFreeCreation();
  if (stage === 5) renderFinalTrack();
  unlockedStage = Math.max(unlockedStage, stage); goStage(stage); tone(820, .13, .07); showToast(`LEVEL ${stage} 已解锁`);
}

function ensureAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    masterGain = audioCtx.createGain(); masterGain.gain.value = .72;
    const compressor = audioCtx.createDynamicsCompressor(); compressor.threshold.value = -16; compressor.ratio.value = 4; compressor.attack.value = .008; compressor.release.value = .24;
    reverbInput = audioCtx.createConvolver(); const impulse = audioCtx.createBuffer(2, audioCtx.sampleRate * 1.6, audioCtx.sampleRate);
    for (let channel = 0; channel < impulse.numberOfChannels; channel++) { const data = impulse.getChannelData(channel); for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 2.7); }
    reverbInput.buffer = impulse; const reverbGain = audioCtx.createGain(); reverbGain.gain.value = .17;
    masterGain.connect(compressor); reverbInput.connect(reverbGain).connect(compressor); compressor.connect(audioCtx.destination);
  }
  return audioCtx;
}
async function unlockAudio() { const ctx = ensureAudio(); if (ctx.state !== 'running') await ctx.resume(); return ctx; }
async function tone(freq = 520, duration = .07, volume = .05) {
  if (!soundEnabled) return; const ctx = await unlockAudio(); const osc = ctx.createOscillator(); const gain = ctx.createGain();
  osc.frequency.value = freq; gain.gain.setValueAtTime(volume, ctx.currentTime); gain.gain.exponentialRampToValueAtTime(.001, ctx.currentTime + duration);
  osc.connect(gain).connect(masterGain); osc.start(); osc.stop(ctx.currentTime + duration);
}
function connectWithSpace(node, output, amount = .18) { node.connect(output); if (output === masterGain && reverbInput) { const send = audioCtx.createGain(); send.gain.value = amount; node.connect(send).connect(reverbInput); } }
function kick(output = masterGain) { const ctx = ensureAudio(); const osc = ctx.createOscillator(); const gain = ctx.createGain(); osc.frequency.setValueAtTime(135, ctx.currentTime); osc.frequency.exponentialRampToValueAtTime(48, ctx.currentTime + .13); gain.gain.setValueAtTime(.72, ctx.currentTime); gain.gain.exponentialRampToValueAtTime(.001, ctx.currentTime + .17); osc.connect(gain); connectWithSpace(gain, output, .08); osc.start(); osc.stop(ctx.currentTime + .18); }
function noiseHit(type, output = masterGain) { const ctx = ensureAudio(); const length = Math.floor(ctx.sampleRate * (type === 'snare' ? .12 : .04)); const buffer = ctx.createBuffer(1, length, ctx.sampleRate); const data = buffer.getChannelData(0); for (let i = 0; i < length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / length); const source = ctx.createBufferSource(); const filter = ctx.createBiquadFilter(); const gain = ctx.createGain(); source.buffer = buffer; filter.type = type === 'snare' ? 'bandpass' : 'highpass'; filter.frequency.value = type === 'snare' ? 1500 : 5800; gain.gain.setValueAtTime(type === 'snare' ? .34 : .14, ctx.currentTime); gain.gain.exponentialRampToValueAtTime(.001, ctx.currentTime + (type === 'snare' ? .12 : .04)); source.connect(filter).connect(gain); connectWithSpace(gain, output, type === 'snare' ? .32 : .11); source.start(); }
function clickTone(accent, output = masterGain) { const ctx = ensureAudio(); const osc = ctx.createOscillator(); const gain = ctx.createGain(); osc.type = 'triangle'; osc.frequency.value = accent ? 720 : 520; gain.gain.setValueAtTime(accent ? .13 : .075, ctx.currentTime); gain.gain.exponentialRampToValueAtTime(.001, ctx.currentTime + .055); osc.connect(gain).connect(output); osc.start(); osc.stop(ctx.currentTime + .06); }
function ambientPad(output = masterGain) { const ctx = ensureAudio(), filter = ctx.createBiquadFilter(), gain = ctx.createGain(); filter.type = 'lowpass'; filter.frequency.value = 980; gain.gain.setValueAtTime(.001, ctx.currentTime); gain.gain.exponentialRampToValueAtTime(.026, ctx.currentTime + .18); gain.gain.exponentialRampToValueAtTime(.001, ctx.currentTime + 2.55); filter.connect(gain); connectWithSpace(gain, output, .46); [130.81, 164.81, 196].forEach((frequency, index) => { const osc = ctx.createOscillator(); osc.type = index ? 'sine' : 'triangle'; osc.frequency.value = frequency; osc.detune.value = index * 2; osc.connect(filter); osc.start(); osc.stop(ctx.currentTime + 2.6); }); }
function electroPluck(step, output = masterGain) { const ctx = ensureAudio(), osc = ctx.createOscillator(), filter = ctx.createBiquadFilter(), gain = ctx.createGain(), notes = [261.63, 329.63, 392, 523.25]; osc.type = 'sawtooth'; osc.frequency.value = notes[step % notes.length]; filter.type = 'lowpass'; filter.frequency.setValueAtTime(2100, ctx.currentTime); filter.frequency.exponentialRampToValueAtTime(620, ctx.currentTime + .18); gain.gain.setValueAtTime(.055, ctx.currentTime); gain.gain.exponentialRampToValueAtTime(.001, ctx.currentTime + .22); osc.connect(filter).connect(gain); connectWithSpace(gain, output, .24); osc.start(); osc.stop(ctx.currentTime + .23); }
function playBeat(step, output = masterGain) { if (step === 0 || step === 2) kick(output); else noiseHit('snare', output); noiseHit('hat', output); setTimeout(() => noiseHit('hat', output), BEAT_MS / 2); electroPluck(step, output); if (step === 0) ambientPad(output); }

function delay(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }
async function visualCountdown(element) {
  const token = ++countdownToken; element.classList.add('show');
  for (const value of ['3', '2', '1', 'GO']) { if (token !== countdownToken) return false; element.textContent = value; element.dataset.value = value; await tone(value === 'GO' ? 820 : 430, .11, .08); await delay(value === 'GO' ? 450 : 650); }
  if (token !== countdownToken) return false; element.classList.remove('show'); element.textContent = ''; return true;
}

async function playDemoBar() {
  if (demoPlaying) return; demoPlaying = true; const button = $('#demoBarButton'); const cells = $$('#demoBeats span'); button.disabled = true; $('span', button).textContent = '正在播放';
  try { await unlockAudio(); for (let step = 0; step < 4; step++) { cells.forEach((cell, index) => cell.classList.toggle('on', index === step)); playBeat(step); await delay(BEAT_MS); } $('#metronomeStatus').textContent = '90 BPM 电子 Beat 听完了，选择一种数字节奏开口练习'; }
  finally { cells.forEach(cell => cell.classList.remove('on')); button.disabled = false; $('span', button).textContent = '再听背景 Flow'; demoPlaying = false; }
}

async function playRhythmPattern(index, button) {
  if (demoPlaying) return; demoPlaying = true; const card = button.closest('.rhythm-card'), groups = $$('.rhythm-groups span', card), pattern = rhythmPatterns[index];
  button.disabled = true; $('span', button).textContent = '跟着数字念'; $$('.rhythm-card').forEach(item => item.classList.remove('playing', 'complete')); card.classList.add('playing');
  try { await unlockAudio();
    for (let beat = 0; beat < 4; beat++) { groups.forEach((group, groupIndex) => group.classList.toggle('on', groupIndex === beat)); playBeat(beat); const digits = pattern[beat].length; for (let pulse = 0; pulse < digits; pulse++) { setTimeout(() => clickTone(pulse === 0), pulse * (BEAT_MS / digits)); } await delay(BEAT_MS); }
    card.classList.add('complete'); $('#metronomeStatus').textContent = `节奏型 ${index + 1} 完成！可以再练一次，或者挑战下一张`; showToast(`节奏型 ${index + 1} 完成`);
  } finally { groups.forEach(group => group.classList.remove('on')); card.classList.remove('playing'); button.disabled = false; $('span', button).textContent = '再练一次'; demoPlaying = false; }
}

function selectEvent(key, withFeedback = false) {
  currentEvent = key; finalIdeaIndex = 0; inspireIndex = { line2: 0, line3: 0, line4: 0 }; const data = eventData[key]; beginnerLines = [...data.beginner]; selectedClosing = data.endings[0];
  $$('.event-grid button').forEach(button => { const active = button.dataset.event === key; button.classList.toggle('active', active); button.setAttribute('aria-pressed', String(active)); });
  $('[data-slot="thing"]').value = data.first[0]; $('[data-slot="action"]').value = data.first[1];
  ['subject', 'image', 'plan', 'result', 'can', 'will'].forEach(slot => $(`[data-slot="${slot}"]`).value = '');
  $$('.technique-grid button').forEach(button => { $('small', button).textContent = data.techniques[button.dataset.technique]; });
  renderBeginner(); renderClosingChoices(); renderGuided();
  if (withFeedback) { tone(600, .07, .045); showToast(`${data.title} 已载入`); }
}

function renderBeginner() {
  const adlib = eventData[currentEvent].adlib;
  $('#beginnerDraft').innerHTML = beginnerLines.length ? `<ol>${beginnerLines.map((line, index) => `<li><span>${String(index + 1).padStart(2, '0')}</span><b>${line}</b></li>`).join('')}</ol><div class="draft-adlib"><span>AD-LIB · 不计入正文</span><b>${adlib}</b></div>` : '<div class="empty-draft">选择一个事件，初级歌词就会出现在这里。</div>';
  renderPrompter('beginnerPrompter', beginnerLines.length ? [...beginnerLines, adlib] : ['选择事件后，准备跟读']);
}

function guidedLines() {
  const value = slot => $(`[data-slot="${slot}"]`).value.trim() || '____';
  return [`今天${value('thing')}突然${value('action')}`, `我的${value('subject')}好像${value('image')}`, `我本来想${value('plan')}，结果${value('result')}`, `谁说我不能${value('can')}，我偏要${value('will')}`, selectedClosing, eventData[currentEvent].adlib];
}

function inspire(line) {
  if (line === 'line1') { const first = eventData[currentEvent].first; $('[data-slot="thing"]').value = first[0]; $('[data-slot="action"]').value = first[1]; }
  else { const pool = inspirationByEvent[currentEvent][line]; const pair = pool[inspireIndex[line]++ % pool.length]; const slots = line === 'line2' ? ['subject', 'image'] : line === 'line3' ? ['plan', 'result'] : ['can', 'will']; slots.forEach((slot, index) => $(`[data-slot="${slot}"]`).value = pair[index]); }
  renderGuided(); tone(630, .08, .05);
}

function renderClosingChoices() {
  $('#closingChoices').innerHTML = eventData[currentEvent].endings.map((line, index) => `<button class="${line === selectedClosing ? 'active' : ''}" type="button" data-closing-index="${index}">${line}</button>`).join('');
}
function chooseClosing(index) { selectedClosing = eventData[currentEvent].endings[index]; renderClosingChoices(); renderGuided(); tone(720, .08, .055); }
function renderGuided() { renderPrompter('guidedPrompter', guidedLines()); }

function seedFreeCreation() {
  const lines = guidedLines(); const data = eventData[currentEvent];
  $('[data-free="fact"]').value = lines[0]; $('[data-free="exaggeration"]').value = lines[1]; $('[data-free="turn"]').value = lines[2]; $('[data-free="closing"]').value = selectedClosing;
  $('#finalPunch').value = data.finalIdeas[0]; $('#strongLine').value = data.techniques.repeat;
  $$('.technique-grid button').forEach(button => button.classList.toggle('active', button.dataset.technique === 'repeat'));
  renderFreePreview();
}
function freeLines() { return ['fact', 'exaggeration', 'turn', 'closing'].map(key => $(`[data-free="${key}"]`).value.trim() || '这一句等你来写').concat([$('#finalPunch').value.trim() || '写下新的结尾句', $('#strongLine').value.trim() || '写下你的最强一句']); }
function renderFreePreview() { $('#freePreview').innerHTML = freeLines().map((line, index) => `<li><span>${String(index + 1).padStart(2, '0')}</span><b>${line}</b></li>`).join(''); }
function selectTechnique(button) { $$('.technique-grid button').forEach(item => item.classList.toggle('active', item === button)); $('#strongLine').value = eventData[currentEvent].techniques[button.dataset.technique]; renderFreePreview(); tone(680, .08, .05); }
function autoFinalPunch() { const pool = eventData[currentEvent].finalIdeas; finalIdeaIndex = (finalIdeaIndex + 1) % pool.length; $('#finalPunch').value = pool[finalIdeaIndex]; renderFreePreview(); tone(640, .08, .05); }
function renderFinalTrack() { const lines = freeLines(), adlib = eventData[currentEvent].adlib; $('#finalTrackLines').innerHTML = lines.map((line, index) => `<li><span>${String(index + 1).padStart(2, '0')}</span><b>${line}</b></li>`).join(''); $('#finalTrackAdlib').textContent = adlib; renderPrompter('finalPrompter', [...lines, adlib]); }

function expandPrompterLines(lines) { return lines.flatMap(line => line.split(/[，,]/).map(part => part.trim()).filter(Boolean)); }
function renderPrompter(id, lines) { const track = $(`#${id}`), screens = expandPrompterLines(lines); track.innerHTML = screens.map((line, index) => `<p class="${index === 0 ? 'active' : ''}">${line}</p>`).join(''); track.style.transform = 'translateY(0)'; }
function getPracticeLines(kind) { return kind === 'beginner' ? [...beginnerLines, eventData[currentEvent].adlib] : kind === 'guided' ? guidedLines() : [...freeLines(), eventData[currentEvent].adlib]; }

async function startPractice(kind, button) {
  if (practicePreparing) return;
  if (practiceState) { if (practiceState.button === button) return stopPractice(); stopPractice(); }
  if (kind === 'beginner' && !beginnerLines.length) return showToast('先选择一个事件生成歌词');
  const sourceLines = getPracticeLines(kind); if (!sourceLines.length) return showToast('先选择一个事件生成歌词');
  const lines = expandPrompterLines(sourceLines);
  await unlockAudio(); const consoleEl = button.closest('.practice-console'); const track = $('.prompter-track', consoleEl); renderPrompter(track.id, lines);
  let countEl = $('.practice-countdown', consoleEl); if (!countEl) { countEl = document.createElement('div'); countEl.className = 'practice-countdown'; countEl.setAttribute('aria-live', 'assertive'); consoleEl.append(countEl); }
  practicePreparing = true; button.disabled = true; $('span', button).textContent = '准备进入';
  try { if (!await visualCountdown(countEl)) return; practiceState = { kind, button, consoleEl, track, lines, line: 0, beat: 0 }; button.classList.add('playing'); $('span', button).textContent = '停止练习'; practiceTick(); beatTimer = setInterval(practiceTick, BEAT_MS); }
  finally { practicePreparing = false; button.disabled = false; }
}

function practiceTick() {
  if (!practiceState) return; const state = practiceState; const lights = $$('.console-beats i', state.consoleEl); const items = $$('p', state.track);
  lights.forEach((light, index) => light.classList.toggle('on', index === state.beat)); items.forEach((item, index) => item.classList.toggle('active', index === state.line));
  state.track.style.transform = `translateY(-${state.line * 76}px)`; playBeat(state.beat); state.beat += 1;
  if (state.beat === 4) { state.beat = 0; state.line += 1; if (state.line >= state.lines.length) { setTimeout(() => { showToast('完整读完一遍！'); stopPractice(); }, BEAT_MS * .8); } }
}
function stopPractice() { countdownToken++; practicePreparing = false; $$('.practice-countdown,.warmup-countdown').forEach(el => { el.classList.remove('show'); el.textContent = ''; }); if (!practiceState) return; clearInterval(beatTimer); $$('.console-beats i', practiceState.consoleEl).forEach(light => light.classList.remove('on')); practiceState.button.classList.remove('playing'); $('span', practiceState.button).textContent = practiceState.kind === 'beginner' ? '跟节奏读一遍' : practiceState.kind === 'guided' ? '跟节奏读我的版本' : '先完整练一遍'; practiceState = null; }

async function setupMic() { if (!window.isSecureContext || !navigator.mediaDevices?.getUserMedia) throw new Error('麦克风要求 HTTPS 或 localhost。局域网 HTTP 可以浏览和听节拍，但浏览器可能禁止录音。'); if (!micStream) { micStream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true } }); const source = ensureAudio().createMediaStreamSource(micStream); analyser = audioCtx.createAnalyser(); analyser.fftSize = 256; source.connect(analyser); drawWave(); } }
function drawWave() { const canvas = $('#waveform'), context = canvas.getContext('2d'), data = new Uint8Array(analyser ? analyser.frequencyBinCount : 64); const draw = () => { animationFrame = requestAnimationFrame(draw); if (analyser) analyser.getByteTimeDomainData(data); else data.fill(128); context.clearRect(0,0,canvas.width,canvas.height); context.strokeStyle = mediaRecorder?.state === 'recording' ? '#b9f227' : '#8b5cf6'; context.lineWidth = 4; context.beginPath(); data.forEach((value,index) => { const x=index/Math.max(data.length-1,1)*canvas.width, y=value/255*canvas.height; index?context.lineTo(x,y):context.moveTo(x,y); }); context.stroke(); }; cancelAnimationFrame(animationFrame); draw(); }
async function countdown() { for (const value of ['3','2','1','GO']) { $('#countdown').textContent=value; await tone(value==='GO'?820:430,.1,.08); await new Promise(resolve=>setTimeout(resolve,value==='GO'?500:700)); } $('#countdown').textContent=''; }
function preferredMime() { return ['audio/webm;codecs=opus','audio/mp4','audio/webm'].find(type=>window.MediaRecorder?.isTypeSupported(type)); }
function startRecordingBeat(output) { clearInterval(beatTimer); beatStep=0; playBeat(0,output); beatStep=1; beatTimer=setInterval(()=>{playBeat(beatStep,output);beatStep=(beatStep+1)%4;},BEAT_MS); }
async function startRecording() { const button=$('#recordButton'); try { button.disabled=true; $('#recorderMessage').textContent='正在连接麦克风…'; await setupMic(); await unlockAudio(); await countdown(); const destination=audioCtx.createMediaStreamDestination(), micSource=audioCtx.createMediaStreamSource(micStream), micGain=audioCtx.createGain(), beatGain=audioCtx.createGain(); micGain.gain.value=1.05; beatGain.gain.value=.5; micSource.connect(micGain).connect(destination); beatGain.connect(destination); beatGain.connect(masterGain); recordedChunks=[]; const mime=preferredMime(); mediaRecorder=mime?new MediaRecorder(destination.stream,{mimeType:mime}):new MediaRecorder(destination.stream); mediaRecorder.ondataavailable=e=>{if(e.data.size)recordedChunks.push(e.data)}; mediaRecorder.onstop=finishRecording; mediaRecorder.start(500); startRecordingBeat(beatGain); recordSeconds=0; updateRecordTime(); recordTimer=setInterval(()=>{recordSeconds++;updateRecordTime();if(recordSeconds>=60)stopRecording();},1000); button.classList.add('recording'); $('b',button).textContent='正在录音'; $('#stopButton').disabled=false; $('#recorderMessage').textContent='正在录制 · 唱出你的 TRACK'; $('#playbackPanel').hidden=true; } catch(error) { $('#recorderMessage').textContent=error.name==='NotAllowedError'?'麦克风权限被拒绝，请重新允许。':error.message; showToast('麦克风没有连接成功'); } finally { button.disabled=mediaRecorder?.state==='recording'; } }
function updateRecordTime(){ $('#recordTime').textContent=`00:${String(recordSeconds).padStart(2,'0')}`; }
function stopRecording(){ if(mediaRecorder?.state==='recording')mediaRecorder.stop(); clearInterval(recordTimer);clearInterval(beatTimer); $('#recordButton').classList.remove('recording');$('b',$('#recordButton')).textContent='再录一遍';$('#recordButton').disabled=false;$('#stopButton').disabled=true; }
function finishRecording(){ const type=mediaRecorder.mimeType||'audio/webm',blob=new Blob(recordedChunks,{type}),url=URL.createObjectURL(blob);$('#playbackAudio').src=url;$('#downloadLink').href=url;$('#downloadLink').download=`LEON-TRACK-${Date.now()}.${type.includes('mp4')?'m4a':'webm'}`;$('#playbackPanel').hidden=false;$('#recorderMessage').textContent=`完成 ${recordSeconds} 秒 TRACK，马上回听！`;showToast('TRACK 录好了！');tone(780,.18,.07); }

$('#enterStudio').addEventListener('click',()=>showStudio()); $('#backHome').addEventListener('click',()=>showHome()); $('#brandHome').addEventListener('click',e=>{e.preventDefault();showHome()});
$('#demoBarButton').addEventListener('click',playDemoBar); $$('[data-rhythm]').forEach(button=>button.addEventListener('click',()=>playRhythmPattern(Number(button.dataset.rhythm),button))); $$('.upgrade-button').forEach(button=>button.addEventListener('click',()=>upgradeTo(Number(button.dataset.upgrade)))); $$('.level-progress button').forEach(button=>button.addEventListener('click',()=>goStage(Number(button.dataset.stageTarget))));
$$('.event-grid button').forEach(button=>button.addEventListener('click',()=>selectEvent(button.dataset.event,true)));
$$('[data-inspire]').forEach(button=>button.addEventListener('click',()=>inspire(button.dataset.inspire))); $$('.sentence input').forEach(input=>input.addEventListener('input',renderGuided)); $('#closingChoices').addEventListener('click',event=>{const button=event.target.closest('[data-closing-index]');if(button)chooseClosing(Number(button.dataset.closingIndex))});
$$('.practice-button').forEach(button=>button.addEventListener('click',()=>startPractice(button.dataset.practice,button))); $$('.free-editor input,#finalPunch,#strongLine').forEach(input=>input.addEventListener('input',renderFreePreview)); $$('.technique-grid button').forEach(button=>button.addEventListener('click',()=>selectTechnique(button))); $('#autoFinalPunch').addEventListener('click',autoFinalPunch);
$('#recordButton').addEventListener('click',startRecording);$('#stopButton').addEventListener('click',stopRecording);$('#soundToggle').addEventListener('click',event=>{soundEnabled=!soundEnabled;event.currentTarget.setAttribute('aria-pressed',soundEnabled);event.currentTarget.setAttribute('aria-label',soundEnabled?'关闭界面音效':'开启界面音效');showToast(soundEnabled?'声音已开启':'界面音效已关闭');if(soundEnabled)tone();});
window.addEventListener('popstate',()=>location.hash==='#studio'?showStudio(false):showHome(false));

selectEvent('pencil'); renderFreePreview(); renderFinalTrack(); drawWave(); if(location.hash==='#studio')showStudio(false);
window.addEventListener('beforeunload',()=>micStream?.getTracks().forEach(track=>track.stop()));
