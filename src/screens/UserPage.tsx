import React, { useEffect, useRef, useState } from "react";
import Icon from "../components/dashboard/icon";
import LogoWithText from "../components/general/logo_with_text";
import Users from "../utils/users";
import { get, postData } from "../utils/dataAccess";
import UserOptions from "../components/User/UserOptions";
import UserLinks from "../components/User/UserLinks";
import { Link } from "react-router-dom";

const UserPage = () => {
	// usestates
	const [ActiveTime, SetActiveTime] = useState("");
	const [HeightTime, setHeightTime] = useState("0px");
	const [RotateTime, SetRotateTime] = useState("");

	const [timeFilter, SetTimeFilter] = useState("session");

	const content = useRef<null | HTMLDivElement>(null);

	const [search, SetSearch] = useState("");

	const [user, SetUser] = useState<any[]>([]);

	const [DateState, SetDate] = useState<string[]>([]);

	//useEffects
	//api data
	useEffect(() => {
		get("http://smapi-ip-2.azurewebsites.net/api/users").then((data) => {
			let userList = [];

			for (let i = 0; i < data.users.length; i++) {
				userList.push(data.users[i]);
			}
			SetUser(userList);
		});
	}, []);

	useEffect(() => {
		let FullDate = "";
		let YearMonthDay = "";
		let dateArray = [];
		for (let i = 0; i < user.length; i++) {
			FullDate = user[i].birthDate;
			let Split = FullDate.split("T");
			YearMonthDay = Split[0];
			dateArray.push(YearMonthDay);
		}
		SetDate(dateArray);

		for (let i = 0; i < user.length; i++) {
			user[i].clicked = "hiddenOptions";
		}
	}, [user]);

	// function
	function filterTime(time: string) {
		SetTimeFilter(time);
	}

	function toggleFilter() {
		SetActiveTime(ActiveTime === "" ? "active" : "");
		setHeightTime(
			ActiveTime === "active"
				? "0px"
				: `${content.current?.scrollHeight}px`
		);
		SetRotateTime(ActiveTime === "active" ? "" : "rotate");
	}

	return (
		<div className="c-UserPage__main">
			<aside className="c-dashboard__aside">
				<Link
					to={{
						pathname: `users`,
					}}
				>
					<div className="c-dashboard__aside--logo">
						<LogoWithText fill="#3f536c" />
					</div>
				</Link>
				<section className="c-dashboard__aside--section c-dashboard__aside--users">
					<div className="c-filters">
						<div className="c-filters__title">
							<p className="c-filters__title--text">Filters</p>
						</div>

						{/* user filter */}
						<button
							className={`c-filter ${ActiveTime}`}
							onClick={() => toggleFilter()}
						>
							<div className="c-filter__header">
								<p className="c-filter__header--text">Time</p>

								<div
									className={`c-filter__header--svg ${RotateTime}`}
								>
									<Icon />
								</div>
							</div>
							<div
								ref={content}
								style={{ maxHeight: `${HeightTime}` }}
								className={`c-filter__hidden-content`}
							>
								<label
									className="c-filter__hidden-items"
									htmlFor="last-session"
									id="last-session-label"
								>
									<input
										type="radio"
										checked={timeFilter === "session"}
										id="last-session"
										onChange={() => filterTime("session")}
									/>
									<p id="last-session-text">last session</p>
								</label>
								<label
									className="c-filter__hidden-items"
									htmlFor="day"
									id="day-label"
								>
									<input
										type="radio"
										checked={timeFilter === "day"}
										id="day"
										onChange={() => filterTime("day")}
									/>
									<p id="day-text">day</p>
								</label>
								<label
									className="c-filter__hidden-items"
									htmlFor="week"
									id="week-label"
								>
									<input
										type="radio"
										checked={timeFilter === "week"}
										id="week"
										onChange={() => filterTime("week")}
									/>
									<p id="week-text">week</p>
								</label>
								<label
									className="c-filter__hidden-items"
									htmlFor="month"
									id="month-label"
								>
									<input
										type="radio"
										checked={timeFilter === "month"}
										id="month"
										onChange={() => filterTime("month")}
									/>
									<p id="month-text">month</p>
								</label>
								<label
									className="c-filter__hidden-items"
									htmlFor="year"
									id="year-label"
								>
									<input
										type="radio"
										checked={timeFilter === "year"}
										id="year"
										onChange={() => filterTime("year")}
									/>
									<p id="year-text">year</p>
								</label>
								<label
									className="c-filter__hidden-items"
									htmlFor="all-time"
									id="all-time-label"
								>
									<input
										type="radio"
										checked={timeFilter === "all"}
										id="all-time"
										onChange={() => filterTime("all")}
									/>
									<p id="all-time-text">all time</p>
								</label>
							</div>
						</button>
					</div>
				</section>
				<div className="c-dashboard__aside--buttonbox">
					<Link
						to={{
							pathname: `/`,
						}}
					>
						<button className="c-dashboard__aside--button">
							Logout
						</button>
					</Link>
				</div>
			</aside>
			<section className="c-userPage__section">
				<input
					type="checkbox"
					name="hidden-nav"
					id="hidden-nav-checkbox"
				/>
				<div className="c-hidden-nav">
					<section className="c-hidden-nav__section">
						<div className="c-hidden-nav__filter">
							<div className="c-hidden-nav__filter__title">
								<p className="c-hidden-nav__filter__title--text">
									Filters
								</p>
							</div>

							<button
								className={`c-filter ${ActiveTime}`}
								onClick={() => toggleFilter()}
							>
								<div className="c-filter__header">
									<p className="c-filter__header--text">
										Time
									</p>

									<div
										className={`c-filter__header--svg ${RotateTime}`}
									>
										<Icon />
									</div>
								</div>
								<div
									ref={content}
									style={{ maxHeight: `${HeightTime}` }}
									className={`c-filter__hidden-content`}
								>
									<label
										className="c-filter__hidden-items"
										htmlFor="last-session"
										id="last-session-label"
									>
										<input
											type="radio"
											checked={timeFilter === "session"}
											id="last-session"
											onChange={() =>
												filterTime("session")
											}
										/>
										<p id="last-session-text">
											last session
										</p>
									</label>
									<label
										className="c-filter__hidden-items"
										htmlFor="day"
										id="day-label"
									>
										<input
											type="radio"
											checked={timeFilter === "day"}
											id="day"
											onChange={() => filterTime("day")}
										/>
										<p id="day-text">day</p>
									</label>
									<label
										className="c-filter__hidden-items"
										htmlFor="week"
										id="week-label"
									>
										<input
											type="radio"
											checked={timeFilter === "week"}
											id="week"
											onChange={() => filterTime("week")}
										/>
										<p id="week-text">week</p>
									</label>
									<label
										className="c-filter__hidden-items"
										htmlFor="month"
										id="month-label"
									>
										<input
											type="radio"
											checked={timeFilter === "month"}
											id="month"
											onChange={() => filterTime("month")}
										/>
										<p id="month-text">month</p>
									</label>
									<label
										className="c-filter__hidden-items"
										htmlFor="year"
										id="year-label"
									>
										<input
											type="radio"
											checked={timeFilter === "year"}
											id="year"
											onChange={() => filterTime("year")}
										/>
										<p id="year-text">year</p>
									</label>
									<label
										className="c-filter__hidden-items"
										htmlFor="all-time"
										id="all-time-label"
									>
										<input
											type="radio"
											checked={timeFilter === "all"}
											id="all-time"
											onChange={() => filterTime("all")}
										/>
										<p id="all-time-text">all time</p>
									</label>
								</div>
							</button>
						</div>
					</section>
				</div>
				{/* navigation */}
				<nav className="c-nav">
					<div className="c-nav__container">
						{/* empty div for justify content */}
						<div></div>
						<div className="c-nav__right-container">
							<a href="/adduser" className="c-nav__button">
								Add user
							</a>
							<form className="c-nav__form">
								<label
									htmlFor="search"
									className="c-nav__label"
								>
									<input
										className="c-nav__searchbar"
										type="text"
										placeholder="Search user..."
										id="search"
										onChange={(e) => {
											SetSearch(e.target.value);
										}}
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
						</div>
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
				{/* main page */}

				<div className="c-UserPage__section--tableContainer">
					<table>
						<tbody>
							<tr>
								<th>Name</th>
								<th className="hidden-info-user">
									Date of birth
								</th>
								<th>Gender</th>
								<th></th>
							</tr>
							{user!
								.filter((item: any) => {
									if (search === "") {
										return item;
									} else if (
										item.firstName
											.toLowerCase()
											.includes(search.toLowerCase())
									) {
										return user;
									} else if (
										item.lastName
											.toLowerCase()
											.includes(search.toLowerCase())
									) {
										return user;
									}
								})
								.map((item: Users, index) => (
									<tr key={index}>
										<UserLinks
											class=""
											index={index}
											user={item.userID}
											div={
												item.firstName +
												" " +
												item.lastName
											}
										></UserLinks>
										<UserLinks
											class="hidden-info-user"
											index={index}
											user={item.userID}
											div={DateState[index]}
										></UserLinks>
										<UserLinks
											class=""
											index={index}
											user={item.userID}
											div={item.gender}
										></UserLinks>
										<td className="c-UserPage__options--container">
											<UserOptions
												userID={item.userID}
											></UserOptions>
										</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>
			</section>
		</div>
	);
};
export default UserPage;
