import { cloneElement, isValidElement } from 'react';
import { useReveal } from '../hooks/useReveal';

/**
 * Wraps children in the shared fade-up reveal. `delay` drives the
 * cascade stagger used by grids and lists.
 */
export default function Reveal({
  children,
  as: Tag = 'div',
  delay = 0,
  variant = '',
  className = '',
  threshold = 0.15,
  style,
  ...rest
}) {
  const [ref, revealed] = useReveal({ threshold });

  return (
    <Tag
      ref={ref}
      data-revealed={revealed}
      className={`reveal ${variant} ${className}`.trim()}
      style={{ '--reveal-delay': `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** A single line of type that rises out of an overflow mask. */
export function RevealLine({ children, delay = 0, as: Tag = 'span', className = '' }) {
  const [ref, revealed] = useReveal({ threshold: 0.3 });
  return (
    <Tag
      ref={ref}
      data-revealed={revealed}
      className={`reveal-line ${className}`.trim()}
      style={{ '--reveal-delay': `${delay}ms` }}
    >
      <span>{children}</span>
    </Tag>
  );
}

/** Reveals an existing element without adding a wrapper node. */
export function RevealChild({ children, delay = 0 }) {
  const [ref, revealed] = useReveal();
  if (!isValidElement(children)) return children;
  return cloneElement(children, {
    ref,
    'data-revealed': revealed,
    className: `reveal ${children.props.className || ''}`.trim(),
    style: { '--reveal-delay': `${delay}ms`, ...children.props.style },
  });
}
