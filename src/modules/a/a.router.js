const A = r => require.ensure([], () => r(require('./a')), 'a');
export default [{
	path: '/a',
	name: 'a',
	component: A
}
];
