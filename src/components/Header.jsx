import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Logo } from './UI';

const Header = () => {
	const [isFullScreen, setIsFullScreen] = useState(false);

	const { authData } = useSelector(({ auth }) => auth);

	function toggleFullScreen() {
		if (!document.fullscreenElement) {
			setIsFullScreen(true);
			document.documentElement.requestFullscreen();
		} else {
			if (document.exitFullscreen) {
				setIsFullScreen(false);
				document.exitFullscreen();
			}
		}
	}

	return (
		<header className="main__header">
			<div>
				<Logo />
				<h1>API-консолька</h1>
			</div>
			<div className="main__user-panel">
				<div>
					{authData.email} {authData.sublogin ? `: ${authData.sublogin}` : null}
				</div>
				<div>
					<Link to="/logout">
						<button>
							<span>Выйти</span>
							<svg
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<g opacity="0.8">
									<path
										d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M16 17L21 12L16 7"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M21 12H9"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</g>
							</svg>
						</button>
					</Link>
				</div>

				<button onClick={toggleFullScreen}>
					{isFullScreen ? (
						<svg
							width="20"
							height="20"
							viewBox="0 0 20 20"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M1 6H4C4.53043 6 5.03914 5.78929 5.41421 5.41421C5.78929 5.03914 6 4.53043 6 4V1M14 1V4C14 4.53043 14.2107 5.03914 14.5858 5.41421C14.9609 5.78929 15.4696 6 16 6H19M19 14H16C15.4696 14 14.9609 14.2107 14.5858 14.5858C14.2107 14.9609 14 15.4696 14 16V19M6 19V16C6 15.4696 5.78929 14.9609 5.41421 14.5858C5.03914 14.2107 4.53043 14 4 14H1"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					) : (
						<svg
							width="20"
							height="20"
							viewBox="0 0 20 20"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M6 1H3C2.46957 1 1.96086 1.21071 1.58579 1.58579C1.21071 1.96086 1 2.46957 1 3V6M19 6V3C19 2.46957 18.7893 1.96086 18.4142 1.58579C18.0391 1.21071 17.5304 1 17 1H14M14 19H17C17.5304 19 18.0391 18.7893 18.4142 18.4142C18.7893 18.0391 19 17.5304 19 17V14M1 14V17C1 17.5304 1.21071 18.0391 1.58579 18.4142C1.96086 18.7893 2.46957 19 3 19H6"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					)}
				</button>
			</div>
		</header>
	);
};

export default Header;
