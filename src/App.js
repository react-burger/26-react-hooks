import React, { useState, useEffect } from 'react';

import Todo from './components/Todo';
import Header from './components/Header';
import Auth from './components/Auth';
import AuthContext from './auth-context';

const app = (props) => {
	const [ page, setPage ] = useState('auth');
	const [ authStatus, setAuthStatus ] = useState(false);

	useEffect(() => {}, authStatus);

	const switchPage = (pageName) => {
		setPage(pageName);
	};

	const login = () => {
		setAuthStatus(true);
	};

	const logout = () => {
		setAuthStatus(false);
	};

	/* Alternatives from Q&A instead of .bind:
	 1. onLoadTodos={() => switchPage('todos')
	 2. If you define the function like:
		const switchPage = pageName = () => setPage(pageName)
		then:
		onLoadAuth={switchPage('auth')}
		3. onLoadTodos={setPage.bind(this, 'todos')}
	 */

	return (
		<div className="App">
			<AuthContext.Provider value={{ status: authStatus, login: login }}>
				<Header onLoadTodos={switchPage.bind(this, 'todos')} onLoadAuth={switchPage.bind(this, 'auth')} />
				<hr />
				{page === 'todos' ? <Todo /> : <Auth onLogout={logout} />}
			</AuthContext.Provider>
		</div>
	);
};

export default app;
