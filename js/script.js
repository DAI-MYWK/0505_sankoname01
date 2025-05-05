/**
 * 株式会社サンコーネーム
 * 就労継続支援B型事業所ホームページ
 * JavaScript
 */

// DOMが読み込まれたら実行
$(document).ready(function () {
  // AOSの初期化
  AOS.init({
    duration: 800,
    easing: "ease",
    once: true,
    offset: 100,
  });

  // ハンバーガーメニューの動作
  $(".hamburger").on("click", function () {
    $(this).toggleClass("active");

    // ハンバーガーメニューのアニメーション
    if ($(this).hasClass("active")) {
      $(this).find("span:nth-child(1)").css({
        transform: "translateY(9px) rotate(45deg)",
      });
      $(this).find("span:nth-child(2)").css({
        opacity: "0",
      });
      $(this).find("span:nth-child(3)").css({
        transform: "translateY(-9px) rotate(-45deg)",
      });

      // スライドインメニューの表示
      $(".header-nav").slideDown(300);
      $("body").css("overflow", "hidden"); // スクロール防止
    } else {
      $(this).find("span").removeAttr("style");
      $(".header-nav").slideUp(300);
      $("body").css("overflow", "auto"); // スクロール許可
    }
  });

  // ウィンドウサイズが変更されたときの処理
  $(window).resize(function () {
    if ($(window).width() > 1024) {
      $(".hamburger").removeClass("active");
      $(".hamburger").find("span").removeAttr("style");
      $(".header-nav").removeAttr("style");
      $("body").css("overflow", "auto");
    }
  });

  // スムーススクロール
  $('a[href^="#"]').on("click", function (e) {
    e.preventDefault();

    // ハンバーガーメニューが開いている場合は閉じる
    if ($(".hamburger").hasClass("active")) {
      $(".hamburger").removeClass("active");
      $(".hamburger").find("span").removeAttr("style");
      $(".header-nav").slideUp(300);
      $("body").css("overflow", "auto");
    }

    const target = $(this).attr("href");
    const targetPos = $(target).offset().top - 70; // ヘッダー分の高さを引く

    $("html, body").animate(
      {
        scrollTop: targetPos,
      },
      800,
      "swing"
    );
  });

  // フォーム送信時の処理
  $(".contact-form").on("submit", function (e) {
    e.preventDefault();

    // 入力値の取得
    const contactType = $("#contact-type").val();
    const name = $("#name").val();
    const tel = $("#tel").val();
    const email = $("#email").val();
    const message = $("#message").val();

    // 入力チェック（簡易的なバリデーション）
    if (!contactType || !name || !tel || !email) {
      alert("必須項目を入力してください。");
      return;
    }

    // メールアドレスの形式チェック
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailPattern.test(email)) {
      alert("メールアドレスの形式が正しくありません。");
      return;
    }

    // ここにフォーム送信処理を記述
    // 実際にはサーバーサイドに送信する処理が必要
    // この例では送信成功のアラートを表示
    alert(
      "お問い合わせを受け付けました。\n担当者より折り返しご連絡いたします。"
    );

    // フォームのリセット
    this.reset();
  });

  // スクロール時のヘッダー表示制御
  let lastScrollTop = 0;
  $(window).scroll(function () {
    const scrollTop = $(this).scrollTop();

    // スクロール方向に応じてヘッダーの表示/非表示を制御
    if (scrollTop > lastScrollTop && scrollTop > 500) {
      // 下にスクロール
      $(".header").css("transform", "translateY(-100%)");
    } else {
      // 上にスクロール
      $(".header").css("transform", "translateY(0)");
    }

    lastScrollTop = scrollTop;

    // スクロール量に応じてヘッダーの背景色を変更
    if (scrollTop > 100) {
      $(".header").css("background-color", "rgba(255, 255, 255, 0.95)");
    } else {
      $(".header").css("background-color", "rgba(255, 255, 255, 0.8)");
    }
  });

  // 画像の遅延読み込み
  $("img").each(function () {
    const img = this;
    const imgSrc = $(img).attr("src");

    if (imgSrc) {
      const newImg = new Image();
      newImg.src = imgSrc;

      $(newImg).on("load", function () {
        $(img).addClass("loaded");
      });
    }
  });

  // 画像ギャラリーの初期化（Lightbox2を使用）
  lightbox.option({
    resizeDuration: 200,
    wrapAround: true,
    albumLabel: "%1 / %2",
  });
});
