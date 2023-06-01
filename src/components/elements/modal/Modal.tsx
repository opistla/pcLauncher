import React, { forwardRef, useState, useImperativeHandle } from 'react';
import { Button, Dialog, DialogActions, DialogContent,
  DialogTitle, DialogProps
} from '@mui/material';

interface IModal {
  open: boolean
  title: string
  maxWidth: DialogProps['maxWidth']
  Content?: JSX.Element
  onConfirm?: () => void
  onCloseCallback?: () => void
}

const defaults: IModal = {
  open: false,
  title: 'Title',
  maxWidth: 'sm',
}

const Modal = forwardRef((props, ref) => {
  const [options, setOptions] = useState<IModal>(defaults);

  useImperativeHandle(ref, () => {
    return {
      show: onShow,
      close: onClose
    }
  });

  const onShow = (obj: IModal) => {
    setOptions({
      ...defaults,
      ...obj,
      open: true
    });
  }

  const onClose = () => {
    setOptions({
      ...options,
      open: false
    });
  };

  const { open, title, maxWidth, Content } = options;

  return (
    <div>
      <Dialog
        open={open}
        fullWidth
        maxWidth={maxWidth}
        onClose={onClose}
      >
        <DialogTitle>
          {title}
        </DialogTitle>
        <DialogContent dividers>
          {Content}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Disagree</Button>
          <Button onClick={onClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});

export default Modal;