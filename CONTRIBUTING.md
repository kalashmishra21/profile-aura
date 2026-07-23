# Contributing to README Aura Engine

Thank you for considering contributing to README Aura Engine! 🎉

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Coding Guidelines](#coding-guidelines)
- [Submitting Changes](#submitting-changes)

---

## Code of Conduct

This project adheres to a code of conduct. By participating, you are expected to uphold this code. Please be respectful and inclusive.

---

## How Can I Contribute?

### 🐛 Reporting Bugs

Before creating bug reports, please check existing issues. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce**
- **Expected vs actual behavior**
- **Environment details** (Node version, OS, etc.)
- **Screenshots** (if applicable)

### 💡 Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. Provide:

- **Clear use case**
- **Detailed description**
- **Examples** (if applicable)
- **Why this would be useful**

### 🔧 Pull Requests

1. Fork the repo and create your branch from `main`
2. Make your changes with clear commits
3. Add/update tests if needed
4. Update documentation
5. Ensure the build passes
6. Submit a pull request

---

## Development Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- Git
- GitHub Personal Access Token

### Setup Steps

```bash
# Clone your fork
git clone https://github.com/your-username/readme-aura-engine.git
cd readme-aura-engine

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Edit .env with your tokens

# Build the project
npm run build

# Run in development mode
npm run dev
```

### Running Tests

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run in watch mode
npm run test:watch
```

---

## Project Structure

```
src/
├── cli/              # CLI interface and commands
├── components/       # SVG card components (JSX/TSX)
├── engine/          # Core build engine and renderer
├── services/        # External service integrations
├── types/           # TypeScript type definitions
└── utils/           # Utility functions and helpers
```

### Key Files

- `src/cli.ts` - CLI entry point
- `src/engine/builder.ts` - Main orchestration
- `src/engine/renderer.ts` - SVG rendering with Satori
- `src/engine/parser.ts` - Markdown parsing
- `src/components/` - All card components

---

## Coding Guidelines

### TypeScript

- Use TypeScript for all new code
- Define types explicitly (avoid `any`)
- Use interfaces for object shapes
- Export types from `src/types/index.ts`

### Code Style

```typescript
// ✅ Good
export async function fetchData(id: string): Promise<Data> {
  const result = await api.get(id);
  return result.data;
}

// ❌ Avoid
export async function fetchData(id) {
  return (await api.get(id)).data;
}
```

### Naming Conventions

- **Files:** `camelCase.ts` for utils, `PascalCase.tsx` for components
- **Functions:** `camelCase`
- **Classes:** `PascalCase`
- **Constants:** `UPPER_SNAKE_CASE`
- **Interfaces/Types:** `PascalCase`

### Comments

```typescript
/**
 * Fetch user statistics from GitHub API
 * @param username - GitHub username
 * @returns User statistics object
 */
export async function fetchUserStats(username: string): Promise<GitHubStats> {
  // Implementation
}
```

### Error Handling

```typescript
try {
  const data = await riskyOperation();
  return data;
} catch (error) {
  logger.error(`Failed to perform operation: ${error}`);
  throw new Error(`Operation failed: ${error}`);
}
```

---

## Adding New Card Components

### 1. Create Component File

`src/components/NewCard.tsx`:

```typescript
import type { ThemeConfig } from '../types/index.js';
import { glassCardStyle, titleStyle } from './styles.js';

interface NewCardProps {
  data: any;
  theme: ThemeConfig;
  width: number;
  height: number;
}

export function NewCard({ data, theme, width, height }: NewCardProps) {
  return (
    <div style={{ ...glassCardStyle(theme), width, height }}>
      <div style={titleStyle(theme)}>New Card Title</div>
      {/* Card content */}
    </div>
  );
}
```

### 2. Export Component

Add to `src/components/index.ts`:

```typescript
export { NewCard } from './NewCard.js';
```

### 3. Add to Builder

Update `src/engine/builder.ts`:

```typescript
case 'new-card':
  component = this.createNewCard(block, theme, width, height);
  break;
```

### 4. Update Parser

Add block type to `src/engine/parser.ts`:

```typescript
const AURA_BLOCK_TYPES = ['aura', 'github-stats', ..., 'new-card'];
```

### 5. Update Documentation

Add usage example to README.md

---

## Testing Guidelines

### Unit Tests

- Test individual functions/methods
- Mock external dependencies
- Use descriptive test names

```typescript
describe('parseMarkdown', () => {
  it('should extract aura blocks from markdown', async () => {
    const markdown = '```aura\ntest\n```';
    const result = await parseMarkdown(markdown);
    expect(result.auraBlocks).toHaveLength(1);
  });
});
```

### Integration Tests

- Test component rendering
- Test API integrations
- Test end-to-end workflows

---

## Submitting Changes

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new tech stack card component
fix: resolve SVG rendering issue with fonts
docs: update installation guide
chore: update dependencies
test: add tests for GitHub service
```

### Pull Request Process

1. **Update documentation** if needed
2. **Add tests** for new features
3. **Ensure CI passes** (build, tests, linting)
4. **Update CHANGELOG.md** (if applicable)
5. **Request review** from maintainers

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How to test these changes

## Screenshots
(if applicable)

## Checklist
- [ ] Code follows style guidelines
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] Build passes
```

---

## Additional Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Satori Documentation](https://github.com/vercel/satori)
- [GitHub API Docs](https://docs.github.com/en/rest)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

## Questions?

Feel free to:
- Open a [Discussion](https://github.com/yourusername/readme-aura-engine/discussions)
- Ask in [Issues](https://github.com/yourusername/readme-aura-engine/issues)
- Reach out to maintainers

Thank you for contributing! 🙏
