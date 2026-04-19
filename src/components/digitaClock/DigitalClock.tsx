'use client';
import { useCallback, useEffect, useState } from 'react';
import styles from './clock.module.css';

const DATE_OPTIONS: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
};

export default function DigitalClock() {
  const getCurrentTime = useCallback(() => {
    const now = new Date();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    let hours: number | string = now.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    hours = hours.toString().padStart(2, '0');

    return `${hours}:${minutes}:${seconds} ${ampm}`;
  }, []);

  const getCurrentDate = useCallback(() => {
    return new Date().toLocaleDateString(undefined, DATE_OPTIONS);
  }, []);

  const [time, setTime] = useState("");
  const [mounted, setMounted] = useState(false);


  useEffect(() => {
    setMounted(true);
    setTime(getCurrentTime());
    const timerId = setInterval(() => {
      setTime(getCurrentTime());
    }, 1000);

    return () => clearInterval(timerId);
  }, [getCurrentTime]);

  if (!mounted) return null;

  return (
    <div className={styles.container}>
      <div className={styles.clock}>{time}</div>
      <div className={styles.date}>{getCurrentDate()}</div>
    </div>
  );
}
