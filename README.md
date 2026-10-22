# Gyutak Hahn · Personal Portfolio

한규탁의 AI 연구·개발 포트폴리오입니다. 기존 React/Vite 프로젝트를 바탕으로 프로필, 9개 R&D 카드, 연구·학력·논문·수상, 연락처를 구성했습니다.

## 실행

Node.js 22 이상과 pnpm을 사용합니다.

```sh
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

```sh
pnpm build       # TypeScript 검사와 정적 사이트 빌드
pnpm preview     # dist/ 결과 확인
```

`dist/`를 정적 호스팅에 배포하면 됩니다. `base: './'`를 사용해 하위 경로에서도 실행할 수 있습니다. 서버 기능이나 API 키는 필요하지 않습니다.

## 콘텐츠 수정

- `src/app/content.json`: 프로젝트 설명, 날짜, 역할, 결과, 링크, 이력, 연락처
- `src/app/data.ts`: 프로젝트 타입과 아카이브 최신순 정렬
- `src/app/App.tsx`: 섹션, 고정 메뉴, 필터, 프로젝트 상세, 이메일 복사
- `src/styles/index.css`: 반응형 화면, 프로젝트 카드, 접근성 스타일
- `public/resume.html`: 브라우저에서 인쇄/PDF 저장 가능한 이력서. 사이트 콘텐츠 수정 시 함께 갱신합니다.
- `public/images/`: GitHub 프로필 이미지와 본인 프로젝트의 실제 앱 화면

프로젝트 링크는 `?project=mote`, `?project=writenow`, `?project=wallbaduk`처럼 공유할 수 있습니다. 상세는 Escape, 닫기 버튼, 배경 클릭으로 닫을 수 있고 열었던 버튼으로 포커스가 돌아옵니다. 모션 줄이기 설정을 지원합니다.

## 사실과 역할 범위

이력은 제공된 CV(2026.02), 기존 프로젝트·연구 경험 정리, 자료·소스 검토와 본인 확인에 근거합니다. 핵심 구분을 유지했습니다.

- 벽바둑: 양대 마켓 출시. PPO 학습 완료, **베타 버전에 적용**.
- Souf: **프리랜서 플랫폼** 출시·운영(2025.02–2026.02). AI 포트폴리오는 기획·데이터 구축까지 진행한 후속 기능.
- StarGAN-TA: 전처리·모델 변경·실험·논문을 **공동 수행**.
- Mote: 모델 용량 3.2GB → 820MB. 확인하지 않은 정확도·지연 시간 향상 수치는 넣지 않음.

상세 근거와 디자인 참고는 [SOURCES.md](SOURCES.md)에 분리했습니다. 공개 화면에는 로컬 경로·전화번호·학번을 포함하지 않습니다.

## 구조와 동작

- CodePen의 하단 시작 → 상단 고정 내비게이션, 현재 섹션 밑줄 이동
- 전체 9개 R&D 카드, All / Research / Development 필터, Focus 태그와 사이트별 링크 아이콘
- 네이티브 `<dialog>` 기반 상세, 키보드 포커스 관리, 딥 링크
- 외부 서비스 키·로그인·추적 스크립트 없는 정적 사이트
- CodePen과 같은 `Century Gothic, Lato, sans-serif` 폰트 스택, 회색 배경, 넓은 제목 자간, 70px 메뉴·6px 파란 밑줄

원본 저장소의 미사용 Figma 컴포넌트는 보존하지만 배포 번들에는 포함되지 않습니다.

PromptStyler는 본인 요청에 따라 프로젝트 목록과 이력서의 개별 프로젝트 항목에서 제외했습니다. 기존 자료는 추후 학부연구생 경험 작성용으로 보존하며, 연구실 소속 이력은 유지합니다.

## STABLE 연구 및 R&D (2026.10.22)

- STABLE을 제1저자 연구로 추가하고 카드·상세·논문 목록·이력서에 **ICASSP 2027 · Under Review** 상태를 명시했습니다.
- R&D 섹션: All 9 / Research 3 / Development 6. 기존 `#projects`와 `?project=` 주소는 유지합니다.
- 논문 결과는 제출 원고에 근거하며, 제공 코드에서 전체 실험을 다시 실행해 검증한 결과가 아닙니다.
- 공개 코드·논문 URL이 제공되지 않아 링크를 추측하지 않았습니다.
