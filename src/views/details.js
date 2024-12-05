import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as service from '../api/data.js';

{}
const detailsTemplate = (fruit, onDelete) => html`
    <section class="details">
        <div class="details-card">
            <img src="${fruit.imageUrl}" alt="${fruit.name}" />
            <h2>${fruit.name}</h2>
            <p>${fruit.description}</p>
            <h3>Nutrition</h3>
            <p>${fruit.nutrition}</p>
            
            ${fruit.isOwner
                ? html`
                    <div class="actions">
                        <a href="/edit/${fruit._id}" class="button">Edit</a>
                        <button @click=${onDelete} class="button">Delete</button>
                    </div>
                `
                : ''}
        </div>
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
			ctx.page.redirect('/');
		}
	}
}
