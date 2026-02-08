import React from 'react';
import { BaseIcon } from './BaseIcon';

interface IconProps {
  className?: string;
  size?: number | string;
  variant?: 'default' | 'social' | 'utility';
  'aria-label'?: string;
}

export const GitHubIcon: React.FC<IconProps> = ({
  className,
  size = '1.25rem',
  variant = 'social',
  'aria-label': ariaLabel = 'GitHub'
}) => {
  return (
    <BaseIcon className={className} size={size} variant={variant} aria-label={ariaLabel}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3.3-.4 6.8-1.6 6.8-7a5.4 5.4 0 0 0-1.3-3 5 5 0 0 0-.1-3.8s-1.7-.4-4.4 1.5a13.4 13.4 0 0 0-6 0C6.3.6 4.6 1 4.6 1a5 5 0 0 0-.1 3.8 5.4 5.4 0 0 0-1.3 3c0 5.4 3.5 6.6 6.8 7A4.8 4.8 0 0 0 9 18v4" />
        <path d="M9 18c-4.5 2-5-2-7-2" />
      </svg>
    </BaseIcon>
  );
};
