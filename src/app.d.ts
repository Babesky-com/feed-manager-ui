/// <reference types="@sveltejs/kit" />

declare namespace App {
	interface Locals {
		session?: {
			did: string;
			handle: string;
		};
	}
}
