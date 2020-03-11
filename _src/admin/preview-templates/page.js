import htm from "https://unpkg.com/htm?module";

const html = htm.bind(h);

// Preview component for a Page
const Page = createClass({
	render() {
	const entry = this.props.entry;

	return html`
	<main id="main">
		<div class="body container">
			<h1>${entry.getIn(["data", "title"], null)}</h1>
			<p class="lede">${entry.getIn(["data", "summary"], null)}</p>
			${this.props.widgetFor("body")}
		</div>
	</main>
		`;
		}
});

export default Page;