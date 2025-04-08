import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  fullWidth = true,
  className = '',
  id,
  ...rest
}) => {
  // Generate random ID if not provided
  const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;
  
  // Base classes
  const inputWrapperClasses = `relative ${fullWidth ? 'w-full' : ''}`;
  
  // Input classes
  let inputClasses = 'block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200';
  
  // Add error styling
  if (error) {
    inputClasses += ' border-red-500 text-red-900 placeholder-red-300';
  } else {
    inputClasses += ' border-gray-300 text-gray-900 placeholder-gray-400';
  }
  
  // Add icon padding
  if (leftIcon) {
    inputClasses += ' pl-10';
  }
  if (rightIcon) {
    inputClasses += ' pr-10';
  }
  
  // Add custom classes
  if (className) {
    inputClasses += ` ${className}`;
  }
  
  return (
    <div className={inputWrapperClasses}>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
            {leftIcon}
          </div>
        )}
        <input id={inputId} className={inputClasses} {...rest} />
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-500">
            {rightIcon}
          </div>
        )}
      </div>
      {(error || helperText) && (
        <p className={`mt-1 text-sm ${error ? 'text-red-600' : 'text-gray-500'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
};

export default Input;