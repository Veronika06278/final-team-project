import { html } from '../../node_modules/lit-html/lit-html.js';
import { createSubmitHandler } from '../util.js';
import * as userService from '../api/user.js';

const loginTemplate = (onSubmit) => html`
	<section id="login">
		<div class="form">
			<h2>Login</h2>
			<form class="login-form" @submit=${onSubmit}>
				<input
					type="email"
					name="email"
					id="email"
					placeholder="Email"
					required
				/>
				<input
					type="password"
					name="password"
					id="password"
					placeholder="Password"
					required
				/>
				<button type="submit">Login</button>
				<p class="message">
					Not registered? <a href="/register">Create an account</a>
				</p>
			</form>
		</div>
	</section>
`;

export async function loginPage(ctx) {
	ctx.render(loginTemplate(createSubmitHandler(ctx, onSubmit)));
}

async function onSubmit(ctx, data, event) {
	// Check if any field is empty manually (optional as the 'required' attribute already does this)
	if (data.email === '' || data.password === '') {
		return alert('All fields are required!');
	}

	// Call the login service function
	try {
		await userService.login(data.email, data.password);
		event.target.reset();  // Reset the form
		ctx.page.redirect('/');  // Redirect to the home page after successful login
	} catch (error) {
		// Handle errors, for example incorrect login credentials
		alert('Invalid email or password!');
	}
}