# angular-svg-radial (WIP)

Angular directive that produces an SVG radial based on a percentage.

> Maintained by @dmaloneycalu & @StoicJester

This is currently a work in progress. After creating this quickly on a project, we decided that refactoring it to use SVGs would be a beneficial open source contribution.

Roadmap
---

_v0.x_

- considered to be a WIP state
- breaking changes may occur here
- specify exact tag numbers when utilizing

_v1_

- use SVGs to create radial progress meters
- update on value change (animated)
- provide easy modification of visual output
- animate fluidly on mobile devices default browsers
- provide attributes for toggling settings
- vertically centered content using `transclude`
- remove jQuery dependency
- support for IE9+

_v1.x_

- accept a promise for a value
- animated state while waiting on a promise to resolve
- color gradation by completion percent
- modifiable starting point degree
- work with angular promises [notify](https://docs.angularjs.org/api/ng/service/$q#the-deferred-api) function

_v2.0_

- support for multiple values making up one radial
- multiple layered radials?

Usage
---

Only include files found in the `dist` or `less` directory. Changes to other files outside of these folders will not constitute breaking changes. A minified/uglified file has been provided in the `dist` folder.

Development
---

When forking the repo and pulling the repo, run `npm install` and `bower install`.

If submitting a pull request to this repo, we expect that styles are kept in par with the original standards of this repo. A `.jshintrc` file has been included and works directly with `grunt watch`.

Karma & Jasmine are being utilized for testing and can be run with `grunt karma`. New functionality should be covered with tests, please include false checks and cases that force error handling where possible.
