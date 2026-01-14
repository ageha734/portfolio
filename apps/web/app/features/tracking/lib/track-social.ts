/**
 * @external https://developers.google.com/analytics/devguides/collection/ga4/reference/events
 * @description tbd...
 */

export const trackSocial = (social: string) => {
	const gtag = (globalThis as unknown as Window).gtag;
	if (!gtag) return;

	gtag("event", "view_social", {
		provider: social,
	});
};
