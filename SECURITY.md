# 🔒 Security Policy

## 🛡️ Reporting Security Vulnerabilities

If you discover a security vulnerability in Profile Aura, please report it responsibly:

### ✅ DO:
- Email: [Create a private security advisory](https://github.com/kalashmishra21/profile-aura/security/advisories/new)
- Include detailed steps to reproduce
- Allow time for fix before public disclosure

### ❌ DON'T:
- Post vulnerabilities publicly in issues
- Exploit vulnerabilities maliciously
- Share sensitive information publicly

## 🔑 Protecting Your Tokens

### GitHub Token Safety

**NEVER commit tokens to GitHub!**

```bash
# ✅ GOOD - Use .env (already in .gitignore)
GITHUB_TOKEN=ghp_your_token_here

# ❌ BAD - Never hardcode in source
const token = "ghp_EXAMPLE_TOKEN_NOT_REAL";
```

### If Token Leaked:

1. **Revoke immediately:** https://github.com/settings/tokens
2. Generate new token
3. Update `.env` file
4. Update GitHub Secrets (if using Actions)
5. Check repo history for exposed tokens

## 🔐 Best Practices

### Local Development

- ✅ Use `.env` file for secrets
- ✅ Keep `.env` in `.gitignore`
- ✅ Never share screenshots with tokens
- ✅ Use minimal required permissions

### GitHub Actions

- ✅ Use GitHub Secrets for tokens
- ✅ Never echo secrets in logs
- ✅ Use `if: success()` to prevent leak on failure
- ✅ Enable "Read and write" only when needed

### API Keys

```bash
# Google Gemini API
GEMINI_API_KEY=AIza...  # FREE but keep private

# OpenAI API  
OPENAI_API_KEY=sk-proj-...  # Paid - protect carefully
```

## 🚨 Known Security Considerations

### Token Permissions

Minimum required scopes:
- ✅ `repo` - Read repository data
- ✅ `read:user` - Read user profile
- ✅ `workflow` - Update GitHub Actions

Avoid:
- ❌ `delete_repo` - Not needed
- ❌ `admin:org` - Too broad
- ❌ Full `user` access - Use `read:user` only

### Dependencies

We regularly update dependencies to patch vulnerabilities:

```bash
# Check for vulnerabilities
npm audit

# Fix automatically
npm audit fix
```

## 📊 Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## 🔄 Update Policy

- Security patches: Released immediately
- Dependency updates: Weekly automated checks
- Major versions: Announced in advance

## 📧 Contact

For security concerns:
- GitHub Security Advisories (preferred)
- Repository Issues (for non-sensitive topics)

**Response Time:** Within 48 hours for critical issues

---

**Thank you for helping keep Profile Aura secure!** 🙏
