export type Language = "ko" | "en";
const languageStorageKey = "gyutak-portfolio-language";

export function readLanguage(): Language {
  const query = new URLSearchParams(location.search).get("lang");
  if (query === "en" || query === "ko") return query;
  try {
    return localStorage.getItem(languageStorageKey) === "en" ? "en" : "ko";
  } catch {
    return "ko";
  }
}

export function rememberLanguage(language: Language) {
  try {
    localStorage.setItem(languageStorageKey, language);
  } catch {
    // The URL still preserves the language when browser storage is unavailable.
  }
}

export const copy = {
  ko: {
    intro: [
      "이미지·텍스트·음성 AI를 연구하고, 모델을 서비스에 연결합니다.",
      "필요한 기술을 배우며 앱 개발과 출시·운영까지 경험했습니다.",
    ],
    education: [
      { degree: "고려대학교 인공지능학과 석사과정", period: "2025.09 입학" },
      { degree: "세종대학교 지능기전공학 학사", period: "2019.03 – 2025.02" },
    ],
    profileAlt: "한규탁의 GitHub 프로필 이미지",
    github: "GitHub 프로필",
    email: "이메일 보내기",
    copyEmail: "이메일 주소 복사",
    details: "상세 보기",
    closeDetails: "프로젝트 상세 닫기",
    researchStart: "2025.09 시작",
    submitted: "제출 · 제1저자",
    conference: "제38회 제어로봇시스템학회 학술대회 · pp. 924–925",
    moteRecording: "Mote 앱의 회의 녹음 화면",
    moteSummary: "Mote 앱의 AI 회의 요약 결과 화면",
    moteCaption: "실제 앱 화면 · 녹음 및 회의 요약",
    wallbadukAlt: "벽바둑 개발 버전의 7×7 게임판과 2인 대결 화면",
    wallbadukCaption: "개발 버전의 실제 대전 화면",
    description: "한규탁 — 이미지·텍스트·음성 AI 연구부터 앱 개발과 서비스 운영까지. AI 연구·개발 프로젝트와 경력.",
  },
  en: {
    intro: [
      "I research image, language, and audio AI and turn models into usable applications.",
      "I learn the tools each project needs, from model development to product launch and operation.",
    ],
    education: [
      { degree: "M.S. Student in Artificial Intelligence, Korea University", period: "Enrolled Sep 2025" },
      { degree: "B.S. in Intelligent Mechatronics Engineering, Sejong University", period: "Mar 2019 – Feb 2025" },
    ],
    profileAlt: "Gyutak Hahn’s GitHub profile image",
    github: "GitHub profile",
    email: "Send email",
    copyEmail: "Copy email address",
    details: "View details",
    closeDetails: "Close project details",
    researchStart: "Started Sep 2025",
    submitted: "submitted · First author",
    conference: "38th ICROS Annual Conference · pp. 924–925",
    moteRecording: "Meeting recording screen in Mote",
    moteSummary: "AI meeting summary screen in Mote",
    moteCaption: "App screenshots · Recording and meeting summary",
    wallbadukAlt: "Wallbaduk development build showing a 7×7 board and two-player match",
    wallbadukCaption: "Gameplay screenshot from the development build",
    description: "Gyutak Hahn — AI researcher and developer working across image, language, and audio models, applications, and product development.",
  },
};
