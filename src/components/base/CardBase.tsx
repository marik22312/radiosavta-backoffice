import styled from 'styled-components';

export const CardBase = styled.section`
	background-color: #fafafa;
	border-radius: 5px;
	box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.25);
	margin: 15px;
`;

export const CardHeader = styled.div`
	color: #000000;
	padding-top: 15px;
	padding-right: 15px;
	padding-left: 15px;
`;

export const CardTitle = styled.h2`
	font-size: 30px;
	text-transform: capitalize;
`;

export const CardContent = styled.div`
	padding-left: 15px;
`;