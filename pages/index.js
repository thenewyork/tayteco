import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getDashboard, getProjects } from '../lib/datocms';
import ProjectGrid from '../components/blocks/ProjectGrid';
import ProjectList from '../components/blocks/ProjectList';

const PageWrapper = styled.div`
	background: var(--colour-black);
	scroll-snap-align: ${(props) => props.$isReady ? 'end' : 'unset'};
`;

const PageWrapperInner = styled.div`
	padding-top: 32px;
	padding-left: ${(props) => props.$gridIsActive ? '0' : '16px'};
	padding-right: ${(props) => props.$gridIsActive ? '16px' : '0'};
	display: flex;
	column-gap: 16px;
	height: calc(100vh - 55px);
`;

const Page = ({ data, projects, setDashboardData, setCursorLoading }) => {
	const [gridIsActive, setGridIsActive] = useState(true);
	const [isReady, setIsReady] = useState(false);

	const handleViewSwitchLogic = (isMouseOver, viewToOpen) => {
		const timer = setTimeout(() => {
			viewToOpen === 'grid' ? setGridIsActive(true) : setGridIsActive(false);
		}, 1300);

		if (!isMouseOver) {
			clearTimeout(timer);
			setCursorLoading(false);
		} else {
			setCursorLoading(true);
		}
	};

	const handleGridMouseOverOut = (action) => {
		if (gridIsActive) return;

		if (action === 'over') {
			handleViewSwitchLogic(true, 'grid');
		} else {
			handleViewSwitchLogic(false, 'grid');
		}
	};

	const handleListMouseOverOut = (action) => {
		if (!gridIsActive) return;

		if (action === 'over') {
			handleViewSwitchLogic(true, 'list');
		} else {
			handleViewSwitchLogic(false, 'list');
		}
	};

	useEffect(() => {
		setCursorLoading(false);
	}, [gridIsActive]);
	

	useEffect(() => {
		setDashboardData(data?.dashboard);

		const timer = setTimeout(() => {
			setIsReady(true);

			return () => {
				clearTimeout(timer);
			}
		}, 500);
	}, [data]);
	
	return (
		<PageWrapper $isReady={isReady}>
			<PageWrapperInner $gridIsActive={gridIsActive}>
				<ProjectList
					data={projects?.allProjects}
					isActive={!gridIsActive}
					setGridIsActive={setGridIsActive}
					handleListIsMouseOver={() => handleListMouseOverOut('over')}
					handleListIsMouseOut={() => handleListMouseOverOut('out')}
				/>
				<ProjectGrid
					data={projects?.allProjects}
					isActive={gridIsActive}
					setGridIsActive={setGridIsActive}
					handleGridIsMouseOver={() => handleGridMouseOverOut('over')}
					handleGridIsMouseOut={() => handleGridMouseOverOut('out')}
				/>
			</PageWrapperInner>
		</PageWrapper>
	)
};

export async function getStaticProps({ params }) {
	const data = await getDashboard();
	const projects = await getProjects();

	return {
		props: {
			data,
			projects,
		},
	};
}

export default Page;
