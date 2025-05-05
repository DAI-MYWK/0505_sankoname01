/**
 * 株式会社サンコーネーム
 * 就労継続支援B型事業所ホームページ
 * JavaScript - Timeless Luxury
 */

// DOMの読み込み完了後に実行
document.addEventListener("DOMContentLoaded", () => {
  // スムーススクロールの初期化
  initLocomotiveScroll();

  // GSAPアニメーションの初期化
  initGSAP();

  // ヘッダーのスクロール処理
  initHeaderScroll();

  // ハンバーガーメニューの処理
  initHamburgerMenu();

  // Swiperスライダーの初期化
  initSwipers();

  // Fancyboxギャラリーの初期化
  initFancybox();
});

/**
 * Locomotive Scrollの初期化
 */
function initLocomotiveScroll() {
  const scrollContainer = document.querySelector("[data-scroll-container]");

  if (!scrollContainer) return;

  // Locomotive Scrollインスタンスの生成
  const scroll = new LocomotiveScroll({
    el: scrollContainer,
    smooth: true,
    smoothMobile: false,
    multiplier: 1,
    lerp: 0.1,
    getDirection: true,
    getSpeed: true,
    scrollFromAnywhere: true,
    touchMultiplier: 2,
    smartphone: {
      smooth: false,
    },
    tablet: {
      smooth: false,
    },
  });

  // スクロールトリガーでLocomotiveScrollを更新
  scroll.on("scroll", ScrollTrigger.update);

  // GSAPスクロールトリガーとLocomotiveScrollを連携
  ScrollTrigger.scrollerProxy(scrollContainer, {
    scrollTop(value) {
      return arguments.length
        ? scroll.scrollTo(value, 0, 0)
        : scroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: scrollContainer.style.transform ? "transform" : "fixed",
  });

  // スクロール位置をアップデート
  ScrollTrigger.addEventListener("refresh", () => scroll.update());

  // スクロールトリガーをリフレッシュ
  ScrollTrigger.refresh();

  // アンカーリンクのスムーススクロール
  document.querySelectorAll("[data-scroll-to]").forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        scroll.scrollTo(target);

        // ハンバーガーメニューが開いていたら閉じる
        const hamburger = document.querySelector(".header__hamburger");
        const nav = document.querySelector(".header__nav");
        if (hamburger && hamburger.classList.contains("active")) {
          hamburger.classList.remove("active");
          nav.classList.remove("active");
          document.body.style.overflow = "";
        }
      }
    });
  });

  // グローバルに保存して他の関数からアクセスできるように
  window.locomotiveScroll = scroll;
}

/**
 * GSAPアニメーションの初期化
 */
function initGSAP() {
  if (!window.gsap || !window.ScrollTrigger) return;

  // ヒーローセクションのアニメーション
  gsap.to(".hero__bg", {
    scale: 1.1,
    duration: 10,
    ease: "power1.out",
  });

  // ヒーロースクロールラインのアニメーション
  gsap.fromTo(
    ".hero__scroll",
    {
      opacity: 0,
      y: -20,
    },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 2,
      ease: "power2.out",
    }
  );

  // テキストアニメーション関数
  function animateTextElements(selector, staggerAmount = 0.1) {
    const elements = document.querySelectorAll(selector);

    if (!elements.length) return;

    elements.forEach((element) => {
      gsap.fromTo(
        element,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.5,
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none none",
          },
          ease: "power3.out",
        }
      );
    });
  }

  // 各セクションのテキスト要素アニメーション
  animateTextElements(".section__title");
  animateTextElements(".section__subtitle");
  animateTextElements(".section__text");

  // 画像アニメーション
  const fadeInImages = document.querySelectorAll(".fade-in-image");
  fadeInImages.forEach((img) => {
    gsap.fromTo(
      img,
      {
        opacity: 0,
        scale: 1.1,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: img,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none none",
        },
      }
    );
  });
}

/**
 * ヘッダーのスクロール処理
 */
function initHeaderScroll() {
  const header = document.querySelector(".header");
  if (!header) return;

  let lastScrollTop = 0;

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // スクロール量に応じてヘッダーの背景色を変更
    if (scrollTop > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    lastScrollTop = scrollTop;
  });
}

/**
 * ハンバーガーメニューの処理
 */
function initHamburgerMenu() {
  const hamburger = document.querySelector(".header__hamburger");
  const nav = document.querySelector(".header__nav");
  const navItems = document.querySelectorAll(".header__nav-list li");

  if (!hamburger || !nav) return;

  // メニュー項目にstaggerアニメーション用のインデックスを設定
  navItems.forEach((item, index) => {
    item.style.setProperty("--i", index);
  });

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    nav.classList.toggle("active");

    // メニュー開閉時に本文のスクロールを制御
    if (nav.classList.contains("active")) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  });
}

/**
 * Swiperスライダーの初期化
 */
function initSwipers() {
  if (!window.Swiper) return;

  // スタッフ紹介スライダー
  const staffSwiper = new Swiper(".staff-swiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    centeredSlides: true,
    loop: true,
    speed: 800,
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
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
      768: {
        slidesPerView: 2,
        spaceBetween: 40,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 50,
      },
    },
  });

  // DISCOVERY スライダー
  const discoverySwiper = new Swiper(".discovery-swiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    centeredSlides: true,
    loop: true,
    speed: 600,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
    },
  });
}

/**
 * Fancyboxギャラリーの初期化
 */
function initFancybox() {
  if (!window.Fancybox) return;

  Fancybox.bind("[data-fancybox]", {
    // オプション設定
    Thumbs: {
      autoStart: true,
    },
    Toolbar: {
      display: [
        { id: "prev", position: "center" },
        { id: "counter", position: "center" },
        { id: "next", position: "center" },
        "zoom",
        "slideshow",
        "fullscreen",
        "close",
      ],
    },
  });
}

/**
 * フォーム送信処理
 */
document.addEventListener("submit", (e) => {
  const form = e.target;

  // お問い合わせフォームかどうかをチェック
  if (form.classList.contains("contact-form")) {
    e.preventDefault();

    // 入力値の取得
    const formData = new FormData(form);

    // ここにフォーム送信処理を記述
    // この例では送信成功のアラートを表示
    setTimeout(() => {
      alert(
        "お問い合わせを受け付けました。\n担当者より折り返しご連絡いたします。"
      );
      form.reset();
    }, 1000);
  }
});
