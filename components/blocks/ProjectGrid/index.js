import styled from 'styled-components';
import Grid from '../../common/Grid';
import ProjectGridCard from '../../elements/ProjectGridCard';

const ProjectGridWrapper = styled.div`
	width: ${(props) => props.$isActive ? 'calc(90vw)' : 'calc(10vw)'};
	overflow: hidden;
	opacity: ${(props) => props.$isActive ? 1 : 0.33};

	transition: all 500ms ease;

	.grid {
		row-gap: 16px;
	}
`;

const ProjectGridInner = styled.div`
	min-width: calc(90vw - 32px);
	max-width: calc(90vw - 32px);
	height: calc(100vh - 55px);
	overflow-y: ${(props) => props.$isActive ? 'auto' : 'none'};
	pointer-events: ${(props) => props.$isActive ? 'all' : 'none'};
	padding-bottom: 60px;
`;

const ProjectGrid = ({
		data,
		isActive,
		handleGridIsMouseOver,
		handleGridIsMouseOut,
		setGridIsActive
	}) => {
	const hasData = data.length > 0;

	return (
		<ProjectGridWrapper
			$isActive={isActive}
			onMouseOver={() => handleGridIsMouseOver()}
			onMouseOut={() => handleGridIsMouseOut()}
			onClick={() => setGridIsActive(true)}
			className={!isActive ? 'cursor-link' : ''}
		>
			<ProjectGridInner $isActive={isActive}>
				<Grid>
					{hasData && data.map((item, index) => (
						<ProjectGridCard data={item} key={index} />
					))}
					<ProjectGridCard
						data={false}
						key={'forthcoming-card'}
						forthcoming={true}
					/>
				</Grid>
			</ProjectGridInner>
		</ProjectGridWrapper>
	);
};

export default ProjectGrid;
