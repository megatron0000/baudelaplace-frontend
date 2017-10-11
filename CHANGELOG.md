# 1.3.0 (10/10/2017)

## Fixes

- try and catch blocks when dealing with `fetchUser()`, so that it works when server is down
- Corrects application name for Android

## Minor changes

- Login page displays Loading while checking for existence of previous user session
- New style color variable (visible-light)
- `BauCardComponent` no longer has `"mostrar resposta"` texts
- Deactivates application's side menu

# 1.2.0 (8/10/2017)

## New features

- Modification of `webpack.config.js` to access `bson-objectid` on client (needed for `ObjectId` type checking)
- Card modification (only by user author)
- Logout has effects on backend, and it is possible to detect whether backend has an active session for current user or not

## Refactor

- `ListPickComponent` control value accessor is now simmetrical: inputs and outputs only `PickableItem`s. Previously, it used to output `PickableItem#map(elem => elem.retrieveData())`

## Minor changes

- Home page set to Login
- `DefaultAlertService#showError(...)` now accepts `string|Error|undefined`. In case it receives an object, it is logged to the console

# 1.1.0 (6/10/2017)

## New features

- Possibility of creating tags
- Possibility of choosing tags for questions using all-new `ListPickComponent`
- recaptcha on register page. Register not permitted on app, only on website
- `BauTagComponent` responds to mouseover changing background color
- `EnvVarFactory` for deciding on api endpoint and whether or not to allow registering
  - Allows `LOC_ENV='web'|'mobile'` custom environment variable

## Module segmentation

- `ListPickComponent`, `ElementHostDirective`, `ItemPick` moved to separate module
- `SearchPipe` created and delegated to separate `UtilsModule`

## Minor changes

- `BauCardComponent` and `LoginPage` use `DefaultAlertService`
- Removes `build/` and `resources` from git tracking
  - Building is now a prepublish script

# 1.0.6 (22/09/2017)

## Development facilities

- Project gains `typedoc` regulated by `typedoc.json` for generating docs
- Semicolons are removed from linting

## Theming

- Addition of `calm-green` and `old-yellow` colors to global sass variables

## Components

- `BauCardComponent` emits when card is successfully deleted, or issues error popup by itself if deletion fails

## Pages

- Creation of `CreateCardModal` modal page (with `question` and `answer` fields, i.e, no `tags` yet)
- `HomePage` opens create card modal and reacts to card deletion
- Switch in the logic from `LoginPage` and `RegisterPage`: Forms processed by them changed from angular-1 style to angular-2 style (programmatic control with `FormGroup`)

## Providers

- Creation of `CardsService` to communicate with backend.
  - Method's return values are consistent with `baudelaplace-bridge`
  - Methods promisify results before exporting them to other components
  - In case the server is down, only promisifying the `Response` obj would not respect the `bridge` module contract. Therefore this service detects `res.status === 0` and returns a `ServerDownError` (const from `bridge`) in such a case
- Bugfixes `AuthService`, which did not handle server down error correctly (same problem of `CardsService` above)
