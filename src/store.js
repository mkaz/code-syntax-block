import apiFetch from '@wordpress/api-fetch';
import { registerStore } from '@wordpress/data';

const selectors = {
	getColorScheme( state ) {
		const { colorScheme } = state;
		return colorScheme;
	},
};

const actions = {
	getColorScheme( path ) {
		return {
			type: 'GET_COLOR_SCHEME',
			path,
		};
	},
	updateColorSchemeState( colorScheme ) {
		return {
			type: 'UPDATE_COLOR_SCHEME',
			colorScheme,
		};
	},
};

const resolvers = {
	*getColorScheme() {
		const colorScheme = yield actions.getColorScheme(
			'/mkaz/code-syntax/v1/get/color-scheme/'
		);
		return actions.updateColorSchemeState( colorScheme );
	},
};

const reducer = ( state = { colorScheme: '' }, action ) => {
	switch ( action.type ) {
		case 'UPDATE_COLOR_SCHEME':
			return {
				...state,
				colorScheme: action.colorScheme,
			};
	}
	return state;
};

const controls = {
	GET_COLOR_SCHEME( action ) {
		return apiFetch( { path: action.path } );
	},
};

const store = registerStore( 'mkaz/code-syntax/data', {
	selectors,
	actions,
	resolvers,
	reducer,
	controls,
} );

export default store;
