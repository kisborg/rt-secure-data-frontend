import { Button } from 'react-bootstrap';
import styled from 'styled-components';

const StyledButton = styled(Button)`
  width: 300px;
  height: 120px;
  font-size: 30px;
  &.btn-secondary {
    background-color: rgb(39,40,34) !important;
    border: none !important;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px !important;
  }

  &.btn-secondary:hover {
    background-color: rgb(32,33,29) !important;
  }
`

const SessionButton = (props) => <StyledButton variant="secondary" size="lg" onClick={props.onClick}>Create Session</StyledButton>

export default SessionButton;
