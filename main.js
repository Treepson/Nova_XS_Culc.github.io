(function(){
  "use strict";

  const DATA = {
    base: { device:"Orion NOVA XS", normal:150, alarm:150 },
    //УНІВЕРСАЛЬНИЙ СЛОТ
    modulesInner: [
      { name:"M-OUT2R", img:"assets/modules/M-OUT2R.png", normal:40, alarm:40 },
      { name:"M-X", img:"assets/modules/M-X.png",     normal:25, alarm:25 },
      { name:"M-WiFi", img:"assets/modules/M-WiFi.png",  normal:50, alarm:50 },
      { name:"M-NET+", img:"assets/modules/M-NET+.png",  normal:80, alarm:80 },
      { name:"M-Z+", img:"assets/modules/M-Z+.png",    normal:20, alarm:20 }
    ],
    //КЛАВІАТУРИ
    keyboardGroups: {
      "K-LED": {
        img:"assets/kb/K-LED.png",
        models:[
          { name:"K-LED4",  normal:40, alarm:40 },
          { name:"K-LED8",  normal:40, alarm:40 },
          { name:"K-LED16", normal:40, alarm:40 }
        ]
      },
      "K-PAD": {
        img:"assets/kb/K-Pad.png",
        models:[
          { name:"K-PAD4",   normal:30, alarm:30 },
          { name:"K-PAD4+",  normal:30, alarm:30 },
          { name:"K-PAD8",   normal:55, alarm:55 },
          { name:"K-PAD8+",  normal:55, alarm:55 },
          { name:"K-PAD16",  normal:55, alarm:55 },
          { name:"K-PAD16+", normal:55, alarm:55 },
          { name:"K-PAD OLED", normal:120, alarm:120 },
          { name:"K-PAD OLED+", normal:120, alarm:120 }
        ]
      },
      "K-GLCD": {
        img:"assets/kb/K-GLCD.png",
        models:[
          { name:"K-GLCD",  normal:220, alarm:220 },
          { name:"K-GLCD+", normal:220, alarm:220 }
        ]
      },
      "K-LCD": {
        img:"assets/kb/K-LCD.webp",
        models:[
          { name:"K-LCD", normal:60, alarm:60 }
        ]
      }
    },

    //РОЗШИРЮВАЧІ
    modulesExt: {
  "Розширювачі зон":[
    { name:"M-Z box",   img:"assets/modules/M-Z box.png", normal:60, alarm:60 },
    { name:"M-ZP box",  img:"assets/modules/M-ZPBox.png", normal:200, alarm:200 },
    { name:"M-ZP sBox", img:"assets/modules/M-ZP sBox.png", normal:150, alarm:150 },
    { name:"M-ZP mBox", img:"assets/modules/M-ZP mBox.png", normal:200, alarm:200 }
  ],
  "Розширювачі виходів":[
    { name:"M-OUT2R box", img:"assets/modules/M-OUT2R box.png", normal:40, alarm:40 },
    { name:"M-OUT8R",     img:"assets/modules/M-OUT8R.png", normal:25, alarm:360 }
  ],
  "Панелі індикації":[
    { name:"P-IND32", img:"assets/modules/P-IND32.png", normal:80, alarm:80 }
  ]
  },
    //ДАТЧИКИ
    sensors:[
      { name:"Swan Quad", img:"assets/sensors/swanquad.png", normal:8, alarm:10 },
      { name:"Swan PGB", img:"assets/sensors/swanpgb.png",  normal:16, alarm:22 },
      { name:"GBD II", img:"assets/sensors/gbd 2.png", normal:22, alarm:26 },
      { name:"SRPG II", img:"assets/sensors/srpg 2.png", normal:16, alarm:22 },
      { name:"SRP 600", img:"assets/sensors/srp600.png", normal:8, alarm:8 },
      { name:"GSN Patrol 803", img:"assets/sensors/patrol 803.png", normal:17, alarm:19 },
      { name:"LC-100", img:"assets/sensors/LC 100.png", normal:8, alarm:10 },
      { name:"LC-102", img:"assets/sensors/LC 102.png", normal:16, alarm:18 },
      { name:"Detecto SMK10", img:"assets/sensors/SMK 10.webp", normal:0.11, alarm:16 },
      { name:"Detecto HT10", img:"assets/sensors/HT 10.webp", normal:0.10, alarm:16 },
      { name:"Detecto MLT10", img:"assets/sensors/MLT 10.png", normal:0.12, alarm:16 }
    ],
    //СИРЕНИ
    sirens:[
      { name:"Джміль",     img:"assets/sirens/dzhmil.png",      normal:0, alarm:100 },
      { name:"Джміль-1",   img:"assets/sirens/dzhmil-1.png",    normal:0, alarm:100 },
      { name:"Джміль-2",   img:"assets/sirens/dzhmil-1.png",    normal:0, alarm:300 }
    ]
  };

// ====== HELPERS ======
  function qs(sel,root){return (root||document).querySelector(sel);}
  function qsa(sel,root){return Array.from((root||document).querySelectorAll(sel));}

  //ПОЛОЖЕННЯ "+" НА РОЗШИРЮВАЧАХ
  const EXT_HOTSPOTS = {

  "M-ZP box": {
    sens:  { left: 40.9, top: 30.0 },
    sens2:  { left: 51.4, top: 17.4 },
    modx: { left: -100, top: -100 },
    power: { left: 74.2, top: 42.3 },
    sir:   { left: 69.0, top: 42.3 }
  },

  "M-ZP sBox": {
    sens:  { left: 51.3, top: 39.7 },
    modx:  { left: 78.1, top: 11.5 },
    power: { left: 74.5, top: 39.7 },
    sir:   { left: 84.0, top: 39.7 }
  },

  "M-ZP mBox": {
    sens:   { left: 46.3, top: 20.9 },
    modx:   { left: 65.2, top: 13.2 },
    power:  { left: 55.1, top: 34.7 },
    sir:    { left: 65.8, top: 34.7 },
    sens2:  { left: 56.3, top: 15.9 }
  }
};

  // DOM references
  const rowsEl     = qs("#rows");
  const hoursEl    = qs("#hours");
  const reserveEl  = qs("#reserve");
  const sumNormEl  = qs("#sumNorm");
  const sumAlarmEl = qs("#sumAlarm");
  const capEl      = qs("#capacity");

  const modal       = qs("#modal");
  const modalTitle  = qs("#modalTitle");
  const tabKbBody   = qs("#tab-kb");
  const tabModsBody = qs("#tab-mods");
  const genericBody = qs("#generic-body");

  const tabKbBtn    = qs('.tab[data-tab="kb"]');
  const tabModsBtn  = qs('.tab[data-tab="mods"]');
  const closeBtn    = qs("#closeModal");
  const clearBtn    = qs("#clearAll");
  const deviceTypeSwitch = document.getElementById("device-type-switch");
  if (deviceTypeSwitch) {
  deviceTypeSwitch.dataset.visible = "false";
  }
  const cart = new Map();

  const universalSlots = [null, null];
  const SLOT_LIMITS = {
    "M-OUT2R": 2,
    "M-Z+": 2,
    "M-X": 1,
    "M-WiFi": 1,
    "M-NET+": 1
  };
  // Несумісні модулі універсального слота
  const MODULE_CONFLICTS = {
  "M-WiFi": ["M-NET+"],
  "M-NET+": ["M-WiFi"]
  };
  
  function hasModuleConflict(moduleName) {
  const conflicts = MODULE_CONFLICTS[moduleName];
  if (!conflicts) return false;

  return universalSlots.some(
    s => s && conflicts.includes(s.name)
  );
  }

  let currentSlotIndex = null;
  let slotButtons = [];

  // Extenders context
  const extDevices = new Map();
  let currentContext = { type: "main", id: "main" };

  let deviceTabsEl = null;
  let extPagesEl   = null;
  let stageEl      = null;

  function updateSlotUI(){
    if(!slotButtons) return;
    slotButtons.forEach((btn, idx)=>{
      if(!btn) return;
      const slot = universalSlots[idx];
      if(slot){
        btn.classList.add("occupied");
        btn.classList.remove("free");
        btn.title = slot.name;
      }else{
        btn.classList.remove("occupied");
        btn.classList.add("free");
        btn.title = "Модулі";
        btn.textContent = "+";
      }
    });
  }

  function clearSlotsByModuleName(name){
    for(let i=0;i<universalSlots.length;i++){
      const s = universalSlots[i];
      if(s && s.name === name){
        universalSlots[i] = null;
      }
    }
    updateSlotUI();
  }

  function syncCartFromSlots(){
    const counts = {};
    universalSlots.forEach(s=>{
      if(s){
        counts[s.name] = (counts[s.name]||0)+1;
      }
    });

    // оновлюємо існуючі модулі універсального слота в кошику
    cart.forEach((item,key)=>{
      if(item.type === "Модуль" && DATA.modulesInner.some(m=>m.name===item.name)){
        const c = counts[item.name] || 0;
        if(c<=0){
          cart.delete(key);
        }else{
          item.qty = c;
        }
      }
    });

    // додаємо відсутні модулі за потреби
    DATA.modulesInner.forEach(m=>{
      const c = counts[m.name] || 0;
      if(c>0){
        const proto = {
          type:"Модуль",
          name:m.name,
          normal:m.normal||0,
          alarm:m.alarm||0,
          qty:c,
          fixed:false
        };
        const k = keyOf(proto);
        if(cart.has(k)){
          cart.get(k).qty = c;
        }else{
          cart.set(k, proto);
        }
      }
    });

    renderTable();
  }

  function assignModuleToSlot(slotIndex, mod){
    if(slotIndex == null || slotIndex < 0 || slotIndex >= universalSlots.length) return;
    const name = mod.name;
    const max = SLOT_LIMITS[name] || 1;

    // рахуємо модулі того ж типу в інших слотах
    let otherCount = 0;
    universalSlots.forEach((s, idx)=>{
      if(idx !== slotIndex && s && s.name === name) otherCount++;
    });
    if(otherCount >= max){
      return;
    }

    universalSlots[slotIndex] = { name:name };
    updateSlotUI();
    syncCartFromSlots();
    modal.classList.remove("open");
  }


  function keyOf(it){return it.type+":"+it.name;}

  function initCart(){
    cart.clear();
    const base = {
      type:"Прилад",
      name:DATA.base.device,
      normal:DATA.base.normal,
      alarm:DATA.base.alarm,
      qty:1,
      fixed:true
    };
    cart.set(keyOf(base), base);
    // скидаємо універсальні слоти
    for(let i=0;i<universalSlots.length;i++){
      universalSlots[i] = null;
    }
    updateSlotUI();
  }

  function renderTable(){
    rowsEl.innerHTML = "";
    const order = ["Прилад","Модуль","Клавіатура","Датчик","Сирена"];
    const arr = Array.from(cart.values()).sort((a,b)=>{
      const ai = order.indexOf(a.type);
      const bi = order.indexOf(b.type);
      if(ai!==bi) return ai-bi;
      return a.name.localeCompare(b.name,"uk");
    });

    arr.forEach(item=>{
      const tr = document.createElement("tr");
      const td = txt=>{
        const c = document.createElement("td");
        c.textContent = txt;
        return c;
      };
      tr.appendChild(td(item.type));

      if(item.custom){
        const tdName=document.createElement("td");
        const inpName=document.createElement("input");
        inpName.className="ext-edit";
        inpName.value=item.name;
        inpName.addEventListener("input",()=>{item.name=inpName.value;});
        tdName.appendChild(inpName);
        tr.appendChild(tdName);

        const tdNorm=document.createElement("td");
        const inpNorm=document.createElement("input");
        inpNorm.type="number";
        inpNorm.className="ext-edit";
        inpNorm.value=item.normal;
        inpNorm.addEventListener("input",()=>{
          let v=parseFloat(inpNorm.value||"0");
          if(isNaN(v)||v<0) v=0;
          item.normal=v;
          inpNorm.value=v;
          updateTotals();
        });
        tdNorm.appendChild(inpNorm);
        tr.appendChild(tdNorm);

        const tdAlarm=document.createElement("td");
        const inpAlarm=document.createElement("input");
        inpAlarm.type="number";
        inpAlarm.className="ext-edit";
        inpAlarm.value=item.alarm;
        inpAlarm.addEventListener("input",()=>{
          let v=parseFloat(inpAlarm.value||"0");
          if(isNaN(v)||v<0) v=0;
          item.alarm=v;
          inpAlarm.value=v;
          updateTotals();
        });
        tdAlarm.appendChild(inpAlarm);
        tr.appendChild(tdAlarm);
      }else{
        tr.appendChild(td(item.name));
        tr.appendChild(td(item.normal));
        tr.appendChild(td(item.alarm));
      }

      const tdQty = document.createElement("td");
      tdQty.className="qty";
      const inp = document.createElement("input");
      if(item.fixed){
        inp.value = 1;
        inp.disabled = true;
        inp.classList.add("locked");
      }
      // блокування ручного редагування модулів універсального слота
      if(item.type === "Модуль" && DATA.modulesInner.some(m => m.name === item.name)){
        inp.disabled = true;
        inp.classList.add("locked");
      }
      inp.type="number"; inp.min="1"; inp.step="1"; inp.value=item.qty;
      inp.addEventListener("input",()=>{
        let v = parseInt(inp.value||"1",10);
        if(isNaN(v)||v<1) v=1;
        item.qty=v;
        inp.value = v;
        updateTotals();
      });
      tdQty.appendChild(inp);
      tr.appendChild(tdQty);

      const tdAct = document.createElement("td");
      if(item.fixed){
        const span=document.createElement("span");
        span.textContent="база";
        span.style.fontSize="12px";
        span.style.color="#9fe8b7";
        tdAct.appendChild(span);
      }else{
        const btn=document.createElement("button");
        btn.textContent="✕";
        btn.className="row-del";
        btn.addEventListener("click",()=>{
          const k = keyOf(item);
          // якщо це модуль універсального слота — очищаємо слоти
          if(item.type === "Модуль" && DATA.modulesInner.some(m=>m.name===item.name)){
            clearSlotsByModuleName(item.name);
            cart.delete(k);
            syncCartFromSlots();
          }else{
            cart.delete(k);
            renderTable();
            updateTotals();
          }
        });
        tdAct.appendChild(btn);
      }
      tr.appendChild(tdAct);

      rowsEl.appendChild(tr);
    });

    updateTotals();
  }

  function updateTotals(){
    let norm=0, alarm=0;
    cart.forEach(it=>{
      norm += (it.normal||0)*it.qty;
      alarm+= (it.alarm ||0)*it.qty;
    });
    sumNormEl.textContent  = Math.round(norm);
    sumAlarmEl.textContent = Math.round(alarm);

    const hours   = Math.max(1, parseFloat(hoursEl.value||"1"));
    const reserve = parseFloat(reserveEl.value||"1.25");
    const cap     = (norm * hours / 1000) * reserve;
    capEl.textContent = cap.toFixed(2);
  }

  function addItem(type,obj,ctx){
    const item = {
      type,
      name:obj.name,
      normal:obj.normal||0,
      alarm:obj.alarm||0,
      qty:1,
      fixed:false,
      custom: !!obj.custom
    };

    const context = ctx || currentContext;

    if(context.type === "ext" && context.id !== "main"){
      const dev = extDevices.get(context.id);
      if(!dev) return;
      const rows = dev.rows;

      const isUnique = (item.name === "M-Z" || item.name === "M-OUT2R");
      const existingIndex = rows.findIndex(r=>r.type===item.type && r.name===item.name);
      const existing = existingIndex >= 0 ? rows[existingIndex] : null;

      if(isUnique){
        // Тогл: якщо модуль вже є — видаляємо, якщо немає — додаємо один
        if(existing){
          rows.splice(existingIndex,1);
        }else{
          rows.push(item);
        }
      }else{
        if(existing) existing.qty += 1;
        else rows.push(item);
      }
      recalcExtDevice(context.id);
    }else{
      const k = keyOf(item);
      if(cart.has(k)) cart.get(k).qty += 1;
      else cart.set(k,item);
      renderTable();
    }
  }

  
  function buildGenericList(list,label){
    genericBody.innerHTML="";
    const grid=document.createElement("div");
    grid.className="mod-grid";

    list.forEach(it=>{
      const card=document.createElement("div");
      card.className="card";

      const img=document.createElement("img");
      img.src = it.img || "assets/modules/placeholder.png";
      img.alt=it.name;

      const lbl=document.createElement("div");
      lbl.className="card-label";
      lbl.textContent=it.name;

      card.appendChild(img);
      card.appendChild(lbl);

      // Якщо елемент уже використано на цьому розширювачі — підсвічуємо
      

// Highlight only M-Z and M-OUT2R if already installed
if(currentContext && currentContext.type === "ext" && currentContext.id !== "main"){
  const dev = extDevices.get(currentContext.id);
  const highlight = (it.name === "M-Z" || it.name === "M-OUT2R");
  if(dev && highlight && dev.rows.some(r=>r.name === it.name)){
    card.classList.add("used-item");
    card.style.outline = "2px solid #3fa93f";
    card.style.boxShadow = "0 0 10px rgba(0,255,0,0.7)";
  }
}

card.addEventListener("click",()=>{
  addItem(label, it);
  modal.classList.remove("open");
});

      grid.appendChild(card);
    });

    genericBody.appendChild(grid);
  }
function clearTabs(){
    qsa(".tab-body").forEach(b=>b.classList.remove("active"));
    qsa(".tab").forEach(t=>t.classList.remove("active"));
  }

  function buildKeyboardTab(){
    tabKbBody.innerHTML="";
    const grid=document.createElement("div");
    grid.className="kb-grid";

    Object.entries(DATA.keyboardGroups).forEach(([group,info])=>{
      const card=document.createElement("div");
      card.className="card";
      const img=document.createElement("img");
      img.src=info.img;
      img.alt=group;
      const label=document.createElement("div");
      label.className="card-label";
      label.textContent=group;
      card.appendChild(img);
      card.appendChild(label);
      card.addEventListener("click",()=>showKeyboardModels(group,info));
      grid.appendChild(card);
    });

    const modelsBox=document.createElement("div");
    modelsBox.className="kb-models";
    modelsBox.id="kbModelsBox";
    const title=document.createElement("div");
    title.className="kb-models-title";
    title.textContent="Оберіть тип клавіатури, щоб побачити моделі.";
    modelsBox.appendChild(title);

    tabKbBody.appendChild(grid);
    tabKbBody.appendChild(modelsBox);
  }

  function showKeyboardModels(group,info){
    const box=qs("#kbModelsBox");
    if(!box) return;
    box.innerHTML="";
    const title=document.createElement("div");
    title.className="kb-models-title";
    title.textContent=group+" — моделі:";
    const list=document.createElement("div");
    list.className="model-list";
    info.models.forEach(m=>{
      const btn=document.createElement("button");
      btn.className="model-btn";
      btn.textContent=m.name;
      btn.addEventListener("click",()=>{
        addItem("Клавіатура",m);
        modal.classList.remove("open");
      });
      list.appendChild(btn);
    });
    box.appendChild(title);
    box.appendChild(list);
  }

  function buildModulesTab(){
  tabModsBody.innerHTML="";
  const section=document.createElement("div");
  section.className="mod-section";

  const h=document.createElement("h4");
  section.appendChild(h);

  const grid=document.createElement("div");
  grid.className="mod-grid";

  DATA.modulesInner.forEach(m=>{
    const card=document.createElement("div");
    card.className="card";

    const img=document.createElement("img");
    img.src = m.img || "assets/modules/placeholder.png";
    img.alt=m.name;

    const label=document.createElement("div");
    label.className="card-label";
    label.textContent=m.name;

    card.appendChild(img);
    card.appendChild(label);

    // v6: стани вибору та доступності
    const max = SLOT_LIMITS[m.name] || 1;
    let total = 0;
    let other = 0;
    universalSlots.forEach((s, idx)=>{
      if(s && s.name === m.name){
        total++;
        if(currentSlotIndex === null || idx !== currentSlotIndex){
          other++;
        }
      }
    });

    const isSelected = (currentSlotIndex !== null &&
                        universalSlots[currentSlotIndex] &&
                        universalSlots[currentSlotIndex].name === m.name);

    const freeSlots = universalSlots.filter(s=>!s).length;

    let isFull;
    if(currentSlotIndex === null){
      // додаємо в будь-який вільний слот
      isFull = (total >= max) || (freeSlots === 0);
    }else{
      // редагуємо конкретний слот – перевіряємо, чи не перевищимо ліміт в інших слотах
      isFull = (!isSelected && other >= max);
    }
    if (isSelected) {
    card.classList.add("selected");
    }

    if (isFull || hasModuleConflict(m.name)) {
    card.classList.add("disabled");

    if (hasModuleConflict(m.name)) {
    card.classList.add("conflict");
  }
}
  

// Захист від кліку   
card.addEventListener("click", () => {
  if (card.classList.contains("disabled")) return;
  if (currentSlotIndex == null) return;

  const selected = universalSlots[currentSlotIndex];

  if (selected && selected.name === m.name) {
    universalSlots[currentSlotIndex] = null;
    updateSlotUI();
    syncCartFromSlots();
    modal.classList.remove("open");
    return;
  }

  assignModuleToSlot(currentSlotIndex, m);
});


    grid.appendChild(card);
  });

  section.appendChild(grid);
  tabModsBody.appendChild(section);
}

  function buildExtModulesTab(){
    // корпусні розширювачі для правого "+"
    tabModsBody.innerHTML="";
    const container=document.createElement("div");
    container.className="ext-mods-container";

    Object.entries(DATA.modulesExt).forEach(([group,list])=>{
      const block=document.createElement("div");
      block.className="ext-mod-block";

      const h=document.createElement("h4");
      h.textContent=group;
      block.appendChild(h);

      const grid=document.createElement("div");
      grid.className="mod-grid";

      list.forEach(m=>{
        const card=document.createElement("div");
        card.className="card";

        const img=document.createElement("img");
        img.src = m.img || "assets/modules/placeholder.png";
        img.alt=m.name;

        const label=document.createElement("div");
        label.className="card-label";
        label.textContent=m.name;

        card.appendChild(img);
        card.appendChild(label);

        card.addEventListener("click",()=>{
          if(m.name === "M-ZP box" || m.name === "M-ZP mBox" || m.name === "M-ZP sBox"){
            createExtTab(m);
          }else{
            addItem("Модуль (корпус)", m, { type:"main", id:"main" });
          }
          modal.classList.remove("open");
        });

        grid.appendChild(card);
      });

      block.appendChild(grid);
      container.appendChild(block);
    });

    tabModsBody.appendChild(container);
  }
function openModalFor(section){
    modal.classList.add("open");

    // за замовчуванням показуємо обидві вкладки
    tabKbBtn.style.display   = "none";
    tabModsBtn.style.display = "none";

    clearTabs();
    genericBody.classList.remove("active");

    if(section==="modules"){
      // верхні два "+": тільки модулі універсального слота
      tabKbBtn.style.display = "none";
      buildModulesTab();
      tabModsBtn.classList.add("active");
      tabModsBody.classList.add("active");
      modalTitle.textContent="Модулі універсального слота";
    }else if(section==="keyboards"){
      // правий "+" біля Ethernet: клавіатури + корпусні розширювачі
      buildKeyboardTab();
      tabKbBtn.style.display   = "none";
      tabModsBtn.style.display = "none";
      tabKbBtn.classList.add("active");
      tabKbBody.classList.add("active");
      modalTitle.textContent="Клавіатури";
    
}else if(section === "ext-power"){
  tabKbBtn.style.display = "none";
  tabModsBtn.style.display = "none";
  genericBody.classList.add("active");
  modalTitle.textContent = "Модулі";

  const list = [
    { name: "M-Z box",   img: "assets/modules/M-Z box.png", normal: 60,  alarm: 60  },
    { name: "M-OUT2R box",   img: "assets/modules/M-OUT2R box.png", normal: 40, alarm: 40 },
    { name: "M-OUT8R",   img: "assets/modules/M-OUT8R.png", normal: 25,  alarm: 360 },
    { name: "P-IND32",   img: "assets/modules/P-IND32.png", normal: 5,   alarm: 5 }
  ];

  buildGenericList(list, "Модуль");
  }else if(section === "ext-modx"){
  tabKbBtn.style.display   = "none";
  tabModsBtn.style.display = "none";
  genericBody.classList.add("active");
  modalTitle.textContent = "Модуль розширювача";

  const list = [
    { name:"M-OUT2R", img:"assets/modules/M-OUT2R.png", normal:40, alarm:40 }
  ];

  buildGenericList(list, "Модуль");
  }else if(section==="ext-mz"){
      tabKbBtn.style.display   = "none";
      tabModsBtn.style.display = "none";
      genericBody.classList.add("active");
      modalTitle.textContent="Модуль M-Z";

      // Спеціальний випадок: внутрішній модуль M-Z на платі розширювача
      const mzModule = {
        name: "M-Z",
        img: "assets/modules/M-Z.png",
        normal: 60,
        alarm: 60
      };

      buildGenericList([mzModule],"Модуль зон");
    }else if(section==="sensors"){
      tabKbBtn.style.display   = "none";
      tabModsBtn.style.display = "none";
      genericBody.classList.add("active");
      modalTitle.textContent="Датчики";

      const list = [
        ...DATA.sensors,
        { name: "Своє значення", img: "assets/tiras_logo_w.png", normal: 0, alarm: 0, custom: true }
      ];

      buildGenericList(list,"Датчик");
    }else if(section==="sirens"){
      tabKbBtn.style.display   = "none";
      tabModsBtn.style.display = "none";
      genericBody.classList.add("active");
      modalTitle.textContent="Сирени";

      const list = [
        ...DATA.sirens,
        { name: "Своє значення", img: "assets/tiras_logo_w.png", normal: 0, alarm: 0, custom: true }
      ];

      buildGenericList(list,"Сирена");
    }
  }

  
  function setupDeviceTabs(){
    deviceTabsEl = qs("#deviceTabs");
    extPagesEl   = qs("#extPages");
    stageEl      = qs("main.stage");
    if(!deviceTabsEl) return;

    deviceTabsEl.addEventListener("click",(e)=>{
      const btn = e.target.closest(".dev-tab-btn");
      if(!btn) return;
      const id = btn.dataset.deviceTab;
      if(!id) return;
      switchDeviceTab(id);
    });
  }

  function switchDeviceTab(id){
    if(!deviceTabsEl) return;
    currentContext = (id === "main") ? { type:"main", id:"main" } : { type:"ext", id };
    qsa(".dev-tab-btn", deviceTabsEl).forEach(btn=>{
      btn.classList.toggle("active", btn.dataset.deviceTab === id);
    });
    if(stageEl){
      stageEl.style.display = (id === "main") ? "" : "none";
    }
    if(extPagesEl){
      if(id === "main"){
        extPagesEl.style.display = "none";
      }else{
        extPagesEl.style.display = "";
      }
      qsa(".ext-page", extPagesEl).forEach(page=>{
        page.classList.toggle("active", page.dataset.deviceId === id);
      });
    }
  }

    function recalcExtDevice(extId){
    const dev = extDevices.get(extId);
    if(!dev) return;
    const { rows, dom } = dev;
    const { rowsBody, sumNormEl, sumAlarmEl, hoursEl, reserveEl, capEl } = dom;
    let sumNorm = 0;
    let sumAlarm = 0;
    rowsBody.innerHTML = "";
    rows.forEach((r, idx)=>{
      const tr = document.createElement("tr");

      const tdType  = document.createElement("td");
      const tdName  = document.createElement("td");
      const tdNorm  = document.createElement("td");
      const tdAlarm = document.createElement("td");
      const tdQty   = document.createElement("td");
      const tdAct   = document.createElement("td");

      tdType.textContent  = r.type;

      const isUniqueMod = (r.name === "M-Z" || r.name === "M-OUT2R");

      if(r.custom){
        const nameInput = document.createElement("input");
        nameInput.type = "text";
        nameInput.className = "ext-edit";
        nameInput.value = r.name;
        nameInput.addEventListener("input", ()=>{
          r.name = nameInput.value;
        });
        tdName.appendChild(nameInput);

        const normInput = document.createElement("input");
        normInput.type = "number";
        normInput.className = "ext-edit";
        normInput.value = r.normal;
        normInput.addEventListener("input", ()=>{
          let v = parseFloat(normInput.value || "0");
          if(isNaN(v) || v < 0) v = 0;
          r.normal = v;
          normInput.value = v;
          recalcExtDevice(extId);
        });
        tdNorm.appendChild(normInput);

        const alarmInput = document.createElement("input");
        alarmInput.type = "number";
        alarmInput.className = "ext-edit";
        alarmInput.value = r.alarm;
        alarmInput.addEventListener("input", ()=>{
          let v = parseFloat(alarmInput.value || "0");
          if(isNaN(v) || v < 0) v = 0;
          r.alarm = v;
          alarmInput.value = v;
          recalcExtDevice(extId);
        });
        tdAlarm.appendChild(alarmInput);
      }else{
        tdName.textContent  = r.name;
        tdNorm.textContent  = r.normal;
        tdAlarm.textContent = r.alarm;
      }

      if(r.fixed || isUniqueMod){
        tdQty.textContent = r.qty;
      }else{
        const inp = document.createElement("input");
        inp.type = "number";
        inp.min  = "1";
        inp.step = "1";
        inp.value = r.qty;
        inp.addEventListener("input", ()=>{
        let v = parseInt(inp.value || "1", 10);
        if(isNaN(v) || v < 1) v = 1;
        r.qty = v;
        inp.value = v;

        updateExtTotals(extId);
      });
        tdQty.appendChild(inp);
      }

      if(r.fixed){
        tdAct.textContent = "";
      }else{
        const btn = document.createElement("button");
        btn.textContent = "✕";
        btn.className = "row-del";
        btn.addEventListener("click", ()=>{
          rows.splice(idx,1);
          recalcExtDevice(extId);
        });
        tdAct.appendChild(btn);
      }

      tr.appendChild(tdType);
      tr.appendChild(tdName);
      tr.appendChild(tdNorm);
      tr.appendChild(tdAlarm);
      tr.appendChild(tdQty);
      tr.appendChild(tdAct);

      rowsBody.appendChild(tr);

      sumNorm  += r.normal * r.qty;
      sumAlarm += r.alarm  * r.qty;
    });
    sumNormEl.textContent  = sumNorm || "—";
    sumAlarmEl.textContent = sumAlarm || "—";

    const hours   = parseFloat(hoursEl.value || "0");
    const reserve = parseFloat(reserveEl.value || "1.25");
    if(sumNorm > 0 && hours > 0){
      const cap = (sumNorm * hours / 1000) * reserve;
      capEl.textContent = cap.toFixed(2);
    }else{
      capEl.textContent = "—";
    }
  // ===== UPDATE EXT HOTSPOT STATES (ONLY M-Z & M-OUT2R) =====
const page = dom.page;

// M-Z on extender (sens2)
const mzBtn = page.querySelector(".hot-ext-sens2");
if (mzBtn) {
  const hasMz = rows.some(r => r.name === "M-Z");
  mzBtn.classList.toggle("occupied", hasMz);
}

// M-OUT2R on extender (modx)
const modxBtn = page.querySelector(".hot-ext-modx");
if (modxBtn) {
  const hasOut = rows.some(r => r.name === "M-OUT2R");
  modxBtn.classList.toggle("occupied", hasOut);
}
}
  function updateExtTotals(extId){
  const dev = extDevices.get(extId);
  if(!dev) return;

  const { rows, dom } = dev;
  const { sumNormEl, sumAlarmEl, hoursEl, reserveEl, capEl } = dom;

  let sumNorm = 0;
  let sumAlarm = 0;

  rows.forEach(r=>{
    sumNorm  += r.normal * r.qty;
    sumAlarm += r.alarm  * r.qty;
  });

  sumNormEl.textContent  = sumNorm || "—";
  sumAlarmEl.textContent = sumAlarm || "—";

  const hours   = parseFloat(hoursEl.value || "0");
  const reserve = parseFloat(reserveEl.value || "1.25");

  if(sumNorm > 0 && hours > 0){
    const cap = (sumNorm * hours / 1000) * reserve;
    capEl.textContent = cap.toFixed(2);
  }else{
    capEl.textContent = "—";
  }
}
  function removeExtDevice(extId){
    const dev = extDevices.get(extId);
    if(!dev) return;
    const { dom } = dev;
    const { page } = dom;
    if(page) page.remove();
    if(deviceTabsEl){
      const btn = deviceTabsEl.querySelector(`.dev-tab-btn[data-device-tab="${extId}"]`);
      if(btn) btn.remove();
    }
    extDevices.delete(extId);
    switchDeviceTab("main");
    if (deviceTypeSwitch && extDevices.size === 1) {
    deviceTypeSwitch.dataset.visible = "true";
    }
  }

  function createExtTab(mod){
    if(!deviceTabsEl || !extPagesEl) return;
    const safeId = "ext_"+mod.name.replace(/\s+/g,"_");
    if(extDevices.has(safeId)){
      switchDeviceTab(safeId);
      return;
    }

    const btn = document.createElement("button");
    btn.className = "dev-tab-btn";
    btn.dataset.deviceTab = safeId;
    btn.textContent = mod.name;
    deviceTabsEl.appendChild(btn);

    const page = document.createElement("div");
    page.className = "ext-page";
    page.dataset.deviceId = safeId;

    const hs = EXT_HOTSPOTS[mod.name] || EXT_HOTSPOTS["M-ZP box"];

    page.innerHTML = `
      <div class="ext-board-wrap">
        <img src="${mod.img || "assets/modules/M-ZP box.png"}" alt="${mod.name}" class="ext-board">
        <button class="hotspot ext hot-ext-sens" data-type="sensors" data-device="${safeId}" style="left:${hs.sens.left}%;top:${hs.sens.top}%;">+</button>
        <button class="hotspot ext hot-ext-modx" data-type="modules" data-device="${safeId}" style="left:${hs.modx.left}%;top:${hs.modx.top}%;">+</button>
        <button class="hotspot ext hot-ext-power" data-type="modules" data-device="${safeId}" style="left:${hs.power.left}%;top:${hs.power.top}%;">+</button>
        <button class="hotspot ext hot-ext-sir" data-type="sirens" data-device="${safeId}" style="left:${hs.sir.left}%;top:${hs.sir.top}%;">+</button>
      </div>

      <section class="table-wrap ext-table">
        <table>
          <thead>
            <tr>
              <th>Тип</th>
              <th>Назва</th>
              <th>Норма (мА)</th>
              <th>Тривога (мА)</th>
              <th>Кількість</th>
              <th></th>
            </tr>
          </thead>
          <tbody class="ext-rows"></tbody>
        </table>
      </section>

      <section class="capacity ext-capacity">
        <div class="row">
          <label>Σ Споживання в нормі:</label>
          <span><span class="ext-sumNorm">—</span> мА</span>
        </div>
        <div class="row">
          <label>Σ Споживання в тривозі:</label>
          <span><span class="ext-sumAlarm">—</span> мА</span>
        </div>
        <div class="row">
          <label>Час роботи (год):</label>
          <input type="number" class="ext-hours" min="1" step="1" value="30">
        </div>
        <div class="row">
          <label>Коефіцієнт запасу:</label>
          <select class="ext-reserve">
            <option value="1.25" selected>З запасом 25%</option>
            <option value="1">Без запасу</option>
          </select>
        </div>
        <div class="row">
          <label>Розрахункова ємність АКБ:</label>
          <span><span class="ext-capacity-val">—</span> А·год</span>
        </div>
      </section>
      
      <div class="ext-actions">
        <button class="btn ext-remove">Видалити розширювач</button>
      </div>
    `;
    // якщо є 5-й плюс (sens2) — додаємо його на плату
    if (hs.sens2) {
      const wrap = page.querySelector(".ext-board-wrap");
      if (wrap) {
        const btn = document.createElement("button");
        btn.className = "hotspot ext hot-ext-sens2";
        btn.dataset.type = "ext-mz";
        btn.dataset.device = safeId;
        btn.style.left = hs.sens2.left + "%";
        btn.style.top  = hs.sens2.top  + "%";
        btn.textContent = "+";
        wrap.appendChild(btn);
      }
    }


    extPagesEl.appendChild(page);

    const rowsBody   = page.querySelector(".ext-rows");
    const sumNormEl  = page.querySelector(".ext-sumNorm");
    const sumAlarmEl = page.querySelector(".ext-sumAlarm");
    const hoursEl    = page.querySelector(".ext-hours");
    const reserveEl  = page.querySelector(".ext-reserve");
    const capEl      = page.querySelector(".ext-capacity-val");
    const removeBtn  = page.querySelector(".ext-remove");

    const dev = {
      name: mod.name,
      rows: [],
      dom: { page, rowsBody, sumNormEl, sumAlarmEl, hoursEl, reserveEl, capEl, removeBtn }
    };
    extDevices.set(safeId, dev);

    // базовий рядок самого розширювача
    dev.rows.push({
      type:"Розширювач",
      name: mod.name,
      normal: mod.normal || 0,
      alarm:  mod.alarm  || 0,
      qty:1,
      fixed:true
    });
    recalcExtDevice(safeId);

    hoursEl.addEventListener("input", ()=>recalcExtDevice(safeId));
    reserveEl.addEventListener("change", ()=>recalcExtDevice(safeId));
    removeBtn.addEventListener("click", ()=>removeExtDevice(safeId));

    // підключаємо лісенери для нових "+"
    attachEvents();
    if (deviceTypeSwitch && extDevices.size === 0) {
  deviceTypeSwitch.dataset.visible = "false";
  }
  }

function attachEvents(){
  qsa(".hotspot").forEach(hot=>{
    if(hot.__extBound) return;
    hot.__extBound = true;

    hot.addEventListener("click", ()=>{
      const type   = hot.dataset.type;
      const device = hot.dataset.device || "main";

      // Intercept POWER button on extenders ONLY
      if (type === "modules" && hot.classList.contains("hot-ext-power") && device !== "main") {
        openModalFor("ext-power");
        return;
      }

      if(device === "main"){
        currentContext = { type:"main", id:"main" };
      }else{
        currentContext = { type:"ext", id:device };
      }

      if(type === "modules"){
        if(hot.classList.contains("hot-mod-1"))      currentSlotIndex = 0;
        else if(hot.classList.contains("hot-mod-2")) currentSlotIndex = 1;
        else                                         currentSlotIndex = null;
      }else{
        currentSlotIndex = null;
      }
      // --- modx на розширювачах: тільки M-OUT2R ---
      if (type === "modules" && hot.classList.contains("hot-ext-modx") && device !== "main") {
      openModalFor("ext-modx");
      return;
    }
      openModalFor(type);
    });
  });

    qsa(".tab").forEach(tab=>{
      tab.addEventListener("click",()=>{
        if(tab.style.display==="none") return;
        clearTabs();
        tab.classList.add("active");
        const target = tab.dataset.tab;
        const body = qs("#tab-"+target);
        if(body) body.classList.add("active");
      });
    });

    if(closeBtn){
      closeBtn.addEventListener("click",()=>{
        modal.classList.remove("open");
      });
    }

    modal.addEventListener("click",(e)=>{
      if(e.target===modal) modal.classList.remove("open");
    });

    hoursEl.addEventListener("input", updateTotals);
    reserveEl.addEventListener("change", updateTotals);

    if(clearBtn){
      clearBtn.addEventListener("click",()=>{
        initCart();
        renderTable();
      });
    }
  }

  function init(){
    initCart();
    // init slot buttons for universal modules on main board
    slotButtons = [
      document.querySelector(".hot-mod-1"),
      document.querySelector(".hot-mod-2")
    ];
    setupDeviceTabs();
    switchDeviceTab("main");
    renderTable();
    updateSlotUI();
    attachEvents();
  }
  document.addEventListener("DOMContentLoaded", init);

})();
