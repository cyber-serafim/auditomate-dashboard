
import React, { useEffect, useRef } from 'react';

const MatrixBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Встановлюємо розмір канвасу відповідно до розміру вікна
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Символи для матричного дощу
    const chars = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    // Створюємо масив для капель дощу
    const columns = Math.ceil(canvas.width / 20); // ширина символів
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -100); // Розпочинаємо з різних позицій
    }

    // Функція анімації
    const draw = () => {
      // Напівпрозорий чорний фон для ефекту затухання
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Зелений колір тексту
      ctx.fillStyle = '#0F0';
      ctx.font = '15px monospace';

      // Проходимо по всіх символах
      for (let i = 0; i < drops.length; i++) {
        // Випадковий символ
        const text = chars[Math.floor(Math.random() * chars.length)];
        
        // Виводимо символ
        ctx.fillText(text, i * 20, drops[i] * 20);

        // Якщо дощ досягає кінця або випадково,
        // створюємо новий дощ зверху
        if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Переміщуємо каплі вниз
        drops[i]++;
      }

      // Викликаємо анімацію знову
      requestAnimationFrame(draw);
    };

    const animationId = requestAnimationFrame(draw);

    // Очищаємо анімацію коли компонент розмонтовується
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} className="matrix-bg" />;
};

export default MatrixBackground;
