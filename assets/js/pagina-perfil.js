/* PTG · Página de perfil (E1): nivel, racha y piezas */
(function () {
  'use strict';
  var D = window.PTG_DATA, PTG = window.PTG, esc = PTG.esc;
  var box = document.getElementById('perfil');

  function pintar() {
    var s = PTG.perfil.get();
    if (!s) {
      box.innerHTML =
        '<p class="kicker">Perfil</p><h1>Aún no estás en la demo</h1>' +
        '<p class="lead">Entra sin registro para guardar tu nivel y tu racha en este navegador. Todo PTG se puede usar sin entrar.</p>' +
        '<a class="btn btn-primary" href="index.html#demo" style="margin-top:12px">Entrar en demo</a>';
      return;
    }
    var n = PTG.perfil.nivel(s);
    var total = D.piezas.length;
    var hechas = D.piezas.filter(function (p) { return s.piezas.indexOf(p.id) >= 0; }).length;
    var pct = Math.round(hechas / total * 100);
    var sig = PTG.perfil.NIVELES[n.numero] ? 'Aprueba una pieza más para llegar a ' + PTG.perfil.NIVELES[n.numero] + '.' : 'Completaste todas las piezas del prototipo.';

    box.innerHTML =
      '<p class="kicker">Perfil · demo</p><h1>Hola, ' + esc(s.nombre) + '</h1>' +
      '<div class="grid grid-3" style="margin-top:24px">' +
        '<article class="card card-dark rise"><div class="metric-label">Nivel</div>' +
          '<div class="metric-value">' + n.numero + ' <small>' + esc(n.nombre) + '</small></div>' +
          '<div class="progress" style="margin-top:14px" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + pct + '" aria-label="Avance de piezas"><span style="width:' + pct + '%"></span></div>' +
          '<p class="small" style="margin:10px 0 0">' + esc(sig) + '</p></article>' +
        '<article class="card rise rise-2"><div class="metric-label">Racha</div>' +
          '<div class="metric-value" style="color:var(--green-ink)">' + s.racha + ' <small>día' + (s.racha === 1 ? '' : 's') + ' seguidos</small></div>' +
          '<p class="muted small" style="margin:10px 0 0">Vuelve mañana para mantenerla.</p></article>' +
        '<article class="card rise rise-3"><div class="metric-label">Piezas aprobadas</div>' +
          '<div class="metric-value">' + hechas + ' <small>de ' + total + '</small></div>' +
          '<p class="muted small" style="margin:10px 0 0">En la demo desde el ' + PTG.fecha(s.desde) + '.</p></article>' +
      '</div>' +
      '<section class="section"><h2 style="font-size:22px">Tu ruta</h2><ul class="checklist">' +
        D.piezas.map(function (p) {
          var ok = s.piezas.indexOf(p.id) >= 0;
          return '<li><span>' + esc(p.titulo) + '</span>' +
            (ok ? '<span class="chip chip-ok">' + PTG.ICON.check + 'Aprobada</span>'
                : '<a class="btn btn-ghost btn-sm" href="aprende.html?p=' + p.id + '">Empezar</a>') + '</li>';
        }).join('') +
      '</ul></section>' +
      '<section class="section"><div class="callout callout-info">' + PTG.ICON.info +
        '<p>Tu progreso solo se guarda en este navegador. PTG no pide ni almacena datos personales.</p></div>' +
        '<button class="btn btn-ghost" id="salir" type="button" style="margin-top:14px">Salir de la demo y borrar progreso</button></section>';

    document.getElementById('salir').addEventListener('click', function () {
      if (!confirm('¿Borrar tu progreso de la demo en este navegador?')) return;
      PTG.perfil.salir();
      PTG.refrescarHeader();
      pintar();
    });
  }
  pintar();
})();
