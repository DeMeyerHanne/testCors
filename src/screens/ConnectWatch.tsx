import { connect, Field, Form, Formik } from "formik";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";

import Footer from "../components/footer/footer";
import LogoLogin from "../components/general/logoLogin";

import { get, postData } from "../utils/dataAccess";
import SmartWatch from "../utils/watch";


const ConnectWatch = (props: any) => {
	const [user, SetUser] = useState("unknown");
	const [theUserID, SetUserID] = useState("");
	const [connection, setConnection] = useState<SmartWatch>({
		watchID: "",
	});
	const [userLst, SetUserLst] = useState<any[]>([]);

	//@ts-ignore
	const { id } = useParams();

	useEffect(() => {
		// UserData for getting name;
		get("http://smapi-ip-2.azurewebsites.net/api/users").then((data) => {
			let userList = [];

			for (let i = 0; i < data.users.length; i++) {
				userList.push(data.users[i]);
			}
			SetUserLst(userList);
		});
	}, []);
	useEffect(() => {
		for (let i = 0; i < userLst.length; i++) {
			console.log(userLst[i].userID);
			if (userLst[i].userID === id) {
				SetUser(userLst[i].firstName);
				SetUserID(userLst[i].userID);
			}
		}
	}, [userLst]);

	/* Validation */
	// function validateString(value: any) {
	// 	let error;
	// 	if (!value) {
	// 		error = "Required";
	// 	} else if (!/^[ a-zA-Z\-\’]+$/i.test(value)) {
	// 		error = "Only letters are allowed.";
	// 	}
	// 	return error;
	// }

	function validateNumber(value: any) {
		let error;
		if (!value) {
			error = "Required";
		} else if (value < 0) {
			error = "The code has 4 numbers";
		} else if (/^[ a-zA-Z\-\’]+$/i.test(value)) {
			error = "Only letters are allowed.";
		}
		return error;
	}

	/* Connect to database */
	const startNewSession = () => {
		postData(
			"http://smapi-ip-2.azurewebsites.net/api/session/publish_session",
			{
				userID: theUserID,
				watchID: connection.watchID,
				therapistID: "09a0aaf5-4063-42d1-a35b-c50382b9a044",
			}
		)
			.then((data) => {
				console.log(data);
				console.log(data.watchID);
			})
			.catch((e) => console.error(e));
	};

	return (
		<div>
			<main className="c-main">
				<Link
					to={{
						pathname: `/users`,
					}}
				>
					<div>
						<LogoLogin fill="#3f536c" />
					</div>
				</Link>

				<section className="o-row__login c-page">
					<div className="o-container u-max-width-xs">
						<div className="c-card__dots">
							<Formik
								initialValues={{
									watchID: "",
									// name: '',
								}}
								onSubmit={(values) => {
									console.log(values);
									setConnection(values as SmartWatch);
									startNewSession();
								}}
							>
								{({ errors, touched, isValidating }) => (
									<Form className="c-card" action="#">
										<p>
											Start session for{" "}
											<span>{user}</span>
										</p>
										<div className="c-card__body">
											<div className="c-form-field">
												<label
													className="c-label"
													htmlFor="watch"
												>
													Watch ID
												</label>
												<Field
													className="c-input"
													validate={validateNumber}
													placeholder="2546*"
													type="text"
													name="watchID"
													id="watchID"
												/>
												{errors.watchID &&
												touched.watchID ? (
													<div className="c-validation">
														{errors.watchID}
													</div>
												) : null}
											</div>

											{/* <div className="c-form-field">
											<label className="c-label" htmlFor="User">
												User
											</label>
											<span className="c-search-container">
												<Field 
													className="c-input" 
													validate={validateString}
													placeholder="User*" 
													type="user" 
													name="name" 
													id="name"
												/>
												<span className="c-search">
													<label className="c-search__label" htmlFor="togglesearchCheckbox">
														<svg className="c-search__symbol" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/>
															<path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
														</svg>
													</label>
												</span>
												{errors.name && touched.name ? <div className="c-validation">{errors.name}</div> : null}
											</span>
										</div>  */}

											<p className="c-button__align u-align-text-center">
												<button className="o-button-reset c-button">
													Start session
												</button>
											</p>
										</div>
									</Form>
								)}
							</Formik>
						</div>
					</div>
				</section>

				<Footer />
			</main>
		</div>
	);
};
export default ConnectWatch;
// function SmartWatch(SmartWatch: any): [any, any] {
// 	throw new Error("Function not implemented.");
// }
