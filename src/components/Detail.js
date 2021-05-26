import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import db from '../firebase';
import { useParams } from 'react-router-dom';

const Detail = () => {
	const { id } = useParams();
	const [movie, setMovie] = useState();
	useEffect(() => {
		db.collection('movies')
			.doc(id)
			.get()
			.then((doc) => {
				if (doc.exists) {
					setMovie(doc.data());
				} else {
				}
			});
	}, [id]);
	return (
		<Container>
			{movie && (
				<>
					<Background>
						<img src={movie.backgroundImg} alt="background" />
					</Background>
					<ImageTitle>
						<img src={movie.titleImg} alt="movie-logo" />
					</ImageTitle>
					<Controls>
						<PlayButton>
							<img src="/images/play-icon-black.png" alt="play-button" />
							<span>PLAY</span>
						</PlayButton>
						<TrailerButton>
							<img src="/images/play-icon-white.png" alt="trailerButton" />
							<span>Trailer</span>
						</TrailerButton>
						<AddButton>
							<span>+</span>
						</AddButton>
						<GroupWatchButton>
							<img src="/images/group-icon.png" alt="" />
						</GroupWatchButton>
					</Controls>
					<Subtitle>{movie.subTitle}</Subtitle>
					<Description>{movie.description}</Description>
				</>
			)}
		</Container>
	);
};
const Container = styled.div`
	min-height: calc(100vh - 70px);
	padding: 0 calc(3.5vw + 5px);
	position: relative;
`;
const Background = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	z-index: -1;
	opacity: 0.8;
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;
const ImageTitle = styled.div`
	width: 35vw;
	min-height: 170px;
	min-width: 200px;
	margin-top: 80px;
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;
const Controls = styled.div`
	display: flex;
	align-items: center;
`;
const PlayButton = styled.button`
	border-radius: 4px;
	font-size: 15px;
	display: flex;
	align-items: center;
	height: 56px;
	border: none;
	background-color: rgb(249, 249, 249);
	padding: 0px 24px;
	margin-right: 22px;
	letter-spacing: 1.8px;
	cursor: pointer;
	&:hover {
		background: rgb(198, 198, 198);
	}
`;
const TrailerButton = styled(PlayButton)`
	background: rgba(0, 0, 0, 0.3);
	border: 1px solid rgb(249, 249, 249);
	color: rgb(249, 249, 249);
	text-transform: uppercase;
`;
const AddButton = styled.button`
	height: 44px;
	width: 44px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	border: white;
	background: rgba(0, 0, 0, 0.6);
	cursor: pointer;
	margin-right: 16px;
	span {
		font-size: 30px;
		color: white;
	}
	&:hover {
		background: rgb(198, 198, 198);
	}
`;
const GroupWatchButton = styled(AddButton)`
	background-color: black;
`;
const Subtitle = styled.div`
	color: rgb(249, 249, 249);
	font-size: 15px;
	min-height: 20px;
	margin-top: 26px;
`;
const Description = styled.div`
	line-height: 1.4;
	font-size: 20px;
	margin-top: 16px;
	color: rgb(249, 249, 249);
	max-width: 700px;
`;
export default Detail;