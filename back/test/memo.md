# 2024범정부 UIUX 고도화



# 임시 작업 파일 32
E:\00_works\00_projects\2024\2024-uiux\html\guide\component\code\component_02_02_01.html
E:\00_works\00_projects\2024\2024-uiux\html\site\component\code\component_02_02_01.html
주석 삭제

E:\00_works\00_projects\2024\2024-uiux\html\pattern\sample_move_process_06.html
E:\00_works\00_projects\2024\2024-uiux\html\guide\component\code\component_09_04_01.html
E:\00_works\00_projects\2024\2024-uiux\html\site\component\code\component_09_04_01.html
파일업로드

E:\00_works\00_projects\2024\2024-uiux\html\site\component\component_03_05.html
사이트 퀵 네비 스타일

E:\00_works\00_projects\2024\2024-uiux\html\site\component\component_02_01.html
핀치줌


<!-- E:\00_works\00_projects\2024\2024-uiux\html\pattern\inc\pop-footer-link.html
E:\00_works\00_projects\2024\2024-uiux\html\pattern\inc\popup-filter.html
팝업 합쳐야함 -->


# 마크업예시 
건너뛰기 스타일 확인 
캐러셀











2024범정부 UIUX 고도화

작업 메모
modal : full, bottom 스타일 적용 popup-wrap 삭제 (접근성 확인)

디버그
./test/z-debug/filter.js

## 퍼블 작업 환경(작업공유용 메모)
```bash

  # 기본환경
  * node v20.13.1

  * gulp 실행(아래 3개 중 아무거나)
  npm start
  yarn start
  gulp

  * 스타일 딕셔너리 토큰 변환
  npm run ts(figma_token.json > transformed_tokens.json)
  npm run token(기본변환)
  npm run token-custom(사용자설정)
  npm run token-auto(run ts && run token)


   # 미사용 폴더 및 파일
  ./resources/guide/include.js
  ./html/guide/layout/
  ./html/pattern/layout/


  # ui-script.js 변경사항
  * krds_accordion
  - data-type "singleOpen(기본값)", "multiOpen" 추가
  - setAriaAttributes 접근성 초기값 설정 추가
  - 숨겨진 내용은 visibility 속성으로 탭 접근을 막음(display 또는 hidden 으로 처리시 자연스러운 transition을 위한 추가 스크립트 필요)
  
  * krds_lnbMenu
  - 패턴에서 컴포넌트로 스크립트 위치 변경
  - 접근성 속성 추가
  - 서브 메뉴 팝업은 포커스를 벗어나면 닫히는 구조(접근성 포커스 순환 구조가 맞을 경우 스크립트 변경)
  - 숨겨진 내용은 visibility 속성으로 탭 접근을 막음(krds_accordion과 같은 이유)
  - activePage는 aria-current="page" 적용 예



```


## Getting started

To make it easy for you to get started with GitLab, here's a list of recommended next steps.

Already a pro? Just edit this README.md and make it your own. Want to make it easy? [Use the template at the bottom](#editing-this-readme)!

## Add your files

- [ ] [Create](https://docs.gitlab.com/ee/user/project/repository/web_editor.html#create-a-file) or [upload](https://docs.gitlab.com/ee/user/project/repository/web_editor.html#upload-a-file) files
- [ ] [Add files using the command line](https://docs.gitlab.com/ee/gitlab-basics/add-file.html#add-a-file-using-the-command-line) or push an existing Git repository with the following command:

```
cd existing_repo
git remote add origin https://git.devtree.co.kr/pub_2024/2024-uiux.git
git branch -M main
git push -uf origin main
```

## Integrate with your tools

- [ ] [Set up project integrations](https://git.devtree.co.kr/pub_2024/2024-uiux/-/settings/integrations)

## Collaborate with your team

- [ ] [Invite team members and collaborators](https://docs.gitlab.com/ee/user/project/members/)
- [ ] [Create a new merge request](https://docs.gitlab.com/ee/user/project/merge_requests/creating_merge_requests.html)
- [ ] [Automatically close issues from merge requests](https://docs.gitlab.com/ee/user/project/issues/managing_issues.html#closing-issues-automatically)
- [ ] [Enable merge request approvals](https://docs.gitlab.com/ee/user/project/merge_requests/approvals/)
- [ ] [Automatically merge when pipeline succeeds](https://docs.gitlab.com/ee/user/project/merge_requests/merge_when_pipeline_succeeds.html)

## Test and Deploy

Use the built-in continuous integration in GitLab.

- [ ] [Get started with GitLab CI/CD](https://docs.gitlab.com/ee/ci/quick_start/index.html)
- [ ] [Analyze your code for known vulnerabilities with Static Application Security Testing(SAST)](https://docs.gitlab.com/ee/user/application_security/sast/)
- [ ] [Deploy to Kubernetes, Amazon EC2, or Amazon ECS using Auto Deploy](https://docs.gitlab.com/ee/topics/autodevops/requirements.html)
- [ ] [Use pull-based deployments for improved Kubernetes management](https://docs.gitlab.com/ee/user/clusters/agent/)
- [ ] [Set up protected environments](https://docs.gitlab.com/ee/ci/environments/protected_environments.html)

***

# Editing this README

When you're ready to make this README your own, just edit this file and use the handy template below (or feel free to structure it however you want - this is just a starting point!).  Thank you to [makeareadme.com](https://www.makeareadme.com/) for this template.

## Suggestions for a good README
Every project is different, so consider which of these sections apply to yours. The sections used in the template are suggestions for most open source projects. Also keep in mind that while a README can be too long and detailed, too long is better than too short. If you think your README is too long, consider utilizing another form of documentation rather than cutting out information.

## Name
Choose a self-explaining name for your project.

## Description
Let people know what your project can do specifically. Provide context and add a link to any reference visitors might be unfamiliar with. A list of Features or a Background subsection can also be added here. If there are alternatives to your project, this is a good place to list differentiating factors.

## Badges
On some READMEs, you may see small images that convey metadata, such as whether or not all the tests are passing for the project. You can use Shields to add some to your README. Many services also have instructions for adding a badge.

## Visuals
Depending on what you are making, it can be a good idea to include screenshots or even a video (you'll frequently see GIFs rather than actual videos). Tools like ttygif can help, but check out Asciinema for a more sophisticated method.

## Installation
Within a particular ecosystem, there may be a common way of installing things, such as using Yarn, NuGet, or Homebrew. However, consider the possibility that whoever is reading your README is a novice and would like more guidance. Listing specific steps helps remove ambiguity and gets people to using your project as quickly as possible. If it only runs in a specific context like a particular programming language version or operating system or has dependencies that have to be installed manually, also add a Requirements subsection.

## Usage
Use examples liberally, and show the expected output if you can. It's helpful to have inline the smallest example of usage that you can demonstrate, while providing links to more sophisticated examples if they are too long to reasonably include in the README.

## Support
Tell people where they can go to for help. It can be any combination of an issue tracker, a chat room, an email address, etc.

## Roadmap
If you have ideas for releases in the future, it is a good idea to list them in the README.

## Contributing
State if you are open to contributions and what your requirements are for accepting them.

For people who want to make changes to your project, it's helpful to have some documentation on how to get started. Perhaps there is a script that they should run or some environment variables that they need to set. Make these steps explicit. These instructions could also be useful to your future self.

You can also document commands to lint the code or run tests. These steps help to ensure high code quality and reduce the likelihood that the changes inadvertently break something. Having instructions for running tests is especially helpful if it requires external setup, such as starting a Selenium server for testing in a browser.

## Authors and acknowledgment
Show your appreciation to those who have contributed to the project.

## License
For open source projects, say how it is licensed.

## Project status
If you have run out of energy or time for your project, put a note at the top of the README saying that development has slowed down or stopped completely. Someone may choose to fork your project or volunteer to step in as a maintainer or owner, allowing your project to keep going. You can also make an explicit request for maintainers.
