<?php
/**
 * Plugin Name: EquiNutrition - Store API
 * Description: API sécurisée pour les comptes clients, commandes, e-mails, contact et suivi EquiNutrition.
 * Version: 1.3.0
 */

defined( 'ABSPATH' ) || exit;

const EQUINUTRITION_API_VERSION = '1.3.0';

add_action( 'rest_api_init', function () {
    $routes = array(
        array( 'auth/register', 'POST', 'equinutrition_register', 'equinutrition_public_permission' ),
        array( 'auth/login', 'POST', 'equinutrition_login', 'equinutrition_public_permission' ),
        array( 'auth/logout', 'POST', 'equinutrition_logout', 'equinutrition_session_permission' ),
        array( 'auth/me', 'GET', 'equinutrition_me', 'equinutrition_session_permission' ),
        array( 'auth/verify-email', 'POST', 'equinutrition_verify_email', 'equinutrition_public_permission' ),
        array( 'auth/forgot-password', 'POST', 'equinutrition_forgot_password', 'equinutrition_public_permission' ),
        array( 'auth/reset-password', 'POST', 'equinutrition_reset_password', 'equinutrition_public_permission' ),
        array( 'auth/orders', 'GET', 'equinutrition_orders', 'equinutrition_session_permission' ),
        array( 'contact', 'POST', 'equinutrition_contact', 'equinutrition_public_permission' ),
        array( 'assessments', 'POST', 'equinutrition_assessment', 'equinutrition_public_permission' ),
        array( 'checkout', 'POST', 'equinutrition_checkout', 'equinutrition_public_permission' ),
        array( 'orders/lookup', 'POST', 'equinutrition_order_lookup', 'equinutrition_public_permission' ),
    );

    foreach ( $routes as $route ) {
        register_rest_route( 'equinutrition/v1', '/' . $route[0], array(
            'methods' => $route[1],
            'callback' => $route[2],
            'permission_callback' => $route[3],
        ) );
    }
} );

add_action( 'rest_api_init', function () {
    register_rest_route( 'equinutrition/v1', '/health', array(
        'methods' => 'GET',
        'callback' => function () { return new WP_REST_Response( array( 'status' => 'ok', 'plugin' => EQUINUTRITION_API_VERSION ), 200 ); },
        'permission_callback' => '__return_true',
    ) );
} );

function equinutrition_cors_origin() {
    if ( empty( $_SERVER['HTTP_ORIGIN'] ) ) {
        return '';
    }

    $origin = untrailingslashit( esc_url_raw( wp_unslash( $_SERVER['HTTP_ORIGIN'] ) ) );
    $allowed = defined( 'EQUINUTRITION_FRONTEND_URL' )
        ? untrailingslashit( EQUINUTRITION_FRONTEND_URL )
        : '';

    return $allowed && hash_equals( $allowed, $origin ) ? $origin : '';
}

add_filter( 'rest_pre_serve_request', function ( $served, $result, $request, $server ) {
    $origin = equinutrition_cors_origin();
    if ( ! $origin ) {
        return $served;
    }

    header( 'Access-Control-Allow-Origin: ' . $origin );
    header( 'Access-Control-Allow-Credentials: true' );
    header( 'Access-Control-Allow-Headers: Content-Type, Authorization' );
    header( 'Access-Control-Allow-Methods: GET, POST, OPTIONS' );
    header( 'Vary: Origin', false );

    return $served;
}, 10, 4 );

add_action( 'init', function () {
    if ( 'OPTIONS' === ( $_SERVER['REQUEST_METHOD'] ?? '' ) && equinutrition_cors_origin() ) {
        status_header( 204 );
        exit;
    }
} );

function equinutrition_json( $data, $status = 200 ) { return new WP_REST_Response( $data, $status ); }
function equinutrition_fail( $code, $message, $status = 400 ) { return new WP_Error( $code, $message, array( 'status' => $status ) ); }
function equinutrition_data( WP_REST_Request $request ) { $data = $request->get_json_params(); return is_array( $data ) ? $data : array(); }
function equinutrition_email() { return defined( 'EQUINUTRITION_CONTACT_EMAIL' ) && is_email( EQUINUTRITION_CONTACT_EMAIL ) ? EQUINUTRITION_CONTACT_EMAIL : 'info@equinutrition.fr'; }
function equinutrition_order_email_recipient() { return defined( 'EQUINUTRITION_ORDER_EMAIL' ) && is_email( EQUINUTRITION_ORDER_EMAIL ) ? EQUINUTRITION_ORDER_EMAIL : 'info@equinutrition.fr'; }
function equinutrition_frontend() { return defined( 'EQUINUTRITION_FRONTEND_URL' ) ? untrailingslashit( EQUINUTRITION_FRONTEND_URL ) : ''; }
function equinutrition_bank_details() {
    $details = array(
        'holder' => defined( 'EQUINUTRITION_BANK_HOLDER' ) ? trim( EQUINUTRITION_BANK_HOLDER ) : '',
        'iban' => defined( 'EQUINUTRITION_BANK_IBAN' ) ? trim( EQUINUTRITION_BANK_IBAN ) : '',
        'bic' => defined( 'EQUINUTRITION_BANK_BIC' ) ? trim( EQUINUTRITION_BANK_BIC ) : '',
    );
    return ( $details['holder'] && $details['iban'] && $details['bic'] ) ? $details : false;
}
function equinutrition_order_mail_headers( $reply_to = '' ) {
    $headers = array( 'Content-Type: text/html; charset=UTF-8', 'From: EquiNutrition <' . equinutrition_order_email_recipient() . '>' );
    if ( $reply_to && is_email( $reply_to ) ) $headers[] = 'Reply-To: ' . $reply_to;
    return $headers;
}
function equinutrition_order_email( WC_Order $order, $items, $bank, $internal = false ) {
    $reference = $order->get_order_number();
    $customer_name = trim( $order->get_billing_first_name() . ' ' . $order->get_billing_last_name() ) ?: 'Client EquiNutrition';
    $rows = '';
    foreach ( $items as $item ) {
        $name = sanitize_text_field( $item['name'] ?? 'Produit EquiNutrition' );
        $size = sanitize_text_field( $item['variation'] ?? '' );
        $quantity = max( 1, absint( $item['quantity'] ?? 1 ) );
        $unit = max( 0, (float) ( $item['price'] ?? 0 ) );
        $rows .= '<tr><td style="padding:12px 0;border-bottom:1px solid #e6e1d8;">' . esc_html( $name ) . '<br><small style="color:#667276;">' . ( $size ? esc_html( $size ) . ' · ' : '' ) . 'quantité ' . $quantity . '</small></td><td style="padding:12px 0;border-bottom:1px solid #e6e1d8;text-align:right;white-space:nowrap;">' . number_format_i18n( $unit * $quantity, 2 ) . ' €</td></tr>';
    }
    $address = nl2br( esc_html( $order->get_formatted_billing_address() ) );
    $bank_block = '<div style="margin-top:26px;padding:18px;background:#f5f1e8;border-left:4px solid #b85b43;"><strong>Coordonnées du virement</strong><br>Titulaire : ' . esc_html( $bank['holder'] ) . '<br>IBAN : ' . esc_html( $bank['iban'] ) . '<br>BIC : ' . esc_html( $bank['bic'] ) . '<br><small>Indiquez la référence ' . esc_html( $reference ) . ' dans le libellé du virement.</small></div>';
    $subject = $internal ? '[EquiNutrition] Nouvelle commande ' . $reference : 'Confirmation de commande ' . $reference . ' - EquiNutrition';
    $heading = $internal ? 'Nouvelle commande à traiter' : 'Votre commande est enregistrée';
    $intro = $internal ? 'Une nouvelle commande a été enregistrée par ' . esc_html( $customer_name ) . '.' : 'Bonjour ' . esc_html( $customer_name ) . ',<br>Merci pour votre commande. Elle est actuellement en attente de réception et validation du virement.';
    $message = '<!doctype html><html lang="fr"><body style="margin:0;background:#f5f1e8;font-family:Arial,sans-serif;color:#1d2a2e;"><div style="max-width:640px;margin:0 auto;padding:24px 14px;"><header style="background:#173d46;color:#fff;padding:28px 30px;"><div style="font-size:12px;letter-spacing:2px;color:#e1b866;font-weight:bold;">EQUINUTRITION</div><h1 style="margin:12px 0 0;font-size:25px;">' . $heading . '</h1></header><main style="background:#fff;padding:28px 30px;"><p style="font-size:16px;line-height:1.6;">' . $intro . '</p><div style="padding:14px;background:#f5f1e8;border-left:4px solid #b85b43;"><strong>Référence :</strong> ' . esc_html( $reference ) . '<br><strong>Total :</strong> ' . esc_html( $order->get_total() ) . ' €<br><strong>E-mail :</strong> ' . esc_html( $order->get_billing_email() ) . '</div><h2 style="font-size:17px;margin-top:28px;">Détail de la commande</h2><table style="width:100%;border-collapse:collapse;font-size:14px;"><tbody>' . $rows . '</tbody><tfoot><tr><td style="padding-top:16px;font-weight:bold;">Total TTC</td><td style="padding-top:16px;text-align:right;font-weight:bold;">' . esc_html( $order->get_total() ) . ' €</td></tr></tfoot></table><p style="margin-top:24px;font-size:14px;line-height:1.6;"><strong>Adresse de facturation</strong><br>' . $address . '</p>' . ( $internal ? $bank_block . '<p style="margin-top:20px;font-size:14px;">Le client a reçu les coordonnées bancaires dans son e-mail de confirmation.</p>' : $bank_block ) . '</main><footer style="padding:16px 30px;color:#526267;font-size:12px;">EquiNutrition · ' . esc_html( equinutrition_email() ) . '</footer></div></body></html>';
    return wp_mail( $internal ? equinutrition_order_email_recipient() : $order->get_billing_email(), $subject, $message, equinutrition_order_mail_headers( $internal ? '' : equinutrition_order_email_recipient() ) );
}

function equinutrition_rate_key() { $ip = isset( $_SERVER['REMOTE_ADDR'] ) ? sanitize_text_field( wp_unslash( $_SERVER['REMOTE_ADDR'] ) ) : 'unknown'; return 'equinutrition_rate_' . md5( $ip ); }
function equinutrition_public_permission() { $key = equinutrition_rate_key(); if ( (int) get_transient( $key ) >= 20 ) return equinutrition_fail( 'rate_limited', 'Trop de demandes. Réessayez dans quelques minutes.', 429 ); return true; }
function equinutrition_rate_failure() { $key = equinutrition_rate_key(); set_transient( $key, (int) get_transient( $key ) + 1, 15 * MINUTE_IN_SECONDS ); }
function equinutrition_session_cookie_name() { return 'equinutrition_session'; }
function equinutrition_bearer( WP_REST_Request $request ) { $header = preg_replace( '/^Bearer\s+/i', '', (string) $request->get_header( 'authorization' ) ); return $header ?: sanitize_text_field( wp_unslash( $_COOKIE[ equinutrition_session_cookie_name() ] ?? '' ) ); }
function equinutrition_session_key( $token ) { return 'equinutrition_session_' . hash( 'sha256', $token ); }
function equinutrition_user( WP_REST_Request $request ) { $token = equinutrition_bearer( $request ); $id = $token ? (int) get_transient( equinutrition_session_key( $token ) ) : 0; return $id ? get_user_by( 'id', $id ) : false; }
function equinutrition_session_permission( WP_REST_Request $request ) { $user = equinutrition_user( $request ); return $user ? true : equinutrition_fail( 'auth_required', 'Connexion requise.', 401 ); }
function equinutrition_issue_session( WP_User $user ) { $token = wp_generate_password( 64, false, false ); set_transient( equinutrition_session_key( $token ), $user->ID, 14 * DAY_IN_SECONDS ); setcookie( equinutrition_session_cookie_name(), $token, array( 'expires' => time() + 14 * DAY_IN_SECONDS, 'path' => '/', 'secure' => is_ssl(), 'httponly' => true, 'samesite' => 'Lax' ) ); return $token; }
function equinutrition_clear_session_cookie() { setcookie( equinutrition_session_cookie_name(), '', array( 'expires' => time() - HOUR_IN_SECONDS, 'path' => '/', 'secure' => is_ssl(), 'httponly' => true, 'samesite' => 'Lax' ) ); }
function equinutrition_user_payload( WP_User $user, $token = '' ) { $payload = array( 'id' => $user->ID, 'email' => $user->user_email, 'firstName' => get_user_meta( $user->ID, 'first_name', true ), 'lastName' => get_user_meta( $user->ID, 'last_name', true ), 'accountType' => get_user_meta( $user->ID, 'equinutrition_account_type', true ) ?: 'particulier', 'demo' => false ); if ( $token ) $payload['token'] = $token; return $payload; }

function equinutrition_register( WP_REST_Request $request ) {
    $data = equinutrition_data( $request );
    $email = sanitize_email( $data['email'] ?? '' );
    $password = (string) ( $data['password'] ?? '' );
    $first = sanitize_text_field( $data['firstName'] ?? '' );
    $last = sanitize_text_field( $data['lastName'] ?? '' );
    $name = trim( $first . ' ' . $last ) ?: sanitize_text_field( $data['name'] ?? '' );
    if ( ! is_email( $email ) || strlen( $password ) < 8 || ! $name ) { equinutrition_rate_failure(); return equinutrition_fail( 'invalid_registration', 'Nom, e-mail et mot de passe de 8 caractères minimum requis.', 422 ); }
    if ( email_exists( $email ) ) { equinutrition_rate_failure(); return equinutrition_fail( 'email_exists', 'Cette adresse e-mail est déjà enregistrée.', 409 ); }
    $key = wp_generate_password( 64, false, false );
    $iv = random_bytes( openssl_cipher_iv_length( 'aes-256-cbc' ) );
    $encrypted = base64_encode( $iv . openssl_encrypt( $password, 'aes-256-cbc', wp_salt( 'auth' ), OPENSSL_RAW_DATA, $iv ) );
    $account_type = in_array( $data['accountType'] ?? 'particulier', array( 'particulier', 'professionnel' ), true ) ? $data['accountType'] : 'particulier';
    set_transient( 'equinutrition_pending_' . hash( 'sha256', $key ), array( 'email' => $email, 'first' => $first, 'last' => $last, 'password' => $encrypted, 'accountType' => $account_type, 'company' => sanitize_text_field( $data['company'] ?? '' ), 'vat' => sanitize_text_field( $data['vat'] ?? '' ), 'newsletter' => ! empty( $data['newsletter'] ) ), 2 * DAY_IN_SECONDS );
    $url = add_query_arg( array( 'key' => $key, 'email' => rawurlencode( $email ) ), equinutrition_frontend() . '/verification-email' );
    $headers = array( 'Content-Type: text/html; charset=UTF-8', 'From: EquiNutrition <' . equinutrition_email() . '>', 'Reply-To: ' . equinutrition_email() );
    if ( ! wp_mail( $email, 'Confirmez votre adresse e-mail - EquiNutrition', '<p>Bonjour ' . esc_html( $name ) . ',</p><p><a href="' . esc_url( $url ) . '">Confirmer mon adresse e-mail</a></p><p>Ce lien est valable 48 heures.</p>', $headers ) ) return equinutrition_fail( 'mail_failed', 'L’e-mail de confirmation n’a pas pu être envoyé.', 500 );
    return equinutrition_json( array( 'success' => true, 'verification_required' => true, 'message' => 'Un e-mail de confirmation vous a été envoyé.' ), 201 );
}

function equinutrition_login( WP_REST_Request $request ) {
    $data = equinutrition_data( $request ); $email = sanitize_email( $data['email'] ?? '' ); $user = $email ? get_user_by( 'email', $email ) : false; $auth = $user ? wp_authenticate( $user->user_login, (string) ( $data['password'] ?? '' ) ) : new WP_Error( 'invalid' );
    if ( is_wp_error( $auth ) ) { equinutrition_rate_failure(); return equinutrition_fail( 'invalid_login', 'E-mail ou mot de passe incorrect.', 401 ); }
    delete_transient( equinutrition_rate_key() ); equinutrition_issue_session( $auth ); return equinutrition_json( array( 'success' => true, 'user' => equinutrition_user_payload( $auth ) ) );
}
function equinutrition_logout( WP_REST_Request $request ) { delete_transient( equinutrition_session_key( equinutrition_bearer( $request ) ) ); equinutrition_clear_session_cookie(); return equinutrition_json( array( 'success' => true ) ); }
function equinutrition_me( WP_REST_Request $request ) { $user = equinutrition_user( $request ); return equinutrition_json( array( 'success' => true, 'user' => equinutrition_user_payload( $user ) ) ); }

function equinutrition_verify_email( WP_REST_Request $request ) {
    $data = equinutrition_data( $request ); $key = sanitize_text_field( $data['key'] ?? '' ); $email = sanitize_email( $data['email'] ?? '' ); $pending = get_transient( 'equinutrition_pending_' . hash( 'sha256', $key ) );
    if ( ! is_array( $pending ) || strtolower( $pending['email'] ) !== strtolower( $email ) ) return equinutrition_fail( 'invalid_verification_key', 'Lien de vérification invalide ou expiré.', 400 );
    if ( email_exists( $email ) ) { delete_transient( 'equinutrition_pending_' . hash( 'sha256', $key ) ); return equinutrition_fail( 'email_exists', 'Cette adresse e-mail est déjà enregistrée. Connectez-vous.', 409 ); }
    $encoded = base64_decode( $pending['password'], true ); $iv_len = openssl_cipher_iv_length( 'aes-256-cbc' ); $password = openssl_decrypt( substr( $encoded, $iv_len + 0 ), 'aes-256-cbc', wp_salt( 'auth' ), OPENSSL_RAW_DATA, substr( $encoded, 0, $iv_len ) );
    if ( ! $password ) return equinutrition_fail( 'invalid_registration', 'Les données d’inscription sont invalides.', 400 );
    $username = sanitize_user( strstr( $email, '@', true ), true ) ?: 'client'; $base = $username; $i = 2; while ( username_exists( $username ) ) $username = $base . $i++;
    $id = function_exists( 'wc_create_new_customer' ) ? wc_create_new_customer( $email, $username, $password ) : wp_create_user( $username, $password, $email ); if ( is_wp_error( $id ) ) return $id;
    wp_update_user( array( 'ID' => $id, 'first_name' => $pending['first'], 'last_name' => $pending['last'], 'display_name' => trim( $pending['first'] . ' ' . $pending['last'] ) ) ); update_user_meta( $id, 'equinutrition_account_type', $pending['accountType'] ); update_user_meta( $id, 'equinutrition_company', $pending['company'] ); update_user_meta( $id, 'equinutrition_vat', $pending['vat'] ); update_user_meta( $id, 'equinutrition_newsletter', $pending['newsletter'] ? '1' : '0' ); delete_transient( 'equinutrition_pending_' . hash( 'sha256', $key ) ); return equinutrition_json( array( 'success' => true, 'message' => 'Adresse confirmée. Vous pouvez vous connecter.' ) );
}
function equinutrition_forgot_password( WP_REST_Request $request ) { $email = sanitize_email( equinutrition_data( $request )['email'] ?? '' ); $user = $email ? get_user_by( 'email', $email ) : false; if ( $user ) { $key = get_password_reset_key( $user ); $url = add_query_arg( array( 'key' => $key, 'login' => $user->user_login ), equinutrition_frontend() . '/reinitialisation' ); wp_mail( $email, 'Réinitialisation de votre mot de passe - EquiNutrition', '<p><a href="' . esc_url( $url ) . '">Choisir un nouveau mot de passe</a></p>', array( 'Content-Type: text/html; charset=UTF-8' ) ); } return equinutrition_json( array( 'success' => true, 'message' => 'Si le compte existe, un e-mail a été envoyé.' ) ); }
function equinutrition_reset_password( WP_REST_Request $request ) { $data = equinutrition_data( $request ); if ( strlen( (string) ( $data['password'] ?? '' ) ) < 8 ) return equinutrition_fail( 'invalid_password', 'Mot de passe trop court.', 422 ); $user = check_password_reset_key( sanitize_text_field( $data['key'] ?? '' ), sanitize_text_field( $data['login'] ?? '' ) ); if ( is_wp_error( $user ) ) return equinutrition_fail( 'invalid_reset_key', 'Lien invalide ou expiré.', 400 ); wp_set_password( (string) $data['password'], $user->ID ); return equinutrition_json( array( 'success' => true ) ); }

function equinutrition_contact( WP_REST_Request $request ) { $data = equinutrition_data( $request ); $email = sanitize_email( $data['email'] ?? '' ); if ( ! is_email( $email ) || empty( $data['name'] ) || empty( $data['message'] ) ) return equinutrition_fail( 'invalid_contact', 'Nom, e-mail et message requis.', 422 ); $subject = '[EquiNutrition] ' . sanitize_text_field( $data['subject'] ?? 'Nouveau message' ); $message = "Nom : " . sanitize_text_field( $data['name'] ) . "\nE-mail : " . $email . "\nTéléphone : " . sanitize_text_field( $data['phone'] ?? '' ) . "\n\n" . sanitize_textarea_field( $data['message'] ); $sent = wp_mail( equinutrition_email(), $subject, $message, array( 'Reply-To: ' . $email ) ); return $sent ? equinutrition_json( array( 'id' => wp_generate_uuid4() ), 201 ) : equinutrition_fail( 'mail_failed', 'Message non envoyé.', 500 ); }
function equinutrition_assessment( WP_REST_Request $request ) { $data = equinutrition_data( $request ); $email = sanitize_email( $data['email'] ?? '' ); if ( ! is_email( $email ) ) return equinutrition_fail( 'invalid_email', 'E-mail invalide.', 422 ); wp_mail( equinutrition_email(), '[EquiNutrition] Nouveau bilan équin', print_r( $data, true ) ); return equinutrition_json( array( 'id' => wp_generate_uuid4() ), 201 ); }

function equinutrition_checkout( WP_REST_Request $request ) {
    if ( ! function_exists( 'wc_create_order' ) ) return equinutrition_fail( 'woocommerce_missing', 'WooCommerce doit être activé.', 500 );
    $data = equinutrition_data( $request ); $items = is_array( $data['items'] ?? null ) ? $data['items'] : array(); $customer = is_array( $data['customer'] ?? null ) ? $data['customer'] : array(); $address = is_array( $data['shippingAddress'] ?? null ) ? $data['shippingAddress'] : array();
    $first_name = sanitize_text_field( $customer['firstName'] ?? '' ); $last_name = sanitize_text_field( $customer['lastName'] ?? '' ); $line_1 = sanitize_text_field( $address['line1'] ?? '' ); $postal_code = sanitize_text_field( $address['postalCode'] ?? '' ); $city = sanitize_text_field( $address['city'] ?? '' ); $phone = sanitize_text_field( $address['phone'] ?? '' ); $country = strtoupper( sanitize_text_field( $address['country'] ?? '' ) );
    if ( ! $first_name || ! $last_name || ! $line_1 || ! $postal_code || ! $city || ! $phone || ! preg_match( '/^[A-Z]{2}$/', $country ) ) return equinutrition_fail( 'invalid_checkout_details', 'Les coordonnées de livraison sont incomplètes.', 422 );
    $address['country'] = $country;
    if ( ! $items || ! is_email( $customer['email'] ?? '' ) ) return equinutrition_fail( 'invalid_checkout', 'Articles et e-mail requis.', 422 );
    $bank = equinutrition_bank_details();
    if ( ! $bank ) return equinutrition_fail( 'bank_details_not_configured', 'Le paiement par virement est momentanément indisponible. Contactez le service client.', 503 );
    $validated_items = array();
    foreach ( $items as $item ) {
        $product_id = absint( $item['productId'] ?? 0 );
        $name = sanitize_text_field( $item['name'] ?? '' );
        $size = sanitize_text_field( $item['variation'] ?? '' );
        $quantity = absint( $item['quantity'] ?? 0 );
        $unit_price = max( 0, (float) ( $item['price'] ?? 0 ) );
        if ( ! $product_id || ! $name || $quantity < 1 || $quantity > 20 || $unit_price <= 0 ) return equinutrition_fail( 'invalid_cart', 'Un article du panier est invalide.', 422 );
        $validated_items[] = array( 'productId' => $product_id, 'name' => $name, 'variation' => $size, 'quantity' => $quantity, 'unit_price' => $unit_price );
    }
    $subtotal = array_sum( array_map( function ( $item ) { return $item['unit_price'] * $item['quantity']; }, $validated_items ) );
    $shipping_methods = array( 'point-relais' => 4.90, 'dpd-travail' => 6.50, 'dpd-domicile' => 7.90, 'colissimo' => 6.90, 'chronopost' => 12.90, 'click-collect' => 0.00 );
    $shipping_method = sanitize_key( $data['shippingMethod'] ?? '' );
    if ( ! array_key_exists( $shipping_method, $shipping_methods ) ) return equinutrition_fail( 'invalid_shipping_method', 'Le mode de livraison sélectionné est invalide.', 422 );
    $shipping_cost = ( 'click-collect' === $shipping_method || $subtotal >= 79 ) ? 0.00 : $shipping_methods[ $shipping_method ];
    $order = wc_create_order(); $billing = array( 'first_name' => sanitize_text_field( $customer['firstName'] ?? '' ), 'last_name' => sanitize_text_field( $customer['lastName'] ?? '' ), 'email' => sanitize_email( $customer['email'] ), 'phone' => sanitize_text_field( $address['phone'] ?? '' ), 'address_1' => sanitize_text_field( $address['line1'] ?? '' ), 'address_2' => sanitize_text_field( $address['line2'] ?? '' ), 'postcode' => sanitize_text_field( $address['postalCode'] ?? '' ), 'city' => sanitize_text_field( $address['city'] ?? '' ), 'country' => sanitize_text_field( $address['country'] ?? 'FR' ) ); $order->set_address( $billing, 'billing' ); $order->set_address( $billing, 'shipping' );
    foreach ( $validated_items as $item ) {
        $size = sanitize_text_field( $item['variation'] ?? '' );
        $quantity = max( 1, absint( $item['quantity'] ?? 1 ) );
        $unit_price = $item['unit_price'];
        $order_item = new WC_Order_Item_Product();
        $order_item->set_name( $item['name'] . ( $size ? ' - ' . $size : '' ) );
        $order_item->set_quantity( $quantity );
        $order_item->set_subtotal( $unit_price * $quantity );
        $order_item->set_total( $unit_price * $quantity );
        $order_item->add_meta_data( 'Identifiant produit', $item['productId'], true );
        $order->add_item( $order_item );
    }
    if ( $shipping_cost > 0 ) { $shipping = new WC_Order_Item_Shipping(); $shipping->set_method_title( $shipping_method ); $shipping->set_method_id( $shipping_method ); $shipping->set_total( $shipping_cost ); $order->add_item( $shipping ); }
    $order->calculate_totals(); $order->set_payment_method( 'bacs' ); $order->set_payment_method_title( 'Virement bancaire' ); $order->update_status( 'pending' ); $order->save();
    $customer_mail_sent = equinutrition_order_email( $order, $items, $bank, false );
    $admin_mail_sent = equinutrition_order_email( $order, $items, $bank, true );
    if ( ! $customer_mail_sent || ! $admin_mail_sent ) {
        error_log( '[EquiNutrition] Echec e-mail commande ' . $order->get_order_number() . ' : client=' . ( $customer_mail_sent ? 'ok' : 'ko' ) . ', admin=' . ( $admin_mail_sent ? 'ok' : 'ko' ) );
    }
    $confirmation_url = add_query_arg( array( 'order' => $order->get_order_number() ), equinutrition_frontend() . '/commande-confirmee' );
    return equinutrition_json( array( 'checkoutUrl' => $confirmation_url, 'orderId' => $order->get_id(), 'reference' => $order->get_order_number(), 'customerEmailSent' => (bool) $customer_mail_sent, 'adminEmailSent' => (bool) $admin_mail_sent ), 201 );
}
function equinutrition_orders( WP_REST_Request $request ) { $user = equinutrition_user( $request ); if ( ! function_exists( 'wc_get_orders' ) ) return equinutrition_fail( 'woocommerce_missing', 'WooCommerce doit être activé.', 500 ); $orders = wc_get_orders( array( 'billing_email' => $user->user_email, 'limit' => 50, 'orderby' => 'date', 'order' => 'DESC', 'return' => 'objects' ) ); return equinutrition_json( array( 'orders' => array_map( function ( $order ) { return array( 'id' => $order->get_id(), 'reference' => $order->get_order_number(), 'status' => $order->get_status(), 'total' => $order->get_total(), 'date' => $order->get_date_created() ? $order->get_date_created()->date( 'c' ) : '' ); }, $orders ) ) ); }
function equinutrition_order_lookup( WP_REST_Request $request ) { $data = equinutrition_data( $request ); $email = sanitize_email( $data['email'] ?? '' ); $number = sanitize_text_field( $data['orderNumber'] ?? '' ); $orders = function_exists( 'wc_get_orders' ) ? wc_get_orders( array( 'billing_email' => $email, 'limit' => 50, 'return' => 'objects' ) ) : array(); foreach ( $orders as $order ) if ( (string) $order->get_order_number() === $number ) return equinutrition_json( array( 'orderNumber' => $number, 'status' => $order->get_status(), 'trackingUrl' => '' ) ); return equinutrition_fail( 'order_not_found', 'Commande introuvable.', 404 ); }
