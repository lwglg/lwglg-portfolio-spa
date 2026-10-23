'use client';

import type { ReactNode, HTMLAttributes, ElementType } from 'react';
import { useInView } from '@/hooks/useInView';
import { cn } from '@/lib/utils';

export type ScrollAnimation =
  | 'fade-up'
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'
  | 'fade'
  | 'scale'
  | 'neo-pop';

interface AnimateOnScrollProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  animation?: ScrollAnimation;
  /** Stagger delay in ms (useful in lists) */
  delay?: number;
  /** Animation duration in ms */
  duration?: number;
  as?: ElementType;
}

const animationClass: Record<ScrollAnimation, string> = {
  'fade-up': 'scroll-anim-fade-up',
  'fade-down': 'scroll-anim-fade-down',
  'fade-left': 'scroll-anim-fade-left',
  'fade-right': 'scroll-anim-fade-right',
  fade: 'scroll-anim-fade',
  scale: 'scroll-anim-scale',
  'neo-pop': 'scroll-anim-neo-pop',
};

export function AnimateOnScroll({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 500,
  className,
  as: Tag = 'div',
  style,
  ...rest
}: AnimateOnScrollProps) {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <Tag
      ref={ref}
      className={cn(
        'scroll-anim',
        animationClass[animation],
        inView && 'scroll-anim-visible',
        className,
      )}
      style={{
        ...style,
        transitionDelay: delay ? `${delay}ms` : undefined,
        transitionDuration: `${duration}ms`,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
