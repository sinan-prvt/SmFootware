import React, { useEffect, useRef, useState } from 'react';
import '../../styles/App.css';

/**
 * ScrollReveal Component
 * Wraps children and animates them into view when they intersect with the viewport.
 * 
 * Props:
 * @param {number} delay - Optional delay in seconds
 * @param {number} threshold - How much of the element must be visible (0.0 to 1.0)
 * @param {string} className - Additional CSS classes
 * @param {boolean} once - Should the animation only happen once? (Default: true)
 */
const ScrollReveal = ({ 
  children, 
  delay = 0, 
  threshold = 0.1, 
  className = '', 
  once = true 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, [once, threshold]);

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${isVisible ? 'visible' : ''} ${className}`}
      style={{ 
        transitionDelay: `${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
