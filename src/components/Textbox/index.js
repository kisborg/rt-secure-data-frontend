import styled from 'styled-components';

const StyledTextArea = styled.textarea`
  text-align: left;
  color: #474b4f;
  border: none;
  font-size: 1.2em;
  resize: none;
  width: 100%;
  max-width: 800px;
  min-width: 400px;
  height: 400px;
  outline: none;
  border-radius: 6px 6px 0 0;
  padding: 8px 10px;
  margin-bottom: 4px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
  background: rgb(39,40,34);
  color: #D0D0D0;
  padding: 15px 20px;
`;

const TextBox = (props) => <StyledTextArea {...props} placeholder="Type your message here..." />

export default TextBox;