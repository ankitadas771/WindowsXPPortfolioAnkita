// A clean native Web Audio API synthesizer for retro action sounds.
// Persists preference to local storage and exports simple audio actions.

let audioCtx: AudioContext | null = null;
let soundEnabled = true;

// Load initial state from local storage safely
try {
  const saved = localStorage.getItem('portfolio_audio_sound_enabled');
  if (saved !== null) {
    soundEnabled = saved === 'true';
  }
} catch (e) {
  console.warn('Could not read sound preference from localStorage', e);
}

export function isSoundEnabled(): boolean {
  return soundEnabled;
}

export function setSoundEnabled(enabled: boolean): void {
  soundEnabled = enabled;
  try {
    localStorage.setItem('portfolio_audio_sound_enabled', String(enabled));
  } catch (e) {
    console.warn('Could not save sound preference to localStorage', e);
  }
}

function getAudioContext(): AudioContext | null {
  if (!audioCtx) {
    try {
      // Create lazy instance of native Audio Context
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtxClass) {
        audioCtx = new AudioCtxClass();
      }
    } catch (e) {
      console.warn('Web Audio API not supported in this browser environment', e);
    }
  }
  
  // Resume context if suspended (browser security policy)
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch((err) => console.warn('Could not resume audio context:', err));
  }
  
  return audioCtx;
}

// Global play sound utility
function playSynthNote(
  freq: number,
  duration: number,
  type: OscillatorType = 'sine',
  gainVal = 0.1,
  delay = 0
) {
  if (!soundEnabled) return;
  
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gainNode = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);

  // Set gain node envelope
  gainNode.gain.setValueAtTime(0, ctx.currentTime + delay);
  gainNode.gain.linearRampToValueAtTime(gainVal, ctx.currentTime + delay + 0.05);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + delay + duration);

  osc.connect(gainNode);
  gainNode.connect(ctx.destination);

  osc.start(ctx.currentTime + delay);
  osc.stop(ctx.currentTime + delay + duration);
}

// 1. Play the Classic Windows XP boot/startup sound mockup
export function playStartupSound() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const playVoice = (freq: number, startDelay: number, attack: number, hold: number, decay: number, peakVolume: number) => {
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    // Warm triangle oscillators for base notes, sine for high harmonics
    osc.type = freq < 300 ? 'triangle' : 'sine';
    osc.frequency.setValueAtTime(freq, now + startDelay);

    gainNode.gain.setValueAtTime(0, now + startDelay);
    gainNode.gain.linearRampToValueAtTime(peakVolume, now + startDelay + attack);
    gainNode.gain.setValueAtTime(peakVolume, now + startDelay + attack + hold);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + startDelay + attack + hold + decay);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(now + startDelay);
    osc.stop(now + startDelay + attack + hold + decay + 0.2);
  };

  // Harmonious warm major/ninth backing chord (Gb major 9 / Db base vibe)
  // Plays simultaneously, fading in slowly
  const chord = [138.59, 207.65, 277.18, 349.23, 415.30, 523.25, 698.46]; // Db3, Ab3, Db4, F4, Ab4, C5, F5
  chord.forEach((freq, index) => {
    // Stagger slightly and blend volumes
    const volume = 0.035 - (index * 0.003);
    playVoice(freq, 0, 1.2, 1.5, 2.0, Math.max(0.01, volume));
  });

  // Beautiful bell-like cascading chime melody (Bb4, Eb5, Bb5, F5)
  const chimes = [466.16, 622.25, 932.33, 698.46];
  const chimeDelays = [0.6, 0.9, 1.2, 1.6];
  
  chimes.forEach((freq, idx) => {
    playVoice(freq, chimeDelays[idx], 0.1, 0.4, 1.5, 0.04);
  });
}

// 2. Play window opened sound (Rising sweet double chime)
export function playWindowOpenSound() {
  playSynthNote(392.00, 0.4, 'sine', 0.08, 0); // G4
  playSynthNote(523.25, 0.5, 'sine', 0.1, 0.08); // C5
  playSynthNote(659.25, 0.6, 'sine', 0.08, 0.16); // E5
}

// 3. Play window closed sound (Descending soft tone)
export function playWindowCloseSound() {
  playSynthNote(523.25, 0.3, 'sine', 0.06, 0); // C5
  playSynthNote(392.00, 0.4, 'sine', 0.06, 0.07); // G4
  playSynthNote(329.63, 0.4, 'sine', 0.05, 0.14); // E4
}

// 4. Play window minimized sound (Short pitch glide down)
export function playWindowMinimizeSound() {
  playSynthNote(440.00, 0.25, 'triangle', 0.07, 0); // A4
  playSynthNote(293.66, 0.35, 'triangle', 0.06, 0.06); // D4
}

// 5. Play window maximized sound (Short pitch glide up)
export function playWindowMaximizeSound() {
  playSynthNote(293.66, 0.22, 'triangle', 0.06, 0); // D4
  playSynthNote(440.00, 0.35, 'triangle', 0.07, 0.06); // A4
}

// 6. Play start menu toggle sound (Soft pleasant feedback)
export function playStartMenuSound() {
  playSynthNote(415.30, 0.12, 'sine', 0.08, 0); // Ab4
  playSynthNote(622.25, 0.2, 'sine', 0.06, 0.04); // Eb5
}

// 7. Play generic click or interaction sound (Tiny discrete click sound)
export function playInterfaceClickSound() {
  playSynthNote(800.00, 0.05, 'sine', 0.03, 0);
}

// 8. Play error warning or alert chimes
export function playErrorSound() {
  playSynthNote(150.00, 0.15, 'triangle', 0.12, 0);
  playSynthNote(150.00, 0.15, 'triangle', 0.12, 0.05);
}
