/**
 * 株式会社サンコーネーム
 * 就労継続支援B型事業所ホームページ
 * JavaScript - Seasonal Harmony
 */

// DOMコンテンツがロードされた時に実行
document.addEventListener("DOMContentLoaded", function () {
  // 文字分割アニメーション用の初期化
  Splitting();

  // 季節切り替え機能
  initSeasonSwitch();

  // スクロールアニメーション
  initScrollReveal();

  // スムーススクロールの初期化
  initSmoothScroll();

  // Swiperスライダーの初期化
  initSwipers();

  // ヘッダーのスクロール制御
  initHeaderScroll();

  // ハンバーガーメニューの制御
  initMobileMenu();

  // アコーディオンの制御
  initAccordion();

  // アクティビティフィルター
  initActivityFilter();

  // ページトップへ戻るボタン
  initPageTopButton();
});

/**
 * 季節切替機能
 */
function initSeasonSwitch() {
  const seasonBtns = document.querySelectorAll(".season-switch__btn");
  const body = document.body;
  const currentSeason = body.getAttribute("data-season") || "spring";

  // 現在の季節を設定
  body.setAttribute("data-season", currentSeason);

  // 対応するボタンをアクティブに
  document
    .querySelector(`.season-switch__btn[data-season="${currentSeason}"]`)
    .classList.add("is-active");

  // 季節ボタンのクリックイベント
  seasonBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const season = this.getAttribute("data-season");
      body.setAttribute("data-season", season);

      // ボタンのアクティブ状態を更新
      seasonBtns.forEach((b) => b.classList.remove("is-active"));
      this.classList.add("is-active");

      // 季節に応じたパターンエフェクト
      animateSeasonChange(season);
    });
  });
}

/**
 * 季節変更時のアニメーション
 */
function animateSeasonChange(season) {
  // 季節に応じたカラー
  let seasonColor;
  switch (season) {
    case "spring":
      seasonColor = "#F8B7CD";
      break;
    case "summer":
      seasonColor = "#91C7B1";
      break;
    case "autumn":
      seasonColor = "#E8846B";
      break;
    case "winter":
      seasonColor = "#B6D9ED";
      break;
    default:
      seasonColor = "#F8B7CD";
  }

  // Anime.jsでトランジションアニメーション
  anime({
    targets: ".hero__pattern",
    opacity: [0.1, 0.2, 0.1],
    scale: [0.98, 1.02, 1],
    duration: 1000,
    easing: "easeInOutQuad",
  });

  // 背景パターンのエフェクト
  const floatingItems = document.querySelectorAll(".float-animation");
  floatingItems.forEach((item) => {
    anime({
      targets: item,
      translateY: [10, -10],
      rotate: ["-2deg", "2deg"],
      duration: 1000,
      easing: "easeInOutQuad",
      complete: function () {
        anime({
          targets: item,
          translateY: 0,
          rotate: 0,
          duration: 800,
          easing: "easeOutQuad",
        });
      },
    });
  });
}

/**
 * ScrollRevealの初期化
 */
function initScrollReveal() {
  const sr = ScrollReveal({
    origin: "bottom",
    distance: "30px",
    duration: 800,
    delay: 100,
    easing: "ease-out",
    reset: false,
  });

  // 共通の表示アニメーション
  sr.reveal(".section__title", { delay: 100 });
  sr.reveal(".section__lead", { delay: 200 });

  // ストーリーセクション
  sr.reveal(".story__item", { interval: 300 });

  // 特徴セクション
  sr.reveal(".feature-card", { interval: 150 });
  sr.reveal(".achievement__item", { interval: 200, delay: 300 });

  // スタッフセクション
  sr.reveal(".staff__header", { delay: 100 });
  sr.reveal(".staff__message", { delay: 200 });
  sr.reveal(".staff-card", { interval: 150, delay: 300 });

  // 活動報告セクション
  sr.reveal(".activity-item", { interval: 150 });

  // アクセスセクション
  sr.reveal(".access__map", { delay: 100 });
  sr.reveal(".access__item", { interval: 150, delay: 200 });

  // 募集要項セクション
  sr.reveal(".accordion__item", { interval: 100 });

  // コンタクトセクション
  sr.reveal(".contact__form", { delay: 100 });
  sr.reveal(".contact-method", { interval: 150, delay: 200 });

  // フッター
  sr.reveal(".footer__info", { delay: 100 });
  sr.reveal(".footer__nav", { delay: 200 });
  sr.reveal(".footer__sns", { delay: 300 });
}

/**
 * ヘッダーのスクロール制御
 */
function initHeaderScroll() {
  const header = document.querySelector(".header");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  });
}

/**
 * スムーススクロールの初期化
 */
function initSmoothScroll() {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: "vertical",
    gestureDirection: "vertical",
    smooth: true,
    smoothTouch: false,
    touchMultiplier: 2,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  // アンカーリンクのスムーススクロール
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        lenis.scrollTo(targetElement, {
          offset: -80,
          duration: 1.5,
          easing: (t) => 1 - Math.pow(1 - t, 3),
        });

        // モバイルメニューが開いている場合は閉じる
        const hamburger = document.querySelector(".hamburger");
        const mobileMenu = document.querySelector(".mobile-menu");
        if (hamburger.classList.contains("is-active")) {
          hamburger.classList.remove("is-active");
          mobileMenu.classList.remove("is-active");
          document.body.style.overflow = "";
        }
      }
    });
  });
}

/**
 * Swiperスライダーの初期化
 */
function initSwipers() {
  // スキルアップセクションのスライダー
  const skillsSwiper = new Swiper(".skills-swiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
    on: {
      init: function () {
        animateCards(this.slides);
      },
      slideChangeTransitionStart: function () {
        animateCards(this.slides);
      },
    },
  });

  // スライドアニメーション
  function animateCards(slides) {
    anime({
      targets: slides,
      scale: [0.9, 1],
      opacity: [0.8, 1],
      easing: "easeOutExpo",
      duration: 800,
      delay: anime.stagger(100),
    });
  }
}

/**
 * ハンバーガーメニューの制御
 */
function initMobileMenu() {
  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.querySelector(".mobile-menu");

  hamburger.addEventListener("click", function () {
    this.classList.toggle("is-active");
    mobileMenu.classList.toggle("is-active");

    // メニュー展開時に背景スクロールを防止
    if (this.classList.contains("is-active")) {
      document.body.style.overflow = "hidden";

      // メニュー項目のアニメーション
      anime({
        targets: ".mobile-menu__list li",
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 500,
        delay: anime.stagger(100),
        easing: "easeOutQuad",
      });
    } else {
      document.body.style.overflow = "";
    }

    // アクセシビリティ
    this.setAttribute("aria-expanded", this.classList.contains("is-active"));
  });
}

/**
 * アコーディオンの制御
 */
function initAccordion() {
  const accordionItems = document.querySelectorAll(".accordion__item");

  accordionItems.forEach((item) => {
    const header = item.querySelector(".accordion__header");

    header.addEventListener("click", function () {
      // 現在の状態を取得
      const isActive = item.classList.contains("is-active");

      // すべてのアイテムをクローズ
      accordionItems.forEach((i) => i.classList.remove("is-active"));

      // クリックされたアイテムをトグル
      if (!isActive) {
        item.classList.add("is-active");

        // アコーディオンの内容をアニメーション
        anime({
          targets: item.querySelector(".accordion__content"),
          height: [0, item.querySelector(".accordion__content").scrollHeight],
          duration: 300,
          easing: "easeOutQuad",
        });
      }
    });
  });
}

/**
 * アクティビティフィルター
 */
function initActivityFilter() {
  const filterBtns = document.querySelectorAll(".activities__filter-btn");
  const activityItems = document.querySelectorAll(".activity-item");

  // 初期状態ですべてのボタンをアクティブ
  document
    .querySelector('.activities__filter-btn[data-filter="all"]')
    .classList.add("is-active");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const filterValue = this.getAttribute("data-filter");

      // フィルターボタンのアクティブ状態を更新
      filterBtns.forEach((b) => b.classList.remove("is-active"));
      this.classList.add("is-active");

      // アクティビティアイテムを表示/非表示
      activityItems.forEach((item) => {
        if (
          filterValue === "all" ||
          item.getAttribute("data-category") === filterValue
        ) {
          item.style.display = "flex";
          anime({
            targets: item,
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 500,
            easing: "easeOutQuad",
          });
        } else {
          anime({
            targets: item,
            opacity: 0,
            translateY: 20,
            duration: 300,
            easing: "easeOutQuad",
            complete: function () {
              item.style.display = "none";
            },
          });
        }
      });
    });
  });
}

/**
 * ページトップへ戻るボタン
 */
function initPageTopButton() {
  const pageTopBtn = document.querySelector(".page-top");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      pageTopBtn.classList.add("show");
    } else {
      pageTopBtn.classList.remove("show");
    }
  });

  pageTopBtn.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

/**
 * ヒーローセクションのタイトルアニメーション
 */
anime
  .timeline({
    easing: "easeOutExpo",
  })
  .add({
    targets: ".hero__title .char",
    opacity: [0, 1],
    translateY: [40, 0],
    duration: 1200,
    delay: (el, i) => 300 + i * 30,
  })
  .add(
    {
      targets: ".hero__subtitle",
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 800,
    },
    "-=800"
  )
  .add(
    {
      targets: ".hero__buttons",
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 800,
    },
    "-=600"
  );

// フォームのバリデーションとアニメーション
if (document.querySelector(".form")) {
  const form = document.querySelector(".form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // 簡易バリデーション
    let isValid = true;
    const requiredFields = this.querySelectorAll("[required]");

    requiredFields.forEach((field) => {
      if (!field.value.trim()) {
        isValid = false;
        field.classList.add("is-invalid");

        // エラーエフェクト
        anime({
          targets: field,
          translateX: [
            { value: -5, duration: 50, easing: "easeInOutQuad" },
            { value: 5, duration: 50, easing: "easeInOutQuad" },
            { value: -5, duration: 50, easing: "easeInOutQuad" },
            { value: 5, duration: 50, easing: "easeInOutQuad" },
            { value: 0, duration: 50, easing: "easeInOutQuad" },
          ],
          borderColor: ["#e53935", "#e53935", field.style.borderColor],
          duration: 800,
        });
      } else {
        field.classList.remove("is-invalid");
      }
    });

    if (isValid) {
      // 送信成功アニメーション
      anime({
        targets: this.querySelector(".form__submit"),
        scale: [1, 1.1, 1],
        backgroundColor: ["#006241", "#4CAF50", "#006241"],
        duration: 800,
        easing: "easeInOutBack",
      });

      // ここにAjax送信処理を記述
      console.log("フォーム送信");

      // 送信完了メッセージ
      const formMsg = document.createElement("div");
      formMsg.className = "form__message";
      formMsg.innerHTML = "<p>送信が完了しました。ありがとうございます。</p>";
      this.appendChild(formMsg);

      anime({
        targets: formMsg,
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 500,
        easing: "easeOutQuad",
      });

      // フォームをリセット
      this.reset();
    }
  });
}

// 画像の遅延読み込み
if ("IntersectionObserver" in window) {
  const lazyImages = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const image = entry.target;
        image.src = image.dataset.src;

        image.onload = () => {
          image.removeAttribute("data-src");
          anime({
            targets: image,
            opacity: [0, 1],
            duration: 800,
            easing: "easeOutQuad",
          });
        };

        imageObserver.unobserve(image);
      }
    });
  });

  lazyImages.forEach((image) => {
    imageObserver.observe(image);
  });
}
