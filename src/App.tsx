/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { Check, Link2 } from 'lucide-react';

const SECTIONS = [
  { id: 'bg', label: 'Ⅰ. 활동 배경 및 필요성' },
  { id: 'act', label: 'Ⅱ. 활동 내용: 인터랙티브 활동' },
  { id: 'ethic', label: 'Ⅲ. AI 활용 시 유의할 점 (AI 윤리 기준 참고)' },
  { id: 'fx', label: 'Ⅳ. 기대 효과' },
];

export default function App() {
  const [scrollPct, setScrollPct] = useState(0);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const h = document.documentElement;
      const maxScroll = h.scrollHeight - window.innerHeight;
      const pct = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
      setScrollPct(pct);

      if (window.scrollY <= 300) {
        setActiveIdx(null);
        return;
      }

      let current = 0;
      SECTIONS.forEach((sec, idx) => {
        const el = document.getElementById(sec.id);
        if (el && el.getBoundingClientRect().top < 120) {
          current = idx;
        }
      });
      setActiveIdx(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback copy
      const input = document.createElement('input');
      input.value = window.location.href;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div>
      <div id="bar" style={{ width: `${scrollPct}%` }} />
      <nav className="doc-nav">
        <div className="doc-nav-links">
          {SECTIONS.map((sec, idx) => (
            <a
              key={sec.id}
              href={`#${sec.id}`}
              className={activeIdx === idx ? 'on' : ''}
            >
              {sec.label}
            </a>
          ))}
        </div>
        <button
          type="button"
          onClick={handleCopyLink}
          className="copy-link-btn"
          title="현재 웹 열람 링크 복사"
        >
          {copied ? (
            <>
              <Check size={14} />
              <span>링크 복사됨</span>
            </>
          ) : (
            <>
              <Link2 size={14} />
              <span>링크 복사</span>
            </>
          )}
        </button>
      </nav>

      <header className="doc-header">
        <div className="hw">
          <div>
            <h1 className="doc-h1">활동 내용 및 예상 산출물</h1>
            <div className="team">전날통(전미전미~지리:날아라,통합사회!)</div>
            <p className="proj">AI 기반 인터랙티브 학습 제작</p>
            <p className="meta">
              교과: 통합사회 | 주제: 학생 맞춤형 AI 인터랙티브 활동 설계
            </p>
          </div>
          <div className="loop" aria-hidden="true">
            <svg viewBox="0 0 300 300">
              <path
                d="M150 60 L235 205 L65 205 Z"
                fill="none"
                stroke="#6fbf92"
                strokeWidth="2"
                strokeDasharray="6 6"
              />
              <g className="pulse nd">
                <circle cx="150" cy="60" r="44" />
              </g>
              <g className="pulse nd">
                <circle cx="235" cy="205" r="44" />
              </g>
              <g className="pulse nd">
                <circle cx="65" cy="205" r="44" />
              </g>
              <text className="tx" x="150" y="56">
                문항
              </text>
              <text className="tx" x="150" y="76">
                응답
              </text>
              <text className="tx" x="235" y="201">
                오답 유형
              </text>
              <text className="tx" x="235" y="221">
                분석
              </text>
              <text className="tx" x="65" y="201">
                맞춤
              </text>
              <text className="tx" x="65" y="221">
                활동
              </text>
            </svg>
          </div>
        </div>
      </header>

      <main className="doc-main">
        <section id="bg" className="sec s0">
          <h2 className="doc-h2">Ⅰ. 활동 배경 및 필요성</h2>
          <div className="blk">
            <h3 className="doc-h3">1. 한국 디지털 교과서 도입 현황 (활동 배경)</h3>
            <ul className="doc-ul plain">
              <li>
                2025학년도부터 초3·4, 중1, 고1의 수학·영어·정보 교과에 AI
                디지털교과서를 단계적으로 도입하는 계획이 추진됨
              </li>
              <li>
                2025년 8월 국회에서 AI 교과서를 &apos;교육자료&apos;로 규정하는
                초중등교육법 개정안이 통과되어, 채택 여부가 학교장 재량으로 바뀜
              </li>
              <li>
                2025년 3월 기준 채택 학교는 전국 32.4%에 그쳤고, 시·도별 기기
                보급률도 경남 126.8%, 서울 50.8%로 격차가 큼
              </li>
              <li>
                디지털 과몰입과 검증 부족을 이유로 도입 중단 요구가 이어져 현장의
                불확실성이 높아진 상태임
              </li>
              <li>
                도입 대상 교과가 수학·영어·정보에 집중되어 통합사회 등 사회
                교과에서는 AI 활용 학습 자료가 부족함
              </li>
            </ul>
          </div>
          <div className="blk">
            <h3 className="doc-h3">2. 필요성</h3>
            <ul className="doc-ul plain">
              <li>
                같은 교실에서 같은 수업을 들어도 어떤 학생은 기후 그래프 해석에서,
                어떤 학생은 문화 상대주의 개념에서 막히는 등 이해의 걸림돌이 다르기
                때문에, 교사 한 명이 모든 학생의 약점을 수업 중에 파악하고 각각 다른
                자료를 주기는 현실적으로 어려움
              </li>
              <li>
                AI는 학생의 문항 응답과 오답 유형을 즉시 분석할 수 있어, 학생이
                반복해서 틀리는 기후 유형이나 키워드를 찾아내고 그에 맞춘 문항이나
                학습송을 바로 제공하는 일이 가능함
              </li>
              <li>
                교사의 한계를 보완하는 개별화 학습은 학습 격차가 벌어지기 전에
                개입할 수 있다는 점에서 교실 수업에 필요한 기능임
              </li>
            </ul>
          </div>
        </section>

        <section id="act" className="sec s1">
          <h2 className="doc-h2">Ⅱ. 활동 내용: 인터랙티브 활동</h2>
          <div className="blk">
            <h3 className="doc-h3">1. 활동 개요</h3>
            <ul className="doc-ul plain ov">
              <li>
                학생이 어려워하는 부분을 AI가 문항 응답과 오답 유형을 바탕으로
                파악하고, 그 부분에 맞춘 활동을 개별적으로 제시하는 방식으로 운영됨
              </li>
              <li>
                통합사회의 세 영역(자연환경과 인간, 문화와 다양성, 미래와 지속가능한
                삶)마다 서로 다른 활동 유형을 배치해 수업 흐름이 단조롭지 않도록
                구성함
              </li>
              <li>
                모든 활동은 교사가 학습 목표를 먼저 안내한 뒤 학생이 직접 조작하고,
                마무리 단계에서 교사가 핵심 개념을 정리하는 순서로 진행함
              </li>
            </ul>
          </div>

          <div className="blk dom">
            <h3 className="doc-h3">2. 자연환경과 인간: 기후에 따른 다양한 생활 모습</h3>
            <article className="act">
              <h4 className="doc-h4">가. 쾨펜 기후 구분 기반 지역별 기후 학습 모델</h4>
              <div className="lbs">
                <div className="lb goal">
                  <h5>활동 목표</h5>
                  <p>
                    세계의 대지형, 위도 등 기후 요인에 따라 달라지는 기후를 이해하고,
                    기후 그래프를 통해 기후 유형을 유추하는 연습을 돕기 위해 쾨펜의
                    기후 구분에 따른 기후 유형별 특징을 스스로 추론하는 데 초점을 둠
                  </p>
                </div>
                <div className="lb how">
                  <h5>활동 방법</h5>
                  <ul className="doc-ul steps">
                    <li>
                      학생이 세계 백지도에서 임의의 지역을 선택하면 해당 지역이 속한
                      기후 유형의 대표 기후 그래프(월평균 기온과 강수량)가 화면에
                      제시됨
                    </li>
                    <li>
                      학생은 기온 변화의 폭, 강수량이 집중되는 시기, 최한월 평균 기온
                      같은 그래프의 단서를 근거로 어떤 기후 유형에 해당하는지를
                      판단하여 답을 선택함
                    </li>
                    <li>
                      AI는 정답 여부와 함께 학생이 어떤 단서를 잘못 해석했는지를
                      분석하여 같은 유형의 오답이 반복되는 기후 유형을 우선적으로
                      다시 제시함
                    </li>
                    <li>
                      기존 세계 지리 교과 기출 중 빈출 지역의 경우, 대표 기후
                      그래프가 아닌 기출 문제에서 활용된 그래프 값을 제시하며, 이러한
                      지역의 기후 그래프를 모아 확인할 수 있는 기능을 제공하여 주요
                      학습 지역에 대한 성취도를 높임
                    </li>
                  </ul>
                </div>
                <div className="lb misc">
                  <h5>문항 구성 및 효과</h5>
                  <ul className="doc-ul">
                    <li>
                      통합사회 모의고사 기출 문항과 기존 세계 지리 교과 기출 문항의
                      유형(그래프 해석, 기후 유형 구분, 생활 모습 연결)에 맞춰 문제를
                      구성하여 시험 대비와 개념 학습을 동시에 지원함
                    </li>
                  </ul>
                </div>
                <div className="lb fx">
                  <h5>기대 효과</h5>
                  <ul className="doc-ul">
                    <li>
                      교사가 정답을 알려주는 방식이 아니라 학생이 지역을 직접 골라
                      탐색하는 방식이므로 지역별 기후 학습에 대한 주도성과 흥미가
                      높아짐
                    </li>
                    <li>
                      즉각적인 오답 노트 피드백을 통해 학생 개개인에 맞춘 약점 보완
                      가능성을 높임
                    </li>
                  </ul>
                </div>
              </div>
            </article>

            <article className="act app">
              <h4 className="doc-h4">나. 부록: AI 기반 학습송</h4>
              <div className="lbs">
                <div className="lb how">
                  <h5>활동 방법</h5>
                  <ul className="doc-ul steps">
                    <li>
                      학생이 반복해서 틀리는 키워드(예: 열대 우림 기후의 스콜,
                      지중해성 기후의 여름 건조)를 AI가 파악한 뒤, 해당 기후의 특징을
                      가사로 담은 노래를 즉석에서 생성하여 제공함
                    </li>
                    <li>
                      〈한국을 빛낸 100명의 위인들〉처럼 노래의 리듬에 정보를 실어
                      암기를 돕는 방식과 같은 맥락임
                    </li>
                  </ul>
                </div>
                <div className="lb misc">
                  <h5>활용 방식</h5>
                  <ul className="doc-ul">
                    <li>
                      학생은 생성된 가사를 읽고 따라 부르며 기후별 특징을 반복해서
                      접하고, 이후 같은 키워드가 나오는 문항을 다시 풀어 암기 효과를
                      스스로 점검함
                    </li>
                  </ul>
                </div>
                <div className="lb fx">
                  <h5>기대 효과</h5>
                  <ul className="doc-ul">
                    <li>
                      단순 텍스트 암기에서 벗어나, 뇌의 청각 피질과 해마를 자극하여
                      정보 저장 효율을 높이는 효과적인 방법을 이용하여 개념을 이해할
                      수 있음
                    </li>
                    <li>
                      개개인의 학습 정도에 맞춘 노래를 제공하여 보다 맞춤화된 학습
                      도구를 제공할 수 있음
                    </li>
                  </ul>
                </div>
              </div>
            </article>
          </div>

          <div className="blk dom">
            <h3 className="doc-h3">3. 문화와 다양성: 다양한 문화권의 특징</h3>
            <article className="act">
              <h4 className="doc-h4">가. 가상 친구와의 펜팔 학습 모델</h4>
              <div className="lbs">
                <div className="lb goal">
                  <h5>활동 목표</h5>
                  <p>
                    다문화를 이해하고 존중하는 것의 중요성을 학생이 체감하도록,
                    다양한 문화권의 특수성을 이해하는 연습을 하고 그 결과를 점검받는
                    데 초점을 둠
                  </p>
                </div>
                <div className="lb how">
                  <h5>활동 방법</h5>
                  <ul className="doc-ul steps">
                    <li>
                      학생은 다른 문화권에 사는 가상의 친구에게 해당 문화의 의식주,
                      종교, 관습 등을 고려하며 편지를 작성함
                    </li>
                    <li>
                      AI는 편지에 담긴 문화 이해의 정확성과 표현의 적절성을 점검하여,
                      특정 문화를 자기 기준으로 평가하거나 단정한 표현이 있으면 문화
                      상대주의 관점에서 다시 생각해 보도록 피드백함
                    </li>
                    <li>
                      학생은 피드백을 반영해 편지를 고쳐 쓰고, 가상 친구의 답장을
                      통해 상대 문화의 입장과 맥락을 한 번 더 확인함
                    </li>
                  </ul>
                </div>
                <div className="lb fx">
                  <h5>기대 효과</h5>
                  <ul className="doc-ul">
                    <li>
                      문화를 외우는 대신 상대의 입장에서 이해하는 경험을 통해 다문화
                      존중의 필요성을 내면화함
                    </li>
                    <li>
                      편지 쓰기 과정에서 서술형 표현력과 논리적 설명 능력이 함께
                      향상됨
                    </li>
                  </ul>
                </div>
              </div>
            </article>
          </div>

          <div className="blk dom">
            <h3 className="doc-h3">4. 미래와 지속가능한 삶: 인구 문제와 미래 사회</h3>
            <article className="act">
              <h4 className="doc-h4">가. 도시 시뮬레이션 프로그램</h4>
              <div className="lbs">
                <div className="lb goal">
                  <h5>활동 목표</h5>
                  <p>
                    도시 구조와 인구 유출·유입 요인을 학습하기 위해, 학생이 도시를
                    직접 설계하며 인구 변화의 원인을 체험적으로 이해하도록 함
                  </p>
                </div>
                <div className="lb how">
                  <h5>활동 방법</h5>
                  <ul className="doc-ul steps">
                    <li>
                      학생은 사회기반시설(교통, 의료, 교육)과 주거시설, 일자리 공간
                      등을 도시 지도 위에 직접 배치하며 하나의 도시를 만들어 감
                    </li>
                    <li>
                      배치가 끝나면 프로그램이 인구 유입과 유출의 변화를 수치와
                      그래프로 보여주어, 어떤 시설이 부족할 때 인구가 빠져나가고 어떤
                      시설이 갖춰지면 인구가 늘어나는지를 학생이 직접 확인함
                    </li>
                    <li>
                      AI는 학생의 배치에서 부족한 요인을 짚어 주고 다른 배치를 시도해
                      보도록 유도하여 유입 요인과 유출 요인을 구분해서 이해하게 함
                    </li>
                  </ul>
                </div>
                <div className="lb fx">
                  <h5>기대 효과</h5>
                  <ul className="doc-ul">
                    <li>
                      교과서의 개념 설명을 결과로 확인하면서 인과 관계를 이해할 수
                      있고, 저출생과 지방 소멸 같은 인구 문제를 자신의 문제로 연결해
                      생각하는 계기가 됨
                    </li>
                  </ul>
                </div>
              </div>
            </article>

            <article className="act app">
              <h4 className="doc-h4">나. 부록 2: 학습 타자 랭킹 게임</h4>
              <div className="lbs">
                <div className="lb how">
                  <h5>활동 방법</h5>
                  <ul className="doc-ul steps">
                    <li>
                      학습 개념을 타자로 직접 입력하거나 퀴즈를 풀면서 자연스럽게
                      반복 학습하고, 점수에 따른 순위가 실시간으로 화면에 나타나도록
                      구성함
                    </li>
                  </ul>
                </div>
                <div className="lb misc">
                  <h5>활용 방식</h5>
                  <ul className="doc-ul">
                    <li>
                      단원 마무리 단계에서 핵심 용어를 정리하는 용도로 활용하며, 틀린
                      개념은 AI가 기록해 다음 활동 때 우선 출제함
                    </li>
                  </ul>
                </div>
                <div className="lb fx">
                  <h5>기대 효과</h5>
                  <ul className="doc-ul">
                    <li>
                      실시간 순위가 학생의 참여 의지를 높이고, 타자 입력 과정에서
                      핵심 용어를 반복해 접하므로 암기 부담이 줄어듦
                    </li>
                  </ul>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section id="ethic" className="sec s2">
          <h2 className="doc-h2">Ⅲ. AI 활용 시 유의할 점 (AI 윤리 기준 참고)</h2>
          <div className="blk">
            <div className="cards">
              <article className="card">
                <h4 className="doc-h4">기후 학습 모델:</h4>
                <ul className="doc-ul">
                  <li>
                    학생이 선택한 위, 경도에 특정하게 해당하는 기후 그래프 값이 아닌,
                    기후 구분에 따른 보편적인 그래프를 제시하고 있음을 공지함
                  </li>
                  <li>
                    AI가 왜 특정 기후 유형이나 활동을 다시 제시했는지 학생이 알 수
                    있도록 판단 근거를 화면에 안내함
                  </li>
                </ul>
              </article>
              <article className="card">
                <h4 className="doc-h4">학습송:</h4>
                <ul className="doc-ul">
                  <li>
                    생성된 가사에 잘못된 정보가 있으면 학생이 오개념을 노래로 굳히게
                    되므로, AI에 입력될 정보를 교사가 성취 기준과 대조해 검수한 후
                    제공함
                  </li>
                  <li>
                    기존 노래의 가사나 멜로디와 비슷해지지 않도록 하고, 학생이 직접
                    가사를 다듬는 활동으로 확장함
                  </li>
                </ul>
              </article>
              <article className="card">
                <h4 className="doc-h4">펜팔:</h4>
                <ul className="doc-ul">
                  <li>
                    AI가 특정 문화에 대한 고정관념을 재생산하거나 특정 문화의 관점을
                    정답처럼 제시하지 않도록, 문화 관련 응답은 교사가 사전 점검함
                  </li>
                </ul>
              </article>
              <article className="card">
                <h4 className="doc-h4">기후·도시 활동:</h4>
                <ul className="doc-ul">
                  <li>
                    도시 시뮬레이션은 현실을 단순화한 모델이므로 인구 문제에 정답이
                    하나뿐인 것처럼 받아들이지 않도록, 결과의 가정과 한계를 수업에서
                    함께 설명함
                  </li>
                </ul>
              </article>
              <article className="card">
                <h4 className="doc-h4">맞춤 진단</h4>
                <ul className="doc-ul">
                  <li>
                    학생의 취약 부분 분석은 학습 지원 목적으로만 쓰고, 성취 평가나
                    학생 비교의 근거로 단정하지 않으며 최종 판단은 교사가 함
                  </li>
                  <li>
                    오답 기록 같은 학습 데이터는 최소한으로 수집하고 보관 기간을 정해
                    활동 종료 후 삭제함
                  </li>
                </ul>
              </article>
              <article className="card">
                <h4 className="doc-h4">랭킹 게임:</h4>
                <ul className="doc-ul">
                  <li>
                    실시간 순위 공개가 하위권 학생에게 위축감을 주거나 과열 경쟁을
                    만들 수 있으므로, 이름 대신 익명 닉네임을 쓰고 상위 순위만
                    공개하거나 개인의 향상도를 함께 보여줌
                  </li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section id="fx" className="sec s3">
          <h2 className="doc-h2">Ⅳ. 기대 효과</h2>
          <ul className="doc-ul fxlist">
            <li>교사가 자율적으로 적용할 수 있는 교과 연계형 AI 활동 모델을 제시함</li>
            <li>
              개인별 취약 부분을 보완하고 참여형 학습으로 학습 흥미와 이해도를 높임
            </li>
            <li>
              기존 고정된 학습 활동에서 제시할 수 없는 학생별 즉각 맞춤 활동을 제공함
            </li>
            <li>
              보편화된 학습 도구가 아닌, AI를 이용하여 새로운 도구를 제시함으로써
              수업의 다양성과 확장 가능성을 제시함
            </li>
            <li>
              활동과 AI 윤리를 함께 다루어 AI를 비판적으로 활용하는 역량을 기름
            </li>
          </ul>
        </section>
      </main>

      <footer className="doc-footer">
        <b>전날통(전미전미~지리:날아라,통합사회!)</b>
      </footer>
    </div>
  );
}
