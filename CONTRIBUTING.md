Contributing to The COVID Tracking Project website can be rewarding and critical work that helps support the decision makers, journalists, and private citizens that depend on this data.

Following these guidelines helps to communicate that you respect the time of the developers managing and developing this open source project. In return, they should reciprocate that respect in addressing your issue, assessing changes, and helping you finalize your pull requests.

## How to start contributing

If you aren’t sure where to start, check out our How you can Help page. You can also visit our issue queue to see what problems we are working on. Issues labeled with [Good first issue](https://github.com/COVID19Tracking/website/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22) are a great way to get started.

The project README file includes all the information you need to build a local version of the website for you to start working on.

## Coding standards

We use the [Airbnb style guide](https://github.com/airbnb/javascript), except with semicolons turned off. We suggest using Prettier in your environment to make sure your code files are all balanced and beautiful.

### Style and SCSS Modules

We use Gatsby's [CSS modules](https://www.gatsbyjs.org/docs/css-modules/), but with Sass files. Every Sass file should be in the same directory as its related component. There are also common colors and breakpoints defined in `/src/sass`.

We also use [stable class names](https://www.gatsbyjs.org/docs/css-modules/#enabling-user-stylesheets-with-a-stable-class-name) to enable users to override style sheets for their own accessibility or usability needs.

## How to file an issue

If you find a security vulnerability, **do NOT open** an issue. Email infosec@covidtracking.com instead.

The issue queue is the place for bug reports or feature requests. To make sure your issue is resolved quickly, here are a few suggestions:

- Make sure you are in the right place! If you have an issue with data or data quality, please file it in the separate issues repository.
- Take a look in the queue and see if there is already an issue that relates to your needs. If so, add a reaction or comment to it instead of filing a new one.
- If your issue is about a specific page of the site, include a link to it.

## Pull requests

We use the pull request (PR) process to test and discuss proposed changes to the website. Anyone can open a pull request, and the process for reviewing and merging requests is the same for everyone.

**Important**: By submitting a PR, you agree to license your work under the same license as that used by the project.

Before preparing a pull request, open an issue if there isn’t already one that your request fixes. We use issues to discuss options before deciding on a single approach. For tiny changes, like a typo, a separate issue is not needed.

All pull requests run automated tests and deploy a test version of the site to preview changes. It’s OK if a draft or work-in-progress pull request is not passing, all tests and checks must be passing before the request can be merged. The deploy preview is very helpful for others to review your code, and is available in the “Details” link next to a check that will read “Deploy preview ready!”

### Reviewing, approving and merging pull requests

When reviewing a PR, first be compassionate and responsive. People are contributing to the COVID Tracking Project because they care deeply, as you do, about the health of our communities during this crisis. Make suggestions using [Github line suggestions](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/commenting-on-a-pull-request#adding-line-comments-to-a-pull-request) if possible. When writing feedback, make sure to highlight if one is optional (not required).

All PRs should be reviewed by another developer. Even members of the team should have another team member review their own work, unless it is a very minor fix.

Merges should only be made by the core website team, after a PR was reviewed and all checks have passed.

## Commit messages and pull request titles

Write your commit messages and PR titles following the [conventional commits](https://www.conventionalcommits.org/en/v1.0.0-beta.3/) format. The pattern is `<type>([optional scope]): Message,`, for example: `fix(docs): Fixed typos in contributor documentation`. They should be both concise and specific. Examples of good commit messages are:

- fix(design): Added more padding to buttons
- chore(docs): Copy edit the contributing page
- feat(visualization): Added new

Examples of unhelpful messages:

- Testing
- Fixed bug in mobile
