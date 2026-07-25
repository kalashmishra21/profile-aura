import http from 'http';
import { CoreEngine } from '../core/engine.js';
import { loadAndValidateConfig } from '../config/loader.js';
import { fetchGitHubData } from '../fetchers/github.js';
import { ThemeRegistry } from '../themes/registry.js';
import { ThemeResolver } from '../themes/resolver.js';
import { createExecutionContext } from '../core/context.js';
import { renderSatoriHeroSvg } from '../renderers/satori/hero-renderer.js';
import { renderReadme } from '../renderers/markdown/readme-renderer.js';
import { getStudioHtmlTemplate } from './ui/template.js';
import { Logger } from '../utils/logger.js';
import { ProfileAuraConfig } from '../types/config.js';

export class StudioServer {
  private port: number;
  private server: http.Server | null = null;
  private currentConfig: ProfileAuraConfig;

  constructor(port: number = 3000) {
    this.port = port;
    ThemeRegistry.initialize();
    this.currentConfig = loadAndValidateConfig();
  }

  start(): Promise<void> {
    return new Promise((resolve) => {
      this.server = http.createServer(async (req, res) => {
        const url = req.url || '/';

        // 1. Serve Main Studio Web Builder Page
        if (url === '/' || url === '/index.html') {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(getStudioHtmlTemplate());
          return;
        }

        // 2. GET Live Preview Rendering API
        if (url === '/api/render' && req.method === 'GET') {
          try {
            const data = await fetchGitHubData(this.currentConfig);
            const themePreset = ThemeRegistry.getTheme(this.currentConfig.theme);
            const resolvedTheme = ThemeResolver.resolveTheme(themePreset, this.currentConfig.customTokens);
            const context = createExecutionContext(this.currentConfig, data, resolvedTheme);

            const heroSvg = await renderSatoriHeroSvg({
              config: this.currentConfig,
              data,
              theme: resolvedTheme,
              seed: this.currentConfig.github.username
            });

            const renderResult = await renderReadme(context);

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
              heroSvg,
              markdownContent: renderResult.markdownContent,
              markdownHtml: `<pre style="white-space: pre-wrap; font-family: monospace;">${renderResult.markdownContent.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>`
            }));
          } catch (err: any) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message }));
          }
          return;
        }

        // 3. POST Config Update API
        if (url === '/api/config' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', () => {
            try {
              const parsed = JSON.parse(body);
              if (parsed.theme) this.currentConfig.theme = parsed.theme;
              if (parsed.template) this.currentConfig.template = parsed.template;
              if (parsed.profile) {
                this.currentConfig.profile = {
                  ...this.currentConfig.profile,
                  ...parsed.profile
                };
              }
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: true, config: this.currentConfig }));
            } catch (err: any) {
              res.writeHead(400, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: err.message }));
            }
          });
          return;
        }

        // 4. POST Export API
        if (url === '/api/export' && req.method === 'POST') {
          try {
            const engine = new CoreEngine();
            await engine.run();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, message: 'Exported portfolio to disk.' }));
          } catch (err: any) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message }));
          }
          return;
        }

        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
      });

      this.server.listen(this.port, () => {
        Logger.success(`✨ Profile Aura Studio 2.0 running at http://localhost:${this.port}`);
        resolve();
      });
    });
  }

  stop(): void {
    if (this.server) {
      this.server.close();
    }
  }
}
