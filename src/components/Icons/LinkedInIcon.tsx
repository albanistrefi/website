import React from 'react';
import { BaseIcon } from './BaseIcon';

interface IconProps {
  className?: string;
  size?: number | string;
  variant?: 'default' | 'social' | 'utility';
  'aria-label'?: string;
}

export const LinkedInIcon: React.FC<IconProps> = ({
  className,
  size = '1.25rem',
  variant = 'social',
  'aria-label': ariaLabel = 'LinkedIn'
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
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9"></rect>
        <circle cx="4" cy="4" r="2"></circle>
      </svg>
    </BaseIcon>
  );
};
