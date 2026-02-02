# Contributing to Scrubmarine CRM

Thank you for your interest in contributing to Scrubmarine CRM! This document provides guidelines and workflow for contributing.

## 🔄 Development Workflow

### 1. Create a Feature Branch

Always create a new branch for your work:

```bash
git checkout -b feature/your-feature-name
```

### 2. Make Your Changes

- Write clean, maintainable code
- Follow existing code style and patterns
- Add comments where necessary
- Update documentation if needed

### 3. Commit Your Changes

Use conventional commit format:

```bash
git add .
git commit -m "feat(component): add new feature description"
```

### 4. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub with:
- Clear title describing the change
- Detailed description of what was changed and why
- Screenshots for UI changes
- Reference to any related issues

## 📋 Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Refactoring
- [ ] Performance improvement

## Testing
- [ ] Tested locally
- [ ] All existing tests pass
- [ ] Added new tests (if applicable)

## Screenshots (if UI changes)
[Attach screenshots]

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No console errors
```

## ✅ Code Review Process

1. All PRs require at least one review
2. Address review comments promptly
3. Maintain respectful communication
4. Squash commits if requested

## 🎨 Style Guidelines

### TypeScript/React
- Use functional components with hooks
- Prefer `const` over `let`
- Use explicit return types for functions
- Follow ESLint configuration

### CSS/Tailwind
- Use Tailwind utility classes
- Avoid arbitrary values when possible
- Maintain responsive design patterns

## 🐛 Reporting Issues

When reporting bugs, include:
- Steps to reproduce
- Expected behavior
- Actual behavior
- Browser/environment info
- Screenshots if applicable

## 📞 Questions?

Contact the maintainers or open a discussion.

---

Happy coding! 🚀
