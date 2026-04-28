/**
 * Post-build script for Cloudflare Pages deployment.
 * Fixes the auto-generated wrangler.json that contains invalid fields
 * for the Pages wrangler parser (e.g. empty "triggers" object).
 */
import { readFileSync, writeFileSync, existsSync } from 'fs';

const wranglerPath = 'dist/client/wrangler.json';

if (existsSync(wranglerPath)) {
  const config = JSON.parse(readFileSync(wranglerPath, 'utf8'));

  // Remove fields that cause validation errors in Cloudflare Pages
  delete config.triggers;

  // Remove unexpected top-level fields
  const invalidTopLevel = [
    'definedEnvironments', 'ai_search_namespaces', 'ai_search',
    'secrets_store_secrets', 'unsafe_hello_world', 'flagship',
    'worker_loaders', 'ratelimits', 'vpc_services', 'vpc_networks',
    'python_modules'
  ];
  for (const key of invalidTopLevel) {
    delete config[key];
  }

  // Remove unexpected dev fields
  if (config.dev) {
    delete config.dev.enable_containers;
    delete config.dev.generate_types;
  }

  writeFileSync(wranglerPath, JSON.stringify(config, null, 2));
  console.log('✅ Fixed wrangler.json for Cloudflare Pages');
} else {
  console.log('⚠️  No wrangler.json found in dist/client, skipping fix');
}
