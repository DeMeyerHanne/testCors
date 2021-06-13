import Footer from "../components/footer/footer";
import LogoLogin from "../components/general/logoLogin";
import { Formik, Form, Field } from 'formik';
import React, { useState } from "react";
import LoginInfo from "../utils/login";
import { postData } from "../utils/dataAccess";
import { Link, useHistory } from "react-router-dom";


const Login = (props: any) => {	
	/* Validation */
	function validateEmail(value: any) {
		let error;
		if (!value) {
		  error = 'Required';
		} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
		  error = 'Invalid email address';
		} 
		return error;
	}
	  
	function validatePassword(value: any) {
		let error;
		if (value === 'admin') {
		  error = 'Nice try!';
		} else if (!value) {
			error = 'Required'
		}
		return error;
	}

	/* Authentication */
	const [login, setLogin] = useState<LoginInfo>({
		email: "",
		password: ""
	});

	const history = useHistory();

	const checkLogin = () => {
		postData("http://smapi-ip-2.azurewebsites.net/api/login", {
            email: login.email,
			password: login.password,
        }
		).then((data) => {
			console.log(data);
			if(data.sessionGranted == false) {
				console.log('Not valid');
				alert('Your emailadress or password is not correct');
			} else if(data.sessionGranted == true) {
				console.log("valid");
				
				history.push(`/users/${data.therapistID}`);
			}
		}).catch((e) => console.error(e));
	}



	return (
		<div>		
			<main className="c-main">
				<div>
					<LogoLogin fill="#3f536c"/>
				</div>
				
				<section className="o-row__login c-page">
					<div className="o-container u-max-width-xs">
						<div className="c-card__dots">
							<Formik
								initialValues={{
									email: '',
									password: '',
								}}
								onSubmit={values => {
									console.log(values);
									setLogin(values);
									checkLogin();
								}}
							>
								{({ errors, touched, isValidating }) => (
									<Form className="c-card" action="#">
										<div className="c-card__body">
											<div className="c-form-field">
												<label className="c-label" htmlFor="Email">
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
													{errors.email && touched.email ? <div style={{color: 'red', fontSize: '.85rem'}}>{errors.email}</div> : null}
											</div>
											
											<div className="c-form-field">
												<label className="c-label" htmlFor="password">
													Password
												</label>
												<span className="c-password-toggle-container">
												<Field 
													className="c-input" 
													validate={validatePassword} 
													placeholder="password*" 
													type="password" 
													name="password" 
													id="password"
												/>
													{errors.password && touched.password ? <div style={{color: 'red', fontSize: '.85rem'}}>{errors.password}</div> : null}
													<span className="c-password-toggle">
														<input className="o-hide-accessible c-password-toggle__checkbox" type="checkbox" id="togglePasswordCheckbox" tabIndex={-1}/>
														<label className="c-password-toggle__label" htmlFor="togglePasswordCheckbox">
															<svg className="c-password-toggle__symbol c-password-toggle__symbol--show" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0V0z" fill="none"/>
																<path d="M12 6c3.79 0 7.17 2.13 8.82 5.5C19.17 14.87 15.79 17 12 17s-7.17-2.13-8.82-5.5C4.83 8.13 8.21 6 12 6m0-2C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4zm0 5c1.38 0 2.5 1.12 2.5 2.5S13.38 14 12 14s-2.5-1.12-2.5-2.5S10.62 9 12 9m0-2c-2.48 0-4.5 2.02-4.5 4.5S9.52 16 12 16s4.5-2.02 4.5-4.5S14.48 7 12 7z"/>
															</svg>
															<svg className="c-password-toggle__symbol c-password-toggle__symbol--hide" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px">
																<path d="M0 0h24v24H0V0zm0 0h24v24H0V0zm0 0h24v24H0V0zm0 0h24v24H0V0z" fill="none"/><path d="M12 6c3.79 0 7.17 2.13 8.82 5.5-.59 1.22-1.42 2.27-2.41 3.12l1.41 1.41c1.39-1.23 2.49-2.77 3.18-4.53C21.27 7.11 17 4 12 4c-1.27 0-2.49.2-3.64.57l1.65 1.65C10.66 6.09 11.32 6 12 6zm-1.07 1.14L13 9.21c.57.25 1.03.71 1.28 1.28l2.07 2.07c.08-.34.14-.7.14-1.07C16.5 9.01 14.48 7 12 7c-.37 0-.72.05-1.07.14zM2.01 3.87l2.68 2.68C3.06 7.83 1.77 9.53 1 11.5 2.73 15.89 7 19 12 19c1.52 0 2.98-.29 4.32-.82l3.42 3.42 1.41-1.41L3.42 2.45 2.01 3.87zm7.5 7.5l2.61 2.61c-.04.01-.08.02-.12.02-1.38 0-2.5-1.12-2.5-2.5 0-.05.01-.08.01-.13zm-3.4-3.4l1.75 1.75c-.23.55-.36 1.15-.36 1.78 0 2.48 2.02 4.5 4.5 4.5.63 0 1.23-.13 1.77-.36l.98.98c-.88.24-1.8.38-2.75.38-3.79 0-7.17-2.13-8.82-5.5.7-1.43 1.72-2.61 2.93-3.53z"/>
															</svg>
															<span className="o-hide-accessible">Show password</span>
														</label>
													</span>
												</span>
											</div>
											
											<div className="c-button__align u-align-text-center">
												<button className="o-button-reset c-button">Login</button>
											</div>
										</div>
										<div className="c-card__footer">
											<p className="u-align-text-center">
												<a className="c-link__forgot-password" href="/forgotpassword">
													Forgot password?
												</a>
											</p>
										</div>
									</Form>
								)}
							</Formik>
						</div>
					</div>
				</section>

				<Footer/>
			</main>
		</div>	
	)
};
export default Login;
