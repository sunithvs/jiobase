<script lang="ts">
	const author = {
		name: 'Sunith VS',
		website: 'https://sunithvs.com',
		linkedin: 'https://www.linkedin.com/in/sunithvs/',
		instagram: 'https://www.instagram.com/truevibecoder/',
		youtube: 'https://www.youtube.com/@truevibecoder',
		twitter: 'https://x.com/sunithvs_'
	};
</script>

<div class="mt-12 border-t border-white/5 pt-8">
	<div class="glass-card rounded-2xl p-6">
		<div class="flex items-start gap-4">
			<img
				src="/sunithvs.png"
				alt="Sunith VS"
				class="h-14 w-14 shrink-0 rounded-full object-cover"
			/>
			<div>
				<p class="text-sm text-gray-500">Written and verified by</p>
				<a href={author.website} target="_blank" rel="noopener noreferrer" class="text-lg font-semibold text-white hover:text-brand-400 transition">
					{author.name}
				</a>
				<p class="mt-1 text-sm text-gray-400 leading-relaxed">
					Building tools that help Indian developers ship without ISP interference. Creator of <a href="/" class="text-brand-400 hover:underline">JioBase</a>.
				</p>
				<div class="mt-3 flex items-center gap-4">
					<a href={author.website} target="_blank" rel="noopener noreferrer" class="text-gray-500 transition hover:text-white" aria-label="Website">
						<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<circle cx="12" cy="12" r="10"/>
							<line x1="2" y1="12" x2="22" y2="12"/>
							<path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
						</svg>
					</a>
					<a href={author.linkedin} target="_blank" rel="noopener noreferrer" class="text-gray-500 transition hover:text-white" aria-label="LinkedIn">
						<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
							<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
						</svg>
					</a>
					<a href={author.instagram} target="_blank" rel="noopener noreferrer" class="text-gray-500 transition hover:text-white" aria-label="Instagram">
						<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
							<path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
							<line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
						</svg>
					</a>
					<a href={author.youtube} target="_blank" rel="noopener noreferrer" class="text-gray-500 transition hover:text-white" aria-label="YouTube">
						<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
							<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"/>
							<polygon points="9.545 15.568 15.818 12 9.545 8.432" fill="#0a0a0a"/>
						</svg>
					</a>
					<a href={author.twitter} target="_blank" rel="noopener noreferrer" class="text-gray-500 transition hover:text-white" aria-label="X (Twitter)">
						<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
							<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
						</svg>
					</a>
				</div>
			</div>
		</div>
	</div>
</div>
