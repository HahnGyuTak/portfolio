# Sources & design references

## Design

- [Ettrics — Sticky Slider Navigation](https://codepen.io/ettrics/pen/WRbGRN): 히어로 하단 메뉴가 스크롤 후 상단에 고정되고 현재 섹션에 밑줄이 이동하는 인터랙션 참고. React/CSS로 새로 구현했습니다.
- [Brittany Chiang](https://brittanychiang.com/): 소개 → 선별 프로젝트 → 경험 전체 → 연락의 방문 흐름 참고.
- [Jon Barron](https://jonbarron.info/): 연구 결과와 코드·논문 링크를 함께 제시하는 구성 참고.
- [Andrej Karpathy](https://karpathy.ai/): 연구·개발 이력을 구체적 결과와 연결하는 방식 참고.
- [Lilian Weng](https://lilianweng.github.io/): 주제·시간을 기준으로 쌓이는 아카이브 구성 참고.

다른 사람의 프로젝트·경력·사진·문안은 사용하지 않았습니다. 프로젝트는 Focus 태그와 자료 링크 아이콘이 있는 카드로 배치했습니다. 실제 앱 이미지는 프로젝트 상세에서 따로 제시합니다.

## Content

기준 문서는 본인의 `2602_CV_Gyutak_Hahn.pdf`와 `AI_프로젝트_연구경험_정리.md`입니다. 사용자 확인 사항(PPO 베타 적용, 공동연구 기여, DiffWave 증강, Souf 활동 기간)을 반영했습니다.

| 경험 | 확인 자료 / 공개 출처 |
| --- | --- |
| StarGAN-TA | [연구 저장소](https://github.com/shp216/StarGAN-TA), [ICROS 논문](https://www.dbpia.co.kr/journal/articleDetail?nodeId=NODE11480637), CV |
| Lenfit | 본인 제공 `Lenfit_Hanium.pdf`, 역할 설명 |
| Diff-SVC / DiffWave | 본인 제공 로컬 Diff-SVC 연구 디렉터리, CV, 증강·학습·실험 범위 직접 확인 |
| RESTED | [세종대학교 공식 대상 수상 기록](https://withus.sejong.ac.kr/non/stuTlnt/view.do?dataSeq=1000040&sstTyCd=ST01&currentPageNo=1), [공개 발표자료 PDF](https://withus.sejong.ac.kr/comm/cmfile/download.do?encFileGrpSeq=19b82d7b338cb31f922c99903b99dbe2&encFileSeq=6f0d09eaa7573ee1a905876da477a5f4), CV, 역할 설명 |
| WriteNow | [팀 프로젝트](https://github.com/AcademicFestival/.github/blob/main/profile/README.md), CV |
| PromptStyler | [본인 재현 코드](https://github.com/HahnGyuTak/PromptStyler), [원논문](https://promptstyler.github.io/) |
| Mote | [모델 학습](https://github.com/HahnGyuTak/openai-whisper-finetuning), [AI 서비스](https://github.com/MettingApp/AI), [모델·데이터](https://huggingface.co/imTak), 팀 발표 PDF |
| Souf | 본인 제공 2026년 예비창업패키지 사업계획서, 기간·역할 직접 확인 |
| 벽바둑 | 본인 제공 WallBaduk 소스, [App Store](https://apps.apple.com/kr/app/wall%EB%B0%94%EB%91%91/id6747090524), [Google Play](https://play.google.com/store/apps/details?id=com.imtak.wall_baduk_app) |

## App screenshots

- `public/images/wallbaduk-game.png`: 본인 WallBadukApp 프로젝트의 `assets/screenshot/6.png`. 개발 버전 화면이며 원본 DEBUG 표시를 유지했습니다.
- `public/images/mote-recording.jpg`, `mote-summary.jpg`: Mote 발표 PDF 4쪽에 포함된 실제 앱 화면 원본 JPEG를 추출했습니다.

## Original template & libraries

기존 저장소는 [Figma Make 프로젝트](https://www.figma.com/design/OxTELRwvXiXS3rXwEpdviP/Personal-Portfolio-Website)에서 시작했습니다. 미사용 shadcn/ui 원본 파일의 라이선스 안내는 `ATTRIBUTIONS.md`에 보존했습니다. 새 화면은 React, Vite, Lucide를 사용합니다. 글꼴은 원본 CodePen과 같은 `Century Gothic`, Google Fonts의 `Lato` 400/700, sans-serif 순서입니다. 원본의 #eee 배경, 제목 자간, 70px 메뉴·6px 밑줄과 hover 색상을 적용했습니다.

## Profile & link icons (2026.10 update)

- `public/images/profile.png`: [본인 GitHub 프로필 이미지](https://github.com/HahnGyuTak.png?size=800). 사용자 지정에 따라 임시 프로필로 사용합니다.
- `public/icons/`: [Simple Icons](https://github.com/simple-icons/simple-icons)의 GitHub, Hugging Face, App Store, Google Play SVG. 사이트별 외부 링크 식별에 사용합니다.

## RESTED correction (2026.10.22)

- 본인 요청에 따라 GUI·PyQt 개발 표현을 제거했습니다. 인지 재활 퀴즈·모델 개발은 개인 기여, 최종 AI 자가 재활 치료 도우미 서비스용 프로그램 완성·시연은 팀 협업 결과로 구분했습니다.
- 공식 수상 페이지의 행사명은 “2023 제16회 창의설계경진대회 지능기전공학부 대상”이며, 수상팀은 RESTED조입니다. 페이지 등록일 2024.01.25는 행사 일자가 아닙니다.
