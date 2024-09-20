const fs = require("fs");
const path = require("path");

// 디렉토리 경로 설정
const directoryPath = path.join(__dirname, "../../html/asis");

// 디렉토리 내 모든 파일 읽기
fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.error("디렉토리 읽기 중 오류 발생:", err);
    return;
  }

  // 디렉토리 내 모든 파일에 대해 반복
  files.forEach((file) => {
    const filePath = path.join(directoryPath, file);

    // 파일이 있는지 확인 후, 파일 읽기
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        console.error(`파일 읽기 중 오류 발생 (${file}):`, err);
        return;
      }

      // 주석 내부 내용 변경 (정규 표현식을 사용)
      const regex = /<!--\s*웹\s*:\s*메뉴 영역\s*-->([\s\S]*?)<!--\s*\/\/웹\s*:\s*메뉴 영역\s*-->/g;
      const regex2 = /<!--\s*모바일\s*:\s*전체메뉴\s*-->([\s\S]*?)<!--\s*\/\/모바일\s*:\s*전체메뉴\s*-->/g;

      const newData = data.replace(regex, (match, content) => {
const newContent =
        `<nav class="krds-gnb">
          <div class="inner">
            <ul class="gnb-menu">
              <li>
                <button type="button" class="gnb-main-trigger" data-trigger="gnb">민원</button>
                <!-- gnb-toggle-wrap -->
                <div class="gnb-toggle-wrap">
                  <!-- gnb-main-list -->
                  <div class="gnb-main-list" data-has-submenu="true">
                    <ul>
                      <li>
                        <button type="button" class="gnb-sub-trigger" data-trigger="gnb">2Depth</button>
                        <!-- gnb-sub-list -->
                        <div class="gnb-sub-list">
                          <div class="gnb-sub-content">
                            <h2 class="sub-title"><span>2Depth title</span></h2>             	  
                            <ul>
                              <li><button type="button">Last depth</button></li>
                              <li><a href="#">Last depth</a></li>
                            </ul>
                          </div>
                          <div class="gnb-sub-banner">
                            <span class="krds-badge bg1">신규 서비스</span>
                            <button type="button" class="krds-btn large text">메뉴명 <i class="svg-icon ico-angle right"></i></button>
                          </div>
                        </div>
                        <!-- //gnb-sub-list -->
                      </li>
                      <li>
                        <button type="button" class="gnb-sub-trigger" data-trigger="gnb">2Depth</button>
                        <!-- gnb-sub-list -->
                        <div class="gnb-sub-list between">
                          <div class="gnb-sub-content">
                            <h2 class="sub-title">
                              <a href="#">2Depth title <i class="svg-icon ico-page-next"></i></a>
                            </h2>   
                            <ul>
                              <li><button type="button">Last depth</button></li>
                              <li><a href="#">Last depth</a></li>
                            </ul>
                          </div>
                          <div class="gnb-sub-banner">
                            <span class="krds-badge bg1">신규 서비스</span>
                            <button type="button" class="krds-btn large text">메뉴명 <i class="svg-icon ico-angle right"></i></button>
                          </div>
                        </div>
                        <!-- //gnb-sub-list -->
                      </li>
                      <li>
                        <a href="#" class="gnb-sub-trigger" data-trigger="gnb" target="_blank" title="새 창 열림">
                          외부사이트 링크(anchor)
                          <i class="svg-icon ico-go"></i>
                        </a>
                      </li>
                      <li>
                        <button type="button" class="gnb-sub-trigger" data-trigger="gnb" title="새 창 열림">
                          외부사이트 링크(button)
                          <i class="svg-icon ico-go"></i>
                        </button>
                      </li>
                    </ul>
                  </div>
                  <!-- //gnb-main-list -->
                </div>
                <!-- //gnb-toggle-wrap -->
              </li>
              <li>
                <button type="button" class="gnb-main-trigger" data-trigger="gnb">국민참여</button>
                <!-- gnb-toggle-wrap -->
                <div class="gnb-toggle-wrap">
                  <!-- gnb-main-list -->
                  <div class="gnb-main-list" data-has-submenu="true">
                    <ul>
                      <li>
                        <button type="button" class="gnb-sub-trigger" data-trigger="gnb">2Depth</button>
                        <!-- gnb-sub-list -->
                        <div class="gnb-sub-list">
                          <div class="gnb-sub-content">
                            <h2 class="sub-title"><span>2Depth title</span></h2>                   
                            <ul>
                              <li><button type="button">Last depth</button></li>
                              <li><a href="#">Last depth</a></li>
                            </ul>
                          </div>
                          <div class="gnb-sub-banner">
                            <span class="krds-badge bg1">신규 서비스</span>
                            <button type="button" class="krds-btn large text">메뉴명 <i class="svg-icon ico-angle right"></i></button>
                          </div>
                        </div>
                        <!-- //gnb-sub-list -->
                      </li>
                    </ul>
                  </div>
                  <!-- //gnb-main-list -->
                </div>
                <!-- //gnb-toggle-wrap -->
              </li>
              <li>
                <button type="button" class="gnb-main-trigger" data-trigger="gnb">뉴스&middot;소식</button>
                <!-- gnb-toggle-wrap -->
                <div class="gnb-toggle-wrap">
                  <!-- gnb-main-list -->
                  <div class="gnb-main-list" data-has-submenu="true">
                    <ul>
                      <li>
                        <button type="button" class="gnb-sub-trigger" data-trigger="gnb">2Depth</button>
                        <!-- gnb-sub-list -->
                        <div class="gnb-sub-list">
                          <div class="gnb-sub-content">
                            <h2 class="sub-title"><span>2Depth title</span></h2>                   
                            <ul>
                              <li><button type="button">Last depth</button></li>
                              <li><a href="#">Last depth</a></li>
                            </ul>
                          </div>
                          <div class="gnb-sub-banner">
                            <span class="krds-badge bg1">신규 서비스</span>
                            <button type="button" class="krds-btn large text">메뉴명 <i class="svg-icon ico-angle right"></i></button>
                          </div>
                        </div>
                        <!-- //gnb-sub-list -->
                      </li>
                    </ul>
                  </div>
                  <!-- //gnb-main-list -->
                </div>
                <!-- //gnb-toggle-wrap -->
              </li>
              <li>
                <button type="button" class="gnb-main-trigger" data-trigger="gnb">정보공개</button>
                <!-- gnb-toggle-wrap -->
                <div class="gnb-toggle-wrap">
                  <!-- gnb-main-list -->
                  <div class="gnb-main-list" data-has-submenu="true">
                    <ul>
                      <li>
                        <button type="button" class="gnb-sub-trigger" data-trigger="gnb">2Depth</button>
                        <!-- gnb-sub-list -->
                        <div class="gnb-sub-list">
                          <div class="gnb-sub-content">
                            <h2 class="sub-title"><span>2Depth title</span></h2>                   
                            <ul>
                              <li><button type="button">Last depth</button></li>
                              <li><a href="#">Last depth</a></li>
                            </ul>
                          </div>
                          <div class="gnb-sub-banner">
                            <span class="krds-badge bg1">신규 서비스</span>
                            <button type="button" class="krds-btn large text">메뉴명 <i class="svg-icon ico-angle right"></i></button>
                          </div>
                        </div>
                        <!-- //gnb-sub-list -->
                      </li>
                    </ul>
                  </div>
                  <!-- //gnb-main-list -->
                </div>
                <!-- //gnb-toggle-wrap -->
              </li>
              <li>
                <button type="button" class="gnb-main-trigger" data-trigger="gnb">정책자료</button>
                <!-- gnb-toggle-wrap -->
                <div class="gnb-toggle-wrap">
                  <!-- gnb-main-list -->
                  <div class="gnb-main-list" data-has-submenu="true">
                    <ul>
                      <li>
                        <button type="button" class="gnb-sub-trigger" data-trigger="gnb">2Depth</button>
                        <!-- gnb-sub-list -->
                        <div class="gnb-sub-list">
                          <div class="gnb-sub-content">
                            <h2 class="sub-title"><span>2Depth title</span></h2>
                            <ul>
                              <li><a href="#">Last depth</a></li>
                            </ul>
                          </div>
                          <div class="gnb-sub-banner">
                            <span class="krds-badge bg1">신규 서비스</span>
                            <button type="button" class="krds-btn large text">메뉴명 <i class="svg-icon ico-angle right"></i></button>
                          </div>
                        </div>
                        <!-- //gnb-sub-list -->
                      </li>
                    </ul>
                  </div>
                  <!-- //gnb-main-list -->
                </div>
                <!-- //gnb-toggle-wrap -->
              </li>
              <li>
                <a href="#" class="gnb-main-trigger is-link" data-trigger="gnb">링크(anchor)</a>
              </li>
              <li>
                <button type="button" class="gnb-main-trigger is-link" data-trigger="gnb">링크(button)</button>
              </li>
            </ul>
          </div>
        </nav>`;
const newContent2 =
      `<nav id="mobile-nav" class="krds-gnb-mobile">
				<div class="gnb-wrap">
					<!-- gnb-header -->
					<div class="gnb-header">
						<!-- gnb-utils -->
						<div class="gnb-utils">
							<ul class="etc-ul">
								<li><button type="button" class="krds-btn xsmall text">화면크기</button></li>
								<li><button type="button" class="krds-btn xsmall text">Language</button></li>
							</ul>
							<button type="button" class="krds-btn medium icon" id="close-nav">
								<span class="sr-only">전체메뉴 닫기</span>
								<i class="svg-icon ico-popup-close"></i>
							</button>
						</div>
						<!-- //gnb-utils -->
						<!-- gnb-login -->
						<div class="gnb-login">
							<span class="user">홍길동님</span>
							<button type="button" class="krds-btn medium text"><i class="svg-icon ico-logout"></i> 로그아웃</button>
							<!-- <button type="button" class="krds-btn medium text"><i class="svg-icon ico-log"></i> 로그인을 해주세요.</button> -->
						</div>
						<!-- //gnb-login -->
						<!-- gnb-service-menu -->
						<div class="gnb-service-menu">
							<a href="#" class="link">메뉴명</a>
							<a href="#" class="link">메뉴명</a>
							<a href="#" class="link">메뉴명</a>
							<a href="#" class="link">메뉴명</a>
						</div>
						<!-- gnb-service-menu -->
						<!-- 검색 -->
						<div class="sch-input">
							<input type="text" class="form-control" placeholder="찾고자 하는 메뉴명을 입력해 주세요" title="찾고자 하는 메뉴명 입력"">
							<button type="button" class="krds-btn medium icon ico-search">
								<span class="sr-only">검색</span>
								<i class="svg-icon ico-sch"></i>
							</button>
						</div>
						<!-- //검색 -->
					</div>
					<!-- //gnb-header -->

					<!-- gnb-body -->
					<div class="gnb-body">
						<!-- gnb-menu -->
						<div class="gnb-menu">
							<div class="menu-wrap">
								<ul>
									<li>
										<a href="#mGnb-anchor1" class="gnb-main-trigger"><h2>MyGOV</h2></a>
									</li>
									<li>
										<a href="#mGnb-anchor2" class="gnb-main-trigger"><h2>민원서비스</h2></a>
									</li>
									<li>
										<a href="#mGnb-anchor3" class="gnb-main-trigger"><h2>보조금24</h2></a>
									</li>
									<li>
										<a href="#mGnb-anchor4" class="gnb-main-trigger"><h2>정책정보</h2></a>
									</li>
									<li>
										<a href="#mGnb-anchor5" class="gnb-main-trigger"><h2>고객센터</h2></a>
									</li>
								</ul>
							</div>
							<div class="submenu-wrap">
								<div class="gnb-sub-list" id="mGnb-anchor1">
									<ul>
										<h3 class="sub-title">MyGOV</h3>
										<li><a href="#" class="gnb-sub-trigger">MyGOV 홈</a></li>
										<li><a href="#" class="gnb-sub-trigger">나의 신청내역</a></li>
										<li><a href="#" class="gnb-sub-trigger">나의 생활정보</a></li>
										<li><a href="#" class="gnb-sub-trigger">나의 정보관리</a></li>
									</ul>
								</div>
								<div class="gnb-sub-list" id="mGnb-anchor2">
									<ul>
										<h3 class="sub-title">민원서비스</h3>
										<li><a href="#" class="gnb-sub-trigger">민원 신청&middot;안내</a></li>
										<li><a href="#" class="gnb-sub-trigger">사실/진위 확인</a></li>
										<li><a href="#" class="gnb-sub-trigger">원스톱 서비스</a></li>
										<li><a href="#" class="gnb-sub-trigger">분야별 서비스</a></li>
										<li><a href="#" class="gnb-sub-trigger">기업/단체 서비스</a></li>
										<li><a href="#" class="gnb-sub-trigger">돌봄시설 등 위치 찾기</a></li>
									</ul>
								</div>
								<div class="gnb-sub-list" id="mGnb-anchor3">
									<ul>
										<h3 class="sub-title">보조금24</h3>
										<li><a href="#" class="gnb-sub-trigger">보조금24 홈</a></li>
										<li><a href="#" class="gnb-sub-trigger">나의 혜택</a></li>
										<li><a href="#" class="gnb-sub-trigger">간편 찾기</a></li>
										<li><a href="#" class="gnb-sub-trigger">전체 혜택</a></li>
										<li>
											<a href="#" class="gnb-sub-trigger">보조금24란</a>
											<ul class="sub-ul">
												<li>
													<a href="#" class="subm is-depth4">소개(4depth)</a>
													<div class="depth4-wrap">
														<div class="depth4-head">
															<button type="button" class="krds-btn icon trigger-prev">
																<span class="sr-only">이전화면</span>
																<i class="svg-icon ico-angle left"></i>
															</button>
															<button type="button" class="krds-btn icon trigger-close">
																<span class="sr-only">전체메뉴 닫기</span>
																<i class="svg-icon ico-popup-close"></i>
															</button>
														</div>
														<ul class="depth4-body">
															<h4 class="sub-title">4depth title</h4>
															<ul class="depth4-ul">
																<li><a href="#">depth title</a></li>
																<li><a href="#">depth title</a></li>
																<li><a href="#">depth title</a></li>
																<li><a href="#">depth title</a></li>
															</ul>
														</ul>
													</div>
												</li>
												<li><a href="#" class="subm">이용안내</a></li>
												<li><a href="#" class="subm">자주묻는 질문</a></li>
											</ul>
										</li>
									</ul>
								</div>
								<div class="gnb-sub-list" id="mGnb-anchor4">
									<ul>
										<h3 class="sub-title">정책정보</h3>
										<li><a href="#" class="gnb-sub-trigger">분야별 정책정보</a></li>
										<li><a href="#" class="gnb-sub-trigger">정부/지자체 조직도</a></li>
										<li><a href="#" class="gnb-sub-trigger">정부/지자체 누리집</a></li>
										<li><a href="#" class="gnb-sub-trigger">지자체 소식</a></li>
										<li><a href="#" class="gnb-sub-trigger">공모전</a></li>
										<li><a href="#" class="gnb-sub-trigger">공공자원공유</a></li>
										<li><a href="#" class="gnb-sub-trigger">국고보조금 부정수급 신고</a></li>
									</ul>
								</div>
								<div class="gnb-sub-list" id="mGnb-anchor5">
									<ul>
										<h3 class="sub-title">고객센터</h3>
										<li><a href="#" class="gnb-sub-trigger">공지사항</a></li>
										<li><a href="#" class="gnb-sub-trigger">이용안내</a></li>
										<li><a href="#" class="gnb-sub-trigger">자주 묻는 질문(FAQ)</a></li>
										<li><a href="#" class="gnb-sub-trigger">자료실</a></li>
										<li><a href="#" class="gnb-sub-trigger">상담 예약</a></li>
										<li><a href="#" class="gnb-sub-trigger">개선 의견</a></li>
									</ul>
								</div>
							</div>
						</div>
						<!-- //gnb-menu -->
						<!-- gnb-bottom -->
						<div class="gnb-bottom">
							<a href="#" class="krds-btn medium text">인증 센터</a>
							<a href="#" class="krds-btn medium text" target="_blank" title="새 창 열기"> 어린이 정부포털 <i class="svg-icon ico-go"></i> </a>
						</div>
						<!-- //gnb-bottom -->
					</div>
					<!-- //gnb-body -->
				</div>
			</nav>`;         

// return `<!-- 모바일 : 전체메뉴 -->
//       ${newContent}
//       <!-- //모바일 : 전체메뉴 -->`;
return `<!-- 웹 : 메뉴 영역 -->
        ${newContent}
        <!-- //웹 : 메뉴 영역 -->`;
      });

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


// node ./test/z-debug/transform-file3.js