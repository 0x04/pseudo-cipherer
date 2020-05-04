import React from 'react';
import clsx from 'clsx';

class CopyButton extends React.Component
{
  static defaultProps = {
    label: 'Copy',
    value: '',
    className: null,
    function: null,
  }

  copyToClipboard(text)
  {
    const previousFocus = window.activeElement;
    const textarea = document.createElement('textarea');
    textarea.className = 'copy-button-helper';
    textarea.value = text;

    document.body.appendChild(textarea);

    textarea.select();
    // For mobile devices
    textarea.setSelectionRange(0, textarea.value.length);

    document.execCommand('copy');

    textarea.remove();

    previousFocus && previousFocus.focus();
  }

  render()
  {
    const handleClick = () =>
    {
      if (typeof this.props.function === 'function')
      {
        this.copyToClipboard(this.props.function(this.props.value));
      }
      else this.copyToClipboard(this.props.value)
    };

    return (
      <button
        className={clsx('action', 'action-copy', this.props.className)}
        onClick={handleClick}>
        {this.props.label}
      </button>
    );
  }
}

export default CopyButton;
