import Link from 'next/link';

import Accordion from './Accordion';

const RightSidebar = () => (
	<div>
		<Link href="/post/new">
			<button className="text-l w-full rounded-xl bg-primary-accent px-4 py-2 font-semibold text-white">
				Add post
			</button>
		</Link>
		<p className="mb-8 mt-2">Read rules below before submitting a post</p>
		<div className="w-full">
			<Accordion title="Community rules" isInitiallyOpen>
				<ul className="list-disc space-y-2 pl-4">
					<li>
						<span className="font-semibold">Respect and Kindness</span>: Always
						be respectful and kind in your interactions. Personal attacks,
						harassment, and hate speech will not be tolerated.
					</li>
					<li>
						<span className="font-semibold">Relevant Content Only</span>: All
						posts and discussions must be directly related to guinea pigs.
						Off-topic content will be removed.
					</li>
					<li>
						<span className="font-semibold">No Medical Advice</span>: Do not
						seek or give medical advice. While sharing experiences is
						encouraged, remember that veterinary care is essential for
						health-related issues.
					</li>
					<li>
						<span className="font-semibold">Humane Treatment</span>: Posts
						advocating or depicting cruelty, harm, or unethical treatment of
						guinea pigs are strictly prohibited.
					</li>
					<li>
						<span className="font-semibold">Safe and Appropriate Content</span>:
						No NSFW content. All shared content should be safe and appropriate
						for all ages.
					</li>
					<li>
						<span className="font-semibold">No Spam or Self-Promotion</span>:
						Spamming and excessive self-promotion are not allowed. This includes
						unsolicited advertisements and repeated posts.
					</li>
					<li>
						<span className="font-semibold">Photo and Video Guidelines</span>:
						When sharing photos or videos, ensure they depict guinea pigs in
						safe and comfortable environments. Avoid posting distressing or
						uncomfortable situations.
					</li>
					<li>
						<span className="font-semibold">Source Credit</span>: If you share
						content that is not your own, always give credit to the original
						source.
					</li>
					<li>
						<span className="font-semibold">No Buying/Selling</span>: This
						community is not a marketplace. Posts related to buying, selling, or
						trading guinea pigs or guinea pig-related products are not allowed.
					</li>
					<li>
						<span className="font-semibold">Report Rule Violations</span>: Help
						keep the community safe and enjoyable by reporting any posts or
						comments that break these rules.
					</li>
				</ul>
			</Accordion>
		</div>
	</div>
);

export default RightSidebar;
