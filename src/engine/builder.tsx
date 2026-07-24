/**
 * Main build engine - orchestrates the README generation process
 */

import React from 'react';
import type { Config, BuildOptions, AuraBlock, GitHubStats } from '../types/index.js';
import { parseMarkdown, replaceAuraBlocks, generateImageMarkdown, parseTechStack, parseBlockContent, validateAuraBlock } from './parser.js';
import { SVGRenderer } from './renderer.js';
import { GitHubService } from '../services/github.js';
import { IconService } from '../services/icons.js';
import { Logger } from '../utils/logger.js';
import { readFile, writeFile, ensureDir, fileExists } from '../utils/helpers.js';
import { DEFAULT_THEME } from '../utils/config.js';
import path from 'path';
import {
  HeaderCard,
  StatsCard,
  StreakCard,
  LanguagesCard,
  TechStackCard,
  ActivityCard,
} from '../components/index.js';

export class ReadmeBuilder {
  private logger: Logger;
  private renderer: SVGRenderer;
  private githubService: GitHubService;
  private iconService: IconService;
  private config: Config;
  private stats: GitHubStats | null = null;

  constructor(config: Config, verbose = false) {
    this.config = config;
    this.logger = new Logger(verbose);
    this.renderer = new SVGRenderer();
    this.githubService = new GitHubService(
      config.github.username,
      config.github.token
    );
    this.iconService = new IconService();
  }

  /**
   * Main build process
   */
  async build(options: BuildOptions): Promise<void> {
    this.logger.step(1, 6, 'Loading configuration and source file');
    
    // Read source markdown
    if (!await fileExists(options.sourcePath)) {
      throw new Error(`Source file not found: ${options.sourcePath}`);
    }
    
    const sourceContent = await readFile(options.sourcePath);
    const parsed = await parseMarkdown(sourceContent);

    this.logger.success(`Found ${parsed.auraBlocks.length} Aura blocks to process`);

    // Fetch GitHub data
    this.logger.step(2, 6, 'Fetching GitHub statistics');
    this.stats = await this.githubService.fetchUserStats();
    this.logger.success(`Fetched stats for ${this.stats.name} (@${this.stats.username})`);

    // Skip AI content
    this.logger.step(3, 6, 'Skipping AI content (disabled)');

    // Process Aura blocks
    this.logger.step(4, 6, 'Rendering SVG cards');
    const replacements = new Map<number, string>();

    for (let i = 0; i < parsed.auraBlocks.length; i++) {
      const block = parsed.auraBlocks[i];
      this.logger.debug(`Processing block ${i + 1}/${parsed.auraBlocks.length}: ${block.type}`);

      // Validate block
      const errors = validateAuraBlock(block);
      if (errors.length > 0) {
        this.logger.warn(`Block at line ${block.startLine} has validation errors:`);
        errors.forEach(err => this.logger.warn(`  - ${err}`));
        continue;
      }

      try {
        const imagePath = await this.processBlock(block, i, options);
        const markdown = generateImageMarkdown(
          imagePath,
          block.props.alt || `${block.type} card`,
          (block.props.align as any) || 'center'
        );
        // Parser gives 1-indexed line number, convert to 0-indexed array position
        const replacementKey = block.startLine - 1;
        replacements.set(replacementKey, markdown);
      } catch (error) {
        this.logger.error(`Failed to process block at line ${block.startLine}: ${error}`);
      }
    }

    this.logger.success(`Generated ${replacements.size} SVG cards`);

    // Generate final README
    this.logger.step(5, 6, 'Generating README.md');
    let finalContent = replaceAuraBlocks(sourceContent, replacements);
    
    // Add "Powered by Profile Aura" footer
    const footer = `\n\n---\n\n<div align="center">\n\n**Powered by [Profile Aura](https://github.com/kalashmishra21/profile-aura)** ✨\n\n</div>\n`;
    finalContent += footer;
    
    if (!options.dryRun) {
      await writeFile(options.outputPath, finalContent);
      this.logger.success(`README written to ${options.outputPath}`);
    } else {
      this.logger.info('Dry run mode - no files written');
    }

    this.logger.step(6, 6, 'Build complete! 🎉');
  }

  /**
   * Process individual Aura block
   */
  private async processBlock(
    block: AuraBlock,
    index: number,
    options: BuildOptions
  ): Promise<string> {
    const theme = this.config.theme || DEFAULT_THEME;
    const width = parseInt(block.props.width || '800', 10);
    const height = parseInt(block.props.height || '400', 10);

    let svg: string;

    switch (block.type) {
      case 'aura':
      case 'profile-card':
      case 'jsx-card':
        // Header card returns SVG string directly
        svg = this.createHeaderCard(block, theme, width, height);
        break;

      case 'github-stats':
        // Stats card returns SVG string directly
        svg = this.createStatsCard(theme, width, height);
        break;

      case 'streak':
        const streakComponent = this.createStreakCard(theme, width, height);
        svg = await this.renderer.renderToSVG(streakComponent, { width, height, fonts: [] });
        break;

      case 'languages':
        const languagesComponent = this.createLanguagesCard(theme, width, height);
        svg = await this.renderer.renderToSVG(languagesComponent, { width, height, fonts: [] });
        break;

      case 'tech-stack':
        // Tech stack card returns SVG string directly
        svg = await this.createTechStackCard(block, theme, width, height);
        break;

      case 'activity':
        const activityComponent = this.createActivityCard(theme, width, height);
        svg = await this.renderer.renderToSVG(activityComponent, { width, height, fonts: [] });
        break;

      default:
        throw new Error(`Unknown block type: ${block.type}`);
    }

    // Save SVG
    const filename = `${block.type}-${index}.svg`;
    const outputPath = path.join(options.config.output.assetsPath, filename);
    await writeFile(outputPath, svg);

    // Return relative path for markdown
    return `.github/assets/generated/${filename}`;
  }

  /**
   * Create header/profile card component
   */
  private createHeaderCard(block: AuraBlock, theme: any, width: number, height: number): any {
    if (!this.stats) throw new Error('GitHub stats not loaded');

    const statusLine = block.props.status || `Building amazing things with code`;

    // Return SVG string directly (not JSX)
    return HeaderCard({
      stats: this.stats,
      theme,
      width,
      height,
      statusLine,
    });
  }

  /**
   * Create stats card component
   */
  private createStatsCard(theme: any, width: number, height: number): string {
    if (!this.stats) throw new Error('GitHub stats not loaded');

    return StatsCard({
      stats: this.stats,
      theme: theme,
      width: width,
      height: height,
    });
  }

  /**
   * Create streak card component
   */
  private createStreakCard(theme: any, width: number, height: number): any {
    if (!this.stats) throw new Error('GitHub stats not loaded');

    return (
      <StreakCard
        streak={this.stats.contributionStreak}
        theme={theme}
        width={width}
        height={height}
      />
    );
  }

  /**
   * Create languages card component
   */
  private createLanguagesCard(theme: any, width: number, height: number): any {
    if (!this.stats) throw new Error('GitHub stats not loaded');

    return (
      <LanguagesCard
        languages={this.stats.languages}
        theme={theme}
        width={width}
        height={height}
      />
    );
  }

  /**
   * Create tech stack card component
   */
  private async createTechStackCard(block: AuraBlock, theme: any, width: number, height: number): Promise<string> {
    // Parse tech stack from props or content
    let techNames: string[] = [];
    
    if (block.props.stack) {
      techNames = parseTechStack(block.props.stack);
    } else if (block.content) {
      const contentData = parseBlockContent(block.content);
      if (contentData.stack) {
        techNames = Array.isArray(contentData.stack)
          ? contentData.stack
          : parseTechStack(contentData.stack);
      }
    }

    if (techNames.length === 0) {
      throw new Error('No tech stack specified');
    }

    // Fetch icons
    const technologies = await this.iconService.fetchIcons(techNames);

    return TechStackCard({
      technologies: technologies,
      theme: theme,
      width: width,
      height: height,
      title: block.props.title,
      layout: (block.props.layout as any) || 'grid',
    });
  }

  /**
   * Create activity card component
   */
  private createActivityCard(theme: any, width: number, height: number): any {
    if (!this.stats) throw new Error('GitHub stats not loaded');

    return (
      <ActivityCard
        repositories={this.stats.recentRepos}
        theme={theme}
        width={width}
        height={height}
      />
    );
  }
}
