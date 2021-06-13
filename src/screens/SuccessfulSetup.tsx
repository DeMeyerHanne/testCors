import { Link } from "react-router-dom";
import Footer from "../components/footer/footer";
import LogoLogin from "../components/general/logoLogin";
import Successful from "../images/Succes.png";

const Succes = () => {
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
									src={Successful}
									alt="Authorization is successful."
								/>
								<h1 className="c-succes-or-failed__title">
									Authorization successful
								</h1>
							</div>
							<div className="c-card-succes-or-failed__footer u-align-text-center">
								<p className="c-succes-or-failed__text">
									Your authorization was successful. You can
									now close this page
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
export default Succes;
