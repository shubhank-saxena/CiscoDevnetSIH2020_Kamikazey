import styled, { css } from 'styled-components';

export const Flex = styled.div`
  display: flex;
	align-items:center;
	${props =>
    props.spaceBetween &&
    css`
      justify-content: space-between;
    `}
	${props =>
    props.centered &&
    css`
      justify-content: center;
    `}
	${props =>
    props.noCenter &&
    css`
      align-items: flex-start;
    `}

	${props =>
    props.flexEnd &&
    css`
      justify-content: flex-end;
    `}
	${props =>
    props.alignTop &&
    css`
      align-items: flex-start;
    `}
	${props =>
    props.noHeight &&
    css`
      height: 0;
    `}
`;

export const HugeHeading = styled.h1`
  font-size: 32px;
  font-weight: 900;
  margin-bottom: 2em;
  padding: 0;
`;
export const Heading = styled.h1`
  font-size: 20px;
  font-weight: 800;
  margin: 0;
  padding: 0;
`;
export const SubHeading = styled.h2`
  font-size: 16px;
  font-weight: 500;
  margin: 0;
  padding: 0;
`;
export const Paragraph = styled.div`
  font-size: 16px;
  margin: 0;
  padding: 0;
  font-weight: 300;
`;
