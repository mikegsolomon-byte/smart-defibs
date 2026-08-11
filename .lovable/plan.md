# Push builds to a GitHub repository

## Goal
Connect Lovable's Git sync to a GitHub repository so the project code is continuously backed up and can be pulled/pushed from GitHub.

## Current state
The project currently only has internal Lovable storage remotes. No GitHub repository is connected.

## Plan

1. **Start Git sync connection**
   - In the Lovable editor, open the **Plus (+)** menu in the chat input → **GitHub** → **Connect project**.
   - This opens the GitHub authorization flow.

2. **Authorize Lovable GitHub App**
   - Authorize the Lovable GitHub App on the GitHub account/organization you want to use.
   - Grant access to the relevant repositories (or allow creating a new one).

3. **Create or select repository**
   - Choose whether to create a new repository (e.g., `smart-defibs`) or link an existing empty repo.
   - Lovable will push the current codebase as the initial commit.

4. **Verify sync**
   - After connection, open the repository on GitHub and confirm all files are present.
   - Make a small test edit in Lovable and confirm it appears in GitHub (or vice versa) to validate two-way sync.

5. **Optional follow-ups**
   - Configure branch protection rules in GitHub if multiple people will contribute.
   - Add a `README.md` polish pass if the exported one needs updates.
   - Set up GitHub Actions for CI/CD if desired.

## Notes
- Git sync is a UI-driven action in Lovable; the OAuth/authorization step must be completed by you in the editor.
- Two-way sync means changes in Lovable push to GitHub, and changes pushed to GitHub sync back to Lovable.
- Database data is not exported via Git sync; use Cloud → Advanced settings → Export data for that.
