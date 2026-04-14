# DEVORA - Website

A professional website for DEVORA showcasing services, projects, and contact information.

## Overview

This responsive website consists of multiple pages including a homepage, projects page, and contact page. It utilizes modern web technologies and is designed with a clean, professional aesthetic.

## Setup Instructions

1. **Download or Clone the Repository**
   
   Download the files or clone the repository to your local machine.

2. **File Structure**

   The website follows this structure:
   ```
   /
   ├── index.html            # Home page
   ├── projects.html         # Projects showcase page
   ├── contact.html          # Contact page with form
   ├── css/
   │   └── styles.css        # Main stylesheet
   ├── js/
   │   ├── main.js           # Main JavaScript functionality
   │   └── setup.js          # Site configuration and setup
   ├── images/               # Image assets
   │   └── projects/         # Project images
   └── videos/               # Video assets
   ```

3. **Configuration**

   The site configuration is managed in `js/setup.js`. Here you can modify:
   - Site information
   - API endpoints
   - Feature flags
   - Theme settings

4. **Customization**

   - **Contact Form**: The contact form uses [Formspree](https://formspree.io/). The form ID is configured in `js/setup.js`.
   - **Project Data**: Add or modify projects by editing the project data in `js/main.js`.
   - **Colors & Theme**: The site uses CSS variables for theming, defined in `css/styles.css` and can be overridden in `js/setup.js`.

## Features

- **Responsive Design**: Adapts seamlessly to all screen sizes
- **Scroll Animations**: Engaging scroll-based animations using AOS library
- **Contact Form**: Functional contact form using Formspree
- **Project Filtering**: Dynamic project filtering and search functionality
- **Browser Compatibility**: Warnings for outdated browsers
- **Cookies Notice**: GDPR-compliant cookies notification (configurable)
- **Newsletter Form**: Ready-to-integrate newsletter signup
- **Theme Support**: Supports light/dark mode (configurable)

## Technologies Used

- HTML5
- CSS3
- JavaScript (Vanilla)
- [AOS](https://michalsnik.github.io/aos/) for scroll animations
- [Font Awesome](https://fontawesome.com/) for icons
- [Formspree](https://formspree.io/) for form handling

## Browser Support

The website is designed to work on:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

Internet Explorer is not supported and will display a compatibility warning.

## Contact

For questions or support, contact info@trammanagement.com.

---

© 2025 DEVORA. All rights reserved. 