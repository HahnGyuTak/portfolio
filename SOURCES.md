# Sources & design references

## Design

- [Ettrics — Sticky Slider Navigation](https://codepen.io/ettrics/pen/WRbGRN): 히어로 하단 메뉴가 스크롤 후 상단에 고정되고 현재 섹션에 밑줄이 이동하는 인터랙션 참고. React/CSS로 새로 구현했습니다.
- [Brittany Chiang](https://brittanychiang.com/): 소개 → 선별 프로젝트 → 경험 전체 → 연락의 방문 흐름 참고.
- [Jon Barron](https://jonbarron.info/): 연구 결과와 코드·논문 링크를 함께 제시하는 구성 참고.
- [Andrej Karpathy](https://karpathy.ai/): 연구·개발 이력을 구체적 결과와 연결하는 방식 참고.
- [Lilian Weng](https://lilianweng.github.io/): 주제·시간을 기준으로 쌓이는 아카이브 구성 참고.

다른 사람의 프로젝트·경력·사진·문안은 사용하지 않았습니다. 프로젝트 대표 그림은 기술 흐름을 설명하기 위해 이 사이트에서 작성한 CSS 도식입니다. 실제 앱 이미지는 프로젝트 상세에서 따로 제시합니다.

## Content

기준 문서는 본인의 `2602_CV_Gyutak_Hahn.pdf`와 `AI_프로젝트_연구경험_정리.md`입니다. 사용자 확인 사항(PPO 베타 적용, 공동연구 기여, DiffWave 증강, Souf 활동 기간)을 반영했습니다.

| 경험 | 확인 자료 / 공개 출처 |
| --- | --- |
| StarGAN-TA | [연구 저장소](https://github.com/shp216/StarGAN-TA), [ICROS 논문](https://www.dbpia.co.kr/journal/articleDetail?nodeId=NODE11480637), CV |
| Lenfit | 본인 제공 `Lenfit_Hanium.pdf`, 역할 설명 |
| Diff-SVC / DiffWave | 본인 제공 로컬 Diff-SVC 연구 디렉터리, CV, 증강·학습·실험 범위 직접 확인 |
| RESTED | 본인 제공 캡스톤 발표 자료, CV, 역할 설명 |
| WriteNow | [팀 프로젝트](https://github.com/AcademicFestival/.github/blob/main/profile/README.md), CV |
| PromptStyler | [본인 재현 코드](https://github.com/HahnGyuTak/PromptStyler), [원논문](https://promptstyler.github.io/) |
| Mote | [모델 학습](https://github.com/HahnGyuTak/openai-whisper-finetuning), [AI 서비스](https://github.com/MettingApp/AI), [모델·데이터](https://huggingface.co/imTak), 팀 발표 PDF |
| Souf | 본인 제공 2026년 예비창업패키지 사업계획서, 기간·역할 직접 확인 |
| 벽바둑 | 본인 제공 WallBaduk 소스, [App Store](https://apps.apple.com/kr/app/wall%EB%B0%94%EB%91%91/id6747090524), [Google Play](https://play.google.com/store/apps/details?id=com.imtak.wall_baduk_app) |

## App screenshots

- `public/images/wallbaduk-game.png`: 본인 WallBadukApp 프로젝트의 `assets/screenshot/6.png`. 개발 버전 화면이며 원본 DEBUG 표시를 유지했습니다.
- `public/images/mote-recording.jpg`, `mote-summary.jpg`: Mote 발표 PDF 4쪽에 포함된 실제 앱 화면 원본 JPEG를 추출했습니다.

## Original template & libraries

기존 저장소는 [Figma Make 프로젝트](https://www.figma.com/design/OxTELRwvXiXS3rXwEpdviP/Personal-Portfolio-Website)에서 시작했습니다. 미사용 shadcn/ui 원본 파일의 라이선스 안내는 `ATTRIBUTIONS.md`에 보존했습니다. 새 화면은 React, Vite, Lucide를 사용합니다. 글꼴은 Google Fonts의 Space Grotesk와 DM Sans이며 시스템 폰트 대체값을 제공합니다.
