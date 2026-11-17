/*
 * PTG · Datos del prototipo
 * ------------------------------------------------------------------
 * Todos los datos son ESTÁTICOS y de EJEMPLO (lo pide el documento de
 * Finanzas: "En el prototipo el dato es estático").
 *
 * Antes de la demo:
 *   1. Copiar la TRM real del día desde https://www.banrep.gov.co
 *      y actualizar trm.valor y corte.fecha.
 *   2. Si se cambia la TRM, revisar que los precios de venta de las
 *      entidades sigan siendo mayores a la TRM.
 *
 * Las entidades son FICTICIAS a propósito: no se atribuyen precios
 * inventados a bancos reales.
 */
window.PTG_DATA = {
  corte: { fecha: '2026-11-16', hora: '8:00 a. m.' },

  trm: {
    nombre: 'TRM · Tasa Representativa del Mercado',
    valor: 3950.00,
    fecha: '2026-11-16',
    hora: 'Vigente todo el día',
    fuente: 'Superintendencia Financiera, publicada por el Banco de la República (citado)',
    ejemplo: true
  },

  indicadores: [
    {
      id: 'tpm',
      nombre: 'Tasa de política monetaria',
      valor: '8,25 %',
      nota: 'Tasa que fija el Banco de la República. Mueve el costo del crédito y lo que pagan los CDT.',
      fecha: '2026-10-31',
      hora: 'Última decisión de la Junta',
      fuente: 'Banco de la República (citado)',
      ejemplo: true
    },
    {
      id: 'ipc',
      nombre: 'Inflación anual (IPC)',
      valor: '4,80 %',
      nota: 'Cuánto subieron los precios en un año. Si tu ahorro rinde menos que esto, pierde poder de compra.',
      fecha: '2026-10-31',
      hora: 'Dato de octubre',
      fuente: 'DANE (citado)',
      ejemplo: true
    }
  ],

  entidades: [
    {
      id: 'banco-andino',
      nombre: 'Banco Andino',
      tipo: 'Banco',
      vigilada: true,
      supervisor: 'Superintendencia Financiera de Colombia (SFC)',
      aliado: true,
      comision: 'PTG recibe COP 10.000 por cada persona referida que abre un producto.',
      descripcion: 'Banco con oficinas en todo el país. Vende dólares en efectivo y por transferencia, y ofrece CDT.',
      ofrece: ['Venta de dólares en efectivo', 'Transferencias internacionales', 'CDT a 360 días'],
      venta: 4075
    },
    {
      id: 'banco-pacifico',
      nombre: 'Banco Pacífico Digital',
      tipo: 'Banco digital',
      vigilada: true,
      supervisor: 'Superintendencia Financiera de Colombia (SFC)',
      aliado: true,
      comision: 'PTG recibe COP 8.000 por cada persona referida que abre un producto.',
      descripcion: 'Banco 100 % digital. Opera desde la app y ofrece compra de dólares para viajes y CDT.',
      ofrece: ['Dólares para viaje desde la app', 'CDT a 180 días'],
      venta: 4030
    },
    {
      id: 'casa-centro',
      nombre: 'Casa de Cambio Centro',
      tipo: 'Casa de cambio',
      vigilada: false,
      supervisor: 'No vigilada por la SFC. Las casas de cambio responden ante la DIAN por control cambiario.',
      aliado: false,
      comision: '',
      descripcion: 'Casa de cambio en centros comerciales. Compra y vende divisas en efectivo.',
      ofrece: ['Compra y venta de dólares en efectivo'],
      venta: 4110
    },
    {
      id: 'app-divisa',
      nombre: 'App Divisa',
      tipo: 'App internacional',
      vigilada: false,
      supervisor: 'No vigilada por la SFC. Opera desde el exterior.',
      aliado: false,
      comision: '',
      descripcion: 'Aplicación extranjera para enviar y cambiar dinero. Precio bajo, sin supervisión colombiana.',
      ofrece: ['Envío de dinero al exterior', 'Cambio de pesos a dólares'],
      venta: 3995
    },
    {
      id: 'fiduciaria-andina',
      nombre: 'Fiduciaria Andina',
      tipo: 'Sociedad fiduciaria',
      vigilada: true,
      supervisor: 'Superintendencia Financiera de Colombia (SFC)',
      aliado: true,
      comision: 'PTG recibe COP 12.000 por cada persona referida que se vincula a un fondo.',
      descripcion: 'Administra fondos de inversión colectiva (FIC) con distintos plazos y niveles de riesgo.',
      ofrece: ['FIC a la vista', 'FIC con pacto de permanencia de 30 días'],
      venta: null
    }
  ],

  productos: [
    {
      id: 'cdt-andino',
      tipo: 'CDT',
      nombre: 'CDT 360 días',
      entidad: 'banco-andino',
      tasa: 9.5,
      tasaEtiqueta: 'Tasa pactada E.A.',
      garantizada: true,
      comisionAdmin: 0,
      liquidez: 'Al vencimiento (360 días)',
      seguro: 'Sí, Fogafín (seguro de depósito)'
    },
    {
      id: 'cdt-pacifico',
      tipo: 'CDT',
      nombre: 'CDT 180 días',
      entidad: 'banco-pacifico',
      tasa: 9.1,
      tasaEtiqueta: 'Tasa pactada E.A.',
      garantizada: true,
      comisionAdmin: 0,
      liquidez: 'Al vencimiento (180 días)',
      seguro: 'Sí, Fogafín (seguro de depósito)'
    },
    {
      id: 'fic-vista',
      tipo: 'FIC',
      nombre: 'Fondo Liquidez Andina',
      entidad: 'fiduciaria-andina',
      tasa: 8.7,
      tasaEtiqueta: 'Rentabilidad histórica 12 meses E.A. (neta)',
      garantizada: false,
      comisionAdmin: 1.5,
      liquidez: 'A la vista: retiras cuando quieras',
      seguro: 'No aplica: el riesgo es del inversionista'
    },
    {
      id: 'fic-30',
      tipo: 'FIC',
      nombre: 'Fondo Plazo 30',
      entidad: 'fiduciaria-andina',
      tasa: 10.2,
      tasaEtiqueta: 'Rentabilidad histórica 12 meses E.A. (neta)',
      garantizada: false,
      comisionAdmin: 2.0,
      liquidez: 'Pacto de permanencia de 30 días',
      seguro: 'No aplica: el riesgo es del inversionista'
    }
  ],

  piezas: [
    {
      id: 'trm',
      titulo: 'La TRM no es el precio al que te venden dólares',
      resumen: 'Qué es la TRM y por qué en la calle el dólar siempre sale más caro.',
      minutos: 2,
      idea: [
        'La TRM es un promedio de las operaciones con dólares entre bancos y grandes empresas del día hábil anterior. La calcula la Superintendencia Financiera y la publica el Banco de la República.',
        'Es una referencia del mercado mayorista. Cuando tú compras dólares en un banco o una casa de cambio, pagas un precio de venta al público (retail), que casi siempre es mayor a la TRM.'
      ],
      ejemplo: 'Si la TRM de hoy es $3.950 y la casa de cambio te vende a $4.110, cada dólar te cuesta $160 más que la referencia.',
      regla: 'La TRM es la regla del juego, no el precio. El precio lo pone cada entidad.',
      quiz: [
        {
          p: '¿Qué es la TRM?',
          o: ['El precio al que cualquier banco me vende dólares', 'Un promedio de referencia del mercado mayorista', 'Una tasa que el Gobierno fija cada mes'],
          c: 1,
          e: 'La TRM es un promedio del mercado mayorista. No es el precio que te cobran a ti.'
        },
        {
          p: 'Si la TRM es $3.950, ¿a cuánto te venderá dólares una casa de cambio?',
          o: ['Exactamente a $3.950', 'Normalmente a un poco más de $3.950', 'Siempre a menos de $3.950'],
          c: 1,
          e: 'La entidad suma su margen sobre la referencia. Por eso el precio retail suele ser mayor.'
        }
      ],
      siguiente: { href: 'mercado.html', texto: 'Ver la TRM de hoy en Mercado' }
    },
    {
      id: 'spread',
      titulo: 'El spread: lo que pagas por cambiar',
      resumen: 'La diferencia entre el precio que te cobran y la referencia es un costo real.',
      minutos: 3,
      idea: [
        'El spread es la diferencia entre el precio de venta que te ofrece una entidad y la TRM. Se puede expresar en pesos por dólar o en porcentaje.',
        'Ese spread es un costo, aunque no aparezca como "comisión" en el recibo. Cuantos más dólares cambias, más pesos pagas por él.'
      ],
      ejemplo: 'Compras USD 500. TRM: $3.950. Precio de venta: $4.110. Diferencia: $160 × 500 = $80.000 que pagas por encima de la referencia (un spread de 4,05 %).',
      regla: 'Spread % = (precio de venta − TRM) ÷ TRM. Compara siempre con la misma referencia.',
      quiz: [
        {
          p: 'Compras USD 100 a $4.050 y la TRM es $3.950. ¿Cuánto pagaste por encima de la referencia?',
          o: ['$100', '$10.000', '$405.000'],
          c: 1,
          e: '($4.050 − $3.950) × 100 = $10.000.'
        },
        {
          p: 'Dos entidades tienen spreads de 1 % y 4 %. Con todo lo demás igual, ¿qué significa?',
          o: ['La de 4 % te cobra más por cada dólar', 'La de 4 % te entrega más dólares', 'No hay diferencia porque la TRM es la misma'],
          c: 0,
          e: 'Un spread mayor significa que pagas más pesos por cada dólar.'
        },
        {
          p: 'Una entidad tiene el spread más bajo pero no está vigilada por la SFC. ¿Qué debes tener en cuenta?',
          o: ['Nada, el precio es lo único que importa', 'Que si hay un problema, no tienes la protección de la supervisión colombiana', 'Que el dólar será falso'],
          c: 1,
          e: 'El precio es una parte de la decisión. La supervisión es otra: define a quién reclamas si algo falla.'
        }
      ],
      siguiente: { href: 'compara.html?tab=dolar', texto: 'Comparar el spread del dólar' }
    },
    {
      id: 'fondo',
      titulo: 'El costo de un fondo: la comisión que no ves',
      resumen: 'Un FIC cobra comisión de administración. Un CDT te dice la tasa desde el inicio.',
      minutos: 3,
      idea: [
        'Un CDT te paga una tasa pactada desde el día uno: sabes cuánto recibes y cuándo. Un fondo de inversión colectiva (FIC) no promete tasa: muestra una rentabilidad histórica que puede subir o bajar.',
        'El FIC cobra una comisión de administración anual. La rentabilidad que publican los fondos suele ser neta, es decir, ya descontó esa comisión. Por eso conviene mirar las dos cifras.'
      ],
      ejemplo: 'Con COP 1.000.000 en un fondo con comisión de 1,5 % anual, el fondo se queda con unos $15.000 al año, haya ganado o no.',
      regla: 'CDT: tasa conocida, dinero quieto hasta el vencimiento. FIC: rentabilidad no garantizada, comisión siempre.',
      quiz: [
        {
          p: 'Un FIC muestra una rentabilidad histórica de 8,7 % E.A. ¿Está garantizada?',
          o: ['Sí, es lo que vas a ganar', 'No, es lo que ganó en el pasado y puede cambiar', 'Sí, si dejas el dinero un año'],
          c: 1,
          e: 'La rentabilidad pasada no garantiza la futura.'
        },
        {
          p: 'Tienes COP 2.000.000 en un fondo con comisión de 1,5 % anual. ¿Cuánto pagas de comisión en un año, aproximadamente?',
          o: ['$1.500', '$30.000', '$300.000'],
          c: 1,
          e: '2.000.000 × 1,5 % = $30.000.'
        },
        {
          p: '¿Qué conoces desde el inicio en un CDT?',
          o: ['La tasa y la fecha en que recibes tu dinero', 'Solo la rentabilidad histórica', 'Nada, depende del mercado'],
          c: 0,
          e: 'En el CDT la tasa y el plazo se pactan al abrirlo.'
        }
      ],
      siguiente: { href: 'compara.html?tab=fic', texto: 'Comparar FIC y CDT' }
    }
  ]
};
