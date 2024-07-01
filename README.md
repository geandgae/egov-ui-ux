# egov-ui-ux

* 스타일 폴더
```
scss/
|-- abstracts/
|   |-- _functions.scss       // 함수 정의
|   |-- _mixins.scss          // 믹스인 정의
|   |-- _variables.scss       // 변수 정의
|-- base/
|   |-- _reset-origin.scss    // CSS 리셋
|   |-- _fonts.scss           // 타이포그래피 설정
|   |-- _base-origin.scss     // 기본 스타일
|-- components/
|   |-- _[...].scss           // 컴포넌트 스타일
|-- layout/
|   |-- _header.scss          // 헤더 레이아웃
|   |-- _footer.scss          // 푸터 레이아웃
|   |-- _grid.scss            // 그리드 시스템
|-- pages/
|   |-- _[...].scss           // 페이지 스타일
|-- themes/
|   |-- _light.scss           // 기본 테마
|   |-- _dark.scss            // 다크 테마
|-- vendors/
|   |-- _[...].scss           // 서드파티 라이브러리 오버라이드(bootstrap...) 거의 안 씀
|-- reset.scss                // _reset-origin.scss
|-- base.scss                 // _variables.scss, _base-origin.scss
|-- layout.scss               // _header.scss, _footer.scss, _grid.scss
|-- components.scss           // 컴포넌트
|-- contents.scss             // 페이지
|-- default.scss              // css 배포 경로
```


* old 
- mixin @include group : .comp-btn-wrap(완료버튼정렬 반응형 모바일일때) / .form-conts.group.form-control(사용안함)