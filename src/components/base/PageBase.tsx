import styled from 'styled-components';

export const PageBase = styled.div`
	padding-left: 15px;
	padding-right: 15px;
	padding-top: 15px;
	background-color: #E6F9EE;
	height: 100%;
`;

export const PageHeader = styled.div`
	color: #000000;
	padding-right: 15px;
	padding-left: 15px;
	margin-bottom: 30px;
`;

export const PageTitle = styled.h1`
	font-size: 40px;
	text-transform: capitalize;
`;

export const PageContent = styled.main`
	overflow: visible;
	background-color: #fafafa;
	border-radius: 5px;
	min-height: 60%;
	box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.25);
	padding-top: 15px;
`;