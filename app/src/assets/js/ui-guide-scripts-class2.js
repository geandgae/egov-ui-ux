"use strict";

// s : function
(function () {
  // global
  const pathParts = window.location.pathname.split("/");
  const currentDir = pathParts.slice(-2, -1)[0];
  const currentFile = pathParts.slice(-1)[0].replace(".html", "");
  const menuData = [
    {
      title: "소개",
      dir: "outline",
      items: [
        { text: "개요", file: "outline_01" },
        { text: "가이드라인의 구성", file: "outline_02" },
        { text: "가이드라인의 활용 방법", file: "outline_03" },
      ],
    },
    {
      title: "디자인 원칙",
      dir: "foundation",
      items: [
        { text: "사용자 중심의 서비스", file: "foundation_01" },
        { text: "모든 사용자를 포용하는 서비스", file: "foundation_02" },
        { text: "공통된 경험 안에서 개별 특성을 고려한 서비스", file: "foundation_03" },
        { text: "빠르고 간단한 서비스", file: "foundation_04" },
        { text: "쉽게 이해하고 사용할 수 있는 서비스", file: "foundation_05" },
        { text: "사용자의 다양한 상황을 고려하는 서비스", file: "foundation_06" },
        { text: "신뢰할 수 있는 서비스", file: "foundation_07" },
      ],
    },
    {
      title: "스타일 가이드",
      dir: "style",
      items: [
        { text: "적용 범위 및 구분", file: "style_01" },
        { text: "색상 (Color)", file: "style_02" },
        { text: "서체 (Typography)", file: "style_03" },
        { text: "형태 (Shape)", file: "style_04" },
        { text: "배치 (Layout)", file: "style_05" },
        { text: "아이콘 (System icon)", file: "style_06" },
      ],
    },
    {
      title: "컴포넌트",
      dir: "component",
      items: [
        {
          text: "아이덴티티",
          file: "component_02_01",
          subitems: [
            { text: "공식 배너 (Masthead)", file: "component_02_01" },
            { text: "운영기관 식별자 (Identifier)", file: "component_02_04" },
            { text: "푸터 (Footer)", file: "component_02_03" },
            { text: "헤더 (Header)", file: "component_02_02" },
          ],
        },
        {
          text: "탐색",
          file: "component_03_01",
          subitems: [
            { text: "건너뛰기 링크 (Skip link)", file: "component_03_01" },
            { text: "메인 메뉴 (Main menu)", file: "component_03_02" },
            { text: "브레드크럼 (Breadcrumb)", file: "component_03_03" },
            { text: "사이드 메뉴 (Side navigation)", file: "component_03_04" },
            { text: "콘텐츠 내 탐색 (In-page navigation)", file: "component_03_05" },
            { text: "페이지네이션 (Pagination)", file: "component_03_06" },
          ],
        },
        {
          text: "레이아웃 및 표현",
          file: "component_04_01",
          subitems: [
            { text: "구조화 목록 (Structured list)", file: "component_04_01" },
            { text: "긴급 공지 (Critical alerts)", file: "component_04_02" },
            { text: "달력 (Calendar)", file: "component_04_03" },
            { text: "디스클로저 (Disclosure)", file: "component_04_04" },
            { text: "모달 (Modal)", file: "component_04_05" },
            { text: "배지 (Badge)", file: "component_04_06" },
            { text: "아코디언 (Accordion)", file: "component_04_07" },
            { text: "이미지 (Image)", file: "component_04_08" },
            { text: "캐러셀 (Carousel)", file: "component_04_09" },
            { text: "탭 (Tab)", file: "component_04_10" },
            { text: "표 (Table)", file: "component_04_11" },
          ],
        },
        {
          text: "액션",
          file: "component_05_01",
          subitems: [
            { text: "링크 (Link)", file: "component_05_01" },
            { text: "버튼 (Button)", file: "component_05_02" },
          ],
        },
        {
          text: "선택",
          file: "component_06_01",
          subitems: [
            { text: "라디오 버튼 (Radio button)", file: "component_06_01" },
            { text: "체크박스 (Checkbox)", file: "component_06_02" },
            { text: "셀렉트 (Select)", file: "component_06_03" },
            { text: "태그 (Tag)", file: "component_06_04" },
          ],
        },
        {
          text: "피드백",
          file: "component_07_01",
          subitems: [
            { text: "단계 표시기 (Step indicator)", file: "component_07_01" },
            { text: "스피너 (Spinner)", file: "component_07_02" },
          ],
        },
        {
          text: "도움",
          file: "component_08_01",
          subitems: [
            { text: "도움 패널 (Help panel)", file: "component_08_01" },
            { text: "따라하기 패널 (Tutorial panel)", file: "component_08_03" },
            { text: "맥락적 도움말 (Contextual help)", file: "component_08_02" },
            { text: "코치마크 (Coach mark)", file: "component_08_04" },
          ],
        },
        {
          text: "입력",
          file: "component_09_01",
          subitems: [
            { text: "날짜 입력 필드 (Date input)", file: "component_09_01" },
            { text: "텍스트 영역 (Textarea)", file: "component_09_02" },
            { text: "텍스트 입력 필드 (Text input)", file: "component_09_03" },
            { text: "파일 업로드 (File upload)", file: "component_09_04" },
          ],
        },
      ],
    },
    {
      title: "기본 패턴",
      dir: "global",
      items: [
        { text: "개인 식별 정보 입력", file: "global_01" },
        { text: "도움", file: "global_02" },
        { text: "동의", file: "global_03" },
        { text: "목록 탐색", file: "global_04" },
        { text: "사용자 피드백", file: "global_05" },
        { text: "상세 정보 확인", file: "global_06" },
        { text: "오류", file: "global_07" },
        { text: "입력폼", file: "global_08" },
        { text: "첨부 파일", file: "global_09" },
        { text: "필터링·정렬", file: "global_10" },
        { text: "확인", file: "global_11" },
      ],
    },
    {
      title: "서비스 패턴",
      dir: "service",
      items: [
        {
          text: "방문",
          file: "service_01_01",
          subitems: [
            { text: "개요", file: "service_01_01" },
            { text: "방문", file: "service_01_02" },
          ],
        },
        {
          text: "검색",
          file: "service_02_01",
          subitems: [
            { text: "개요", file: "service_02_01" },
            { text: "검색 기능 찾기", file: "service_02_02" },
            { text: "검색어 입력", file: "service_02_03" },
            { text: "검색 결과 확인", file: "service_02_04" },
            { text: "상세 검색", file: "service_02_05" },
            { text: "검색 결과 이용", file: "service_02_06" },
            { text: "재검색", file: "service_02_07" },
            { text: "검색 종료", file: "service_02_08" },
          ],
        },
        {
          text: "로그인",
          file: "service_03_01",
          subitems: [
            { text: "개요", file: "service_03_01" },
            { text: "로그인 기능 찾기", file: "service_03_02" },
            { text: "로그인 안내", file: "service_03_03" },
            { text: "로그인 방식 확인/선택", file: "service_03_04" },
            { text: "로그인 정보 입력", file: "service_03_05" },
            { text: "로그인 완료", file: "service_03_06" },
            { text: "서비스 이용", file: "service_03_07" },
            { text: "로그아웃", file: "service_03_08" },
          ],
        },
        {
          text: "신청",
          file: "service_04_01",
          subitems: [
            { text: "개요", file: "service_04_01" },
            { text: "신청 대상 탐색", file: "service_04_02" },
            { text: "서비스 정보 확인", file: "service_04_03" },
            { text: "유의 사항/자격 확인", file: "service_04_04" },
            { text: "신청서 작성", file: "service_04_05" },
            { text: "확인/확정", file: "service_04_06" },
            { text: "완료", file: "service_04_07" },
            { text: "신청 결과 확인", file: "service_04_08" },
          ],
        },
        {
          text: "정책정보 확인",
          file: "service_05_01",
          subitems: [
            { text: "개요", file: "service_05_01" },
            { text: "정책 탐색", file: "service_05_02" },
            { text: "정보 확인", file: "service_05_03" },
            { text: "정책 자료 탐색", file: "service_05_04" },
          ],
        },
      ],
    },
  ];

  // getMenuItem
  const getMenuItem = (dir, file) => {
    for (const menu of menuData) {
      if (menu.dir === dir) {
        for (const item of menu.items) {
          if (item.file === file && !item.subitems) {
            return { depth1: menu.title, depth2: item.text, suffix: "" };
          } else if (item.subitems) {
            for (const subitem of item.subitems) {
              if (subitem.file === file) {
                return { depth1: menu.title, depth2: subitem.text, suffix: item.text };
              }
            }
          }
        }
      }
    }
    return { depth1: "", depth2: "", suffix: "" };
  };
  const { depth1, depth2, suffix } = getMenuItem(currentDir, currentFile);

  // updateTitle
  const updateTitle = () => {
    if (!depth1 && !depth2 && !suffix) {
      document.title = "KRDS";
    } else {
      document.title = `${depth2} | ${depth1}${suffix ? ` - ${suffix}` : ""} - KRDS`;
    }
  };

  // gnbActive
  const gnbActive = () => {
    const gnbLinks = document.querySelectorAll("#g-header .gnb li");
    gnbLinks.forEach((li) => {
      li.classList.remove("active");
      const linkDir = li.querySelector("a").getAttribute("href").split("/").slice(-2, -1)[0];
      if (linkDir === currentDir) {
        li.classList.add("active");
      }
    });
  };

  // Lnb 태그 생성
  class ElementBuilder {
    constructor(tag) {
      this.element = document.createElement(tag);
    }
    setAttributes(attributes) {
      for (let key in attributes) {
        if (key === "className") {
          this.element.className = attributes[key];
        } else {
          this.element.setAttribute(key, attributes[key]);
        }
      }
      return this;
    }
    appendChildren(...children) {
      children.forEach(child => {
        if (typeof child === "string") {
          this.element.innerHTML += child;
        } else {
          this.element.appendChild(child);
        }
      });
      return this; 
    }
    build() {
      return this.element;
    }
  }
  // splitText
  const splitText = (text) => {
    const regex = /^(.*?)\s?\((.*?)\)$/;
    const match = text.match(regex);
    if (match) {
      return {
        original: text,
        outside: match[1].trim(),
        inside: `(${match[2].trim()})` 
      };
    }
    return {
      original: text,
      outside: text,
      inside: ""
    };
  };
  // lnbCreate
  const lnbCreate = (menuData) => {
    const lnb = document.querySelector(".g-aside .lnb .depth1");
    // index 페이지 상대 경로 변경
    const isIndexPage = window.location.pathname.split("/").pop() === "index.html";
    const basePath = isIndexPage ? "./" : "../";
    if(lnb) {
      menuData.forEach((menu) => {
        const liDepth1 = new ElementBuilder("li")
          .appendChildren(
            new ElementBuilder("button")
              .setAttributes({ type: "button", className: "btn-menu-toggle" })
              .appendChildren(menu.title)
              .build()
            )
          .build();
        if (menu.items) {
          const ulDepth2 = new ElementBuilder("ul")
            .setAttributes({ className: "depth2" })
            .build();
          menu.items.forEach((item) => {
            const text = splitText(item.text);
            const aDepth2 = new ElementBuilder("a")
              .setAttributes({ href: `${basePath}${menu.dir}/${item.file}.html` })
              .appendChildren(text.inside ? `${text.outside} <span class="sub">${text.inside}</span>` : text.outside)
              .build();
            const liDepth2 = new ElementBuilder("li")
              .appendChildren(aDepth2)
              .build();
            if (item.subitems) {
              const ulDepth3 = new ElementBuilder("ul")
                .setAttributes({ className: "depth3" })
                .build();
              item.subitems.forEach((subitem) => {
                const text = splitText(subitem.text);
                const aDepth3 = new ElementBuilder("a")
                  .setAttributes({ href: `${basePath}${menu.dir}/${subitem.file}.html` })
                  .appendChildren(text.inside ? `${text.outside} <span class="sub">${text.inside}</span>` : text.outside)
                  .build();
                const liDepth3 = new ElementBuilder("li")
                  .appendChildren(aDepth3)
                  .build();
                ulDepth3.appendChild(liDepth3);
              });
              liDepth2.appendChild(ulDepth3);
            }
            ulDepth2.appendChild(liDepth2);
          });
          liDepth1.appendChild(ulDepth2);
        }
        lnb.appendChild(liDepth1);
      });
    }
  };
  // lnbActive
  const lnbActive = () => {
    const lnbLinks = document.querySelectorAll(".g-aside .lnb li a");
    lnbLinks.forEach((a) => {
      const linkFile = a.getAttribute("href").split("/").pop().replace(".html", "");
      if (linkFile === currentFile) {
        a.closest("li").classList.add("active");
        a.closest(".depth3")?.closest("li").classList.add("active");
        a.closest(".depth2")?.closest("li").classList.add("active");
      }
    });
  };
  // lnbToggle
  const lnbToggle = () => {
    document.querySelectorAll(".btn-menu-toggle").forEach((btn) => {
      btn.addEventListener("click", () => {
        const parentLi = btn.closest("li");
        const isActive = parentLi.classList.contains("active");
        document.querySelectorAll(".lnb .depth1 > li").forEach((li) => li.classList.remove("active"));
        if (!isActive) {
          parentLi.classList.add("active");
        }
      });
    });
  };
  // lnbResponsive
  const lnbResponsive = () => {
    const mobMenu = document.querySelector("#g-header .mob-menu");
    const lnb = document.querySelector(".g-aside");
    const lnbClose = lnb?.querySelector(".btn.ico-close");

    // debounce
    const debounce = (func, wait) => {
      let timeout;
      return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
      };
    };

    mobMenu?.addEventListener("click", () => {
      lnb?.classList.add("active");
      document.body.classList.add("scroll-no");
    });

    lnbClose?.addEventListener("click", () => {
      lnb?.classList.remove("active");
      document.body.classList.remove("scroll-no");
    });

    window.addEventListener(
      "resize",
      debounce(() => {
        if (winSize === 'pc') {
          lnb?.classList.remove("active");
          document.body.classList.remove("scroll-no");
        }
      }, 200)
    );
  };

  // initTopButton
  const initTopButton = () => {
    const contentArea = document.querySelector("#g-container .g-content");
    const goTopTag = document.createElement("button");
    goTopTag.className = "btn tertiary sm go-top";
    goTopTag.type = "button";
    goTopTag.textContent = "TOP";
    contentArea.append(goTopTag);
    const toggleVisibility = () => {
      goTopTag.classList.toggle("active", window.scrollY > window.innerHeight * 1.5);
    };
    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    window.addEventListener("scroll", toggleVisibility);
    goTopTag.addEventListener("click", scrollToTop);
  };

  // preventEmptyAnchorClicks
  const preventEmptyAnchorClicks = () => {
    const $links = document.querySelectorAll("a");
    $links.forEach($link => {
      const _href = $link.getAttribute( 'href' );
      $link.addEventListener("click", (el) => {
        if (_href === "#") el.preventDefault();
      });
    });
  }

  // run
  updateTitle();
  gnbActive();
  lnbCreate(menuData);
  lnbActive();
  lnbToggle();
  lnbResponsive();
  initTopButton();
  preventEmptyAnchorClicks();
})();
// e : function
