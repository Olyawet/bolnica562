(function () {
  "use strict";

  // ——— Случайность ———
  const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  const pick = (arr) => arr[rand(0, arr.length - 1)];
  const chance = (p) => Math.random() < p;

  const MALE_NAMES = [
    "Александр", "Дмитрий", "Максим", "Сергей", "Андрей", "Алексей", "Артём", "Илья",
    "Кирилл", "Михаил", "Никита", "Матвей", "Роман", "Егор", "Арсений", "Иван",
    "Денис", "Евгений", "Даниил", "Тимофей", "Владислав", "Игорь", "Владимир", "Павел",
    "Руслан", "Марк", "Лев", "Константин", "Николай", "Степан", "Ярослав", "Фёдор",
    "Георгий", "Олег", "Вадим", "Юрий", "Борис", "Григорий", "Станислав", "Антон"
  ];

  const FEMALE_NAMES = [
    "Анна", "Мария", "Елена", "Дарья", "Алина", "Ирина", "Екатерина", "Арина",
    "Полина", "Ольга", "Юлия", "Татьяна", "Наталья", "Виктория", "Елизавета", "Ксения",
    "Милана", "Вероника", "София", "Валерия", "Александра", "Ульяна", "Кристина", "Варвара",
    "Диана", "Евгения", "Маргарита", "Светлана", "Анастасия", "Яна", "Карина", "Алёна",
    "Людмила", "Надежда", "Злата", "Вера", "Регина", "Майя", "Агата", "Лариса"
  ];

  const MALE_SURNAMES = [
    "Иванов", "Смирнов", "Кузнецов", "Попов", "Васильев", "Петров", "Соколов", "Михайлов",
    "Новиков", "Фёдоров", "Морозов", "Волков", "Алексеев", "Лебедев", "Семёнов", "Егоров",
    "Павлов", "Козлов", "Степанов", "Николаев", "Орлов", "Андреев", "Макаров", "Никитин",
    "Захаров", "Зайцев", "Соловьёв", "Борисов", "Яковлев", "Григорьев", "Романов", "Воробьёв",
    "Сергеев", "Кузьмин", "Фролов", "Александров", "Дмитриев", "Королёв", "Гусев", "Киселёв"
  ];

  const FEMALE_SURNAMES = [
    "Иванова", "Смирнова", "Кузнецова", "Попова", "Васильева", "Петрова", "Соколова", "Михайлова",
    "Новикова", "Фёдорова", "Морозова", "Волкова", "Алексеева", "Лебедева", "Семёнова", "Егорова",
    "Павлова", "Козлова", "Степанова", "Николаева", "Орлова", "Андреева", "Макарова", "Никитина",
    "Захарова", "Зайцева", "Соловьёва", "Борисова", "Яковлева", "Григорьева", "Романова", "Воробьёва",
    "Сергеева", "Кузьмина", "Фролова", "Александрова", "Дмитриева", "Королёва", "Гусева", "Киселёва"
  ];

  const MALE_PATRONYMICS = [
    "Александрович", "Дмитриевич", "Сергеевич", "Андреевич", "Алексеевич", "Иванович",
    "Михайлович", "Николаевич", "Владимирович", "Петрович", "Викторович", "Олегович",
    "Романович", "Евгеньевич", "Павлович", "Юрьевич", "Борисович", "Геннадьевич",
    "Анатольевич", "Константинович", "Игоревич", "Вадимович", "Степанович", "Артёмович"
  ];

  const FEMALE_PATRONYMICS = [
    "Александровна", "Дмитриевна", "Сергеевна", "Андреевна", "Алексеевна", "Ивановна",
    "Михайловна", "Николаевна", "Владимировна", "Петровна", "Викторовна", "Олеговна",
    "Романовна", "Евгеньевна", "Павловна", "Юрьевна", "Борисовна", "Геннадьевна",
    "Анатольевна", "Константиновна", "Игоревна", "Вадимовна", "Степановна", "Артёмовна"
  ];

  const BLOOD_TYPES = ["I (0) Rh+", "I (0) Rh−", "II (A) Rh+", "II (A) Rh−", "III (B) Rh+", "III (B) Rh−", "IV (AB) Rh+", "IV (AB) Rh−"];

  const ALLERGIES = [
    "не выявлены", "пыльца берёзы", "пенициллин", "аспирин", "орехи", "морепродукты",
    "йодсодержащие контрасты", "латекс", "пыльца амброзии", "не переносит сульфаниламиды",
    "анафилаксия на укусы пчёл", "неизвестно", "сезонный поллиноз", "глютен (под вопросом)"
  ];

  const COMPLAINTS = [
    "боли за грудиной при нагрузке", "перебои в сердце", "одышка в покое", "головокружение",
    "слабость, утомляемость", "тахикардия по ощущениям", "отёки нижних конечностей",
    "обморок 2 дня назад", "жжение в груди", "кашель с кровью (отрицает)", "нет активных жалоб",
    "пульсация в висках", "ночная одышка", "давление скачет", "аритмия по домуонитору",
    "боль в левой руке", "холодный пот", "тошнота на фоне боли", "учащённое сердцебиение"
  ];

  const WARDS = ["Реанимация", "Кардиология", "Терапия", "Пост интенсивной", "Приёмное", "Дневной стационар", "Палата наблюдения"];

  const COMORBIDITIES = [
    "АГ II ст., СД 2 типа", "ИБС, постинфарктный кардиосклероз", "ХОБЛ средней тяжести",
    "ХБП 3а ст.", "фибрилляция предсердий", "ожирение I ст.", "без существенной патологии",
    "ХСН II–III ФК", "инсульт в анамнезе (2020)", "гипотиреоз", "цирроз печени компенсированный",
    "ТЭЛА в анамнезе", "варикозное расширение вен", "бронхиальная астма"
  ];

  const CHRONIC_MEDS = [
    "бисопролол 5 мг, амлодипин 10 мг", "метформин 1000 мг, инсулин базальный",
    "варфарин 5 мг (МНО неизвестно)", "аторвастатин 20 мг", "не принимает постоянно",
    "эналаприл 10 мг, аспирин 75 мг", "дигоксин 0.25 мг", "лечотропный препарат не указан",
    "сальбутамол по потребности", "препараты не выявлены"
  ];

  const HABITS = [
    "не курит", "курит 10–15 сиг/сут", "курит >20 сиг/сут", "алкоголь эпизодически",
    "алкоголь ежедневно", "не курит, алкоголь отрицает", "бывший курильщик"
  ];

  const CONSCIOUSNESS_BY_GCS = [
    { min: 15, max: 15, label: "Ясное сознание" },
    { min: 13, max: 14, label: "Оглушение лёгкое" },
    { min: 10, max: 12, label: "Сопор" },
    { min: 7, max: 9, label: "Кома поверхностная" },
    { min: 4, max: 6, label: "Кома глубокая" },
    { min: 3, max: 3, label: "Кома терминальная" }
  ];

  const TICK_SEC = 1.2;
  const BRAIN_HYPOXIA_MIN_SEC = 240;
  const BRAIN_HYPOXIA_MAX_SEC = 420;

  // Профили ЭКГ: хорошие и плохие
  const ECG_PROFILES = [
    { id: "normal", label: "Синусовый ритм", severity: "good", diagnosis: "Нормальная электрокардиограмма. Синусовый ритм, без острых отклонений.", hr: [60, 85] },
    { id: "normal_variant", label: "Синусовая аритмия", severity: "good", diagnosis: "Физиологическая синусовая аритмия. Патологических изменений ST-T не выявлено.", hr: [58, 95] },
    { id: "bradycardia", label: "Синусовая брадикардия", severity: "warn", diagnosis: "Предварительно: синусовая брадикардия. Рекомендовано уточнение причин (медикаменты, АВ-блокада I ст.).", hr: [42, 58] },
    { id: "tachycardia", label: "Синусовая тахикардия", severity: "warn", diagnosis: "Предварительно: синусовая тахикардия. Исключить гиповолемию, лихорадку, тревожное состояние.", hr: [105, 145] },
    { id: "afib", label: "Фибрилляция предсердий", severity: "danger", diagnosis: "Предварительно: фибрилляция предсердий с нерегулярным желудочковым ответом. Требуется срочная оценка CHA₂DS₂-VASc.", hr: [90, 160] },
    { id: "flutter", label: "Трепетание предсердий", severity: "danger", diagnosis: "Предварительно: трепетание предсердий (типичные «пилообразные» волны F). Консультация кардиолога.", hr: [80, 150] },
    { id: "pvc", label: "Желудочковая экстрасистолия", severity: "warn", diagnosis: "Предварительно: частые мономорфные желудочковые экстрасистолы. Оценить электролиты и структуру миокарда.", hr: [65, 110] },
    { id: "pac", label: "Наджелудочковая экстрасистолия", severity: "warn", diagnosis: "Предварительно: наджелудочковые экстрасистолы. Клиническая значимость зависит от симптомов.", hr: [70, 100] },
    { id: "stemi", label: "Подъём ST", severity: "danger", diagnosis: "Предварительно: острый подъём сегмента ST — подозрение на STEMI. Немедленная активация протокола инфаркта!", hr: [85, 120] },
    { id: "st_depression", label: "Депрессия ST", severity: "danger", diagnosis: "Предварительно: горизонтальная депрессия ST — ишемия миокарда не исключена. Срочные тропонины.", hr: [75, 115] },
    { id: "lbbb", label: "Блокада левой ножки", severity: "warn", diagnosis: "Предварительно: полная блокада левой ножки пучка Гиса. Сопоставить с анамнезом и симптомами.", hr: [55, 95] },
    { id: "rbbb", label: "Блокада правой ножки", severity: "warn", diagnosis: "Предварительно: блокада правой ножки пучка Гиса. Может быть вариантом нормы или ТЭЛА.", hr: [60, 100] },
    { id: "long_qt", label: "Удлинение QT", severity: "danger", diagnosis: "Предварительно: удлинённый интервал QT. Риск torsades de pointes — пересмотр препаратов.", hr: [50, 90] },
    { id: "short_qt", label: "Укорочение QT", severity: "warn", diagnosis: "Предварительно: укорочение QT. Исключить синдром укорочённого QT при семейном анамнезе.", hr: [65, 95] },
    { id: "avblock1", label: "АВ-блокада I ст.", severity: "warn", diagnosis: "Предварительно: АВ-блокада I степени (удлинение PR). Наблюдение, исключить дигоксин/β-блокаторы.", hr: [55, 80] },
    { id: "avblock2", label: "АВ-блокада II ст.", severity: "danger", diagnosis: "Предварительно: АВ-блокада II степени (тип Mobitz). Риск прогрессии — кардиостимулятор под вопросом.", hr: [40, 70] },
    { id: "avblock3", label: "Полная АВ-блокада", severity: "danger", diagnosis: "Предварительно: полная АВ-блокада с замещающим ритмом. Экстренная кардиологическая помощь!", hr: [35, 55] },
    { id: "wpw", label: "Синдром WPW", severity: "warn", diagnosis: "Предварительно: преэкзитация (WPW) — короткий PR, дельта-волна. Оценка риска фибрилляции.", hr: [70, 130] },
    { id: "hyperkalemia", label: "Гиперкалиемия (ЭКГ)", severity: "danger", diagnosis: "Предварительно: ЭКГ-признаки гиперкалиемии (высокие заострённые T). Срочный K⁺ в крови!", hr: [40, 65] },
    { id: "hypokalemia", label: "Гипокалиемия (ЭКГ)", severity: "warn", diagnosis: "Предварительно: удлинение QT, U-волны — возможна гипокалиемия. Коррекция электролитов.", hr: [70, 110] },
    { id: "pericarditis", label: "Перикардит", severity: "warn", diagnosis: "Предварительно: диффузный подъём ST, снижение PR — воспаление перикарда не исключено.", hr: [85, 110] },
    { id: "pe", label: "ТЭЛА (подозрение)", severity: "danger", diagnosis: "Предварительно: синусовая тахикардия + отклонение оси — подозрение на ТЭЛА. Срочная КТ-ангиография.", hr: [100, 140] },
    { id: "lvh", label: "Гипертрофия ЛЖ", severity: "warn", diagnosis: "Предварительно: признаки гипертрофии левого желудочка на фоне АГ. Контроль давления.", hr: [65, 95] },
    { id: "artifact", label: "Артефакт записи", severity: "warn", diagnosis: "Предварительно: значительный мышечный/двигательный артефакт. Повторить запись в покое.", hr: [60, 120] },
    { id: "asystole_risk", label: "Критический ритм", severity: "danger", diagnosis: "Предварительно: периоды асистолии / крайне брадикардия. Немедленная реанимационная готовность!", hr: [20, 40] }
  ];

  const SEVERITY_LABELS = {
    good: "Низкий риск",
    warn: "Требует внимания",
    danger: "Критический случай"
  };

  const WORSE_PROFILES = ["tachycardia", "st_depression", "pvc", "afib", "pe", "hypokalemia"];
  const CRITICAL_PROFILES = ["stemi", "asystole_risk", "avblock3", "hyperkalemia"];

  function calcMAP(sys, dia) {
    return dia + (sys - dia) / 3;
  }

  function getTrueGlucose(live) {
    return live.trueGlucose ?? live.glucose ?? 5;
  }

  function calcBrainDelivery(live) {
    if (live.deceased) return 0;
    const map = calcMAP(live.sys, live.dia);
    const cpp = map - 15;
    const spo2f = clamp((live.spo2 - 70) / 30, 0, 1);
    const cppf = clamp((cpp - 40) / 30, 0, 1);
    const hbf = clamp(live.hb / 140, 0.5, 1.15);
    const perf = live.hr >= 30 ? clamp(live.hr / 70, 0.25, 1.2) : 0.1;
    const g = getTrueGlucose(live);
    const glucf = g >= 2.8 && g <= 22 ? 1 : 0.65;
    return spo2f * 38 + cppf * 32 + perf * 15 + hbf * 10 * glucf;
  }

  function interpretGlucose(val) {
    if (val < 2.8) return "тяжёлая гипогликемия — риск комы и судорог";
    if (val < 3.9) return "гипогликемия — показано 40% глюкоза";
    if (val <= 7.8) return "нормогликемия натощак";
    if (val <= 10) return "умеренно повышена";
    if (val <= 15) return "гипергликемия — исключить кетоацидоз при СД";
    return "выраженная гипергликемия";
  }

  function tickTrueGlucose(live) {
    if (live.frozen || live.deceased || !currentPatient) return;
    let drift = (Math.random() - 0.5) * 0.05;
    if (/СД|диабет|инсулин/i.test(currentPatient.comorbidities + currentPatient.chronicMeds)) {
      drift += 0.02;
    }
    if (live.lactate > 2.5 || live.profile.severity === "danger") drift += 0.025;
    if (isCriticallyHypoxic(live)) drift -= 0.02;
    if (live.trend === "improving") drift -= 0.01;
    live.trueGlucose = clamp(getTrueGlucose(live) + drift, 1.6, 28);
  }

  function isCriticallyHypoxic(live) {
    const d = calcBrainDelivery(live);
    const map = calcMAP(live.sys, live.dia);
    return d < 38 || live.spo2 < 85 || map < 60 || live.hr < 30 ||
      ["asystole_risk", "avblock3"].includes(live.profile.id) && live.hr < 45;
  }

  function gcsToComponents(total) {
    total = clamp(Math.round(total), 3, 15);
    if (total >= 15) return { e: 4, v: 5, m: 6 };
    if (total >= 13) return { e: 4, v: 4, m: 6 };
    if (total >= 10) return { e: 3, v: 4, m: 5 };
    if (total >= 7) return { e: 2, v: 3, m: 4 };
    if (total >= 5) return { e: 1, v: 2, m: 3 };
    return { e: 1, v: 1, m: 1 };
  }

  function getConsciousnessLabel(gcs) {
    if (gcs <= 0) return "Смерть мозга";
    const row = CONSCIOUSNESS_BY_GCS.find((r) => gcs >= r.min && gcs <= r.max);
    return row ? row.label : "Не оценено";
  }

  function formatHypoxiaTime(sec) {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${String(s).padStart(2, "0")}`;
  }

  function setGcsFromTotal(live, total) {
    const c = gcsToComponents(total);
    live.gcsE = c.e;
    live.gcsV = c.v;
    live.gcsM = c.m;
    live.gcs = c.e + c.v + c.m;
  }

  function updateConsciousnessFromPhysiology(live) {
    if (live.deceased) {
      live.gcs = 0;
      live.gcsE = 1; live.gcsV = 1; live.gcsM = 1;
      return;
    }
    const ratio = live.brainHypoxiaSec / live.brainHypoxiaDeathSec;
    const delivery = calcBrainDelivery(live);
    let target = live.baseGcs;

    const g = getTrueGlucose(live);
    if (g < 2.8) target = Math.min(target, 8);
    else if (g > 22) target = Math.min(target, 10);
    if (delivery < 45) target = Math.min(target, 12);
    if (ratio > 0.15) target = Math.min(target, 13);
    if (ratio > 0.3) target = Math.min(target, 11);
    if (ratio > 0.5) target = Math.min(target, 9);
    if (ratio > 0.7) target = Math.min(target, 6);
    if (ratio > 0.85) target = 3;

    setGcsFromTotal(live, target);
    live.rso2 = clamp(Math.round(delivery * 0.85 + rand(-3, 3)), 25, 85);
  }

  function declareBrainDeath() {
    if (!liveState || liveState.deceased) return;
    liveState.deceased = true;
    liveState.hr = 0;
    liveState.rr = 0;
    liveState.spo2 = Math.max(0, liveState.spo2 - rand(15, 30));
    liveState.profile = findProfile("asystole_risk");
    liveState.gcs = 0;
    setGcsFromTotal(liveState, 3);
    liveState.rso2 = rand(5, 15);

    document.querySelector(".monitor").classList.add("monitor--patient-deceased");
    document.querySelector(".patient-card").classList.add("patient-card--deceased");

    let banner = document.getElementById("deathBanner");
    if (!banner) {
      banner = document.createElement("div");
      banner.id = "deathBanner";
      banner.className = "death-banner";
      banner.innerHTML = "<span>Асистолия · Смерть мозга</span>";
      $("ecgDisplayMain").appendChild(banner);
    }

    liveState.frozen = true;
    liveState.deathDiagnosis = "Клиническая и электрическая смерть. Необратимая гипоксия ЦНС >4–7 мин.";
    logEvent("bad", `СМЕРТЬ МОЗГА: ишемия коры ${formatHypoxiaTime(liveState.brainHypoxiaSec)} (порог ${formatHypoxiaTime(liveState.brainHypoxiaDeathSec)}). Реанимация неэффективна.`);
    $("diagnosis").textContent = liveState.deathDiagnosis;
    $("brainStatus").textContent = "Биологическая смерть. ЭЭГ — изоэлектрия. Зрачки среднего широкого диаметра.";
    setFrozenUI(true);
  }

  function setFrozenUI(frozen) {
    document.querySelector(".monitor")?.classList.toggle("monitor--frozen", frozen);
    $("btnWaitDay").disabled = frozen;
  }

  function disableDoctorButtons() {
    /* Препараты без блокировки — вводить можно всегда */
  }

  function tickBrainHypoxia() {
    if (!liveState || liveState.deceased) return;

    const hypoxic = isCriticallyHypoxic(liveState);
    const delivery = calcBrainDelivery(liveState);

    if (hypoxic) {
      liveState.brainHypoxiaSec += TICK_SEC;
      if (liveState.brainHypoxiaSec >= liveState.brainHypoxiaWarnSec && !liveState.hypoxiaWarnLogged) {
        liveState.hypoxiaWarnLogged = true;
        logEvent("warn", `Ишемия мозга ${formatHypoxiaTime(liveState.brainHypoxiaSec)} — риск необратимых изменений!`);
      }
    } else if (delivery > 52) {
      liveState.brainHypoxiaSec = Math.max(0, liveState.brainHypoxiaSec - TICK_SEC * 1.5);
      if (liveState.brainHypoxiaSec < liveState.brainHypoxiaWarnSec * 0.5) {
        liveState.hypoxiaWarnLogged = false;
      }
    }

    if (liveState.brainHypoxiaSec >= liveState.brainHypoxiaDeathSec) {
      declareBrainDeath();
      return;
    }

    updateConsciousnessFromPhysiology(liveState);
    tickTrueGlucose(liveState);

    if (liveState.lactate > 1 && hypoxic) {
      liveState.lactate = Math.min(15, liveState.lactate + 0.08);
    } else if (delivery > 55) {
      liveState.lactate = Math.max(0.8, liveState.lactate - 0.03);
    }
  }

  const DOCTOR_ACTIONS = [
  { id: "observe", label: "Наблюдение", icon: "👁",
    apply(live) {
      if (live.deceased) return { type: "neutral", msg: "Пульса нет. Наблюдение не изменяет исход." };
      if (!isCriticallyHypoxic(live)) return { type: "neutral", msg: "Гемодинамика и перфузия мозга достаточны. Без изменений." };
      return { type: "warn", msg: "Ишемия мозга прогрессирует без лечения!", drift: { spo2: -1 } };
    }
  },
  { id: "o2", label: "O₂ 15 л маска", icon: "🫁",
    apply(live) {
      if (live.deceased) return { type: "neutral", msg: "Пациент без признаков жизни. O₂ не показан." };
      if (live.spo2 >= 96) return { type: "neutral", msg: "SpO₂ в норме (≥96%). Дополнительный O₂ не требуется." };
      const pe = live.profile.id === "pe";
      if (live.spo2 < 88) {
        const gain = pe ? rand(2, 5) : rand(5, 10);
        if (gain < 4) return { type: "warn", msg: "Рефрактерная гипоксия (подозрение на шунт/ТЭЛА). Эффект минимален.", effect: { spo2: gain, duration: 10000 } };
        return { type: "good", msg: `SpO₂ +${gain}%. ПаO₂ растёт, перфузия мозга улучшается.`, effect: { spo2: gain, rr: -2, duration: 12000 }, reduceHypoxia: 15 };
      }
      return { type: "good", msg: "Умеренное повышение SpO₂.", effect: { spo2: rand(2, 4), duration: 8000 }, reduceHypoxia: 8 };
    }
  },
  { id: "intubation", label: "Интубация + ИВЛ", icon: "🔧",
    apply(live) {
      if (live.deceased) return { type: "neutral", msg: "Не показано при установленной смерти." };
      if (live.spo2 >= 94 && live.rr >= 10 && live.rr <= 22) {
        return { type: "neutral", msg: "Дыхание адекватное. Интубация не требуется." };
      }
      if (live.rr < 6 || live.spo2 < 80 || live.gcs <= 8) {
        return { type: "good", msg: "Проходимость трахеи. FiO₂ 100%. SpO₂ и вентиляция восстановлены.", effect: { spo2: rand(8, 14), rr: 14, duration: 15000 }, reduceHypoxia: 45, setRr: 14 };
      }
      return { type: "warn", msg: "Интубация выполнена, но гипоксия частично сохраняется.", effect: { spo2: rand(3, 6), duration: 10000 }, reduceHypoxia: 20 };
    }
  },
  { id: "cpr", label: "СЛР / компрессии", icon: "🫀",
    apply(live) {
      if (live.deceased && live.brainHypoxiaSec > live.brainHypoxiaDeathSec * 0.95) {
        return { type: "bad", msg: "СЛР >10 мин после гипоксии мозга. ROSC маловероятен — смерть необратима." };
      }
      const arrest = live.hr < 35 || live.deceased;
      if (!arrest) return { type: "neutral", msg: "Сердечная деятельность есть. СЛР не показана." };
      if (chance(0.55)) {
        live.deceased = false;
        document.querySelector(".monitor")?.classList.remove("monitor--patient-deceased");
        document.querySelector(".patient-card")?.classList.remove("patient-card--deceased");
        document.getElementById("deathBanner")?.remove();
        disableDoctorButtons(false);
        return { type: "good", msg: "ROSC! Пульс восстановлен. Начать постреанимационный уход.", setHr: rand(55, 75), effect: { sys: +25, spo2: +8, duration: 8000 }, profileShift: "bradycardia", reduceHypoxia: 25 };
      }
      return { type: "warn", msg: "Компрессии продолжаются. Перфузия мозга недостаточна.", effect: { sys: +5, duration: 3000 } };
    }
  },
  { id: "glucose_iv", label: "Глюкоза 40% 40 мл", icon: "🍬",
    apply(live) {
      const g = getTrueGlucose(live);
      if (g >= 3.9 && g < 10) return { type: "neutral", msg: `Глюкоза ~${g.toFixed(1)} — норма. Инфузия глюкозы не показана.` };
      if (g >= 10) return { type: "warn", msg: "Гипергликемия — 40% глюкоза ухудшит состояние!", trueGlucose: g + rand(15, 25) / 10 };
      const rise = rand(15, 25) / 10;
      live.trueGlucose = Math.min(12, g + rise);
      if (live.trueGlucose >= 3.9 && live.baseGcs >= 10) {
        setGcsFromTotal(live, Math.min(live.baseGcs, live.gcs + rand(2, 4)));
        return { type: "good", msg: `Гипогликемия корригирована. Ожидаемо ~${live.trueGlucose.toFixed(1)} ммоль/л.`, reduceHypoxia: 5, refreshGlucose: true };
      }
      return { type: "good", msg: `Введена глюкоза. Целевой уровень ~${live.trueGlucose.toFixed(1)}.`, refreshGlucose: true };
    }
  },
  { id: "insulin", label: "Инсулин 10 ЕД", icon: "💉",
    apply(live) {
      const g = getTrueGlucose(live);
      if (g < 8) return { type: "bad", msg: "Опасность гипогликемии! Инсулин противопоказан.", trueGlucose: Math.max(1.8, g - rand(10, 18) / 10) };
      if (g > 11) {
        live.trueGlucose = Math.max(5, g - rand(25, 45) / 10);
        return { type: "good", msg: `Сахар снижается (цель ~${live.trueGlucose.toFixed(1)}).`, refreshGlucose: true };
      }
      return { type: "neutral", msg: "Гликемия не требует инсулина." };
    }
  },
  { id: "aspirin", label: "Аспирин 250 мг", icon: "💊",
    apply(live) {
      if (["stemi", "st_depression"].includes(live.profile.id)) {
        return { type: "info", msg: "Антиагрегант по протоколу ACS. Острый эффект на мониторе минимален." };
      }
      return { type: "neutral", msg: "Ишемия не подтверждена — острого эффекта нет." };
    }
  },
  { id: "heparin", label: "Гепарин 5000 ЕД", icon: "💉",
    apply(live) {
      if (["stemi", "pe", "afib"].includes(live.profile.id)) {
        return { type: "info", msg: "Антикоагулянт введён. Монитор — без мгновенных изменений." };
      }
      return { type: "neutral", msg: "Показаний к гепарину нет." };
    }
  },
  { id: "furosemide", label: "Фуросемид 40 мг", icon: "💊",
    apply(live) {
      if (live.rr > 22 || live.spo2 < 92) {
        return { type: "good", msg: "Диурез. Отёк лёгких уменьшается.", effect: { spo2: rand(2, 5), rr: -3, sys: -5, duration: 12000 } };
      }
      if (calcMAP(live.sys, live.dia) < 90) {
        return { type: "bad", msg: "Гиповолемия на фоне диуретика!", effect: { sys: -15, dia: -8, duration: 8000 } };
      }
      return { type: "neutral", msg: "Отёчного синдрома нет." };
    }
  },
  { id: "morphine", label: "Морфин 2–4 мг", icon: "💊",
    apply(live) {
      if (["stemi", "st_depression", "pe"].includes(live.profile.id)) {
        if (live.rr < 10 || live.gcs <= 10) return { type: "bad", msg: "Угнетение дыхания!", effect: { rr: -5, spo2: -8, gcsDrop: 2, duration: 10000 } };
        return { type: "good", msg: "Боль снижена. Вазодилатация.", effect: { hr: -8, sys: -6, rr: -2, duration: 10000 } };
      }
      return { type: "neutral", msg: "Сильной боли не выявлено." };
    }
  },
  { id: "naloxone", label: "Налоксон 0.4 мг", icon: "💉",
    apply(live) {
      if (live.gcs <= 8 && live.rr < 10) {
        setGcsFromTotal(live, Math.min(14, live.gcs + rand(4, 7)));
        return { type: "good", msg: "Пробуждение! Подозрение на опиоидное угнетение.", effect: { rr: +6, spo2: +5, duration: 8000 }, setRr: 14 };
      }
      return { type: "neutral", msg: "Опиоидной интоксикации не выявлено." };
    }
  },
  { id: "potassium", label: "KCl 40 ммоль", icon: "⚗",
    apply(live) {
      if (live.potassium < 3.5 || live.profile.id === "hypokalemia") {
        live.potassium = Math.min(5.2, live.potassium + rand(4, 8) / 10);
        return { type: "good", msg: `K⁺ скорректирован (~${live.potassium.toFixed(1)}).`, profileShift: "normal_variant" };
      }
      if (live.potassium > 5.0 || live.profile.id === "hyperkalemia") {
        return { type: "bad", msg: "Гиперкалиемия! KCl противопоказан.", profileShift: "hyperkalemia" };
      }
      return { type: "neutral", msg: "K⁺ в допустимых пределах." };
    }
  },
  { id: "verapamil", label: "Верапамил 5 мг", icon: "💉",
    apply(live) {
      if (["afib", "flutter"].includes(live.profile.id) && live.hr > 100) {
        return { type: "good", msg: "ЧСС снижена. Конверсия возможна.", effect: { hr: -rand(20, 35), duration: 12000 }, profileShift: "normal" };
      }
      if (live.hr < 60 || ["avblock2", "avblock3"].includes(live.profile.id)) {
        return { type: "bad", msg: "Брадикардия/блокада — верапамил опасен!", profileShift: "avblock3", effect: { hr: -15, duration: 8000 } };
      }
      return { type: "neutral", msg: "Не показан при данном ритме." };
    }
  },
  { id: "dopamine", label: "Допамин 5 мкг/кг", icon: "💉",
    apply(live) {
      const map = calcMAP(live.sys, live.dia);
      if (map < 65 && live.hr < 100) {
        return { type: "good", msg: "Инотропная поддержка. MAP ↑.", effect: { sys: rand(15, 22), hr: rand(5, 12), duration: 12000 }, reduceHypoxia: 10 };
      }
      if (live.hr > 110) return { type: "warn", msg: "Тахикардия усилилась.", effect: { hr: +15, duration: 8000 } };
      return { type: "neutral", msg: "Гемодинамика стабильна." };
    }
  },
  { id: "nitro", label: "Нитроглицерин", icon: "💊",
    apply(live) {
      if (live.deceased) return { type: "neutral", msg: "—" };
      const ischemic = ["stemi", "st_depression"].includes(live.profile.id);
      const map = calcMAP(live.sys, live.dia);
      if (!ischemic) return { type: "neutral", msg: "Ишемия миокарда не подтверждена. Нитраты не показаны." };
      if (map < 70) return { type: "bad", msg: "MAP <70 — нитраты противопоказаны! Коллапс.", effect: { sys: -20, dia: -12, spo2: -4, duration: 8000 } };
      return { type: "good", msg: "Пре-/постнагрузка снижена. Ишемия уменьшается.", effect: { sys: -10, dia: -5, hr: -6, duration: 12000 }, profileShift: "st_depression" };
    }
  },
  { id: "atropine", label: "Атропин 0.5 мг", icon: "💉",
    apply(live) {
      if (live.deceased) return { type: "neutral", msg: "—" };
      const brady = live.hr < 55 || ["bradycardia", "avblock1", "avblock2", "avblock3"].includes(live.profile.id);
      if (!brady) return { type: "neutral", msg: `ЧСС ${Math.round(live.hr)} — брадикардии нет. Эффекта нет.` };
      return { type: "good", msg: "Ускорение АВ-проведения. ЧСС +15–25.", effect: { hr: rand(15, 22), duration: 10000 }, profileShift: live.profile.id === "avblock3" ? "avblock2" : "bradycardia" };
    }
  },
  { id: "adrenaline", label: "Адреналин 1 мг", icon: "⚡",
    apply(live) {
      const arrest = live.hr < 40 || live.deceased;
      if (!arrest) return { type: "neutral", msg: "Жизненно важные функции сохранены. Адреналин не показан." };
      if (live.brainHypoxiaSec > live.brainHypoxiaDeathSec * 0.9) {
        return { type: "bad", msg: "Позднее введение. ROSC без неврологического прогноза." };
      }
      if (chance(0.5)) {
        if (live.deceased) { live.deceased = false; document.getElementById("deathBanner")?.remove(); disableDoctorButtons(false); }
        return { type: "good", msg: "ROSC после адреналина!", setHr: rand(60, 85), effect: { sys: +22, spo2: +4, duration: 6000 }, profileShift: "tachycardia", reduceHypoxia: 20 };
      }
      return { type: "warn", msg: "Пульс не восстановлен. Продолжить СЛР.", effect: { hr: +5, duration: 3000 } };
    }
  },
  { id: "norepinephrine", label: "Норэпинефрин", icon: "💉",
    apply(live) {
      if (live.deceased) return { type: "neutral", msg: "—" };
      const map = calcMAP(live.sys, live.dia);
      if (map >= 65) return { type: "neutral", msg: `MAP ${Math.round(map)} достаточен. Вазопрессор не нужен.` };
      return { type: "good", msg: "MAP восстановлен >65. Перфузия мозга улучшается.", effect: { sys: rand(18, 28), dia: rand(10, 16), duration: 12000 }, reduceHypoxia: 18 };
    }
  },
  { id: "amiodarone", label: "Амиодарон 300 мг", icon: "💉",
    apply(live) {
      if (live.deceased) return { type: "neutral", msg: "—" };
      if (!["afib", "flutter", "pvc"].includes(live.profile.id)) {
        return { type: "neutral", msg: "Желудочковая/предсердная аритмия не диагностирована." };
      }
      return { type: "good", msg: "Антиаритмический эффект. Ритм стабилизируется.", effect: { hr: -rand(15, 30), duration: 15000 }, profileShift: "normal" };
    }
  },
  { id: "metoprolol", label: "Метопролол 5 мг", icon: "💉",
    apply(live) {
      if (live.deceased) return { type: "neutral", msg: "—" };
      if (live.hr < 60 || ["avblock2", "avblock3", "bradycardia"].includes(live.profile.id)) {
        return { type: "bad", msg: "β-блокатор при брадикардии/блокаде — асистолия!", effect: { hr: -rand(12, 20), spo2: -5, duration: 10000 }, profileShift: "avblock3" };
      }
      if (live.hr > 100) {
        return { type: "good", msg: "ЧСС снижена. Миокард экономит O₂.", effect: { hr: -rand(15, 22), sys: -6, duration: 12000 } };
      }
      return { type: "neutral", msg: "ЧСС в целевом диапазоне. Эффект не выражен." };
    }
  },
  { id: "fluids", label: "NaCl 500 мл", icon: "🩸",
    apply(live) {
      if (live.deceased) return { type: "neutral", msg: "—" };
      const map = calcMAP(live.sys, live.dia);
      if (map < 65) {
        return { type: "good", msg: "Объёмная нагрузка. MAP повышается.", effect: { sys: rand(12, 20), dia: rand(6, 12), duration: 12000 }, reduceHypoxia: 12 };
      }
      if (map > 100) return { type: "warn", msg: "Гиперволемия. Отёк лёгких, SpO₂ ↓.", effect: { spo2: -4, rr: +3, duration: 8000 } };
      return { type: "neutral", msg: "Гемодинамика стабильна. Инфузия не изменила показатели." };
    }
  },
  { id: "defib", label: "Дефибрилляция", icon: "🔌",
    apply(live) {
      const shockable = ["afib", "pvc", "asystole_risk", "flutter"].includes(live.profile.id) || live.hr > 150;
      if (!shockable && live.hr > 40) return { type: "neutral", msg: "Нет фибрилляции/ЖТ. Разряд не показан." };
      if (chance(0.55)) {
        if (live.deceased) { live.deceased = false; document.getElementById("deathBanner")?.remove(); disableDoctorButtons(false); }
        return { type: "good", msg: "Синусовый ритм после разряда!", setHr: rand(65, 80), profileShift: "normal", effect: { spo2: +3, duration: 5000 }, reduceHypoxia: 15 };
      }
      return { type: "bad", msg: "Ритм не конвертирован. Повторить или эпинефрин.", profileShift: "asystole_risk", setHr: 0 };
    }
  },
  { id: "sedation", label: "Мидазолам", icon: "😴",
    apply(live) {
      if (live.gcs <= 8) return { type: "bad", msg: "Угнетение дыхания на фоне комы!", effect: { spo2: -10, rr: -6, gcsDrop: 2, duration: 8000 } };
      return { type: "good", msg: "Седация. Тревога снижена.", effect: { hr: -10, sys: -8, duration: 10000 } };
    }
  },
  { id: "magnesium", label: "MgSO₄ 2 г IV", icon: "💉",
    apply(live) {
      if (["long_qt", "hypokalemia", "afib", "torsades"].includes(live.profile.id)) {
        return { type: "good", msg: "Эктопия снижается.", effect: { hr: -8, duration: 10000 }, profileShift: "normal_variant" };
      }
      return { type: "neutral", msg: "Магний — без выраженного эффекта." };
    }
  }
  ];

  const MEDICAL_HANDBOOK = `
    <h3>Реанимация и дыхание</h3>
    <ul>
      <li><b>O₂ 15 л</b> — гипоксия SpO₂ &lt;94%, одышка.</li>
      <li><b>Интубация</b> — SpO₂ &lt;80%, ЧДД &lt;6, GCS ≤8, апноэ.</li>
      <li><b>СЛР</b> — нет пульса, ЧСС &lt;35, асистолия.</li>
      <li><b>Дефибрилляция</b> — ФП/ЖТ/асистолия (шокируемые ритмы).</li>
    </ul>
    <h3>Гемодинамика</h3>
    <ul>
      <li><b>Норэпинефрин</b> — MAP &lt;65, шок.</li>
      <li><b>NaCl 500 мл</b> — гиповолемия, низкое MAP.</li>
      <li><b>Допамин</b> — гипотензия + брадикардия.</li>
      <li><b>Атропин</b> — брадикардия, АВ-блокада.</li>
    </ul>
    <h3>Ишемия / инфаркт</h3>
    <ul>
      <li><b>Нитроглицерин</b> — STEMI/NSTEMI, MAP ≥70.</li>
      <li><b>Аспирин, гепарин</b> — острый коронарный синдром.</li>
      <li><b>Морфин</b> — сильная боль (осторожно с дыханием).</li>
      <li><b>Метопролол</b> — тахикардия без блокад.</li>
    </ul>
    <h3>Аритмии</h3>
    <ul>
      <li><b>Амиодарон</b> — ФП, трепетание, ЖЭ.</li>
      <li><b>Верапамил</b> — наджелудочковая тахикардия (не при блокадах!).</li>
      <li><b>Адреналин</b> — остановка кровообращения.</li>
    </ul>
    <h3>Глюкоза (только по кнопке «Измерить»)</h3>
    <ul>
      <li>Норма натощак ~3,9–5,6; &lt;3,9 — гипогликемия.</li>
      <li><b>40% глюкоза</b> — гипогликемия.</li>
      <li><b>Инсулин</b> — гипергликемия &gt;10–11 (не при низком сахаре!).</li>
    </ul>
    <h3>Электролиты</h3>
    <ul>
      <li><b>KCl</b> — гипокалиемия; нельзя при гиперкалиемии.</li>
      <li><b>MgSO₄</b> — torsades, гипокалиемия, ФП.</li>
    </ul>
    <h3>Важно</h3>
    <p>Неподходящий препарат не блокируется — возможны отсутствие эффекта или ухудшение. При критическом состоянии без лечения ишемия мозга 4–7 мин ведёт к смерти.</p>
  `;

  let patientIndex = 0;
  let currentPatient = null;
  let liveState = null;
  let ecgState = null;
  let animationId = null;
  let vitalsTimer = null;
  let prevVitals = null;
  const actionCooldown = {};
  const patientRecords = new Map();

  const $ = (id) => document.getElementById(id);
  const canvas = $("ecgCanvas");
  const canvas2 = $("ecgCanvas2");
  const ctx = canvas.getContext("2d");
  const ctx2 = canvas2.getContext("2d");

  function formatDate(d) {
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();
    return `${dd}.${mm}.${yyyy}`;
  }

  function calcAge(birth) {
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return Math.max(0, age);
  }

  function randomBirthDate() {
    const year = rand(1942, 2018);
    const month = rand(0, 11);
    const day = rand(1, 28);
    return new Date(year, month, day);
  }

  function randomCardId() {
    const part = () => rand(1000, 9999);
    return `КР-${part()}-${part()}-${rand(10, 99)}`;
  }

  function declensionYears(n) {
    const mod10 = n % 10;
    const mod100 = n % 100;
    if (mod100 >= 11 && mod100 <= 14) return `${n} лет`;
    if (mod10 === 1) return `${n} год`;
    if (mod10 >= 2 && mod10 <= 4) return `${n} года`;
    return `${n} лет`;
  }

  function generatePatient() {
    const isMale = chance(0.5);
    const firstName = pick(isMale ? MALE_NAMES : FEMALE_NAMES);
    const lastName = pick(isMale ? MALE_SURNAMES : FEMALE_SURNAMES);
    const patronymic = pick(isMale ? MALE_PATRONYMICS : FEMALE_PATRONYMICS);
    const birth = randomBirthDate();
    const age = calcAge(birth);
    const profile = pick(ECG_PROFILES);
    const hr = rand(profile.hr[0], profile.hr[1]);

    const rr = rand(12, 28);
    let spo2 = rand(92, 99);
    let sys = rand(100, 145);
    let dia = rand(60, 90);
    let temp = (36 + Math.random() * 1.8).toFixed(1);

    if (profile.severity === "danger") {
      spo2 = rand(82, 94);
      sys = rand(85, 130);
      if (chance(0.4)) dia = rand(45, 65);
    }
    if (profile.id === "tachycardia" || profile.id === "afib" || profile.id === "pe") {
      sys = rand(95, 160);
    }
    if (profile.id === "asystole_risk" || profile.id === "avblock3") {
      spo2 = rand(75, 88);
      sys = rand(70, 95);
    }

    const allergy = pick(ALLERGIES);
    const height = rand(155, 192);
    const weight = rand(52, 115);
    const bmi = (weight / ((height / 100) ** 2)).toFixed(1);
    const hb = rand(95, 168);
    let glucose = (rand(42, 72) / 10);
    let lactate = (rand(8, 18) / 10);
    const potassium = (rand(35, 52) / 10).toFixed(1);
    const sodium = rand(136, 146);
    const creatinine = rand(55, 130);
    let baseGcs = 15;

    if (profile.severity === "warn") baseGcs = rand(12, 14);
    if (profile.severity === "danger") {
      baseGcs = rand(8, 13);
      glucose = chance(0.3) ? rand(22, 35) / 10 : glucose;
      lactate = rand(22, 45) / 10;
    }
    if (profile.id === "asystole_risk" || profile.id === "avblock3") baseGcs = rand(6, 10);

    return {
      firstName,
      lastName,
      patronymic,
      fullName: `${lastName} ${firstName} ${patronymic}`,
      shortName: `${lastName} ${firstName.charAt(0)}.${patronymic.charAt(0)}.`,
      isMale,
      birth,
      age,
      cardId: randomCardId(),
      ward: `${pick(WARDS)}, койка ${rand(1, 24)}`,
      bloodType: pick(BLOOD_TYPES),
      allergies: allergy,
      allergyPenicillinLike: /пенициллин|сульфаниламид/i.test(allergy),
      complaints: pick(COMPLAINTS),
      height,
      weight,
      bmi,
      comorbidities: pick(COMORBIDITIES),
      chronicMeds: pick(CHRONIC_MEDS),
      habits: pick(HABITS),
      hb,
      glucose,
      lactate,
      potassium: parseFloat(potassium),
      sodium,
      creatinine,
      baseGcs,
      profile,
      hr,
      rr,
      spo2,
      sys,
      dia,
      bp: `${sys}/${dia}`,
      temp: parseFloat(temp)
    };
  }

  function findProfile(id) {
    return ECG_PROFILES.find((p) => p.id === id) || ECG_PROFILES[0];
  }

  function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
  }

  function initLiveState(p, existing) {
    if (existing) {
      liveState = existing;
      liveState.profile = findProfile(existing.profileId || p.profile.id);
      liveState.baseProfile = findProfile(existing.baseProfileId || p.profile.id);
      if (window.Clinical) Clinical.initClinicalState(liveState, p);
      return;
    }
    const c = gcsToComponents(p.baseGcs);
    const stub = { ...p, deceased: false, trueGlucose: p.glucose };
    liveState = {
      hr: p.hr,
      rr: p.rr,
      spo2: p.spo2,
      sys: p.sys,
      dia: p.dia,
      temp: p.temp,
      trueGlucose: p.glucose,
      glucoseMeasured: false,
      lastGlucoseReading: null,
      lactate: p.lactate,
      hb: p.hb,
      potassium: p.potassium,
      sodium: p.sodium,
      creatinine: p.creatinine,
      rso2: clamp(Math.round(calcBrainDelivery(stub) * 0.9), 40, 80),
      gcs: p.baseGcs,
      gcsE: c.e,
      gcsV: c.v,
      gcsM: c.m,
      baseGcs: p.baseGcs,
      baseProfile: p.profile,
      profile: p.profile,
      profileId: p.profile.id,
      baseProfileId: p.profile.id,
      instability: p.profile.severity === "danger" ? 0.55 : p.profile.severity === "warn" ? 0.35 : 0.15,
      effects: [],
      crisisActive: false,
      trend: "stable",
      deceased: false,
      frozen: false,
      brainHypoxiaSec: 0,
      brainHypoxiaDeathSec: rand(BRAIN_HYPOXIA_MIN_SEC, BRAIN_HYPOXIA_MAX_SEC),
      brainHypoxiaWarnSec: rand(90, 150),
      hypoxiaWarnLogged: false,
      daysObserved: 0
    };
    if (window.Clinical) Clinical.initClinicalState(liveState, p);
    prevVitals = { hr: p.hr, spo2: p.spo2, sys: p.sys, dia: p.dia, gcs: p.baseGcs };
  }

  function packLiveState(ls) {
    return {
      ...ls,
      profileId: ls.profile.id,
      baseProfileId: ls.baseProfile.id,
      profile: undefined,
      baseProfile: undefined
    };
  }

  function unpackLiveState(raw) {
    const ls = { ...raw };
    ls.profile = findProfile(raw.profileId);
    ls.baseProfile = findProfile(raw.baseProfileId || raw.profileId);
    return ls;
  }

  function packPatient(p) {
    return {
      ...p,
      birth: p.birth instanceof Date ? p.birth.toISOString() : p.birth,
      profileId: p.profile.id,
      profile: undefined
    };
  }

  function unpackPatient(raw) {
    const p = { ...raw, birth: new Date(raw.birth), profile: findProfile(raw.profileId) };
    return p;
  }

  function saveCurrentPatient() {
    if (!currentPatient || !liveState || patientIndex < 0) return;
    syncPatientFromLive();
    patientRecords.set(patientIndex, {
      patient: packPatient(currentPatient),
      live: packLiveState(liveState),
      eventLogHtml: $("eventLog").innerHTML,
      diagnosisText: $("diagnosis").textContent
    });
  }

  function wasCriticalState(ls) {
    return ls.profile.severity === "danger" || ls.gcs <= 8 || ls.brainHypoxiaSec > 50 ||
      ls.trend === "worsening" || isCriticallyHypoxic(ls) || ls.deceased;
  }

  function measureGlucose() {
    if (!liveState || liveState.frozen) return;
    tickTrueGlucose(liveState);
    const error = (Math.random() - 0.5) * 0.35;
    liveState.lastGlucoseReading = Math.round((getTrueGlucose(liveState) + error) * 10) / 10;
    liveState.glucoseMeasured = true;
    const val = liveState.lastGlucoseReading;
    logEvent("info", `<strong>Глюкометр:</strong> ${val} ммоль/л — ${interpretGlucose(val)}.`);
    updateVitalsUI();
    saveCurrentPatient();
  }

  function updateCareTrackUI() {
    if (!liveState) return;
    const phase = liveState.carePhase === "ward" ? "обычная палата" : "реанимация";
    $("carePhaseLabel").textContent = `Отделение: ${phase}`;
    $("recoveryScoreLabel").textContent = liveState.deceased
      ? "Исход: летальный"
      : `Восстановление: ${Math.round(liveState.recoveryScore || 0)}% · резерв ${Math.round(liveState.healthReserve || 0)}%`;
  }

  function runVisualExam() {
    const findings = window.Clinical
      ? Clinical.buildExamFindings(liveState, currentPatient)
      : [];
    const html = findings.map((x) =>
      `<p class="exam-finding"><strong>${x.cat}:</strong> ${x.text}</p>`
    ).join("");
    $("examContent").innerHTML = html || "<p>Данных недостаточно.</p>";
    $("examModal").hidden = false;
    logEvent("info", "<strong>Осмотр:</strong> " + (findings[0]?.text || "выполнен"));
    saveCurrentPatient();
  }

  function applyTimePass(minutes, label) {
    if (!liveState || !currentPatient) return;
    if (liveState.frozen) {
      logEvent("neutral", `${label}: исход зафиксирован, без изменений.`);
      return;
    }
    const sim = Clinical.simulateTimePass(liveState, currentPatient, minutes);
    if (sim.events?.length) logEvent("warn", `${label}: ${sim.events.join(", ")}.`);
    else logEvent("info", `${label} прошло. Наблюдение продолжается.`);
    updateConsciousnessFromPhysiology(liveState);
    syncPatientFromLive();
    updateVitalsUI();
    updateCareTrackUI();
    saveCurrentPatient();
  }

  function waitOneDay() {
    if (!liveState) return;
    if (liveState.frozen) {
      logEvent("neutral", "Исход зафиксирован. Прошли сутки — показатели без изменений.");
      return;
    }
    liveState.daysObserved = (liveState.daysObserved || 0) + 1;
    Clinical.simulateTimePass(liveState, currentPatient, 1440);
    const out = Clinical.outcomeAfterDay(liveState, currentPatient);

    if (out.type === "death") {
      if (!liveState.deceased) {
        liveState.brainHypoxiaSec = liveState.brainHypoxiaDeathSec;
        declareBrainDeath();
      }
      liveState.deathDiagnosis = out.msg;
      $("diagnosis").textContent = out.msg;
      logEvent("bad", `Сутки: ${out.msg}`);
    } else if (out.type === "worse") {
      liveState.trend = "worsening";
      liveState.spo2 = clamp(liveState.spo2 - rand(3, 8), 70, 100);
      liveState.instability = Math.min(0.9, liveState.instability + 0.2);
      logEvent("warn", `Сутки: ${out.msg}`);
    } else if (out.type === "relapse") {
      Clinical.relapseToIcu(liveState, currentPatient, out.msg);
    } else if (out.type === "ward") {
      Clinical.transferToWard(liveState, currentPatient);
      logEvent("good", out.msg);
    } else if (out.type === "good" || out.type === "slight") {
      liveState.trend = "improving";
      liveState.brainHypoxiaSec = Math.max(0, liveState.brainHypoxiaSec - rand(20, 50));
      liveState.recoveryScore = clamp(liveState.recoveryScore + rand(5, 15), 0, 100);
      if (chance(0.5)) liveState.profile = findProfile("normal_variant");
      logEvent("good", `Сутки: ${out.msg}`);
    }
    updateConsciousnessFromPhysiology(liveState);
    syncPatientFromLive();
    updateVitalsUI();
    updateCareTrackUI();
    saveCurrentPatient();
  }

  function openSurgery(type) {
    if (!liveState || liveState.deceased) {
      logEvent("neutral", "Операция невозможна.");
      return;
    }
    const def = Clinical.startSurgery(liveState, type);
    if (!def) return;
    $("surgeryTitle").textContent = def.name;
    $("surgeryStepLabel").textContent = "Следующий этап: " + def.steps[0].label;
    const container = $("surgerySteps");
    container.innerHTML = "";
    def.steps.forEach((step) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "surgery-step-btn";
      btn.textContent = step.label;
      btn.addEventListener("click", () => {
        const res = Clinical.surgeryStep(liveState, currentPatient, step.id);
        logEvent(res.ok ? "good" : "bad", res.msg);
        if (res.fatal && !liveState.deceased) {
          liveState.brainHypoxiaSec = liveState.brainHypoxiaDeathSec;
          declareBrainDeath();
        }
        if (res.done || !liveState.activeSurgery) {
          $("surgeryModal").hidden = true;
        } else if (liveState.activeSurgery) {
          const next = Clinical.SURGERIES[type].steps[liveState.activeSurgery.stepIndex];
          $("surgeryStepLabel").textContent = next ? "Следующий этап: " + next.label : "Завершено";
        }
        syncPatientFromLive();
        updateVitalsUI();
        updateCareTrackUI();
        saveCurrentPatient();
      });
      container.appendChild(btn);
    });
    $("surgeryModal").hidden = false;
    logEvent("info", `Начата операция: ${def.name}`);
  }

  function wardRound() {
    if (!liveState || liveState.carePhase !== "ward") {
      logEvent("neutral", "Обход палаты: пациент в реанимации.");
      return;
    }
    if (chance(0.7)) {
      liveState.recoveryScore = clamp(liveState.recoveryScore + rand(2, 6), 0, 100);
      logEvent("good", "Обход: улучшение, рекомендации соблюдает.");
    } else {
      Clinical.relapseToIcu(liveState, currentPatient, "ухудшение на фоне несоблюдения режима");
    }
    updateVitalsUI();
    updateCareTrackUI();
    saveCurrentPatient();
  }

  function openHandbook() {
    $("handbookContent").innerHTML = MEDICAL_HANDBOOK;
    $("handbookModal").hidden = false;
  }

  function initCopyProtection() {
    document.addEventListener("copy", (e) => e.preventDefault());
    document.addEventListener("cut", (e) => e.preventDefault());
    document.addEventListener("contextmenu", (e) => {
      if (e.target.closest(".no-select")) e.preventDefault();
    });
  }

  function initModals() {
    document.querySelectorAll("[data-close-modal]").forEach((el) => {
      el.addEventListener("click", () => {
        $("handbookModal").hidden = true;
        $("examModal").hidden = true;
        $("surgeryModal").hidden = true;
      });
    });
  }

  function logEvent(type, message) {
    const log = $("eventLog");
    const ph = log.querySelector(".event-log__placeholder");
    if (ph) ph.remove();
    const entry = document.createElement("div");
    entry.className = `log-entry log-entry--${type}`;
    const t = new Date().toLocaleTimeString("ru-RU");
    entry.innerHTML = `<time>${t}</time>${message}`;
    log.insertBefore(entry, log.firstChild);
    while (log.children.length > 12) log.removeChild(log.lastChild);
  }

  function flashVital(name, direction) {
    const el = document.querySelector(`[data-vital="${name}"]`);
    if (!el) return;
    el.classList.remove("vital--flash-up", "vital--flash-down");
    void el.offsetWidth;
    el.classList.add(direction === "up" ? "vital--flash-up" : "vital--flash-down");
    setTimeout(() => el.classList.remove("vital--flash-up", "vital--flash-down"), 650);
  }

  function updateBrainPanelUI() {
    if (!liveState) return;
    const panel = $("brainPanel");
    const fill = $("hypoxiaBarFill");
    const ratio = liveState.brainHypoxiaSec / liveState.brainHypoxiaDeathSec;
    const pct = clamp(ratio * 100, 0, 100);

    fill.style.width = pct + "%";
    $("hypoxiaTimer").textContent = liveState.deceased
      ? `Ишемия: ${formatHypoxiaTime(liveState.brainHypoxiaSec)} · СМЕРТЬ`
      : `Ишемия мозга: ${formatHypoxiaTime(liveState.brainHypoxiaSec)} / ~${formatHypoxiaTime(liveState.brainHypoxiaDeathSec)}`;

    panel.classList.remove("brain-panel--warn", "brain-panel--danger", "brain-panel--death");
    if (liveState.deceased) panel.classList.add("brain-panel--death");
    else if (ratio > 0.7) panel.classList.add("brain-panel--danger");
    else if (ratio > 0.35 || isCriticallyHypoxic(liveState)) panel.classList.add("brain-panel--warn");

    if (liveState.deceased) {
      $("brainStatus").textContent = "Смерть мозга. Необратимая аноксия коры. ЭЭГ изоэлектрична.";
    } else if (ratio > 0.85) {
      $("brainStatus").textContent = "Терминальная ишемия! Немедленная реанимация и O₂.";
    } else if (isCriticallyHypoxic(liveState)) {
      $("brainStatus").textContent = `Гипоксия ЦНС. Доставка O₂ в мозг ~${Math.round(calcBrainDelivery(liveState))}% от нормы.`;
    } else {
      $("brainStatus").textContent = `Перфузия мозга адекватна. rSO₂ ${Math.round(liveState.rso2)}%. ШКГ ${liveState.gcs}.`;
    }
  }

  function updateLiveStatusUI() {
    if (!liveState) return;
    const bar = $("liveStatus");
    const text = $("liveStatusText");
    bar.classList.remove("live-status--warn", "live-status--danger");

    if (liveState.deceased) {
      bar.classList.add("live-status--danger");
      text.textContent = "Пациент умер — смерть мозга";
      return;
    }

    if (liveState.crisisActive || liveState.profile.severity === "danger") {
      bar.classList.add("live-status--danger");
      text.textContent = liveState.crisisActive
        ? "⚠ Острое ухудшение! Требуются действия"
        : "Мониторинг: критический ритм";
    } else if (liveState.trend === "worsening" || liveState.profile.severity === "warn") {
      bar.classList.add("live-status--warn");
      text.textContent = liveState.trend === "worsening"
        ? "Нестабильность — параметры ухудшаются"
        : "Мониторинг: требует внимания";
    } else if (liveState.trend === "improving") {
      text.textContent = "Мониторинг: положительная динамика";
    } else {
      text.textContent = "Мониторинг: стабильное состояние";
    }
  }

  function syncPatientFromLive() {
    if (!currentPatient || !liveState) return;
    currentPatient.hr = liveState.hr;
    currentPatient.rr = liveState.rr;
    currentPatient.spo2 = liveState.spo2;
    currentPatient.sys = liveState.sys;
    currentPatient.dia = liveState.dia;
    currentPatient.bp = `${Math.round(liveState.sys)}/${Math.round(liveState.dia)}`;
    currentPatient.temp = liveState.temp;
    currentPatient.profile = liveState.profile;
    if (ecgState) {
      ecgState.profile = liveState.profile;
      ecgState.beatDuration = 60 / Math.max(20, liveState.hr);
    }
  }

  function updateVitalsUI() {
    if (!liveState) return;
    const hr = Math.round(liveState.hr);
    const spo2 = Math.round(liveState.spo2);
    const sys = Math.round(liveState.sys);
    const dia = Math.round(liveState.dia);
    const map = Math.round(calcMAP(liveState.sys, liveState.dia));
    const gcs = liveState.deceased ? 0 : liveState.gcs;

    $("hr").textContent = liveState.deceased ? "0" : hr;
    $("rr").textContent = liveState.deceased ? "0" : Math.round(liveState.rr);
    $("spo2").textContent = spo2;
    $("bp").textContent = `${sys}/${dia}`;
    $("temp").textContent = liveState.temp.toFixed(1);
    $("rhythmLabel").textContent = liveState.deceased ? "Асистолия" : liveState.profile.label;
    $("gcs").textContent = liveState.deceased ? "—" : gcs;
    $("gcsDetail").textContent = liveState.deceased ? "—" : `E${liveState.gcsE} V${liveState.gcsV} M${liveState.gcsM}`;
    $("consciousnessLabel").textContent = getConsciousnessLabel(gcs);
    $("map").textContent = map;
    if (liveState.glucoseMeasured && liveState.lastGlucoseReading != null) {
      $("glucose").textContent = liveState.lastGlucoseReading.toFixed(1);
      $("glucoseHint").textContent = "ммоль/л · замер";
    } else {
      $("glucose").textContent = "—";
      $("glucoseHint").textContent = "не измерена";
    }
    $("lactate").textContent = liveState.lactate.toFixed(1);
    $("hb").textContent = Math.round(liveState.hb);
    $("rso2").textContent = Math.round(liveState.rso2);
    $("electrolytes").textContent = `K ${liveState.potassium.toFixed(1)} · Na ${liveState.sodium} · креат. ${Math.round(liveState.creatinine)}`;

    if (prevVitals) {
      if (hr !== prevVitals.hr) flashVital("hr", hr > prevVitals.hr ? "up" : "down");
      if (spo2 !== prevVitals.spo2) flashVital("spo2", spo2 > prevVitals.spo2 ? "up" : "down");
      if (sys !== prevVitals.sys || dia !== prevVitals.dia) flashVital("bp", sys > prevVitals.sys ? "up" : "down");
      if (gcs !== prevVitals.gcs) flashVital("gcs", gcs > prevVitals.gcs ? "up" : "down");
      if (liveState.glucoseMeasured && prevVitals.glucose != null &&
          liveState.lastGlucoseReading !== prevVitals.glucose) {
        flashVital("glucose", liveState.lastGlucoseReading > prevVitals.glucose ? "up" : "down");
      }
    }
    prevVitals = {
      hr, spo2, sys, dia, gcs,
      glucose: liveState.glucoseMeasured ? liveState.lastGlucoseReading : null
    };

    const hrEl = document.querySelector('[data-vital="hr"]');
    const spo2El = document.querySelector('[data-vital="spo2"]');
    const bpEl = document.querySelector('[data-vital="bp"]');
    const gcsEl = document.querySelector('[data-vital="gcs"]');
    const glucEl = document.querySelector('[data-vital="glucose"]');
    const rso2El = document.querySelector('[data-vital="rso2"]');
    setVitalAlarm(hrEl, liveState.deceased || hr < 50 || hr > 120 ? (hr < 40 || hr > 140 || liveState.deceased ? "danger" : "warn") : null);
    setVitalAlarm(spo2El, spo2 < 90 ? "danger" : spo2 < 94 ? "warn" : null);
    setVitalAlarm(bpEl, map < 65 || sys > 160 ? "danger" : map < 70 || sys > 140 ? "warn" : null);
    setVitalAlarm(gcsEl, gcs > 0 && gcs <= 8 ? "danger" : gcs <= 12 ? "warn" : null);
    if (liveState.glucoseMeasured) {
      const gr = liveState.lastGlucoseReading;
      setVitalAlarm(glucEl, gr < 3.9 || gr > 11 ? "warn" : null);
    } else {
      setVitalAlarm(glucEl, null);
    }
    setVitalAlarm(rso2El, liveState.rso2 < 50 ? "danger" : liveState.rso2 < 60 ? "warn" : null);

    const sev = liveState.profile.severity;
    const box = $("diagnosisBox");
    box.className = "diagnosis-box diagnosis-box--" + (sev === "good" ? "good" : sev === "warn" ? "warning" : "danger");
    $("severity").textContent = SEVERITY_LABELS[sev];

    const status = $("ecgStatus");
    const alarm = sev === "danger" || liveState.crisisActive;
    status.textContent = alarm ? "⚠ ТРЕВОГА — проверьте пациента" : "Запись…";
    status.classList.toggle("alarm", alarm);

    $("lastUpdate").textContent = "Обновлено: " + new Date().toLocaleTimeString("ru-RU");
    updateBrainPanelUI();
    updateLiveStatusUI();
    updateCareTrackUI();
  }

  function triggerCrisis() {
    if (!liveState || liveState.crisisActive) return;
    liveState.crisisActive = true;
    liveState.trend = "worsening";
    liveState.instability = Math.min(0.95, liveState.instability + 0.2);

    const roll = Math.random();
    if (roll < 0.35) {
      liveState.hr += rand(25, 50);
      liveState.spo2 -= rand(4, 12);
      liveState.sys -= rand(10, 30);
      liveState.profile = findProfile(pick(CRITICAL_PROFILES));
      logEvent("bad", "Резкое ухудшение! Тахикардия, падение SpO₂ и АД.");
    } else if (roll < 0.6) {
      liveState.hr -= rand(15, 35);
      liveState.spo2 -= rand(2, 8);
      liveState.profile = findProfile(pick(["avblock2", "avblock3", "bradycardia", "asystole_risk"]));
      logEvent("bad", "Внезапная брадикардия / нарушение проводимости.");
    } else {
      liveState.hr += rand(10, 30);
      liveState.rr += rand(4, 8);
      liveState.profile = findProfile(pick(WORSE_PROFILES));
      logEvent("warn", "Нестабильность ритма. Эктопия нарастает.");
    }

    liveState.brainHypoxiaSec = Math.min(liveState.brainHypoxiaDeathSec - 5, liveState.brainHypoxiaSec + rand(20, 45));
    $("diagnosis").textContent = "ДИНАМИКА: " + liveState.profile.diagnosis;
    setTimeout(() => {
      if (liveState) liveState.crisisActive = false;
    }, rand(8000, 18000));
  }

  function triggerSpontaneousShift() {
    if (!liveState) return;
    const r = Math.random();
    if (r < 0.45) {
      liveState.trend = "worsening";
      liveState.hr += rand(-3, 8);
      liveState.spo2 += rand(-2, 1);
      liveState.sys += rand(-5, 3);
      if (chance(0.25)) liveState.profile = findProfile(pick(WORSE_PROFILES));
      logEvent("warn", "Самопроизвольное ухудшение параметров.");
    } else if (r < 0.75) {
      liveState.trend = "improving";
      liveState.hr += rand(-6, 4);
      liveState.spo2 += rand(0, 3);
      if (chance(0.2) && liveState.profile.severity !== "good") {
        liveState.profile = findProfile("normal_variant");
      }
      logEvent("good", "Небольшое улучшение без вмешательства.");
    } else {
      liveState.trend = "stable";
    }
    if (chance(0.4)) $("diagnosis").textContent = liveState.profile.diagnosis;
  }

  function tickLiveVitals() {
    if (!liveState || !currentPatient) return;
    if (liveState.frozen || liveState.deceased) {
      updateVitalsUI();
      return;
    }

    tickBrainHypoxia();
    if (liveState.deceased) {
      syncPatientFromLive();
      updateVitalsUI();
      return;
    }

    const now = Date.now();
    liveState.effects = liveState.effects.filter((e) => e.until > now);
    let dHr = 0, dSpo2 = 0, dSys = 0, dDia = 0, dRr = 0, dTemp = 0, dGluc = 0;

    for (const e of liveState.effects) {
      const k = e.tickStr ?? 1;
      dHr += (e.dhr || 0) * k;
      dSpo2 += (e.dspo2 || 0) * k;
      dSys += (e.dsys || 0) * k;
      dDia += (e.ddia || 0) * k;
      dRr += (e.drr || 0) * k;
      dGluc += (e.dglucose || 0) * k;
    }

    dHr += rand(-2, 2);
    dSpo2 += rand(-1, 1);
    dSys += rand(-3, 3);
    dDia += rand(-2, 2);
    dRr += rand(-1, 1);
    dTemp += (Math.random() - 0.5) * 0.06;

    if (liveState.trend === "worsening") {
      dHr += chance(0.3) ? rand(1, 4) : 0;
      dSpo2 -= chance(0.25) ? 1 : 0;
    } else if (liveState.trend === "improving") {
      dHr -= chance(0.25) ? rand(0, 3) : 0;
      dSpo2 += chance(0.2) ? 1 : 0;
    }

    liveState.hr = clamp(liveState.hr + dHr, 20, 200);
    liveState.spo2 = clamp(liveState.spo2 + dSpo2, 70, 100);
    liveState.sys = clamp(liveState.sys + dSys, 60, 200);
    liveState.dia = clamp(liveState.dia + dDia, 35, 120);
    liveState.rr = clamp(liveState.rr + dRr, 0, 40);
    liveState.temp = clamp(liveState.temp + dTemp, 35, 41.5);
    if (dGluc) liveState.trueGlucose = clamp(getTrueGlucose(liveState) + dGluc, 1.5, 30);

    const crisisChance = window.Clinical
      ? Clinical.crisisChanceMultiplier(liveState)
      : liveState.instability * 0.08;
    if (chance(crisisChance)) triggerCrisis();
    else if (chance(0.08 + liveState.instability * 0.1)) triggerSpontaneousShift();

    if (chance(0.03)) liveState.trend = "stable";

    syncPatientFromLive();
    updateVitalsUI();
  }

  function addTimedEffect(effect, durationMs) {
    const ticks = Math.ceil(durationMs / 1000);
    const tickStr = 1 / ticks;
    liveState.effects.push({
      until: Date.now() + durationMs,
      dhr: (effect.hr || 0) * tickStr,
      dspo2: (effect.spo2 || 0) * tickStr,
      dsys: (effect.sys || 0) * tickStr,
      ddia: (effect.dia || 0) * tickStr,
      drr: (effect.rr || 0) * tickStr,
      dglucose: (effect.glucose || 0) * tickStr,
      tickStr
    });
  }

  function applyDoctorAction(actionId) {
    if (!liveState || !currentPatient) return;
    const now = Date.now();
    if (actionCooldown[actionId] && now < actionCooldown[actionId]) {
      logEvent("neutral", "Подождите перед повторным введением.");
      return;
    }
    actionCooldown[actionId] = now + 4000;

    const action = DOCTOR_ACTIONS.find((a) => a.id === actionId);
    if (!action) return;

    Clinical.trackDrug(liveState, actionId);
    const odMsg = Clinical.checkOverdose(liveState, actionId);
    let result = action.apply(liveState);
    if (odMsg) {
      const od = Clinical.applyOverdoseEffect(liveState, odMsg);
      result = { type: "bad", msg: od.msg, overdose: true };
      if (od.fatal) {
        liveState.brainHypoxiaSec = liveState.brainHypoxiaDeathSec;
        declareBrainDeath();
      }
    } else {
      result = Clinical.escalateWrongDrug(liveState, actionId, result);
    }
    if (result.type === "good") liveState.correctCareStreak = (liveState.correctCareStreak || 0) + 1;

    logEvent(result.type, `<strong>${action.label}:</strong> ${result.msg}`);

    if (result.effect) addTimedEffect(result.effect, result.effect.duration || 10000);
    if (result.drift) addTimedEffect(result.drift, 6000);

    if (result.setHr !== undefined) liveState.hr = result.setHr;
    if (result.setRr !== undefined) liveState.rr = result.setRr;
    if (result.reduceHypoxia) {
      liveState.brainHypoxiaSec = Math.max(0, liveState.brainHypoxiaSec - result.reduceHypoxia);
    }
    if (result.gcsDrop) {
      setGcsFromTotal(liveState, Math.max(3, liveState.gcs - result.gcsDrop));
    }
    if (result.trueGlucose !== undefined) liveState.trueGlucose = result.trueGlucose;
    if (result.profileShift) {
      liveState.profile = findProfile(result.profileShift);
      liveState.profileId = liveState.profile.id;
      $("diagnosis").textContent = "После вмешательства: " + liveState.profile.diagnosis;
    }
    if (result.refreshGlucose && liveState.glucoseMeasured) measureGlucose();

    if (result.type === "good") liveState.trend = "improving";
    if (result.type === "bad") {
      liveState.trend = "worsening";
      liveState.instability = Math.min(0.95, liveState.instability + 0.15);
    }

    updateConsciousnessFromPhysiology(liveState);
    syncPatientFromLive();
    updateVitalsUI();
    updateCareTrackUI();
    saveCurrentPatient();
  }

  function buildDoctorButtons() {
    const container = $("doctorActions");
    container.innerHTML = "";
    DOCTOR_ACTIONS.forEach((action) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "doc-btn";
      btn.dataset.action = action.id;
      btn.textContent = `${action.icon} ${action.label}`;
      btn.addEventListener("click", () => {
        btn.classList.add("doc-btn--active");
        setTimeout(() => btn.classList.remove("doc-btn--active"), 400);
        applyDoctorAction(action.id);
      });
      container.appendChild(btn);
    });
  }

  function startLiveMonitoring() {
    if (vitalsTimer) clearInterval(vitalsTimer);
    vitalsTimer = setInterval(tickLiveVitals, 1200);
  }

  function stopLiveMonitoring() {
    if (vitalsTimer) clearInterval(vitalsTimer);
    vitalsTimer = null;
  }

  function updateClock() {
    const now = new Date();
    $("clock").textContent = now.toLocaleTimeString("ru-RU", { hour12: false });
  }

  function setVitalAlarm(el, level) {
    el.classList.remove("vital--alarm", "vital--warn");
    if (level) el.classList.add(level === "danger" ? "vital--alarm" : "vital--warn");
  }

  function showPatientAtIndex(index) {
    stopLiveMonitoring();
    Object.keys(actionCooldown).forEach((k) => delete actionCooldown[k]);

    patientIndex = index;
    let record = patientRecords.get(index);
    if (!record) {
      const p = generatePatient();
      initLiveState(p);
      record = { patient: packPatient(p), live: packLiveState(liveState), eventLogHtml: null };
      patientRecords.set(index, record);
    }

    currentPatient = unpackPatient(record.patient);
    initLiveState(currentPatient, unpackLiveState(record.live));

    const p = currentPatient;
    $("patientCounter").textContent = `Пациент #${index + 1}`;
    $("patientName").textContent = p.fullName;
    $("patientFioShort").textContent = p.shortName;
    $("patientAvatar").textContent = p.firstName.charAt(0);
    $("birthDate").textContent = formatDate(p.birth);
    $("age").textContent = declensionYears(p.age);
    $("gender").textContent = p.isMale ? "мужской" : "женский";
    $("cardId").textContent = p.cardId;
    $("ward").textContent = p.ward;
    $("bloodType").textContent = p.bloodType;
    $("allergies").textContent = p.allergies;
    $("complaints").textContent = p.complaints;
    $("anthropometry").textContent = `${p.height} см · ${p.weight} кг · ИМТ ${p.bmi}`;
    $("comorbidities").textContent = p.comorbidities;
    $("chronicMeds").textContent = p.chronicMeds;
    $("habits").textContent = p.habits;

    document.querySelector(".monitor")?.classList.remove("monitor--patient-deceased");
    document.querySelector(".patient-card")?.classList.remove("patient-card--deceased");
    document.getElementById("deathBanner")?.remove();

    const prof = liveState.profile;
    $("diagnosis").textContent = liveState.deceased && liveState.deathDiagnosis
      ? liveState.deathDiagnosis
      : prof.diagnosis;
    $("severity").textContent = liveState.deceased ? "Летальный исход" : SEVERITY_LABELS[prof.severity];

    const box = $("diagnosisBox");
    const sev = liveState.deceased ? "danger" : prof.severity;
    box.className = "diagnosis-box diagnosis-box--" + (sev === "good" ? "good" : sev === "warn" ? "warning" : "danger");

    if (record.diagnosisText) $("diagnosis").textContent = record.diagnosisText;

    if (record.eventLogHtml) {
      $("eventLog").innerHTML = record.eventLogHtml;
    } else {
      $("eventLog").innerHTML = '<div class="event-log__placeholder">Новый пациент подключён к монитору…</div>';
      logEvent("info", `Пациент ${currentPatient.shortName} — мониторинг. Порог ишемии: ~${formatHypoxiaTime(liveState.brainHypoxiaDeathSec)}.`);
    }

    if (liveState.deceased) {
      document.querySelector(".monitor")?.classList.add("monitor--patient-deceased");
      document.querySelector(".patient-card")?.classList.add("patient-card--deceased");
      if (!document.getElementById("deathBanner")) {
        const banner = document.createElement("div");
        banner.id = "deathBanner";
        banner.className = "death-banner";
        banner.innerHTML = "<span>Асистолия · Смерть мозга</span>";
        $("ecgDisplayMain").appendChild(banner);
      }
    }
    setFrozenUI(!!liveState.frozen);

    updateVitalsUI();
    initEcgEngine(currentPatient);
    startLiveMonitoring();
    saveCurrentPatient();
  }

  function nextPatient() {
    saveCurrentPatient();
    showPatientAtIndex(patientIndex + 1);
  }

  function prevPatient() {
    saveCurrentPatient();
    showPatientAtIndex(Math.max(0, patientIndex - 1));
  }

  // ——— ЭКГ-движок ———
  function resizeCanvas(c, context) {
    const rect = c.parentElement.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    c.width = rect.width * dpr;
    c.height = rect.height * dpr;
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { w: rect.width, h: rect.height };
  }

  function drawGrid(context, w, h) {
    context.fillStyle = "#050a08";
    context.fillRect(0, 0, w, h);

    const minor = 10;
    const major = 50;
    context.strokeStyle = "rgba(0, 255, 136, 0.04)";
    context.lineWidth = 1;
    for (let x = 0; x < w; x += minor) {
      context.beginPath();
      context.moveTo(x, 0);
      context.lineTo(x, h);
      context.stroke();
    }
    for (let y = 0; y < h; y += minor) {
      context.beginPath();
      context.moveTo(0, y);
      context.lineTo(w, y);
      context.stroke();
    }
    context.strokeStyle = "rgba(0, 255, 136, 0.08)";
    for (let x = 0; x < w; x += major) {
      context.beginPath();
      context.moveTo(x, 0);
      context.lineTo(x, h);
      context.stroke();
    }
    for (let y = 0; y < h; y += major) {
      context.beginPath();
      context.moveTo(0, y);
      context.lineTo(w, y);
      context.stroke();
    }
  }

  function sampleBeat(profile, t, leadScale) {
    const id = profile.id;
    const phase = t % 1;

  function pWave(p) {
      return 0.08 * Math.sin(Math.PI * p / 0.12) * (p < 0.12 ? 1 : 0);
    }
    function qrs(p) {
      if (p < 0.02) return -0.15 * (p / 0.02);
      if (p < 0.05) return -0.15 + 1.1 * ((p - 0.02) / 0.03);
      if (p < 0.08) return 0.95 - 1.2 * ((p - 0.05) / 0.03);
      if (p < 0.1) return -0.25 * ((p - 0.08) / 0.02);
      return 0;
    }
    function tWave(p) {
      return 0.25 * Math.sin(Math.PI * p / 0.18) * (p < 0.18 ? 1 : 0);
    }

    let y = 0;
    const pr = id === "avblock1" ? 0.22 : id === "wpw" ? 0.08 : 0.14;
    const qrsStart = pr;

    if (phase < 0.12) y += pWave(phase);
    if (phase >= qrsStart && phase < qrsStart + 0.12) y += qrs(phase - qrsStart) * leadScale;
    if (phase >= 0.38 && phase < 0.56) y += tWave(phase - 0.38);

    if (id === "stemi" && phase >= 0.32 && phase < 0.5) y += 0.35;
    if (id === "st_depression" && phase >= 0.32 && phase < 0.5) y -= 0.2;
    if (id === "hyperkalemia" && phase >= 0.38 && phase < 0.56) y += 0.55 * tWave(phase - 0.38);
    if (id === "long_qt" && phase >= 0.38 && phase < 0.72) y += 0.2 * tWave((phase - 0.38) / 2);
    if (id === "short_qt" && phase >= 0.38 && phase < 0.48) y += 0.15 * tWave((phase - 0.38) * 2.5);
    if (id === "lbbb" && phase >= qrsStart && phase < qrsStart + 0.14) y = (phase - qrsStart < 0.07 ? 0.5 : -0.4) * leadScale;
    if (id === "rbbb" && phase >= qrsStart && phase < qrsStart + 0.12) y += 0.3 * qrs(phase - qrsStart);
    if (id === "pericarditis" && phase >= 0.3 && phase < 0.55) y += 0.15;

    if (id === "afib") {
      const noise = (Math.sin(t * 47.3) + Math.sin(t * 83.1)) * 0.04;
      y = noise + (chance(0.15) ? qrs(0.04) * 0.7 : 0);
      return y;
    }
    if (id === "flutter") {
      const saw = 0.06 * Math.sin(t * Math.PI * 2 * 6);
      if (phase >= qrsStart && phase < qrsStart + 0.1) y = qrs(phase - qrsStart) * 0.8;
      else y = saw;
      return y;
    }
    if (id === "artifact") {
      y += (Math.random() - 0.5) * 0.6;
    }
    if (id === "asystole_risk") {
      if (Math.sin(t * 0.5) > 0.7) return (Math.random() - 0.5) * 0.02;
      return 0;
    }
    if (id === "avblock2" && Math.floor(t * 2.3) % 5 === 0) return 0;
    if (id === "avblock3") {
      if (phase < 0.15) return 0.4 * qrs(phase / 0.15);
      return 0;
    }
    if (id === "pvc" && Math.floor(t * 1.7) % 4 === 2) {
      if (phase < 0.1) return 1.4 * qrs(phase / 0.1);
    }
    if (id === "pac" && Math.floor(t * 2.1) % 6 === 3) {
      if (phase < 0.08) return 0.6 * qrs(phase / 0.08);
    }

    return y;
  }

  function initEcgEngine(patient) {
    if (ecgState) ecgState.running = false;
    if (animationId) cancelAnimationFrame(animationId);

    const profile = liveState ? liveState.profile : patient.profile;
    const bpm = liveState ? liveState.hr : patient.hr;
    const beatDuration = 60 / Math.max(20, bpm);

    ecgState = {
      running: true,
      profile,
      bpm,
      beatDuration,
      scroll: 0,
      buffer: [],
      bufferLen: 0,
      jitter: 0
    };

    function tick() {
      if (!ecgState || !ecgState.running) return;

      const size1 = resizeCanvas(canvas, ctx);
      const size2 = resizeCanvas(canvas2, ctx2);
      const w1 = size1.w;
      const h1 = size1.h;
      const w2 = size2.w;
      const h2 = size2.h;

      const mid1 = h1 * 0.55;
      const mid2 = h2 * 0.5;
      const amp1 = h1 * 0.22;
      const amp2 = h2 * 0.18;

      const curProfile = liveState ? liveState.profile : ecgState.profile;
      const curHr = liveState ? liveState.hr : ecgState.bpm;
      const flatline = liveState && liveState.deceased;
      ecgState.profile = curProfile;
      ecgState.beatDuration = 60 / Math.max(20, curHr || 40);

      ecgState.scroll += 2.5;
      const beatT = (Date.now() / 1000) / ecgState.beatDuration;

      let newSample = flatline ? (Math.random() - 0.5) * 0.015 : sampleBeat(curProfile, beatT, 1);
      let newSample2 = flatline ? newSample * 0.5 : sampleBeat(curProfile, beatT + 0.05, 0.7) * (curProfile.id === "stemi" ? 1.3 : 1);

      ecgState.buffer.push({ y1: newSample, y2: newSample2 });
      const maxLen = Math.ceil(w1 / 2) + 10;
      if (ecgState.buffer.length > maxLen) ecgState.buffer.shift();

      drawGrid(ctx, w1, h1);
      drawGrid(ctx2, w2, h2);

      ctx.strokeStyle = "#00ff88";
      ctx.lineWidth = 2;
      ctx.shadowColor = "rgba(0, 255, 136, 0.5)";
      ctx.shadowBlur = 6;
      ctx.beginPath();

      ctx2.strokeStyle = "rgba(0, 255, 160, 0.75)";
      ctx2.lineWidth = 1.5;
      ctx2.beginPath();

      const len = ecgState.buffer.length;
      for (let i = 0; i < len; i++) {
        const x = w1 - (len - i) * 2;
        const pt = ecgState.buffer[i];
        const y1 = mid1 - pt.y1 * amp1;
        const y2 = mid2 - pt.y2 * amp2;
        if (i === 0) {
          ctx.moveTo(x, y1);
          ctx2.moveTo(x * (w2 / w1), y2);
        } else {
          ctx.lineTo(x, y1);
          ctx2.lineTo(x * (w2 / w1), y2);
        }
      }
      ctx.stroke();
      ctx2.stroke();
      ctx.shadowBlur = 0;

      animationId = requestAnimationFrame(tick);
    }

    tick();
  }

  function init() {
    if (window.Clinical) {
      Clinical.init({
        rand, pick, chance, clamp,
        calcMAP, getTrueGlucose, isCriticallyHypoxic,
        tickTrueGlucose, logEvent, findProfile, wasCriticalState
      });
    }

    $("sessionId").textContent = "ECG-" + Date.now().toString(36).toUpperCase().slice(-8);
    updateClock();
    setInterval(updateClock, 1000);
    buildDoctorButtons();
    initCopyProtection();
    initModals();
    $("handbookContent").innerHTML = MEDICAL_HANDBOOK;

    $("btnNext").addEventListener("click", nextPatient);
    $("btnPrev").addEventListener("click", prevPatient);
    $("btnWaitMin").addEventListener("click", () => applyTimePass(1, "1 минута"));
    $("btnWaitHour").addEventListener("click", () => applyTimePass(60, "1 час"));
    $("btnWaitDay").addEventListener("click", waitOneDay);
    $("btnVisualExam").addEventListener("click", runVisualExam);
    $("btnMeasureGlucose").addEventListener("click", measureGlucose);
    $("btnHandbook").addEventListener("click", openHandbook);
    $("btnRecGood").addEventListener("click", () => {
      if (!liveState) return;
      Clinical.applyRecommendations(liveState, currentPatient, "good");
      updateCareTrackUI();
      saveCurrentPatient();
    });
    $("btnRecBad").addEventListener("click", () => {
      if (!liveState) return;
      Clinical.applyRecommendations(liveState, currentPatient, "bad");
      if (chance(0.35)) Clinical.relapseToIcu(liveState, currentPatient, "рецидив после неверных рекомендаций");
      updateCareTrackUI();
      saveCurrentPatient();
    });
    $("btnSurgeryPci").addEventListener("click", () => openSurgery("pci"));
    $("btnSurgeryPacemaker").addEventListener("click", () => openSurgery("pacemaker"));
    $("btnWardRound").addEventListener("click", wardRound);
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") nextPatient();
      if (e.key === "ArrowLeft") prevPatient();
    });

    window.addEventListener("resize", () => {
      if (currentPatient) initEcgEngine(currentPatient);
    });

    showPatientAtIndex(0);
  }

  init();
})();
