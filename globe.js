// ═══════════════════════════════════════════════════
// DEFENDER_TERMINAL — GLOBE.JS
// CesiumJS 3D globe — real country borders, markers,
// weather overlays, military assets, trade routes
// ═══════════════════════════════════════════════════

let viewer = null;
let currentLayer = 'portfolio';
let cesiumEntities = [];
let _clickedPoint = null;

// ── CESIUM TOKEN (free ion token for basic features) ──
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlYWE1OWUxNy1mMWZiLTQzYjYtYTQ0OS1kMWFjYmFkNjc4ZTYiLCJpZCI6NTc3MzMsImlhdCI6MTYyMjY0NDA0N30.XcKpgANiY19MC4bdFUXMVEBToBmqS8kuYpUlxJHYZxk';

function initGlobe() {
  if (viewer) return;

  // ── CREATE CESIUM VIEWER ──
  viewer = new Cesium.Viewer('cesiumContainer', {
    // Use Cesium Ion World Imagery (Bing-quality satellite)
    imageryProvider: new Cesium.IonImageryProvider({ assetId: 3 }),
    terrainProvider: Cesium.createWorldTerrain({ requestWaterMask: true, requestVertexNormals: true }),
    timeline: false,
    animation: false,
    baseLayerPicker: false,
    geocoder: false,
    homeButton: false,
    sceneModePicker: false,
    navigationHelpButton: false,
    infoBox: false,
    selectionIndicator: false,
    fullscreenButton: false,
    vrButton: false,
    creditContainer: document.createElement('div'), // hide credits
    contextOptions: { webgl: { alpha: false } },
    skyBox: false,
    backgroundColor: Cesium.Color.fromCssColorString('#000005'),
  });

  // ── SCENE SETTINGS ── FlightFocus dark aesthetic
  var scene = viewer.scene;
  scene.backgroundColor = new Cesium.Color(0, 0, 0.02, 1);
  scene.skyAtmosphere.show = true;
  scene.skyAtmosphere.atmosphereScaleHeight = 9500;
  scene.fog.enabled = true;
  scene.fog.density = 0.0001;
  scene.globe.enableLighting = true;
  scene.globe.nightFadeOutDistance = 20000000;
  scene.globe.nightFadeInDistance = 10000000;
  scene.globe.showGroundAtmosphere = true;
  scene.globe.baseColor = new Cesium.Color(0, 0.01, 0.04, 1);

  // ── ATMOSPHERE ──
  scene.skyAtmosphere.brightnessShift = -0.4;
  scene.skyAtmosphere.saturationShift = 0.2;
  scene.skyAtmosphere.hueShift = 0.0;

  // ── DARK IMAGERY OVERLAY ── darken base map to night-side style
  var darkOverlay = viewer.imageryLayers.addImageryProvider(
    new Cesium.SingleTileImageryProvider({
      url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
      rectangle: Cesium.Rectangle.fromDegrees(-180, -90, 180, 90)
    })
  );
  darkOverlay.alpha = 0.35;
  darkOverlay.brightness = 0;

  // ── CAMERA — start over Tvarozna / Central Europe ──
  viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(20.0, 45.0, 12000000),
    orientation: { heading: 0, pitch: -Cesium.Math.PI_OVER_TWO, roll: 0 }
  });

  // ── CLICK HANDLER ──
  var handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
  handler.setInputAction(function(click) {
    var picked = scene.pick(click.position);
    if (Cesium.defined(picked) && picked.id && picked.id.properties) {
      var props = picked.id.properties;
      var data = {};
      if (props.hasProperty('_data')) {
        data = props._data.getValue();
      }
      if (data && data.name) {
        _clickedPoint = data;
        showCoPanel(data);
      }
    } else {
      coClose();
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

  // ── INITIAL LAYER ──
  setLayer('portfolio', document.querySelector('.lyr-btn.on'));
}

// ── CLEAR ALL ENTITIES ──
function clearGlobeEntities() {
  cesiumEntities.forEach(function(e) {
    if (viewer && viewer.entities.contains(e)) viewer.entities.remove(e);
  });
  cesiumEntities = [];
  // Also remove polylines
  if (viewer) viewer.entities.removeAll();
}

// ── ADD MARKER ──
function addCesiumMarker(d) {
  var color = Cesium.Color.fromCssColorString(d.color || '#ffffff');
  var size  = (d.size || 0.6) * 14;
  var isWar = d.type === 'war' || d.type === 'threat';
  var isHQ  = d.type === 'hq';

  // Point entity
  var entity = viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(d.lng, d.lat),
    point: {
      pixelSize: size,
      color: color.withAlpha(isWar ? 0.9 : 0.85),
      outlineColor: Cesium.Color.WHITE.withAlpha(0.4),
      outlineWidth: isHQ ? 2 : 1,
      heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
      distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 80000000),
      scaleByDistance: new Cesium.NearFarScalar(1000000, 1.5, 60000000, 0.6),
    },
    label: {
      text: d.sym || d.name,
      font: '600 10px "IBM Plex Mono", monospace',
      fillColor: color,
      outlineColor: Cesium.Color.BLACK,
      outlineWidth: 3,
      style: Cesium.LabelStyle.FILL_AND_OUTLINE,
      pixelOffset: new Cesium.Cartesian2(0, -size - 4),
      heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
      distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 25000000),
      scaleByDistance: new Cesium.NearFarScalar(500000, 1.0, 20000000, 0.6),
      showBackground: true,
      backgroundColor: new Cesium.Color(0, 0, 0, 0.7),
      backgroundPadding: new Cesium.Cartesian2(4, 2),
    },
    properties: { _data: d }
  });
  cesiumEntities.push(entity);

  // Pulse billboard for hot zones / assets
  if (d.type === 'asset' || d.type === 'hq' || isWar) {
    var pulseEntity = viewer.entities.add({
      position: Cesium.Cartesian3.fromDegrees(d.lng, d.lat),
      ellipse: {
        semiMinorAxis: 80000 * (d.size || 0.6),
        semiMajorAxis: 80000 * (d.size || 0.6),
        material: color.withAlpha(0.12),
        outline: true,
        outlineColor: color.withAlpha(0.4),
        outlineWidth: 1.5,
        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
      },
      properties: { _data: d }
    });
    cesiumEntities.push(pulseEntity);

    // Animated pulse
    if (isWar || isHQ) {
      var pulseEntity2 = viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(d.lng, d.lat),
        ellipse: {
          semiMinorAxis: new Cesium.CallbackProperty(function(t) {
            return 120000 * (d.size || 0.6) * (0.7 + 0.3 * Math.sin(Date.now() / 600));
          }, false),
          semiMajorAxis: new Cesium.CallbackProperty(function(t) {
            return 120000 * (d.size || 0.6) * (0.7 + 0.3 * Math.sin(Date.now() / 600));
          }, false),
          material: color.withAlpha(0.06),
          outline: true,
          outlineColor: color.withAlpha(0.25),
          outlineWidth: 1,
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
        },
        properties: { _data: d }
      });
      cesiumEntities.push(pulseEntity2);
    }
  }
}

// ── ADD TRADE ROUTE ARC ──
function addTradeRoute(route) {
  var color = Cesium.Color.fromCssColorString(route.color || '#ffffff');
  var mid = {
    lat: (route.from[0] + route.to[0]) / 2,
    lng: (route.from[1] + route.to[1]) / 2
  };
  var dist = Math.sqrt(
    Math.pow(route.to[0] - route.from[0], 2) +
    Math.pow(route.to[1] - route.from[1], 2)
  );
  var arcH = Math.max(500000, dist * 25000);

  // Build arc points
  var pts = [];
  for (var i = 0; i <= 50; i++) {
    var t = i / 50;
    var lat = route.from[0] + (route.to[0] - route.from[0]) * t;
    var lng = route.from[1] + (route.to[1] - route.from[1]) * t;
    var h = arcH * Math.sin(t * Math.PI);
    pts.push(Cesium.Cartesian3.fromDegrees(lng, lat, h));
  }

  var entity = viewer.entities.add({
    polyline: {
      positions: pts,
      width: route.width || 1.5,
      material: new Cesium.PolylineArrowMaterialProperty(color.withAlpha(0.6)),
      clampToGround: false,
      distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 60000000),
    },
    properties: { _data: { name: route.label, type: 'trade', detail: route.label + ' — ' + route.value, color: route.color } }
  });
  cesiumEntities.push(entity);
}

// ── ADD WAR ZONE POLYGON ──
function addWarZonePolygon(lat, lng, radiusDeg, color, label) {
  var c = Cesium.Color.fromCssColorString(color);
  var pts = [];
  for (var i = 0; i <= 36; i++) {
    var angle = (i / 36) * Math.PI * 2;
    pts.push(lng + radiusDeg * Math.cos(angle));
    pts.push(lat + radiusDeg * 0.7 * Math.sin(angle));
  }
  var entity = viewer.entities.add({
    polygon: {
      hierarchy: Cesium.Cartesian3.fromDegreesArray(pts),
      material: c.withAlpha(0.08),
      outline: true,
      outlineColor: c.withAlpha(0.4),
      outlineWidth: 1,
      heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
    }
  });
  cesiumEntities.push(entity);
}

// ── SET LAYER ──
function setLayer(layer, btn) {
  currentLayer = layer;
  document.querySelectorAll('.lyr-btn').forEach(function(b) {
    b.classList.remove('on');
    b.removeAttribute('data-active');
  });
  if (btn) {
    btn.classList.add('on');
    if (layer === 'war')     btn.classList.add('war');
    if (layer === 'risk')    btn.classList.add('risk');
    if (layer === 'weather') btn.classList.add('wx');
  }
  coClose();
  clearGlobeEntities();
  renderLayer(layer);

  var labels = { portfolio:'PORTFOLIO HQ', war:'WAR ZONES & MILITARY', risk:'RISK MAPPING', weather:'WEATHER INTEL', trade:'TRADE ROUTES' };
  var el = document.getElementById('h-layer');
  if (el) el.textContent = labels[layer] || layer.toUpperCase();

  // Weather widget visibility
  var wx = document.getElementById('wx-widget');
  if (wx) wx.style.display = layer === 'weather' ? 'block' : 'none';
}

function renderLayer(layer) {
  if (!viewer) return;

  if (layer === 'portfolio') {
    ALL_MARKERS.forEach(function(m) { addCesiumMarker(m); });
    // Fly to Europe
    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(16.0, 47.0, 8000000),
      duration: 2
    });
  }
  else if (layer === 'war') {
    WAR_MARKERS.forEach(function(m) { addCesiumMarker(m); });
    // War zone polygons
    addWarZonePolygon(49.0, 32.0, 4, '#ef4444', 'Ukraine');
    addWarZonePolygon(14.0, 44.0, 3, '#ef4444', 'Red Sea');
    addWarZonePolygon(23.0, 120.0, 3, '#f59e0b', 'Taiwan');
    addWarZonePolygon(31.5, 35.0, 2.5, '#ef4444', 'Middle East');
    // Arc routes between carriers
    addTradeRoute({ from:[40.5,-55.0], to:[14.0,44.0], label:'Ford CSG transit', color:'#ffffff', width:1.5, value:'Transit' });
    addTradeRoute({ from:[14.0,44.0], to:[49.43,7.6], label:'Ramstein supply', color:'#ef4444', width:1, value:'Support' });
    viewer.camera.flyTo({ destination: Cesium.Cartesian3.fromDegrees(30.0, 30.0, 15000000), duration: 2 });
  }
  else if (layer === 'risk') {
    RISK_MARKERS.forEach(function(m) { addCesiumMarker(m); });
    // Risk heatmap polygons
    addWarZonePolygon(49.0, 32.0, 5, '#ef4444', 'Ukraine CRITICAL');
    addWarZonePolygon(55.7, 37.6, 6, '#ef4444', 'Russia CRITICAL');
    addWarZonePolygon(14.0, 44.0, 4, '#ef4444', 'Red Sea HIGH');
    addWarZonePolygon(23.0, 120.0, 4, '#f59e0b', 'Taiwan ELEVATED');
    addWarZonePolygon(35.0, 104.0, 8, '#f59e0b', 'China MONITOR');
    viewer.camera.flyTo({ destination: Cesium.Cartesian3.fromDegrees(35.0, 30.0, 18000000), duration: 2 });
  }
  else if (layer === 'weather') {
    WEATHER_MARKERS.forEach(function(m) { addCesiumMarker(m); });
    renderWeatherWidget();
  }
  else if (layer === 'trade') {
    // HQ markers first
    ALL_MARKERS.filter(function(m) { return m.type === 'asset' || m.type === 'hq'; }).forEach(function(m) {
      addCesiumMarker(m);
    });
    // Trade arcs
    TRADE_ROUTES.forEach(function(r) { addTradeRoute(r); });
    viewer.camera.flyTo({ destination: Cesium.Cartesian3.fromDegrees(-30.0, 20.0, 20000000), duration: 2.5 });
  }
}

// ── WEATHER WIDGET ──
function renderWeatherWidget() {
  var wx = document.getElementById('wx-data');
  var loc = document.getElementById('wx-loc');
  if (!wx || !loc) return;
  loc.textContent = 'TVAROZNA — GLOBAL INTEL';
  wx.innerHTML = WEATHER_MARKERS.map(function(w) {
    var tempColor = w.chg === 'THUNDERSTORMS' || w.chg === 'SNOW/FOG' ? '#ef4444' : '#60a5fa';
    return '<div style="padding:2px 0;border-bottom:1px solid #111;display:flex;justify-content:space-between">' +
      '<span style="color:#888">' + w.name.split('—')[0].trim() + '</span>' +
      '<span style="color:' + tempColor + '">' + w.price + ' ' + w.chg + '</span>' +
      '</div>';
  }).join('');

  // Fetch real weather if API key available
  fetchWeatherForHQ();
}

// ── REAL WEATHER FETCH (OpenWeatherMap) ──
async function fetchWeatherForHQ() {
  var key = localStorage.getItem('dft_owm');
  if (!key) return;
  try {
    var r = await fetch('https://api.openweathermap.org/data/2.5/weather?lat=49.21&lon=16.88&appid=' + key + '&units=metric');
    var d = await r.json();
    var wx = document.getElementById('wx-data');
    var tvar = document.getElementById('windy-tvar');
    if (d.main && wx) {
      var tempC = d.main.temp.toFixed(1);
      var wind  = (d.wind.speed * 3.6).toFixed(0);
      var desc  = (d.weather[0].description || '').toUpperCase();
      if (tvar) tvar.textContent = 'TVAROZNA: ' + tempC + '\u00b0C';
      // Update first row
      var rows = wx.querySelectorAll('div');
      if (rows[0]) rows[0].innerHTML = '<span style="color:#888">TVAROZNA LIVE</span><span style="color:#60a5fa">' + tempC + '\u00b0C ' + desc + ' ' + wind + 'km/h</span>';
    }
  } catch(e) {}
}

// ── SHOW COMPANY PANEL ──
function showCoPanel(d) {
  var panel = document.getElementById('co-panel');
  document.getElementById('co-name').textContent  = d.name || d.sym || 'ASSET';
  document.getElementById('co-tick').textContent  = d.sym ? d.sym + ' \u00b7 ' + (d.type||'').toUpperCase() : (d.type||'').toUpperCase();
  document.getElementById('co-price').textContent = d.price || '--';
  var chgEl = document.getElementById('co-chg');
  chgEl.textContent = d.chg || '--';
  chgEl.className = 'co-chg ' + (d.up ? 'up' : (d.chg && d.chg[0]==='+') ? 'up' : (d.chg && d.chg[0]==='-') ? 'dn' : '');

  var p = [];
  var cd = CO_DATA[d.sym] || {};

  if (d.type === 'asset') {
    p.push('<div class="co-sec">FUNDAMENTALS</div>');
    if (cd.fundamentals) {
      Object.entries(cd.fundamentals).forEach(function(kv) {
        p.push('<div class="co-kv"><div class="co-k">' + kv[0] + '</div><div class="co-v">' + kv[1] + '</div></div>');
      });
    }
    var sc = d.sigsym==='buy'?'g':d.sigsym==='risk'?'r':'a';
    p.push('<div class="co-sec">SIGNAL</div>');
    p.push('<div class="co-kv"><div class="co-k">DEFENDER</div><div class="co-v '+sc+'">'+(d.sig||'--')+'</div></div>');
    if (d.detail) {
      p.push('<div class="co-sec">INTEL</div>');
      p.push('<div style="font-size:8px;color:#aaa;line-height:1.6">'+d.detail+'</div>');
    }
    if (cd.contracts && cd.contracts.length) {
      p.push('<div class="co-sec">CONTRACTS</div>');
      cd.contracts.forEach(function(c) { p.push('<div class="co-contract">' + c + '</div>'); });
    }
    if (cd.exports && cd.exports.length) {
      p.push('<div class="co-sec">EXPORT FLOWS</div>');
      cd.exports.forEach(function(e) { p.push('<div class="co-trade">\u2192 ' + e + '</div>'); });
    }
    if (cd.imports && cd.imports.length) {
      p.push('<div class="co-sec">IMPORT / SUPPLY CHAIN</div>');
      cd.imports.forEach(function(i) { p.push('<div class="co-trade" style="color:#f59e0b">\u2190 ' + i + '</div>'); });
    }
    p.push('<div class="co-actions">');
    p.push('<button class="co-action" onclick="_coOpenTrading()">OPEN IN TRADING</button>');
    p.push('<button class="co-action" onclick="_coAskDefender()">ASK DEFENDER</button>');
    p.push('</div>');

  } else if (d.type === 'office') {
    p.push('<div class="co-sec">SECONDARY OFFICE</div>');
    p.push('<div style="font-size:8px;color:#aaa;line-height:1.6">' + (d.detail||'') + '</div>');
    if (cd.contracts) {
      p.push('<div class="co-sec">PARENT CONTRACTS</div>');
      cd.contracts.slice(0,2).forEach(function(c) { p.push('<div class="co-contract">'+c+'</div>'); });
    }
    p.push('<div class="co-actions"><button class="co-action" onclick="_coAskDefender()">ASK DEFENDER</button></div>');

  } else if (d.type === 'hq') {
    p.push('<div class="co-sec">HOME BASE — SECURE</div>');
    p.push('<div class="co-kv"><div class="co-k">Coordinates</div><div class="co-v">49.21\u00b0N 16.88\u00b0E</div></div>');
    p.push('<div class="co-kv"><div class="co-k">Location</div><div class="co-v">Tva\u0159o\u017en\u00e1, CZ</div></div>');
    p.push('<div class="co-actions">');
    p.push('<a class="co-action" href="https://www.tvarozna.eu" target="_blank">LIVE WEBCAM</a>');
    p.push('<button class="co-action" onclick="openWindy()">WINDY WEATHER</button>');
    p.push('</div>');

  } else if (d.type === 'war' || d.type === 'fleet' || d.type === 'base' || d.type === 'threat') {
    p.push('<div class="co-sec">INTEL REPORT</div>');
    p.push('<div class="co-kv"><div class="co-k">Type</div><div class="co-v r">'+(d.type||'').toUpperCase()+'</div></div>');
    p.push('<div class="co-kv"><div class="co-k">Status</div><div class="co-v r">'+(d.chg||'--')+'</div></div>');
    if (d.detail) p.push('<div style="font-size:7px;color:#aaa;line-height:1.6;margin:6px 0">' + d.detail + '</div>');
    if (d.armada) {
      p.push('<div class="co-sec">ASSETS / ARMADA</div>');
      p.push('<div style="font-size:7px;color:#f59e0b;line-height:1.8">'+d.armada+'</div>');
    }
    p.push('<div class="co-actions">');
    p.push('<button class="co-action" onclick="_coWarIntel()">ASK DEFENDER</button>');
    p.push('<button class="co-action" onclick="openMarine()">VESSELS LIVE</button>');
    p.push('</div>');

  } else if (d.type === 'risk') {
    var s = parseInt(d.price)||0;
    var rc = s>70?'r':s>40?'a':'g';
    var lc = (d.chg==='CRITICAL'||d.chg==='HIGH')?'r':d.chg==='ELEVATED'?'a':'g';
    p.push('<div class="co-sec">RISK ASSESSMENT</div>');
    p.push('<div class="co-kv"><div class="co-k">Score</div><div class="co-v '+rc+'">'+(d.price||'--')+'</div></div>');
    p.push('<div class="co-kv"><div class="co-k">Level</div><div class="co-v '+lc+'">'+(d.chg||'--')+'</div></div>');
    if (d.detail) p.push('<div style="font-size:7px;color:#aaa;line-height:1.6;margin-top:6px">'+d.detail+'</div>');
    p.push('<div class="co-actions"><button class="co-action" onclick="_coWarIntel()">ASK DEFENDER</button></div>');

  } else if (d.type === 'weather') {
    p.push('<div class="co-sec">WEATHER INTEL</div>');
    p.push('<div class="co-kv"><div class="co-k">Temp</div><div class="co-v b">'+(d.price||'--')+'</div></div>');
    p.push('<div class="co-kv"><div class="co-k">Conditions</div><div class="co-v">'+(d.chg||'--')+'</div></div>');
    if (d.detail) p.push('<div style="font-size:7px;color:#aaa;line-height:1.6;margin-top:6px">'+d.detail+'</div>');
    p.push('<div class="co-actions"><button class="co-action" onclick="openWindy()">WINDY LIVE</button></div>');

  } else if (d.type === 'trade') {
    p.push('<div class="co-sec">TRADE ROUTE</div>');
    if (d.detail) p.push('<div style="font-size:8px;color:#a78bfa;line-height:1.6">'+d.detail+'</div>');
  }

  document.getElementById('co-body').innerHTML = p.join('');
  panel.classList.add('vis');
}

function coClose() {
  document.getElementById('co-panel').classList.remove('vis');
}

// ── ZOOM / CAMERA HELPERS ──
function gZoomIn()  { if(!viewer) return; var c=viewer.camera; c.zoomIn(c.positionCartographic.height*0.3); }
function gZoomOut() { if(!viewer) return; var c=viewer.camera; c.zoomOut(c.positionCartographic.height*0.4); }
function gReset()   { if(!viewer) return; viewer.camera.flyTo({ destination: Cesium.Cartesian3.fromDegrees(20.0, 45.0, 10000000), duration: 1.5 }); }
function gToggleRot() {
  if (!viewer) return;
  var btn = document.getElementById('rot-btn');
  if (viewer.clock.shouldAnimate) {
    viewer.clock.shouldAnimate = false;
    if (btn) btn.classList.remove('on');
  } else {
    viewer.clock.shouldAnimate = true;
    if (btn) btn.classList.add('on');
  }
}

// ── ACTION HANDLERS ──
function _coOpenTrading() {
  if (_clickedPoint && _clickedPoint.sym) {
    var tv = WL_DATA.find(function(w) { return w.s === _clickedPoint.sym; });
    if (tv) { tvSet(tv.tv); }
    nav('trade-view', document.querySelectorAll('.tb-tab')[3]);
  }
}
function _coAskDefender() {
  if (_clickedPoint) {
    var sym = _clickedPoint.sym || _clickedPoint.name;
    document.getElementById('ai-input').value = 'DEFENDER — PLAN FOR ' + sym + ': full institutional analysis with fair value, entry zones, and signals';
    nav('ai-view', document.querySelectorAll('.tb-tab')[5]);
    sendMsg();
  }
}
function _coWarIntel() {
  if (_clickedPoint) {
    document.getElementById('ai-input').value = 'DEFENDER: intel on ' + (_clickedPoint.name||'this zone') + ' — situation assessment and portfolio impact';
    nav('ai-view', document.querySelectorAll('.tb-tab')[5]);
    sendMsg();
  }
}

// ── WINDY / MARINE ──
function openWindy() {
  var m = document.getElementById('windy-modal');
  m.style.display = 'flex';
  fetchWindyPoint();
}
function closeWindy() { document.getElementById('windy-modal').style.display = 'none'; }

async function fetchWindyPoint() {
  var key = localStorage.getItem('dft_wy');
  var label = document.getElementById('windy-tvar');
  if (!key) { if(label) label.textContent = 'TVAROZNA: SET WINDY KEY IN CONFIG'; return; }
  try {
    var r = await fetch('https://api.windy.com/api/point-forecast/v2', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ lat:49.2088, lon:16.8827, model:'gfs', parameters:['temp','wind'], levels:['surface'], key:key })
    });
    var d = await r.json();
    if (d['temp-surface'] && label) {
      var t = (d['temp-surface'][0] - 273.15).toFixed(1);
      label.textContent = 'TVAROZNA: ' + t + '\u00b0C';
    }
  } catch(e) {}
}

function openMarine() { document.getElementById('marine-modal').style.display = 'flex'; }
function closeMarine() { document.getElementById('marine-modal').style.display = 'none'; }
function marineGoto(lat, lon, zoom) {
  document.getElementById('marine-iframe').src = 'https://www.marinetraffic.com/en/ais/home/centerx:' + lon + '/centery:' + lat + '/zoom:' + zoom;
}
