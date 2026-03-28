/* ============================================================
   한상경 충남교육감 예비후보 - 메인 스크립트
   script.js
   ============================================================ */

/* ============================================================
   1. 7대 정책 데이터
   ============================================================ */
const POLICIES = [
  {
    number: "01",
    icon: "📖",
    title: "충남 학력안전망 구축",
    tag: "기초학력",
    description:
      "수준별 학습지원과 정서·상담 지원을 함께 묶어 기초부터 회복하는 학력안전망을 만들겠습니다. " +
      "학력 회복은 선택이 아니라 기본입니다. 기초 진단부터 학습 지원, 정서·심리 연계까지 원스톱으로 지원하여 " +
      "어떤 아이도 학력 사각지대에 놓이지 않도록 하겠습니다.",
  },
  {
    number: "02",
    icon: "🤝",
    title: "통합·포용교육 강화",
    tag: "포용교육",
    description:
      "특수·다문화·위기학생 지원을 확대하고, 전환교육까지 이어지는 원스톱 지원체계를 구축하겠습니다. " +
      "일반·특수·다문화·위기학생이 함께 성장할 수 있는 통합 교육 환경을 조성하고, " +
      "교실 안팎의 단절을 연결하는 D-Cross 통합교육을 실현하겠습니다.",
  },
  {
    number: "03",
    icon: "🔬",
    title: "AI·과학 미래교육 확대",
    tag: "미래교육",
    description:
      "AI와 과학기술을 교육을 돕는 도구로 활용하고, 지역 대학·기관과 연계한 진로교육을 강화하겠습니다. " +
      "충남과학교육원 전국 최고 수준 운영 경험을 바탕으로, AI 기반 수업 혁신과 " +
      "지역 기업·대학 연계 진로 탐색 프로그램을 확대하겠습니다.",
  },
  {
    number: "04",
    icon: "🏡",
    title: "읍·면 작은학교 활성화",
    tag: "지역균형",
    description:
      "지역 특색을 살린 교육과정과 통학·돌봄·교육과정 지원을 묶어 작은학교의 경쟁력을 높이겠습니다. " +
      "작다고 약한 것이 아닙니다. 작은학교만의 강점을 살린 특성화 교육과정을 운영하고, " +
      "통학 지원과 돌봄 연계를 강화해 지역 교육의 구심점으로 만들겠습니다.",
  },
  {
    number: "05",
    icon: "🌿",
    title: "학교 밖 교육 혁신",
    tag: "교육복지",
    description:
      "학교 밖 청소년을 포함해 지역의 다양한 교육자원을 연결하고, 어느 아이도 교육에서 이탈하지 않도록 하겠습니다. " +
      "천안시청소년재단 초대 대표이사 경험을 살려, 학교 밖 청소년 지원 체계를 체계화하고 " +
      "지역사회와 연계한 교육 생태계를 완성하겠습니다.",
  },
  {
    number: "06",
    icon: "✏️",
    title: "학교 집중 환경 조성",
    tag: "교실회복",
    description:
      "교사가 수업과 생활지도에 전념할 수 있도록 업무경감, 민원 대응, 교권 보호 체계를 강화하겠습니다. " +
      "정책은 문서가 아니라 교실에서 작동해야 합니다. 불필요한 행정 부담을 줄이고 " +
      "교사가 아이들과 함께할 수 있는 환경을 만들겠습니다.",
  },
  {
    number: "07",
    icon: "🏛️",
    title: "투명한 교육청 구현",
    tag: "신뢰행정",
    description:
      "예산·인사·사업을 투명하게 운영하고, 교육공동체가 납득할 수 있는 신뢰 행정을 만들겠습니다. " +
      "교육청은 특정 조직의 이익이 아닌 도민 전체를 위해 존재합니다. " +
      "모든 의사결정 과정을 공개하고, 결과에 책임지는 교육청을 만들겠습니다.",
  },
];

/* ============================================================
   2. 지도 데이터
   ─────────────────────────────────────────────────────────────
   [데이터 출처]
   ① 충청남도교육청·KESS·지방교육재정알리미 (학생수, 학교수, avgPerClass)
   ② 시·군 교육경비 보조금 현황 2025 (muniSubsidy, muniRank, muniTotal)
      → 시·군이 지역 학생 1인당 추가 지원하는 금액
   ─────────────────────────────────────────────────────────────
   student    : 학생수 (명)
   school     : 학교수 (개)
   avgPerClass: 학급당 평균 학생수 (명)
   muniSubsidy: 시·군 학생 1인당 교육경비 보조금 (원)  ← 지도 색상 기준
   muniRank   : 충남 내 순위 (1위=최고, 15위=최저)
   muniTotal  : 시·군 총 교육경비 보조금 (원)
   ============================================================ */
const MAP_DATA = [
  { name: "천안시 동남구", student: 42000, school:  89, avgPerClass: 24.2, muniSubsidy:   74147, muniRank: 15, muniTotal:  6345675000 },
  { name: "천안시 서북구", student: 38000, school:  78, avgPerClass: 24.7, muniSubsidy:   74147, muniRank: 15, muniTotal:  6345675000 },
  { name: "아산시",        student: 52831, school:  87, avgPerClass: 23.2, muniSubsidy:  429314, muniRank:  6, muniTotal: 22681077000 },
  { name: "공주시",        student: 18500, school:  58, avgPerClass: 19.8, muniSubsidy:  528336, muniRank:  4, muniTotal:  4934654000 },
  { name: "보령시",        student: 13200, school:  52, avgPerClass: 18.5, muniSubsidy:  559847, muniRank:  3, muniTotal:  4425028000 },
  { name: "서산시",        student: 21800, school:  68, avgPerClass: 21.3, muniSubsidy:  243486, muniRank:  9, muniTotal:  4925480000 },
  { name: "논산시",        student: 15600, school:  62, avgPerClass: 19.2, muniSubsidy:  264654, muniRank:  7, muniTotal:  2879174000 },
  { name: "계룡시",        student:  5800, school:  18, avgPerClass: 22.1, muniSubsidy:  176395, muniRank: 12, muniTotal:  1120812000 },
  { name: "당진시",        student: 23400, school:  72, avgPerClass: 21.9, muniSubsidy:  237856, muniRank: 10, muniTotal:  5022821000 },
  { name: "금산군",        student:  6900, school:  34, avgPerClass: 14.8, muniSubsidy:  600108, muniRank:  2, muniTotal:  2169390000 },
  { name: "부여군",        student:  9200, school:  45, avgPerClass: 15.6, muniSubsidy:  225750, muniRank: 11, muniTotal:   905032000 },
  { name: "서천군",        student:  7500, school:  38, avgPerClass: 14.2, muniSubsidy:  258259, muniRank:  8, muniTotal:   873172000 },
  { name: "청양군",        student:  5100, school:  28, avgPerClass: 12.8, muniSubsidy: 1108933, muniRank:  1, muniTotal:  2004950000 },
  { name: "홍성군",        student: 13500, school:  54, avgPerClass: 17.9, muniSubsidy:  110506, muniRank: 14, muniTotal:  1294800000 },
  { name: "예산군",        student: 11200, school:  48, avgPerClass: 16.5, muniSubsidy:  148430, muniRank: 13, muniTotal:  1149000000 },
  { name: "태안군",        student:  8900, school:  42, avgPerClass: 15.8, muniSubsidy:  446510, muniRank:  5, muniTotal:  1772200000 },
];

/* 충남 15개 시·군 평균 학생 1인당 지원금 (원) */
const MUNI_AVG = 360835;
/* 최고값 (청양군) */
const MUNI_MAX = 1108933;

/* 지역별 권장 정책
   muniSubsidy 구간별로 달리 표시 */
const REGION_POLICIES = {
  high: [   /* 50만원 이상 */
    "높은 1인당 지원을 학교 경쟁력으로 연결",
    "작은학교 특성화 교육과정 강화",
    "지역-학교 연계 프로그램 확대",
    "지원 효율성 모니터링 체계 구축",
  ],
  mid: [    /* 20~50만원 */
    "교육재정 배분 개선으로 격차 완화",
    "지역 특성 맞춤 교육 투자 확대",
    "학교-지자체 협력 강화",
    "학생 1인당 지원 수준 단계적 향상",
  ],
  low: [    /* 20만원 미만 */
    "지역 내 교육투자 대폭 확대 필요",
    "도시 집중 과밀 해소와 재정 형평성 동시 추진",
    "교육청-지자체 협력 예산 신설",
    "균형 교육재정 배분 체계 전면 개선",
  ],
};

/* ============================================================
   3. 유틸 함수
   ============================================================ */
function normalize(s) {
  return s.replace(/\s/g, "");
}

function calcStatus(d) {
  /*
   * [지도 색상 기준] 시·군 학생 1인당 교육경비 보조금
   * ─────────────────────────────────────────────
   * high : 500,000원 이상  → 민트   (충남 1~4위권)
   * mid  : 200,000~499,999원 → 라이트그린 (충남 5~11위권)
   * low  : 200,000원 미만  → 옐로우 (충남 12~15위 — 주목 필요)
   * ─────────────────────────────────────────────
   * ※ 수치 기준을 바꾸려면 아래 숫자를 수정하세요.
   */
  if (d.muniSubsidy >= 500000) return "high";
  if (d.muniSubsidy >= 200000) return "mid";
  return "low";
}

function statusLabel(status) {
  return {
    high: "지원 상위",
    mid:  "지원 중위",
    low:  "지원 하위 ⚠",
  }[status] || "";
}

function mapColor(status) {
  /*
   * [지도 색상 변경 안내]
   * style.css :root 의 --map-high / --map-mid / --map-low 를 수정하세요.
   */
  const root = getComputedStyle(document.documentElement);
  return {
    high: root.getPropertyValue("--map-high").trim() || "#A8E1C2",
    mid:  root.getPropertyValue("--map-mid").trim()  || "#CBE0A0",
    low:  root.getPropertyValue("--map-low").trim()  || "#E1DB00",
  }[status] || "#DBDDBA";
}

/* 격차 비율: 충남 평균 대비 퍼센트 */
function gapVsAvg(muniSubsidy) {
  return Math.round((muniSubsidy / MUNI_AVG) * 100);
}
/* 막대 너비: 최고값 대비 퍼센트 */
function barWidth(muniSubsidy) {
  return Math.min(100, Math.round((muniSubsidy / MUNI_MAX) * 100));
}

function formatNumber(n) {
  return n.toLocaleString("ko-KR");
}

function formatBudget(n) {
  const eok = Math.round(n / 100000000);
  return `${formatNumber(eok)}억 원`;
}

/* ============================================================
   4. 7대 정책 카드 렌더링
   ============================================================ */
function renderPolicies() {
  const grid = document.getElementById("policiesGrid");
  if (!grid) return;

  POLICIES.forEach((p, i) => {
    const card = document.createElement("div");
    card.className = "policy-card fade-up";
    card.dataset.index = i;
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-label", `${p.title} 자세히 보기`);

    card.innerHTML = `
      <div class="policy-number">${p.number}</div>
      <span class="policy-icon-wrap">${p.icon}</span>
      <div class="policy-title">${p.title}</div>
      <span class="policy-tag-badge">${p.tag}</span>
      <span class="policy-hint">클릭하여 자세히 보기</span>
    `;

    card.addEventListener("click", () => openModal(i));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal(i);
      }
    });

    grid.appendChild(card);
  });
}

/* ============================================================
   5. 팝업 모달 제어
   ============================================================ */
function openModal(index) {
  const p = POLICIES[index];
  const overlay = document.getElementById("policyModal");

  document.getElementById("modalNumber").textContent = p.number;
  document.getElementById("modalTag").textContent = p.tag;
  document.getElementById("modalIcon").textContent = p.icon;
  document.getElementById("modalTitle").textContent = p.title;
  document.getElementById("modalDesc").textContent = p.description;

  overlay.classList.add("active");
  document.body.style.overflow = "hidden";

  // 닫기 버튼에 포커스
  document.getElementById("modalClose").focus();
}

function closeModal() {
  const overlay = document.getElementById("policyModal");
  overlay.classList.remove("active");
  document.body.style.overflow = "";
}

function initModal() {
  const overlay = document.getElementById("policyModal");
  const closeBtn = document.getElementById("modalClose");

  closeBtn.addEventListener("click", closeModal);

  // 오버레이 배경 클릭 시 닫기
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });

  // ESC 키로 닫기
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
}

/* ============================================================
   6. Leaflet 지도 초기화
   ============================================================ */
function initMap() {
  const mapEl = document.getElementById("map");
  if (!mapEl) return;

  // ── 지도 생성 ────────────────────────────
  const map = L.map("map", {
    zoomControl: true,
    scrollWheelZoom: false, // 스크롤 휠 줌 비활성 (페이지 스크롤과 충돌 방지)
  }).setView([36.5, 126.8], 7);

  /*
   * [타일 레이어 안내]
   * 아래 tileLayer URL을 변경하면 지도 스타일을 바꿀 수 있습니다.
   * 현재: CartoDB Light (밝고 깔끔한 스타일)
   * 대안1 - 기본: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
   * 대안2 - 어두운: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
   * 대안3 - 밝은톤 : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
   * 대안4 - 중간톤: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
   */
  L.tileLayer(
    'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    {
      attribution: "© OpenStreetMap © CartoDB",
      maxZoom: 18,
    }
  ).addTo(map);

  // ── 데이터 인덱싱 ───────────────────────
  const dataMap = {};
  MAP_DATA.forEach((d) => {
    dataMap[normalize(d.name)] = d;
  });

  // ── GeoJSON 로드 ─────────────────────────
  /*
   * [GeoJSON 소스]
   * southkorea-maps GitHub 저장소에서 행정구역 경계 데이터를 가져옵니다.
   * 네트워크 오류 시 지도 폴리곤이 표시되지 않을 수 있습니다.
   */
  const GEOJSON_URL =
    "https://raw.githubusercontent.com/southkorea/southkorea-maps/master/kostat/2018/json/skorea-municipalities-2018-geo.json";

  fetch(GEOJSON_URL)
    .then((res) => {
      if (!res.ok) throw new Error("GeoJSON 로드 실패");
      return res.json();
    })
    .then((geo) => {
      // 충남 16개 시·군 필터링
      const features = geo.features.filter((f) => {
        const n = normalize(f.properties.name || "");
        return Object.prototype.hasOwnProperty.call(dataMap, n);
      });

      const layer = L.geoJSON(features, {
        style: (f) => {
          const n = normalize(f.properties.name);
          const d = dataMap[n];
          if (!d) return { fillOpacity: 0 };
          const status = calcStatus(d);
          return {
            /*
             * [폴리곤 스타일 안내]
             * fillColor : 지역 상태에 따라 자동 결정됩니다 (mapColor 함수 참조)
             * fillOpacity: 0.0 ~ 1.0 사이 값으로 투명도 조절
             * color     : 경계선 색상
             * weight    : 경계선 두께 (px)
             */
            fillColor: mapColor(status),
            fillOpacity: 0.6,
            color: "#ffffff",
            weight: 1.5,
          };
        },
        onEachFeature: (f, l) => {
          const n = normalize(f.properties.name);
          const d = dataMap[n];
          if (!d) return;

          const status = calcStatus(d);
          const gap    = gapVsAvg(d.muniSubsidy);
          const gapTxt = gap >= 100
            ? `<span style="color:#1A5C3A">평균의 ${gap}%</span>`
            : `<span style="color:#5A4500">평균의 ${gap}% ▼</span>`;

          // 툴팁 (hover 시 표시)
          l.bindTooltip(
            `<div style="font-family:'Noto Sans KR',sans-serif;min-width:160px;line-height:1.7">
              <strong style="font-size:0.92rem">${d.name}</strong><br/>
              <span style="font-size:0.8rem;color:#555">시·군 학생 1인당 지원금</span><br/>
              <strong style="font-size:1rem;color:#1E3A8A">${formatNumber(d.muniSubsidy)}원</strong><br/>
              <span style="font-size:0.78rem">충남 ${d.muniRank}위 / 15위 &nbsp;·&nbsp; ${gapTxt}</span>
            </div>`,
            { sticky: true, className: "map-tooltip" }
          );

          // 호버 효과
          l.on("mouseover", () => {
            l.setStyle({ fillOpacity: 0.95, weight: 2.5 });
          });
          l.on("mouseout", () => {
            l.setStyle({ fillOpacity: 0.75, weight: 1.5 });
          });

          // 클릭 → 패널 업데이트
          l.on("click", () => {
            updateMapPanel(d, status);

            // 클릭된 지역 강조
            layer.resetStyle();
            l.setStyle({ fillOpacity: 1, weight: 3, color: "#ffffff" });
          });
        },
      }).addTo(map);

      map.fitBounds(layer.getBounds(), { padding: [20, 20] });
    })
    .catch((err) => {
      console.error("지도 데이터 로드 오류:", err);
      const mapEl = document.getElementById("map");
      if (mapEl) {
        mapEl.innerHTML =
          '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#6B7280;font-size:0.9rem;">지도 데이터를 불러오는 중입니다...</div>';
      }
    });
}

/* ============================================================
   7. 지역 정보 패널 업데이트
   ============================================================ */
function updateMapPanel(d, status) {
  const emptyEl = document.getElementById("mapPanelEmpty");
  const dataEl  = document.getElementById("mapPanelData");
  if (!emptyEl || !dataEl) return;

  /* ── 제목 & 상태 뱃지 ── */
  document.getElementById("panelTitle").textContent = d.name;

  const statusBadge = document.getElementById("panelStatus");
  statusBadge.textContent = statusLabel(status);
  statusBadge.className   = `panel-status-badge ${status}`;

  /* ── 핵심 수치 ── */
  document.getElementById("panelStudents").textContent  = `${formatNumber(d.student)}명`;
  document.getElementById("panelSchools").textContent   = `${d.school}개교`;
  document.getElementById("panelPerClass").textContent  = `${d.avgPerClass.toFixed(1)}명`;

  /* ── 시·군 지원금 영역 ── */
  document.getElementById("panelMuniAmount").textContent = `${formatNumber(d.muniSubsidy)}원`;

  /* 순위 뱃지 색상 */
  const rankEl = document.getElementById("panelMuniRank");
  rankEl.textContent = `충남 ${d.muniRank}위 / 15위`;
  rankEl.className   = `muni-rank-badge rank-${status}`;

  /* 평균 대비 퍼센트 */
  const gap    = gapVsAvg(d.muniSubsidy);
  const gapEl  = document.getElementById("panelMuniGap");
  const arrow  = gap >= 100 ? "▲" : "▼";
  const gapCls = gap >= 100 ? "gap-positive" : "gap-negative";
  gapEl.innerHTML = `<span class="${gapCls}">${arrow} 충남 평균의 ${gap}%</span>
    <small>(평균 ${formatNumber(MUNI_AVG)}원)</small>`;

  /* 비교 막대 */
  const barEl  = document.getElementById("panelMuniBar");
  const barFill = document.getElementById("panelMuniBarFill");
  const w      = barWidth(d.muniSubsidy);
  barFill.style.width = w + "%";
  barFill.className   = `bar-fill bar-${status}`;
  document.getElementById("panelMuniBarMax").textContent =
    `최고 ${formatNumber(MUNI_MAX)}원 (청양군)`;

  /* 격차 메시지 */
  const msgEl = document.getElementById("panelMuniMsg");
  if (status === "low") {
    const times = (MUNI_MAX / d.muniSubsidy).toFixed(1);
    msgEl.innerHTML =
      `<span class="msg-warn">⚠ 최고 지역(청양군)의 <strong>${Math.round(100 * d.muniSubsidy / MUNI_MAX)}%</strong> 수준입니다.<br/>` +
      `청양군보다 <strong>${times}배</strong> 적게 받고 있습니다.</span>`;
  } else if (status === "mid") {
    msgEl.innerHTML =
      `<span class="msg-mid">학생 1인당 지원이 충남 평균 수준입니다.<br/>격차 해소를 위한 추가 노력이 필요합니다.</span>`;
  } else {
    msgEl.innerHTML =
      `<span class="msg-good">학생 1인당 지원이 충남 상위권입니다.<br/>지원이 실제 교육 성과로 이어지는지 점검이 필요합니다.</span>`;
  }

  /* ── 권장 정책 ── */
  const policiesList = document.getElementById("panelPolicies");
  policiesList.innerHTML = "";
  REGION_POLICIES[status].forEach((policy) => {
    const li = document.createElement("li");
    li.textContent = policy;
    policiesList.appendChild(li);
  });

  /* ── 전환 애니메이션 ── */
  emptyEl.style.display  = "none";
  dataEl.style.display   = "block";
  dataEl.style.opacity   = "0";
  dataEl.style.transform = "translateY(8px)";
  requestAnimationFrame(() => {
    dataEl.style.transition = "opacity 0.3s ease, transform 0.3s ease";
    dataEl.style.opacity    = "1";
    dataEl.style.transform  = "translateY(0)";
  });
}

/* ============================================================
   8. 햄버거 메뉴
   ============================================================ */
function initNav() {
  const hamburger = document.getElementById("hamburger");
  const navMenu   = document.getElementById("navMenu");

  if (!hamburger || !navMenu) return;

  hamburger.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    hamburger.classList.toggle("open", isOpen);
    hamburger.setAttribute("aria-expanded", isOpen);
  });

  // 메뉴 항목 클릭 시 닫기
  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      hamburger.classList.remove("open");
      hamburger.setAttribute("aria-expanded", false);
    });
  });

  // 스크롤 시 헤더 그림자 강화
  window.addEventListener("scroll", () => {
    const header = document.getElementById("site-header");
    if (header) {
      header.style.boxShadow = window.scrollY > 10
        ? "0 4px 20px rgba(0,0,0,0.1)"
        : "0 2px 8px rgba(0,0,0,0.06)";
    }
  });
}

/* ============================================================
   9. 스크롤 진입 애니메이션 (Intersection Observer)
   ============================================================ */
function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  // 섹션 컨테이너 하위 주요 요소에 fade-up 부여
  const targets = document.querySelectorAll(
    ".info-card, .issue-card, .regional-card, .timeline-item, .vision-point, .issue-point-item"
  );
  targets.forEach((el, i) => {
    el.classList.add("fade-up");
    el.style.transitionDelay = `${(i % 4) * 70}ms`;
    observer.observe(el);
  });

  // 섹션 타이틀 & 설명
  document.querySelectorAll(".section-title, .section-desc, .section-label").forEach((el) => {
    el.classList.add("fade-up");
    observer.observe(el);
  });

  // 이미 fade-up 클래스가 있는 요소 (policy cards) 처리
  document.querySelectorAll(".fade-up").forEach((el) => {
    observer.observe(el);
  });
}

/* ============================================================
   10. 참여 폼 제출
   ============================================================ */
function initForm() {
  const form = document.getElementById("participationForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector(".form-submit");
    const successEl = document.getElementById("formSuccess");

    submitBtn.disabled = true;
    submitBtn.textContent = "전송 중...";

    /*
     * [Google Apps Script 연동 안내]
     * 아래 FORM_URL 변수에 배포된 Apps Script Web App URL을 입력하세요.
     * 예) const FORM_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
     * URL이 없으면 로컬 처리로 대체됩니다.
     */
    const FORM_URL = 'https://script.google.com/macros/s/AKfycbwXxb1ZBoHvNOHLwxQ5PHxHtBsjjb8tQ5vlKT7UYF8rpTpWauW6oE7NoApXca1evRDEQw/exec'; // ← Google Apps Script URL 입력

    const data = Object.fromEntries(new FormData(form).entries());
    data.timestamp = new Date().toLocaleString("ko-KR");

    try {
      if (FORM_URL) {
        await fetch(FORM_URL, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      }
      // 성공 처리
      form.reset();
      successEl.classList.add("show");
      setTimeout(() => successEl.classList.remove("show"), 5000);
    } catch (err) {
      console.error("폼 제출 오류:", err);
      alert("전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "의견 보내기";
    }
  });
}

/* ============================================================
   11. 부드러운 스크롤 (iOS 대응 포함)
   ============================================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const targetId = anchor.getAttribute("href");
      if (targetId === "#") return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const headerH = document.getElementById("site-header")?.offsetHeight || 64;
      const top = target.getBoundingClientRect().top + window.pageYOffset - headerH - 8;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });
}

/* ============================================================
   12. DOMContentLoaded - 초기화
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  renderPolicies();   // 7대 정책 카드 렌더링
  initModal();        // 팝업 모달
  initNav();          // 햄버거 메뉴 & 헤더
  initMap();          // Leaflet 지도
  initForm();         // 참여 폼
  initScrollAnimations(); // 스크롤 진입 애니메이션
  initSmoothScroll(); // 부드러운 스크롤
});
