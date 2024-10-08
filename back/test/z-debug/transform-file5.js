const fs = require("fs");
const path = require("path");

// 디렉토리 경로 설정
const directoryPath = path.join(__dirname, "../../html/site/component");

// 디렉토리 내 모든 파일 읽기
fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.error("디렉토리 읽기 중 오류 발생:", err);
    return;
  }

  const additionalHtml = `
              <!-- 탭 메뉴 -->
              <div class="tab-area layer">
                <!-- tab list -->
                @@include("../inc/page-tab-list.html", { "list": [ { name: "개요", class: "active" }, { name: "코드", class: "" }, { name: "접근성", class: "" } ] })
                <!-- //tab list -->
                <!-- tab contents -->
                <div class="tab-conts-wrap">
                  <!-- quick link -->
                  @@include("../inc/page-quick-nav.html")
                  <!-- //quick link -->

                  <!-- tabpanelInfo01 -->
                  <section id="tabpanelInfo01" aria-labelledby="tabInfo01" class="tab-conts active" data-quick-nav="true">
                    <!-- scroll-check -->
                    <div class="g-description-area scroll-check"></div>
                    <!-- //scroll-check -->
                  </section>
                  <!-- //tabpanelInfo01 -->

                  <!-- tabpanelInfo02 -->
                  <section id="tabpanelInfo02" aria-labelledby="tabInfo02" class="tab-conts" data-quick-nav="true">
                    <!-- scroll-check -->
                    <div class="g-description-area scroll-check"></div>
                    <!-- //scroll-check -->
                  </section>
                  <!-- //tabpanelInfo02 -->

                  <!-- tabpanelInfo03 -->
                  <section id="tabpanelInfo03" aria-labelledby="tabInfo03" class="tab-conts" data-quick-nav="true">
                    <!-- scroll-check -->
                    <div class="g-description-area scroll-check"></div>
                    <!-- //scroll-check -->
                  </section>
                  <!-- //tabpanelInfo03 -->
                </div>
                <!-- //tab contents -->
              </div>
              <!-- //탭 메뉴 -->
`;

  // 디렉토리 내 모든 파일에 대해 반복
  files.forEach((file) => {
    const filePath = path.join(directoryPath, file);

    // 파일이 있는지 확인 후, 파일 읽기
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        console.error(`파일 읽기 중 오류 발생 (${file}):`, err);
        return;
      }

      // const newData = data.replace(/(<!--\s*\/\/page-title\s*-->)/g, `$1\n${additionalHtml}`);
      const newData = data.replace(/(<div class="conts-area krds-quick-nav-type">)/g, `$1\n${additionalHtml}`);

      // 변경된 내용 파일에 다시 쓰기
      fs.writeFile(filePath, newData, (err) => {
        if (err) {
          console.error(`파일 쓰기 중 오류 발생 (${file}):`, err);
        } else {
          console.log(`파일이 성공적으로 업데이트되었습니다: ${file}`);
        }
      });
    });
  });
});


// node ./test/z-debug/transform-file5.js