import type { Project } from '$lib/types';

export const projects: Project[] = [
	{
		title: 'E-Commerce Platform',
		slug: 'ecommerce-platform',
		description: 'A full-stack e-commerce platform with real-time inventory and Stripe payments.',
		tech: ['SvelteKit', 'TypeScript', 'PostgreSQL', 'Stripe'],
		github: 'https://github.com/yourusername/ecommerce',
		live: 'https://example-shop.com',
		featured: true
	},
	{
		title: 'Task Management App',
		slug: 'task-management',
		description: 'A collaborative task manager with drag-and-drop boards and real-time sync.',
		tech: ['React', 'Node.js', 'WebSocket', 'MongoDB'],
		github: 'https://github.com/yourusername/tasks',
		featured: true
	},
	{
		title: 'CLI DevTools',
		slug: 'cli-devtools',
		description: 'A collection of CLI tools for automating common development workflows.',
		tech: ['Rust', 'CLI', 'GitHub Actions'],
		github: 'https://github.com/yourusername/devtools',
		featured: false
	}
];
