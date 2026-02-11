import type { SkillCategory } from '$lib/types';

export const skills: SkillCategory[] = [
	{
		category: 'Frontend',
		skills: [
			{ name: 'SvelteKit' },
			{ name: 'TypeScript' },
			{ name: 'React' },
			{ name: 'Tailwind CSS' },
			{ name: 'HTML / CSS' }
		]
	},
	{
		category: 'Backend',
		skills: [
			{ name: 'Node.js' },
			{ name: 'Python' },
			{ name: 'PostgreSQL' },
			{ name: 'REST APIs' },
			{ name: 'GraphQL' }
		]
	},
	{
		category: 'DevOps & Tools',
		skills: [
			{ name: 'Git' },
			{ name: 'Docker' },
			{ name: 'CI/CD' },
			{ name: 'Linux' },
			{ name: 'AWS' }
		]
	}
];
