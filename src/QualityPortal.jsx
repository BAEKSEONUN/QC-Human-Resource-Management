import { useState, useMemo, useEffect, useRef, createContext, useContext } from "react";

// 이 앱이 관리하는 공장 번호 목록. 지금은 1공장만 운영한다(2공장은 제거됨).
const FACTORIES = [1];

// ---------- 색상 토큰 ----------
const COLORS = {
  headDark: "#1F3D2E",
  headMid: "#2C5443",
  teal: "#0F6E56",
  tealBg: "#E1F5EE",
  page: "#F5F6F3",
  card: "#FFFFFF",
  border: "#E1DFD6",
  borderStrong: "#C7C4B8",
  textPrimary: "#1C1F1B",
  textSecondary: "#6B7168",
  textMuted: "#9C9A8F",
  success: "#0F6E56",
  successBg: "#E1F5EE",
  danger: "#A32D2D",
  dangerBg: "#FCEBEB",
  warning: "#854F0B",
  warningBg: "#FAEEDA",
  info: "#185FA5",
  infoBg: "#E6F1FB",
};

const STATUS_META = {
  출근: { color: COLORS.success, bg: COLORS.successBg, icon: "●" },
  연차: { color: COLORS.teal, bg: COLORS.tealBg, icon: "◆" },
  병가: { color: COLORS.warning, bg: COLORS.warningBg, icon: "＋" },
  무단결근: { color: COLORS.danger, bg: COLORS.dangerBg, icon: "✕" },
  출산휴가: { color: COLORS.info, bg: COLORS.infoBg, icon: "◐" },
};
// 명단에서 상태를 선택할 때 보여주는 순서 (출근 포함 전체)
const STATUS_OPTIONS = ["출근", "연차", "병가", "무단결근", "출산휴가"];

// 상태값(출근/연차/병가/무단결근/출산휴가)은 데이터 키로 계속 한국어를 쓰고,
// 화면에 보여줄 때만 언어에 맞게 바꿔서 표시한다.
const STATUS_LABEL = {
  ko: { 출근: "출근", 연차: "연차", 병가: "병가", 무단결근: "무단결근", 출산휴가: "출산휴가" },
  vi: { 출근: "Đi làm", 연차: "Nghỉ phép năm", 병가: "Nghỉ ốm", 무단결근: "Vắng không phép", 출산휴가: "Nghỉ thai sản" },
};
const trStatus = (status, lang) => (STATUS_LABEL[lang] && STATUS_LABEL[lang][status]) || status;

// 결근성 상태(출근 제외)를 대시보드에서 같은 항목끼리 묶어 보여주기 위한 순서
const ABSENCE_ORDER = ["연차", "병가", "무단결근", "출산휴가"];

// ---------- 부서 / 직급 기준 ----------
// 품질부서 산하 팀 (정렬 시 이 순서를 기준으로 그룹핑됨). PQC는 UNIT/ASSY로 분리.
// "현지총괄관리자"는 부서장 직속 현지 총괄 관리자용 카드로, 다른 부서 카드와
// 동일한 형식을 사용한다 (이름은 조직도에서 자유롭게 수정 가능).
// "QC"는 특정 팀 카드가 아니라 전체 명단 전용 소속이다 (qcMembers 참고).
const DEPARTMENTS = ["현지총괄관리자", "QC", "IQC", "PQC UNIT", "PQC ASSY", "OQC", "RMA"];
// 부서장은 팀 소속이 아니므로 정렬상 최상단에 별도로 둔다
const DEPT_ORDER = ["부서장", ...DEPARTMENTS];

// 직급 체계 (낮은 순 -> 높은 순). 정렬 시 이 순서를 기준으로 직급별로 묶는다.
// 최하위 직급은 검사 업무를 반영해 "Inspector"로 표기한다.
const POSITIONS = ["Inspector", "Staff", "Supervisor 1", "Supervisor 2", "Manager", "Upper Manager"];

// 전체 명단 요약에서 "관리자"로 묶어 세는 직급 (사용자가 지정한 3개 직급만).
const MANAGER_POSITIONS = ["Supervisor 1", "Supervisor 2", "Manager"];

const deptRank = (team) => {
  const idx = DEPT_ORDER.indexOf(team);
  return idx === -1 ? DEPT_ORDER.length : idx;
};

// 직급 값이 검사 구역(IQC/PQC/OQC/RMA)으로 적혀 있는 경우, 서열
// 계산에서는 Inspector와 동일하게 취급한다.
const POSITION_RANK_ALIASES = { IQC: "Inspector", PQC: "Inspector", OQC: "Inspector", RMA: "Inspector" };
const positionRank = (position) => {
  const canonical = POSITION_RANK_ALIASES[position] || position;
  const idx = POSITIONS.indexOf(canonical);
  // 목록에 없는 직급(부서장 등)은 최고 서열로 취급해 최상단에 표시
  return idx === -1 ? POSITIONS.length : idx;
};

// 같은 부서끼리 묶고, 부서 안에서는 직급이 높은 순으로 정렬
const sortByDeptAndPosition = (a, b) => {
  if (a.factory !== b.factory) return a.factory - b.factory;
  const da = deptRank(a.team);
  const db = deptRank(b.team);
  if (da !== db) return da - db;
  return positionRank(b.position) - positionRank(a.position);
};

const WEEKDAYS_KO = ["일", "월", "화", "수", "목", "금", "토"];
const WEEKDAYS_VI = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
const todayStr = (lang) => {
  const d = new Date();
  if (lang === "vi") {
    return `${WEEKDAYS_VI[d.getDay()]}, ngày ${d.getDate()} tháng ${d.getMonth() + 1} năm ${d.getFullYear()}`;
  }
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일 (${WEEKDAYS_KO[d.getDay()]})`;
};

// ---------- 다국어(한국어/베트남어) ----------
const DICT = {
  appTitle: { ko: "품질부서 인력 현황 포털", vi: "Cổng thông tin nhân sự phòng Chất lượng" },
  all: { ko: "전체", vi: "Tất cả" },
  factoryLabel: { ko: (n) => `${n}공장`, vi: (n) => `Nhà máy ${n}` },
  tabDashboard: { ko: "대시보드", vi: "Bảng điều khiển" },
  tabOrg: { ko: "조직도", vi: "Sơ đồ tổ chức" },
  tabList: { ko: "전체 명단", vi: "Danh sách nhân viên" },
  personSuffix: { ko: "명", vi: " người" },
  detailStatus: { ko: "세부 현황", vi: "Chi tiết hiện trạng" },
  allNormal: { ko: "오늘은 전원 정상 출근했습니다.", vi: "Hôm nay tất cả đều đi làm bình thường." },
  reasonPrefix: { ko: "사유", vi: "Lý do" },
  returnDatePrefix: { ko: "복귀예정일", vi: "Ngày dự kiến trở lại" },
  orgChartTitle: { ko: (f) => `${f}공장 품질팀 조직도`, vi: (f) => `Sơ đồ tổ chức - Nhà máy ${f}` },
  edit: { ko: "수정", vi: "Chỉnh sửa" },
  editDone: { ko: "수정 완료", vi: "Hoàn tất" },
  editDoneDisabledTitle: { ko: "저장 또는 취소 후 완료할 수 있습니다", vi: "Hãy lưu hoặc hủy trước khi hoàn tất" },
  addHead: { ko: "부서장 추가", vi: "Thêm trưởng phòng" },
  headClickDragTitle: { ko: "클릭하여 수정 · 드래그하여 순서 변경", vi: "Nhấn để sửa · Kéo để đổi thứ tự" },
  headDragTitle: { ko: "드래그하여 순서 변경", vi: "Kéo để đổi thứ tự" },
  deleteHeadTitle: { ko: "부서장 삭제", vi: "Xóa trưởng phòng" },
  confirmDeleteHead: { ko: (name) => `"${name}" 부서장을 삭제할까요?`, vi: (name) => `Xóa trưởng phòng "${name}"?` },
  confirmDeleteTeam: {
    ko: (title) => `"${title}" 팀을 삭제할까요? 소속 팀원도 함께 삭제됩니다.`,
    vi: (title) => `Xóa nhóm "${title}"? Tất cả thành viên trong nhóm cũng sẽ bị xóa.`,
  },
  confirmDeleteMember: { ko: "이 팀원을 삭제할까요?", vi: "Xóa thành viên này?" },
  deleteAll: { ko: "전체 삭제", vi: "Xóa tất cả" },
  confirmDeleteAll: {
    ko: "전체 명단(부서장과 모든 팀원)을 삭제할까요? 이 작업은 되돌릴 수 없습니다.",
    vi: "Xóa toàn bộ danh sách (trưởng phòng và tất cả thành viên)? Hành động này không thể hoàn tác.",
  },
  deleteSelected: { ko: (n) => `선택 삭제 (${n})`, vi: (n) => `Xóa mục đã chọn (${n})` },
  confirmDeleteSelected: {
    ko: (n) => `선택한 ${n}명을 삭제할까요?`,
    vi: (n) => `Xóa ${n} người đã chọn?`,
  },
  dragTeamTitle: { ko: "드래그하여 팀 순서 변경", vi: "Kéo để đổi thứ tự nhóm" },
  dragMemberTitle: { ko: "드래그하여 다른 팀으로 이동", vi: "Kéo để chuyển sang nhóm khác" },
  dragListRowTitle: { ko: "드래그하여 순서 변경", vi: "Kéo để đổi thứ tự" },
  uploadPhotoTitle: { ko: "사진 등록/변경", vi: "Đăng ký/đổi ảnh" },
  editTeamNameTitle: { ko: "팀 이름 수정", vi: "Sửa tên nhóm" },
  deleteTeamTitle: { ko: "팀 삭제", vi: "Xóa nhóm" },
  addMember: { ko: "팀원 추가", vi: "Thêm thành viên" },
  addTeam: { ko: "팀 추가", vi: "Thêm nhóm" },
  memberEditTitle: { ko: "수정", vi: "Sửa" },
  memberDeleteTitle: { ko: "삭제", vi: "Xóa" },
  fieldEmpNo: { ko: "사번", vi: "Mã NV" },
  fieldName: { ko: "성명", vi: "Họ tên" },
  fieldDept: { ko: "부서", vi: "Bộ phận" },
  fieldPosition: { ko: "직급", vi: "Chức vụ" },
  namePlaceholder: { ko: "홍길동", vi: "Nguyễn Văn A" },
  headPositionPlaceholder: { ko: "품질부서장", vi: "Trưởng phòng Chất lượng" },
  cancel: { ko: "취소", vi: "Hủy" },
  save: { ko: "저장", vi: "Lưu" },
  searchPlaceholder: { ko: "이름 또는 사번 검색", vi: "Tìm theo tên hoặc mã NV" },
  totalCount: { ko: (n) => `총 ${n}명`, vi: (n) => `Tổng ${n} người` },
  managerLabel: { ko: "관리자", vi: "Quản lý" },
  colPhoto: { ko: "사진", vi: "Ảnh" },
  colEmpNo: { ko: "사번", vi: "Mã NV" },
  colNameTeam: { ko: "성명 / 소속", vi: "Họ tên / Bộ phận" },
  colPosition: { ko: "직급", vi: "Chức vụ" },
  colFactory: { ko: "공장", vi: "Nhà máy" },
  colNote: { ko: "비고", vi: "Ghi chú" },
  colStatus: { ko: "오늘 상태", vi: "Trạng thái hôm nay" },
  headTeamLabel: { ko: "부서장", vi: "Trưởng phòng" },
  teamOverall: { ko: "현지총괄관리자", vi: "Tổng quản lý tại chỗ" },
};

const LangContext = createContext({ lang: "ko", t: (key) => key });
const useLang = () => useContext(LangContext);

function t(lang, key, ...args) {
  const entry = DICT[key];
  if (!entry) return key;
  const v = entry[lang] ?? entry.ko;
  return typeof v === "function" ? v(...args) : v;
}

// "현지총괄관리자" 같은 기본 제공 팀 이름만 번역해서 보여준다. 사용자가
// 직접 입력한 팀 이름(자유 텍스트)은 자동 번역할 수 없으므로 그대로 표시한다.
function trTeamTitle(title, lang) {
  if (lang === "vi" && title === "현지총괄관리자") return t(lang, "teamOverall");
  return title;
}

// 부서장 기본 직급 문구도 같은 방식으로만 번역한다.
function trHeadPosition(position, lang) {
  if (lang === "vi" && position === "품질부서장") return t(lang, "headPositionPlaceholder");
  return position;
}

// ---------- 초기 데이터 ----------
let idSeq = 1000;
const nextId = () => idSeq++;

// heads: 공장당 여러 명 둘 수 있는 품질부서장 목록.
// qcMembers: 부서(bộ phận)가 "QC"로만 적혀 있어 특정 팀 카드에 넣을 수
// 없는 인원 목록 — 전체 명단에는 "QC" 소속으로 나오고, 조직도에는 맨 끝의
// 고정 "Staff" 카드(직급별 tier로 묶여서 표시)에서만 보여진다.
// middleCard: 부서장 카드 스택과 팀 카드 행 사이에 단독으로 표시되는 카드
// 하나. 제목과 소속 인원을 사용자가 자유롭게 수정할 수 있다.
const newMiddleCard = () => ({ id: nextId(), title: "새 카드", members: [] });
const seedFactory = (factory, headsInfo, teamsSeed) => {
  const teams = teamsSeed.map((t) => ({
    id: nextId(),
    title: t.title,
    members: t.members.map((m) => ({ id: nextId(), ...m, factory })),
  }));
  const heads = headsInfo.map((h) => ({ id: nextId(), ...h, factory }));
  return { heads, teams, qcMembers: [], middleCard: newMiddleCard() };
};

const initialOrg = {
  1: seedFactory(
    1,
    [{ empNo: "Q1001", name: "홍성훈", position: "품질부서장" }],
    [
      { title: "현지총괄관리자", members: [] },
      {
        title: "IQC",
        members: [
          { empNo: "Q1011", name: "김철수", position: "Upper Manager", status: "출근" },
          { empNo: "Q1012", name: "김민수", position: "Supervisor 1", status: "병가", note: "감기몸살" },
          { empNo: "Q1013", name: "오세훈", position: "Inspector", status: "출근" },
        ],
      },
      {
        title: "PQC UNIT",
        members: [
          { empNo: "Q1021", name: "이수정", position: "Manager", status: "출산휴가", returnDate: "2026-11-02" },
        ],
      },
      {
        title: "PQC ASSY",
        members: [{ empNo: "Q1022", name: "정다은", position: "Inspector", status: "출근" }],
      },
      {
        title: "OQC",
        members: [
          { empNo: "Q1031", name: "박준호", position: "Supervisor 2", status: "무단결근" },
          { empNo: "Q1032", name: "최유진", position: "Inspector", status: "출근" },
        ],
      },
      {
        title: "RMA",
        members: [
          { empNo: "Q1041", name: "장서연", position: "Manager", status: "출근" },
          { empNo: "Q1042", name: "한도윤", position: "Staff", status: "출근" },
        ],
      },
    ]
  ),
};

// ---------- 저장(로컬 저장소) ----------
// 브라우저에 조직도 변경 내용을 저장해 새로고침/재접속 후에도 유지되게 한다.
// package.json 등 프로젝트 설정 파일과는 무관하며, 오직 이 브라우저의
// localStorage에만 저장된다(다른 기기·다른 브라우저와는 공유되지 않음).
const STORAGE_KEY = "qualityPortal.org.v1";
const LANG_STORAGE_KEY = "qualityPortal.lang.v1";
const RESET_DATE_KEY = "qualityPortal.lastResetDate.v1";

// 로컬 날짜를 "YYYY-MM-DD"로 반환한다 (returnDate 저장 형식과 동일해 문자열
// 비교로 날짜 선후를 판단할 수 있다).
function todayISODate() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

// 자정이 지나면 "오늘 상태"를 전부 출근으로 되돌린다. 다만 복귀예정일이
// 아직 지나지 않은 출산휴가는 매일 다시 입력할 필요가 없도록 그대로 둔다.
function resetStatusesForNewDay(org, todayISO) {
  let changed = false;
  const resetMember = (m) => {
    if (m.status === "출산휴가" && m.returnDate && m.returnDate > todayISO) return m;
    if (m.status === "출근" && !m.note && !m.returnDate) return m;
    changed = true;
    const { note, returnDate, ...rest } = m;
    return { ...rest, status: "출근" };
  };
  const next = {};
  Object.entries(org).forEach(([factory, data]) => {
    next[factory] = {
      ...data,
      teams: data.teams.map((tm) => ({ ...tm, members: tm.members.map(resetMember) })),
      qcMembers: (data.qcMembers || []).map(resetMember),
      middleCard: data.middleCard ? { ...data.middleCard, members: data.middleCard.members.map(resetMember) } : data.middleCard,
    };
  });
  return changed ? next : org;
}

// 저장된 데이터에 이미 쓰인 id보다 새로 만들 id가 작아 충돌하지 않도록,
// 불러온 데이터 안의 모든 id 중 최댓값을 찾아 idSeq를 그 이후로 맞춘다.
function collectMaxId(org) {
  let max = 0;
  Object.values(org).forEach((factoryData) => {
    (factoryData.heads || []).forEach((h) => {
      if (h.id > max) max = h.id;
    });
    (factoryData.teams || []).forEach((t) => {
      if (t.id > max) max = t.id;
      (t.members || []).forEach((m) => {
        if (m.id > max) max = m.id;
      });
    });
    (factoryData.qcMembers || []).forEach((m) => {
      if (m.id > max) max = m.id;
    });
    if (factoryData.middleCard) {
      if (factoryData.middleCard.id > max) max = factoryData.middleCard.id;
      (factoryData.middleCard.members || []).forEach((m) => {
        if (m.id > max) max = m.id;
      });
    }
  });
  return max;
}

// 예전 버전에서 저장된 데이터의 "총괄" 팀 이름을 새 이름으로 옮겨준다
// (소속 팀원은 그대로 유지).
function migrateLegacyTeamNames(org) {
  let changed = false;
  const next = {};
  Object.entries(org).forEach(([factory, data]) => {
    const teams = (data.teams || []).map((team) =>
      team.title === "총괄" ? ((changed = true), { ...team, title: "현지총괄관리자" }) : team
    );
    next[factory] = changed ? { ...data, teams } : data;
  });
  return changed ? next : org;
}

// 예전 버전에서 저장된 데이터에는 middleCard(부서장-팀 카드 사이 단독 카드)가
// 없으므로, 불러올 때 없으면 새로 채워 넣는다.
function ensureMiddleCard(org) {
  let changed = false;
  const next = {};
  Object.entries(org).forEach(([factory, data]) => {
    if (data.middleCard) {
      next[factory] = data;
    } else {
      changed = true;
      next[factory] = { ...data, middleCard: newMiddleCard() };
    }
  });
  return changed ? next : org;
}

function loadInitialOrg() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialOrg;
    const parsed = JSON.parse(raw);
    if (!parsed || !parsed[1]) return initialOrg;
    // 2공장은 앱에서 완전히 제거되었으므로, 예전에 저장된 데이터에 남아 있어도
    // 더 이상 읽어오지 않는다 (id 충돌 방지를 위한 idSeq 계산에는 포함시킨다).
    idSeq = Math.max(idSeq, collectMaxId(parsed) + 1);
    return ensureMiddleCard(migrateLegacyTeamNames({ 1: parsed[1] }));
  } catch {
    return initialOrg;
  }
}

function loadInitialLang() {
  try {
    const raw = localStorage.getItem(LANG_STORAGE_KEY);
    return raw === "vi" ? "vi" : "ko";
  } catch {
    return "ko";
  }
}

// 전체 명단에서 수정 모드 중 드래그로 정한 순서(사번/id 목록). 비어 있으면
// 기본 정렬(sortByDeptAndPosition)을 그대로 쓴다.
const LIST_ORDER_KEY = "qualityPortal.listOrder.v1";
function loadInitialListOrder() {
  try {
    const raw = localStorage.getItem(LIST_ORDER_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

// 사진 파일을 정사각형으로 가운데를 잘라 작게 리사이즈한 base64 데이터
// URL로 변환한다 (localStorage 용량을 아끼기 위해 96px, JPEG로 압축).
function readImageAsDataUrl(file, size = 96) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error);
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("이미지를 불러올 수 없습니다."));
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");
        const side = Math.min(img.width, img.height);
        const sx = (img.width - side) / 2;
        const sy = (img.height - side) / 2;
        ctx.drawImage(img, sx, sy, side, side, 0, 0, size, size);
        resolve(canvas.toDataURL("image/jpeg", 0.85));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

// ---------- 공용 UI 조각 ----------
function Badge({ status }) {
  const { lang } = useLang();
  const m = STATUS_META[status] || STATUS_META["출근"];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        fontSize: 12,
        fontWeight: 500,
        padding: "3px 9px",
        borderRadius: 6,
        background: m.bg,
        color: m.color,
        whiteSpace: "nowrap",
      }}
    >
      <span style={{ fontSize: 9 }}>{m.icon}</span>
      {trStatus(status, lang)}
    </span>
  );
}

function IconBtn({ children, onClick, title, danger }) {
  return (
    <button
      onClick={onClick}
      title={title}
      style={{
        width: 24,
        height: 24,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 6,
        border: `0.5px solid ${COLORS.border}`,
        background: COLORS.card,
        color: danger ? COLORS.danger : COLORS.textSecondary,
        fontSize: 13,
        cursor: "pointer",
        lineHeight: 1,
        flexShrink: 0,
      }}
    >
      {children}
    </button>
  );
}

// 인풋에 명시적 width/box-sizing이 없으면 브라우저 기본 폭(약 170px+)으로
// 렌더링되어 168px짜리 좁은 팀 카드 안에서 넘쳐버리고, 그 카드만 옆 카드보다
// 넓어지면서 조직도 전체 칸(컬럼) 정렬이 깨지는 문제가 있었다. width:100% +
// box-sizing:border-box로 부모 폭에 맞춰 줄어들도록 고정해 해결한다.
function TextField({ label, value, onChange, placeholder, style, children }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 12, color: COLORS.textSecondary, width: "100%", ...style }}>
      {label}
      {children ? (
        children
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={{
            width: "100%",
            boxSizing: "border-box",
            height: 32,
            padding: "0 10px",
            borderRadius: 6,
            border: `0.5px solid ${COLORS.border}`,
            fontSize: 13,
            color: COLORS.textPrimary,
            background: COLORS.card,
          }}
        />
      )}
    </label>
  );
}

// ---------- 조직도 구성원 편집 폼 ----------
// isHead가 true면 부서장 편집용(직급 자유 입력), 아니면 팀원 편집용
// (직급을 정해진 6단계 중에서만 고르도록 select로 제한).
// 필드를 가로로 나열하면 168px짜리 좁은 팀 카드 안에서 입력칸이 짓눌려
// "칸이 안 맞는" 것처럼 보이므로 세로로 쌓아 카드 폭에 관계없이 항상
// 정렬이 유지되도록 했다.
function MemberForm({ initial, isHead, onSave, onCancel }) {
  const { lang } = useLang();
  const [empNo, setEmpNo] = useState(initial?.empNo || "");
  const [name, setName] = useState(initial?.name || "");
  const [position, setPosition] = useState(initial?.position || (isHead ? "품질부서장" : POSITIONS[0]));

  const submit = () => {
    if (!empNo.trim() || !name.trim() || !position.trim()) return;
    onSave({ empNo: empNo.trim(), name: name.trim(), position: position.trim() });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        padding: 10,
        borderRadius: 8,
        border: `0.5px solid ${COLORS.borderStrong}`,
        background: "#FAFAF7",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <TextField label={t(lang, "fieldEmpNo")} value={empNo} onChange={setEmpNo} placeholder="Q1051" />
        <TextField label={t(lang, "fieldName")} value={name} onChange={setName} placeholder={t(lang, "namePlaceholder")} />
        {isHead ? (
          <TextField
            label={t(lang, "fieldPosition")}
            value={position}
            onChange={setPosition}
            placeholder={t(lang, "headPositionPlaceholder")}
          />
        ) : (
          <TextField label={t(lang, "fieldPosition")}>
            <select
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              style={{
                width: "100%",
                boxSizing: "border-box",
                height: 32,
                padding: "0 8px",
                borderRadius: 6,
                border: `0.5px solid ${COLORS.border}`,
                fontSize: 13,
                color: COLORS.textPrimary,
                background: COLORS.card,
              }}
            >
              {POSITIONS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </TextField>
        )}
      </div>
      <div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}>
        <button
          onClick={onCancel}
          style={{ fontSize: 12, padding: "5px 12px", borderRadius: 6, border: `0.5px solid ${COLORS.border}`, background: COLORS.card }}
        >
          {t(lang, "cancel")}
        </button>
        <button
          onClick={submit}
          style={{
            fontSize: 12,
            padding: "5px 12px",
            borderRadius: 6,
            border: "none",
            background: COLORS.headDark,
            color: "#fff",
            fontWeight: 500,
          }}
        >
          {t(lang, "save")}
        </button>
      </div>
    </div>
  );
}

// 직급을 Manager / Supervisor / Staff / Inspector 4단계로 묶어서 보여준다.
// (Manager: Manager·Upper Manager, Supervisor: Supervisor 1·2, Staff는 별도
// 그룹, Inspector: Inspector 및 검사 구역으로 표기된 IQC/PQC/OQC/RMA)
const POSITION_TIER = {
  Inspector: "Inspector",
  IQC: "Inspector",
  PQC: "Inspector",
  OQC: "Inspector",
  RMA: "Inspector",
  Staff: "Staff",
  "Supervisor 1": "Supervisor",
  "Supervisor 2": "Supervisor",
  Manager: "Manager",
  "Upper Manager": "Manager",
};
const TIER_ORDER = ["Manager", "Supervisor", "Staff", "Inspector"];
const tierRank = (tier) => {
  const idx = TIER_ORDER.indexOf(tier);
  return idx === -1 ? TIER_ORDER.length : idx;
};

// 직급 그룹별 색상 (부서장은 Manager와 동일한 초록 계열 사용)
const TIER_COLORS = {
  부서장: { color: "#2F8F5B", bg: "#E7F6EC", border: "#BEE6CC" },
  Manager: { color: "#2F8F5B", bg: "#E7F6EC", border: "#BEE6CC" },
  Supervisor: { color: "#C2790C", bg: "#FDF0DC", border: "#F3D9A8" },
  Staff: { color: "#6B4FA0", bg: "#F1ECFA", border: "#DACEF0" },
  Inspector: { color: "#2668B2", bg: "#E6F0FB", border: "#BBD8F4" },
};
const tierColorsOf = (tier) => TIER_COLORS[tier] || TIER_COLORS.Inspector;

// 조직도 카드에서는 IQC/PQC/OQC/RMA로 등록된 직급도 검사 인원이라는 뜻으로
// "Inspector"라고 표시한다 (전체 명단에서는 원래 값을 그대로 보여준다).
const INSPECTOR_POSITION_ALIASES = ["IQC", "PQC", "OQC", "RMA"];
const orgPositionLabel = (position) => (INSPECTOR_POSITION_ALIASES.includes(position) ? "Inspector" : position);

// 팀원을 직급 그룹(Manager/Supervisor/Inspector)으로 묶어 [그룹, 팀원목록] 쌍의
// 배열로 반환한다 (서열 높은 그룹 먼저, 그룹 안에서도 세부 직급 높은 순)
function groupByTier(members) {
  const groups = new Map();
  members.forEach((m) => {
    const tier = POSITION_TIER[m.position] || m.position;
    if (!groups.has(tier)) groups.set(tier, []);
    groups.get(tier).push(m);
  });
  return [...groups.entries()]
    .map(([tier, list]) => [tier, list.slice().sort((a, b) => positionRank(b.position) - positionRank(a.position))])
    .sort((a, b) => tierRank(a[0]) - tierRank(b[0]));
}

// ---------- 조직도 팀 카드 ----------
// 같은 부서(팀) 안에서도 직급별로 칸을 나눠 보여준다. 부서 전체는 기존처럼
// 위쪽 연결선 하나로 조직도에 연결되고, 그 안에서 직급 단위로 소분류된다.
// draggable/onDragStart 등은 부모(OrgChart)가 팀 카드 좌우 순서를
// 드래그로 바꿀 수 있도록 전달하는 핸들러다.
// onDirtyChange: 이 카드 안에서 저장하지 않은 편집(팀명/팀원 추가·수정)이
// 열려 있는지를 부모(OrgChart)에 알려, "수정 완료" 버튼을 잠그는 데 쓰인다.
function TeamCard({
  team,
  isEditing,
  onUpdateTitle,
  onDeleteTeam,
  onAddMember,
  onEditMember,
  onDeleteMember,
  onDirtyChange,
  draggable,
  isDragOver,
  onDragStart,
  onDragOver,
  onDragLeave,
  onDrop,
  onDragEnd,
  onMemberDragStart,
  onMemberDragEnd,
  isMemberDropTarget,
  onMemberDrop,
  headerColor,
  titleEditable = true,
  deletable = true,
}) {
  const { lang } = useLang();
  const [editingTitle, setEditingTitle] = useState(false);
  const [titleDraft, setTitleDraft] = useState(team.title);
  const [addingMember, setAddingMember] = useState(false);
  const [editingMemberId, setEditingMemberId] = useState(null);

  const onDirtyChangeRef = useRef(onDirtyChange);
  onDirtyChangeRef.current = onDirtyChange;
  useEffect(() => {
    const dirty = editingTitle || addingMember || editingMemberId !== null;
    onDirtyChangeRef.current?.(dirty);
  }, [editingTitle, addingMember, editingMemberId]);
  useEffect(() => {
    return () => onDirtyChangeRef.current?.(false);
  }, []);

  const grouped = groupByTier(team.members);

  // 팀원 카드 자체는 수정 모드에서만 드래그로 다른 팀 카드로 옮길 수 있다.
  // 팀 카드(헤더) 드래그와 별개의 제스처이므로 stopPropagation으로 상위
  // 카드 재정렬 핸들러가 같이 반응하지 않게 막는다.
  const renderMemberRow = (m, tc) => (
    <div
      key={m.id}
      draggable={isEditing}
      onDragStart={(e) => {
        e.stopPropagation();
        onMemberDragStart?.(m.id);
      }}
      onDragEnd={(e) => {
        e.stopPropagation();
        onMemberDragEnd?.();
      }}
      title={isEditing ? t(lang, "dragMemberTitle") : undefined}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "6px 8px",
        borderRadius: 6,
        background: COLORS.card,
        borderTop: `0.5px solid ${COLORS.border}`,
        borderRight: `0.5px solid ${COLORS.border}`,
        borderBottom: `0.5px solid ${COLORS.border}`,
        borderLeft: `3px solid ${tc.color}`,
        cursor: isEditing ? "grab" : "default",
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 11, color: "#000000" }}>{orgPositionLabel(m.position)}</div>
        <div style={{ fontSize: 13, fontWeight: 500, color: COLORS.textPrimary }}>{m.name}</div>
      </div>
      {isEditing && (
        <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
          <IconBtn title={t(lang, "memberEditTitle")} onClick={() => setEditingMemberId(m.id)}>
            <span aria-hidden="true">✎</span>
          </IconBtn>
          <IconBtn title={t(lang, "memberDeleteTitle")} danger onClick={() => onDeleteMember(m.id)}>
            <span aria-hidden="true">🗑</span>
          </IconBtn>
        </div>
      )}
    </div>
  );

  return (
    <div
      draggable={draggable}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onDragEnd={onDragEnd}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flex: "1 1 0",
        minWidth: 168,
        opacity: isDragOver ? 0.6 : 1,
      }}
    >
      {/* 수직 연결선 */}
      <div style={{ width: 1, height: 16, background: COLORS.borderStrong }} />

      <div
        style={{
          width: "100%",
          border: `0.5px solid ${isDragOver ? COLORS.teal : COLORS.border}`,
          borderRadius: 10,
          overflow: "hidden",
          background: COLORS.card,
        }}
      >
        <div
          title={t(lang, "dragTeamTitle")}
          style={{
            background: headerColor || COLORS.headMid,
            color: "#fff",
            padding: "8px 10px",
            display: "flex",
            alignItems: "center",
            gap: 6,
            cursor: draggable ? "grab" : "default",
          }}
        >
          <span aria-hidden="true" style={{ opacity: 0.6, fontSize: 12, flexShrink: 0 }}>
            ⠿
          </span>
          {editingTitle ? (
            <input
              value={titleDraft}
              onChange={(e) => setTitleDraft(e.target.value)}
              onBlur={() => {
                onUpdateTitle(titleDraft.trim() || team.title);
                setEditingTitle(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") e.currentTarget.blur();
              }}
              autoFocus
              style={{
                fontSize: 13,
                fontWeight: 500,
                background: "rgba(255,255,255,0.15)",
                border: "none",
                borderRadius: 4,
                color: "#fff",
                padding: "2px 6px",
                width: "100%",
                boxSizing: "border-box",
                minWidth: 0,
              }}
            />
          ) : (
            <span
              style={{
                fontSize: 13,
                fontWeight: 500,
                cursor: isEditing && titleEditable ? "pointer" : "default",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              onClick={isEditing && titleEditable ? () => setEditingTitle(true) : undefined}
            >
              {trTeamTitle(team.title, lang)}
            </span>
          )}
          {isEditing && (
            <div style={{ display: "flex", gap: 4, flexShrink: 0, marginLeft: "auto" }}>
              {titleEditable && (
                <button
                  onClick={() => setEditingTitle(true)}
                  title={t(lang, "editTeamNameTitle")}
                  style={{ background: "transparent", border: "none", color: "#fff", opacity: 0.85, cursor: "pointer", fontSize: 12 }}
                >
                  <span aria-hidden="true">✎</span>
                </button>
              )}
              {deletable && (
                <button
                  onClick={onDeleteTeam}
                  title={t(lang, "deleteTeamTitle")}
                  style={{ background: "transparent", border: "none", color: "#fff", opacity: 0.85, cursor: "pointer", fontSize: 12 }}
                >
                  <span aria-hidden="true">🗑</span>
                </button>
              )}
            </div>
          )}
        </div>

        <div
          onDragOver={(e) => {
            if (!isMemberDropTarget) return;
            e.preventDefault();
            e.stopPropagation();
          }}
          onDrop={(e) => {
            if (!isMemberDropTarget) return;
            e.preventDefault();
            e.stopPropagation();
            onMemberDrop?.();
          }}
          style={{
            padding: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 0,
            background: isMemberDropTarget ? COLORS.tealBg : "transparent",
            outline: isMemberDropTarget ? `1.5px dashed ${COLORS.teal}` : "none",
            outlineOffset: -4,
            borderRadius: 8,
          }}
        >
          {grouped.map(([tier, members], idx) => {
            const tc = tierColorsOf(tier);
            return (
              <div key={tier} style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                {/* 팀 헤더~직급 칸, 직급 칸끼리를 선으로 연결 */}
                <div style={{ width: 1, height: idx === 0 ? 8 : 10, background: COLORS.borderStrong }} />
                <div
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    border: `0.5px solid ${tc.border}`,
                    borderRadius: 8,
                    padding: 6,
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                    background: tc.bg,
                  }}
                >
                  {members.map((m) =>
                    editingMemberId === m.id ? (
                      <MemberForm
                        key={m.id}
                        initial={m}
                        onCancel={() => setEditingMemberId(null)}
                        onSave={(data) => {
                          onEditMember(m.id, data);
                          setEditingMemberId(null);
                        }}
                      />
                    ) : (
                      renderMemberRow(m, tc)
                    )
                  )}
                </div>
              </div>
            );
          })}

          {addingMember ? (
            <div style={{ width: "100%", marginTop: 8 }}>
              <MemberForm
                onCancel={() => setAddingMember(false)}
                onSave={(data) => {
                  onAddMember(data);
                  setAddingMember(false);
                }}
              />
            </div>
          ) : isEditing ? (
            <button
              onClick={() => setAddingMember(true)}
              style={{
                fontSize: 12,
                padding: "6px 8px",
                borderRadius: 6,
                border: `0.5px dashed ${COLORS.borderStrong}`,
                background: "transparent",
                color: COLORS.textSecondary,
                cursor: "pointer",
                width: "100%",
                boxSizing: "border-box",
                marginTop: 8,
              }}
            >
              <span style={{ marginRight: 4 }} aria-hidden="true">+</span>
              {t(lang, "addMember")}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

// ---------- 조직도 (공장 1개) ----------
// onDirtyChange: 부서장 편집/추가 폼이나 팀 카드 안의 미저장 편집이 하나라도
// 열려 있으면 true를 보고해 FactoryOrgPanel의 "수정 완료" 버튼을 잠근다.
function OrgChart({ factory, data, isEditing, setOrg, onDirtyChange }) {
  const { lang } = useLang();
  const [editingHeadId, setEditingHeadId] = useState(null);
  const [addingHead, setAddingHead] = useState(false);
  const [dragIndex, setDragIndex] = useState(null);
  const [overIndex, setOverIndex] = useState(null);
  const [headDragIndex, setHeadDragIndex] = useState(null);
  const [headOverIndex, setHeadOverIndex] = useState(null);
  const [dirtyTeamIds, setDirtyTeamIds] = useState(() => new Set());

  const handleTeamDirtyChange = (teamId, dirty) => {
    setDirtyTeamIds((prev) => {
      const has = prev.has(teamId);
      if (dirty === has) return prev;
      const next = new Set(prev);
      if (dirty) next.add(teamId);
      else next.delete(teamId);
      return next;
    });
  };

  const hasOpenForm = editingHeadId !== null || addingHead || dirtyTeamIds.size > 0;
  useEffect(() => {
    onDirtyChange?.(hasOpenForm);
  }, [hasOpenForm, onDirtyChange]);

  const updateTeams = (updater) => {
    setOrg((prev) => ({
      ...prev,
      [factory]: { ...prev[factory], teams: updater(prev[factory].teams) },
    }));
  };

  const updateHeads = (updater) => {
    setOrg((prev) => ({
      ...prev,
      [factory]: { ...prev[factory], heads: updater(prev[factory].heads) },
    }));
  };

  // bộ phận이 "QC"로만 적힌 인원(qcMembers) 전용 업데이트 헬퍼. 이 인원들은
  // 팀 카드가 아니라 조직도 맨 끝의 고정 "Staff" 카드에서만 추가·수정·삭제된다.
  const updateQcMembers = (updater) => {
    setOrg((prev) => ({
      ...prev,
      [factory]: { ...prev[factory], qcMembers: updater(prev[factory].qcMembers || []) },
    }));
  };

  // 부서장 카드 스택과 팀 카드 행 사이의 단독 카드(middleCard) 업데이트 헬퍼.
  // 제목과 소속 인원을 사용자가 자유롭게 수정할 수 있다.
  const updateMiddleCard = (updater) => {
    setOrg((prev) => ({
      ...prev,
      [factory]: { ...prev[factory], middleCard: updater(prev[factory].middleCard || newMiddleCard()) },
    }));
  };

  const addTeam = () => {
    updateTeams((teams) => [...teams, { id: nextId(), title: "새 팀", members: [] }]);
  };

  const moveTeam = (fromIdx, toIdx) => {
    updateTeams((teams) => {
      if (fromIdx === toIdx || fromIdx == null || toIdx == null) return teams;
      const next = [...teams];
      const [moved] = next.splice(fromIdx, 1);
      next.splice(toIdx, 0, moved);
      return next;
    });
  };

  const moveHead = (fromIdx, toIdx) => {
    updateHeads((heads) => {
      if (fromIdx === toIdx || fromIdx == null || toIdx == null) return heads;
      const next = [...heads];
      const [moved] = next.splice(fromIdx, 1);
      next.splice(toIdx, 0, moved);
      return next;
    });
  };

  // 팀원을 다른 팀 카드로 드래그해서 옮기는 상태. 직급/이름 등은 그대로
  // 두고 소속 팀만 바뀐다.
  const [draggedMemberInfo, setDraggedMemberInfo] = useState(null);
  const moveMemberBetweenTeams = (sourceTeamId, targetTeamId, memberId) => {
    if (sourceTeamId === targetTeamId) return;
    updateTeams((teams) => {
      const sourceTeam = teams.find((t) => t.id === sourceTeamId);
      const member = sourceTeam?.members.find((m) => m.id === memberId);
      if (!member) return teams;
      return teams.map((t) => {
        if (t.id === sourceTeamId) return { ...t, members: t.members.filter((m) => m.id !== memberId) };
        if (t.id === targetTeamId) return { ...t, members: [...t.members, member] };
        return t;
      });
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "8px 4px 4px" }}>
      {/* 부서장은 일반 팀원과 같은 카드 형식(색만 다르게)으로, 위/아래 드래그로
          서열을 표현할 수 있도록 세로로 쌓고 카드끼리 선으로 연결해 보여준다.
          드래그 정렬 자체는 수정 모드와 무관하게 항상 가능하다. */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {data.heads.map((h, idx) => {
          const tc = tierColorsOf("부서장");
          return editingHeadId === h.id ? (
            <div key={h.id} style={{ width: 260, maxWidth: "100%", marginTop: idx === 0 ? 0 : 10 }}>
              <MemberForm
                initial={h}
                isHead
                onCancel={() => setEditingHeadId(null)}
                onSave={(d) => {
                  updateHeads((heads) => heads.map((x) => (x.id === h.id ? { ...x, ...d } : x)));
                  setEditingHeadId(null);
                }}
              />
            </div>
          ) : (
            <div key={h.id} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              {idx > 0 && <div style={{ width: 1, height: 10, background: COLORS.borderStrong }} />}
              <div style={{ position: "relative", width: 260, maxWidth: "100%" }}>
                <div
                  draggable
                  onDragStart={() => setHeadDragIndex(idx)}
                  onDragOver={(e) => {
                    e.preventDefault();
                    if (headOverIndex !== idx) setHeadOverIndex(idx);
                  }}
                  onDragLeave={() => setHeadOverIndex((cur) => (cur === idx ? null : cur))}
                  onDrop={(e) => {
                    e.preventDefault();
                    moveHead(headDragIndex, idx);
                    setHeadDragIndex(null);
                    setHeadOverIndex(null);
                  }}
                  onDragEnd={() => {
                    setHeadDragIndex(null);
                    setHeadOverIndex(null);
                  }}
                  onClick={isEditing ? () => setEditingHeadId(h.id) : undefined}
                  title={isEditing ? t(lang, "headClickDragTitle") : t(lang, "headDragTitle")}
                  style={{
                    borderRadius: 10,
                    overflow: "hidden",
                    border: `0.5px solid ${headOverIndex === idx && headDragIndex !== idx ? COLORS.teal : COLORS.border}`,
                    background: COLORS.card,
                    boxSizing: "border-box",
                    cursor: isEditing ? "pointer" : "grab",
                    opacity: headOverIndex === idx && headDragIndex !== idx ? 0.7 : 1,
                  }}
                >
                  <div
                    style={{
                      background: COLORS.headDark,
                      color: "#fff",
                      padding: "8px 10px",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <span aria-hidden="true" style={{ opacity: 0.6, fontSize: 12, flexShrink: 0 }}>
                      ⠿
                    </span>
                    <span style={{ fontSize: 13, fontWeight: 500 }}>{t(lang, "headTeamLabel")}</span>
                  </div>
                  <div style={{ padding: 8 }}>
                    <div
                      style={{
                        border: `0.5px solid ${tc.border}`,
                        borderRadius: 8,
                        padding: 6,
                        background: tc.bg,
                      }}
                    >
                      <div style={{ fontSize: 11, color: "#000000" }}>{trHeadPosition(h.position, lang)}</div>
                      <div style={{ fontSize: 13, fontWeight: 500, color: COLORS.textPrimary }}>{h.name}</div>
                    </div>
                  </div>
                </div>
                {isEditing && data.heads.length > 1 && (
                  <button
                    onClick={() => {
                      if (confirm(t(lang, "confirmDeleteHead", h.name))) {
                        updateHeads((heads) => heads.filter((x) => x.id !== h.id));
                      }
                    }}
                    title={t(lang, "deleteHeadTitle")}
                    style={{
                      position: "absolute",
                      top: -6,
                      right: -6,
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      border: `0.5px solid ${COLORS.border}`,
                      background: COLORS.card,
                      color: COLORS.danger,
                      fontSize: 10,
                      lineHeight: 1,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          );
        })}

        {isEditing &&
          (addingHead ? (
            <div style={{ width: 260, maxWidth: "100%", marginTop: data.heads.length > 0 ? 10 : 0 }}>
              <MemberForm
                isHead
                onCancel={() => setAddingHead(false)}
                onSave={(d) => {
                  updateHeads((heads) => [...heads, { id: nextId(), ...d, factory }]);
                  setAddingHead(false);
                }}
              />
            </div>
          ) : (
            <>
              {data.heads.length > 0 && <div style={{ width: 1, height: 10, background: COLORS.borderStrong }} />}
              <button
                onClick={() => setAddingHead(true)}
                style={{
                  padding: "8px 18px",
                  borderRadius: 999,
                  border: `1px dashed ${COLORS.borderStrong}`,
                  background: "transparent",
                  color: COLORS.textSecondary,
                  fontSize: 13,
                  cursor: "pointer",
                  minWidth: 140,
                }}
              >
                <span style={{ marginRight: 4 }} aria-hidden="true">+</span>
                {t(lang, "addHead")}
              </button>
            </>
          ))}
      </div>

      {/* 부서장 카드 스택과 팀 카드 행 사이의 단독 카드. 제목과 소속 인원을
          자유롭게 수정할 수 있는 실제 카드다 (팀 카드와 같은 컴포넌트 재사용). */}
      <div style={{ width: 260, maxWidth: "100%" }}>
        <TeamCard
          team={data.middleCard || newMiddleCard()}
          isEditing={isEditing}
          onDirtyChange={(d) => handleTeamDirtyChange("middle-card", d)}
          headerColor={COLORS.headDark}
          deletable={false}
          onUpdateTitle={(title) => updateMiddleCard((mc) => ({ ...mc, title }))}
          onAddMember={(d) =>
            updateMiddleCard((mc) => ({ ...mc, members: [...mc.members, { id: nextId(), ...d, factory, status: "출근" }] }))
          }
          onEditMember={(memberId, d) =>
            updateMiddleCard((mc) => ({
              ...mc,
              members: mc.members.map((m) => (m.id === memberId ? { ...m, ...d } : m)),
            }))
          }
          onDeleteMember={(memberId) => {
            if (confirm(t(lang, "confirmDeleteMember"))) {
              updateMiddleCard((mc) => ({ ...mc, members: mc.members.filter((m) => m.id !== memberId) }));
            }
          }}
        />
      </div>

      <div style={{ width: 1, height: 18, background: COLORS.borderStrong }} />
      <div style={{ width: 6, height: 6, borderRadius: "50%", border: `1.5px solid ${COLORS.borderStrong}`, background: COLORS.page }} />

      <div style={{ width: "100%", borderTop: `2px solid ${COLORS.borderStrong}`, marginTop: 0 }} />

      <div style={{ display: "flex", gap: 14, width: "100%", marginTop: 0, alignItems: "flex-start" }}>
        {data.teams.map((team, idx) => (
          <TeamCard
            key={team.id}
            team={team}
            isEditing={isEditing}
            onDirtyChange={(d) => handleTeamDirtyChange(team.id, d)}
            draggable
            isDragOver={overIndex === idx && dragIndex !== idx}
            onDragStart={() => setDragIndex(idx)}
            onDragOver={(e) => {
              e.preventDefault();
              if (overIndex !== idx) setOverIndex(idx);
            }}
            onDragLeave={() => setOverIndex((cur) => (cur === idx ? null : cur))}
            onDrop={(e) => {
              e.preventDefault();
              moveTeam(dragIndex, idx);
              setDragIndex(null);
              setOverIndex(null);
            }}
            onDragEnd={() => {
              setDragIndex(null);
              setOverIndex(null);
            }}
            onUpdateTitle={(title) =>
              updateTeams((teams) => teams.map((t) => (t.id === team.id ? { ...t, title } : t)))
            }
            onDeleteTeam={() => {
              if (confirm(t(lang, "confirmDeleteTeam", team.title))) {
                updateTeams((teams) => teams.filter((t) => t.id !== team.id));
              }
            }}
            onAddMember={(d) =>
              updateTeams((teams) =>
                teams.map((t) =>
                  t.id === team.id
                    ? { ...t, members: [...t.members, { id: nextId(), ...d, factory, status: "출근" }] }
                    : t
                )
              )
            }
            onEditMember={(memberId, d) =>
              updateTeams((teams) =>
                teams.map((t) =>
                  t.id === team.id
                    ? { ...t, members: t.members.map((m) => (m.id === memberId ? { ...m, ...d } : m)) }
                    : t
                )
              )
            }
            onDeleteMember={(memberId) => {
              if (confirm(t(lang, "confirmDeleteMember"))) {
                updateTeams((teams) =>
                  teams.map((t) => (t.id === team.id ? { ...t, members: t.members.filter((m) => m.id !== memberId) } : t))
                );
              }
            }}
            onMemberDragStart={(memberId) => setDraggedMemberInfo({ memberId, sourceTeamId: team.id })}
            onMemberDragEnd={() => setDraggedMemberInfo(null)}
            isMemberDropTarget={!!draggedMemberInfo && draggedMemberInfo.sourceTeamId !== team.id}
            onMemberDrop={() => {
              if (draggedMemberInfo) moveMemberBetweenTeams(draggedMemberInfo.sourceTeamId, team.id, draggedMemberInfo.memberId);
              setDraggedMemberInfo(null);
            }}
          />
        ))}

        {/* bộ phận이 "QC"로만 적힌 인원(qcMembers) 전용 고정 카드. 특정 팀에
            속하지 않으므로 항상 맨 끝에 표시되고, 다른 카드처럼 이름을
            바꾸거나 카드 자체를 지울 수는 없다 (팀원 추가/수정/삭제는 가능). */}
        <TeamCard
          key="qc-staff-card"
          team={{ id: "qc-staff-card", title: "Staff", members: data.qcMembers || [] }}
          isEditing={isEditing}
          onDirtyChange={(d) => handleTeamDirtyChange("qc-staff-card", d)}
          headerColor={COLORS.headDark}
          titleEditable={false}
          deletable={false}
          onAddMember={(d) => updateQcMembers((members) => [...members, { id: nextId(), ...d, factory, status: "출근" }])}
          onEditMember={(memberId, d) =>
            updateQcMembers((members) => members.map((m) => (m.id === memberId ? { ...m, ...d } : m)))
          }
          onDeleteMember={(memberId) => {
            if (confirm(t(lang, "confirmDeleteMember"))) {
              updateQcMembers((members) => members.filter((m) => m.id !== memberId));
            }
          }}
        />

        {isEditing && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: "1 1 0", minWidth: 140 }}>
            <div style={{ width: 1, height: 16, background: "transparent" }} />
            <button
              onClick={addTeam}
              style={{
                width: "100%",
                minHeight: 60,
                borderRadius: 10,
                border: `1px dashed ${COLORS.borderStrong}`,
                background: "transparent",
                color: COLORS.textSecondary,
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              <span style={{ marginRight: 4 }} aria-hidden="true">+</span>
              {t(lang, "addTeam")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// 공장별 조직도 패널. 우측 상단 "수정" 버튼으로 편집 모드를 켜고 끄며,
// 편집 모드일 때만 추가/수정/삭제 컨트롤이 나타난다 (팀·부서장 드래그 이동은
// 편집 모드와 무관하게 항상 가능). 하위에 저장하지 않은 편집 폼이 열려
// 있는 동안에는 "수정 완료" 버튼을 눌러도 편집 모드가 꺼지지 않는다 —
// 저장(또는 취소) 버튼을 눌러 그 폼을 닫아야 완료할 수 있다.
function FactoryOrgPanel({ factory, data, setOrg }) {
  const { lang } = useLang();
  const [isEditing, setIsEditing] = useState(false);
  const [hasOpenForm, setHasOpenForm] = useState(false);

  const locked = isEditing && hasOpenForm;

  return (
    <div style={{ background: COLORS.card, border: `0.5px solid ${COLORS.border}`, borderRadius: 12, padding: "18px 16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
        <div style={{ fontSize: 14, fontWeight: 500, color: COLORS.textSecondary }}>{t(lang, "orgChartTitle", factory)}</div>
        <button
          onClick={() => {
            if (locked) return;
            setIsEditing((v) => !v);
          }}
          disabled={locked}
          title={locked ? t(lang, "editDoneDisabledTitle") : undefined}
          style={{
            padding: "5px 12px",
            fontSize: 12,
            borderRadius: 6,
            border: `0.5px solid ${isEditing ? COLORS.headDark : COLORS.border}`,
            background: isEditing ? COLORS.headDark : COLORS.card,
            color: isEditing ? "#fff" : COLORS.textSecondary,
            cursor: locked ? "not-allowed" : "pointer",
            opacity: locked ? 0.65 : 1,
            fontWeight: 500,
          }}
        >
          <span aria-hidden="true" style={{ marginRight: 4 }}>✎</span>
          {isEditing ? t(lang, "editDone") : t(lang, "edit")}
        </button>
      </div>
      <OrgChart factory={factory} data={data} isEditing={isEditing} setOrg={setOrg} onDirtyChange={setHasOpenForm} />
    </div>
  );
}

// ---------- 메인 앱 ----------
export default function QualityPortal() {
  const [org, setOrg] = useState(loadInitialOrg);
  const [lang, setLang] = useState(loadInitialLang);
  const [tab, setTab] = useState("dashboard");
  const [factory, setFactory] = useState("all");
  const [statusFilter, setStatusFilter] = useState("전체");
  const [search, setSearch] = useState("");
  const [listEditing, setListEditing] = useState(false);
  const [editingListId, setEditingListId] = useState(null);
  const [selectedListIds, setSelectedListIds] = useState(() => new Set());
  const [listOrder, setListOrder] = useState(loadInitialListOrder);
  const [dragRowId, setDragRowId] = useState(null);
  const [overRowId, setOverRowId] = useState(null);

  // 조직도가 바뀔 때마다 이 브라우저의 localStorage에 저장해 새로고침해도 유지되게 한다.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(org));
    } catch {
      // 저장소를 쓸 수 없는 환경(프라이빗 모드 등)이면 조용히 무시하고 메모리상 상태만 유지
    }
  }, [org]);

  useEffect(() => {
    try {
      localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch {
      // 무시
    }
  }, [lang]);

  // 명단 수정 모드에서 드래그로 정한 순서를 저장해, 다음 수정 전까지 고정되게 한다.
  useEffect(() => {
    try {
      localStorage.setItem(LIST_ORDER_KEY, JSON.stringify(listOrder));
    } catch {
      // 무시
    }
  }, [listOrder]);

  // 날짜가 바뀌면(자정이 지나면) "오늘 상태"를 출근으로 초기화한다. 앱을
  // 새로 열었을 때 날짜가 이미 바뀌어 있으면 즉시 한 번 처리하고, 앱을 켜둔
  // 채로 자정을 넘기는 경우를 위해 다음 자정 시각에 맞춰 타이머도 예약한다.
  useEffect(() => {
    const runResetIfNewDay = () => {
      const todayISO = todayISODate();
      let lastReset = null;
      try {
        lastReset = localStorage.getItem(RESET_DATE_KEY);
      } catch {
        // 무시
      }
      if (lastReset !== todayISO) {
        // lastReset이 아예 없던 첫 실행(처음 방문/마이그레이션 이전 데이터)에는
        // 기존 상태를 건드리지 않고 오늘 날짜만 기록해 그 다음 날부터 초기화되게 한다.
        if (lastReset !== null) {
          setOrg((prev) => resetStatusesForNewDay(prev, todayISO));
        }
        try {
          localStorage.setItem(RESET_DATE_KEY, todayISO);
        } catch {
          // 무시
        }
      }
    };

    runResetIfNewDay();

    let timeoutId;
    const scheduleNextMidnight = () => {
      const now = new Date();
      const nextMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 5);
      timeoutId = setTimeout(() => {
        runResetIfNewDay();
        scheduleNextMidnight();
      }, nextMidnight.getTime() - now.getTime());
    };
    scheduleNextMidnight();

    return () => clearTimeout(timeoutId);
  }, []);

  const langCtx = useMemo(() => ({ lang, setLang, t: (key, ...args) => t(lang, key, ...args) }), [lang]);

  const allEmployees = useMemo(() => {
    const list = [];
    FACTORIES.forEach((f) => {
      const d = org[f];
      d.heads.forEach((h) =>
        list.push({ ...h, team: "부서장", isHead: true, status: "출근", headCountInFactory: d.heads.length })
      );
      d.teams.forEach((t) => {
        t.members.forEach((m) => list.push({ ...m, team: t.title, teamId: t.id }));
      });
      (d.qcMembers || []).forEach((m) => list.push({ ...m, team: "QC", isQc: true }));
      if (d.middleCard) {
        d.middleCard.members.forEach((m) => list.push({ ...m, team: d.middleCard.title, isMiddleCard: true }));
      }
    });
    return list;
  }, [org]);

  const scoped = useMemo(
    () => (factory === "all" ? allEmployees : allEmployees.filter((e) => e.factory === factory)),
    [allEmployees, factory]
  );

  // 수정 모드에서 드래그로 정한 순서(listOrder)가 있으면 그 순서를 그대로
  // 쓰고, 아직 순서를 정한 적 없는 인원은 기본 정렬로 뒤에 붙인다. listOrder가
  // 비어 있으면(한 번도 순서를 바꾼 적 없으면) 기존처럼 기본 정렬만 쓴다.
  const orderedScoped = useMemo(() => {
    const arr = scoped.slice();
    if (listOrder.length === 0) return arr.sort(sortByDeptAndPosition);
    const orderIndex = new Map(listOrder.map((id, i) => [id, i]));
    return arr.sort((a, b) => {
      const ia = orderIndex.has(a.id) ? orderIndex.get(a.id) : Infinity;
      const ib = orderIndex.has(b.id) ? orderIndex.get(b.id) : Infinity;
      if (ia !== ib) return ia - ib;
      return sortByDeptAndPosition(a, b);
    });
  }, [scoped, listOrder]);

  // 드래그로 한 행을 다른 행 위치로 옮긴다. 필터/검색으로 일부만 보이는
  // 중이어도 전체 순서(orderedScoped) 기준으로 이동시켜 나머지 순서는
  // 그대로 유지된다.
  const moveListRow = (draggedId, targetId) => {
    if (!draggedId || draggedId === targetId) return;
    const baseIds = orderedScoped.map((e) => e.id);
    const next = baseIds.filter((id) => id !== draggedId);
    const targetIdx = next.indexOf(targetId);
    if (targetIdx === -1) return;
    next.splice(targetIdx, 0, draggedId);
    setListOrder(next);
  };

  // 대시보드 집계에는 품질부서장을 포함하지 않는다 (항상 출근으로 고정된
  // 인원이라 실질적인 근태 집계에서 의미가 없다).
  const counts = useMemo(() => {
    const c = { 출근: 0, 연차: 0, 병가: 0, 무단결근: 0, 출산휴가: 0 };
    scoped
      .filter((e) => !e.isHead)
      .forEach((e) => {
        c[e.status] = (c[e.status] || 0) + 1;
      });
    return c;
  }, [scoped]);

  // 연차/병가/무단결근/출산휴가 등 결근성 항목끼리 묶어서 보여준다 (같은 상태끼리 정렬)
  const notices = useMemo(() => {
    return scoped
      .filter((e) => e.status !== "출근")
      .slice()
      .sort((a, b) => ABSENCE_ORDER.indexOf(a.status) - ABSENCE_ORDER.indexOf(b.status));
  }, [scoped]);

  // orderedScoped(수정 모드에서 드래그로 정한 순서, 없으면 기본 정렬)를
  // 상태/검색 조건으로 걸러낸다. 순서는 이미 orderedScoped에서 정해졌으므로
  // 여기서는 다시 정렬하지 않는다.
  const filteredList = useMemo(() => {
    return orderedScoped
      .filter((e) => statusFilter === "전체" || e.status === statusFilter)
      .filter((e) => {
        const q = search.trim().toLowerCase();
        return !q || e.name.toLowerCase().includes(q) || e.empNo.toLowerCase().includes(q);
      });
  }, [orderedScoped, statusFilter, search]);

  // "총 N명" 옆에 보여줄 요약: 부서장은 제외하고, 관리자(Supervisor 1/2,
  // Manager)와 Staff 직급은 소속과 무관하게 하나로 묶고, 나머지는 소속
  // (부서/카드)별로 묶어서 센다.
  const listSummary = useMemo(() => {
    const nonHead = filteredList.filter((e) => !e.isHead);
    let managerCount = 0;
    const byGroup = new Map();
    nonHead.forEach((e) => {
      if (MANAGER_POSITIONS.includes(e.position)) {
        managerCount += 1;
      } else if (e.position === "Staff") {
        byGroup.set("Staff", (byGroup.get("Staff") || 0) + 1);
      } else {
        byGroup.set(e.team, (byGroup.get(e.team) || 0) + 1);
      }
    });
    const groupOrder = ["Staff", ...DEPARTMENTS];
    const parts = [];
    if (managerCount > 0) parts.push({ label: t(lang, "managerLabel"), count: managerCount, kind: "manager" });
    [...byGroup.entries()]
      .sort((a, b) => {
        const ia = groupOrder.indexOf(a[0]);
        const ib = groupOrder.indexOf(b[0]);
        return (ia === -1 ? groupOrder.length : ia) - (ib === -1 ? groupOrder.length : ib);
      })
      .forEach(([team, count]) => {
        if (count > 0) {
          parts.push({
            label: team === "Staff" ? "Staff" : trTeamTitle(team, lang),
            count,
            kind: team === "Staff" ? "staff" : "dept",
          });
        }
      });
    return { total: nonHead.length, parts };
  }, [filteredList, lang]);

  // 전체 명단에서 부서장/팀원 항목을 수정·삭제한다. isHead 여부로 heads
  // 배열을 고칠지, teamId로 찾은 팀의 members 배열을 고칠지 분기한다.
  const updateListEntry = (entry, data) => {
    setOrg((prev) => {
      const factoryData = prev[entry.factory];
      if (entry.isHead) {
        return {
          ...prev,
          [entry.factory]: { ...factoryData, heads: factoryData.heads.map((h) => (h.id === entry.id ? { ...h, ...data } : h)) },
        };
      }
      if (entry.isQc) {
        return {
          ...prev,
          [entry.factory]: {
            ...factoryData,
            qcMembers: (factoryData.qcMembers || []).map((m) => (m.id === entry.id ? { ...m, ...data } : m)),
          },
        };
      }
      if (entry.isMiddleCard) {
        return {
          ...prev,
          [entry.factory]: {
            ...factoryData,
            middleCard: {
              ...factoryData.middleCard,
              members: factoryData.middleCard.members.map((m) => (m.id === entry.id ? { ...m, ...data } : m)),
            },
          },
        };
      }
      return {
        ...prev,
        [entry.factory]: {
          ...factoryData,
          teams: factoryData.teams.map((tm) =>
            tm.id === entry.teamId ? { ...tm, members: tm.members.map((m) => (m.id === entry.id ? { ...m, ...data } : m)) } : tm
          ),
        },
      };
    });
  };

  const deleteListEntry = (entry) => {
    setOrg((prev) => {
      const factoryData = prev[entry.factory];
      if (entry.isHead) {
        return { ...prev, [entry.factory]: { ...factoryData, heads: factoryData.heads.filter((h) => h.id !== entry.id) } };
      }
      if (entry.isQc) {
        return {
          ...prev,
          [entry.factory]: { ...factoryData, qcMembers: (factoryData.qcMembers || []).filter((m) => m.id !== entry.id) },
        };
      }
      if (entry.isMiddleCard) {
        return {
          ...prev,
          [entry.factory]: {
            ...factoryData,
            middleCard: { ...factoryData.middleCard, members: factoryData.middleCard.members.filter((m) => m.id !== entry.id) },
          },
        };
      }
      return {
        ...prev,
        [entry.factory]: {
          ...factoryData,
          teams: factoryData.teams.map((tm) =>
            tm.id === entry.teamId ? { ...tm, members: tm.members.filter((m) => m.id !== entry.id) } : tm
          ),
        },
      };
    });
  };

  // 체크박스로 고른 여러 명을 한 번에 지운다. 부서장/팀원/QC/단독카드 항목이
  // 섞여 있어도 factory별로 heads·members·qcMembers·middleCard에서 각각 걸러낸다.
  const deleteListEntries = (entries) => {
    const idSet = new Set(entries.map((e) => e.id));
    setOrg((prev) => {
      const next = { ...prev };
      FACTORIES.forEach((f) => {
        const factoryData = next[f];
        next[f] = {
          ...factoryData,
          heads: factoryData.heads.filter((h) => !idSet.has(h.id)),
          teams: factoryData.teams.map((tm) => ({ ...tm, members: tm.members.filter((m) => !idSet.has(m.id)) })),
          qcMembers: (factoryData.qcMembers || []).filter((m) => !idSet.has(m.id)),
          middleCard: factoryData.middleCard
            ? { ...factoryData.middleCard, members: factoryData.middleCard.members.filter((m) => !idSet.has(m.id)) }
            : factoryData.middleCard,
        };
      });
      return next;
    });
  };

  // 필터와 무관하게 부서장과 모든 팀원을 통째로 비운다
  // (팀/부서 카드 구조 자체는 남겨둔다). 되돌릴 수 없는 작업이다.
  const clearAllEmployees = () => {
    setOrg((prev) => {
      const next = {};
      FACTORIES.forEach((f) => {
        next[f] = {
          ...prev[f],
          heads: [],
          teams: prev[f].teams.map((tm) => ({ ...tm, members: [] })),
          qcMembers: [],
          middleCard: prev[f].middleCard ? { ...prev[f].middleCard, members: [] } : prev[f].middleCard,
        };
      });
      return next;
    });
    setSelectedListIds(new Set());
    setEditingListId(null);
  };

  const FactoryBtn = ({ value, label }) => (
    <button
      onClick={() => setFactory(value)}
      style={{
        padding: "6px 14px",
        fontSize: 13,
        borderRadius: 6,
        border: `0.5px solid ${factory === value ? COLORS.headDark : COLORS.border}`,
        background: factory === value ? COLORS.headDark : COLORS.card,
        color: factory === value ? "#fff" : COLORS.textPrimary,
        cursor: "pointer",
        fontWeight: factory === value ? 500 : 400,
      }}
    >
      {label}
    </button>
  );

  const LangBtn = ({ value, label }) => (
    <button
      onClick={() => setLang(value)}
      style={{
        padding: "6px 12px",
        fontSize: 12,
        borderRadius: 6,
        border: `0.5px solid ${lang === value ? COLORS.headDark : COLORS.border}`,
        background: lang === value ? COLORS.headDark : "transparent",
        color: lang === value ? "#fff" : COLORS.textSecondary,
        cursor: "pointer",
        fontWeight: lang === value ? 500 : 400,
      }}
    >
      {label}
    </button>
  );

  const TabBtn = ({ value, label, icon }) => (
    <button
      onClick={() => setTab(value)}
      style={{
        padding: "8px 4px",
        fontSize: 14,
        border: "none",
        borderBottom: `2px solid ${tab === value ? COLORS.headDark : "transparent"}`,
        background: "transparent",
        color: tab === value ? COLORS.textPrimary : COLORS.textSecondary,
        fontWeight: tab === value ? 500 : 400,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: 6,
      }}
    >
      <span aria-hidden="true">{icon}</span>
      {label}
    </button>
  );

  // 전체 명단 표의 컬럼 폭. 직급 라벨이 "Upper Manager" 등 영문으로 길어져
  // 기존 100px로는 잘려 보였으므로 넉넉하게 넓혔다 (헤더/데이터 행 동일하게 유지).
  // 사진 칸은 항상 표시하고, 수정 모드일 때는 맨 앞에 드래그 핸들·선택
  // 체크박스, 끝에 수정/삭제 아이콘 칸을 추가한다.
  const LIST_GRID_COLUMNS = listEditing
    ? "18px 24px 36px 90px 1fr 130px 70px 1.2fr 110px 70px"
    : "36px 90px 1fr 130px 70px 1.2fr 110px";

  const listLocked = listEditing && editingListId !== null;

  // 삭제 가능한(마지막 남은 부서장이 아닌) 항목만 선택 대상으로 삼는다.
  const selectableIds = useMemo(
    () => new Set(filteredList.filter((e) => !e.isHead || e.headCountInFactory > 1).map((e) => e.id)),
    [filteredList]
  );
  const allSelected = selectableIds.size > 0 && [...selectableIds].every((id) => selectedListIds.has(id));
  const toggleSelectAll = () => {
    setSelectedListIds((prev) => {
      if (allSelected) return new Set();
      return new Set(selectableIds);
    });
  };
  const toggleSelectOne = (id) => {
    setSelectedListIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };
  const handleDeleteSelected = () => {
    const entries = filteredList.filter((e) => selectedListIds.has(e.id));
    if (entries.length === 0) return;
    if (confirm(t(lang, "confirmDeleteSelected", entries.length))) {
      deleteListEntries(entries);
      setSelectedListIds(new Set());
    }
  };
  const handleDeleteAll = () => {
    if (confirm(t(lang, "confirmDeleteAll"))) clearAllEmployees();
  };

  return (
    <LangContext.Provider value={langCtx}>
      <div style={{ background: COLORS.page, minHeight: "100%", fontFamily: "var(--font-sans, sans-serif)" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "20px 20px 40px" }}>
          {/* 헤더 */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
            <div>
              <div style={{ fontSize: 20, fontWeight: 500, color: COLORS.textPrimary }}>{t(lang, "appTitle")}</div>
              <div style={{ fontSize: 13, color: COLORS.textSecondary, marginTop: 2 }}>{todayStr(lang)}</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ display: "flex", gap: 6 }}>
                <FactoryBtn value="all" label={t(lang, "all")} />
                <FactoryBtn value={1} label={t(lang, "factoryLabel", 1)} />
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                <LangBtn value="ko" label="한국어" />
                <LangBtn value="vi" label="Tiếng Việt" />
              </div>
            </div>
          </div>

          {/* 탭 */}
          <div style={{ display: "flex", gap: 20, borderBottom: `0.5px solid ${COLORS.border}`, marginBottom: 18 }}>
            <TabBtn value="dashboard" label={t(lang, "tabDashboard")} icon="▦" />
            <TabBtn value="org" label={t(lang, "tabOrg")} icon="🗂" />
            <TabBtn value="list" label={t(lang, "tabList")} icon="≡" />
          </div>

          {/* 대시보드 */}
          {tab === "dashboard" && (
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(5, minmax(0,1fr))", gap: 12, marginBottom: 18 }}>
                {STATUS_OPTIONS.map((s) => {
                  const meta = STATUS_META[s];
                  return (
                    <div key={s} style={{ background: COLORS.card, border: `0.5px solid ${COLORS.border}`, borderRadius: 12, padding: "14px 16px" }}>
                      <div style={{ fontSize: 12, color: COLORS.textSecondary }}>{trStatus(s, lang)}</div>
                      <div style={{ fontSize: 26, fontWeight: 500, color: meta.color, marginTop: 4 }}>
                        {counts[s] || 0}
                        {t(lang, "personSuffix")}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div style={{ background: COLORS.card, border: `0.5px solid ${COLORS.border}`, borderRadius: 12, padding: "16px 18px" }}>
                <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 12 }}>{t(lang, "detailStatus")}</div>
                {notices.length === 0 ? (
                  <div style={{ fontSize: 13, color: COLORS.textMuted }}>{t(lang, "allNormal")}</div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {notices.map((e) => {
                      const meta = STATUS_META[e.status];
                      const teamLabel = e.team === "부서장" ? t(lang, "headTeamLabel") : trTeamTitle(e.team, lang);
                      let detail = `${t(lang, "factoryLabel", e.factory)} · ${teamLabel}`;
                      if (e.status !== "출산휴가" && e.note) detail += ` · ${t(lang, "reasonPrefix")}: ${e.note}`;
                      if (e.status === "출산휴가" && e.returnDate) detail += ` · ${t(lang, "returnDatePrefix")}: ${e.returnDate}`;
                      return (
                        <div
                          key={e.id}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            padding: "8px 10px",
                            borderRadius: 8,
                            background: meta.bg,
                          }}
                        >
                          <span style={{ color: meta.color, fontSize: 14, width: 16, textAlign: "center" }}>{meta.icon}</span>
                          <div style={{ flex: 1 }}>
                            <span style={{ fontSize: 13, fontWeight: 500, color: COLORS.textPrimary }}>{e.name}</span>
                            <span style={{ fontSize: 12, color: COLORS.textSecondary, marginLeft: 8 }}>{detail}</span>
                          </div>
                          <Badge status={e.status} />
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 조직도 */}
          {tab === "org" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              {(factory === "all" ? FACTORIES : [factory]).map((f) => (
                <FactoryOrgPanel key={f} factory={f} data={org[f]} setOrg={setOrg} />
              ))}
            </div>
          )}

          {/* 전체 명단 */}
          {tab === "list" && (
            <div style={{ background: COLORS.card, border: `0.5px solid ${COLORS.border}`, borderRadius: 12, padding: "16px 18px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, flexWrap: "wrap", gap: 10 }}>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {["전체", ...STATUS_OPTIONS].map((s) => (
                    <button
                      key={s}
                      onClick={() => setStatusFilter(s)}
                      style={{
                        padding: "5px 12px",
                        fontSize: 12,
                        borderRadius: 999,
                        border: `0.5px solid ${statusFilter === s ? COLORS.headDark : COLORS.border}`,
                        background: statusFilter === s ? COLORS.headDark : "transparent",
                        color: statusFilter === s ? "#fff" : COLORS.textSecondary,
                        cursor: "pointer",
                      }}
                    >
                      {s === "전체" ? t(lang, "all") : trStatus(s, lang)}
                    </button>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <button
                    onClick={() => {
                      if (listLocked) return;
                      if (listEditing) setSelectedListIds(new Set());
                      setListEditing((v) => !v);
                    }}
                    disabled={listLocked}
                    title={listLocked ? t(lang, "editDoneDisabledTitle") : undefined}
                    style={{
                      height: 30,
                      padding: "0 12px",
                      borderRadius: 6,
                      border: `0.5px solid ${listEditing ? COLORS.headDark : COLORS.border}`,
                      background: listEditing ? COLORS.headDark : COLORS.card,
                      color: listEditing ? "#fff" : COLORS.textSecondary,
                      fontSize: 12,
                      cursor: listLocked ? "not-allowed" : "pointer",
                      opacity: listLocked ? 0.65 : 1,
                      fontWeight: 500,
                    }}
                  >
                    <span aria-hidden="true" style={{ marginRight: 4 }}>✎</span>
                    {listEditing ? t(lang, "editDone") : t(lang, "edit")}
                  </button>
                  {listEditing && selectedListIds.size > 0 && (
                    <button
                      onClick={handleDeleteSelected}
                      style={{
                        height: 30,
                        padding: "0 12px",
                        borderRadius: 6,
                        border: `0.5px solid ${COLORS.danger}`,
                        background: COLORS.dangerBg,
                        color: COLORS.danger,
                        fontSize: 12,
                        fontWeight: 500,
                        cursor: "pointer",
                      }}
                    >
                      {t(lang, "deleteSelected", selectedListIds.size)}
                    </button>
                  )}
                  {listEditing && (
                    <button
                      onClick={handleDeleteAll}
                      style={{
                        height: 30,
                        padding: "0 12px",
                        borderRadius: 6,
                        border: `0.5px solid ${COLORS.danger}`,
                        background: COLORS.card,
                        color: COLORS.danger,
                        fontSize: 12,
                        fontWeight: 500,
                        cursor: "pointer",
                      }}
                    >
                      {t(lang, "deleteAll")}
                    </button>
                  )}
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={t(lang, "searchPlaceholder")}
                    style={{ height: 30, padding: "0 10px", borderRadius: 6, border: `0.5px solid ${COLORS.border}`, fontSize: 12, width: 180, boxSizing: "border-box" }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: listSummary.parts.length > 0 ? 6 : 0 }}>
                  {t(lang, "totalCount", listSummary.total)}
                </div>
                {listSummary.parts.length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {listSummary.parts.map((p) => {
                      const tc =
                        p.kind === "manager" ? tierColorsOf("Supervisor") : p.kind === "staff" ? tierColorsOf("Staff") : tierColorsOf("Inspector");
                      return (
                        <span
                          key={p.label}
                          style={{
                            fontSize: 12,
                            fontWeight: 500,
                            padding: "4px 10px",
                            borderRadius: 6,
                            background: tc.bg,
                            color: tc.color,
                            border: `0.5px solid ${tc.border}`,
                          }}
                        >
                          {p.label} {p.count}{t(lang, "personSuffix")}
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: LIST_GRID_COLUMNS,
                    gap: 8,
                    fontSize: 11,
                    color: COLORS.textMuted,
                    padding: "0 10px 4px",
                  }}
                >
                  {listEditing && <span />}
                  {listEditing && (
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={toggleSelectAll}
                      style={{ margin: 0 }}
                      title={t(lang, "deleteSelected", selectedListIds.size)}
                    />
                  )}
                  <span style={{ textAlign: "center" }}>{t(lang, "colPhoto")}</span>
                  <span>{t(lang, "colEmpNo")}</span>
                  <span>{t(lang, "colNameTeam")}</span>
                  <span>{t(lang, "colPosition")}</span>
                  <span>{t(lang, "colFactory")}</span>
                  <span>{t(lang, "colNote")}</span>
                  <span style={{ textAlign: "right" }}>{t(lang, "colStatus")}</span>
                  {listEditing && <span />}
                </div>

                {filteredList.map((e) => {
                  if (editingListId === e.id) {
                    return (
                      <div key={e.id} style={{ padding: "2px 0" }}>
                        <MemberForm
                          initial={e}
                          isHead={e.isHead}
                          onCancel={() => setEditingListId(null)}
                          onSave={(data) => {
                            updateListEntry(e, data);
                            setEditingListId(null);
                          }}
                        />
                      </div>
                    );
                  }

                  const meta = STATUS_META[e.status];
                  let note = "-";
                  if (e.status === "출산휴가" && e.returnDate) note = `${t(lang, "returnDatePrefix")}: ${e.returnDate}`;
                  else if (e.status !== "출근" && e.note) note = `${t(lang, "reasonPrefix")}: ${e.note}`;
                  const teamLabel = e.team === "부서장" ? t(lang, "headTeamLabel") : trTeamTitle(e.team, lang);
                  const canDelete = !e.isHead || e.headCountInFactory > 1;
                  return (
                    <div
                      key={e.id}
                      draggable={listEditing}
                      onDragStart={() => setDragRowId(e.id)}
                      onDragOver={(ev) => {
                        if (!listEditing) return;
                        ev.preventDefault();
                        if (overRowId !== e.id) setOverRowId(e.id);
                      }}
                      onDragLeave={() => setOverRowId((cur) => (cur === e.id ? null : cur))}
                      onDrop={(ev) => {
                        if (!listEditing) return;
                        ev.preventDefault();
                        moveListRow(dragRowId, e.id);
                        setDragRowId(null);
                        setOverRowId(null);
                      }}
                      onDragEnd={() => {
                        setDragRowId(null);
                        setOverRowId(null);
                      }}
                      style={{
                        display: "grid",
                        gridTemplateColumns: LIST_GRID_COLUMNS,
                        gap: 8,
                        alignItems: "center",
                        padding: "9px 10px",
                        borderRadius: 8,
                        background: e.status === "출근" ? "#FAFAF8" : meta.bg,
                        borderLeft: `3px solid ${overRowId === e.id && dragRowId !== e.id ? COLORS.teal : meta.color}`,
                        opacity: dragRowId === e.id ? 0.5 : 1,
                      }}
                    >
                      {listEditing && (
                        <span
                          aria-hidden="true"
                          title={t(lang, "dragListRowTitle")}
                          style={{ cursor: "grab", color: COLORS.textMuted, fontSize: 12, textAlign: "center" }}
                        >
                          ⠿
                        </span>
                      )}
                      {listEditing && (
                        <input
                          type="checkbox"
                          checked={selectedListIds.has(e.id)}
                          disabled={!canDelete}
                          onChange={() => toggleSelectOne(e.id)}
                          style={{ margin: 0 }}
                        />
                      )}
                      <div style={{ display: "flex", justifyContent: "center" }}>
                        {listEditing ? (
                          <label style={{ cursor: "pointer", display: "block" }} title={t(lang, "uploadPhotoTitle")}>
                            {e.photo ? (
                              <img
                                src={e.photo}
                                alt=""
                                style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover", display: "block" }}
                              />
                            ) : (
                              <div
                                style={{
                                  width: 32,
                                  height: 32,
                                  borderRadius: "50%",
                                  background: COLORS.page,
                                  border: `0.5px dashed ${COLORS.borderStrong}`,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontSize: 14,
                                  color: COLORS.textMuted,
                                }}
                              >
                                +
                              </div>
                            )}
                            <input
                              type="file"
                              accept="image/*"
                              style={{ display: "none" }}
                              onChange={async (ev) => {
                                const file = ev.target.files?.[0];
                                if (!file) return;
                                try {
                                  const dataUrl = await readImageAsDataUrl(file);
                                  updateListEntry(e, { photo: dataUrl });
                                } catch {
                                  // 이미지를 읽지 못하면 조용히 무시
                                }
                                ev.target.value = "";
                              }}
                            />
                          </label>
                        ) : e.photo ? (
                          <img
                            src={e.photo}
                            alt=""
                            style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover", display: "block" }}
                          />
                        ) : (
                          <div style={{ width: 32, height: 32, borderRadius: "50%", background: COLORS.page }} />
                        )}
                      </div>
                      <span style={{ fontSize: 12, color: COLORS.textSecondary }}>{e.empNo}</span>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 500, color: COLORS.textPrimary }}>{e.name}</div>
                        <div style={{ fontSize: 11, color: COLORS.textMuted }}>{teamLabel}</div>
                      </div>
                      <span style={{ fontSize: 12, color: COLORS.textSecondary }}>{e.position}</span>
                      <span style={{ fontSize: 12, color: COLORS.textSecondary }}>{t(lang, "factoryLabel", e.factory)}</span>
                      {listEditing && e.status === "출산휴가" ? (
                        <div style={{ display: "flex", alignItems: "center", gap: 4, minWidth: 0 }}>
                          <span style={{ fontSize: 11, color: COLORS.textSecondary, whiteSpace: "nowrap" }}>{t(lang, "returnDatePrefix")}</span>
                          <input
                            type="date"
                            value={e.returnDate || ""}
                            min="2000-01-01"
                            max="2099-12-31"
                            onChange={(ev) => {
                              const v = ev.target.value;
                              // 연도가 4자리가 아닌 값(입력창에 5~6자리 연도가 찍히는
                              // 브라우저 버그성 동작)은 무시하고 반영하지 않는다.
                              if (v && !/^\d{4}-\d{2}-\d{2}$/.test(v)) return;
                              updateListEntry(e, { returnDate: v });
                            }}
                            style={{
                              fontSize: 12,
                              padding: "2px 4px",
                              borderRadius: 4,
                              border: `0.5px solid ${COLORS.border}`,
                              color: COLORS.textPrimary,
                              background: COLORS.card,
                              minWidth: 0,
                            }}
                          />
                        </div>
                      ) : listEditing && e.status !== "출근" ? (
                        <input
                          type="text"
                          value={e.note || ""}
                          placeholder={t(lang, "reasonPrefix")}
                          onChange={(ev) => updateListEntry(e, { note: ev.target.value })}
                          style={{
                            fontSize: 12,
                            padding: "3px 6px",
                            borderRadius: 4,
                            border: `0.5px solid ${COLORS.border}`,
                            color: COLORS.textPrimary,
                            background: COLORS.card,
                            width: "100%",
                            boxSizing: "border-box",
                            minWidth: 0,
                          }}
                        />
                      ) : (
                        <span style={{ fontSize: 12, color: COLORS.textSecondary, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{note}</span>
                      )}
                      <div style={{ textAlign: "right" }}>
                        {listEditing ? (
                          <select
                            value={e.status}
                            onChange={(ev) => updateListEntry(e, { status: ev.target.value })}
                            title={t(lang, "colStatus")}
                            style={{
                              fontSize: 12,
                              fontWeight: 500,
                              padding: "3px 8px",
                              borderRadius: 6,
                              border: `0.5px solid ${meta.color}`,
                              background: meta.bg,
                              color: meta.color,
                              cursor: "pointer",
                            }}
                          >
                            {STATUS_OPTIONS.map((s) => (
                              <option key={s} value={s}>
                                {trStatus(s, lang)}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <Badge status={e.status} />
                        )}
                      </div>
                      {listEditing && (
                        <div style={{ display: "flex", gap: 4, justifyContent: "flex-end" }}>
                          <IconBtn title={t(lang, "memberEditTitle")} onClick={() => setEditingListId(e.id)}>
                            <span aria-hidden="true">✎</span>
                          </IconBtn>
                          {canDelete && (
                            <IconBtn
                              title={t(lang, "memberDeleteTitle")}
                              danger
                              onClick={() => {
                                const msg = e.isHead ? t(lang, "confirmDeleteHead", e.name) : t(lang, "confirmDeleteMember");
                                if (confirm(msg)) deleteListEntry(e);
                              }}
                            >
                              <span aria-hidden="true">🗑</span>
                            </IconBtn>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </LangContext.Provider>
  );
}
