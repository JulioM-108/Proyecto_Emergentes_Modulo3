/*
 * PTG · Layout compartido + utilidades
 * Inserta header, navegación y footer con disclaimer (épica E6 Confianza)
 * en todas las páginas. Cada página declara <body data-page="...">.
 */
(function () {
  'use strict';
  var D = window.PTG_DATA;
  var PTG = window.PTG = window.PTG || {};

  /* ---------- Utilidades ---------- */
  var MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  var fCOP = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });

  PTG.esc = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };
  PTG.cop = function (n) { return fCOP.format(Math.round(n)); };
  PTG.pct = function (n, dec) {
    var d = dec == null ? 2 : dec;
    return new Intl.NumberFormat('es-CO', { minimumFractionDigits: d, maximumFractionDigits: d }).format(n) + ' %';
  };
  PTG.num = function (n) { return new Intl.NumberFormat('es-CO').format(n); };
  PTG.param = function (k) { return new URLSearchParams(location.search).get(k); };
  PTG.fecha = function (iso) {
    var p = String(iso).split('-');
    return (+p[2]) + ' ' + MESES[p[1] - 1] + ' ' + p[0];
  };
  PTG.entidad = function (id) {
    for (var i = 0; i < D.entidades.length; i++) if (D.entidades[i].id === id) return D.entidades[i];
    return null;
  };
  PTG.spread = function (venta) { return (venta - D.trm.valor) / D.trm.valor * 100; };

  /* Sello de confianza: fuente + fecha/hora en cada dato */
  PTG.sello = function (dato) {
    return '<p class="sello">' +
      (dato.ejemplo ? '<span class="sello-ej">Dato de ejemplo</span>' : '') +
      '<span><b>Fuente:</b> ' + PTG.esc(dato.fuente) + '</span>' +
      '<span><b>Corte:</b> ' + PTG.fecha(dato.fecha) + (dato.hora ? ' · ' + PTG.esc(dato.hora) : '') + '</span>' +
      '</p>';
  };
  PTG.chipVigilada = function (e) {
    return e.vigilada
      ? '<span class="chip chip-ok">' + ICON.shield + 'Vigilada SFC</span>'
      : '<span class="chip chip-warn">' + ICON.alert + 'No vigilada SFC</span>';
  };

  var ICON = PTG.ICON = {
    shield: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l7 3v6c0 4.2-3 7.6-7 9-4-1.4-7-4.8-7-9V6z"/><path d="M9 12l2 2 4-4"/></svg>',
    alert: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4l9 16H3z"/><path d="M12 10v4M12 17h.01"/></svg>',
    learn: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 7l9-4 9 4-9 4z"/><path d="M7 9v5c0 1.7 2.2 3 5 3s5-1.3 5-3V9"/></svg>',
    market: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19V5M4 19h16"/><path d="M8 15l3-4 3 2 5-6"/></svg>',
    compare: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4v16M17 4v16"/><path d="M3 8h8M13 16h8"/></svg>',
    user: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/></svg>',
    info: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5h.01"/></svg>',
    flame: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3c1 4 5 5.5 5 10a5 5 0 01-10 0c0-2.2 1-3.6 2-4.5.3 1.8 1.2 2.7 2 3 0-3-.5-5.5 1-8.5z"/></svg>',
    check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12l5 5 9-10"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'
  };

  /* ---------- Header y navegación ---------- */
  var page = document.body.getAttribute('data-page') || '';
  var LINKS = [
    { id: 'aprende', href: 'aprende.html', txt: 'Aprende', icon: ICON.learn },
    { id: 'mercado', href: 'mercado.html', txt: 'Mercado', icon: ICON.market },
    { id: 'compara', href: 'compara.html', txt: 'Compara', icon: ICON.compare },
    { id: 'metodologia', href: 'metodologia.html', txt: 'Metodología', icon: ICON.info, soloEscritorio: true },
    { id: 'perfil', href: 'perfil.html', txt: 'Perfil', icon: ICON.user }
  ];

  function current(id) { return id === page ? ' aria-current="page"' : ''; }

  function chipPerfil() {
    var s = PTG.perfil && PTG.perfil.get();
    if (!s) return '<a class="btn btn-sm btn-primary" href="index.html#demo">Entrar en demo</a>';
    var n = PTG.perfil.nivel(s);
    return '<a class="perfil-chip" href="perfil.html" title="Tu progreso en la demo">' +
      '<span class="perfil-nivel">Nivel ' + n.numero + '</span>' +
      '<span class="perfil-racha">' + ICON.flame + s.racha + ' d</span></a>';
  }

  if (PTG.perfil) PTG.perfil.registrarVisita();

  var header = document.getElementById('site-header');
  if (header) {
    header.className = 'site-header';
    header.innerHTML =
      '<div class="container header-in">' +
        '<a class="brand" href="index.html" aria-label="PTG, ir al inicio">' +
          '<span class="brand-mark" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5l11 7-11 7z"/></svg></span>' +
          '<span>PTG <span class="brand-sub">Play The Game</span></span></a>' +
        '<nav class="top-nav" aria-label="Principal">' +
          LINKS.map(function (l) {
            return '<a href="' + l.href + '"' + current(l.id) + '>' + l.txt + '</a>';
          }).join('') +
        '</nav>' +
        '<div class="header-perfil" id="header-perfil">' + chipPerfil() + '</div>' +
      '</div>';

    var bottom = document.createElement('nav');
    bottom.className = 'bottom-nav';
    bottom.setAttribute('aria-label', 'Principal móvil');
    bottom.innerHTML = LINKS.filter(function (l) { return !l.soloEscritorio; }).map(function (l) {
      return '<a href="' + l.href + '"' + current(l.id) + '>' + l.icon + '<span>' + l.txt + '</span></a>';
    }).join('');
    document.body.appendChild(bottom);
  }

  PTG.refrescarHeader = function () {
    var box = document.getElementById('header-perfil');
    if (box) box.innerHTML = chipPerfil();
  };

  /* ---------- Footer con disclaimer (siempre visible) ---------- */
  var footer = document.getElementById('site-footer');
  if (footer) {
    footer.className = 'site-footer';
    footer.innerHTML =
      '<div class="container">' +
        '<div class="disclaimer" role="note">' + ICON.info +
          '<p><b>Contenido educativo. No es asesoría ni recomendación de inversión.</b> ' +
          'PTG no es una entidad financiera: no custodia dinero, no ejecuta operaciones y no ofrece productos propios. ' +
          'Las entidades y cifras de este prototipo son simuladas o de ejemplo, con corte al ' + PTG.fecha(D.corte.fecha) + '. ' +
          'Verifica siempre las condiciones con la entidad.</p>' +
        '</div>' +
        '<div class="footer-row">' +
          '<span>PTG · Play The Game · Prototipo académico · Materia Fintech 2026</span>' +
          '<span><a href="metodologia.html">Metodología y fuentes</a> · <a href="metodologia.html#no-opera">Qué no hace PTG</a></span>' +
        '</div>' +
      '</div>';
  }
})();
