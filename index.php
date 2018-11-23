<?php
/**
 * Plugin Name:  Code Syntax Block
 * Plugin URI:   https://github.com/mkaz/code-syntax-block
 * Description:  A plugin to extend Gutenberg code block with syntax highlighting
 * Version:      0.6.1
 * Author:       Marcus Kazmierczak
 * Author URI:   https://mkaz.blog/
 * License:      GPL2
 * License URI:  https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:  code-syntax-block
 *
 * @package Code_Syntax_Block
 */

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
	$block_path        = 'build/block.built.js';
	$editor_style_path = 'assets/blocks.editor.css';

	// Block.
	wp_enqueue_script(
		'mkaz-code-syntax',
		plugins_url( $block_path, __FILE__ ),
		array( 'wp-blocks', 'wp-editor', 'wp-element', 'wp-i18n' ),
		filemtime( plugin_dir_path( __FILE__ ) . $block_path )
	);

	// Enqueue editor style.
	wp_enqueue_style(
		'mkaz-code-syntax-editor-css',
		plugins_url( $editor_style_path, __FILE__ ),
		array( 'wp-blocks' ),
		filemtime( plugin_dir_path( __FILE__ ) . $editor_style_path )
	);

	// Prepare Jed locale data.
	$locale_data = gutenberg_get_jed_locale_data( 'code-syntax-block' );
	wp_add_inline_script(
		'wp-i18n',
		sprintf( 'wp.i18n.setLocaleData( %s, "code-syntax-block" );', wp_json_encode( $locale_data ) )
	);

}
add_action( 'enqueue_block_editor_assets', 'mkaz_code_syntax_editor_assets' );

/**
 * Enqueue assets for viewing posts
 */
function mkaz_code_syntax_view_assets() {
	// Files.
	$view_style_path = 'assets/blocks.style.css';
	$prism_js_path   = 'assets/prism.js';
	$prism_settings_path = 'assets/prism-settings.js';
	$prism_css_path  = 'assets/prism.css';

	// Enqueue view style.
	wp_enqueue_style(
		'mkaz-code-syntax-css',
		plugins_url( $view_style_path, __FILE__ ),
		array(),
		filemtime( plugin_dir_path( __FILE__ ) . $view_style_path )
	);

	// Enqueue prism style.
	wp_enqueue_style(
		'mkaz-code-syntax-prism-css',
		plugins_url( $prism_css_path, __FILE__ ),
		array(),
		filemtime( plugin_dir_path( __FILE__ ) . $prism_css_path )
	);

	// Enqueue prism script.
	wp_enqueue_script(
		'mkaz-code-syntax-prism-css',
		plugins_url( $prism_js_path, __FILE__ ),
		array(), // No dependencies.
		filemtime( plugin_dir_path( __FILE__ ) . $prism_js_path ),
		true // In footer.
	);

	// enqueue prism settings script
	wp_enqueue_script(
		'mkaz-code-syntax-prism-settings',
		plugins_url( $prism_settings_path, __FILE__ ),
		[], // no dependencies
		filemtime( plugin_dir_path(__FILE__) . $prism_settings_path ),
		true // in footer
	);

	// save the plugin path
	wp_localize_script('mkaz-code-syntax-prism-settings', 'settings', array(
		'pluginUrl' => plugin_dir_url(__FILE__),
	));
}
add_action( 'wp_enqueue_scripts', 'mkaz_code_syntax_view_assets' );
