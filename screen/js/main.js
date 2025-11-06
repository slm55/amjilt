// main.js - entry module
import { startClock } from './time.js';
import { startWeather } from './weather.js';
import { RotatingMessages } from './messages.js';

const rotating = new RotatingMessages({
  targetId: 'rotatingMessage',
  intervalMs: 25000,
  messages: [
    "Think creatively. Act boldly. Learn continuously.",
    "Innovation starts with curiosity and courage.",
    "Empowering young minds for a global future.",
    "Small steps today — big achievements tomorrow.",
    "Collaboration. Creativity. Commitment.",
    "Exploring ideas through science, design, and technology.",
    "Every lesson is a step toward leadership.",
    "Guided by innovation, inspired by excellence.",
    "Grow. Create. Lead.",
    "Where intelligence meets imagination."
  ]
});

document.addEventListener('DOMContentLoaded', () => {
  // Initialize clock/date
  startClock({
    timeId: 'time',
    dateId: 'date',
    locale: 'en-GB', // show weekday and long format; you can change to 'ru'/'kk'
    timezone: 'Asia/Almaty'
  });

  // Initialize weather (Almaty coordinates)
  startWeather({
    targetTempId: 'weatherTemp',
    targetIconId: 'weatherIcon',
    latitude: 43.238949,
    longitude: 76.889709,
    timezone: 'Asia/Almaty'
  });

  // Start rotating messages
  rotating.start();

  // Optional: pause animations on low-power devices (reduced motion)
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // reduce transitions
    document.documentElement.style.setProperty('animation-duration', '0.1s');
  }
});
