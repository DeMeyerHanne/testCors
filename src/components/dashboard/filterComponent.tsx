import React, { useState, useRef } from "react";
import Icon from "./icon";

const Filter = (props: any) => {
	// usestates
	const [Active, SetActive] = useState("");
	const [Height, setHeight] = useState("0px");
	const [Rotate, SetRotate] = useState("");

	const content = useRef<null | HTMLDivElement>(null);

	// functions
	function toggleFilter() {
		SetActive(Active === "" ? "active" : "");
		setHeight(
			Active === "active" ? "0px" : `${content.current?.scrollHeight}px`
		);
		SetRotate(Active === "active" ? "" : "rotate");
	}

	return (
		<button className={`c-filter ${Active}`} onClick={toggleFilter}>
			<div className="c-filter__header">
				<p className="c-filter__header--text">{props.title}</p>

				<div className={`c-filter__header--svg ${Rotate}`}>
					<Icon />
				</div>
			</div>
			<div
				ref={content}
				style={{ maxHeight: `${Height}` }}
				className={`c-filter__hidden-content`}
				dangerouslySetInnerHTML={{ __html: props.content }}
			></div>
		</button>
	);
};
export default Filter;
