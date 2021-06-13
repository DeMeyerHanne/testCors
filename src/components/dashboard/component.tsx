import React from "react";
import { Bar, Line, Pie } from "react-chartjs-2";

const Component = (props: any) => {
	let chartType = (
		<Line
			type="line"
			data={{
				labels: props.dateFilter,
				datasets: [
					{
						label: "",
						data: props.data,
						backgroundColor: [props.color],
						borderColor: [props.color],
						borderWidth: 2,
					},
				],
			}}
			options={{
				animation: {
					duration: 0,
				},
				scales: {
					yAxes: [
						{
							gridLines: {
								color: "red",
							},
							ticks: { min: 6, max: 16 },
						},
					],
				},
				plugins: {
					legend: {
						display: false,
					},
				},

				maintainAspectRatio: false,
			}}
		></Line>
	);
	if (props.type === "bar") {
		chartType = (
			<Bar
				type="bar"
				data={{
					labels: props.dateFilter,
					datasets: [
						{
							label: "",
							data: props.data,
							backgroundColor: [props.color],
						},
					],
				}}
				options={{
					animation: {
						duration: 0,
					},
					maintainAspectRatio: false,
					plugins: {
						legend: {
							display: false,
						},
						scales: {
							yAxes: { display: "none" },
						},
					},
				}}
			></Bar>
		);
	} else if (props.type === "pie") {
		chartType = (
			<Pie
				type="bar"
				data={{
					labels: props.dateFilter,
					datasets: [
						{
							label: "",
							data: props.data,
							backgroundColor: ["#FF383A", "#ff9798"],
							borderColor: [props.color],
							borderWidth: 0,
						},
					],
				}}
				options={{
					animation: {
						duration: 0,
					},
					maintainAspectRatio: false,
					plugins: {
						legend: {
							display: false,
						},
						scales: {
							yAxes: { display: "none" },
						},
					},
				}}
			></Pie>
		);
	}
	return (
		<div
			id={props.active}
			className={`c-info__component c-info__component--${props.size} c-info__component--${props.size}`}
		>
			<div className="c-info__component--title-container">
				<p
					className={`c-info__component--title c-info__component--title-${props.size}`}
				>
					{props.title}
				</p>
				<div
					className="c-info__component--close"
					onClick={() => props.close(props.title)}
				>
					<svg
						viewBox="0 0 365.71733 365"
						xmlns="http://www.w3.org/2000/svg"
					>
						<g fill="#3f536c" opacity="0.6">
							<path d="m356.339844 296.347656-286.613282-286.613281c-12.5-12.5-32.765624-12.5-45.246093 0l-15.105469 15.082031c-12.5 12.503906-12.5 32.769532 0 45.25l286.613281 286.613282c12.503907 12.5 32.769531 12.5 45.25 0l15.082031-15.082032c12.523438-12.480468 12.523438-32.75.019532-45.25zm0 0" />
							<path d="m295.988281 9.734375-286.613281 286.613281c-12.5 12.5-12.5 32.769532 0 45.25l15.082031 15.082032c12.503907 12.5 32.769531 12.5 45.25 0l286.632813-286.59375c12.503906-12.5 12.503906-32.765626 0-45.246094l-15.082032-15.082032c-12.5-12.523437-32.765624-12.523437-45.269531-.023437zm0 0" />
						</g>
					</svg>
				</div>
			</div>
			<div className={`c-info__component--subtitle-container`}>
				<p
					className={`c-info__component--subtitle-container-${props.size}`}
				>
					{props.title} last {props.time}
				</p>
			</div>
			<div
				className="c-info__component--graph-container"
				onClick={() => props.clicked(props.title)}
			>
				<div
					className={`c-info__component--graph-box-${props.size} c-info__component--graph-box-${props.size}`}
				>
					{chartType}
				</div>
			</div>
		</div>
	);
};
export default Component;
