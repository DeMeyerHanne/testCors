import { Field, Form, Formik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/footer/footer";
import LogoLogin from "../components/general/logoLogin";

const ForgotPassword = () => {
	/* Validation */
	function validateEmail(value: any) {
		let error;
		if (!value) {
			error = "Required";
		} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
			error = "Invalid email address";
		}
		return error;
	}

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
							<form
								className="c-card c-card--forgot-password"
								action="#"
							>
								<div className="c-card__body">
									<h1 className="c-forgot-password__title">
										Forgot password?
									</h1>
									<p className="c-forgot-password__text">
										Enter your email address to change your
										password.
									</p>
									<Formik
										initialValues={{
											email: "",
											password: "",
										}}
										onSubmit={(values) => {
											console.log(values);
										}}
									>
										{({
											errors,
											touched,
											isValidating,
										}) => (
											<Form>
												<p className="c-form-field">
													<label
														className="c-label"
														htmlFor="Email"
													>
														Email
													</label>
													<Field
														className="c-input"
														validate={validateEmail}
														placeholder="email*"
														type="email"
														name="email"
														id="email"
													/>
													{errors.email &&
													touched.email ? (
														<div
															style={{
																color: "red",
																fontSize:
																	".85rem",
															}}
														>
															{errors.email}
														</div>
													) : null}
												</p>
											</Form>
										)}
									</Formik>
									<p className="c-button__align u-align-text-center">
										<button className="o-button-reset c-forgot-password__button">
											Request password reset
										</button>
									</p>
								</div>
								<div className="c-card__footer">
									<p className="u-align-text-center">
										<a
											className="c-forgot-password__to-login"
											href="/login"
										>
											Back to sign in
										</a>
									</p>
								</div>
							</form>
						</div>
						{/* DOTS AROUND THE CARD */}
						{/* <img className="c-hero-image__login-dots-left" src={ LayingDots } alt="Dots around the login."/>
						<img className="c-hero-image__login-dots-right" src={ StandingDots } alt="Dots around the login."/>  */}
					</div>
				</section>

				<Footer />
			</main>
		</div>
	);
};
export default ForgotPassword;
