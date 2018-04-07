<?php
/*
Plugin Name:  Code Syntax Block
Plugin URI:   https://github.com/mkaz/code-syntax-block
Description:  A Gutenberg code block with syntax highlighting
Author:       Marcus Kazmierczak
Author URI:   https://mkaz.blog/
*/


/**
 * Enqueue assets for editor portion of Gutenberg
 */
function mkaz_code_syntax_editor_assets() {
	// files
	$blockPath = 'build/block.built.js';
	$editorStylePath = 'assets/blocks.editor.css';

	// block
	wp_enqueue_script(
		'mkaz-code-syntax',
		plugins_url( $blockPath, __FILE__ ),
		[ 'wp-blocks', 'wp-element' ],
		filemtime( plugin_dir_path(__FILE__) . $blockPath )
	);

	// enqueue editor style
	wp_enqueue_style(
		'mkaz-code-syntax-editor-css',
		plugins_url( $editorStylePath, __FILE__),
		[ 'wp-blocks' ],
		filemtime( plugin_dir_path( __FILE__ ) . $editorStylePath )
	);

}
add_action( 'enqueue_block_editor_assets', 'mkaz_code_syntax_editor_assets' );

/**
 * Enqueue assets for viewing posts
 */
function mkaz_code_syntax_view_assets() {
	// files
	$viewStylePath = 'assets/blocks.style.css';
	$prismJsPath = 'assets/prism.js';
	$prismCssPath = 'assets/prism.css';

	// enqueue view style
	wp_enqueue_style(
		'mkaz-code-syntax-css',
		plugins_url( $viewStylePath, __FILE__ ),
		[],
		filemtime( plugin_dir_path(__FILE__) . $viewStylePath )
	);

	// enqueue prism style
	wp_enqueue_style(
		'mkaz-code-syntax-prism-css',
		plugins_url( $prismCssPath, __FILE__ ),
		[],
		filemtime( plugin_dir_path(__FILE__) . $prismCssPath )
	);

	// enqueue prism script
	wp_enqueue_script(
		'mkaz-code-syntax-prism-css',
		plugins_url( $prismJsPath, __FILE__ ),
		[], // no dependencies
		filemtime( plugin_dir_path(__FILE__) . $prismJsPath ),
		true // in footer
	);
}
add_action('wp_enqueue_scripts', 'mkaz_code_syntax_view_assets');