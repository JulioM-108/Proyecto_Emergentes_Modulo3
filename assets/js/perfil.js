/*
 * PTG · Perfil demo (épica E1)
 * Acceso demo sin registro, nivel según piezas aprobadas y racha de días.
 * Se guarda en localStorage del navegador. Si el navegador lo bloquea
 * (modo privado), la demo sigue funcionando pero sin recordar el progreso.
 */
(function () {
  'use strict';
  var PTG = window.PTG = window.PTG || {};
  var KEY = 'ptg.demo.v1';
  var NIVELES = ['Curioso', 'Aprendiz', 'Comparador', 'Jugador con criterio'];
  var memoria = null;

  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function hoy() {
    var d = new Date();
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  }
  function diasEntre(a, b) {
    var x = a.split('-'), y = b.split('-');
    return Math.round((Date.UTC(+y[0], y[1] - 1, +y[2]) - Date.UTC(+x[0], x[1] - 1, +x[2])) / 864e5);
  }
  function leer() {
    try {
      var raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : memoria;
    } catch (e) { return memoria; }
  }
  function guardar(s) {
    memoria = s;
    try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) { /* sin almacenamiento */ }
    return s;
  }

  PTG.perfil = {
    NIVELES: NIVELES,
    get: leer,
    entrar: function (nombre) {
      var limpio = String(nombre || '').trim().slice(0, 30);
      return guardar({ nombre: limpio || 'Invitado', piezas: [], racha: 1, ultimaVisita: hoy(), desde: hoy() });
    },
    salir: function () {
      memoria = null;
      try { localStorage.removeItem(KEY); } catch (e) { /* nada */ }
    },
    registrarVisita: function () {
      var s = leer();
      if (!s) return null;
      var h = hoy(), d = diasEntre(s.ultimaVisita || h, h);
      if (d === 1) s.racha += 1;
      else if (d > 1) s.racha = 1;
      s.ultimaVisita = h;
      return guardar(s);
    },
    aprobar: function (idPieza) {
      var s = leer();
      if (!s) return null;
      if (s.piezas.indexOf(idPieza) < 0) s.piezas.push(idPieza);
      return guardar(s);
    },
    nivel: function (s) {
      var n = Math.min((s && s.piezas ? s.piezas.length : 0), NIVELES.length - 1);
      return { numero: n + 1, nombre: NIVELES[n] };
    }
  };
})();
