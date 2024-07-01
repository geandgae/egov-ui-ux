"use strict";

// uis
const uis = (() => {
 
  // init
  const wrap = document.querySelector("#wrap");

  // data
  const dataColor = {
    "mix-tint": {
      colors: ["color-divider-black", "color-divider-dark", "color-text-primary", "color-text-blue", "color-text-red", "color-button-stock-correction", "color-badge-purple"],
    },
    "mix-shade": {
      colors: ["color-divider-black", "color-divider-dark", "color-text-primary", "color-text-blue", "color-text-red", "color-button-stock-correction", "color-badge-purple"],
    },
  };
  const dataBtn = {
    light: {
      colors: ["primary", "secondary", "tertiary", "stock-blue", "stock-red", "stock-cancel", "stock-correction"],
    },
    dark: {
      colors: ["primary", "secondary", "gray", "stock", "interaction", "chart"],
    },
  };
  const dataIcon = {
    colors: [
      "color-icons-primary",
      "color-icons-stock-blue", 
      "color-icons-stock-red", 
      "color-icons-stock-cancel", 
      "color-icons-stock-correction",
      "color-icons-disable",
      "color-icons-gray",
      "color-icons-stock",
      "color-icons-interaction",
      "color-icons-chart",
    ]
  };

  const makeTag = (name, type, data) => {
    const section = document.createElement("section");
    section.classList.add(name);
    if (type === "color") {
      Object.keys(data).forEach((theme) => {
        data[theme].colors.forEach((color) => {
          const children = document.createElement("div");
          children.classList.add("color", theme, color);
          children.textContent = color;
          section.appendChild(children);
        });
      });
    }
    if (type === "button") {
      Object.keys(data).forEach((theme) => {
        data[theme].colors.forEach((color) => {
          const children = document.createElement("button");
          children.classList.add("btn", color, theme);
          children.type = "button";
          children.textContent = color;
          section.appendChild(children);
        });
      });
    }
    if (type === "icon") {
      data.colors.forEach((color) => {
        const children = document.createElement("icon");
        children.classList.add("icon", color);
        children.textContent = color;
        section.appendChild(children);
      });
    }

    wrap.append(section);
  };

  // publicFunction : 외부로 return
  const publicFunction = async () => {
    makeTag("colors", "color", dataColor);
    makeTag("btns", "button", dataBtn);
    makeTag("icons", "icon", dataIcon);
  };

  return {
    publicFunction: publicFunction,
  };
})();

uis.publicFunction();
