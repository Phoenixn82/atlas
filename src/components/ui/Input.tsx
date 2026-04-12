'use client'

import { forwardRef } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        <label
          className="text-xs uppercase tracking-widest font-mono"
          style={{ color: 'var(--atlas-gray-500)' }}
        >
          {label}
        </label>
        <input
          ref={ref}
          className={`w-full bg-transparent py-3 font-mono text-base transition-interactive focus:outline-none ${className}`}
          style={{
            borderBottom: error
              ? '1px solid var(--atlas-red)'
              : '1px solid var(--atlas-black)',
            color: 'var(--atlas-black)',
          }}
          onFocus={e => {
            e.currentTarget.style.borderBottom = '2px solid var(--atlas-red)'
          }}
          onBlur={e => {
            e.currentTarget.style.borderBottom = error
              ? '1px solid var(--atlas-red)'
              : '1px solid var(--atlas-black)'
          }}
          {...props}
        />
        {error && (
          <span
            className="text-xs font-mono uppercase tracking-wider"
            style={{ color: 'var(--atlas-red)' }}
          >
            {error}
          </span>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        <label
          className="text-xs uppercase tracking-widest font-mono"
          style={{ color: 'var(--atlas-gray-500)' }}
        >
          {label}
        </label>
        <textarea
          ref={ref}
          rows={5}
          className={`w-full bg-transparent py-3 font-mono text-base resize-none transition-interactive focus:outline-none ${className}`}
          style={{
            borderBottom: error
              ? '1px solid var(--atlas-red)'
              : '1px solid var(--atlas-black)',
            color: 'var(--atlas-black)',
          }}
          onFocus={e => {
            e.currentTarget.style.borderBottom = '2px solid var(--atlas-red)'
          }}
          onBlur={e => {
            e.currentTarget.style.borderBottom = error
              ? '1px solid var(--atlas-red)'
              : '1px solid var(--atlas-black)'
          }}
          {...props}
        />
        {error && (
          <span
            className="text-xs font-mono uppercase tracking-wider"
            style={{ color: 'var(--atlas-red)' }}
          >
            {error}
          </span>
        )}
      </div>
    )
  }
)
Textarea.displayName = 'Textarea'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  error?: string
  options: { value: string; label: string }[]
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        <label
          className="text-xs uppercase tracking-widest font-mono"
          style={{ color: 'var(--atlas-gray-500)' }}
        >
          {label}
        </label>
        <select
          ref={ref}
          className={`w-full bg-transparent py-3 font-mono text-base transition-interactive appearance-none focus:outline-none ${className}`}
          style={{
            borderBottom: error
              ? '1px solid var(--atlas-red)'
              : '1px solid var(--atlas-black)',
            color: 'var(--atlas-black)',
          }}
          onFocus={e => {
            e.currentTarget.style.borderBottom = '2px solid var(--atlas-red)'
          }}
          onBlur={e => {
            e.currentTarget.style.borderBottom = error
              ? '1px solid var(--atlas-red)'
              : '1px solid var(--atlas-black)'
          }}
          {...props}
        >
          <option value="">Select a service</option>
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && (
          <span
            className="text-xs font-mono uppercase tracking-wider"
            style={{ color: 'var(--atlas-red)' }}
          >
            {error}
          </span>
        )}
      </div>
    )
  }
)
Select.displayName = 'Select'
