import React from "react";
import Logo from "./logo";

const LogoWithText = (props: any) => {
	return (
		<div className="c-logo">
			<div className="c-logo__svg">
				<Logo fill={props.fill} />
			</div>
			<p className="c-logo__logoText">
				<b>Creative</b> Therapy
			</p>
		</div>
	);
};
export default LogoWithText;
