import { Link } from "react-router-dom";
import Footer from "../components/footer/footer";
import LogoLogin from "../components/general/logoLogin";

const ErrorPage = () => {
	return (
		<div className="c-main">
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
					<div className="c-card-error__dots">
						<div className="c-card-error">
							<div className="c-card-error__body">
								<h1 className="c-error__issue">
									Sorry, we ran into an issue.
								</h1>
								<p className="c-button__align u-align-text-center">
									<button className="o-button-reset c-button__try-again">
										Try again
									</button>
								</p>
							</div>
							<div className="c-card-error__footer u-align-text-center">
								<p className="c-error__text">
									If that doesn't work, try{" "}
									<a
										className="c-error__to-login"
										href="/login"
									>
										signing out
									</a>{" "}
									and back in.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			<Footer />
		</div>
	);
};
export default ErrorPage;
