/**
 * AI service for generating commit summaries and project insights
 */

import OpenAI from 'openai';
import type { AIGeneratedContent, CommitActivity, Config } from '../types/index.js';

export class AIService {
  private client: OpenAI | null = null;
  private config: Config['ai'];

  constructor(config: Config['ai']) {
    this.config = config;
    
    if (config?.enabled && config.apiKey) {
      this.client = new OpenAI({
        apiKey: config.apiKey,
      });
    }
  }

  /**
   * Check if AI service is available
   */
  isAvailable(): boolean {
    return this.client !== null && this.config?.enabled === true;
  }

  /**
   * Generate AI-powered content from recent commits
   */
  async generateContent(
    commits: CommitActivity[],
    username: string
  ): Promise<AIGeneratedContent | null> {
    if (!this.isAvailable()) {
      return null;
    }

    try {
      const commitSummary = this.formatCommits(commits);
      const prompt = this.buildPrompt(commitSummary, username);

      const response = await this.client!.chat.completions.create({
        model: this.config?.model || 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: 'You are a creative GitHub profile writer. Generate engaging, concise summaries of developer activity based on commit messages. Be enthusiastic but professional.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.8,
        max_tokens: 300,
      });

      const content = response.choices[0]?.message?.content || '';
      return this.parseAIResponse(content);
    } catch (error) {
      console.warn('Failed to generate AI content:', error);
      return null;
    }
  }

  /**
   * Generate a catchy one-liner about current work
   */
  async generateStatusLine(commits: CommitActivity[]): Promise<string> {
    if (!this.isAvailable() || commits.length === 0) {
      return '🚀 Building amazing things with code';
    }

    try {
      const recentWork = commits.slice(0, 5).map(c => c.message).join('; ');
      
      const response = await this.client!.chat.completions.create({
        model: this.config?.model || 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: 'Generate a single, catchy line (max 60 characters) about what a developer is currently working on based on their recent commits. Include an emoji. Be creative and enthusiastic.',
          },
          {
            role: 'user',
            content: `Recent commits: ${recentWork}`,
          },
        ],
        temperature: 0.9,
        max_tokens: 50,
      });

      const line = response.choices[0]?.message?.content?.trim() || '';
      return line.length > 0 ? line : '🚀 Building amazing things with code';
    } catch (error) {
      console.warn('Failed to generate status line:', error);
      return '🚀 Building amazing things with code';
    }
  }

  /**
   * Analyze commit patterns and generate insights
   */
  async analyzeCommitPatterns(commits: CommitActivity[]): Promise<string[]> {
    if (!this.isAvailable() || commits.length === 0) {
      return [];
    }

    try {
      const commitMessages = commits.map(c => c.message).join('\n');

      const response = await this.client!.chat.completions.create({
        model: this.config?.model || 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: 'Analyze commit messages and extract 3-5 key themes or focus areas. Return only a JSON array of strings.',
          },
          {
            role: 'user',
            content: commitMessages,
          },
        ],
        temperature: 0.7,
        max_tokens: 150,
      });

      const content = response.choices[0]?.message?.content || '[]';
      const insights = JSON.parse(content);
      return Array.isArray(insights) ? insights : [];
    } catch (error) {
      console.warn('Failed to analyze commit patterns:', error);
      return [];
    }
  }

  /**
   * Format commits for AI processing
   */
  private formatCommits(commits: CommitActivity[]): string {
    return commits
      .map((c, i) => `${i + 1}. [${c.repo}] ${c.message} (${this.getTimeAgo(c.date)})`)
      .join('\n');
  }

  /**
   * Build prompt for AI
   */
  private buildPrompt(commitSummary: string, username: string): string {
    return `
Based on the following recent GitHub commits from ${username}, generate a brief, engaging summary of what they're currently working on.

Recent commits:
${commitSummary}

Please provide:
1. A brief summary (2-3 sentences) of their current work
2. A catchy one-liner status (max 60 chars with emoji)
3. Their weekly focus area (one phrase)

Format the response as JSON:
{
  "summary": "...",
  "projectStatus": "...",
  "weeklyFocus": "..."
}
    `.trim();
  }

  /**
   * Parse AI response
   */
  private parseAIResponse(content: string): AIGeneratedContent {
    try {
      const parsed = JSON.parse(content);
      return {
        summary: parsed.summary || 'Building awesome projects',
        projectStatus: parsed.projectStatus || '🚀 Shipping code',
        weeklyFocus: parsed.weeklyFocus || 'Innovation',
        generatedAt: new Date().toISOString(),
      };
    } catch {
      // Fallback if parsing fails
      return {
        summary: content.substring(0, 200),
        projectStatus: '🚀 Building amazing things',
        weeklyFocus: 'Development',
        generatedAt: new Date().toISOString(),
      };
    }
  }

  /**
   * Get relative time string
   */
  private getTimeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  }
}
