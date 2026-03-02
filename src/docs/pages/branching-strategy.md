# Branching Strategy Guide

When working on a team or even solo, it’s helpful to organize your code with branches so that development is safe, changes are tested, and releases are controlled. One common strategy uses **three main branches**:

1. **Master (or Main) Branch**
2. **Staging Branch**
3. **Dev Branch**

---

## **1. Master Branch**

* **Purpose:** The “production-ready” branch. Only fully tested and stable code goes here.
* **Usage:**

  * No direct development on this branch.
  * Only merge code that has passed testing in Staging.

---

## **2. Staging Branch**

* **Purpose:** A testing branch that acts as a “preview” before code goes live.
* **Usage:**

  * Merge completed features from Dev here for testing.
  * QA or testing is performed on this branch.

---

## **3. Dev Branch**

* **Purpose:** The main branch for active development.
* **Usage:**

  * Developers create **feature branches** from Dev.
  * Merge completed features back into Dev when ready.

---

## **4. Feature Branches**

* **Purpose:** Isolate individual features or bug fixes.
* **Usage:**

  * Created from Dev.
  * Merged back into Dev when complete.

---

## **Recommended Workflow**

1. **Create feature branches** from Dev.
2. **Develop and commit** in feature branches.
3. **Merge feature branches into Dev** when done.
4. **Test Dev branch**, then merge Dev into Staging for broader testing.
5. **Test Staging**, then merge Staging into Master for release.

![Branching Strategy Diagram](img/branching-strategy.png)

---

### **Benefits of This Strategy**

* Keeps production stable.
* Encourages testing before release.
* Allows multiple developers to work in parallel safely.
* Clear separation of development, testing, and production code.