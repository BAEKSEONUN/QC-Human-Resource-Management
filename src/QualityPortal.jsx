import { useState, useMemo, useEffect, useRef, createContext, useContext } from "react";
import * as XLSX from "xlsx";

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
  결근: { color: COLORS.danger, bg: COLORS.dangerBg, icon: "✕" },
  병가: { color: COLORS.warning, bg: COLORS.warningBg, icon: "＋" },
  출산휴가: { color: COLORS.info, bg: COLORS.infoBg, icon: "◐" },
};

// 상태값(출근/결근/병가/출산휴가)은 데이터 키로 계속 한국어를 쓰고,
// 화면에 보여줄 때만 언어에 맞게 바꿔서 표시한다.
const STATUS_LABEL = {
  ko: { 출근: "출근", 결근: "결근", 병가: "병가", 출산휴가: "출산휴가" },
  vi: { 출근: "Đi làm", 결근: "Vắng mặt", 병가: "Nghỉ ốm", 출산휴가: "Nghỉ thai sản" },
};
const trStatus = (status, lang) => (STATUS_LABEL[lang] && STATUS_LABEL[lang][status]) || status;

// 결근성 상태(출근 제외)를 대시보드에서 같은 항목끼리 묶어 보여주기 위한 순서
const ABSENCE_ORDER = ["결근", "병가", "출산휴가"];

// ---------- 부서 / 직급 기준 ----------
// 품질부서 산하 팀 (정렬 시 이 순서를 기준으로 그룹핑됨). PQC는 UNIT/ASSY로 분리.
// "총괄"은 부서장 직속 총괄 매니저용 카드로, 다른 부서 카드와 동일한 형식을 사용한다.
const DEPARTMENTS = ["총괄", "IQC", "PQC UNIT", "PQC ASSY", "OQC", "RMA"];
// 부서장은 팀 소속이 아니므로 정렬상 최상단에 별도로 둔다
const DEPT_ORDER = ["부서장", ...DEPARTMENTS];

// 직급 체계 (낮은 순 -> 높은 순). 정렬 시 이 순서를 기준으로 직급별로 묶는다.
// 최하위 직급은 검사 업무를 반영해 "Inspector"로 표기한다.
const POSITIONS = ["Inspector", "Staff", "Supervisor 1", "Supervisor 2", "Manager", "Upper Manager"];

const deptRank = (team) => {
  const idx = DEPT_ORDER.indexOf(team);
  return idx === -1 ? DEPT_ORDER.length : idx;
};

const positionRank = (position) => {
  const idx = POSITIONS.indexOf(position);
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
  dragTeamTitle: { ko: "드래그하여 팀 순서 변경", vi: "Kéo để đổi thứ tự nhóm" },
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
  colEmpNo: { ko: "사번", vi: "Mã NV" },
  colNameTeam: { ko: "성명 / 소속", vi: "Họ tên / Bộ phận" },
  colPosition: { ko: "직급", vi: "Chức vụ" },
  colFactory: { ko: "공장", vi: "Nhà máy" },
  colNote: { ko: "비고", vi: "Ghi chú" },
  colStatus: { ko: "오늘 상태", vi: "Trạng thái hôm nay" },
  noteAbsent: { ko: "무단결근", vi: "Vắng không phép" },
  headTeamLabel: { ko: "부서장", vi: "Trưởng phòng" },
  teamOverall: { ko: "총괄", vi: "Tổng hợp" },
  uploadExcel: { ko: "엑셀 업로드", vi: "Tải lên Excel" },
  uploadModalTitle: { ko: "엑셀로 명단 업로드", vi: "Tải danh sách từ Excel" },
  uploadTargetFactory: {
    ko: "기본 등록 공장 (파일에 공장 열이 없을 때 사용)",
    vi: "Nhà máy mặc định (dùng khi tệp không có cột nhà máy)",
  },
  uploadChooseFile: { ko: "파일 선택", vi: "Chọn tệp" },
  uploadNoFile: { ko: "선택된 파일이 없습니다", vi: "Chưa chọn tệp nào" },
  uploadHint: {
    ko: "사번, 성명, 부서(QC/IQC/PQC/OQC/OQC(SPL)/RMA), 직급(Manager/Upper Manager/Supervisor 1/Supervisor 2/Staff/IQC/PQC/OQC/OQC(SPL)) 열이 포함된 .xlsx, .xls, .csv 파일을 올려주세요. 직급이 IQC/PQC/OQC/OQC(SPL)인 경우 조직도에는 Inspector로 등록됩니다.",
    vi: "Tải lên tệp .xlsx, .xls, .csv có các cột Mã NV, Họ tên, Bộ phận (QC/IQC/PQC/OQC/OQC(SPL)/RMA), Chức vụ (Manager/Upper Manager/Supervisor 1/Supervisor 2/Staff/IQC/PQC/OQC/OQC(SPL)). Chức vụ là IQC/PQC/OQC/OQC(SPL) sẽ được đăng ký là Inspector trong sơ đồ tổ chức.",
  },
  uploadColumnsNotFound: {
    ko: (cols) => `다음 열을 찾을 수 없습니다: ${cols}`,
    vi: (cols) => `Không tìm thấy các cột: ${cols}`,
  },
  uploadEmptyFile: { ko: "파일에서 데이터를 찾을 수 없습니다.", vi: "Không tìm thấy dữ liệu trong tệp." },
  uploadPreview: { ko: (n) => `미리보기 (${n}건)`, vi: (n) => `Xem trước (${n} dòng)` },
  uploadValidCount: { ko: (n) => `등록 가능 ${n}건`, vi: (n) => `Có thể đăng ký: ${n}` },
  uploadInvalidCount: { ko: (n) => `식별 실패 ${n}건`, vi: (n) => `Không xác định: ${n}` },
  uploadColRow: { ko: "행", vi: "Dòng" },
  uploadColReason: { ko: "사유", vi: "Lý do" },
  uploadRegisterBtn: { ko: (n) => `등록 (${n}건)`, vi: (n) => `Đăng ký (${n})` },
  uploadClose: { ko: "닫기", vi: "Đóng" },
  uploadResultDone: {
    ko: (ok, fail) => (fail > 0 ? `${ok}건 등록 완료, ${fail}건 식별 실패로 제외됨` : `${ok}건 등록 완료`),
    vi: (ok, fail) => (fail > 0 ? `Đã đăng ký ${ok} dòng, ${fail} dòng bị loại do không xác định` : `Đã đăng ký ${ok} dòng`),
  },
  uploadReasonMissing: { ko: (field) => `${field} 값이 비어 있음`, vi: (field) => `Thiếu giá trị ${field}` },
  uploadReasonDept: {
    ko: (v) => `부서를 확인할 수 없음: "${v}"`,
    vi: (v) => `Không xác định được bộ phận: "${v}"`,
  },
  uploadReasonPosition: {
    ko: (v) => `직급을 확인할 수 없음: "${v}"`,
    vi: (v) => `Không xác định được chức vụ: "${v}"`,
  },
  uploadTeamNotFound: {
    ko: (dept) => `해당 공장에 "${dept}" 팀이 없음`,
    vi: (dept) => `Nhà máy này không có nhóm "${dept}"`,
  },
};

const LangContext = createContext({ lang: "ko", t: (key) => key });
const useLang = () => useContext(LangContext);

function t(lang, key, ...args) {
  const entry = DICT[key];
  if (!entry) return key;
  const v = entry[lang] ?? entry.ko;
  return typeof v === "function" ? v(...args) : v;
}

// "총괄" 같은 기본 제공 팀 이름만 번역해서 보여준다. 사용자가 직접 입력한
// 팀 이름(자유 텍스트)은 자동 번역할 수 없으므로 그대로 표시한다.
function trTeamTitle(title, lang) {
  if (lang === "vi" && title === "총괄") return t(lang, "teamOverall");
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

// heads: 공장당 여러 명 둘 수 있는 품질부서장 목록
const seedFactory = (factory, headsInfo, teamsSeed) => {
  const teams = teamsSeed.map((t) => ({
    id: nextId(),
    title: t.title,
    members: t.members.map((m) => ({ id: nextId(), ...m, factory })),
  }));
  const heads = headsInfo.map((h) => ({ id: nextId(), ...h, factory }));
  return { heads, teams };
};

const initialOrg = {
  1: seedFactory(
    1,
    [{ empNo: "Q1001", name: "홍성훈", position: "품질부서장" }],
    [
      { title: "총괄", members: [] },
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
          { empNo: "Q1031", name: "박준호", position: "Supervisor 2", status: "결근" },
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
  2: seedFactory(
    2,
    [{ empNo: "Q2001", name: "윤태영", position: "품질부서장" }],
    [
      { title: "총괄", members: [] },
      {
        title: "IQC",
        members: [
          { empNo: "Q2011", name: "배민재", position: "Upper Manager", status: "출근" },
          { empNo: "Q2012", name: "송지호", position: "Inspector", status: "출근" },
        ],
      },
      {
        title: "PQC UNIT",
        members: [{ empNo: "Q2021", name: "임하늘", position: "Manager", status: "병가", note: "병원 진료" }],
      },
      {
        title: "PQC ASSY",
        members: [{ empNo: "Q2022", name: "강서준", position: "Inspector", status: "출근" }],
      },
      {
        title: "OQC",
        members: [
          { empNo: "Q2031", name: "노유빈", position: "Supervisor 2", status: "출근" },
          { empNo: "Q2032", name: "권나라", position: "Inspector", status: "출산휴가", returnDate: "2026-09-20" },
        ],
      },
      {
        title: "RMA",
        members: [
          { empNo: "Q2041", name: "서지훈", position: "Manager", status: "출근" },
          { empNo: "Q2042", name: "문가은", position: "Staff", status: "출근" },
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
  });
  return max;
}

function loadInitialOrg() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialOrg;
    const parsed = JSON.parse(raw);
    if (!parsed || !parsed[1] || !parsed[2]) return initialOrg;
    idSeq = Math.max(idSeq, collectMaxId(parsed) + 1);
    return parsed;
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

// 6단계 세부 직급을 Manager / Supervisor / Inspector 3단계로 묶어서 보여준다.
// (Manager: Manager·Upper Manager, Supervisor: Supervisor 1·2, Inspector: Inspector·Staff)
const POSITION_TIER = {
  Inspector: "Inspector",
  Staff: "Inspector",
  "Supervisor 1": "Supervisor",
  "Supervisor 2": "Supervisor",
  Manager: "Manager",
  "Upper Manager": "Manager",
};
const TIER_ORDER = ["Manager", "Supervisor", "Inspector"];
const tierRank = (tier) => {
  const idx = TIER_ORDER.indexOf(tier);
  return idx === -1 ? TIER_ORDER.length : idx;
};

// 직급 그룹별 색상 (부서장은 Manager와 동일한 초록 계열 사용)
const TIER_COLORS = {
  부서장: { color: "#2F8F5B", bg: "#E7F6EC", border: "#BEE6CC" },
  Manager: { color: "#2F8F5B", bg: "#E7F6EC", border: "#BEE6CC" },
  Supervisor: { color: "#C2790C", bg: "#FDF0DC", border: "#F3D9A8" },
  Inspector: { color: "#2668B2", bg: "#E6F0FB", border: "#BBD8F4" },
};
const tierColorsOf = (tier) => TIER_COLORS[tier] || TIER_COLORS.Inspector;

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

  const renderMemberRow = (m, tc) => (
    <div
      key={m.id}
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
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 11, color: COLORS.textMuted }}>{m.position}</div>
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
            background: COLORS.headMid,
            color: "#fff",
            padding: "8px 10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
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
                cursor: isEditing ? "pointer" : "default",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              onClick={isEditing ? () => setEditingTitle(true) : undefined}
            >
              {trTeamTitle(team.title, lang)}
            </span>
          )}
          {isEditing && (
            <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
              <button
                onClick={() => setEditingTitle(true)}
                title={t(lang, "editTeamNameTitle")}
                style={{ background: "transparent", border: "none", color: "#fff", opacity: 0.85, cursor: "pointer", fontSize: 12 }}
              >
                <span aria-hidden="true">✎</span>
              </button>
              <button
                onClick={onDeleteTeam}
                title={t(lang, "deleteTeamTitle")}
                style={{ background: "transparent", border: "none", color: "#fff", opacity: 0.85, cursor: "pointer", fontSize: 12 }}
              >
                <span aria-hidden="true">🗑</span>
              </button>
            </div>
          )}
        </div>

        <div style={{ padding: 8, display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
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
                  <div style={{ fontSize: 10, fontWeight: 600, color: "#000000", letterSpacing: 0.3, padding: "0 2px" }}>
                    {tier}
                  </div>
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
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "8px 10px",
                    borderRadius: 8,
                    background: tc.bg,
                    borderTop: `0.5px solid ${headOverIndex === idx && headDragIndex !== idx ? COLORS.teal : tc.border}`,
                    borderRight: `0.5px solid ${headOverIndex === idx && headDragIndex !== idx ? COLORS.teal : tc.border}`,
                    borderBottom: `0.5px solid ${headOverIndex === idx && headDragIndex !== idx ? COLORS.teal : tc.border}`,
                    borderLeft: `3px solid ${tc.color}`,
                    boxSizing: "border-box",
                    cursor: isEditing ? "pointer" : "grab",
                    opacity: headOverIndex === idx && headDragIndex !== idx ? 0.7 : 1,
                  }}
                >
                  <span aria-hidden="true" style={{ opacity: 0.5, fontSize: 12, flexShrink: 0 }}>
                    ⠿
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 11, color: COLORS.textMuted }}>{trHeadPosition(h.position, lang)}</div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: COLORS.textPrimary }}>{h.name}</div>
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
          />
        ))}

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

// ---------- 엑셀 업로드 ----------
// 헤더 셀 문자열을 비교하기 쉽게 정규화한다 (대소문자/공백/구분자 무시).
function normalizeHeaderCell(s) {
  return String(s ?? "").trim().toLowerCase().replace(/[\s_\-./]/g, "");
}

const COLUMN_ALIASES = {
  empNo: ["사번", "사원번호", "empno", "emp no", "id", "mã nv", "manv", "msnv", "employeeid"],
  name: ["성명", "이름", "name", "họ tên", "hoten", "hoten nv"],
  dept: ["부서", "팀", "소속", "department", "dept", "team", "bộ phận", "bophan"],
  position: ["직급", "position", "직위", "chức vụ", "chucvu"],
  factory: ["공장", "factory", "plant", "nhà máy", "nhamay"],
};

function detectColumns(headerRow) {
  const map = {};
  headerRow.forEach((cell, idx) => {
    const norm = normalizeHeaderCell(cell);
    if (!norm) return;
    Object.entries(COLUMN_ALIASES).forEach(([key, aliases]) => {
      if (!(key in map) && aliases.some((a) => normalizeHeaderCell(a) === norm)) {
        map[key] = idx;
      }
    });
  });
  return map;
}

// 실제 인사 자료의 "부서" 열에는 QC/PQC/OQC(SPL)처럼 조직도 팀 이름과
// 정확히 일치하지 않는 값이 들어오는 경우가 있어, 아래 별칭들을 실제
// 팀 이름으로 매핑해 인식한다. PQC(세부 구분 없음)는 PQC UNIT으로,
// OQC(SPL)은 OQC로, QC(전체를 뜻함)는 총괄로 등록된다.
const DEPT_VALUE_ALIASES = {
  총괄: ["총괄", "QC", "tổng hợp", "tonghop", "overall", "general"],
  "PQC UNIT": ["PQC"],
  OQC: ["OQC(SPL)", "OQC SPL"],
};
function normalizeDeptValue(raw) {
  const norm = String(raw ?? "").trim().toUpperCase().replace(/[\s_\-()]/g, "");
  if (!norm) return null;
  for (const dept of DEPARTMENTS) {
    const candidates = [dept, ...(DEPT_VALUE_ALIASES[dept] || [])];
    if (candidates.some((c) => c.toUpperCase().replace(/[\s_\-()]/g, "") === norm)) return dept;
  }
  return null;
}

// 일부 인사 자료는 검사직 직원의 "직급" 열에 실제 직급 대신 소속 검사
// 구역(IQC/PQC/OQC/OQC(SPL))을 적어두는 경우가 있다. 이런 값들은 모두
// 조직도의 최하위 직급인 "Inspector"로 정규화해 등록한다.
const POSITION_VALUE_ALIASES = {
  Inspector: ["IQC", "PQC", "OQC", "OQC(SPL)", "OQC SPL"],
};
function normalizePositionValue(raw) {
  const norm = String(raw ?? "").trim().toUpperCase().replace(/[\s_\-()]/g, "");
  if (!norm) return null;
  for (const p of POSITIONS) {
    const candidates = [p, ...(POSITION_VALUE_ALIASES[p] || [])];
    if (candidates.some((c) => c.toUpperCase().replace(/[\s_\-()]/g, "") === norm)) return p;
  }
  return null;
}

function normalizeFactoryValue(raw) {
  const digits = String(raw ?? "").replace(/\D/g, "");
  if (digits === "1") return 1;
  if (digits === "2") return 2;
  return null;
}

function ExcelUploadModal({ setOrg, defaultFactory, onClose, onRegistered }) {
  const { lang } = useLang();
  const [fileName, setFileName] = useState("");
  const [rows, setRows] = useState(null);
  const [missingCols, setMissingCols] = useState(null);
  const [targetFactory, setTargetFactory] = useState(defaultFactory === 1 || defaultFactory === 2 ? defaultFactory : 1);
  const [result, setResult] = useState(null);
  const fileInputRef = useRef(null);

  const validRows = rows ? rows.filter((r) => r.valid) : [];
  const invalidRows = rows ? rows.filter((r) => !r.valid) : [];

  const handleFile = async (file) => {
    if (!file) return;
    setFileName(file.name);
    setResult(null);
    setRows(null);
    setMissingCols(null);

    const colLabel = { empNo: t(lang, "fieldEmpNo"), name: t(lang, "fieldName"), dept: t(lang, "fieldDept"), position: t(lang, "fieldPosition") };

    const buf = await file.arrayBuffer();
    const wb = XLSX.read(buf, { type: "array" });
    const sheet = wb.Sheets[wb.SheetNames[0]];
    const raw = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: "" });

    if (!raw.length) {
      setRows([]);
      return;
    }

    const header = raw[0];
    const colMap = detectColumns(header);
    const required = ["empNo", "name", "dept", "position"];
    const missing = required.filter((k) => !(k in colMap));
    if (missing.length) {
      setMissingCols(missing.map((k) => colLabel[k]));
      return;
    }

    const parsed = raw
      .slice(1)
      .filter((r) => r.some((cell) => String(cell ?? "").trim() !== ""))
      .map((r, i) => {
        const empNo = String(r[colMap.empNo] ?? "").trim();
        const name = String(r[colMap.name] ?? "").trim();
        const deptRaw = String(r[colMap.dept] ?? "").trim();
        const posRaw = String(r[colMap.position] ?? "").trim();
        const dept = normalizeDeptValue(deptRaw);
        const position = normalizePositionValue(posRaw);
        const rowFactory = colMap.factory != null ? normalizeFactoryValue(r[colMap.factory]) : null;

        const reasons = [];
        if (!empNo) reasons.push(t(lang, "uploadReasonMissing", t(lang, "fieldEmpNo")));
        if (!name) reasons.push(t(lang, "uploadReasonMissing", t(lang, "fieldName")));
        if (!dept) reasons.push(t(lang, "uploadReasonDept", deptRaw));
        if (!position) reasons.push(t(lang, "uploadReasonPosition", posRaw));

        return {
          rowNum: i + 2,
          empNo,
          name,
          deptRaw,
          dept,
          posRaw,
          position,
          factory: rowFactory,
          valid: reasons.length === 0,
          reasons,
        };
      });
    setRows(parsed);
  };

  const handleRegister = () => {
    let okCount = 0;
    let notFoundCount = 0;
    setOrg((prev) => {
      let next = prev;
      validRows.forEach((r) => {
        const f = r.factory || targetFactory;
        const factoryData = next[f];
        if (!factoryData) return;
        const teamIdx = factoryData.teams.findIndex(
          (tm) => tm.title.trim().toUpperCase() === r.dept.toUpperCase() || tm.title === r.dept
        );
        if (teamIdx === -1) {
          notFoundCount += 1;
          return;
        }
        const newMember = { id: nextId(), empNo: r.empNo, name: r.name, position: r.position, status: "출근", factory: f };
        const updatedTeams = factoryData.teams.map((tm, i) =>
          i === teamIdx ? { ...tm, members: [...tm.members, newMember] } : tm
        );
        next = { ...next, [f]: { ...factoryData, teams: updatedTeams } };
        okCount += 1;
      });
      return next;
    });
    setResult({ ok: okCount, fail: invalidRows.length + notFoundCount });
    if (okCount > 0) onRegistered?.(okCount);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(28,31,27,0.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: 20,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: COLORS.card,
          borderRadius: 14,
          width: "100%",
          maxWidth: 720,
          maxHeight: "85vh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
        }}
      >
        <div style={{ padding: "16px 20px", borderBottom: `0.5px solid ${COLORS.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 16, fontWeight: 500, color: COLORS.textPrimary }}>{t(lang, "uploadModalTitle")}</div>
          <button
            onClick={onClose}
            style={{ background: "transparent", border: "none", fontSize: 16, cursor: "pointer", color: COLORS.textSecondary }}
          >
            ✕
          </button>
        </div>

        <div style={{ padding: 20, overflowY: "auto", display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ fontSize: 12, color: COLORS.textSecondary }}>{t(lang, "uploadHint")}</div>

          <label style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 12, color: COLORS.textSecondary }}>
            {t(lang, "uploadTargetFactory")}
            <select
              value={targetFactory}
              onChange={(e) => setTargetFactory(Number(e.target.value))}
              style={{
                width: 200,
                height: 32,
                padding: "0 8px",
                borderRadius: 6,
                border: `0.5px solid ${COLORS.border}`,
                fontSize: 13,
                color: COLORS.textPrimary,
                background: COLORS.card,
              }}
            >
              <option value={1}>{t(lang, "factoryLabel", 1)}</option>
              <option value={2}>{t(lang, "factoryLabel", 2)}</option>
            </select>
          </label>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button
              onClick={() => fileInputRef.current?.click()}
              style={{
                padding: "8px 16px",
                borderRadius: 6,
                border: `0.5px solid ${COLORS.borderStrong}`,
                background: COLORS.card,
                color: COLORS.textPrimary,
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              {t(lang, "uploadChooseFile")}
            </button>
            <span style={{ fontSize: 12, color: COLORS.textMuted }}>{fileName || t(lang, "uploadNoFile")}</span>
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={(e) => handleFile(e.target.files?.[0])}
              style={{ display: "none" }}
            />
          </div>

          {missingCols && (
            <div style={{ fontSize: 13, fontWeight: 500, color: COLORS.danger }}>
              {t(lang, "uploadColumnsNotFound", missingCols.join(", "))}
            </div>
          )}

          {rows && rows.length === 0 && (
            <div style={{ fontSize: 13, color: COLORS.danger }}>{t(lang, "uploadEmptyFile")}</div>
          )}

          {rows && rows.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", gap: 10, fontSize: 12 }}>
                <span style={{ fontWeight: 500 }}>{t(lang, "uploadPreview", rows.length)}</span>
                <span style={{ color: COLORS.success }}>{t(lang, "uploadValidCount", validRows.length)}</span>
                {invalidRows.length > 0 && (
                  <span style={{ color: COLORS.danger, fontWeight: 600 }}>{t(lang, "uploadInvalidCount", invalidRows.length)}</span>
                )}
              </div>

              <div style={{ border: `0.5px solid ${COLORS.border}`, borderRadius: 8, overflow: "hidden" }}>
                <div style={{ maxHeight: 260, overflowY: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                    <thead>
                      <tr style={{ background: "#F4F4F0", position: "sticky", top: 0 }}>
                        <th style={{ textAlign: "left", padding: "6px 8px" }}>{t(lang, "uploadColRow")}</th>
                        <th style={{ textAlign: "left", padding: "6px 8px" }}>{t(lang, "colEmpNo")}</th>
                        <th style={{ textAlign: "left", padding: "6px 8px" }}>{t(lang, "fieldName")}</th>
                        <th style={{ textAlign: "left", padding: "6px 8px" }}>{t(lang, "fieldDept")}</th>
                        <th style={{ textAlign: "left", padding: "6px 8px" }}>{t(lang, "fieldPosition")}</th>
                        <th style={{ textAlign: "left", padding: "6px 8px" }}>{t(lang, "uploadColReason")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((r) => (
                        <tr key={r.rowNum} style={{ background: r.valid ? "transparent" : COLORS.dangerBg }}>
                          <td style={{ padding: "5px 8px", color: r.valid ? COLORS.textSecondary : COLORS.danger }}>{r.rowNum}</td>
                          <td style={{ padding: "5px 8px", color: r.valid ? COLORS.textPrimary : COLORS.danger }}>{r.empNo || "-"}</td>
                          <td style={{ padding: "5px 8px", color: r.valid ? COLORS.textPrimary : COLORS.danger }}>{r.name || "-"}</td>
                          <td style={{ padding: "5px 8px", color: r.valid ? COLORS.textPrimary : COLORS.danger }}>{r.dept || r.deptRaw || "-"}</td>
                          <td style={{ padding: "5px 8px", color: r.valid ? COLORS.textPrimary : COLORS.danger }}>{r.position || r.posRaw || "-"}</td>
                          <td style={{ padding: "5px 8px", color: COLORS.danger, fontWeight: 500 }}>
                            {r.reasons.join(" · ")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {result && (
            <div style={{ fontSize: 13, fontWeight: 500, color: result.fail > 0 ? COLORS.warning : COLORS.success }}>
              {t(lang, "uploadResultDone", result.ok, result.fail)}
            </div>
          )}
        </div>

        <div style={{ padding: "14px 20px", borderTop: `0.5px solid ${COLORS.border}`, display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <button
            onClick={onClose}
            style={{ fontSize: 13, padding: "7px 16px", borderRadius: 6, border: `0.5px solid ${COLORS.border}`, background: COLORS.card, cursor: "pointer" }}
          >
            {t(lang, "uploadClose")}
          </button>
          {rows && validRows.length > 0 && (
            <button
              onClick={handleRegister}
              style={{
                fontSize: 13,
                padding: "7px 16px",
                borderRadius: 6,
                border: "none",
                background: COLORS.headDark,
                color: "#fff",
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              {t(lang, "uploadRegisterBtn", validRows.length)}
            </button>
          )}
        </div>
      </div>
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
  const [showUpload, setShowUpload] = useState(false);

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

  const langCtx = useMemo(() => ({ lang, setLang, t: (key, ...args) => t(lang, key, ...args) }), [lang]);

  const allEmployees = useMemo(() => {
    const list = [];
    [1, 2].forEach((f) => {
      const d = org[f];
      d.heads.forEach((h) => list.push({ ...h, team: "부서장", isHead: true, status: "출근" }));
      d.teams.forEach((t) => {
        t.members.forEach((m) => list.push({ ...m, team: t.title }));
      });
    });
    return list;
  }, [org]);

  const scoped = useMemo(
    () => (factory === "all" ? allEmployees : allEmployees.filter((e) => e.factory === factory)),
    [allEmployees, factory]
  );

  const counts = useMemo(() => {
    const c = { 출근: 0, 결근: 0, 병가: 0, 출산휴가: 0 };
    scoped.forEach((e) => {
      c[e.status] = (c[e.status] || 0) + 1;
    });
    return c;
  }, [scoped]);

  // 병가/결근/출산휴가 등 결근성 항목끼리 묶어서 보여준다 (같은 상태끼리 정렬)
  const notices = useMemo(() => {
    return scoped
      .filter((e) => e.status !== "출근")
      .slice()
      .sort((a, b) => ABSENCE_ORDER.indexOf(a.status) - ABSENCE_ORDER.indexOf(b.status));
  }, [scoped]);

  // 같은 부서(IQC/PQC/OQC/RMA)끼리 묶고 그 안에서 직급 높은 순으로 정렬
  const filteredList = useMemo(() => {
    return scoped
      .filter((e) => statusFilter === "전체" || e.status === statusFilter)
      .filter((e) => !search.trim() || e.name.includes(search.trim()) || e.empNo.includes(search.trim()))
      .slice()
      .sort(sortByDeptAndPosition);
  }, [scoped, statusFilter, search]);

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
  const LIST_GRID_COLUMNS = "90px 1fr 130px 70px 1.2fr 110px";

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
                <FactoryBtn value={2} label={t(lang, "factoryLabel", 2)} />
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
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0,1fr))", gap: 12, marginBottom: 18 }}>
                {["출근", "결근", "병가", "출산휴가"].map((s) => {
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
                      if (e.status === "병가" && e.note) detail += ` · ${t(lang, "reasonPrefix")}: ${e.note}`;
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
              {(factory === "all" ? [1, 2] : [factory]).map((f) => (
                <FactoryOrgPanel key={f} factory={f} data={org[f]} setOrg={setOrg} />
              ))}
            </div>
          )}

          {/* 전체 명단 */}
          {tab === "list" && (
            <div style={{ background: COLORS.card, border: `0.5px solid ${COLORS.border}`, borderRadius: 12, padding: "16px 18px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, flexWrap: "wrap", gap: 10 }}>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {["전체", "출근", "결근", "병가", "출산휴가"].map((s) => (
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
                    onClick={() => setShowUpload(true)}
                    style={{
                      height: 30,
                      padding: "0 12px",
                      borderRadius: 6,
                      border: `0.5px solid ${COLORS.borderStrong}`,
                      background: COLORS.card,
                      color: COLORS.textPrimary,
                      fontSize: 12,
                      cursor: "pointer",
                    }}
                  >
                    <span style={{ marginRight: 4 }} aria-hidden="true">⇧</span>
                    {t(lang, "uploadExcel")}
                  </button>
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={t(lang, "searchPlaceholder")}
                    style={{ height: 30, padding: "0 10px", borderRadius: 6, border: `0.5px solid ${COLORS.border}`, fontSize: 12, width: 180, boxSizing: "border-box" }}
                  />
                </div>
              </div>

              <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 8 }}>{t(lang, "totalCount", filteredList.length)}</div>

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
                  <span>{t(lang, "colEmpNo")}</span>
                  <span>{t(lang, "colNameTeam")}</span>
                  <span>{t(lang, "colPosition")}</span>
                  <span>{t(lang, "colFactory")}</span>
                  <span>{t(lang, "colNote")}</span>
                  <span style={{ textAlign: "right" }}>{t(lang, "colStatus")}</span>
                </div>

                {filteredList.map((e) => {
                  const meta = STATUS_META[e.status];
                  let note = "-";
                  if (e.status === "병가" && e.note) note = `${t(lang, "reasonPrefix")}: ${e.note}`;
                  if (e.status === "출산휴가" && e.returnDate) note = `${t(lang, "returnDatePrefix")}: ${e.returnDate}`;
                  if (e.status === "결근") note = t(lang, "noteAbsent");
                  const teamLabel = e.team === "부서장" ? t(lang, "headTeamLabel") : trTeamTitle(e.team, lang);
                  return (
                    <div
                      key={e.id}
                      style={{
                        display: "grid",
                        gridTemplateColumns: LIST_GRID_COLUMNS,
                        gap: 8,
                        alignItems: "center",
                        padding: "9px 10px",
                        borderRadius: 8,
                        background: e.status === "출근" ? "#FAFAF8" : meta.bg,
                        borderLeft: `3px solid ${meta.color}`,
                      }}
                    >
                      <span style={{ fontSize: 12, color: COLORS.textSecondary }}>{e.empNo}</span>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 500, color: COLORS.textPrimary }}>{e.name}</div>
                        <div style={{ fontSize: 11, color: COLORS.textMuted }}>{teamLabel}</div>
                      </div>
                      <span style={{ fontSize: 12, color: COLORS.textSecondary }}>{e.position}</span>
                      <span style={{ fontSize: 12, color: COLORS.textSecondary }}>{t(lang, "factoryLabel", e.factory)}</span>
                      <span style={{ fontSize: 12, color: COLORS.textSecondary, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{note}</span>
                      <div style={{ textAlign: "right" }}>
                        <Badge status={e.status} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {showUpload && (
          <ExcelUploadModal
            setOrg={setOrg}
            defaultFactory={factory}
            onClose={() => setShowUpload(false)}
            onRegistered={() => {
              // 등록된 인원을 바로 확인할 수 있도록 조직도 탭으로 자동 전환한다.
              setShowUpload(false);
              setTab("org");
            }}
          />
        )}
      </div>
    </LangContext.Provider>
  );
}
