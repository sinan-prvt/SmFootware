import React from 'react';
import '../../styles/Statement.css';
import { useScrollProgress } from '../../hooks/useMotion';

const TEXT =
  'Every pair at Footonia is picked for comfort, built for style and priced to move — from street-ready sneakers to boardroom-sharp formals.';

function Statement() {
  const ref = useScrollProgress();
  const words = TEXT.split(' ');

  return (
    <section className="statement" ref={ref}>
      <span className="eyebrow">Why Footonia</span>
      <p className="statement-text">
        {words.map((word, i) => (
          <span key={i} className="statement-word" style={{ '--w': i / words.length }}>
            {word}{' '}
          </span>
        ))}
      </p>
    </section>
  );
}

export default Statement;
