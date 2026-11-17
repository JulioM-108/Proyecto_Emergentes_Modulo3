/* PTG · Conecta (E5): ficha, comisión visible, aviso KYC y CTA simulado */
(function () {
  'use strict';
  var D = window.PTG_DATA, PTG = window.PTG, esc = PTG.esc;
  var box = document.getElementById('ficha');
  var e = PTG.entidad(PTG.param('id'));

  if (!e) {
    box.innerHTML = '<div class="card" style="max-width:560px"><h1 style="font-size:28px">No encontramos esa entidad</h1>' +
      '<p class="muted">Vuelve a la comparación y abre la ficha desde ahí.</p>' +
      '<a class="btn btn-primary" href="compara.html">Ir a Compara</a></div>';
    return;
  }
  document.title = e.nombre + ' · PTG';

  var productos = D.productos.filter(function (p) { return p.entidad === e.id; });
  var datos = [];
  if (e.venta) {
    datos.push('<div><dt>Precio de venta del dólar</dt><dd class="num">' + PTG.cop(e.venta) +
      ' <span class="muted small">· spread ' + PTG.pct(PTG.spread(e.venta)) + ' sobre la TRM</span></dd></div>');
  }
  productos.forEach(function (p) {
    datos.push('<div><dt>' + esc(p.tipo + ' · ' + p.nombre) + '</dt><dd class="num">' + PTG.pct(p.tasa) + ' <span class="muted small">' +
      esc(p.tasaEtiqueta) + (p.comisionAdmin ? ' · comisión ' + PTG.pct(p.comisionAdmin, 1) : '') + '</span></dd></div>');
  });

  var conecta = e.aliado
    ? '<div class="card" style="border:2px solid var(--blue)">' +
        '<p class="kicker">Comisión de PTG</p>' +
        '<p style="font-size:18px;font-weight:600;margin:0 0 6px">' + esc(e.comision) + '</p>' +
        '<p class="muted small" style="margin:0">Esta comisión la paga la entidad, no tú, y no cambia el precio que te cobran. Te la mostramos para que sepas cómo gana PTG.</p>' +
      '</div>' +
      '<div class="callout callout-warn">' + PTG.ICON.alert +
        '<p><b>El registro y el dinero ocurren afuera.</b> Si sigues, la entidad te pedirá sus datos de registro (KYC) y recibirá tu dinero directamente. PTG no custodia ni opera.</p></div>' +
      '<button class="btn btn-primary btn-block" id="cta" type="button">Ir a ' + esc(e.nombre) + PTG.ICON.arrow + '</button>' +
      '<p class="muted small" style="text-align:center;margin:0">Salida simulada: en este prototipo no se abre ningún sitio externo.</p>'
    : '<div class="callout callout-dark">' + PTG.ICON.info +
        '<p><b>No es aliada de PTG.</b> La mostramos solo como dato de comparación. PTG no recibe comisión de esta entidad y no ofrece salida hacia ella.</p></div>';

  box.innerHTML =
    '<a href="compara.html' + (productos.length ? '?tab=fic' : '?tab=dolar') + '" class="small">← Volver a Compara</a>' +
    '<div class="ficha-head" style="margin-top:18px">' +
      '<span class="avatar" aria-hidden="true">' + esc(e.nombre.charAt(0)) + '</span>' +
      '<div><p class="kicker" style="margin:0">Ficha de la entidad · Conecta</p>' +
      '<h1 style="font-size:clamp(28px,5vw,42px);margin:4px 0 8px">' + esc(e.nombre) + '</h1>' +
      '<div style="display:flex;flex-wrap:wrap;gap:6px">' + PTG.chipVigilada(e) +
        '<span class="chip chip-muted">' + esc(e.tipo) + '</span><span class="chip chip-muted">Entidad simulada</span></div></div>' +
    '</div>' +

    '<div class="grid grid-2" style="margin-top:24px;align-items:start">' +
      '<div class="stack">' +
        '<article class="card"><h2 style="font-size:20px">Quién es</h2><p class="muted">' + esc(e.descripcion) + '</p>' +
          '<dl class="dl"><div><dt>Supervisión</dt><dd>' + esc(e.supervisor) + '</dd></div></dl></article>' +
        '<article class="card"><h2 style="font-size:20px">Qué ofrece</h2><ul class="clean">' +
          e.ofrece.map(function (o) { return '<li>' + esc(o) + '</li>'; }).join('') + '</ul></article>' +
        (datos.length ? '<article class="card"><h2 style="font-size:20px">Datos de comparación</h2><dl class="dl">' + datos.join('') + '</dl>' +
          '<p class="sello"><span class="sello-ej">Dato de ejemplo</span><span><b>Fuente:</b> entidad simulada</span><span><b>Corte:</b> ' +
          PTG.fecha(D.corte.fecha) + ' · ' + esc(D.corte.hora) + '</span></p></article>' : '') +
      '</div>' +
      '<aside class="stack" aria-label="Conectar con la entidad">' + conecta + '</aside>' +
    '</div>';

  var cta = document.getElementById('cta');
  if (cta) {
    var dlg = document.getElementById('salida');
    document.getElementById('salida-nombre').textContent = e.nombre;
    cta.addEventListener('click', function () {
      if (dlg.showModal) dlg.showModal();
      else alert('Simulación: aquí saldrías al sitio de ' + e.nombre + '. PTG no recibe tu dinero.');
    });
  }
})();
