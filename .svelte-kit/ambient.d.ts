
// this file is generated — do not edit it


/// <reference types="@sveltejs/kit" />

/**
 * This module provides access to environment variables that are injected _statically_ into your bundle at build time and are limited to _private_ access.
 * 
 * |         | Runtime                                                                    | Build time                                                               |
 * | ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
 * | Private | [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private) | [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private) |
 * | Public  | [`$env/dynamic/public`](https://svelte.dev/docs/kit/$env-dynamic-public)   | [`$env/static/public`](https://svelte.dev/docs/kit/$env-static-public)   |
 * 
 * Static environment variables are [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env` at build time and then statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * **_Private_ access:**
 * 
 * - This module cannot be imported into client-side code
 * - This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured)
 * 
 * For example, given the following build time environment:
 * 
 * ```env
 * ENVIRONMENT=production
 * PUBLIC_BASE_URL=http://site.com
 * ```
 * 
 * With the default `publicPrefix` and `privatePrefix`:
 * 
 * ```ts
 * import { ENVIRONMENT, PUBLIC_BASE_URL } from '$env/static/private';
 * 
 * console.log(ENVIRONMENT); // => "production"
 * console.log(PUBLIC_BASE_URL); // => throws error during build
 * ```
 * 
 * The above values will be the same _even if_ different values for `ENVIRONMENT` or `PUBLIC_BASE_URL` are set at runtime, as they are statically replaced in your code with their build time values.
 */
declare module '$env/static/private' {
	export const AGENTROUTER_API_KEY: string;
	export const ALIBABA_API_KEY: string;
	export const ALLUSERSPROFILE: string;
	export const APPDATA: string;
	export const ATLASCLOUD_API_KEY: string;
	export const AUXILIARY_VISION_MODEL: string;
	export const AUXILIARY_VISION_PROVIDER: string;
	export const BROWSERBASE_ADVANCED_STEALTH: string;
	export const BROWSERBASE_PROXIES: string;
	export const BROWSER_INACTIVITY_TIMEOUT: string;
	export const BROWSER_SESSION_TIMEOUT: string;
	export const CEREBRAS_API_KEY: string;
	export const CLAUDIN_API_KEY: string;
	export const COLOR: string;
	export const COMMONPROGRAMFILES: string;
	export const COMMONPROGRAMW6432: string;
	export const COMPUTERNAME: string;
	export const COMSPEC: string;
	export const DISCORD_ALLOWED_CHANNELS: string;
	export const DISCORD_HISTORY_BACKFILL: string;
	export const DISCORD_HISTORY_BACKFILL_LIMIT: string;
	export const DISCORD_REACTIONS: string;
	export const DISCORD_THREAD_REQUIRE_MENTION: string;
	export const DRIVERDATA: string;
	export const EDITOR: string;
	export const EFC_7292_1262719628: string;
	export const EFC_7292_1592913036: string;
	export const EFC_7292_2283032206: string;
	export const EFC_7292_2775293581: string;
	export const EFC_7292_2946480783: string;
	export const EFC_7292_344590478: string;
	export const EFC_7292_3789132940: string;
	export const EFC_7292_4126798990: string;
	export const EXEPATH: string;
	export const FPS_BROWSER_APP_PROFILE_STRING: string;
	export const FPS_BROWSER_USER_PROFILE_STRING: string;
	export const GITHUB_PERSONAL_ACCESS_TOKEN: string;
	export const HERMES_CRON_SESSION: string;
	export const HERMES_DESKTOP: string;
	export const HERMES_EXEC_ASK: string;
	export const HERMES_GATEWAY_SESSION: string;
	export const HERMES_GIT_BASH_PATH: string;
	export const HERMES_HOME: string;
	export const HERMES_INTERACTIVE: string;
	export const HERMES_QUIET: string;
	export const HERMES_REDACT_SECRETS: string;
	export const HERMES_SESSION_ID: string;
	export const HERMES_SESSION_KEY: string;
	export const HERMES_WEB_DIST: string;
	export const HOME: string;
	export const HOMEDRIVE: string;
	export const HOMEPATH: string;
	export const IMAGE_TOOLS_DEBUG: string;
	export const INIT_CWD: string;
	export const INTEL_DEV_REDIST: string;
	export const LOCALAPPDATA: string;
	export const LOGONSERVER: string;
	export const MATRIX_ALLOWED_ROOMS: string;
	export const MIC_LD_LIBRARY_PATH: string;
	export const MOA_TOOLS_DEBUG: string;
	export const MSYSTEM: string;
	export const NODE: string;
	export const NODE_ENV: string;
	export const npm_command: string;
	export const npm_config_cache: string;
	export const npm_config_globalconfig: string;
	export const npm_config_global_prefix: string;
	export const npm_config_init_module: string;
	export const npm_config_local_prefix: string;
	export const npm_config_node_gyp: string;
	export const npm_config_noproxy: string;
	export const npm_config_npm_version: string;
	export const npm_config_prefix: string;
	export const npm_config_userconfig: string;
	export const npm_config_user_agent: string;
	export const npm_execpath: string;
	export const npm_lifecycle_event: string;
	export const npm_lifecycle_script: string;
	export const npm_node_execpath: string;
	export const npm_package_json: string;
	export const npm_package_name: string;
	export const npm_package_version: string;
	export const NUMBER_OF_PROCESSORS: string;
	export const NVM_HOME: string;
	export const NVM_SYMLINK: string;
	export const OLDPWD: string;
	export const ONEDRIVE: string;
	export const ONEDRIVECONSUMER: string;
	export const OS: string;
	export const PATH: string;
	export const PATHEXT: string;
	export const PLINK_PROTOCOL: string;
	export const PROCESSOR_ARCHITECTURE: string;
	export const PROCESSOR_IDENTIFIER: string;
	export const PROCESSOR_LEVEL: string;
	export const PROCESSOR_REVISION: string;
	export const PROGRAMDATA: string;
	export const PROGRAMFILES: string;
	export const PROGRAMW6432: string;
	export const PROMPT: string;
	export const PSMODULEPATH: string;
	export const PUBLIC: string;
	export const PWD: string;
	export const PYTHONIOENCODING: string;
	export const PYTHONPATH: string;
	export const PYTHONUTF8: string;
	export const SESSIONNAME: string;
	export const SHLVL: string;
	export const SLACK_ALLOWED_CHANNELS: string;
	export const SLACK_FREE_RESPONSE_CHANNELS: string;
	export const SLACK_REQUIRE_MENTION: string;
	export const STANDARDCOMPUTE_API_KEY: string;
	export const SYSTEMDRIVE: string;
	export const SYSTEMROOT: string;
	export const TELEGRAM_ALLOWED_CHATS: string;
	export const TELEGRAM_HOME_CHANNEL_THREAD_ID: string;
	export const TELEGRAM_REACTIONS: string;
	export const TEMP: string;
	export const TERM: string;
	export const TERMINAL_CONTAINER_CPU: string;
	export const TERMINAL_CONTAINER_DISK: string;
	export const TERMINAL_CONTAINER_MEMORY: string;
	export const TERMINAL_CONTAINER_PERSISTENT: string;
	export const TERMINAL_CWD: string;
	export const TERMINAL_DAYTONA_IMAGE: string;
	export const TERMINAL_DOCKER_ENV: string;
	export const TERMINAL_DOCKER_FORWARD_ENV: string;
	export const TERMINAL_DOCKER_IMAGE: string;
	export const TERMINAL_DOCKER_MOUNT_CWD_TO_WORKSPACE: string;
	export const TERMINAL_DOCKER_RUN_AS_HOST_USER: string;
	export const TERMINAL_DOCKER_VOLUMES: string;
	export const TERMINAL_LIFETIME_SECONDS: string;
	export const TERMINAL_MODAL_IMAGE: string;
	export const TERMINAL_PERSISTENT_SHELL: string;
	export const TERMINAL_SINGULARITY_IMAGE: string;
	export const TERMINAL_TIMEOUT: string;
	export const TMP: string;
	export const USERDOMAIN: string;
	export const USERDOMAIN_ROAMINGPROFILE: string;
	export const USERNAME: string;
	export const USERPROFILE: string;
	export const VISION_TOOLS_DEBUG: string;
	export const WAFER_API_KEY: string;
	export const WEB_TOOLS_DEBUG: string;
	export const WINDIR: string;
	export const ZEN_API_KEY: string;
	export const _: string;
}

/**
 * This module provides access to environment variables that are injected _statically_ into your bundle at build time and are _publicly_ accessible.
 * 
 * |         | Runtime                                                                    | Build time                                                               |
 * | ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
 * | Private | [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private) | [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private) |
 * | Public  | [`$env/dynamic/public`](https://svelte.dev/docs/kit/$env-dynamic-public)   | [`$env/static/public`](https://svelte.dev/docs/kit/$env-static-public)   |
 * 
 * Static environment variables are [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env` at build time and then statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * **_Public_ access:**
 * 
 * - This module _can_ be imported into client-side code
 * - **Only** variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`) are included
 * 
 * For example, given the following build time environment:
 * 
 * ```env
 * ENVIRONMENT=production
 * PUBLIC_BASE_URL=http://site.com
 * ```
 * 
 * With the default `publicPrefix` and `privatePrefix`:
 * 
 * ```ts
 * import { ENVIRONMENT, PUBLIC_BASE_URL } from '$env/static/public';
 * 
 * console.log(ENVIRONMENT); // => throws error during build
 * console.log(PUBLIC_BASE_URL); // => "http://site.com"
 * ```
 * 
 * The above values will be the same _even if_ different values for `ENVIRONMENT` or `PUBLIC_BASE_URL` are set at runtime, as they are statically replaced in your code with their build time values.
 */
declare module '$env/static/public' {
	
}

/**
 * This module provides access to environment variables set _dynamically_ at runtime and that are limited to _private_ access.
 * 
 * |         | Runtime                                                                    | Build time                                                               |
 * | ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
 * | Private | [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private) | [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private) |
 * | Public  | [`$env/dynamic/public`](https://svelte.dev/docs/kit/$env-dynamic-public)   | [`$env/static/public`](https://svelte.dev/docs/kit/$env-static-public)   |
 * 
 * Dynamic environment variables are defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/main/packages/adapter-node) (or running [`vite preview`](https://svelte.dev/docs/kit/cli)), this is equivalent to `process.env`.
 * 
 * **_Private_ access:**
 * 
 * - This module cannot be imported into client-side code
 * - This module includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured)
 * 
 * > [!NOTE] In `dev`, `$env/dynamic` includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 * 
 * > [!NOTE] To get correct types, environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * >
 * > ```env
 * > MY_FEATURE_FLAG=
 * > ```
 * >
 * > You can override `.env` values from the command line like so:
 * >
 * > ```sh
 * > MY_FEATURE_FLAG="enabled" npm run dev
 * > ```
 * 
 * For example, given the following runtime environment:
 * 
 * ```env
 * ENVIRONMENT=production
 * PUBLIC_BASE_URL=http://site.com
 * ```
 * 
 * With the default `publicPrefix` and `privatePrefix`:
 * 
 * ```ts
 * import { env } from '$env/dynamic/private';
 * 
 * console.log(env.ENVIRONMENT); // => "production"
 * console.log(env.PUBLIC_BASE_URL); // => undefined
 * ```
 */
declare module '$env/dynamic/private' {
	export const env: {
		AGENTROUTER_API_KEY: string;
		ALIBABA_API_KEY: string;
		ALLUSERSPROFILE: string;
		APPDATA: string;
		ATLASCLOUD_API_KEY: string;
		AUXILIARY_VISION_MODEL: string;
		AUXILIARY_VISION_PROVIDER: string;
		BROWSERBASE_ADVANCED_STEALTH: string;
		BROWSERBASE_PROXIES: string;
		BROWSER_INACTIVITY_TIMEOUT: string;
		BROWSER_SESSION_TIMEOUT: string;
		CEREBRAS_API_KEY: string;
		CLAUDIN_API_KEY: string;
		COLOR: string;
		COMMONPROGRAMFILES: string;
		COMMONPROGRAMW6432: string;
		COMPUTERNAME: string;
		COMSPEC: string;
		DISCORD_ALLOWED_CHANNELS: string;
		DISCORD_HISTORY_BACKFILL: string;
		DISCORD_HISTORY_BACKFILL_LIMIT: string;
		DISCORD_REACTIONS: string;
		DISCORD_THREAD_REQUIRE_MENTION: string;
		DRIVERDATA: string;
		EDITOR: string;
		EFC_7292_1262719628: string;
		EFC_7292_1592913036: string;
		EFC_7292_2283032206: string;
		EFC_7292_2775293581: string;
		EFC_7292_2946480783: string;
		EFC_7292_344590478: string;
		EFC_7292_3789132940: string;
		EFC_7292_4126798990: string;
		EXEPATH: string;
		FPS_BROWSER_APP_PROFILE_STRING: string;
		FPS_BROWSER_USER_PROFILE_STRING: string;
		GITHUB_PERSONAL_ACCESS_TOKEN: string;
		HERMES_CRON_SESSION: string;
		HERMES_DESKTOP: string;
		HERMES_EXEC_ASK: string;
		HERMES_GATEWAY_SESSION: string;
		HERMES_GIT_BASH_PATH: string;
		HERMES_HOME: string;
		HERMES_INTERACTIVE: string;
		HERMES_QUIET: string;
		HERMES_REDACT_SECRETS: string;
		HERMES_SESSION_ID: string;
		HERMES_SESSION_KEY: string;
		HERMES_WEB_DIST: string;
		HOME: string;
		HOMEDRIVE: string;
		HOMEPATH: string;
		IMAGE_TOOLS_DEBUG: string;
		INIT_CWD: string;
		INTEL_DEV_REDIST: string;
		LOCALAPPDATA: string;
		LOGONSERVER: string;
		MATRIX_ALLOWED_ROOMS: string;
		MIC_LD_LIBRARY_PATH: string;
		MOA_TOOLS_DEBUG: string;
		MSYSTEM: string;
		NODE: string;
		NODE_ENV: string;
		npm_command: string;
		npm_config_cache: string;
		npm_config_globalconfig: string;
		npm_config_global_prefix: string;
		npm_config_init_module: string;
		npm_config_local_prefix: string;
		npm_config_node_gyp: string;
		npm_config_noproxy: string;
		npm_config_npm_version: string;
		npm_config_prefix: string;
		npm_config_userconfig: string;
		npm_config_user_agent: string;
		npm_execpath: string;
		npm_lifecycle_event: string;
		npm_lifecycle_script: string;
		npm_node_execpath: string;
		npm_package_json: string;
		npm_package_name: string;
		npm_package_version: string;
		NUMBER_OF_PROCESSORS: string;
		NVM_HOME: string;
		NVM_SYMLINK: string;
		OLDPWD: string;
		ONEDRIVE: string;
		ONEDRIVECONSUMER: string;
		OS: string;
		PATH: string;
		PATHEXT: string;
		PLINK_PROTOCOL: string;
		PROCESSOR_ARCHITECTURE: string;
		PROCESSOR_IDENTIFIER: string;
		PROCESSOR_LEVEL: string;
		PROCESSOR_REVISION: string;
		PROGRAMDATA: string;
		PROGRAMFILES: string;
		PROGRAMW6432: string;
		PROMPT: string;
		PSMODULEPATH: string;
		PUBLIC: string;
		PWD: string;
		PYTHONIOENCODING: string;
		PYTHONPATH: string;
		PYTHONUTF8: string;
		SESSIONNAME: string;
		SHLVL: string;
		SLACK_ALLOWED_CHANNELS: string;
		SLACK_FREE_RESPONSE_CHANNELS: string;
		SLACK_REQUIRE_MENTION: string;
		STANDARDCOMPUTE_API_KEY: string;
		SYSTEMDRIVE: string;
		SYSTEMROOT: string;
		TELEGRAM_ALLOWED_CHATS: string;
		TELEGRAM_HOME_CHANNEL_THREAD_ID: string;
		TELEGRAM_REACTIONS: string;
		TEMP: string;
		TERM: string;
		TERMINAL_CONTAINER_CPU: string;
		TERMINAL_CONTAINER_DISK: string;
		TERMINAL_CONTAINER_MEMORY: string;
		TERMINAL_CONTAINER_PERSISTENT: string;
		TERMINAL_CWD: string;
		TERMINAL_DAYTONA_IMAGE: string;
		TERMINAL_DOCKER_ENV: string;
		TERMINAL_DOCKER_FORWARD_ENV: string;
		TERMINAL_DOCKER_IMAGE: string;
		TERMINAL_DOCKER_MOUNT_CWD_TO_WORKSPACE: string;
		TERMINAL_DOCKER_RUN_AS_HOST_USER: string;
		TERMINAL_DOCKER_VOLUMES: string;
		TERMINAL_LIFETIME_SECONDS: string;
		TERMINAL_MODAL_IMAGE: string;
		TERMINAL_PERSISTENT_SHELL: string;
		TERMINAL_SINGULARITY_IMAGE: string;
		TERMINAL_TIMEOUT: string;
		TMP: string;
		USERDOMAIN: string;
		USERDOMAIN_ROAMINGPROFILE: string;
		USERNAME: string;
		USERPROFILE: string;
		VISION_TOOLS_DEBUG: string;
		WAFER_API_KEY: string;
		WEB_TOOLS_DEBUG: string;
		WINDIR: string;
		ZEN_API_KEY: string;
		_: string;
		[key: `PUBLIC_${string}`]: undefined;
		[key: `${string}`]: string | undefined;
	}
}

/**
 * This module provides access to environment variables set _dynamically_ at runtime and that are _publicly_ accessible.
 * 
 * |         | Runtime                                                                    | Build time                                                               |
 * | ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
 * | Private | [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private) | [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private) |
 * | Public  | [`$env/dynamic/public`](https://svelte.dev/docs/kit/$env-dynamic-public)   | [`$env/static/public`](https://svelte.dev/docs/kit/$env-static-public)   |
 * 
 * Dynamic environment variables are defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/main/packages/adapter-node) (or running [`vite preview`](https://svelte.dev/docs/kit/cli)), this is equivalent to `process.env`.
 * 
 * **_Public_ access:**
 * 
 * - This module _can_ be imported into client-side code
 * - **Only** variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`) are included
 * 
 * > [!NOTE] In `dev`, `$env/dynamic` includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 * 
 * > [!NOTE] To get correct types, environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * >
 * > ```env
 * > MY_FEATURE_FLAG=
 * > ```
 * >
 * > You can override `.env` values from the command line like so:
 * >
 * > ```sh
 * > MY_FEATURE_FLAG="enabled" npm run dev
 * > ```
 * 
 * For example, given the following runtime environment:
 * 
 * ```env
 * ENVIRONMENT=production
 * PUBLIC_BASE_URL=http://example.com
 * ```
 * 
 * With the default `publicPrefix` and `privatePrefix`:
 * 
 * ```ts
 * import { env } from '$env/dynamic/public';
 * console.log(env.ENVIRONMENT); // => undefined, not public
 * console.log(env.PUBLIC_BASE_URL); // => "http://example.com"
 * ```
 * 
 * ```
 * 
 * ```
 */
declare module '$env/dynamic/public' {
	export const env: {
		[key: `PUBLIC_${string}`]: string | undefined;
	}
}
