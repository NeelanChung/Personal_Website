(() => {
  const content = window.siteContent;
  if (!content) return;
  const page = document.body.dataset.page;
  document.querySelector('.name').textContent = content.name;
  document.title = `${content.name} · ${page === 'about' ? 'About Me' : page.charAt(0).toUpperCase() + page.slice(1)}`;
  const icons = {
    linkedin: '<rect x="3" y="8" width="4" height="13"/><path d="M11 21V8h4v2c1-3 6-3 6 2v9h-4v-8c0-2-2-2-2 0v8"/><circle cx="5" cy="4" r="1.5"/>',
    github: '<path d="M9 19c-4 1-4-2-6-2m12 5v-4c0-1 .1-2-.5-2.5 4-.5 6.5-2 6.5-6 0-1.5-.5-2.5-1.5-3.5.3-1 .2-2.3-.3-3.5-1.5 0-3 1-3.8 1.5a14 14 0 0 0-7 0C7.6 3.5 6.1 2.5 4.6 2.5c-.5 1.2-.6 2.5-.3 3.5C3.3 7 2.8 8 2.8 9.5c0 4 2.5 5.5 6.5 6C8.7 16 9 17 9 18v4"/>',
    email: '<rect x="3" y="5" width="18" height="14" rx="1.5"/><path d="m3 6 9 7 9-7"/>'
  };
  const socialContainer = document.querySelector('.social-links');
  for (const [key, label] of [['linkedin', 'LinkedIn'], ['github', 'GitHub'], ['email', 'Email']]) {
    const value = content.social[key].trim();
    if (!value) continue;
    const valid = key === 'email' ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) : /^https:\/\//.test(value);
    const item = document.createElement(valid ? 'a' : 'span');
    item.className = `social-link${valid ? '' : ' unconfigured'}`;
    item.setAttribute('aria-label', label);
    if (valid) {
      item.href = key === 'email' ? `mailto:${value}` : value;
      if (key !== 'email') { item.target = '_blank'; item.rel = 'noopener noreferrer'; }
    } else {
      item.setAttribute('role', 'img');
    }
    item.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true">${icons[key]}</svg>`;
    socialContainer.append(item);
  }
  const list = document.querySelector('.experience-list');
  const text = (tag, className, value) => {
    const node = document.createElement(tag);
    node.className = className;
    node.textContent = value;
    return node;
  };
  const renderEntries = (entries, target) => {
  for (const entry of entries) {
    const row = document.createElement('li');
    row.className = 'experience-entry';
    row.append(text('h3', 'role', entry.role), text('p', 'organization', entry.organization));
    if (entry.dates) row.append(text('p', 'date', entry.dates));
    if (entry.details?.length) {
      const details = document.createElement('ul');
      details.className = 'details';
      for (const detail of entry.details) details.append(text('li', '', detail));
      row.append(details);
    }
    target.append(row);
  }
  };
  const main = document.querySelector('main');
  if (list) {
    const intro = document.createElement('div');
    intro.className = 'profile-intro';
    intro.append(text('p', 'education', content.education));
    main.insertBefore(intro, list);
    main.insertBefore(text('h2', 'section-heading', 'Technical'), list);
    renderEntries(content.experience, list);
    const volunteer = document.createElement('ol');
    volunteer.className = 'experience-list';
    main.append(text('h2', 'section-heading volunteer-heading', 'Volunteer'), volunteer);
    renderEntries(content.volunteer, volunteer);
  } else if (page === 'projects') {
    const projects = document.createElement('ol');
    projects.className = 'project-list';
    const createFigure = data => {
      const figure = document.createElement('figure');
      figure.className = 'project-figure';
      const link = document.createElement('a');
      link.href = data.src;
      link.target = '_blank';
      link.rel = 'noopener';
      link.setAttribute('aria-label', `Open full-size ${data.label || (data.src.includes('app-flowchart') ? 'app flowchart' : 'system flowchart')}`);
      const img = document.createElement('img');
      img.src = data.src;
      img.alt = data.alt;
      img.width = data.width;
      img.height = data.height;
      img.loading = 'lazy';
      link.append(img);
      const caption = text('figcaption', '', data.caption);
      const fullSize = text('a', '', data.label ? 'Open full-size image ↗' : 'Open full-size diagram ↗');
      fullSize.href = data.src;
      fullSize.target = '_blank';
      fullSize.rel = 'noopener';
      caption.append(fullSize);
      figure.append(link, caption);
      return figure;
    };
    const createGallery = (mediaItems, galleryHeading, projectTitle, disclosure) => {
        const gallery = document.createElement('section');
        gallery.className = 'project-gallery';
        gallery.setAttribute('aria-label', `${projectTitle}: ${galleryHeading}`);
        gallery.append(text('h3', 'project-subheading', galleryHeading));
        const rail = document.createElement('div');
        rail.className = 'gallery-rail';
        rail.tabIndex = 0;
        rail.setAttribute('role', 'region');
        rail.setAttribute('aria-label', 'Project media. Scroll sideways or use the arrow keys.');
        for (const media of mediaItems) {
          const card = document.createElement('figure');
          card.className = 'gallery-card';
          if (media.type === 'video') {
            const video = document.createElement('video');
            video.src = media.src;
            video.controls = true;
            video.playsInline = true;
            video.preload = 'metadata';
            video.poster = media.poster;
            video.setAttribute('aria-label', media.label);
            const fallback = text('a', '', 'Open animation');
            fallback.href = media.src;
            video.append(fallback);
            card.append(video);
          } else {
            const link = document.createElement('a');
            link.href = media.src;
            link.target = '_blank';
            link.rel = 'noopener';
            link.setAttribute('aria-label', `Open full-size ${media.label}`);
            const img = document.createElement('img');
            img.src = media.src;
            img.alt = media.alt;
            img.loading = 'lazy';
            link.append(img);
            card.append(link);
          }
          const caption = document.createElement('figcaption');
          caption.append(text('strong', 'gallery-label', media.label), text('span', '', media.caption));
          if (media.enlargeLabel) {
            const enlarge = text('a', 'gallery-enlarge', media.enlargeLabel);
            enlarge.href = media.src;
            enlarge.target = '_blank';
            enlarge.rel = 'noopener';
            caption.append(enlarge);
          }
          card.append(caption);
          rail.append(card);
        }
        const controls = document.createElement('div');
        controls.className = 'gallery-controls';
        const previous = text('button', '', '← Previous');
        const next = text('button', '', 'Next →');
        previous.type = next.type = 'button';
        previous.setAttribute('aria-label', `Previous item in ${galleryHeading}`);
        next.setAttribute('aria-label', `Next item in ${galleryHeading}`);
        const position = text('span', 'gallery-position', `1 / ${mediaItems.length}`);
        position.setAttribute('aria-live', 'polite');
        const current = () => Math.round(rail.scrollLeft / (rail.clientWidth + 16));
        const update = () => {
          const index = current();
          previous.disabled = index === 0;
          next.disabled = index === mediaItems.length - 1;
          position.textContent = `${index + 1} / ${mediaItems.length}`;
        };
        const move = (direction) => {
          const index = Math.max(0, Math.min(mediaItems.length - 1, current() + direction));
          rail.scrollTo({ left: index * (rail.clientWidth + 16), behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
        };
        previous.addEventListener('click', () => move(-1));
        next.addEventListener('click', () => move(1));
        rail.addEventListener('scroll', update, { passive: true });
        rail.addEventListener('keydown', event => {
          if (event.target !== rail) return;
          if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault();
            move(event.key === 'ArrowLeft' ? -1 : 1);
          }
        });
        disclosure.addEventListener('toggle', () => { if (disclosure.open) update(); });
        previous.disabled = true;
        controls.append(previous, position, next);
        gallery.append(rail, controls);
        return gallery;
    };
    for (const entry of content.projects) {
      const project = typeof entry === 'string' ? { title: entry } : entry;
      const item = document.createElement('li');
      const heading = document.createElement('div');
      heading.className = 'project-heading';
      const thumbnail = document.createElement('img');
      thumbnail.className = 'project-thumbnail';
      thumbnail.src = project.image?.src || './assets/project-image-placeholder.svg';
      thumbnail.alt = project.image?.alt || 'Project image coming soon';
      thumbnail.width = 180;
      thumbnail.height = 140;
      thumbnail.loading = 'lazy';
      const headingCopy = document.createElement('div');
      headingCopy.className = 'project-heading-copy';
      headingCopy.append(text('h2', 'project-title', project.title));
      if (project.status) headingCopy.append(text('p', 'project-status', project.status));
      if (project.subtitle) headingCopy.append(text('p', 'project-subtitle', project.subtitle));
      if (project.image) {
        const previewLink = document.createElement('a');
        previewLink.href = project.image.src;
        previewLink.target = '_blank';
        previewLink.rel = 'noopener';
        previewLink.setAttribute('aria-label', `Open full-size preview for ${project.title}`);
        previewLink.append(thumbnail);
        heading.append(previewLink, headingCopy);
      } else {
        heading.append(thumbnail, headingCopy);
      }
      item.append(heading);
      const disclosure = document.createElement('details');
      disclosure.className = 'project-disclosure';
      const toggle = text('summary', 'project-toggle', 'View project details');
      toggle.setAttribute('aria-label', `View details for ${project.title}`);
      const information = document.createElement('div');
      information.className = 'project-information';
      information.append(text('h3', 'project-subheading', 'Project overview'));
      for (const paragraph of project.summary || ['Project overview coming soon.']) information.append(text('p', 'project-copy', paragraph));
      if (project.system) {
        information.append(text('h3', 'project-subheading', project.system.heading));
        if (project.system.figure) information.append(createFigure(project.system.figure));
        for (const paragraph of project.system.paragraphs) information.append(text('p', 'project-copy', paragraph));
      }
      information.append(text('h3', 'project-subheading', project.contributionHeading || 'What I did'));
      if (project.contributionIntro) information.append(text('p', 'project-copy', project.contributionIntro));
      if (project.contributions?.length) {
        const contributions = document.createElement('ul');
        contributions.className = 'details project-contributions';
        for (const contribution of project.contributions) contributions.append(text('li', '', contribution));
        information.append(contributions);
      } else if (!project.contributionIntro) {
        information.append(text('p', 'project-copy', 'Contribution details coming soon.'));
      }
      if (project.outcome) {
        information.append(text('h3', 'project-subheading', 'Verification and outcome'), text('p', 'project-copy', project.outcome));
      }
      if (project.figure) {
        information.prepend(createFigure(project.figure));
      }
      if (project.gallery?.length) information.append(createGallery(project.gallery, project.galleryHeading || 'Models and animation', project.title, disclosure));
      for (const section of project.sections || []) {
        information.append(text('h3', 'project-subheading', section.heading));
        for (const paragraph of section.paragraphs || []) information.append(text('p', 'project-copy', paragraph));
        if (section.steps) {
          const steps = document.createElement('ol');
          steps.className = 'details project-contributions project-steps';
          for (const step of section.steps) steps.append(text('li', '', step));
          information.append(steps);
        }
        if (section.figure) information.append(createFigure(section.figure));
        if (section.gallery) information.append(createGallery(section.gallery, section.galleryHeading, project.title, disclosure));
      }
      disclosure.append(toggle, information);
      item.append(disclosure);
      projects.append(item);
    }
    main.append(projects);
  } else if (page === 'resume') {
    main.append(text('h2', 'resume-title', 'Integrated Engineering'), text('p', 'organization', 'University of British Columbia'), text('p', 'resume-copy', content.interests), text('p', 'resume-copy', content.availability));
    const contact = document.createElement('a');
    contact.className = 'contact-link';
    contact.href = `mailto:${content.social.email}`;
    contact.textContent = content.social.email;
    main.append(contact);
    main.append(document.querySelector('.resume-document'));
  }
})();
