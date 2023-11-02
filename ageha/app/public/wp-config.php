<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * Localized language
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'local' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', 'root' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */


/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';


/* Add any custom values between this line and the "stop editing" line. */



/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
if ( ! defined( 'WP_DEBUG' ) ) {
	define( 'WP_DEBUG', false );
}



define( 'WP_ALLOW_MULTISITE', true );
define( 'MULTISITE', true );
define( 'SUBDOMAIN_INSTALL', false );
$base = '/';
define( 'DOMAIN_CURRENT_SITE', 'localhost:10003' );
define( 'PATH_CURRENT_SITE', '/' );
define( 'SITE_ID_CURRENT_SITE', 1 );
define( 'BLOG_ID_CURRENT_SITE', 1 );


define('AUTH_KEY',         'XyMl4GQc4X+oD+k40fhaA1xypCOL8lb0EEZrUg8DRrjc3FTXVVFLq6tOl2V8eUARq87Pu2ZvJAmM9eJUYiFyzg==');
define('SECURE_AUTH_KEY',  '8JwiZf7Ow3FIugKcEJ3lO0uj74lFiAB1cnGhsqb7M878WgmQ9NEP3WpmloPjHtnDzylYnrEcBEmFFqWlwxydAA==');
define('LOGGED_IN_KEY',    'EO1ODWzmtS+2Nd1gi9luh5blTPnmbwSB1w9vzH8i3I1jyOU+o81GzHwJV+OGwtA1wyAljSQoDSNWg7+16EhgxQ==');
define('NONCE_KEY',        'ccwH+8kc1PHbqy9QQGbEANs7OgojnloWZ3QKWhi+7BVW7EFCDCwJfrgZ9b+hKmNpQRPzFz/+ArkXoQPeWHrI9w==');
define('AUTH_SALT',        '0co/PYjbx69KVGs0InSUOJbRRvChvVxObLgiUg+vMbPSyv8w+cERppnQ6ZHiVQFyH5Ea9UvM7dOZYXtbnwzlTA==');
define('SECURE_AUTH_SALT', 'zAXloTVqMP4INmqHxFroLgEHG/CzeyRN6X6YN+IRmKE/INBofos0OzQrlgizpet0EwvJKQSywKSf3JWiehwOyw==');
define('LOGGED_IN_SALT',   'p86rA0nQHpY0/5EOKj1VnknhDDG7HRJXRgJJsqWzk10fx7Ww/6q20BXt+lWGCris03sKk21/CbR9BLMmU9qcwQ==');
define('NONCE_SALT',       'PQ6msdQSBBFTKWXEdzfc35XgbGoNJXPMf1JdYfYA8pzAdHMuIrocJnVw3qGXGCbkxyz2perg/0GMsuJ1VvS/dw==');
define( 'WP_ENVIRONMENT_TYPE', 'local' );
/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
