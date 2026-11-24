/* ===========================================================
   Flappy Chim Lửa – Bài tập Chương 6 (Advanced FrontEnd) – Nhóm 2
   Yêu cầu đã làm:
   - Đổi ảnh Bird + ống khói theo cá nhân (thư mục images/)
   - Level hiển thị góc trên bên trái; 5/20/40 điểm lên Level 2/3/4; 50 điểm thắng
   - Interval theo Level: 40 / 30 / 25 / 20
   - Thay sự kiện mousedown bằng keydown: Arrow Down
   - Nâng cao: game mượt hơn (requestAnimationFrame + bước thời gian cố định
     theo Interval, hitbox khoan dung, khe ống rộng hơn, giới hạn tốc độ rơi),
     tạm dừng, best score, âm thanh, hiệu ứng lên level.
   =========================================================== */
(function () {
  'use strict';

  // ---------- Cấu hình ----------
  var W = 360, H = 560, GROUND_H = 80, PLAY_H = H - GROUND_H;
  var LEVEL_INTERVAL = { 1: 40, 2: 30, 3: 25, 4: 20 };   // "Interval" theo đề (ms / 1 tick)
  var LEVEL_AT = [ [40, 4], [20, 3], [5, 2], [0, 1] ];     // [điểm tối thiểu, level]
  var WIN_SCORE = 50;

  var PIPE_W = 64, GAP = 140, PIPE_SPACING = 200, PIPE_SPEED = 3;  // px / tick
  var GRAVITY = 0.30, FLAP_V = -5.4, MAX_FALL = 7.5;               // px / tick
  var BIRD_X = 90, BIRD_W = 48, BIRD_H = 36, HIT_PAD = 5;          // HIT_PAD: hitbox nhỏ hơn ảnh -> dễ chơi hơn

  var canvas = document.getElementById('game');
  var ctx = canvas.getContext('2d');

  // ---------- Ảnh ----------
  var IMG = {}, toLoad = 0, loaded = 0;
  ['bird', 'bg', 'ground', 'chimney_top', 'chimney_bottom'].forEach(function (n) {
    toLoad++;
    var im = new Image();
    im.onload = function () { loaded++; };
    im.onerror = function () { loaded++; IMG[n] = null; };
    im.src = 'images/' + n + '.png';
    IMG[n] = im;
  });

  // ---------- Âm thanh (WebAudio, không cần file) ----------
  var audioCtx = null, muted = false;
  function beep(freq, dur, type, vol) {
    if (muted) return;
    try {
      audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      var o = audioCtx.createOscillator(), g = audioCtx.createGain();
      o.type = type || 'square'; o.frequency.value = freq;
      g.gain.value = vol || 0.04;
      o.connect(g); g.connect(audioCtx.destination);
      o.start(); g.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + dur);
      o.stop(audioCtx.currentTime + dur);
    } catch (e) { /* trình duyệt không hỗ trợ -> bỏ qua */ }
  }

  // ---------- Trạng thái ----------
  var state, bird, pipes, score, level, best, groundX, levelFlash, last;

  function loadBest() { try { return +localStorage.getItem('flappy_best') || 0; } catch (e) { return 0; } }
  function saveBest() { try { localStorage.setItem('flappy_best', best); } catch (e) {} }

  function levelFor(s) {
    for (var i = 0; i < LEVEL_AT.length; i++) if (s >= LEVEL_AT[i][0]) return LEVEL_AT[i][1];
    return 1;
  }
  function interval() { return LEVEL_INTERVAL[level]; }

  function reset() {
    bird = { y: PLAY_H / 2 - BIRD_H / 2, vy: 0, rot: 0 };
    pipes = [];
    score = 0; level = 1; groundX = 0; levelFlash = 0;
    best = best || loadBest();
    spawnPipe(W + 60);
    state = 'ready';
  }

  function spawnPipe(x) {
    var min = 70, max = PLAY_H - GAP - 70;
    pipes.push({ x: x, gapY: min + Math.random() * (max - min), passed: false });
  }

  // ---------- Điều khiển: keydown Arrow Down thay cho mousedown ----------
  function flap() {
    if (state === 'ready') { state = 'playing'; last = performance.now(); }
    if (state === 'playing') { bird.vy = FLAP_V; beep(520, 0.09, 'square'); }
    else if (state === 'dead' || state === 'win') { reset(); }
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowDown' || e.code === 'ArrowDown') {
      e.preventDefault();                // không cho trang cuộn xuống
      if (!e.repeat) flap();
    } else if (e.key === 'p' || e.key === 'P') {
      if (state === 'playing') state = 'paused';
      else if (state === 'paused') { state = 'playing'; last = performance.now(); }
    } else if (e.key === 'm' || e.key === 'M') {
      muted = !muted;
    }
  });
  window.addEventListener('blur', function () { if (state === 'playing') state = 'paused'; });

  // ---------- Cập nhật logic (1 bước <= 1 tick) ----------
  function step(t) {                     // t: số tick (có thể lẻ) của Level hiện tại
    bird.vy = Math.min(bird.vy + GRAVITY * t, MAX_FALL);
    bird.y += bird.vy * t;
    bird.rot = Math.max(-0.45, Math.min(1.2, bird.vy / 9));
    groundX = (groundX - PIPE_SPEED * t) % 24;

    for (var i = 0; i < pipes.length; i++) pipes[i].x -= PIPE_SPEED * t;
    if (pipes.length && pipes[0].x + PIPE_W < 0) pipes.shift();
    var lastP = pipes[pipes.length - 1];
    if (!lastP || lastP.x < W - PIPE_SPACING) spawnPipe(W + 10);

    // va chạm
    var bx = BIRD_X + HIT_PAD, bw = BIRD_W - 2 * HIT_PAD;
    var by = bird.y + HIT_PAD, bh = BIRD_H - 2 * HIT_PAD;
    if (by + bh >= PLAY_H || by <= 0) return die();
    for (var j = 0; j < pipes.length; j++) {
      var p = pipes[j];
      if (bx + bw > p.x && bx < p.x + PIPE_W && (by < p.gapY || by + bh > p.gapY + GAP)) return die();
      if (!p.passed && p.x + PIPE_W < BIRD_X) { p.passed = true; addScore(); if (state !== 'playing') return; }
    }
  }

  function addScore() {
    score++;
    beep(880, 0.08, 'triangle');
    var nl = levelFor(score);
    if (nl !== level) { level = nl; levelFlash = 60; beep(1175, 0.25, 'triangle', 0.06); }
    if (score >= WIN_SCORE) { state = 'win'; endRound(); beep(1320, 0.5, 'triangle', 0.06); }
  }
  function die() { state = 'dead'; endRound(); beep(160, 0.4, 'sawtooth', 0.06); }
  function endRound() { if (score > best) { best = score; saveBest(); } }

  // ---------- Vòng lặp: render mượt bằng rAF, logic theo Interval ----------
  function frame(now) {
    if (state === 'playing') {
      var dt = Math.min(now - last, 100);        // chặn nhảy cóc khi tab bị treo
      last = now;
      var ticks = dt / interval();               // đổi ms -> tick theo Level
      while (ticks > 0 && state === 'playing') {
        var s = Math.min(1, ticks);              // chia nhỏ để không xuyên ống
        step(s); ticks -= s;
      }
    } else if (state === 'ready') {
      bird.y = PLAY_H / 2 - BIRD_H / 2 + Math.sin(now / 250) * 6;   // chim lơ lửng
      groundX = (groundX - 0.8) % 24;
    }
    if (levelFlash > 0) levelFlash--;
    draw();
    requestAnimationFrame(frame);
  }

  // ---------- Vẽ ----------
  function drawImg(im, x, y, w, h, fallback) {
    if (im && im.complete && im.naturalWidth) ctx.drawImage(im, x, y, w, h);
    else { ctx.fillStyle = fallback; ctx.fillRect(x, y, w, h); }
  }
  function text(str, x, y, size, color, align) {
    ctx.font = 'bold ' + size + 'px "Segoe UI", Arial, sans-serif';
    ctx.textAlign = align || 'center';
    ctx.lineWidth = 4; ctx.strokeStyle = 'rgba(0,0,0,.55)'; ctx.strokeText(str, x, y);
    ctx.fillStyle = color || '#fff'; ctx.fillText(str, x, y);
  }
  function draw() {
    drawImg(IMG.bg, 0, 0, W, H, '#70c5ce');
    pipes.forEach(function (p) {
      var topH = p.gapY, botY = p.gapY + GAP;
      ctx.save(); ctx.beginPath(); ctx.rect(p.x, 0, PIPE_W, topH); ctx.clip();
      drawImg(IMG.chimney_top, p.x, topH - 400, PIPE_W, 400, '#a84230'); ctx.restore();
      ctx.save(); ctx.beginPath(); ctx.rect(p.x, botY, PIPE_W, PLAY_H - botY); ctx.clip();
      drawImg(IMG.chimney_bottom, p.x, botY, PIPE_W, 400, '#a84230'); ctx.restore();
    });
    // mặt đất cuộn
    for (var x = groundX - 24; x < W + 24; x += 360) drawImg(IMG.ground, x, PLAY_H, 360, GROUND_H, '#ded078');
    // chim xoay theo vận tốc
    ctx.save();
    ctx.translate(BIRD_X + BIRD_W / 2, bird.y + BIRD_H / 2); ctx.rotate(bird.rot);
    drawImg(IMG.bird, -BIRD_W / 2, -BIRD_H / 2, BIRD_W, BIRD_H, '#e07034');
    ctx.restore();

    // HUD: Level ở góc trên bên trái (theo đề)
    text('Level ' + level, 12, 30, 22, '#ffd166', 'left');
    text('Best ' + best, W - 12, 30, 16, '#fff', 'right');
    if (state !== 'ready') text(String(score), W / 2, 70, 44, '#fff');

    if (levelFlash > 0 && state === 'playing') {
      ctx.globalAlpha = Math.min(1, levelFlash / 30);
      text('LEVEL ' + level + '!', W / 2, 190, 40, '#ffd166'); ctx.globalAlpha = 1;
    }
    if (state === 'ready') { text('Nhấn ↓ để bắt đầu', W / 2, 200, 24); text('(Arrow Down)', W / 2, 232, 16, '#ddd'); }
    if (state === 'paused') text('TẠM DỪNG – nhấn P', W / 2, 260, 26);
    if (state === 'dead') {
      text('GAME OVER', W / 2, 230, 40, '#ff6b6b');
      text('Điểm: ' + score + '  ·  Level ' + level, W / 2, 268, 20);
      text('Nhấn ↓ để chơi lại', W / 2, 302, 18, '#ddd');
    }
    if (state === 'win') {
      text('🎉 CHIẾN THẮNG! 🎉', W / 2, 230, 34, '#80ed99');
      text('Bạn đạt ' + score + ' điểm', W / 2, 268, 20);
      text('Nhấn ↓ để chơi lại', W / 2, 302, 18, '#ddd');
    }
  }

  // ---------- Khởi động ----------
  reset();
  canvas.focus();
  requestAnimationFrame(frame);

  // Xuất ra window để dễ kiểm thử / chụp minh chứng
  window.__game = {
    get state() { return state; }, get score() { return score; }, get level() { return level; },
    get interval() { return interval(); },
    setScore: function (s) { score = s - 1; addScore(); },     // dùng để demo nhanh các mốc Level
    get bird() { return bird; }, get pipes() { return pipes; }
  };
})();
