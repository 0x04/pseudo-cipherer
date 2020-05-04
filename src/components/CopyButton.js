import React from 'react';

class CopyButton extends React.Component
{
  static defaultProps = {
    value: ''
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
    return (
      <button
        className="action action-copy"
        onClick={() => this.copyToClipboard(this.props.value)}>
        Copy
      </button>
    );
  }
}

export default CopyButton;
