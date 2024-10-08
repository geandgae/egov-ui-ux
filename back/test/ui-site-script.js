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
      // document.title = "KRDS";
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
  const createElement = (tag, attributes = {}, ...children) => {
    const element = document.createElement(tag);
    for (let key in attributes) {
      if (key === "className") {
        element.className = attributes[key];
      } else {
        element.setAttribute(key, attributes[key]);
      }
    }
    children.forEach((child) => {
      if (typeof child === "string") {
        element.innerHTML += child;
      } else {
        element.appendChild(child);
      }
    });
    return element;
  };
  // splitText
  const splitText = (text) => {
    const regex = /^(.*?)\s?\((.*?)\)$/;
    const match = text.match(regex);
    if (match) {
      return {
        original: text,
        outside: match[1].trim(),
        inside: `(${match[2].trim()})`,
      };
    }
    return {
      original: text,
      outside: text,
      inside: "",
    };
  };
  // lnbCreate
  const lnbCreate = (menuData) => {
    const lnb = document.querySelector(".g-aside .lnb .depth1");
    // index 페이지 상대 경로 변경
    const isIndexPage = window.location.pathname.split("/").pop() === "index.html";
    const basePath = isIndexPage ? "./" : "../";
    if (lnb) {
      menuData.forEach((menu) => {
        // liDepth1
        const liDepth1 = createElement("li", {}, createElement("button", { type: "button", className: "btn-menu-toggle" }, menu.title));
        // ulDepth2
        if (menu.items) {
          const ulDepth2 = createElement("ul", { className: "depth2" });
          menu.items.forEach((item) => {
            const text = splitText(item.text);
            const aDepth2 = createElement(
              "a",
              { href: `${basePath}${menu.dir}/${item.file}.html` },
              text.inside ? `${text.outside} <span class="sub">${text.inside}</span>` : text.outside
            );
            const liDepth2 = createElement("li", {}, aDepth2);
            // ulDepth3
            if (item.subitems) {
              const ulDepth3 = createElement("ul", { className: "depth3" });
              item.subitems.forEach((subitem) => {
                const text = splitText(subitem.text);
                const aDepth3 = createElement(
                  "a",
                  { href: `${basePath}${menu.dir}/${subitem.file}.html` },
                  text.inside ? `${text.outside} <span class="sub">${text.inside}</span>` : text.outside
                );
                const liDepth3 = createElement("li", {}, aDepth3);
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
        if (windowSize.getWinSize() === "pc") {
          lnb?.classList.remove("active");
          document.body.classList.remove("scroll-no");
        }
      }, 200)
    );
  };

  // goTopBtn
  const goTopBtn = () => {
    const contentArea = document.querySelector("#g-container .g-content");
    if (contentArea) {
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
    }
  };

  // emptyAnchor
  const emptyAnchor = () => {
    const tagA = document.querySelectorAll("a");
    tagA.forEach((item) => {
      const href = item.getAttribute("href");
      item.addEventListener("click", (el) => {
        if (href === "#") el.preventDefault();
      });
    });
  };

  // WebAccessibility
  const webAcc = () => {
    const accordionContents = document.querySelectorAll(".g-code-wrap .accordion-collapse");
    accordionContents.forEach((item) => {
      item.removeAttribute("aria-expanded");
    });
  };

  // 신규 추가
  const initMenuUi = () => {
    // 페이지 구하기
    const pathParts = window.location.pathname.split("/");
    const currentDir = pathParts.slice(-2, -1)[0];
    const currentPage = pathParts.slice(-1)[0].replace(".html", "");

    // data
    const gnbData = [
      { name: "공통관리", url: "/html/admin/common/test.html", type: "link", sub: [] },
      { name: "메뉴관리", url: "/html/admin/menu/test.html", type: "link", sub: [] },
      { name: "콘텐츠관리", url: "/html/admin/content/test.html", type: "link", sub: [] },
      { name: "통계관리", url: "/html/admin/stats/test.html", type: "link", sub: [] },
      { name: "서브타입 : toggle-lv1", url: "", type: "toggle", sub: [{ name: "sub-link", url: "#;", type: "link", sub: [] }] },
      {
        name: "서브타입 : toggle-lv2",
        url: "",
        type: "toggle-lv2",
        sub: [
          { name: "sub-toggle", url: "#;", type: "toggle", sub: [{ name: "sub-link", url: "#;", type: "link", sub: [] }] },
          { name: "sub-description", url: "#;", type: "description", sub: [{ name: "sub-link", url: "#;", type: "desc", desc: "description", sub: [] }] },
          { name: "sub-link", url: "#;", type: "link", sub: [] },
        ],
      },
    ];
    const lnbData = [
      {
        category: "소개",
        dir: "outline",
        sub: [
          { name: "개요", file: "outline_01", type: "link" },
          { name: "가이드라인의 구성", file: "outline_02", type: "link" },
          { name: "가이드라인의 활용 방법", file: "outline_03", type: "link" },
        ],
      },
      {
        category: "디자인 원칙",
        dir: "foundation",
        sub: [
          { name: "사용자 중심의 서비스", file: "foundation_01", type: "link" },
          { name: "모든 사용자를 포용하는 서비스", file: "foundation_02", type: "link" },
          { name: "공통된 경험 안에서 개별 특성을 고려한 서비스", file: "foundation_03", type: "link" },
          { name: "빠르고 간단한 서비스", file: "foundation_04", type: "link" },
          { name: "쉽게 이해하고 사용할 수 있는 서비스", file: "foundation_05", type: "link" },
          { name: "사용자의 다양한 상황을 고려하는 서비스", file: "foundation_06", type: "link" },
          { name: "신뢰할 수 있는 서비스", file: "foundation_07", type: "link" },
        ],
      },
      {
        category: "스타일 가이드",
        dir: "style",
        sub: [
          { name: "적용 범위 및 구분", file: "style_01", type: "link" },
          { name: "색상 (Color)", file: "style_02", type: "link" },
          { name: "서체 (Typography)", file: "style_03", type: "link" },
          { name: "형태 (Shape)", file: "style_04", type: "link" },
          { name: "배치 (Layout)", file: "style_05", type: "link" },
          { name: "아이콘 (System icon)", file: "style_06", type: "link" },
        ],
      },
      {
        category: "컴포넌트",
        dir: "component",
        sub: [
          {
            name: "아이덴티티",
            file: "component_02_01",
            type: "toggle",
            sub: [
              { name: "공식 배너 (Masthead)", file: "component_02_01", type: "link" },
              { name: "운영기관 식별자 (Identifier)", file: "component_02_04", type: "link" },
              { name: "푸터 (Footer)", file: "component_02_03", type: "link" },
              { name: "헤더 (Header)", file: "component_02_02", type: "link" },
            ],
          },
          {
            name: "탐색",
            file: "component_03_01",
            type: "toggle",
            sub: [
              { name: "건너뛰기 링크 (Skip link)", file: "component_03_01", type: "link" },
              { name: "메인 메뉴 (Main menu)", file: "component_03_02", type: "link" },
              { name: "브레드크럼 (Breadcrumb)", file: "component_03_03", type: "link" },
              { name: "사이드 메뉴 (Side navigation)", file: "component_03_04", type: "link" },
              { name: "콘텐츠 내 탐색 (In-page navigation)", file: "component_03_05", type: "link" },
              { name: "페이지네이션 (Pagination)", file: "component_03_06", type: "link" },
            ],
          },
          {
            name: "레이아웃 및 표현",
            file: "component_04_01",
            type: "toggle",
            sub: [
              { name: "구조화 목록 (Structured list)", file: "component_04_01", type: "link" },
              { name: "긴급 공지 (Critical alerts)", file: "component_04_02", type: "link" },
              { name: "달력 (Calendar)", file: "component_04_03", type: "link" },
              { name: "디스클로저 (Disclosure)", file: "component_04_04", type: "link" },
              { name: "모달 (Modal)", file: "component_04_05", type: "link" },
              { name: "배지 (Badge)", file: "component_04_06", type: "link" },
              { name: "아코디언 (Accordion)", file: "component_04_07", type: "link" },
              { name: "이미지 (Image)", file: "component_04_08", type: "link" },
              { name: "캐러셀 (Carousel)", file: "component_04_09", type: "link" },
              { name: "탭 (Tab)", file: "component_04_10", type: "link" },
              { name: "표 (Table)", file: "component_04_11", type: "link" },
            ],
          },
          {
            name: "액션",
            file: "component_05_01",
            type: "toggle",
            sub: [
              { name: "링크 (Link)", file: "component_05_01", type: "link" },
              { name: "버튼 (Button)", file: "component_05_02", type: "link" },
            ],
          },
          {
            name: "선택",
            file: "component_06_01",
            type: "toggle",
            sub: [
              { name: "라디오 버튼 (Radio button)", file: "component_06_01", type: "link" },
              { name: "체크박스 (Checkbox)", file: "component_06_02", type: "link" },
              { name: "셀렉트 (Select)", file: "component_06_03", type: "link" },
              { name: "태그 (Tag)", file: "component_06_04", type: "link" },
            ],
          },
          {
            name: "피드백",
            file: "component_07_01",
            type: "toggle",
            sub: [
              { name: "단계 표시기 (Step indicator)", file: "component_07_01", type: "link" },
              { name: "스피너 (Spinner)", file: "component_07_02", type: "link" },
            ],
          },
          {
            name: "도움",
            file: "component_08_01",
            type: "toggle",
            sub: [
              { name: "도움 패널 (Help panel)", file: "component_08_01", type: "link" },
              { name: "따라하기 패널 (Tutorial panel)", file: "component_08_03", type: "link" },
              { name: "맥락적 도움말 (Contextual help)", file: "component_08_02", type: "link" },
              { name: "코치마크 (Coach mark)", file: "component_08_04", type: "link" },
            ],
          },
          {
            name: "입력",
            file: "component_09_01",
            type: "toggle",
            sub: [
              { name: "날짜 입력 필드 (Date input)", file: "component_09_01", type: "link" },
              { name: "텍스트 영역 (Textarea)", file: "component_09_02", type: "link" },
              { name: "텍스트 입력 필드 (Text input)", file: "component_09_03", type: "link" },
              { name: "파일 업로드 (File upload)", file: "component_09_04", type: "link" },
            ],
          },
        ],
      },
      {
        category: "기본 패턴",
        dir: "global",
        sub: [
          { name: "개인 식별 정보 입력", file: "global_01", type: "link" },
          { name: "도움", file: "global_02", type: "link" },
          { name: "동의", file: "global_03", type: "link" },
          { name: "목록 탐색", file: "global_04", type: "link" },
          { name: "사용자 피드백", file: "global_05", type: "link" },
          { name: "상세 정보 확인", file: "global_06", type: "link" },
          { name: "오류", file: "global_07", type: "link" },
          { name: "입력폼", file: "global_08", type: "link" },
          { name: "첨부 파일", file: "global_09", type: "link" },
          { name: "필터링·정렬", file: "global_10", type: "link" },
          { name: "확인", file: "global_11", type: "link" },
        ],
      },
      {
        category: "서비스 패턴",
        dir: "service",
        sub: [
          {
            name: "방문",
            file: "service_01_01",
            type: "toggle",
            sub: [
              { name: "개요", file: "service_01_01", type: "link" },
              { name: "방문", file: "service_01_02", type: "link" },
            ],
          },
          {
            name: "검색",
            file: "service_02_01",
            type: "toggle",
            sub: [
              { name: "개요", file: "service_02_01", type: "link" },
              { name: "검색 기능 찾기", file: "service_02_02", type: "link" },
              { name: "검색어 입력", file: "service_02_03", type: "link" },
              { name: "검색 결과 확인", file: "service_02_04", type: "link" },
              { name: "상세 검색", file: "service_02_05", type: "link" },
              { name: "검색 결과 이용", file: "service_02_06", type: "link" },
              { name: "재검색", file: "service_02_07", type: "link" },
              { name: "검색 종료", file: "service_02_08", type: "link" },
            ],
          },
          {
            name: "로그인",
            file: "service_03_01",
            type: "toggle",
            sub: [
              { name: "개요", file: "service_03_01", type: "link" },
              { name: "로그인 기능 찾기", file: "service_03_02", type: "link" },
              { name: "로그인 안내", file: "service_03_03" },
              { name: "로그인 방식 확인/선택", file: "service_03_04", type: "link" },
              { name: "로그인 정보 입력", file: "service_03_05", type: "link" },
              { name: "로그인 완료", file: "service_03_06", type: "link" },
              { name: "서비스 이용", file: "service_03_07", type: "link" },
              { name: "로그아웃", file: "service_03_08", type: "link" },
            ],
          },
          {
            name: "신청",
            file: "service_04_01",
            type: "toggle",
            sub: [
              { name: "개요", file: "service_04_01", type: "link" },
              { name: "신청 대상 탐색", file: "service_04_02", type: "link" },
              { name: "서비스 정보 확인", file: "service_04_03", type: "link" },
              { name: "유의 사항/자격 확인", file: "service_04_04", type: "link" },
              { name: "신청서 작성", file: "service_04_05", type: "link" },
              { name: "확인/확정", file: "service_04_06", type: "link" },
              { name: "완료", file: "service_04_07", type: "link" },
              { name: "신청 결과 확인", file: "service_04_08", type: "link" },
            ],
          },
          {
            name: "정책정보 확인",
            file: "service_05_01",
            type: "toggle",
            sub: [
              { name: "개요", file: "service_05_01", type: "link" },
              { name: "정책 탐색", file: "service_05_02", type: "link" },
              { name: "정보 확인", file: "service_05_03", type: "link" },
              { name: "정책 자료 탐색", file: "service_05_04", type: "link" },
            ],
          },
        ],
      },
    ];

    // gnb
    const setGnb = (menuData) => {
      const menu = document.querySelector(".krds-gnb .gnb-menu");
      if (!menu) return;

      let list = [];

      const createMenu = (menuData) => {
        if (menuData.type === "link") {
          return `<li><a href="${menuData.url}" class="gnb-main-trigger is-link" data-trigger="gnb"><h2>${menuData.name}</h2></a></li>`;
        } else if (menuData.type === "toggle") {
          return `
            <li>
              <button type="button" class="gnb-main-trigger" data-trigger="gnb"><h2>${menuData.name}</h2></button>
              <div class="gnb-toggle-wrap">
                <div class="gnb-main-list">
                  <div class="gnb-sub-list single-list">
                    <div class="gnb-sub-content">
                      <h3 class="sub-title"><span>${menuData.name}</span></h3>
                      <ul>
                        ${menuData.sub.map(createSubMenu).join("")}
                      </ul>
                    </div>
                    <div class="gnb-sub-banner">
                      <span class="krds-badge bg1">신규 서비스</span>
                      <button type="button" class="krds-btn large text">메뉴명 <i class="svg-icon ico-angle right"></i></button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          `;
        } else if (menuData.type === "toggle-lv2") {
          return `
            <li>
              <button type="button" class="gnb-main-trigger" data-trigger="gnb"><h2>${menuData.name}</h2></button>
              <div class="gnb-toggle-wrap">
                <div class="gnb-main-list" data-has-submenu="true">
                  <ul>
                    ${menuData.sub.map(createSubMenuLv2).join("")}
                  </ul>
                </div>
              </div>
            </li>
          `;
        }
      };
      const createSubMenu = (menuData) => {
        return menuData.type === "link" ? `<li><a href="${menuData.url}">${menuData.name}</a></li>` : "";
      };
      const createSubMenuLv2 = (menuData) => {
        if (menuData.type === "link") {
          return `
          <li>
            <a href="${menuData.url}" class="gnb-sub-trigger" data-trigger="gnb" target="_blank" title="새 창 열림">
              ${menuData.name}
              <i class="svg-icon ico-go"></i>
            </a>
          </li>
          `;
        } else if (menuData.type === "toggle") {
          return `
          <li>
            <button type="button" class="gnb-sub-trigger" data-trigger="gnb">${menuData.name}</button>
            <div class="gnb-sub-list">
              <div class="gnb-sub-content">
                <h3 class="sub-title"><span>${menuData.name}</span></h3>
                <ul>
                  ${menuData.sub.map(createSubMenuLv3).join("")}
                </ul>
              </div>
              <div class="gnb-sub-banner">
                <span class="krds-badge bg1">신규 서비스</span>
                <button type="button" class="krds-btn large text">메뉴명 <i class="svg-icon ico-angle right"></i></button>
              </div>
            </div>
          </li>
          `;
        } else if (menuData.type === "description") {
          return `
          <li>
            <button type="button" class="gnb-sub-trigger" data-trigger="gnb">${menuData.name}</button>
            <div class="gnb-sub-list between">
              <div class="gnb-sub-content">
                <h3 class="sub-title"><span>${menuData.name}</span></h3>
                <ul class="type-description">
                  ${menuData.sub.map(createSubMenuLv3).join("")}
                </ul>
              </div>
              <div class="gnb-sub-banner">
                <span class="krds-badge bg1">신규 서비스2</span>
                <button type="button" class="krds-btn large text">메뉴명 <i class="svg-icon ico-angle right"></i></button>
              </div>
            </div>
          </li>
          `;
        }
      };
      const createSubMenuLv3 = (menuData) => {
        if (menuData.type === "link") {
          return `<li><a href="${menuData.url}">${menuData.name}</a></li>`;
        } else if (menuData.type === "desc") {
          return `
            <li>
              <h4 class="tit">
                <a href="${menuData.url}" target="_blank" title="새 창 열림">${menuData.name} <i class="svg-icon ico-go"></i></a>
              </h4>
              <p class="txt">${menuData.desc}</p>
            </li>
          `;
        }
      };

      menuData.forEach((item) => list.push(createMenu(item)));
      menu.innerHTML = list.join("");
    };

    // lnb
    const setLnb = (data) => {
      const wrap = document.querySelector(".krds-lnb");
      if (!wrap) return;

      const title = wrap.querySelector(".lnb-tit");
      const menu = wrap.querySelector(".lnb-list");
      let list = [];

      const filterByCategory = (data, category) => {
        const categoryItem = data.find((item) => item.dir === category);
        if (categoryItem && categoryItem.sub) {
          title.innerHTML = categoryItem.category;
          return categoryItem.sub;
        }
        return [];
      };
      const menuData = filterByCategory(data, currentDir);

      const createMenu = (menuData) => {
        if (menuData.type === "link") {
          return `<li class="lnb-item"><a href="./${menuData.file}.html" class="lnb-btn lnb-link">${menuData.name}</a></li>`;
        } else if (menuData.type === "toggle") {
          return `
            <li class="lnb-item">
              <button type="button" class="lnb-btn lnb-toggle">${menuData.name}</button>
              <div class="lnb-submenu">
                <ul>
                  ${menuData.sub.map(createSubMenu).join("")}
                </ul>
              </div>
            </li>
          `;
        }
      };
      const createSubMenu = (menuData) => {
        if (menuData.type === "link") {
          return `
            <li class="lnb-subitem">
              <a href="./${menuData.file}.html" class="lnb-btn lnb-link">${menuData.name}</a>
            </li>
          `;
        } else if (menuData.type === "toggle") {
          return `
            <li class="lnb-subitem">
              <button type="button" class="lnb-btn lnb-toggle-popup">${menuData.name}</button>
              <div class="lnb-submenu-lv2">
                <button type="button" class="lnb-btn-tit">${menuData.name}</button>
                <ul>
                  ${menuData.sub.map(createSubMenuLv2).join("")}
                </ul>
              </div>
            </li>
          `;
        }
      };
      const createSubMenuLv2 = (menuData) => {
        return `<li><a href="./${menuData.file}.html" class="lnb-btn">${menuData.name}</a></li>`;
      };

      menuData.forEach((item) => list.push(createMenu(item)));
      menu.innerHTML = list.join("");
    };

    const activePage = () => {
      const lnbLinks = document.querySelectorAll(".krds-lnb .lnb-link");
      lnbLinks.forEach((link) => {
        const linkPage = link.getAttribute("href").split("/").slice(-1)[0].replace(".html", "");
        if (linkPage === currentPage) {
          link.closest(".lnb-item").classList.add("active");
          link.classList.add("active");
          link.setAttribute("aria-current", "page");
        }
      });

      const gnbLinks = document.querySelectorAll(".krds-gnb .gnb-main-trigger.is-link");
      gnbLinks.forEach((link) => {
        const linkDir = link.getAttribute("href").split("/").slice(-2, -1)[0];
        if (linkDir === currentDir) {
          link.classList.add("active");
          link.setAttribute("aria-current", "page");
        }
      });
    };

    // run
    // setGnb(gnbData);
    setLnb(lnbData);
    activePage();
  };

  // run
  initMenuUi();
  updateTitle();
  gnbActive();
  lnbCreate(menuData);
  lnbActive();
  lnbToggle();
  lnbResponsive();
  goTopBtn();
  emptyAnchor();
  webAcc();
})();
// e : function
