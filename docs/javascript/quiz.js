/**
 * quiz.js — Casual Learning Quiz System
 *
 * Usage: <div class="quiz" file="path/to/quiz.json"></div>
 *
 * JSON structure:
 * {
 *   "title":       string,
 *   "description": string,
 *   "questions": [
 *     {
 *       "question":    string,
 *       "options":     string[],
 *       "correct":     number,   // zero-based index
 *       "explanation": string    // shown after every answer regardless of correct/wrong
 *     }
 *   ]
 * }
 */

(() => {
  // ── Helpers ───────────────────────────────────────────────────────────────

  function esc(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return [...(ctx || document).querySelectorAll(sel)]; }

  // ── Phase 1: Start screen ─────────────────────────────────────────────────

  function renderStart(el, data) {
    el.innerHTML = `
      <div class="qz-card">
        <div class="qz-start-body">
          <p class="qz-eyebrow">Quiz</p>
          <h2 class="qz-title">${esc(data.title)}</h2>
          <p class="qz-desc">${esc(data.description)}</p>
          <div class="qz-chips">
            <span class="qz-chip">${data.questions.length} questions</span>
            <span class="qz-chip">Single choice</span>
          </div>
        </div>
        <div class="qz-start-footer">
          <button class="qz-btn qz-btn--primary qz-js-start">Start Quiz</button>
        </div>
      </div>`;

    $('.qz-js-start', el).addEventListener('click', () => {
      renderQuestion(el, data, 0, []);
    });
  }

  // ── Phase 2: Question screen ──────────────────────────────────────────────

  function renderQuestion(el, data, index, answers) {
    const q = data.questions[index];
    const total = data.questions.length;
    const progressPct = (index / total) * 100;
    const isLast = index + 1 === total;

    el.innerHTML = `
      <div class="qz-card">
        <div class="qz-header">
          <div class="qz-header-meta">
            <span class="qz-header-title">${esc(data.title)}</span>
            <span class="qz-header-count">Question ${index + 1} of ${total}</span>
          </div>
          <div class="qz-progress-track">
            <div class="qz-progress-fill" style="width: ${progressPct}%"></div>
          </div>
        </div>

        <div class="qz-body">
          <p class="qz-question">${esc(q.question)}</p>
          <div class="qz-options" role="list">
            ${q.options.map((opt, i) => `
              <button class="qz-opt" data-index="${i}" role="listitem">${esc(opt)}</button>
            `).join('')}
          </div>
          <div class="qz-feedback qz-hidden" aria-live="polite"></div>
        </div>

        <div class="qz-footer">
          <button class="qz-btn qz-btn--primary qz-js-next" disabled>
            ${isLast ? 'See Results' : 'Next Question'}
          </button>
        </div>
      </div>`;

    let answered = false;

    $$('.qz-opt', el).forEach(btn => {
      btn.addEventListener('click', () => {
        if (answered) return;
        answered = true;

        const chosen = parseInt(btn.dataset.index, 10);
        const isCorrect = chosen === q.correct;

        // Lock and colour all options
        $$('.qz-opt', el).forEach((b, i) => {
          b.disabled = true;
          if (i === q.correct) {
            b.classList.add('qz-opt--correct');
          }
          if (i === chosen && !isCorrect) {
            b.classList.add('qz-opt--wrong');
          }
        });

        // Show the explanation feedback box
        const feedback = $('.qz-feedback', el);
        feedback.classList.remove('qz-hidden');
        feedback.classList.add(isCorrect ? 'qz-feedback--correct' : 'qz-feedback--wrong');
        feedback.innerHTML = `
          <div class="qz-feedback-icon">${isCorrect ? '✓' : '✗'}</div>
          <div class="qz-feedback-content">
            <strong>${isCorrect ? 'Correct!' : 'Not quite — the correct answer is highlighted above.'}</strong>
            <p>${esc(q.explanation)}</p>
          </div>`;

        // Record answer and enable Next
        const newAnswers = [...answers, chosen];
        const nextBtn = $('.qz-js-next', el);
        nextBtn.disabled = false;
        nextBtn.addEventListener('click', () => {
          if (index + 1 < total) {
            renderQuestion(el, data, index + 1, newAnswers);
          } else {
            renderResults(el, data, newAnswers);
          }
        });
      });
    });
  }

  // ── Phase 3: Results screen ───────────────────────────────────────────────

  function renderResults(el, data, answers) {
    const total = data.questions.length;
    const correctCount = answers.filter((ans, i) => ans === data.questions[i].correct).length;
    const wrongCount = total - correctCount;
    const pct = Math.round((correctCount / total) * 100);

    const rows = data.questions.map((q, i) => {
      const isCorrect = answers[i] === q.correct;
      return `
        <div class="qz-result-row ${isCorrect ? 'qz-result-row--correct' : 'qz-result-row--wrong'}">
          <span class="qz-result-icon">${isCorrect ? '✓' : '✗'}</span>
          <span class="qz-result-text">${esc(q.question)}</span>
        </div>`;
    }).join('');

    el.innerHTML = `
      <div class="qz-card">
        <div class="qz-header">
          <div class="qz-header-meta">
            <span class="qz-header-title">${esc(data.title)}</span>
            <span class="qz-header-count">Results</span>
          </div>
          <div class="qz-progress-track">
            <div class="qz-progress-fill" style="width: 100%"></div>
          </div>
        </div>

        <div class="qz-body">
          <div class="qz-score-block">
            <p class="qz-score-num">${correctCount}<span class="qz-score-denom"> / ${total}</span></p>
            <p class="qz-score-pct">${pct}% correct</p>
            <div class="qz-chips">
              <span class="qz-chip qz-chip--correct">✓ ${correctCount} correct</span>
              <span class="qz-chip qz-chip--wrong">✗ ${wrongCount} wrong</span>
            </div>
          </div>
          <div class="qz-result-list">${rows}</div>
        </div>

        <div class="qz-footer">
          <button class="qz-btn qz-btn--ghost qz-js-retry">Retry Quiz</button>
        </div>
      </div>`;

    $('.qz-js-retry', el).addEventListener('click', () => renderStart(el, data));
  }

  // ── Error state ───────────────────────────────────────────────────────────

  function renderError(el, file, message) {
    el.innerHTML = `
      <div class="qz-card qz-card--error">
        <p class="qz-error-heading">⚠ Failed to load quiz</p>
        <code class="qz-error-file">${esc(file)}</code>
        <p class="qz-error-msg">${esc(message)}</p>
      </div>`;
  }

  // ── Bootstrap ─────────────────────────────────────────────────────────────

  function init() {
    const elements = document.getElementsByClassName('quiz');

    if (elements.length === 0) {
      console.info('[Quiz] No .quiz elements found on this page.');
      return;
    }

    Array.from(elements).forEach(el => {
      const file = el.getAttribute('file');

      if (!file) {
        renderError(el, '(none)', 'Missing file attribute on .quiz element.');
        return;
      }

      fetch(file)
        .then(r => {
          if (!r.ok) throw new Error(`HTTP ${r.status}`);
          return r.json();
        })
        .then(data => renderStart(el, data))
        .catch(err => {
          console.error(`[Quiz] Could not load "${file}":`, err);
          renderError(el, file, err.message);
        });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();