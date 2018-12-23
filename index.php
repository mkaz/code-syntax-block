<?php
/**
 * Plugin Name:  Code Syntax Block
 * Plugin URI:   https://github.com/mkaz/code-syntax-block
 * Description:  A plugin to extend Gutenberg code block with syntax highlighting
 * Version:      0.8.2
 * Author:       Marcus Kazmierczak
 * Author URI:   https://mkaz.blog/
 * License:      GPL2
 * License URI:  https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:  code-syntax-block
 *
 * @package Code_Syntax_Block
 */

// version added, used in URL
define( 'MKAZ_CODE_SYNTAX_BLOCK_VERSION', '0.8.2' );

/**
 * Load text domain.
 */
function mkaz_load_plugin_textdomain() {
	load_plugin_textdomain( 'code-syntax-block', false, dirname( plugin_basename( __FILE__ ) ) . '/languages' );
}
add_action( 'plugins_loaded', 'mkaz_load_plugin_textdomain' );

/**
 * Enqueue assets for editor portion of Gutenberg
 */
function mkaz_code_syntax_editor_assets() {
	// Files.
	$block_path        = 'code-syntax.js';
	$prism_languages_path = 'assets/prism/prism-manage.js';
	$editor_style_path = 'assets/blocks.editor.css';

	// Prism Languages
	wp_enqueue_script(
		'mkaz-code-syntax-langs',
		plugins_url( $prism_languages_path, __FILE__ ),
		[],
		filemtime( plugin_dir_path( __FILE__ ) . $prism_languages_path )
	);

	// Block.
	wp_enqueue_script(
		'mkaz-code-syntax',
		plugins_url( $block_path, __FILE__ ),
		array( 'wp-blocks', 'wp-editor', 'wp-element' ),
		filemtime( plugin_dir_path( __FILE__ ) . $block_path )
	);

}
add_action( 'enqueue_block_editor_assets', 'mkaz_code_syntax_editor_assets' );

/**
 * Enqueue assets for viewing posts
 */
function mkaz_code_syntax_view_assets() {
	// Files.
	$view_style_path = 'assets/blocks.style.css';
	$prism_js_path   = 'assets/prism/prism.js';
	$prism_manager_path = 'assets/prism/prism-manager.js';

	// Enqueue view style.
	// wp_enqueue_style(
	// 	'mkaz-code-syntax-css',
	// 	plugins_url( $view_style_path, __FILE__ ),
	// 	[],
	// 	filemtime( plugin_dir_path( __FILE__ ) . $view_style_path )
	// );

	// Enqueue prism style.
	// wp_enqueue_style(
	// 	'mkaz-code-syntax-prism-css',
	// 	mkaz_prism_theme_css(),
	// 	[],
	// 	mkaz_prism_theme_css_ver()
	// );

	// Enqueue prism script.
	// wp_enqueue_script(
	// 	'mkaz-code-syntax-prism-script',
	// 	plugins_url( $prism_js_path, __FILE__ ),
	// 	[], // No dependencies.
	// 	filemtime( plugin_dir_path( __FILE__ ) . $prism_js_path ),
	// 	true // In footer.
	// );

	// enqueue prism settings script
	wp_enqueue_script(
		'mkaz-code-syntax-prism-settings',
		plugins_url( $prism_manager_path, __FILE__ ),
		[], // no dependencies
		filemtime( plugin_dir_path(__FILE__) . $prism_manager_path ),
		true // in footer
	);

	// save the plugin path
	wp_localize_script('mkaz-code-syntax-prism-settings', 'settings', array(
		'pluginUrl' => plugin_dir_url(__FILE__),
	));
}
add_action( 'wp_enqueue_scripts', 'mkaz_code_syntax_view_assets' );

/**
 * Locate a given resource URL in the active theme or with the default
 *
 * @param boolean $rtnPath True returns path, default false returns URL
 */
function mkaz_prism_theme_css( $rtnPath = false ) {

	$default_path = '/assets/prism/prism.css';
	/**
	 * Filter the theme directory path used for overriding css path
	 *
	 * @since 0.8.2
	 *
	 * @param string $path Path to the file to override, relative to the theme
	 */
	$css_rel_path = apply_filters( 'mkaz_prism_css_path', $default_path );
	$theme_file_path = get_stylesheet_directory() . $css_rel_path;

	if ( file_exists( $theme_file_path ) ) {
		$prism_css_path = $theme_file_path;
		$prism_css_url = get_stylesheet_directory_uri() . $css_rel_path;
	}
	else {
		$prism_css_path = plugin_dir_path( __FILE__ ) . $default_path;
		$prism_css_url = plugins_url( $default_path, __FILE__ );
	}

	if ( $rtnPath ) {
		return $prism_css_path;
	}

	/**
	 * Filter the URL of the Syntax Highlighting colors.
	 * Use this filter to define your own color set.
	 *
	 * @since 0.8.1
	 *
	 * @param string $prism_css_url Absolute URL of the default CSS file you want to enqueue.
	 */
	return apply_filters( 'mkaz_prism_css_url', $prism_css_url );
}

/**
 * Return timestamp for theme_css to be used in enqueue version
 *
 */
function mkaz_prism_theme_css_ver() {
	// check if full url is being used, if so return 0
	$prism_css_url = apply_filters( 'mkaz_prism_css_url', false );
	if ( $prism_css_url ) {
		return MKAZ_CODE_SYNTAX_BLOCK_VERSION;
	}

	$css_path = mkaz_prism_theme_css( true );
	if ( file_exists( $css_path ) ) {
		return filemtime( $css_path );
	}
	return MKAZ_CODE_SYNTAX_BLOCK_VERSION;
}
