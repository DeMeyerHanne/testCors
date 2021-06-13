import Logo from "./logo";

const LogoLogin = (props: any) => {
	return (
		<div className="c-logo c-logo__login">
			<div className="c-logo__svg">
				<Logo fill={props.fill} />
			</div>
			<p className="c-logo__logoText">
				<b>Creative</b> Therapy
			</p>
		</div>
	);
};
export default LogoLogin;
