"use strict";

/* ** 윈도우 사이즈 체크 (반응형) ** */
let winSize;
function winSizeSet() {
  const brekpoint = 1024;
  if (window.innerWidth >= brekpoint) {
    winSize = "pc";
  } else {
    winSize = "mob";
  }
}

/* layer tab */
function layerTab() {
  const layerTabArea = document.querySelectorAll(".tab-area.layer");

  /* 탭 접근성 텍스트 세팅 */
  const tabAccText = document.createTextNode(" 선택됨");
  const tabAccTag = document.createElement("i");
  tabAccTag.setAttribute("class", "sr-only created");
  tabAccTag.appendChild(tabAccText);

  layerTabArea.forEach((e) => {
    const layerTabEle = e.querySelectorAll(".tab > ul > li");
    const tabPanel = e.querySelectorAll(".tab-conts");

    function tab() {
      layerTabEle.forEach((ele) => {
        const control = ele.getAttribute("aria-controls");
        const selectedTabPanel = document.getElementById(control);

        if (ele.classList.contains("active")) {
          //선택됨 텍스트 추가
          ele.querySelector("button").append(tabAccTag);
        }

        ele.addEventListener("click", () => {
          layerTabInitial(); //레이어탭 초기화

          ele.classList.add("active");
          ele.querySelector("button").append(tabAccTag); //선택됨 텍스트 추가
          ele.setAttribute("aria-selected", "true");
          selectedTabPanel.classList.add("active");
        });
      });
    }

    //레이어탭 초기화
    function layerTabInitial() {
      layerTabEle.forEach((ele) => {
        ele.classList.remove("active");
        ele.setAttribute("aria-selected", "false");
        //ele.removeAttribute('style');
        if (ele.classList.contains("active")) {
          const text = ele.querySelector(".sr-only.created");
          ele.querySelector("button").removeChild(text);
        }
      });
      tabPanel.forEach((ele) => {
        ele.classList.remove("active");
        //ele.removeAttribute('style');
      });
    }
    tab();
  });
}

// 누리집 토글 이벤트 현재는 사용 안 함
/* ** nuriToggleEvent ** */
function nuriToggleEvent() {
  const _toggleBtns = document.querySelectorAll("#header-top .toggle-btn");
  _toggleBtns.forEach(($toggleBtn) => {
    $toggleBtn.addEventListener("click", ($btnAct) => {
      const $target = $btnAct.target.closest(".toggle-head");
      const $targetBody = $target.nextElementSibling;
      const _targetBodyH = $targetBody.querySelector(".inner").scrollHeight;
      const $srEl = $btnAct.target.querySelector(".sr-only");

      if (!$target.classList.contains("active")) {
        $srEl.innerText = "닫힘";
        $target.classList.add("active");
        $targetBody.classList.add("active");
        $targetBody.style.height = `${_targetBodyH}px`;
        window.addEventListener("resize", () => {
          if ($targetBody.classList.contains("active")) {
            const _targetBodyH = $targetBody.querySelector(".inner").scrollHeight;
            $targetBody.style.height = `${_targetBodyH}px`;
          }
        });
      } else {
        $srEl.innerText = "열림";
        $target.classList.remove("active");
        $targetBody.classList.remove("active");
        $targetBody.style.height = "";
      }
    });
  });
}

/*** * DATEPICKER * ***/
/* ** datepicker ** */
const krds_datepicker = {
  init: () => {
    const dateInput = document.querySelectorAll(".form-btn-datepicker");
    krds_datepicker.open(dateInput);
    krds_datepicker.selValue();
    krds_datepicker.closeDatepicker();
    krds_datepicker.closeSingle();
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".datepicker-conts")) {
        krds_datepicker.close();
      }
    });
  },
  tblHeightSet: () => {
    //datepicker table th, td height 세팅
    const cal = document.querySelectorAll(".datepicker-area");
    cal.forEach((e) => {
      const datepickerEl = e.querySelector(".datepicker-tbl");
      const cell = datepickerEl.querySelectorAll("th, td");
      cell.forEach((ele) => {
        const w = ele.clientWidth + 4; //윗간격 4px 추가
        const wResult = w.toFixed(2); //소수점 2자리에서 반올림됨
        ele.setAttribute("style", "height:" + wResult + "px");
      });
    });
  },
  contsHeightSet: () => {
    //datepicker contents layer height 세팅
    const cal = document.querySelectorAll(".datepicker-area");
    cal.forEach((e) => {
      const body = e.querySelector(".datepicker-body");
      const bodyConts = e.querySelectorAll(".datepicker-conts");
      bodyConts.forEach((ele) => {
        let contsHeight;
        if (ele.classList.contains("active")) {
          if (ele.classList.contains("datepicker-tbl-wrap")) {
            if (e.classList.contains("range")) {
              contsHeight = ele.querySelector(".datepicker-tbl").offsetHeight + ele.querySelector(".datepicker-btn-wrap").offsetHeight;
            } else {
              contsHeight = ele.querySelector(".datepicker-tbl").offsetHeight;
            }
          } else {
            contsHeight = "316";
          }
          body.setAttribute("style", "height: " + contsHeight + "px");
        }
      });
    });
  },
  open: (dateInput) => {
    //datepicker 열기
    dateInput.forEach((e) => {
      const cal = e.closest(".datepicker-conts").querySelector(".datepicker-area");
      const colConts = cal.querySelector(".datepicker-wrap");
      e.addEventListener("focus", () => {
        krds_datepicker.close();

        cal.classList.add("active");
        colConts.setAttribute("tabindex", "0");
        colConts.setAttribute("aria-hidden", "false");

        const activeLayer = cal.querySelector(".datepicker-tbl-wrap");
        activeLayer.classList.add("active");
        activeLayer.setAttribute("tabindex", "0");
        activeLayer.setAttribute("aria-hidden", "false");

        krds_datepicker.tblHeightSet();
        krds_datepicker.contsHeightSet();

        setTimeout(() => {
          colConts.focus();
        }, 50);
      });
    });
  },
  close: () => {
    //datepicker 닫기
    const cal = document.querySelectorAll(".datepicker-area");
    cal.forEach((e) => {
      const colConts = e.querySelector(".datepicker-wrap");
      e.classList.remove("active");
      colConts.setAttribute("tabindex", "-1");
      colConts.setAttribute("aria-hidden", "true");
    });
  },
  contentsInitialize: () => {
    const cal = document.querySelectorAll(".datepicker-area");
    cal.forEach((e) => {
      const bodyConts = e.querySelectorAll(".datepicker-conts");
      bodyConts.forEach((ele) => {
        ele.classList.remove("active");
        ele.setAttribute("tabindex", "-1");
        ele.setAttribute("aria-hidden", "true");
      });
    });
  },
  selValue: () => {
    const cal = document.querySelectorAll(".datepicker-area");
    cal.forEach((e) => {
      const changeCalBtn = e.querySelectorAll(".datepicker-conts .sel .btn");
      const setBtn = e.querySelectorAll(".datepicker-btn-wrap .btn");

      const yearBtn = e.querySelector(".btn-cal-switch.year");
      const monBtn = e.querySelector(".btn-cal-switch.month");

      let activeLayer;
      yearBtn.addEventListener("click", () => {
        //년도 레이어 활성화
        krds_datepicker.contentsInitialize();
        activeLayer = e.querySelector(".datepicker-year-wrap");
        activeLayer.classList.add("active");
        activeLayer.setAttribute("tabindex", "0");
        activeLayer.setAttribute("aria-hidden", "false");
        setTimeout(() => {
          activeLayer.focus();
        }, 50);
        krds_datepicker.contsHeightSet();
      });
      monBtn.addEventListener("click", () => {
        //월 레이어 활성화
        krds_datepicker.contentsInitialize();
        activeLayer = e.querySelector(".datepicker-mon-wrap");
        activeLayer.classList.add("active");
        activeLayer.setAttribute("tabindex", "0");
        activeLayer.setAttribute("aria-hidden", "false");
        setTimeout(() => {
          activeLayer.focus();
        }, 50);
        krds_datepicker.contsHeightSet();
      });
      setBtn.forEach((ele) => {
        //확인 취소버튼 클릭하면 datepicker 닫힘
        ele.addEventListener("click", () => {
          krds_datepicker.close();
        });
      });
      changeCalBtn.forEach((ele) => {
        //년도 또는 월 선택하면 캘린더 레이어 활성화
        ele.addEventListener("click", () => {
          krds_datepicker.contentsInitialize();
          activeLayer = e.querySelector(".datepicker-tbl-wrap");
          activeLayer.classList.add("active");
          activeLayer.setAttribute("tabindex", "0");
          activeLayer.setAttribute("aria-hidden", "false");
          setTimeout(() => {
            activeLayer.focus();
          }, 50);
          krds_datepicker.contsHeightSet();
        });
      });
    });
  },
  closeDatepicker: () => {
    const cal = document.querySelectorAll(".datepicker-area");
    cal.forEach((e) => {
      const bodyConts = e.querySelectorAll(".datepicker-conts");
      let lastElement;
      bodyConts.forEach((ele) => {
        if (ele.classList.contains("datepicker-tbl-wrap")) {
          if (e.classList.contains("range")) {
            lastElement = ele.querySelector(".datepicker-btn-wrap > .btn:last-child");
          } else {
            lastElement = ele.querySelector(".datepicker-tbl tbody tr:last-child > td:last-child .btn-set-date");
          }
        } else {
          lastElement = ele.querySelector(".sel > li:last-child > .btn");
        }
        lastElement.addEventListener("blur", () => {
          krds_datepicker.close();
        });
      });
    });
  },
  closeSingle: () => {
    const cal = document.querySelectorAll(".datepicker-area");
    cal.forEach((e) => {
      const colConts = e.querySelector(".datepicker-wrap");

      if (colConts.classList.contains("single")) {
        const calBtn = colConts.querySelectorAll(".datepicker-tbl .btn-set-date");
        calBtn.forEach((ele) => {
          ele.addEventListener("click", () => {
            krds_datepicker.close();
          });
        });
      }
    });
  },
};

/*** * 웹 : 전체메뉴 수정중  * ***/
const krds_pcGnb = {
  init() {
    const gnbMenu = document.querySelector(".krds-gnb .gnb-menu");
    if (!gnbMenu) return;

    // gnb 속성설정
    gnbMenu.setAttribute("aria-label", "메인 메뉴");
    gnbMenu.setAttribute("role", "menubar");

    // li 요소 role 초기화
    gnbMenu.querySelectorAll("li").forEach((li) => li.setAttribute("role", "none"));

    // backdrop 설정
    this.backdrop = document.querySelector(".gnb-backdrop") || this.createBackdrop();

    // trigger 설정 및 이벤트 등록
    const mainTriggers = gnbMenu.querySelectorAll(".gnb-main-trigger");
    const subTriggers = gnbMenu.querySelectorAll(".gnb-sub-trigger");
    mainTriggers.forEach((mainTrigger) => this.setupMainTrigger(mainTrigger));

    this.addEvent(mainTriggers, subTriggers);
    this.addKeyboardNavigation(mainTriggers);
  },
  setupMainTrigger(mainTrigger) {
    const toggleWrap = mainTrigger.nextElementSibling;
    if (toggleWrap) {
      const uniqueIdx = `gnb-main-menu-${Math.random().toString(36).substring(2, 9)}`;
      mainTrigger.setAttribute("role", "menuitem");
      mainTrigger.setAttribute("aria-controls", uniqueIdx);
      mainTrigger.setAttribute("aria-expanded", "false");
      mainTrigger.setAttribute("aria-haspopup", "true");
      toggleWrap.setAttribute("id", uniqueIdx);
      toggleWrap.setAttribute("role", "menu");

      const mainList = toggleWrap.querySelector(".gnb-main-list");
      if (mainList?.getAttribute("data-has-submenu") === "true") {
        const subTriggers = mainList.querySelectorAll(".gnb-sub-trigger");
        if (subTriggers.length > 0) {
          subTriggers[0].classList.add("active");
          subTriggers[0].nextElementSibling?.classList.add("active");
        }
        subTriggers.forEach((subTrigger) => this.setupSubTrigger(subTrigger));
      }
    }
  },
  setupSubTrigger(subTrigger) {
    const hasMenu = subTrigger.nextElementSibling;
    if (hasMenu) {
      const uniqueIdx = `gnb-sub-menu-${Math.random().toString(36).substring(2, 9)}`;
      subTrigger.setAttribute("role", "menuitem");
      subTrigger.setAttribute("aria-controls", uniqueIdx);
      subTrigger.setAttribute("aria-expanded", "false");
      subTrigger.setAttribute("aria-haspopup", "true");
      hasMenu.setAttribute("role", "menu");
      hasMenu.setAttribute("id", uniqueIdx);
    }
  },
  toggleMainMenu(mainTrigger) {
    this.menuReset();
    const isActive = mainTrigger.classList.contains("active");
    if (!isActive && mainTrigger.nextElementSibling) {
      mainTrigger.setAttribute("aria-expanded", "true");
      mainTrigger.classList.add("active");
      mainTrigger.nextElementSibling.classList.add("is-open");
      this.toggleBackdrop(true);
      this.scrollbar(true);
      this.adjustSubMenuHeight(mainTrigger.nextElementSibling.querySelector(".gnb-main-list"));
    } else {
      this.close();
    }
  },
  toggleSubMenu(subTrigger) {
    const otherSubTriggers = subTrigger.closest("ul").querySelectorAll(".gnb-sub-trigger");
    otherSubTriggers.forEach((trigger) => {
      trigger.classList.remove("active");
      trigger.setAttribute("aria-expanded", "false");
      trigger.nextElementSibling?.classList.remove("active");
    });
    subTrigger.classList.add("active");
    subTrigger.setAttribute("aria-expanded", "true");
    subTrigger.nextElementSibling?.classList.add("active");
    this.adjustSubMenuHeight(subTrigger.closest(".gnb-main-list"));
  },
  createBackdrop() {
    const backdrop = document.createElement("div");
    backdrop.classList.add("gnb-backdrop");
    backdrop.style.display = "none";
    document.body.appendChild(backdrop);
    return backdrop;
  },
  toggleBackdrop(isOpen) {
    this.backdrop.style.display = isOpen ? "block" : "none";
    document.body.classList.toggle("is-gnb-web", isOpen);
  },
  adjustSubMenuHeight(target) {
    const activeSubList = target.querySelector(".gnb-sub-list.active");
    const height = activeSubList?.scrollHeight || 0;
    target.style.minHeight = `${height}px`;
  },
  scrollbar(hasScroll) {
    const condition = hasScroll === "open" ? document.body.scrollHeight > window.innerHeight : hasScroll;
    document.body.classList.toggle("hasScrollY", condition);
  },
  menuReset() {
    document.querySelectorAll(".krds-gnb .gnb-main-trigger:not(.is-link)").forEach((mainTrigger) => {
      mainTrigger.classList.remove("active");
      mainTrigger.setAttribute("aria-expanded", "false");
    });
    document.querySelectorAll(".krds-gnb .gnb-toggle-wrap").forEach((toggleWrap) => {
      toggleWrap.classList.remove("is-open");
    });
  },
  close() {
    this.toggleBackdrop(false);
    this.menuReset();
    this.scrollbar(false);
  },
  addEvent(mainTriggers, subTriggers) {
    this.backdrop.addEventListener("click", () => this.close());
    window.addEventListener("keyup", (event) => {
      if (event.code === "Escape" || !event.target.closest(".krds-gnb")) {
        this.close();
      }
    });
    mainTriggers.forEach((mainTrigger) => {
      mainTrigger.addEventListener("click", () => this.toggleMainMenu(mainTrigger));
    });
    subTriggers.forEach((subTrigger) => {
      subTrigger.addEventListener("click", () => this.toggleSubMenu(subTrigger));
    });
  },
  addKeyboardNavigation(mainTriggers) {
    const focusMenuItem = (element) => {
      if (element) {
        element.focus();
      }
    };
    const findFocusableElement = (element, direction) => {
      const sibling = direction === "next" ? "nextElementSibling" : "previousElementSibling";
      const parent = element.closest("li")?.[sibling];
      return parent ? parent.querySelector("[data-trigger]") : null;
    };
    document.addEventListener("keydown", (event) => {
      const target = event.target;
      if (target.getAttribute("data-trigger")) {
        switch (event.key) {
          case "Home":
            event.preventDefault();
            focusMenuItem(mainTriggers[0]);
            break;
          case "End":
            event.preventDefault();
            focusMenuItem(mainTriggers[mainTriggers.length - 1]);
            break;
          case "ArrowRight":
          case "ArrowDown":
            event.preventDefault();
            const nextElement = findFocusableElement(target, "next");
            focusMenuItem(nextElement);
            break;
          case "ArrowLeft":
          case "ArrowUp":
            event.preventDefault();
            const previousElement = findFocusableElement(target, "prev");
            focusMenuItem(previousElement);
            break;
          default:
            break;
        }
      }
    });
  },
};

/*** * 모바일 : 전체메뉴 수정중 * ***/
const krds_moGnb = {
  init() {
    const mobileGnb = document.querySelector(".krds-gnb-mobile");
    if (!mobileGnb) return;

    mobileGnb.setAttribute("aria-hidden", "true");

    // 접근성 임시
    // tab으로 설정 
    const tabList = document.querySelector(".gnb-menu");
    tabList.setAttribute("role", "tablist");
    const tabs = document.querySelectorAll(".menu-wrap .gnb-main-trigger");
    tabs.forEach((item, idx) => {
      item.setAttribute("role", "tab");
      item.setAttribute("aria-selected", "false");
      item.setAttribute("aria-controls", item.getAttribute("href").substring(1));
      item.setAttribute("id", `tab-${idx}`);
    })
    const tabPanels = document.querySelectorAll(".submenu-wrap .gnb-sub-list");
    tabPanels.forEach((item, idx) => {
      item.setAttribute("role", "tabpanel");
      item.setAttribute("aria-labelledby", `tab-${idx}`);
    })

    this.addEvent(mobileGnb);
  },
  addEvent(mobileGnb) {
    const id = mobileGnb.getAttribute("id");
    const openGnb = document.querySelector(`[aria-controls=${id}]`);
    const closeGnb = mobileGnb.querySelector("#close-nav");

    openGnb.addEventListener("click", () => this.open(mobileGnb));
    closeGnb.addEventListener("click", () => this.close(mobileGnb));
    this.anchorScroll(mobileGnb);
    this.anchor(mobileGnb);
  },
  open(mobileGnb) {
    const id = mobileGnb.getAttribute("id");
    const openGnb = document.querySelector(`[aria-controls=${id}]`);
    const header = document.querySelector("#header");
    const navContainer = mobileGnb.querySelector(".gnb-wrap");
    
    openGnb.setAttribute("aria-expanded", "true");

    header.style.zIndex = "1000";
    mobileGnb.setAttribute("aria-hidden", "false");
    mobileGnb.classList.add("is-backdrop");
    mobileGnb.classList.add("is-open");
    navContainer.setAttribute("tabindex", 0);
    document.body.classList.add("is-gnb-mobile");

    mobileGnb.addEventListener("transitionend", function onTransitionEnd() {
      navContainer.focus();
      mobileGnb.removeEventListener("transitionend", onTransitionEnd);
    });
    // focusTrap 임시
    this.focusTrap(mobileGnb);
  },
  close(mobileGnb) {
    const id = mobileGnb.getAttribute("id");
    const openGnb = document.querySelector(`[aria-controls=${id}]`);
    const header = document.querySelector("#header");
    const navContainer = mobileGnb.querySelector(".gnb-wrap");

    openGnb.setAttribute("aria-expanded", "false");

    mobileGnb.classList.remove("is-open");
    mobileGnb.addEventListener("transitionend", function onTransitionEnd() {
      header.style.zIndex = "";
      navContainer.removeAttribute("tabindex");
      mobileGnb.classList.remove("is-backdrop");
      mobileGnb.setAttribute("aria-hidden", "ture");
      document.body.classList.remove("is-gnb-mobile");
      openGnb.focus();
      mobileGnb.removeEventListener("transitionend", onTransitionEnd);
    });
  },
  anchorScroll(mobileGnb) {
    const gnbBody = mobileGnb.querySelector(".gnb-body");
    const navContainer = mobileGnb.querySelector(".gnb-wrap");
    const navItems = mobileGnb.querySelectorAll(".submenu-wrap .gnb-sub-list");
    const headerTabArea = mobileGnb.querySelector(".gnb-tab-nav");
    const headerTabMenu = headerTabArea?.querySelector(".menu-wrap");

    gnbBody.addEventListener("scroll", () => {
      const scrollTop = gnbBody.scrollTop;
      const scrollHeight = gnbBody.scrollHeight;
      const bodyHeight = gnbBody.clientHeight;

      navItems.forEach((item) => {
        const id = item.getAttribute("id");
        const menuLink = mobileGnb.querySelector(`[href="#${id}"]`);
        const offset = item.offsetTop;
        if (scrollTop >= offset || bodyHeight + scrollTop >= scrollHeight) {
          this.anchormenuReset();
          menuLink.classList.add("active");
          // 접근성 임시
          menuLink.setAttribute("aria-selected", "true");
          if (headerTabArea) {
            const headerTabMenuUl = headerTabMenu.querySelector("ul");
            gnbBody.addEventListener('scrollend', () => {
              headerTabMenuUl.scrollLeft = menuLink.offsetLeft;
            });
            
          }
        }
      });

      this.handleTopScroll(headerTabArea, navContainer, gnbBody);
    });
  },
  handleTopScroll(headerTabArea, navContainer, gnbBody) {
    let lastBodyScrollY = 0;

    if (!headerTabArea) return; // 요소가 없을 경우 함수 종료

    gnbBody.addEventListener("scroll", (e) => {
      const bodyScrollY = e.target.scrollTop;

      if (bodyScrollY > 0) {
        headerTabArea.style.height = `${headerTabArea.scrollHeight}px`;
        headerTabArea.style.transition = "ease-out .4s";
        navContainer.classList.add("is-active");
      } else if (bodyScrollY < 50 && bodyScrollY < lastBodyScrollY) {
        headerTabArea.style.height = "";
        headerTabArea.style.transition = "ease-out .4s .2s";
        setTimeout(() => {
          navContainer.classList.remove("is-active");
        }, 600);
      }

      lastBodyScrollY = bodyScrollY;
    });
  },
  anchor(mobileGnb) {
    const menuItems = mobileGnb.querySelectorAll(".menu-wrap .gnb-main-trigger");
    const navItems = mobileGnb.querySelectorAll(".submenu-wrap .gnb-sub-list");

    menuItems[0].classList.add("active");
    // 접근성 임시
    menuItems[0].setAttribute("aria-selected", "true");

    navItems.forEach((item) => {
      const depth4Items = item.querySelectorAll(".is-depth4");
      if (depth4Items.length > 0) {
        depth4Items.forEach((el) => {
          el.addEventListener("click", (event) => this.handleDepth4Click(event, el));
        });
      }
    });
  },
  handleDepth4Click(event) {
    const target = event.target.nextElementSibling;
    const prevButton = target.querySelector(".trigger-prev");
    const closeButton = target.querySelector(".trigger-close");

    target.style.display = "block";
    setTimeout(() => {
      target.classList.add("is-open");
    }, 0);
    prevButton.focus();

    const depth4Close = () => {
      target.classList.remove("is-open");
      event.target.focus();
      setTimeout(() => {
        target.style.display = "";
      }, 400);
    };

    prevButton.addEventListener("click", depth4Close);
    closeButton.addEventListener("click", depth4Close);
  },
  anchormenuReset() {
    document.querySelectorAll(".krds-gnb-mobile .menu-wrap .gnb-main-trigger").forEach((menu) => {
      menu.classList.remove("active");
      // 접근성 임시
      menu.setAttribute("aria-selected", "false");
    });
  },
  focusTrap(mobileGnb) {
    const focusableElements = mobileGnb.querySelectorAll('a, button, [tabindex="0"], input, textarea, select');

    if (focusableElements.length === 0) return;

    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    // 포커스 순환
    const handleFocusTrap = (event) => {
      if (event.key === "Tab") {
        if (event.shiftKey && document.activeElement === firstFocusableElement) {
          event.preventDefault();
          lastFocusableElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastFocusableElement) {
          event.preventDefault();
          firstFocusableElement.focus();
        }
      }
    };

    firstFocusableElement.addEventListener("keydown", handleFocusTrap);
    lastFocusableElement.addEventListener("keydown", handleFocusTrap);

    // 모달 오픈 후 첫 초점 역방향 제어
    mobileGnb.addEventListener("keydown", (event) => {
      if (event.key === "Tab" && event.shiftKey && document.activeElement === mobileGnb) {
        event.preventDefault();
        lastFocusableElement.focus();
      }
    });
  },
};

/*** * lnb menu 수정완 * ***/
const krds_lnbMenu = {
  init() {
    const menuBars = document.querySelectorAll(".krds-lnb .lnb-list");
    menuBars.forEach((menuBar) => {
      menuBar.setAttribute("role", "menubar");
      const menuItems = menuBar.querySelectorAll("li");
      menuItems.forEach((menuItem) => {
        menuItem.setAttribute("role", "none");
        const button = menuItem.querySelector(".lnb-btn");
        if (button) {
          button.setAttribute("role", "menuitem");
          if (button.className.includes("lnb-toggle")) {
            // 버튼에 aria-controls 및 aria-expanded 속성을 설정
            const uniqueIdx = `lnbmenu-${Math.random().toString(36).substring(2, 9)}`;
            const subMenu = button.nextElementSibling;
            button.setAttribute("aria-controls", uniqueIdx);
            button.setAttribute("aria-expanded", "false");
            // 버튼의 서브메뉴가 팝업일때 aria-haspopup 설정
            if (button.classList.contains("lnb-toggle-popup")) {
              button.setAttribute("aria-haspopup", "true");
            }
            // 서브메뉴 id와 role을 설정
            if (subMenu && subMenu.className.includes("lnb-submenu")) {
              // 서브메뉴가 팝업일때 분기
              const subMenuList = subMenu.classList.contains("lnb-submenu-lv2") ? subMenu : subMenu.querySelector(":scope > ul");
              if (subMenuList) {
                subMenuList.setAttribute("id", uniqueIdx);
                subMenuList.setAttribute("role", "menu");
              }
            }
          }
        }
      });
    });
    this.attachDepthToggleEvent();
    this.attachDepthPopupEvent();
    // 활성화된 페이지를 찾는 예
    this.activePage();
  },
  toggleMenu(toggleButton, expand) {
    const parentLi = toggleButton.closest("li");
    toggleButton.setAttribute("aria-expanded", expand);
    toggleButton.classList.toggle("active", expand);
    parentLi.classList.toggle("active", expand);
  },
  closeSiblingMenus(currentButton) {
    const parentLi = currentButton.closest("li");
    parentLi.parentNode.querySelectorAll(":scope > li > .lnb-toggle").forEach((otherButton) => {
      if (otherButton !== currentButton) {
        this.toggleMenu(otherButton, false);
      }
    });
  },
  attachDepthToggleEvent() {
    document.querySelectorAll(".krds-lnb .lnb-list .lnb-toggle").forEach((toggleButton) => {
      toggleButton.addEventListener("click", () => {
        const isExpanded = toggleButton.getAttribute("aria-expanded") === "true";
        this.toggleMenu(toggleButton, !isExpanded);
        this.closeSiblingMenus(toggleButton);
      });
    });
  },
  attachDepthPopupEvent() {
    let lastClickedButton = null;

    document.querySelectorAll(".lnb-toggle-popup").forEach((toggleButton) => {
      toggleButton.addEventListener("click", () => {
        const subMenuLv2 = toggleButton.nextElementSibling;
        if (subMenuLv2 && subMenuLv2.classList.contains("lnb-submenu-lv2")) {
          subMenuLv2.classList.add("active");
          toggleButton.setAttribute("aria-expanded", "true");
          subMenuLv2.addEventListener("transitionend", function onTransitionEnd() {
            const subMenuTitleButton = subMenuLv2.querySelector(".lnb-btn-tit");
            if (subMenuTitleButton) {
              subMenuTitleButton.focus();
            }
            subMenuLv2.removeEventListener("transitionend", onTransitionEnd);
          });
          lastClickedButton = toggleButton;
        }
      });
    });

    document.querySelectorAll(".lnb-submenu-lv2").forEach((subMenuLv2) => {
      subMenuLv2.addEventListener("focusout", (event) => {
        // 포커스가 서브메뉴 밖으로 나갔는지 확인
        if (!subMenuLv2.contains(event.relatedTarget)) {
          subMenuLv2.classList.remove("active");
          if (lastClickedButton) {
            lastClickedButton.focus();
            lastClickedButton.setAttribute("aria-expanded", "false");
            subMenuLv2.addEventListener("transitionend", function onTransitionEnd() {
              lastClickedButton.focus();
              subMenuLv2.removeEventListener("transitionend", onTransitionEnd);
            });
          }
        }
      });
      // lnb-btn-tit 클릭 시 서브메뉴 닫기
      const subMenuTitleButton = subMenuLv2.querySelector(".lnb-btn-tit");
      if (subMenuTitleButton) {
        subMenuTitleButton.addEventListener("click", () => {
          if (lastClickedButton) {
            lastClickedButton.focus();
          }
        });
      }
    });
  },
  activePage() {
    // 활성화된 페이지를 찾는 예(개발 환경에 맞게 수정)
    const currentPage = window.location.pathname.split("/").slice(-1)[0].replace(".html", "");
    const lnbLinks = document.querySelectorAll(".krds-lnb .lnb-link");
    lnbLinks.forEach((link) => {
      const linkPage = link.getAttribute("href").split("/").pop().replace(".html", "");
      if (linkPage === currentPage) {
        link.closest(".lnb-item").classList.add("active");
        link.closest(".lnb-item").querySelector(".lnb-toggle").classList.add("active");
        link.closest(".lnb-item").querySelector(".lnb-toggle").setAttribute("aria-expanded", "true");
        link.closest("li").classList.add("active");
        // 접근성 현재 페이지 표시 aria-current
        link.setAttribute("aria-current", "page");
      }
    });
  },
};

/*** * accordion 수정완 * ***/
const krds_accordion = {
  init() {
    const accordionButtons = document.querySelectorAll(".btn-accordion");
    this.attachAccordionEvent(accordionButtons);
  },
  setAriaAttributes(accordionButton, accordionContent, idx) {
    const uniqueIdx = `${idx}${Math.random().toString(36).substring(2, 9)}`;
    accordionButton.setAttribute("aria-expanded", "false");
    accordionButton.setAttribute("id", `accordionHeader-id-${uniqueIdx}`);
    accordionButton.setAttribute("aria-controls", `accordionCollapse-id-${uniqueIdx}`);
    accordionContent.setAttribute("role", "region");
    accordionContent.setAttribute("id", `accordionCollapse-id-${uniqueIdx}`);
    accordionContent.setAttribute("aria-labelledby", `accordionHeader-id-${uniqueIdx}`);
  },
  attachAccordionEvent(accordionButtons) {
    accordionButtons.forEach((accordionButton, idx) => {
      const accordionContainer = accordionButton.closest(".krds-accordion");
      const accordionItems = accordionContainer.querySelectorAll(".accordion-item");
      const currentItem = accordionButton.closest(".accordion-item");
      const accordionContent = currentItem.querySelector(".accordion-collapse");
      const accordionType = accordionContainer.dataset.type || "singleOpen";
      const isOpen = accordionContainer.classList.contains("is-open");

      // 접근성 속성 초기값 설정
      this.setAriaAttributes(accordionButton, accordionContent, idx);

      // isOpen 상태 설정
      if (isOpen || currentItem.classList.contains("active")) {
        accordionButton.setAttribute("aria-expanded", "true");
        accordionButton.classList.add("active");
        currentItem.classList.add("active");
      }

      // accordionButton 이벤트
      accordionButton.addEventListener("click", () => {
        const isExpanded = accordionButton.getAttribute("aria-expanded") === "true";
        if (accordionType !== "multiOpen" && !currentItem.classList.contains("active")) {
          accordionItems.forEach((otherItem) => {
            const otherButton = otherItem.querySelector(".btn-accordion");
            otherButton.setAttribute("aria-expanded", "false");
            otherButton.classList.remove("active");
            otherItem.classList.remove("active");
          });
        }
        accordionButton.setAttribute("aria-expanded", !isExpanded);
        accordionButton.classList.toggle("active", !isExpanded);
        currentItem.classList.toggle("active", !isExpanded);
      });
    });
  },
};

/*** * modal 수정중 * ***/
const krds_modal = {
  init() {
    const modalTriggers = document.querySelectorAll(".open-modal");
    const modalCloseTriggers = document.querySelectorAll(".close-modal");
    const bodyElement = document.querySelector("body");

    this.setupTriggers(modalTriggers, modalCloseTriggers, bodyElement);
  },
  autoOpenModal(id) {
    const bodyElement = document.querySelector("body");
    this.openModal(id, bodyElement);
  },
  setupTriggers(modalTriggers, modalCloseTriggers, bodyElement) {
    // open
    modalTriggers.forEach((trigger) => {
      trigger.addEventListener("click", (event) => {
        const modalId = trigger.getAttribute("data-target");

        trigger.setAttribute("data-modal-id", modalId);
        trigger.classList.add("modal-opened");
        trigger.setAttribute("tabindex", "-1");

        this.openModal(modalId, bodyElement);
        event.preventDefault();
      });
    });
    // close
    modalCloseTriggers.forEach((trigger) => {
      trigger.addEventListener("click", () => {
        const modalId = trigger.closest(".modal").getAttribute("id");
        this.closeModal(modalId, bodyElement);
      });
    });
  },
  focusTrap(dialogElement) {
    const focusableElements = dialogElement.querySelectorAll('a, button, [tabindex="0"], input, textarea, select');

    if (focusableElements.length === 0) return;

    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    // 포커스 순환
    const handleFocusTrap = (event) => {
      if (event.key === "Tab") {
        if (event.shiftKey && document.activeElement === firstFocusableElement) {
          event.preventDefault();
          lastFocusableElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastFocusableElement) {
          event.preventDefault();
          firstFocusableElement.focus();
        }
      }
    };

    firstFocusableElement.addEventListener("keydown", handleFocusTrap);
    lastFocusableElement.addEventListener("keydown", handleFocusTrap);

    // 모달 오픈 후 첫 초점 역방향 제어
    dialogElement.addEventListener("keydown", (event) => {
      if (event.key === "Tab" && event.shiftKey && document.activeElement === dialogElement) {
        event.preventDefault();
        lastFocusableElement.focus();
      }
    });
  },
  openModal(id, bodyElement) {
    const modalElement = document.getElementById(id);
    const dialogElement = modalElement.querySelector(".modal-content");
    const modalBack = modalElement.querySelector(".modal-back");

    dialogElement.setAttribute("tabindex", "0");
    bodyElement.classList.add("scroll-no");
    modalElement.setAttribute("aria-hidden", "false");
    modalBack.classList.add("in");
    modalElement.classList.add("shown");

    // 임시 푸터 zindex 헤더에서 팝업 위치 바꿔서...
    if (modalElement.dataset.type === "full") {
      const footerWrap = modalElement.closest("#footer");
      if (footerWrap) {
        footerWrap.style.zIndex = 70;
      }
    }

    // ????
    setTimeout(() => {
      modalElement.classList.add("in");
    }, 150);
    //열린 팝업창 포커스 // ????
    setTimeout(() => {
      dialogElement.focus();
    }, 350);

    this.focusTrap(dialogElement);
    this.updateZIndex(modalElement);
  },
  closeModal(id, bodyElement) {
    const modalElement = document.getElementById(id);
    const dialogElement = modalElement.querySelector(".modal-content");
    const openModals = document.querySelectorAll(".modal.in:not(.sample)");

    modalElement.setAttribute("aria-hidden", "true");
    modalElement.classList.remove("in");
    dialogElement.removeAttribute("tabindex");

    // 임시 푸터 zindex 헤더에서 팝업 위치 바꿔서...
    if (modalElement.dataset.type === "full") {
      const footerWrap = modalElement.closest("#footer");
      if (footerWrap) {
        footerWrap.style.zIndex = 50;
      }
    }

    // ?????
    setTimeout(() => {
      modalElement.classList.remove("shown");
    }, 350);

    if (openModals.length < 2) {
      bodyElement.classList.remove("scroll-no");
    }

    this.returnFocusToTrigger(id);
  },
  updateZIndex(modalElement) {
    const openModals = document.querySelectorAll(".modal.in:not(.sample)");
    const openModalsLengtn = openModals.length + 1;
    const newZIndex = 1010 + openModalsLengtn;
    if (openModalsLengtn > 1) {
      modalElement.style.zIndex = newZIndex;
    }
  },
  returnFocusToTrigger(id) {
    const triggerButton = document.querySelector(`.modal-opened[data-modal-id="${id}"]`);
    if (triggerButton) {
      triggerButton.focus();
      triggerButton.setAttribute("tabindex", "0");
      triggerButton.classList.remove("modal-opened");
      triggerButton.removeAttribute("data-modal-id");
    }
  },
};

/*** * krds_dropEvent * ***/
const krds_dropEvent = {
  init: () => {
    krds_dropEvent.dropOpen();
  },
  dropOpen: () => {
    const _dropBtns = document.querySelectorAll(`.krds-drop-wrap .drop-btn`);

    _dropBtns.forEach(($dropBtn) => {
      const _span = document.createElement("span");
      const _txt = document.createTextNode("열기");
      _span.classList.add("sr-only");
      _span.appendChild(_txt);

      $dropBtn.appendChild(_span);

      $dropBtn.addEventListener("click", ($el) => {
        const $menu = $el.target.nextElementSibling;
        const $srTxt = $el.target.querySelector(".sr-only");
        if ($menu.style.display !== "block") {
          krds_dropEvent.dropClose();
          $menu.style.display = "block";
          $el.target.classList.add("active");
          $srTxt.textContent = "닫기";
        } else {
          krds_dropEvent.dropClose();
          $srTxt.textContent = "열기";
        }
      });
    });

    document.addEventListener("click", ($e) => {
      if (!$e.target.closest(`.krds-drop-wrap`)) krds_dropEvent.dropClose();
    });
  },
  dropClose: () => {
    const _dropBtns = document.querySelectorAll(`.krds-drop-wrap .drop-btn`);
    const _dropMenus = document.querySelectorAll(`.krds-drop-wrap .drop-menu`);
    _dropMenus.forEach(($menu) => {
      $menu.style.display = "";
    });
    _dropBtns.forEach(($btn) => {
      $btn.classList.remove("active");
    });
  },
};

/*** * tooltip * ***/
const krds_tooltip = {
  init: () => {
    krds_tooltip.tooltipEvent();
  },
  tooltipEvent: () => {
    const _toolBtns = document.querySelectorAll(".krds-tooltip-wrap .tool-btn");

    _toolBtns.forEach(($toolBtn) => {
      const _span = document.createElement("span");
      const _txt = document.createTextNode("열기");

      _span.classList.add("sr-only");
      _span.appendChild(_txt);

      $toolBtn.innerHTML = "";
      $toolBtn.appendChild(_span);

      $toolBtn.addEventListener("click", ($el) => {
        const $parent = $toolBtn.closest(".krds-tooltip-wrap");
        const $closeBtn = $parent.querySelector(".tool-close");
        const $cnt = $parent.querySelector(".tool-in");
        const $srTxt = $el.target.querySelector(".sr-only");
        if ($cnt.style.display !== "block") {
          $cnt.style.display = "block";
          $cnt.setAttribute("tabindex", 0);
          $srTxt.textContent = "닫기";
          krds_tooltip.tooltipResize($parent, $cnt);
        }
        $closeBtn.addEventListener("click", () => {
          $srTxt.textContent = "열기";
          $cnt.style.display = "";
          $cnt.removeAttribute("tabindex");
          $toolBtn.focus();
          krds_tooltip.tooltipResize($parent, $cnt);
        });

        window.addEventListener("resize", () => {
          krds_tooltip.tooltipResize($parent, $cnt);
        });
      });
    });
  },
  tooltipResize: ($parent, $cnt) => {
    if (winSize === "mob") {
      krds_tooltip.tooltipMob($parent, $cnt);
    } else {
      krds_tooltip.tooltipPc($cnt);
    }
    window.addEventListener("resize", () => {
      if (winSize === "mob") {
        krds_tooltip.tooltipMob($cnt);
      } else {
        krds_tooltip.tooltipPc($cnt);
      }
    });
  },
  tooltipMob: ($parent, $cnt) => {
    const _offsetL = $parent.offsetLeft - 16;
    const _width = document.body.clientWidth;
    const _offsetR = _width - ($parent.clientWidth + _offsetL) - 32;
    if ($cnt) {
      $cnt.style.left = `-${_offsetL}px`;
      $cnt.style.right = `-${_offsetR}px`;
    }
  },
  tooltipPc: ($cnt) => {
    $cnt.style.left = "";
    $cnt.style.right = "";
  },
};

//공색배너(Masthead) 스크롤 시 class 추가
//도움패널(helperArea) 상단여백 움직임 컨트롤에 필요 추후애 intersectionobserver 변경 후 삭제
function lineBnScroll() {
  const $bn = document.querySelector("#header-top");
  if (!$bn) return;
  const $bnHeight = $bn.offsetHeight;
  const $body = document.querySelector("body");
  function onScroll() {
    const scrollY = window.scrollY;
    if (scrollY > $bnHeight) {
      $body.classList.add("bn-hidden");
    } else {
      $body.classList.remove("bn-hidden");
    }
  }
  window.addEventListener("scroll", () => {
    requestAnimationFrame(onScroll);
  });
  onScroll();
}
// lineBnScroll();

/* ** 도움말 ** */
const helperArea = document.querySelectorAll(".helper-area");
const helperBox = {
  init: () => {
    if (helperArea.length > 0) {
      //해당 클래스 존재할떄만 실행
      setTimeout(() => {
        helperBox.paddingSet();
      }, 50);
      setTimeout(() => {
        helperBox.heightSet();
      }, 100);
    }
  },
  paddingSet: () => {
    //영역 세팅
    const bnH = document.querySelector("#header-top").offsetHeight;
    const headerH = document.querySelector("#header").offsetHeight;

    const defaultPadding = bnH + headerH;
    const bnHiddgnPadding = headerH;

    const $wrap = document.querySelector("#wrap");
    const $expandBtn = document.querySelector(".btn-helper.expand");
    const $expandBox = document.querySelector(".helper-wrap");

    const $collapseBtn = document.querySelector(".btn-helper.fold");
    if (document.body.classList.contains("bn-hidden")) {
      //top banner 안보임
      if ($wrap.classList.contains("scroll-down")) {
        //header영역 안보임
        $expandBtn.style.marginTop = "0";
        if (winSize == "pc") {
          $expandBox.style.paddingTop = "0";
          $collapseBtn.style.marginTop = "0";
        } else {
          $expandBox.removeAttribute("style");
          $collapseBtn.removeAttribute("style");
        }
      } else {
        //header영역 보임
        $expandBtn.style.marginTop = bnHiddgnPadding + "px";
        if (winSize == "pc") {
          $expandBox.style.paddingTop = bnHiddgnPadding + "px";
          $collapseBtn.style.marginTop = bnHiddgnPadding + "px";
        } else {
          $expandBox.style.paddingTop = "0";
          $collapseBtn.removeAttribute("style");
        }
      }
    } else {
      //top banner 보임
      $expandBtn.style.marginTop = defaultPadding + "px";
      if (winSize == "pc") {
        $expandBox.style.paddingTop = defaultPadding + "px";
        $collapseBtn.style.marginTop = defaultPadding + "px";
      } else {
        $expandBox.removeAttribute("style");
        $collapseBtn.removeAttribute("style");
      }
    }
  },
  trigger: () => {
    //도움말열기 버튼에 추가한 class 삭제
    const btnExec = document.querySelectorAll(".btn-help-exec");
    if (helperArea.length > 0) {
      btnExec.forEach((e) => {
        e.classList.remove("btn-help-clicked");
      });
    }
  },
  expand: () => {
    //도움말버튼 클릭 시 실행
    const btnExec = document.querySelectorAll(".btn-help-exec");
    const target = document.querySelector(".helper-wrap");
    if (helperArea.length > 0) {
      btnExec.forEach((e) => {
        e.addEventListener("click", () => {
          helperBox.open();
          helperBox.trigger();
          e.classList.add("btn-help-clicked");
          setTimeout(() => {
            target.focus();
          }, 50);
        });
      });
    }
  },
  collapse: () => {
    //도움말 접어두기 버튼 클릭 시 실행
    const btn = document.querySelector(".btn-helper.fold");

    if (helperArea.length > 0) {
      btn.addEventListener("click", () => {
        if (winSize == "mob") {
          document.body.classList.remove("scroll-no");
        }
        helperBox.close();
      });
    }
  },
  open: () => {
    //도움말 열기
    if (helperArea.length > 0) {
      //해당 클래스 존재할떄만 실행
      const target = document.querySelector(".helper-wrap");
      const inner = document.querySelector("#container > .inner");
      const $header = document.querySelector("#header .head-body > .inner");
      const $container = document.querySelector("#container");
      const _width = document.body.clientWidth;
      if (winSize == "mob") {
        document.body.classList.add("scroll-no");
      }
      target.setAttribute("aria-expanded", "true");
      target.setAttribute("tabindex", "0");
      document.querySelector(".helper-area").classList.add("expand");

      if (inner.classList.contains("flexible")) {
        // 화면 사이즈 줄어들면 영역도 줄어들게
        inner.classList.remove("folded");
        $container.classList.remove("help-close");
        $container.classList.add("help-open");
        const _headerL = $header.offsetLeft;
        if (_width > 1024 && _width < 1900) {
          $container.classList.remove("help-open");
          $container.classList.add("help-open");
          $container.style.paddingRight = "";
          $container.style.paddingLeft = `${_headerL + 26}px`;
        }

        helperBox.resize($header, $container);
      }
    }
  },
  close: () => {
    //도움말 접기
    const $header = document.querySelector("#header .head-body > .inner");
    const $container = document.querySelector("#container");
    const target = document.querySelector(".helper-wrap");
    const inner = document.querySelector("#container > .inner");
    const trigger = document.querySelectorAll(".btn-help-clicked");
    const _width = document.body.clientWidth;
    target.setAttribute("aria-expanded", "false");
    target.removeAttribute("tabindex");
    document.querySelector(".helper-area").classList.remove("expand");

    if (trigger.length > 0) {
      //버튼 클릭으로 도움말 펼친경우 클릭한 버튼으로 포커스
      trigger[0].focus();
    }

    if (inner.classList.contains("flexible")) {
      // 도움말 닫히면 컨텐츠 영역 늘리기
      inner.classList.add("folded");
      $container.classList.add("help-close");
      $container.classList.remove("help-open");
      $container.style.paddingLeft = ``;
      if ($container.classList.contains("help-close")) {
        $container.style.paddingLight = ``;
        $container.style.paddingRight = ``;
      } else if (_width > 1900 || _width <= 1024) {
        $container.classList.remove("help-open");
        $container.classList.remove("help-close");
      }
      helperBox.resize($header, $container);
    }
  },
  resize: ($header, $container) => {
    window.addEventListener("resize", () => {
      const _headerL = $header.offsetLeft;
      const _width = document.body.clientWidth;
      if (_width > 1024 && _width < 1900) {
        $container.style.paddingRight = "";
        if ($container.classList.contains("help-open")) {
          $container.style.paddingLeft = `${_headerL + 26}px`;
        } else {
          $container.style.paddingLeft = ``;
        }
      } else if (_width <= 1024) {
        $container.style.paddingLeft = "";
        $container.style.paddingRight = "";
      } else {
        $container.style.paddingLeft = "";
      }
    });
  },
  heightSet: () => {
    const $helperArea = document.querySelector(".helper-area");
    const $expandBox = document.querySelector(".helper-wrap");
    const $contsArea = document.querySelector(".helper-conts-area");
    const helperTitH = document.querySelector(".helper-tit").offsetHeight;

    const contsPt = parseInt(getComputedStyle($expandBox).paddingTop);
    const contsAreaH = window.innerHeight - helperTitH - contsPt;

    $contsArea.style.height = contsAreaH + "px";

    if (winSize == "mob") {
      if ($helperArea.classList.contains("expand")) {
        document.body.classList.add("scroll-no");
      }
    } else {
      document.body.classList.remove("scroll-no");
    }
  },
};

/* ** 영역 높이 확장 축소 ** */
function collapseBox() {
  const box = document.querySelectorAll(".conts-expand-area");
  box.forEach((e) => {
    const btn = e.querySelector(".btn-conts-expand");
    if (btn != null) {
      btn.addEventListener("click", () => {
        e.classList.toggle("active");
      });
    }
  });
}

/* ** 박스형 체크박스 상태에 따른 디자인 변경 ** */
function chkBox() {
  const box = document.querySelectorAll(".chk-group-wrap");
  box.forEach((e) => {
    const boxList = e.querySelectorAll("li");
    boxList.forEach((ele) => {
      ele.removeAttribute("class");
      const thisList = ele.closest("li");
      const checkbox = ele.querySelector("input[type=checkbox]");
      if (checkbox != null) {
        const is_disabled = checkbox.disabled;
        let is_checked = checkbox.checked;

        if (is_disabled == true) {
          thisList.classList.add("disabled");
        } else {
          if (is_checked == true) {
            thisList.classList.add("checked");
          }
        }

        checkbox.addEventListener("click", () => {
          if (is_checked == true) {
            thisList.classList.remove("checked");
            is_checked = false;
          } else {
            thisList.classList.add("checked");
            is_checked = true;
          }
        });
      }

      const rdo = ele.querySelector("input[type=radio]");
      if (rdo != null) {
        const is_disabled = rdo.disabled;
        let is_checked = rdo.checked;

        if (is_disabled == true) {
          thisList.classList.add("disabled");
        } else {
          if (is_checked == true) {
            thisList.classList.add("checked");
          }
        }

        rdo.addEventListener("click", (e) => {
          const rdoGroup = rdo.closest(".chk-group-wrap");
          const rdoLi = rdoGroup.querySelectorAll("li");
          let is_checked2 = e.checked;
          rdoLi.forEach((ele) => {
            ele.classList.remove("checked");
            is_checked2 = false;
          });
          if (is_checked2 == true) {
            thisList.classList.remove("checked");
            is_checked2 = false;
          } else {
            thisList.classList.add("checked");
            is_checked2 = true;
          }
        });
      }
    });
  });
}

/* ** 스크롤 값 체크 ** */
let scrollY = window.scrollY;
let scrollH = document.body.scrollHeight;
function scrollVal() {
  scrollY = window.scrollY;
  scrollH = document.body.scrollHeight;
}

/* ** 스크롤 네비게이션 ** */
const winHeight = window.innerHeight;
const quickIndicators = document.querySelectorAll(".quick-list");

const quickNav = {
  init: () => {
    if (quickIndicators.length > 0) {
      //해당 클래스 존재할떄만 실행
      quickNav.linkNav();
    }
  },
  reset: () => {
    //초기화
    quickIndicators.forEach((e) => {
      const locationList = e.querySelectorAll("a");
      locationList.forEach((ele) => {
        ele.classList.remove("active");
      });
    });
  },
  linkNav: () => {
    //퀵 네비게이션 클릭 시 스크롤 이동
    quickIndicators.forEach((e) => {
      const locationList = e.querySelectorAll("a");
      locationList.forEach((ele) => {
        const target = document.querySelector(ele.getAttribute("href"));
        if (target) {
          const offsetY = target.getBoundingClientRect().top + scrollY;
          ele.addEventListener("click", (ev) => {
            ev.preventDefault();
            window.scrollTo({
              left: 0,
              top: offsetY,
              behavior: "smooth",
            });
          });
        }
      });
    });
  },
  navHighlight: () => {
    //페이지 스크롤 시 퀵 네비게이션 해당메뉴 active
    if (quickIndicators.length > 0) {
      const sectionArea = document.querySelectorAll(".section-link");
      if (sectionArea.length > 0) {
        const topHeight = Math.ceil(winHeight / 5);
        const firstSecTop = document.querySelectorAll(".scroll-check .section-link")[0].offsetTop;
        sectionArea.forEach((current) => {
          const sectionHeight = current.offsetHeight;
          const sectionTop = current.offsetTop - topHeight;
          const sectionId = current.getAttribute("id");
          if (scrollY <= firstSecTop) {
            //스크롤이 첫번째 섹션보다 위에 있으면 맨 위 네비 active
            document.querySelector(".conts-area > .quick-nav-area .quick-list li:first-of-type a").classList.add("active");
          } else if (scrollY + winHeight >= scrollH) {
            //스크롤이 맨 하단에 있으면 맨 아래 네비 active
            quickNav.reset();
            document.querySelector(".conts-area > .quick-nav-area .quick-list li:last-of-type a").classList.add("active");
          } else {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
              //스크롤이 해당 섹션
              document.querySelector(".conts-area > .quick-nav-area a[href*=" + sectionId + "]").classList.add("active");
            } else {
              document.querySelector(".conts-area > .quick-nav-area a[href*=" + sectionId + "]").classList.remove("active");
            }
          }
        });
      }
    }
  },
};

/* ** 스킵네비게이션 클릭 시 scroll 맨 위로 ** */
function goTop() {
  const $skip = document.querySelector("#skip-nav");
  $skip.addEventListener("click", () => {
    setTimeout(() => {
      window.scrollTo({
        left: 0,
        top: 0,
        behavior: "smooth",
      });
    }, 300);
  });
}

window.addEventListener("DOMContentLoaded", () => {
  // DOMContentLoaded 시 실행되는 초기화 함수들
  layerTab();
  krds_datepicker.init();
  krds_pcGnb.init();
  krds_moGnb.init();
  krds_lnbMenu.init();
  krds_accordion.init();
  krds_modal.init();
  krds_dropEvent.init();
  krds_tooltip.init();

  /* ** 윈도우 사이즈 체크 (반응형) ** */
  winSizeSet();

  /* ** 영역 높이 확장 축소 ** */
  collapseBox();

  /* ** 박스형 체크박스 상태에 따른 디자인 변경 ** */
  chkBox();

  /* ** 스크롤 네비게이션 ** */
  quickNav.init();

  /* ** 스킵네비게이션 클릭 시 scroll 맨 위로 ** */
  if (document.querySelector("#skip-nav") !== null) goTop();

  //gnb footer 등 include영역으로 로딩시간이 필요한경우 settimeout에 넣어줌 (배포시 삭제필요)
  setTimeout(() => {
    /* ** 도움말 ** */
    helperBox.init();
    if (winSize == "pc") {
      helperBox.open();
    }
    //클릭이벤트는 로드시에만 실행시키기
    helperBox.expand();
    helperBox.collapse();
  }, 200);
});

// 스크롤 관련 기능
let _lastScrollY = 0;
window.addEventListener("scroll", () => {
  /* ** 스크롤 값 체크 ** */
  scrollVal();

  /* ** 스크롤 네비게이션 ** */
  quickNav.navHighlight();

  // #wrap 요소에 스크롤 방향에 따른 클래스 추가
  const $wrap = document.querySelector("#wrap");
  if ($wrap) {
    const _conOffsetTop = document.querySelector("#container").offsetTop;
    const _scrollY = window.scrollY;
    const _scrollDown = _scrollY > _lastScrollY;
    const _scrollUp = _scrollY < _lastScrollY;
    if (_scrollY > _conOffsetTop + 50 && _scrollDown) {
      $wrap.classList.add("scroll-down");
      $wrap.classList.remove("scroll-up");
    } else if (_scrollY > _conOffsetTop + 50 && _scrollUp) {
      $wrap.classList.add("scroll-up");
      $wrap.classList.remove("scroll-down");
    } else {
      $wrap.classList.remove("scroll-down", "scroll-up");
    }
    _lastScrollY = _scrollY;
  }

  //gnb footer 등 include영역으로 로딩시간이 필요한경우 settimeout에 넣어줌 (배포시 삭제필요)
  setTimeout(() => {
    /* ** 도움말 ** */
    helperBox.init();
  }, 200);
});

window.addEventListener("resize", () => {
  /* ** 윈도우 사이즈 체크 (반응형) ** */
  winSizeSet();

  /* ** 도움말 ** */
  helperBox.init();
});
