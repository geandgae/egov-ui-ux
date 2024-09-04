"use strict";

const initAdminUi = () => {
	// data
	const lnbData = [
		{ name: "권한관리", url: "#;", type: "link", sub: [] },
		{ name: "권한관리2", url: "", type: "toggle", sub: [
			{ name: "권한관리2-sub1", url: "#;", type: "link", sub: [] },
			{ name: "권한관리2-sub2", url: "", type: "toggle-lv2", sub: [
				{ name: "권한관리2-sub2-1", url: "#;", type: "link", sub: [] },
				{ name: "권한관리2-sub2-2", url: "#;", type: "link", sub: [] },
			] },
		]},
	];
	const gnbData = [
		{ name: "공통관리", url: "#;", type: "link", sub: [] },
		{ name: "메뉴관리", url: "#;", type: "link", sub: [] },
		{ name: "콘텐츠관리", url: "#;", type: "link", sub: [] },
		{ name: "통계관리", url: "#;", type: "link", sub: [] },
		{ name: "서브타입 : toggle-lv1", url: "", type: "toggle", sub: [
			{ name: "sub-link", url: "#;", type: "link", sub: [] },
		]},
		{ name: "서브타입 : toggle-lv2", url: "", type: "toggle-lv2", sub: [
			{ name: "sub-toggle", url: "#;", type: "toggle-sub", sub: [
				{ name: "sub-link", url: "#;", type: "link", sub: [] },
			]},
			{ name: "sub-description", url: "#;", type: "toggle-description", sub: [
				{ name: "sub-link", url: "#;", type: "desc", desc: "description", sub: [] },
			]},
			{ name: "sub-link", url: "#;", type: "link", sub: [] },
		]},
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
											${menuData.sub.map(createSubMenu).join('')}
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
									${menuData.sub.map(createSubMenuLv2).join('')}
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
								${menuData.sub.map(createSubMenuLv3).join('')}
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
								${menuData.sub.map(createSubMenuLv3).join('')}
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
	}

	// lnb
  const adminLnb = (menuData) => {
    const menu = document.querySelector(".krds-lnb .lnb-list");
    if (!menu) return;

    let list = [];

    const createMenu = (menuData) => {
      if (menuData.type === "link") {
				return `<li class="lnb-item"><a href="${menuData.url}" class="lnb-btn lnb-link">${menuData.name}</a></li>`;
      } else if (menuData.type === "toggle") {
        return `
					<li class="lnb-item">
						<button type="button" class="lnb-btn lnb-toggle">${menuData.name}</button>
						<div class="lnb-submenu">
							<ul>
								${menuData.sub.map(createSubMenu).join('')}
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
						<a href="${menuData.url}" class="lnb-btn lnb-link">${menuData.name}</a>
					</li>
				`;
      } else if (menuData.type === "toggle-lv2") {
        return `
					<li class="lnb-subitem">
						<button type="button" class="lnb-btn lnb-toggle-popup">${menuData.name}</button>
						<div class="lnb-submenu-lv2">
							<button type="button" class="lnb-btn-tit">${menuData.name}</button>
							<ul>
								${menuData.sub.map(createSubMenuLv2).join('')}
							</ul>
						</div>
					</li>
				`;
      }
    };
    const createSubMenuLv2 = (menuData) => {
      return `<li><a href="${menuData.url}" class="lnb-btn">${menuData.name}</a></li>`;
    };

		menuData.forEach((item) => list.push(createMenu(item)));
		menu.innerHTML = list.join("");
  };

	// run
	adminGnb(gnbData);
  adminLnb(lnbData);
};

window.addEventListener("DOMContentLoaded", () => {
  initAdminUi();
});
