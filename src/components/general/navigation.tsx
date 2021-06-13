import React from "react";

const Navigation = (props: any) => {
	return (
		<nav className="c-nav">
			<div className="c-nav__container">
				<button className="c-nav__button c-nav__button--session">
					{props.btnMediaQuerry}
				</button>
				<a href="./users" className="c-nav__button">
					{props.button}
				</a>
				<form className="c-nav__form">
					<label htmlFor="search" className="c-nav__label">
						<input
							className="c-nav__searchbar"
							type="text"
							placeholder="Search user..."
							id="search"
						/>

						<svg
							fill="#3f536c"
							className="c-nav__svg"
							version="1.1"
							xmlns="http://www.w3.org/2000/svg"
							xmlnsXlink="http://www.w3.org/1999/xlink"
							x="0px"
							y="0px"
							viewBox="0 0 56.966 56.966"
							xmlSpace="preserve"
						>
							<path
								d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23
					   s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92
					   c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17
					   s-17-7.626-17-17S14.61,6,23.984,6z"
							/>
						</svg>
					</label>
				</form>

				<div className="c-nav__svg-container">
					<label htmlFor="hidden-nav-checkbox">
						<svg
							className="c-nav__svg-container--svg"
							fill="#3f536c"
							viewBox="0 -53 384 384"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="m368 154.667969h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" />
							<path d="m368 32h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" />
							<path d="m368 277.332031h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" />
						</svg>
					</label>
				</div>
			</div>
		</nav>
	);
};

export default Navigation;
