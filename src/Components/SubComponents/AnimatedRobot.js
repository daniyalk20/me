import React, { useState, useEffect, useMemo, useRef } from 'react';
import './AnimatedRobot.css';
import cvData from '../cv.json'; // builds messages from CV skills

/**
 * AnimatedRobot
 * - Walks left↔right along the bottom edge
 * - Pauses, faces front, shows a thinking indicator, then speaks in a glass bubble
 * - More “real” robot with head, antenna, neck, articulated arms (upper/forearm + claw),
 *   articulated legs (thigh/shin + foot), and a torso panel.
 *
 * Props (all optional):
 *  - speed: number (px/step along the % track, default 0.8)
 *  - pauseRangeMs: [min,max] thinking pause before talking (default [700, 1300])
 *  - cycleEveryMs: number (how often the robot considers pausing to speak, default 4200)
 *
 * Messages now sourced exclusively from cv.json (skills & definitions).
 */
const AnimatedRobot = ({ speed = 0.8, pauseRangeMs = [700, 1300], cycleEveryMs = 4200 }) => {
  const [message, setMessage] = useState('');
  const [showBubble, setShowBubble] = useState(false);
  const [showThinking, setShowThinking] = useState(false);
  // Stationary robot: no horizontal movement
  const [state, setState] = useState('idle'); // idle | thinking | talking
  // Cute eye pupil tracking
  const [pupil, setPupil] = useState({ x: 0, y: 0 });
  const pointerRef = useRef({ x: 0, y: 0 });
  const saccadeTargetRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);
  const [blinking, setBlinking] = useState(false);
  const mounted = useRef(true);
  const lastIndexRef = useRef(-1);
  const timeoutsRef = useRef([]);

  // --- Build messages from cv.json as a fallback ---
  const { skills: skillCats = {}, skillDefinitions = {} } = cvData || {};
  const fallbackMessages = useMemo(() => {
    const exclude = new Set(['English', 'Hindi', 'Urdu']);
    const pool = new Set();
    Object.values(skillCats).forEach((arr) => Array.isArray(arr) && arr.forEach((s) => !exclude.has(s) && pool.add(s)));
    ;['LangGraph','LangChain'].forEach((s)=>pool.add(s));
    const skills = Array.from(pool).filter((s) => skillDefinitions[s]);
    if (skills.length === 0) {
      return [
        "I help build agentic workflows for SMEs.",
        "Plotly charts, React, and clean UI — that’s my jam.",
        "Ask me about LPBF case studies and dashboards.",
      ];
    }
    const firstSentence = (t='') => (t.split('.')[0]||'').trim()+'.';
    return skills.slice(0, 40).map((s) => `🤖 ${s}: ${firstSentence(skillDefinitions[s])}`);
  }, [skillCats, skillDefinitions]);

  // Use cv-derived messages only (no external override)
  const messagePool = fallbackMessages;

  // Mark as mounted
  useEffect(() => { mounted.current = true; return () => { mounted.current = false; }; }, []);

  // Pointer tracking (normalized)
  useEffect(() => {
    const handleMove = (e) => {
      const hero = document.getElementById('hero');
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      pointerRef.current = {
        x: Math.max(-1, Math.min(1, dx)),
        y: Math.max(-1, Math.min(1, dy)),
      };
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  // Random saccades every 2–4s + micro jitter
  useEffect(() => {
    let saccadeTimer;
    const schedule = () => {
      const nx = (Math.random() * 2 - 1) * 0.6; // limit range
      const ny = (Math.random() * 2 - 1) * 0.5;
      saccadeTargetRef.current = { x: nx, y: ny };
      saccadeTimer = setTimeout(schedule, 2000 + Math.random() * 2000);
    };
    schedule();
    return () => clearTimeout(saccadeTimer);
  }, []);

  // Animation frame loop to smoothly blend pointer + saccade target
  useEffect(() => {
    const loop = () => {
      const pointer = pointerRef.current;
      const saccade = saccadeTargetRef.current;
      // Weight pointer more when active (distance from center > small threshold)
      const pointerMag = Math.hypot(pointer.x, pointer.y);
      const wPointer = pointerMag > 0.05 ? 0.55 : 0.25;
      const wSaccade = 1 - wPointer;
      const target = {
        x: pointer.x * wPointer + saccade.x * wSaccade,
        y: pointer.y * wPointer + saccade.y * wSaccade,
      };
      // Smooth toward target (lerp)
      setPupil((prev) => ({
        x: prev.x + (target.x - prev.x) * 0.12,
        y: prev.y + (target.y - prev.y) * 0.12,
      }));
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => rafRef.current && cancelAnimationFrame(rafRef.current);
  }, []);

  // Randomized blinking (2–5s interval)
  useEffect(() => {
    let blinkTimeout;
    const scheduleBlink = () => {
      blinkTimeout = setTimeout(() => {
        setBlinking(true);
        setTimeout(() => setBlinking(false), 140); // blink duration
        scheduleBlink();
      }, 2000 + Math.random() * 3000);
    };
    scheduleBlink();
    return () => clearTimeout(blinkTimeout);
  }, []);

  // --- Behavior cycle: chained timeouts (no polling) ---
  useEffect(() => {
    let cancelled = false;

    const schedule = (delayMs) => {
      const to = setTimeout(() => startCycle(), delayMs);
      timeoutsRef.current.push(to);
    };

    const startCycle = () => {
      if (cancelled || !mounted.current) return;
      // Begin thinking
      setState('thinking');
      setShowThinking(true);

      const [minP, maxP] = pauseRangeMs;
      const pauseMs = Math.floor(minP + Math.random() * (maxP - minP));
      const thinkTimeout = setTimeout(() => {
        if (cancelled || !mounted.current) return;
        // Pick message
        let pick = '';
        if (messagePool.length > 0) {
          let idx = 0;
          if (messagePool.length === 1) {
            idx = 0;
          } else {
            let attempts = 0;
            do {
              idx = Math.floor(Math.random() * messagePool.length);
              attempts++;
            } while (idx === lastIndexRef.current && attempts < 5);
          }
          lastIndexRef.current = idx;
          pick = messagePool[idx];
        }
        if (!pick) { setShowThinking(false); setState('idle'); schedule(cycleEveryMs); return; }

        setMessage(pick);
        setShowThinking(false);
        setShowBubble(true);
        setState('talking');

        // Reading duration
        const words = pick.trim().split(/\s+/).filter(Boolean).length;
        const chars = pick.length;
        const wordTime = (words / 3) * 1000;
        const charTime = (chars / 14) * 1000;
        const base = Math.max(wordTime, charTime) + 900; // cushion
        const readingMs = Math.min(18000, Math.max(4500, base)); // ensure slightly longer minimum

        const talkTimeout = setTimeout(() => {
          if (cancelled) return;
            setShowBubble(false);
            setState('idle');
            // Enforce a clear gap before next cycle (cycleEveryMs)
            schedule(cycleEveryMs);
        }, readingMs);
        timeoutsRef.current.push(talkTimeout);
      }, pauseMs);
      timeoutsRef.current.push(thinkTimeout);
    };

    // Initial kick after short delay to show first message promptly
    schedule(1000); // 1s initial delay

    return () => { cancelled = true; };
  }, [messagePool, pauseRangeMs, cycleEveryMs]);

  // Cleanup any timeouts on unmount
  useEffect(() => () => {
    timeoutsRef.current.forEach((t) => clearTimeout(t));
    timeoutsRef.current = [];
  }, []);

  const robotClass = useMemo(() => `robot stationary ${state}`, [state]);
  // ASCII mouth frames restricted to _, * and ) symbols
  const idleFrame = '__';
  const thinkingFrame = '*_)'; // conveys processing look
  const talkingFrames = useMemo(() => [
    '__',
    '_)_',
    '_))',
    '*_)',
    '*)',
    '_)',
    '_*_', // stylized mid-open
  ].filter((v,i,a)=>a.indexOf(v)===i), []);
  const [mouthFrame, setMouthFrame] = useState(idleFrame);

  // Drive mouth animation based on state
  useEffect(() => {
    let interval;
    if (state === 'thinking') {
      setMouthFrame(thinkingFrame);
    } else if (state === 'talking') {
      // animated cycling through frames
      let idx = 0;
      interval = setInterval(() => {
        idx = (idx + 1) % talkingFrames.length;
        setMouthFrame(talkingFrames[idx]);
      }, 120 + Math.random()*60);
    } else { // idle
      setMouthFrame(idleFrame);
    }
    return () => interval && clearInterval(interval);
  }, [state, idleFrame, thinkingFrame, talkingFrames]);

  return (
  <div className="robot-container robot-fixed">
      {/* Thinking indicator */}
      {showThinking && (
        <div className="speech-bubble typing">
          <div className="typing-dots" aria-label="thinking">
            <span></span><span></span><span></span>
          </div>
          <div className="bubble-arrow" />
        </div>
      )}

      {/* Message bubble */}
      {showBubble && (
        <div className="speech-bubble">
          <div className="bubble-content" role="status" aria-live="polite" aria-atomic="true">{message}</div>
          <div className="bubble-arrow" />
        </div>
      )}

      {/* Robot */}
    <div className={robotClass} style={{ '--pupil-x': `${pupil.x * 3}px`, '--pupil-y': `${pupil.y * 3}px` }}>
        {/* Head + antenna */}
        <div className="robot-head">
      <div className="head-glow" aria-hidden="true" />
          <div className="antenna">
            <div className="antenna-stem" />
            <div className="antenna-tip" />
          </div>
          <div className={`robot-eye left-eye ${state === 'thinking' ? 'thinking' : ''} ${blinking ? 'blinking' : ''}`}><span className="pupil" /></div>
          <div className={`robot-eye right-eye ${state === 'thinking' ? 'thinking' : ''} ${blinking ? 'blinking' : ''}`}><span className="pupil" /></div>
          <div className={`robot-mouth ascii-mouth ${state}`} aria-hidden="true">{mouthFrame}</div>
        </div>

        {/* Neck */}
        <div className="robot-neck" />

        {/* Torso */}
        <div className="robot-body">
          <div className="robot-panel">
            <div className="panel-line" />
            <div className="panel-line short" />
          </div>
          <div className="robot-chest-light" />
        </div>

        {/* Arms (shoulder → upper → elbow → forearm → claw) */}
        <div className="robot-shoulder left-shoulder">
          <div className="upper-arm">
            <div className="elbow" />
            <div className="forearm">
              <div className="claw">
                <span className="pincer" />
                <span className="pincer" />
              </div>
            </div>
          </div>
        </div>
        <div className="robot-shoulder right-shoulder">
          <div className="upper-arm">
            <div className="elbow" />
            <div className="forearm">
              <div className="claw">
                <span className="pincer" />
                <span className="pincer" />
              </div>
            </div>
          </div>
        </div>

  {/* No legs in stationary variant */}
      </div>
    </div>
  );
};

export default AnimatedRobot;