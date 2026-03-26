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
   ============================================================ */
const MAP_DATA = [
  { name: "천안시 동남구", student: 30500, school: 78,  classCount: 1280, teacher: 1820, budget: 21000000000 },
  { name: "천안시 서북구", student: 48200, school: 96,  classCount: 1910, teacher: 2640, budget: 33500000000 },
  { name: "아산시",        student: 45100, school: 92,  classCount: 1730, teacher: 2510, budget: 30100000000 },
  { name: "공주시",        student: 11200, school: 49,  classCount:  510, teacher:  760, budget: 11800000000 },
  { name: "보령시",        student:  8900, school: 45,  classCount:  430, teacher:  690, budget: 10900000000 },
  { name: "서산시",        student: 16800, school: 58,  classCount:  730, teacher: 1110, budget: 15300000000 },
  { name: "논산시",        student: 10300, school: 47,  classCount:  470, teacher:  760, budget: 11200000000 },
  { name: "계룡시",        student:  6300, school: 19,  classCount:  260, teacher:  360, budget:  5200000000 },
  { name: "당진시",        student: 18700, school: 62,  classCount:  810, teacher: 1170, budget: 14900000000 },
  { name: "금산군",        student:  4200, school: 28,  classCount:  220, teacher:  360, budget:  4900000000 },
  { name: "부여군",        student:  5200, school: 34,  classCount:  250, teacher:  420, budget:  6100000000 },
  { name: "서천군",        student:  4100, school: 29,  classCount:  210, teacher:  340, budget:  4800000000 },
  { name: "청양군",        student:  2500, school: 22,  classCount:  140, teacher:  230, budget:  3700000000 },
  { name: "홍성군",        student:  9900, school: 42,  classCount:  430, teacher:  710, budget: 10100000000 },
  { name: "예산군",        student:  6900, school: 35,  classCount:  310, teacher:  540, budget:  7600000000 },
  { name: "태안군",        student:  4700, school: 31,  classCount:  230, teacher:  390, budget:  5800000000 },
];

/* 강제 과밀 지역 (공식 지정) */
const FORCE_OVERFULL = new Set(["천안시동남구", "천안시서북구", "아산시"]);

/* 지역별 권장 정책 */
const REGION_POLICIES = {
  overfull: [
    "학급 과밀 완화 긴급 대책 시행",
    "학교 신설·증설 조기 추진 검토",
    "학군 및 통학 여건 재조정",
    "교사 및 지원 인력 보강",
  ],
  normal: [
    "현행 교육 환경 질적 개선",
    "교사 역량 강화 프로그램 운영",
    "교육과정 다양화 지원",
    "학생 맞춤형 진로 지원 확대",
  ],
  decrease: [
    "작은학교 특성화 교육과정 운영",
    "통학 지원 및 돌봄 연계 확대",
    "AI·원격교육 활용 수업 지원",
    "지역 연계 교육 프로그램 확대",
  ],
};

/* ============================================================
   3. 유틸 함수
   ============================================================ */
function normalize(s) {
  return s.replace(/\s/g, "");
}

function calcStatus(d) {
  if (FORCE_OVERFULL.has(normalize(d.name))) return "overfull";
  const ratio = d.student / d.classCount;
  if (ratio >= 28) return "overfull";
  if (ratio <= 20) return "decrease";
  return "normal";
}

function statusLabel(status) {
  return { overfull: "과밀지역", normal: "적정지역", decrease: "학생감소 지역" }[status];
}

function mapColor(status) {
  /*
   * 지도 폴리곤 색상
   * style.css의 :root 변수와 일치시키려면 아래 값을 같이 변경하세요.
   * ──────────────────────────────────────
   * 과밀지역  ← getComputedStyle 읽기
   * 적정지역  ← getComputedStyle 읽기
   * 학생감소  ← getComputedStyle 읽기
   */
  const root = getComputedStyle(document.documentElement);
  const colors = {
    overfull: root.getPropertyValue("--map-overfull").trim() || "#E05555",
    normal:   root.getPropertyValue("--map-normal").trim()   || "#E8A020",
    decrease: root.getPropertyValue("--map-decrease").trim() || "#4A7FD4",
  };
  return colors[status] || "#999";
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
  }).setView([36.5, 126.8], 9);

  /*
   * [타일 레이어 안내]
   * 아래 tileLayer URL을 변경하면 지도 스타일을 바꿀 수 있습니다.
   * 현재: CartoDB Light (밝고 깔끔한 스타일)
   * 대안1 - 기본: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
   * 대안2 - 어두운: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
   * 대안3 - 중간톤: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
   */
  L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
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
            fillOpacity: 0.75,
            color: "#ffffff",
            weight: 1.5,
          };
        },
        onEachFeature: (f, l) => {
          const n = normalize(f.properties.name);
          const d = dataMap[n];
          if (!d) return;

          const status = calcStatus(d);

          // 툴팁 (hover 시 표시)
          l.bindTooltip(
            `<strong>${d.name}</strong><br><span style="color:${mapColor(status)}">${statusLabel(status)}</span>`,
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
            l.setStyle({ fillOpacity: 1, weight: 3, color: "#1E3A8A" });
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

  // 값 채우기
  document.getElementById("panelTitle").textContent = d.name;

  const statusBadge = document.getElementById("panelStatus");
  statusBadge.textContent = statusLabel(status);
  statusBadge.className = `panel-status-badge ${status}`;

  document.getElementById("panelStudents").textContent = `${formatNumber(d.student)}명`;
  document.getElementById("panelSchools").textContent  = `${d.school}개교`;
  document.getElementById("panelPerClass").textContent = `${(d.student / d.classCount).toFixed(1)}명`;
  document.getElementById("panelTeachers").textContent = `${formatNumber(d.teacher)}명`;
  document.getElementById("panelBudget").textContent   = formatBudget(d.budget);

  // 권장 정책 목록
  const policiesList = document.getElementById("panelPolicies");
  policiesList.innerHTML = "";
  REGION_POLICIES[status].forEach((policy) => {
    const li = document.createElement("li");
    li.textContent = policy;
    policiesList.appendChild(li);
  });

  // 전환 애니메이션
  emptyEl.style.display = "none";
  dataEl.style.display  = "block";
  dataEl.style.opacity  = "0";
  dataEl.style.transform = "translateY(8px)";
  requestAnimationFrame(() => {
    dataEl.style.transition = "opacity 0.3s ease, transform 0.3s ease";
    dataEl.style.opacity  = "1";
    dataEl.style.transform = "translateY(0)";
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
    const FORM_URL = ""; // ← Google Apps Script URL 입력

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
