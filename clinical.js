/* Расширенная клиническая логика — подключается после app.js */
(function () {
  "use strict";

  const Clinical = {
    hooks: null,

    init(hooks) {
      Clinical.hooks = hooks;
    },

    calcHealthReserve(patient, profile) {
      let r = 65;
      if (patient.age < 45) r += 12;
      else if (patient.age > 70) r -= 18;
      else if (patient.age > 55) r -= 8;
      if (/без существенной/i.test(patient.comorbidities)) r += 18;
      if (/СД|диабет/i.test(patient.comorbidities)) r -= 6;
      if (/ХСН|инсульт|ХОБЛ|ХБП/i.test(patient.comorbidities)) r -= 12;
      if (profile.severity === "good") r += 22;
      if (profile.severity === "warn") r -= 5;
      if (profile.severity === "danger") r -= 22;
      return Clinical.hooks.clamp(r, 12, 98);
    },

    initClinicalState(live, patient) {
      const prof = live.profile || patient.profile;
      live.healthReserve = Clinical.calcHealthReserve(patient, prof);
      live.recoveryScore = live.recoveryScore ?? Clinical.hooks.rand(15, 45);
      live.carePhase = live.carePhase || "icu";
      live.drugDoses = live.drugDoses || {};
      live.recentDrugs = live.recentDrugs || [];
      live.wrongDrugCount = live.wrongDrugCount || 0;
      live.correctCareStreak = live.correctCareStreak || 0;
      live.activeSurgery = live.activeSurgery || null;
      live.recommendationIssued = live.recommendationIssued || false;
      live.lastRecommendationQuality = live.lastRecommendationQuality || null;
      live.minutesObserved = live.minutesObserved || 0;
    },

    trackDrug(live, drugId) {
      live.drugDoses[drugId] = (live.drugDoses[drugId] || 0) + 1;
      const now = Date.now();
      live.recentDrugs.push({ id: drugId, t: now });
      live.recentDrugs = live.recentDrugs.filter((r) => now - r.t < 600000);
      return live.recentDrugs.filter((r) => r.id === drugId).length;
    },

    checkOverdose(live, drugId) {
      const count = live.recentDrugs.filter((r) => r.id === drugId).length;
      const od = {
        adrenaline: { max: 2, msg: "Передозировка адреналина: ЖТ, тахикардия, ишемия миокарда." },
        insulin: { max: 2, msg: "Избыток инсулина — тяжёлая гипогликемия, судороги, кома." },
        morphine: { max: 2, msg: "Передозировка опиоидов — апноэ, кома." },
        nitro: { max: 4, msg: "Избыток нитратов — коллапс, гипотензия." },
        metoprolol: { max: 2, msg: "Передозировка β-блокаторов — брадикардия, бронхоспазм." },
        atropine: { max: 3, msg: "Избыток атропина — тахикардия, сухость, делирий." },
        amiodarone: { max: 2, msg: "Токсичность амиодарона — гипотензия, брадиаритмия." },
        glucose_iv: { max: 3, msg: "Избыток глюкозы — гиперосмолярное состояние." },
        sedation: { max: 2, msg: "Передозировка седативных — остановка дыхания." }
      };
      const rule = od[drugId];
      if (rule && count > rule.max) return rule.msg;
      return null;
    },

    escalateWrongDrug(live, actionId, result) {
      const h = Clinical.hooks;
      if (result.type !== "neutral" && result.type !== "bad") return result;
      const wrongMap = {
        metoprolol: () => live.hr < 70 || ["avblock2", "avblock3", "bradycardia"].includes(live.profile.id),
        insulin: () => h.getTrueGlucose(live) < 9,
        nitro: () => h.calcMAP(live.sys, live.dia) < 85 && !["stemi", "st_depression"].includes(live.profile.id),
        verapamil: () => live.hr < 65,
        potassium: () => live.potassium > 4.8,
        adrenaline: () => live.hr > 90 && !live.deceased,
        glucose_iv: () => h.getTrueGlucose(live) > 9,
        morphine: () => live.rr < 12 || live.gcs <= 10
      };
      const check = wrongMap[actionId];
      if (!check || !check()) return result;
      live.wrongDrugCount++;
      live.recoveryScore = Math.max(0, live.recoveryScore - h.rand(8, 18));
      live.instability = Math.min(0.95, live.instability + 0.12);
      const penalties = {
        metoprolol: { type: "bad", msg: "ОШИБКА: β-блокатор при брадикардии/блокаде — асистолия, АД падает!", effect: { hr: -h.rand(15, 25), spo2: -6, sys: -20 }, profileShift: "avblock3", overdose: true },
        insulin: { type: "bad", msg: "ОШИБКА: инсулин при нормальном сахаре — гипогликемическая кома!", trueGlucose: Math.max(1.5, h.getTrueGlucose(live) - 2.5), gcsDrop: 4, overdose: true },
        nitro: { type: "bad", msg: "ОШИБКА: нитраты без ишемии/при низком АД — коллапс!", effect: { sys: -25, dia: -15, spo2: -5, hr: +20 }, overdose: true },
        verapamil: { type: "bad", msg: "ОШИБКА: верапамил усугубил брадикардию!", effect: { hr: -20 }, profileShift: "avblock3" },
        potassium: { type: "bad", msg: "ОШИБКА: KCl при гиперкалиемии — остановка сердца!", profileShift: "hyperkalemia", setHr: h.rand(20, 35) },
        adrenaline: { type: "bad", msg: "ОШИБКА: адреналин без остановки — ЖТ, инфаркт!", effect: { hr: +35, sys: +40 }, profileShift: "pvc", overdose: true },
        glucose_iv: { type: "bad", msg: "ОШИБКА: глюкоза при гипергликемии — кетоацидоз усугубляется!", trueGlucose: h.getTrueGlucose(live) + 4, overdose: true },
        morphine: { type: "bad", msg: "ОШИБКА: морфин без показаний/при угнетении дыхания!", effect: { rr: -8, spo2: -12, gcsDrop: 3 }, overdose: true }
      };
      return penalties[actionId] || {
        type: "warn",
        msg: "Неправильный препарат: клинического улучшения нет, риск осложнений.",
        drift: { spo2: -1, sys: -3 }
      };
    },

    applyOverdoseEffect(live, msg) {
      live.recoveryScore = Math.max(0, live.recoveryScore - Clinical.hooks.rand(15, 30));
      live.instability = Math.min(0.98, live.instability + 0.2);
      if (Clinical.hooks.chance(0.35)) {
        live.brainHypoxiaSec += Clinical.hooks.rand(30, 90);
      }
      if (Clinical.hooks.chance(0.2) && live.brainHypoxiaSec > live.brainHypoxiaDeathSec * 0.6) {
        return { fatal: true, msg: msg + " Летальный исход на фоне осложнений." };
      }
      return { fatal: false, msg };
    },

    crisisChanceMultiplier(live) {
      const base = live.instability * (live.profile.severity === "danger" ? 0.12 : 0.05);
      const reserve = (live.healthReserve || 50) / 100;
      const phase = live.carePhase === "ward" ? 0.6 : 1;
      return base * (1.4 - reserve) * phase;
    },

    simulateTimePass(live, patient, minutes) {
      if (live.frozen || live.deceased) return { msg: "Исход зафиксирован." };
      live.minutesObserved = (live.minutesObserved || 0) + minutes;
      const steps = Math.min(40, Math.max(3, Math.floor(minutes / 2)));
      let events = [];

      for (let i = 0; i < steps; i++) {
        Clinical.hooks.tickTrueGlucose(live);
        if (live.carePhase === "icu") {
          const ch = Clinical.crisisChanceMultiplier(live) * (minutes / 60);
          if (Clinical.hooks.chance(ch * 0.12) && live.healthReserve < 55) {
            live.trend = "worsening";
            live.spo2 = Clinical.hooks.clamp(live.spo2 - Clinical.hooks.rand(0, 2), 70, 100);
            live.instability = Math.min(0.95, live.instability + 0.05);
            if (Clinical.hooks.chance(0.3)) events.push("самопроизвольное ухудшение");
          } else if (Clinical.hooks.chance(0.08) && live.recoveryScore > 40) {
            live.recoveryScore += Clinical.hooks.rand(1, 3);
          }
        }
        if (live.activeRecommendations === "bad" && Clinical.hooks.chance(0.12)) {
          live.recoveryScore -= Clinical.hooks.rand(2, 5);
          live.spo2 -= 1;
        }
        if (live.activeRecommendations === "good" && Clinical.hooks.chance(0.15)) {
          live.recoveryScore += Clinical.hooks.rand(1, 4);
        }
      }

      Clinical.tickRecovery(live, patient, minutes);
      return { events: [...new Set(events)], minutes };
    },

    tickRecovery(live, patient, minutesFactor) {
      const factor = minutesFactor / 60;
      if (live.deceased) return;
      let delta = 0;
      if (live.trend === "improving") delta += 2 * factor;
      if (live.trend === "worsening") delta -= 3 * factor;
      if (Clinical.hooks.calcMAP(live.sys, live.dia) >= 65 && live.spo2 >= 94) delta += 1.5 * factor;
      if (live.correctCareStreak > 3) delta += 2 * factor;
      if (live.wrongDrugCount > 0) delta -= live.wrongDrugCount * 0.5 * factor;
      live.recoveryScore = Clinical.hooks.clamp(live.recoveryScore + delta, 0, 100);
      if (live.recoveryScore >= 75 && live.carePhase === "icu" && live.profile.severity !== "danger" && !Clinical.hooks.isCriticallyHypoxic(live)) {
        if (Clinical.hooks.chance(0.15 * factor + 0.05)) Clinical.transferToWard(live, patient);
      }
    },

    transferToWard(live, patient) {
      live.carePhase = "ward";
      patient.ward = `Обычная палата, ${Clinical.hooks.pick(["301", "212", "415", "118"])}`;
      live.instability = Math.max(0.12, live.instability - 0.25);
      Clinical.hooks.logEvent("good", `Пациент ${patient.shortName} переведён в обычную палату. Врач продолжает наблюдение.`);
    },

    relapseToIcu(live, patient, reason) {
      live.carePhase = "icu";
      patient.ward = `Реанимация (реинтубация), койка ${Clinical.hooks.rand(1, 12)}`;
      live.instability = Math.min(0.9, live.instability + 0.3);
      live.trend = "worsening";
      Clinical.hooks.logEvent("bad", `РЕИНТУБАЦИЯ В РЕАНИМАЦИЮ: ${reason}`);
    },

    outcomeAfterDay(live, patient) {
      const critical = Clinical.hooks.wasCriticalState(live);
      const reserve = live.healthReserve || 50;
      const r = Math.random() * 100;

      if (critical) {
        if (r < 35 + reserve * 0.2) {
          return { type: "death", msg: "За сутки критическое состояние прогрессировало — летальный исход." };
        }
        if (r < 70) {
          return { type: "worse", msg: "Сутки: резкое ухудшение — отёк мозга, полиорганная недостаточность." };
        }
        return { type: "slight", msg: "Сутки: состояние тяжёлое, но стабилизация на минимально достаточном уровне." };
      }
      if (live.carePhase === "ward") {
        if (r < 15) return { type: "relapse", msg: "На фоне палатного режима — рецидив, возврат в реанимацию." };
        if (r < 85) return { type: "good", msg: "Сутки в палате: положительная динамика, соблюдает режим." };
        return { type: "worse", msg: "Незначительное ухудшение, требуется коррекция терапии." };
      }
      if (r < 25) return { type: "death", msg: "Внезапное ухудшение (тромбоэмболия/аритмия) — смерть." };
      if (r < 50) return { type: "ward", msg: "Сутки: стабилизация, перевод в обычную палату возможен." };
      if (r < 80) return { type: "good", msg: "Сутки наблюдения: улучшение, параметры стабильны." };
      return { type: "worse", msg: "Сутки: умеренное ухудшение без немедленной угрозы жизни." };
    },

    buildExamFindings(live, patient) {
      const f = [];
      const map = Clinical.hooks.calcMAP(live.sys, live.dia);
      const g = Clinical.hooks.getTrueGlucose(live);

      if (live.deceased) {
        f.push({ cat: "Общее", text: "Патологическая поза, реакция на болевой стимул отсутствует." });
        f.push({ cat: "Кожа", text: "Мраморность, мокрый холодный пот, акроцианоз." });
        f.push({ cat: "Глаза", text: "Зрачки D=S 5–6 мм, прямая реакция на свет отсутствует." });
        f.push({ cat: "ССС", text: "Тоны сердца не выслушиваются, пульс на a.carotis/radialis отсутствует." });
        f.push({ cat: "Дыхание", text: "Апноэ / агональное дыхание не отмечено." });
        f.push({ cat: "Живот", text: "Вздутие не оценивалось." });
        return f;
      }

      f.push({ cat: "Общее", text: `Отделение: ${live.carePhase === "ward" ? "обычная палата" : "реанимация"}. ШКГ ${live.gcs}. Резерв здоровья ~${Math.round(live.healthReserve)}%.` });

      if (live.spo2 < 88) f.push({ cat: "Кожа", text: "Цианоз губ, ногтевых лож, акроцианоз. Кожа влажная, холодная." });
      else if (live.spo2 < 94) f.push({ cat: "Кожа", text: "Бледность, периоральный цианоз слабый. CRT 2–3 с." });
      else f.push({ cat: "Кожа", text: "Розовая, теплая. CRT <2 с." });

      if (live.gcs <= 8) f.push({ cat: "НС", text: "Кома. Поза декортикации/ригидность не оценена." });
      else if (live.gcs <= 12) f.push({ cat: "НС", text: "Сопор: открывает глаза на боль, речь нечленораздельная." });
      else f.push({ cat: "НС", text: "Ясное сознание, ориентирован в месте, времени, личности." });

      if (map < 60) f.push({ cat: "ССС", text: `Гипотензия MAP ${Math.round(map)}. Тоны сердца глухие, тахи/бради по ЧСС ${Math.round(live.hr)}.` });
      else if (["stemi", "st_depression"].includes(live.profile.id)) f.push({ cat: "ССС", text: "Тахикардия, ритм нарушен. Возможен S3, боль при пальпации." });
      else f.push({ cat: "ССС", text: `ЧСС ${Math.round(live.hr)}, ритм по монитору: ${live.profile.label}.` });

      if (live.rr > 26) f.push({ cat: "Дыхание", text: "Тахипноэ, участие вспомогательной мускулатуры, хрипы влажные." });
      else if (live.rr < 10) f.push({ cat: "Дыхание", text: "Брадипноэ, риск гиповентиляции." });
      else f.push({ cat: "Дыхание", text: `ЧДД ${Math.round(live.rr)}, перкуторно — воздушность сохранена.` });

      if (g < 3.5) f.push({ cat: "Метаболизм", text: "Пот, тремор — гипогликемия вероятна (нужен замер)." });
      if (g > 14) f.push({ cat: "Метаболизм", text: "Запах ацетона, полиурия в анамнезе — гипергликемия." });
      if (live.lactate > 2.5) f.push({ cat: "Метаболизм", text: `Лактат ${live.lactate.toFixed(1)} — тканевая гипоперфузия.` });

      if (/отёк/i.test(patient.complaints)) f.push({ cat: "Отёки", text: "Периферические отёки, пастозность голеней." });
      if (live.overdoseRisk) f.push({ cat: "Токсикология", text: "Подозрение на передозировку/ошибку введения препаратов." });
      if (live.wrongDrugCount > 2) f.push({ cat: "Врачебная ошибка", text: `Зафиксировано ${live.wrongDrugCount} неверных назначений — риск осложнений.` });

      return f;
    },

    getRecommendations(live, patient, quality) {
      const good = [];
      const bad = [];
      if (live.spo2 < 94) good.push("Кислородотерапия, контроль SpO₂ каждые 15 мин.");
      if (Clinical.hooks.calcMAP(live.sys, live.dia) < 65) good.push("Восполнение ОЦК, вазопрессоры по протоколу.");
      if (["stemi", "st_depression"].includes(live.profile.id)) good.push("Антиагреганты, статины, рассмотреть реваскуляризацию.");
      if (Clinical.hooks.getTrueGlucose(live) < 3.9) good.push("Коррекция гипогликемии, частый контроль глюкозы.");
      if (live.hr > 110 && live.profile.id !== "bradycardia") good.push("Контроль ЧСС, β-блокатор при отсутствии противопоказаний.");
      good.push("Монитор ЭКГ, АД, диурез. Дневник жидкости.");

      bad.push("Обильное питьё без ограничения соли при отёках/ХСН.");
      bad.push("Отмена всех препаратов самостоятельно.");
      bad.push("Физическая нагрузка «для тренировки сердца» в первые сутки.");
      if (live.hr < 60) bad.push("Верапамил и β-блокаторы в высокой дозе.");
      if (live.potassium > 5) bad.push("Дополнительный KCl внутривенно.");

      return quality === "good" ? good : bad;
    },

    applyRecommendations(live, patient, quality) {
      live.recommendationIssued = true;
      live.lastRecommendationQuality = quality;
      live.activeRecommendations = quality;
      const list = Clinical.getRecommendations(live, patient, quality);
      if (quality === "good") {
        live.correctCareStreak++;
        live.recoveryScore = Clinical.hooks.clamp(live.recoveryScore + Clinical.hooks.rand(5, 12), 0, 100);
        Clinical.hooks.logEvent("good", `<strong>Рекомендации (адекватные):</strong> ${list.join(" ")}`);
        if (Clinical.hooks.chance(0.7)) Clinical.hooks.logEvent("info", "Пациент обещает соблюдать режим.");
        else Clinical.hooks.logEvent("warn", "Пациент сомневается, соблюдение частичное.");
      } else {
        live.wrongDrugCount++;
        live.recoveryScore = Math.max(0, live.recoveryScore - Clinical.hooks.rand(8, 15));
        Clinical.hooks.logEvent("bad", `<strong>ОШИБКА — неверные рекомендации:</strong> ${list.join(" ")}`);
        if (Clinical.hooks.chance(0.5)) Clinical.hooks.logEvent("warn", "Пациент выполнил неверные советы — ухудшение возможно.");
      }
      return list;
    },

    SURGERIES: {
      pci: {
        name: "Коронарография + стентирование (STEMI/NSTEMI)",
        steps: [
          { id: "consent", label: "Информированное согласие" },
          { id: "heparin", label: "Гепарин перед процедурой" },
          { id: "access", label: "Пункция артерии, катетер" },
          { id: "stent", label: "Стентирование поражённой артерии" },
          { id: "closure", label: "Гемостаз, перевязка" }
        ],
        requiredProfile: ["stemi", "st_depression"],
        wrongStepPenalty: "Осложнение процедуры: кровотечение, диссекция."
      },
      pacemaker: {
        name: "Имплантация ЭКС (АВ-блокада)",
        steps: [
          { id: "consent", label: "Согласие, антибиотикопрофилактика" },
          { id: "atropine_hold", label: "Исключить передозировку ингибиторов АВ-узла" },
          { id: "pocket", label: "Формирование кармана" },
          { id: "lead", label: "Имплантация электрода" },
          { id: "test", label: "Тест порогов, ушивание" }
        ],
        requiredProfile: ["avblock2", "avblock3", "bradycardia"],
        wrongStepPenalty: "Нарушение алгоритма: риск инфекции, нестабильный захват."
      }
    },

    startSurgery(live, type) {
      const s = Clinical.SURGERIES[type];
      if (!s) return null;
      live.activeSurgery = { type, stepIndex: 0, completed: [], errors: 0 };
      return s;
    },

    surgeryStep(live, patient, stepId) {
      const op = live.activeSurgery;
      if (!op) return { ok: false, msg: "Операция не начата." };
      const def = Clinical.SURGERIES[op.type];
      const steps = def.steps;
      const expected = steps[op.stepIndex];
      if (!expected) return { ok: false, msg: "Все этапы пройдены." };

      if (stepId === expected.id) {
        op.completed.push(stepId);
        op.stepIndex++;
        if (op.stepIndex >= steps.length) {
          live.recoveryScore = Clinical.hooks.clamp(live.recoveryScore + Clinical.hooks.rand(15, 25), 0, 100);
          live.profile = Clinical.hooks.findProfile("normal");
          live.profileId = "normal";
          live.instability = Math.max(0.1, live.instability - 0.3);
          live.activeSurgery = null;
          return { ok: true, done: true, msg: "Операция успешно завершена. Гемодинамика улучшается." };
        }
        return { ok: true, done: false, msg: `Этап «${expected.label}» выполнен верно.` };
      }
      op.errors++;
      live.recoveryScore = Math.max(0, live.recoveryScore - Clinical.hooks.rand(10, 20));
      live.instability = Math.min(0.95, live.instability + 0.15);
      if (op.errors >= 2) {
        if (Clinical.hooks.chance(0.4)) {
          live.activeSurgery = null;
          return { ok: false, fatal: true, msg: def.wrongStepPenalty + " Летальный исход на столе." };
        }
        Clinical.relapseToIcu(live, patient, "осложнение операции");
        live.activeSurgery = null;
        return { ok: false, fatal: false, msg: def.wrongStepPenalty + " Пациент возвращён в реанимацию." };
      }
      return { ok: false, fatal: false, msg: def.wrongStepPenalty + " Повторите правильный этап." };
    }
  };

  window.Clinical = Clinical;
})();
