/* PTG · Mercado (E3): TRM con sello, marca retail y tablero básico */
(function () {
  'use strict';
  var D = window.PTG_DATA, PTG = window.PTG, esc = PTG.esc;

  document.getElementById('trm-valor').innerHTML = PTG.cop(D.trm.valor) + ' <small>COP por USD</small>';
  document.getElementById('trm-sello').innerHTML = PTG.sello(D.trm);

  var ventas = D.entidades.filter(function (e) { return e.venta; }).map(function (e) { return e.venta; });
  var min = Math.min.apply(null, ventas), max = Math.max.apply(null, ventas);
  document.getElementById('retail-valor').innerHTML =
    PTG.cop(min) + ' – ' + PTG.cop(max).replace('$', '').trim() + ' <small>COP por USD</small>';
  document.getElementById('retail-corte').innerHTML = '<b>Corte:</b> ' + PTG.fecha(D.corte.fecha) + ' · ' + esc(D.corte.hora);

  var spreadMin = PTG.spread(min), spreadMax = PTG.spread(max);
  var tarjetas = [{
    nombre: 'Distancia del retail a la TRM',
    valor: PTG.pct(spreadMin) + ' – ' + PTG.pct(spreadMax),
    nota: 'Cuánto más caro que la TRM venden el dólar las entidades simuladas. Esa diferencia es el spread.',
    sello: { fuente: 'Cálculo PTG sobre datos de ejemplo', fecha: D.corte.fecha, hora: D.corte.hora, ejemplo: true }
  }].concat(D.indicadores.map(function (i) {
    return { nombre: i.nombre, valor: i.valor, nota: i.nota, sello: i };
  }));

  document.getElementById('tablero').innerHTML = tarjetas.map(function (t, i) {
    return '<article class="card rise' + (i ? ' rise-' + Math.min(i + 1, 3) : '') + '">' +
      '<div class="metric-label">' + esc(t.nombre) + '</div>' +
      '<div class="metric-value" style="font-size:clamp(26px,4vw,34px)">' + esc(t.valor) + '</div>' +
      '<p class="muted small" style="margin:8px 0 0">' + esc(t.nota) + '</p>' +
      PTG.sello(t.sello) + '</article>';
  }).join('');
})();
