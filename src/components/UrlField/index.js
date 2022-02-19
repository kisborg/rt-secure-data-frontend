import { Button } from 'react-bootstrap';
import styled from 'styled-components';

const StyledContainer = styled.div`
  width: 100%;
  max-width: 800px;
  min-width: 400px;
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  & #urlField {
    flex: 1;
    margin-right: 5px;
  }
`

const UrlField = (props) => {
  const copyToClipBoard = () => {
    const urlField = document.getElementById("urlField");
    navigator.clipboard.writeText(urlField.value);
  }
  return (
  <StyledContainer>
    <input id="urlField" type="text" readOnly value={`${window.location.origin}/receiver/${props.location}`} />
    <Button onClick={copyToClipBoard} variant="outline-light">Share URL</Button>
  </StyledContainer>
  )
}

export default UrlField;