import { useState, useMemo } from "react";

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

// 결근성 상태(출근 제외)를 대시보드에서 같은 항목끼리 묶어 보여주기 위한 순서
const ABSENCE_ORDER = ["결근", "병가", "출산휴가"];

// ---------- 부서 / 직급 기준 ----------
// 품질부서 산하 4개 팀 (정렬 시 이 순서를 기준으로 그룹핑됨)
const DEPARTMENTS = ["IQC", "PQC", "OQC", "RMA"];
// 부서장은 팀 소속이 아니므로 정렬상 최상단에 별도로 둔다
const DEPT_ORDER = ["부서장", ...DEPARTMENTS];

// 직급 체계 (낮은 순 -> 높은 순). 정렬 시 이 순서를 기준으로 직급별로 묶는다.
const POSITIONS = ["Worker", "Staff", "Supervisor 1", "Supervisor 2", "Manager", "Upper Manager"];

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

const todayStr = () => {
  const d = new Date();
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일 (${days[d.getDay()]})`;
};

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
      {
        title: "IQC",
        members: [
          { empNo: "Q1011", name: "김철수", position: "Upper Manager", status: "출근" },
          { empNo: "Q1012", name: "김민수", position: "Supervisor 1", status: "병가", note: "감기몸살" },
          { empNo: "Q1013", name: "오세훈", position: "Worker", status: "출근" },
        ],
      },
      {
        title: "PQC",
        members: [
          { empNo: "Q1021", name: "이수정", position: "Manager", status: "출산휴가", returnDate: "2026-11-02" },
          { empNo: "Q1022", name: "정다은", position: "Worker", status: "출근" },
        ],
      },
      {
        title: "OQC",
        members: [
          { empNo: "Q1031", name: "박준호", position: "Supervisor 2", status: "결근" },
          { empNo: "Q1032", name: "최유진", position: "Worker", status: "출근" },
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
      {
        title: "IQC",
        members: [
          { empNo: "Q2011", name: "배민재", position: "Upper Manager", status: "출근" },
          { empNo: "Q2012", name: "송지호", position: "Worker", status: "출근" },
        ],
      },
      {
        title: "PQC",
        members: [
          { empNo: "Q2021", name: "임하늘", position: "Manager", status: "병가", note: "병원 진료" },
          { empNo: "Q2022", name: "강서준", position: "Worker", status: "출근" },
        ],
      },
      {
        title: "OQC",
        members: [
          { empNo: "Q2031", name: "노유빈", position: "Supervisor 2", status: "출근" },
          { empNo: "Q2032", name: "권나라", position: "Worker", status: "출산휴가", returnDate: "2026-09-20" },
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

// ---------- 공용 UI 조각 ----------
function Badge({ status }) {
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
      {status}
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
        <TextField label="사번" value={empNo} onChange={setEmpNo} placeholder="Q1051" />
        <TextField label="성명" value={name} onChange={setName} placeholder="홍길동" />
        {isHead ? (
          <TextField label="직급" value={position} onChange={setPosition} placeholder="품질부서장" />
        ) : (
          <TextField label="직급">
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
          취소
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
          저장
        </button>
      </div>
    </div>
  );
}

// 팀원을 직급별로 묶어 [직급, 팀원목록] 쌍의 배열로 반환한다 (서열 높은 직급 먼저)
function groupByPosition(members) {
  const groups = new Map();
  members.forEach((m) => {
    if (!groups.has(m.position)) groups.set(m.position, []);
    groups.get(m.position).push(m);
  });
  return [...groups.entries()].sort((a, b) => positionRank(b[0]) - positionRank(a[0]));
}

// ---------- 조직도 팀 카드 ----------
// 같은 부서(팀) 안에서도 직급별로 칸을 나눠 보여준다. 부서 전체는 기존처럼
// 위쪽 연결선 하나로 조직도에 연결되고, 그 안에서 직급 단위로 소분류된다.
// draggable/onDragStart 등은 부모(OrgChart)가 팀 카드 좌우 순서를
// 드래그로 바꿀 수 있도록 전달하는 핸들러다.
function TeamCard({
  team,
  onUpdateTitle,
  onDeleteTeam,
  onAddMember,
  onEditMember,
  onDeleteMember,
  draggable,
  isDragOver,
  onDragStart,
  onDragOver,
  onDragLeave,
  onDrop,
  onDragEnd,
}) {
  const [editingTitle, setEditingTitle] = useState(false);
  const [titleDraft, setTitleDraft] = useState(team.title);
  const [addingMember, setAddingMember] = useState(false);
  const [editingMemberId, setEditingMemberId] = useState(null);

  const grouped = groupByPosition(team.members);

  const renderMemberRow = (m) => (
    <div
      key={m.id}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "6px 8px",
        borderRadius: 6,
        background: "#F4F4F0",
        borderLeft: `3px solid ${COLORS.teal}`,
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 11, color: COLORS.textMuted }}>{m.empNo}</div>
        <div style={{ fontSize: 13, fontWeight: 500, color: COLORS.textPrimary }}>{m.name}</div>
      </div>
      <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
        <IconBtn title="수정" onClick={() => setEditingMemberId(m.id)}>
          <span aria-hidden="true">✎</span>
        </IconBtn>
        <IconBtn title="삭제" danger onClick={() => onDeleteMember(m.id)}>
          <span aria-hidden="true">🗑</span>
        </IconBtn>
      </div>
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
          title="드래그하여 팀 순서 변경"
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
            <span style={{ fontSize: 13, fontWeight: 500, cursor: "pointer", overflow: "hidden", textOverflow: "ellipsis" }} onClick={() => setEditingTitle(true)}>
              {team.title}
            </span>
          )}
          <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
            <button
              onClick={() => setEditingTitle(true)}
              title="팀 이름 수정"
              style={{ background: "transparent", border: "none", color: "#fff", opacity: 0.85, cursor: "pointer", fontSize: 12 }}
            >
              <span aria-hidden="true">✎</span>
            </button>
            <button
              onClick={onDeleteTeam}
              title="팀 삭제"
              style={{ background: "transparent", border: "none", color: "#fff", opacity: 0.85, cursor: "pointer", fontSize: 12 }}
            >
              <span aria-hidden="true">🗑</span>
            </button>
          </div>
        </div>

        <div style={{ padding: 8, display: "flex", flexDirection: "column", gap: 8 }}>
          {grouped.map(([position, members]) => (
            <div
              key={position}
              style={{
                border: `0.5px solid ${COLORS.border}`,
                borderRadius: 8,
                padding: 6,
                display: "flex",
                flexDirection: "column",
                gap: 6,
                background: "#FBFBF9",
              }}
            >
              <div style={{ fontSize: 10, fontWeight: 600, color: COLORS.textMuted, letterSpacing: 0.3, padding: "0 2px" }}>
                {position}
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
                  renderMemberRow(m)
                )
              )}
            </div>
          ))}

          {addingMember ? (
            <MemberForm
              onCancel={() => setAddingMember(false)}
              onSave={(data) => {
                onAddMember(data);
                setAddingMember(false);
              }}
            />
          ) : (
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
              }}
            >
              <span style={{ marginRight: 4 }} aria-hidden="true">+</span>
              팀원 추가
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------- 조직도 (공장 1개) ----------
function OrgChart({ factory, data, setOrg }) {
  const [editingHeadId, setEditingHeadId] = useState(null);
  const [addingHead, setAddingHead] = useState(false);
  const [dragIndex, setDragIndex] = useState(null);
  const [overIndex, setOverIndex] = useState(null);

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

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "8px 4px 4px" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
        {data.heads.map((h) =>
          editingHeadId === h.id ? (
            <div key={h.id} style={{ width: 260, maxWidth: "100%" }}>
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
            <div key={h.id} style={{ position: "relative" }}>
              <div
                onClick={() => setEditingHeadId(h.id)}
                title="클릭하여 수정"
                style={{
                  background: COLORS.headDark,
                  color: "#fff",
                  borderRadius: 999,
                  padding: "10px 22px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  cursor: "pointer",
                  minWidth: 180,
                }}
              >
                <span style={{ fontSize: 14, fontWeight: 500 }}>{h.name}</span>
                <span style={{ fontSize: 11, opacity: 0.8 }}>
                  {h.position} · {h.empNo}
                </span>
              </div>
              {data.heads.length > 1 && (
                <button
                  onClick={() => {
                    if (confirm(`"${h.name}" 부서장을 삭제할까요?`)) {
                      updateHeads((heads) => heads.filter((x) => x.id !== h.id));
                    }
                  }}
                  title="부서장 삭제"
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
          )
        )}

        {addingHead ? (
          <div style={{ width: 260, maxWidth: "100%" }}>
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
          <button
            onClick={() => setAddingHead(true)}
            style={{
              padding: "10px 18px",
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
            부서장 추가
          </button>
        )}
      </div>

      <div style={{ width: 1, height: 18, background: COLORS.borderStrong }} />
      <div style={{ width: 6, height: 6, borderRadius: "50%", border: `1.5px solid ${COLORS.borderStrong}`, background: COLORS.page }} />

      <div style={{ width: "100%", borderTop: `2px solid ${COLORS.borderStrong}`, marginTop: 0 }} />

      <div style={{ display: "flex", gap: 14, width: "100%", marginTop: 0, alignItems: "flex-start" }}>
        {data.teams.map((team, idx) => (
          <TeamCard
            key={team.id}
            team={team}
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
              if (confirm(`"${team.title}" 팀을 삭제할까요? 소속 팀원도 함께 삭제됩니다.`)) {
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
              if (confirm("이 팀원을 삭제할까요?")) {
                updateTeams((teams) =>
                  teams.map((t) => (t.id === team.id ? { ...t, members: t.members.filter((m) => m.id !== memberId) } : t))
                );
              }
            }}
          />
        ))}

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
            팀 추가
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------- 메인 앱 ----------
export default function QualityPortal() {
  const [org, setOrg] = useState(initialOrg);
  const [tab, setTab] = useState("dashboard");
  const [factory, setFactory] = useState("all");
  const [statusFilter, setStatusFilter] = useState("전체");
  const [search, setSearch] = useState("");

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
    <div style={{ background: COLORS.page, minHeight: "100%", fontFamily: "var(--font-sans, sans-serif)" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "20px 20px 40px" }}>
        {/* 헤더 */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 500, color: COLORS.textPrimary }}>품질부서 인력 현황 포털</div>
            <div style={{ fontSize: 13, color: COLORS.textSecondary, marginTop: 2 }}>{todayStr()}</div>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <FactoryBtn value="all" label="전체" />
            <FactoryBtn value={1} label="1공장" />
            <FactoryBtn value={2} label="2공장" />
          </div>
        </div>

        {/* 탭 */}
        <div style={{ display: "flex", gap: 20, borderBottom: `0.5px solid ${COLORS.border}`, marginBottom: 18 }}>
          <TabBtn value="dashboard" label="대시보드" icon="▦" />
          <TabBtn value="org" label="조직도" icon="🗂" />
          <TabBtn value="list" label="전체 명단" icon="≡" />
        </div>

        {/* 대시보드 */}
        {tab === "dashboard" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0,1fr))", gap: 12, marginBottom: 18 }}>
              {["출근", "결근", "병가", "출산휴가"].map((s) => {
                const meta = STATUS_META[s];
                return (
                  <div key={s} style={{ background: COLORS.card, border: `0.5px solid ${COLORS.border}`, borderRadius: 12, padding: "14px 16px" }}>
                    <div style={{ fontSize: 12, color: COLORS.textSecondary }}>{s}</div>
                    <div style={{ fontSize: 26, fontWeight: 500, color: meta.color, marginTop: 4 }}>{counts[s] || 0}명</div>
                  </div>
                );
              })}
            </div>

            <div style={{ background: COLORS.card, border: `0.5px solid ${COLORS.border}`, borderRadius: 12, padding: "16px 18px" }}>
              <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 12 }}>오늘 특이사항</div>
              {notices.length === 0 ? (
                <div style={{ fontSize: 13, color: COLORS.textMuted }}>오늘은 전원 정상 출근했습니다.</div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {notices.map((e) => {
                    const meta = STATUS_META[e.status];
                    let detail = `${e.factory}공장 · ${e.team}`;
                    if (e.status === "병가" && e.note) detail += ` · 사유: ${e.note}`;
                    if (e.status === "출산휴가" && e.returnDate) detail += ` · 복귀예정일: ${e.returnDate}`;
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
              <div key={f} style={{ background: COLORS.card, border: `0.5px solid ${COLORS.border}`, borderRadius: 12, padding: "18px 16px" }}>
                <div style={{ fontSize: 14, fontWeight: 500, color: COLORS.textSecondary, marginBottom: 4 }}>{f}공장 품질팀 조직도</div>
                <OrgChart factory={f} data={org[f]} setOrg={setOrg} />
              </div>
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
                    {s}
                  </button>
                ))}
              </div>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="이름 또는 사번 검색"
                style={{ height: 30, padding: "0 10px", borderRadius: 6, border: `0.5px solid ${COLORS.border}`, fontSize: 12, width: 180, boxSizing: "border-box" }}
              />
            </div>

            <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 8 }}>총 {filteredList.length}명</div>

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
                <span>사번</span>
                <span>성명 / 소속</span>
                <span>직급</span>
                <span>공장</span>
                <span>비고</span>
                <span style={{ textAlign: "right" }}>오늘 상태</span>
              </div>

              {filteredList.map((e) => {
                const meta = STATUS_META[e.status];
                let note = "-";
                if (e.status === "병가" && e.note) note = `사유: ${e.note}`;
                if (e.status === "출산휴가" && e.returnDate) note = `복귀예정일: ${e.returnDate}`;
                if (e.status === "결근") note = "무단결근";
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
                      <div style={{ fontSize: 11, color: COLORS.textMuted }}>{e.team}</div>
                    </div>
                    <span style={{ fontSize: 12, color: COLORS.textSecondary }}>{e.position}</span>
                    <span style={{ fontSize: 12, color: COLORS.textSecondary }}>{e.factory}공장</span>
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
    </div>
  );
}
