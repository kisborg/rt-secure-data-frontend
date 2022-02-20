import { useRef } from 'react';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import { ToastContainer, toast, Zoom } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const StyledContainer = styled.div`
  margin-top: 30px;
  max-width: 800px;
  min-width: 200px;
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  & #urlField {
    flex: 1;
    margin-right: 5px;
    text-overflow: ellipsis;
    background: rgb(39,40,34);
    color: #D0D0D0;
    border-style: solid;
    border-width: 1px;
    border-color: white;
    border-radius: 5px;
    padding: 0px 10px;
  }

  & .btn:focus {
    box-shadow: none !important;
  }
`

const UrlField = (props) => {
  const toastOptions = {
    position: 'bottom-right',
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  const toastId = useRef(null);
  const dismiss = () =>  toast.dismiss(toastId.current);
  const notify = () => toastId.current = toast.success('URL Copied to Clipboard!', toastOptions)
  const copyToClipBoard = () => {
    const urlField = document.getElementById("urlField");
    navigator.clipboard.writeText(urlField.value);
    dismiss();
    toast.clearWaitingQueue();
    notify();
  }
  return (
  <StyledContainer>
    <input id="urlField" type="text" readOnly value={`${window.location.origin}/receiver/${props.location}`} />
    <Button onClick={copyToClipBoard} variant="outline-light">Share URL</Button>
    <ToastContainer transition={Zoom} />
  </StyledContainer>
  )
}

export default UrlField;