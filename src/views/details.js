import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as service from '../api/data.js';

const detailsTemplate = (fruit, onDelete) => html`
	<section id="details-wrapper">
		<h2 id="details-title">${fruit.name}</h2>
		<img src=${fruit.imageUrl} alt="${fruit.name}" />
		<div id="details-description">
			<p>${fruit.description}</p>
			<h4 id="nutrition">Nutrition</h4>
			<p>${fruit.nutrition}</p>
		</div>
		${fruit.isOwner
			? html`
					<div id="action-buttons">
						<a href="/edit/${fruit._id}">Edit</a>
						<a href="javascript:void(0)" @click=${onDelete}>Delete</a>
					</div>
			  `
			: nothing}
	</section>
`;

export async function detailsPage(ctx) {
	const id = ctx.params.id;
	const fruit = await service.getById(id);
	if (ctx.user) {
		fruit.isOwner = ctx.user._id === fruit._ownerId;
	}

	ctx.render(detailsTemplate(fruit, onDelete));


	async function onDelete() {
		const choice = confirm('Are you sure you want to delete this fruit?');
		if (choice) {
			await service.deleteById(id); 
			ctx.page.redirect('/catalog'); 
		}
	}
}