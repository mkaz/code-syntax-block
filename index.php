<?php
/**
 * Plugin Name:  Code Syntax Block
 * Plugin URI:   https://github.com/mkaz/code-syntax-block
 * Description:  A plugin to extend Gutenberg code block with syntax highlighting
 * Version:      0.4.0
 * Author:       Marcus Kazmierczak
 * Author URI:   https://mkaz.blog/
 * License:      GPL2
 * License URI:  https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:  code-syntax-block
 * Requires PHP: 5.4
 *
 * @package Code_Syntax_Block
 */

/**
 * Load text domain.
 */
function mkaz_load_plugin_textdomain() {
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	load_plugin_textdomain( 'code-syntax-block', false, dirname( plugin_basename( __FILE__ ) ) . '/languages' );

	register_block_type( 'core/code', array(
		'render_callback' => 'mkaz_code_syntax_render_block',
	) );
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
		array( 'wp-blocks', 'wp-element', 'wp-i18n' ),
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
	$view_style_path    = 'assets/blocks.style.css';
	$default_style_path = 'vendor/scrivo/highlight.php/styles/default.css';

	// Enqueue view style.
	wp_enqueue_style(
		'mkaz-code-syntax-css',
		plugins_url( $view_style_path, __FILE__ ),
		array(),
		filemtime( plugin_dir_path( __FILE__ ) . $view_style_path )
	);

	// Enqueue prism style.
	wp_enqueue_style(
		'mkaz-code-syntax-hljs-default',
		plugins_url( $default_style_path, __FILE__ ),
		array(),
		filemtime( plugin_dir_path( __FILE__ ) . $default_style_path )
	);
}
add_action( 'wp_enqueue_scripts', 'mkaz_code_syntax_view_assets' );

/**
 * Render code block.
 *
 * @param array  $attributes Attributes.
 * @param string $content    Content.
 * @return string Highlighted content.
 */
function mkaz_code_syntax_render_block( $attributes, $content ) {
	$pattern  = '(?P<before><pre.*?><code.*?>)';
	$pattern .= '(?P<code>.*)';
	$after    = '</code></pre>';
	$pattern .= $after;

	if ( ! preg_match( '#^\s*' . $pattern . '\s*$#s', $content, $matches ) ) {
		return $content;
	}

	if ( ! isset( $attributes['language'] ) ) {
		$attributes['language'] = '';
	}

	$inject_language_class = function( $start_tags, $language ) {
		$start_tags = preg_replace(
			'/(<code[^>]*class=")/',
			'$1' . esc_attr( $language . ' ' ),
			$start_tags,
			1,
			$count
		);
		if ( 0 === $count ) {
			$start_tags = preg_replace(
				'/(?<=<code)(?=>)/',
				sprintf( ' class="%s"', esc_attr( "language-$language" ) ),
				$start_tags,
				1
			);
		}
		return $start_tags;
	};

	$transient_key = 'code-syntax-block-' . md5( $attributes['language'] . $matches['code'] ) . '-v1';
	$highlighted   = get_transient( $transient_key );

	if ( $highlighted && isset( $highlighted['code'] ) ) {
		if ( isset( $highlighted['language'] ) ) {
			$matches['before'] = $inject_language_class( $matches['before'], $highlighted['language'] );
		}
		return $matches['before'] . $highlighted['code'] . $after;
	}

	try {
		if ( ! class_exists( '\Highlight\Autoloader' ) ) {
			require_once __DIR__ . '/vendor/scrivo/highlight.php/Highlight/Autoloader.php';
			spl_autoload_register( 'Highlight\Autoloader::load' );
		}

		$highlighter = new \Highlight\Highlighter();
		$language    = $attributes['language'];
		$code        = html_entity_decode( $matches['code'], ENT_QUOTES );

		// Convert from Prism.js languages names.
		if ( 'clike' === $language ) {
			$language = 'cpp';
		} elseif ( 'git' === $language ) {
			$language = 'diff'; // Best match.
		} elseif ( 'markup' === $language ) {
			$language = 'xml';
		}

		if ( $language ) {
			$r = $highlighter->highlight( $language, $code );
		} else {
			$r = $highlighter->highlightAuto( $code );
		}

		$code        = $r->value;
		$language    = $r->language;
		$highlighted = compact( 'code', 'language' );

		set_transient( $transient_key, compact( 'code', 'language' ) );

		$matches['before'] = $inject_language_class( $matches['before'], $highlighted['language'] );

		return $matches['before'] . $code . $after;
	} catch ( \Exception $e ) {
		return sprintf(
			'<!-- %s(%s): %s -->%s',
			get_class( $e ),
			$e->getCode(),
			str_replace( '--', '', $e->getMessage() ),
			$content
		);
	}
}
