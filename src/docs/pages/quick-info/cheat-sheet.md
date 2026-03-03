# Git Cheatsheet

### **1. `git branch`**

**Purpose:** Lists all branches or creates a new branch.

**Example:**

```bash
# List all branches
git branch

# Create a new branch called 'feature-login'
git branch feature-login
```

---

### **2. `git switch`**

**Purpose:** Switches to another branch.

**Example:**

```bash
# Switch to an existing branch
git switch main

# Switch to a newly created branch
git switch feature-login
```

---

### **3. `git add`**

**Purpose:** Stages changes in your working directory for the next commit.

**Example:**

```bash
# Stage a single file
git add index.html

# Stage all changes
git add .
```

---

### **4. `git pull`**

**Purpose:** Fetches and merges changes from a remote repository into your current branch.

**Example:**

```bash
# Pull changes from the remote 'main' branch
git pull origin main
```

---

### **5. `git push`**

**Purpose:** Sends your committed changes to a remote repository.

**Example:**

```bash
# Push changes to the remote 'main' branch
git push origin main
```

---

### **6. `git status`**

**Purpose:** Shows the status of changes in your working directory and staging area.

**Example:**

```bash
# Check which files are staged, modified, or untracked
git status
```

---

### **7. `git restore`**

**Purpose:** Discards changes in the working directory or restores files from the staging area.

**Example:**

```bash
# Discard changes in a single file
git restore index.html

# Unstage a file
git restore --staged index.html
```

---

### **8. `git clone`**

**Purpose:** Creates a local copy of a remote repository.

**Example:**

```bash
# Clone a repository from GitHub
git clone https://github.com/username/repo.git
```
