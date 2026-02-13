# 💻 Commit to GitHub from Local PC - Step by Step

Complete walkthrough to push your Fitness Tracker code to GitHub from your local computer.

---

## 🎯 Prerequisites

Before starting, make sure you have:
- [ ] Extracted the fitness-tracker.zip file on your PC
- [ ] A GitHub account (create one at https://github.com/signup if needed)
- [ ] Git installed on your computer

---

## 📥 Step 1: Install Git (If Not Already Installed)

### Check if Git is Installed

Open Command Prompt (Windows) or Terminal (Mac/Linux) and type:

```bash
git --version
```

If you see a version number like `git version 2.x.x`, Git is installed. **Skip to Step 2**.

If you get an error, install Git:

### Windows
1. Download from: https://git-scm.com/download/win
2. Run the installer
3. Use default settings (just keep clicking "Next")
4. Restart Command Prompt after installation

### Mac
```bash
# Install using Homebrew (recommended)
brew install git

# Or download from: https://git-scm.com/download/mac
```

### Linux (Ubuntu/Debian)
```bash
sudo apt-get update
sudo apt-get install git
```

---

## ⚙️ Step 2: Configure Git (First Time Only)

Open Command Prompt/Terminal and enter:

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

**Example:**
```bash
git config --global user.name "John Doe"
git config --global user.email "john.doe@gmail.com"
```

Verify configuration:
```bash
git config --global --list
```

---

## 🌐 Step 3: Create a New Repository on GitHub

1. Go to https://github.com and sign in
2. Click the **+** icon (top right corner) → **New repository**

3. Fill in repository details:
   - **Repository name:** `fitness-tracker`
   - **Description:** `Full-stack fitness tracking application with React and Spring Boot`
   - **Visibility:** Choose **Public** or **Private**
   - ⚠️ **DO NOT check** "Initialize this repository with a README"
   - ⚠️ **DO NOT** add .gitignore or license (we already have these)

4. Click **Create repository**

5. **IMPORTANT:** Keep this page open! You'll need the URL shown.

---

## 📁 Step 4: Navigate to Your Project Folder

Open Command Prompt (Windows) or Terminal (Mac/Linux) and navigate to where you extracted the project.

### Windows Example:
```bash
cd C:\Users\YourName\Downloads\fitness-tracker
```

### Mac/Linux Example:
```bash
cd ~/Downloads/fitness-tracker
```

**Tip:** You can also drag the folder into the terminal to auto-fill the path!

Verify you're in the right folder:
```bash
# Windows
dir

# Mac/Linux
ls
```

You should see folders: `backend`, `frontend`, and files like `README.md`

---

## 🔧 Step 5: Initialize Git Repository

In your project folder, run:

```bash
git init
```

✅ You should see: `Initialized empty Git repository in ...`

---

## 📦 Step 6: Add All Files to Git

```bash
git add .
```

**Note:** The dot (`.`) means "add everything"

Check what was added:
```bash
git status
```

✅ You should see a list of files in green, ready to be committed.

---

## 💾 Step 7: Create Your First Commit

```bash
git commit -m "Initial commit: Fitness Tracker application with React and Spring Boot"
```

✅ You should see a summary of files committed.

---

## 🔗 Step 8: Connect to GitHub Repository

Go back to the GitHub page from Step 3. Copy the repository URL. It looks like:
```
https://github.com/YOUR-USERNAME/fitness-tracker.git
```

In your terminal, run (replace YOUR-USERNAME with your actual GitHub username):

```bash
git remote add origin https://github.com/YOUR-USERNAME/fitness-tracker.git
```

**Example:**
```bash
git remote add origin https://github.com/johndoe/fitness-tracker.git
```

Verify the connection:
```bash
git remote -v
```

---

## 🚀 Step 9: Push Your Code to GitHub

### Set the main branch:
```bash
git branch -M main
```

### Push your code:
```bash
git push -u origin main
```

### Enter Your Credentials

When prompted:

**Username:** Your GitHub username

**Password:** ⚠️ **DO NOT use your GitHub password!**

You need a **Personal Access Token**. Follow these steps:

#### Creating a Personal Access Token:

1. Go to: https://github.com/settings/tokens
2. Click **Generate new token** → **Generate new token (classic)**
3. Settings:
   - **Note:** `fitness-tracker-upload`
   - **Expiration:** 90 days (or your preference)
   - **Scopes:** Check the box for **`repo`** (this gives full control of private repositories)
4. Scroll down and click **Generate token**
5. **IMPORTANT:** Copy the token immediately! You won't see it again.
   - It looks like: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
6. Paste this token as your password in the terminal

### Alternative: Save Credentials (Optional)

To avoid entering credentials every time:

```bash
git config --global credential.helper store
```

Next time you push, enter your token once, and Git will remember it.

---

## ✅ Step 10: Verify Upload

1. Go to your GitHub repository: `https://github.com/YOUR-USERNAME/fitness-tracker`
2. You should see:
   - ✅ All your files and folders
   - ✅ README.md displayed on the homepage
   - ✅ Green "Code" button
   - ✅ Commit message: "Initial commit: Fitness Tracker application..."

**Congratulations! Your code is now on GitHub! 🎉**

---

## 🔄 Making Updates Later

After making changes to your code:

### 1. Check what changed:
```bash
git status
```

### 2. Add changes:
```bash
# Add all changes
git add .

# Or add specific file
git add frontend/src/App.jsx
```

### 3. Commit changes:
```bash
git commit -m "Add workout filtering feature"
```

### 4. Push to GitHub:
```bash
git push
```

---

## 📝 Good Commit Message Examples

```bash
# ✅ Good - Clear and descriptive
git commit -m "Add user authentication to backend"
git commit -m "Fix: Resolve date formatting bug in dashboard"
git commit -m "Update: Improve goal progress calculation"
git commit -m "Add workout intensity visualization chart"

# ❌ Bad - Too vague
git commit -m "fixed stuff"
git commit -m "update"
git commit -m "changes"
```

---

## 🛠️ Common Issues & Solutions

### Issue 1: "fatal: not a git repository"

**Solution:** You're not in the project folder. Navigate to it:
```bash
cd path/to/fitness-tracker
```

### Issue 2: "remote origin already exists"

**Solution:** Remove and re-add:
```bash
git remote remove origin
git remote add origin https://github.com/YOUR-USERNAME/fitness-tracker.git
```

### Issue 3: "Authentication failed"

**Solution:** You're using your password instead of a token.
- Create a Personal Access Token (see Step 9)
- Use the token as your password

### Issue 4: "Permission denied (publickey)"

**Solution:** Switch to HTTPS:
```bash
git remote set-url origin https://github.com/YOUR-USERNAME/fitness-tracker.git
```

### Issue 5: "Updates were rejected"

**Solution:** Pull first, then push:
```bash
git pull origin main --allow-unrelated-histories
git push -u origin main
```

### Issue 6: Files showing as "modified" after commit

**Solution:** Line ending differences (Windows vs Mac/Linux). Fix with:
```bash
git config --global core.autocrlf true  # Windows
git config --global core.autocrlf input # Mac/Linux
```

---

## 🖥️ Visual Studio Code Method (Alternative)

If you have VS Code installed:

### 1. Open project:
```bash
code fitness-tracker
```

### 2. Initialize Git:
- Click **Source Control** icon (left sidebar - looks like a branch)
- Click **Initialize Repository**

### 3. Commit:
- Enter message: `Initial commit: Fitness Tracker app`
- Click **✓ Commit** button

### 4. Publish to GitHub:
- Click **Publish to GitHub** button
- Sign in if prompted
- Choose Public or Private
- Done!

---

## 📊 Check Your Repository Statistics

After pushing, GitHub automatically shows:
- 📈 Commit history
- 📁 File structure
- 🌳 Branch information
- 📝 README preview

Visit: `https://github.com/YOUR-USERNAME/fitness-tracker`

---

## 🔐 Security Tips

1. **Never commit:**
   - Passwords
   - API keys
   - Database credentials
   - Personal access tokens

2. **Already included in `.gitignore`:**
   - `node_modules/`
   - `target/`
   - `.env` files
   - IDE configuration files

---

## 🎓 Quick Reference

```bash
# First time setup
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/USER/repo.git
git push -u origin main

# Daily workflow
git status              # Check changes
git add .               # Stage changes
git commit -m "message" # Commit changes
git push                # Upload to GitHub

# Pull changes (if working from multiple computers)
git pull

# View history
git log

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Discard all local changes
git checkout .
```

---

## 📱 Clone on Another Computer

To download your project on another computer:

```bash
git clone https://github.com/YOUR-USERNAME/fitness-tracker.git
cd fitness-tracker
```

Then follow QUICKSTART.md to run the app.

---

## 🆘 Still Need Help?

### Resources:
- **Git Documentation:** https://git-scm.com/doc
- **GitHub Guides:** https://guides.github.com/
- **GitHub Support:** https://support.github.com/

### Video Tutorials:
- Search YouTube for: "How to push code to GitHub"
- GitHub's official guides: https://www.youtube.com/github

---

## 📋 Checklist

Before closing this guide, verify:

- [ ] Git is installed (`git --version` works)
- [ ] Git is configured with your name and email
- [ ] Repository created on GitHub.com
- [ ] Code pushed successfully
- [ ] Files visible on GitHub.com
- [ ] README.md displays properly

---

## 🎉 Success!

Your Fitness Tracker is now on GitHub and accessible worldwide!

**Share your repository:**
```
https://github.com/YOUR-USERNAME/fitness-tracker
```

**Next steps:**
- Add screenshots to your README
- Create a demo video
- Share with friends
- Continue developing features

---

**Happy Coding! 💪🚀**
