import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

type Page =
  | 'welcome'
  | 'home'
  | 'practiceHall'
  | 'studyRoom'
  | 'vocalPractice'
  | 'pianoPractice'
  | 'recitationPractice'
  | 'footprints'
  | 'classmateCircle'
  | 'classmatePublish'
  | 'activity'
  | 'entertainment'
  | 'audioBook'
  | 'game'
  | 'photoEdit';

type Choice = {
  title: string;
  asset?: string;
  glyph?: string;
};

type Message = {
  id: number;
  sender: 'ai' | 'user';
  text: string;
};

type NavSpec = {
  title?: string;
  action?: string;
  onAction?: () => void;
};

const asset = (name: string) => `${import.meta.env.BASE_URL}assets/${name}.png`;

function App() {
  const [stack, setStack] = useState<Page[]>(['welcome']);

  const current = stack[stack.length - 1];
  const navigate = (page: Page) => setStack((items) => [...items, page]);
  const replace = (page: Page) => setStack([page]);
  const back = () => setStack((items) => (items.length > 1 ? items.slice(0, -1) : items));

  return (
    <div className="app-shell">
      <div className="phone-frame">
        {current === 'welcome' && <WelcomeChat onFinish={() => replace('home')} />}
        {current === 'home' && <HomePage onNavigate={navigate} onReset={() => replace('welcome')} />}
        {current === 'practiceHall' && (
          <NavPage title="学练馆" onBack={back}>
            <PracticeHallPage onNavigate={navigate} />
          </NavPage>
        )}
        {current === 'studyRoom' && (
          <NavPage title="学习房" onBack={back}>
            <StudyRoomPage />
          </NavPage>
        )}
        {current === 'vocalPractice' && (
          <NavPage title="练歌房" action="结束练唱" onBack={back}>
            <PracticePage
              sections={[
                ['vocal_practice_top', 388],
                ['vocal_practice_metrics', 94],
                ['vocal_practice_controls', 215],
              ]}
              wave={{ x: 270, y: 400, width: 116, height: 38, scale: 0.55 }}
              background="#fcfaf5"
            />
          </NavPage>
        )}
        {current === 'pianoPractice' && (
          <NavPage title="练琴房" action="结束练习" onBack={back}>
            <PracticePage
              sections={[
                ['piano_practice_top', 378],
                ['piano_practice_feedback', 112],
                ['piano_practice_controls', 211],
              ]}
              wave={{ x: 248, y: 454, width: 116, height: 38, scale: 0.55 }}
              background="#fcfaf7"
            />
          </NavPage>
        )}
        {current === 'recitationPractice' && (
          <NavPage title="朗诵房" action="结束练习" onBack={back}>
            <PracticePage
              sections={[
                ['recitation_practice_top', 387],
                ['recitation_practice_feedback', 113],
                ['recitation_practice_controls', 190],
              ]}
              wave={{ x: 58, y: 462, width: 90, height: 28, scale: 0.5 }}
              background="#fcfaf5"
            />
          </NavPage>
        )}
        {current === 'footprints' && (
          <NavPage title="我的学习足迹" onBack={back}>
            <PracticePage
              sections={[
                ['footprints_summary', 254],
                ['footprints_journey', 356],
                ['footprints_chat', 108],
              ]}
              wave={{ x: 190, y: 640, width: 90, height: 28, scale: 0.5 }}
              background="#fffaf2"
            />
          </NavPage>
        )}
        {current === 'classmateCircle' && (
          <NavPage title="同学圈" action="⋯" onBack={back}>
            <ClassmateCirclePage onPublish={() => navigate('classmatePublish')} />
          </NavPage>
        )}
        {current === 'classmatePublish' && (
          <NavPage title="" onBack={back}>
            <ImagePage name="classmate_publish_content" width={375} height={684} />
          </NavPage>
        )}
        {current === 'activity' && (
          <NavPage title="活动馆" action="日历" onBack={back}>
            <ActivityPage />
          </NavPage>
        )}
        {current === 'entertainment' && (
          <NavPage title="" onBack={back}>
            <EntertainmentPage onNavigate={navigate} />
          </NavPage>
        )}
        {current === 'audioBook' && (
          <NavPage title="" onBack={back}>
            <ImagePage name="audio_book_content" width={368} height={727} />
          </NavPage>
        )}
        {current === 'game' && (
          <NavPage title="" onBack={back}>
            <ImagePage name="game_page_content" width={351} height={669} />
          </NavPage>
        )}
        {current === 'photoEdit' && (
          <NavPage title="" onBack={back}>
            <ImagePage name="photo_edit_content" width={350} height={713} />
          </NavPage>
        )}
      </div>
    </div>
  );
}

function NavPage({ title = '', action, onAction, onBack, children }: React.PropsWithChildren<NavSpec & { onBack: () => void }>) {
  return (
    <div className="page nav-page">
      <header className="nav-bar">
        <button className="icon-button back-button" type="button" onClick={onBack} aria-label="返回">
          ‹
        </button>
        <h1>{title}</h1>
        {action ? (
          <button className="nav-action" type="button" onClick={onAction}>
            {action}
          </button>
        ) : (
          <span className="nav-spacer" />
        )}
      </header>
      <main className="nav-content">{children}</main>
    </div>
  );
}

function WelcomeChat({ onFinish }: { onFinish: () => void }) {
  const nameOptions = ['叔叔', '阿姨', '先跳过'];
  const hobbies: Choice[] = [
    { title: '唱歌', asset: 'icon_sing' },
    { title: '朗诵', asset: 'icon_recite' },
    { title: '钢琴', asset: 'icon_piano' },
    { title: '书法', asset: 'icon_calligraphy' },
    { title: '美妆', asset: 'icon_makeup' },
    { title: '社团舞台', asset: 'icon_stage' },
  ];
  const plans: Choice[] = [
    { title: '学习', glyph: '📖' },
    { title: '练习', glyph: '✎' },
    { title: '看同学', glyph: '👥' },
    { title: '逛圈子', glyph: '◎' },
    { title: '看足迹', glyph: '⌁' },
    { title: '参加活动', glyph: '▣' },
    { title: '听书', glyph: '◖' },
    { title: '游戏', glyph: '◈' },
  ];

  const [step, setStep] = useState<'name' | 'hobbies' | 'plan'>('name');
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedHobbies, setSelectedHobbies] = useState<Set<string>>(new Set());
  const [selectedPlans, setSelectedPlans] = useState<Set<string>>(new Set());

  useEffect(() => {
    setMessages([
      { id: 1, sender: 'ai', text: '您好呀,欢迎来到开开华彩。\n我先了解您一点点,再陪您安排今天。' },
      { id: 2, sender: 'ai', text: '怎么称呼您？' },
    ]);
  }, []);

  const canContinue = step === 'hobbies' ? selectedHobbies.size > 0 : step === 'plan' ? selectedPlans.size > 0 : false;

  const pushMessages = (...items: Omit<Message, 'id'>[]) => {
    setMessages((current) => [
      ...current,
      ...items.map((item, index) => ({ ...item, id: Date.now() + index })),
    ]);
  };

  const chooseName = (value: string) => {
    pushMessages(
      { sender: 'user', text: value === '先跳过' ? '先跳过' : `叫我${value}就好了` },
      { sender: 'ai', text: `${value === '先跳过' ? '' : `${value}，`}您平时喜欢什么兴趣爱好？\n可以多选。` },
    );
    setStep('hobbies');
  };

  const continueTapped = () => {
    if (step === 'hobbies') {
      pushMessages(
        { sender: 'user', text: `我喜欢${Array.from(selectedHobbies).sort().join('、')}` },
        { sender: 'ai', text: '今天想做什么？\n可以多选。' },
      );
      setSelectedPlans(new Set());
      setStep('plan');
    }
    if (step === 'plan') {
      pushMessages({ sender: 'user', text: `今天想${Array.from(selectedPlans).sort().join('、')}` });
      window.setTimeout(onFinish, 180);
    }
  };

  return (
    <div className="page welcome-page">
      <header className="welcome-header">
        <img src={asset('mascot_huacai')} alt="" className="mascot" />
        <div>
          <h1>华彩管家小华</h1>
          <p>陪您安排今天</p>
        </div>
        <button type="button" onClick={onFinish}>跳过</button>
      </header>

      <section className="chat-list" aria-label="欢迎对话">
        {messages.map((message) => (
          <div className={`chat-row ${message.sender}`} key={message.id}>
            {message.sender === 'ai' && <img src={asset('mascot_huacai')} alt="" className="chat-avatar" />}
            <p>{message.sender === 'ai' ? <TypewriterText text={message.text} /> : message.text}</p>
          </div>
        ))}

        {step === 'name' && (
          <div className="name-options">
            {nameOptions.map((option) => (
              <button className={option === '先跳过' ? 'secondary' : ''} type="button" onClick={() => chooseName(option)} key={option}>
                {option}
              </button>
            ))}
          </div>
        )}

        {step === 'hobbies' && (
          <ChoiceGrid choices={hobbies} selected={selectedHobbies} onChange={setSelectedHobbies} />
        )}

        {step === 'plan' && (
          <ChoiceGrid choices={plans} selected={selectedPlans} onChange={setSelectedPlans} />
        )}
      </section>

      <footer className="welcome-actions">
        <button type="button" disabled={!canContinue} onClick={continueTapped}>
          选好了，继续
        </button>
        <button type="button" className="skip" onClick={onFinish}>
          暂时跳过
        </button>
      </footer>
    </div>
  );
}

function TypewriterText({ text, speed = 55 }: { text: string; speed?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(0);
    if (!text) return;
    let current = 0;
    const timer = window.setInterval(() => {
      current += 1;
      setCount(current);
      if (current >= text.length) {
        window.clearInterval(timer);
      }
    }, speed);
    return () => window.clearInterval(timer);
  }, [text, speed]);

  const typing = count < text.length;

  return (
    <>
      {text.slice(0, count)}
      {typing && <span className="type-caret" aria-hidden>▍</span>}
    </>
  );
}

function ChoiceGrid({ choices, selected, onChange }: { choices: Choice[]; selected: Set<string>; onChange: (next: Set<string>) => void }) {
  const toggle = (title: string) => {
    const next = new Set(selected);
    if (next.has(title)) {
      next.delete(title);
    } else {
      next.add(title);
    }
    onChange(next);
  };

  return (
    <div className="choice-grid">
      {choices.map((choice) => (
        <button className={selected.has(choice.title) ? 'selected' : ''} type="button" onClick={() => toggle(choice.title)} key={choice.title}>
          {choice.asset ? <img src={asset(choice.asset)} alt="" /> : <span aria-hidden>{choice.glyph}</span>}
          <strong>{choice.title}</strong>
          {selected.has(choice.title) && <i aria-hidden>✓</i>}
        </button>
      ))}
    </div>
  );
}

function HomePage({ onNavigate, onReset }: { onNavigate: (page: Page) => void; onReset: () => void }) {
  return (
    <div className="page home-page">
      <main className="home-scroll">
        <section className="today-card">
          <div className="today-title">
            <h1>李阿姨,<br />今天陪您做3件小事。</h1>
            <VoiceWave className="home-wave" />
          </div>
          <HomeTask image="home_task_sing" title="去练一段歌" subtitle="今天练10分钟就好" action="开始练习" onClick={() => onNavigate('vocalPractice')} />
          <HomeTask image="home_task_social" title={'逛逛同学圈,\n发布一个动态'} subtitle="分享学习生活" action="去发布" onClick={() => onNavigate('classmatePublish')} />
          <HomeTask image="home_task_report" title={'生成今日学习\n足迹'} subtitle="记录今天的成长" action="生成日报" onClick={() => onNavigate('footprints')} />
        </section>

        <section className="feature-grid">
          <div className="feature-row feature-row-2">
            <FeatureTile image="feature_footprints" label="我的学习足迹" onClick={() => onNavigate('footprints')} />
            <FeatureTile image="feature_activity" label="活动馆" onClick={() => onNavigate('activity')} />
          </div>
          <div className="feature-row feature-row-3">
            <FeatureTile image="feature_circle" label="同学圈" onClick={() => onNavigate('classmateCircle')} />
            <FeatureTile image="feature_practice" label="学练馆" onClick={() => onNavigate('practiceHall')} />
            <FeatureTile image="feature_entertainment" label="娱乐馆" onClick={() => onNavigate('entertainment')} />
          </div>
        </section>
      </main>
      <button className="reset-chat" type="button" onClick={onReset} aria-label="重新进入对话">↻</button>
      <HomeTabBar />
    </div>
  );
}

function HomeTask({ image, title, subtitle, action, onClick }: { image: string; title: string; subtitle: string; action: string; onClick: () => void }) {
  return (
    <article className="home-task">
      <img src={asset(image)} alt="" />
      <div>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      <button type="button" onClick={onClick}>{action}</button>
    </article>
  );
}

function FeatureTile({ image, label, onClick }: { image: string; label: string; onClick: () => void }) {
  return (
    <button className="feature-tile" type="button" onClick={onClick} aria-label={label}>
      <img src={asset(image)} alt={label} />
    </button>
  );
}

function HomeTabBar() {
  return (
    <nav className="home-tab-bar" aria-label="主导航">
      {['home_tab_today', 'home_tab_class', 'home_tab_course', 'home_tab_circle', 'home_tab_mine'].map((name) => (
        <img src={asset(name)} alt="" key={name} />
      ))}
    </nav>
  );
}

function PracticeHallPage({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const rooms = [
    { page: 'studyRoom' as Page, label: '进入学习房', top: 17, height: 23 },
    { page: 'vocalPractice' as Page, label: '进入练歌房', top: 41, height: 22 },
    { page: 'pianoPractice' as Page, label: '进入练琴房', top: 63, height: 18 },
    { page: 'recitationPractice' as Page, label: '进入朗诵房', top: 81, height: 19 },
  ];

  return (
    <div className="image-page practice-hall" style={{ background: '#f3f7ef' }}>
      <div className="ph-page">
        <img src={asset('practice_hall_content')} alt="" />
        <VoiceWave className="ph-wave" opacity={0.62} />
        {rooms.map((room) => (
          <button
            key={room.label}
            className="hotspot"
            type="button"
            style={{ position: 'absolute', left: 0, width: '100%', top: `${room.top}%`, height: `${room.height}%` }}
            onClick={() => onNavigate(room.page)}
            aria-label={room.label}
          />
        ))}
      </div>
    </div>
  );
}

function StudyRoomPage() {
  const [status, setStatus] = useState('正在播放');
  const hotspots = [
    { id: 'play', label: '播放暂停', x: 0, y: 176, width: 37, height: 37 },
    { id: 'mute', label: '静音', x: 38, y: 176, width: 36, height: 37 },
    { id: 'gift', label: '送礼', x: 265, y: 221, width: 39, height: 42 },
    { id: 'favorite', label: '收藏', x: 306, y: 221, width: 39, height: 42 },
    { id: 'comment', label: '评论输入', x: 0, y: 662, width: 285, height: 44 },
    { id: 'send', label: '发送评论', x: 300, y: 662, width: 63, height: 44 },
  ];

  return (
    <div className="image-page white-bg">
      <div className="study-canvas">
        <img className="study-header" src={asset('study_room_header')} alt="" />
        <img className="study-content" src={asset('study_room_content')} alt="" />
        {hotspots.map((hotspot) => (
          <button
            key={hotspot.id}
            className="hotspot"
            type="button"
            style={scaleRect(hotspot, 375)}
            onClick={() => setStatus(hotspot.label)}
            aria-label={hotspot.label}
          />
        ))}
      </div>
      <span className="sr-only" role="status">{status}</span>
    </div>
  );
}

function PracticePage({
  sections,
  wave,
  background,
}: {
  sections: [string, number][];
  wave: { x: number; y: number; width: number; height: number; scale: number };
  background: string;
}) {
  const totalHeight = sections.reduce((sum, [, height]) => sum + height, 0);

  return (
    <ImageCanvas width={375} height={totalHeight} background={background}>
      <div className="section-stack">
        {sections.map(([name, height]) => (
          <img src={asset(name)} alt="" style={{ height: `${(height / totalHeight) * 100}%` }} key={name} />
        ))}
      </div>
      <VoiceWave className="absolute-wave" style={scaleRect(wave, 375, wave.scale)} opacity={0.78} />
    </ImageCanvas>
  );
}

function ClassmateCirclePage({ onPublish }: { onPublish: () => void }) {
  return (
    <ImageCanvas name="classmate_circle_content_new" width={345} height={657} background="#fcfaf7">
      <button
        className="publish-button"
        type="button"
        onClick={onPublish}
        style={scaleRect({ x: 277, y: 589, width: 60, height: 60 }, 345)}
        aria-label="发布动态"
      >
        <img src={asset('classmate_circle_publish_button')} alt="" />
      </button>
    </ImageCanvas>
  );
}

function ActivityPage() {
  const hotspots = [
    { label: '每日一赞立即参加', x: 237, y: 202, width: 104, height: 42 },
    { label: '优秀班主任评选立即参加', x: 237, y: 328, width: 104, height: 42 },
    { label: '社团舞台秀立即报名', x: 237, y: 444, width: 104, height: 42 },
    { label: '维也纳演出立即报名', x: 237, y: 562, width: 104, height: 42 },
    { label: '去订阅', x: 254, y: 644, width: 88, height: 38 },
  ];

  return (
    <ImageCanvas name="activity_page_content" width={347} height={697} background="#fcfaf5">
      {hotspots.map((hotspot) => (
        <button
          key={hotspot.label}
          className="hotspot"
          type="button"
          style={scaleRect(hotspot, 347)}
          onClick={() => window.open('https://example.com/activity', '_blank', 'noopener,noreferrer')}
          aria-label={hotspot.label}
        />
      ))}
    </ImageCanvas>
  );
}

function EntertainmentPage({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const hotspots = [
    { page: 'audioBook' as Page, label: '进入听书页面', x: 0, y: 104, width: 349, height: 234 },
    { page: 'game' as Page, label: '进入游戏页面', x: 0, y: 348, width: 169, height: 303 },
    { page: 'photoEdit' as Page, label: '进入修图页面', x: 177, y: 348, width: 172, height: 303 },
  ];

  return (
    <ImageCanvas name="entertainment_hall_content" width={349} height={651} background="#fcfaf5">
      {hotspots.map((hotspot) => (
        <button
          key={hotspot.label}
          className="hotspot"
          type="button"
          style={scaleRect(hotspot, 349)}
          onClick={() => onNavigate(hotspot.page)}
          aria-label={hotspot.label}
        />
      ))}
    </ImageCanvas>
  );
}

function ImagePage({ name, width, height }: { name: string; width: number; height: number }) {
  return <ImageCanvas name={name} width={width} height={height} background="#fcfaf5" />;
}

function ImageCanvas({
  name,
  width,
  height,
  background,
  children,
}: React.PropsWithChildren<{ name?: string; width: number; height: number; background: string }>) {
  return (
    <div className="image-page" style={{ background }}>
      <div className="image-canvas" style={{ '--design-width': width, '--design-height': height } as React.CSSProperties}>
        {name && <img className="base-image" src={asset(name)} alt="" />}
        {children}
      </div>
    </div>
  );
}

function VoiceWave({ className = '', opacity = 0.24, style }: { className?: string; opacity?: number; style?: React.CSSProperties }) {
  const heights = useMemo(() => [0.26, 0.7, 0.48, 0.95, 0.34, 0.82, 0.42, 0.74, 0.28, 1, 0.52, 0.66, 0.36], []);

  return (
    <div className={`voice-wave ${className}`} style={{ ...style, '--wave-opacity': opacity } as React.CSSProperties} aria-hidden>
      {heights.map((height, index) => (
        <span style={{ '--bar-height': height, '--delay': `${index * -0.08}s` } as React.CSSProperties} key={index} />
      ))}
    </div>
  );
}

function scaleRect(
  rect: { x: number; y: number; width: number; height: number; scale?: number },
  designWidth: number,
  elementScale = 1,
): React.CSSProperties {
  return {
    left: `${(rect.x / designWidth) * 100}%`,
    top: `calc(var(--canvas-width) * ${rect.y / designWidth})`,
    width: `${(rect.width / designWidth) * 100}%`,
    height: `calc(var(--canvas-width) * ${rect.height / designWidth})`,
    transform: `scale(${elementScale})`,
    transformOrigin: 'center',
  };
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
