import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/footer/footer";
import LogoLogin from "../components/general/logoLogin";

const Setup = () => {
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
								className="c-card-setup c-card--forgot-password"
								action="#"
							>
								<div className="c-card__body">
									<h1 className="c-setup__title">Setup</h1>
									<p className="c-setup__text">
										Setup your account to connect with
										Fitbit OAuth2.
									</p>
									<p className="c-setup__required">
										A Fitbit account is required.
									</p>
									<p className="c-button__align u-align-text-center">
										<button className="o-button-reset c-button__setup">
											Connect your account
										</button>
									</p>
								</div>
								<div className="c-card__footer">
									<p className="u-align-text-center">
										<a
											className="c-setup__homepage"
											href="/users"
										>
											Go back to homepage
										</a>
									</p>
								</div>
							</form>
						</div>
					</div>
				</section>

				<Footer />
			</main>
		</div>
	);
};
export default Setup;
