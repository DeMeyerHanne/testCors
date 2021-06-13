import React from "react";
import { Link } from "react-router-dom";

const UserLinks = (props: any) => {
	return (
		<td className={props.class}>
			<Link
				to={{
					pathname: `/dashboard/${props.index}`,
					state: props.user,
				}}
			>
				<div className="c-table-text">{props.div}</div>
			</Link>
		</td>
	);
};
export default UserLinks;
