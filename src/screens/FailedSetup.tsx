import { Link } from "react-router-dom";
import Footer from "../components/footer/footer";
import LogoLogin from "../components/general/logoLogin";
import Failed from "../images/Failed.png";

const Fail = () => {
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
					<div className="c-card-succes-or-failed__dots">
						<div className="c-card-succes-or-failed">
							<div className="c-card-succes-or-failed__body u-align-text-center">
								<img
									className="c-card-succes-or-failed__image"
									src={Failed}
									alt="Authorization is successful."
								/>
								<h1 className="c-succes-or-failed__title">
									Authorization failed
								</h1>
							</div>
							<div className="c-card-succes-or-failed__footer u-align-text-center">
								<p className="c-succes-or-failed__text">
									Your authorization was not succesful. You
									can close this page and try again.
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
export default Fail;
