# Contributing to Dialectical Recommender

Thank you for your interest in contributing! This project welcomes contributions from everyone.

## 🎯 Project Goals

- Break echo chambers using AI
- Promote intellectual diversity
- Support open, good-faith discourse
- Maintain user privacy

## 🛠️ How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/bhupeshx/dialectical-recommender/issues)
2. If not, create a new issue with:
   - Clear title
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Your OS and Chrome version

### Suggesting Features

1. Check [existing feature requests](https://github.com/bhupeshx/dialectical-recommender/issues?q=is%3Aissue+is%3Aopen+label%3Aenhancement)
2. Create new issue with:
   - Clear description of feature
   - Why it's useful
   - How it should work
   - Any mockups/examples

### Code Contributions

1. **Fork the repository**

2. **Clone your fork**
```bash
git clone https://github.com/YOUR_USERNAME/dialectical-recommender.git
cd dialectical-recommender
```

3. **Create a branch**
```bash
git checkout -b feature/your-feature-name
```

4. **Make your changes**
   - Follow existing code style
   - Add comments for complex logic
   - Test your changes thoroughly

5. **Commit your changes**
```bash
git add .
git commit -m "Add: brief description of your changes"
```

Use conventional commit messages:
- `Add:` for new features
- `Fix:` for bug fixes
- `Update:` for improvements
- `Remove:` for deletions
- `Docs:` for documentation

6. **Push to your fork**
```bash
git push origin feature/your-feature-name
```

7. **Create Pull Request**
   - Go to your fork on GitHub
   - Click "New Pull Request"
   - Describe your changes
   - Link any related issues

## 📋 Development Guidelines

### Code Style

**JavaScript:**
- Use ES6+ features
- Prefer `const` over `let`, avoid `var`
- Use meaningful variable names
- Add JSDoc comments for functions

**React:**
- Use functional components with hooks
- Keep components small and focused
- Use destructuring for props

### Testing

Before submitting PR:
- Test extension on multiple platforms (YouTube, Twitter, Reddit)
- Verify dashboard displays correctly
- Check console for errors
- Test on different screen sizes

### Commit Messages

Good:
```
Add: Twitter tracking support
Fix: Echo score calculation bug
Update: Improve ideology detection accuracy
```

Bad:
```
update
fixed stuff
changes
```

## 🎨 Areas Where We Need Help

### High Priority
- [ ] Improve ideology detection accuracy (NLP models)
- [ ] Add TikTok tracking support
- [ ] Implement steel-man recommendation algorithm
- [ ] Add data export to CSV
- [ ] Improve dashboard responsiveness

### Medium Priority
- [ ] Add Firefox extension support
- [ ] Implement user preferences/settings
- [ ] Add dark mode to dashboard
- [ ] Create video tutorials
- [ ] Write more tests

### Low Priority
- [ ] Add Instagram tracking
- [ ] Support for other languages
- [ ] Mobile app (React Native)
- [ ] Cloud sync via Firebase

## 🧠 Technical Stack

- **Extension**: Vanilla JS, Chrome APIs
- **Dashboard**: React, Recharts, Tailwind CSS
- **Future ML**: Hugging Face Transformers, spaCy

## 🔧 Development Setup

1. Install Node.js (16+)
2. Clone repo
3. Run `setup.bat` (Windows) or manual setup
4. Load extension in Chrome developer mode
5. Start dashboard: `cd dashboard && npm start`

## 📖 Resources

- [Chrome Extension Docs](https://developer.chrome.com/docs/extensions/)
- [React Documentation](https://react.dev/)
- [Recharts Documentation](https://recharts.org/)

## 🤝 Code of Conduct

### Our Standards

- Be respectful and inclusive
- Focus on the idea, not the person
- Give and receive constructive feedback gracefully
- Prioritize user privacy and security

### Not Acceptable

- Personal attacks or harassment
- Political advocacy in code/comments
- Introducing bias in algorithms
- Compromising user privacy

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🙏 Recognition

Contributors will be:
- Listed in README
- Credited in release notes
- Acknowledged in academic papers (if applicable)

## 💬 Questions?

- Open a [Discussion](https://github.com/bhupeshx/dialectical-recommender/discussions)
- Ask in Issues
- Email: [your-email@iitrpr.ac.in]

---

**Thank you for helping break echo chambers! 🎯**