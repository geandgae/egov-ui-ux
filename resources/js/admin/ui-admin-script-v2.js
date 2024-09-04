"use strict";

const initAdminUi = () => {
  // 페이지 구하기
  const pathParts = window.location.pathname.split("/");
  const currentDir = pathParts.slice(-2, -1)[0];
  const currentPage = pathParts.slice(-1)[0].replace(".html", "");

  // data
  const gnbData = [
    { name: "공통관리", url: "../test1/test.html", type: "link", sub: [] },
    { name: "메뉴관리", url: "../test2/test.html", type: "link", sub: [] },
    { name: "콘텐츠관리", url: "../test3/test.html", type: "link", sub: [] },
    { name: "통계관리", url: "../test4/test.html", type: "link", sub: [] },
    { name: "서브타입 : toggle-lv1", url: "", type: "toggle", sub: [{ name: "sub-link", url: "#;", type: "link", sub: [] }] },
    {
      name: "서브타입 : toggle-lv2",
      url: "",
      type: "toggle-lv2",
      sub: [
        { name: "sub-toggle", url: "#;", type: "toggle-sub", sub: [{ name: "sub-link", url: "#;", type: "link", sub: [] }] },
        { name: "sub-description", url: "#;", type: "toggle-description", sub: [{ name: "sub-link", url: "#;", type: "desc", desc: "description", sub: [] }] },
        { name: "sub-link", url: "#;", type: "link", sub: [] },
      ],
    },
  ];
  const lnbData = [
    {
      category: "test",
      dir: "test0",
      sub: [
        { name: "권한관리", file: "test", type: "link" },
        {
          name: "권한관리2",
          file: "#;",
          type: "toggle",
          sub: [
            { name: "권한관리2-sub1", file: "#;", type: "link" },
            {
              name: "권한관리2-sub2",
              file: "#;",
              type: "toggle",
              sub: [
                { name: "권한관리2-sub2-1", file: "#;", type: "link" },
                { name: "권한관리2-sub2-2", file: "#;", type: "link" },
              ],
            },
          ],
        },
      ],
    },
		{
      category: "공통 관리",
      dir: "test1",
      sub: [
        { name: "권한 관리", file: "test", type: "link" },
        { name: "그룹 관리", file: "test", type: "link" },
        { name: "사용자 관리", file: "test", type: "link" },
        { name: "접근 권한 관리", file: "test", type: "link" },
        { name: "공통 코드 관리", file: "test", type: "link" },
        { name: "사용 로그 관리", file: "test", type: "link" },
        { name: "접속 로그 관리", file: "test", type: "link" },
      ],
    },
		{
      category: "메뉴 관리",
      dir: "test2",
      sub: [
        { name: "관리자 메뉴 관리", file: "test", type: "link" },
      ],
    },
		{
      category: "콘텐츠 관리",
      dir: "test3",
      sub: [
        { name: "새소식 관리", file: "test", type: "link" },
        { name: "FAQ 관리", file: "test", type: "link" },
        { name: "적용사례 관리", file: "test", type: "link" },
        { name: "이용약관 관리", file: "test", type: "link" },
        { name: "메인 팝업 관리", file: "test", type: "link" },
      ],
    },
		{
      category: "통계 관리",
      dir: "test4",
      sub: [
        { name: "Google Analysis", file: "test", type: "link" },
      ],
    },
  ];

  // gnb
  const adminGnb = (menuData) => {
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
      } else if (menuData.type === "toggle-sub") {
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
      } else if (menuData.type === "toggle-description") {
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
  const adminLnb = (data) => {
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
		}
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
						<a href="${menuData.file}" class="lnb-btn lnb-link">${menuData.name}</a>
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
      return `<li><a href="${menuData.file}" class="lnb-btn">${menuData.name}</a></li>`;
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
  }

  // run
  adminGnb(gnbData);
  adminLnb(lnbData);
	activePage();
};

window.addEventListener("DOMContentLoaded", () => {
  initAdminUi();
});
