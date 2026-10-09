# Personal portfolio

A lightweight GitHub Pages website inspired by the structure of https://pranay-o.github.io/. It uses an ivory background, forest-green accents, Georgia headings, and Segoe UI body text. No dependencies or build step.

## Customize

Edit `site-content.js` to update your name, social links, email, experience, project titles, and interests. Unconfigured social links are hidden.

Projects include Smart Navigation Goggles, a VBA vendor-file renaming tool, the in-progress ThunderBikes telemetry module, and mining infrastructure models. Each has expandable details; project diagrams and galleries open full-size images. About Me includes a personal introduction and interests with alternating photos. Resume includes education, interests, internship availability, contact information, and the original PDF with open and download links. Replace `resume/Neelan-Chung-Resume.pdf` and regenerate `resume/resume-page-1.png` to update the document and its preview.

Volunteer copy describes the programs rather than claiming specific personal duties. Sources: [Tenth Church Oasis Café](https://www.tenth.ca/oasisvolunteer) and [Arthritis Society Canada volunteering](https://arthritis.ca/get-involved/volunteer/). Add your volunteer dates and personal contributions when available.

## Preview

With Node.js installed, run `npm run dev`, then open http://localhost:4173. Stop the preview with Ctrl+C.

## Publish to GitHub Pages

1. This site is intended for `NeelanChung/Personal_Website`.
2. Upload these files and folders to the repository's `main` branch, preserving their folder structure. Include `.nojekyll`.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**. Select **main** and **/ (root)**, then save.
5. GitHub will show the published URL in Pages settings after deployment completes.

All asset and navigation URLs are relative. The intended GitHub Pages URL is `https://neelanchung.github.io/Personal_Website/`.

Official instructions: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
