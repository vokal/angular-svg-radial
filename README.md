angular-svg-radial (WIP)
===

Angular directive that produces an SVG radial based on a percentage.

This is currently a work in progress. After creating this quickly on a project, we decided that refactoring it to use SVGs would be a beneficial open source contribution.

Roadmap
---

_v1_

- use SVGs to create radial progress meters
- update on value change (animated)
- provide easy modification of visual output
- animate fluidly on mobile devices default browsers
- provide attributes for toggling settings
- vertically centered content using `transclude`
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