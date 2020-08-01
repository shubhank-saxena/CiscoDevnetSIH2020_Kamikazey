import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  background: #2980b9; /* fallback for old browsers */
`;
export const SubContainer = styled.div`
  display: flex;
  width: 60vw;
  height: 60vh;
  justify-content: space-between;
  align-items: center;
  background: white;
  overflow: hidden;
  box-shadow: 0 2px 1px rgba(0, 0, 0, 0.09), 0 4px 2px rgba(0, 0, 0, 0.09),
    0 8px 4px rgba(0, 0, 0, 0.09), 0 16px 8px rgba(0, 0, 0, 0.09),
    0 32px 16px rgba(0, 0, 0, 0.09);
  .form {
    flex: 1;
    margin: 30px;
  }
`;

export const Text = styled.div`
  background: #2980b9;
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    font-weight: 900;
    text-transform: uppercase;
    margin: 0;
  }
  img {
    width: 80%;
    margin: auto;
  }
`;
