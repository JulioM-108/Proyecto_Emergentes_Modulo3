/* PTG · Aprende (E2): lista de piezas, pieza de una sola idea y quiz */
(function () {
  'use strict';
  var D = window.PTG_DATA, PTG = window.PTG, esc = PTG.esc;
  var vista = document.getElementById('vista');
  var id = PTG.param('p');
  var pieza = null;
  D.piezas.forEach(function (p) { if (p.id === id) pieza = p; });

  function aprobada(pid) {
    var s = PTG.perfil.get();
    return !!(s && s.piezas.indexOf(pid) >= 0);
  }

  /* ---------- Lista ---------- */
  function lista() {
    document.title = 'Aprende · PTG';
    vista.innerHTML =
      '<p class="kicker">Aprende</p>' +
      '<h1>Una regla antes de mirar precios</h1>' +
      '<p class="lead">Cada pieza explica una sola idea en 2 o 3 minutos, cierra con un quiz y te lleva a ver esa idea en los números reales.</p>' +
      '<div class="grid grid-3 section" style="margin-top:28px">' +
      D.piezas.map(function (p, i) {
        var ok = aprobada(p.id);
        return '<a class="card pieza-card rise' + (i ? ' rise-' + Math.min(i + 1, 3) : '') + '" href="aprende.html?p=' + p.id + '">' +
          '<div class="pieza-meta"><span class="chip chip-muted">Pieza ' + (i + 1) + '</span>' +
          '<span class="chip chip-info">' + p.minutos + ' min</span>' +
          (ok ? '<span class="chip chip-ok">' + PTG.ICON.check + 'Aprobada</span>' : '') + '</div>' +
          '<h3>' + esc(p.titulo) + '</h3><p>' + esc(p.resumen) + '</p>' +
          '<span class="pieza-cta">' + (ok ? 'Repasar' : 'Empezar') + PTG.ICON.arrow + '</span></a>';
      }).join('') +
      '</div>' +
      '<div class="callout callout-info" style="margin-top:24px">' + PTG.ICON.info +
      '<p>Contenido educativo, no asesoría. Si entras en la <a href="index.html#demo">demo</a>, cada quiz aprobado sube tu nivel.</p></div>';
  }

  /* ---------- Pieza ---------- */
  function vistaPieza(p) {
    var idx = D.piezas.indexOf(p);
    document.title = p.titulo + ' · PTG';
    vista.innerHTML =
      '<article class="pieza">' +
        '<a href="aprende.html" class="small">← Todas las piezas</a>' +
        '<p class="kicker" style="margin-top:18px">Pieza ' + (idx + 1) + ' de ' + D.piezas.length + ' · Una sola idea</p>' +
        '<h1 style="font-size:clamp(30px,5vw,44px)">' + esc(p.titulo) + '</h1>' +
        '<div class="pieza-idea">' + p.idea.map(function (t) { return '<p>' + esc(t) + '</p>'; }).join('') + '</div>' +
        '<div class="ejemplo"><p class="kicker">Ejemplo</p><p style="margin:0">' + esc(p.ejemplo) + '</p></div>' +
        '<div class="regla" style="margin-top:16px"><p class="kicker">La regla</p>' + esc(p.regla) + '</div>' +

        '<section class="section" aria-labelledby="quiz-t">' +
          '<p class="kicker">Quiz</p><h2 id="quiz-t">¿Quedó clara?</h2>' +
          '<form class="quiz" id="quiz" novalidate>' +
          p.quiz.map(function (q, qi) {
            return '<fieldset data-q="' + qi + '"><legend>' + (qi + 1) + '. ' + esc(q.p) + '</legend>' +
              q.o.map(function (o, oi) {
                return '<label class="opt"><input type="radio" name="q' + qi + '" value="' + oi + '"><span>' + esc(o) + '</span></label>';
              }).join('') +
              '<p class="quiz-exp" aria-live="polite"></p></fieldset>';
          }).join('') +
          '<button class="btn btn-dark" type="submit">Revisar respuestas</button>' +
          '</form>' +
          '<div id="quiz-res" aria-live="polite" style="margin-top:16px"></div>' +
        '</section>' +

        '<div class="callout callout-dark" style="margin-top:28px">' + PTG.ICON.info +
        '<p>Esta pieza es educativa. No es asesoría ni una recomendación de inversión. Las cifras son de ejemplo.</p></div>' +

        '<div class="card" style="margin-top:20px;display:flex;flex-wrap:wrap;gap:12px;align-items:center;justify-content:space-between">' +
          '<div><p class="kicker" style="margin:0">Siguiente paso</p><b>Ve esta idea en los números</b></div>' +
          '<a class="btn btn-primary" href="' + p.siguiente.href + '">' + esc(p.siguiente.texto) + PTG.ICON.arrow + '</a>' +
        '</div>' +
      '</article>';

    document.getElementById('quiz').addEventListener('submit', function (ev) {
      ev.preventDefault();
      revisar(p, ev.currentTarget);
    });
  }

  function revisar(p, form) {
    var correctas = 0, sinResponder = 0;
    p.quiz.forEach(function (q, qi) {
      var fs = form.querySelector('fieldset[data-q="' + qi + '"]');
      var marcada = fs.querySelector('input:checked');
      var exp = fs.querySelector('.quiz-exp');
      fs.querySelectorAll('.opt').forEach(function (l) { l.classList.remove('is-ok', 'is-bad'); });
      if (!marcada) {
        sinResponder++;
        exp.className = 'quiz-exp bad';
        exp.textContent = 'Elige una opción.';
        return;
      }
      var ok = +marcada.value === q.c;
      marcada.closest('.opt').classList.add(ok ? 'is-ok' : 'is-bad');
      exp.className = 'quiz-exp ' + (ok ? 'ok' : 'bad');
      exp.textContent = (ok ? 'Correcto. ' : 'No exactamente. ') + q.e;
      if (ok) correctas++;
    });

    var res = document.getElementById('quiz-res');
    var total = p.quiz.length;
    if (sinResponder) {
      res.innerHTML = '<div class="callout callout-warn">' + PTG.ICON.alert + '<p>Te faltan ' + sinResponder + ' pregunta' + (sinResponder > 1 ? 's' : '') + ' por responder.</p></div>';
      return;
    }
    if (correctas < total) {
      res.innerHTML = '<div class="callout callout-warn">' + PTG.ICON.alert + '<p>' + correctas + ' de ' + total +
        ' correctas. Lee la explicación de las marcadas en rojo y vuelve a intentarlo.</p></div>';
      return;
    }
    var s = PTG.perfil.get();
    if (s) {
      var antes = PTG.perfil.nivel(s).numero;
      s = PTG.perfil.aprobar(p.id);
      var n = PTG.perfil.nivel(s);
      PTG.refrescarHeader();
      res.innerHTML = '<div class="callout callout-ok">' + PTG.ICON.check + '<p><b>¡' + total + ' de ' + total + '! Pieza aprobada.</b> ' +
        (n.numero > antes ? 'Subiste a Nivel ' + n.numero + ' · ' + n.nombre + '.' : 'Estás en Nivel ' + n.numero + ' · ' + n.nombre + '.') +
        ' <a href="perfil.html">Ver mi progreso</a></p></div>';
    } else {
      res.innerHTML = '<div class="callout callout-ok">' + PTG.ICON.check + '<p><b>¡' + total + ' de ' + total + '! Pieza aprobada.</b> ' +
        '<a href="index.html#demo">Entra en la demo</a> para que tu nivel quede guardado.</p></div>';
    }
  }

  if (pieza) vistaPieza(pieza); else lista();
})();
