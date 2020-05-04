import React from 'react';

import clsx from 'clsx';


const Modal = ({ children, visible = false, ...props }) =>
{
  const handleVisibilityChange = visible =>
  {
    props.onVisibilityChange
    && props.onVisibilityChange(visible);
  };

  return (
    <div className={clsx('modal-component', visible && 'visible')}>
      <div className="click-shield"/>
      <button
        className="action-close"
        onClick={(event) => handleVisibilityChange(!visible)}
      />
      <div className="modal-content">
        {children}
      </div>
    </div>
  );
};

export default Modal;