/* ==========================================================================
   TOXA PRINT MARKET — INTERAconst productsTIVE JAVASCRIPT ENGINE (2026 EDITION)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initCalculator();
    initCatalogFilters();
    initSearchFilter();
    initCartSystem();
    initNavbarScroll();
});

/* --------------------------------------------------------------------------
   1. PRINTER FINDER QUIZ LOGIC (AQLLI QUIZ TIZIMI)
   -------------------------------------------------------------------------- */
let quizAnswers = {};

function selectQuizOpt(step, val) {
    quizAnswers[step] = val;
    const currentStepEl = document.querySelector(`.quiz-step[data-step="${step}"]`);
    if (currentStepEl) {
        currentStepEl.classList.remove('active');
    }

    if (step === 1) {
        const nextStep = document.querySelector(`.quiz-step[data-step="2"]`);
        if (nextStep) nextStep.classList.add('active');
    } else if (step === 2) {
        const resultEl = document.getElementById('quizResult');
        if (resultEl) {
            resultEl.style.display = 'block';
            renderQuizResult();
        }
    }
}

function renderQuizResult() {
    const output = document.getElementById('recommendationOutput');
    if (!output) return;

    let title = "Epson EcoTank L3250 Wi-Fi";
    let desc = "Sizning ehtiyojingiz uchun eng tejamkor, tezkor va ishonchli variant!";
    let price = "2 450 000 UZS";
    let img = "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&q=80&w=500";

    if (quizAnswers[1] === 'studio' || quizAnswers[2] === 'high') {
        title = "Canon PIXMA G6040 Duplex CISS";
        desc = "Yuqori sifatli foto chop etish va katta hajm uchun professional variant.";
        price = "3 150 000 UZS";
    } else if (quizAnswers[1] === 'office' && quizAnswers[2] === 'mid') {
        title = "HP LaserJet Enterprise M404dn";
        desc = "Ofis uchun yuqori tezlikdagi monoxrom lazerli printer.";
        price = "3 900 000 UZS";
    }

    output.innerHTML = `
        <div class="quiz-res-flex">
            <img src="${img}" alt="${title}">
            <div>
                <h3>${title}</h3>
                <p>${desc}</p>
                <div class="q-price">${price}</div>
                <button class="btn btn-primary-glow" onclick="openQuickCheckout('${title}', '${price}')">
                    <i class="fa-solid fa-bag-shopping"></i> Chegirma Bilan Buyurtma Berish
                </button>
            </div>
        </div>
    `;
}

/* --------------------------------------------------------------------------
   2. PRINT COST CALCULATOR (TEJAMKORLIK KALKULYATORI)
   -------------------------------------------------------------------------- */
function initCalculator() {
    const pageSlider = document.getElementById('pageSlider');
    const sliderValue = document.getElementById('sliderValue');
    const printTypeSelect = document.getElementById('printTypeSelect');
    const oldCostText = document.getElementById('oldCostText');
    const newCostText = document.getElementById('newCostText');
    const savingsText = document.getElementById('savingsText');

    if (!pageSlider || !printTypeSelect) return;

    function updateCalculator() {
        const pages = parseInt(pageSlider.value);
        if (sliderValue) sliderValue.innerText = pages.toLocaleString();

        let oldRate = 250; 
        let newRate = 25;  

        if (printTypeSelect.value === 'color') {
            oldRate = 800;
            newRate = 80;
        } else if (printTypeSelect.value === 'photo') {
            oldRate = 2500;
            newRate = 320;
        }

        const oldMonthly = pages * oldRate;
        const newMonthly = pages * newRate;
        const annualSavings = (oldMonthly - newMonthly) * 12;

        if (oldCostText) oldCostText.innerText = oldMonthly.toLocaleString() + ' UZS';
        if (newCostText) newCostText.innerText = newMonthly.toLocaleString() + ' UZS';
        if (savingsText) savingsText.innerText = annualSavings.toLocaleString() + ' UZS';
    }

    pageSlider.addEventListener('input', updateCalculator);
    printTypeSelect.addEventListener('change', updateCalculator);
    updateCalculator();
}

/* --------------------------------------------------------------------------
   3. CATALOG FILTERING & SEARCH (KATALOG FILTRI VA QIDIRUV)
   -------------------------------------------------------------------------- */
function initCatalogFilters() {
    const filterBtns = document.querySelectorAll('.filter-chip');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
}

function initSearchFilter() {
    const searchInput = document.querySelector('.search-box input');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        const cards = document.querySelectorAll('.product-card');

        cards.forEach(card => {
            const title = card.querySelector('.product-title')?.innerText.toLowerCase() || '';
            const cat = card.querySelector('.product-cat')?.innerText.toLowerCase() || '';

            if (title.includes(query) || cat.includes(query)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

/* --------------------------------------------------------------------------
   4. SHOPPING CART SYSTEM (SAVATCHA HISOBLAGICHI)
   -------------------------------------------------------------------------- */
let cartCount = 2;

function initCartSystem() {
    const addBtns = document.querySelectorAll('.add-cart-btn, .add-to-cart');
    const badge = document.querySelector('.cart-count, .cart-btn .badge');

    addBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            cartCount++;
            if (badge) badge.innerText = cartCount;

            // Animatsiya berish
            btn.style.transform = 'scale(1.2)';
            setTimeout(() => {
                btn.style.transform = 'scale(1)';
            }, 200);
        });
    });
}

/* --------------------------------------------------------------------------
   5. QUICK CHECKOUT MODAL CONTROLS (1-CLICK BUYURTMA)
   -------------------------------------------------------------------------- */
function openQuickCheckout(itemName, itemPrice) {
    const modal = document.getElementById('checkoutModal');
    const nameEl = document.getElementById('checkoutItemName');
    const priceEl = document.getElementById('checkoutItemPrice');

    if (nameEl) nameEl.innerText = itemName;
    if (priceEl) priceEl.innerText = itemPrice;

    if (modal) modal.classList.add('open');
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('open');
}

function submitQuickOrder(event) {
    event.preventDefault();
    alert('Rahmat! Buyurtmangiz qabul qilindi. Operatorimiz siz bilan 5 daqiqada bog‘lanadi.');
    closeModal('checkoutModal');
}

// Modal oynadan tashqariga bosilganda yopilishi
window.addEventListener('click', (e) => {
    const modal = document.getElementById('checkoutModal');
    if (e.target === modal) {
        closeModal('checkoutModal');
    }
});

/* --------------------------------------------------------------------------
   6. NAVBAR SCROLL EFFECT (BLUR NAVBAR)
   -------------------------------------------------------------------------- */
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.8)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });
}