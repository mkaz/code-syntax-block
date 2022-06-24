<?php
/**
 * Code Syntax Block plugin settings page
 */

add_action( 'admin_menu', function() {
	add_options_page(
		'Code Syntax Block Settings',			// Title
		'Code Syntax Block',					// Menu Link
		'manage_options',						// capability
		'mkaz_code_syntax_block_settings',		// slug
		'mkaz_code_syntax_block_settings_page'	// callback
	);
} );

add_action( 'admin_init', function() {

	register_setting( 'mkaz_code_syntax_block_settings', 'mkaz-code-syntax-color-scheme' );
	register_setting( 'mkaz_code_syntax_block_settings', 'mkaz-code-syntax-default-lang' );

	add_settings_section(
		'mkaz_code_syntax_block_color_scheme',
		'',
		'',
		'mkaz_code_syntax_block_settings'
	);

	add_settings_field(
		'mkaz-code-syntax-color-scheme',
		__( 'Color Scheme', 'mkaz_code_syntax_block' ),
		'mkaz_code_syntax_block_color_scheme_field_callback',
		'mkaz_code_syntax_block_settings',						// Section
		'mkaz_code_syntax_block_color_scheme'					// Setting
	);

	add_settings_field(
		'mkaz-code-syntax-default-lang',
		__( 'Default Language', 'mkaz_code_syntax_block' ),
		'mkaz_code_syntax_block_default_lang_field_callback',
		'mkaz_code_syntax_block_settings',						// Section
		'mkaz_code_syntax_block_color_scheme'					// Setting
	);
});

function mkaz_code_syntax_block_color_scheme_field_callback() {
	$current_option = get_option( 'mkaz-code-syntax-color-scheme', 'prism-a11y-dark' );
	?>
	<select name="mkaz-code-syntax-color-scheme">
		<?php foreach ( MKAZ_CODE_SYNTAX_COLOR_SCHEMES as $k => $v ) : ?>
			<option
				<?php if ( $current_option === $k ) { echo "selected"; } ?>
				value="<?php echo esc_attr( $k ); ?>"
			>
				<?php echo esc_html( $v); ?>
			</option>
		<?php endforeach; ?>
	</select>
	<p><b>Note:</b> This will change the color scheme for all existing code syntax blocks.</p>
	<?php
}

function mkaz_code_syntax_block_default_lang_field_callback() {
	$current_option = get_option( 'mkaz-code-syntax-default-lang', '' );
	?>
	<input
		type="text"
		name="mkaz-code-syntax-default-lang"
		value="<?php echo esc_attr( $current_option ); ?>"
	/> (optional)
	<p> Automatically set this language when a code block is inserted, use language alias from <a href="https://prismjs.com/#supported-languages">supported languages list</a>.</p>
	<?php
}

function mkaz_code_syntax_block_settings_page() {
	?>
	<h2>Code Syntax Block Settings</h2>

	<form action="options.php" method="post">
		<table class="form-table">
			<?php settings_fields( 'mkaz_code_syntax_block_settings' ); ?>
			<?php do_settings_sections( 'mkaz_code_syntax_block_settings' ); ?>
			<?php submit_button(); ?>
		</table>
	</form>
	<?php
}
