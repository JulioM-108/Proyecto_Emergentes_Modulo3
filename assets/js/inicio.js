/* PTG · Inicio: referencia TRM + acceso demo (E1) */
(function () {
  'use strict';
  var D = window.PTG_DATA, PTG = window.PTG;

  // Referencia TRM con sello (E6)
  document.getElementById('trm-valor').innerHTML = PTG.cop(D.trm.valor) + ' <small>COP por USD</small>';
  document.getElementById('trm-sello').innerHTML = PTG.sello(D.trm);

  var ventas = D.entidades.filter(function (e) { return e.venta; }).map(function (e) { return e.venta; });
  document.getElementById('retail-txt').textContent =
    'Hoy, las entidades simuladas venden el dólar entre ' + PTG.cop(Math.min.apply(null, ventas)) +
    ' y ' + PTG.cop(Math.max.apply(null, ventas)) + '. Esa diferencia con la TRM es el spread, y lo pagas tú.';

  // Acceso demo
  var wrap = document.getElementById('demo-form-wrap');

  function pintar() {
    var s = PTG.perfil.get();
    if (s) {
      var n = PTG.perfil.nivel(s);
      wrap.innerHTML =
        '<div class="callout callout-ok">' + PTG.ICON.check +
        '<p>Estás en la demo como <b>' + PTG.esc(s.nombre) + '</b>. Nivel ' + n.numero + ' · ' + n.nombre +
        ' · racha de ' + s.racha + ' día' + (s.racha === 1 ? '' : 's') + '.</p></div>' +
        '<div class="hero-actions" style="margin-top:14px">' +
        '<a class="btn btn-primary" href="aprende.html">Seguir aprendiendo</a>' +
        '<a class="btn btn-ghost" href="perfil.html">Ver mi progreso</a></div>';
      return;
    }
    wrap.innerHTML =
      '<form id="demo-form" class="stack" novalidate>' +
        '<div class="field"><label for="demo-nombre">¿Cómo te llamamos? <span class="muted">(opcional)</span></label>' +
        '<input class="input" id="demo-nombre" name="nombre" maxlength="30" autocomplete="given-name" placeholder="Invitado"></div>' +
        '<button class="btn btn-primary btn-block" type="submit">Entrar en demo</button>' +
      '</form>';
    document.getElementById('demo-form').addEventListener('submit', function (ev) {
      ev.preventDefault();
      PTG.perfil.entrar(document.getElementById('demo-nombre').value);
      PTG.refrescarHeader();
      pintar();
    });
  }
  pintar();
})();
