import type { TrackingGAProps } from "../model/types.d";

/**
 * @name TrackingGA
 * @external https://tagmanager.google.com/
 * @description GTM requires a two part implementation, this script is
 * responsible for loading GTM which loads our Tags and Pixels
 */
export const TrackingGA = (props: TrackingGAProps) => {
	const { id } = props;

	const src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
	const __html = `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${id}');`;

	return (
		<>
			<script async={true} defer={true} src={src} type="text/javascript" />
			<script
				// biome-ignore lint: Google Tag Managerスクリプトを埋め込むために必要
				dangerouslySetInnerHTML={{ __html }}
				type="text/javascript"
			/>
		</>
	);
};
