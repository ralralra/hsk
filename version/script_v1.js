// ========================================
// 한상경 충남교육감 예비후보 웹사이트 JavaScript
// ========================================

// Google Apps Script URL (사용자가 설정해야 함)
const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwXxb1ZBoHvNOHLwxQ5PHxHtBsjjb8tQ5vlKT7UYF8rpTpWauW6oE7NoApXca1evRDEQw/exec';

// ========================================
// 부드러운 스크롤 (앵커 링크)
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// 설문조사 폼 제출
// ========================================
document.getElementById('surveyForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const loadingEl = document.getElementById('loading');
    const successEl = document.getElementById('successMessage');
    const submitBtn = this.querySelector('.submit-btn');
    
    // 로딩 시작
    loadingEl.style.display = 'block';
    submitBtn.disabled = true;
    successEl.classList.remove('show');

    // 폼 데이터 수집
    const formData = new FormData(this);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        if (key === 'urgent_issues') {
            // 체크박스는 배열로 수집
            if (!data[key]) data[key] = [];
            data[key].push(value);
        } else {
            data[key] = value;
        }
    }

    // 체크박스 배열을 문자열로 변환
    if (data.urgent_issues && Array.isArray(data.urgent_issues)) {
        data.urgent_issues = data.urgent_issues.join(', ');
    }

    // 타임스탬프 추가
    data.timestamp = new Date().toLocaleString('ko-KR');

    try {
        // Google Apps Script로 데이터 전송
        const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        // 성공 메시지 표시
        loadingEl.style.display = 'none';
        successEl.classList.add('show');
        
        // 폼 초기화
        this.reset();
        
        // 3초 후 성공 메시지 숨김
        setTimeout(() => {
            successEl.classList.remove('show');
        }, 5000);

    } catch (error) {
        console.error('제출 오류:', error);
        alert('설문조사 제출 중 오류가 발생했습니다. 다시 시도해주세요.');
        loadingEl.style.display = 'none';
    } finally {
        submitBtn.disabled = false;
    }
});

// ========================================
// 페이지 로드 시 실행
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('한상경 충남교육감 웹사이트 로드 완료');
    
    // 스크롤 애니메이션 효과 (옵션)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // 모든 섹션에 애니메이션 적용
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});

// ========================================
// 모바일 메뉴 토글 (옵션)
// ========================================
const createMobileMenu = () => {
    const nav = document.querySelector('nav');
    const menu = document.querySelector('.nav-menu');
    
    if (window.innerWidth <= 768) {
        const menuToggle = document.createElement('button');
        menuToggle.textContent = '☰';
        menuToggle.style.cssText = 'background: none; border: none; color: white; font-size: 2rem; cursor: pointer;';
        
        menuToggle.addEventListener('click', () => {
            menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
        });
        
        nav.insertBefore(menuToggle, menu);
    }
};

// 창 크기 변경 시 메뉴 체크
window.addEventListener('resize', createMobileMenu);
createMobileMenu();
