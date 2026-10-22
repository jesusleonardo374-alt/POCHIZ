/**
 * plantillas-backoffice.js
 * Clean Slate Implementation v2.0
 */

// --- CONFIGURATION ---
const APP_CONFIG = {
    dbName: 'MesaPlantillasDB',
    dbVersion: 2,
    storeName: 'history'
};

const TEMPLATES = {
    'activaciones': {
        label: 'Activaciones',
        subtypes: {
            'act-placeholder': {
                title: 'Plantilla Genérica Activaciones',
                desc: 'Plantilla de prueba para activaciones (pendiente de definir)',
                template: "ACTIVACIÓN\nDATOS: {dato}",
                fields: [
                    { name: 'dato', label: 'Dato', type: 'text', required: true }
                ]
            },
            'escalamiento-telefonia': {
                title: 'Escalamiento Telefonía',
                desc: 'Plantilla para escalamiento de problemas de telefonía.',
                template: `BACKOFFICE HITSS - TÉCNICO\nPERSONA DE CONTACTO: {persona_contacto}\nNÚMERO DE CONTACTO: {numero_contacto}\nPROBLEMA REPORTADO: {problema_reportado}\nLINEA ORIGEN: {linea_origen}\nOPERADOR LINEA DESTINO: {operador_destino}\nFECHA PRUEBA: {fecha_prueba}\nHORA PRUEBA: {hora_prueba}\nLOCUCIÓN: {locucion}\nDESCARTES REALIZADOS: {descartes}\nOBSERVACIONES: {observaciones}\nREALIZADO POR: {realizado_por}`,
                fields: [
                    { name: 'persona_contacto', label: 'Persona de Contacto', type: 'text', required: true },
                    { name: 'numero_contacto', label: 'Número de Contacto', type: 'text', required: true },
                    { name: 'problema_reportado', label: 'Problema Reportado', type: 'select', options: ['Sin servicio de telefono', 'No puede realizar llamadas', 'No puede recibir llamadas'], required: true },
                    { name: 'linea_origen', label: 'Línea Origen', type: 'text', required: true },
                    { name: 'operador_destino', label: 'Operador Línea Destino', type: 'select', options: ['Movistar', 'Entel', 'Bitel'], required: true },
                    { name: 'fecha_prueba', label: 'Fecha Prueba', type: 'date', required: true },
                    { name: 'hora_prueba', label: 'Hora Prueba', type: 'time', required: true },
                    { name: 'locucion', label: 'Locución', type: 'text', required: false },
                    { name: 'descartes', label: 'Descartes Realizados', type: 'textarea', full: true, required: true },
                    { name: 'observaciones', label: 'Observaciones', type: 'textarea', full: true }
                ]
            }
        }
    },
    'backoffice-fija': {
        label: 'BackOffice Fija - Alámbrico',
        subtypes: {
            'intentos-llamadas': {
                title: 'Intentos de llamadas',
                desc: 'Registro de intentos de contacto con cliente.',
                template: `BACKOFFICE HITSS - TÉCNICO\nPERSONA DE CONTACTO: {persona_contacto}\nNÚMERO DE CONTACTO: {numero_contacto}\nFECHA Y HORA DE LLAMADA: {fecha_hora_llamada}\nMOTIVO: {motivo}\nMENSAJE EN BUZÓN DE VOZ: {mensaje_buzon}\nOBSERVACIONES: Cliente no contestó la llamada para validar la operatividad del servicio.\nREALIZADO POR: {realizado_por}`,
                fields: [
                    { name: 'persona_contacto', label: 'Persona de Contacto', type: 'text', required: true },
                    { name: 'numero_contacto', label: 'Número de Contacto', type: 'text', required: true },
                    { name: 'fecha_hora_llamada', label: 'Fecha y Hora de Llamada', type: 'datetime-local', auto: true, required: true },
                    { name: 'motivo', label: 'Motivo', type: 'select', options: ['1er Intento de llamada', '2do Intento de llamada', '3er Intento de llamada'], required: true },
                    { name: 'mensaje_buzon', label: 'Mensaje en Buzón de Voz', type: 'select', options: ['SÍ', 'NO'], required: true }
                ]
            },
            'generacion-sot': {
                title: 'Generación de SOT',
                desc: 'Plantilla para la generación de orden de trabajo.',
                template: `BACKOFFICE HITSS - TÉCNICO\nID CASO: {id_caso}\nPROBLEMA REPORTADO POR EL CLIENTE: {problema_cliente}\nDIAGNÓSTICO: {diagnostico}\nACCIONES REALIZADAS(DESCARTES): {acciones}\nNOMBRE DEL QUE REPORTA, CELULAR CON WHATSAPP: {nombre_reporta}\nID DE LLAMADA(AICC): {id_llamada}\nREALIZADO POR: {realizado_por}`,
                fields: [
                    { name: 'id_caso', label: 'ID Caso', type: 'text', required: true },
                    { name: 'problema_cliente', label: 'Problema Reportado (Cliente)', type: 'textarea', placeholder: 'Ej. Sin señal / Intermitencia', full: true, required: true },
                    { name: 'diagnostico', label: 'Diagnóstico', type: 'textarea', placeholder: 'Niveles de potencia / Estado de red', full: true, required: true },
                    { name: 'acciones', label: 'Acciones Realizadas', type: 'textarea', full: true, required: true },
                    { name: 'nombre_reporta', label: 'Nombre quien reporta / Celular', type: 'text', required: true },
                    { name: 'id_llamada', label: 'ID de Llamada (AICC)', type: 'text', required: true }
                ]
            },
            'fallas-servicio': {
                title: 'Fallas con el Servicio',
                desc: 'Registro para escenarios de fallas técnicas.',
                template: `BACKOFFICE HITSS - TÉCNICO\nNUMERO DE REMEDY: {numero_remedy}\nPERSONA DE CONTACTO: {persona_contacto}\nNÚMERO DE CONTACTO: {numero_contacto}\nPROBLEMA REPORTADO: {problema_reportado}\nDESCARTES REALIZADOS: {descartes}\nOBSERVACIONES: {observaciones}\nID DE LLAMADA - TICKET: {id_llamada}\nREALIZADO POR: {realizado_por}`,
                fields: [
                    { name: 'numero_remedy', label: 'Número de Remedy', type: 'text', required: true },
                    { name: 'persona_contacto', label: 'Persona de Contacto', type: 'text', required: true },
                    { name: 'numero_contacto', label: 'Número de Contacto', type: 'text', required: true },
                    { name: 'problema_reportado', label: 'Problema Reportado', type: 'select', options: ['Problemas con paginas', 'Desalineado en CS', 'Sin etiquetas en IC', 'No puede realizar llamadas', 'No puede recibir llamadas'], required: true },
                    { name: 'descartes', label: 'Descartes Realizados', type: 'textarea', full: true, required: true },
                    { name: 'observaciones', label: 'Observaciones', type: 'textarea', full: true },
                    { name: 'id_llamada', label: 'ID de Llamada - Ticket', type: 'text', required: true }
                ]
            },
            'baja-ftth': {
                title: 'Baja del Servicio (FTTH)',
                desc: 'Ejecutar baja en Incognito (FTTH).',
                template: `BACKOFFICE HITSS - TÉCNICO\n\nTIPO DE SOLICITUD: DESACTIVAR FTTH\nSERIE ONT POR DESACTIVAR: {serie_ont}\nMODELO: {modelo}\nESTADO: SEGUIMIENTO\nPROBLEMA DETECTADO: {problema_detectado}\nSOLUCIÓN: Se desactiva la provisión desde el SGA y se corrobora en Incognito, esperar 10 minutos, provisionar nuevamente y volver a corroborar en Incognito.\nREALIZADO POR: {realizado_por}`,
                fields: [
                    { name: 'serie_ont', label: 'Serie ONT por Desactivar', type: 'text', required: true },
                    { name: 'modelo', label: 'Modelo', type: 'text', required: true },
                    { name: 'problema_detectado', label: 'Problema Detectado', type: 'select', options: ['INTERNET_PROBLEMAS_ACCESO_CIERTAS_PÁGINAS', 'NO_PUEDE_REALIZAR_LLAMADAS'], required: true }
                ]
            },
            'baja-hfc': {
                title: 'Baja del Servicio (HFC)',
                desc: 'Ejecutar baja en Incognito (HFC).',
                template: `BACKOFFICE HITSS - TÉCNICO\n\nTIPO DE SOLICITUD: DESACTIVAR HFC\nCMMAC POR DESACTIVAR: {cmmac}\nMTAMAC POR DESACTIVAR: {mtamac}\nMODELO: {modelo}\nESTADO: SEGUIMIENTO\nPROBLEMA DETECTADO: {problema_detectado}\nSOLUCIÓN: Se desactiva la provisión desde el SGA y se corrobora en Incognito, esperar 10 minutos, provisionar nuevamente y volver a corroborar en Incognito.\nREALIZADO POR: {realizado_por}`,
                fields: [
                    { name: 'cmmac', label: 'CMMAC por Desactivar', type: 'text', required: true },
                    { name: 'mtamac', label: 'MTAMAC por Desactivar', type: 'text', required: true },
                    { name: 'modelo', label: 'Modelo', type: 'text', required: true },
                    { name: 'problema_detectado', label: 'Problema Detectado', type: 'select', options: ['INTERNET_PROBLEMAS_ACCESO_CIERTAS_PÁGINAS', 'NO_PUEDE_REALIZAR_LLAMADAS'], required: true }
                ]
            },
            'alta-ftth': {
                title: 'Alta del Servicio (FTTH)',
                desc: 'Ejecutar alta en Incognito (FTTH).',
                template: `BACKOFFICE HITSS - TÉCNICO\n\nTIPO DE SOLICITUD: ACTIVAR FTTH\nSERIE ONT POR ACTIVAR: {serie_ont}\nMODELO: {modelo}\nESTADO: ATENDIDO\nPROBLEMA DETECTADO: {problema_detectado}\nSOLUCIÓN: {solucion}\n\nREALIZADO POR: {realizado_por}`,
                fields: [
                    { name: 'serie_ont', label: 'Serie ONT por Activar', type: 'text', required: true },
                    { name: 'modelo', label: 'Modelo', type: 'text', required: true },
                    { name: 'problema_detectado', label: 'Problema Detectado', type: 'select', options: ['INTERNET_PROBLEMAS_ACCESO_CIERTAS_PÁGINAS', 'NO_PUEDE_REALIZAR_LLAMADAS'], required: true },
                    { name: 'solucion', label: 'Solución', type: 'select', options: ['Se provisiona nuevamente en Incognito. Llamar al cliente y corroborar el Cambio de IP y la solución a la falla.', 'Se provisiona nuevamente en Incognito. Llamar al cliente y corroborar las llamadas salientes y la solución a la falla.'], required: true, full: true }
                ]
            },
            'alta-hfc': {
                title: 'Alta del Servicio (HFC)',
                desc: 'Ejecutar alta en Incognito (HFC).',
                template: `BACKOFFICE HITSS - TÉCNICO\n\nTIPO DE SOLICITUD: ACTIVAR HFC\nCMMAC POR ACTIVAR: {cmmac}\nMTAMAC POR ACTIVAR: {mtamac}\nMODELO: {modelo}\nESTADO: ATENDIDO\nPROBLEMA DETECTADO: {problema_detectado}\nSOLUCIÓN: {solucion}\n\nREALIZADO POR: {realizado_por}`,
                fields: [
                    { name: 'cmmac', label: 'CMMAC por Activar', type: 'text', required: true },
                    { name: 'mtamac', label: 'MTAMAC por Activar', type: 'text', required: true },
                    { name: 'modelo', label: 'Modelo', type: 'text', required: true },
                    { name: 'problema_detectado', label: 'Problema Detectado', type: 'select', options: ['INTERNET_PROBLEMAS_ACCESO_CIERTAS_PÁGINAS', 'NO_PUEDE_REALIZAR_LLAMADAS'], required: true },
                    { name: 'solucion', label: 'Solución', type: 'select', options: ['Se provisiona nuevamente en Incognito. Llamar al cliente y corroborar el Cambio de IP y la solución a la falla.', 'Se provisiona nuevamente en Incognito. Llamar al cliente y corroborar las llamadas salientes y la solución a la falla.'], required: true, full: true }
                ]
            },
            'liberar-franja': {
                title: 'Liberar Franja Horaria',
                desc: 'Solicitar liberación de Franja Horaria.',
                template: `BACKOFFICE HITSS - ADMINISTRATIVO\nTIPO DE TRABAJO: {tipo_trabajo}\nSUBTIPO DE TRABAJO: {subtipo_trabajo}\nRED: {red}\nDEPARTAMENTO: {departamento}\nPROVINCIA: {provincia}\nDISTRITO: {distrito}\nPLANO: {plano}\nFRANJA HORARIA (FECHA): {fecha_franja}\nMOTIVO: HABILITAR FRANJA HORARIA\nREALIZADO POR: {realizado_por}`,
                fields: [
                    { name: 'tipo_trabajo', label: 'Tipo de Trabajo', type: 'select', options: ['CAMBIO DE PLAN', 'TRASLADO EXTERNO', 'MIGRACIÓN DE TECNOLOGÍA', 'TRASLADO INTERNO', 'MANTENIMIENTO'], required: true },
                    { name: 'subtipo_trabajo', label: 'Subtipo de Trabajo', type: 'select', options: ['1 PLAY', '2 PLAY', '3 PLAY'], required: true },
                    { name: 'red', label: 'Red', type: 'select', options: ['HFC', 'FTTH'], required: true },
                    { name: 'departamento', label: 'Departamento', type: 'text', required: true },
                    { name: 'provincia', label: 'Provincia', type: 'text', required: true },
                    { name: 'distrito', label: 'Distrito', type: 'text', required: true },
                    { name: 'plano', label: 'Plano', type: 'text', required: true },
                    { name: 'fecha_franja', label: 'Franja Horaria (Fecha)', type: 'date', required: true }
                ]
            },
            'wo-paginas': {
                title: 'Generar WO - Páginas Web',
                desc: 'Generar WO para escenarios de páginas web.',
                template: `BACKOFFICE HITSS - TÉCNICO\nPersona de Contacto: {persona_contacto}\nParentesco/Cargo: {parentesco}\nNúmero de Contacto: {numero_contacto}\nDirección MAC Cable Módem: {mac}\nCMTS: {cmts}\nModelo Equipo: {modelo}\nIP Pública(Cuál es mi IP): {ip_publica}\nPágina(s) WEB/Aplicativo(s) a la(s) que no puede acceder: {paginas_afectadas}\nDescartes realizados(especificar):\n-Reiniciar CM Incognito/Manual.\n-Sí accede a la(s) página(s)/aplicativo(s) usando DATOS MÓVILES.\n-Otros descartes: {descartes}\nPruebas adjuntas: [PING,TRACERT,IMAGEN DE ERROR/SOLO IMAGEN DEL ERROR, usuario no puede realizar las otras pruebas].\n\nSe generó Ticket WO {nro_ticket} - "Problemas de accesos a ciertas páginas" para la revisión.`,
                fields: [
                    { name: 'persona_contacto', label: 'Persona de Contacto', type: 'text', required: true },
                    { name: 'parentesco', label: 'Parentesco/Cargo', type: 'text', required: true },
                    { name: 'numero_contacto', label: 'Número de Contacto', type: 'text', required: true },
                    { name: 'mac', label: 'Dirección MAC Cable Módem', type: 'text', required: true },
                    { name: 'cmts', label: 'CMTS', type: 'text', required: false },
                    { name: 'modelo', label: 'Modelo Equipo', type: 'text', required: true },
                    { name: 'ip_publica', label: 'IP Pública', type: 'text', required: true },
                    { name: 'paginas_afectadas', label: 'Páginas/Apps Afectadas', type: 'textarea', full: true, required: true },
                    { name: 'descartes', label: 'Otros Descartes', type: 'textarea', full: true, required: true },
                    { name: 'nro_ticket', label: 'Nro Ticket WO Generado', type: 'text', required: true }
                ]
            },
            'wo-canales': {
                title: 'Generar WO - Canales Afectados',
                desc: 'Generar WO para canales de TV afectados.',
                template: `BACKOFFICE HITSS - TÉCNICO\nPersona de Contacto: {persona_contacto}\nParentesco/Cargo: {parentesco}\nNúmero de Contacto: {numero_contacto}\nPlano: {plano}\nDecodificador(es) afectado(s): {decos_afectados}\nSerie - Modelo(1): {serie1}\nSerie - Modelo(2): {serie2}\nSerie - Modelo(3): {serie3}\nSerie - Modelo(4): {serie4}\nSerie - Modelo(5): {serie5}\nCanal(es) afectado(s): {canales_afectados}\nDescartes realizados(especificar):\n-Se consultó grilla Claro TV actualizada.\n-Se envió Refresh STB / INIT sin éxito.\n-Otros descartes: {descartes}\n\nSe generó Ticket WO {nro_ticket} para la revisión del problema.`,
                fields: [
                    { name: 'persona_contacto', label: 'Persona de Contacto', type: 'text', required: true },
                    { name: 'parentesco', label: 'Parentesco/Cargo', type: 'text', required: true },
                    { name: 'numero_contacto', label: 'Número de Contacto', type: 'text', required: true },
                    { name: 'plano', label: 'Plano', type: 'text', required: true },
                    { name: 'decos_afectados', label: 'Cant. Decos', type: 'select', options: ['1', '2', '3', '4', '5'], required: true },
                    { name: 'serie1', label: 'Serie - Modelo (1)', type: 'text', required: true },
                    { name: 'serie2', label: 'Serie - Modelo (2)', type: 'text', required: false },
                    { name: 'serie3', label: 'Serie - Modelo (3)', type: 'text', required: false },
                    { name: 'serie4', label: 'Serie - Modelo (4)', type: 'text', required: false },
                    { name: 'serie5', label: 'Serie - Modelo (5)', type: 'text', required: false },
                    { name: 'canales_afectados', label: 'Canales Afectados', type: 'textarea', full: true, placeholder: 'Nro Canal - Nombre', required: true },
                    { name: 'descartes', label: 'Otros Descartes', type: 'textarea', full: true, required: true },
                    { name: 'nro_ticket', label: 'Nro Ticket WO Generado', type: 'text', required: true }
                ]
            },
            'derivacion-red': {
                title: 'Derivación a Red',
                desc: 'Plantilla para derivar escenarios a RED.',
                template: `BACKOFFICE HITSS - TÉCNICO\nEstado: Derivado a Red\nProblema detectado : {problema_detectado}\nPersona de Contacto: {persona_contacto}\nParentesco/Cargo: {parentesco}\nNúmero de Contacto: {numero_contacto}\nFono(+51): {fono}\nCoordenadas: {coordenadas}\nDescartes realizados(especificar):\n-UDB/PCRF - CORRECTO\n-Reinicio Manual, Reseteo de Fábrica.\n-No se visualización alertas de Luces Leds del router\n-Diagnóstico físico de la tarjeta SIM (Chip): Retirar, Reinsertar\n-Reinicio Manual, Reseteo de Fábrica.\n-Otros descartes: {descartes}\nObservación: Se procede con la derivación al área de RED para la revisión del problema según validación realizada en TRACER LTE.\nREALIZADO POR: {realizado_por}`,
                fields: [
                    { name: 'problema_detectado', label: 'Problema Detectado', type: 'select', options: ['SIN SERVICIO', 'ENLACE LENTO', 'ENLACE INTERMITENTE'], required: true },
                    { name: 'persona_contacto', label: 'Persona de Contacto', type: 'text', required: true },
                    { name: 'parentesco', label: 'Parentesco/Cargo', type: 'text', required: true },
                    { name: 'numero_contacto', label: 'Número de Contacto', type: 'text', required: true },
                    { name: 'fono', label: 'Fono (+51)', type: 'text', required: true },
                    { name: 'coordenadas', label: 'Coordenadas', type: 'text', placeholder: 'Lat, Long', required: true },
                    { name: 'descartes', label: 'Otros descartes', type: 'textarea', full: true, required: true }
                ]
            }
        }
    }
};

// --- APP STATE ---
const App = {
    user: null,
    db: null,
    currentTemplate: null,

    init: async function () {
        console.log('App Initializing...');
        this.checkAuth(); // 1. Check User
        this.initDropdowns(); // 2. Setup UI
        await this.initDB(); // 3. Connect DB
        this.bindEvents(); // 4. Listeners
        this.renderHistory(); // 5. Load Data
    },

    checkAuth: function () {
        try {
            const raw = localStorage.getItem('bo_user');
            if (raw) {
                this.user = JSON.parse(raw);
                document.getElementById('display-user').innerHTML = `<b>${this.user.name}</b>`;
            } else {
                document.getElementById('modal-auth').style.display = 'flex';
            }
        } catch (e) {
            console.error('Auth Error', e);
            document.getElementById('modal-auth').style.display = 'flex';
        }
    },

    initDropdowns: function () {
        const sel = document.getElementById('sel-tipo');
        Object.entries(TEMPLATES).forEach(([key, val]) => {
            sel.add(new Option(val.label, key));
        });
    },

    initDB: function () {
        return new Promise((resolve) => {
            const req = indexedDB.open(APP_CONFIG.dbName, APP_CONFIG.dbVersion);
            req.onupgradeneeded = (e) => {
                const db = e.target.result;
                if (!db.objectStoreNames.contains(APP_CONFIG.storeName)) {
                    const store = db.createObjectStore(APP_CONFIG.storeName, { keyPath: 'id', autoIncrement: true });
                    store.createIndex('ts', 'timestamp');
                }
            };
            req.onsuccess = (e) => {
                this.db = e.target.result;
                resolve();
            };
            req.onerror = (e) => {
                console.error('DB Failed', e);
                resolve(); // Continue anyway
            };
        });
    },

    bindEvents: function () {
        // Auth Form
        document.getElementById('form-auth').onsubmit = (e) => {
            e.preventDefault();
            const name = document.getElementById('auth-name').value;
            const code = document.getElementById('auth-code').value;
            if (name && code) {
                this.user = { name, code };
                localStorage.setItem('bo_user', JSON.stringify(this.user));
                document.getElementById('display-user').innerHTML = `<b>${name}</b>`;
                document.getElementById('modal-auth').style.display = 'none';
            }
        };

        // Type Select
        const selTipo = document.getElementById('sel-tipo');
        const selSub = document.getElementById('sel-subtipo');

        selTipo.onchange = () => {
            const typeKey = selTipo.value;
            selSub.innerHTML = '<option value="" disabled selected>Subtipo</option>';

            if (TEMPLATES[typeKey] && TEMPLATES[typeKey].subtypes) {
                Object.entries(TEMPLATES[typeKey].subtypes).forEach(([key, val]) => {
                    selSub.add(new Option(val.title, key));
                });
                selSub.disabled = false;
            } else {
                selSub.disabled = true;
            }
            this.resetView(false);
        };

        // SubType Select
        selSub.onchange = () => {
            this.loadTemplate(selTipo.value, selSub.value);
        };

        // Reset
        document.getElementById('btn-reset').onclick = () => this.resetView(true);

        // Save
        document.getElementById('btn-save').onclick = () => this.handleSave();

        // Search Filters
        document.getElementById('filter-search').oninput = this.debounce(() => this.renderHistory(), 300);
        document.getElementById('filter-date').onchange = () => this.renderHistory();

        // Global Search
        document.getElementById('global-search').oninput = (e) => this.handleGlobalSearch(e.target.value);
    },

    // --- CORE LOGIC ---

    loadTemplate: function (tKey, sKey) {
        const config = TEMPLATES[tKey]?.subtypes[sKey];
        if (!config) return;

        this.currentTemplate = { tKey, sKey, config };

        // DOM Updates
        document.getElementById('state-welcome').style.display = 'none';
        const formContainer = document.getElementById('state-form');
        formContainer.style.display = 'block';

        document.getElementById('lbl-template-title').innerText = config.title;
        document.getElementById('lbl-template-desc').innerText = config.desc;

        // Generate Fields
        const form = document.getElementById('dyn-form');
        form.innerHTML = '';

        config.fields.forEach(f => {
            const div = document.createElement('div');
            div.className = `dyn-group ${f.full ? 'full' : ''}`;

            // Label
            const label = document.createElement('label');
            label.className = 'dyn-label';
            label.innerText = f.label + (f.required ? ' *' : '');
            div.appendChild(label);

            // Input
            let input;
            if (f.type === 'select') {
                input = document.createElement('select');
                input.className = 'clean-input clean-select';
                f.options.forEach(opt => input.add(new Option(opt, opt)));
            } else if (f.type === 'textarea') {
                input = document.createElement('textarea');
                input.className = 'clean-input';
                input.rows = 3;
                if (f.placeholder) input.placeholder = f.placeholder;
            } else {
                input = document.createElement('input');
                input.className = 'clean-input';
                input.type = f.type;
                if (f.placeholder) input.placeholder = f.placeholder;

                // Auto Date
                if (f.type === 'datetime-local' && f.auto) {
                    const now = new Date();
                    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
                    input.value = now.toISOString().slice(0, 16);
                }
            }

            input.name = f.name;
            input.dataset.required = f.required;
            div.appendChild(input);

            // Error Msg
            const err = document.createElement('span');
            err.className = 'dyn-error';
            err.innerText = 'Este campo es obligatorio';
            div.appendChild(err);

            form.appendChild(div);
        });
    },

    handleSave: function () {
        if (!this.currentTemplate) return;

        const form = document.getElementById('dyn-form');
        const inputs = form.querySelectorAll('input, select, textarea');
        let isValid = true;
        const data = {};

        inputs.forEach(input => {
            const val = input.value.trim();
            const parent = input.parentElement;

            if (input.dataset.required === 'true' && !val) {
                isValid = false;
                parent.classList.add('error');
            } else {
                parent.classList.remove('error');
            }
            data[input.name] = val || '';
        });

        if (!isValid) {
            window.toast('Por favor completa todos los campos requeridos');
            return;
        }

        // Process Template
        let text = this.currentTemplate.config.template;
        Object.keys(data).forEach(k => {
            text = text.replace(`{${k}}`, data[k]);
        });

        // User Signature
        const signature = this.user ? `${this.user.name} (${this.user.code})` : 'Anonimo';
        text = text.replace('{realizado_por}', signature);

        // Copy
        this.copy(text);

        // Save DB
        const record = {
            title: this.currentTemplate.config.title,
            sot: data['numero_contacto'] || data['id_caso'] || data['numero_remedy'] || 'S/N', // Identify ID
            text: text,
            timestamp: new Date().toISOString()
        };
        this.saveRecord(record);
    },

    saveRecord: function (rec) {
        if (!this.db) return;
        const tx = this.db.transaction(APP_CONFIG.storeName, 'readwrite');
        tx.objectStore(APP_CONFIG.storeName).add(rec);
        tx.oncomplete = () => {
            this.renderHistory();
            this.resetView(true);
        };
    },

    renderHistory: function () {
        if (!this.db) return;
        const el = document.getElementById('history-container');
        const filterText = document.getElementById('filter-search').value.toLowerCase();
        const filterDate = document.getElementById('filter-date').value;

        const tx = this.db.transaction(APP_CONFIG.storeName, 'readonly');
        const store = tx.objectStore(APP_CONFIG.storeName);
        const req = store.openCursor(null, 'prev'); // Reverse order

        el.innerHTML = '';
        let found = false;

        req.onsuccess = (e) => {
            const cursor = e.target.result;
            if (cursor) {
                const item = cursor.value;

                // Matches?
                const matchText = !filterText || (item.title.toLowerCase().includes(filterText) || item.sot.toLowerCase().includes(filterText));
                const matchDate = !filterDate || (item.timestamp.startsWith(filterDate));

                if (matchText && matchDate) {
                    found = true;
                    el.appendChild(this.buildCard(item));
                }
                cursor.continue();
            } else {
                if (!found) el.innerHTML = '<div class="empty-msg"><p>No se encontraron registros</p></div>';
            }
        };
    },

    buildCard: function (item) {
        const div = document.createElement('div');
        div.className = 't-card';
        div.innerHTML = `
            <div class="t-head">${item.sot}</div>
            <div class="t-meta">
                <span>${item.title}</span>
                <span>${new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            <div class="t-body">${item.text}</div>
        `;
        div.onclick = () => this.copy(item.text);
        return div;
    },

    // --- UTILS ---

    copy: function (text) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => window.toast('Plantilla copiada'));
        } else {
            const ta = document.createElement('textarea');
            ta.value = text;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
            window.toast('Plantilla copiada');
        }
    },

    resetView: function (full) {
        if (full) {
            document.getElementById('sel-tipo').value = "";
            document.getElementById('sel-subtipo').innerHTML = '<option value="" disabled selected>Subtipo</option>';
            document.getElementById('sel-subtipo').disabled = true;
        }
        document.getElementById('state-welcome').style.display = 'block';
        document.getElementById('state-form').style.display = 'none';
    },

    debounce: function (func, wait) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    },

    handleGlobalSearch: function (val) {
        if (!val) return;
        val = val.toLowerCase();

        // Find first match in template config
        for (const [tKey, tVal] of Object.entries(TEMPLATES)) {
            if (tVal.subtypes) {
                for (const [sKey, sVal] of Object.entries(tVal.subtypes)) {
                    if (sVal.title.toLowerCase().includes(val)) {
                        // Select it
                        document.getElementById('sel-tipo').value = tKey;
                        // Trigger change manually to populate subtypes
                        const selTipo = document.getElementById('sel-tipo');
                        selTipo.dispatchEvent(new Event('change'));

                        // Select subtype
                        setTimeout(() => {
                            const selSub = document.getElementById('sel-subtipo');
                            selSub.value = sKey;
                            selSub.dispatchEvent(new Event('change'));
                        }, 50);
                        return;
                    }
                }
            }
        }
    }
};

// Start
document.addEventListener('DOMContentLoaded', () => App.init());
