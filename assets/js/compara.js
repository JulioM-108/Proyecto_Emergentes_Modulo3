/* PTG · Compara (E4): spread dólar vs TRM y FIC vs CDT */
(function () {
  'use strict';
  var D = window.PTG_DATA, PTG = window.PTG, esc = PTG.esc;

  /* ---------- Tabs (accesibles con flechas) ---------- */
  var tabs = [document.getElementById('tab-dolar'), document.getElementById('tab-fic')];
  var panels = [document.getElementById('panel-dolar'), document.getElementById('panel-fic')];

  function activar(i, foco) {
    tabs.forEach(function (t, j) {
      var on = i === j;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
      panels[j].hidden = !on;
    });
    if (foco) tabs[i].focus();
    try { history.replaceState(null, '', '?tab=' + (i ? 'fic' : 'dolar')); } catch (e) { /* file:// */ }
  }
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { activar(i); });
    t.addEventListener('keydown', function (ev) {
      if (ev.key === 'ArrowRight' || ev.key === 'ArrowLeft') { ev.preventDefault(); activar(i ? 0 : 1, true); }
    });
  });
  activar(PTG.param('tab') === 'fic' ? 1 : 0);

  /* ---------- Dólar vs TRM ---------- */
  var trm = D.trm.valor;
  var conVenta = D.entidades.filter(function (e) { return e.venta; });
  var ventas = conVenta.map(function (e) { return e.venta; });
  var vMin = Math.min.apply(null, ventas), vMax = Math.max.apply(null, ventas);
  var maxSpread = PTG.spread(vMax);

  document.getElementById('d-trm').innerHTML = PTG.cop(trm) + ' <small>COP</small>';
  document.getElementById('d-trm-sello').innerHTML = PTG.sello(D.trm);
  document.getElementById('d-retail').innerHTML = PTG.cop(vMin) + ' – ' + PTG.cop(vMax).replace('$', '').trim() + ' <small>COP</small>';
  document.getElementById('d-retail-corte').innerHTML = '<b>Corte:</b> ' + PTG.fecha(D.corte.fecha) + ' · ' + esc(D.corte.hora);

  var inMonto = document.getElementById('d-monto');
  var selOrden = document.getElementById('d-orden');

  function montoUSD() {
    var n = Math.floor(Number(inMonto.value));
    if (!isFinite(n) || n < 1) return 1;
    return Math.min(n, 100000);
  }

  function pintarDolar() {
    var usd = montoUSD();
    var orden = selOrden.value;
    var lista = conVenta.slice().sort(function (a, b) {
      if (orden === 'spread') return a.venta - b.venta;
      if (orden === 'vigilada' && a.vigilada !== b.vigilada) return a.vigilada ? -1 : 1;
      return a.nombre.localeCompare(b.nombre, 'es');
    });
    document.getElementById('d-lista').innerHTML = lista.map(function (e) {
      var sp = PTG.spread(e.venta);
      var extra = (e.venta - trm) * usd;
      var ancho = Math.max(4, sp / maxSpread * 100);
      return '<article class="cmp-item">' +
        '<div class="cmp-head"><h3>' + esc(e.nombre) + '</h3>' +
          '<span class="muted small">' + esc(e.tipo) + ' · entidad simulada</span>' + PTG.chipVigilada(e) + '</div>' +
        '<dl class="cmp-metrics">' +
          '<div><dt>Precio de venta</dt><dd>' + PTG.cop(e.venta) + '</dd></div>' +
          '<div><dt>Spread vs TRM</dt><dd>' + PTG.pct(sp) + '</dd><div class="bar" aria-hidden="true"><span style="width:' + ancho.toFixed(1) + '%"></span></div></div>' +
          '<div><dt>Pagas sobre la TRM</dt><dd>' + PTG.cop(extra) + '</dd></div>' +
          '<div><dt>Total por USD ' + PTG.num(usd) + '</dt><dd>' + PTG.cop(e.venta * usd) + '</dd></div>' +
        '</dl>' +
        '<a class="btn btn-ghost btn-sm" href="entidad.html?id=' + e.id + '">Ver ficha</a>' +
      '</article>';
    }).join('');
  }
  inMonto.addEventListener('input', pintarDolar);
  selOrden.addEventListener('change', pintarDolar);
  pintarDolar();

  /* ---------- FIC o CDT ---------- */
  var inCop = document.getElementById('f-monto');
  document.getElementById('f-sello').innerHTML =
    '<span class="sello-ej">Dato de ejemplo</span><span><b>Fuente:</b> entidades simuladas</span>' +
    '<span><b>Corte:</b> ' + PTG.fecha(D.corte.fecha) + ' · ' + esc(D.corte.hora) + '</span>';

  function montoCOP() {
    var n = Math.floor(Number(inCop.value));
    if (!isFinite(n) || n < 0) return 0;
    return Math.min(n, 10000000000);
  }

  function pintarFic() {
    var cop = montoCOP();
    document.getElementById('f-lista').innerHTML = D.productos.map(function (p) {
      var e = PTG.entidad(p.entidad);
      var costo = cop * p.comisionAdmin / 100;
      return '<article class="cmp-item">' +
        '<div class="cmp-head"><span class="chip ' + (p.tipo === 'CDT' ? 'chip-info' : 'chip-muted') + '">' + p.tipo + '</span>' +
          '<h3>' + esc(p.nombre) + '</h3><span class="muted small">' + esc(e.nombre) + ' · entidad simulada</span>' + PTG.chipVigilada(e) + '</div>' +
        '<dl class="cmp-metrics">' +
          '<div><dt>' + esc(p.tasaEtiqueta) + '</dt><dd>' + PTG.pct(p.tasa) + '</dd><dd class="small" style="font-weight:500;color:' +
            (p.garantizada ? 'var(--green-ink)' : 'var(--amber-ink)') + '">' + (p.garantizada ? 'Pactada' : 'No garantizada') + '</dd></div>' +
          '<div><dt>Comisión de administración</dt><dd>' + (p.comisionAdmin ? PTG.pct(p.comisionAdmin, 1) + ' anual' : 'No aplica') + '</dd></div>' +
          '<div><dt>Comisión en un año</dt><dd>' + PTG.cop(costo) + '</dd></div>' +
          '<div><dt>Liquidez</dt><dd style="font-size:14.5px;font-weight:500">' + esc(p.liquidez) + '</dd></div>' +
        '</dl>' +
        '<div style="display:grid;gap:8px;justify-items:start">' +
          '<span class="muted small" style="max-width:220px">Seguro: ' + esc(p.seguro) + '</span>' +
          '<a class="btn btn-ghost btn-sm" href="entidad.html?id=' + e.id + '">Ver ficha</a></div>' +
      '</article>';
    }).join('');
  }
  inCop.addEventListener('input', pintarFic);
  pintarFic();
})();
